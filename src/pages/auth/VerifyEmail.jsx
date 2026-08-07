import { useState } from 'react'
import { MailCheck, CheckCircle } from 'lucide-react'
import AuthShell from '../../components/layout/AuthShell'
import Button from '../../components/ui/Button'
import { useAuth } from '../../lib/AuthContext'

export default function VerifyEmail() {
  const { resendVerification } = useAuth()
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  const handleResend = async () => {
    setSending(true)
    try {
      await resendVerification()
      setSent(true)
    } catch (err) {
      console.error(err)
    } finally {
      setSending(false)
    }
  }

  return (
    <AuthShell title="Verify your email">
      <div className="flex flex-col items-center gap-5 rounded-xl border border-white/10 bg-ink-800 p-8 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold-500/10 text-gold-400">
          <MailCheck size={28} />
        </div>
        <p className="text-sm leading-relaxed text-paper-300">
          We've sent a verification link to your email. Click it to activate your account and
          access your dashboard.
        </p>

        {sent && (
          <div className="flex items-center gap-2 text-xs text-mint-400">
            <CheckCircle size={14} /> Verification email resent!
          </div>
        )}

        <Button variant="secondary" className="w-full" onClick={handleResend} disabled={sending}>
          {sending ? 'Resending…' : 'Resend Email'}
        </Button>
        <Button to="/dashboard" variant="ghost" className="w-full">
          Continue to Dashboard
        </Button>
      </div>
    </AuthShell>
  )
}
