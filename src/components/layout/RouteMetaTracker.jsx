import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { logAnalyticsEvent } from '../../lib/firebase'

const routeMetadata = [
  {
    match: (path) => path === '/',
    title: 'QXT Funded — Prove Your Edge. Get Funded.',
    description: 'QXT Funded gives skilled traders access to funded accounts up to $50,000. Choose an instant account or prove yourself through an evaluation. Keep up to 92% of profits.',
  },
  {
    match: (path) => path === '/accounts',
    title: 'Trading Accounts & Funding Plans | QXT Funded',
    description: 'Explore Instant and Challenge funded account sizes from $5,000 to $50,000 with transparent rules and up to 92% profit split.',
  },
  {
    match: (path) => path === '/brokers',
    title: 'Supported Broker Environments | QXT Funded',
    description: 'Trade your evaluation on Pocket Option, Quotex, Binomo, Olymp Trade, or Tradowix with institutional-grade pricing and execution.',
  },
  {
    match: (path) => path === '/how-it-works',
    title: 'How It Works — Evaluations to Funded Trading | QXT Funded',
    description: 'Learn how QXT Funded works: select an account model, trade within clear risk limits, pass evaluation, and receive fast profit payouts.',
  },
  {
    match: (path) => path === '/faq',
    title: 'Frequently Asked Questions | QXT Funded',
    description: 'Find answers to common questions about trading rules, maximum drawdowns, payout schedules, and account verification.',
  },
  {
    match: (path) => path === '/reviews',
    title: 'Trader Reviews & Testimonials | QXT Funded',
    description: 'Read real reviews and feedback from funded traders who successfully trade and withdraw profits with QXT Funded.',
  },
  {
    match: (path) => path === '/support',
    title: 'Support Center & 24/7 Help Desk | QXT Funded',
    description: 'Get help 24/7 via live chat, ticket submission, or email. Our dedicated trading support desk is always here to assist.',
  },
  {
    match: (path) => path === '/contact',
    title: 'Contact Us | QXT Funded',
    description: 'Have pre-sales questions or partnership inquiries? Send our support team a direct message and get a prompt response.',
  },
  {
    match: (path) => path.startsWith('/checkout'),
    title: 'Secure Checkout | QXT Funded',
    description: 'Complete your funded account purchase with instant automated setup and secure multi-currency crypto payments.',
  },
  {
    match: (path) => path === '/thank-you',
    title: 'Thank You | QXT Funded',
    description: 'Thank you for reaching out to QXT Funded. Your inquiry has been received and our team will respond shortly.',
  },
  {
    match: (path) => path === '/login',
    title: 'Sign In | QXT Funded',
    description: 'Sign in to your QXT Funded trader portal to manage evaluations, view account credentials, and track payouts.',
  },
  {
    match: (path) => path === '/signup',
    title: 'Create Trader Account | QXT Funded',
    description: 'Register for QXT Funded to access instant and evaluation funded accounts with competitive rules.',
  },
  {
    match: (path) => path === '/forgot-password',
    title: 'Reset Password | QXT Funded',
    description: 'Reset your account password securely to regain access to your QXT Funded dashboard.',
  },
  {
    match: (path) => path === '/verify-email',
    title: 'Verify Email | QXT Funded',
    description: 'Verify your email address to complete your trader registration and access your dashboard.',
  },
  {
    match: (path) => path === '/dashboard',
    title: 'Dashboard Overview | QXT Funded',
    description: 'Monitor active trading accounts, profit stats, daily risk metrics, and order history in real-time.',
  },
  {
    match: (path) => path === '/dashboard/orders',
    title: 'My Orders | QXT Funded',
    description: 'View all purchased evaluation and instant funded accounts with real-time status tracking.',
  },
  {
    match: (path) => path.startsWith('/dashboard/orders/'),
    title: 'Order Details | QXT Funded',
    description: 'Review credentials, invoice status, and broker connection details for your funded account order.',
  },
  {
    match: (path) => path === '/dashboard/support',
    title: 'Support Tickets | QXT Funded',
    description: 'Manage and track your active support inquiries with our 24/7 technical desk.',
  },
  {
    match: (path) => path === '/dashboard/support/new',
    title: 'New Support Ticket | QXT Funded',
    description: 'Open a new priority support ticket for account, broker, or technical assistance.',
  },
  {
    match: (path) => path.startsWith('/dashboard/support/'),
    title: 'Support Ticket Discussion | QXT Funded',
    description: 'View live correspondence with QXT Funded technical support personnel.',
  },
  {
    match: (path) => path === '/dashboard/profile',
    title: 'Trader Profile | QXT Funded',
    description: 'Manage your personal trading profile, contact preferences, and country details.',
  },
  {
    match: (path) => path === '/dashboard/security',
    title: 'Account Security | QXT Funded',
    description: 'Configure security settings and update password credentials for your account.',
  },
  {
    match: (path) => ['/legal/terms', '/terms', '/terms-and-conditions'].includes(path),
    title: 'Terms & Agreement | QXT Funded',
    description: 'Review the official terms, client agreement, and rules governing QXT Funded accounts.',
  },
  {
    match: (path) => ['/legal/privacy', '/privacy', '/privacy-policy'].includes(path),
    title: 'Privacy Policy & Legal Agreement | QXT Funded',
    description: 'Learn how QXT Funded collects, protects, and handles your trader data and privacy rights.',
  },
  {
    match: (path) => path === '/legal/refund',
    title: 'Refund Policy | QXT Funded',
    description: 'Understand our policies regarding account purchases, digital provisioning, and refund eligibility.',
  },
  {
    match: (path) => path === '/legal/risk',
    title: 'Risk Disclosure | QXT Funded',
    description: 'Important risk disclosure notice concerning financial markets, leverage, and simulated trading.',
  },
  {
    match: (path) => path === '/legal/cookies',
    title: 'Cookies Policy | QXT Funded',
    description: 'Information on how cookies and local storage tokens are used to authenticate and protect your session.',
  },
  {
    match: (path) => path === '/maintenance',
    title: 'Scheduled Maintenance | QXT Funded',
    description: 'We are performing brief scheduled system maintenance. Systems will return online shortly.',
  },
]

export default function RouteMetaTracker() {
  const location = useLocation()

  useEffect(() => {
    const currentPath = location.pathname
    const matched = routeMetadata.find((item) => item.match(currentPath))

    const title = matched ? matched.title : '404 - Page Not Found | QXT Funded'
    const description = matched
      ? matched.description
      : 'The page you are looking for does not exist or has been moved.'

    // Update document title
    document.title = title

    // Update or create meta description
    let descMeta = document.querySelector('meta[name="description"]')
    if (!descMeta) {
      descMeta = document.createElement('meta')
      descMeta.setAttribute('name', 'description')
      document.head.appendChild(descMeta)
    }
    descMeta.setAttribute('content', description)

    // Update og:title
    let ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) ogTitle.setAttribute('content', title)

    // Update og:description
    let ogDesc = document.querySelector('meta[property="og:description"]')
    if (ogDesc) ogDesc.setAttribute('content', description)

    // Update og:url
    let ogUrl = document.querySelector('meta[property="og:url"]')
    if (ogUrl) {
      ogUrl.setAttribute('content', window.location.origin + currentPath)
    }

    // Analytics event
    logAnalyticsEvent('page_view', {
      page_path: currentPath,
      page_title: title,
      page_location: window.location.href,
    })
  }, [location.pathname])

  return null
}
