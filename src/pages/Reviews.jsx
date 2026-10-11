import React from 'react';
import { Star, ShieldCheck, CheckCircle2, TrendingUp, Coins, Award, ExternalLink } from 'lucide-react';

export default function Reviews() {
  const testimonials = [
    {
      name: 'Julian V.',
      country: 'Germany',
      account: '$100,000 Challenge',
      broker: 'Quotex',
      payout: '$8,450.00 USDT TRC-20',
      rating: 5,
      date: 'October 8, 2026',
      review: 'Passed Phase 1 in 4 days trading OTC currency pairs on Quotex. The crypto payout was processed within 45 minutes of requesting. Best prop firm experience so far.',
    },
    {
      name: 'Mateo R.',
      country: 'Spain',
      account: '$50,000 Challenge',
      broker: 'Pocket Option',
      payout: '$4,120.00 BTC Native',
      rating: 5,
      date: 'October 6, 2026',
      review: 'Drawdown rules are very fair and static. No trailing high-water-mark tricks like other firms. Fee refund was added directly into my first payout.',
    },
    {
      name: 'Ananya S.',
      country: 'India',
      account: '$25,000 Challenge',
      broker: 'Binomo',
      payout: '$2,280.00 USDT BEP-20',
      rating: 5,
      date: 'October 3, 2026',
      review: 'Customer desk on live chat answered my question about overnight holding within 1 minute. Payout in BEP-20 had minimal gas fees and arrived quickly.',
    },
    {
      name: 'Lucas B.',
      country: 'Brazil',
      account: '$200,000 Elite Whale',
      broker: 'Quotex',
      payout: '$17,640.00 USDT TRC-20',
      rating: 5,
      date: 'September 29, 2026',
      review: 'Handling $200k on Quotex with 90% profit split is life-changing. Clean rules, no hidden spreads, top notch origin security.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
          <Award className="w-3.5 h-3.5" />
          Verified Trader Wall
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
          Trader Payouts & Proof
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Real results from traders worldwide funded by QXT Funded. All payouts verified on-chain and disbursed via direct cryptocurrency transfers.
        </p>

        {/* Aggregate Score */}
        <div className="pt-4 flex items-center justify-center gap-6">
          <div className="flex items-center gap-1.5 text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-amber-400" />
            ))}
          </div>
          <span className="text-sm font-bold text-white">4.9 / 5.0 Rating</span>
          <span className="text-xs text-slate-500">• Over 12,400+ Funded Traders</span>
        </div>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {testimonials.map((t, idx) => (
          <div
            key={idx}
            className="glass-card p-8 rounded-3xl border border-slate-800 space-y-6 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-white text-lg flex items-center gap-2">
                    {t.name}
                    <span className="text-xs text-slate-400 font-normal">({t.country})</span>
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-emerald-400 font-semibold">{t.account}</span>
                    <span className="text-xs text-slate-500">•</span>
                    <span className="text-xs text-slate-300 bg-slate-800 px-2 py-0.5 rounded">{t.broker}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[11px] text-slate-500 block">{t.date}</span>
                  <div className="flex items-center gap-1 mt-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                "{t.review}"
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Coins className="w-4 h-4 text-emerald-400" />
                <span className="text-slate-400">Verified Payout:</span>
                <strong className="text-emerald-400 font-mono">{t.payout}</strong>
              </div>
              <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Confirmed
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
