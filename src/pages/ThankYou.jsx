import React from 'react';
import { Link } from 'react-router-dom';
import { useCheckout } from '../lib/CheckoutContext';
import { 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Copy, 
  ShieldCheck, 
  ExternalLink,
  Coins,
  LayoutDashboard
} from 'lucide-react';

export default function ThankYou() {
  const { latestOrder, orderHistory } = useCheckout();
  const order = latestOrder || orderHistory[0];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-emerald-500/40 text-center space-y-6 relative overflow-hidden">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono uppercase bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20">
            Payment Recorded & Awaiting Final Block
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Thank You! Your Challenge Is Queued
          </h1>
          <p className="text-slate-300 text-sm max-w-md mx-auto">
            We have detected your deposit submission. Once confirmed by network nodes, your platform credentials will appear automatically in your portal.
          </p>
        </div>

        {/* Order Details Card */}
        {order && (
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 text-left space-y-3 font-mono text-xs text-slate-300">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-slate-400">Order ID:</span>
              <strong className="text-white font-bold">{order.orderId}</strong>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Trading Capital:</span>
              <strong className="text-emerald-400">{order.capital} ({order.plan})</strong>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Selected Platform:</span>
              <span className="text-white">{order.broker}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Payment Method:</span>
              <span className="text-amber-400">{order.cryptoMethod}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Amount Paid:</span>
              <span className="text-white font-bold">{order.amountPaid}</span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[11px]">
              <span className="text-slate-400">Transaction TXID:</span>
              <span className="text-slate-400 truncate max-w-[200px]">{order.txHash}</span>
            </div>
          </div>
        )}

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/dashboard"
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-xl shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
          >
            <LayoutDashboard className="w-4 h-4" />
            Go to Trader Dashboard
          </Link>
          <Link
            to="/dashboard/orders"
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-semibold text-sm transition-colors flex items-center justify-center gap-2"
          >
            View Order Receipt
          </Link>
        </div>
      </div>
    </div>
  );
}
