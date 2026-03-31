import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import {
  auth,
  provider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile,
  updateEmail,
  signOut,
  onAuthStateChanged,
} from '@/lib/firebase'

const AuthContext = createContext(null)

function createMissingUserError() {
  const error = new Error('No authenticated user is available.')
  error.code = 'auth/no-current-user'
  return error
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const signInWithGoogle = useCallback(async () => {
    const result = await signInWithPopup(auth, provider)
    setUser(result.user)
    return result.user
  }, [])

  const signInWithEmail = useCallback(async (email, password) => {
    const result = await signInWithEmailAndPassword(auth, email, password)
    if (!result.user.emailVerified) {
      await signOut(auth)
      setUser(null)
      const error = new Error('Please verify your email before signing in.')
      error.code = 'auth/email-not-verified'
      throw error
    }

    setUser(result.user)
    return result.user
  }, [])

  const createAccount = useCallback(async (email, password, displayName) => {
    const result = await createUserWithEmailAndPassword(auth, email, password)
    if (displayName) await updateProfile(result.user, { displayName })
    await sendEmailVerification(result.user)
    await signOut(auth)
    setUser(null)
    return result.user
  }, [])

  const resendVerification = useCallback(async (email, password) => {
    const result = await signInWithEmailAndPassword(auth, email, password)
    await sendEmailVerification(result.user)
    await signOut(auth)
    setUser(null)
  }, [])

  const resetPassword = useCallback((email) => {
    return sendPasswordResetEmail(auth, email)
  }, [])

  const updateDisplayName = useCallback(async (displayName) => {
    if (!auth?.currentUser) throw createMissingUserError()
    await updateProfile(auth.currentUser, { displayName })
    setUser({ ...auth.currentUser })
  }, [])

  const updateUserEmail = useCallback(async (newEmail) => {
    if (!auth?.currentUser) throw createMissingUserError()
    await updateEmail(auth.currentUser, newEmail)
    setUser({ ...auth.currentUser })
  }, [])

  const logout = useCallback(async () => {
    await signOut(auth)
    setUser(null)
  }, [])

  const openModal = useCallback(() => setModalOpen(true), [])
  const closeModal = useCallback(() => setModalOpen(false), [])

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        modalOpen,
        openModal,
        closeModal,
        signInWithGoogle,
        signInWithEmail,
        createAccount,
        resendVerification,
        resetPassword,
        updateDisplayName,
        updateUserEmail,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
