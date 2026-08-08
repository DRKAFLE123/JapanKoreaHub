'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar, ShieldCheck, CheckCircle2, Star, User, Loader2, Send, MessageSquare } from 'lucide-react';
import MobileNavbar from '@/components/layout/MobileNavbar';
import BottomTabBar from '@/components/layout/BottomTabBar';

interface Counselor {
  name: string;
  role: string;
  country: 'JAPAN' | 'KOREA' | 'BOTH';
  specialty: string;
  rating: string;
  experience: string;
  avatar: string;
}

const COUNSELORS: Counselor[] = [
  {
    name: 'Rajesh Shrestha',
    role: 'Senior Japan Education Counselor',
    country: 'JAPAN',
    specialty: 'COE Applications, SSW Skill Assessment, Student Visas',
    rating: '4.9 ★ (120+ students)',
    experience: '6+ years in Tokyo',
    avatar: '👨‍💼',
  },
  {
    name: 'Sunita Gurung',
    role: 'Korea Visa & EPS Advisor',
    country: 'KOREA',
    specialty: 'EPS-TOPIK Process, D-2 University Grants, SOP Review',
    rating: '4.8 ★ (95+ students)',
    experience: '4+ years in Seoul',
    avatar: '👩‍💼',
  },
];

const SESSIONS = [
  {
    id: 'DOC_REVIEW',
    title: 'Document & COE Verification',
    price: 'NPR 1,500',
    duration: '45 mins',
    desc: 'Thorough audit of bank statements, academic records, and sponsorship letters before embassy submission.',
  },
  {
    id: 'INTERVIEW_PREP',
    title: 'Embassy Mock Interview (1-on-1)',
    price: 'NPR 2,000',
    duration: '60 mins',
    desc: 'Simulated Japanese or Korean embassy interview with immediate feedback & common question cheat sheet.',
  },
  {
    id: 'SOP_REVIEW',
    title: 'SOP & Motivation Letter Polish',
    price: 'NPR 1,200',
    duration: 'Written Review + 30m call',
    desc: 'Professional editing of your Statement of Purpose in English/Japanese to maximize visa approval rate.',
  },
];

export default function ConsultancyClient() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState(SESSIONS[0].title);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', country: 'JAPAN', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/consultancy/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          sessionType: selectedSession,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit booking');

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      <MobileNavbar user={null} lang="en" onLangToggle={() => {}} onSearchOpen={() => {}} />

      <main className="pt-14 max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <div className="px-4 pt-4 pb-2">
          <Link href="/" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            Home
          </Link>
        </div>

        {/* Header */}
        <section className="px-4 py-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 border border-blue-200 text-xs font-semibold mb-3">
            🤝 Professional Education & Visa Counseling
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
            Personal Guidance for Japan & Korea
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Book 1-on-1 sessions with experienced counselors for document checks, SOP review, and mock interviews.
          </p>
        </section>

        {/* Platform Disclaimer Banner */}
        <section className="px-4 pb-6">
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-2xl flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
            <div className="text-xs text-gray-600 leading-relaxed">
              <strong className="text-gray-900">Platform Transparency Notice:</strong> JapanKoreaHub is an independent educational platform and counseling portal. We are not an embassy, government body, or visa-granting authority. Counseling is provided by verified independent advisors.
            </div>
          </div>
        </section>

        {/* Session Types */}
        <section className="px-4 pb-8 space-y-3">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Available Counseling Sessions</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {SESSIONS.map((session) => (
              <div
                key={session.id}
                className="card p-5 flex flex-col justify-between hover:border-blue-200 hover:shadow-md transition-all"
              >
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-gray-900 text-base">{session.title}</h3>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed mb-4">{session.desc}</p>
                </div>

                <div>
                  <div className="flex items-baseline justify-between pt-3 border-t border-gray-100 mb-3">
                    <span className="text-base font-extrabold text-gray-900">{session.price}</span>
                    <span className="text-xs text-gray-400">{session.duration}</span>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedSession(session.title);
                      setBookingOpen(true);
                    }}
                    className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors"
                  >
                    Book Session
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Advisors / Counselors */}
        <section className="px-4 pb-8 space-y-3">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Our Verified Counselors</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {COUNSELORS.map((c, i) => (
              <div key={i} className="card p-5 flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center text-2xl flex-shrink-0">
                  {c.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-gray-900 text-sm">{c.name}</h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                      {c.country === 'JAPAN' ? '🇯🇵 Japan' : '🇰🇷 Korea'}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-blue-600 mt-0.5">{c.role}</p>
                  <p className="text-xs text-gray-500 mt-1">Specialty: {c.specialty}</p>
                  <div className="flex items-center gap-3 mt-3 text-xs text-gray-400 pt-2 border-t border-gray-100">
                    <span>{c.rating}</span>
                    <span>•</span>
                    <span>{c.experience}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Booking Form Modal */}
      {bookingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl space-y-4 animate-slide-up max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <h3 className="font-bold text-lg text-gray-900">Book Counseling Session</h3>
              <button
                onClick={() => { setBookingOpen(false); setSuccess(false); }}
                className="text-gray-400 hover:text-gray-600 text-sm"
              >
                ✕
              </button>
            </div>

            {success ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-gray-900 text-lg">Booking Request Sent!</h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Thank you, {formData.name}. Our team will review your request for <strong>{selectedSession}</strong> and contact you via phone/email within 24 hours to confirm the time slot.
                </p>
                <button
                  onClick={() => { setBookingOpen(false); setSuccess(false); }}
                  className="w-full py-3 bg-gray-900 text-white rounded-xl text-xs font-semibold mt-4"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                {error && (
                  <div className="p-3 bg-red-50 text-red-600 text-xs rounded-xl">{error}</div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Session Selected</label>
                  <select
                    value={selectedSession}
                    onChange={(e) => setSelectedSession(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    {SESSIONS.map(s => (
                      <option key={s.id} value={s.title}>{s.title} — {s.price}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Sita Sharma"
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="sita@example.com"
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Phone / WhatsApp Number</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+977 9800000000"
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Target Country</label>
                  <div className="flex gap-2">
                    {['JAPAN', 'KOREA', 'BOTH'].map(c => (
                      <button
                        type="button"
                        key={c}
                        onClick={() => setFormData({ ...formData, country: c })}
                        className={`flex-1 py-2 text-xs font-semibold rounded-xl border transition-colors ${
                          formData.country === c ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-50 text-gray-700 border-gray-200'
                        }`}
                      >
                        {c === 'JAPAN' ? '🇯🇵 Japan' : c === 'KOREA' ? '🇰🇷 Korea' : '🌏 Both'}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Brief Details / Questions</label>
                  <textarea
                    rows={3}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your current stage (e.g., JLPT N5 passed, preparing for SSW interview, applying for D-2 visa...)"
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  Submit Booking Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      <BottomTabBar />
    </div>
  );
}
