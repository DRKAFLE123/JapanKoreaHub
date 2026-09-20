# 🧠 Persistent Project Memory & Context Log (MEMORY.md)

**Project Name:** JapanKoreaHub (Codebase: `LanguageGuru`)  
**Lead Developer:** Dr. Kafle ([@DRKAFLE123](https://github.com/DRKAFLE123))  
**Deployment:** Vercel + Remote MySQL 8.0  
**Repository:** `DRKAFLE123/LanguageGuru` (also known as `JapanKoreaHub`)  
**Created:** September 2026  
**Purpose:** Persistent long-term context log, architectural decision records (ADRs), and critical gotchas across AI sessions.

---

## 1. Project Profile & Core Facts

- **What it is:** A comprehensive full-stack ecosystem for Nepali & South Asian aspirants preparing for language exams (JLPT N5–N3, Korean EPS-TOPIK) and vocational careers (SSW Caregiving, Building Cleaning, E-9 work, Student Visas) in Japan and South Korea.
- **Core Technology Stack:**
  - Next.js 16 (App Router) + React 19 + TypeScript 5.4
  - Tailwind CSS v4 (with custom `@theme` variables for Japan `#C62828` and Korea `#1565C0`)
  - Prisma ORM 5.22 + MySQL 8.0 (connected via `mysql2`)
  - Client-side IndexedDB via `dexie` v4 for offline SRS flashcards and caching
  - `framer-motion` for fluid micro-interactions and modal transitions
  - Browser native `Web Speech API` for Japanese & Korean text-to-speech audio

---

## 2. Architectural Decision Records (ADRs)

### ADR-001: Next.js 16 App Router with React Server Components
- **Decision:** Build the platform using the Next.js 16 App Router architecture rather than the legacy Pages router or a separate SPA frontend.
- **Rationale:** Facilitates instant server rendering for SEO-critical curriculum and guide pages, streaming for fast initial page load, and collocated serverless API route handlers under `app/api/`.

### ADR-002: Dual Database Strategy (Prisma MySQL + Dexie.js IndexedDB)
- **Decision:** Utilize remote MySQL 8.0 via Prisma for authoritative user accounts, exams, and certifications, while using Dexie.js in the browser for offline flashcard decks and state caching.
- **Rationale:** Students in Nepal and South Asia frequently encounter unstable internet connections. Local IndexedDB ensures smooth, zero-latency daily flashcard reviews, syncing back to MySQL when online.

### ADR-003: Modified SuperMemo SM-2 for Spaced Repetition
- **Decision:** Implement SM-2 algorithm (`lib/srs-engine.ts`) with 4 rating buttons (*Again*, *Hard*, *Good*, *Easy*).
- **Rationale:** Standardized, battle-tested algorithm identical to Anki that optimizes vocabulary retention without reinventing memory curves.

### ADR-004: Native Web Speech API over Cloud TTS Services
- **Decision:** Use the browser's built-in `window.speechSynthesis` with `ja-JP` and `ko-KR` language tags rather than Google Cloud / AWS Polly API.
- **Rationale:** Zero recurring API bills, zero audio latency, and works offline without downloading heavy MP3 payloads.

### ADR-005: Bilingual Localization (English + Nepali Devanagari)
- **Decision:** Every vocabulary entry, grammar breakdown, and caregiving manual must provide explanations in both English and Nepali (`Noto Sans Devanagari`).
- **Rationale:** Vastly accelerates comprehension for candidates who find pure English explanations difficult when learning complex Japanese or Korean grammar.

### ADR-006: Proprietary Content Protection & Native Mobile UX
- **Decision:** Apply `.content-watermark` and `-webkit-user-select: none` across core curriculum layouts while strictly allowing text selection in form fields (`input`, `textarea`). Implement a dedicated mobile bottom navigation bar (`.bottom-tab-bar`) that is strictly hidden on desktop (`md:hidden`).
- **Rationale:** Protects thousands of hours of curated curriculum from automated scrapers while delivering a slick native mobile app feel.

### ADR-007: Direct Vocational SSW Modules (Caregiving & Building Cleaning)
- **Decision:** Build interactive visual diagrams (`CaregivingEquipmentDiagrams.tsx`) and sector-specific exam datasets directly into the platform.
- **Rationale:** SSW (Specified Skilled Worker) is one of the highest-volume visa categories for Nepali workers in Japan; visual diagrams bridge technical equipment gaps.

### ADR-008: Skill Test Study Hub Direct-Lesson Landing & Omnipresent Syllabus Modal
- **Decision:** Minimized the bulky 400px sector hero card into a sleek, compact metadata bar. When users click into a Sector Study Hub (`/[country]/work/[sector]`), land directly on the 12-chapter interactive curriculum reader (`activeTab: 'book'`). Provide "Overview & Syllabus" as an omnipresent modal with an all-content navigation manager. Removed the redundant CBT Mock Exams tab from the slider since the top header action button already links directly to the exam engine.
- **Rationale:** Reduces cognitive load, eliminates unnecessary vertical scrolling, avoids redundant navigation loops, and puts primary learning content front and center.

### ADR-010: Full vs. Partial Mock Test Mode & JFT-Basic Listening CBT Engine
- **Decision:** Integrated a dual test mode toggle (`🎯 Full Mock Test` vs `🧩 Partial / Custom Sections`) directly inside the pre-test confirmation modal. Users can select any combination of sections (Listening, Reading, Vocabulary, Grammar) with real-time recalculation of duration and question counts. Implemented an authentic Prometric CBT listening engine (`lib/jft-listening-data.ts`) with a strict 2-play limit, hidden scripts during exam mode, expandable Nepali "Your Language" question toggles, clean Japanese choices, and comprehensive post-submission review modes (audio transcripts, full Nepali translations, and vocabulary tables with kanji/readings).
- **Rationale:** Faithfully matches official Prometric and JLPT examination standards while providing tailored sectional practice for learners targeting specific weaknesses.

### ADR-011: Migration of Primary Exam Route to `/[country]/mock-test`
- **Decision:** Migrated the main exam directory from `/[country]/exams` to `/[country]/mock-test` (and sub-routes `/[country]/mock-test/[exam]` and `/[country]/mock-test/skills`). Configured `/[country]/exams` to automatically redirect to `/[country]/mock-test` to preserve backward compatibility.
- **Rationale:** Provides cleaner, more descriptive semantic URLs aligned with user intent and standard CBT nomenclature.

---

## 3. Critical Technical Quirks & Anti-Patterns to Avoid

1. **Hydration Mismatch in Multilingual Fonts / Client State:**
   - Always ensure components reading from `window`, `localStorage`, or client-side Dexie wait for a `mounted` state before rendering user-specific data.
2. **Tailwind CSS v4 Configuration:**
   - Tailwind v4 does not rely primarily on `tailwind.config.js` for colors; styles are unified in `app/globals.css` using CSS custom properties (`--accent-jp`, `--accent-kr`, `--surface`). Do not hardcode raw hex values in components.
3. **Prisma Connection Pooling in Serverless:**
   - Never write `const prisma = new PrismaClient()` directly in API route files. Always import `db` from `lib/db.ts` to prevent exhaustion of MySQL database connection limits.
4. **Mobile Bottom Tab Bar Visibility:**
   - `.bottom-tab-bar` must ALWAYS have `md:hidden` / `display: none` above `768px`. Desktop users must use the top navbar.
5. **Form Field Text Selection:**
   - If adding custom CSS that restricts text selection, ensure `input, textarea, [contenteditable="true"]` retain `-webkit-user-select: text !important;` so users can type and edit freely.

---

## 4. Current Workstream & Active State

  - `app/api/notices/route.ts`: Dynamic notice retrieval and auto-seeding with singleton database instance.
  - `app/api/consultancy/bookings/route.ts`: Database persistence for consultancy bookings.
  - `app/api/mock-tests/submit/route.ts`: Full MySQL persistence for ExamAttempt and Certificate models.
  - `app/api/verify-certificate/[code]/route.ts`: Real database lookup for certificate verification.
  - `app/verify-certificate/[code]/page.tsx`: Server-rendered certificate verification page pulling from MySQL.
  - `components/TimedExamEngine.tsx`: Connected to backend exam submission API, rendering real certificate badge.
  - `components/ui/ComingSoonModal.tsx`: Polished modal for unbuilt/roadmap features (PDF export, speech evaluation).
- **Active Focus:** Production-ready database integration, dynamic database content loading, and Coming Soon handling for unbuilt features.

---

## 5. Universal MEMORY.md Template for Upcoming Projects

When creating a new project, maintain this memory structure:
1. **Core Facts**: Project scope, owner, tech stack, live URLs.
2. **ADR Log**: Document every key choice (why X was picked over Y) to prevent future regression.
3. **Quirks & Gotchas**: Record repository-specific bugs, workarounds, and anti-patterns.
4. **Active State**: Keep a rolling log of recent files modified and next immediate priorities.
