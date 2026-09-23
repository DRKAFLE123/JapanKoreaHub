'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Home,
  MapPin,
  Filter,
  Search,
  Plus,
  Bookmark,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  DollarSign,
  Building,
  Key,
  Calendar,
  Layers,
  ArrowRight,
  MessageSquare,
  FileText,
  Clock,
  ChevronDown,
  RotateCcw
} from 'lucide-react';
import type { CommunityPost } from '@/lib/community-data';
import PostCard from '@/components/community/PostCard';
import PostModal from '@/components/community/PostModal';
import PhoneVerificationModal from '@/components/community/PhoneVerificationModal';
import DirectMessageDrawer from '@/components/community/DirectMessageDrawer';
import PostDetailModal from '@/components/community/PostDetailModal';
import AuthSheet from '@/components/auth/AuthSheet';
import { useCountry } from '@/lib/context/CountryContext';
import CustomSelect from '@/components/ui/CustomSelect';

interface RoomsHubClientProps {
  country?: 'japan' | 'korea' | 'all';
}

const JAPAN_HOUSING_TYPES = [
  {
    title: 'Sharehouses (シェアハウス)',
    desc: 'Private bedroom with shared kitchen, living, and bathrooms (Oakhouse, Borderless House). Ideal for new arrivals. Usually low or zero deposit.',
    cost: '¥40,000 – ¥70,000 / mo',
    deposit: '¥10,000 – ¥30,000',
    perk: 'Furnished, utilities included, instant community',
  },
  {
    title: 'UR Housing (UR賃貸住宅)',
    desc: 'Semi-public government housing complexes. Zero key money (Reikin), zero agent fee (Chukai Tesuryo), zero renewal fee, and NO guarantor company needed!',
    cost: '¥55,000 – ¥110,000 / mo',
    deposit: '2 months (refundable)',
    perk: 'Spacious 1DK/2DK, couples/roommates welcome',
  },
  {
    title: 'Private Apartments (1K / 1DK)',
    desc: 'Standard private rentals via estate agents. Typically requires guarantor company (Hoshonin Kaisha), Shikikin deposit, and emergency contact.',
    cost: '¥50,000 – ¥85,000 / mo',
    deposit: '1–2 months rent',
    perk: 'Complete privacy, self-contained kitchen & bath',
  },
  {
    title: 'Student Dormitories (学生寮)',
    desc: 'Arranged directly through Japanese language schools or universities. Safe and close to campus, often with curfew or basic rules.',
    cost: '¥35,000 – ¥55,000 / mo',
    deposit: '¥20,000 – ¥40,000',
    perk: 'Easy paperwork, language school support',
  },
];

const KOREA_HOUSING_TYPES = [
  {
    title: 'Goshiwon (고시원) / Goshitel',
    desc: 'Budget micro-rooms with private bed and desk. Zero deposit! Most places provide free warm steamed rice, instant ramen, kimchi, and high-speed Wi-Fi.',
    cost: '₩350,000 – ₩550,000 / mo',
    deposit: '₩0 (Zero deposit!)',
    perk: 'Immediate move-in, all bills included, zero commitment',
  },
  {
    title: 'One-Room Studio (원룸)',
    desc: 'Self-contained studio apartment with kitchen and bathroom. Standard Wolse system requires a security deposit of ₩3M to ₩10M.',
    cost: '₩450,000 – ₩800,000 / mo',
    deposit: '₩3,000,000 – ₩10,000,000',
    perk: 'Spacious, high privacy, laundry in unit',
  },
  {
    title: 'Hasukjib (하숙집)',
    desc: 'Traditional boarding house operated by Korean elders (Ajumma) where home-cooked Korean breakfast and dinner are included in monthly rent.',
    cost: '₩450,000 – ₩650,000 / mo',
    deposit: 'Minimal or none',
    perk: 'Nutritious meals provided, Korean immersion',
  },
  {
    title: 'Officetel (오피스텔)',
    desc: 'High-rise residential/commercial studio buildings with 24/7 security guard, elevators, and basement convenience stores.',
    cost: '₩650,000 – ₩1,100,000 / mo',
    deposit: '₩5,000,000 – ₩20,000,000',
    perk: 'Modern luxury, secure, central subway locations',
  },
];

