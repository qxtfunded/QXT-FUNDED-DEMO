import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { initializeFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyB_q1hwzqaLWmHfBs3OnGa8DUQZr-ALsZg",
  authDomain: "qxtdemo.firebaseapp.com",
  projectId: "qxtdemo",
  storageBucket: "qxtdemo.firebasestorage.app",
  messagingSenderId: "536088917861",
  appId: "1:536088917861:web:18cafc1e8bad67be16938c",
  measurementId: "G-F5VDSP9K2F"
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = initializeFirestore(app, {
  experimentalAutoDetectLongPolling: true,
})
export const storage = getStorage(app)
export const googleProvider = new GoogleAuthProvider()

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
