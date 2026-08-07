import { motion } from 'framer-motion'
import { Eyebrow, Section, Card } from '../components/ui/Primitives'
import { howItWorks } from '../data/content'
import Button from '../components/ui/Button'
import { ArrowRight } from 'lucide-react'

export default function HowItWorks() {
  return (
    <div className="pt-24">
      <Section className="pb-8 text-center">
        <Eyebrow className="justify-center flex">The Path to Funding</Eyebrow>
        <h1 className="mx-auto max-w-2xl font-display text-4xl font-semibold sm:text-5xl">
          From account purchase to funded trader
        </h1>
      </Section>

      <Section className="pt-0">
        <div className="relative mx-auto max-w-3xl">
          <div className="absolute left-6 top-2 bottom-2 hidden w-px bg-gradient-to-b from-gold-500/60 via-gold-500/20 to-transparent sm:block" />
          <div className="space-y-6">
            {howItWorks.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative flex gap-6 sm:pl-4"
              >
                <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold-500/40 bg-ink-900 font-mono text-sm font-bold text-gold-400">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <Card className="flex-1 p-6" hover={false}>
                  <h3 className="font-display text-xl font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-paper-400">{step.body}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex justify-center">
          <Button to="/accounts" size="lg">
            Start with an account <ArrowRight size={18} />
          </Button>
        </div>
      </Section>
    </div>
  )
}
