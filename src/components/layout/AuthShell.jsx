import { Link } from 'react-router-dom'
import { TrendingUp, ShieldCheck, Zap, Wallet2 } from 'lucide-react'
import EquityCurve from '../sections/EquityCurve'

export default function AuthShell({ children, title, subtitle }) {
  return (
    <div className="flex min-h-screen bg-ink-950">
      {/* Form side */}
      <div className="flex w-full flex-col justify-center px-6 py-12 sm:px-12 lg:w-1/2 lg:px-20">
        <Link to="/" className="mb-10 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-gold-300 to-gold-600 text-ink-950">
            <TrendingUp size={18} strokeWidth={2.5} />
          </span>
          <span className="font-display text-lg font-semibold">
            <span className="text-gold-400">QXT</span> Funded
          </span>
        </Link>

        <div className="mx-auto w-full max-w-sm">
          <h1 className="font-display text-3xl font-semibold">{title}</h1>
          {subtitle && <p className="mt-2 text-sm text-paper-400">{subtitle}</p>}
          <div className="mt-8">{children}</div>
        </div>
      </div>

      {/* Illustration side */}
      <div className="relative hidden w-1/2 overflow-hidden border-l border-white/[0.06] bg-ink-900 lg:block">
        <div className="absolute inset-0 bg-radial-glow" />
        <div className="absolute inset-0 bg-grid-fade bg-grid opacity-40" />
        <EquityCurve />
        <div className="relative flex h-full flex-col justify-end p-16">
          <blockquote className="font-display text-2xl font-medium leading-snug text-paper-100">
            "The clearest rules and the fastest payouts of any firm I've traded with."
          </blockquote>
          <p className="mt-4 text-sm text-paper-400">Sarah P. — Funded Trader, UK</p>

          <div className="mt-10 grid grid-cols-3 gap-4 border-t border-white/[0.06] pt-8">
            {[
              { icon: Zap, label: 'Instant setup' },
              { icon: ShieldCheck, label: 'Transparent rules' },
              { icon: Wallet2, label: '92% split' },
            ].map((f) => (
              <div key={f.label} className="flex flex-col items-start gap-2">
                <f.icon size={18} className="text-gold-400" />
                <span className="text-xs text-paper-400">{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
