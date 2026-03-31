import { createContext, useContext, useState, useCallback } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser]           = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  const openModal  = useCallback(() => setModalOpen(true),  [])
  const closeModal = useCallback(() => setModalOpen(false), [])
  const logout     = useCallback(() => setUser(null), [])

  return (
    <AuthContext.Provider value={{
      user,
      loading:            false,
      modalOpen,
      openModal,
      closeModal,
      signInWithGoogle:   async () => {},
      signInWithEmail:    async () => {},
      createAccount:      async () => {},
      resendVerification: async () => {},
      resetPassword:      async () => {},
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
