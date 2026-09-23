'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Briefcase,
  MapPin,
  Filter,
  Search,
  Plus,
  Bookmark,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  DollarSign,
  Clock,
  FileText,
  Building,
  GraduationCap,
  MessageSquare,
  Award,
  AlertCircle,
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

interface JobsHubClientProps {
  country?: 'japan' | 'korea' | 'all';
}

const JAPAN_STUDENT_JOBS = [
  {
    role: 'Convenience Store (コンビニ - 7-Eleven, Lawson, FamilyMart)',
    pay: '¥1,120 – ¥1,450 / hr',
    hours: 'Shifts between 17:00–22:00 or 22:00–06:00 (Night shift +25%)',
    reqs: 'JLPT N4 or JFT-Basic. Need basic customer greeting and cash register familiarity.',
    tip: 'Stores near residential stations have friendlier regulars and calmer foot traffic.',
  },
  {
    role: 'Restaurant & Izakaya (飲食店・居酒屋)',
    pay: '¥1,150 – ¥1,400 / hr + Free Meal (Makanai)',
    hours: '11:00–15:00 (Lunch) or 18:00–23:00 (Dinner rush)',
    reqs: 'Kitchen (N5/Basic OK), Hall Waiter (N4/N3 conversational).',
    tip: 'Free delicious meals (Makanai) save ¥15,000–¥25,000 monthly food budget!',
  },
  {
    role: 'Logistics Sorting (ヤマト・佐川・郵便局)',
    pay: '¥1,250 – ¥1,550 / hr',
    hours: 'Flexible late-night shifts (23:00–06:00)',
    reqs: 'Minimal Japanese required. Physical barcode scanner sorting.',
    tip: 'Best paying job for newly arrived students with introductory Japanese.',
  },
  {
    role: 'Hotel Housekeeping & Cleaning (ホテル清掃)',
    pay: '¥1,150 – ¥1,300 / hr',
    hours: '10:00 – 15:00 (Fits morning language school classes)',
    reqs: 'Basic instructions understanding. Focus on cleanliness and precision.',
    tip: 'Great fixed daytime shifts that never interfere with evening study.',
  },
];

const KOREA_STUDENT_JOBS = [
  {
    role: 'Convenience Store Alba (편의점 - CU, GS25, 7-Eleven)',
    pay: '₩10,030 – ₩11,500 / hr',
    hours: 'Weekend shifts (Saturdays/Sundays 8-hr shifts)',
    reqs: 'TOPIK Level 2–3. POS machine operation and customer greetings.',
    tip: 'Complies neatly with D-2 visa 20–25 hours/week allowance.',
  },
  {
    role: 'Korean BBQ / Fried Chicken Hall Staff (식당/치킨집)',
    pay: '₩10,500 – ₩12,500 / hr + Free Meal',
    hours: 'Evening dinner rush (18:00–23:00)',
    reqs: 'Conversational Korean (TOPIK 3). Fast-paced table serving.',
    tip: 'Tips are not customary in Korea, but free chicken and meals are common.',
  },
  {
    role: 'Coffee Shop / Café Barista (카페 알바)',
    pay: '₩10,030 – ₩11,000 / hr',
    hours: 'Afternoon shifts (12:00–17:00)',
    reqs: 'TOPIK 3+ (Clear communication for drink customizations).',
    tip: 'Relaxed atmosphere, clean environment, popular among international students.',
  },
  {
    role: 'University Office / Library Assistant (근로장학생)',
    pay: '₩10,030 / hr (Tax-free stipend)',
    hours: 'On campus between lectures',
    reqs: 'Good GPA and basic Korean. Arranged via school international office.',
    tip: 'Zero travel time and allows studying during quiet desk hours.',
  },
];

const RESUME_RULES_JP = [
  { rule: 'Rirekisho (履歴書) Standards', desc: 'Use standard JIS format with formal suit photo (3x4 cm) taken within 3 months with a white/blue background.' },
  { rule: 'Handwritten vs Printed', desc: 'Black ballpoint pen (no friction erasable pens!) or clean PDF printed version. No spelling mistakes allowed.' },
  { rule: 'Jikoshoukai (自己紹介)', desc: 'Highlight punctuality, eagerness to learn, and past work ethic. Explicitly mention: "28 hours/week strictly observed (資格外活動許可取得済み)".' },
  { rule: 'Interview Manners', desc: 'Arrive 7 minutes early, knock 3 times (Shitsurei shimasu), bow at 30 degrees, wait until offered a seat.' },
];

