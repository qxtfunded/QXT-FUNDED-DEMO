import { LifeBuoy, MessageCircle, Mail, ArrowRight } from 'lucide-react'
import { Eyebrow, Section, Card } from '../components/ui/Primitives'
import Button from '../components/ui/Button'
import { faqs } from '../data/content'

export default function Support() {
  return (
    <div className="pt-24">
      <Section className="pb-8 text-center">
        <Eyebrow className="justify-center flex">We're here to help</Eyebrow>
        <h1 className="mx-auto max-w-2xl font-display text-4xl font-semibold sm:text-5xl">
          Support Center
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-paper-400">
          Search the FAQ, browse your tickets, or reach out directly — our team responds 24/7.
        </p>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-6 sm:grid-cols-3">
          <Card className="p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gold-500/10 text-gold-400">
              <LifeBuoy size={20} />
            </div>
            <h3 className="mt-5 font-display text-lg font-semibold">Open a Ticket</h3>
            <p className="mt-2 text-sm text-paper-400">
              Sign in and create a support ticket for account, billing, or technical issues.
            </p>
            <Button to="/login" variant="outline" size="sm" className="mt-5">
              Sign in to continue <ArrowRight size={14} />
            </Button>
          </Card>
          <Card className="p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-mint-500/10 text-mint-400">
              <MessageCircle size={20} />
            </div>
            <h3 className="mt-5 font-display text-lg font-semibold">Browse the FAQ</h3>
            <p className="mt-2 text-sm text-paper-400">
              Most questions about accounts, rules, and payouts are answered instantly.
            </p>
            <Button to="/faq" variant="outline" size="sm" className="mt-5">
              View FAQ <ArrowRight size={14} />
            </Button>
          </Card>
          <Card className="p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/5 text-paper-200">
              <Mail size={20} />
            </div>
            <h3 className="mt-5 font-display text-lg font-semibold">Email Us</h3>
            <p className="mt-2 text-sm text-paper-400">
              For anything else, reach our team directly and we'll follow up within a day.
            </p>
            <Button href="mailto:support@qxtfunded.com" variant="outline" size="sm" className="mt-5">
              support@qxtfunded.com
            </Button>
          </Card>
        </div>
      </Section>

      <Section className="pt-0">
        <h2 className="font-display text-2xl font-semibold">Popular questions</h2>
        <div className="mt-6 space-y-3">
          {faqs.slice(0, 3).map((f) => (
            <Card key={f.q} hover={false} className="p-5">
              <p className="font-medium text-paper-100">{f.q}</p>
              <p className="mt-2 text-sm text-paper-400">{f.a}</p>
            </Card>
          ))}
        </div>
      </Section>
    </div>
  )
}
