import React, { useState } from 'react';
import { HelpCircle, Mail, MessageSquare, Send, CheckCircle2, Shield, Clock } from 'lucide-react';

export default function Support() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
          <HelpCircle className="w-3.5 h-3.5" />
          24/7 Prop Firm Assistance
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
          Trader Support & Priority Desk
        </h1>
        <p className="text-slate-400 text-sm">
          Have questions regarding evaluation challenge rules, crypto verification, or broker credentials? Our team responds within 15 minutes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
            <MessageSquare className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-white text-base">Live Chat Widget</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Instant assistance via the floating button at bottom right. Direct connection to risk officers.
          </p>
          <span className="text-[11px] text-emerald-400 font-mono block">Status: Online (24/7)</span>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
            <Mail className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-white text-base">Direct Email Desk</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            For institutional queries or contract questions, email our senior team directly.
          </p>
          <span className="text-[11px] text-cyan-400 font-mono block">support@qxtfunded.com</span>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-white text-base">Crypto Verification</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Automatic confirmation on TRC20, BEP20, and BTC blockchains within standard block cycles.
          </p>
          <span className="text-[11px] text-amber-400 font-mono block">Avg. Turnaround: 5-15 mins</span>
        </div>
      </div>

      {/* Support form */}
      <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-slate-800 max-w-2xl mx-auto space-y-6">
        <h3 className="text-xl font-bold text-white">Send Us a Direct Message</h3>

        {submitted ? (
          <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
            <h4 className="font-bold text-white text-base">Message Dispatched!</h4>
            <p className="text-xs text-slate-300">
              Our priority support desk has received your inquiry and will email you back shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Alex Rivers"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="trader@domain.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Subject</label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Question regarding deposit or broker..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Message</label>
              <textarea
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Describe your inquiry..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors shadow-lg shadow-emerald-500/20"
            >
              Send Priority Inquiry
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
