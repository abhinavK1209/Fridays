import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import {
  auth,
  provider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile,
  signOut,
  onAuthStateChanged,
} from '@/lib/firebase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser]           = useState(null)
  const [loading, setLoading]     = useState(true)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u)
      setLoading(false)
    })
    return unsub
  }, [])

  const signInWithGoogle = useCallback(async () => {
    const result = await signInWithPopup(auth, provider)
    setUser(result.user)
    return result.user
  }, [])

  const signInWithEmail = useCallback(async (email, password) => {
    const result = await signInWithEmailAndPassword(auth, email, password)
    // Block unverified email accounts from signing in
    if (!result.user.emailVerified) {
      await signOut(auth)
      setUser(null)
      const err = new Error('Please verify your email before signing in.')
      err.code = 'auth/email-not-verified'
      throw err
    }
    setUser(result.user)
    return result.user
  }, [])

  const createAccount = useCallback(async (email, password, displayName) => {
    const result = await createUserWithEmailAndPassword(auth, email, password)
    if (displayName) {
      await updateProfile(result.user, { displayName })
    }
    await sendEmailVerification(result.user)
    // Sign them out immediately — they must verify first
    await signOut(auth)
    setUser(null)
    return result.user
  }, [])

  const resendVerification = useCallback(async (email, password) => {
    // Re-authenticate to get the user object, then resend
    const result = await signInWithEmailAndPassword(auth, email, password)
    await sendEmailVerification(result.user)
    await signOut(auth)
    setUser(null)
  }, [])

  const resetPassword = useCallback((email) => {
    return sendPasswordResetEmail(auth, email)
  }, [])

  const logout = useCallback(async () => {
    await signOut(auth)
    setUser(null)
  }, [])

  const openModal  = useCallback(() => setModalOpen(true),  [])
  const closeModal = useCallback(() => setModalOpen(false), [])

  return (
    <AuthContext.Provider value={{
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
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
