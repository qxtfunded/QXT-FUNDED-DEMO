import React from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="glass-panel max-w-md w-full p-8 rounded-3xl border border-slate-800 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 mx-auto">
          <HelpCircle className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase text-emerald-400 font-bold">404 Error</span>
          <h1 className="text-2xl font-black text-white">Page Not Found</h1>
          <p className="text-xs text-slate-400">
            The trading route or evaluation link you requested does not exist or has moved.
          </p>
        </div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Trading Home
        </Link>
      </div>
    </div>
  );
}
