import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Mail, Lock, User, AlertCircle, CheckCircle, Info } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { useToast } from '@/context/ToastContext'
import { Input } from '@/components/ui/input'
import { validateEmail, hasAlias, isGoogleOnlyDomain, normalizeEmail } from '@/lib/email'

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
      <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
    </svg>
  )
}

function Spinner() {
  return (
    <span style={{
      display: 'inline-block', width: 16, height: 16,
      border: '2px solid rgba(223,149,80,.3)', borderTop: '2px solid #df9550',
      borderRadius: '50%', animation: 'spin .7s linear infinite',
    }} />
  )
}

function ErrorBanner({ message }) {
  if (!message) return null
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start', gap: 8,
      padding: '10px 14px', borderRadius: 10,
      border: '1px solid rgba(239,68,68,.25)', background: 'rgba(239,68,68,.06)',
    }}>
      <AlertCircle size={14} style={{ color: '#ef4444', flexShrink: 0, marginTop: 1 }} />
      <span style={{ fontSize: '0.8rem', color: 'rgba(239,68,68,.9)', lineHeight: 1.5 }}>
        {message}
      </span>
    </div>
  )
}

function InfoBanner({ message }) {
  if (!message) return null
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start', gap: 8,
      padding: '10px 14px', borderRadius: 10,
      border: '1px solid rgba(223,149,80,.2)', background: 'rgba(223,149,80,.06)',
    }}>
      <Info size={14} style={{ color: '#df9550', flexShrink: 0, marginTop: 1 }} />
      <span style={{ fontSize: '0.8rem', color: 'rgba(223,149,80,.85)', lineHeight: 1.5 }}>
        {message}
      </span>
    </div>
  )
}

function parseError(err) {
  const code = err?.code || ''
  const map = {
    'auth/user-not-found':         'No account found with that email.',
    'auth/wrong-password':         'Incorrect password. Try again.',
    'auth/invalid-credential':     'Incorrect email or password.',
    'auth/email-already-in-use':   'An account with this email already exists.',
    'auth/weak-password':          'Password must be at least 6 characters.',
    'auth/invalid-email':          'Please enter a valid email address.',
    'auth/too-many-requests':      'Too many attempts. Please wait and try again.',
    'auth/popup-closed-by-user':   'Sign-in popup was closed. Please try again.',
    'auth/network-request-failed': 'Network error. Check your connection.',
    'auth/account-exists-with-different-credential':
      'An account already exists with this email. Try a different sign-in method.',
    'auth/email-not-verified':
      'Please verify your email before signing in. Check your inbox.',
  }
  return map[code] || err?.message || 'Something went wrong. Please try again.'
}

// Validate email and return an error string or ''
function clientValidate(email) {
  if (!email.trim()) return 'Email is required.'
  if (hasAlias(email)) return 'Email aliases (e.g. name+tag@...) are not allowed.'
  if (!validateEmail(email)) return 'Please enter a valid email address.'
  return ''
}

