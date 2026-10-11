import React, { createContext, useContext, useState, useEffect } from 'react';

const CheckoutContext = createContext();

export const CRYPTO_METHODS = [
  {
    id: 'USDT TRC20',
    name: 'USDT TRC-20',
    network: 'Tron Network (TRC-20)',
    addresses: ['TW1Cd8GLzobCan1F5Eg15kH8qchs6tbzDY'],
    symbol: 'USDT',
    badge: 'Fast & Low Fee',
    networkFee: '~1.5 USDT',
    confirmations: '1 Confirmation (~2 mins)',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    id: 'USDT BEP20',
    name: 'USDT BEP-20',
    network: 'BNB Smart Chain (BEP-20)',
    addresses: ['0xB52cC0d200DB2eA47BF46a3585AeF2a0f4deEA7a'],
    symbol: 'USDT',
    badge: 'Lowest Gas Fee',
    networkFee: '~0.29 USDT',
    confirmations: '15 Confirmations (~1 min)',
    color: 'from-amber-500 to-yellow-600',
  },
  {
    id: 'USDT ERC20',
    name: 'USDT ERC-20',
    network: 'Ethereum Network (ERC-20)',
    addresses: ['0xB52cC0d200DB2eA47BF46a3585AeF2a0f4deEA7a'],
    symbol: 'USDT',
    badge: 'Standard Ethereum',
    networkFee: 'Variable Gas',
    confirmations: '12 Confirmations (~3 mins)',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    id: 'BTC',
    name: 'Bitcoin (BTC)',
    network: 'Bitcoin Native (SegWit)',
    addresses: ['bc1qmg0zwf7grl9djzsr3hcgvdr3lc2tjsk46jpayw'],
    symbol: 'BTC',
    badge: 'Native SegWit',
    networkFee: 'Standard Mempool',
    confirmations: '2 Confirmations (~15 mins)',
    color: 'from-orange-500 to-amber-600',
  },
  {
    id: 'ETH',
    name: 'Ethereum (ETH)',
    network: 'Ethereum Mainnet (ERC-20)',
    addresses: ['0xB52cC0d200DB2eA47BF46a3585AeF2a0f4deEA7a'],
    symbol: 'ETH',
    badge: 'Direct Native ETH',
    networkFee: 'Standard Gas',
    confirmations: '12 Confirmations (~3 mins)',
    color: 'from-purple-500 to-indigo-600',
  }
];

export const PLANS_DATA = [
  {
    id: '10k',
    name: '$10,000 Challenge',
    capital: '$10,000',
    numericCapital: 10000,
    price: 95,
    discountPrice: 85,
    profitTarget: '$800 (8%)',
    dailyLoss: '$500 (5%)',
    maxDrawdown: '$1,000 (10%)',
    minTradingDays: '3 Days',
    leverage: '1:100',
    profitSplit: '90%',
    badge: 'Starter Choice',
    popular: false,
  },
  {
    id: '25k',
    name: '$25,000 Challenge',
    capital: '$25,000',
    numericCapital: 25000,
    price: 199,
    discountPrice: 179,
    profitTarget: '$2,000 (8%)',
    dailyLoss: '$1,250 (5%)',
    maxDrawdown: '$2,500 (10%)',
    minTradingDays: '3 Days',
    leverage: '1:100',
    profitSplit: '90%',
    badge: 'High Value',
    popular: false,
  },
  {
    id: '50k',
    name: '$50,000 Challenge',
    capital: '$50,000',
    numericCapital: 50000,
    price: 320,
    discountPrice: 289,
    profitTarget: '$4,000 (8%)',
    dailyLoss: '$2,500 (5%)',
    maxDrawdown: '$5,000 (10%)',
    minTradingDays: '3 Days',
    leverage: '1:100',
    profitSplit: '90%',
    badge: 'Most Popular',
    popular: true,
  },
  {
    id: '100k',
    name: '$100,000 Challenge',
    capital: '$100,000',
    numericCapital: 100000,
    price: 549,
    discountPrice: 499,
    profitTarget: '$8,000 (8%)',
    dailyLoss: '$5,000 (5%)',
    maxDrawdown: '$10,000 (10%)',
    minTradingDays: '3 Days',
    leverage: '1:100',
    profitSplit: '90%',
    badge: 'Pro Trader',
    popular: false,
  },
  {
    id: '200k',
    name: '$200,000 Challenge',
    capital: '$200,000',
    numericCapital: 200000,
    price: 999,
    discountPrice: 899,
    profitTarget: '$16,000 (8%)',
    dailyLoss: '$10,000 (5%)',
    maxDrawdown: '$20,000 (10%)',
    minTradingDays: '3 Days',
    leverage: '1:100',
    profitSplit: '90%',
    badge: 'Elite Whale',
    popular: false,
  }
];

