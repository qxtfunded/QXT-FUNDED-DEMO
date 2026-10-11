import React, { useState } from 'react';
import { useAuth } from '../../lib/AuthContext';
import { User, Shield, Check, Wallet, Coins, AlertCircle } from 'lucide-react';

export default function Profile() {
  const { currentUser } = useAuth();
  const [payoutAddress, setPayoutAddress] = useState('TW1Cd8GLzobCan1F5Eg15kH8qchs6tbzDY');
  const [payoutNetwork, setPayoutNetwork] = useState('USDT TRC20');
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-white">Trader Profile & Payout Settings</h1>
        <p className="text-xs text-slate-400 mt-1">
          Manage your personal details and destination payout wallet.
        </p>
      </div>

      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <User className="w-4 h-4 text-emerald-400" />
          Personal Account Information
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-slate-500 uppercase font-mono text-[10px]">Display Name</span>
            <p className="text-sm font-bold text-white">{currentUser?.displayName || 'Alex Rivers'}</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-slate-500 uppercase font-mono text-[10px]">Registered Email</span>
            <p className="text-sm font-bold text-white">{currentUser?.email || 'trader@qxtfunded.com'}</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-slate-500 uppercase font-mono text-[10px]">KYC Verification Status</span>
            <p className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5" />
              {currentUser?.kycStatus || 'Verified (Level 2)'}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-slate-500 uppercase font-mono text-[10px]">Security IP Tunnel</span>
            <p className="text-sm font-bold text-cyan-400 font-mono">{currentUser?.lastLoginIp || 'Shield Node 09'}</p>
          </div>
        </div>
      </div>

      {/* Payout Wallet Address Form */}
      <form onSubmit={handleSave} className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Wallet className="w-4 h-4 text-emerald-400" />
            Configured Profit Payout Wallet
          </h3>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
            Automated Payouts
          </span>
        </div>

        <p className="text-xs text-slate-400">
          When you request bi-weekly or on-demand profit splits, funds are routed directly to this blockchain address.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Target Network</label>
            <select
              value={payoutNetwork}
              onChange={(e) => setPayoutNetwork(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="USDT TRC20">USDT TRC-20 (Tron)</option>
              <option value="USDT BEP20">USDT BEP-20 (BNB Chain)</option>
              <option value="USDT ERC20">USDT ERC-20 (Ethereum)</option>
              <option value="BTC">Bitcoin (Native SegWit)</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="text-xs font-semibold text-slate-300 block mb-1">Destination Crypto Address</label>
            <input
              type="text"
              value={payoutAddress}
              onChange={(e) => setPayoutAddress(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 font-mono text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          {saved && (
            <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
              <Check className="w-3.5 h-3.5" />
              Payout configuration updated!
            </span>
          )}
          <button
            type="submit"
            className="ml-auto px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors"
          >
            Save Payout Wallet
          </button>
        </div>
      </form>
    </div>
  );
}
