import React from 'react';

export default function Privacy() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-8">
      <div className="space-y-2 border-b border-slate-800 pb-6">
        <h1 className="text-3xl font-extrabold text-white">Privacy & Origin Protection Policy</h1>
        <p className="text-xs text-slate-400 font-mono">Zero-Knowledge Architecture • Updated October 2026</p>
      </div>

      <div className="space-y-6 text-slate-300 text-xs sm:text-sm leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">1. Strict Privacy & Anonymity Commitment</h2>
          <p>
            QXT Funded does not sell, rent, or monetize candidate data. We utilize distributed Anycast edge proxies and origin-shield architectures to minimize data exposure and prevent IP tracking.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">2. Cookies & Session Storage</h2>
          <p>
            All cookies issued by QXT Funded carry strict SameSite=Strict and Secure flags. We do not utilize third-party marketing beacons, Facebook tracking pixels, or cross-site tracking scripts.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">3. Cryptocurrency Transaction Privacy</h2>
          <p>
            Deposit transactions are matched solely via transaction hashes (TXIDs) on public blockchains. We do not link wallet addresses to commercial profiling databases.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">4. User Rights & Data Deletion</h2>
          <p>
            Traders have the right to request immediate deletion of personal records and session history by utilizing the Zero-Trace Wipe tool in the Security Dashboard or contacting support.
          </p>
        </section>
      </div>
    </div>
  );
}
