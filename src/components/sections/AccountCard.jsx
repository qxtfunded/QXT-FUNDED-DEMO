import { ArrowRight, Zap, Target } from 'lucide-react'
import clsx from 'clsx'
import { Card, Badge } from '../ui/Primitives'
import Button from '../ui/Button'
import { currency } from '../../data/accounts'

export default function AccountCard({ plan }) {
  const isInstant = plan.type === 'instant'

  return (
    <Card
      className={clsx(
        'flex flex-col p-6',
        plan.popular && 'border-gold-500/50 shadow-gold-lg ring-1 ring-gold-500/20'
      )}
    >
      {plan.popular && (
        <div className="absolute -top-3 right-6 rounded-full bg-gradient-to-r from-gold-300 to-gold-500 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-ink-950">
          Popular
        </div>
      )}

      <Badge tone={isInstant ? 'mint' : 'gold'} className="w-fit">
        {isInstant ? <Zap size={12} /> : <Target size={12} />}
        {plan.fundingLabel}
      </Badge>

      <div className="mt-5">
        <p className="num text-3xl font-bold text-paper-50">{currency(plan.size)}</p>
        <p className="mt-1 text-sm text-paper-400">
          Account size ·{' '}
          <span className="num font-semibold text-gold-400">${plan.price}</span> one-time
        </p>
      </div>

      <div className="my-5 h-px w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent" />

      <dl className="space-y-3 text-sm">
        {plan.profitTarget && (
          <Row label="Profit Target" value={currency(plan.profitTarget)} tone="mint" />
        )}
        <Row label="Daily Loss Limit" value={currency(plan.dailyLoss)} />
        {plan.drawdown && <Row label="Max Drawdown" value={currency(plan.drawdown)} tone="error" />}
        <Row label="Profit Split" value={`${plan.split}%`} tone="gold" />
        <Row label="Funding Type" value={isInstant ? 'Instant' : 'Two-Step Evaluation'} />
      </dl>

      <Button to={`/checkout?plan=${plan.type}-${plan.size}`} className="mt-6 w-full group">
        Get Funded
        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
      </Button>
    </Card>
  )
}

function Row({ label, value, tone }) {
  const toneClass = {
    mint: 'text-mint-400',
    gold: 'text-gold-400',
    error: 'text-signal-error',
  }[tone]

  return (
    <div className="flex items-center justify-between">
      <dt className="text-paper-400">{label}</dt>
      <dd className={clsx('num font-semibold', toneClass || 'text-paper-100')}>{value}</dd>
    </div>
  )
}
