import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { CheckoutProvider } from '../lib/CheckoutContext'
import Step1Details from './checkout/Step1Details'
import Step2Payment from './checkout/Step2Payment'
import Step3Deposit from './checkout/Step3Deposit'

export default function Checkout() {
  const location = useLocation()

  return (
    <CheckoutProvider>
      <Routes>
        <Route path="details" element={<Step1Details />} />
        <Route path="payment" element={<Step2Payment />} />
        <Route path="deposit" element={<Step3Deposit />} />
        <Route path="*" element={<Navigate to={`/checkout/details${location.search}`} replace />} />
      </Routes>
    </CheckoutProvider>
  )
}
