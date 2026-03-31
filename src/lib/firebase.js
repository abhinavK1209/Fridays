import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup as firebaseSignInWithPopup,
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
  createUserWithEmailAndPassword as firebaseCreateUserWithEmailAndPassword,
  sendPasswordResetEmail as firebaseSendPasswordResetEmail,
  sendEmailVerification as firebaseSendEmailVerification,
  updateProfile as firebaseUpdateProfile,
  updateEmail as firebaseUpdateEmail,
  signOut as firebaseSignOut,
  onAuthStateChanged as firebaseOnAuthStateChanged,
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
}

const hasFirebaseConfig = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.authDomain &&
  firebaseConfig.projectId &&
  firebaseConfig.appId
)

export const app = hasFirebaseConfig ? initializeApp(firebaseConfig) : null
export const auth = app ? getAuth(app) : null
export const db = app ? getFirestore(app) : null
export const provider = app ? new GoogleAuthProvider() : null

export let analytics = null

if (app && typeof window !== 'undefined' && firebaseConfig.measurementId) {
  try {
    analytics = getAnalytics(app)
  } catch {
    analytics = null
  }
}

function createNotConfiguredError() {
  const error = new Error('Firebase authentication is not configured for this environment.')
  error.code = 'auth/not-configured'
  return error
}

function requireAuth(currentAuth = auth) {
  if (!currentAuth) throw createNotConfiguredError()
  return currentAuth
}

function requireProvider(currentProvider = provider) {
  if (!currentProvider) throw createNotConfiguredError()
  return currentProvider
}

function requireUser(user) {
  if (!user) throw createNotConfiguredError()
  return user
}

export function signInWithPopup(currentAuth = auth, currentProvider = provider) {
  return firebaseSignInWithPopup(requireAuth(currentAuth), requireProvider(currentProvider))
}

export function signInWithEmailAndPassword(currentAuth = auth, email, password) {
  return firebaseSignInWithEmailAndPassword(requireAuth(currentAuth), email, password)
}

export function createUserWithEmailAndPassword(currentAuth = auth, email, password) {
  return firebaseCreateUserWithEmailAndPassword(requireAuth(currentAuth), email, password)
}

export function sendPasswordResetEmail(currentAuth = auth, email) {
  return firebaseSendPasswordResetEmail(requireAuth(currentAuth), email)
}

export function sendEmailVerification(user) {
  return firebaseSendEmailVerification(requireUser(user))
}

export function updateProfile(user, profile) {
  return firebaseUpdateProfile(requireUser(user), profile)
}

export function updateEmail(user, email) {
  return firebaseUpdateEmail(requireUser(user), email)
}

export function signOut(currentAuth = auth) {
  if (!currentAuth) return Promise.resolve()
  return firebaseSignOut(currentAuth)
}

export function onAuthStateChanged(currentAuth = auth, cb) {
  if (!currentAuth) {
    cb(null)
    return () => {}
  }

  return firebaseOnAuthStateChanged(currentAuth, cb)
}
