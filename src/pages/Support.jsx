import { LifeBuoy, MessageCircle, Mail, ArrowRight, MessageSquareCode } from 'lucide-react'
import { Eyebrow, Section, Card } from '../components/ui/Primitives'
import Button from '../components/ui/Button'
import { faqs } from '../data/content'
import { openLiveChat } from '../lib/livechat'

export default function Support() {
  return (
    <div className="pt-24">
      <Section className="pb-8 text-center">
        <Eyebrow className="justify-center flex">We're here to help</Eyebrow>
        <h1 className="mx-auto max-w-2xl font-display text-4xl font-semibold sm:text-5xl">
          Support Center
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-paper-400">
          Search the FAQ, start a live chat session, browse your tickets, or reach out directly — our team responds 24/7.
        </p>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="relative overflow-hidden border-gold-500/30 bg-gradient-to-b from-gold-500/10 to-transparent p-6">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gold-500/20 text-gold-400">
                <MessageSquareCode size={20} />
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-mint-500/10 px-2.5 py-0.5 text-xs font-medium text-mint-400 border border-mint-500/20">
                <span className="h-1.5 w-1.5 rounded-full bg-mint-400 animate-pulse" />
                Online
              </span>
            </div>
            <h3 className="mt-5 font-display text-lg font-semibold">Live Chat</h3>
            <p className="mt-2 text-sm text-paper-400">
              Connect instantly with our support team in real-time 24/7.
            </p>
            <Button onClick={openLiveChat} variant="primary" size="sm" className="mt-5 w-full">
              Start Live Chat <ArrowRight size={14} />
            </Button>
          </Card>

          <Card className="p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gold-500/10 text-gold-400">
              <LifeBuoy size={20} />
            </div>
            <h3 className="mt-5 font-display text-lg font-semibold">Open a Ticket</h3>
            <p className="mt-2 text-sm text-paper-400">
              Create a support ticket for account, billing, or technical issues.
            </p>
            <Button to="/login" variant="outline" size="sm" className="mt-5 w-full">
              Sign in to continue <ArrowRight size={14} />
            </Button>
          </Card>

          <Card className="p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-mint-500/10 text-mint-400">
              <MessageCircle size={20} />
            </div>
            <h3 className="mt-5 font-display text-lg font-semibold">Browse the FAQ</h3>
            <p className="mt-2 text-sm text-paper-400">
              Most questions about accounts, rules, and payouts are answered.
            </p>
            <Button to="/faq" variant="outline" size="sm" className="mt-5 w-full">
              View FAQ <ArrowRight size={14} />
            </Button>
          </Card>

          <Card className="p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/5 text-paper-200">
              <Mail size={20} />
            </div>
            <h3 className="mt-5 font-display text-lg font-semibold">Email Us</h3>
            <p className="mt-2 text-sm text-paper-400">
              Reach our support team directly via email anytime.
            </p>
            <Button href="mailto:support@qxtfunded.com" variant="outline" size="sm" className="mt-5 w-full">
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
