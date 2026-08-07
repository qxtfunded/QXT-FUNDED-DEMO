import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Copy, Check, QrCode, Lock, ArrowLeft, AlertCircle } from 'lucide-react'
import { Card, Badge } from '../../components/ui/Primitives'
import { Checkbox } from '../../components/ui/Form'
import { useCheckout } from '../../lib/CheckoutContext'
import { createOrder } from '../../lib/firestore'
import CheckoutHeader from '../../components/checkout/CheckoutHeader'

export default function Step3Deposit() {
  const navigate = useNavigate()
  const {
    plan,
    planParam,
    fullname,
    email,
    phone,
    country,
    address,
    city,
    broker,
    selectedMethod,
    agreed,
    setAgreed,
    discount,
    total,
    user,
  } = useCheckout()

  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedMethod.address)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!agreed) return setError('Please accept the Terms & Agreement before completing your order.')

    setSubmitting(true)
    try {
      const newOrder = await createOrder({
        userId: user?.uid || 'guest-user',
        userName: fullname || 'Valued Trader',
        userEmail: email || 'trader@example.com',
        userPhone: phone,
        userCountry: country,
        address,
        city,
        broker,
        paymentMethod: selectedMethod.name,
        planName: plan.name || 'Funded Account',
        type: plan.type === 'instant' ? 'Instant' : 'Challenge',
        size: plan.size,
        price: total,
        discount,
      })
      navigate(`/dashboard/orders/${newOrder.id || newOrder.orderNumber}`)
    } catch (err) {
      console.error(err)
      setError(err.message || 'Failed to submit order. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
    selectedMethod.address
  )}`

  return (
    <div className="min-h-screen pt-24 pb-20 bg-ink-950 text-paper-50">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <CheckoutHeader currentStep={3} />

        {error && (
          <div className="mb-6 flex items-center gap-3 rounded-2xl border border-signal-error/40 bg-signal-error/10 p-4 text-sm text-signal-error">
            <AlertCircle size={20} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-6">
          <Card className="p-6 sm:p-8" hover={false}>
            <div className="flex items-center justify-between border-b border-white/10 pb-5 mb-6">
              <div>
                <h2 className="font-display text-xl font-bold text-paper-50">Deposit & Confirm</h2>
                <p className="text-xs text-paper-400">
                  Send payment to the wallet address below to instantly activate your account
                </p>
              </div>
              <Badge tone="gold" className="text-xs px-3 py-1 font-bold">
                Broker: {broker}
              </Badge>
            </div>

            {/* Wallet Box */}
            <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-b from-ink-900 to-ink-950 p-4 sm:p-6 shadow-2xl space-y-4 sm:space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-4 gap-3">
                <div className="flex items-center gap-3">
                  {selectedMethod.logo}
                  <div>
                    <span className="font-bold text-sm sm:text-base text-paper-50">{selectedMethod.name}</span>
                    <p className="text-xs text-paper-400">{selectedMethod.network}</p>
                  </div>
                </div>
                <div className="sm:text-right flex sm:block items-baseline justify-between">
                  <span className="text-xs text-paper-400">Total Amount: </span>
                  <span className="font-display text-xl sm:text-2xl font-extrabold text-amber-400 num ml-2 sm:ml-0 sm:block">${total} USD</span>
                </div>
              </div>

              <div className="flex flex-col items-center gap-5 md:flex-row md:items-start">
                {/* QR Code */}
                <div className="flex shrink-0 flex-col items-center gap-2">
                  <div className="rounded-2xl border border-white/15 bg-white p-2.5 sm:p-3 shadow-xl">
                    <img
                      src={qrUrl}
                      alt={`${selectedMethod.name} QR Code`}
                      className="h-36 w-36 sm:h-44 sm:w-44 object-contain"
                      onError={(e) => {
                        e.target.onerror = null
                        e.target.style.display = 'none'
                      }}
                    />
                  </div>
                  <span className="flex items-center gap-1.5 text-xs text-paper-400 font-semibold">
                    <QrCode size={14} className="text-amber-400" /> Scan QR Code
                  </span>
                </div>

                {/* Address Box */}
                <div className="flex-1 space-y-4 w-full">
                  <div>
                    <label className="text-xs font-semibold text-paper-200 block mb-2">
                      Deposit Address ({selectedMethod.network})
                    </label>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                      <input
                        readOnly
                        value={selectedMethod.address}
                        className="w-full rounded-xl border border-white/20 bg-ink-950 px-3.5 py-3 num text-xs sm:text-sm font-semibold text-amber-300 focus:outline-none shadow-inner"
                      />
                      <button
                        type="button"
                        onClick={handleCopy}
                        className="flex h-11 sm:h-12 shrink-0 items-center justify-center gap-2 rounded-xl border border-amber-500/40 bg-amber-500/15 px-4 text-xs font-bold text-amber-300 hover:bg-amber-500/25 transition-all"
                      >
                        {copied ? (
                          <>
                            <Check size={16} className="text-mint-400" /> Copied!
                          </>
                        ) : (
                          <>
                            <Copy size={16} /> Copy
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-xs text-paper-300 space-y-2">
                    <div className="flex items-center gap-2 text-amber-400 font-semibold">
                      <Lock size={14} /> Send Exact Payment
                    </div>
                    <p className="text-paper-400 leading-relaxed">
                      Please send exactly <strong className="text-amber-300">${total} USD</strong> equivalent on the{' '}
                      <strong className="text-paper-100">{selectedMethod.network}</strong> network.
                    </p>
                    <p className="text-paper-400 text-[11px]">
                      After transferring, click <strong>"I have paid"</strong> to register your account credentials.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Checkbox
                label="I agree to the Terms & Agreement, Refund Policy, and Risk Disclosure"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
            </div>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-4 pt-2">
            <button
              type="button"
              onClick={() => {
                navigate(`/checkout/payment?plan=${planParam}`)
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-ink-900/90 px-6 py-4 font-bold text-paper-200 hover:border-white/30 hover:bg-ink-800 transition-all w-1/3"
            >
              <ArrowLeft size={18} /> Back
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 py-4 px-6 text-base font-extrabold text-ink-950 shadow-xl shadow-emerald-500/20 hover:brightness-110 active:scale-[0.99] transition-all w-2/3"
            >
              {submitting ? 'Submitting Order…' : 'I have paid'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
