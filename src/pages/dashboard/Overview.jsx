import { useState, useEffect } from 'react'
import { TrendingUp, ListOrdered, LifeBuoy, ArrowUpRight, ArrowRight } from 'lucide-react'
import { Card } from '../../components/ui/Primitives'
import Button from '../../components/ui/Button'
import StatusBadge from '../../components/sections/StatusBadge'
import { useAuth } from '../../lib/AuthContext'
import { subscribeUserOrders, subscribeUserTickets } from '../../lib/firestore'

export default function Overview() {
  const { user, userData } = useAuth()
  const [userOrders, setUserOrders] = useState([])
  const [userTickets, setUserTickets] = useState([])
  const [loadingOrders, setLoadingOrders] = useState(true)

  useEffect(() => {
    if (!user?.uid) return
    const unsubOrders = subscribeUserOrders(user.uid, (data) => {
      setUserOrders(data)
      setLoadingOrders(false)
    })
    const unsubTickets = subscribeUserTickets(user.uid, (data) => {
      setUserTickets(data)
    })
    return () => {
      unsubOrders()
      unsubTickets()
    }
  }, [user?.uid])

  const activeAccountsCount = userOrders.filter(
    (o) => o.status === 'Completed' || o.status === 'completed'
  ).length

  const pendingAccountsCount = userOrders.filter(
    (o) => o.status === 'Pending' || o.status === 'pending'
  ).length

  const openTicketsCount = userTickets.filter(
    (t) => t.status !== 'Closed' && t.status !== 'closed'
  ).length

  const statCards = [
    { label: 'Active Accounts', value: activeAccountsCount.toString(), icon: TrendingUp, tone: 'mint' },
    { label: 'Total Orders', value: userOrders.length.toString(), icon: ListOrdered, tone: 'neutral' },
    { label: 'Open Support Tickets', value: openTicketsCount.toString(), icon: LifeBuoy, tone: 'warning' },
  ]

  const recent = userOrders.slice(0, 4)
  const displayName = userData?.fullName || user?.displayName || user?.email?.split('@')[0] || 'Trader'

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-semibold">Welcome back, {displayName}</h1>
        <p className="mt-1 text-sm text-paper-400">Here's what's happening with your accounts.</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        {statCards.map((s) => (
          <Card key={s.label} className="p-5" hover={false}>
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wide text-paper-400">{s.label}</span>
              <s.icon size={16} className="text-gold-400" />
            </div>
            <p className="num mt-3 text-2xl font-bold">{s.value}</p>
          </Card>
        ))}
      </div>

      <Card className="p-6" hover={false}>
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold">Recent Orders</h2>
          <Button to="/dashboard/orders" variant="ghost" size="sm">
            View all <ArrowRight size={14} />
          </Button>
        </div>
        <div className="mt-5 overflow-x-auto">
          {recent.length === 0 ? (
            <p className="py-8 text-center text-sm text-paper-500">
              {loadingOrders ? 'Loading orders…' : 'No orders found. Place your first order to get funded.'}
            </p>
          ) : (
            <table className="w-full min-w-[600px] text-left text-sm">
              <thead>
                <tr className="border-b border-white/[0.06] text-xs uppercase tracking-wide text-paper-500">
                  <th className="pb-3 font-medium">Order</th>
                  <th className="pb-3 font-medium">Account</th>
                  <th className="pb-3 font-medium">Broker</th>
                  <th className="pb-3 font-medium">Price</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {recent.map((o) => (
                  <tr key={o.id} className="text-paper-200">
                    <td className="py-3 num text-gold-400">{o.id || o.orderNumber}</td>
                    <td className="py-3 num">${(o.size || 0).toLocaleString()}</td>
                    <td className="py-3">{o.broker}</td>
                    <td className="py-3 num">${o.price}</td>
                    <td className="py-3">
                      <StatusBadge status={o.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </Card>

      <Card className="flex flex-col items-start justify-between gap-4 p-6 sm:flex-row sm:items-center" hover={false}>
        <div>
          <h3 className="font-display text-lg font-semibold">Ready to scale up?</h3>
          <p className="mt-1 text-sm text-paper-400">Get a larger account size with a better split.</p>
        </div>
        <Button to="/accounts" className="shrink-0">
          Browse Accounts <ArrowUpRight size={16} />
        </Button>
      </Card>
    </div>
  )
}
