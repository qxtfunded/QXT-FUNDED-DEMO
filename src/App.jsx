import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './lib/AuthContext'

import SiteLayout from './components/layout/SiteLayout'
import DashboardLayout from './components/layout/DashboardLayout'
import ProtectedRoute from './components/layout/ProtectedRoute'

import Home from './pages/Home'
import Accounts from './pages/Accounts'
import Brokers from './pages/Brokers'
import HowItWorks from './pages/HowItWorks'
import FAQ from './pages/FAQ'
import Reviews from './pages/Reviews'
import Support from './pages/Support'
import Contact from './pages/Contact'
import Checkout from './pages/Checkout'

import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import ForgotPassword from './pages/auth/ForgotPassword'
import VerifyEmail from './pages/auth/VerifyEmail'

import Overview from './pages/dashboard/Overview'
import Orders from './pages/dashboard/Orders'
import OrderDetail from './pages/dashboard/OrderDetail'
import SupportList from './pages/dashboard/SupportList'
import SupportDetail from './pages/dashboard/SupportDetail'
import SupportNew from './pages/dashboard/SupportNew'
import Profile from './pages/dashboard/Profile'
import Security from './pages/dashboard/Security'

import Terms from './pages/legal/Terms'
import Privacy from './pages/legal/Privacy'
import Refund from './pages/legal/Refund'
import Risk from './pages/legal/Risk'
import Cookies from './pages/legal/Cookies'

import NotFound from './pages/NotFound'
import ServerError from './pages/ServerError'
import Maintenance from './pages/Maintenance'

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public marketing site */}
        <Route element={<SiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/brokers" element={<Brokers />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/support" element={<Support />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/legal/terms" element={<Terms />} />
          <Route path="/legal/privacy" element={<Privacy />} />
          <Route path="/legal/refund" element={<Refund />} />
          <Route path="/legal/risk" element={<Risk />} />
          <Route path="/legal/cookies" element={<Cookies />} />
        </Route>

        {/* Auth (no navbar/footer) */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />

        {/* Protected checkout and dashboard */}
        <Route element={<ProtectedRoute />}>
          <Route element={<SiteLayout />}>
            <Route path="/checkout/*" element={<Checkout />} />
          </Route>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Overview />} />
            <Route path="/dashboard/orders" element={<Orders />} />
            <Route path="/dashboard/orders/:id" element={<OrderDetail />} />
            <Route path="/dashboard/support" element={<SupportList />} />
            <Route path="/dashboard/support/new" element={<SupportNew />} />
            <Route path="/dashboard/support/:id" element={<SupportDetail />} />
            <Route path="/dashboard/profile" element={<Profile />} />
            <Route path="/dashboard/security" element={<Security />} />
          </Route>
        </Route>

        {/* Standalone error/status pages */}
        <Route path="/500" element={<ServerError />} />
        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  )
}
