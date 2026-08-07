import { Star, ShieldCheck } from 'lucide-react'
import { Eyebrow, Section, Card } from '../components/ui/Primitives'
import { reviews } from '../data/content'

export default function Reviews() {
  return (
    <div className="pt-24">
      <Section className="pb-8 text-center">
        <Eyebrow className="justify-center flex">Trustpilot</Eyebrow>
        <h1 className="mx-auto max-w-2xl font-display text-4xl font-semibold sm:text-5xl">
          What our traders say
        </h1>
        <div className="mt-4 flex items-center justify-center gap-2">
          <span className="num font-display text-3xl font-bold text-gold-300">4.8</span>
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={18} className="fill-gold-400 text-gold-400" />
            ))}
          </div>
          <span className="text-sm text-paper-400">from 2,400+ reviews</span>
        </div>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...reviews, ...reviews.slice(0, 2)].map((r, i) => (
            <Card key={r.name + i} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex gap-0.5">
                  {Array.from({ length: r.stars }).map((_, i2) => (
                    <Star key={i2} size={14} className="fill-gold-400 text-gold-400" />
                  ))}
                </div>
                <ShieldCheck size={16} className="text-mint-400" />
              </div>
              <p className="mt-4 text-sm leading-relaxed text-paper-300">"{r.text}"</p>
              <div className="mt-5 flex items-center gap-3 border-t border-white/[0.06] pt-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-500/10 text-xs font-bold text-gold-400">
                  {r.country}
                </div>
                <div>
                  <p className="text-sm font-semibold text-paper-100">{r.name}</p>
                  <p className="text-xs text-paper-500">{r.countryName}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>
    </div>
  )
}
