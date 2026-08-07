import { RefreshCw, AlertTriangle } from 'lucide-react'
import Button from '../components/ui/Button'

export default function ServerError() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-radial-glow px-6 text-center">
      <div className="absolute inset-0 bg-grid-fade bg-grid opacity-30" />
      <div className="relative">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-signal-error/30 bg-signal-error/10 text-signal-error">
          <AlertTriangle size={28} />
        </div>
        <p className="num mt-6 font-display text-6xl font-bold text-paper-100 sm:text-7xl">500</p>
        <h1 className="mt-4 font-display text-2xl font-semibold sm:text-3xl">
          Something broke on our end
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-paper-400">
          Our team has been notified. Try refreshing, or come back in a few minutes.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button size="lg" onClick={() => window.location.reload()}>
            <RefreshCw size={18} /> Try Again
          </Button>
          <Button to="/" size="lg" variant="secondary">
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  )
}
