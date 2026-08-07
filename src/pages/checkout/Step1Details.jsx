import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, AlertCircle, Check } from 'lucide-react'
import { useCheckout, BROKERS } from '../../lib/CheckoutContext'
import CheckoutHeader from '../../components/checkout/CheckoutHeader'

export default function Step1Details() {
  const navigate = useNavigate()
  const { planParam, broker, setBroker } = useCheckout()
  const [error, setError] = useState('')

  const handleNext = (e) => {
    e.preventDefault()
    setError('')

    if (!broker) {
      return setError('Please select a broker partner.')
    }

    navigate(`/checkout/payment?plan=${planParam}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen pt-24 pb-20 bg-ink-950 text-paper-50">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <CheckoutHeader currentStep={1} />

        {error && (
          <div className="mb-6 flex items-center gap-3 rounded-2xl border border-signal-error/40 bg-signal-error/10 p-4 text-sm text-signal-error">
            <AlertCircle size={20} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleNext} className="space-y-8">
          {/* Broker Selection Section */}
          <div className="space-y-4">
            <h2 className="font-display text-lg font-bold text-paper-50 sm:text-2xl tracking-tight">
              1. Select Your Broker Partner
            </h2>

            <div className="grid grid-cols-2 gap-2.5 sm:gap-4 sm:grid-cols-3 md:grid-cols-5">
              {BROKERS.map((b) => {
                const isSelected = broker === b.name
                return (
                  <div
                    key={b.name}
                    onClick={() => setBroker(b.name)}
                    className={`cursor-pointer rounded-2xl border p-3.5 sm:p-5 text-center transition-all flex flex-col items-center justify-center gap-2 sm:gap-3 min-h-[110px] sm:min-h-[135px] ${
                      isSelected
                        ? 'border-amber-400 bg-amber-500/10 shadow-lg shadow-amber-500/10 ring-2 ring-amber-400/50'
                        : 'border-white/10 bg-ink-900/80 hover:border-white/25 hover:bg-ink-900'
                    }`}
                  >
                    <div className="relative">
                      {b.logo}
                      {isSelected && (
                        <div className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-amber-400 text-ink-950 shadow-md">
                          <Check size={12} strokeWidth={3} />
                        </div>
                      )}
                    </div>
                    <span className="font-bold text-xs sm:text-sm md:text-base text-paper-50">{b.name}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* CTA Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 py-4 px-6 text-base font-extrabold text-ink-950 shadow-xl shadow-amber-500/20 hover:brightness-110 active:scale-[0.99] transition-all"
          >
            <span>Continue to Payment</span>
            <ArrowRight size={20} />
          </button>
        </form>
      </div>
    </div>
  )
}