const S = {
  overlay: {
    position: 'fixed', inset: 0, zIndex: 200,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: '16px', background: 'rgba(4,5,8,0.82)', backdropFilter: 'blur(10px)',
  },
  card: {
    position: 'relative', width: '100%', maxWidth: 440,
    background: '#0b0d14', border: '1px solid rgba(255,255,255,.08)',
    borderRadius: 20, padding: '40px 36px 36px',
    boxShadow: '0 40px 80px rgba(0,0,0,.6)',
  },
  close: {
    position: 'absolute', top: 16, right: 16,
    background: 'none', border: 'none', cursor: 'pointer',
    color: 'rgba(199,203,214,.4)', padding: 6, borderRadius: 8,
    display: 'flex', transition: 'color .2s',
  },
  eyebrow: {
    fontSize: '0.6rem', letterSpacing: '0.28em', textTransform: 'uppercase',
    color: 'rgba(223,149,80,.7)', fontFamily: "'Inter', sans-serif", marginBottom: 10,
  },
  heading: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 'clamp(1.6rem, 4vw, 2rem)', fontWeight: 400,
    color: '#ffffff', letterSpacing: '0.03em', marginBottom: 28, lineHeight: 1.2,
  },
  divider: { display: 'flex', alignItems: 'center', gap: 12, margin: '20px 0' },
  dividerLine: { flex: 1, height: 1, background: 'rgba(255,255,255,.07)' },
  dividerText: {
    fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase',
    color: 'rgba(199,203,214,.35)', fontFamily: "'Inter', sans-serif",
  },
  googleBtn: {
    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
    gap: 10, padding: '11px 0', border: '1px solid rgba(255,255,255,.12)',
    borderRadius: 12, background: 'rgba(255,255,255,.03)', color: 'rgba(199,203,214,.85)',
    fontFamily: "'Inter', sans-serif", fontSize: '0.82rem', letterSpacing: '0.05em',
    cursor: 'pointer', transition: 'border-color .25s, background .25s, transform .2s',
  },
  label: {
    display: 'block', fontSize: '0.68rem', letterSpacing: '0.18em',
    textTransform: 'uppercase', color: 'rgba(199,203,214,.5)',
    fontFamily: "'Inter', sans-serif", marginBottom: 6,
  },
  submitBtn: {
    width: '100%', padding: '13px 0',
    border: '1px solid rgba(223,149,80,.5)', borderRadius: 12,
    background: 'transparent', color: '#df9550',
    fontFamily: "'Inter', sans-serif", fontSize: '0.7rem',
    letterSpacing: '0.22em', textTransform: 'uppercase', cursor: 'pointer',
    transition: 'border-color .25s, background .25s, color .25s, box-shadow .25s, transform .2s',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 6,
  },
  switchRow: {
    textAlign: 'center', marginTop: 20, fontSize: '0.78rem',
    color: 'rgba(199,203,214,.4)', fontFamily: "'Inter', sans-serif",
  },
  switchLink: {
    color: 'rgba(223,149,80,.85)', background: 'none', border: 'none',
    cursor: 'pointer', fontFamily: "'Inter', sans-serif", fontSize: '0.78rem',
    padding: 0, textDecoration: 'underline', textUnderlineOffset: 3,
  },
}

