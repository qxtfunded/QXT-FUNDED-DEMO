import { createContext, useContext, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { instantPlans, challengePlans } from '../data/accounts'
import { useAuth } from './AuthContext'

export const BROKERS = [
  {
    id: 'pocketOption',
    name: 'Pocket Option',
    logoUrl: '/brokers/pocketoption.png',
    fallbackUrl: 'https://i.ibb.co/4RWf6GPR/Pocket-Option-logo-PNG1.png',
    desc: 'Top-rated broker with flexible options trade modes and premium liquidity levels.',
    logo: (
      <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-2xl bg-ink-800/90 p-1.5 shadow-md border border-white/10 overflow-hidden">
        <img
          src="/brokers/pocketoption.png"
          alt="Pocket Option"
          className="h-full w-full object-contain"
          loading="eager"
          referrerPolicy="no-referrer"
          onError={(e) => {
            if (e.currentTarget.src !== 'https://i.ibb.co/4RWf6GPR/Pocket-Option-logo-PNG1.png') {
              e.currentTarget.src = 'https://i.ibb.co/4RWf6GPR/Pocket-Option-logo-PNG1.png'
            }
          }}
        />
      </div>
    ),
  },
  {
    id: 'quotex',
    name: 'Quotex',
    logoUrl: '/brokers/quotex.png',
    fallbackUrl: 'https://i.ibb.co/XxgfVcbP/quotex-io-seeklogo.png',
    desc: 'Highly customizable UI and perfect modern trading interface for active clients.',
    logo: (
      <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-2xl bg-ink-800/90 p-1.5 shadow-md border border-white/10 overflow-hidden">
        <img
          src="/brokers/quotex.png"
          alt="Quotex"
          className="h-full w-full object-contain"
          loading="eager"
          referrerPolicy="no-referrer"
          onError={(e) => {
            if (e.currentTarget.src !== 'https://i.ibb.co/XxgfVcbP/quotex-io-seeklogo.png') {
              e.currentTarget.src = 'https://i.ibb.co/XxgfVcbP/quotex-io-seeklogo.png'
            }
          }}
        />
      </div>
    ),
  },
  {
    id: 'binomo',
    name: 'Binomo',
    logoUrl: '/brokers/binomo.png',
    fallbackUrl: 'https://i.ibb.co/kCCmxZ7/binomo-logo.png',
    desc: 'Robust and steady execution speed, excellent for scalping models and rapid entries.',
    logo: (
      <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-2xl bg-ink-800/90 p-1.5 shadow-md border border-white/10 overflow-hidden">
        <img
          src="/brokers/binomo.png"
          alt="Binomo"
          className="h-full w-full object-contain"
          loading="eager"
          referrerPolicy="no-referrer"
          onError={(e) => {
            if (e.currentTarget.src !== 'https://i.ibb.co/kCCmxZ7/binomo-logo.png') {
              e.currentTarget.src = 'https://i.ibb.co/kCCmxZ7/binomo-logo.png'
            }
          }}
        />
      </div>
    ),
  },
  {
    id: 'olympTrade',
    name: 'Olymp Trade',
    logoUrl: '/brokers/olymptrade.png',
    fallbackUrl: 'https://i.ibb.co/FqDRTqx1/toppng-com-olymp-trade-transparent-logo-png-5000x5113.png',
    desc: 'Multi-market broker with deep indicators selection and lightning fast fills.',
    logo: (
      <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-2xl bg-ink-800/90 p-1.5 shadow-md border border-white/10 overflow-hidden">
        <img
          src="/brokers/olymptrade.png"
          alt="Olymp Trade"
          className="h-full w-full object-contain"
          loading="eager"
          referrerPolicy="no-referrer"
          onError={(e) => {
            if (e.currentTarget.src !== 'https://i.ibb.co/FqDRTqx1/toppng-com-olymp-trade-transparent-logo-png-5000x5113.png') {
              e.currentTarget.src = 'https://i.ibb.co/FqDRTqx1/toppng-com-olymp-trade-transparent-logo-png-5000x5113.png'
            }
          }}
        />
      </div>
    ),
  },
  {
    id: 'tradowix',
    name: 'Tradowix',
    logoUrl: '/brokers/tradowix.jpg',
    fallbackUrl: 'https://i.ibb.co/23dgStg7/Trado-Wix-logo.jpg',
    desc: 'Premium trading infrastructure with institutional grade speed.',
    logo: (
      <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-2xl bg-ink-800/90 p-1.5 shadow-md border border-white/10 overflow-hidden">
        <img
          src="/brokers/tradowix.jpg"
          alt="Tradowix"
          className="h-full w-full object-contain rounded-lg"
          loading="eager"
          referrerPolicy="no-referrer"
          onError={(e) => {
            if (e.currentTarget.src !== 'https://i.ibb.co/23dgStg7/Trado-Wix-logo.jpg') {
              e.currentTarget.src = 'https://i.ibb.co/23dgStg7/Trado-Wix-logo.jpg'
            }
          }}
        />
      </div>
    ),
  },
]

export const CRYPTO_METHODS = [
  {
    id: 'USDT ERC20',
    name: 'USDT ERC20',
    network: 'Ethereum Network (ERC-20)',
    addresses: [
      '0x5Ac211d983f172Bf5D7c7b6593e34Ea9b7952076',
      '0x000e9bbAf90Cd44B9BD60d32035e9643BFec1D48',
    ],
    symbol: 'USDT',
    badge: 'ERC20',
    logoUrl: '/crypto/usdt.png',
    fallbackUrl: 'https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons@master/128/color/usdt.png',
    logo: (
      <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-2xl bg-ink-800/90 p-1.5 shadow-md border border-white/10 overflow-hidden">
        <img
          src="/crypto/usdt.png"
          alt="USDT ERC20"
          className="h-full w-full object-contain"
          loading="eager"
          referrerPolicy="no-referrer"
          onError={(e) => {
            if (e.currentTarget.src !== 'https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons@master/128/color/usdt.png') {
              e.currentTarget.src = 'https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons@master/128/color/usdt.png'
            }
          }}
        />
      </div>
    ),
  },
  {
    id: 'USDT TRC20',
    name: 'USDT TRC20',
    network: 'TRON Network (TRC-20)',
    addresses: [
      'TL34GgR5QeVzE4rmxTbUvit53xfFNDJyQZ',
      'TAGjTLjnSCY4CMYyxSozemY6pD34zRN45N',
    ],
    symbol: 'USDT',
    badge: 'TRC20',
    logoUrl: '/crypto/usdt.png',
    fallbackUrl: 'https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons@master/128/color/usdt.png',
    logo: (
      <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-2xl bg-ink-800/90 p-1.5 shadow-md border border-white/10 overflow-hidden">
        <img
          src="/crypto/usdt.png"
          alt="USDT TRC20"
          className="h-full w-full object-contain"
          loading="eager"
          referrerPolicy="no-referrer"
          onError={(e) => {
            if (e.currentTarget.src !== 'https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons@master/128/color/usdt.png') {
              e.currentTarget.src = 'https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons@master/128/color/usdt.png'
            }
          }}
        />
      </div>
    ),
  },
  {
    id: 'USDT BEP20',
    name: 'USDT BEP20',
    network: 'BNB Smart Chain (BEP-20)',
    addresses: [
      '0x5Ac211d983f172Bf5D7c7b6593e34Ea9b7952076',
      '0x000e9bbAf90Cd44B9BD60d32035e9643BFec1D48',
    ],
    symbol: 'USDT',
    badge: 'BEP20',
    logoUrl: '/crypto/usdt.png',
    fallbackUrl: 'https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons@master/128/color/usdt.png',
    logo: (
      <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-2xl bg-ink-800/90 p-1.5 shadow-md border border-white/10 overflow-hidden">
        <img
          src="/crypto/usdt.png"
          alt="USDT BEP20"
          className="h-full w-full object-contain"
          loading="eager"
          referrerPolicy="no-referrer"
          onError={(e) => {
            if (e.currentTarget.src !== 'https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons@master/128/color/usdt.png') {
              e.currentTarget.src = 'https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons@master/128/color/usdt.png'
            }
          }}
        />
      </div>
    ),
  },
  {
    id: 'Bitcoin',
    name: 'Bitcoin',
    network: 'Bitcoin Mainnet',
    addresses: [
      'bc1qxhn94zljv3r3588jk2uk38jl3zqydgjcnc4vf8',
      'bc1qdw69l0p22zg25pesct6l4hecjyw2349ytl37kz',
    ],
    symbol: 'BTC',
    badge: 'BTC',
    logoUrl: '/crypto/btc.png',
    fallbackUrl: 'https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons@master/128/color/btc.png',
    logo: (
      <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-2xl bg-ink-800/90 p-1.5 shadow-md border border-white/10 overflow-hidden">
        <img
          src="/crypto/btc.png"
          alt="Bitcoin"
          className="h-full w-full object-contain"
          loading="eager"
          referrerPolicy="no-referrer"
          onError={(e) => {
            if (e.currentTarget.src !== 'https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons@master/128/color/btc.png') {
              e.currentTarget.src = 'https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons@master/128/color/btc.png'
            }
          }}
        />
      </div>
    ),
  },
  {
    id: 'Ethereum',
    name: 'Ethereum',
    network: 'Ethereum Mainnet',
    addresses: [
      '0x5Ac211d983f172Bf5D7c7b6593e34Ea9b7952076',
      '0x000e9bbAf90Cd44B9BD60d32035e9643BFec1D48',
    ],
    symbol: 'ETH',
    badge: 'ETH',
    logoUrl: '/crypto/eth.png',
    fallbackUrl: 'https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons@master/128/color/eth.png',
    logo: (
      <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-2xl bg-ink-800/90 p-1.5 shadow-md border border-white/10 overflow-hidden">
        <img
          src="/crypto/eth.png"
          alt="Ethereum"
          className="h-full w-full object-contain"
          loading="eager"
          referrerPolicy="no-referrer"
          onError={(e) => {
            if (e.currentTarget.src !== 'https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons@master/128/color/eth.png') {
              e.currentTarget.src = 'https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons@master/128/color/eth.png'
            }
          }}
        />
      </div>
    ),
  },
]

const CheckoutContext = createContext(null)

export function CheckoutProvider({ children }) {
  const [params] = useSearchParams()
  const { user, userData } = useAuth()

  const planParam = params.get('plan') || 'instant-3000'
  const [, size] = planParam.split('-')
  const allPlans = [...instantPlans, ...challengePlans]
  const plan =
    allPlans.find((p) => `${p.type}-${p.size}` === planParam) ||
    allPlans.find((p) => p.size === Number(size)) ||
    instantPlans[0]

  const [fullname, setFullname] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [country, setCountry] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [broker, setBroker] = useState('Pocket Option')
  const [selectedMethodId, setSelectedMethodId] = useState('USDT TRC20')
  const [coupon, setCoupon] = useState('')
  const [couponApplied, setCouponApplied] = useState(false)
  const [agreed, setAgreed] = useState(false)

  // Randomly select one of the two addresses for each network per checkout session
  const [assignedAddresses] = useState(() => {
    const map = {}
    CRYPTO_METHODS.forEach((m) => {
      if (m.addresses && m.addresses.length > 0) {
        const randomIndex = Math.floor(Math.random() * m.addresses.length)
        map[m.id] = m.addresses[randomIndex]
      } else {
        map[m.id] = m.address || ''
      }
    })
    return map
  })

  useEffect(() => {
    if (userData) {
      if (userData.fullName && !fullname) setFullname(userData.fullName)
      if (userData.email && !email) setEmail(userData.email)
      if (userData.phone && !phone) setPhone(userData.phone)
      if (userData.country && !country) setCountry(userData.country)
    } else if (user) {
      if (user.displayName && !fullname) setFullname(user.displayName)
      if (user.email && !email) setEmail(user.email)
    }
  }, [user, userData])

  const baseMethod = CRYPTO_METHODS.find((m) => m.id === selectedMethodId) || CRYPTO_METHODS[0]
  const selectedMethod = {
    ...baseMethod,
    address: assignedAddresses[baseMethod.id] || baseMethod.addresses?.[0] || '',
  }
  const discount = couponApplied ? Math.round(plan.price * 0.1) : 0
  const total = plan.price - discount

  const value = {
    plan,
    planParam,
    fullname,
    setFullname,
    email,
    setEmail,
    phone,
    setPhone,
    country,
    setCountry,
    address,
    setAddress,
    city,
    setCity,
    broker,
    setBroker,
    selectedMethodId,
    setSelectedMethodId,
    selectedMethod,
    coupon,
    setCoupon,
    couponApplied,
    setCouponApplied,
    agreed,
    setAgreed,
    discount,
    total,
    user,
  }

  return <CheckoutContext.Provider value={value}>{children}</CheckoutContext.Provider>
}

export function useCheckout() {
  const context = useContext(CheckoutContext)
  if (!context) {
    throw new Error('useCheckout must be used within a CheckoutProvider')
  }
  return context
}
