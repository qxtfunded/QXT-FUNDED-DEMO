import React from 'react';
import { Hammer, RefreshCw } from 'lucide-react';

export default function Maintenance() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="glass-panel max-w-md w-full p-8 rounded-3xl border border-amber-500/30 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mx-auto">
          <Hammer className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase text-amber-400">Scheduled Upgrade</span>
          <h1 className="text-2xl font-black text-white">System Under Maintenance</h1>
          <p className="text-xs text-slate-400">
            Our edge cluster is performing routine low-latency matching engine upgrades. Service resumes momentarily.
          </p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs inline-flex items-center gap-2"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Check Live Status
        </button>
      </div>
    </div>
  );
}
