import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, CheckCircle2, AlertCircle } from 'lucide-react'
import AuthShell from '../../components/layout/AuthShell'
import { Label, Input } from '../../components/ui/Form'
import Button from '../../components/ui/Button'
import { useAuth } from '../../lib/AuthContext'
import { formatAuthErrorMessage } from '../../lib/firebase'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const { resetPassword } = useAuth()

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await resetPassword(email)
      setSent(true)
    } catch (err) {
      console.error(err)
      setError(formatAuthErrorMessage(err))
    } finally {
      setSubmitting(false)
    }
  }

  if (sent) {
    return (
      <AuthShell title="Check your inbox">
        <div className="flex flex-col items-center gap-4 rounded-xl border border-mint-500/20 bg-mint-500/5 p-8 text-center">
          <CheckCircle2 size={40} className="text-mint-400" />
          <p className="text-sm text-paper-300">
            If an account exists for <strong className="text-paper-100">{email}</strong>, a
            reset link is on its way.
          </p>
          <Link to="/login" className="text-sm font-medium text-gold-400 hover:underline">
            Back to sign in
          </Link>
        </div>
      </AuthShell>
    )
  }

  return (
    <AuthShell title="Reset your password" subtitle="We'll email you a link to reset it.">
      <form onSubmit={onSubmit} className="space-y-5">
        {error && (
          <div className="flex items-center gap-2 rounded-lg border border-signal-error/30 bg-signal-error/10 p-3 text-xs text-signal-error">
            <AlertCircle size={16} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" icon={Mail} placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <Button type="submit" className="w-full" disabled={submitting}>
          {submitting ? 'Sending…' : 'Send Reset Link'}
        </Button>
        <p className="text-center text-sm text-paper-400">
          <Link to="/login" className="font-medium text-gold-400 hover:underline">Back to sign in</Link>
        </p>
      </form>
    </AuthShell>
  )
}
