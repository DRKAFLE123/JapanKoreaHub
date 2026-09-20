'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Home as HomeIcon,
  Phone,
  Clock,
  Wallet,
  Building,
  FileCheck,
  Scale,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Briefcase,
  Heart,
  Utensils,
  Smile,
  Users,
  Compass,
  Award,
  BookOpen,
  Coffee,
  Check,
  X
} from 'lucide-react';

type Country = 'japan' | 'korea';

type LifeTab = 'SETUP' | 'HOUSING' | 'CULTURE' | 'VISA_RENEWAL' | 'RIGHTS' | 'EMERGENCY';

type CultureCategory = 'ALL' | 'ETIQUETTE' | 'DINING' | 'WORKPLACE' | 'TRADITIONS' | 'NEPALI_TIPS';

export default function LifeHubClient({ country }: { country: Country }) {
  const [activeTab, setActiveTab] = useState<LifeTab>('SETUP');
  const [cultureCategory, setCultureCategory] = useState<CultureCategory>('ALL');
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizFeedback, setQuizFeedback] = useState<Record<number, boolean>>({});

  const isJapan = country === 'japan';
  const cName = isJapan ? 'Japan' : 'South Korea';
  const flag = isJapan ? '🇯🇵' : '🇰🇷';

  const costs = isJapan ? [
    { category: 'Rent (Apartment / Shared)', amount: '¥35,000 – ¥70,000 / mo', note: 'Cheaper outside central Tokyo (e.g. Saitama, Chiba, Kansai)' },
    { category: 'Groceries & Food', amount: '¥25,000 – ¥40,000 / mo', note: 'Cooking at discount supermarkets like Gyomu Super' },
    { category: 'Utilities (Electricity/Gas/Water)', amount: '¥8,000 – ¥15,000 / mo', note: 'Varies with winter AC heating & summer cooling' },
    { category: 'Mobile SIM & WiFi', amount: '¥3,000 – ¥6,000 / mo', note: 'Budget eSIM/SIM (Rakuten Mobile, ahamo, UQ Mobile)' },
    { category: 'National Health Insurance (NHI)', amount: '¥1,500 – ¥3,000 / mo', note: 'Covers 70% of medical costs at all clinics' },
  ] : [
    { category: 'Rent (One-room / Goshiwon)', amount: '₩350,000 – ₩650,000 / mo', note: 'Goshiwon includes free rice/kimchi; One-room requires deposit' },
    { category: 'Food & Groceries', amount: '₩300,000 – ₩450,000 / mo', note: 'Affordable university cafeterias (~₩5,000) & local marts' },
    { category: 'Utilities (Gas/Electric/Water)', amount: '₩50,000 – ₩100,000 / mo', note: 'Ondol underfloor heating in winter' },
    { category: 'Mobile SIM', amount: '₩30,000 – ₩60,000 / mo', note: 'Alteul budget carriers (KT M Mobile, U+)' },
    { category: 'National Health Insurance (NHIS)', amount: '₩70,000 / mo', note: 'Mandatory coverage for all foreign residents' },
  ];

  // Cultural Guides Data
  const japanCultureModules = [
    {
      id: 'jp-bowing',
      cat: 'ETIQUETTE' as CultureCategory,
      title: 'The Art of Bowing (お辞儀 Ojigi)',
      sub: 'जापानी नमस्कार तथा शिष्टाचार',
      icon: Smile,
      badge: 'Daily Etiquette',
      color: 'border-rose-200 bg-rose-50/40 text-rose-900',
      summary: 'Bowing replaces handshakes in daily life and conveys gratitude, greeting, and respect.',
      points: [
        { label: 'Eshaku (会釈 - 15°)', desc: 'Casual greeting when passing coworkers or neighbors in hallways.' },
        { label: 'Keirei (敬礼 - 30°)', desc: 'Standard respectful bow used for customers, clients, teachers, and elders.' },
        { label: 'Saikeirei (最敬礼 - 45°)', desc: 'Deepest bow reserved for sincere apologies (Shazai) or profound gratitude.' }
      ],
      proTip: 'Keep your back completely straight and bend from the waist; do not maintain eye contact while bowing.'
    },
    {
      id: 'jp-genkan',
      cat: 'ETIQUETTE' as CultureCategory,
      title: 'Shoes Off at Genkan & Slipper Etiquette',
      sub: 'घरभित्र जुत्ता फुकाल्ने र चप्पल नियम (玄関)',
      icon: HomeIcon,
      badge: 'Home & Office',
      color: 'border-amber-200 bg-amber-50/40 text-amber-900',
      summary: 'The entrance (Genkan) separates the outside world from clean indoor living spaces.',
      points: [
        { label: 'Step Up Rule', desc: 'Always remove shoes on the lower sunken floor; step onto the raised floor in socks.' },
        { label: 'Shoe Direction', desc: 'Neatly point your shoes toward the door after stepping onto the raised floor.' },
        { label: 'Toilet Slippers (トイレ用スリッパ)', desc: 'Switch into dedicated restroom slippers when entering the toilet. Never walk back into living areas with toilet slippers!' }
      ],
      proTip: 'Never step barefoot onto straw Tatami mats; wear clean socks.'
    },
    {
      id: 'jp-trains',
      cat: 'ETIQUETTE' as CultureCategory,
      title: 'Train & Public Transit Etiquette',
      sub: 'रेल तथा सार्वजनिक यातायात शिष्टाचार (マナーモード)',
      icon: Compass,
      badge: 'Public Spaces',
      color: 'border-blue-200 bg-blue-50/40 text-blue-900',
      summary: 'Japanese trains are peaceful shared sanctuaries where personal consideration is paramount.',
      points: [
        { label: 'Manner Mode (マナーモード)', desc: 'Keep phones muted. Voice phone calls on trains and buses are strictly forbidden.' },
        { label: 'Priority Seats (優先席 Yūsenseki)', desc: 'Give seats to elderly, pregnant women, and injured passengers; avoid using mobile phones near these seats when crowded.' },
        { label: 'Backpack Courtesy', desc: 'Carry backpacks on your front or place them on the overhead racks during rush hour.' }
      ],
      proTip: 'Line up neatly between the painted double lines on station platforms before train doors open.'
    },
    {
      id: 'jp-chopsticks',
      cat: 'DINING' as CultureCategory,
      title: 'Dining Customs & Chopstick Taboos',
      sub: 'खाना खाने नियम र चपस्टिकको निषेध (箸の作法)',
      icon: Utensils,
      badge: 'Table Etiquette',
      color: 'border-emerald-200 bg-emerald-50/40 text-emerald-900',
      summary: 'Food is sacred in Japan; table rituals show gratitude to nature and the cook.',
      points: [
        { label: 'Phrases Before & After', desc: 'Say "Itadakimasu" (いただきます) with palms together before eating, and "Gochisousama-deshita" (ごちそうさまでした) upon finishing.' },
        { label: 'Hashi-Watashi (箸渡し - Taboo!)', desc: 'Never pass food chopstick-to-chopstick! This directly mimics the Buddhist funeral bone-gathering ritual.' },
        { label: 'Tsukitate-Bashi (突き立て箸 - Taboo!)', desc: 'Never stick chopsticks vertically into rice bowls; this is only done as an offering at funerals.' },
        { label: 'Noodle Slurping', desc: 'Slurping ramen and soba noodles is completely acceptable and aerates the broth aroma.' }
      ],
      proTip: 'Japan has NO tipping culture. If you leave cash tips on the table, staff will run outside after you to return your forgotten money.'
    },
    {
      id: 'jp-hourenso',
      cat: 'WORKPLACE' as CultureCategory,
      title: 'Workplace Hou-Ren-So & Punctuality',
      sub: 'कम्पनीको मुख्य नियम: हो-रेन-सो (報連相)',
      icon: Briefcase,
      badge: 'Business Culture',
      color: 'border-indigo-200 bg-indigo-50/40 text-indigo-900',
      summary: 'The legendary tripartite framework governing all Japanese businesses and factories.',
      points: [
        { label: 'Hōkoku (報告 - Report)', desc: 'Regularly inform your supervisor on task progress, especially when finished or stuck.' },
        { label: 'Renraku (連絡 - Communicate)', desc: 'Instantly notify relevant teammates of schedule changes, delays, or new facts without opinion.' },
        { label: 'Sōdan (相談 - Consult)', desc: 'Seek advice and confirmation from seniors before making risky decisions independently.' },
        { label: '5-10 Minutes Early Rule', desc: 'Being exactly on time is considered late. Arrive 5 to 10 minutes before all meetings and shifts.' }
      ],
      proTip: 'Business cards (Meishi 名刺) are received with both hands, held respectfully, and placed neatly atop your card case on the meeting table.'
    },
    {
      id: 'jp-onsen',
      cat: 'TRADITIONS' as CultureCategory,
      title: 'Onsen & Sento Hot Spring Etiquette',
      sub: 'तातोपानी स्नान नियम र परम्परा (温泉・銭湯)',
      icon: Heart,
      badge: 'Tradition & Relaxation',
      color: 'border-cyan-200 bg-cyan-50/40 text-cyan-900',
      summary: 'Communal hot springs (Onsen) and neighborhood public baths (Sento) have strict hygiene protocols.',
      points: [
        { label: 'Wash Thoroughly First', desc: 'Always sit on the shower stool and wash your entire body and hair with soap BEFORE stepping into communal pools.' },
        { label: 'No Towels in Water', desc: 'Small modesty towels must be placed on your head or beside the bath—never submerged in the water.' },
        { label: 'Tattoo Policies', desc: 'Many traditional onsen still restrict visible tattoos; check rules or use tattoo cover patches.' }
      ],
      proTip: 'Dry yourself off in the entrance area before walking back into the changing locker room to keep mats dry.'
    },
    {
      id: 'jp-nepali-tips',
      cat: 'NEPALI_TIPS' as CultureCategory,
      title: 'Nepali Immigrant Adaptation in Japan',
      sub: 'जापानमा नेपालीहरूले ध्यान दिनुपर्ने मुख्य कुराहरू',
      icon: Users,
      badge: 'Nepali Living Tips',
      color: 'border-purple-200 bg-purple-50/40 text-purple-900',
      summary: 'Practical advice for Nepali students and SSW workers navigating Japanese community expectations.',
      points: [
        { label: 'Apartment Noise (騒音 Souon)', desc: 'Japanese wooden buildings (Apato) lack soundproofing. Avoid loud talking on speakerphone, blaring music, or grinding spices after 9:00 PM.' },
        { label: 'Garbage Sorting (ゴミ分別)', desc: 'Separate burnable, non-burnable, plastics, and PET bottles meticulously. Incorrect sorting will cause neighbors to complain.' },
        { label: 'Omiyage (お土産 Souvenirs)', desc: 'Bringing small boxed sweets or tea from Nepal when you visit home creates immediate goodwill with Japanese coworkers.' }
      ],
      proTip: 'Join your local city hall international lounge (Kokusai Koryu Lounge) for free Japanese cultural events and legal counseling.'
    }
  ];

  const koreaCultureModules = [
    {
      id: 'kr-two-hands',
      cat: 'ETIQUETTE' as CultureCategory,
      title: 'The Two-Hand Etiquette Rule (두 손 예절)',
      sub: 'दुई हातले दिने र लिने शिष्टाचार',
      icon: Smile,
      badge: 'Daily Etiquette',
      color: 'border-blue-200 bg-blue-50/40 text-blue-900',
      summary: 'Using both hands when giving or receiving items is the cornerstone of Korean respect and politeness.',
      points: [
        { label: 'Giving & Receiving', desc: 'Always hand over money, credit cards, gifts, documents, and drinks with both hands.' },
        { label: 'Right Hand Support', desc: 'Alternatively, hold the item in your right hand while placing your left hand lightly under your right forearm.' },
        { label: 'One-Hand Taboo', desc: 'Handing something to an elder or boss with only one hand is viewed as careless or dismissive.' }
      ],
      proTip: 'Even at convenience store checkout counters, receive change or receipts with both hands to make a great impression.'
    },
    {
      id: 'kr-age-hierarchy',
      cat: 'ETIQUETTE' as CultureCategory,
      title: 'Age Hierarchy & Honorifics (예절 ও 서열)',
      sub: 'उमेर मर्यादा र आदरार्थी भाषा (존댓말)',
      icon: Users,
      badge: 'Social Hierarchy',
      color: 'border-indigo-200 bg-indigo-50/40 text-indigo-900',
      summary: 'Koreans often ask "How old are you?" (몇 살이에요?) immediately upon meeting to establish correct relational honorifics.',
      points: [
        { label: 'Jondaenmal vs Banmal', desc: 'Always use formal polite speech (존댓말 Jondaenmal ending in -yo or -nida) with anyone older or unfamiliar.' },
        { label: 'Family-style Titles', desc: 'Colleagues use titles like Hyung (older brother for males), Noona (older sister for males), Oppa (older brother for females), Unni (older sister for females).' },
        { label: 'Sebae (세배 Bow)', desc: 'A formal deep kneeling bow performed for parents and elders during Lunar New Year (Seollal) to receive blessings.' }
      ],
      proTip: 'Never call Korean supervisors by first name alone; use Sajangnim (사장님 Boss) or Banjangnim (반장님 Foreman).'
    },
    {
      id: 'kr-dining-elders',
      cat: 'DINING' as CultureCategory,
      title: 'Table Etiquette & Dining with Elders',
      sub: 'खाना खाने नियम र अग्रजको सम्मान',
      icon: Utensils,
      badge: 'Table Etiquette',
      color: 'border-emerald-200 bg-emerald-50/40 text-emerald-900',
      summary: 'Korean meal times are governed by communal sharing and reverence for the oldest person seated.',
      points: [
        { label: 'Wait for Elders First', desc: 'Do not pick up your spoon or chopsticks until the oldest person at the table lifts theirs and begins eating.' },
        { label: 'Spoon & Chopsticks Separation', desc: 'Never hold both spoon and chopsticks in the same hand simultaneously. Spoon is for rice and soups (Jjigae); chopsticks are for side dishes (Banchan).' },
        { label: 'Never Stick Chopsticks in Rice', desc: 'Sticking chopsticks vertically upright in rice resembles ancestor memorial incense offerings and is forbidden.' },
        { label: 'Unlimited Free Banchan (반찬)', desc: 'Side dishes (Kimchi, beansprouts, pickled radish) can be refilled freely; ask politely: "Banchan deo juseyo!"' }
      ],
      proTip: 'Do not lift your rice or soup bowl off the table to eat from it; keep bowls on the table and use your spoon.'
    },
    {
      id: 'kr-hoesik',
      cat: 'WORKPLACE' as CultureCategory,
      title: 'Hoesik (회식) & Drinking Etiquette',
      sub: 'कम्पनी डिनर तथा रक्सी पिउने नियम',
      icon: Coffee,
      badge: 'Company Culture',
      color: 'border-amber-200 bg-amber-50/40 text-amber-900',
      summary: 'After-work company dinners (Hoesik) are crucial for building camaraderie between workers and bosses.',
      points: [
        { label: 'Turn Head Away to Drink', desc: 'When drinking alcohol in front of an elder or boss, turn your head and torso slightly away and shield your cup.' },
        { label: 'Pouring for Others', desc: 'Never pour your own drink! Pour for coworkers with both hands when their glass is empty, and they will pour for you.' },
        { label: 'Non-Drinkers Welcome', desc: 'If you do not drink alcohol for religious or health reasons, accept the glass with both hands, touch it to your lips, and order cider/cola.' }
      ],
      proTip: 'Attending Hoesik even for one hour shows solidarity and greatly softens relationships on factory floors.'
    },
    {
      id: 'kr-palli-palli',
      cat: 'WORKPLACE' as CultureCategory,
      title: 'The Palli-Palli (빨리빨리) Speed Culture',
      sub: 'कोरियाली कार्यस्थलको "छिटो-छिटो" संस्कृति',
      icon: Clock,
      badge: 'Workplace Mindset',
      color: 'border-rose-200 bg-rose-50/40 text-rose-900',
      summary: 'South Korea\'s post-war miracle was fueled by "Palli-Palli" (Hurry, Hurry)—an intense drive for swift execution.',
      points: [
        { label: 'Quick Response', desc: 'When your manager calls your name or gives instructions, respond immediately with an energetic "Ne, algesseumnida!" (네, 알겠습니다!).' },
        { label: 'Sense of Urgency', desc: 'Tasks should be done quickly without unnecessary delays. Asking for clarification is welcomed over working slowly in confusion.' },
        { label: 'Efficiency Over Perfection', desc: 'Get things moving fast, then iterate and improve. Sluggish movement is often mistaken for laziness.' }
      ],
      proTip: 'In manufacturing and agriculture, pacing yourself safely while maintaining high alertness earns tremendous trust from the factory owner.'
    },
    {
      id: 'kr-festivals',
      cat: 'TRADITIONS' as CultureCategory,
      title: 'Chuseok, Seollal & Jjimjilbang',
      sub: 'छुसक, सल्लाल र जिमजिल्बाङ परम्परा',
      icon: Heart,
      badge: 'Holidays & Saunas',
      color: 'border-cyan-200 bg-cyan-50/40 text-cyan-900',
      summary: 'Major holidays unite the nation, while communal bathhouses (Jjimjilbang) are beloved weekend retreats.',
      points: [
        { label: 'Chuseok (추석 - Thanksgiving)', desc: 'Mid-autumn harvest holiday. Families gather to make Songpyeon half-moon rice cakes and honor ancestors (Charye).' },
        { label: 'Seollal (설날 - Lunar New Year)', desc: 'Koreans eat Tteokguk (sliced rice cake soup) to gain a year of wisdom and good fortune.' },
        { label: 'Jjimjilbang (찜질방 Sauna)', desc: '24-hour saunas where guests soak in hot pools, relax in clay kilns, sleep on heated Ondol floors, and eat roasted eggs with sweet Sikhye drink.' }
      ],
      proTip: 'Learn to fold the towel into the iconic "Yangmeori" (양머리 sheep-head hat) when relaxing in the Jjimjilbang kiln rooms!'
    },
    {
      id: 'kr-nepali-tips',
      cat: 'NEPALI_TIPS' as CultureCategory,
      title: 'Nepali EPS Worker Adaptation Tips',
      sub: 'कोरियामा नेपाली ईपीएस कामदारका लागि विशेष सुझाव',
      icon: Sparkles,
      badge: 'Nepali EPS Guide',
      color: 'border-purple-200 bg-purple-50/40 text-purple-900',
      summary: 'Essential survival guidance for Nepali brothers and sisters on E-9 visas in factories and farms.',
      points: [
        { label: 'Dietary Boundaries (Pork & Beef)', desc: 'If you do not eat pork or beef, explain politely: "Jeoneun dweji-gogi/soe-gogi mot meogeoyo" (저는 돼지고기/소고기 못 먹어요). Koreans understand and will arrange chicken or seafood.' },
        { label: 'Jongnyangje Garbage Bags (종량제)', desc: 'You MUST use designated municipal pay-per-bag trash bags from convenience stores. Separate food waste (음식물) completely from dry garbage.' },
        { label: 'Greeting the Sajangnim', desc: 'A cheerful morning greeting ("Sajangnim, annyeonghaseyo!") with a bow can completely transform your work environment and relationship with the factory boss.' }
      ],
      proTip: 'Use your day off on Sunday to visit regional Nepal migrant centers (Seoul Dongdaemun / Suwon / Gimpo) for familiar food, advice, and brotherhood.'
    }
  ];

  const currentCultureModules = isJapan ? japanCultureModules : koreaCultureModules;

  const filteredCultureModules = cultureCategory === 'ALL' 
    ? currentCultureModules 
    : currentCultureModules.filter(m => m.cat === cultureCategory);

  // Interactive Quiz Questions
  const cultureQuiz = isJapan ? [
    {
      q: 'When eating ramen or soba noodles in Japan, what is the customary rule?',
      options: [
        'Slurping is rude and forbidden',
        'Slurping is polite, welcomed, and aerates the broth flavor',
        'You must cut noodles with chopsticks before eating',
        'You must ask the chef for permission'
      ],
      correct: 1,
      explanation: 'Slurping noodles (Soba and Ramen) is culturally encouraged in Japan! It cools the hot noodles and enhances the broth aroma.'
    },
    {
      q: 'What is "Hashi-watashi" (passing food chopstick-to-chopstick) in Japan?',
      options: [
        'A warm friendly gesture between friends',
        'A strict taboo because it resembles crematorium funeral bone rituals',
        'A formal wedding tradition',
        'A cooking technique'
      ],
      correct: 1,
      explanation: 'Hashi-watashi is a strict taboo. Only during Japanese Buddhist crematorium ceremonies are bone fragments passed from chopstick to chopstick.'
    },
    {
      q: 'How should you handle tipping at Japanese restaurants and taxis?',
      options: [
        'Always tip 15% to 20%',
        'Leave extra coins on the table',
        'Never tip; service is included and staff will chase you to return forgotten money',
        'Tip only in luxury hotels'
      ],
      correct: 2,
      explanation: 'Japan has no tipping culture. Leaving extra coins causes confusion, and waiters will literally run outside to return your forgotten change!'
    }
  ] : [
    {
      q: 'When handing money, a drink, or documents to an elder or boss in Korea, how should you do it?',
      options: [
        'Quickly with your left hand',
        'With both hands, or with right hand supported under the forearm',
        'Throw it on the table politely',
        'With your right hand only while keeping left hand in your pocket'
      ],
      correct: 1,
      explanation: 'The two-hand rule (두 손 예절) is fundamental in Korea. Always give and receive items with both hands to show respect.'
    },
    {
      q: 'At a company dinner (Hoesik) in Korea, what should you do when drinking in front of a senior or boss?',
      options: [
        'Look them straight in the eye and gulp',
        'Turn your head and upper body slightly away and shield your glass',
        'Pour the drink back into the bottle',
        'Finish the drink before the boss starts'
      ],
      correct: 1,
      explanation: 'Turning your head away and shielding your glass when sipping is a classic mark of respect toward seniors and elders in Korea.'
    },
    {
      q: 'Why do Koreans frequently ask "How old are you?" (몇 살이에요?) upon first meeting?',
      options: [
        'They want to judge your personal life',
        'To establish correct honorifics (Jondaenmal vs Banmal) and relational titles',
        'It is a legal requirement',
        'To calculate your salary'
      ],
      correct: 1,
      explanation: 'Korean language grammar is built on relational hierarchy. Knowing age lets people address each other with the exact correct level of respect.'
    }
  ];

  const handleQuizOption = (qIdx: number, optIdx: number) => {
    setQuizAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
    const isCorrect = optIdx === cultureQuiz[qIdx].correct;
    setQuizFeedback(prev => ({ ...prev, [qIdx]: isCorrect }));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-24 font-sans">
      <main className="max-w-5xl mx-auto px-4 py-6 space-y-6">

        {/* Top Breadcrumb */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <Link
            href={`/${country}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-xl px-3 py-2 shadow-xs transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-emerald-600" />
            <span>Back to {cName} Hub</span>
          </Link>
          <span className="px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-800 text-xs font-black uppercase">
            Guide for Residents &amp; Living There
          </span>
        </div>

        {/* Hero Section */}
        <section className={`rounded-3xl p-6 sm:p-8 shadow-xs border text-white space-y-3 ${
          isJapan 
            ? 'bg-gradient-to-r from-red-700 via-rose-800 to-indigo-950 border-red-500/30' 
            : 'bg-gradient-to-r from-blue-700 via-indigo-800 to-slate-950 border-blue-500/30'
        }`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black tracking-wider uppercase">
            <span>{flag} Life &amp; Culture in {cName} · दैनिक जीवन र संस्कृति निर्देशिका</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black leading-tight">
            Life &amp; Culture in {cName}: Complete Resident Guide
          </h1>
          <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-medium max-w-3xl">
            Master everything for living smoothly in {cName} — from municipal address registration, housing deposits, and legal rights to deep cultural etiquette, dining manners, workplace codes, and emergency helplines.
          </p>
        </section>

        {/* 6 Clean Navigation Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 bg-white p-2 rounded-2xl border border-slate-200 shadow-xs">
          <button
            onClick={() => setActiveTab('SETUP')}
            className={`py-3 px-2 rounded-xl text-xs font-extrabold flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'SETUP'
                ? isJapan ? 'bg-red-600 text-white shadow-xs' : 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Building className="w-4 h-4" />
            <span>1. City Office</span>
          </button>

          <button
            onClick={() => setActiveTab('HOUSING')}
            className={`py-3 px-2 rounded-xl text-xs font-extrabold flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'HOUSING'
                ? isJapan ? 'bg-red-600 text-white shadow-xs' : 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <HomeIcon className="w-4 h-4" />
            <span>2. Housing &amp; Rent</span>
          </button>

          {/* NEW CULTURE TAB */}
          <button
            onClick={() => setActiveTab('CULTURE')}
            className={`py-3 px-2 rounded-xl text-xs font-extrabold flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'CULTURE'
                ? isJapan ? 'bg-red-600 text-white shadow-xs' : 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span className="flex items-center gap-1">
              3. Culture &amp; Etiquette
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            </span>
          </button>

          <button
            onClick={() => setActiveTab('VISA_RENEWAL')}
            className={`py-3 px-2 rounded-xl text-xs font-extrabold flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'VISA_RENEWAL'
                ? isJapan ? 'bg-red-600 text-white shadow-xs' : 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <FileCheck className="w-4 h-4" />
            <span>4. Visa &amp; PR</span>
          </button>

          <button
            onClick={() => setActiveTab('RIGHTS')}
            className={`py-3 px-2 rounded-xl text-xs font-extrabold flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'RIGHTS'
                ? isJapan ? 'bg-red-600 text-white shadow-xs' : 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>5. Labor Rights</span>
          </button>

          <button
            onClick={() => setActiveTab('EMERGENCY')}
            className={`py-3 px-2 rounded-xl text-xs font-extrabold flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'EMERGENCY'
                ? isJapan ? 'bg-red-600 text-white shadow-xs' : 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Phone className="w-4 h-4" />
            <span>6. Helplines</span>
          </button>
        </div>

        {/* TAB 1: CITY OFFICE & INITIAL SETUP */}
        {activeTab === 'SETUP' && (
          <div className="space-y-4 animate-fade-in">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Building className="w-5 h-5 text-indigo-600" />
                <span>First 14 Days Checklist: Municipal City Office Registration (जिल्ला कार्यालय दर्ता)</span>
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isJapan 
                  ? 'Within 14 days of arriving or moving to a new apartment in Japan, you must visit your local City or Ward Office (区役所 / 市役所 Kuyakusho / Shiyakusho) to complete address registration.'
                  : 'Within 90 days of arriving in South Korea, you must register at the local Immigration Office (출입국관리사무소) to apply for your Alien Registration Card (ARC) and register address at community center (주민센터).'
                }
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <h3 className="font-bold text-slate-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>1. Residence Card &amp; Address Seal</span>
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-[11px]">
                    {isJapan 
                      ? 'Submit your Juminhyo (住民票) moving-in notice. The city officer prints your permanent address on the back of your Residence Card (在留カード Zairyu Card).'
                      : 'Bring your passport, rental lease agreement, and school/work documents to register your residential address.'
                    }
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <h3 className="font-bold text-slate-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>2. National Health Insurance (NHI)</span>
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-[11px]">
                    {isJapan 
                      ? 'Enroll in Kokumin Kenko Hoken (国民健康保険). You receive your insurance card on the same day. Foreign students receive low-income premium discounts (~¥1,500/mo).'
                      : 'Enroll in National Health Insurance (국민건강보험 NHIS). Covers clinic visits, dental, and emergency hospitalization at 70%.'
                    }
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <h3 className="font-bold text-slate-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>3. Identification Card Setup</span>
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-[11px]">
                    {isJapan 
                      ? 'Apply for the My Number Card (マイナンバーカード). Essential for tax certificates, convenience store official printing, and part-time salary registration.'
                      : 'Obtain your Alien Registration Card (외국인등록증 ARC). It serves as your primary Korean photo ID for SIM cards, online shopping, and banking.'
                    }
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <h3 className="font-bold text-slate-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>4. Opening Bank Account &amp; SIM Card</span>
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-[11px]">
                    {isJapan 
                      ? 'Newcomers can immediately open an account with Japan Post Bank (ゆうちょ銀行 Yucho Bank) with passport and Zairyu card. Major banks require 6 months residence.'
                      : 'Open bank accounts at Hana Bank, Shinhan, or Woori with your passport and ARC for wage direct deposit and online banking (KakaoBank).'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: HOUSING & MONTHLY LIVING COSTS */}
        {activeTab === 'HOUSING' && (
          <div className="space-y-4 animate-fade-in">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Wallet className="w-5 h-5 text-emerald-600" />
                <span>Monthly Budget &amp; Apartment Renting Guide (कोठा र खर्च)</span>
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Realistic breakdown of monthly expenditures and housing rules for students and workers living in {cName}.
              </p>

              <div className="space-y-2 pt-1">
                {costs.map((c, i) => (
                  <div key={i} className="p-3.5 bg-slate-50 rounded-2xl flex items-center justify-between gap-4 border border-slate-100">
                    <div>
                      <p className="font-bold text-xs text-slate-900">{c.category}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">{c.note}</p>
                    </div>
                    <span className="text-xs font-black text-indigo-900 whitespace-nowrap bg-indigo-50 px-2.5 py-1 rounded-xl border border-indigo-100">
                      {c.amount}
                    </span>
                  </div>
                ))}
              </div>

              {/* Housing Tips Card */}
              <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 space-y-2 text-xs">
                <h3 className="font-bold text-amber-950 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>{isJapan ? 'Japan Renting Terms (Shikikin / Reikin)' : 'Korea Housing Terms (Jeonse / Wolse)'}</span>
                </h3>
                <p className="text-amber-900 leading-relaxed text-[11px]">
                  {isJapan 
                    ? 'When renting an apartment in Japan, be aware of Shikikin (敷金 - refundable deposit), Reikin (礼金 - non-refundable gift money to landlord, usually 1 month), and Guarantor company fee (保証会社). Look for "Zero-Reikin" apartments to save initial move-in costs.'
                    : 'Korea uses two major rent systems: Wolse (월세 - monthly rent with small deposit ₩3M–₩10M) and Jeonse (전세 - large lump-sum deposit ₩50M+ returned at lease end). Students usually start in Goshiwon (고시원) with zero deposit and free utilities.'
                  }
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CULTURE & ETIQUETTE (BRAND NEW DEEP CULTURE HUB) */}
        {activeTab === 'CULTURE' && (
          <div className="space-y-6 animate-fade-in">
            {/* Culture Overview Card */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
                    <Sparkles className={`w-5 h-5 ${isJapan ? 'text-red-600' : 'text-blue-600'}`} />
                    <span>{cName} Culture, Customs &amp; Etiquette Guide ({isJapan ? 'जापानको संस्कृति र शिष्टाचार' : 'दक्षिण कोरियाको संस्कृति र शिष्टाचार'})</span>
                  </h2>
                  <p className="text-xs text-slate-600 mt-1">
                    Understand core cultural codes to build respect, avoid accidental offense, and thrive in {cName}.
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase self-start sm:self-auto ${
                  isJapan ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-blue-50 text-blue-700 border border-blue-200'
                }`}>
                  Cultural Immersion
                </span>
              </div>

              {/* Culture Sub-categories Filter */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {[
                  { id: 'ALL', label: 'All Topics' },
                  { id: 'ETIQUETTE', label: 'Manners & Greetings' },
                  { id: 'DINING', label: 'Dining & Table' },
                  { id: 'WORKPLACE', label: 'Company & Factory' },
                  { id: 'TRADITIONS', label: 'Festivals & Bath' },
                  { id: 'NEPALI_TIPS', label: 'Nepali Immigrant Tips' },
                ].map(filter => (
                  <button
                    key={filter.id}
                    onClick={() => setCultureCategory(filter.id as CultureCategory)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      cultureCategory === filter.id
                        ? isJapan ? 'bg-red-600 text-white shadow-xs' : 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>

              {/* Cultural Modules Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {filteredCultureModules.map((item) => {
                  const IconComp = item.icon;
                  return (
                    <div key={item.id} className={`rounded-2xl border p-5 space-y-3.5 ${item.color} transition-all hover:shadow-xs`}>
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <div className="p-2 rounded-xl bg-white shadow-xs">
                            <IconComp className="w-5 h-5 text-slate-800" />
                          </div>
                          <div>
                            <h3 className="font-black text-sm text-slate-950">{item.title}</h3>
                            <p className="text-[11px] font-semibold text-slate-700 font-ne">{item.sub}</p>
                          </div>
                        </div>
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-white/80 border border-black/10 text-slate-800 shrink-0">
                          {item.badge}
                        </span>
                      </div>

                      <p className="text-xs text-slate-800 leading-relaxed font-medium">
                        {item.summary}
                      </p>

                      <div className="space-y-2 bg-white/70 rounded-xl p-3 border border-black/5">
                        {item.points.map((pt, idx) => (
                          <div key={idx} className="text-xs">
                            <span className="font-extrabold text-slate-900">{pt.label}: </span>
                            <span className="text-slate-700">{pt.desc}</span>
                          </div>
                        ))}
                      </div>

                      <div className="text-[11px] bg-white/90 rounded-xl p-2.5 border border-black/5 flex items-start gap-1.5 text-slate-900">
                        <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="font-extrabold text-amber-900">Golden Rule: </strong>
                          <span>{item.proTip}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Interactive Cultural Knowledge Check (Quiz) */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2">
                <Award className={`w-5 h-5 ${isJapan ? 'text-red-600' : 'text-blue-600'}`} />
                <h3 className="text-base sm:text-lg font-black text-slate-900">
                  Cultural Quick Quiz: Test Your {cName} Knowledge
                </h3>
              </div>
              <p className="text-xs text-slate-600">
                Check your understanding of real-life cultural situations before arriving in {cName}.
              </p>

              <div className="space-y-4 pt-2">
                {cultureQuiz.map((quiz, qIdx) => {
                  const hasAnswered = quizAnswers[qIdx] !== undefined;
                  const isCorrect = quizFeedback[qIdx];

                  return (
                    <div key={qIdx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                      <p className="text-xs font-black text-slate-900 flex items-start gap-2">
                        <span className="px-2 py-0.5 rounded-full bg-slate-200 text-slate-800 text-[10px] font-bold">
                          Q{qIdx + 1}
                        </span>
                        <span>{quiz.q}</span>
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {quiz.options.map((opt, optIdx) => {
                          const isSelected = quizAnswers[qIdx] === optIdx;
                          let btnStyle = 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100';

                          if (hasAnswered) {
                            if (optIdx === quiz.correct) {
                              btnStyle = 'bg-emerald-100 border-emerald-300 text-emerald-950 font-bold';
                            } else if (isSelected && !isCorrect) {
                              btnStyle = 'bg-rose-100 border-rose-300 text-rose-950';
                            }
                          }

                          return (
                            <button
                              key={optIdx}
                              onClick={() => handleQuizOption(qIdx, optIdx)}
                              className={`p-3 rounded-xl border text-left flex items-center justify-between gap-2 text-xs transition-colors cursor-pointer ${btnStyle}`}
                            >
                              <span>{opt}</span>
                              {hasAnswered && optIdx === quiz.correct && (
                                <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                              )}
                              {hasAnswered && isSelected && !isCorrect && (
                                <X className="w-4 h-4 text-rose-700 shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {hasAnswered && (
                        <div className={`p-3 rounded-xl text-xs flex items-start gap-2 ${
                          isCorrect ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' : 'bg-amber-50 text-amber-900 border border-amber-200'
                        }`}>
                          <HelpCircle className="w-4 h-4 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-extrabold">{isCorrect ? 'Correct! ' : 'Explanation: '}</span>
                            <span>{quiz.explanation}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: VISA RENEWAL, STATUS CHANGE & PR */}
        {activeTab === 'VISA_RENEWAL' && (
          <div className="space-y-4 animate-fade-in">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-indigo-600" />
                <span>Visa Renewal, Status Change &amp; PR Pathways (भिसा नवीकरण र पीआर)</span>
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Step-by-step guidance for renewing your stay, transitioning from Student to Work visa, and qualifying for Permanent Residency (PR).
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-1">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <h3 className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-indigo-600" />
                    <span>When to Apply for Renewal (नवीकरण कहिले गर्ने?)</span>
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-[11px]">
                    Applications for extension of period of stay can be filed starting <strong>3 months prior</strong> to your visa expiration date at Regional Immigration Bureau. Never let your visa expire!
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <h3 className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-indigo-600" />
                    <span>{isJapan ? 'Student to SSW / Engineer Visa' : 'E-9 to E-7-4 Skilled Worker'}</span>
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-[11px]">
                    {isJapan 
                      ? 'Graduating students can transition to SSW-1 (Specified Skilled Worker) with technical exam pass + N4/JFT, or to "Engineer/Specialist in Humanities" visa with a university degree and company job contract.'
                      : 'Diligent E-9 workers with 4+ years residence can convert to E-7-4 point-based skilled worker visa with Korean language proficiency (TOPIK 3+ or KIIP level 3), enabling family accompaniment.'
                    }
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <h3 className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-indigo-600" />
                    <span>Dependent Family Invitation (परिवार बोलाउने)</span>
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-[11px]">
                    {isJapan 
                      ? 'Work visa holders and SSW-2 workers can invite spouse and children on Dependent Visa (家族滞在 Kazoku Taizai). Requires tax certificate (納税証明書) proving sufficient income.'
                      : 'E-7, D-2 advanced, and long-term professional visa holders can sponsor family under F-3 Dependent Visa.'
                    }
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <h3 className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-indigo-600" />
                    <span>Permanent Residence (PR 永住権 / 영주권)</span>
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-[11px]">
                    {isJapan 
                      ? 'General requirement is 10 consecutive years of residence (including 5 years on a work visa). Highly Skilled Professionals (HSP) can apply in just 1 to 3 years with 70–80 points.'
                      : 'F-5 Permanent Residency requires passing KIIP (사회통합프로그램) Level 5, continuous residence, and meeting GNI per capita income threshold.'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: LABOR RIGHTS & 28-HOUR RULE */}
        {activeTab === 'RIGHTS' && (
          <div className="space-y-4 animate-fade-in">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Scale className="w-5 h-5 text-amber-600" />
                <span>Labor Rights, Minimum Wage &amp; Part-Time Rules (कामदारको अधिकार र नियम)</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-red-50 border border-red-200 space-y-2">
                  <h3 className="font-bold text-red-950 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-red-600" />
                    <span>Strict Part-Time Limits (हप्तामा २८ घण्टा नियम)</span>
                  </h3>
                  <p className="text-red-900 leading-relaxed text-[11px]">
                    {isJapan 
                      ? 'Student visa holders are strictly capped at 28 hours per week across ALL part-time jobs combined. Working even 29 hours can result in visa renewal rejection and deportation. During official school vacations (summer/winter), up to 40 hours/week (8h/day) is permitted.'
                      : 'D-2 students are limited to 20–25 hours/week during term time. E-9 workers must only work at their registered designated employer site.'
                    }
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <h3 className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Scale className="w-4 h-4 text-emerald-600" />
                    <span>Minimum Wage Protection (न्यूनतम ज्याला अधिकार)</span>
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-[11px]">
                    {isJapan 
                      ? 'All employers must pay at least the statutory prefectural minimum wage (e.g. Tokyo ¥1,163/hr, Kanagawa ¥1,162/hr, Osaka ¥1,114/hr). Paying less is illegal.'
                      : 'Korea enforces a nationwide statutory minimum wage of approx ₩9,860/hr, with guaranteed holiday pay and severance pay for 1+ year service.'
                    }
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <h3 className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Scale className="w-4 h-4 text-indigo-600" />
                    <span>Overtime &amp; Night Allowance (ओभरटाइम थप रकम)</span>
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-[11px]">
                    Work exceeding 8 hours/day or 40 hours/week must be paid at 125% regular wage. Night shifts (10:00 PM – 5:00 AM) must receive an additional 25% night shift premium.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <h3 className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Scale className="w-4 h-4 text-purple-600" />
                    <span>Unpaid Wages &amp; Harassment Recourse</span>
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-[11px]">
                    {isJapan 
                      ? 'If your employer withholds salary or abuses rights, report to the Labor Standards Inspection Office (労働基準監督署 Rouki). They investigate anonymously and compel payment.'
                      : 'Report unpaid wages to the Ministry of Employment and Labor (고용노동부 MOEL) or EPS counseling center for foreign workers.'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: EMERGENCY HELPLINES & EMBASSY */}
        {activeTab === 'EMERGENCY' && (
          <div className="space-y-4 animate-fade-in">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2 text-red-600">
                <Phone className="w-5 h-5" />
                <span>Emergency Helplines &amp; Embassy Contacts (आपतकालीन सम्पर्क)</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-red-50 border border-red-200 space-y-2">
                  <p className="font-bold text-red-950">Police Emergency (प्रहरी)</p>
                  <p className="text-2xl font-black text-red-700">{isJapan ? '110' : '112'}</p>
                  <p className="text-[11px] text-red-800">Traffic accidents, theft, crime report, lost wallet/card</p>
                </div>

                <div className="p-4 rounded-2xl bg-red-50 border border-red-200 space-y-2">
                  <p className="font-bold text-red-950">Ambulance &amp; Fire (एम्बुलेन्स तथा दमकल)</p>
                  <p className="text-2xl font-black text-red-700">119</p>
                  <p className="text-[11px] text-red-800">Sudden illness, severe injury, fire accident (Available 24/7)</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <p className="font-bold text-slate-900">Embassy of Nepal ({isJapan ? 'Tokyo' : 'Seoul'})</p>
                  <p className="text-xs font-bold text-indigo-700">
                    {isJapan ? '📍 Meguro-ku, Tokyo · Tel: 03-3713-6240' : '📍 Seongbuk-gu, Seoul · Tel: 02-3789-9770'}
                  </p>
                  <p className="text-[11px] text-slate-600">Passport renewal, consular verification, emergency repatriation assistance</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <p className="font-bold text-slate-900">{isJapan ? 'Japan Health & Medical Hotline' : 'Korea 1345 Immigration Hotline'}</p>
                  <p className="text-xs font-bold text-emerald-700">
                    {isJapan ? 'Tokyo Multilingual Medical Guide: 03-5285-8181' : '1345 Contact Center (Nepali service available)'}
                  </p>
                  <p className="text-[11px] text-slate-600">Finding foreign-friendly doctors and official visa advice in Nepali &amp; English</p>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
