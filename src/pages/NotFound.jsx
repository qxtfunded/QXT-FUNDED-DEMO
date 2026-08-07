import { Compass } from 'lucide-react'
import Button from '../components/ui/Button'
import EquityCurve from '../components/sections/EquityCurve'

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-radial-glow px-6 text-center">
      <div className="absolute inset-0 bg-grid-fade bg-grid opacity-30" />
      <EquityCurve />
      <div className="relative">
        <p className="num font-display text-7xl font-bold text-gold-400/90 sm:text-8xl">404</p>
        <h1 className="mt-4 font-display text-2xl font-semibold sm:text-3xl">
          This page left the market
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-paper-400">
          The page you're looking for doesn't exist or has moved.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button to="/" size="lg">
            <Compass size={18} /> Back to Home
          </Button>
          <Button to="/support" size="lg" variant="secondary">
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  )
}
