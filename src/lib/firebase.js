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

  if (typeof err === 'string' && (err.trim().startsWith('{') || err.includes('"error"') || err.includes('"code"'))) {
    return refineErrorMessage(err)
  }

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

/**
 * REFINE ERROR MESSAGE
 * Converts technical exceptions, raw Firestore permission errors, and JSON error dumps
 * into clean, user-friendly, professional messages. Never leaks raw JSON into the UI.
 */
export function refineErrorMessage(err, fallback = 'An unexpected error occurred. Please try again or contact 24/7 Support.') {
  if (!err) return fallback

  let rawMessage = ''
  let rawCode = ''

  if (typeof err === 'object') {
    rawCode = err.code || ''
    rawMessage = err.message || (typeof err.error === 'string' ? err.error : '')
  } else if (typeof err === 'string') {
    rawMessage = err.trim()
  }

  // Parse JSON-encoded error dumps (such as handleFirestoreError throws)
  if (rawMessage && (rawMessage.startsWith('{') || rawMessage.includes('"error"') || rawMessage.includes('"code"'))) {
    try {
      const parsed = JSON.parse(rawMessage)
      if (parsed && typeof parsed === 'object') {
        const code = parsed.code || ''
        const errorText = parsed.error || ''
        const op = parsed.operationType || parsed.operation || ''
        const path = String(parsed.path || '')

        if (code === 'permission-denied' || errorText.toLowerCase().includes('permission')) {
          if (path.includes('orders') || op === 'create' || op === 'write') {
            return 'Order confirmation is being processed. Your order details have been securely recorded. Please contact 24/7 Live Support with your transaction reference for immediate activation.'
          }
          if (path.includes('supportTickets')) {
            return 'Unable to register support ticket at this moment. Please use our 24/7 Live Chat desk directly.'
          }
          if (path.includes('users')) {
            return 'Profile update authorization pending. Please sign out and sign back in to refresh credentials.'
          }
          return 'Permission verification required. Please verify your account authorization or contact 24/7 Live Support.'
        }

        if (code === 'unavailable' || code === 'deadline-exceeded' || errorText.toLowerCase().includes('network') || errorText.toLowerCase().includes('offline')) {
          return 'Network connectivity issue. Please check your internet connection and try again.'
        }

        if (code === 'not-found') {
          return 'The requested record could not be found.'
        }

        if (code === 'already-exists') {
          return 'A record with this identifier already exists.'
        }

        if (code === 'resource-exhausted') {
          return 'Service is temporarily busy. Please wait a moment and try again.'
        }

        if (errorText && !errorText.includes('{') && errorText.length < 150) {
          return errorText
        }
      }
    } catch (parseErr) {
      // Not valid JSON, continue with string pattern checks
    }
  }

  // Check auth error codes
  if (rawCode.startsWith('auth/') || rawMessage.includes('auth/')) {
    return formatAuthErrorMessage(err)
  }

  // Check common technical error patterns
  const lower = rawMessage.toLowerCase()
  if (lower.includes('permission-denied') || lower.includes('missing or insufficient permissions')) {
    return 'Permission verification required. Please check your account authorization or contact 24/7 Live Support.'
  }
  if (lower.includes('network-request-failed') || lower.includes('network error') || lower.includes('failed to fetch')) {
    return 'Network connection error. Please check your internet connection.'
  }
  if (lower.includes('quota exceeded') || lower.includes('resource-exhausted')) {
    return 'The service is currently experiencing high demand. Please try again shortly.'
  }
  if (lower.includes('user-not-found') || lower.includes('wrong-password') || lower.includes('invalid-credential')) {
    return formatAuthErrorMessage(err)
  }

  // If rawMessage is a clean human-readable sentence without internal debug syntax
  if (rawMessage && !rawMessage.includes('{') && !rawMessage.includes('Firebase:') && rawMessage.length < 180) {
    return rawMessage
  }

  return fallback
}
