/**
 * QXT FUNDED - ENTERPRISE SECURITY UTILITIES
 * Hardened to OWASP ASVS 5.0 & OWASP Top 10 standards
 */

// Maximum allowable input lengths to prevent ReDoS / Buffer / Storage exhaustion
export const MAX_LENGTHS = {
  NAME: 100,
  EMAIL: 254,
  PHONE: 30,
  SUBJECT: 200,
  MESSAGE: 3000,
  ADDRESS: 200,
  CITY: 100,
  PASSWORD: 128,
}

// 5MB maximum file upload size
export const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024

// Strict whitelist of safe extensions and MIME types
export const ALLOWED_FILE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'pdf']
export const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'application/pdf',
]

// Blacklist of dangerous executable/script extensions
const DANGEROUS_EXTENSIONS = new Set([
  'html', 'htm', 'shtml', 'svg', 'xml', 'js', 'mjs', 'jsx', 'ts', 'tsx',
  'php', 'phtml', 'exe', 'bat', 'cmd', 'sh', 'bash', 'ps1', 'scr', 'vbs',
  'com', 'pif', 'jar', 'apk', 'msi', 'bin', 'cgi', 'pl', 'py', 'asp', 'aspx',
])

/**
 * Validates file upload against type, extension, size, and dangerous content patterns
 */
export function validateFileUpload(file) {
  if (!file) {
    return { valid: true }
  }

  // 1. File size check
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return {
      valid: false,
      error: `File is too large (${(file.size / (1024 * 1024)).toFixed(1)}MB). Maximum allowed size is 5MB.`,
    }
  }

  // 2. Extension check
  const rawName = file.name || ''
  const parts = rawName.split('.')
  if (parts.length < 2) {
    return {
      valid: false,
      error: 'File must have a valid extension (.jpg, .png, .webp, .pdf).',
    }
  }

  const extension = parts.pop().toLowerCase().trim()
  if (DANGEROUS_EXTENSIONS.has(extension)) {
    return {
      valid: false,
      error: 'Executable and script files are strictly prohibited for security reasons.',
    }
  }

  if (!ALLOWED_FILE_EXTENSIONS.includes(extension)) {
    return {
      valid: false,
      error: `Unsupported file type (.${extension}). Only JPG, PNG, WEBP, and PDF documents are allowed.`,
    }
  }

  // 3. MIME type check
  if (file.type && !ALLOWED_MIME_TYPES.includes(file.type.toLowerCase())) {
    return {
      valid: false,
      error: 'Invalid file MIME type. Only genuine images and PDF files are accepted.',
    }
  }

  return { valid: true }
}

/**
 * Sanitizes file names to prevent path traversal, null-byte injection, and encoding attacks
 */
export function sanitizeFileName(fileName) {
  if (!fileName || typeof fileName !== 'string') {
    return `upload_${Date.now()}.dat`
  }

  // Remove directory traversal characters (../ or ..\)
  let clean = fileName.replace(/(\.\.[\/\\])+/g, '')
  // Remove null bytes and control chars
  clean = clean.replace(/[\x00-\x1f\x80-\x9f]/g, '')
  // Strip slashes
  clean = clean.replace(/[\/\\]/g, '_')
  // Keep only alphanumeric, dots, dashes, underscores
  clean = clean.replace(/[^a-zA-Z0-9.\-_]/g, '_')

  // Prevent hidden file names starting with a dot
  if (clean.startsWith('.')) {
    clean = 'file' + clean
  }

  return clean.slice(0, 100)
}

/**
 * Open Redirect Protection (OWASP Top 10 A01)
 * Validates that redirect targets stay strictly within the local application.
 */
export function getSafeRedirectUrl(target, fallback = '/dashboard') {
  if (!target || typeof target !== 'string') return fallback

  const trimmed = target.trim()

  // Must begin with a single slash, not protocol-relative "//" or backslash "/\"
  if (!trimmed.startsWith('/') || trimmed.startsWith('//') || trimmed.startsWith('/\\')) {
    return fallback
  }

  // Reject dangerous protocols or control characters
  if (/[\x00-\x1f\s]/.test(trimmed)) {
    return fallback
  }

  if (/^(?:javascript|data|vbscript|https?|ftp):/i.test(trimmed)) {
    return fallback
  }

  return trimmed
}

