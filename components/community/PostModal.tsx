'use client';
import React, { useState } from 'react';
import {
  X,
  Briefcase,
  Home as HomeIcon,
  MapPin,
  Clock,
  DollarSign,
  Sparkles,
  ShieldCheck,
  Check,
  Plus,
  Loader2,
  FileText,
  Building,
  Key
} from 'lucide-react';
import type { CommunityPost } from '@/lib/community-data';
import CustomSelect from '@/components/ui/CustomSelect';

interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultType?: 'ROOM' | 'JOB';
  defaultCountry?: 'japan' | 'korea';
  defaultCity?: string;
  defaultArea?: string;
  defaultZeroDeposit?: boolean;
  defaultFreeService?: boolean;
  user?: { name: string; email: string } | null;
  onRequireAuth: () => void;
  onRequirePhoneVerification: () => void;
  isPhoneVerified: boolean;
  verifiedPhone?: string;
  onPostCreated: (post: CommunityPost) => void;
}

const CITIES = {
  japan: ['Tokyo', 'Osaka', 'Nagoya', 'Fukuoka', 'Yokohama', 'Kyoto', 'Kobe', 'Sendai', 'Other Japan'],
  korea: ['Seoul', 'Busan', 'Incheon', 'Daegu', 'Daejeon', 'Gwangju', 'Suwon', 'Other Korea'],
};

const SUGGESTED_TAGS = {
  ROOM: ['Zero Deposit', 'Near Station', 'Free Wi-Fi', 'Furnished', 'All Bills Included', 'No Key Money', 'Nepali Friendly', 'Couples Welcome'],
  JOB: ['Part-time (28h)', 'Night Shift', 'Weekend Shifts', 'Free Meal (Makanai)', 'Visa Sponsorship', 'Transit Allowance'],
};

