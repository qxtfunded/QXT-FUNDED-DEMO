import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowRight, X } from 'lucide-react'

const eligibleRoutes = ['/', '/brokers', '/how-it-works', '/reviews']

export default function StickyMobileCTA() {
  const location = useLocation()
  const [dismissed, setDismissed] = useState(false)

  // Only show on specified marketing routes where CTA is directly relevant
  if (dismissed || !eligibleRoutes.includes(location.pathname)) {
    return null
  }

  return (
    <aside
      aria-label="Mobile quick action"
      className="fixed bottom-0 inset-x-0 z-30 sm:hidden border-t border-white/10 bg-ink-950/95 px-4 py-2.5 backdrop-blur-xl shadow-[0_-8px_30px_rgba(0,0,0,0.6)]"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-col min-w-0">
          <span className="text-xs font-semibold text-paper-100 truncate">
            Accounts Up To <span className="text-gold-400">$50,000</span>
          </span>
          <span className="text-[11px] text-paper-400">Keep up to 92% profit split</span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Link
            to="/accounts"
            className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-gold-500 to-gold-400 px-3.5 py-2 text-xs font-bold text-ink-950 shadow-md active:scale-95 transition-transform"
          >
            Get Funded <ArrowRight size={13} />
          </Link>
          <button
            onClick={() => setDismissed(true)}
            aria-label="Dismiss banner"
            className="p-1.5 text-paper-400 hover:text-paper-100 transition-colors"
          >
            <X size={15} />
          </button>
        </div>
      </div>
    </aside>
  )
}
