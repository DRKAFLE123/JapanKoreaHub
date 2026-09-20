# 📋 Project Task Backlog & Execution Roadmap (TASKS.md)

**Project:** JapanKoreaHub / LanguageGuru  
**Execution Strategy:** Sequential Milestones with Continuous Verification  
**Primary Developer / Lead:** Dr. Kafle ([@DRKAFLE123](https://github.com/DRKAFLE123))  
**Tracking Status:** In Active Production & Expansion  

---

## 1. Milestone Overview & Progress Tracker

```
Milestone Progress Dashboard
├── Phase 1: Core Foundation & Dual-Language Learning Engine   [100% COMPLETE] ✅
├── Phase 2: Timed Mock Exam Engine & Digital Certification    [100% COMPLETE] ✅
├── Phase 3: SSW Vocational Modules (Kaigo & Cleaning)         [100% COMPLETE] ✅
├── Phase 4: Community Hub, Social Features & Bookmarks        [ 85% IN PROGRESS] 🔄
├── Phase 5: Opportunities Portal (Jobs, Visas, Consultancy)   [ 75% IN PROGRESS] 🔄
├── Phase 6: Progressive Web App (PWA) & Offline Sync Engine   [ 30% PLANNED] ⏳
└── Phase 7: AI Speech Pronunciation & Conversation Tutor      [  0% FUTURE] 🔮
```

---

## 2. Granular Task Breakdown

### Phase 1: Core Foundation & Language Engine (COMPLETED)
| Task ID | Component | Description | Acceptance Criteria | Status |
|---|---|---|---|---|
| **TSK-101** | Database | Scaffold Prisma schema for User, Kanji, Vocabulary, and ReviewCard. | `prisma db push` succeeds on MySQL. | ✅ Done |
| **TSK-102** | Curriculum | Build Japanese dataset (Minna no Nihongo Lessons 1–75, N5–N3). | Full vocab with English & Nepali definitions in `lib/`. | ✅ Done |
| **TSK-103** | Curriculum | Build Korean EPS-TOPIK dataset (Lessons 1–60). | Full vocab with Hangul, romanization & translations. | ✅ Done |
| **TSK-104** | UI / Components | Implement interactive Kanji Radical Inspector modal with stroke SVG. | Radical breakdown displays color-coded radicals & mnemonics. | ✅ Done |
| **TSK-105** | SRS Engine | Implement SuperMemo SM-2 algorithm with Dexie.js IndexedDB. | Offline card reviews recalculate intervals accurately. | ✅ Done |
| **TSK-106** | Audio | Integrate Web Speech API text-to-speech for Japanese and Korean. | Native audio triggers on speaker button click. | ✅ Done |

---

### Phase 2: Mock Exam Simulator & Certification (COMPLETED)
| Task ID | Component | Description | Acceptance Criteria | Status |
|---|---|---|---|---|
| **TSK-201** | Exam Engine | Build 50-minute countdown exam simulator with question navigator grid. | Timer auto-submits on zero; questions can be flagged. | ✅ Done |
| **TSK-202** | Grading Engine | Serverless auto-grading API (`/api/exams/submit`) with instant feedback. | Calculates pass percentage (>= 70%) and returns review. | ✅ Done |
| **TSK-203** | Certificates | Generate tamper-proof digital certificates with unique UUID codes. | Public URL `/exams/certificate/[code]` renders valid badge. | ✅ Done |
| **TSK-204** | SSW Exams | Aggregate official SSW practice questions for Caregiving & Cleaning. | Multi-sector questions filterable by visa category. | ✅ Done |
| **TSK-205** | Database Certification | Connect ExamEngine to `/api/mock-tests/submit` and `/verify-certificate/[code]` pulling from MySQL DB. | Real ExamAttempt and Certificate records persisted & verified online. | ✅ Done |

---

### Phase 3: SSW Vocational Training & Caregiving (COMPLETED)
| Task ID | Component | Description | Acceptance Criteria | Status |
|---|---|---|---|---|
| **TSK-301** | Kaigo Textbook | Structured Caregiving textbook data in `lib/caregiving-book-data.ts`. | Lessons covering body mechanics, hygiene, meals & safety. | ✅ Done |
| **TSK-302** | Equipment UI | Interactive SVG diagrams (`CaregivingEquipmentDiagrams.tsx`). | Interactive hotspots for wheelchairs, care beds, lifts. | ✅ Done |
| **TSK-303** | Cleaning Guide | Building Cleaning operational manuals and chemical safety protocols. | Full terminology list with bilingual safety guidelines. | ✅ Done |
| **TSK-304** | Study Hub UX | Minimized Skill Test Study Hub header, direct main lessons landing, all-content syllabus modal navigator, removed redundant mock exam tab. | Direct lesson opening on click, omnipresent syllabus modal, clean tab slider. | ✅ Done |
| **TSK-305** | Mock Test Industry Filter | Added Industry / Sector filter dropdown and text search to ExamsHub mock test directory. | Dynamic filter across 8 SSW industries and 5 EPS sectors. | ✅ Done |
| **TSK-306** | Full vs Partial & JFT Listening | Added Full vs Partial sectional exam mode selector to pre-test modal and implemented authentic JFT-Basic Listening Practice Test 01 (12 Qs, 2 replays max, Nepali prompt toggle, hidden script, rich review). | Mode toggle, dynamic duration & question count, strict 2-play limit, audio transcript & vocab review. | ✅ Done |
| **TSK-307** | Mock Test Primary Route | Migrated exam route from `/[country]/exams` to `/[country]/mock-test` with automatic 307 redirect and updated navigation links. | `/[country]/mock-test` is primary route; `/[country]/exams` redirects cleanly. | ✅ Done |

---

### Phase 4: Community & Social Engagement Hub (IN PROGRESS)
| Task ID | Component | Description | Acceptance Criteria | Status |
|---|---|---|---|---|
| **TSK-401** | API | Build discussion post submission and retrieval API (`/api/community/posts`). | Authenticated users can create and view discussions. | ✅ Done |
| **TSK-402** | Security | Phone verification flow (`/api/community/verify-phone/route.ts`). | SMS OTP verification to deter spam posting. | ✅ Done |
| **TSK-403** | Social | Interactive Share Modal (`components/community/ShareModal.tsx`). | Multi-platform sharing (WhatsApp, Viber, Facebook, Copy). | ✅ Done |
| **TSK-404** | Bookmarks | User bookmarking API & UI (`/api/community/bookmark/route.ts`). | Fast toggle bookmark with local optimistic update. | ✅ Done |
| **TSK-405** | UI Polish | Live discussion room chat feeds and comment nesting. | Nested replies render cleanly with author badges. | 🔄 Active |

---

### Phase 5: Opportunities, Visas & Consultancy (IN PROGRESS)
| Task ID | Component | Description | Acceptance Criteria | Status |
|---|---|---|---|---|
| **TSK-501** | Booking API | Consultancy reservation pipeline (`/consultancy` & `ConsultancyBooking`). | Users can reserve 1-on-1 counselor slots. | ✅ Done |
| **TSK-502** | Notices Feed | Verified official embassy & EPS notices with pin badges (`/notices`). | Real-time bulletin with filter by country (Japan/Korea). | ✅ Done |
| **TSK-503** | Job Board | Verified employer vacancies for SSW and E-9 workers (`/jobs`). | Job cards with salary, location, and requirement filters. | 🔄 Active |
| **TSK-504** | Visa Guide | Step-by-step interactive visa document checklist (`/visa`). | Interactive progress tracker for applicant paperwork. | 🔄 Active |
| **TSK-505** | Life & Culture | Dedicated Culture & Etiquette hub with interactive quizzes (`/life` & `/[country]/life`). | Comprehensive Japanese & Korean cultural modules with interactive check. | ✅ Done |
| **TSK-506** | Coming Soon Standard | Reusable `ComingSoonModal` for roadmap features (PDF exports, WebRTC, AI speech). | Graceful roadmap UX with progress meter and notify subscription. | ✅ Done |

---

### Phase 6: PWA & Performance Optimization (PLANNED)
| Task ID | Component | Description | Acceptance Criteria | Status |
|---|---|---|---|---|
| **TSK-601** | PWA Manifest | Configure `manifest.json` and service worker for full offline caching. | Web app is installable on Android and iOS homescreens. | ⏳ Planned |
| **TSK-602** | Background Sync | Implement Dexie.js background sync queue via service workers. | Flashcard reviews sync automatically when reconnected. | ⏳ Planned |
| **TSK-603** | Push Alerts | Web Push notifications for daily SRS review reminders and exam notices. | Opt-in push subscription with scheduled daily reminder. | ⏳ Planned |

---

### Phase 7: AI Speaking Tutor & Advanced Features (FUTURE)
| Task ID | Component | Description | Acceptance Criteria | Status |
|---|---|---|---|---|
| **TSK-701** | Speech Rec | Web Speech Recognition API for Japanese & Korean pronunciation testing. | Evaluates user audio against target sentence phonemes. | 🔮 Future |
| **TSK-702** | AI Tutor | Conversational roleplay simulator (visa interview, job interview). | LLM-driven dialog simulator with grammar corrections. | 🔮 Future |

---

## 3. Protocol for AI Assistant Task Execution

When an AI assistant is assigned a task from this backlog:
1. **Identify Task ID**: Reference the specific Task ID (e.g., `TSK-405`).
2. **Review Affected Modules**: Check `ARCHITECTURE.md` and `RULES.md` to ensure architectural and styling compliance.
3. **Execute Without Stubs**: Implement complete, robust code with full error handling and type coverage.
4. **Update Status**: Update `TASKS.md` from `Active` to `Done` once verified.
5. **Log Memory**: Record any architectural decisions or gotchas in `MEMORY.md`.

---

## 4. Universal TASKS.md Framework for Upcoming Projects

For all upcoming projects:
- Maintain numbered milestones (Phases 1 to N).
- Use distinct Task IDs (e.g., `PRJ-101`, `PRJ-102`).
- Include explicit Acceptance Criteria for every task so completion is verifiable.
- Keep status indicators synchronized (`Done`, `Active`, `Planned`, `Blocked`).
