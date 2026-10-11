import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CheckoutProvider } from './lib/CheckoutContext';
import { AuthProvider } from './lib/AuthContext';
import SiteLayout from './components/layout/SiteLayout';
import DashboardLayout from './components/layout/DashboardLayout';

// Public Pages
import Home from './pages/Home';
import Accounts from './pages/Accounts';
import HowItWorks from './pages/HowItWorks';
import Brokers from './pages/Brokers';
import Reviews from './pages/Reviews';
import FAQ from './pages/FAQ';
import Support from './pages/Support';
import Checkout from './pages/Checkout';
import ThankYou from './pages/ThankYou';

// Auth Pages
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import ForgotPassword from './pages/auth/ForgotPassword';
import VerifyEmail from './pages/auth/VerifyEmail';

// Dashboard Pages
import Overview from './pages/dashboard/Overview';
import Orders from './pages/dashboard/Orders';
import OrderDetail from './pages/dashboard/OrderDetail';
import Security from './pages/dashboard/Security';
import Profile from './pages/dashboard/Profile';
import SupportList from './pages/dashboard/SupportList';

// Legal Pages
import Terms from './pages/legal/Terms';
import Privacy from './pages/legal/Privacy';
import Refund from './pages/legal/Refund';
import Risk from './pages/legal/Risk';
import Cookies from './pages/legal/Cookies';

// Error Pages
import NotFound from './pages/NotFound';
import ServerError from './pages/ServerError';
import Maintenance from './pages/Maintenance';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CheckoutProvider>
          <Routes>
            {/* Public Layout Routes */}
            <Route path="/" element={<SiteLayout><Home /></SiteLayout>} />
            <Route path="/accounts" element={<SiteLayout><Accounts /></SiteLayout>} />
            <Route path="/how-it-works" element={<SiteLayout><HowItWorks /></SiteLayout>} />
            <Route path="/brokers" element={<SiteLayout><Brokers /></SiteLayout>} />
            <Route path="/reviews" element={<SiteLayout><Reviews /></SiteLayout>} />
            <Route path="/faq" element={<SiteLayout><FAQ /></SiteLayout>} />
            <Route path="/support" element={<SiteLayout><Support /></SiteLayout>} />
            <Route path="/checkout" element={<SiteLayout><Checkout /></SiteLayout>} />
            <Route path="/thank-you" element={<SiteLayout><ThankYou /></SiteLayout>} />

            {/* Auth Routes */}
            <Route path="/login" element={<SiteLayout><Login /></SiteLayout>} />
            <Route path="/signup" element={<SiteLayout><Signup /></SiteLayout>} />
            <Route path="/forgot-password" element={<SiteLayout><ForgotPassword /></SiteLayout>} />
            <Route path="/verify-email" element={<SiteLayout><VerifyEmail /></SiteLayout>} />

            {/* Legal Routes */}
            <Route path="/legal/terms" element={<SiteLayout><Terms /></SiteLayout>} />
            <Route path="/legal/privacy" element={<SiteLayout><Privacy /></SiteLayout>} />
            <Route path="/legal/refund" element={<SiteLayout><Refund /></SiteLayout>} />
            <Route path="/legal/risk" element={<SiteLayout><Risk /></SiteLayout>} />
            <Route path="/legal/cookies" element={<SiteLayout><Cookies /></SiteLayout>} />

            {/* Utility & Error Routes */}
            <Route path="/500" element={<SiteLayout><ServerError /></SiteLayout>} />
            <Route path="/maintenance" element={<SiteLayout><Maintenance /></SiteLayout>} />

            {/* Trader Portal Dashboard Routes */}
            <Route path="/dashboard" element={<DashboardLayout><Overview /></DashboardLayout>} />
            <Route path="/dashboard/orders" element={<DashboardLayout><Orders /></DashboardLayout>} />
            <Route path="/dashboard/orders/:id" element={<DashboardLayout><OrderDetail /></DashboardLayout>} />
            <Route path="/dashboard/security" element={<DashboardLayout><Security /></DashboardLayout>} />
            <Route path="/dashboard/profile" element={<DashboardLayout><Profile /></DashboardLayout>} />
            <Route path="/dashboard/support" element={<DashboardLayout><SupportList /></DashboardLayout>} />

            {/* 404 Catch All */}
            <Route path="*" element={<SiteLayout><NotFound /></SiteLayout>} />
          </Routes>
        </CheckoutProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
