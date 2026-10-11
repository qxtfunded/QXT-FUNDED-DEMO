import React, { useState } from 'react';
import { Shield, Check } from 'lucide-react';

export default function Cookies() {
  const [saved, setSaved] = useState(false);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-8">
      <div className="space-y-2 border-b border-slate-800 pb-6">
        <h1 className="text-3xl font-extrabold text-white">Cookie Policy & Preferences</h1>
        <p className="text-xs text-slate-400 font-mono">Strict Security & Zero Advertising Trackers</p>
      </div>

      <div className="space-y-6 text-slate-300 text-xs sm:text-sm leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">How We Use Cookies</h2>
          <p>
            We strictly limit cookie usage to essential authentication tokens and security shield verification. We do NOT use third-party analytics cookies or advertising identifiers.
          </p>
        </section>

        <section className="space-y-3 p-6 rounded-2xl bg-slate-900 border border-slate-800">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-400" />
            Cookie Hardening Settings
          </h3>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between py-2 border-b border-slate-800">
              <span>Authentication & Session (Required)</span>
              <span className="text-emerald-400 font-mono">Active (SameSite=Strict)</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-slate-800">
              <span>Edge Origin Relay Shield</span>
              <span className="text-emerald-400 font-mono">Active</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span>Commercial Tracking & Telemetry</span>
              <span className="text-rose-400 font-mono">Permanently Disabled</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
