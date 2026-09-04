import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, MessageSquare, AlertCircle, Loader2 } from 'lucide-react'
import { Eyebrow, Section, Card } from '../components/ui/Primitives'
import { Label, Input, Textarea } from '../components/ui/Form'
import Button from '../components/ui/Button'
import { validateLegalEmail } from '../lib/firebase'

export default function Contact() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!form.name.trim()) {
      return setError('Please enter your full name.')
    }

    const emailErr = validateLegalEmail(form.email)
    if (emailErr) {
      return setError(emailErr)
    }

    if (!form.message.trim() || form.message.trim().length < 10) {
      return setError('Please provide a message with at least 10 characters so we can assist you.')
    }

    setSubmitting(true)
    try {
      // Simulate sending inquiry / network delay
      await new Promise((resolve) => setTimeout(resolve, 800))
      navigate('/thank-you?type=contact')
    } catch (err) {
      setError('An error occurred while sending your message. Please try again.')
      setSubmitting(false)
    }
  }

  return (
    <div className="pt-24">
      <Section className="pb-24">
        <div className="mx-auto max-w-xl text-center">
          <Eyebrow className="justify-center flex">Get in Touch</Eyebrow>
          <h1 className="font-display text-4xl font-semibold sm:text-5xl">Contact Us</h1>
          <p className="mt-4 text-paper-400">
            Questions before you sign up? Send us a message and we'll get back to you within a
            day.
          </p>
        </div>

        <Card className="mx-auto mt-10 max-w-xl p-6" hover={false}>
          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="flex items-center gap-2 rounded-lg border border-signal-error/30 bg-signal-error/10 p-3 text-xs text-signal-error">
                <AlertCircle size={16} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="cname">Full Name</Label>
                <Input
                  id="cname"
                  placeholder="Alex Trader"
                  value={form.name}
                  onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="cemail">Email</Label>
                <Input
                  id="cemail"
                  type="email"
                  icon={Mail}
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="cmessage">Message</Label>
              <Textarea
                id="cmessage"
                rows={5}
                placeholder="How can we help?"
                value={form.message}
                onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Sending Message…
                </>
              ) : (
                <>
                  <MessageSquare size={16} /> Send Message
                </>
              )}
            </Button>
          </form>
        </Card>
      </Section>
    </div>
  )
}