const RESUME_RULES_KR = [
  { rule: 'Iryeokseo (이력서) Standards', desc: 'Clean Korean resume format with formal passport-style photo, ARC/Alien Registration details, and visa expiration date.' },
  { rule: 'Part-Time Work Permit', desc: 'Always include notation that D-2 Part-time Work Permit (시간제취업 허가서) will be officially stamped at Immigration.' },
  { rule: 'Self-Introduction (자기소개서)', desc: 'Brief summary of university major, TOPIK level, and enthusiastic customer service mindset.' },
  { rule: 'Interview Manners', desc: 'Greet politely with "Annyeonghaseyo", maintain respectful posture, and express commitment to promised schedule.' },
];

export default function JobsHubClient({ country = 'all' }: JobsHubClientProps) {
  const { activeCountry, setCountryFocus } = useCountry();
  const selectedCountry = country !== 'all' ? country : (activeCountry === 'korea' ? 'korea' : 'japan');

  const [activeTab, setActiveTab] = useState<'LISTINGS' | 'STUDENT_JOBS' | 'RESUME' | 'LABOR_LAWS'>('LISTINGS');
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [selectedCity, setSelectedCity] = useState<string>('ALL');
  const [areaQuery, setAreaQuery] = useState('');
  const [minSalary, setMinSalary] = useState<number>(0);
  const [selectedDuration, setSelectedDuration] = useState<string>('ALL');
  const [selectedLanguageLevel, setSelectedLanguageLevel] = useState<string>('ALL');
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
      const res = await fetch(`/api/community/posts?type=JOB&country=${selectedCountry}`);
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
    if (minSalary > 0 && post.price < minSalary) return false;
    if (selectedDuration !== 'ALL' && !post.duration.toLowerCase().includes(selectedDuration.toLowerCase())) return false;
    if (onlyFreeService && post.serviceCharge > 0) return false;
    if (selectedLanguageLevel !== 'ALL') {
      const target = selectedLanguageLevel.toLowerCase();
      const hasExact = post.languageLevel && post.languageLevel.toLowerCase() === target;
      if (selectedLanguageLevel === 'No Need') {
        const noNeedMatch =
          post.languageLevel === 'No Need' ||
          post.tags.some(t => t.toLowerCase().includes('no japanese') || t.toLowerCase().includes('no korean')) ||
          post.description.toLowerCase().includes('minimal japanese') ||
          post.description.toLowerCase().includes('minimal korean') ||
          post.description.toLowerCase().includes('no heavy conversation');
        if (!noNeedMatch && !hasExact) return false;
      } else if (!hasExact) {
        const tagMatch = post.tags.some(t => t.toLowerCase().includes(target));
        const descMatch = post.description.toLowerCase().includes(target);
        if (!tagMatch && !descMatch) return false;
      }
    }
    if (searchKeyword.trim()) {
      const q = searchKeyword.toLowerCase();
      const match =
        post.title.toLowerCase().includes(q) ||
        post.description.toLowerCase().includes(q) ||
        post.tags.some(t => t.toLowerCase().includes(q)) ||
        (post.languageLevel && post.languageLevel.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  const isJapan = selectedCountry === 'japan';
  const cities = isJapan ? ['Tokyo', 'Osaka', 'Nagoya', 'Fukuoka'] : ['Seoul', 'Busan', 'Incheon'];

  const activeFiltersCount = 
    (selectedCity !== 'ALL' ? 1 : 0) +
    (areaQuery.trim() ? 1 : 0) +
    (minSalary > 0 ? 1 : 0) +
    (selectedDuration !== 'ALL' ? 1 : 0) +
    (selectedLanguageLevel !== 'ALL' ? 1 : 0) +
    (onlyFreeService ? 1 : 0) +
    (searchKeyword.trim() ? 1 : 0) +
    (showBookmarksOnly ? 1 : 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-24 font-sans">
      
      {/* Minimized Hero Banner with Quick Stats & Quick Actions */}
      <div className={`rounded-2xl p-4 sm:p-5 mb-4 relative overflow-hidden shadow-sm border text-white ${
        isJapan 
          ? 'bg-gradient-to-br from-rose-600 via-red-600 to-rose-700 shadow-rose-600/10 border-rose-400/20' 
          : 'bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 shadow-indigo-600/10 border-indigo-400/20'
      }`}>
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-white/10 to-transparent pointer-events-none" />
        
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md border border-white/25 text-white text-[11px] font-bold tracking-wide">
                {isJapan ? '🇯🇵 Japan Jobs & Careers' : '🇰🇷 Korea Jobs & Careers'}
              </span>
              <span className="flex items-center gap-1.5 text-[11px] text-white/90 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                Live Feed
              </span>
            </div>

            <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white">
              {isJapan ? 'Part-Time Arubaito & Full-Time Jobs in Japan' : 'Part-Time Alba & EPS E-9 Jobs in Korea'}
            </h1>
            <p className="text-xs text-white/85 max-w-xl leading-snug font-normal mt-0.5 hidden sm:block">
              {isJapan
                ? 'Convenience stores, restaurant shifts, logistics jobs, and official SSW-1 employer matching.'
                : 'Certified student alba positions, factory shifts, and long-term E-9 career opportunities.'}
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
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-indigo-700 font-bold text-xs transition-all shadow-xs cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Post Job</span>
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
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Building className="w-4 h-4" />
          <span>Live Job Openings ({filteredPosts.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('STUDENT_JOBS')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer shrink-0 ${
            activeTab === 'STUDENT_JOBS'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Student Jobs (Arubaito / Alba)</span>
        </button>

        <button
          onClick={() => setActiveTab('RESUME')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer shrink-0 ${
            activeTab === 'RESUME'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Resume &amp; Interview Guide</span>
        </button>

        <button
          onClick={() => setActiveTab('LABOR_LAWS')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer shrink-0 ${
            activeTab === 'LABOR_LAWS'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Statutory Wages &amp; Labor Rights</span>
        </button>
      </div>

      {/* TAB 1: LIVE JOB LISTINGS & SEARCH FILTER */}
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
                  accentColor="indigo"
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
                  placeholder="Area / Station (Shinjuku, Incheon...)"
                  className="w-full pl-8 pr-3 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Saved Jobs Button */}
              <button
                type="button"
                onClick={() => setShowBookmarksOnly(prev => !prev)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer shrink-0 ${
                  showBookmarksOnly
                    ? 'bg-amber-50 border-amber-300 text-amber-700'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
                title="Filter by saved jobs"
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
                    ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Filter className="w-3.5 h-3.5 text-indigo-600" />
                <span>Filters</span>
                {activeFiltersCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center">
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
                onClick={() => setSelectedDuration(selectedDuration === 'Part-time' ? 'ALL' : 'Part-time')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer shrink-0 ${
                  selectedDuration === 'Part-time'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                ⏱️ Part-Time (28h)
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
                Zero Fee / Free
              </button>

              <button
                type="button"
                onClick={() => {
                  const keyword = isJapan ? 'Japanese Beginner' : 'Korean Beginner';
                  setSearchKeyword(searchKeyword === keyword ? '' : keyword);
                }}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer shrink-0 ${
                  searchKeyword === (isJapan ? 'Japanese Beginner' : 'Korean Beginner')
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                🗣️ {isJapan ? 'Japanese Beginner OK' : 'Korean Beginner OK'}
              </button>

              {/* Language Level Quick Filters */}
              {(['No Need', 'Basic', 'Medium', 'Advance', 'Expert'] as const).map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setSelectedLanguageLevel(selectedLanguageLevel === lvl ? 'ALL' : lvl)}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer shrink-0 ${
                    selectedLanguageLevel === lvl
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  🗣️ {lvl}
                </button>
              ))}

              <button
                type="button"
                onClick={() => setSearchKeyword(searchKeyword === 'Transit Paid' ? '' : 'Transit Paid')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer shrink-0 ${
                  searchKeyword === 'Transit Paid'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                🚆 Transit Covered
              </button>

              {isJapan ? (
                <button
                  type="button"
                  onClick={() => setSearchKeyword(searchKeyword === 'SSW-1' ? '' : 'SSW-1')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer shrink-0 ${
                    searchKeyword === 'SSW-1'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  🏅 SSW-1 Visa
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setSearchKeyword(searchKeyword === 'E-9' ? '' : 'E-9')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer shrink-0 ${
                    searchKeyword === 'E-9'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  🏭 Official E-9 Factory
                </button>
              )}

              {activeFiltersCount > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCity('ALL');
                    setAreaQuery('');
                    setMinSalary(0);
                    setSelectedDuration('ALL');
                    setSelectedLanguageLevel('ALL');
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
              <div className="pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 animate-fade-in">
                {/* Language Level Required */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    {isJapan ? 'Japanese Level Required' : 'Korean Level Required'}
                  </label>
                  <CustomSelect
                    value={selectedLanguageLevel}
                    onChange={(val) => setSelectedLanguageLevel(String(val))}
                    options={[
                      { value: 'ALL', label: 'All Language Levels' },
                      { value: 'No Need', label: 'No Need (Zero Required)' },
                      { value: 'Basic', label: `Basic (Conversational / ${isJapan ? 'N5' : 'TOPIK 1'})` },
                      { value: 'Medium', label: `Medium (Intermediate / ${isJapan ? 'N4–N3' : 'TOPIK 2–3'})` },
                      { value: 'Advance', label: `Advance (Fluent / ${isJapan ? 'N2' : 'TOPIK 4–5'})` },
                      { value: 'Expert', label: `Expert (Native / Business / ${isJapan ? 'N1' : 'TOPIK 6'})` },
                    ]}
                    accentColor="indigo"
                  />
                </div>
                {/* Min Wage */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Minimum Rate / Salary
                  </label>
                  <CustomSelect
                    value={minSalary}
                    onChange={(val) => setMinSalary(Number(val))}
                    options={[
                      { value: 0, label: 'Any Wage' },
                      ...(isJapan
                        ? [
                            { value: 1100, label: '¥1,100+ / hr (Standard)' },
                            { value: 1300, label: '¥1,300+ / hr (High)' },
                            { value: 200000, label: '¥200,000+ / mo (Full-Time)' },
                          ]
                        : [
                            { value: 10000, label: '₩10,000+ / hr (Statutory)' },
                            { value: 12000, label: '₩12,000+ / hr (High)' },
                            { value: 2200000, label: '₩2,200,000+ / mo (Full-Time)' },
                          ])
                    ]}
                    accentColor="indigo"
                  />
                </div>

                {/* Duration / Commitment */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Commitment / Shifts
                  </label>
                  <CustomSelect
                    value={selectedDuration}
                    onChange={(val) => setSelectedDuration(String(val))}
                    options={[
                      { value: 'ALL', label: 'All Types' },
                      { value: 'Part-time', label: 'Part-time (Under 28h)' },
                      { value: 'Full-time', label: 'Full-time Regular' },
                      { value: 'Contract / SSW', label: 'Visa Sponsored / Contract' },
                      { value: 'Weekend', label: 'Weekend Shift Only' },
                    ]}
                    accentColor="indigo"
                  />
                </div>

                {/* Keyword search */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Keyword Search
                  </label>
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchKeyword}
                      onChange={(e) => setSearchKeyword(e.target.value)}
                      placeholder="e.g. 7-Eleven, Factory, Kitchen..."
                      className="w-full pl-8 pr-3 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Job Listings Grid */}
          {loading ? (
            <div className="py-16 text-center text-slate-400 space-y-3">
              <div className="w-8 h-8 mx-auto border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
              <p className="text-xs font-bold">Loading verified job openings...</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 text-slate-500 space-y-3">
              <Briefcase className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-base font-black text-slate-800">No jobs match your active filters</h3>
              <p className="text-xs max-w-sm mx-auto">
                Try broadening your filter criteria or post a job vacancy for your store/business!
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCity('ALL');
                  setAreaQuery('');
                  setMinSalary(0);
                  setSelectedDuration('ALL');
                  setSearchKeyword('');
                  setOnlyFreeService(false);
                  setShowBookmarksOnly(false);
                }}
                className="px-4 py-2 rounded-xl bg-indigo-100 text-indigo-800 text-xs font-black cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between pt-1">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                  <span>{isJapan ? '🇯🇵 Japan Job Openings' : '🇰🇷 Korea Job Openings'}</span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800">
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

      {/* TAB 2: STUDENT JOBS (ARUBAITO / ALBA) */}
      {activeTab === 'STUDENT_JOBS' && (
        <div className="space-y-6">
          <div className="p-5 rounded-3xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <p className="font-black">Official Student Working Hour Regulation</p>
              <p>
                {isJapan
                  ? 'International students in Japan are strictly limited to 28 hours per week during school terms, and up to 40 hours per week (8 hrs/day) during official school vacation periods. Working in adult entertainment or pachinko parlors is strictly prohibited by immigration law.'
                  : 'In Korea, D-2 international university students can legally work 20–25 hours per week during semesters with an approved Part-Time Work Permit from the local immigration office. Students with TOPIK Level 3 or higher enjoy maximum work allowance.'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(isJapan ? JAPAN_STUDENT_JOBS : KOREA_STUDENT_JOBS).map((job, idx) => (
              <div key={idx} className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-black text-slate-900">{job.role}</h3>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-black">
                    {job.pay}
                  </span>
                </div>
                <div className="space-y-1.5 text-xs text-slate-600">
                  <p><strong className="text-slate-800">Shifts:</strong> {job.hours}</p>
                  <p><strong className="text-slate-800">Requirements:</strong> {job.reqs}</p>
                </div>
                <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-indigo-600">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Pro-tip: {job.tip}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: RESUME & INTERVIEW GUIDE */}
      {activeTab === 'RESUME' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(isJapan ? RESUME_RULES_JP : RESUME_RULES_KR).map((r, i) => (
              <div key={i} className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 font-black text-xs flex items-center justify-center">
                    {i + 1}
                  </span>
                  <span>{r.rule}</span>
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed pl-8">{r.desc}</p>
              </div>
            ))}
          </div>

          <div className="p-6 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-base font-black">Practice Job &amp; Visa Interviews</h4>
              <p className="text-xs text-slate-400 max-w-md">
                Master 50+ authentic Japanese and Korean interview questions with model answers and audio practice.
              </p>
            </div>
            <Link
              href={`/${selectedCountry}/visa/interview`}
              className="px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black uppercase tracking-wider transition-colors shrink-0"
            >
              Start Interview Simulator
            </Link>
          </div>
        </div>
      )}

      {/* TAB 4: STATUTORY WAGES & LABOR RIGHTS */}
      {activeTab === 'LABOR_LAWS' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-5">
          <h3 className="text-base font-black text-slate-900">
            {isJapan ? 'Statutory Minimum Wages in Japan (2026 / 令和8年)' : 'Statutory Minimum Wage in Korea (2026)'}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                Standard Minimum Wage
              </span>
              <span className="text-lg font-black text-slate-900">
                {isJapan ? '¥1,113 / hr (Tokyo)' : '₩10,030 / hr (Nationwide)'}
              </span>
              <span className="text-[11px] text-slate-500 block">
                {isJapan ? 'National average approx ¥1,055/hr' : 'Applies to all workers equally'}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                Night Shift Allowance
              </span>
              <span className="text-lg font-black text-emerald-600">+25% Premium</span>
              <span className="text-[11px] text-slate-500 block">Mandatory between 22:00 – 05:00</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                Overtime Premium
              </span>
              <span className="text-lg font-black text-indigo-600">+25% to +35%</span>
              <span className="text-[11px] text-slate-500 block">Beyond 8 hrs/day or 40 hrs/week</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-2 text-xs text-slate-700">
            <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              <span>Pension Lump-Sum Refund (脱退一時金 / Return Cost Insurance)</span>
            </h4>
            <p className="leading-relaxed">
              When foreign workers (SSW, TITP, Engineers in Japan; E-9 workers in Korea) permanently leave the country, they can claim a substantial lump-sum refund of the pension contributions made during their stay. In Japan, workers can claim back up to 5 years of Nenkin (typically ¥400,000 to ¥1,200,000).
            </p>
          </div>
        </div>
      )}

      {/* Posting Modal */}
      {postModalOpen && (
        <PostModal
          key={`${selectedCountry}-JOB-${selectedCity}-${areaQuery}`}
          isOpen={postModalOpen}
          onClose={() => setPostModalOpen(false)}
          defaultType="JOB"
          defaultCountry={selectedCountry}
          defaultCity={selectedCity !== 'ALL' ? selectedCity : undefined}
          defaultArea={areaQuery || undefined}
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
