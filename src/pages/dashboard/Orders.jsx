import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PackageX, ChevronRight } from 'lucide-react'
import clsx from 'clsx'
import { Card } from '../../components/ui/Primitives'
import StatusBadge from '../../components/sections/StatusBadge'
import { useAuth } from '../../lib/AuthContext'
import { subscribeUserOrders } from '../../lib/firestore'

const filters = [
  { key: 'all', label: 'All' },
  { key: 'Pending', label: 'Pending' },
  { key: 'Processing', label: 'Processing' },
  { key: 'Waiting For Callback', label: 'Waiting For Callback' },
  { key: 'Completed', label: 'Completed' },
  { key: 'Rejected', label: 'Rejected' },
]

export default function Orders() {
  const { user } = useAuth()
  const [orders, setOrders] = useState([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user?.uid) return
    const unsubscribe = subscribeUserOrders(user.uid, (data) => {
      setOrders(data)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [user?.uid])

  const filtered = filter === 'all'
    ? orders
    : orders.filter((o) => (o.status || '').toLowerCase() === filter.toLowerCase())

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold">Orders</h1>
        <p className="mt-1 text-sm text-paper-400">Track every account purchase and its status.</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={clsx(
              'rounded-lg border px-3.5 py-2 text-xs font-medium transition-colors',
              filter === f.key
                ? 'border-gold-500/40 bg-gold-500/10 text-gold-300'
                : 'border-white/10 text-paper-400 hover:text-paper-100'
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <Card hover={false} className="overflow-hidden p-0">
        {loading ? (
          <p className="py-12 text-center text-sm text-paper-500">Loading orders from database…</p>
        ) : filtered.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-white/[0.06] text-xs uppercase tracking-wide text-paper-500">
                  <th className="px-5 py-3 font-medium">Order</th>
                  <th className="px-5 py-3 font-medium">Date</th>
                  <th className="px-5 py-3 font-medium">Type</th>
                  <th className="px-5 py-3 font-medium">Broker</th>
                  <th className="px-5 py-3 font-medium">Size</th>
                  <th className="px-5 py-3 font-medium">Price</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {filtered.map((o) => {
                  const dateStr = o.createdAt
                    ? new Date(o.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                    : o.date || 'N/A'
                  return (
                    <tr key={o.id} className="text-paper-200 hover:bg-white/[0.02]">
                      <td className="px-5 py-4 num text-gold-400">{o.id || o.orderNumber}</td>
                      <td className="px-5 py-4 text-paper-400">{dateStr}</td>
                      <td className="px-5 py-4">{o.type}</td>
                      <td className="px-5 py-4">{o.broker}</td>
                      <td className="px-5 py-4 num">${(o.size || 0).toLocaleString()}</td>
                      <td className="px-5 py-4 num">${o.price}</td>
                      <td className="px-5 py-4">
                        <StatusBadge status={o.status} />
                      </td>
                      <td className="px-5 py-4 text-right">
                        <Link to={`/dashboard/orders/${o.id || o.orderNumber}`} className="text-paper-500 hover:text-gold-400">
                          <ChevronRight size={16} />
                        </Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center gap-3 py-16 text-center">
      <PackageX size={32} className="text-paper-600" />
      <p className="font-medium text-paper-200">No orders in this category</p>
      <p className="text-sm text-paper-500">Orders you place will show up here.</p>
    </div>
  )
}
