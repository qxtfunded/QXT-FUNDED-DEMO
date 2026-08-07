import { Link } from 'react-router-dom'
import { TrendingUp, Twitter, Send, Instagram } from 'lucide-react'

const columns = [
  {
    title: 'Product',
    links: [
      { to: '/accounts', label: 'Accounts' },
      { to: '/brokers', label: 'Brokers' },
      { to: '/how-it-works', label: 'How It Works' },
      { to: '/reviews', label: 'Reviews' },
    ],
  },
  {
    title: 'Support',
    links: [
      { to: '/faq', label: 'FAQ' },
      { to: '/support', label: 'Support Center' },
      { to: '/contact', label: 'Contact Us' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { to: '/legal/terms', label: 'Terms & Agreement' },
      { to: '/legal/privacy', label: 'Privacy Agreement' },
      { to: '/legal/refund', label: 'Refund Policy' },
      { to: '/legal/risk', label: 'Risk Disclosure' },
      { to: '/legal/cookies', label: 'Cookies' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-ink-900">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-gold-300 to-gold-600 text-ink-950">
                <TrendingUp size={18} strokeWidth={2.5} />
              </span>
              <span className="font-display text-lg font-semibold">
                <span className="text-gold-400">QXT</span> Funded
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper-400">
              Simulated evaluations for aspiring traders. Prove your edge, get funded, and keep
              up to 92% of the profits you generate on your funded account.
            </p>
            <div className="mt-6 flex gap-3">
              {[Twitter, Send, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-paper-400 transition-colors hover:border-gold-500/40 hover:text-gold-400"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-display text-sm font-semibold text-paper-100">{col.title}</h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="text-sm text-paper-400 transition-colors hover:text-gold-400"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 border-t border-white/[0.06] pt-8">
          <p className="text-xs leading-relaxed text-paper-500">
            <strong className="text-paper-400">Risk Disclosure:</strong> Evaluation and Instant
            accounts are simulated trading environments funded by account fees; no client funds
            are traded on live markets during the evaluation phase. Profit splits on funded
            accounts are paid from firm capital according to your account agreement. Trading
            involves risk and past performance is not indicative of future results. QXT Funded
            does not provide investment advice.
          </p>
          <div className="mt-4 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
            <p className="text-xs text-paper-500">© 2026 QXT Funded. All rights reserved.</p>
            <p className="font-mono text-xs text-paper-500">Built for traders, by traders.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
