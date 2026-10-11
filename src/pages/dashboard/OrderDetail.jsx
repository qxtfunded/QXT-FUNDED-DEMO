import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCheckout } from '../../lib/CheckoutContext';
import { ArrowLeft, CheckCircle2, ShieldCheck, Copy, Printer, ExternalLink } from 'lucide-react';

export default function OrderDetail() {
  const { id } = useParams();
  const { orderHistory } = useCheckout();

  const order = orderHistory.find(o => o.orderId === id) || orderHistory[0];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Link
        to="/dashboard/orders"
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Orders
      </Link>

      <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-6">
        <div className="flex items-center justify-between pb-6 border-b border-slate-800">
          <div>
            <span className="text-[10px] font-mono uppercase bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-full border border-emerald-500/20">
              Receipt Verified
            </span>
            <h1 className="text-2xl font-black text-white mt-2">Order {order.orderId}</h1>
            <p className="text-xs text-slate-400 font-mono">Date: {order.date}</p>
          </div>

          <button
            onClick={() => window.print()}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 flex items-center gap-2"
          >
            <Printer className="w-3.5 h-3.5" />
            Print Receipt
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-slate-500 block uppercase text-[10px]">Capital Tier</span>
            <strong className="text-white text-sm">{order.capital}</strong>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-slate-500 block uppercase text-[10px]">Broker</span>
            <strong className="text-white text-sm">{order.broker}</strong>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-slate-500 block uppercase text-[10px]">Payment Rail</span>
            <strong className="text-amber-400 text-sm">{order.cryptoMethod}</strong>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-slate-500 block uppercase text-[10px]">Amount Settled</span>
            <strong className="text-emerald-400 text-sm">{order.amountPaid}</strong>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs font-mono">
          <div className="flex items-center justify-between text-slate-400">
            <span>TXID Blockchain Hash:</span>
            <span className="text-emerald-400">{order.txHash}</span>
          </div>
          <div className="flex items-center justify-between text-slate-400">
            <span>Assigned Trading Login:</span>
            <span className="text-white font-bold">{order.loginId}</span>
          </div>
          <div className="flex items-center justify-between text-slate-400">
            <span>Server Route:</span>
            <span className="text-white">{order.server}</span>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <Link
            to="/dashboard"
            className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs"
          >
            Go to Trading Terminal
          </Link>
        </div>
      </div>
    </div>
  );
}