export default function AuthModal() {
  const { modalOpen, closeModal, signInWithGoogle, signInWithEmail, createAccount, resendVerification, resetPassword } = useAuth()
  const { addToast } = useToast()

  // 'signin' | 'signup' | 'reset' | 'verify'
  const [mode,       setMode]       = useState('signin')
  const [email,      setEmail]      = useState('')
  const [password,   setPassword]   = useState('')
  const [name,       setName]       = useState('')
  const [loading,    setLoading]    = useState(false)
  const [googleLoad, setGoogleLoad] = useState(false)
  const [error,      setError]      = useState('')
  const [resetSent,  setResetSent]  = useState(false)
  const [resendDone, setResendDone] = useState(false)

  // True when the typed email domain requires Google
  const mustUseGoogle = isGoogleOnlyDomain(email)

  function reset() {
    setEmail(''); setPassword(''); setName('')
    setError(''); setResetSent(false)
  }

  function switchMode(next) { reset(); setMode(next) }

  function handleEmailChange(e) {
    setEmail(e.target.value)
    setError('')
  }

  async function handleGoogle() {
    setError(''); setGoogleLoad(true)
    try {
      await signInWithGoogle()
      addToast('Welcome back.')
      closeModal()
    } catch (err) {
      setError(parseError(err))
    } finally {
      setGoogleLoad(false)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    // Client-side validation
    const emailErr = clientValidate(email)
    if (emailErr) { setError(emailErr); return }

    // Force Google for Gmail addresses
    if (mode !== 'reset' && mustUseGoogle) {
      setError('Gmail accounts must sign in with Google. Use the button above.')
      return
    }

    setLoading(true)
    try {
      const normalized = normalizeEmail(email)

      if (mode === 'reset') {
        await resetPassword(normalized)
        setResetSent(true)
        return
      }
      if (mode === 'signup') {
        await createAccount(normalized, password, name.trim())
        setMode('verify')
        return
      } else {
        await signInWithEmail(normalized, password)
        addToast('Welcome back.')
        closeModal()
      }
    } catch (err) {
      if (err.code === 'auth/email-not-verified') {
        setMode('verify')
        return
      }
      setError(parseError(err))
    } finally {
      setLoading(false)
    }
  }

  async function handleResend() {
    setLoading(true)
    try {
      await resendVerification(email, password)
      setResendDone(true)
    } catch {
      // ignore — email might not exist yet
    } finally {
      setLoading(false)
    }
  }

  const headings = {
    signin: "Sign in to\nFriday's",
    signup: 'Create your\naccount',
    reset:  'Reset your\npassword',
    verify: 'Check your\ninbox',
  }

  return (
    <AnimatePresence>
      {modalOpen && (
        <motion.div
          style={S.overlay}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={e => { if (e.target === e.currentTarget) closeModal() }}
        >
          <motion.div
            style={S.card}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              onClick={closeModal} style={S.close} aria-label="Close"
              onMouseEnter={e => e.currentTarget.style.color = 'rgba(199,203,214,.85)'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(199,203,214,.4)'}
            >
              <X size={18} />
            </button>

            <p style={S.eyebrow}>Friday's</p>
            <h2 style={S.heading}>
              {headings[mode].split('\n').map((line, i) => (
                <span key={i}>{line}{i === 0 && <br />}</span>
              ))}
            </h2>

            {/* ── Email verification required ── */}
            {mode === 'verify' ? (
              <div style={{ textAlign: 'center', padding: '8px 0 16px' }}>
                <Mail size={40} style={{ color: '#df9550', margin: '0 auto 16px' }} />
                <p style={{ color: 'rgba(199,203,214,.7)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: 20 }}>
                  A verification link was sent to{' '}
                  <strong style={{ color: '#fff' }}>{normalizeEmail(email)}</strong>.<br />
                  Click the link in the email, then come back and sign in.
                </p>
                {resendDone ? (
                  <p style={{ fontSize: '0.78rem', color: 'rgba(223,149,80,.8)' }}>Verification email resent.</p>
                ) : (
                  <button
                    onClick={handleResend}
                    disabled={loading}
                    style={{ ...S.switchLink, fontSize: '0.78rem' }}
                  >
                    {loading ? 'Sending…' : "Didn't get it? Resend"}
                  </button>
                )}
                <button
                  style={{ ...S.switchLink, display: 'block', margin: '16px auto 0', fontSize: '0.72rem', color: 'rgba(199,203,214,.4)' }}
                  onClick={() => switchMode('signin')}
                >
                  Back to sign in
                </button>
              </div>
            ) : mode === 'reset' && resetSent ? (
              <div style={{ textAlign: 'center', padding: '8px 0 16px' }}>
                <CheckCircle size={40} style={{ color: '#df9550', margin: '0 auto 16px' }} />
                <p style={{ color: 'rgba(199,203,214,.7)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                  Reset link sent to <strong style={{ color: '#fff' }}>{normalizeEmail(email)}</strong>.<br />
                  Check your inbox.
                </p>
                <button style={{ ...S.switchLink, display: 'block', margin: '20px auto 0' }} onClick={() => switchMode('signin')}>
                  Back to sign in
                </button>
              </div>
            ) : (
              <>
                {/* ── Google button ── */}
                {mode !== 'reset' && (
                  <>
                    <button
                      style={S.googleBtn}
                      onClick={handleGoogle}
                      disabled={googleLoad || loading}
                      onMouseEnter={e => {
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,.25)'
                        e.currentTarget.style.background  = 'rgba(255,255,255,.06)'
                        e.currentTarget.style.transform   = 'translateY(-1px)'
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,.12)'
                        e.currentTarget.style.background  = 'rgba(255,255,255,.03)'
                        e.currentTarget.style.transform   = 'none'
                      }}
                    >
                      {googleLoad ? <Spinner /> : <GoogleIcon />}
                      Continue with Google
                    </button>

                    <div style={S.divider}>
                      <div style={S.dividerLine} />
                      <span style={S.dividerText}>or</span>
                      <div style={S.dividerLine} />
                    </div>
                  </>
                )}

                {/* ── Email form ── */}
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <ErrorBanner message={error} />

                  {/* Gmail nudge — shown when user types a gmail address */}
                  {mustUseGoogle && mode !== 'reset' && (
                    <InfoBanner message="Gmail accounts must use the Google button above to sign in." />
                  )}

                  {mode === 'signup' && (
                    <div>
                      <label style={S.label}>Full Name</label>
                      <div style={{ position: 'relative' }}>
                        <Input
                          type="text" placeholder="Marcus Taylor"
                          value={name} onChange={e => setName(e.target.value)}
                          required style={{ paddingLeft: 40 }}
                        />
                        <User size={14} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(199,203,214,.3)', pointerEvents: 'none' }} />
                      </div>
                    </div>
                  )}

                  <div>
                    <label style={S.label}>Email</label>
                    <div style={{ position: 'relative' }}>
                      <Input
                        type="email" placeholder="you@email.com"
                        value={email} onChange={handleEmailChange}
                        required style={{ paddingLeft: 40 }}
                        autoComplete="email"
                      />
                      <Mail size={14} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(199,203,214,.3)', pointerEvents: 'none' }} />
                    </div>
                  </div>

                  {/* Hide password field when Gmail is detected */}
                  {mode !== 'reset' && !mustUseGoogle && (
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
                        <label style={{ ...S.label, marginBottom: 0 }}>Password</label>
                        {mode === 'signin' && (
                          <button type="button" style={{ ...S.switchLink, fontSize: '0.68rem' }} onClick={() => switchMode('reset')}>
                            Forgot password?
                          </button>
                        )}
                      </div>
                      <div style={{ position: 'relative' }}>
                        <Input
                          type="password" placeholder="••••••••"
                          value={password} onChange={e => setPassword(e.target.value)}
                          required minLength={6} style={{ paddingLeft: 40 }}
                          autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                        />
                        <Lock size={14} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(199,203,214,.3)', pointerEvents: 'none' }} />
                      </div>
                    </div>
                  )}

                  {/* Hide submit button when Gmail is detected (they must use Google) */}
                  {!mustUseGoogle && (
                    <button
                      type="submit" disabled={loading || googleLoad} style={S.submitBtn}
                      onMouseEnter={e => {
                        if (!loading && !googleLoad) {
                          e.currentTarget.style.background  = 'rgba(223,149,80,.08)'
                          e.currentTarget.style.borderColor = '#df9550'
                          e.currentTarget.style.boxShadow   = '0 8px 28px rgba(223,149,80,.2)'
                          e.currentTarget.style.transform   = 'translateY(-1px)'
                        }
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background  = 'transparent'
                        e.currentTarget.style.borderColor = 'rgba(223,149,80,.5)'
                        e.currentTarget.style.boxShadow   = 'none'
                        e.currentTarget.style.transform   = 'none'
                      }}
                    >
                      {loading ? <Spinner /> : (
                        mode === 'signin' ? 'Sign In'
                        : mode === 'signup' ? 'Create Account'
                        : 'Send Reset Link'
                      )}
                    </button>
                  )}
                </form>

                <div style={S.switchRow}>
                  {mode === 'signin' ? (
                    <>Don't have an account?{' '}<button style={S.switchLink} onClick={() => switchMode('signup')}>Create one</button></>
                  ) : mode === 'signup' ? (
                    <>Already have an account?{' '}<button style={S.switchLink} onClick={() => switchMode('signin')}>Sign in</button></>
                  ) : (
                    <button style={S.switchLink} onClick={() => switchMode('signin')}>Back to sign in</button>
                  )}
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
