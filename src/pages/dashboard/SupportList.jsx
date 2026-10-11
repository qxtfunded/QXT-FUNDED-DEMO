import React, { useState } from 'react';
import { HelpCircle, Plus, Send, CheckCircle2, MessageSquare, Clock } from 'lucide-react';

export default function SupportList() {
  const [tickets, setTickets] = useState([
    {
      id: 'TCK-88192',
      subject: 'Deposit Confirmation Verification',
      department: 'Billing & Crypto',
      status: 'Resolved',
      date: '2026-10-09',
      lastReply: 'Credentials generated successfully and sent to your portal.'
    },
    {
      id: 'TCK-89041',
      subject: 'Quotex Server Connection Query',
      department: 'Technical & Terminal',
      status: 'Open',
      date: '2026-10-11',
      lastReply: 'Desk agent reviewing latency sync on European cluster.'
    }
  ]);

  const [newModalOpen, setNewModalOpen] = useState(false);
  const [subject, setSubject] = useState('');
  const [department, setDepartment] = useState('Billing & Crypto');
  const [message, setMessage] = useState('');

  const handleCreate = (e) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;

    const newTicket = {
      id: `TCK-${Math.floor(10000 + Math.random() * 90000)}`,
      subject,
      department,
      status: 'Open',
      date: new Date().toISOString().split('T')[0],
      lastReply: 'Ticket submitted. A support specialist will respond shortly.'
    };

    setTickets([newTicket, ...tickets]);
    setSubject('');
    setMessage('');
    setNewModalOpen(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-emerald-400" />
            Support & Risk Desk Tickets
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            24/7 Priority trader support desk for account issues, broker connections, and billing.
          </p>
        </div>

        <button
          onClick={() => setNewModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-500/20"
        >
          <Plus className="w-4 h-4" />
          Create New Ticket
        </button>
      </div>

      {/* Ticket List */}
      <div className="glass-panel rounded-3xl border border-slate-800 overflow-hidden divide-y divide-slate-800">
        {tickets.map((t) => (
          <div key={t.id} className="p-6 hover:bg-slate-900/40 transition-colors space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-slate-400">{t.id}</span>
                  <span className="text-[10px] font-mono uppercase bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                    {t.department}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mt-1">{t.subject}</h3>
              </div>

              <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold ${
                t.status === 'Resolved'
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                  : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
              }`}>
                {t.status}
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
              {t.lastReply}
            </p>

            <span className="text-[11px] text-slate-500 block font-mono">Submitted: {t.date}</span>
          </div>
        ))}
      </div>

      {/* Modal */}
      {newModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="glass-panel w-full max-w-lg bg-[#0B0F19] p-6 rounded-3xl border border-slate-800 space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-white text-base">Open Support Ticket</h3>
              <button onClick={() => setNewModalOpen(false)} className="text-slate-400 hover:text-white text-xs">
                Close
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Department</label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="Billing & Crypto">Billing & Crypto Deposits</option>
                  <option value="Technical & Terminal">Technical & Broker Terminal</option>
                  <option value="Risk & Rules">Risk Management & Evaluation Rules</option>
                  <option value="Payout & Withdrawals">Payouts & Withdrawals</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Subject</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Summary of your issue..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Message Description</label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Provide transaction details, broker order ID, or question..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setNewModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-slate-400 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs"
                >
                  Submit Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
