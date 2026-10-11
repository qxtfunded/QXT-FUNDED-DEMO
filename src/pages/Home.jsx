import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  TrendingUp, 
  ShieldCheck, 
  Zap, 
  Lock, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  Globe, 
  Coins, 
  ChevronRight,
  Flame,
  Award,
  Users,
  BarChart3,
  DollarSign,
  HelpCircle,
  EyeOff
} from 'lucide-react';
import { PLANS_DATA, BROKERS_DATA, useCheckout } from '../lib/CheckoutContext';
import { getRotatingEdgeNode } from '../lib/security';

export default function Home() {
  const navigate = useNavigate();
  const { setSelectedPlan, setSelectedBroker, setEvaluationType } = useCheckout();
  const [selectedPlanId, setSelectedPlanId] = useState('50k');
  const [activeStepType, setActiveStepType] = useState('2-step');
  const edgeNode = getRotatingEdgeNode();

  const currentPlan = PLANS_DATA.find(p => p.id === selectedPlanId) || PLANS_DATA[2];

  const handleSelectAndCheckout = (plan, broker = BROKERS_DATA[0]) => {
    setSelectedPlan(plan);
    setSelectedBroker(broker);
    setEvaluationType(activeStepType);
    navigate('/checkout');
  };

  const payoutTicker = [
    { trader: 'Markus T.', amount: '$4,820.00', broker: 'Quotex', method: 'USDT TRC20', time: '4m ago' },
    { trader: 'Elena K.', amount: '$9,150.00', broker: 'Pocket Option', method: 'BTC Native', time: '11m ago' },
    { trader: 'Tariq A.', amount: '$3,400.00', broker: 'Tradowix', method: 'USDT BEP20', time: '18m ago' },
    { trader: 'David S.', amount: '$12,800.00', broker: 'Binomo', method: 'USDT ERC20', time: '26m ago' },
    { trader: 'Hiroshi M.', amount: '$6,250.00', broker: 'Quotex', method: 'USDT TRC20', time: '35m ago' },
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative pt-12 md:pt-20 overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[250px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
          {/* Top Pill / Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/90 border border-emerald-500/30 text-emerald-400 text-xs font-semibold backdrop-blur-md shadow-lg shadow-emerald-950/40">
            <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>Next-Gen Prop Trading • Quotex, Pocket Option & Binary Friendly</span>
            <span className="hidden sm:inline text-slate-500">|</span>
            <span className="hidden sm:inline text-slate-300 font-mono">Up to 90% Profit Split</span>
          </div>

          {/* Headline */}
          <div className="space-y-4 max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
              Prove Your Edge. <br />
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                Trade Up To $200,000.
              </span>
            </h1>
            <p className="text-slate-300 text-base sm:text-xl max-w-2xl mx-auto font-normal leading-relaxed">
              Trade without risking your personal savings. Pass our transparent evaluation rules, gain institutional buying power, and withdraw 90% of your earnings via instant crypto rails.
            </p>
          </div>

          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to="/checkout"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-base shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
            >
              <Zap className="w-5 h-5 fill-slate-950" />
              Start Challenge From $85
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              to="/how-it-works"
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-white font-semibold text-base transition-colors flex items-center justify-center gap-2"
            >
              Explore Evaluation Rules
            </Link>
          </div>

          {/* Quick Metrics Bar */}
          <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <div className="glass-card p-4 rounded-2xl border border-slate-800">
              <span className="text-xs text-slate-400 uppercase tracking-wider font-mono">Maximum Capital</span>
              <p className="text-2xl font-bold text-white mt-1">$200,000</p>
              <span className="text-[11px] text-emerald-400 font-medium">Scalable to $2,000,000</span>
            </div>
            <div className="glass-card p-4 rounded-2xl border border-slate-800">
              <span className="text-xs text-slate-400 uppercase tracking-wider font-mono">Trader Profit Split</span>
              <p className="text-2xl font-bold text-emerald-400 mt-1">Up to 90%</p>
              <span className="text-[11px] text-slate-400">Bi-weekly / On-Demand</span>
            </div>
            <div className="glass-card p-4 rounded-2xl border border-slate-800">
              <span className="text-xs text-slate-400 uppercase tracking-wider font-mono">Min. Trading Days</span>
              <p className="text-2xl font-bold text-white mt-1">3 Days</p>
              <span className="text-[11px] text-cyan-400">Fastest pass in industry</span>
            </div>
            <div className="glass-card p-4 rounded-2xl border border-slate-800">
              <span className="text-xs text-slate-400 uppercase tracking-wider font-mono">Payout Speed</span>
              <p className="text-2xl font-bold text-amber-400 mt-1">&lt; 2 Hours</p>
              <span className="text-[11px] text-slate-400">TRC20, BEP20, BTC</span>
            </div>
          </div>
        </div>
      </section>

      {/* Live Payout Ticker */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-4 rounded-2xl border border-slate-800 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
              <Coins className="w-4 h-4 text-emerald-400" />
              Verified Trader Payouts
            </span>
          </div>

          <div className="flex items-center gap-6 overflow-x-auto w-full md:w-auto py-1 text-xs no-scrollbar">
            {payoutTicker.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 bg-slate-900/80 px-3.5 py-1.5 rounded-xl border border-slate-800 shrink-0">
                <span className="font-semibold text-slate-200">{item.trader}</span>
                <span className="font-mono text-emerald-400 font-bold">{item.amount}</span>
                <span className="text-[10px] text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">{item.broker}</span>
                <span className="text-[10px] text-slate-400">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Account & Evaluation Selector */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            <Flame className="w-3.5 h-3.5" />
            Custom Evaluation Plans
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Choose Your Trading Account
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            Select your target capital and preferred evaluation model. Zero recurring monthly fees.
          </p>
        </div>

        {/* Evaluation Type Switcher */}
        <div className="flex justify-center">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-900 border border-slate-800">
            <button
              onClick={() => setActiveStepType('2-step')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeStepType === '2-step'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              2-Step Standard (8% / 5% Target)
            </button>
            <button
              onClick={() => setActiveStepType('1-step')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeStepType === '1-step'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              1-Step Speedy (10% Target)
            </button>
            <button
              onClick={() => setActiveStepType('instant')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeStepType === 'instant'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Instant Funding (No Evaluation)
            </button>
          </div>
        </div>

        {/* Capital Selector Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {PLANS_DATA.map((plan) => {
            const isSelected = plan.id === selectedPlanId;
            return (
              <button
                key={plan.id}
                onClick={() => setSelectedPlanId(plan.id)}
                className={`p-4 rounded-2xl text-left border transition-all relative ${
                  isSelected
                    ? 'bg-slate-900/90 border-emerald-500 shadow-lg shadow-emerald-500/20 ring-1 ring-emerald-500'
                    : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-2.5 right-3 text-[10px] bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Popular
                  </span>
                )}
                <span className="text-xs text-slate-400 font-mono block">{plan.badge}</span>
                <p className="text-xl font-bold text-white mt-1">{plan.capital}</p>
                <div className="mt-3 flex items-baseline gap-1.5">
                  <span className="text-lg font-extrabold text-emerald-400">${plan.discountPrice}</span>
                  <span className="text-xs text-slate-500 line-through">${plan.price}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Plan In-Depth Rules Matrix */}
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-slate-800/90 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-8 border-b border-slate-800">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-md border border-emerald-500/20">
                {activeStepType === '2-step' ? 'Standard 2-Step Program' : activeStepType === '1-step' ? '1-Step Accelerated' : 'Instant Funded Account'}
              </span>
              <h3 className="text-3xl font-extrabold text-white flex items-center gap-3">
                {currentPlan.capital} Trading Capital
              </h3>
              <p className="text-slate-400 text-sm">
                Pass the rules and receive your live simulated funded credentials automatically.
              </p>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-right">
                <span className="text-xs text-slate-400 block">One-Time Fee</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-white">${currentPlan.discountPrice}</span>
                  <span className="text-sm text-slate-500 line-through">${currentPlan.price}</span>
                </div>
                <span className="text-[11px] text-emerald-400 font-medium">100% Refundable on First Payout</span>
              </div>

              <button
                onClick={() => handleSelectAndCheckout(currentPlan)}
                className="px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm shadow-xl shadow-emerald-500/20 hover:scale-105 transition-all flex items-center gap-2"
              >
                Start Trading
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Matrix Details */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 pt-8">
            <div className="space-y-1">
              <span className="text-xs text-slate-400">Profit Target</span>
              <p className="text-lg font-bold text-white">{currentPlan.profitTarget}</p>
              <span className="text-[11px] text-slate-500">{activeStepType === '2-step' ? 'Phase 1: 8% / Phase 2: 5%' : 'Single target'}</span>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-slate-400">Max Daily Loss</span>
              <p className="text-lg font-bold text-rose-400">{currentPlan.dailyLoss}</p>
              <span className="text-[11px] text-slate-500">Based on day start balance</span>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-slate-400">Max Overall Drawdown</span>
              <p className="text-lg font-bold text-rose-400">{currentPlan.maxDrawdown}</p>
              <span className="text-[11px] text-slate-500">Static 10% limit</span>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-slate-400">Min. Trading Days</span>
              <p className="text-lg font-bold text-white">{currentPlan.minTradingDays}</p>
              <span className="text-[11px] text-emerald-400">No max day pressure</span>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-slate-400">Leverage</span>
              <p className="text-lg font-bold text-white">{currentPlan.leverage}</p>
              <span className="text-[11px] text-slate-500">Forex, Crypto & Binary</span>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-slate-400">Profit Split</span>
              <p className="text-lg font-bold text-emerald-400">{currentPlan.profitSplit}</p>
              <span className="text-[11px] text-slate-500">Paid out via crypto</span>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Brokers Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
            <Globe className="w-3.5 h-3.5" />
            Ecosystem Integration
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Trade on Your Preferred Platform
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            Connect your credentials to Quotex, Pocket Option, Binomo, Olymp Trade, or standard MT5 feeds.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BROKERS_DATA.map((broker) => (
            <div
              key={broker.id}
              className="glass-card p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all hover:-translate-y-1 space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl">{broker.icon}</span>
                <span className="text-[10px] font-mono uppercase bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">
                  Supported
                </span>
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">{broker.name}</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{broker.description}</p>
              </div>
              <div className="pt-2 flex items-center justify-between border-t border-slate-800/80 text-xs">
                <span className="text-slate-400">Sync Speed: &lt; 50ms</span>
                <button
                  onClick={() => handleSelectAndCheckout(currentPlan, broker)}
                  className="text-emerald-400 font-semibold hover:text-emerald-300 flex items-center gap-1"
                >
                  Choose {broker.name} →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Security & Anti-Leak Shield Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-[#0B0F19] via-[#091124] to-[#070A12] space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-mono">
                <EyeOff className="w-3.5 h-3.5" />
                Origin Privacy & Zero-Trace Architecture
              </div>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
                Bulletproof Trader Privacy & Masked Edge Infrastructure
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                We believe in total privacy. Our platform is protected by strict reverse-proxy origin shielding, automated Anycast relay routing, zero third-party telemetry, and client-side hardened cookie flags.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 font-mono text-xs text-slate-300 space-y-2 shrink-0">
              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-400">Relay Node:</span>
                <span className="text-emerald-400 font-bold">{edgeNode.id}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-400">Relay Location:</span>
                <span className="text-white">{edgeNode.location}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-400">IP Rotation:</span>
                <span className="text-cyan-400">Every 5 Minutes</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-400">Logs:</span>
                <span className="text-emerald-400 font-bold">Wiped (RAM Only)</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-800">
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Crypto Cold-Wallet Payouts
              </h4>
              <p className="text-xs text-slate-400">
                Receive earnings directly to TRC20, BEP20, ERC20 or native BTC without banking intermediaries or slow wire delays.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Lock className="w-4 h-4 text-emerald-400" />
                SameSite=Strict Cookies
              </h4>
              <p className="text-xs text-slate-400">
                Zero tracking beacons, zero advertising cookies. Your trading activities are completely unmonitored by outside ad networks.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-400" />
                Instant Account Dispatch
              </h4>
              <p className="text-xs text-slate-400">
                Once transaction is detected on blockchain, simulated account credentials are provided automatically inside your portal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-extrabold text-white">Frequently Asked Questions</h2>
          <p className="text-slate-400 text-sm">Everything you need to know about passing and getting paid.</p>
        </div>

        <div className="space-y-4">
          <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
            <h4 className="text-base font-bold text-white">How do I pass the evaluation challenge?</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Reach the 8% profit target on Phase 1 (and 5% on Phase 2 if choosing the 2-Step standard) without violating the 5% daily loss limit or 10% maximum overall drawdown. Trade a minimum of 3 days. Once achieved, your funded phase is unlocked.
            </p>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
            <h4 className="text-base font-bold text-white">Which brokers and platforms can I trade with?</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              We provide full support for Quotex, Pocket Option, Binomo, Olymp Trade, and Tradowix, as well as institutional MT5 raw forex / CFD servers.
            </p>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
            <h4 className="text-base font-bold text-white">Which cryptocurrencies are accepted for fees and payouts?</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              We accept and pay out in USDT TRC-20 (Tron), USDT BEP-20 (BNB Smart Chain), USDT ERC-20 (Ethereum), and Native Bitcoin (BTC). Transactions are validated instantly on-chain.
            </p>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
            <h4 className="text-base font-bold text-white">When do I get my first payout and profit split?</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              You can request your first payout 14 days after your first trade on the funded account. Subsequent payouts can be processed on-demand every 7 days. You receive up to 90% of profits, plus your evaluation fee is 100% refunded with your first withdrawal.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom Final CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-10 sm:p-14 rounded-3xl border border-emerald-500/30 text-center space-y-6 relative overflow-hidden bg-gradient-to-b from-slate-900 to-[#070A12]">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Ready to Prove Your Edge?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            Join thousands of funded traders worldwide. Secure your challenge today and withdraw your first profit split in as little as 14 days.
          </p>
          <div className="pt-2 flex justify-center">
            <Link
              to="/checkout"
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-base shadow-xl shadow-emerald-500/30 hover:scale-105 transition-all flex items-center gap-2"
            >
              Get Funded Today →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
