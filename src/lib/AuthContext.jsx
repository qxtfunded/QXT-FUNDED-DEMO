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
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db, googleProvider, handleFirestoreError, OperationType } from './firebase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)

  // Fetch or create user record in Firestore
  const syncUserData = useCallback(async (firebaseUser, additionalData = {}) => {
    if (!firebaseUser) {
      setUserData(null)
      return null
    }

    const userRef = doc(db, 'users', firebaseUser.uid)
    try {
      const snap = await getDoc(userRef)
      const now = new Date().toISOString()

      if (snap.exists()) {
        const existingData = snap.data()
        const updated = {
          lastLogin: now,
          email: firebaseUser.email || existingData.email || '',
          photoURL: firebaseUser.photoURL || existingData.photoURL || '',
          ...additionalData,
        }
        await updateDoc(userRef, updated)
        const fullData = { ...existingData, ...updated, uid: firebaseUser.uid }
        setUserData(fullData)
        return fullData
      } else {
        const newProfile = {
          uid: firebaseUser.uid,
          fullName: additionalData.fullName || firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Trader',
          email: firebaseUser.email || '',
          country: additionalData.country || 'United States',
          phone: additionalData.phone || '',
          photoURL: firebaseUser.photoURL || '',
          registrationDate: now,
          lastLogin: now,
          authProvider: firebaseUser.providerData[0]?.providerId || 'password',
          walletBalance: 0,
        }
        await setDoc(userRef, newProfile)
        setUserData(newProfile)
        return newProfile
      }
    } catch (err) {
      console.error('Error syncing user data:', err)
      // Fallback local representation if Firestore check fails
      const fallback = {
        uid: firebaseUser.uid,
        fullName: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Trader',
        email: firebaseUser.email || '',
        country: 'United States',
        phone: '',
        photoURL: firebaseUser.photoURL || '',
        registrationDate: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        authProvider: 'password',
        walletBalance: 0,
      }
      setUserData(fallback)
      return fallback
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
      await syncUserData(cred.user)
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
    if (!auth.currentUser) return
    const userRef = doc(db, 'users', auth.currentUser.uid)
    await updateDoc(userRef, updates)
    if (updates.fullName && auth.currentUser) {
      await updateProfile(auth.currentUser, { displayName: updates.fullName })
    }
    setUserData((prev) => (prev ? { ...prev, ...updates } : updates))
  }, [])

  const [adminMode, setAdminMode] = useState(() => localStorage.getItem('qxt_admin_mode') === 'true')

  const toggleAdmin = useCallback(() => {
    setAdminMode((prev) => {
      const next = !prev
      localStorage.setItem('qxt_admin_mode', String(next))
      return next
    })
  }, [])

  const isAdmin = Boolean(
    adminMode ||
    userData?.role === 'admin' ||
    user?.email?.toLowerCase().includes('admin') ||
    user?.email?.toLowerCase() === 'qxtfunded1@gmail.com'
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
