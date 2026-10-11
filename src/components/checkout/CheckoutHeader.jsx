import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { currency } from '../../data/accounts'
import { useCheckout } from '../../lib/CheckoutContext'

export default function CheckoutHeader({ currentStep }) {
  const navigate = useNavigate()
  const { plan, total, planParam } = useCheckout()

  const handleBack = () => {
    if (currentStep === 1) {
      navigate('/accounts')
    } else if (currentStep === 2) {
      navigate(`/checkout/details?plan=${planParam}`)
    } else if (currentStep === 3) {
      navigate(`/checkout/payment?plan=${planParam}`)
    }
  }

  return (
    <div className="mb-6 sm:mb-8 space-y-4 sm:space-y-6">
      {/* Top Bar with Back button and Title */}
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          onClick={handleBack}
          type="button"
          className="flex shrink-0 items-center gap-1.5 sm:gap-2 rounded-xl border border-white/15 bg-ink-900/90 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-paper-200 hover:border-amber-400/50 hover:bg-ink-800 transition-all shadow-md"
        >
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>

        <h1 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-paper-50 tracking-tight">
          Complete Your Purchase
        </h1>
      </div>

      {/* Stepper Bar */}
      <div className="flex items-center justify-between sm:justify-center gap-1 sm:gap-4 py-1.5 px-2 rounded-2xl bg-ink-900/50 border border-white/5">
        {/* Step 1 */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div
            className={`flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full font-bold text-xs sm:text-sm transition-all ${
              currentStep >= 1
                ? 'bg-emerald-500 text-ink-950 font-black shadow-md shadow-emerald-500/20'
                : 'bg-ink-800 text-paper-400 border border-white/10'
            }`}
          >
            1
          </div>
          <span
            className={`text-xs sm:text-sm font-semibold ${
              currentStep >= 1 ? 'text-emerald-400' : 'text-paper-400'
            }`}
          >
            Broker
          </span>
        </div>

        {/* Line 1-2 */}
        <div
          className={`h-[2px] flex-1 max-w-[40px] sm:max-w-[64px] rounded-full transition-all ${
            currentStep >= 2 ? 'bg-emerald-500' : 'bg-white/10'
          }`}
        />

        {/* Step 2 */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div
            className={`flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full font-bold text-xs sm:text-sm transition-all ${
              currentStep >= 2
                ? 'bg-emerald-500 text-ink-950 font-black shadow-md shadow-emerald-500/20'
                : 'bg-ink-800 text-paper-400 border border-white/10'
            }`}
          >
            2
          </div>
          <span
            className={`text-xs sm:text-sm font-semibold ${
              currentStep >= 2 ? 'text-emerald-400' : 'text-paper-400'
            }`}
          >
            Payment
          </span>
        </div>

        {/* Line 2-3 */}
        <div
          className={`h-[2px] flex-1 max-w-[40px] sm:max-w-[64px] rounded-full transition-all ${
            currentStep >= 3 ? 'bg-emerald-500' : 'bg-white/10'
          }`}
        />

        {/* Step 3 */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div
            className={`flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full font-bold text-xs sm:text-sm transition-all ${
              currentStep >= 3
                ? 'bg-emerald-500 text-ink-950 font-black shadow-md shadow-emerald-500/20'
                : 'bg-ink-800 text-paper-400 border border-white/10'
            }`}
          >
            3
          </div>
          <span
            className={`text-xs sm:text-sm font-semibold ${
              currentStep >= 3 ? 'text-emerald-400' : 'text-paper-400'
            }`}
          >
            Confirm
          </span>
        </div>
      </div>

      {/* Selected Plan Banner */}
      <div className="rounded-2xl border border-amber-500/40 bg-gradient-to-r from-amber-500/10 via-ink-900/90 to-ink-950 p-3.5 sm:p-5 flex items-center justify-between shadow-xl">
        <div className="font-bold text-amber-400 text-sm sm:text-lg">
          Selected: {currency(plan.size)}{' '}
          {plan.type === 'instant' ? 'Instant Account' : 'Evaluation Account'}
        </div>
        <div className="font-display font-extrabold text-amber-400 text-lg sm:text-2xl num">
          ${total}
        </div>
      </div>
    </div>
  )
}
