import { useSearchParams } from 'react-router-dom'
import { CheckCircle2, ArrowRight, Home, ShieldCheck } from 'lucide-react'
import { Eyebrow, Section, Card } from '../components/ui/Primitives'
import Button from '../components/ui/Button'

export default function ThankYou() {
  const [searchParams] = useSearchParams()
  const type = searchParams.get('type') || 'inquiry'

  const title = type === 'contact' ? 'Message Sent Successfully' : 'Thank You'
  const message =
    type === 'contact'
      ? 'Thank you for reaching out to QXT Funded. Your message has been received by our operations desk, and a team member will reply to your email within 24 hours.'
      : 'Thank you for your submission. Your request has been recorded in our system and is currently being processed by our team.'

  return (
    <div className="pt-24 min-h-[80vh] flex flex-col justify-center">
      <Section className="py-16 text-center">
        <div className="mx-auto max-w-xl">
          <Eyebrow className="justify-center flex">Submission Confirmed</Eyebrow>
          <div className="mx-auto mt-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-mint-500/30 bg-mint-500/10 text-mint-400 shadow-lg shadow-mint-500/10">
            <CheckCircle2 size={32} />
          </div>
          <h1 className="mt-6 font-display text-3xl font-semibold sm:text-4xl text-paper-50">
            {title}
          </h1>
          <p className="mt-4 text-base text-paper-300 leading-relaxed">
            {message}
          </p>

          <Card className="mx-auto mt-8 p-6 text-left" hover={false}>
            <div className="flex items-start gap-3">
              <ShieldCheck className="h-5 w-5 text-gold-400 shrink-0 mt-0.5" />
              <div className="text-xs text-paper-400 leading-relaxed">
                <span className="font-semibold text-paper-200">24/7 Priority Trading Support:</span> If your inquiry is urgent or related to an active evaluation account, you can also connect directly with an agent via our round-the-clock Live Chat desk.
              </div>
            </div>
          </Card>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button to="/" variant="secondary" size="md" className="w-full sm:w-auto">
              <Home size={16} /> Return to Home
            </Button>
            <Button to="/accounts" variant="primary" size="md" className="w-full sm:w-auto">
              Explore Accounts <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </Section>
    </div>
  )
}
