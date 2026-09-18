'use client';
import React, { useState } from 'react';
import { X, Phone, ShieldCheck, CheckCircle2, ArrowRight, Loader2, Sparkles, RefreshCw } from 'lucide-react';

interface PhoneVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerified: (phone: string) => void;
}

export default function PhoneVerificationModal({
  isOpen,
  onClose,
  onVerified,
}: PhoneVerificationModalProps) {
  const [countryCode, setCountryCode] = useState('+81');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [step, setStep] = useState<'ENTER_PHONE' | 'ENTER_OTP' | 'SUCCESS'>('ENTER_PHONE');
  const [otpCode, setOtpCode] = useState('');
  const [demoCode, setDemoCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const fullPhone = `${countryCode} ${phoneNumber.trim()}`;

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber.trim()) {
      setError('Please enter a valid mobile number.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/community/verify-phone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'request_otp', phone: fullPhone }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send OTP');

      if (data.demoOtp) {
        setDemoCode(data.demoOtp);
      }
      setStep('ENTER_OTP');
    } catch (err: any) {
      setError(err?.message || 'Error sending verification code.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode.trim()) {
      setError('Please enter the 6-digit verification code.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/community/verify-phone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'verify_otp', phone: fullPhone, code: otpCode }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Verification failed');

      setStep('SUCCESS');
      setTimeout(() => {
        onVerified(fullPhone);
        onClose();
      }, 1400);
    } catch (err: any) {
      setError(err?.message || 'Invalid code. Use the demo code or 777777.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-[95] bg-slate-950/70 backdrop-blur-xs animate-fade-in" onClick={onClose} />
      
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pointer-events-none">
        <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden pointer-events-auto my-auto animate-fade-in font-sans">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-5 text-white relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1 rounded-lg bg-white/20 text-white text-xs font-black">
                🛡️ Verified Poster Gate
              </span>
            </div>
            <h2 className="text-xl font-black text-white">
              Verify Your Phone Number
            </h2>
            <p className="text-xs text-emerald-100 mt-0.5 leading-relaxed">
              To keep housing and job postings authentic and spam-free, poster phone verification is compulsory.
            </p>
          </div>

          <div className="p-6 space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-bold text-rose-700 animate-fade-in">
                ⚠️ {error}
              </div>
            )}

            {step === 'ENTER_PHONE' && (
              <form onSubmit={handleRequestOtp} className="space-y-4">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">
                    Mobile Phone Number
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 bg-slate-50 focus:outline-none focus:border-emerald-500 cursor-pointer"
                    >
                      <option value="+81">🇯🇵 +81 (Japan)</option>
                      <option value="+82">🇰🇷 +82 (Korea)</option>
                      <option value="+977">🇳🇵 +977 (Nepal)</option>
                    </select>
                    <div className="relative flex-1">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="80-1234-5678"
                        required
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
                      />
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-400 font-medium mt-1.5">
                    We will send a 6-digit SMS verification code to this mobile number.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider transition-colors shadow-xs disabled:opacity-60 cursor-pointer"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
                  <span>Send Verification Code</span>
                </button>
              </form>
            )}

            {step === 'ENTER_OTP' && (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
                  <span>Code sent to </span>
                  <strong className="text-slate-900">{fullPhone}</strong>
                  <button
                    type="button"
                    onClick={() => setStep('ENTER_PHONE')}
                    className="ml-2 text-emerald-600 hover:underline font-bold cursor-pointer"
                  >
                    Change
                  </button>
                </div>

                {demoCode && (
                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between">
                    <div className="text-xs text-amber-800">
                      <span className="font-bold">Demo OTP Code: </span>
                      <span className="font-mono text-sm font-black tracking-widest text-amber-900">{demoCode}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setOtpCode(demoCode)}
                      className="px-2.5 py-1 rounded-lg bg-amber-200 hover:bg-amber-300 text-amber-900 text-xs font-black cursor-pointer"
                    >
                      Fill Code
                    </button>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">
                    Enter 6-Digit Code
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                    placeholder="123456"
                    required
                    className="w-full text-center text-xl font-mono font-black tracking-widest py-3 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleRequestOtp}
                    className="px-4 py-3 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 cursor-pointer"
                  >
                    Resend
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider transition-colors shadow-xs disabled:opacity-60 cursor-pointer"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
                    <span>Confirm &amp; Verify</span>
                  </button>
                </div>
              </form>
            )}

            {step === 'SUCCESS' && (
              <div className="py-6 text-center space-y-3 animate-fade-in">
                <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-black text-slate-900">Phone Verified!</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Your phone number has been verified. You now hold the <strong className="text-emerald-700">Verified Poster</strong> badge!
                </p>
              </div>
            )}

          </div>

        </div>
      </div>
    </>
  );
}
