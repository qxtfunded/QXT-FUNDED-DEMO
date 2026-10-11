import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../lib/AuthContext'

export default function ProtectedRoute() {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink-950 text-paper-200">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold-500 border-t-transparent" />
          <p className="text-sm font-medium">Loading account...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    const target = encodeURIComponent(location.pathname + location.search)
    return <Navigate to={`/login?redirect=${target}`} replace />
  }

  return <Outlet />
}
