import { useState } from 'react'
import { ShieldCheck, Smartphone, CheckCircle2, AlertCircle } from 'lucide-react'
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth'
import { Card, Badge } from '../../components/ui/Primitives'
import { Label, Input } from '../../components/ui/Form'
import Button from '../../components/ui/Button'
import { auth } from '../../lib/firebase'
import { useAuth } from '../../lib/AuthContext'

export default function Security() {
  const { user } = useAuth()
  const [current, setCurrent] = useState('')
  const [newPass, setNewPass] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleUpdatePassword = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    if (newPass !== confirmPass) {
      return setError('New passwords do not match')
    }
    if (newPass.length < 6) {
      return setError('Password must be at least 6 characters long')
    }

    setSubmitting(true)
    try {
      if (auth.currentUser && auth.currentUser.email && current) {
        const credential = EmailAuthProvider.credential(auth.currentUser.email, current)
        await reauthenticateWithCredential(auth.currentUser, credential)
      }
      if (auth.currentUser) {
        await updatePassword(auth.currentUser, newPass)
        setSuccess(true)
        setCurrent('')
        setNewPass('')
        setConfirmPass('')
      }
    } catch (err) {
      console.error(err)
      setError(err.message || 'Failed to update password. Please check your current password.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold">Security</h1>
        <p className="mt-1 text-sm text-paper-400">Keep your account safe.</p>
      </div>

      {success && (
        <div className="flex items-center gap-2 rounded-lg border border-mint-500/30 bg-mint-500/10 p-3 text-xs text-mint-400">
          <CheckCircle2 size={16} /> Password updated successfully!
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 rounded-lg border border-signal-error/30 bg-signal-error/10 p-3 text-xs text-signal-error">
          <AlertCircle size={16} /> {error}
        </div>
      )}

      <Card className="p-6" hover={false}>
        <h2 className="font-display text-lg font-semibold">Change Password</h2>
        <form onSubmit={handleUpdatePassword} className="mt-5 space-y-4">
          <div>
            <Label htmlFor="current">Current Password</Label>
            <Input id="current" type="password" placeholder="••••••••" value={current} onChange={(e) => setCurrent(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="newpass">New Password</Label>
            <Input id="newpass" type="password" placeholder="••••••••" value={newPass} onChange={(e) => setNewPass(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="confirmpass">Confirm New Password</Label>
            <Input id="confirmpass" type="password" placeholder="••••••••" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} required />
          </div>
          <Button type="submit" disabled={submitting}>
            {submitting ? 'Updating…' : 'Update Password'}
          </Button>
        </form>
      </Card>

      <Card className="flex items-center justify-between gap-4 p-6" hover={false}>
        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-mint-500/10 text-mint-400">
            <ShieldCheck size={20} />
          </div>
          <div>
            <p className="font-medium text-paper-100">Two-Factor Authentication</p>
            <p className="text-sm text-paper-400">Add an extra layer of security to your account.</p>
          </div>
        </div>
        <Badge tone="neutral">Not enabled</Badge>
      </Card>

      <Card className="flex items-center justify-between gap-4 p-6" hover={false}>
        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gold-500/10 text-gold-400">
            <Smartphone size={20} />
          </div>
          <div>
            <p className="font-medium text-paper-100">Active Sessions</p>
            <p className="text-sm text-paper-400">1 device currently signed in.</p>
          </div>
        </div>
        <Button variant="ghost" size="sm">Manage</Button>
      </Card>
    </div>
  )
}
