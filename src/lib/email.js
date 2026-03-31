// Domains that must authenticate via Google, not email/password.
const GOOGLE_ONLY_DOMAINS = ['gmail.com', 'googlemail.com']

// Owner/admin accounts.
export const ADMIN_EMAILS = [
  'kurukundabhinav@gmail.com',
  'yetvald@gmail.com',
  'tanishchess@gmail.com',
  'akhild1605@gmail.com',
]

// Strip + aliases and lowercase: yetvald+1@gmail.com -> yetvald@gmail.com
export function normalizeEmail(raw) {
  const lower = (raw || '').trim().toLowerCase()
  const at = lower.lastIndexOf('@')
  if (at === -1) return lower
  const local = lower.slice(0, at).split('+')[0]
  const domain = lower.slice(at + 1)
  return `${local}@${domain}`
}

// True if email has a + alias.
export function hasAlias(email) {
  const at = (email || '').indexOf('@')
  return at !== -1 && email.slice(0, at).includes('+')
}

// True if this domain must use Google sign-in.
export function isGoogleOnlyDomain(email) {
  const domain = (email || '').trim().toLowerCase().split('@')[1] || ''
  return GOOGLE_ONLY_DOMAINS.includes(domain)
}

// True if normalized email is in the admin list.
export function isAdmin(email) {
  return ADMIN_EMAILS.includes(normalizeEmail(email))
}

// RFC-5321 compliant email validation.
export function validateEmail(email) {
  return /^[^\s@"(),;:<>[\]]+@[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/.test(
    (email || '').trim()
  )
}

// Trim and cap length before writing to Firestore.
export function sanitize(str, max = 500) {
  if (typeof str !== 'string') return ''
  return str.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '').trim().slice(0, max)
}