const JAPAN_RENTAL_TERMS = [
  { term: 'Shikikin (敷金)', meaning: 'Security Deposit', desc: '1–2 months rent paid upfront. Deducts cleaning upon moving out; remainder is refunded.' },
  { term: 'Reikin (礼金)', meaning: 'Key Money (Gift)', desc: 'Non-refundable gift to the landlord. Look for "Zero Reikin" (礼金ゼロ) apartments to save money!' },
  { term: 'Chukai Tesuryo (仲介手数料)', meaning: 'Agency Brokerage', desc: 'Fee to real estate agent, legally capped at 0.5 to 1 month rent + tax.' },
  { term: 'Hoshonin Kaisha (保証会社)', meaning: 'Guarantor Company', desc: 'Replaces personal guarantor for foreigners. Usually 50% to 100% of 1 month rent upfront.' },
];

const KOREA_RENTAL_TERMS = [
  { term: 'Wolse (월세)', meaning: 'Monthly Rent + Deposit', desc: 'Standard system: pay a security deposit (e.g. ₩5,000,000) and smaller monthly rent (e.g. ₩500,000).' },
  { term: 'Jeonse (전세)', meaning: 'Key-Money Lease', desc: 'Large lump-sum deposit (50–70% of property value) with zero monthly rent. Full deposit returned at lease end.' },
  { term: 'Gwallibi (관리비)', meaning: 'Maintenance Fee', desc: 'Monthly building maintenance (₩30,000–₩100,000), frequently covers water, building cleaning, and Wi-Fi.' },
  { term: 'Bokdeokbang (부동산)', meaning: 'Real Estate Agency', desc: 'Licensed Korean broker. Regulated commission scale based on total transaction amount.' },
];

