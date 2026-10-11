import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock, TrendingUp, CheckCircle, ArrowUpRight, Globe, Server } from 'lucide-react';
import { getRotatingEdgeNode } from '../../lib/security';

export default function Footer() {
  const edgeNode = getRotatingEdgeNode();

  return (
    <footer className="bg-[#050811] border-t border-slate-800/80 text-slate-400 text-xs">
      {/* Upper Security & Trust Banner */}
      <div className="border-b border-slate-900 bg-slate-950/80 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center md:text-left">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/40 border border-slate-800/50">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-white text-xs">90% Profit Split</p>
              <p className="text-[11px] text-slate-400">Paid out on-demand</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/40 border border-slate-800/50">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-white text-xs">Origin Privacy Guard</p>
              <p className="text-[11px] text-slate-400">Zero data leaks or trackers</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/40 border border-slate-800/50">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-white text-xs">Automated Deposits</p>
              <p className="text-[11px] text-slate-400">TRC20, BEP20, ERC20 & BTC</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/40 border border-slate-800/50">
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-white text-xs">Multi-Broker Freedom</p>
              <p className="text-[11px] text-slate-400">Quotex, Pocket Option & MT5</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-slate-950 font-black">
                <TrendingUp className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                QXT<span className="text-emerald-400">FUNDED</span>
              </span>
            </Link>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              QXT Funded is the premier proprietary trading evaluation firm built for serious forex, crypto, and binary traders. Pass our straightforward evaluation rules and manage simulated live accounts up to $200,000 with up to 90% profit splits.
            </p>

            <div className="pt-2 flex flex-col gap-1.5 text-[11px] font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Active Edge Relay: <strong className="text-slate-200">{edgeNode.location}</strong></span>
              </div>
              <div className="text-slate-400">
                Encrypted Session: TLS 1.3 / Strict-Transport-Security / Zero Logs
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider">Trading Plans</h4>
            <ul className="space-y-2">
              <li><Link to="/accounts" className="hover:text-emerald-400 transition-colors">$10,000 Challenge</Link></li>
              <li><Link to="/accounts" className="hover:text-emerald-400 transition-colors">$25,000 Challenge</Link></li>
              <li><Link to="/accounts" className="hover:text-emerald-400 transition-colors">$50,000 Challenge (Popular)</Link></li>
              <li><Link to="/accounts" className="hover:text-emerald-400 transition-colors">$100,000 Challenge</Link></li>
              <li><Link to="/accounts" className="hover:text-emerald-400 transition-colors">$200,000 Challenge</Link></li>
              <li><Link to="/checkout" className="text-emerald-400 font-semibold hover:underline">Instant Checkout →</Link></li>
            </ul>
          </div>

          {/* Brokers & Platforms */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider">Brokers & Tools</h4>
            <ul className="space-y-2">
              <li><Link to="/brokers" className="hover:text-emerald-400 transition-colors">Quotex Trading</Link></li>
              <li><Link to="/brokers" className="hover:text-emerald-400 transition-colors">Pocket Option</Link></li>
              <li><Link to="/brokers" className="hover:text-emerald-400 transition-colors">Binomo Platform</Link></li>
              <li><Link to="/brokers" className="hover:text-emerald-400 transition-colors">Olymp Trade</Link></li>
              <li><Link to="/brokers" className="hover:text-emerald-400 transition-colors">Tradowix Direct</Link></li>
              <li><Link to="/how-it-works" className="hover:text-emerald-400 transition-colors">Trading Rules & Drawdown</Link></li>
            </ul>
          </div>

          {/* Compliance & Legal */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider">Legal & Security</h4>
            <ul className="space-y-2">
              <li><Link to="/legal/terms" className="hover:text-emerald-400 transition-colors">Terms of Service</Link></li>
              <li><Link to="/legal/privacy" className="hover:text-emerald-400 transition-colors">Privacy & Data Protection</Link></li>
              <li><Link to="/legal/refund" className="hover:text-emerald-400 transition-colors">Refund Policy</Link></li>
              <li><Link to="/legal/risk" className="hover:text-emerald-400 transition-colors">Risk Disclosure</Link></li>
              <li><Link to="/legal/cookies" className="hover:text-emerald-400 transition-colors">Cookie Management</Link></li>
              <li><Link to="/support" className="hover:text-emerald-400 transition-colors">Help & Priority Support</Link></li>
            </ul>
          </div>
        </div>

        {/* Risk Disclaimer */}
        <div className="mt-12 pt-8 border-t border-slate-800/60 space-y-4">
          <p className="text-[11px] text-slate-400 leading-relaxed">
            <strong className="text-slate-300">Regulatory Disclaimer:</strong> QXT Funded provides simulated trading evaluations in demo environments. All accounts provided are demo accounts with virtual funds. Traders are evaluated based on their trading performance according to program rules. Trading foreign exchange, CFDs, and digital assets carries a high level of risk and may not be suitable for all investors. Past performance does not guarantee future results.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
            <div>
              © {new Date().getFullYear()} QXT Funded Inc. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <span>Secure SSL 256-Bit</span>
              <span>•</span>
              <span>Encrypted Cold Storage</span>
              <span>•</span>
              <span>Cloudflare Anycast Protected</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
