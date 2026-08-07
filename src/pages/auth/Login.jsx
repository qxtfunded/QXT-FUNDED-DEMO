import { useState } from 'react'
import { useNavigate, Link, useSearchParams } from 'react-router-dom'
import { Mail, Lock, AlertCircle } from 'lucide-react'
import AuthShell from '../../components/layout/AuthShell'
import { Label, Input, Checkbox } from '../../components/ui/Form'
import Button from '../../components/ui/Button'
import { useAuth } from '../../lib/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const { signIn, loading } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const redirectTarget = searchParams.get('redirect') ? decodeURIComponent(searchParams.get('redirect')) : '/dashboard'

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await signIn(email, password)
      navigate(redirectTarget)
    } catch (err) {
      console.error(err)
      setError(err.message || 'Failed to sign in. Please check your credentials.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AuthShell title="Welcome back" subtitle="Sign in to access your dashboard and orders.">
      <form onSubmit={onSubmit} className="space-y-5">
        {error && (
          <div className="flex items-center gap-2 rounded-lg border border-signal-error/30 bg-signal-error/10 p-3 text-xs text-signal-error">
            <AlertCircle size={16} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            icon={Mail}
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link to="/forgot-password" className="text-xs font-medium text-gold-400 hover:underline">
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            icon={Lock}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Checkbox label="Remember me on this device" defaultChecked />
        <Button type="submit" className="w-full" disabled={submitting || loading}>
          {submitting ? 'Signing in…' : 'Sign In'}
        </Button>

        <p className="pt-2 text-center text-sm text-paper-400">
          Don't have an account?{' '}
          <Link to="/signup" className="font-medium text-gold-400 hover:underline">
            Get funded
          </Link>
        </p>
      </form>
    </AuthShell>
  )
}
