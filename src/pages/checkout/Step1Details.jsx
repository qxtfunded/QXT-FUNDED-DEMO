import React, { useState } from 'react';
import { 
  PLANS_DATA, 
  BROKERS_DATA, 
  useCheckout 
} from '../../lib/CheckoutContext';
import { 
  Check, 
  Tag, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles,
  Info
} from 'lucide-react';

export default function Step1Details({ onNext }) {
  const {
    selectedPlan,
    setSelectedPlan,
    selectedBroker,
    setSelectedBroker,
    evaluationType,
    setEvaluationType,
    customerDetails,
    setCustomerDetails,
    promoCode,
    setPromoCode,
    promoApplied,
    applyPromo,
    discountPercent,
    calculateFinalPrice
  } = useCheckout();

  const [couponInput, setCouponInput] = useState(promoCode);
  const [couponMsg, setCouponMsg] = useState(promoApplied ? '10% discount applied!' : '');
  const [errors, setErrors] = useState({});

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const res = applyPromo(couponInput);
    setCouponMsg(res.message);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCustomerDetails(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateAndProceed = (e) => {
    e.preventDefault();
    const errs = {};
    if (!customerDetails.firstName.trim()) errs.firstName = 'First name is required';
    if (!customerDetails.lastName.trim()) errs.lastName = 'Last name is required';
    if (!customerDetails.email.trim()) {
      errs.email = 'Email is required for credentials dispatch';
    } else if (!/\S+@\S+\.\S+/.test(customerDetails.email)) {
      errs.email = 'Enter a valid email address';
    }
    if (!customerDetails.agreementAccepted) {
      errs.agreement = 'You must accept the terms & risk agreement';
    }

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    onNext();
  };

  const finalPrice = calculateFinalPrice();

  return (
    <form onSubmit={validateAndProceed} className="space-y-8">
      {/* Plan & Broker Selection Matrix */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-mono">1</span>
          Configure Your Evaluation Account
        </h3>

        {/* Evaluation Model */}
        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-2">Evaluation Model</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: '2-step', label: '2-Step Standard', sub: '8% / 5% Profit Target' },
              { id: '1-step', label: '1-Step Speedy', sub: '10% Target (Accelerated)' },
              { id: 'instant', label: 'Instant Funded', sub: 'No Evaluation Required' },
            ].map(m => (
              <button
                key={m.id}
                type="button"
                onClick={() => setEvaluationType(m.id)}
                className={`p-3 rounded-2xl text-left border transition-all ${
                  evaluationType === m.id
                    ? 'bg-emerald-500/10 border-emerald-500 text-white shadow-md shadow-emerald-500/10'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <p className="text-xs font-bold">{m.label}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{m.sub}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Capital Tier */}
        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-2">Account Balance Size</label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {PLANS_DATA.map(p => (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelectedPlan(p)}
                className={`p-3 rounded-2xl text-center border transition-all ${
                  selectedPlan.id === p.id
                    ? 'bg-slate-900 border-emerald-500 text-white ring-1 ring-emerald-500 shadow-md shadow-emerald-500/20'
                    : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <span className="text-xs font-mono block text-slate-400">{p.badge}</span>
                <strong className="text-base font-extrabold text-white block mt-1">{p.capital}</strong>
                <span className="text-xs text-emerald-400 font-bold block mt-1">${p.discountPrice}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Broker Selection */}
        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-2">Select Trading Platform / Broker</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {BROKERS_DATA.map(b => (
              <button
                key={b.id}
                type="button"
                onClick={() => setSelectedBroker(b)}
                className={`p-3 rounded-2xl text-center border transition-all ${
                  selectedBroker.id === b.id
                    ? 'bg-slate-900 border-cyan-400 text-white ring-1 ring-cyan-400'
                    : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <span className="text-2xl block">{b.icon}</span>
                <strong className="text-xs font-bold text-white block mt-1">{b.name}</strong>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Trader Information */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-mono">2</span>
          Account Dispatch Information
        </h3>
        <p className="text-xs text-slate-400">
          Your simulated login credentials and platform key will be delivered to this email address automatically.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">First Name *</label>
            <input
              type="text"
              name="firstName"
              value={customerDetails.firstName}
              onChange={handleInputChange}
              placeholder="e.g. Alex"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
            {errors.firstName && <p className="text-[11px] text-rose-400 mt-1">{errors.firstName}</p>}
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Last Name *</label>
            <input
              type="text"
              name="lastName"
              value={customerDetails.lastName}
              onChange={handleInputChange}
              placeholder="e.g. Rivers"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
            {errors.lastName && <p className="text-[11px] text-rose-400 mt-1">{errors.lastName}</p>}
          </div>

          <div className="sm:col-span-2">
            <label className="text-xs font-semibold text-slate-300 block mb-1">Email Address (For Credentials Delivery) *</label>
            <input
              type="email"
              name="email"
              value={customerDetails.email}
              onChange={handleInputChange}
              placeholder="trader@domain.com"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
            {errors.email && <p className="text-[11px] text-rose-400 mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Country of Residence</label>
            <input
              type="text"
              name="country"
              value={customerDetails.country}
              onChange={handleInputChange}
              placeholder="United States / United Kingdom"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Discord / Telegram (Optional)</label>
            <input
              type="text"
              name="discordUsername"
              value={customerDetails.discordUsername}
              onChange={handleInputChange}
              placeholder="@username"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Promo code bar */}
        <div className="pt-2 border-t border-slate-800/80">
          <label className="text-xs font-semibold text-slate-300 block mb-1">Promo Code / Coupon</label>
          <div className="flex gap-2 max-w-md">
            <input
              type="text"
              value={couponInput}
              onChange={(e) => setCouponInput(e.target.value)}
              placeholder="Enter promo code (e.g. EDGE10)"
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white uppercase font-mono focus:outline-none focus:border-emerald-500"
            />
            <button
              type="button"
              onClick={handleApplyCoupon}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition-colors"
            >
              Apply
            </button>
          </div>
          {couponMsg && (
            <p className="text-[11px] text-emerald-400 font-mono mt-1 flex items-center gap-1">
              <Check className="w-3.5 h-3.5" />
              {couponMsg}
            </p>
          )}
        </div>

        {/* Agreement checkbox */}
        <div className="pt-2">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="agreementAccepted"
              checked={customerDetails.agreementAccepted}
              onChange={handleInputChange}
              className="w-4 h-4 rounded mt-0.5 bg-slate-950 border-slate-800 text-emerald-500 focus:ring-emerald-500"
            />
            <span className="text-xs text-slate-400">
              I agree to the <strong className="text-slate-300">Evaluation Rules</strong> (5% daily loss limit, 10% maximum drawdown) and acknowledge that all trading occurs in simulated environments with demo accounts.
            </span>
          </label>
          {errors.agreement && <p className="text-[11px] text-rose-400 mt-1">{errors.agreement}</p>}
        </div>
      </div>

      {/* Order Summary & Button */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-xs text-slate-400 block font-mono">Selected Order Summary</span>
          <h4 className="text-xl font-bold text-white mt-0.5">
            {selectedPlan.capital} ({selectedBroker.name})
          </h4>
          <span className="text-xs text-emerald-400">
            {promoApplied ? `Promo discount active (-${discountPercent}%)` : 'Standard fee'} • 100% Refundable
          </span>
        </div>

        <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
          <div className="text-right">
            <span className="text-xs text-slate-400 block">Total Due</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-emerald-400">${finalPrice}.00</span>
              {promoApplied && <span className="text-xs text-slate-500 line-through">${selectedPlan.price}</span>}
            </div>
          </div>

          <button
            type="submit"
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-sm shadow-xl shadow-emerald-500/20 hover:scale-105 transition-all flex items-center gap-2"
          >
            Proceed to Payment
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </form>
  );
}
