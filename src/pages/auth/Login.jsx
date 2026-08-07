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

  const { signIn, signInWithGoogle, loading } = useAuth()
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

  const handleGoogleSignIn = async () => {
    setError('')
    setSubmitting(true)
    try {
      const user = await signInWithGoogle()
      if (user) {
        navigate(redirectTarget)
      }
    } catch (err) {
      console.error(err)
      setError(err.message || 'Failed to sign in with Google.')
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

        <div className="flex items-center gap-3 py-1">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-xs text-paper-500">or</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <Button
          type="button"
          variant="secondary"
          className="w-full"
          onClick={handleGoogleSignIn}
          disabled={submitting || loading}
        >
          <GoogleIcon />
          Continue with Google
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

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24">
      <path
        fill="#EA4335"
        d="M12 10.2v3.9h5.5c-.24 1.35-1.7 3.96-5.5 3.96-3.3 0-6-2.73-6-6.1s2.7-6.1 6-6.1c1.88 0 3.14.8 3.86 1.5l2.6-2.5C16.9 3.3 14.7 2.3 12 2.3 6.9 2.3 2.75 6.5 2.75 12S6.9 21.7 12 21.7c6.9 0 9.5-4.85 9.5-7.36 0-.5-.05-.87-.12-1.24H12z"
      />
    </svg>
  )
}
