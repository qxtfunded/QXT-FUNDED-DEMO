import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  ShieldCheck, 
  DollarSign, 
  Award, 
  Lock, 
  Eye, 
  EyeOff, 
  Copy, 
  Check, 
  ExternalLink,
  AlertTriangle,
  ArrowUpRight,
  Activity
} from 'lucide-react';
import { useCheckout } from '../../lib/CheckoutContext';
import { useAuth } from '../../lib/AuthContext';
import { getRotatingEdgeNode } from '../../lib/security';

export default function Overview() {
  const { orderHistory } = useCheckout();
  const { currentUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [copiedKey, setCopiedKey] = useState('');
  const edgeNode = getRotatingEdgeNode();

  const activeAccount = orderHistory[0] || {
    orderId: 'QXT-784920',
    plan: '$50,000 Challenge',
    capital: '$50,000',
    broker: 'Quotex',
    evaluationType: '2-Step Evaluation',
    status: 'Active',
    phase: 'Phase 1 (Target: $4,000)',
    currentEquity: '$52,140.00',
    profit: '+$2,140.00 (+4.28%)',
    loginId: 'QX-9928114',
    server: 'QXT-Live-Europe'
  };

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(''), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Top Welcome & Origin Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Welcome, {currentUser?.displayName || 'Trader'} 👋
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Simulated Trading Command Center • Edge Shield active on {edgeNode.location}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/checkout"
            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors shadow-lg shadow-emerald-500/20"
          >
            + Start Another Account
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-mono">Managed Simulated Capital</span>
          <p className="text-2xl font-black text-white">{activeAccount.capital}</p>
          <span className="text-[11px] text-emerald-400 font-semibold">{activeAccount.plan}</span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-mono">Current Account Equity</span>
          <p className="text-2xl font-black text-emerald-400">{activeAccount.currentEquity}</p>
          <span className="text-[11px] text-emerald-400 font-mono">{activeAccount.profit}</span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-mono">Evaluation Progress</span>
          <p className="text-2xl font-black text-white">53.5%</p>
          <span className="text-[11px] text-slate-400 font-mono">$2,140 / $4,000 Target</span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-mono">Contracted Profit Split</span>
          <p className="text-2xl font-black text-cyan-400">90%</p>
          <span className="text-[11px] text-slate-400 font-mono">On-Demand Crypto</span>
        </div>
      </div>

      {/* Active Account Details & Trading Terminal Credentials */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Account Performance & Drawdown Gauges */}
        <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <span className="text-[10px] font-mono uppercase bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">
                {activeAccount.status}
              </span>
              <h3 className="text-xl font-bold text-white mt-2">{activeAccount.plan}</h3>
              <p className="text-xs text-slate-400 font-mono">{activeAccount.broker} • {activeAccount.phase}</p>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400">Minimum Days</span>
              <p className="text-sm font-bold text-white font-mono">3 / 3 Completed</p>
            </div>
          </div>

          {/* Risk Limit Meters */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-slate-300 font-semibold">Daily Loss Limit (Max 5% / $2,500.00)</span>
                <span className="text-emerald-400 font-mono font-bold">$0.00 Lost Today (0.0% used)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                <div className="h-full bg-emerald-500 w-[4%]" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-slate-300 font-semibold">Maximum Total Drawdown (Max 10% / $5,000.00)</span>
                <span className="text-emerald-400 font-mono font-bold">$0.00 Breached (Safe)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                <div className="h-full bg-emerald-500 w-[2%]" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-slate-300 font-semibold">Phase 1 Target Progress (8% / $4,000.00)</span>
                <span className="text-cyan-400 font-mono font-bold">$2,140.00 / $4,000.00 (53.5%)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                <div className="h-full bg-cyan-400 w-[53.5%]" />
              </div>
            </div>
          </div>

          {/* Rule Safety Stamp */}
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between text-xs text-emerald-300">
            <span className="flex items-center gap-2 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              All trading rules in healthy compliance.
            </span>
            <span className="font-mono text-[11px] text-slate-400">Risk Desk Status: GREEN</span>
          </div>
        </div>

        {/* Right: Platform Login Credentials Box */}
        <div className="lg:col-span-5 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Lock className="w-4 h-4 text-emerald-400" />
                Platform Credentials
              </h3>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                Live Server
              </span>
            </div>

            <p className="text-xs text-slate-400">
              Use these credentials to connect directly on {activeAccount.broker}.
            </p>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase">Platform / Broker</span>
                  <strong className="text-white">{activeAccount.broker}</strong>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase">Login / Account ID</span>
                  <strong className="text-white">{activeAccount.loginId}</strong>
                </div>
                <button
                  onClick={() => handleCopy(activeAccount.loginId, 'login')}
                  className="text-slate-400 hover:text-white p-1 rounded"
                >
                  {copiedKey === 'login' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase">Trader Password</span>
                  <strong className="text-white">
                    {showPassword ? 'Qxt#Trader2026!' : '••••••••••••'}
                  </strong>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-slate-400 hover:text-white p-1 rounded"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => handleCopy('Qxt#Trader2026!', 'pwd')}
                    className="text-slate-400 hover:text-white p-1 rounded"
                  >
                    {copiedKey === 'pwd' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase">Server Gateway</span>
                  <strong className="text-white">{activeAccount.server}</strong>
                </div>
                <button
                  onClick={() => handleCopy(activeAccount.server, 'server')}
                  className="text-slate-400 hover:text-white p-1 rounded"
                >
                  {copiedKey === 'server' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <a
              href="https://quotex.io"
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors flex items-center justify-center gap-2"
            >
              Launch Web Trading Platform
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