export default function RoomsHubClient({ country = 'all' }: RoomsHubClientProps) {
  const { activeCountry, setCountryFocus } = useCountry();
  const selectedCountry = country !== 'all' ? country : (activeCountry === 'korea' ? 'korea' : 'japan');

  const [activeTab, setActiveTab] = useState<'LISTINGS' | 'GUIDE' | 'TERMS' | 'COSTS'>('LISTINGS');
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [selectedCity, setSelectedCity] = useState<string>('ALL');
  const [areaQuery, setAreaQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [maxDeposit, setMaxDeposit] = useState<number>(-1); // -1 = Any, 0 = Zero deposit only, >0 = Max limit
  const [onlyFreeService, setOnlyFreeService] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Modals & States
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [phoneModalOpen, setPhoneModalOpen] = useState(false);
  const [authSheetOpen, setAuthSheetOpen] = useState(false);
  const [messageDrawerOpen, setMessageDrawerOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [activePost, setActivePost] = useState<CommunityPost | null>(null);

  // User State
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [verifiedPhone, setVerifiedPhone] = useState('');
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  useEffect(() => {
    // Check saved user session
    const saved = localStorage.getItem('jkh_user');
    if (saved) {
      try {
        const u = JSON.parse(saved);
        setUser(u);
      } catch {}
    }

    const savedPhone = localStorage.getItem('jkh_verified_phone');
    if (savedPhone) {
      setIsPhoneVerified(true);
      setVerifiedPhone(savedPhone);
    }

    fetchPosts();
    fetchBookmarks();
  }, [selectedCountry]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/community/posts?type=ROOM&country=${selectedCountry}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.posts)) {
        setPosts(data.posts);
      }
    } catch {}
    finally {
      setLoading(false);
    }
  };

  const fetchBookmarks = async () => {
    try {
      const res = await fetch('/api/community/bookmark');
      const data = await res.json();
      if (data.success && Array.isArray(data.bookmarks)) {
        setBookmarks(data.bookmarks);
      }
    } catch {}
  };

  const handleToggleBookmark = async (post: CommunityPost) => {
    if (!user) {
      setAuthSheetOpen(true);
      return;
    }

    try {
      const res = await fetch('/api/community/bookmark', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.email, postId: post.id }),
      });
      const data = await res.json();
      if (data.success) {
        if (data.isBookmarked) {
          setBookmarks(prev => [...prev, post.id]);
        } else {
          setBookmarks(prev => prev.filter(id => id !== post.id));
        }
      }
    } catch {}
  };

  const handleOpenMessage = (post: CommunityPost) => {
    setActivePost(post);
    if (!user) {
      setAuthSheetOpen(true);
      return;
    }
    setMessageDrawerOpen(true);
  };

  const handleOpenDetail = (post: CommunityPost) => {
    setActivePost(post);
    setDetailModalOpen(true);
  };

  const handlePhoneVerified = (phone: string) => {
    setIsPhoneVerified(true);
    setVerifiedPhone(phone);
    localStorage.setItem('jkh_verified_phone', phone);
    setPostModalOpen(true);
  };

  // Filtered listings
  const filteredPosts = posts.filter(post => {
    if (showBookmarksOnly && !bookmarks.includes(post.id)) return false;
    if (selectedCity !== 'ALL' && post.city.toLowerCase() !== selectedCity.toLowerCase()) return false;
    if (areaQuery.trim() && !post.area.toLowerCase().includes(areaQuery.toLowerCase().trim())) return false;
    if (maxPrice > 0 && post.price > maxPrice) return false;
    if (maxDeposit === 0 && (post.deposit ?? 0) > 0) return false;
    if (maxDeposit > 0 && (post.deposit ?? 0) > maxDeposit) return false;
    if (onlyFreeService && post.serviceCharge > 0) return false;
    if (searchKeyword.trim()) {
      const q = searchKeyword.toLowerCase();
      const match =
        post.title.toLowerCase().includes(q) ||
        post.description.toLowerCase().includes(q) ||
        post.tags.some(t => t.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  const isJapan = selectedCountry === 'japan';
  const cities = isJapan ? ['Tokyo', 'Osaka', 'Nagoya', 'Fukuoka'] : ['Seoul', 'Busan', 'Incheon'];

  const activeFiltersCount = 
    (selectedCity !== 'ALL' ? 1 : 0) +
    (areaQuery.trim() ? 1 : 0) +
    (maxPrice > 0 ? 1 : 0) +
    (maxDeposit >= 0 ? 1 : 0) +
    (onlyFreeService ? 1 : 0) +
    (searchKeyword.trim() ? 1 : 0) +
    (showBookmarksOnly ? 1 : 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-24 font-sans">
      
      {/* Minimized Hero Banner with Quick Stats & Quick Actions */}
      <div className={`rounded-2xl p-4 sm:p-5 mb-4 relative overflow-hidden shadow-sm border text-white ${
        isJapan 
          ? 'bg-gradient-to-br from-rose-600 via-red-600 to-rose-700 shadow-rose-600/10 border-rose-400/20' 
          : 'bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-700 shadow-purple-600/10 border-purple-400/20'
      }`}>
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-white/10 to-transparent pointer-events-none" />
        
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md border border-white/25 text-white text-[11px] font-bold tracking-wide">
                {isJapan ? '🇯🇵 Japan Housing & Rooms' : '🇰🇷 Korea Housing & Rooms'}
              </span>
              <span className="flex items-center gap-1.5 text-[11px] text-white/90 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                Live Feed
              </span>
            </div>

            <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white">
              {isJapan ? 'Find Rooms & Apartments in Japan' : 'Find Goshiwon & Studios in Korea'}
            </h1>
            <p className="text-xs text-white/85 max-w-xl leading-snug font-normal mt-0.5 hidden sm:block">
              {isJapan
                ? 'Zero-key-money apartments, Oakhouse sharehouses, and private 1K flats with verified posters.'
                : 'Zero-deposit Goshiwons, one-rooms, and modern officetels near top universities with direct contact.'}
            </p>
          </div>

          {/* Quick Action Bar */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                if (!user) {
                  setAuthSheetOpen(true);
                  return;
                }
                if (!isPhoneVerified) {
                  setPhoneModalOpen(true);
                  return;
                }
                setPostModalOpen(true);
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-purple-700 font-bold text-xs transition-all shadow-xs cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Post Room</span>
            </button>

            <button
              onClick={() => {
                if (!user) {
                  setAuthSheetOpen(true);
                  return;
                }
                setMessageDrawerOpen(true);
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white font-semibold text-xs transition-colors cursor-pointer border border-white/25 backdrop-blur-sm"
            >
              <MessageSquare className="w-3.5 h-3.5 text-white/90" />
              <span>Inbox</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 mb-4 border-b border-slate-200 pb-2.5 overflow-x-auto">
        <button
          onClick={() => setActiveTab('LISTINGS')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer shrink-0 ${
            activeTab === 'LISTINGS'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Building className="w-4 h-4" />
          <span>Live Room Feed ({filteredPosts.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('GUIDE')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer shrink-0 ${
            activeTab === 'GUIDE'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Home className="w-4 h-4" />
          <span>Housing Types Guide</span>
        </button>

        <button
          onClick={() => setActiveTab('TERMS')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer shrink-0 ${
            activeTab === 'TERMS'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Key className="w-4 h-4" />
          <span>Rental Terms &amp; Deposits</span>
        </button>

        <button
          onClick={() => setActiveTab('COSTS')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer shrink-0 ${
            activeTab === 'COSTS'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>City Rent Comparison</span>
        </button>
      </div>

      {/* TAB 1: LIVE LISTINGS & SEARCH FILTER */}
      {activeTab === 'LISTINGS' && (
        <div className="space-y-6">
          
          {/* Minimized Filter Bar Panel */}
          <div className="p-3 sm:p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            {/* Primary compact single-line bar */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
              {/* City selector */}
              <div className="w-32 sm:w-36 shrink-0">
                <CustomSelect
                  value={selectedCity}
                  onChange={(val) => setSelectedCity(String(val))}
                  options={[
                    { value: 'ALL', label: 'All Cities' },
                    ...cities.map(c => ({ value: c, label: c }))
                  ]}
                  accentColor="purple"
                  buttonClassName="font-bold text-slate-800"
                />
              </div>

              {/* Area search input */}
              <div className="relative flex-1 min-w-[140px]">
                <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={areaQuery}
                  onChange={(e) => setAreaQuery(e.target.value)}
                  placeholder="Area / Station (Shin-Okubo, Hongdae...)"
                  className="w-full pl-8 pr-3 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-500"
                />
              </div>

              {/* Saved Rooms Button */}
              <button
                type="button"
                onClick={() => setShowBookmarksOnly(prev => !prev)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer shrink-0 ${
                  showBookmarksOnly
                    ? 'bg-amber-50 border-amber-300 text-amber-700'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
                title="Filter by saved rooms"
              >
                <Bookmark className={`w-3.5 h-3.5 ${showBookmarksOnly ? 'fill-current text-amber-600' : ''}`} />
                <span className="hidden sm:inline">Saved</span>
                <span>({bookmarks.length})</span>
              </button>

              {/* Toggle Advanced Filters Button */}
              <button
                type="button"
                onClick={() => setShowAdvancedFilters(prev => !prev)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer shrink-0 ${
                  showAdvancedFilters || activeFiltersCount > 0
                    ? 'bg-purple-50 border-purple-200 text-purple-700'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Filter className="w-3.5 h-3.5 text-purple-600" />
                <span>Filters</span>
                {activeFiltersCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-purple-600 text-white text-[10px] font-bold flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
                <ChevronDown className={`w-3 h-3 transition-transform ${showAdvancedFilters ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Quick 1-tap filter chips (horizontal scrollable) */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
              <button
                type="button"
                onClick={() => setMaxDeposit(prev => prev === 0 ? -1 : 0)}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer shrink-0 ${
                  maxDeposit === 0
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                ⚡ Zero Deposit
              </button>

              <button
                type="button"
                onClick={() => setOnlyFreeService(prev => !prev)}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer shrink-0 ${
                  onlyFreeService
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Free Brokerage
              </button>

              <button
                type="button"
                onClick={() => setSearchKeyword(searchKeyword === 'Near Station' ? '' : 'Near Station')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer shrink-0 ${
                  searchKeyword === 'Near Station'
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                🚉 Near Station
              </button>

              <button
                type="button"
                onClick={() => setSearchKeyword(searchKeyword === 'Furnished' ? '' : 'Furnished')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer shrink-0 ${
                  searchKeyword === 'Furnished'
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                🛋️ Furnished
              </button>

              {isJapan ? (
                <button
                  type="button"
                  onClick={() => setSearchKeyword(searchKeyword === 'No Reikin' ? '' : 'No Reikin')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer shrink-0 ${
                    searchKeyword === 'No Reikin'
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  🎉 Zero Key Money
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setSearchKeyword(searchKeyword === 'Zero Deposit' ? '' : 'Zero Deposit')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer shrink-0 ${
                    searchKeyword === 'Zero Deposit'
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  💰 Zero Deposit
                </button>
              )}

              {activeFiltersCount > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCity('ALL');
                    setAreaQuery('');
                    setMaxPrice(0);
                    setMaxDeposit(-1);
                    setOnlyFreeService(false);
                    setSearchKeyword('');
                    setShowBookmarksOnly(false);
                  }}
                  className="px-2 py-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 font-bold transition-colors cursor-pointer shrink-0 flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>

            {/* Collapsible Advanced Filters Tray */}
            {showAdvancedFilters && (
              <div className="pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3 animate-fade-in">
                {/* Max Monthly Rent */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Max Monthly Rent
                  </label>
                  <CustomSelect
                    value={maxPrice}
                    onChange={(val) => setMaxPrice(Number(val))}
                    options={[
                      { value: 0, label: 'Any Budget' },
                      ...(isJapan
                        ? [
                            { value: 50000, label: 'Under ¥50,000 / mo' },
                            { value: 70000, label: 'Under ¥70,000 / mo' },
                            { value: 90000, label: 'Under ¥90,000 / mo' },
                          ]
                        : [
                            { value: 450000, label: 'Under ₩450,000 / mo' },
                            { value: 600000, label: 'Under ₩600,000 / mo' },
                            { value: 800000, label: 'Under ₩800,000 / mo' },
                          ])
                    ]}
                    accentColor="purple"
                  />
                </div>

                {/* Security Deposit */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Security Deposit
                  </label>
                  <CustomSelect
                    value={maxDeposit}
                    onChange={(val) => setMaxDeposit(Number(val))}
                    options={[
                      { value: -1, label: 'Any Deposit' },
                      { value: 0, label: '⚡ Zero Deposit (₩0 / ¥0)' },
                      ...(isJapan
                        ? [
                            { value: 30000, label: 'Under ¥30,000' },
                            { value: 50000, label: 'Under ¥50,000' },
                            { value: 100000, label: 'Under ¥100,000' },
                          ]
                        : [
                            { value: 1000000, label: 'Under ₩1,000,000' },
                            { value: 3000000, label: 'Under ₩3,000,000' },
                            { value: 5000000, label: 'Under ₩5,000,000' },
                          ])
                    ]}
                    accentColor="purple"
                  />
                </div>

                {/* Keyword search */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Keyword / Amenity
                  </label>
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchKeyword}
                      onChange={(e) => setSearchKeyword(e.target.value)}
                      placeholder="Wi-Fi, Free Food..."
                      className="w-full pl-8 pr-3 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Listings Feed */}
          {loading ? (
            <div className="py-16 text-center text-slate-400 space-y-3">
              <div className="w-8 h-8 mx-auto border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
              <p className="text-xs font-bold">Loading verified housing listings...</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 text-slate-500 space-y-3">
              <Home className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-base font-black text-slate-800">No rooms match your active filters</h3>
              <p className="text-xs max-w-sm mx-auto">
                Try clearing some filters or be the first to post an available room or roommate request in this area!
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCity('ALL');
                  setAreaQuery('');
                  setMaxPrice(0);
                  setSearchKeyword('');
                  setOnlyFreeService(false);
                  setShowBookmarksOnly(false);
                }}
                className="px-4 py-2 rounded-xl bg-purple-100 text-purple-800 text-xs font-black cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between pt-1">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                  <span>{isJapan ? '🇯🇵 Japan Housing Listings' : '🇰🇷 Korea Housing Listings'}</span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-purple-800">
                    {filteredPosts.length}
                  </span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4 md:gap-5">
                {filteredPosts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    isBookmarked={bookmarks.includes(post.id)}
                    onToggleBookmark={handleToggleBookmark}
                    onOpenMessage={handleOpenMessage}
                    onOpenDetail={handleOpenDetail}
                    user={user}
                    onRequireAuth={() => setAuthSheetOpen(true)}
                  />
                ))}
              </div>
            </div>
          )}

        </div>
      )}

      {/* TAB 2: HOUSING TYPES GUIDE */}
      {activeTab === 'GUIDE' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(isJapan ? JAPAN_HOUSING_TYPES : KOREA_HOUSING_TYPES).map((h, i) => (
              <div key={i} className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-black text-slate-900">{h.title}</h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 text-xs font-black">
                    {h.cost}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{h.desc}</p>
                <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Upfront Deposit</span>
                    <span className="font-bold text-slate-800">{h.deposit}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Top Highlight</span>
                    <span className="font-bold text-purple-700">{h.perk}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: RENTAL TERMS & DEPOSITS */}
      {activeTab === 'TERMS' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(isJapan ? JAPAN_RENTAL_TERMS : KOREA_RENTAL_TERMS).map((t, i) => (
              <div key={i} className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-black text-slate-900">{t.term}</h3>
                  <span className="text-xs font-bold text-purple-600">{t.meaning}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: CITY RENT COMPARISON */}
      {activeTab === 'COSTS' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h3 className="text-base font-black text-slate-900">
            {isJapan ? 'Average Monthly Rent by Japanese Prefecture' : 'Average Monthly Rent by Korean Region'}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-400 uppercase font-black">
                <tr>
                  <th className="p-3">City / Area</th>
                  <th className="p-3">Sharehouse / Goshiwon</th>
                  <th className="p-3">Private 1K / One-Room</th>
                  <th className="p-3">Deposit Required</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {isJapan ? (
                  <>
                    <tr>
                      <td className="p-3 font-bold text-slate-900">Tokyo (Shinjuku / Ikebukuro)</td>
                      <td className="p-3">¥50,000 – ¥75,000</td>
                      <td className="p-3">¥75,000 – ¥110,000</td>
                      <td className="p-3">1–2 Months</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-slate-900">Tokyo Suburbs (Saitama / Chiba)</td>
                      <td className="p-3">¥38,000 – ¥55,000</td>
                      <td className="p-3">¥50,000 – ¥68,000</td>
                      <td className="p-3">1 Month</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-slate-900">Osaka (Umeda / Namba)</td>
                      <td className="p-3">¥35,000 – ¥50,000</td>
                      <td className="p-3">¥48,000 – ¥70,000</td>
                      <td className="p-3">0–1 Month</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-slate-900">Fukuoka (Hakata / Tenjin)</td>
                      <td className="p-3">¥30,000 – ¥45,000</td>
                      <td className="p-3">¥40,000 – ¥58,000</td>
                      <td className="p-3">0–1 Month</td>
                    </tr>
                  </>
                ) : (
                  <>
                    <tr>
                      <td className="p-3 font-bold text-slate-900">Seoul (Hongdae / Sinchon)</td>
                      <td className="p-3">₩400,000 – ₩550,000</td>
                      <td className="p-3">₩600,000 – ₩900,000</td>
                      <td className="p-3">₩5,000,000+</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-slate-900">Seoul (Sillim / Gwanak)</td>
                      <td className="p-3">₩320,000 – ₩450,000</td>
                      <td className="p-3">₩450,000 – ₩650,000</td>
                      <td className="p-3">₩3,000,000+</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-slate-900">Busan (Seomyeon / Haeundae)</td>
                      <td className="p-3">₩280,000 – ₩400,000</td>
                      <td className="p-3">₩380,000 – ₩550,000</td>
                      <td className="p-3">₩3,000,000</td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Posting Modal */}
      {postModalOpen && (
        <PostModal
          key={`${selectedCountry}-ROOM-${selectedCity}-${areaQuery}-${maxDeposit}`}
          isOpen={postModalOpen}
          onClose={() => setPostModalOpen(false)}
          defaultType="ROOM"
          defaultCountry={selectedCountry}
          defaultCity={selectedCity !== 'ALL' ? selectedCity : undefined}
          defaultArea={areaQuery || undefined}
          defaultZeroDeposit={maxDeposit === 0}
          defaultFreeService={true}
          user={user}
          onRequireAuth={() => {
            setPostModalOpen(false);
            setAuthSheetOpen(true);
          }}
          onRequirePhoneVerification={() => {
            setPostModalOpen(false);
            setPhoneModalOpen(true);
          }}
          isPhoneVerified={isPhoneVerified}
          verifiedPhone={verifiedPhone}
          onPostCreated={(newPost) => {
            setPosts(prev => [newPost, ...prev]);
          }}
        />
      )}

      {/* Phone Verification Modal */}
      {phoneModalOpen && (
        <PhoneVerificationModal
          isOpen={phoneModalOpen}
          onClose={() => setPhoneModalOpen(false)}
          onVerified={handlePhoneVerified}
        />
      )}

      {/* Direct Messaging Drawer */}
      {messageDrawerOpen && (
        <DirectMessageDrawer
          isOpen={messageDrawerOpen}
          onClose={() => setMessageDrawerOpen(false)}
          activePost={activePost}
          user={user}
          onRequireAuth={() => {
            setMessageDrawerOpen(false);
            setAuthSheetOpen(true);
          }}
        />
      )}

      {/* Detail Modal with Comments */}
      {detailModalOpen && (
        <PostDetailModal
          isOpen={detailModalOpen}
          onClose={() => setDetailModalOpen(false)}
          post={activePost}
          isBookmarked={activePost ? bookmarks.includes(activePost.id) : false}
          onToggleBookmark={handleToggleBookmark}
          onOpenMessage={handleOpenMessage}
          user={user}
          onRequireAuth={() => {
            setDetailModalOpen(false);
            setAuthSheetOpen(true);
          }}
        />
      )}

      {/* Auth Sheet */}
      {authSheetOpen && (
        <AuthSheet
          initialMode="signin"
          onClose={() => setAuthSheetOpen(false)}
          onSuccess={(u) => {
            setUser(u);
            setAuthSheetOpen(false);
          }}
        />
      )}

    </div>
  );
}
