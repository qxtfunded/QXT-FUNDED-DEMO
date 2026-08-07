import { useState } from 'react'
import clsx from 'clsx'
import { motion, AnimatePresence } from 'framer-motion'
import { Eyebrow, Section } from '../components/ui/Primitives'
import AccountCard from '../components/sections/AccountCard'
import { instantPlans, challengePlans } from '../data/accounts'

const tabs = [
  { key: 'instant', label: 'Instant Accounts', plans: instantPlans },
  { key: 'challenge', label: 'Challenge Accounts', plans: challengePlans },
]

export default function Accounts() {
  const [active, setActive] = useState('instant')
  const current = tabs.find((t) => t.key === active)

  return (
    <div className="pt-24">
      <Section className="pb-8">
        <Eyebrow>Account Types</Eyebrow>
        <h1 className="max-w-2xl font-display text-4xl font-semibold sm:text-5xl">
          Choose your trading account
        </h1>
        <p className="mt-4 max-w-xl text-paper-400">
          Instant accounts for direct trading, or Challenge accounts with a lower entry cost
          that unlock funding once you clear the evaluation.
        </p>

        <div className="mt-8 inline-flex rounded-xl border border-white/10 bg-ink-800 p-1">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setActive(t.key)}
              className={clsx(
                'relative rounded-lg px-5 py-2.5 text-sm font-medium transition-colors',
                active === t.key ? 'text-ink-950' : 'text-paper-300 hover:text-paper-100'
              )}
            >
              {active === t.key && (
                <motion.span
                  layoutId="tab-pill"
                  className="absolute inset-0 rounded-lg bg-gradient-to-b from-gold-300 to-gold-500"
                  transition={{ type: 'spring', duration: 0.5 }}
                />
              )}
              <span className="relative">{t.label}</span>
            </button>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {current.plans.map((plan) => (
              <AccountCard key={`${plan.type}-${plan.size}`} plan={plan} />
            ))}
          </motion.div>
        </AnimatePresence>

        <p className="mt-10 text-center text-xs text-paper-500">
          All accounts run on simulated evaluation environments. Profit splits are paid from
          firm capital once an account reaches funded status. See our{' '}
          <a href="/legal/risk" className="text-gold-400 hover:underline">
            Risk Disclosure
          </a>{' '}
          for full details.
        </p>
      </Section>
    </div>
  )
}
