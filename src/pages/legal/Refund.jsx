import React from 'react';

export default function Refund() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-8">
      <div className="space-y-2 border-b border-slate-800 pb-6">
        <h1 className="text-3xl font-extrabold text-white">Refund & Fee Return Policy</h1>
        <p className="text-xs text-slate-400 font-mono">100% Evaluation Fee Refund On First Payout</p>
      </div>

      <div className="space-y-6 text-slate-300 text-xs sm:text-sm leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">1. 100% Refundable Evaluation Fee</h2>
          <p>
            When a trader successfully passes their challenge phase and reaches their first profit withdrawal on the funded account stage, 100% of their initial evaluation purchase fee is reimbursed directly alongside their profit split.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">2. Pre-Trading Cancellations</h2>
          <p>
            If credentials have not yet been generated and no trading activity has occurred, candidates may request a cancellation within 14 calendar days of purchase by contacting the priority desk.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">3. Rule Breaches</h2>
          <p>
            Once trading commences and an account breaches drawdown limits, the evaluation fee is non-refundable, as computational server capacity and simulated feeds were consumed.
          </p>
        </section>
      </div>
    </div>
  );
}
