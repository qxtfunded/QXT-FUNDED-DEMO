import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Plus, LifeBuoy, ChevronRight, MessageSquareCode } from 'lucide-react'
import { Card, Badge } from '../../components/ui/Primitives'
import Button from '../../components/ui/Button'
import { useAuth } from '../../lib/AuthContext'
import { subscribeUserTickets } from '../../lib/firestore'
import { openLiveChat } from '../../lib/livechat'

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

export default function SupportList() {
  const { user } = useAuth()
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user?.uid) return
    const unsubscribe = subscribeUserTickets(user.uid, (data) => {
      setTickets(data)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [user?.uid])

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold">Support Center</h1>
          <p className="mt-1 text-sm text-paper-400">Get help from our team, 24/7.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={openLiveChat} variant="primary">
            <MessageSquareCode size={16} /> Live Chat
          </Button>
          <Button to="/dashboard/support/new" variant="outline">
            <Plus size={16} /> New Ticket
          </Button>
        </div>
      </div>

      <Card className="relative overflow-hidden border-gold-500/30 bg-gradient-to-r from-gold-500/10 via-ink-900 to-ink-900 p-5" hover={false}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold-500/20 text-gold-400">
              <MessageSquareCode size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display font-semibold text-paper-100">Need Instant Help?</h2>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-mint-500/10 px-2.5 py-0.5 text-xs font-medium text-mint-400 border border-mint-500/20">
                  <span className="h-1.5 w-1.5 rounded-full bg-mint-400 animate-pulse" />
                  Live Chat Online
                </span>
              </div>
              <p className="mt-0.5 text-sm text-paper-400">Our live chat support team is available right now to assist you with accounts and billing.</p>
            </div>
          </div>
          <Button onClick={openLiveChat} variant="primary" className="shrink-0">
            Start Live Chat
          </Button>
        </div>
      </Card>

      {loading ? (
        <Card hover={false} className="py-12 text-center text-sm text-paper-400">
          Loading support tickets…
        </Card>
      ) : tickets.length === 0 ? (
        <Card hover={false} className="flex flex-col items-center gap-3 py-16 text-center">
          <LifeBuoy size={32} className="text-paper-600" />
          <p className="font-medium text-paper-200">No support tickets yet</p>
          <p className="text-sm text-paper-500">Need help? Start a live chat session or open a ticket above.</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {tickets.map((t) => {
            const meta = ticketStatusMeta[t.status] || { label: t.status, tone: 'gold' }
            const dateStr = t.updatedAt || t.createdAt
              ? new Date(t.updatedAt || t.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
              : t.updated || 'Recently'

            return (
              <Link key={t.id} to={`/dashboard/support/${t.id}`}>
                <Card className="flex items-center justify-between gap-4 p-5">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="num text-xs text-paper-500">{t.id || t.ticketNumber}</span>
                      <Badge tone="neutral" className="text-[10px]">{t.category}</Badge>
                      {t.priority === 'High' && <Badge tone="error" className="text-[10px]">High</Badge>}
                    </div>
                    <p className="mt-1.5 truncate font-medium text-paper-100">{t.subject}</p>
                    <p className="mt-1 text-xs text-paper-500">Updated {dateStr}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <Badge tone={meta.tone}>{meta.label}</Badge>
                    <ChevronRight size={16} className="text-paper-500" />
                  </div>
                </Card>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
