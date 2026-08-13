import { useState } from 'react'
import { useNavigate, Link, useSearchParams } from 'react-router-dom'
import { Mail, Lock, User, Globe, AlertCircle } from 'lucide-react'
import AuthShell from '../../components/layout/AuthShell'
import { Label, Input, Select, Checkbox } from '../../components/ui/Form'
import Button from '../../components/ui/Button'
import { useAuth } from '../../lib/AuthContext'
import { formatAuthErrorMessage } from '../../lib/firebase'

const countries = [
  'United States', 'United Kingdom', 'United Arab Emirates', 'Pakistan', 'India',
  'Canada', 'Australia', 'Germany', 'France', 'Nigeria', 'South Africa', 'Other',
]

export default function Signup() {
  const [form, setForm] = useState({
    name: '', email: '', password: '', confirm: '', country: '',
  })
  const [agreed, setAgreed] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const { signUp, loading } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const redirectTarget = searchParams.get('redirect') ? decodeURIComponent(searchParams.get('redirect')) : '/dashboard'

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirm) return setError('Passwords do not match')
    if (!agreed) return setError('Please accept the Terms & Agreement')

    setSubmitting(true)
    try {
      await signUp(form.name, form.email, form.password, form.country)
      navigate(redirectTarget)
    } catch (err) {
      console.error(err)
      setError(formatAuthErrorMessage(err))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AuthShell title="Create your account" subtitle="Start your path to a funded account.">
      <form onSubmit={onSubmit} className="space-y-4">
        {error && (
          <div className="flex items-center gap-2 rounded-lg border border-signal-error/30 bg-signal-error/10 p-3 text-xs text-signal-error">
            <AlertCircle size={16} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" icon={User} placeholder="Alex Trader" value={form.name} onChange={update('name')} required />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" icon={Mail} placeholder="you@example.com" value={form.email} onChange={update('email')} required />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" icon={Lock} placeholder="••••••••" value={form.password} onChange={update('password')} required />
          </div>
          <div>
            <Label htmlFor="confirm">Confirm</Label>
            <Input id="confirm" type="password" icon={Lock} placeholder="••••••••" value={form.confirm} onChange={update('confirm')} required />
          </div>
        </div>
        <div>
          <Label htmlFor="country">Country</Label>
          <div className="relative">
            <Globe size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-paper-500" />
            <Select id="country" className="pl-10" value={form.country} onChange={update('country')} required>
              <option value="" disabled>Select your country</option>
              {countries.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </Select>
          </div>
        </div>
        <Checkbox
          label={<>I agree to the <Link to="/legal/terms" className="text-gold-400 hover:underline">Terms & Agreement</Link> and <Link to="/legal/risk" className="text-gold-400 hover:underline">Risk Disclosure</Link></>}
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
        />
        <Button type="submit" className="w-full" disabled={submitting || loading}>
          {submitting ? 'Creating account…' : 'Create Account'}
        </Button>

        <p className="pt-2 text-center text-sm text-paper-400">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-gold-400 hover:underline">Sign in</Link>
        </p>
      </form>
    </AuthShell>
  )
}
