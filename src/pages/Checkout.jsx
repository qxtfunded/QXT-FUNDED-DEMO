import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCheckout } from '../lib/CheckoutContext';
import Step1Details from './checkout/Step1Details';
import Step2Payment from './checkout/Step2Payment';
import Step3Deposit from './checkout/Step3Deposit';
import { Check, Shield, Lock } from 'lucide-react';

export default function Checkout() {
  const navigate = useNavigate();
  const { activeStep, setActiveStep } = useCheckout();

  const handleStep3Complete = (order) => {
    navigate('/thank-you');
  };

  const steps = [
    { number: 1, title: 'Challenge & Details' },
    { number: 2, title: 'Payment Method' },
    { number: 3, title: 'Crypto Deposit & Activation' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Checkout Stepper Header */}
      <div className="space-y-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
          <Lock className="w-3.5 h-3.5" />
          256-Bit Encrypted Checkout
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Complete Your Evaluation Order
        </h1>

        {/* Stepper indicators */}
        <div className="max-w-2xl mx-auto flex items-center justify-between relative pt-4">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-800 -translate-y-1/2 -z-0" />
          {steps.map((st) => {
            const isCompleted = activeStep > st.number;
            const isCurrent = activeStep === st.number;
            return (
              <div key={st.number} className="relative z-10 flex flex-col items-center gap-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                    isCompleted
                      ? 'bg-emerald-500 text-slate-950 ring-4 ring-emerald-500/20'
                      : isCurrent
                      ? 'bg-emerald-500 text-slate-950 ring-4 ring-emerald-500/30'
                      : 'bg-slate-900 border border-slate-700 text-slate-500'
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : st.number}
                </div>
                <span
                  className={`text-[11px] font-semibold hidden sm:inline ${
                    isCurrent ? 'text-emerald-400' : isCompleted ? 'text-white' : 'text-slate-500'
                  }`}
                >
                  {st.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dynamic Step Body */}
      <div>
        {activeStep === 1 && <Step1Details onNext={() => setActiveStep(2)} />}
        {activeStep === 2 && (
          <Step2Payment
            onNext={() => setActiveStep(3)}
            onBack={() => setActiveStep(1)}
          />
        )}
        {activeStep === 3 && (
          <Step3Deposit
            onBack={() => setActiveStep(2)}
            onComplete={handleStep3Complete}
          />
        )}
      </div>
    </div>
  );
}
