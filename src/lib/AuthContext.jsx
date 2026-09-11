import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile,
} from 'firebase/auth'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { auth, db, googleProvider, handleFirestoreError, OperationType } from './firebase'
import { sanitizeInput, MAX_LENGTHS } from './security'

const AuthContext = createContext(null)

// Permitted profile fields that users can legitimately self-update
const ALLOWED_PROFILE_KEYS = ['fullName', 'country', 'phone', 'photoURL']
const STRICT_ADMIN_EMAIL = 'qxtfunded1@gmail.com'

// Local profile persistence helpers
function getLocalProfile(uid) {
  try {
    const raw = localStorage.getItem(`qxt_profile_${uid}`)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function saveLocalProfile(uid, data) {
  try {
    if (uid && data) {
      localStorage.setItem(`qxt_profile_${uid}`, JSON.stringify(data))
    }
  } catch {
    // Ignore storage quota errors
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)

  // Fetch or create user record in Firestore with resilient offline/cache fallback
  const syncUserData = useCallback(async (firebaseUser, additionalData = {}) => {
    if (!firebaseUser) {
      setUserData(null)
      return null
    }

    const now = new Date().toISOString()
    const isOfficialAdmin = (firebaseUser.email || '').toLowerCase() === STRICT_ADMIN_EMAIL
    const cachedProfile = getLocalProfile(firebaseUser.uid)

    // Sanitize any additional registration data passed from signup form
    const safeAdditional = {}
    if (additionalData.fullName) safeAdditional.fullName = sanitizeInput(additionalData.fullName, MAX_LENGTHS.NAME)
    if (additionalData.country) safeAdditional.country = sanitizeInput(additionalData.country, MAX_LENGTHS.CITY)
    if (additionalData.phone) safeAdditional.phone = sanitizeInput(additionalData.phone, MAX_LENGTHS.PHONE)

    // Build immediate, comprehensive user profile representation
    const baseProfile = {
      uid: firebaseUser.uid,
      fullName:
        safeAdditional.fullName ||
        cachedProfile?.fullName ||
        firebaseUser.displayName ||
        firebaseUser.email?.split('@')[0] ||
        'Trader',
      email: firebaseUser.email || cachedProfile?.email || '',
      country: safeAdditional.country || cachedProfile?.country || 'United States',
      phone: safeAdditional.phone || cachedProfile?.phone || '',
      photoURL: firebaseUser.photoURL || cachedProfile?.photoURL || '',
      registrationDate: cachedProfile?.registrationDate || now,
      lastLogin: now,
      authProvider: firebaseUser.providerData[0]?.providerId || cachedProfile?.authProvider || 'password',
      walletBalance: cachedProfile?.walletBalance ?? 0,
      role: isOfficialAdmin ? 'admin' : (cachedProfile?.role || 'trader'),
      ...cachedProfile,
      ...safeAdditional,
    }

    // Set immediate state to prevent loading stalls
    setUserData(baseProfile)
    saveLocalProfile(firebaseUser.uid, baseProfile)

    // Attempt cloud synchronization with Firestore
    const userRef = doc(db, 'users', firebaseUser.uid)
    try {
      const snap = await getDoc(userRef)

      if (snap.exists()) {
        const cloudData = snap.data()
        const merged = {
          ...baseProfile,
          ...cloudData,
          ...safeAdditional,
          uid: firebaseUser.uid,
          lastLogin: now,
          role: isOfficialAdmin ? 'admin' : (cloudData.role || baseProfile.role || 'trader'),
        }

        // Quietly update cloud lastLogin without touching protected immutable fields
        const cloudUpdate = {
          lastLogin: now,
          ...safeAdditional,
        }
        if (firebaseUser.photoURL && firebaseUser.photoURL !== cloudData.photoURL) {
          cloudUpdate.photoURL = firebaseUser.photoURL
        }

        try {
          await updateDoc(userRef, cloudUpdate)
        } catch (updateErr) {
          console.warn('Firestore lastLogin sync note (cached locally):', updateErr?.message || updateErr)
        }

        setUserData(merged)
        saveLocalProfile(firebaseUser.uid, merged)
        return merged
      } else {
        const newCloudProfile = {
          uid: firebaseUser.uid,
          fullName: baseProfile.fullName,
          email: firebaseUser.email || '',
          country: baseProfile.country,
          phone: baseProfile.phone,
          photoURL: baseProfile.photoURL,
          registrationDate: baseProfile.registrationDate,
          lastLogin: now,
          authProvider: baseProfile.authProvider,
          walletBalance: baseProfile.walletBalance,
          role: baseProfile.role,
        }

        try {
          await setDoc(userRef, newCloudProfile)
        } catch (setErr) {
          console.warn('Firestore user profile initialization note (cached locally):', setErr?.message || setErr)
        }

        setUserData(baseProfile)
        saveLocalProfile(firebaseUser.uid, baseProfile)
        return baseProfile
      }
    } catch (fetchErr) {
      console.warn('Firestore profile sync note (operating with local cache):', fetchErr?.message || fetchErr)
      setUserData(baseProfile)
      return baseProfile
    }
  }, [])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser)
      if (currentUser) {
        await syncUserData(currentUser)
      } else {
        setUserData(null)
      }
      setLoading(false)
    })
    return () => unsubscribe()
  }, [syncUserData])

  const signIn = useCallback(async (email, password) => {
    setLoading(true)
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password)
      const data = await syncUserData(cred.user)
      if (
        data &&
        (data.status === 'blocked' ||
          data.status === 'disabled' ||
          data.isBlocked === true ||
          data.accountStatus === 'Blocked' ||
          data.accountStatus === 'Disabled')
      ) {
        await firebaseSignOut(auth)
        setUser(null)
        setUserData(null)
        throw new Error('Your account has been suspended or blocked. Please contact QXT Support.')
      }
      return cred.user
    } catch (err) {
      throw err
    } finally {
      setLoading(false)
    }
  }, [syncUserData])

  const signUp = useCallback(async (name, email, password, country) => {
    setLoading(true)
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password)
      if (cred.user) {
        await updateProfile(cred.user, { displayName: name })
        try {
          await sendEmailVerification(cred.user)
        } catch (e) {
          console.warn('Verification email failed to send:', e)
        }
        await syncUserData(cred.user, { fullName: name, country })
      }
      return cred.user
    } catch (err) {
      throw err
    } finally {
      setLoading(false)
    }
  }, [syncUserData])

  const signInWithGoogle = useCallback(async () => {
    setLoading(true)
    try {
      const result = await signInWithPopup(auth, googleProvider)
      if (!result?.user) return null
      await syncUserData(result.user, {
        fullName: result.user.displayName || 'Trader',
        photoURL: result.user.photoURL || '',
        authProvider: 'google.com',
      })
      return result.user
    } catch (err) {
      if (
        err.code === 'auth/popup-closed-by-user' ||
        err.code === 'auth/cancelled-popup-request' ||
        err.message?.includes('popup-closed-by-user')
      ) {
        console.warn('Google sign-in popup was closed by the user.')
        return null
      }
      throw err
    } finally {
      setLoading(false)
    }
  }, [syncUserData])

  const signOut = useCallback(async () => {
    try {
      // Clear sensitive local storage items upon signout to avoid shared device leakage
      localStorage.removeItem('qxt_admin_mode')
      sessionStorage.removeItem('spa_redirect')
    } catch (e) {
      // Ignore storage cleanup issues
    }
    await firebaseSignOut(auth)
    setUser(null)
    setUserData(null)
  }, [])

  const resetPassword = useCallback(async (email) => {
    await sendPasswordResetEmail(auth, email)
  }, [])

  const resendVerification = useCallback(async () => {
    if (auth.currentUser) {
      await sendEmailVerification(auth.currentUser)
    }
  }, [])

  const updateUserProfile = useCallback(async (updates) => {
    if (!auth.currentUser || !updates || typeof updates !== 'object') return

    // Enforce strict whitelist of permitted profile fields (prevent privilege escalation)
    const sanitizedUpdates = {}
    for (const key of Object.keys(updates)) {
      if (ALLOWED_PROFILE_KEYS.includes(key)) {
        if (key === 'fullName') {
          sanitizedUpdates.fullName = sanitizeInput(updates.fullName, MAX_LENGTHS.NAME)
        } else if (key === 'phone') {
          sanitizedUpdates.phone = sanitizeInput(updates.phone, MAX_LENGTHS.PHONE)
        } else if (key === 'country') {
          sanitizedUpdates.country = sanitizeInput(updates.country, MAX_LENGTHS.CITY)
        } else if (key === 'photoURL') {
          sanitizedUpdates.photoURL = sanitizeInput(updates.photoURL, 500)
        }
      }
    }

    if (Object.keys(sanitizedUpdates).length === 0) return

    if (sanitizedUpdates.fullName && auth.currentUser) {
      try {
        await updateProfile(auth.currentUser, { displayName: sanitizedUpdates.fullName })
      } catch (authErr) {
        console.warn('Auth displayName update note:', authErr)
      }
    }

    setUserData((prev) => {
      const updated = prev ? { ...prev, ...sanitizedUpdates } : sanitizedUpdates
      saveLocalProfile(auth.currentUser.uid, updated)
      return updated
    })

    try {
      const userRef = doc(db, 'users', auth.currentUser.uid)
      await updateDoc(userRef, sanitizedUpdates)
    } catch (cloudErr) {
      console.warn('Firestore profile update note (persisted locally):', cloudErr?.message || cloudErr)
    }
  }, [])

  // Admin access strictly authorized via database role or verified administrator identity
  const toggleAdmin = useCallback(() => {
    // Deprecated for security: client-side privilege escalation is permanently disabled
  }, [])

  const isAdmin = Boolean(
    userData?.role === 'admin' ||
    user?.email?.toLowerCase() === STRICT_ADMIN_EMAIL
  )

  return (
    <AuthContext.Provider
      value={{
        user,
        userData,
        loading,
        isAdmin,
        toggleAdmin,
        signIn,
        signUp,
        signInWithGoogle,
        signOut,
        resetPassword,
        resendVerification,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
