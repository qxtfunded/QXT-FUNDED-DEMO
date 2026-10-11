import React from 'react';
import { Link } from 'react-router-dom';
import { AlertOctagon, ArrowLeft, RefreshCw } from 'lucide-react';

export default function ServerError() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="glass-panel max-w-md w-full p-8 rounded-3xl border border-rose-500/30 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mx-auto">
          <AlertOctagon className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase text-rose-400">500 Server Error</span>
          <h1 className="text-2xl font-black text-white">Temporary Gateway Issue</h1>
          <p className="text-xs text-slate-400">
            Our edge proxy encountered a brief interruption. Your account and funds remain completely secure.
          </p>
        </div>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs flex items-center gap-2"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reload Page
          </button>
          <Link
            to="/"
            className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
