import React from 'react';
import { Link } from 'react-router-dom';
import { useCheckout } from '../../lib/CheckoutContext';
import { ShoppingBag, ArrowRight, ExternalLink, ShieldCheck, Clock, Coins } from 'lucide-react';

export default function Orders() {
  const { orderHistory } = useCheckout();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">My Orders & Accounts</h1>
          <p className="text-xs text-slate-400 mt-1">
            History of evaluation subscriptions and crypto deposit receipts.
          </p>
        </div>

        <Link
          to="/checkout"
          className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors shadow-md shadow-emerald-500/20"
        >
          + Purchase New Account
        </Link>
      </div>

      <div className="glass-panel rounded-3xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/90 text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800">
              <tr>
                <th className="py-4 px-6">Order ID</th>
                <th className="py-4 px-6">Trading Plan</th>
                <th className="py-4 px-6">Broker</th>
                <th className="py-4 px-6">Payment Method</th>
                <th className="py-4 px-6">Amount</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              {orderHistory.map((order, idx) => (
                <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                  <td className="py-4 px-6 font-mono font-bold text-white">
                    {order.orderId}
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-semibold text-white block">{order.capital}</span>
                    <span className="text-[11px] text-slate-500">{order.evaluationType}</span>
                  </td>
                  <td className="py-4 px-6 font-medium text-slate-200">
                    {order.broker}
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-amber-400 font-mono">{order.cryptoMethod}</span>
                  </td>
                  <td className="py-4 px-6 font-mono font-bold text-white">
                    {order.amountPaid}
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold ${
                      order.status === 'Active'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <Link
                      to={`/dashboard/orders/${order.orderId}`}
                      className="text-emerald-400 hover:text-emerald-300 font-semibold inline-flex items-center gap-1"
                    >
                      View
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
