export interface BlogPost {
  id: string;
  title: string;
  category: 'VACANCY' | 'VISA' | 'EXAM' | 'GUIDE';
  country: 'JAPAN' | 'KOREA' | 'GLOBAL';
  author: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string;
  location?: string;
  salary?: string;
  quota?: string;
  deadline?: string;
  requirement?: string;
  tags: string[];
  isFeatured?: boolean;
}

export const INITIAL_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    title: '📢 Japan SSW Nursing Care & Food Service Recruitment 2026 (Tokyo & Osaka)',
    category: 'VACANCY',
    country: 'JAPAN',
    author: 'Japan Korea Academy Desk',
    date: 'July 28, 2026',
    readTime: '3 min read',
    location: 'Tokyo & Osaka, Japan',
    salary: '215,000 JPY – 250,000 JPY / Month',
    quota: '65 Openings',
    deadline: 'August 25, 2026',
    requirement: 'JLPT N4 or JFT-Basic (200+ Pts) + Prometric Nursing Skill Test Pass',
    excerpt: 'Official hiring announcement for 65 Specified Skilled Workers (SSW 1) in elderly care facilities and food processing plants across Tokyo and Osaka. Full visa support provided.',
    content: `### 🇯🇵 Official Employer Recruitment Announcement (SSW 1)

Leading Japanese healthcare organizations and food manufacturing groups in Tokyo and Osaka are now accepting applications for **65 Specified Skilled Worker (SSW 1)** candidate positions.

#### 📋 Job Breakdown & Salary Package
- **Base Monthly Salary**: 215,000 JPY to 250,000 JPY (commensurate with skill level).
- **Overtime Pay**: 1.25x standard rate (approx. 30,000 JPY additional per month).
- **Housing Subsidized**: Employer-provided apartment (Rent subvention up to 50%).
- **Social Insurance**: Full health insurance, pension, and employment insurance covered.

#### 🎯 Candidate Requirements
1. **Language Qualification**: JLPT N4 or JFT-Basic CBT Exam Score 200/250.
2. **Prometric Skill Test**: Passed Nursing Care Skill Evaluation Test OR Food Service Skill Test.
3. **Age & Passport**: Valid international passport with at least 18 months validity.

#### 📝 How to Apply
Eligible candidates can submit their official resume, JLPT/JFT certificate, and Prometric score card through LanguageGuru career portal. Selected candidates will be invited for direct Zoom interviews with Japanese employers.`,
    tags: ['SSW 1', 'Nursing Care', 'Tokyo Jobs', 'Prometric Pass'],
    isFeatured: true
  },
  {
    id: 'post-2',
    title: '🇰🇷 HRD Korea EPS-TOPIK Manufacturing & Agriculture Roster Call 2026',
    category: 'VACANCY',
    country: 'KOREA',
    author: 'EPS Korea Desk',
    date: 'July 25, 2026',
    readTime: '4 min read',
    location: 'Incheon & Gyeonggi-do, South Korea',
    salary: '2,060,000 KRW / Month (Base + Overtime)',
    quota: '120 Vacancies',
    deadline: 'September 10, 2026',
    requirement: 'Passed EPS-TOPIK Exam (160+ Pts) & Physical Skill Test',
    excerpt: 'HRD Korea releases the new job application roster call for 120 E-9 manufacturing and agricultural work contracts in Gyeonggi-do.',
    content: `### 🇰🇷 HRD Korea Employment Permit System (E-9) Roster Call

Ministry of Employment and Labor (MOEL) Korea and HRD Korea have published the 3rd quarter roster issuance schedule for successful EPS-TOPIK candidate roster matching.

#### 💼 Offer Terms & Allowance
- **Minimum Wage Scale**: 2,060,000 KRW/month (Korean Statutory Minimum Wage 2026).
- **Contract Duration**: 3 Years initial stay + 1 Year 10 Months automatic extension (Total 4 Years 10 Months continuous work permit).
- **Dormitory & Meals**: Provided by manufacturing plants.

#### 📌 Submission Guidelines
Candidate applicants registered on the active roster must verify their medical report status and valid passport details with the Department of Foreign Employment before contract allocation.`,
    tags: ['EPS-TOPIK', 'E-9 Visa', 'HRD Korea', 'Manufacturing'],
    isFeatured: true
  },
  {
    id: 'post-3',
    title: '💼 Japan Immigration Expands Specified Skilled Worker (SSW 2) Permanent Residency Rules',
    category: 'VISA',
    country: 'JAPAN',
    author: 'Immigration Legal Advisory',
    date: 'July 20, 2026',
    readTime: '5 min read',
    excerpt: 'Japanese Ministry of Justice approves expanded SSW 2 category pathways, permitting indefinite visa renewals and family relocation for skilled foreign workers.',
    content: `### ⚖️ Japanese Immigration Policy Reform Overview

The Japanese Cabinet has officially expanded the **Specified Skilled Worker (SSW 2)** visa status across 11 major industrial sectors.

#### 🌟 Key Policy Highlights
- **Family Dependent Visas**: SSW 2 visa holders are now permitted to bring their spouse and children to live in Japan.
- **Path to Permanent Residency**: Years spent under SSW 2 count directly toward the 10-year residency requirement for Japanese Permanent Residency (PR).
- **Indefinite Renewal**: Visa status can be renewed indefinitely every 1 to 3 years without compulsory return to home country.`,
    tags: ['SSW 2', 'Permanent Residency', 'Japan Visa Policy', 'Family Visa'],
    isFeatured: false
  },
  {
    id: 'post-4',
    title: '🎓 Prometric JFT-Basic & Nursing CBT Exam Slots Opening in Nepal & Philippines',
    category: 'EXAM',
    country: 'JAPAN',
    author: 'Prometric Test Update',
    date: 'July 15, 2026',
    readTime: '2 min read',
    excerpt: 'Prometric Japan announces new CBT test booking slots for August and September 2026 across Kathmandu, Manila, and Cebu centers.',
    content: `### 📅 CBT Test Booking Schedule Release

Prometric Japan will open online registration for upcoming **JFT-Basic** and **Nursing Care Skill Evaluation** computer-based testing (CBT) slots.

#### 🏢 Test Center Locations
- **Nepal**: Kathmandu Prometric CBT Center (Baneshwor).
- **Philippines**: Manila & Cebu Testing Hubs.

#### ⚠️ Important Notice
Seats fill up within minutes of slot opening. Candidates are advised to create their Prometric ID and verify passport details prior to registration day.`,
    tags: ['Prometric CBT', 'JFT-Basic', 'Kathmandu Exam', 'Registration'],
    isFeatured: false
  }
];
