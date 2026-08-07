import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Paperclip, Send, FileText, Download } from 'lucide-react'
import clsx from 'clsx'
import { Card, Badge } from '../../components/ui/Primitives'
import { Textarea } from '../../components/ui/Form'
import Button from '../../components/ui/Button'
import { useAuth } from '../../lib/AuthContext'
import { subscribeTicketDetail, addTicketReply } from '../../lib/firestore'

const ticketStatusMeta = {
  Open: { label: 'Open', tone: 'gold' },
  open: { label: 'Open', tone: 'gold' },
  'Waiting Reply': { label: 'Waiting Reply', tone: 'warning' },
  waiting_reply: { label: 'Waiting Reply', tone: 'warning' },
  Answered: { label: 'Answered', tone: 'mint' },
  answered: { label: 'Answered', tone: 'mint' },
  Closed: { label: 'Closed', tone: 'neutral' },
  closed: { label: 'Closed', tone: 'neutral' },
}

export default function SupportDetail() {
  const { id } = useParams()
  const { user, userData } = useAuth()
  const [ticket, setTicket] = useState(null)
  const [loading, setLoading] = useState(true)
  const [reply, setReply] = useState('')
  const [file, setFile] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!id) return
    const unsubscribe = subscribeTicketDetail(id, (data) => {
      setTicket(data)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [id])

  const handleSendReply = async () => {
    if (!reply.trim() || !ticket?.id) return
    setSubmitting(true)
    try {
      await addTicketReply(ticket.id, userData || user, reply.trim(), file)
      setReply('')
      setFile(null)
    } catch (err) {
      console.error('Error posting reply:', err)
      alert('Failed to send reply. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="py-12 text-center text-sm text-paper-400">
        Loading ticket details…
      </div>
    )
  }

  if (!ticket) {
    return (
      <div className="mx-auto max-w-3xl space-y-4 py-8">
        <Link to="/dashboard/support" className="inline-flex items-center gap-1.5 text-sm text-paper-400 hover:text-gold-400">
          <ArrowLeft size={14} /> Back to tickets
        </Link>
        <Card className="p-8 text-center" hover={false}>
          <p className="font-medium text-paper-200">Ticket not found</p>
          <p className="mt-1 text-sm text-paper-500">Support ticket {id} could not be loaded.</p>
        </Card>
      </div>
    )
  }

  const meta = ticketStatusMeta[ticket.status] || { label: ticket.status, tone: 'gold' }
  const isClosed = (ticket.status || '').toLowerCase() === 'closed'
  const messagesList = ticket.messages || [
    {
      from: 'user',
      senderName: ticket.userName || 'You',
      text: ticket.message,
      attachmentUrl: ticket.attachmentUrl,
      time: ticket.createdAt ? new Date(ticket.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Recently',
    },
  ]

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Link to="/dashboard/support" className="inline-flex items-center gap-1.5 text-sm text-paper-400 hover:text-gold-400">
        <ArrowLeft size={14} /> Back to tickets
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="num text-xs text-paper-500">{ticket.id || ticket.ticketNumber}</span>
            <Badge tone="neutral" className="text-[10px]">{ticket.category}</Badge>
            {ticket.priority === 'High' && <Badge tone="error" className="text-[10px]">High</Badge>}
          </div>
          <h1 className="mt-1.5 font-display text-xl font-semibold sm:text-2xl">{ticket.subject}</h1>
        </div>
        <Badge tone={meta.tone}>{meta.label}</Badge>
      </div>

      <div className="space-y-4">
        {messagesList.map((m, i) => (
          <div key={i} className={clsx('flex', m.from === 'user' ? 'justify-end' : 'justify-start')}>
            <Card
              hover={false}
              className={clsx(
                'max-w-[85%] p-4',
                m.from === 'user' ? 'border-gold-500/20 bg-gold-500/5' : 'bg-ink-800'
              )}
            >
              <p className="text-sm leading-relaxed text-paper-200">{m.text}</p>
              {m.attachmentUrl && (
                <a
                  href={m.attachmentUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 rounded bg-white/5 px-2.5 py-1 text-xs text-gold-400 hover:bg-white/10"
                >
                  <Download size={12} /> Attachment
                </a>
              )}
              <p className="mt-2 text-[11px] text-paper-500">
                {m.from === 'user' ? (m.senderName || 'You') : (m.senderName || 'QXT Support')} · {m.time}
              </p>
            </Card>
          </div>
        ))}
      </div>

      {!isClosed && (
        <Card className="p-4" hover={false}>
          <Textarea
            rows={3}
            placeholder="Type your reply…"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
          />
          {file && (
            <div className="mt-2 flex items-center gap-2 rounded bg-ink-800 px-3 py-1 text-xs text-paper-300">
              <FileText size={14} className="text-gold-400" />
              <span className="truncate">{file.name}</span>
              <button type="button" onClick={() => setFile(null)} className="ml-auto text-paper-500 hover:text-signal-error">
                Remove
              </button>
            </div>
          )}
          <div className="mt-3 flex items-center justify-between">
            <label htmlFor="reply-file" className="flex cursor-pointer items-center gap-1.5 text-xs text-paper-400 hover:text-gold-400">
              <Paperclip size={14} /> Attach file
            </label>
            <input
              id="reply-file"
              type="file"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && setFile(e.target.files[0])}
            />
            <Button size="sm" onClick={handleSendReply} disabled={!reply.trim() || submitting}>
              {submitting ? 'Sending…' : 'Send Reply'} <Send size={14} />
            </Button>
          </div>
        </Card>
      )}
    </div>
  )
}
