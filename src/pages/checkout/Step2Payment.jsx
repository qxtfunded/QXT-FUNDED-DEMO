import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, ArrowLeft, Tag, Check, AlertCircle } from 'lucide-react'
import { useCheckout, CRYPTO_METHODS } from '../../lib/CheckoutContext'
import CheckoutHeader from '../../components/checkout/CheckoutHeader'

export default function Step2Payment() {
  const navigate = useNavigate()
  const {
    planParam,
    selectedMethodId,
    setSelectedMethodId,
    coupon,
    setCoupon,
    couponApplied,
    setCouponApplied,
  } = useCheckout()

  const VALID_PROMO_CODES = ['QXT10', 'QXT2026', 'SAVE10', 'OFF10', 'PROMO10', 'DISCOUNT10', 'WELCOME10', 'QXTFUNDED']

  const [showPromoInput, setShowPromoInput] = useState(false)
  const [error, setError] = useState('')
  const [promoMessage, setPromoMessage] = useState('')
  const [promoError, setPromoError] = useState('')

  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase()
    if (!code) {
      setPromoError('Please enter a promo code.')
      setPromoMessage('')
      setCouponApplied(false)
      return
    }

    if (VALID_PROMO_CODES.includes(code)) {
      setCouponApplied(true)
      setPromoError('')
      setPromoMessage(`Coupon "${code}" applied! 10% discount applied to your total.`)
    } else {
      setCouponApplied(false)
      setPromoMessage('')
      setPromoError('Invalid promo code. Please enter a valid coupon code.')
    }
  }

  const removeCoupon = () => {
    setCoupon('')
    setCouponApplied(false)
    setPromoError('')
    setPromoMessage('')
  }

  const handleNext = (e) => {
    e.preventDefault()
    setError('')
    if (!selectedMethodId) {
      return setError('Please select a payment method.')
    }
    navigate(`/checkout/deposit?plan=${planParam}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen pt-24 pb-20 bg-ink-950 text-paper-50">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <CheckoutHeader currentStep={2} />

        {error && (
          <div className="mb-6 flex items-center gap-3 rounded-2xl border border-signal-error/40 bg-signal-error/10 p-4 text-sm text-signal-error">
            <AlertCircle size={20} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleNext} className="space-y-8">
          {/* Promo Code Section */}
          <div>
            {!showPromoInput && !couponApplied ? (
              <button
                type="button"
                onClick={() => setShowPromoInput(true)}
                className="text-sm font-semibold text-amber-400 hover:text-amber-300 underline underline-offset-4 flex items-center gap-1.5 transition-colors"
              >
                <Tag size={16} /> I have a promo code
              </button>
            ) : (
              <div className="rounded-2xl border border-white/10 bg-ink-900/80 p-4 max-w-md space-y-2">
                <label className="text-xs font-semibold text-paper-300 block">Promo Coupon Code</label>
                <div className="flex gap-2">
                  <input
                    value={coupon}
                    onChange={(e) => {
                      setCoupon(e.target.value)
                      if (couponApplied) setCouponApplied(false)
                      if (promoError) setPromoError('')
                      if (promoMessage) setPromoMessage('')
                    }}
                    placeholder="Enter coupon code"
                    className="flex-1 rounded-xl border border-white/15 bg-ink-950 px-3.5 py-2.5 text-sm uppercase placeholder:text-paper-500 placeholder:normal-case focus:border-amber-400 focus:outline-none"
                  />
                  {couponApplied ? (
                    <button
                      type="button"
                      onClick={removeCoupon}
                      className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-2.5 text-xs font-bold text-red-400 hover:bg-red-500/20 transition-all"
                    >
                      Remove
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={applyCoupon}
                      className="rounded-xl bg-amber-500 px-4 py-2.5 text-xs font-bold text-ink-950 hover:bg-amber-400 transition-all"
                    >
                      Apply
                    </button>
                  )}
                </div>
                {couponApplied && (
                  <p className="text-xs text-mint-400 font-semibold flex items-center gap-1 pt-1">
                    <Check size={14} /> {promoMessage || 'Coupon applied! 10% discount applied to your total.'}
                  </p>
                )}
                {promoError && (
                  <p className="text-xs text-red-400 font-semibold flex items-center gap-1 pt-1">
                    <AlertCircle size={14} /> {promoError}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Payment Methods Section */}
          <div className="space-y-4">
            <h2 className="font-display text-lg font-bold text-paper-50 sm:text-2xl tracking-tight">
              Select Payment Method (Crypto)
            </h2>

            <div className="grid grid-cols-2 gap-2.5 sm:gap-4 sm:grid-cols-3 md:grid-cols-5">
              {CRYPTO_METHODS.map((m) => {
                const isSelected = selectedMethodId === m.id
                return (
                  <div
                    key={m.id}
                    onClick={() => setSelectedMethodId(m.id)}
                    className={`cursor-pointer rounded-2xl border p-3.5 sm:p-5 text-center transition-all flex flex-col items-center justify-center gap-2 sm:gap-3 min-h-[110px] sm:min-h-[135px] ${
                      isSelected
                        ? 'border-amber-400 bg-amber-500/10 shadow-lg shadow-amber-500/10 ring-2 ring-amber-400/50'
                        : 'border-white/10 bg-ink-900/80 hover:border-white/25 hover:bg-ink-900'
                    }`}
                  >
                    <div className="relative">
                      {m.logo}
                      {isSelected && (
                        <div className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-amber-400 text-ink-950 shadow-md">
                          <Check size={12} strokeWidth={3} />
                        </div>
                      )}
                    </div>
                    <span className="font-bold text-xs sm:text-sm md:text-base text-paper-50">{m.name}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-4 pt-4">
            <button
              type="button"
              onClick={() => {
                navigate(`/checkout/details?plan=${planParam}`)
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-ink-900/90 px-6 py-4 font-bold text-paper-200 hover:border-white/30 hover:bg-ink-800 transition-all w-1/3"
            >
              <ArrowLeft size={18} /> Back
            </button>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 py-4 px-6 text-base font-extrabold text-ink-950 shadow-xl shadow-amber-500/20 hover:brightness-110 active:scale-[0.99] transition-all w-2/3"
            >
              <span>Proceed to Payment</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
