import React, { useState, useEffect } from 'react';
import { Shield, Lock, EyeOff, Check, X } from 'lucide-react';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true,
    securityShield: true,
    performance: false,
    marketing: false,
  });

  useEffect(() => {
    try {
      const consent = localStorage.getItem('qxt_cookie_consent');
      if (!consent) {
        // Show after a brief delay for smooth entrance
        const t = setTimeout(() => setVisible(true), 800);
        return () => clearTimeout(t);
      }
    } catch {
      // ignore
    }
  }, []);

  const saveConsent = (allAccepted = false) => {
    try {
      const payload = {
        essential: true,
        securityShield: true,
        performance: allAccepted,
        marketing: allAccepted,
        timestamp: new Date().toISOString(),
        strictMode: true,
      };
      localStorage.setItem('qxt_cookie_consent', JSON.stringify(payload));
      setVisible(false);
    } catch {
      setVisible(false);
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-xl z-50 animate-in fade-in slide-in-from-bottom duration-300">
      <div className="glass-panel bg-[#0B0F19]/95 border border-emerald-500/30 rounded-2xl p-5 shadow-2xl backdrop-blur-xl text-slate-200">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0 mt-0.5">
            <Shield className="w-5 h-5" />
          </div>
          <div className="space-y-1.5 flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-white text-base flex items-center gap-2">
                Maximum Privacy & Cookie Hardening
                <span className="text-[10px] font-mono uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                  Zero Tracker
                </span>
              </h3>
              <button 
                onClick={() => setVisible(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              We enforce strict SameSite=Strict cookies, HTTPS-only tokens, and zero commercial tracking scripts. Your identity, browser headers, and session tokens remain private and encrypted.
            </p>

            {showDetails && (
              <div className="pt-3 pb-2 space-y-2 text-xs border-t border-slate-800 my-2">
                <div className="flex items-center justify-between py-1 px-2 rounded bg-slate-900/60">
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <Lock className="w-3.5 h-3.5 text-emerald-400" />
                    Essential & Auth Tokens (Required)
                  </span>
                  <span className="text-[10px] text-emerald-400 font-mono">Always Active</span>
                </div>
                <div className="flex items-center justify-between py-1 px-2 rounded bg-slate-900/60">
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <EyeOff className="w-3.5 h-3.5 text-emerald-400" />
                    Anti-Fingerprint & Cloud Proxy Guard
                  </span>
                  <span className="text-[10px] text-emerald-400 font-mono">Enforced</span>
                </div>
                <div className="flex items-center justify-between py-1 px-2 rounded bg-slate-900/60">
                  <span className="text-slate-400">Third-Party Tracking & Advertising</span>
                  <span className="text-[10px] text-rose-400 font-mono">Permanently Blocked</span>
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <button
                onClick={() => saveConsent(true)}
                className="px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs transition-colors flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                Accept Secure Policy
              </button>
              <button
                onClick={() => saveConsent(false)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
              >
                Essential Only
              </button>
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="px-2.5 py-1.5 text-slate-400 hover:text-slate-200 text-xs underline transition-colors"
              >
                {showDetails ? 'Hide Details' : 'Security Details'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
