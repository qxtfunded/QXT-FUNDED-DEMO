import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Shield, AlertTriangle, Zap, Check } from 'lucide-react';

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: 'What is the maximum daily loss limit and how is it calculated?',
      a: 'The daily loss limit is 5% of the starting balance of the trading day (00:00 UTC). For example, on a $50,000 account, your equity cannot drop below $47,500 during that 24-hour cycle. The day starts over with the new daily equity mark at 00:00 UTC.'
    },
    {
      q: 'What is the maximum overall drawdown?',
      a: 'The maximum total drawdown is 10% of the initial account balance. For a $100,000 account, the maximum loss limit is $10,000, meaning equity cannot drop below $90,000. This drawdown is fixed/static and does not trail high-water profit.'
    },
    {
      q: 'Which brokers are supported for binary and CFD trading?',
      a: 'We fully support Quotex, Pocket Option, Binomo, Olymp Trade, and Tradowix for binary/OTC options, and standard MT5 for forex/CFD pairs. Upon payment confirmation, you receive automated connection guidelines.'
    },
    {
      q: 'How do I pay using cryptocurrency?',
      a: 'During checkout, you can select USDT TRC-20, USDT BEP-20, USDT ERC-20, or Bitcoin (BTC). A dedicated QR code and exact blockchain address is displayed. After sending the transaction, enter your TX hash or upload a screenshot to activate your account instantly.'
    },
    {
      q: 'Are Expert Advisors (EAs) or automated bots allowed?',
      a: 'Yes, trading bots and EAs are allowed as long as they do not exploit latency delays or arbitrage broker quote glitches. Regular technical algorithms and indicator-based automation are 100% permitted.'
    },
    {
      q: 'Is holding trades over the weekend allowed?',
      a: 'Yes! Both weekend trade holding and overnight swing positions are allowed across all evaluation and funded account tiers.'
    },
    {
      q: 'When and how do I receive my funded account profit payouts?',
      a: 'Your first payout is eligible 14 calendar days after your first trade on the funded stage. Subsequent payouts can be requested every 7 days. Payouts are sent directly to your designated USDT (TRC20/BEP20/ERC20) or BTC wallet within 2 to 6 hours.'
    },
    {
      q: 'Is my initial challenge fee refunded?',
      a: 'Yes! 100% of your evaluation fee is refunded together with your first successful profit withdrawal.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
          <HelpCircle className="w-3.5 h-3.5" />
          Knowledge Base & Rules
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
          Frequently Asked Questions & Rules
        </h1>
        <p className="text-slate-400 text-sm sm:text-base">
          Complete clarity on drawdown calculations, broker setups, crypto payments, and profit withdrawals.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="glass-card rounded-2xl border border-slate-800 overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 text-white hover:bg-slate-900/60 transition-colors"
              >
                <span className="font-bold text-sm sm:text-base">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-emerald-400' : ''}`} />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
