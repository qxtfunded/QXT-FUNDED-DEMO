import React, { useState } from 'react';
import { MessageSquare, X, Send, ShieldCheck, User, Bot, HelpCircle } from 'lucide-react';

export default function LiveChatFloatingButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'desk',
      text: 'Hello Trader! Welcome to QXT Funded 24/7 Prop Desk. How can we assist you with evaluations, crypto deposits, or broker connections today?',
      time: 'Just now'
    }
  ]);
  const [inputVal, setInputVal] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const userMsg = {
      sender: 'user',
      text: inputVal,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputVal('');

    setTimeout(() => {
      let reply = 'Thank you for contacting QXT Desk. Our senior risk manager will verify your request. If you made a deposit, credentials are dispatched within 5-15 minutes after blockchain confirmation.';
      const lower = userMsg.text.toLowerCase();
      if (lower.includes('deposit') || lower.includes('pay') || lower.includes('crypto')) {
        reply = 'Crypto deposits (TRC-20, BEP-20, ERC-20, BTC) are automatically tracked. Once you submit your TX hash on the Checkout screen, credentials are auto-generated.';
      } else if (lower.includes('drawdown') || lower.includes('rule') || lower.includes('target')) {
        reply = 'Rules are simple: 8% profit target on Phase 1, 5% max daily drawdown (based on starting balance of the day), and 10% maximum overall drawdown.';
      } else if (lower.includes('payout')) {
        reply = 'Payouts can be requested bi-weekly on your first month and on-demand every 7 days thereafter with an 80% to 90% profit split!';
      }

      setMessages(prev => [...prev, {
        sender: 'desk',
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 900);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative group p-4 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105 transition-all flex items-center justify-center font-bold"
          aria-label="Live Support Desk"
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-[#070A12] rounded-full animate-ping" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-[#070A12] rounded-full" />
        </button>
      </div>

      {isOpen && (
        <div className="fixed bottom-24 right-4 md:right-6 w-[92vw] sm:w-[380px] max-h-[560px] h-[520px] z-50 glass-panel bg-[#0B0F19]/95 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom duration-200">
          {/* Header */}
          <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-white text-sm">QXT Priority Desk</h4>
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Live Agents Online
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages list */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
            <div className="p-2.5 rounded-lg bg-slate-900/50 border border-slate-800 text-slate-400 text-center text-[11px]">
              🔒 End-to-end encrypted session. Your IP and sensitive info are protected by origin relay shield.
            </div>

            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'desk' && (
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`max-w-[78%] p-3 rounded-2xl ${
                    m.sender === 'user'
                      ? 'bg-emerald-500 text-slate-950 font-medium rounded-tr-none'
                      : 'bg-slate-800/90 text-slate-200 border border-slate-700/60 rounded-tl-none'
                  }`}
                >
                  <p className="leading-relaxed">{m.text}</p>
                  <span
                    className={`block text-[10px] mt-1 ${
                      m.sender === 'user' ? 'text-slate-800 text-right' : 'text-slate-400'
                    }`}
                  >
                    {m.time}
                  </span>
                </div>
                {m.sender === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Quick chips */}
          <div className="px-3 py-2 bg-slate-900/60 border-t border-slate-800 flex gap-1.5 overflow-x-auto text-[11px] no-scrollbar">
            <button
              onClick={() => setInputVal('How to pay via USDT TRC20?')}
              className="px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 whitespace-nowrap"
            >
              USDT TRC20
            </button>
            <button
              onClick={() => setInputVal('What is the max daily drawdown?')}
              className="px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 whitespace-nowrap"
            >
              Drawdown Rules
            </button>
            <button
              onClick={() => setInputVal('Are Quotex and Pocket Option supported?')}
              className="px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 whitespace-nowrap"
            >
              Supported Brokers
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSend} className="p-3 bg-slate-900 border-t border-slate-800 flex gap-2">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ask desk a question..."
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
            <button
              type="submit"
              className="px-3.5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl font-bold flex items-center justify-center transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
