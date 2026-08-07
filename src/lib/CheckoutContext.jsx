import { createContext, useContext, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { instantPlans, challengePlans } from '../data/accounts'
import { useAuth } from './AuthContext'

export const BROKERS = [
  {
    id: 'pocketOption',
    name: 'Pocket Option',
    logoUrl: 'https://i.ibb.co/4RWf6GPR/Pocket-Option-logo-PNG1.png',
    desc: 'Top-rated broker with flexible options trade modes and premium liquidity levels.',
    logo: (
      <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-2xl bg-ink-800/90 p-1.5 shadow-md border border-white/10">
        <img
          src="https://i.ibb.co/4RWf6GPR/Pocket-Option-logo-PNG1.png"
          alt="Pocket Option"
          className="h-full w-full object-contain"
          loading="eager"
          referrerPolicy="no-referrer"
        />
      </div>
    ),
  },
  {
    id: 'quotex',
    name: 'Quotex',
    logoUrl: 'https://i.ibb.co/XxgfVcbP/quotex-io-seeklogo.png',
    desc: 'Highly customizable UI and perfect modern trading interface for active clients.',
    logo: (
      <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-2xl bg-ink-800/90 p-1.5 shadow-md border border-white/10">
        <img
          src="https://i.ibb.co/XxgfVcbP/quotex-io-seeklogo.png"
          alt="Quotex"
          className="h-full w-full object-contain"
          loading="eager"
          referrerPolicy="no-referrer"
        />
      </div>
    ),
  },
  {
    id: 'binomo',
    name: 'Binomo',
    logoUrl: 'https://i.ibb.co/kCCmxZ7/binomo-logo.png',
    desc: 'Robust and steady execution speed, excellent for scalping models and rapid entries.',
    logo: (
      <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-2xl bg-ink-800/90 p-1.5 shadow-md border border-white/10">
        <img
          src="https://i.ibb.co/kCCmxZ7/binomo-logo.png"
          alt="Binomo"
          className="h-full w-full object-contain"
          loading="eager"
          referrerPolicy="no-referrer"
        />
      </div>
    ),
  },
  {
    id: 'olympTrade',
    name: 'Olymp Trade',
    logoUrl: 'https://i.ibb.co/FqDRTqx1/toppng-com-olymp-trade-transparent-logo-png-5000x5113.png',
    desc: 'Multi-market broker with deep indicators selection and lightning fast fills.',
    logo: (
      <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-2xl bg-ink-800/90 p-1.5 shadow-md border border-white/10">
        <img
          src="https://i.ibb.co/FqDRTqx1/toppng-com-olymp-trade-transparent-logo-png-5000x5113.png"
          alt="Olymp Trade"
          className="h-full w-full object-contain"
          loading="eager"
          referrerPolicy="no-referrer"
        />
      </div>
    ),
  },
  {
    id: 'tradowix',
    name: 'Tradowix',
    logoUrl: 'https://i.ibb.co/4RWf6GPR/Pocket-Option-logo-PNG1.png',
    desc: 'Premium trading infrastructure with institutional grade speed.',
    logo: (
      <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-2xl bg-ink-800/90 p-1.5 shadow-md border border-white/10">
        <img
          src="https://i.ibb.co/4RWf6GPR/Pocket-Option-logo-PNG1.png"
          alt="Tradowix"
          className="h-full w-full object-contain"
          loading="eager"
          referrerPolicy="no-referrer"
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
    address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
    symbol: 'USDT',
    badge: 'ERC20',
    logoUrl: 'https://assets.coingecko.com/coins/images/325/large/Tether.png',
    logo: (
      <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-2xl bg-ink-800/90 p-1.5 shadow-md border border-white/10">
        <img
          src="https://assets.coingecko.com/coins/images/325/large/Tether.png"
          alt="USDT ERC20"
          className="h-full w-full object-contain"
          loading="eager"
          referrerPolicy="no-referrer"
        />
      </div>
    ),
  },
  {
    id: 'USDT TRC20',
    name: 'USDT TRC20',
    network: 'TRON Network (TRC-20)',
    address: 'TQx1zP8m9K2vW4jL7n3R8yU1a5B6c7D8e9',
    symbol: 'USDT',
    badge: 'TRC20',
    logoUrl: 'https://assets.coingecko.com/coins/images/325/large/Tether.png',
    logo: (
      <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-2xl bg-ink-800/90 p-1.5 shadow-md border border-white/10">
        <img
          src="https://assets.coingecko.com/coins/images/325/large/Tether.png"
          alt="USDT TRC20"
          className="h-full w-full object-contain"
          loading="eager"
          referrerPolicy="no-referrer"
        />
      </div>
    ),
  },
  {
    id: 'USDT BEP20',
    name: 'USDT BEP20',
    network: 'BNB Smart Chain (BEP-20)',
    address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
    symbol: 'USDT',
    badge: 'BEP20',
    logoUrl: 'https://assets.coingecko.com/coins/images/825/large/binance-coin-logo.png',
    logo: (
      <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-2xl bg-ink-800/90 p-1.5 shadow-md border border-white/10">
        <img
          src="https://assets.coingecko.com/coins/images/825/large/binance-coin-logo.png"
          alt="USDT BEP20"
          className="h-full w-full object-contain"
          loading="eager"
          referrerPolicy="no-referrer"
        />
      </div>
    ),
  },
  {
    id: 'Bitcoin',
    name: 'Bitcoin',
    network: 'Bitcoin Mainnet',
    address: 'bc1qxy2kg81e0012v8190012v8190012v8190012v8',
    symbol: 'BTC',
    badge: 'BTC',
    logoUrl: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
    logo: (
      <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-2xl bg-ink-800/90 p-1.5 shadow-md border border-white/10">
        <img
          src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png"
          alt="Bitcoin"
          className="h-full w-full object-contain"
          loading="eager"
          referrerPolicy="no-referrer"
        />
      </div>
    ),
  },
  {
    id: 'Ethereum',
    name: 'Ethereum',
    network: 'Ethereum Mainnet',
    address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
    symbol: 'ETH',
    badge: 'ETH',
    logoUrl: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
    logo: (
      <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-2xl bg-ink-800/90 p-1.5 shadow-md border border-white/10">
        <img
          src="https://assets.coingecko.com/coins/images/279/large/ethereum.png"
          alt="Ethereum"
          className="h-full w-full object-contain"
          loading="eager"
          referrerPolicy="no-referrer"
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

  const selectedMethod = CRYPTO_METHODS.find((m) => m.id === selectedMethodId) || CRYPTO_METHODS[0]
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
