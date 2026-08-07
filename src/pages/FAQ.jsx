import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ChevronDown } from 'lucide-react'
import clsx from 'clsx'
import { Eyebrow, Section, Card, Badge } from '../components/ui/Primitives'
import { faqs } from '../data/content'

const categories = ['All', ...new Set(faqs.map((f) => f.category))]

export default function FAQ() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [openIndex, setOpenIndex] = useState(null)

  const filtered = useMemo(() => {
    return faqs.filter((f) => {
      const matchesCategory = category === 'All' || f.category === category
      const matchesQuery =
        query.trim() === '' ||
        f.q.toLowerCase().includes(query.toLowerCase()) ||
        f.a.toLowerCase().includes(query.toLowerCase())
      return matchesCategory && matchesQuery
    })
  }, [query, category])

  return (
    <div className="pt-24">
      <Section className="pb-8">
        <Eyebrow>Support</Eyebrow>
        <h1 className="max-w-2xl font-display text-4xl font-semibold sm:text-5xl">
          Frequently asked questions
        </h1>
        <p className="mt-4 max-w-xl text-paper-400">
          Find immediate answers about accounts, rules, and payouts.
        </p>

        <div className="mt-8 flex items-center gap-3 rounded-xl border border-white/10 bg-ink-800 px-4 py-3">
          <Search size={18} className="text-paper-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search FAQ topics… (e.g. confirmation, daily loss, drawdown)"
            className="w-full bg-transparent text-sm text-paper-100 placeholder:text-paper-500 focus:outline-none"
          />
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button key={c} onClick={() => setCategory(c)}>
              <Badge tone={category === c ? 'gold' : 'neutral'} className="cursor-pointer">
                {c}
              </Badge>
            </button>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <div className="mx-auto max-w-3xl space-y-3">
          {filtered.length === 0 && (
            <p className="py-12 text-center text-paper-500">No results for "{query}".</p>
          )}
          {filtered.map((f, i) => {
            const isOpen = openIndex === i
            return (
              <Card key={f.q} hover={false} className="overflow-hidden p-0">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="font-medium text-paper-100">{f.q}</span>
                  <ChevronDown
                    size={18}
                    className={clsx(
                      'shrink-0 text-gold-400 transition-transform',
                      isOpen && 'rotate-180'
                    )}
                  />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm leading-relaxed text-paper-400">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            )
          })}
        </div>
      </Section>
    </div>
  )
}
