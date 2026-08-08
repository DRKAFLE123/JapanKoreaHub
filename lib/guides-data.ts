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
          '📧 Official Email Support: support@japankoreahub.com (Response time: < 24 Hours)',
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
  },

  // ── EXAM & SYLLABUS GUIDES ───────────────────────────────

  // ── JFT-Basic CBT Full Syllabus ──
  {
    id: 'jft-basic-syllabus',
    title: 'JFT-Basic CBT Official Exam Syllabus (Complete)',
    category: 'LANGUAGE',
    badge: 'JFT-Basic A2',
    emoji: '💻',
    subtitle: 'Japan Foundation Computer-Based Test: 250-mark scale, 4 section-locked modules, CEFR A2 benchmarks, and official question breakdown for SSW Visa applicants.',
    sections: [
      {
        heading: 'What is the JFT-Basic (国際交流基金日本語基礎テスト)?',
        text: 'The Japan Foundation Test for Basic Japanese (JFT-Basic) is a Computer-Based Test (CBT) designed to measure whether a foreign worker has the Japanese language ability needed for daily life in Japan. Passing JFT-Basic (200/250 points) is one of the two accepted language qualification pathways for the Specified Skilled Worker (SSW) visa in Japan.',
        bullets: [
          'Official Name: 国際交流基金日本語基礎テスト (JFT-Basic)',
          'Administered by: Japan Foundation (国際交流基金)',
          'Testing Platform: Prometric CBT (Computer-Based Test centers worldwide)',
          'CEFR Level Equivalent: A2 (Elementary — Can understand and use basic expressions for immediate needs)',
          'Passing Score: 200 points out of 250 total',
          'Score Scale: A2.2 (200–250 pts) → A2.1 (175–199 pts) → A1 (145–174 pts) → Below A1 (Under 145 pts)',
          'Duration: Approximately 60 minutes (plus 30 minutes check-in time)',
          'Test Language: Japanese only (No English or Nepali instructions provided)',
          'Accepted Countries: Nepal, Vietnam, Philippines, Indonesia, Myanmar, India, and 12+ others'
        ]
      },
      {
        heading: 'Official 4-Section Structure (250 Marks Scale)',
        text: 'The JFT-Basic exam is divided into exactly 4 section-locked modules administered in sequential order. Once you submit a section, you cannot return to previous questions.',
        bullets: [
          'Section 1 — 文字と語彙 (Script & Vocabulary): 12 Questions | ~60 Points | Tests Hiragana, Katakana, basic Kanji script recognition, and essential daily vocabulary.',
          'Section 2 — 会話と表現 (Conversation & Expression): 12 Questions | ~60 Points | Tests short conversational responses, workplace phrases, greetings, and situational expressions.',
          'Section 3 — 聴解 (Listening Comprehension): 12 Questions | ~65 Points | Audio-based questions with dialogues, announcements, and short conversations (no re-play allowed).',
          'Section 4 — 読解 (Reading Comprehension): 14 Questions | ~65 Points | Short notices, instruction signs, product labels, timetables, and daily-life texts.'
        ]
      },
      {
        heading: 'Vocabulary & Grammar Coverage (A2 Target Range)',
        text: 'JFT-Basic covers approximately 800–1,000 core vocabulary words at CEFR A2 level. The exam intentionally uses kana-only text in most sections to prioritize reading comprehension over kanji ability.',
        bullets: [
          'Kana-Only Sections: Sections 1 & 2 are predominantly written in Hiragana and Katakana without kanji.',
          'Basic Kanji Allowed: Sections 3 & 4 may include basic kanji such as 日・月・火・水・金・山・川・学校・会社 (always with furigana readings shown).',
          'Grammar Focus: ～ます/～ません, particle は/が/を/に/で/へ, question words (いつ・どこ・なに・だれ・いくら), counting and time expressions.',
          'Functional Areas: Daily greetings, shopping, transport directions, workplace safety, phone conversation, weather, and public signs.'
        ]
      },
      {
        heading: 'How Scoring Works (250-Point CBT Scale)',
        text: 'Unlike JLPT percentage scores, JFT-Basic uses an Item Response Theory (IRT) scaled score system. This means each question is weighted differently based on difficulty level. Getting all 50 questions correct equals 250 points.',
        bullets: [
          '250/250: A2.2 Maximum — SSW Visa Language Requirement Fully Met.',
          '200–249: A2.2 — SSW Visa Qualified (meets 200-point benchmark).',
          '175–199: A2.1 — Elementary. Recommended for re-attempt.',
          '145–174: A1 — Basic beginner. Additional study needed.',
          'Below 145: Below A1 — Retake required after 6 months study gap.'
        ],
        callout: 'Key Rule: You must score AT LEAST 200/250 total AND no single section score can be zero (mandatory minimum in each section).'
      },
      {
        heading: 'Exam Registration & Test Centers (Nepal)',
        text: 'JFT-Basic is delivered exclusively through Prometric authorized test centers. Registration is done through the Japan Foundation official portal or directly via Prometric Nepal.',
        bullets: [
          'Official Registration Portal: jft-basic.or.jp/e/ (Japan Foundation official site)',
          'Nepal Prometric Centers: Kathmandu (multiple locations), Pokhara, Butwal, Biratnagar, Chitwan',
          'Exam Fee: NPR 4,500–6,000 (subject to change — check official portal)',
          'ID Required: Original International Passport (mandatory for CBT entry)',
          'Admission Ticket: Print and bring confirmation email or e-ticket on exam day',
          'Score Results: Available online within 24–48 hours of test completion'
        ]
      },
      {
        heading: 'Official Study Resources & Preparation Strategy',
        text: 'Efficient JFT-Basic preparation at LanguageGuru focuses on 3 core skills: Script recognition, Conversational response matching, and Passage reading comprehension.',
        bullets: [
          'LanguageGuru JFT Easy Mock Test: Full 28-question A2-level practice paper (kana-only vocab + listening TTS + reading passages).',
          'LanguageGuru JFT CBT Sets 1–5: Full 50-question authentic format mock tests (4 section-locked modules with 250-point scoring).',
          'Daily Flashcard Deck: Study 20 JFT-level flashcards per day using our SRS system targeting A2 vocabulary.',
          'Official Japan Foundation Practice Tests: Download free sample questions from jft-basic.or.jp.',
          'Recommended Timeline: 3 months for absolute beginners | 1 month for intermediate learners.'
        ]
      }
    ],
    ctaText: 'Launch JFT-Basic Mock Test',
    ctaAction: 'MOCK'
  },

  // ── JLPT N5 Detailed Syllabus ──
  {
    id: 'jlpt-n5-syllabus',
    title: 'JLPT N5 Examination Syllabus & Study Guide (Complete)',
    category: 'LANGUAGE',
    badge: 'JLPT N5',
    emoji: '🎗',
    subtitle: 'Full official syllabus for JLPT N5: 100 Kanji, 800 vocabulary, grammar patterns, 2-paper exam structure, and complete passing criteria for beginners.',
    sections: [
      {
        heading: 'JLPT N5 Official Level Description',
        text: 'JLPT N5 is the most beginner-friendly level of the Japanese Language Proficiency Test. It certifies that you can understand some basic Japanese and read simple sentences written in Hiragana, Katakana, and elementary Kanji.',
        bullets: [
          'Reading Ability: Understand simple sentences written in Hiragana, Katakana, and 100 common Kanji.',
          'Listening Ability: Follow slow, clear spoken Japanese about familiar daily topics (weather, time, food, directions).',
          'Vocabulary Count: ~800 words (core essential vocabulary for basic daily communication).',
          'Kanji Count: 100 Kanji (elementary characters including 日・月・火・水・木・金・土・山・川・上・下・中・大・小・一～十 and more).',
          'Study Hours Required: 80–150 hours for speakers of non-Asian languages.',
          'Equivalent CEFR Level: Approximately A1 (Breakthrough — Can understand very familiar expressions).'
        ]
      },
      {
        heading: 'Official Exam Paper Structure',
        text: 'The JLPT N5 exam consists of 2 booklets delivered in a single examination session with a 15-minute official break between papers.',
        bullets: [
          'Paper 1 — 言語知識 Language Knowledge (Vocabulary & Grammar): 25 minutes | Tests Kanji reading, vocabulary selection, and grammar cloze-test sentences.',
          'Paper 1 — 読解 Reading Comprehension: 50 minutes | Short texts, notices, and illustrated passage comprehension.',
          'Paper 2 — 聴解 Listening: 30 minutes | Audio CD tracks with multiple-choice questions. 4 question types: Picture selection, response matching, conversation comprehension, and quick response.'
        ]
      },
      {
        heading: 'Grammar Syllabus (Core N5 Patterns)',
        text: 'JLPT N5 grammar tests basic sentence construction, particles, verb forms, and time/number expressions.',
        bullets: [
          'Copula & Politeness: ～です/～ます (Polite non-past), ～でした/～ました (Polite past)',
          'Particles: は (topic), が (subject), を (object), に (time/place/direction), で (location of action), へ (direction), と (and/with), も (also), の (possession), から/まで (from/to)',
          'Verb Groups: Group 1 (U-verbs), Group 2 (RU-verbs), Group 3 (Irregular: する・くる)',
          'Adjective Types: い-adjectives (おおきい・ちいさい・たかい) and な-adjectives (きれいな・しずかな)',
          'Connectors: ～て (Te-form connection), ～たり～たりします (do things like A and B)',
          'Expressions: ～たいです (want to do), ～ましょう (let\'s), ～てください (please do), ～ことができます (can do)'
        ]
      },
      {
        heading: 'N5 Kanji List (100 Core Characters)',
        text: 'The official JLPT N5 Kanji list covers 100 foundational characters that appear in basic daily life contexts. These include:',
        bullets: [
          'Numbers & Time: 一二三四五六七八九十百千万 | 年月日時分 | 今昨明',
          'Nature & Elements: 山川海空土火水木金',
          'Directions & Positions: 上下左右中前後外',
          'People & Family: 人男女子父母',
          'Daily Life: 本車電話学校会社国語読書',
          'Size & Quantity: 大小多少長'
        ]
      },
      {
        heading: 'Scoring & Passing Criteria',
        text: 'JLPT N5 uses a scaled score system (0–120 Language Knowledge + 0–60 Listening = 180 total points).',
        bullets: [
          'Total Score Required to Pass: 80/180 points minimum.',
          'Sectional Passing Mark: Language Knowledge (Vocab + Grammar + Reading) minimum 38 points.',
          'Listening Section Minimum: 19 points.',
          'Important: You MUST meet BOTH the total score AND each section\'s minimum — scoring 80+ total but failing a section means you do NOT pass.',
          'Results Timeline: Results announced approximately 2 months after the exam date.',
          'Certificate: Official JLPT N5 Certificate of Proficiency issued by the Japan Foundation and Japan Educational Exchanges and Services (JEES).'
        ],
        callout: 'Exam Dates: JLPT is held twice a year globally — First Sunday of July (N1–N5) and First Sunday of December (N1–N5).'
      }
    ],
    ctaText: 'Take JLPT N5 Mock Test',
    ctaAction: 'MOCK'
  },

  // ── JLPT N4 Detailed Syllabus ──
  {
    id: 'jlpt-n4-syllabus',
    title: 'JLPT N4 Examination Syllabus & Study Guide (Complete)',
    category: 'LANGUAGE',
    badge: 'JLPT N4',
    emoji: '🎗',
    subtitle: 'Full official syllabus for JLPT N4: 300 Kanji, 1,500 vocabulary, Te-form grammar, SSW visa eligibility, and complete 2-paper exam structure.',
    sections: [
      {
        heading: 'JLPT N4 Official Level Description',
        text: 'JLPT N4 certifies that you can understand basic Japanese used in everyday situations. It is a mandatory language requirement for the Specified Skilled Worker (SSW Type 1) visa in Japan (equivalent to JFT-Basic 200/250).',
        bullets: [
          'Reading Ability: Understand sentences written using basic vocabulary and Kanji, and read short familiar passages.',
          'Listening Ability: Follow slow, clear conversations about familiar daily and workplace topics.',
          'Vocabulary Count: ~1,500 words.',
          'Kanji Count: 300 Kanji (all N5 Kanji + 200 additional characters).',
          'Study Hours: 150–300 hours from zero.',
          'CEFR Equivalent: Approximately A2 (Elementary).',
          'SSW Eligibility: JLPT N4 (or higher) is accepted as the language qualification for ALL 14 SSW sectors.'
        ]
      },
      {
        heading: 'Grammar Syllabus (Core N4 Patterns)',
        text: 'N4 grammar extends the N5 foundation to include conditional forms, passive/causative voice, embedded clauses, and polite expressions.',
        bullets: [
          'Te-form Applications: ～ています (ongoing action), ～てあります (resultant state), ～ておきます (do in advance), ～てしまいます (do completely/regret)',
          'Conditional Forms: ～たら (when/if), ～ば (if — condition), ～と (natural consequence), ～なら (if that is the case)',
          'Passive Voice (受身形): ～られます (is done to), expressing actions done TO the subject',
          'Causative Voice (使役形): ～させます (make/let someone do)',
          'Potential Form: ～られます/～できます (can do)',
          'Volitional Form: ～ようと思います (I intend to), ～ましょうか (shall we?)',
          'Giving & Receiving: あげます/もらいます/くれます with nuanced social hierarchy usage',
          'Basic Honorifics (Keigo): です/ます formal style + いらっしゃいます/おっしゃいます introductory usage'
        ]
      },
      {
        heading: 'N4 Vocabulary Thematic Areas',
        text: 'N4 vocabulary covers all N5 words plus 700 additional words spanning workplace, health, travel, and social situations.',
        bullets: [
          'Workplace & Business: 会議・残業・連絡・相談・確認・報告・締め切り・担当',
          'Health & Medical: 病院・薬・注射・手術・アレルギー・風邪・熱・頭痛',
          'Transport & Travel: 新幹線・乗り換え・特急・定期券・飛行機・予約・荷物',
          'Social & Emotions: 困る・心配・驚く・怒る・感動・失礼・遠慮',
          'Nature & Environment: 天気予報・地震・台風・洪水・季節・気温'
        ]
      },
      {
        heading: 'Scoring & Passing Criteria',
        text: 'JLPT N4 uses the same 180-point structure as N5.',
        bullets: [
          'Total Passing Score: 90/180 points minimum.',
          'Language Knowledge Minimum: 38/120 points.',
          'Listening Minimum: 19/60 points.',
          'Sectional Pass Requirement: All three subscores (vocabulary, grammar/reading, listening) must independently meet minimums.',
          'Registration: Japan Educational Exchanges & Services (jlpt.jp) — online registration opens 3 months before exam date.'
        ]
      }
    ],
    ctaText: 'Take JLPT N4 Mock Test',
    ctaAction: 'MOCK'
  },

  // ── JLPT N3/N2/N1 Combined Overview ──
  {
    id: 'jlpt-upper-syllabus',
    title: 'JLPT N3 · N2 · N1 Upper Level Syllabus Overview',
    category: 'LANGUAGE',
    badge: 'N3 → N1',
    emoji: '🏆',
    subtitle: 'Complete upper-intermediate and advanced JLPT syllabus: Kanji counts, grammar complexity, business Japanese criteria, and university admission standards.',
    sections: [
      {
        heading: 'JLPT N3 (Intermediate — Bridge Level)',
        text: 'N3 bridges the gap between basic and professional Japanese ability. It certifies you can understand Japanese encountered in everyday situations to some degree.',
        bullets: [
          'Kanji: 650 characters | Vocabulary: ~3,750 words.',
          'Grammar: Conditional forms ～として/～に対して/～をはじめ, complex particles ～によって/～にとって, indirect speech, and relative clauses.',
          'Reading: Short newspaper articles, notices, and illustrated explanation texts.',
          'Listening: Natural-speed conversations with some inferential comprehension.',
          'Passing Score: 95/180 total | Language Knowledge min: 38 | Listening min: 19.',
          'Career Value: Required for some manufacturing SSW roles, internship programs, and Japanese university preparatory courses.'
        ]
      },
      {
        heading: 'JLPT N2 (Pre-Advanced — Professional Japanese)',
        text: 'N2 certifies near-professional Japanese ability. It is the most practically demanded level by Japanese companies for international hires.',
        bullets: [
          'Kanji: 1,000 characters | Vocabulary: ~6,000 words.',
          'Grammar: Advanced conditionals, double negatives, formal written style (keigo: sonkeigo/kenjōgo/teineigo), logical connectors (一方・それに対して・したがって).',
          'Reading: Newspaper editorials, business memos, technical manuals, and essay-style texts.',
          'Listening: Fast-paced dialogue, radio news, and formal business discussions.',
          'Passing Score: 90/180 total | Language Knowledge min: 34 | Listening min: 23.',
          'Career Value: Required for most Japanese corporate employment contracts, Engineering/Humanities work visa sponsorship, and interpreter roles.'
        ]
      },
      {
        heading: 'JLPT N1 (Advanced — Native-Equivalent Fluency)',
        text: 'N1 represents the pinnacle of JLPT certification, verifying ability to understand Japanese used in a wide variety of circumstances to a sophisticated degree.',
        bullets: [
          'Kanji: 2,000+ characters | Vocabulary: ~10,000 words.',
          'Grammar: Classical literary expressions, proverbs, four-character idioms (四字熟語), advanced keigo, academic and legal Japanese.',
          'Reading: Editorials, academic abstracts, legal contracts, literature, and technical papers.',
          'Listening: Natural speed complex discussions with implied meaning and cultural nuance.',
          'Passing Score: 100/180 total | Language Knowledge min: 19 | Reading min: 19 | Listening min: 19.',
          'Career Value: Academic research roles, government employment, senior management positions, legal interpreter certification, and Highly Skilled Professional (HSP) visa bonus points.'
        ]
      },
      {
        heading: 'JLPT Exam Scheduling & Global Centers',
        text: 'JLPT is administered twice per year worldwide at registered test centers in 84 countries and regions.',
        bullets: [
          'July Session: All levels (N1–N5) — First Sunday of July.',
          'December Session: All levels (N1–N5) — First Sunday of December.',
          'Nepal Exam Centers: Kathmandu (Japan Foundation Nepal), Pokhara.',
          'Online Registration: jlpt.jp → select country → select level → pay exam fee.',
          'Exam Fee: Varies by country. Nepal: Approximately NPR 2,500–3,500 depending on level.',
          'Certificate Validity: JLPT certificates do not expire — they remain permanently valid.'
        ],
        callout: 'Important: JLPT certificates are accepted globally. Once earned, they never need renewal.'
      }
    ],
    ctaText: 'Explore Upper Level Mock Tests',
    ctaAction: 'MOCK'
  },

  // ── EPS-TOPIK CBT Syllabus ──
  {
    id: 'eps-topik-syllabus',
    title: 'EPS-TOPIK CBT Official Exam Syllabus (Complete)',
    category: 'LANGUAGE',
    badge: 'EPS-TOPIK CBT',
    emoji: '🇰🇷',
    subtitle: 'Official HRD Korea EPS-TOPIK 40-question CBT syllabus: Reading & Listening structure, scoring criteria, roster registration, and re-exam policies for E-9 visa applicants.',
    sections: [
      {
        heading: 'What is the EPS-TOPIK?',
        text: 'The Employment Permit System Test of Proficiency in Korean (EPS-TOPIK) is a mandatory Korean language proficiency test for foreign workers seeking employment in South Korea under the E-9 (Non-Professional Employment) visa. The test is developed and administered by HRD Korea (Human Resources Development Service of Korea).',
        bullets: [
          'Official Name: 고용허가제 한국어능력시험 (EPS-TOPIK)',
          'Administered by: HRD Korea (한국산업인력공단)',
          'Test Format: Computer-Based Test (CBT) — Touch-screen interface at authorized centers',
          'Countries Included: Nepal, Vietnam, Philippines, Indonesia, Cambodia, Myanmar, Bangladesh, Thailand, Sri Lanka, and 6 others',
          'Duration: 70 minutes total (Reading: 40 min | Listening: 30 min)',
          'Passing Score: 80/200 minimum (each section scored 0–100)',
          'Certificate Validity: 2 years from date of result announcement'
        ]
      },
      {
        heading: 'Official 2-Part Exam Structure',
        text: 'EPS-TOPIK consists of exactly 40 questions divided into Reading (읽기) and Listening (듣기) sections. Both sections are mandatory.',
        bullets: [
          'Part 1 — 읽기 (Reading): 20 Questions | 100 Points | 40 minutes. Tests Korean Hangul reading comprehension, workplace documents, notices, schedules, labels, and instructions.',
          'Part 2 — 듣기 (Listening): 20 Questions | 100 Points | 30 minutes. Audio-based: dialogues, workplace announcements, safety instructions, and situational conversations.'
        ]
      },
      {
        heading: 'Reading Section Topic Areas',
        text: 'The EPS-TOPIK reading section covers practical Korean workplace and daily life situations drawn from the official 60-lesson EPS Standard Textbook.',
        bullets: [
          'Lessons 1–15: Basic greetings, self-introduction, numbers & counting, time & date, shopping, and daily routine.',
          'Lessons 16–30: Transportation, public places, health & medical, weather, and social expressions.',
          'Lessons 31–45: Factory & manufacturing vocabulary, workplace safety rules, industrial equipment, and labor regulations.',
          'Lessons 46–60: Agricultural/livestock/construction terms, employment contract terms, health insurance, accident reporting, and worker rights.'
        ]
      },
      {
        heading: 'Listening Section Content & Rules',
        text: 'The listening section presents authentic Korean dialogues and announcements related to workplace environments. Each audio clip plays only ONCE.',
        bullets: [
          'Dialogue Questions: Two-speaker workplace conversations where you identify the main topic or speaker intent.',
          'Announcement Questions: Factory PA system, bus/subway announcements, weather forecasts, and safety reminders.',
          'Instruction Questions: Step-by-step instructions from a supervisor or manager.',
          'Rule: Each audio track plays once only — no repeat button. Practice active first-listen comprehension.',
          'Speed: Conversations are delivered at natural Korean speaking speed (~120–150 words per minute).'
        ],
        callout: 'Tip: The EPS Standard Textbook (교재) audio tracks at natural speed are the best official preparation material for listening.'
      },
      {
        heading: 'Scoring, Roster & Visa Process',
        text: 'Passing EPS-TOPIK does not guarantee immediate employment — it only qualifies you for placement on the HRD Korea job roster.',
        bullets: [
          'Passing Score: 80/200 or higher (both reading and listening combined).',
          'Score Report: Available online within 7–10 days of exam at eps.hrdkorea.or.kr.',
          'Roster Registration: Passed candidates register their employment preferences (sector, region, job type) on the HRD Korea portal.',
          'Employer Matching: Korean employers browse the roster and select candidates based on skills, experience, and physical fitness report.',
          'Next Steps: After employer selection → Medical fitness examination → Pre-departure Korean culture training → E-9 visa issuance → Flight to Korea.',
          'Certificate Validity: EPS-TOPIK pass results are valid for 2 years. If not employed within 2 years, re-examination required.'
        ]
      }
    ],
    ctaText: 'Launch EPS-TOPIK Mock Test',
    ctaAction: 'MOCK'
  },

  // ── TOPIK I & II Korean Proficiency Syllabus ──
  {
    id: 'topik-syllabus',
    title: 'TOPIK I & II Official Examination Syllabus',
    category: 'LANGUAGE',
    badge: 'TOPIK Levels 1–6',
    emoji: '📝',
    subtitle: 'Complete Korean TOPIK Level 1–6 syllabus: vocabulary benchmarks, grammar targets, exam structure, passing scores, and university/immigration point values.',
    sections: [
      {
        heading: 'What is TOPIK (Test of Proficiency in Korean)?',
        text: 'TOPIK is the official Korean language proficiency test administered by the National Institute for International Education (NIIED), South Korea. It is accepted worldwide for university admissions, immigration points, and visa applications.',
        bullets: [
          'Official Name: 한국어능력시험 (TOPIK)',
          'Administered by: NIIED (National Institute for International Education), Korea',
          'Levels: TOPIK I (Levels 1–2) for beginners | TOPIK II (Levels 3–6) for intermediate-advanced',
          'Sections: Listening (듣기) + Reading (읽기) + Writing (쓰기) for TOPIK II',
          'Exam Dates: Held 6 times per year globally (Feb, Apr, May, Jul, Oct, Nov)',
          'Registration: topik.go.kr (Official NIIED portal)',
          'Nepal Fee: Approximately NPR 3,500–4,500 per sitting'
        ]
      },
      {
        heading: 'TOPIK I (Levels 1–2): Beginner Korean',
        text: 'TOPIK I evaluates basic Korean reading and listening ability for beginners.',
        bullets: [
          'Level 1 (Score 80–139/200): Can carry out basic conversations about self-introduction, shopping, directions; understand ~800 words.',
          'Level 2 (Score 140–200/200): Can use Korean for routine daily tasks, read simple notices and instructions; understand ~1,500–2,000 words.',
          'Exam Format: Listening (30 Q, 40 min) + Reading (40 Q, 60 min) = 200 total points.',
          'No Writing Section in TOPIK I.',
          'Career Value: TOPIK Level 1–2 meets the Korean language requirement for some E-9 EPS sector workers and F-2 resident visa preference.'
        ]
      },
      {
        heading: 'TOPIK II (Levels 3–6): Intermediate to Advanced',
        text: 'TOPIK II evaluates comprehensive Korean ability including written composition.',
        bullets: [
          'Level 3 (Score 120–149/300): Can use Korean for most social contexts, read simple newspaper articles; ~3,000 word vocabulary.',
          'Level 4 (Score 150–189/300): Able to perform basic work functions, discuss social and abstract topics; ~5,000 words.',
          'Level 5 (Score 190–229/300): Professional-level proficiency, read political/cultural texts, newspapers; ~7,000 words.',
          'Level 6 (Score 230–300/300): Near-native ability to research, write formally, and present complex arguments; ~10,000+ words.',
          'Exam Format: Listening (50 Q, 60 min) + Writing (4 Q, 50 min) + Reading (50 Q, 70 min) = 300 total points.',
          'E-7-4 Visa: TOPIK Level 3+ is required for EPS E-9 workers applying for E-7-4 Skilled Worker Visa conversion.'
        ]
      },
      {
        heading: 'Immigration & PR Points Value',
        text: 'TOPIK scores contribute significant points to Korean immigration and permanent residency applications.',
        bullets: [
          'F-5 Permanent Residency: TOPIK Level 4 earns 20 points; Level 5 earns 25 points in the PR points system.',
          'F-2-7 Points-Based Residency: TOPIK scores contribute directly to long-term residency qualification.',
          'University Admission: Most Korean universities require TOPIK Level 3 minimum; KAIST and Seoul National University require Level 4 or 5.',
          'E-7-4 Conversion: Mandatory TOPIK Level 3 requirement for EPS workers seeking skilled worker visa.'
        ]
      }
    ],
    ctaText: 'Study Korean Vocabulary',
    ctaAction: 'KOREAN'
  },

  // ── Prometric SSW Skill Tests ──
  {
    id: 'prometric-ssw-tests',
    title: 'Prometric SSW Sector Skill Tests (14 Industries)',
    category: 'VISA',
    badge: 'SSW Skills',
    emoji: '🔧',
    subtitle: 'Complete guide to all 14 Specified Skilled Worker sector skill examinations: test formats, passing criteria, sample topics, and overseas test availability by country.',
    sections: [
      {
        heading: 'Overview of SSW Sector Skill Examinations',
        text: 'In addition to the Japanese language requirement (JFT-Basic 200/250 or JLPT N4+), all SSW Type 1 applicants must pass a Sector-Specific Skill Evaluation Test administered by the relevant Japanese industry ministry through Prometric CBT.',
        bullets: [
          'Total Sectors: 14 designated SSW sectors, each with its own separate exam.',
          'Test Type: Primarily multiple-choice CBT (Computer-Based Test). Some sectors include practical skill demonstration.',
          'Passing Rate: Varies by sector — generally 50–70% pass rate reported by JICA.',
          'Validity: Skill test certificates do not expire (unlike some language certificates).',
          'Overseas Testing: Most sector tests are administered in Nepal, Vietnam, Philippines, Indonesia, and Cambodia.'
        ]
      },
      {
        heading: 'All 14 SSW Sectors & Responsible Ministries',
        text: 'Each SSW sector falls under a different Japanese ministry. Select the sector matching your professional background.',
        bullets: [
          '1. 介護 Nursing Care — Ministry of Health, Labour and Welfare (MHLW). Topics: Basic nursing procedures, hygiene protocols, care documentation.',
          '2. ビルクリーニング Building Cleaning — MHLW. Topics: Cleaning equipment, chemicals, hotel/office cleaning standards.',
          '3. 素形材・産業機械製造 Industrial Machinery — Ministry of Economy, Trade and Industry (METI). Topics: Machine operation, safety, quality inspection.',
          '4. 電気・電子情報関連 Electronics Manufacturing — METI. Topics: Circuit boards, soldering, ESD safety, assembly inspection.',
          '5. 建設 Construction — Ministry of Land, Infrastructure and Transport (MLIT). Topics: Concrete, rebar, foundation work, construction safety.',
          '6. 造船・舶用工業 Shipbuilding — MLIT. Topics: Welding, hull assembly, marine machinery.',
          '7. 自動車整備 Automobile Maintenance — MLIT. Topics: Engine inspection, oil changes, brake systems, diagnostic tools.',
          '8. 航空 Aviation — MLIT. Topics: Aircraft ground handling, cargo, ramp safety.',
          '9. 宿泊 Accommodation/Hotel — Japan Tourism Agency. Topics: Front desk, housekeeping, guest relations, hospitality.',
          '10. 飲食料品製造 Food & Beverage Processing — MHLW. Topics: Food hygiene, processing equipment, HACCP principles.',
          '11. 外食業 Restaurant/Food Service — MHLW. Topics: Kitchen safety, food preparation, customer service, sanitation.',
          '12. 農業 Agriculture — Ministry of Agriculture, Forestry and Fisheries (MAFF). Topics: Crop cultivation, harvesting, pesticide safety, greenhouse management.',
          '13. 漁業 Fishing — MAFF. Topics: Net operation, fish handling, safety at sea, aquaculture basics.',
          '14. 飲食料品製造 Beverage Processing — MHLW. Topics: Food processing line operation, quality control.'
        ]
      },
      {
        heading: 'Sample Exam Topics: Food Service (外食業)',
        text: 'Food Service is one of the most commonly attempted SSW sectors for Nepali workers. The exam covers:',
        bullets: [
          'Food Hygiene & Safety: Hand washing procedures, temperature control, cross-contamination prevention, food poisoning causes.',
          'Kitchen Equipment: Usage of fryers, ovens, dishwashers, and refrigeration units.',
          'Customer Service Standards: Polite greeting (Irasshaimase), order-taking, complaint handling.',
          'Japanese Food Culture: Types of Japanese cuisine, seasonal menu rotation, tableware etiquette.',
          'Allergen Management: Identifying and labeling 7 major food allergens (egg, wheat, dairy, peanut, buckwheat, shrimp, crab).'
        ]
      },
      {
        heading: 'How to Register for SSW Sector Tests Overseas',
        text: 'Sector skill tests can be taken in Nepal and other sending countries via Prometric authorized centers.',
        bullets: [
          'Step 1: Visit the official sector test portal (e.g. ssw.mhlw.go.jp for MHLW sectors).',
          'Step 2: Check the overseas test schedule — exams are held periodically (typically every 2–4 months).',
          'Step 3: Create a Prometric ID at prometric.com/japan.',
          'Step 4: Select exam date and test center in Nepal (Kathmandu, Pokhara).',
          'Step 5: Present original passport + admission ticket on exam day.',
          'Passing Certificate: Issued electronically within 1–2 weeks. Bring printout to visa application.'
        ]
      }
    ],
    ctaText: 'Practice JFT-Basic for SSW',
    ctaAction: 'MOCK'
  },

  // ── JFT vs JLPT Comparison Guide ──
  {
    id: 'jft-vs-jlpt',
    title: 'JFT-Basic vs JLPT: Which Exam Should You Take?',
    category: 'LANGUAGE',
    badge: 'Exam Comparison',
    emoji: '⚖️',
    subtitle: 'Side-by-side comparison of JFT-Basic CBT and JLPT N4/N5 for SSW visa eligibility, difficulty, cost, preparation time, and global recognition.',
    sections: [
      {
        heading: 'Quick Decision Summary',
        text: 'Both JFT-Basic (200/250) and JLPT N4 are accepted as the Japanese language requirement for the SSW Type 1 visa. However, they differ significantly in difficulty, format, and purpose.',
        bullets: [
          'Choose JFT-Basic if: You want the fastest route to SSW visa with functional daily Japanese skills. JFT-Basic is specifically designed for working adults.',
          'Choose JLPT N4 if: You want internationally recognized academic certification, plan to pursue higher levels (N3→N1), or need JLPT for university or skilled visa applications.',
          'Choose JLPT N5 if: You are a beginner and want a stepping stone certificate while continuing to study toward N4.'
        ]
      },
      {
        heading: 'Side-by-Side Comparison Table',
        text: 'Key differences at a glance:',
        bullets: [
          '📊 Difficulty: JFT-Basic (A2 Level) is EASIER than JLPT N4 (also A2 but stricter grammar). JFT-Basic focuses on practical daily usage; JLPT N4 tests formal grammar rules.',
          '📅 Exam Frequency: JFT-Basic — available year-round at Prometric centers. JLPT — only 2 times per year (July & December).',
          '📄 Format: JFT-Basic — 50 Q CBT (touch-screen, 60 min). JLPT N4 — 2-paper booklet exam (vocab/grammar 25 min + reading 50 min + listening 30 min).',
          '🏆 Validity: JFT-Basic result — no official expiry (used for visa once). JLPT Certificate — permanent, never expires.',
          '🌍 Recognition: JLPT is globally recognized by 14,000+ institutions worldwide. JFT-Basic is recognized only for SSW visa purposes.',
          '💰 Cost: Similar — both approximately NPR 4,000–6,000 per attempt in Nepal.',
          '⏱ Prep Time: JFT-Basic — 1–3 months from N5 level. JLPT N4 — 3–6 months from N5 level.'
        ]
      },
      {
        heading: 'Official SSW Language Requirements (2025)',
        text: 'The following language qualifications are officially accepted for the SSW Type 1 visa as of 2025:',
        bullets: [
          'JFT-Basic: 200 points or higher out of 250 (A2.2 CEFR level — ALL 14 sectors accept this).',
          'JLPT N4: Certificate of passing (90/180 minimum — ALL 14 sectors accept this).',
          'JLPT N3 or higher: Also accepted (higher than required, universally accepted).',
          'JLPT N5: NOT accepted for SSW visa (below minimum language requirement).',
          'EPS-TOPIK: Only valid for Korea E-9 visa — NOT accepted for Japan SSW visa.'
        ],
        callout: 'Reminder: Both language certificate AND sector skill test results must be submitted together at the time of SSW visa application.'
      },
      {
        heading: 'LanguageGuru Recommendation',
        text: 'Our platform supports both pathways with comprehensive preparation materials:',
        bullets: [
          'For JFT-Basic: Study our JFT Easy Mock (28 questions, A2 kana-only), JFT CBT Sets 1–5 (authentic 50-question format), and the daily A2 flashcard deck.',
          'For JLPT N4: Study our N4 Mock Tests, Minna no Nihongo Lessons 1–25 (covers all N5 grammar), and the N4 kanji flashcard set.',
          'Recommended Path: JFT-Basic → SSW Visa → Earn money in Japan → Study JLPT N3/N2 while working → Career advancement.'
        ]
      }
    ],
    ctaText: 'Launch Mock Test Center',
    ctaAction: 'MOCK'
  },

  // ── JLPT N5 Vocabulary & Grammar Cram Sheet ──
  {
    id: 'n5-vocab-cram',
    title: 'JLPT N5 Vocabulary & Grammar Cram Sheet (800 Words)',
    category: 'LANGUAGE',
    badge: 'N5 Vocab 800',
    emoji: '📖',
    subtitle: 'Complete thematic vocabulary list for all 800 JLPT N5 words organized by category, with Hiragana readings, English meanings, and example sentences.',
    sections: [
      {
        heading: 'Category 1: Pronouns & Basic Expressions (基本表現)',
        text: 'Essential N5 pronouns, greetings, and daily expressions:',
        bullets: [
          'Pronouns: わたし (I), あなた (you), かれ (he), かのじょ (she), わたしたち (we), みなさん (everyone)',
          'Greetings: おはようございます (good morning), こんにちは (hello), こんばんは (good evening), おやすみなさい (good night), さようなら (goodbye)',
          'Courtesy Expressions: ありがとうございます (thank you), どうぞ (please/here you go), すみません (excuse me), ごめんなさい (I\'m sorry)'
        ]
      },
      {
        heading: 'Category 2: Numbers, Time & Calendar (数字・時間)',
        text: 'Complete N5 number and time vocabulary:',
        bullets: [
          'Numbers: いち・に・さん・し・ご・ろく・しち・はち・きゅう・じゅう (1–10) | ひゃく (100) | せん (1,000) | まん (10,000)',
          'Time: いま (now), あした (tomorrow), きのう (yesterday), けさ (this morning), こんばん (tonight), まいにち (every day)',
          'Days: にちようび・げつようび・かようび・すいようび・もくようび・きんようび・どようび (Sun–Sat)',
          'Months: いちがつ～じゅうにがつ (January–December) | ねん (year) | つき (month) | にち (day)'
        ]
      },
      {
        heading: 'Category 3: Verbs (動詞) — N5 Core 80 Verbs',
        text: 'The 80 most essential N5 verbs with dictionary and masu forms:',
        bullets: [
          'Movement: いきます (go), きます (come), かえります (return home), のります (ride), おります (get off), あるきます (walk), はしります (run)',
          'Daily Actions: たべます (eat), のみます (drink), ねます (sleep), おきます (wake up), みます (watch/look), ききます (listen/hear), よみます (read)',
          'Work & Study: はたらきます (work), べんきょうします (study), かきます (write), はなします (speak), おしえます (teach), ならいます (learn)',
          'Purchase & Usage: かいます (buy), つかいます (use), あけます (open), しめます (close), きます (wear clothes), ぬぎます (take off clothes)'
        ]
      },
      {
        heading: 'Category 4: Adjectives (形容詞)',
        text: 'Core N5 adjectives — both i-adjectives (い形容詞) and na-adjectives (な形容詞):',
        bullets: [
          'Size & Amount: おおきい (big) | ちいさい (small) | おおい (many) | すくない (few) | ながい (long) | みじかい (short)',
          'Quality & State: あたらしい (new) | ふるい (old) | いい/よい (good) | わるい (bad) | むずかしい (difficult) | やさしい (easy/kind)',
          'Sensation: あつい (hot) | さむい (cold) | つめたい (cold to touch) | あたたかい (warm) | おいしい (delicious) | まずい (bad taste)',
          'Na-Adjectives: きれいな (beautiful/clean) | しずかな (quiet) | にぎやかな (lively) | べんりな (convenient) | だいじょうぶな (okay/safe)'
        ]
      },
      {
        heading: 'Category 5: Locations & Directions (場所・方向)',
        text: 'Essential location and direction vocabulary for N5 reading and listening:',
        bullets: [
          'Directions: みぎ (right) | ひだり (left) | まえ (front/ahead) | うしろ (behind) | うえ (above) | した (below) | なか (inside) | そと (outside)',
          'Places: がっこう (school) | びょういん (hospital) | えき (station) | スーパー (supermarket) | ゆうびんきょく (post office) | ぎんこう (bank)',
          'Transport: でんしゃ (train) | バス (bus) | タクシー (taxi) | ひこうき (airplane) | ふね (boat) | じてんしゃ (bicycle)'
        ]
      },
      {
        heading: 'Category 6: Grammar Pattern Quick Reference',
        text: 'The 30 most tested N5 grammar sentence endings and connectors:',
        bullets: [
          '～は～です (A is B): わたしは がくせいです (I am a student)',
          '～が あります/います (there is): つくえの うえに ほんが あります (There is a book on the desk)',
          '～て ください (please do): まどを あけてください (Please open the window)',
          '～たい です (want to): にほんへ いきたいです (I want to go to Japan)',
          '～ましょう (let\'s): いっしょに たべましょう (Let\'s eat together)',
          '～から (because): あめだから、うちにいます (Because it\'s raining, I\'m staying home)'
        ]
      }
    ],
    ctaText: 'Study with N5 Flashcards',
    ctaAction: 'JAPANESE'
  },

  // ── 90-Day JLPT N5 Study Schedule ──
  {
    id: 'jlpt-n5-study-plan',
    title: 'Official 90-Day JLPT N5 Study Schedule',
    category: 'SUPPORT',
    badge: '90-Day Plan',
    emoji: '📅',
    subtitle: 'Structured 90-day study roadmap for JLPT N5 from absolute beginner to exam-ready: daily targets, weekly milestones, mock test schedule, and final week revision plan.',
    sections: [
      {
        heading: 'Month 1 (Days 1–30): Foundation Building',
        text: 'Weeks 1–4 establish your core writing system knowledge and basic vocabulary.',
        bullets: [
          'Week 1 (Days 1–7): Master Hiragana (46 characters) completely — aim to read/write all 46 fluently by Day 7. Use LanguageGuru Hiragana Audio Matrix.',
          'Week 2 (Days 8–14): Master Katakana (46 characters) — focus on katakana loanwords you already know (コーヒー・バス・テレビ). Introduce 20 new N5 vocabulary words per day.',
          'Week 3 (Days 15–21): Begin N5 Kanji set 1 (Numbers 一二三四五六七八九十百千). Study Minna no Nihongo Lessons 1–5 grammar patterns.',
          'Week 4 (Days 22–30): N5 Kanji set 2 (日月火水木金土年). Study Minna no Nihongo Lessons 6–10. Start daily flashcard SRS practice (20 cards/day).',
          'Month 1 Target: All 92 Kana characters + 50 N5 Kanji + 200 vocabulary words + Lessons 1–10 grammar.'
        ]
      },
      {
        heading: 'Month 2 (Days 31–60): Grammar & Vocabulary Expansion',
        text: 'Weeks 5–8 focus on completing the core grammar patterns and expanding vocabulary to 600+ words.',
        bullets: [
          'Week 5 (Days 31–37): N5 Kanji set 3 (大小上下中左右). Minna no Nihongo Lessons 11–15. Grammar focus: particles に/で/へ/と.',
          'Week 6 (Days 38–44): N5 Kanji set 4 (山川海空花木). Minna no Nihongo Lessons 16–20. Grammar: ～てください、～たい、て-form connection.',
          'Week 7 (Days 45–51): N5 Kanji set 5 (人男女子父母). Minna no Nihongo Lessons 21–25. Grammar: い/な adjective conjugation.',
          'Week 8 (Days 52–60): First full JLPT N5 Mock Test. Review all incorrect answers. Begin N5 listening practice (20 min/day).',
          'Month 2 Target: 800 vocabulary words complete + all N5 grammar patterns + First mock test baseline score.'
        ]
      },
      {
        heading: 'Month 3 (Days 61–90): Exam Simulation & Revision',
        text: 'Weeks 9–12 focus entirely on timed practice, weak-area revision, and exam strategy.',
        bullets: [
          'Week 9 (Days 61–67): Take Mock Test #2 under strict timed conditions. Identify weakest grammar pattern — revise intensively.',
          'Week 10 (Days 68–74): Daily listening practice (30 min). Focus on N5 reading comprehension short texts. Kanji writing revision.',
          'Week 11 (Days 75–81): Take Mock Test #3. Target score: 80+ out of 180. Revise all Kanji one final time.',
          'Week 12 (Days 82–90): Light revision only. No new content. Sleep 8 hours nightly. Day 89: Pack documents (passport copy + exam ticket). Day 90: EXAM DAY!'
        ]
      },
      {
        heading: 'Daily Study Routine Template (1.5–2 Hours)',
        text: 'Consistency beats intensity. Follow this daily routine for maximum retention:',
        bullets: [
          '0:00–0:20 (20 min): SRS Flashcard Review — LanguageGuru flashcard app (Kanji + Vocabulary).',
          '0:20–0:50 (30 min): Grammar Study — 1 Minna no Nihongo lesson per day with practice sentences.',
          '0:50–1:20 (30 min): Listening Practice — JLPT N5 listening tracks at normal speed.',
          '1:20–1:40 (20 min): Reading Practice — Short N5-level texts from our mock tests.',
          '1:40–2:00 (20 min): Kanji Writing Practice — Write each new Kanji 5 times from memory.'
        ],
        callout: 'Study Tip: Even 30 minutes of daily focused study is more effective than 3-hour weekend cramming. Build the daily habit using LanguageGuru streak tracking.'
      }
    ],
    ctaText: 'Start N5 Mock Test Now',
    ctaAction: 'MOCK'
  },

  // ── 60-Day JFT-Basic Study Plan ──
  {
    id: 'jft-study-plan',
    title: 'Official 60-Day JFT-Basic Study Schedule (A2 Target)',
    category: 'SUPPORT',
    badge: '60-Day JFT Plan',
    emoji: '🗓',
    subtitle: 'Accelerated 60-day preparation plan targeting JFT-Basic 200/250 pass: Kana mastery, A2 vocabulary sprint, CBT practice strategy, and section-by-section exam tips.',
    sections: [
      {
        heading: 'Month 1 (Days 1–30): Kana Mastery & Core Vocabulary',
        text: 'The JFT-Basic exam uses kana-only text heavily — mastering Hiragana and Katakana is the #1 priority.',
        bullets: [
          'Days 1–7: Master all 46 Hiragana characters. Achieve reading speed of 2–3 characters per second.',
          'Days 8–14: Master all 46 Katakana characters. Practice common loanwords: テレビ・コーヒー・アパート・バス・スーパー・レストラン.',
          'Days 15–22: Learn 200 core JFT/A2 vocabulary words. Focus on: greetings, numbers, time expressions, transportation, shopping.',
          'Days 23–30: Learn 200 additional vocabulary words. Focus on: food, family, body parts, weather, workplace basic terms.',
          'First Mock Test: Take LanguageGuru JFT Easy Mock (28 Q) on Day 30. Target: 18+ correct (65%+).'
        ]
      },
      {
        heading: 'Month 2 (Days 31–60): CBT Practice & Exam Strategy',
        text: 'Month 2 shifts to full CBT format practice with all 4 section-locked modules.',
        bullets: [
          'Days 31–38: Complete JFT CBT Mock Test 1 (50 questions, full 4-section locked format). Review all errors.',
          'Days 39–45: Section focus — 読解 Reading. Practice short passage comprehension: signs, notices, timetables, memos.',
          'Days 46–52: Section focus — 聴解 Listening. Listen to JFT-style dialogues daily. Practice first-listen comprehension.',
          'Days 53–58: Complete JFT CBT Mock Test 2. Target: 200+/250 points. Final vocabulary review.',
          'Days 59–60: Light review only. Prepare documents. Confirm test center location. Rest well. EXAM READY!'
        ]
      },
      {
        heading: 'JFT-Basic Section-by-Section Exam Tips',
        text: 'Official strategies for maximizing points in each of the 4 CBT sections:',
        bullets: [
          'Section 1 (Script & Vocab): Read each option carefully — many wrong answers are similar-sounding kana combinations. Trust your ear, not just eye recognition.',
          'Section 2 (Conversation): Focus on the social context — who is speaking? What is the setting? Match the response tone (formal vs casual).',
          'Section 3 (Listening): Before the audio plays, read the question and all 4 options quickly. This primes your brain for target information.',
          'Section 4 (Reading): Scan for numbers, times, and key nouns first. For notices and signs, the answer is usually explicitly stated — no inference needed.'
        ],
        callout: 'Critical Rule: The CBT section lock is PERMANENT. Do not leave any question blank before submitting each section. Use elimination strategy — even a guess is better than 0 points.'
      }
    ],
    ctaText: 'Start JFT-Basic Practice',
    ctaAction: 'MOCK'
  }
];
