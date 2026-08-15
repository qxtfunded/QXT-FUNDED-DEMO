import { Wrench } from 'lucide-react'
import { TrendingUp } from 'lucide-react'

export default function Maintenance() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-radial-glow px-6 text-center">
      <div className="absolute inset-0 bg-grid-fade bg-grid opacity-30" />
      <div className="relative">
        <div className="mx-auto flex items-center justify-center gap-2.5">
          <img
            src="/logo.png"
            alt="QXT Funded"
            className="h-8 w-8 rounded-lg object-cover border border-white/10 shadow-sm"
          />
          <span className="font-display text-lg font-semibold">
            <span className="text-gold-400">QXT</span> Funded
          </span>
        </div>
        <div className="mx-auto mt-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-gold-500/30 bg-gold-500/10 text-gold-400 animate-floatSlow">
          <Wrench size={28} />
        </div>
        <h1 className="mt-6 font-display text-3xl font-semibold">Scheduled Maintenance</h1>
        <p className="mx-auto mt-3 max-w-md text-paper-400">
          We're making improvements to serve you better. Trading platforms and dashboards will
          be back online shortly. Thank you for your patience.
        </p>
      </div>
    </div>
  )
}
