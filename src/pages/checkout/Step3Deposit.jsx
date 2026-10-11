import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { 
  useCheckout 
} from '../../lib/CheckoutContext';
import { 
  Copy, 
  Check, 
  Upload, 
  ShieldCheck, 
  AlertCircle, 
  ArrowLeft, 
  ArrowRight, 
  QrCode, 
  ExternalLink,
  Coins,
  Clock
} from 'lucide-react';

export default function Step3Deposit({ onBack, onComplete }) {
  const {
    selectedCrypto,
    selectedPlan,
    selectedBroker,
    calculateFinalPrice,
    createOrder
  } = useCheckout();

  const [qrDataUrl, setQrDataUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [txHash, setTxHash] = useState('');
  const [proofFile, setProofFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const targetAddress = selectedCrypto.addresses[0];
  const finalPrice = calculateFinalPrice();

  useEffect(() => {
    if (targetAddress) {
      QRCode.toDataURL(targetAddress, {
        width: 260,
        margin: 1.5,
        color: {
          dark: '#070A12',
          light: '#FFFFFF'
        }
      })
      .then(url => setQrDataUrl(url))
      .catch(err => console.error('QR code generation error:', err));
    }
  }, [targetAddress]);

  const handleCopy = () => {
    navigator.clipboard.writeText(targetAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProofFile(e.target.files[0]);
    }
  };

  const handleConfirmPayment = (e) => {
    e.preventDefault();
    if (!txHash.trim() && !proofFile) {
      setError('Please provide either a Transaction Hash (TXID) or upload proof of payment');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const order = createOrder(txHash, proofFile);
      setIsSubmitting(false);
      onComplete(order);
    }, 1200);
  };

  return (
    <div className="space-y-8">
      {/* Deposit Panel */}
      <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-slate-800 space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div>
            <span className="text-xs font-mono uppercase bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20">
              Awaiting Blockchain Deposit
            </span>
            <h3 className="text-2xl font-black text-white mt-2">
              Send ${finalPrice}.00 in {selectedCrypto.symbol} ({selectedCrypto.badge})
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Transfer funds to the verified cold-storage address below to activate your {selectedPlan.capital} account.
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs text-slate-400 block font-mono">Estimated Confirmation</span>
            <p className="text-sm font-bold text-cyan-400 flex items-center justify-end gap-1.5 mt-0.5">
              <Clock className="w-4 h-4" />
              {selectedCrypto.confirmations}
            </p>
          </div>
        </div>

        {/* QR Code and Address Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* QR Display */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-slate-900/80 rounded-2xl border border-slate-800">
            <div className="bg-white p-3.5 rounded-2xl shadow-xl shadow-emerald-500/10">
              {qrDataUrl ? (
                <img
                  src={qrDataUrl}
                  alt={`QR Code for ${selectedCrypto.name}`}
                  className="w-48 h-48 sm:w-56 sm:h-56 object-contain rounded-lg"
                />
              ) : (
                <div className="w-48 h-48 flex items-center justify-center text-slate-900 font-mono text-xs">
                  Generating QR...
                </div>
              )}
            </div>
            <span className="text-[11px] text-slate-400 mt-3 font-mono flex items-center gap-1.5">
              <QrCode className="w-3.5 h-3.5 text-emerald-400" />
              Scan with your Binance, Bybit, TrustWallet, or OKX app
            </span>
          </div>

          {/* Address & Network Info */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1.5 uppercase font-mono tracking-wider">
                Target Deposit Address ({selectedCrypto.network})
              </label>
              <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-2xl p-3 focus-within:border-emerald-500 transition-colors">
                <input
                  type="text"
                  readOnly
                  value={targetAddress}
                  className="w-full bg-transparent text-white font-mono text-xs sm:text-sm select-all outline-none truncate"
                />
                <button
                  type="button"
                  onClick={handleCopy}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                    copied
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 space-y-1">
              <div className="flex items-center gap-2 font-bold">
                <AlertCircle className="w-4 h-4 shrink-0" />
                Network Warning:
              </div>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Please ensure you send ONLY <strong className="text-white">{selectedCrypto.name}</strong> over the <strong className="text-white">{selectedCrypto.network}</strong>. Sending any other token or using an incompatible network may result in loss of funds.
              </p>
            </div>

            {/* Proof Submission form */}
            <form onSubmit={handleConfirmPayment} className="space-y-4 pt-2">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Transaction Hash / TXID (Recommended for instant validation)
                </label>
                <input
                  type="text"
                  value={txHash}
                  onChange={(e) => {
                    setTxHash(e.target.value);
                    setError('');
                  }}
                  placeholder="e.g. 0x9b18f4a... or TRON / BTC transaction hash"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-mono text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Or Upload Payment Screenshot (Optional)
                </label>
                <div className="flex items-center gap-3">
                  <label className="cursor-pointer px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-semibold flex items-center gap-2 transition-colors">
                    <Upload className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{proofFile ? proofFile.name : 'Choose File...'}</span>
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                  {proofFile && (
                    <span className="text-xs text-emerald-400 font-mono">Ready to upload</span>
                  )}
                </div>
              </div>

              {error && (
                <p className="text-xs text-rose-400 font-semibold">{error}</p>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/20 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    'Verifying Deposit On-Chain...'
                  ) : (
                    <>
                      <ShieldCheck className="w-5 h-5" />
                      I Have Completed This Transfer
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-start">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-semibold text-sm transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Choose Another Crypto Method
        </button>
      </div>
    </div>
  );
}
