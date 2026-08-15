import { useState, useEffect } from 'react'
import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import {
  LayoutDashboard,
  ListOrdered,
  Wallet,
  LifeBuoy,
  User,
  ShieldCheck,
  LogOut,
  Menu,
  Bell,
  TrendingUp,
} from 'lucide-react'
import ScrollToTop from './ScrollToTop'
import { useAuth } from '../../lib/AuthContext'
import { subscribeUserNotifications } from '../../lib/firestore'

const nav = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/dashboard/orders', label: 'Orders', icon: ListOrdered },
  { to: '/dashboard/support', label: 'Support Tickets', icon: LifeBuoy },
  { to: '/dashboard/profile', label: 'Profile', icon: User },
  { to: '/dashboard/security', label: 'Security', icon: ShieldCheck },
]

export default function DashboardLayout() {
  const [open, setOpen] = useState(false)
  const [showNotifs, setShowNotifs] = useState(false)
  const [notifications, setNotifications] = useState([])
  const { user, userData, signOut } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user?.uid) return
    const unsubscribe = subscribeUserNotifications(user.uid, (data) => {
      setNotifications(data)
    })
    return () => unsubscribe()
  }, [user?.uid])

  const handleLogout = async () => {
    try {
      await signOut()
      navigate('/login')
    } catch (err) {
      console.error(err)
    }
  }

  const displayName = userData?.fullName || user?.displayName || user?.email?.split('@')[0] || 'Trader'
  const initial = displayName.charAt(0).toUpperCase()
  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="flex min-h-screen bg-ink-950 text-paper-50">
      <ScrollToTop />
      {/* Sidebar - desktop */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-white/[0.06] bg-ink-900/60 lg:flex">
        <SidebarContent onLogout={handleLogout} />
      </aside>

      {/* Sidebar - mobile drawer */}
      <div
        className={clsx(
          'fixed inset-0 z-40 lg:hidden',
          open ? 'pointer-events-auto' : 'pointer-events-none'
        )}
      >
        <div
          className={clsx(
            'absolute inset-0 bg-black/60 transition-opacity',
            open ? 'opacity-100' : 'opacity-0'
          )}
          onClick={() => setOpen(false)}
        />
        <aside
          className={clsx(
            'absolute inset-y-0 left-0 flex w-72 flex-col bg-ink-900 transition-transform duration-300',
            open ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          <SidebarContent onNavigate={() => setOpen(false)} onLogout={handleLogout} />
        </aside>
      </div>

      <div className="flex flex-1 flex-col lg:pl-64">
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-white/[0.06] bg-ink-950/80 px-6 py-4 backdrop-blur-xl">
          <button
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-paper-100 lg:hidden"
            onClick={() => setOpen(true)}
          >
            <Menu size={18} />
          </button>
          <div className="hidden lg:block" />
          <div className="flex items-center gap-4">
            {/* Notification button */}
            <div className="relative">
              <button
                onClick={() => setShowNotifs(!showNotifs)}
                className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-paper-300 hover:text-gold-400"
              >
                <Bell size={16} />
                {unreadCount > 0 && (
                  <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-mint-400" />
                )}
              </button>

              {/* Notification Popover */}
              {showNotifs && (
                <div className="absolute right-0 mt-2 w-80 rounded-xl border border-white/10 bg-ink-900 p-4 shadow-2xl">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="text-sm font-semibold text-paper-100">Notifications</span>
                    <span className="text-xs text-paper-500">{notifications.length} total</span>
                  </div>
                  <div className="mt-3 max-h-60 space-y-2.5 overflow-y-auto text-xs">
                    {notifications.length === 0 ? (
                      <p className="py-4 text-center text-paper-500">No new notifications</p>
                    ) : (
                      notifications.map((n) => (
                        <div key={n.id} className="rounded-lg bg-ink-800 p-2.5">
                          <p className="font-medium text-paper-200">{n.title || 'Notification'}</p>
                          <p className="mt-0.5 text-paper-400">{n.message}</p>
                          <span className="mt-1 block text-[10px] text-paper-500">
                            {n.createdAt ? new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Recently'}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile avatar */}
            <Link to="/dashboard/profile" className="flex items-center gap-2.5">
              <img
                src={userData?.photoURL || 'https://i.ibb.co/tMbN39zz/IMG-20260815-WA5130.jpg'}
                alt="Profile"
                referrerPolicy="no-referrer"
                className="h-9 w-9 rounded-full object-cover border border-gold-500/30 shadow-sm"
              />
              <span className="hidden text-sm font-medium text-paper-200 sm:block">{displayName}</span>
            </Link>
          </div>
        </header>
        <main className="flex-1 p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

function SidebarContent({ onNavigate, onLogout }) {
  return (
    <>
      <Link to="/" className="flex items-center gap-2.5 px-6 py-6">
        <img
          src="https://i.ibb.co/tMbN39zz/IMG-20260815-WA5130.jpg"
          alt="QXT Funded"
          referrerPolicy="no-referrer"
          className="h-8 w-8 rounded-lg object-cover border border-white/10 shadow-sm"
        />
        <span className="font-display text-lg font-semibold">
          <span className="text-gold-400">QXT</span> Funded
        </span>
      </Link>
      <nav className="flex-1 space-y-1 px-3">
        {nav.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onNavigate}
            className={({ isActive }) =>
              clsx(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-gold-500/10 text-gold-300 border border-gold-500/20'
                  : 'text-paper-400 hover:bg-white/5 hover:text-paper-100 border border-transparent'
              )
            }
          >
            <Icon size={17} />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="border-t border-white/[0.06] p-3">
        <button
          onClick={onLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-paper-400 hover:bg-white/5 hover:text-signal-error"
        >
          <LogOut size={17} />
          Logout
        </button>
      </div>
    </>
  )
}
