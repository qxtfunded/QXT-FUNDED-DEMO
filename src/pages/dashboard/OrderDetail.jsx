import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Download, CheckCircle2, Circle, ShieldAlert, Check, Clock, XCircle, ShieldCheck } from 'lucide-react'
import clsx from 'clsx'
import { Card, Badge } from '../../components/ui/Primitives'
import Button from '../../components/ui/Button'
import StatusBadge from '../../components/sections/StatusBadge'
import { subscribeOrderDetail, updateOrderStatus } from '../../lib/firestore'
import { useAuth } from '../../lib/AuthContext'

const stageOrder = ['pending', 'processing', 'waiting_callback', 'completed']
const stages = [
  { key: 'pending', label: 'Order Placed' },
  { key: 'processing', label: 'Processing Payment' },
  { key: 'waiting_callback', label: 'Awaiting Broker Callback' },
  { key: 'completed', label: 'Account Delivered' },
]

export default function OrderDetail() {
  const { id } = useParams()
  const { isAdmin, toggleAdmin } = useAuth()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    if (!id) return
    const unsubscribe = subscribeOrderDetail(id, (data) => {
      setOrder(data)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [id])

  if (loading) {
    return (
      <div className="py-12 text-center text-sm text-paper-400">
        Loading order details…
      </div>
    )
  }

  if (!order) {
    return (
      <div className="space-y-4 py-8">
        <Link to="/dashboard/orders" className="inline-flex items-center gap-1.5 text-sm text-paper-400 hover:text-gold-400">
          <ArrowLeft size={14} /> Back to orders
        </Link>
        <Card className="p-8 text-center" hover={false}>
          <p className="font-medium text-paper-200">Order not found</p>
          <p className="mt-1 text-sm text-paper-500">The order {id} could not be loaded.</p>
        </Card>
      </div>
    )
  }

  const normalizedStatus = (order.status || 'Pending').toLowerCase().replace(/\s+/g, '_')
  const isRejected = normalizedStatus === 'rejected'
  const isCompleted = normalizedStatus === 'completed'
  const currentIndex = stageOrder.indexOf(normalizedStatus)

  const dateFormatted = order.createdAt
    ? new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : order.date || 'N/A'

  const accountDetails = order.accountDetails || {
    accountSize: order.size || 10000,
    purchaseDate: dateFormatted,
    broker: order.broker || 'MetaTrader 5',
    challengeType: order.type === 'Challenge' ? '2-Step Challenge' : 'Instant Funding',
    dailyLossLimit: '$' + ((order.size || 10000) * 0.05).toLocaleString(),
    maxDrawdown: '$' + ((order.size || 10000) * 0.10).toLocaleString(),
    profitTarget: order.type === 'Challenge' ? '$' + ((order.size || 10000) * 0.08).toLocaleString() : 'N/A',
    currentProfit: '$0.00',
    currentLoss: '$0.00',
    remainingDailyLoss: '$' + ((order.size || 10000) * 0.05).toLocaleString(),
    remainingDrawdown: '$' + ((order.size || 10000) * 0.10).toLocaleString(),
    withdrawableProfit: '$0.00',
    accountStatus: isCompleted ? 'Active' : order.status || 'Pending',
  }

  const handleStatusChange = async (newStatus, accountStatusLabel) => {
    setUpdating(true)
    try {
      await updateOrderStatus(order.id || id, newStatus, {
        accountStatus: accountStatusLabel || newStatus,
      })
    } catch (err) {
      console.error(err)
    } finally {
      setUpdating(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link to="/dashboard/orders" className="inline-flex items-center gap-1.5 text-sm text-paper-400 hover:text-gold-400">
          <ArrowLeft size={14} /> Back to orders
        </Link>

        {/* Admin mode indicator / quick toggle */}
        <button
          onClick={toggleAdmin}
          className={`px-3 py-1.5 text-xs font-bold rounded-xl border transition-all flex items-center gap-1.5 ${
            isAdmin
              ? 'bg-amber-500/10 border-amber-500/40 text-amber-300 shadow-md shadow-amber-500/10'
              : 'bg-ink-900 border-white/10 text-paper-400 hover:text-paper-100'
          }`}
        >
          <ShieldCheck size={14} className={isAdmin ? 'text-amber-400' : 'text-paper-500'} />
          <span>{isAdmin ? 'Admin Mode: Active' : 'Switch to Admin Mode'}</span>
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold num">{order.id || order.orderNumber}</h1>
          <p className="mt-1 text-sm text-paper-400">Placed on {dateFormatted}</p>
        </div>
        <div className="flex items-center gap-3">
          <StatusBadge status={order.status} />
          <Button variant="secondary" size="sm" onClick={() => window.print()}>
            <Download size={14} /> Receipt
          </Button>
        </div>
      </div>

      {/* ADMIN EXCLUSIVE ACTION PANEL */}
      {isAdmin ? (
        <Card className="border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-ink-900 to-ink-950 p-6 shadow-2xl" hover={false}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                <Badge tone="gold">Admin Actions Panel</Badge>
                <span className="text-xs text-amber-300 font-mono">Current Status: {order.status}</span>
              </div>
              <p className="mt-1 text-sm text-paper-300">
                Action required on this order. Select an outcome below to update order status:
              </p>
            </div>
            <div className="text-xs text-paper-400 font-mono">Order ID: {order.id || order.orderNumber}</div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* 1. REJECT ACTION BUTTON */}
            <button
              disabled={updating || isRejected}
              onClick={() => handleStatusChange('Rejected', 'Rejected')}
              className={`flex items-center justify-center gap-2.5 rounded-xl border p-3.5 text-sm font-bold transition-all shadow-lg ${
                isRejected
                  ? 'border-red-500 bg-red-500/20 text-red-300 cursor-default'
                  : 'border-red-500/40 bg-red-950/40 text-red-400 hover:bg-red-500/20 hover:border-red-400 active:scale-95'
              } disabled:opacity-50`}
            >
              <XCircle size={18} className="shrink-0 text-red-400" />
              <span>Reject Order</span>
            </button>

            {/* 2. WAITING FOR CALLBACK ACTION BUTTON */}
            <button
              disabled={updating || order.status === 'Waiting For Callback'}
              onClick={() => handleStatusChange('Waiting For Callback', 'Awaiting Callback')}
              className={`flex items-center justify-center gap-2.5 rounded-xl border p-3.5 text-sm font-bold transition-all shadow-lg ${
                order.status === 'Waiting For Callback'
                  ? 'border-amber-500 bg-amber-500/20 text-amber-300 cursor-default'
                  : 'border-amber-500/40 bg-amber-950/40 text-amber-300 hover:bg-amber-500/20 hover:border-amber-400 active:scale-95'
              } disabled:opacity-50`}
            >
              <Clock size={18} className="shrink-0 text-amber-400" />
              <span>Waiting for Callback</span>
            </button>

            {/* 3. COMPLETE ACTION BUTTON */}
            <button
              disabled={updating || isCompleted}
              onClick={() => handleStatusChange('Completed', 'Active')}
              className={`flex items-center justify-center gap-2.5 rounded-xl border p-3.5 text-sm font-bold transition-all shadow-lg ${
                isCompleted
                  ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300 cursor-default'
                  : 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300 hover:bg-emerald-500/20 hover:border-emerald-400 active:scale-95'
              } disabled:opacity-50`}
            >
              <Check size={18} className="shrink-0 text-emerald-400" />
              <span>Complete Order</span>
            </button>
          </div>
        </Card>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-2" hover={false}>
          <h2 className="font-display text-lg font-semibold">Order Timeline</h2>
          {isRejected ? (
            <div className="mt-6 rounded-lg border border-signal-error/30 bg-signal-error/5 p-4 text-sm text-paper-300 flex items-center gap-3">
              <XCircle size={20} className="text-red-400 shrink-0" />
              <span>This order was rejected. Please contact support or place a new order.</span>
            </div>
          ) : (
            <ol className="mt-6 space-y-6">
              {stages.map((s, i) => {
                const done = i <= currentIndex
                return (
                  <li key={s.key} className="flex items-start gap-4">
                    {done ? (
                      <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-mint-400" />
                    ) : (
                      <Circle size={20} className="mt-0.5 shrink-0 text-paper-600" />
                    )}
                    <div>
                      <p className={clsx('font-medium', done ? 'text-paper-100' : 'text-paper-500')}>
                        {s.label}
                      </p>
                      {done && <p className="text-xs text-paper-500">{dateFormatted}</p>}
                    </div>
                  </li>
                )
              })}
            </ol>
          )}
        </Card>

        <Card className="p-6" hover={false}>
          <h2 className="font-display text-lg font-semibold">Receipt</h2>
          <dl className="mt-5 space-y-3 text-sm">
            {[
              ['Account Type', order.type || 'Instant'],
              ['Broker', order.broker || 'MetaTrader 5'],
              ['Account Size', `$${(order.size || 0).toLocaleString()}`],
              ['Price Paid', `$${order.price || 0}`],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between border-b border-white/[0.06] pb-3">
                <dt className="text-paper-400">{k}</dt>
                <dd className="num font-medium text-paper-100">{v}</dd>
              </div>
            ))}
            <div className="flex justify-between pt-1">
              <dt className="font-medium text-paper-100">Total</dt>
              <dd className="num font-bold text-gold-400">${order.price || 0}</dd>
            </div>
          </dl>
        </Card>
      </div>

      {/* COMPLETED ACCOUNT DETAILS SECTION */}
      {isCompleted && (
        <Card className="border-gold-500/30 bg-gradient-to-br from-gold-500/5 to-transparent p-6 sm:p-8" hover={false}>
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
            <div>
              <div className="flex items-center gap-2">
                <Badge tone="mint">Completed Account</Badge>
                <span className="text-xs text-paper-400">Live Trading Data</span>
              </div>
              <h2 className="mt-2 font-display text-2xl font-bold text-paper-50">Account Details</h2>
            </div>
            <div className="text-right">
              <span className="text-xs uppercase text-paper-400">Current Status</span>
              <p className="font-display text-lg font-bold text-mint-400">
                {accountDetails.accountStatus || 'Active'}
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <div className="rounded-xl border border-white/10 bg-ink-900/80 p-4">
              <span className="text-xs text-paper-400">Account Size</span>
              <p className="num mt-1 text-xl font-bold text-gold-400">
                {typeof accountDetails.accountSize === 'number'
                  ? `$${accountDetails.accountSize.toLocaleString()}`
                  : accountDetails.accountSize || `$${(order.size || 0).toLocaleString()}`}
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-ink-900/80 p-4">
              <span className="text-xs text-paper-400">Purchase Date</span>
              <p className="mt-1 font-medium text-paper-100">
                {accountDetails.purchaseDate || dateFormatted}
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-ink-900/80 p-4">
              <span className="text-xs text-paper-400">Broker</span>
              <p className="mt-1 font-medium text-paper-100">
                {accountDetails.broker || order.broker}
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-ink-900/80 p-4">
              <span className="text-xs text-paper-400">Challenge Type</span>
              <p className="mt-1 font-medium text-paper-100">
                {accountDetails.challengeType || order.type}
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-ink-900/80 p-4">
              <span className="text-xs text-paper-400">Daily Loss Limit</span>
              <p className="num mt-1 font-semibold text-signal-error">
                {accountDetails.dailyLossLimit}
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-ink-900/80 p-4">
              <span className="text-xs text-paper-400">Maximum Drawdown</span>
              <p className="num mt-1 font-semibold text-signal-error">
                {accountDetails.maxDrawdown}
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-ink-900/80 p-4">
              <span className="text-xs text-paper-400">Profit Target</span>
              <p className="num mt-1 font-semibold text-mint-400">
                {accountDetails.profitTarget}
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-ink-900/80 p-4">
              <span className="text-xs text-paper-400">Current Profit</span>
              <p className="num mt-1 font-semibold text-mint-400">
                {accountDetails.currentProfit}
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-ink-900/80 p-4">
              <span className="text-xs text-paper-400">Current Loss</span>
              <p className="num mt-1 font-semibold text-paper-200">
                {accountDetails.currentLoss}
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-ink-900/80 p-4">
              <span className="text-xs text-paper-400">Remaining Daily Loss</span>
              <p className="num mt-1 font-semibold text-paper-200">
                {accountDetails.remainingDailyLoss}
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-ink-900/80 p-4">
              <span className="text-xs text-paper-400">Remaining Drawdown</span>
              <p className="num mt-1 font-semibold text-paper-200">
                {accountDetails.remainingDrawdown}
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-ink-900/80 p-4">
              <span className="text-xs text-paper-400">Withdrawable Profit</span>
              <p className="num mt-1 text-xl font-bold text-mint-400">
                {accountDetails.withdrawableProfit}
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
