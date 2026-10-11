import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle, 
  Target, 
  Award, 
  ShieldCheck, 
  ArrowRight, 
  Zap, 
  TrendingUp, 
  Clock, 
  DollarSign, 
  Sparkles 
} from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      step: '01',
      title: 'Choose Account & Broker',
      subtitle: 'Pass Phase 1 (8% Profit Target)',
      desc: 'Select your preferred capital tier ($10K - $200K) and connect Quotex, Pocket Option, Binomo, Olymp Trade, or MT5. Hit an 8% profit target over a minimum of 3 trading days without touching the 5% daily drawdown or 10% max total loss limit.',
      badge: 'Evaluation Phase',
      icon: Target,
    },
    {
      step: '02',
      title: 'Verification Confirmation',
      subtitle: 'Pass Phase 2 (5% Profit Target)',
      desc: 'Prove your consistency with a relaxed 5% profit target. Keep your risk strictly disciplined. There is no time limit—trade at your own pace until target completion.',
      badge: 'Consistency Check',
      icon: ShieldCheck,
    },
    {
      step: '03',
      title: 'Simulated Funded Trader',
      subtitle: 'Earn Up to 90% Profit Split',
      desc: 'Unlock your official funded trader dashboard credentials. Trade virtual funds and withdraw 80% to 90% of all generated gains directly to your USDT (TRC20, BEP20, ERC20) or Bitcoin address.',
      badge: 'Funded Trader',
      icon: Award,
    },
  ];

  const scalingTiers = [
    { month: 'Start', balance: '$100,000', split: '80%' },
    { month: 'Month 4', balance: '$125,000', split: '85%' },
    { month: 'Month 8', balance: '$200,000', split: '90%' },
    { month: 'Month 12', balance: '$500,000', split: '90%' },
    { month: 'Month 16', balance: '$2,000,000 (Max)', split: '90%' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">
      {/* Hero */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
          <Sparkles className="w-3.5 h-3.5" />
          The Path to Capital
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
          How QXT Funded Works
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          From registration to your first crypto payout. A transparent, rules-based prop firm journey designed by traders for traders.
        </p>
      </div>

      {/* 3 Steps Timeline */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        {steps.map((st, idx) => {
          const Icon = st.icon;
          return (
            <div
              key={idx}
              className="glass-card p-8 rounded-3xl border border-slate-800 space-y-6 relative flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-4xl font-black font-mono text-emerald-400/30">{st.step}</span>
                  <span className="text-[10px] font-mono uppercase bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-full border border-emerald-500/30">
                    {st.badge}
                  </span>
                </div>

                <div className="w-12 h-12 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-emerald-400">
                  <Icon className="w-6 h-6" />
                </div>

                <div>
                  <h3 className="text-xl font-extrabold text-white">{st.title}</h3>
                  <p className="text-xs text-emerald-400 font-semibold mt-0.5">{st.subtitle}</p>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">{st.desc}</p>
              </div>

              <div className="pt-4 border-t border-slate-800/80">
                <span className="text-[11px] text-slate-400 font-medium">Fast Track: Pass in 3 days min.</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Scaling Plan */}
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-slate-800 space-y-8">
        <div className="space-y-2">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-emerald-400" />
            Account Scaling Plan Up To $2,000,000
          </h3>
          <p className="text-slate-400 text-sm">
            Generate 10% net profit over a 4-month period with positive months, and we will scale your balance by 25% to 50% and elevate your profit split to 90%.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {scalingTiers.map((tier, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
              <span className="text-xs text-slate-400 font-mono">{tier.month}</span>
              <p className="text-lg font-bold text-white">{tier.balance}</p>
              <span className="text-xs text-emerald-400 font-semibold block">{tier.split} Split</span>
            </div>
          ))}
        </div>
      </div>

      {/* Call to action */}
      <div className="text-center pt-4">
        <Link
          to="/checkout"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-base shadow-xl shadow-emerald-500/20 transition-all hover:scale-105"
        >
          Select Your Challenge
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}