export const BROKERS_DATA = [
  { id: 'quotex', name: 'Quotex', description: 'Instant execution, 98% payout rate, OTC markets & zero slippage', icon: '⚡' },
  { id: 'pocketoption', name: 'Pocket Option', description: 'Social trading, 100+ currency pairs, fast crypto withdrawals', icon: '🚀' },
  { id: 'binomo', name: 'Binomo', description: 'Certified financial commission broker with tournament access', icon: '💎' },
  { id: 'olymptrade', name: 'Olymp Trade', description: 'Regulated broker with intuitive interface and fixed time trades', icon: '🎯' },
  { id: 'tradowix', name: 'Tradowix', description: 'Ultra-low spreads, institutional liquidity & raw binary feeds', icon: '🔥' },
  { id: 'mt5', name: 'MetaTrader 5 / Raw Forex', description: 'Tier 1 Prime liquidity, ECN spreads from 0.0 pips', icon: '📊' }
];

export function CheckoutProvider({ children }) {
  const [selectedPlan, setSelectedPlan] = useState(PLANS_DATA[2]); // Default 50k
  const [selectedBroker, setSelectedBroker] = useState(BROKERS_DATA[0]);
  const [evaluationType, setEvaluationType] = useState('2-step'); // '1-step' | '2-step' | 'instant'
  const [platformOption, setPlatformOption] = useState('Web & Mobile');
  const [selectedCrypto, setSelectedCrypto] = useState(CRYPTO_METHODS[0]);
  
  const [customerDetails, setCustomerDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: 'United States',
    discordUsername: '',
    agreementAccepted: true,
  });

  const [activeStep, setActiveStep] = useState(1);
  const [promoCode, setPromoCode] = useState('EDGE10');
  const [discountPercent, setDiscountPercent] = useState(10);
  const [promoApplied, setPromoApplied] = useState(true);

  const [orderHistory, setOrderHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('qxt_orders');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [
      {
        orderId: 'QXT-784920',
        date: '2026-10-09',
        plan: '$50,000 Challenge',
        capital: '$50,000',
        broker: 'Quotex',
        evaluationType: '2-Step Evaluation',
        cryptoMethod: 'USDT TRC-20',
        amountPaid: '$289.00',
        status: 'Active',
        phase: 'Phase 1 (Target: $4,000)',
        currentEquity: '$52,140.00',
        profit: '+$2,140.00 (+4.28%)',
        loginId: 'QX-9928114',
        server: 'QXT-Live-Europe'
      }
    ];
  });

  const [latestOrder, setLatestOrder] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('qxt_orders', JSON.stringify(orderHistory));
    } catch {
      // ignore
    }
  }, [orderHistory]);

  const applyPromo = (code) => {
    if (code.trim().toUpperCase() === 'EDGE10' || code.trim().toUpperCase() === 'QXT10') {
      setPromoCode(code.trim().toUpperCase());
      setDiscountPercent(10);
      setPromoApplied(true);
      return { success: true, message: 'Coupon applied! 10% discount added.' };
    } else if (code.trim().toUpperCase() === 'VIP20') {
      setPromoCode(code.trim().toUpperCase());
      setDiscountPercent(20);
      setPromoApplied(true);
      return { success: true, message: 'VIP Promo applied! 20% discount added.' };
    }
    return { success: false, message: 'Invalid or expired coupon code.' };
  };

  const calculateFinalPrice = () => {
    const base = selectedPlan.price;
    if (!promoApplied) return base;
    return Math.round(base * (1 - discountPercent / 100));
  };

  const createOrder = (txHash, proofFile = null) => {
    const orderId = `QXT-${Math.floor(100000 + Math.random() * 900000)}`;
    const finalPrice = calculateFinalPrice();
    const newOrder = {
      orderId,
      date: new Date().toISOString().split('T')[0],
      timestamp: new Date().toLocaleString(),
      plan: selectedPlan.name,
      capital: selectedPlan.capital,
      broker: selectedBroker.name,
      evaluationType: evaluationType === 'instant' ? 'Instant Funded' : evaluationType === '1-step' ? '1-Step Speedy' : '2-Step Standard',
      cryptoMethod: selectedCrypto.name,
      walletAddress: selectedCrypto.addresses[0],
      amountPaid: `$${finalPrice}.00`,
      customer: customerDetails,
      txHash: txHash || `0x${Array.from({length: 64}, () => Math.floor(Math.random()*16).toString(16)).join('')}`,
      proofUploaded: !!proofFile,
      status: 'Pending Verification',
      phase: 'Phase 1 - Awaiting Crypto Confirmation',
      currentEquity: selectedPlan.capital,
      profit: '$0.00',
      loginId: `QX-${Math.floor(1000000 + Math.random() * 9000000)}`,
      server: 'QXT-Live-Global'
    };

    setLatestOrder(newOrder);
    setOrderHistory(prev => [newOrder, ...prev]);
    return newOrder;
  };

  return (
    <CheckoutContext.Provider value={{
      selectedPlan,
      setSelectedPlan,
      selectedBroker,
      setSelectedBroker,
      evaluationType,
      setEvaluationType,
      platformOption,
      setPlatformOption,
      selectedCrypto,
      setSelectedCrypto,
      customerDetails,
      setCustomerDetails,
      activeStep,
      setActiveStep,
      promoCode,
      setPromoCode,
      discountPercent,
      promoApplied,
      applyPromo,
      calculateFinalPrice,
      orderHistory,
      latestOrder,
      createOrder,
    }}>
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  return context;
}