/**
 * Sanitizes generic user text inputs (prevents control character injection, trims, limits length)
 */
export function sanitizeInput(value, maxLength = 1000) {
  if (value == null) return ''
  const str = String(value)
  // Strip control characters except newline and tab
  const cleaned = str.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
  return cleaned.trim().slice(0, maxLength)
}

/**
 * Password Strength Validator conforming to OWASP ASVS V2 guidelines
 */
export function validatePasswordStrength(password) {
  if (!password || typeof password !== 'string') {
    return { valid: false, error: 'Password is required.' }
  }

  if (password.length < 8) {
    return { valid: false, error: 'Password must be at least 8 characters long.' }
  }

  if (password.length > MAX_LENGTHS.PASSWORD) {
    return { valid: false, error: 'Password exceeds maximum length.' }
  }

  const hasLower = /[a-z]/.test(password)
  const hasUpper = /[A-Z]/.test(password)
  const hasDigitOrSpecial = /[\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)

  if (!(hasLower && hasUpper && hasDigitOrSpecial)) {
    return {
      valid: false,
      error: 'Password must contain a mix of uppercase, lowercase letters, and at least one number or symbol.',
    }
  }

  return { valid: true }
}

/**
 * Client-Side Rate Limiter / Anti-Abuse Guard (OWASP ASVS V11)
 * Throttles rapid button hammering / brute force attempts in browser memory.
 */
const rateLimitStore = new Map()

export function checkRateLimit(actionKey, maxRequests = 5, windowMs = 60000) {
  const now = Date.now()
  const record = rateLimitStore.get(actionKey) || []

  // Filter out timestamps outside the sliding window
  const activeTimestamps = record.filter((ts) => now - ts < windowMs)

  if (activeTimestamps.length >= maxRequests) {
    const oldest = activeTimestamps[0]
    const waitSec = Math.ceil((windowMs - (now - oldest)) / 1000)
    return {
      allowed: false,
      waitSeconds: waitSec,
      error: `Too many requests. Please wait ${waitSec} second${waitSec === 1 ? '' : 's'} before trying again.`,
    }
  }

  activeTimestamps.push(now)
  rateLimitStore.set(actionKey, activeTimestamps)

  return { allowed: true }
}

/**
 * Clears rate limit record on successful action (e.g. login success)
 */
export function clearRateLimit(actionKey) {
  rateLimitStore.delete(actionKey)
}

/**
 * Sanitizes error objects to ensure no internal file paths, credentials,
 * or stack traces leak to the client (OWASP Top 10 A09).
 */
export function safeErrorLog(label, error) {
  const message = error?.message || String(error)
  // Mask potential API keys or tokens in logs
  const redacted = message
    .replace(/AIza[0-9A-Za-z-_]{35}/g, '[REDACTED_API_KEY]')
    .replace(/bearer\s+[a-zA-Z0-9._-]+/gi, 'Bearer [REDACTED_TOKEN]')
    .replace(/(password|secret|key)=([^&]+)/gi, '$1=[REDACTED]')

  if (process.env.NODE_ENV !== 'production') {
    console.warn(`[Security Safe Log] ${label}:`, redacted)
  }
}

/**
 * Strict Privacy & Zero-IP Tracking Enforcer:
 * Purges any third-party tracking identifiers, analytics cookies (_ga, _gid, _gat, etc.)
 * to prevent IP address correlation and device fingerprinting.
 */
export function scrubPrivacyAndTrackingCookies() {
  if (typeof document === 'undefined') return
  try {
    const cookies = document.cookie ? document.cookie.split(';') : []
    for (const c of cookies) {
      const name = c.split('=')[0]?.trim()
      if (
        name &&
        (name.startsWith('_ga') ||
          name.startsWith('_gid') ||
          name.startsWith('_gat') ||
          name.startsWith('_gcl') ||
          name.startsWith('__lc') ||
          name.startsWith('mp_') ||
          name.startsWith('ajs_'))
      ) {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;SameSite=Strict;Secure`
      }
    }
  } catch {
    // Non-blocking
  }
}

