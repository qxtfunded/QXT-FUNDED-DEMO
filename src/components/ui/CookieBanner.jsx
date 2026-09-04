import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Cookie, X } from 'lucide-react'
import Button from './Button'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      const consent = localStorage.getItem('qxt_cookie_consent')
      if (!consent) {
        // Show after small initial delay so page finishes initial load smoothly
        const timer = setTimeout(() => setVisible(true), 800)
        return () => clearTimeout(timer)
      }
    } catch (e) {
      // Ignore local storage error
    }
  }, [])

  const handleConsent = (level) => {
    try {
      localStorage.setItem('qxt_cookie_consent', level)
    } catch (e) {
      // Ignore
    }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="region"
      aria-label="Cookie consent notice"
      className="fixed bottom-4 inset-x-4 z-40 mx-auto max-w-4xl transition-all duration-300 animate-fadeIn"
    >
      <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-ink-900/95 p-4 sm:p-5 shadow-2xl backdrop-blur-xl md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-3.5 pr-2">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gold-500/10 text-gold-400 border border-gold-500/20">
            <Cookie size={18} />
          </div>
          <div className="text-xs sm:text-sm text-paper-300 leading-relaxed">
            <p>
              We use functional cookies to safeguard your trader dashboard, maintain active evaluation
              sessions, and secure payments. Learn more in our{' '}
              <Link to="/legal/cookies" className="font-medium text-gold-400 hover:underline">
                Cookies Policy
              </Link>
              .
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 self-end md:self-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleConsent('essential')}
            className="text-xs px-3.5 py-1.5"
          >
            Essential Only
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => handleConsent('all')}
            className="text-xs px-3.5 py-1.5"
          >
            Accept All
          </Button>
          <button
            onClick={() => handleConsent('essential')}
            aria-label="Dismiss cookie notice"
            className="p-1 text-paper-400 hover:text-paper-100 transition-colors ml-1"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
