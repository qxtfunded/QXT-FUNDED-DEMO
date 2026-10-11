import React from 'react';

export default function Terms() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-8">
      <div className="space-y-2 border-b border-slate-800 pb-6">
        <h1 className="text-3xl font-extrabold text-white">Terms of Service</h1>
        <p className="text-xs text-slate-400 font-mono">Last Updated: October 2026 • Version 3.4</p>
      </div>

      <div className="prose prose-invert prose-sm max-w-none space-y-6 text-slate-300 text-xs sm:text-sm leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">1. Nature of the Service & Demo Environment</h2>
          <p>
            QXT Funded provides simulated prop trading evaluation services. All accounts provided are demo accounts operating in virtual market conditions. Traders execute trades with virtual balances to demonstrate risk management discipline. No actual retail broker accounts or live investor funds are held directly by candidates.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">2. Evaluation Rules & Breach Conditions</h2>
          <p>
            Candidates agree to maintain strict adherence to maximum daily drawdown limits (5% of daily opening equity) and total maximum drawdown limits (10% of initial balance). Exceeding these limits constitutes an automated rule breach and closes the evaluation phase.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">3. Profit Split & Payout Eligibility</h2>
          <p>
            Upon successful completion of Phase 1 and Phase 2 (or Instant verification requirements), traders become eligible for profit splits up to 90% based on simulated account performance. Payouts are settled in digital assets (USDT TRC-20, USDT BEP-20, USDT ERC-20, or Bitcoin).
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">4. Prohibited Trading Practices</h2>
          <p>
            Exploitation of quote feed latency, malicious server arbitrage, account sharing, or cross-account opposing trades are strictly prohibited. Standard news trading, swing holding, and automated indicators are fully permitted.
          </p>
        </section>
      </div>
    </div>
  );
}
