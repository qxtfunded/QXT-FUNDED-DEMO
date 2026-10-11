import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Shield, 
  User, 
  HelpCircle, 
  LogOut, 
  TrendingUp, 
  ExternalLink, 
  Menu, 
  X,
  Lock,
  ChevronRight,
  Sparkles,
  Zap
} from 'lucide-react';
import { useAuth } from '../../lib/AuthContext';
import { useCheckout } from '../../lib/CheckoutContext';
import { getRotatingEdgeNode } from '../../lib/security';

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const { orderHistory } = useCheckout();
  const edgeNode = getRotatingEdgeNode();

  const navItems = [
    { label: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { label: 'My Orders & Accounts', path: '/dashboard/orders', icon: ShoppingBag, badge: orderHistory.length },
    { label: 'Security & Privacy Shield', path: '/dashboard/security', icon: Shield },
    { label: 'Trader Profile', path: '/dashboard/profile', icon: User },
    { label: 'Support & Tickets', path: '/dashboard/support', icon: HelpCircle },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#070A12] text-slate-100 flex flex-col md:flex-row">
      {/* Mobile top bar */}
      <div className="md:hidden bg-[#0B0F19] border-b border-slate-800 p-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950 font-bold">
            <TrendingUp className="w-4 h-4" />
          </div>
          <span className="font-extrabold text-white text-base">QXT<span className="text-emerald-400">FUNDED</span></span>
        </Link>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg bg-slate-800 text-slate-300"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed md:sticky top-0 left-0 h-screen w-64 bg-[#0A0E1A] border-r border-slate-800/80 z-40 flex flex-col justify-between
        transition-transform duration-200 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Top Header */}
        <div className="p-5 border-b border-slate-800/80">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-emerald-500/20">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-white text-lg tracking-tight">QXT<span className="text-emerald-400">PORTAL</span></span>
              <p className="text-[10px] text-slate-400 font-mono">Simulated Trader Suite</p>
            </div>
          </Link>

          {/* Quick Node Indicator */}
          <div className="mt-4 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-1.5 text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Edge Relay:</span>
            </div>
            <span className="font-mono text-emerald-400 font-semibold">{edgeNode.id}</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  active
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                    active ? 'bg-slate-950 text-emerald-400' : 'bg-slate-800 text-slate-300'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}

          <div className="pt-4 mt-4 border-t border-slate-800/60 px-3">
            <Link
              to="/checkout"
              className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/20 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              New Evaluation
            </Link>
          </div>
        </nav>

        {/* User Card & Logout */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/60 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-emerald-400 font-bold text-sm">
              {currentUser?.displayName ? currentUser.displayName[0].toUpperCase() : 'T'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">{currentUser?.displayName || 'Pro Trader'}</p>
              <p className="text-[10px] text-slate-400 truncate">{currentUser?.email || 'trader@qxtfunded.com'}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-rose-400 text-xs transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="hidden md:flex h-16 border-b border-slate-800/80 bg-[#0B0F19]/60 backdrop-blur-md px-6 items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 font-medium">Dashboard</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-xs text-white font-semibold capitalize">
              {location.pathname.replace('/dashboard', '').replace('/', '') || 'Overview'}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs font-mono bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-400">Encrypted Origin:</span>
              <span className="text-emerald-400">{edgeNode.location}</span>
            </div>
            <Link
              to="/checkout"
              className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5" />
              Get Capital
            </Link>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
