import React from 'react';
import { 
  CRYPTO_METHODS, 
  useCheckout 
} from '../../lib/CheckoutContext';
import { 
  Coins, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  Zap, 
  Clock, 
  CheckCircle2 
} from 'lucide-react';

export default function Step2Payment({ onNext, onBack }) {
  const {
    selectedCrypto,
    setSelectedCrypto,
    selectedPlan,
    calculateFinalPrice
  } = useCheckout();

  const finalPrice = calculateFinalPrice();

  return (
    <div className="space-y-8">
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Coins className="w-5 h-5 text-emerald-400" />
            Select Cryptocurrency Payment Method
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Choose your preferred blockchain network. USDT TRC-20 and BEP-20 offer the fastest verification and lowest network gas fees.
          </p>
        </div>

        {/* Crypto Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CRYPTO_METHODS.map((crypto) => {
            const isSelected = selectedCrypto.id === crypto.id;
            return (
              <button
                key={crypto.id}
                type="button"
                onClick={() => setSelectedCrypto(crypto)}
                className={`p-5 rounded-2xl text-left border transition-all flex flex-col justify-between space-y-4 ${
                  isSelected
                    ? 'bg-slate-900 border-emerald-500 ring-1 ring-emerald-500 shadow-lg shadow-emerald-500/20'
                    : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${crypto.color} flex items-center justify-center text-slate-950 font-bold text-sm shadow-md`}>
                      {crypto.symbol}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-base">{crypto.name}</h4>
                      <p className="text-xs text-slate-400 font-mono">{crypto.network}</p>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                    {crypto.badge}
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    {crypto.confirmations}
                  </span>
                  <span className="text-emerald-400 font-mono">Gas: {crypto.networkFee}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Security notice */}
        <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 flex items-start gap-3 text-xs text-slate-300">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h5 className="font-semibold text-white">Direct Cold-Storage Protocol</h5>
            <p className="text-slate-400 leading-relaxed">
              Payments are routed directly to our secure automated deposit gateway with zero intermediary conversion deductions. You will receive an exact payment address and QR code in the next step.
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-semibold text-sm transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Details
        </button>

        <button
          type="button"
          onClick={onNext}
          className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-sm shadow-xl shadow-emerald-500/20 hover:scale-105 transition-all flex items-center gap-2"
        >
          Generate Deposit Address (${finalPrice}.00)
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
