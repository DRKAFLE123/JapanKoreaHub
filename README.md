# 🌐 JakonHub — Japanese & Korean Language Learning Platform

> A premium, full-stack language learning platform for mastering **JLPT Japanese (N5 → N3)** and **Korean (EPS-TOPIK / TOPIK)** — built with Next.js 16, TypeScript, MySQL, and modern SRS-powered flashcard technology.

[![Deploy on Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/DRKAFLE123/JakonHub)
[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-orange?style=flat-square&logo=mysql)](https://www.mysql.com/)

---

## ✨ Features

### 🇯🇵 Japanese Learning System (JLPT N5 → N3)
- **Curriculum Tabs**: Organized Minna no Nihongo Lessons 1–75 (N5, N4, N3) with lesson titles and topics
- **Vocabulary Explorer**: Complete vocabulary per lesson with English & Nepali meanings
- **Clickable Kanji Inspector**: Click any Kanji chip to view:
  - Onyomi (音読み) / Kunyomi (訓読み) readings
  - Radical breakdown with visual color-coding
  - Stroke count & compound words
- **Kanji Radical Breakdown & Mnemonic Visualizer**: Character structural decomposition with English/Nepali mnemonics
- **Grammar Guides in English & Nepali**: Lesson-by-lesson grammar explanation (व्याकरण व्याख्या)
- **SRS Flashcard System**: SM-2 Spaced Repetition (Anki ratings: Again / Hard / Good / Easy)
- **Audio TTS Pronunciation**: Native browser text-to-speech for Japanese phrases

### 🇰🇷 Korean Learning System (EPS-TOPIK / TOPIK)
- **60 EPS-TOPIK Lessons**: Complete lesson structure from Lesson 1 to Lesson 60
- **Korean Vocabulary** with Hangul, romanization, English & Nepali translation
- **Korean Grammar Guides**: Lesson-by-lesson in English & Nepali
- **Korean SRS Flashcards**: SM-2 algorithm flashcard system with TTS

### 🧪 Mock Exam Engine
- **JLPT Mock Exams**: N5, N4, N3, N2 level-filtered questions
- **Korean Mock Exams**: EPS, TOPIK 2, 3, 4 level-filtered questions
- **Timed Exam Simulator**: 50-minute countdown with anti-cheat validation
- **Auto-Grading & Explanations**: Instant score + per-question explanation
- **Question Navigator Grid**: Track answered / flagged / unanswered questions

### 🎖️ Certificate System
- Auto-generate certificates for completed exams
- Unique certificate verification via shareable URL

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 16 (App Router)** | Full-stack framework |
| **TypeScript 5.4** | Type safety |
| **MySQL + Prisma ORM** | Remote database |
| **Tailwind CSS v4** | Utility-first styling |
| **Lucide React** | Icons |
| **Dexie.js (IndexedDB)** | Offline-first flashcard storage |
| **SM-2 SRS Algorithm** | Spaced repetition learning |
| **Web Speech API** | TTS Pronunciation |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MySQL 8.0 or compatible (local or remote)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/DRKAFLE123/JakonHub.git
cd JakonHub

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env with your database credentials

# 4. Generate Prisma client
npm run prisma:generate

# 5. Push database schema
npm run prisma:push

# 6. Run development server
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
# Database Connection
DATABASE_URL="mysql://username:password@host:3306/damodark_languageGuru"
DB_HOST=your_host
DB_PORT=3306
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=damodark_languageGuru

# App
NEXTAUTH_SECRET=your_secret_here
NEXTAUTH_URL=http://localhost:3000
```

> ⚠️ **Never commit your `.env` file.** It is already in `.gitignore`.

---

## 📦 Deploying to Vercel

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/DRKAFLE123/JakonHub)

### Manual Deployment

1. Push this repository to GitHub: `https://github.com/DRKAFLE123/JakonHub.git`
2. Go to [vercel.com](https://vercel.com) → **New Project** → Import your repository
3. Set Environment Variables in the Vercel Dashboard (same as `.env`):
   - `DATABASE_URL`
   - `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`
   - `NEXTAUTH_SECRET`, `NEXTAUTH_URL`
4. Click **Deploy**

> **Note**: If using a remote MySQL database, ensure your host's firewall allows connections from Vercel's IP range, or use PlanetScale / Supabase for serverless-compatible MySQL.

---

## 📁 Project Structure

```
JakonHub/
├── app/
│   ├── page.tsx               # Main app page with language tab selector
│   ├── layout.tsx             # Root layout
│   └── api/
│       ├── kanji/             # Kanji API routes
│       ├── vocab/             # Vocabulary API routes
│       ├── alphabets/         # Alphabet API routes
│       └── srs/               # SRS review API routes
├── components/
│   ├── VocabularyExplorer.tsx     # Japanese vocabulary with clickable Kanji
│   ├── KoreanVocabularyExplorer.tsx  # Korean vocabulary explorer
│   ├── FlashcardCard.tsx          # Japanese SRS flashcard
│   ├── KoreanFlashcardCard.tsx    # Korean SRS flashcard
│   ├── RadicalBreakdown.tsx       # Kanji radical decomposition
│   ├── TimedExamEngine.tsx        # Mock exam simulator
│   ├── AlphabetGrid.tsx           # Hiragana / Katakana grid
│   └── KanjiGrid.tsx              # Kanji display grid
├── lib/
│   ├── nihongo-vocab.ts           # Japanese vocab dataset (N5, N4, N3)
│   ├── korean-vocab.ts            # Korean vocab dataset (60 EPS-TOPIK lessons)
│   ├── grammar-guide.ts           # Grammar guide (English + Nepali)
│   ├── kanji-dataset.ts           # Kanji character database
│   ├── srs-engine.ts              # SM-2 SRS algorithm
│   └── db.ts                      # MySQL database client
├── prisma/
│   └── schema.prisma              # Database schema
├── .env                           # Environment variables (not committed)
├── .env.example                   # Example environment template
└── README.md
```

---

## 🎯 Roadmap

- [ ] N2 & N1 JLPT Vocabulary
- [ ] TOPIK 5 & 6 Korean Advanced Level
- [ ] PDF Certificate Download
- [ ] Progress Tracking Dashboard
- [ ] Community Vocabulary Contributions
- [ ] Spaced Repetition Analytics Chart

---

## 📖 License

MIT License — see [LICENSE](LICENSE) for details.

---

## 👤 Author

**Dr. Kafle** — [@DRKAFLE123](https://github.com/DRKAFLE123)

> Built for Nepali language learners pursuing Japanese & Korean language proficiency.