export default function PostModal({
  isOpen,
  onClose,
  defaultType = 'ROOM',
  defaultCountry = 'japan',
  defaultCity,
  defaultArea = '',
  defaultZeroDeposit = false,
  defaultFreeService = true,
  user,
  onRequireAuth,
  onRequirePhoneVerification,
  isPhoneVerified,
  verifiedPhone,
  onPostCreated,
}: PostModalProps) {
  const isRoom = defaultType === 'ROOM';
  const isJapan = defaultCountry === 'japan';
  const currencySymbol = isJapan ? '¥' : '₩';
  const countryLabel = isJapan ? 'Japan' : 'Korea';

  // State pre-scoped according to current route and filters used
  const [city, setCity] = useState(
    defaultCity && CITIES[defaultCountry].includes(defaultCity)
      ? defaultCity
      : CITIES[defaultCountry][0]
  );
  const [area, setArea] = useState(defaultArea);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [priceUnit, setPriceUnit] = useState<'PER_MONTH' | 'PER_HOUR'>(isRoom ? 'PER_MONTH' : 'PER_HOUR');
  const [deposit, setDeposit] = useState(defaultZeroDeposit ? '0' : '');
  const [duration, setDuration] = useState('');
  const [serviceCharge, setServiceCharge] = useState('0');
  const [languageLevel, setLanguageLevel] = useState<'No Need' | 'Basic' | 'Medium' | 'Advance' | 'Expert'>('Basic');
  const [description, setDescription] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>(
    defaultZeroDeposit && isRoom ? ['Zero Deposit'] : []
  );
  const [customTag, setCustomTag] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const addCustomTag = () => {
    if (customTag.trim() && !selectedTags.includes(customTag.trim())) {
      setSelectedTags([...selectedTags, customTag.trim()]);
      setCustomTag('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Gate 1: Compulsory Signup
    if (!user) {
      onRequireAuth();
      return;
    }

    // Gate 2: Compulsory Phone Verification
    if (!isPhoneVerified) {
      onRequirePhoneVerification();
      return;
    }

    if (!title.trim() || !description.trim() || !area.trim() || !price) {
      setError('Please fill in all required fields (City, Area, Title, Price, and Description).');
      return;
    }

    setLoading(true);
    try {
      const parsedServiceCharge = parseFloat(serviceCharge || '0') || 0;
      const finalTags = [...selectedTags];
      if (!isRoom && languageLevel) {
        const langTag = `${isJapan ? 'Japanese' : 'Korean'}: ${languageLevel}`;
        if (!finalTags.includes(langTag)) {
          finalTags.push(langTag);
        }
      }

      const payload = {
        type: defaultType,
        title: title.trim(),
        description: description.trim(),
        country: defaultCountry,
        city,
        area: area.trim(),
        price: parseFloat(price),
        priceUnit,
        currency: isJapan ? 'JPY' : 'KRW',
        serviceCharge: parsedServiceCharge,
        serviceChargeNote: parsedServiceCharge === 0 ? 'Free (Direct Owner)' : 'Facilitation Fee',
        duration: duration.trim() || (isRoom ? 'Flexible Lease' : 'Part-time'),
        languageLevel: !isRoom ? languageLevel : undefined,
        authorId: user.email,
        authorName: user.name,
        authorPhone: verifiedPhone || '+81-80-0000-0000',
        isPhoneVerified: true,
        contactPreference: 'IN_APP',
        tags: finalTags,
        deposit: deposit ? parseFloat(deposit) : (isRoom ? 0 : undefined),
      };

      const res = await fetch('/api/community/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to publish listing');

      onPostCreated(data.post);
      onClose();
    } catch (err: any) {
      setError(err?.message || 'Something went wrong while publishing.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-[80] bg-slate-950/60 backdrop-blur-xs animate-fade-in" onClick={onClose} />

      <div className="fixed inset-0 z-[90] overflow-y-auto flex items-center justify-center p-3 sm:p-5 pointer-events-none">
        <div className="w-full max-w-xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden pointer-events-auto my-auto animate-fade-in font-sans">
          
          {/* Header - Soft, Clean Gradient Tailored to Country */}
          {/* Thin & Clean Header Banner */}
          <div className={`px-4 sm:px-5 py-3 text-white flex items-center justify-between border-b border-white/10 ${
            isJapan
              ? 'bg-gradient-to-r from-red-600 via-rose-600 to-red-600'
              : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700'
          }`}>
            <div className="min-w-0 pr-3">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-xs border border-white/25 text-white text-[10px] font-bold">
                  {isJapan ? '🇯🇵 Japan' : '🇰🇷 Korea'} &middot; {isRoom ? '🏠 Room' : '🏢 Job'}
                </span>
                {isPhoneVerified && (
                  <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-400/25 text-emerald-100 text-[10px] font-semibold border border-emerald-400/30">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Verified</span>
                  </span>
                )}
              </div>
              <h2 className="text-sm sm:text-base font-bold text-white tracking-tight truncate leading-tight">
                {isRoom ? `Post a Room in ${countryLabel}` : `Post a Job Opening in ${countryLabel}`}
              </h2>
            </div>

            <button
              onClick={onClose}
              className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-white/15 hover:bg-white/25 text-white transition-colors cursor-pointer shrink-0"
              aria-label="Close modal"
            >
              <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto">
            {error && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-medium text-rose-700">
                ⚠️ {error}
              </div>
            )}

            {/* Row 1: Location (City + Area) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  City / Region <span className="text-rose-500">*</span>
                </label>
                <CustomSelect
                  value={city}
                  onChange={(val) => setCity(String(val))}
                  options={CITIES[defaultCountry].map(c => ({ value: c, label: c }))}
                  accentColor="indigo"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Station / Area / Ward <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    placeholder={isJapan ? 'e.g. Shin-Okubo, Shinjuku' : 'e.g. Hongdae, Mapo-gu'}
                    required
                    className="w-full pl-8 pr-3 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>

            {/* Row 2: Title */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {isRoom ? 'Room Title' : 'Job Title'} <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={
                  isRoom
                    ? (isJapan ? 'e.g. Private 1K apartment near Shinjuku Station, Furnished' : 'e.g. Premium Hongdae Goshiwon with Private Bath & Free Food')
                    : (isJapan ? 'e.g. Convenience store night cashier, N4 Japanese OK' : 'e.g. Restaurant kitchen assistant & hall staff (Alba)')
                }
                required
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Row 2.5: Needed Language Level (Jobs Only) */}
            {!isRoom && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Needed Language Level <span className="text-rose-500">*</span>
                </label>
                <CustomSelect
                  value={languageLevel}
                  onChange={(val) => setLanguageLevel(val as any)}
                  options={[
                    { value: 'No Need', label: `No Need (Zero ${isJapan ? 'Japanese' : 'Korean'} Required)` },
                    { value: 'Basic', label: `Basic (Conversational / ${isJapan ? 'JLPT N5' : 'TOPIK 1'})` },
                    { value: 'Medium', label: `Medium (Intermediate / ${isJapan ? 'JLPT N4–N3' : 'TOPIK 2–3'})` },
                    { value: 'Advance', label: `Advance (Fluent / ${isJapan ? 'JLPT N2' : 'TOPIK 4–5'})` },
                    { value: 'Expert', label: `Expert (Native / Business / ${isJapan ? 'JLPT N1' : 'TOPIK 6'})` },
                  ]}
                  accentColor="indigo"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  Helps job seekers know if their {isJapan ? 'Japanese' : 'Korean'} level meets your requirement.
                </p>
              </div>
            )}

            {/* Row 3: Financials (Clean & Intuitive) */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-3">
              <span className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-indigo-600" />
                <span>{isRoom ? `Rent & Deposit (${currencySymbol})` : `Wage & Pay Rate (${currencySymbol})`}</span>
              </span>

              {isRoom ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">
                      Monthly Rent <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400">
                        {currencySymbol}
                      </span>
                      <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder={isJapan ? '65000' : '450000'}
                        required
                        className="w-full pl-7 pr-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 bg-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">
                      Security Deposit (Enter 0 if None)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400">
                        {currencySymbol}
                      </span>
                      <input
                        type="number"
                        value={deposit}
                        onChange={(e) => setDeposit(e.target.value)}
                        placeholder="0 (Zero deposit)"
                        className="w-full pl-7 pr-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 bg-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">
                      Wage Amount <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400">
                        {currencySymbol}
                      </span>
                      <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder={isJapan ? '1250' : '10500'}
                        required
                        className="w-full pl-7 pr-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 bg-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">
                      Payment Rate
                    </label>
                    <CustomSelect
                      value={priceUnit}
                      onChange={(val) => setPriceUnit(val as any)}
                      options={[
                        { value: 'PER_HOUR', label: 'Per Hour (時給 / 시급)' },
                        { value: 'PER_MONTH', label: 'Per Month (月給 / 월급)' },
                        { value: 'PER_DAY', label: 'Per Day (日給 / 일급)' },
                      ]}
                      accentColor="indigo"
                    />
                  </div>
                </div>
              )}

              {/* Lease Duration or Shift Timing */}
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">
                  {isRoom ? 'Lease Term / Stay Duration' : 'Shift / Hours Per Week'}
                </label>
                <input
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder={isRoom ? 'e.g. Flexible, 1-3 Months, 1 Year' : 'e.g. Part-time 28h/week, Night shift'}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 bg-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Service Fee: Input on right side with 0 filled in by default (0 = Free) */}
              <div className="pt-2.5 border-t border-slate-200/60">
                <div className="flex items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-800">
                        Service Charge / Facilitation Fee
                      </span>
                      {Number(serviceCharge || 0) === 0 ? (
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-semibold shrink-0">
                          ✓ Free ({currencySymbol}0 - Zero Fee)
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-[11px] font-semibold shrink-0">
                          Fee: {currencySymbol}{serviceCharge}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      0 means free (no service charge). Enter amount if charging a fee.
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <div className="relative">
                      <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                        {currencySymbol}
                      </span>
                      <input
                        type="number"
                        value={serviceCharge}
                        onChange={(e) => setServiceCharge(e.target.value)}
                        placeholder="0"
                        min="0"
                        className="w-28 sm:w-32 pl-6 pr-2.5 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 bg-white focus:outline-none focus:border-indigo-500 transition-colors text-right"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 4: Description */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Description &amp; Details <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={
                  isRoom
                    ? 'Mention key room details: walking distance to station, Wi-Fi, laundry facilities, kitchen utensils, utility bills status, move-in availability date...'
                    : 'Mention duties, required Japanese/Korean language level (e.g. N4 or TOPIK 2), shift timing, transportation allowance...'
                }
                required
                className="w-full p-3 rounded-xl border border-slate-200 text-xs font-normal text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 leading-relaxed font-sans"
              />
            </div>

            {/* Row 5: Quick Tags / Highlights */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Key Features (Click to select)
              </label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {SUGGESTED_TAGS[defaultType].map((tag) => {
                  const isSelected = selectedTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-600 text-white shadow-2xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {isSelected ? `✓ ${tag}` : `+ ${tag}`}
                    </button>
                  );
                })}
              </div>

              {/* Add Custom Tag */}
              <div className="flex items-center gap-1.5">
                <input
                  type="text"
                  value={customTag}
                  onChange={(e) => setCustomTag(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addCustomTag();
                    }
                  }}
                  placeholder="Add custom tag (e.g. Near Halal Store)..."
                  className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="button"
                  onClick={addCustomTag}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium cursor-pointer"
                >
                  Add Tag
                </button>
              </div>
            </div>

            {/* Submit Action Buttons */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className={`px-6 py-2.5 rounded-xl text-white text-xs font-semibold shadow-xs transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 ${
                  isJapan
                    ? 'bg-rose-600 hover:bg-rose-700'
                    : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Publishing...</span>
                  </>
                ) : (
                  <span>{isRoom ? 'Publish Room Listing' : 'Publish Job Listing'}</span>
                )}
              </button>
            </div>
          </form>

        </div>
      </div>
    </>
  );
}
