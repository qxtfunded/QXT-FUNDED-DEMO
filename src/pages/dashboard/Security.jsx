import React, { useState } from 'react';
import { 
  Shield, 
  Lock, 
  EyeOff, 
  RefreshCw, 
  Trash2, 
  CheckCircle2, 
  Globe, 
  Key, 
  Server,
  Zap,
  Radio
} from 'lucide-react';
import { useAuth } from '../../lib/AuthContext';
import { getRotatingEdgeNode, purgeSessionTraces, PRIVACY_PROFILE } from '../../lib/security';

export default function Security() {
  const { securitySettings, updateSecurity, currentUser } = useAuth();
  const [purged, setPurged] = useState(false);
  const [currentNode, setCurrentNode] = useState(getRotatingEdgeNode());

  const handlePurge = () => {
    purgeSessionTraces();
    setPurged(true);
    setTimeout(() => setPurged(false), 3000);
  };

  const handleRotateNode = () => {
    setCurrentNode(getRotatingEdgeNode());
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <Shield className="w-6 h-6 text-emerald-400" />
          Origin Privacy & Security Shield
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Zero-Trace Infrastructure • Masked Anycast Edge Routing • Strict Session Hardening
        </p>
      </div>

      {/* Rotating Edge Relay Diagnostic Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-500/30 space-y-6 bg-gradient-to-br from-slate-900/90 via-[#0B1120] to-[#070A12]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-mono uppercase text-emerald-400 font-bold">
                Active Edge Node: {currentNode.id}
              </span>
            </div>
            <h3 className="text-xl font-bold text-white mt-1">
              Anycast IP Rotation Relay (5-Min Interval)
            </h3>
            <p className="text-xs text-slate-400">
              Your connection routes through distributed origin shields. The true origin server IP is hidden behind multi-hop reverse proxies.
            </p>
          </div>

          <button
            onClick={handleRotateNode}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 border border-slate-700 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Check Next Relay
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-[10px] text-slate-500 block uppercase">Edge Location</span>
            <strong className="text-white">{currentNode.location}</strong>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-[10px] text-slate-500 block uppercase">Masked Relay IP</span>
            <strong className="text-cyan-400">{currentNode.ip}</strong>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-[10px] text-slate-500 block uppercase">Latency Bridge</span>
            <strong className="text-emerald-400">{currentNode.latency}</strong>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-[10px] text-slate-500 block uppercase">Origin Disclosure</span>
            <strong className="text-emerald-400">Concealed (Zero-Leak)</strong>
          </div>
        </div>
      </div>

      {/* Security Switches */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        <h3 className="text-base font-bold text-white">Browser & Session Hardening Controls</h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-white flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                SameSite=Strict Cookie Enforcement
              </span>
              <p className="text-[11px] text-slate-400">
                Isolates all session tokens strictly to first-party requests. Blocks CSRF and unauthorized cross-domain reads.
              </p>
            </div>
            <input
              type="checkbox"
              checked={securitySettings.strictCookies}
              onChange={(e) => updateSecurity('strictCookies', e.target.checked)}
              className="w-5 h-5 rounded bg-slate-950 border-slate-800 text-emerald-500 focus:ring-emerald-500 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-white flex items-center gap-2">
                <EyeOff className="w-3.5 h-3.5 text-cyan-400" />
                Anti-Fingerprint Entropy Injection
              </span>
              <p className="text-[11px] text-slate-400">
                Randomizes subtle canvas & audio oscillator noise to prevent third-party bot or AI scraping fingerprinting.
              </p>
            </div>
            <input
              type="checkbox"
              checked={securitySettings.antiFingerprint}
              onChange={(e) => updateSecurity('antiFingerprint', e.target.checked)}
              className="w-5 h-5 rounded bg-slate-950 border-slate-800 text-emerald-500 focus:ring-emerald-500 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-white flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-amber-400" />
                Stealth Mode (Strip Referrer & Origin Meta)
              </span>
              <p className="text-[11px] text-slate-400">
                Enforces strict-origin-when-cross-origin and removes tracking metadata on all outbound resource requests.
              </p>
            </div>
            <input
              type="checkbox"
              checked={securitySettings.stealthMode}
              onChange={(e) => updateSecurity('stealthMode', e.target.checked)}
              className="w-5 h-5 rounded bg-slate-950 border-slate-800 text-emerald-500 focus:ring-emerald-500 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Emergency Zero-Trace Wipe */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-rose-500/20 bg-rose-950/10 space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400">
            <Trash2 className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-base font-bold text-white">Emergency Zero-Trace Cache Wipe</h4>
            <p className="text-xs text-slate-400">
              Immediately erases all temporary tokens, cached session keys, and local browser state.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <button
            onClick={handlePurge}
            className="px-5 py-2.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 font-bold text-xs border border-rose-500/30 transition-colors flex items-center gap-2"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Wipe Browser Session Now
          </button>

          {purged && (
            <span className="text-xs text-emerald-400 font-mono flex items-center gap-1.5 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4" />
              Session Traces Safely Purged
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
