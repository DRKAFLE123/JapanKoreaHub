export interface GuideContent {
  id: string;
  title: string;
  category: 'LANGUAGE' | 'VISA' | 'SUPPORT' | 'LEGAL';
  badge: string;
  emoji: string;
  subtitle: string;
  sections: {
    heading: string;
    text: string;
    bullets?: string[];
    callout?: string;
  }[];
  ctaText?: string;
  ctaAction?: 'JAPANESE' | 'KOREAN' | 'MOCK' | 'CLOSE';
}

export const GUIDE_CATALOG: GuideContent[] = [
  // ── LANGUAGE RESOURCES ──────────────────────────────────
  {
    id: 'minna-75',
    title: 'Minna no Nihongo (1–75) Complete Handbook',
    category: 'LANGUAGE',
    badge: 'Lessons 1–75',
    emoji: '📚',
    subtitle: 'Comprehensive grammar, vocabulary, sentence patterns, and audio tracks for Minna no Nihongo Shokyu & Chukyu.',
    sections: [
      {
        heading: 'Curriculum Structure (Lessons 1 to 75)',
        text: 'Minna no Nihongo is the gold standard for Japanese language education worldwide. Our digital handbook breaks down all 75 lessons into structured modules with vocabulary notes, grammar guides, and native audio tracks.',
        bullets: [
          'Lessons 1–25: JLPT N5 Foundation (Basic greetings, particles は/が/を/に, verb conjugations -masu form, time & numbers)',
          'Lessons 26–50: JLPT N4 Intermediate (Te-form, Short forms, Passive/Causative, Conditional ~tara/~ba, Keigo basics)',
          'Lessons 51–75: JLPT N3 Advanced (Complex honorifics Sonkeigo & Kenjougo, essay reading, business dialogue)'
        ]
      },
      {
        heading: '4-Column Short Note Methodology',
        text: 'Each lesson features a 4-column vocabulary sheet designed for maximum memory retention with blank Kanji options for writing practice:',
        bullets: [
          'Column 1: Japanese Script (Kanji & Kana)',
          'Column 2: Reading / Romaji (Furigana annotation)',
          'Column 3: English Translation & Context',
          'Column 4: Nepali (नेपाली) Meaning for South Asian learners'
        ]
      }
    ],
    ctaText: 'Explore Minna no Nihongo Lessons',
    ctaAction: 'JAPANESE'
  },
  {
    id: 'jlpt-syllabus',
    title: 'Official JLPT N5–N1 Examination Syllabus',
    category: 'LANGUAGE',
    badge: 'JLPT N5 → N1',
    emoji: '🎗',
    subtitle: 'Comprehensive benchmark standards, vocabulary counts, Kanji limits, and scoring criteria for all 5 JLPT levels.',
    sections: [
      {
        heading: 'JLPT Level Matrix Overview',
        text: 'The Japanese-Language Proficiency Test (JLPT) evaluates Japanese language competence for non-native speakers across 5 official levels.',
        bullets: [
          'JLPT N5 (Basic): 100 Kanji • 800 Vocabulary words • 80 Hours study. Passing mark: 80/180 points.',
          'JLPT N4 (Elementary): 300 Kanji • 1,500 Vocabulary words • 150 Hours study. Passing mark: 90/180 points (Required for SSW 1).',
          'JLPT N3 (Intermediate): 650 Kanji • 3,750 Vocabulary words • 300 Hours study. Passing mark: 95/180 points.',
          'JLPT N2 (Pre-Advanced): 1,000 Kanji • 6,000 Vocabulary words • 600 Hours study. Passing mark: 90/180 points (Required for Japanese corporate employment).',
          'JLPT N1 (Advanced): 2,000 Kanji • 10,000 Vocabulary words • 900+ Hours study. Passing mark: 100/180 points.'
        ]
      },
      {
        heading: 'Official Exam Booklet Structure',
        text: 'The JLPT exam consists of 2 separate paper sections administered under strict time limits:',
        bullets: [
          'Paper 1: Language Knowledge (Vocabulary, Grammar & Reading Comprehension)',
          'Paper 2: Listening Comprehension (Audio CD tracks with multiple choice options)'
        ]
      }
    ],
    ctaText: 'Launch JLPT Exam Engine',
    ctaAction: 'MOCK'
  },
  {
    id: 'kana-kanji',
    title: 'Kana & Kanji Radical Inspector',
    category: 'LANGUAGE',
    badge: '214 Radicals',
    emoji: '🧩',
    subtitle: 'Interactive Hiragana (46), Katakana (46), 214 Kanji Radicals, and mnemonic SRS decomposition.',
    sections: [
      {
        heading: 'Mastering the Foundations of Japanese Script',
        text: 'Japanese uses three writing systems simultaneously. LanguageGuru provides visual mnemonics and audio guides for all characters.',
        bullets: [
          'Hiragana (46 Kana): Used for native Japanese words, grammatical particles, and verb inflections.',
          'Katakana (46 Kana): Used for loanwords, foreign names, technical jargon, and emphasis.',
          'Kanji & 214 Radicals: Chinese logographic characters built from core semantic radicals (e.g. 氵 Water, 木 Tree, 人 Person).'
        ]
      },
      {
        heading: 'Mnemonic SRS Inspection Engine',
        text: 'Click any Kanji in our platform to inspect stroke order diagrams, Onyomi (Chinese) readings, Kunyomi (Japanese) readings, visual stroke animations, and radical components.',
        callout: 'Pro Tip: Learning the 214 core radicals reduces Kanji memorization time by over 60%.'
      }
    ],
    ctaText: 'Open Japanese Radical Breakdown',
    ctaAction: 'JAPANESE'
  },
  {
    id: 'eps-60',
    title: 'EPS-TOPIK (Lessons 1–60) Standard Curriculum',
    category: 'LANGUAGE',
    badge: 'EPS 60 Lessons',
    emoji: '🇰🇷',
    subtitle: 'Official HRD Korea standard textbook curriculum for E-9 Government Employment Permit System.',
    sections: [
      {
        heading: 'EPS-TOPIK Curriculum Overview',
        text: 'The Employment Permit System Test of Proficiency in Korean (EPS-TOPIK) is the mandatory exam for workers seeking employment in Korea under the E-9 visa.',
        bullets: [
          'Lessons 1–30 (Basic Korean): Hangul alphabet, greetings, daily routine, numbers, shopping, transport & public places.',
          'Lessons 31–60 (Workplace & Industrial Korean): Factory safety, agricultural tools, construction vocabulary, labor contracts, health insurance & employment regulations.'
        ]
      },
      {
        heading: 'Bilingual Nepali & English Explanations',
        text: 'LanguageGuru provides complete translations for all 60 lessons in both Nepali (नेपाली) and English, ensuring complete conceptual clarity for South Asian candidates.'
      }
    ],
    ctaText: 'Launch Korean EPS-TOPIK Platform',
    ctaAction: 'KOREAN'
  },
  {
    id: 'hangul-audio',
    title: 'Hangul Consonants, Vowels & Audio Matrix',
    category: 'LANGUAGE',
    badge: 'Audio Matrix',
    emoji: '🎧',
    subtitle: 'Interactive audio matrix for 14 basic consonants, 10 basic vowels, 5 double consonants, 11 compound vowels & Batchim rules.',
    sections: [
      {
        heading: 'Structure of the Korean Alphabet (한글)',
        text: 'Created by King Sejong the Great in 1443, Hangul is one of the most scientifically designed alphabets in the world.',
        bullets: [
          '14 Basic Consonants: ㄱ (g/k), ㄴ (n), ㄷ (d/t), ㄹ (r/l), ㅁ (m), ㅂ (b/p), ㅅ (s), ㅇ (ng), ㅈ (j), ㅊ (ch), ㅋ (k), ㅌ (t), ㅍ (p), ㅎ (h).',
          '10 Basic Vowels: ㅏ (a), ㅑ (ya), ㅓ (eo), ㅕ (yeo), ㅗ (o), 요 (yo), ㅜ (u), ㅠ (yu), ㅡ (eu), ㅣ (i).',
          '5 Double Consonants: ㄲ (kk), ㄸ (tt), ㅃ (pp), ㅆ (ss), ㅉ (jj).',
          '11 Compound Vowels: ㅐ (ae), ㅒ (yae), ㅔ (e), ㅖ (ye), ㅘ (wa), ㅙ (wae), ㅚ (oe), ㅝ (wo), ㅞ (we), ㅟ (wi), ㅢ (ui).'
        ]
      },
      {
        heading: 'Batchim (받침) Final Consonant Rules',
        text: 'Understand how consonants change their pronunciation when placed in the bottom (Batchim) position of a syllable block.',
        callout: 'Example: 핟 (hat), 학 (hak), 한 (han) — audio samples provided for every sound combination.'
      }
    ],
    ctaText: 'Open Hangul Audio Matrix',
    ctaAction: 'KOREAN'
  },

  // ── VISA BLUEPRINTS ─────────────────────────────────────
  {
    id: 'ssw-visa',
    title: 'Specified Skilled Worker (SSW 1 & 2) Visa Blueprint',
    category: 'VISA',
    badge: 'SSW 1 & 2',
    emoji: '💼',
    subtitle: 'Complete roadmap for Japanese Prometric sector skill exams, salary scales, requirements, and permanent residency.',
    sections: [
      {
        heading: 'What is the SSW (Tokutei Ginou) Visa?',
        text: 'The Specified Skilled Worker visa status allows foreign nationals to work in Japan across designated industrial sectors with full equal pay matching Japanese citizens.',
        bullets: [
          'SSW Type 1 (5-Year Visa): Covers 14 sectors including Nursing Care, Food Service, Agriculture, Building Cleaning, Construction, Shipbuilding, and Automobile Maintenance.',
          'SSW Type 2 (Indefinite Renewal): Allows bringing family members (spouse & children) to Japan and provides a pathway to Permanent Residency (PR).'
        ]
      },
      {
        heading: 'Eligibility & Exam Requirements',
        text: 'To obtain SSW 1 status, candidates must pass two official examinations:',
        bullets: [
          '1. Japanese Language Proficiency: JLPT N4 (or higher) OR JFT-Basic CBT Exam (Score 200/250).',
          '2. Prometric Sector Skill Test: Specialized computer-based exam for your chosen sector (e.g. Nursing Care Skill Evaluation Test).'
        ]
      },
      {
        heading: 'Salary & Employment Conditions',
        text: 'SSW workers receive standard Japanese employment contracts with starting salaries ranging from 180,000 JPY to 260,000 JPY per month, plus overtime pay and health insurance.'
      }
    ],
    ctaText: 'Start JFT & JLPT Exam Simulation',
    ctaAction: 'MOCK'
  },
  {
    id: 'japan-student',
    title: 'Japan Student Visa & PR Pathway Guide',
    category: 'VISA',
    badge: 'Student → PR',
    emoji: '🎓',
    subtitle: 'Language school admission guide, COE application, 28 hrs/week work permit, and 10-year PR points calculator.',
    sections: [
      {
        heading: 'Student Visa Roadmap to Employment',
        text: 'Studying at a Japanese language school (Nihongo Gakko) or university provides an ideal pathway to transition to a Japanese work visa (Engineering/Humanities/International Services).',
        bullets: [
          'Step 1: Complete JLPT N5 (or 150 hours of Japanese study certificate).',
          'Step 2: Obtain Certificate of Eligibility (COE) from Japanese Immigration.',
          'Step 3: Secure 28 Hours/Week Part-Time Work Permit (Shikakugai Kactivity Permit) at airport entry.',
          'Step 4: Graduate and convert to a full-time Humanities/Engineering Work Visa.'
        ]
      },
      {
        heading: 'Permanent Residency (PR) Eligibility',
        text: 'Japan allows foreign workers to apply for Permanent Residency after 10 years of continuous residence (with 5 years on a valid work visa), or in just 1–3 years via the Highly Skilled Professional (HSP) points system.'
      }
    ],
    ctaText: 'Explore Japanese Curriculum',
    ctaAction: 'JAPANESE'
  },
  {
    id: 'korea-eps-e9',
    title: 'Korea EPS E-9 Government Work Permit Guide',
    category: 'VISA',
    badge: 'E-9 Visa',
    emoji: '🏭',
    subtitle: 'HRD Korea government employment permit system, roster registration, contract signing, and E-7-4 conversion.',
    sections: [
      {
        heading: 'Overview of the EPS E-9 Visa',
        text: 'The Employment Permit System (EPS) is a government-to-government (G2G) worker exchange program managed directly by HRD Korea and partner ministries in 16 countries.',
        bullets: [
          'Permitted Sectors: Manufacturing, Agriculture & Livestock, Fishing, Construction, and Service sectors.',
          'Duration of Stay: Initial 3-Year Contract + 1-Year 10-Month Extension (Total 4 Years 10 Months continuous stay without re-entry).'
        ]
      },
      {
        heading: 'Step-by-Step EPS Selection Process',
        text: '1. Pass the official EPS-TOPIK Computer Based Test (CBT).\n2. Pass the Skill Test & Physical Fitness Check.\n3. Submit Job Application Roster to HRD Korea.\n4. Employer Selection & Labor Contract Signing.\n5. Certificate for Confirmation of Visa Issuance (CCVI) & Pre-departure Training.'
      },
      {
        heading: 'E-7-4 Skilled Worker Visa Conversion',
        text: 'After working 4+ years under E-9, workers with good Korean proficiency (TOPIK Level 3+) and employer recommendations can convert to the E-7-4 visa, granting long-term stay and family invitation rights.'
      }
    ],
    ctaText: 'Launch EPS-TOPIK Platform',
    ctaAction: 'KOREAN'
  },
  {
    id: 'prometric-centers',
    title: 'Prometric CBT Skill Exam Booking & Centers Guide',
    category: 'VISA',
    badge: 'Prometric CBT',
    emoji: '🏢',
    subtitle: 'Test center booking instructions for Japan, Nepal, Philippines, Vietnam, Indonesia & Prometric ID registration.',
    sections: [
      {
        heading: 'How to Register for Prometric Exams',
        text: 'Prometric is the official test delivery partner for Japan Foundation JFT-Basic CBT exams and Specified Skilled Worker (SSW) sector skill tests.',
        bullets: [
          'Step 1: Visit Prometric Japan Official Portal and create a Prometric ID.',
          'Step 2: Upload valid International Passport scan for identity verification.',
          'Step 3: Select your exam type (JFT-Basic OR Nursing Care / Food Service / Agriculture Skill Test).',
          'Step 4: Select Exam Country (Nepal, Japan, Philippines, Vietnam, Indonesia, etc.), Test Center Location, and Date.',
          'Step 5: Pay exam fee online via Credit Card / E-Sewa / Voucher.'
        ]
      },
      {
        heading: 'Important Exam Day Checklist',
        text: 'Candidates must present their original valid Passport (matching Prometric ID details) and printed Admission Ticket at the test center 30 minutes prior to exam time.',
        callout: 'Notice: Electronic devices, smartwatches, and study notes are strictly prohibited inside the CBT computer room.'
      }
    ],
    ctaText: 'Practice Prometric CBT Exam',
    ctaAction: 'MOCK'
  },
  {
    id: 'nepali-english-notes',
    title: 'Bilingual Nepali & English Short Note Method',
    category: 'VISA',
    badge: 'Nepali & English',
    emoji: '🇳🇵',
    subtitle: 'Dual-language note sheets with side-by-side Nepali (नेपाली) & English translations and blank Kanji practice mode.',
    sections: [
      {
        heading: 'Why Dual-Language Explanations Matter',
        text: 'Learning complex grammatical concepts like Japanese particles or Korean honorifics is significantly faster when explained in your native language.',
        bullets: [
          'Japanese & Nepali SOV Grammar Similarity: Both Japanese and Nepali follow Subject-Object-Verb (SOV) word order, making grammar transfer intuitive!',
          '4-Column Vocab Sheets: Includes Japanese Script, Furigana Reading, English Meaning, and Nepali (नेपाली) Translation.',
          'Blank Kanji Practice Mode: Hide Kanji readings to self-test spelling and stroke memory.'
        ]
      }
    ],
    ctaText: 'View Japanese Vocabulary Explorer',
    ctaAction: 'JAPANESE'
  },

  // ── SUPPORT & TOOLS ─────────────────────────────────────
  {
    id: 'mock-test-guide',
    title: 'Global Mock Test Center User Guide',
    category: 'SUPPORT',
    badge: 'Exam Simulator',
    emoji: '⏱',
    subtitle: 'User manual for paper-based 2-booklet JLPT exams, 250-mark Prometric JFT-Basic CBT, and EPS-TOPIK 40Q CBT engine.',
    sections: [
      {
        heading: 'Supported Exam Formats',
        text: 'LanguageGuru simulates authentic examination conditions with strict timer enforcement and real-time score grading.',
        bullets: [
          'JLPT N5–N2 Official Paper Format: Section-locked 2-paper structure (Paper 1: Vocab/Grammar/Reading, Paper 2: Audio Listening).',
          'JFT-Basic CBT (250 Marks Scale): 4 Section-locked modules (Script/Vocab 12Q, Conversation 12Q, Listening 12Q, Reading 12Q) with 200/250 pass threshold.',
          'EPS-TOPIK CBT (40 Questions): 20 Reading Questions + 20 Audio Listening Questions (200 Marks Scale).'
        ]
      },
      {
        heading: 'Anti-Cheat & Section Lock Engine',
        text: 'Once a section is submitted, answers are permanently locked to replicate official Prometric CBT test security standards.'
      }
    ],
    ctaText: 'Open Mock Test Center',
    ctaAction: 'MOCK'
  },
  {
    id: 'qr-cert',
    title: 'QR Certificate Verification System',
    category: 'SUPPORT',
    badge: 'QR Signed',
    emoji: '🏅',
    subtitle: 'Cryptographically signed QR certificates of completion for JLPT and EPS-TOPIK curriculum mastery.',
    sections: [
      {
        heading: 'Verifiable Digital Credentials',
        text: 'Upon achieving 80%+ score on level exit exams or completing all lessons in a level, LanguageGuru generates a verifiable Certificate of Achievement.',
        bullets: [
          'Unique Certificate Code: Each certificate receives a unique SHA-256 cryptographic hash (e.g. LG-2026-JLPT-N4-88492).',
          'Scannable QR Code: Employers and visa agencies can scan the QR code to verify student identity, completion date, and test score on our public verification portal.'
        ]
      }
    ],
    ctaText: 'Verify a Certificate',
    ctaAction: 'JAPANESE'
  },
  {
    id: 'streak-guide',
    title: 'Personal Study Dashboard & 365-Day Retention Heatmap',
    category: 'SUPPORT',
    badge: '365 Heatmap',
    emoji: '🔥',
    subtitle: 'Habit tracking algorithm, XP point calculation, flashcard review streak retention, and activity heat levels.',
    sections: [
      {
        heading: 'How the 365-Day Activity Heatmap Works',
        text: 'Building a daily language study habit is key to achieving fluency. Your contribution heatmap visualizes every day you practice.',
        bullets: [
          'Activity Levels (0 to 4): Dark background (no study) → Bright Emerald Glow (intense review session of 50+ cards or full mock test).',
          'Current & Longest Streak: Track consecutive days studied. Missing a day resets current streak unless a streak shield is active.',
          'Total XP Points: Earn 10 XP per lesson completed, 5 XP per flashcard reviewed, and 50 XP per mock test passed.'
        ]
      }
    ],
    ctaText: 'View Personal Dashboard',
    ctaAction: 'CLOSE'
  },
  {
    id: 'srs-guide',
    title: 'SM-2 Spaced Repetition SRS Algorithm Guide',
    category: 'SUPPORT',
    badge: 'SM-2 Algorithm',
    emoji: '🧠',
    subtitle: 'SuperMemo SM-2 algorithm technical breakdown, Easiness Factor (EF) formula, and optimal review intervals.',
    sections: [
      {
        heading: 'The Science of Spaced Repetition',
        text: 'Human memory follows Ebbinghaus\'s Forgetting Curve. Spaced Repetition Systems (SRS) schedule reviews right before you are about to forget a word.',
        bullets: [
          'SuperMemo SM-2 Algorithm: Calculates optimal review intervals based on your response difficulty rating (Again, Hard, Good, Easy).',
          'Interval Progression Formula: First review = 1 day, Second review = 6 days, Subsequent reviews = I(n-1) * EF.',
          'Easiness Factor (EF): Starts at 2.5 and dynamically adjusts depending on your recall accuracy.'
        ]
      }
    ],
    ctaText: 'Try SRS Flashcards',
    ctaAction: 'JAPANESE'
  },
  {
    id: 'indexeddb-specs',
    title: 'Offline IndexedDB Local Storage Technical Specs',
    category: 'SUPPORT',
    badge: '100% Offline',
    emoji: '💾',
    subtitle: 'Browser IndexedDB local database caching, offline PWA service worker, and automatic background sync.',
    sections: [
      {
        heading: 'Study Anywhere — Even Without Internet Connection',
        text: 'LanguageGuru utilizes Progressive Web App (PWA) technologies and client-side IndexedDB databases so all lessons, audio tracks, and flashcards remain accessible offline.',
        bullets: [
          'IndexedDB Caching: Vocabulary lists, Furigana annotations, and audio tracks are saved locally in browser storage.',
          'Offline Test Submissions: Complete mock tests while offline; scores automatically sync to the server when network connectivity restores.',
          'Zero Data Consumption: Once loaded, study on low-bandwidth 3G or offline environments without consuming data.'
        ]
      }
    ],
    ctaText: 'Close Guide',
    ctaAction: 'CLOSE'
  },

  // ── LEGAL & PLATFORM ────────────────────────────────────
  {
    id: 'terms',
    title: 'Terms of Service & User Agreement',
    category: 'LEGAL',
    badge: 'Legal Terms',
    emoji: '📜',
    subtitle: 'User account terms, acceptable use policy, intellectual property rights, and service availability.',
    sections: [
      {
        heading: '1. Acceptance of Terms',
        text: 'By accessing or using the LanguageGuru platform, website, or mobile application, you agree to be bound by these Terms of Service and all applicable laws.'
      },
      {
        heading: '2. User Accounts & Progress Synchronization',
        text: 'You are responsible for maintaining the confidentiality of your account credentials. You agree that study progress and exam scores recorded under your account reflect genuine user activity.'
      },
      {
        heading: '3. Intellectual Property Rights',
        text: 'All curriculum materials, 4-column note sheets, software code, examination engines, and audio recordings are the exclusive intellectual property of LanguageGuru.'
      }
    ],
    ctaText: 'Accept & Close',
    ctaAction: 'CLOSE'
  },
  {
    id: 'privacy',
    title: 'Privacy Policy & Data Encryption Standards',
    category: 'LEGAL',
    badge: 'Privacy Policy',
    emoji: '🔒',
    subtitle: 'Data collection practices, GDPR & CCPA compliance, zero third-party data selling, and SSL encryption standards.',
    sections: [
      {
        heading: 'Our Privacy Commitment',
        text: 'LanguageGuru respects your privacy and is committed to protecting your personal data. We never sell or monetize user information to third-party advertisers.',
        bullets: [
          'Data Collected: Account email address, student name, test scores, study progress logs, and streak statistics.',
          'Data Security: All user data is encrypted in transit via TLS 1.3 (SSL) and at rest using AES-256 encryption.',
          'GDPR & CCPA Compliance: Users hold full rights to export their study data or request account deletion at any time.'
        ]
      }
    ],
    ctaText: 'Close Privacy Policy',
    ctaAction: 'CLOSE'
  },
  {
    id: 'cookies',
    title: 'Cookie Policy & Privacy Preferences',
    category: 'LEGAL',
    badge: 'Cookie Policy',
    emoji: '🍪',
    subtitle: 'Necessary session cookies, preference tokens, analytics settings, and user privacy options.',
    sections: [
      {
        heading: 'How We Use Browser Cookies',
        text: 'LanguageGuru uses minimal, functional browser cookies and local storage tokens to deliver a seamless learning experience.',
        bullets: [
          'Essential Session Cookies: Keeps you signed in and maintains active study session state.',
          'Preference LocalStorage Tokens: Saves your current level selection (JLPT N5–N1 or EPS-TOPIK) and audio volume preferences.',
          'Zero Tracking Cookies: We do not use cross-site tracking cookies or third-party ad pixels.'
        ]
      }
    ],
    ctaText: 'Save & Close',
    ctaAction: 'CLOSE'
  },
  {
    id: 'anti-cheat',
    title: 'Platform Security & Exam Integrity Engine',
    category: 'LEGAL',
    badge: 'Anti-Cheat',
    emoji: '🛡',
    subtitle: 'Exam security protocols, tab blur detection, section locking, and anti-tamper submission verification.',
    sections: [
      {
        heading: 'Ensuring Test Authenticity & QR Certificate Value',
        text: 'To guarantee that LanguageGuru certificates maintain official credibility with employers and educational institutes, our exam engine incorporates robust security measures:',
        bullets: [
          'Tab Switch & Window Blur Detection: Monitors window focus during timed exams to prevent unauthorized searches.',
          'Section Locking: Once a CBT test section is submitted, previous questions are locked.',
          'Anti-Tamper Score Hash: Exam result payloads are signed with a cryptographic HMAC signature before saving.'
        ]
      }
    ],
    ctaText: 'Close Security Guide',
    ctaAction: 'CLOSE'
  },
  {
    id: 'support-contact',
    title: 'Contact Support Team & Community Help Desk',
    category: 'LEGAL',
    badge: 'Support Desk',
    emoji: '💬',
    subtitle: 'Direct support channels, email assistance, community Discord link, and FAQ help desk.',
    sections: [
      {
        heading: 'Get in Touch with Our Team',
        text: 'Have questions about JLPT preparation, EPS-TOPIK curriculum, Prometric exam registration, or technical issues? Our dedicated support team is here to help!',
        bullets: [
          '📧 Official Email Support: support@japankoreaacademy.com (Response time: < 24 Hours)',
          '🌐 Discord Community: Join 15,000+ active Japanese & Korean learners for daily practice rooms and Q&A.',
          '🇳🇵 Kathmandu Office Helpdesk: Monday–Friday 9:00 AM – 6:00 PM (NPT)'
        ]
      }
    ],
    ctaText: 'Back to Platform',
    ctaAction: 'CLOSE'
  },
  {
    id: 'life-in-japan',
    title: 'Life in Japan & Essential Cultural Guide',
    category: 'SUPPORT',
    badge: 'Japan Living',
    emoji: '🇯🇵',
    subtitle: 'Comprehensive guide for living, working, housing, trash rules, commuting, and cultural etiquette in Japan.',
    sections: [
      {
        heading: '1. Monthly Cost of Living & Housing in Japan',
        text: 'Living in Japan requires smart budgeting depending on whether you reside in Tokyo/Osaka or regional prefectures.',
        bullets: [
          'Housing & Rent: Apartment rent averages ¥40,000–¥80,000/month. Initial move-in costs include Shikikin (deposit) and Reikin (key money).',
          'Utilities & Internet: Electricity, water, and fiber internet average ¥12,000–¥18,000/month.',
          'Food & Groceries: Cooking at home costs ¥25,000–¥40,000/month. Convenience store (conbini) bento meals cost ¥450–¥700.',
          'National Health Insurance (Kokumin Kenko Hoken): Covers 70% of medical and prescription costs.'
        ]
      },
      {
        heading: '2. Essential Daily Etiquette & Rules',
        text: 'Japan places immense value on social harmony (Wa), public cleanliness, and mutual respect.',
        bullets: [
          'Garbage Sorting (Gomi Shūbe): Garbage MUST be separated strictly into Burnable (Moeru), Non-burnable (Moenai), and Recyclable plastics/cans on specified days.',
          'Public Transport Conduct: Keep mobile phones on silent ("manner mode"), avoid phone calls on trains, and queue neatly in line at platform markers.',
          'Shoe Etiquette: Always remove shoes at Genkan (entrances) of homes, traditional restaurants, and tatami rooms.'
        ]
      },
      {
        heading: '3. Workplace Culture & Emergency Contacts',
        text: 'Professional etiquette includes Punctuality (5 minutes early rule), Aisatsu (daily greetings), and Hou-Ren-So (Report, Inform, Consult). Emergency number: 110 (Police), 119 (Fire & Ambulance).'
      }
    ],
    ctaText: 'Open Japanese Platform',
    ctaAction: 'JAPANESE'
  },
  {
    id: 'life-in-korea',
    title: 'Life in Korea & EPS Worker Guide',
    category: 'SUPPORT',
    badge: 'Korea Living',
    emoji: '🇰🇷',
    subtitle: 'Essential guide for EPS E-9 workers, living costs, T-Money transport, food culture, and workplace rights in South Korea.',
    sections: [
      {
        heading: '1. Living & Working as an EPS Worker (E-9)',
        text: 'South Korea offers high earning potential and structured workplace benefits for international workers under the Employment Permit System.',
        bullets: [
          'Minimum Wage & Salary: Minimum monthly salary is approx ₩2,060,740+ per month plus overtime (1.5x night/holiday pay).',
          'Dormitory & Meal Allowances: Factory or farm dormitories are provided under standard employment contracts with basic utilities.',
          'Four Major Insurances (4대 보험): National Pension, Employment Insurance, Industrial Accident Insurance, and National Health Insurance.'
        ]
      },
      {
        heading: '2. Daily Life & Public Transportation',
        text: 'South Korea has one of the world\'s most modern, fast, and connected public transport networks.',
        bullets: [
          'T-Money Card: Rechargeable smart card used for subways, city buses, taxis, and convenience stores (CU, GS25, 7-Eleven).',
          'Food & Dining: Traditional meals include Kimchi Jjigae, Samgyeopsal, and Bibimbap. Dining out averages ₩8,000–₩12,000 per meal.',
          'Trash Separation (Jongnyangje): Special official garbage bags (종량제 봉투) purchased at convenience stores must be used for general waste.'
        ]
      },
      {
        heading: '3. Korean Social Etiquette & Emergency Numbers',
        text: 'Always use two hands when giving or receiving items from elders or managers. Use polite honorifics (-yo / -bsnida). Emergency: 112 (Police), 119 (Fire & Ambulance), 1345 (Immigration Contact Center).'
      }
    ],
    ctaText: 'Open Korean Platform',
    ctaAction: 'KOREAN'
  }
];
