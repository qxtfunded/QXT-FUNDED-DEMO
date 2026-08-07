import { Eyebrow, Section, Card, Badge } from '../components/ui/Primitives'
import { brokers } from '../data/content'
import { ArrowUpRight } from 'lucide-react'

export default function Brokers() {
  return (
    <div className="pt-24">
      <Section className="pb-8">
        <Eyebrow>Trading Environments</Eyebrow>
        <h1 className="max-w-2xl font-display text-4xl font-semibold sm:text-5xl">
          Trade on the platforms you know
        </h1>
        <p className="mt-4 max-w-xl text-paper-400">
          Every account gives you a choice of broker environment. Pick the one that matches how
          you already trade.
        </p>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {brokers.map((b) => (
            <Card key={b.name} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ink-800 p-1.5 shadow-md border border-white/10">
                  <img
                    src={b.logoUrl}
                    alt={b.name}
                    className="h-full w-full object-contain"
                    loading="eager"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <Badge tone="mint">Active</Badge>
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold">{b.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-paper-400">{b.note}</p>
              <button className="mt-5 flex items-center gap-1.5 text-sm font-medium text-gold-400 hover:text-gold-300">
                Platform details <ArrowUpRight size={14} />
              </button>
            </Card>
          ))}
        </div>
      </Section>
    </div>
  )
}
