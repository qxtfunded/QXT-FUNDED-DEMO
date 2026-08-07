import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Paperclip, AlertCircle, FileText } from 'lucide-react'
import { Card } from '../../components/ui/Primitives'
import { Label, Input, Select, Textarea } from '../../components/ui/Form'
import Button from '../../components/ui/Button'
import { ticketCategories, ticketPriorities } from '../../data/tickets'
import { useAuth } from '../../lib/AuthContext'
import { createSupportTicket } from '../../lib/firestore'

export default function SupportNew() {
  const navigate = useNavigate()
  const { user, userData } = useAuth()
  const [form, setForm] = useState({ subject: '', category: 'Account Issue', priority: 'Medium', message: '' })
  const [file, setFile] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!form.subject.trim() || !form.message.trim()) {
      return setError('Please fill in all required fields.')
    }

    setSubmitting(true)
    setError('')
    try {
      await createSupportTicket(
        {
          userId: user?.uid || 'guest-user',
          userName: userData?.fullName || user?.displayName || user?.email?.split('@')[0] || 'Trader',
          userEmail: user?.email || '',
          ...form,
        },
        file
      )
      navigate('/dashboard/support')
    } catch (err) {
      console.error(err)
      setError(err.message || 'Failed to submit support ticket.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Link to="/dashboard/support" className="inline-flex items-center gap-1.5 text-sm text-paper-400 hover:text-gold-400">
        <ArrowLeft size={14} /> Back to tickets
      </Link>
      <div>
        <h1 className="font-display text-2xl font-semibold">New Support Ticket</h1>
        <p className="mt-1 text-sm text-paper-400">Tell us what's going on and we'll get back to you.</p>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-lg border border-signal-error/30 bg-signal-error/10 p-4 text-sm text-signal-error">
          <AlertCircle size={18} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <Card className="p-6" hover={false}>
        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" placeholder="Brief summary of your issue" value={form.subject} onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))} required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">Category</Label>
              <Select id="category" value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} required>
                {ticketCategories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </Select>
            </div>
            <div>
              <Label htmlFor="priority">Priority</Label>
              <Select id="priority" value={form.priority} onChange={(e) => setForm((f) => ({ ...f, priority: e.target.value }))}>
                {ticketPriorities.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </Select>
            </div>
          </div>
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" rows={6} placeholder="Describe your issue in detail…" value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))} required />
          </div>

          <div>
            <label htmlFor="file-upload" className="inline-flex cursor-pointer items-center gap-1.5 text-xs text-paper-400 hover:text-gold-400">
              <Paperclip size={14} /> {file ? file.name : 'Attach a file'}
            </label>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && setFile(e.target.files[0])}
            />
            {file && (
              <div className="mt-2 flex items-center gap-2 rounded bg-ink-800 px-3 py-1.5 text-xs text-paper-200">
                <FileText size={14} className="text-gold-400" />
                <span className="truncate">{file.name}</span>
                <button type="button" onClick={() => setFile(null)} className="ml-auto text-paper-500 hover:text-signal-error">
                  Remove
                </button>
              </div>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? 'Submitting Ticket…' : 'Submit Ticket'}
          </Button>
        </form>
      </Card>
    </div>
  )
}
