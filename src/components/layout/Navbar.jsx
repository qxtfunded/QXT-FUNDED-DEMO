import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, TrendingUp } from 'lucide-react'
import clsx from 'clsx'
import Button from '../ui/Button'

const links = [
  { to: '/accounts', label: 'Accounts' },
  { to: '/brokers', label: 'Brokers' },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/faq', label: 'FAQ' },
  { to: '/reviews', label: 'Reviews' },
  { to: '/support', label: 'Support' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <header
      className={clsx(
        'fixed top-0 z-50 w-full transition-all duration-300',
        scrolled ? 'glass border-b border-white/[0.06] py-3' : 'bg-transparent py-5'
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2 group" onClick={() => setOpen(false)}>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-gold-300 to-gold-600 text-ink-950 transition-transform group-hover:scale-105">
            <TrendingUp size={18} strokeWidth={2.5} />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">
            <span className="text-gold-400">QXT</span> Funded
          </span>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                clsx(
                  'relative text-sm font-medium text-paper-300 transition-colors hover:text-paper-50',
                  'after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-gold-400 after:transition-all hover:after:w-full',
                  isActive && 'text-paper-50 after:w-full'
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Button to="/login" variant="ghost" size="sm">
            Sign In
          </Button>
          <Button to="/accounts" variant="primary" size="sm">
            Get Funded
          </Button>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-paper-100 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={clsx(
          'fixed inset-x-0 top-[64px] z-40 origin-top overflow-hidden border-b border-white/[0.06] bg-ink-950/98 backdrop-blur-xl transition-all duration-300 lg:hidden',
          open ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="flex flex-col gap-1 px-6 py-6">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 text-base font-medium text-paper-200 hover:bg-white/5 hover:text-paper-50"
            >
              {l.label}
            </NavLink>
          ))}
          <div className="mt-4 flex flex-col gap-3 border-t border-white/[0.06] pt-4">
            <Button to="/login" variant="secondary" onClick={() => setOpen(false)}>
              Sign In
            </Button>
            <Button to="/accounts" variant="primary" onClick={() => setOpen(false)}>
              Get Funded
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
