import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { initializeFirestore, getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAnalytics, isSupported, logEvent } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: "AIzaSyB_q1hwzqaLWmHfBs3OnGa8DUQZr-ALsZg",
  authDomain: "qxtdemo.firebaseapp.com",
  projectId: "qxtdemo",
  storageBucket: "qxtdemo.firebasestorage.app",
  messagingSenderId: "536088917861",
  appId: "1:536088917861:web:18cafc1e8bad67be16938c",
  measurementId: "G-F5VDSP9K2F"
}

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig)

export const auth = getAuth(app)

let firestoreDb
try {
  firestoreDb = initializeFirestore(app, {
    experimentalAutoDetectLongPolling: true,
  })
} catch (e) {
  firestoreDb = getFirestore(app)
}

export const db = firestoreDb
export const storage = getStorage(app)
export const googleProvider = new GoogleAuthProvider()

let analyticsInstance = null
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      try {
        analyticsInstance = getAnalytics(app)
      } catch (err) {
        // Safe fallback
      }
    }
  }).catch(() => {})
}

export function logAnalyticsEvent(eventName, eventParams = {}) {
  try {
    if (analyticsInstance) {
      logEvent(analyticsInstance, eventName, eventParams)
    }
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', eventName, eventParams)
    }
  } catch (e) {
    // non-blocking
  }
}

export const OperationType = {
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
  LIST: 'list',
  GET: 'get',
  WRITE: 'write',
}

export function handleFirestoreError(error, operationType, path) {
  const errCode = error?.code || ''
  const errMsg = error instanceof Error ? error.message : String(error)
  const errInfo = {
    error: errMsg,
    code: errCode,
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
    },
    operationType,
    path
  }

  if (errCode === 'unavailable' || errCode === 'failed-precondition' || errMsg.includes('could not be completed')) {
    console.warn('Firestore transient connectivity notice:', JSON.stringify(errInfo))
    return null
  }

  console.error('Firestore Error: ', JSON.stringify(errInfo))
  throw new Error(JSON.stringify(errInfo))
}

export function validateLegalEmail(email) {
  if (!email || typeof email !== 'string') {
    return 'Please enter a valid email address.'
  }

  const normalized = email.trim().toLowerCase()
  const prohibitedKeywords = [
    'qxtfunded',
    'fundedaccount',
    'quotexfunded',
    'qxt-funded',
    'funded-account',
    'quotex-funded',
    'qxt_funded',
    'funded_account',
    'quotex_funded',
  ]

  for (const keyword of prohibitedKeywords) {
    if (normalized.includes(keyword)) {
      return `Invalid email address. Prohibited terms (${keyword}) cannot be used in email addresses. Please use your authentic, legal personal email.`
    }
  }

  return null
}

export function formatAuthErrorMessage(err) {
  if (!err) return 'Authentication failed. Please check your details and try again.'

  if (typeof err === 'string') {
    if (err.includes('blocked') || err.includes('disabled') || err.includes('Incorrect') || err.includes('No account')) {
      return err
    }
    return err
  }

  const code = err.code || ''
  const message = err.message || ''

  if (message.toLowerCase().includes('blocked') || message.toLowerCase().includes('disabled') || message.toLowerCase().includes('suspended')) {
    return 'Your account has been suspended or blocked. Please contact QXT Support.'
  }

  switch (code) {
    case 'auth/user-not-found':
      return 'No account found with this email address. Please sign up first.'
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
    case 'auth/invalid-login-credentials':
      return 'Incorrect password. Please check your password and try again.'
    case 'auth/user-disabled':
      return 'Your account has been disabled. Please contact QXT Support.'
    case 'auth/too-many-requests':
      return 'Too many failed login attempts. Please wait a few minutes before trying again.'
    case 'auth/email-already-in-use':
      return 'An account with this email address already exists. Please sign in.'
    case 'auth/invalid-email':
      return 'Please enter a valid email address.'
    case 'auth/weak-password':
      return 'Password is too weak. Please use at least 6 characters.'
    case 'auth/network-request-failed':
      return 'Network connection error. Please check your internet connection.'
    case 'auth/popup-closed-by-user':
    case 'auth/cancelled-popup-request':
      return 'Sign-in window was closed before completing.'
    default:
      if (message.includes('Firebase') || message.includes('auth/') || message.includes('credential')) {
        return 'Incorrect email or password. Please verify your login details.'
      }
      return message || 'Authentication failed. Please check your credentials and try again.'
  }
}
