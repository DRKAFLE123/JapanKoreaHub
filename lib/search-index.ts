import Fuse from 'fuse.js';

export interface SearchItem {
  id: string;
  title: string;
  titleNe?: string;
  description: string;
  category: 'Learn' | 'Exam' | 'Visa' | 'Work' | 'Study' | 'Life' | 'Notice' | 'Consultancy';
  country: 'japan' | 'korea' | 'both';
  keywords: string[];
  href: string;
}

export const SEARCH_DATABASE: SearchItem[] = [
  // ── JAPAN LEARN & EXAMS ──
  {
    id: 'jp-kana-basics',
    title: 'Hiragana & Katakana Basics',
    titleNe: 'हिरागाना र काताकाना आधारभूत',
    description: 'Learn Japanese alphabet, pronunciation and stroke order',
    category: 'Learn',
    country: 'japan',
    keywords: ['hiragana', 'katakana', 'alphabet', 'kana', 'basics', 'listening', 'pronunciation'],
    href: '/japan/learn/basics',
  },
  {
    id: 'jp-vocab-explorer',
    title: 'Minna no Nihongo Vocabulary (Lessons 1-75)',
    titleNe: 'मिन्ना नो निहोन्गो शब्दभण्डार (पाठ १-७५)',
    description: 'Explore full Japanese vocabulary with audio, English and Nepali meanings',
    category: 'Learn',
    country: 'japan',
    keywords: ['minna no nihongo', 'vocabulary', 'words', 'n5', 'n4', 'n3', 'meanings'],
    href: '/japan/learn/vocabulary',
  },
  {
    id: 'jp-kanji-srs',
    title: '1,000 Kanji Cards & Radicals',
    titleNe: '१,००० कान्जी र रेडिकल breakdown',
    description: 'Kanji flashcards with SRS algorithm, onyomi, kunyomi and radical breakdowns',
    category: 'Learn',
    country: 'japan',
    keywords: ['kanji', 'srs', 'flashcards', 'radicals', 'onyomi', 'kunyomi', 'n5 kanji', 'n4 kanji'],
    href: '/japan/learn/kanji',
  },
  {
    id: 'jp-jlpt-n5',
    title: 'JLPT N5 Mock Test & Preparation',
    titleNe: 'JLPT N5 मोक टेस्ट र परीक्षा तयारी',
    description: 'Full timed JLPT N5 exam engine with vocabulary, grammar, and listening sections',
    category: 'Exam',
    country: 'japan',
    keywords: ['jlpt n5', 'exam', 'mock test', 'n5 pass marks', 'n5 test', 'n5 simulator'],
    href: '/japan/exams/jlpt-n5',
  },
  {
    id: 'jp-jlpt-n4',
    title: 'JLPT N4 Mock Test & Preparation',
    titleNe: 'JLPT N4 मोक टेस्ट र परीक्षा तयारी',
    description: 'Full timed JLPT N4 exam engine with auto-grading',
    category: 'Exam',
    country: 'japan',
    keywords: ['jlpt n4', 'n4 exam', 'n4 mock test'],
    href: '/japan/exams/jlpt-n4',
  },
  {
    id: 'jp-jft-basic',
    title: 'JFT-Basic CBT Exam Simulator',
    titleNe: 'JFT-Basic CBT कम्प्यूटर परीक्षा सिमुलेटर',
    description: 'Computer Based Test simulator for SSW Working Visa in Japan',
    category: 'Exam',
    country: 'japan',
    keywords: ['jft basic', 'ssw exam', 'cbt test', 'japan worker exam'],
    href: '/japan/exams/jft-basic',
  },

  // ── JAPAN VISA & WORK ──
  {
    id: 'jp-visa-ssw',
    title: 'Japan SSW Working Visa Guide',
    titleNe: 'जापान SSW वर्किङ भिसा गाइड',
    description: 'Specified Skilled Worker (SSW-1) requirements, skill evaluation tests, and visa process',
    category: 'Visa',
    country: 'japan',
    keywords: ['ssw visa', 'specified skilled worker', 'japan work visa', 'tokutei ginou', 'ssw nepal'],
    href: '/japan/visa/ssw',
  },
  {
    id: 'jp-ssw-kaigo',
    title: 'SSW Kaigo (Caregiving) Skill Test Study Hub',
    titleNe: 'जापान काइगो (Caregiving) परीक्षा र अध्ययन म्यानुअल',
    description: 'Official MHLW PDF textbooks, nursing vocabulary, audio listening drills, and CBT mock exam',
    category: 'Work',
    country: 'japan',
    keywords: ['kaigo', 'caregiving', 'ssw kaigo', 'kaigo textbook', 'nursing japan', 'kaigo listening'],
    href: '/japan/work/nursing',
  },
  {
    id: 'jp-ssw-building-cleaning',
    title: 'SSW Building Cleaning Skill Test Study Hub',
    titleNe: 'जापान बिल्डिङ सरसफाइ (Building Cleaning) अध्ययन गाइड',
    description: 'Official JBMA textbooks, equipment vocabulary, chemical dilution safety, listening drills & exam',
    category: 'Work',
    country: 'japan',
    keywords: ['building cleaning', 'ssw cleaning', 'polisher', 'chemical safety', 'cleaning textbook'],
    href: '/japan/work/building_cleaning',
  },
  {
    id: 'jp-ssw-construction',
    title: 'SSW Construction (Kensetsu) Skill Test Study Hub',
    titleNe: 'जापान निर्माण (Construction) सुरक्षा तथा परीक्षा म्यानुअल',
    description: 'Official JAC construction handbook, site safety commands, KYK hazard prediction, and listening drills',
    category: 'Work',
    country: 'japan',
    keywords: ['construction japan', 'ssw construction', 'kensetsu', 'scaffolding', 'safety harness', 'kyk hazard'],
    href: '/japan/work/construction',
  },
  {
    id: 'jp-ssw-food-service',
    title: 'SSW Food Service (Gaishoku) Skill Test Study Hub',
    titleNe: 'जापान रेस्टुरेन्ट (Food Service) फुड हाइजिन र म्यानुअल',
    description: 'OTAFF training manual, HACCP food hygiene, allergen safety, customer service Japanese & CBT drills',
    category: 'Work',
    country: 'japan',
    keywords: ['food service japan', 'gaishoku', 'otaff', 'haccp', 'restaurant japanese', 'food safety'],
    href: '/japan/work/food_service',
  },
  {
    id: 'jp-ssw-agriculture',
    title: 'SSW Agriculture (Nougyou) Skill Test Study Hub',
    titleNe: 'जापान कृषि (Agriculture) म्यानुअल र परीक्षा तयारी',
    description: 'JA agriculture training handbook, crop cultivation terms, tractor safety audio drills & exam',
    category: 'Work',
    country: 'japan',
    keywords: ['agriculture japan', 'ssw agriculture', 'nougyou', 'greenhouse', 'tractor safety', 'ja manual'],
    href: '/japan/work/agriculture',
  },

  // ── KOREA LEARN & EXAMS ──
  {
    id: 'kr-hangul-basics',
    title: 'Hangul Consonants & Vowels Matrix',
    titleNe: 'हाङ्गुल व्यञ्जन र स्वर वर्ण सिक्नुहोस्',
    description: 'Master Korean alphabet (Hangul) with audio Matrix and stroke order',
    category: 'Learn',
    country: 'korea',
    keywords: ['hangul', 'korean alphabet', 'basics', 'consonants', 'vowels', 'audio'],
    href: '/korea/learn/basics',
  },
  {
    id: 'kr-eps-topik-vocab',
    title: 'EPS-TOPIK Vocabulary (Lessons 1-60)',
    titleNe: 'EPS-TOPIK शब्दभण्डार (पाठ १-६०)',
    description: 'Official EPS-TOPIK textbook 60 lessons vocabulary with audio & Nepali translation',
    category: 'Learn',
    country: 'korea',
    keywords: ['eps topik', 'eps vocabulary', 'lessons 1-60', 'korean words nepali', 'eps textbook'],
    href: '/korea/learn/vocabulary',
  },
  {
    id: 'kr-eps-topik-exam',
    title: 'EPS-TOPIK CBT Exam Engine',
    titleNe: 'EPS-TOPIK CBT परीक्षा सिमुलेटर',
    description: 'Timed CBT simulator for EPS-TOPIK exam (Manufacturing, Agriculture, Construction)',
    category: 'Exam',
    country: 'korea',
    keywords: ['eps topik exam', 'eps mock test', 'eps cbt', 'korea work exam', 'eps nepal'],
    href: '/korea/exams/eps-topik',
  },
  {
    id: 'kr-topik-1',
    title: 'TOPIK I (Level 1 & 2) Exam Prep',
    titleNe: 'TOPIK I परीक्षा तयारी',
    description: 'Official TOPIK I reading and listening practice test',
    category: 'Exam',
    country: 'korea',
    keywords: ['topik 1', 'topik level 1', 'topik level 2', 'korean proficiency'],
    href: '/korea/exams/topik-1',
  },
  {
    id: 'kr-kiip-exam',
    title: 'KIIP (사회통합프로그램) Full Overview & Exam Prep',
    titleNe: 'KIIP (सामाजिक एकीकरण कार्यक्रम) पूर्ण गाइड र परीक्षा',
    description: 'Ministry of Justice immigration program levels 0-5, placement exam, midterm, and comprehensive test',
    category: 'Exam',
    country: 'korea',
    keywords: ['kiip', '사회통합프로그램', 'socinet', 'immigration program', 'kiip exam', 'f-5 pr', 'e-7-4 points', 'topik vs kiip'],
    href: '/korea/exams/kiip',
  },
  {
    id: 'kr-topik-strategy-6month',
    title: '6-Month TOPIK II Level 3 Strategy Guide',
    titleNe: '० देखि TOPIK II Level 3 सम्म ६-महिने रणनीति',
    description: 'Full-time study roadmap from beginner to TOPIK II Level 3 with Nepali explanations and Q53 graph templates',
    category: 'Exam',
    country: 'korea',
    keywords: ['topik strategy', 'topik level 3', '6 month topik', 'topik writing', 'q53 essay'],
    href: '/blog/topik-ii-level-3-6-month-strategy-nepali-guide',
  },
  {
    id: 'kr-kiip-blog-nepali',
    title: 'KIIP (사회통합프로그램) Visa & PR Guide (Nepali)',
    titleNe: 'कोरियाली भिसा (E-7-4, F-2-7), PR (F-5) र KIIP पूर्ण गाइड',
    description: 'Complete guide on KIIP levels, Socinet portal registration, exam waivers, and TOPIK vs KIIP comparison',
    category: 'Visa',
    country: 'korea',
    keywords: ['kiip nepali', 'socinet registration', 'f5 permanent residence', 'e74 visa', 'f27 visa'],
    href: '/blog/kiip-korea-immigration-integration-program-nepali-guide',
  },

  // ── KOREA VISA & WORK ──
  {
    id: 'kr-visa-e9',
    title: 'Korea E-9 Visa (EPS Worker) Guide',
    titleNe: 'कोरिया E-9 भिसा (EPS रोजगार) गाइड',
    description: 'EPS employment process, medical checkup, CCVI, and arrival in Korea',
    category: 'Visa',
    country: 'korea',
    keywords: ['e9 visa', 'eps visa', 'korea worker visa', 'eps process nepal'],
    href: '/korea/visa/e9',
  },
  {
    id: 'kr-visa-student',
    title: 'Korea Student Visa (D-2 / D-4) Guide',
    titleNe: 'कोरिया विद्यार्थी भिसा (D-2 / D-4) गाइड',
    description: 'University admission, GKS scholarship, bank statement, and D-2/D-4 visa guide',
    category: 'Visa',
    country: 'korea',
    keywords: ['korea student visa', 'd2 visa', 'd4 visa', 'gks scholarship', 'study in korea'],
    href: '/korea/visa/student',
  },

  // ── CONSULTANCY ──
  {
    id: 'consultancy-booking',
    title: '1-on-1 Visa & Education Counseling',
    titleNe: '१-मा-१ भिसा र शिक्षा परामर्श',
    description: 'Book a session with expert counselors for Japan or Korea visa & interview prep',
    category: 'Consultancy',
    country: 'both',
    keywords: ['consultancy', 'counseling', 'visa interview prep', 'sop review', 'document review'],
    href: '/consultancy',
  },
];

const fuseOptions = {
  keys: [
    { name: 'title', weight: 0.4 },
    { name: 'titleNe', weight: 0.3 },
    { name: 'keywords', weight: 0.2 },
    { name: 'description', weight: 0.1 },
  ],
  threshold: 0.4,
  ignoreLocation: true,
};

const fuseInstance = new Fuse(SEARCH_DATABASE, fuseOptions);

export function searchPlatform(query: string): SearchItem[] {
  if (!query || query.trim() === '') return [];
  const results = fuseInstance.search(query);
  return results.map(r => r.item);
}
