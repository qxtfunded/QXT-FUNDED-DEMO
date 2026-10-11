import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, Zap, Check, ArrowRight, ShieldCheck, Cpu, Smartphone } from 'lucide-react';
import { BROKERS_DATA, PLANS_DATA, useCheckout } from '../lib/CheckoutContext';

export default function Brokers() {
  const navigate = useNavigate();
  const { setSelectedBroker, setSelectedPlan } = useCheckout();

  const handleStartWithBroker = (broker) => {
    setSelectedBroker(broker);
    setSelectedPlan(PLANS_DATA[2]); // Default 50k
    navigate('/checkout');
  };

  const platforms = [
    {
      ...BROKERS_DATA[0],
      payoutRate: 'Up to 98%',
      otcSupport: 'Yes (24/7 OTC)',
      minExecution: '25 ms',
      regulations: 'IFMRRC Certified',
      highlights: ['Instant 1-click execution', 'OTC weekend binary charts', 'Zero latency slippage', 'Full mobile responsive']
    },
    {
      ...BROKERS_DATA[1],
      payoutRate: 'Up to 96%',
      otcSupport: 'Yes (All pairs)',
      minExecution: '30 ms',
      regulations: 'Mwali International',
      highlights: ['Social copy trading ready', '100+ currency & crypto pairs', 'Automated trade indicators', 'Weekend markets open']
    },
    {
      ...BROKERS_DATA[2],
      payoutRate: 'Up to 92%',
      otcSupport: 'Yes',
      minExecution: '40 ms',
      regulations: 'Financial Commission Category A',
      highlights: ['Regulated category A status', 'Competitive tournament feeds', 'Unique non-stop trading', 'Standard crypto deposits']
    },
    {
      ...BROKERS_DATA[3],
      payoutRate: 'Up to 93%',
      otcSupport: 'Yes',
      minExecution: '35 ms',
      regulations: 'Finacom Certified',
      highlights: ['Intuitive clean interface', 'Fixed time trades & CFD mode', 'Zero commission on deposits', 'Educational tools']
    },
    {
      ...BROKERS_DATA[4],
      payoutRate: 'Up to 97%',
      otcSupport: 'Yes (Raw quotes)',
      minExecution: '18 ms',
      regulations: 'High-speed ECN Bridge',
      highlights: ['Institutional level quotes', 'Raw binary order book', 'Zero manipulation algorithms', 'Direct crypto settlement']
    },
    {
      ...BROKERS_DATA[5],
      payoutRate: 'Forex / CFD Spread',
      otcSupport: 'Crypto Weekend',
      minExecution: '12 ms',
      regulations: 'Tier 1 Prime Liquidity',
      highlights: ['Raw spreads from 0.0 pips', 'Expert Advisors (EA) allowed', 'Advanced charting depth', 'Forex, Indices & Metals']
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono">
          <Globe className="w-3.5 h-3.5" />
          Multi-Platform Broker Connectivity
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
          Supported Trading Platforms
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          We do not lock you into a single proprietary engine. Choose between leading Binary/OTC platforms (Quotex, Pocket Option, Binomo, Olymp Trade) or institutional MT5 feeds.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {platforms.map((p) => (
          <div
            key={p.id}
            className="glass-card p-7 rounded-3xl border border-slate-800 hover:border-slate-700 transition-all space-y-6 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-4xl">{p.icon}</span>
                <span className="text-[10px] font-mono uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-full font-bold">
                  {p.minExecution} Execution
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-extrabold text-white">{p.name}</h3>
                <p className="text-xs text-slate-400 mt-1">{p.description}</p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Payout Rate:</span>
                  <strong className="text-emerald-400">{p.payoutRate}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">OTC Weekend Markets:</span>
                  <strong className="text-cyan-400">{p.otcSupport}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Compliance:</span>
                  <span className="text-slate-300 font-mono text-[11px]">{p.regulations}</span>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-semibold text-slate-300 block">Platform Highlights:</span>
                <ul className="space-y-1.5 text-xs text-slate-400">
                  {p.highlights.map((h, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <button
                onClick={() => handleStartWithBroker(p)}
                className="w-full py-3 rounded-xl bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 font-bold text-xs text-white border border-slate-700 hover:border-emerald-400 transition-all flex items-center justify-center gap-2"
              >
                Trade On {p.name}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
