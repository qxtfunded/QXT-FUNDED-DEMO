import { Mail, MessageSquare } from 'lucide-react'
import { Eyebrow, Section, Card } from '../components/ui/Primitives'
import { Label, Input, Textarea } from '../components/ui/Form'
import Button from '../components/ui/Button'

export default function Contact() {
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
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="cname">Full Name</Label>
                <Input id="cname" required />
              </div>
              <div>
                <Label htmlFor="cemail">Email</Label>
                <Input id="cemail" type="email" icon={Mail} required />
              </div>
            </div>
            <div>
              <Label htmlFor="cmessage">Message</Label>
              <Textarea id="cmessage" rows={5} placeholder="How can we help?" required />
            </div>
            <Button type="submit" className="w-full">
              <MessageSquare size={16} /> Send Message
            </Button>
          </form>
        </Card>
      </Section>
    </div>
  )
}
