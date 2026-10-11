import React from 'react';

export default function Risk() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-8">
      <div className="space-y-2 border-b border-slate-800 pb-6">
        <h1 className="text-3xl font-extrabold text-white">Risk Disclosure & Simulation Notice</h1>
        <p className="text-xs text-slate-400 font-mono">Mandatory Regulatory Notice</p>
      </div>

      <div className="space-y-6 text-slate-300 text-xs sm:text-sm leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">Simulated Evaluation Notice</h2>
          <p>
            All content and services provided on QXT Funded are intended solely for educational, evaluation, and simulated trading demonstration purposes. Trading in foreign exchange, binary contracts, cryptocurrencies, and financial derivatives carries significant risk of loss.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">No Investment Advice</h2>
          <p>
            QXT Funded does not provide investment, tax, or financial advisory services. Past performance in simulated trading evaluations is not indicative of future performance.
          </p>
        </section>
      </div>
    </div>
  );
}
