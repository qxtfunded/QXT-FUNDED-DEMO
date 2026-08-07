import { motion } from 'framer-motion'
import { ArrowRight, ShieldCheck, Gauge, Wallet2, Headphones, Star, ChevronRight } from 'lucide-react'
import Button from '../components/ui/Button'
import { Card, Badge, Eyebrow, Section } from '../components/ui/Primitives'
import EquityCurve from '../components/sections/EquityCurve'
import AccountCard from '../components/sections/AccountCard'
import { instantPlans } from '../data/accounts'
import { brokers, reviews, stats, faqs } from '../data/content'
import { Link } from 'react-router-dom'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative flex min-h-screen items-center overflow-hidden bg-radial-glow pt-24">
        <div className="absolute inset-0 bg-grid-fade bg-grid [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]" />
        <EquityCurve />
        <div className="relative mx-auto max-w-7xl px-6 py-20">
          <motion.div initial="hidden" animate="show" variants={fadeUp} custom={0}>
            <Badge tone="gold">
              <span className="h-1.5 w-1.5 rounded-full bg-mint-400" />
              Live evaluations open · 5 broker environments
            </Badge>
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={1}
            className="mt-6 max-w-3xl font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          >
            Prove your edge.
            <br />
            <span className="text-gradient-gold">Get funded.</span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={2}
            className="mt-6 max-w-xl text-lg leading-relaxed text-paper-300"
          >
            QXT Funded gives skilled traders access to capital up to $50,000. Start with an
            Instant account or prove yourself through a simulated evaluation — then keep up to
            92% of the profits you generate.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={3}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Button to="/accounts" size="lg" className="group">
              Start Trading
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Button>
            <Button to="/how-it-works" size="lg" variant="ghost">
              How It Works
              <ChevronRight size={16} />
            </Button>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={4}
            className="mt-16 grid grid-cols-2 gap-6 border-t border-white/[0.06] pt-8 sm:grid-cols-4"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <p className="num font-display text-3xl font-bold text-gold-300 sm:text-4xl">
                  {s.value}
                </p>
                <p className="mt-1 text-xs uppercase tracking-wide text-paper-400">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <Section>
        <div className="max-w-2xl">
          <Eyebrow>Why traders choose us</Eyebrow>
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">
            Built for traders who take this seriously
          </h2>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: Wallet2,
              title: 'Up to 92% split',
              body: 'Among the highest profit splits in the industry, paid on a recurring cycle.',
            },
            {
              icon: Gauge,
              title: 'Instant or evaluation',
              body: 'Skip the wait with an Instant account, or take the lower-cost Challenge path.',
            },
            {
              icon: ShieldCheck,
              title: 'Transparent rules',
              body: 'Every limit — daily loss, drawdown, profit target — is stated upfront, no surprises.',
            },
            {
              icon: Headphones,
              title: '24/7 support',
              body: 'A support team and ticketing system that actually responds, day or night.',
            },
          ].map((f, i) => (
            <motion.div
              key={f.title}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              variants={fadeUp}
              custom={i}
            >
              <Card className="h-full p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gold-500/10 text-gold-400">
                  <f.icon size={20} />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-paper-400">{f.body}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ACCOUNT PREVIEW */}
      <Section className="bg-ink-900/40">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <Eyebrow>Account Types</Eyebrow>
            <h2 className="font-display text-3xl font-semibold sm:text-4xl">
              Choose your trading account
            </h2>
            <p className="mt-3 text-paper-400">
              Instant accounts for direct trading, or Challenge accounts with a lower entry cost.
            </p>
          </div>
          <Button to="/accounts" variant="outline">
            View all accounts <ArrowRight size={16} />
          </Button>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {instantPlans.slice(0, 4).map((plan) => (
            <AccountCard key={plan.size} plan={plan} />
          ))}
        </div>
      </Section>

      {/* BROKERS */}
      <Section>
        <div className="max-w-xl">
          <Eyebrow>Trading Environments</Eyebrow>
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">
            Trade on platforms you already know
          </h2>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {brokers.map((b) => (
            <Card key={b.name} className="flex flex-col items-center gap-3 p-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-ink-700 to-ink-800 font-display text-lg font-bold text-gold-400">
                {b.name.charAt(0)}
              </div>
              <p className="text-sm font-semibold text-paper-100">{b.name}</p>
              <Badge tone="mint" className="text-[10px]">
                Active
              </Badge>
            </Card>
          ))}
        </div>
      </Section>

      {/* REVIEWS */}
      <Section className="bg-ink-900/40">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>Trustpilot</Eyebrow>
            <h2 className="font-display text-3xl font-semibold sm:text-4xl">
              What our traders say
            </h2>
            <div className="mt-3 flex items-center gap-2">
              <span className="num font-display text-2xl font-bold text-gold-300">4.8</span>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} className="fill-gold-400 text-gold-400" />
                ))}
              </div>
              <span className="text-sm text-paper-400">from 2,400+ reviews</span>
            </div>
          </div>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reviews.map((r) => (
            <Card key={r.name} className="p-6">
              <div className="flex gap-0.5">
                {Array.from({ length: r.stars }).map((_, i) => (
                  <Star key={i} size={14} className="fill-gold-400 text-gold-400" />
                ))}
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

      {/* FAQ PREVIEW */}
      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow className="justify-center flex">Questions</Eyebrow>
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">
            Frequently asked questions
          </h2>
        </div>
        <div className="mx-auto mt-12 max-w-3xl space-y-3">
          {faqs.slice(0, 4).map((f) => (
            <Card key={f.q} hover={false} className="p-5">
              <p className="font-medium text-paper-100">{f.q}</p>
              <p className="mt-2 text-sm leading-relaxed text-paper-400">{f.a}</p>
            </Card>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Button to="/faq" variant="outline">
            View all FAQs <ArrowRight size={16} />
          </Button>
        </div>
      </Section>

      {/* FINAL CTA */}
      <Section>
        <Card className="relative overflow-hidden p-10 text-center sm:p-16" hover={false}>
          <div className="absolute inset-0 bg-radial-glow" />
          <div className="relative">
            <h2 className="font-display text-3xl font-semibold sm:text-4xl">
              Ready to trade with real backing?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-paper-400">
              Choose your account size and get started in minutes. Your dashboard, orders, and
              payouts are all in one place.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button to="/accounts" size="lg">
                Get Funded <ArrowRight size={18} />
              </Button>
              <Button to="/faq" size="lg" variant="secondary">
                Read the FAQ
              </Button>
            </div>
          </div>
        </Card>
      </Section>
    </>
  )
}
