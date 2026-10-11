import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Check, 
  HelpCircle, 
  Zap, 
  ArrowRight, 
  Sparkles, 
  Shield, 
  Flame,
  Award
} from 'lucide-react';
import { PLANS_DATA, BROKERS_DATA, useCheckout } from '../lib/CheckoutContext';

export default function Accounts() {
  const navigate = useNavigate();
  const { setSelectedPlan, setSelectedBroker, setEvaluationType } = useCheckout();
  const [activeTab, setActiveTab] = useState('2-step');

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    setEvaluationType(activeTab);
    navigate('/checkout');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
          <Sparkles className="w-3.5 h-3.5" />
          Transparent Evaluation Models
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
          Simulated Capital Accounts
        </h1>
        <p className="text-slate-400 text-sm sm:text-base">
          Choose between our 2-Step Standard, 1-Step Speedy, or Instant Funded evaluation pathways. All plans feature up to 90% profit split and fee refund on your first payout.
        </p>

        {/* Tab Selector */}
        <div className="pt-4 flex justify-center">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-900 border border-slate-800">
            <button
              onClick={() => setActiveTab('2-step')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === '2-step'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              2-Step Standard (8% + 5% Target)
            </button>
            <button
              onClick={() => setActiveTab('1-step')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === '1-step'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              1-Step Speedy (10% Target)
            </button>
            <button
              onClick={() => setActiveTab('instant')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'instant'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Instant Funding (No Challenge)
            </button>
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {PLANS_DATA.map((plan) => (
          <div
            key={plan.id}
            className={`glass-card rounded-3xl p-6 border transition-all flex flex-col justify-between relative ${
              plan.popular
                ? 'border-emerald-500/80 bg-slate-900/90 shadow-xl shadow-emerald-500/10'
                : 'border-slate-800 bg-slate-900/40 hover:border-slate-700'
            }`}
          >
            {plan.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black text-[10px] px-3 py-0.5 rounded-full uppercase tracking-wider shadow-md">
                Most Popular
              </span>
            )}

            <div className="space-y-4">
              <div>
                <span className="text-xs text-slate-400 font-mono">{plan.badge}</span>
                <h3 className="text-2xl font-extrabold text-white mt-0.5">{plan.capital}</h3>
              </div>

              <div className="py-2 border-y border-slate-800">
                <span className="text-[11px] text-slate-400">One-Time Fee</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-white">${plan.discountPrice}</span>
                  <span className="text-sm text-slate-500 line-through">${plan.price}</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-medium">100% Refundable</span>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-center justify-between">
                  <span className="text-slate-400">Profit Target</span>
                  <strong className="text-white">{plan.profitTarget}</strong>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-slate-400">Max Daily Loss</span>
                  <strong className="text-rose-400">{plan.dailyLoss}</strong>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-slate-400">Max Drawdown</span>
                  <strong className="text-rose-400">{plan.maxDrawdown}</strong>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-slate-400">Min. Trading Days</span>
                  <strong className="text-white">{plan.minTradingDays}</strong>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-slate-400">Profit Split</span>
                  <strong className="text-emerald-400">{plan.profitSplit}</strong>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-slate-400">Leverage</span>
                  <strong className="text-white">{plan.leverage}</strong>
                </li>
              </ul>
            </div>

            <div className="pt-6">
              <button
                onClick={() => handleSelectPlan(plan)}
                className={`w-full py-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 ${
                  plan.popular
                    ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/25'
                    : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                }`}
              >
                Select {plan.capital}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Rules Highlights Matrix */}
      <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Shield className="w-5 h-5 text-emerald-400" />
          Standard Evaluation Rules & Conditions
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-300">
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <h4 className="font-bold text-white flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" />
              Hold Over Weekends Allowed
            </h4>
            <p className="text-slate-400 leading-relaxed">
              Traders have full freedom to swing trade and hold cryptocurrency and forex positions overnight and over weekends without penalties.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <h4 className="font-bold text-white flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" />
              News Trading Allowed
            </h4>
            <p className="text-slate-400 leading-relaxed">
              Trade high-impact news events (CPI, NFP, FOMC) with no restrictions on opening or closing positions during high-volatility releases.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <h4 className="font-bold text-white flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" />
              Binary & OTC Compatible
            </h4>
            <p className="text-slate-400 leading-relaxed">
              Use your edge on Quotex, Pocket Option, or Binomo binary options and OTC weekend feeds with guaranteed fast execution.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
