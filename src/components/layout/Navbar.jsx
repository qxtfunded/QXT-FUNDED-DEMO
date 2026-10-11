import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ShieldCheck, 
  Menu, 
  X, 
  ChevronRight, 
  TrendingUp, 
  Lock, 
  User, 
  Sparkles,
  Layers,
  Radio
} from 'lucide-react';
import { useAuth } from '../../lib/AuthContext';
import { getRotatingEdgeNode } from '../../lib/security';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { currentUser } = useAuth();
  const edgeNode = getRotatingEdgeNode();

  const navLinks = [
    { label: 'Evaluation Plans', path: '/accounts' },
    { label: 'How It Works', path: '/how-it-works' },
    { label: 'Supported Brokers', path: '/brokers' },
    { label: 'Payout Proof', path: '/reviews' },
    { label: 'FAQ & Rules', path: '/faq' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#070A12]/85 border-b border-slate-800/80 transition-all">
      {/* Top micro-banner: Edge Privacy & Shield Info */}
      <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900/60 to-cyan-950/40 border-b border-emerald-500/10 py-1 px-4 text-[11px] text-slate-300 flex items-center justify-between">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-mono text-emerald-400 font-semibold">QXT Shield Relay:</span>
            <span className="hidden sm:inline text-slate-400">Node {edgeNode.id} ({edgeNode.location})</span>
            <span className="text-[10px] bg-slate-800/80 border border-slate-700 text-slate-300 px-1.5 py-0.2 rounded font-mono">
              IP Rotation Every 5m
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="hidden md:flex items-center gap-1 font-mono text-[10px] text-emerald-400">
              <Lock className="w-3 h-3" />
              Origin Concealed & Encrypted
            </span>
            <span className="text-slate-400">90% Profit Split Guaranteed</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <TrendingUp className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-extrabold tracking-tight text-white font-sans">
                QXT<span className="text-emerald-400">FUNDED</span>
              </span>
              <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-mono uppercase px-1.5 py-0.5 rounded border border-emerald-500/30">
                PRO
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium tracking-wide">
              PROVE YOUR EDGE. GET FUNDED.
            </p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800/80">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                isActive(link.path)
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden lg:flex items-center gap-3">
          {currentUser ? (
            <Link
              to="/dashboard"
              className="px-4 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 text-white text-xs font-semibold flex items-center gap-2 transition-colors"
            >
              <User className="w-3.5 h-3.5 text-emerald-400" />
              Trader Portal
            </Link>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs font-semibold transition-colors"
            >
              Sign In
            </Link>
          )}

          <Link
            to="/checkout"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/35 transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Get Funded Now
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden flex items-center gap-2">
          <Link
            to="/checkout"
            className="px-3.5 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs"
          >
            Start
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0B0F19] border-b border-slate-800 px-4 pt-3 pb-6 space-y-3">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl text-sm font-semibold ${
                  isActive(link.path)
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <Link
              to="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-center text-sm font-semibold text-slate-200 flex items-center justify-center gap-2"
            >
              <User className="w-4 h-4 text-emerald-400" />
              Trader Dashboard
            </Link>
            <Link
              to="/checkout"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded-xl bg-emerald-500 text-slate-950 font-bold text-center text-sm shadow-lg shadow-emerald-500/25"
            >
              Get Funded (Up to $200k)
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
