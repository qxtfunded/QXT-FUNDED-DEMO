import { useState, useEffect } from 'react'
import { Camera, Trash2, CheckCircle2, AlertCircle } from 'lucide-react'
import { Card } from '../../components/ui/Primitives'
import { Label, Input, Select } from '../../components/ui/Form'
import Button from '../../components/ui/Button'
import { useAuth } from '../../lib/AuthContext'

export default function Profile() {
  const { user, userData, updateUserProfile, signOut } = useAuth()
  const [fullname, setFullname] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [country, setCountry] = useState('United States')
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (userData) {
      setFullname(userData.fullName || '')
      setEmail(userData.email || user?.email || '')
      setPhone(userData.phone || '')
      setCountry(userData.country || 'United States')
    } else if (user) {
      setFullname(user.displayName || '')
      setEmail(user.email || '')
    }
  }, [user, userData])

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSaved(false)
    try {
      await updateUserProfile({
        fullName: fullname,
        phone,
        country,
      })
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (err) {
      console.error(err)
      setError(err.message || 'Failed to update profile.')
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteAccount = async () => {
    try {
      await signOut()
    } catch (err) {
      console.error(err)
    }
  }

  const initial = (fullname || email || 'A').charAt(0).toUpperCase()
  const regDate = userData?.registrationDate
    ? new Date(userData.registrationDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : 'Recent Member'

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold">Profile</h1>
        <p className="mt-1 text-sm text-paper-400">Manage your personal information.</p>
      </div>

      {saved && (
        <div className="flex items-center gap-2 rounded-lg border border-mint-500/30 bg-mint-500/10 p-3 text-xs text-mint-400">
          <CheckCircle2 size={16} /> Profile changes saved successfully.
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 rounded-lg border border-signal-error/30 bg-signal-error/10 p-3 text-xs text-signal-error">
          <AlertCircle size={16} /> {error}
        </div>
      )}

      <Card className="p-6" hover={false}>
        <div className="flex items-center gap-5">
          <div className="relative">
            <img
              src={userData?.photoURL || 'https://i.ibb.co/tMbN39zz/IMG-20260815-WA5130.jpg'}
              alt="Avatar"
              referrerPolicy="no-referrer"
              className="h-20 w-20 rounded-full object-cover border-2 border-gold-500/40 shadow-md"
            />
            <button className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-ink-800 bg-ink-700 text-paper-200 hover:text-gold-400">
              <Camera size={14} />
            </button>
          </div>
          <div>
            <p className="font-medium text-paper-100">{fullname || 'Trader'}</p>
            <p className="text-sm text-paper-500">Member since {regDate}</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="mt-8 space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <Label htmlFor="fullname">Full Name</Label>
              <Input id="fullname" value={fullname} onChange={(e) => setFullname(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="pemail">Email</Label>
              <Input id="pemail" type="email" value={email} disabled className="opacity-60 cursor-not-allowed" />
            </div>
            <div>
              <Label htmlFor="pphone">Phone</Label>
              <Input id="pphone" type="tel" placeholder="+1 (555) 000-0000" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="pcountry">Country</Label>
              <Select id="pcountry" value={country} onChange={(e) => setCountry(e.target.value)}>
                <option value="United States">United States</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="United Arab Emirates">United Arab Emirates</option>
                <option value="Pakistan">Pakistan</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
                <option value="Germany">Germany</option>
                <option value="Other">Other</option>
              </Select>
            </div>
          </div>
          <Button type="submit" disabled={saving}>
            {saving ? 'Saving…' : 'Save Changes'}
          </Button>
        </form>
      </Card>

      <Card className="border-signal-error/20 p-6" hover={false}>
        <h2 className="font-display text-lg font-semibold text-signal-error">Danger Zone</h2>
        <p className="mt-2 text-sm text-paper-400">
          Sign out or delete your session permanently. This removes your saved credentials on this browser.
        </p>
        {confirmDelete ? (
          <div className="mt-4 flex flex-wrap gap-3">
            <Button
              variant="secondary"
              className="border-signal-error/40 text-signal-error hover:bg-signal-error/10"
              onClick={handleDeleteAccount}
            >
              <Trash2 size={14} /> Confirm Permanent Deletion
            </Button>
            <Button variant="ghost" onClick={() => setConfirmDelete(false)}>Cancel</Button>
          </div>
        ) : (
          <Button variant="secondary" className="mt-4" onClick={() => setConfirmDelete(true)}>
            <Trash2 size={14} /> Delete Account
          </Button>
        )}
      </Card>
    </div>
  )
}
