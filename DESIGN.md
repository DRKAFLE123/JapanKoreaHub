# 🎨 UI/UX Design System & Specifications (DESIGN.md)

**Product Name:** JapanKoreaHub / LanguageGuru  
**Design Philosophy:** Culturally Grounded, Mobile-First, High-Utility, Premium Polish  
**Theme Support:** Light Mode (Default) & Sleek Dark Mode (`.dark`)  
**Design System Version:** 2.0 (Tailwind CSS v4 + Custom Tokens)  

---

## 1. Design Philosophy & Aesthetic Principles

1. **Cultural Resonance**:
   - **Japan Experience**: Evokes the iconic Hinomaru crimson/coral palette (`#C62828`), clean minimalist line art, and traditional Kanji aesthetics.
   - **Korea Experience**: Features the Taegeuk royal blue and emerald harmony (`#1565C0` / `#10b981`), inspired by Seoul modernism and Hangul geometry.
   - **Nepali Localization**: Dignified Devanagari typography that feels native and natural for Nepali youth and professionals.
2. **Glanceability & Low Cognitive Load**:
   - Learning vocabulary and preparing for high-stakes exams requires deep focus. Interfaces avoid chaotic visual clutter, utilizing clear cards, ample white space, and distinct hierarchy.
3. **Tactile Micro-Interactions**:
   - Spaced repetition flashcards feel physical with 3D flips. Exam options give immediate visual feedback on tap, and Kanji chips animate subtly on hover.
4. **Native App Feel on Mobile**:
   - Mobile users receive a native app experience with a fixed bottom navigation bar, safe-area insets, pull-up bottom sheets, and swipe-friendly components.

---

## 2. Color Palette & Token System

### 2.1 Japan & Korea Thematic Accents

| Token | Hex Value | CSS Variable | Purpose |
|---|---|---|---|
| **Japan Primary** | `#C62828` | `--accent-jp` | Primary button, JLPT badges, Japan tab active state |
| **Japan Hover** | `#B71C1C` | `--accent-jp-hover` | Hover/active states for Japanese UI elements |
| **Japan Light Surface**| `#FEF2F2` | `--accent-jp-light` | Background tint for Japanese flashcards and chips |
| **Japan Border** | `#FECACA` | `--accent-jp-mid` | Subdued borders for Japanese content boxes |
| **Korea Primary** | `#1565C0` | `--accent-kr` | Primary button, EPS badges, Korea tab active state |
| **Korea Hover** | `#0D47A1` | `--accent-kr-hover` | Hover/active states for Korean UI elements |
| **Korea Light Surface**| `#EFF6FF` | `--accent-kr-light` | Background tint for Korean flashcards and chips |
| **Korea Border** | `#BFDBFE` | `--accent-kr-mid` | Subdued borders for Korean content boxes |

### 2.2 Neutral Surfaces & Text

```css
/* Light Mode */
--surface:          #ffffff;  /* Primary card & sheet background */
--surface-2:        #f8fafc;  /* App canvas background */
--surface-3:        #f1f5f9;  /* Secondary input / pill background */
--border:           #e2e8f0;  /* Standard border */
--border-strong:    #cbd5e1;  /* Emphasized divider */
--text-primary:     #0f172a;  /* High-contrast body text */
--text-secondary:   #475569;  /* Subtitles & metadata */
--text-muted:       #94a3b8;  /* Placeholder & disabled text */

/* Dark Mode */
html.dark {
  --surface:        #0f172a;  /* Dark card background */
  --surface-2:      #020617;  /* Dark app background */
  --surface-3:      #1e293b;  /* Dark input background */
  --border:         #1e293b;  /* Dark border */
  --border-strong:  #334155;  /* Dark emphasized border */
  --text-primary:   #f8fafc;  /* Bright white text */
  --text-secondary: #cbd5e1;  /* Subdued slate text */
  --text-muted:     #64748b;  /* Muted dark text */
}
```

### 2.3 Semantic Status Tokens

- **Success (`#16a34a`)**: Passing exam scores, mastered flashcards, verified notices.
- **Warning (`#d97706`)**: Exam timer warning (< 5 minutes left), upcoming deadlines.
- **Danger (`#dc2626`)**: Failed exam threshold, "Again" flashcard reset, destructive actions.
- **Brand Accent (`#4f46e5`)**: Platform-level navigation, consultancy booking highlights.

---

## 3. Typography System

The platform integrates four specialized Google Fonts to guarantee flawless rendering across all scripts:

```
Typography Matrix
├── Primary UI (Latin / Numbers): 'Inter' (sans-serif)
├── Nepali / Devanagari:          'Noto Sans Devanagari' (sans-serif)
├── Japanese (Kanji / Kana):      'Noto Sans JP' (sans-serif)
└── Korean (Hangul):              'Noto Sans KR' (sans-serif)
```

### Type Scale & Hierarchy

| Style Level | Font Size | Font Weight | Line Height | Usage |
|---|---|---|---|---|
| **Display 1** | 2.25rem (36px) | 800 (Extrabold) | 1.2 | Hero page titles, certificate headings |
| **Heading 1** | 1.75rem (28px) | 700 (Bold) | 1.25 | Section headers, lesson unit titles |
| **Heading 2** | 1.25rem (20px) | 600 (Semibold) | 1.3 | Card titles, Kanji character inspectors |
| **Body Large** | 1.125rem (18px) | 500 (Medium) | 1.5 | Furigana readings, primary vocabulary words |
| **Body Regular** | 1.000rem (16px) | 400 (Regular) | 1.5 | Explanations, blog text, exam questions |
| **Caption / Meta** | 0.875rem (14px) | 400 / 500 | 1.4 | Badges, timestamps, stroke count tags |
| **Micro** | 0.750rem (12px) | 500 | 1.3 | Audio tags, watermarks, question numbers |

---

## 4. Reusable Component Specifications

### 4.1 Spaced Repetition (SRS) Flashcard
- **Visuals**: Dimensions ~320px x 420px. Rounded corners (20px). Subtle border with dynamic glow (`shadow-glow-jp` or `shadow-glow-kr`).
- **Interaction**: Tap/Spacebar initiates a 3D flip with CSS `perspective: 1000px; transform-style: preserve-3d; transition: transform 0.4s ease`.
- **Action Buttons**: 4-button rating bar docked at the bottom:
  - *Again* (Red, 1 day)
  - *Hard* (Amber, 2-3 days)
  - *Good* (Blue, 4-6 days)
  - *Easy* (Green, 7+ days)

### 4.2 Kanji Inspector Chip & Modal
- **Chip**: Compact pill displaying the Kanji character, JLPT level badge (`N5`..`N3`), and primary English meaning.
- **Inspector Modal**:
  - Top header: High-contrast stroke animation SVG.
  - Radical decomposition box: Color-coded radicals (e.g., 氵 water, 木 tree) with mnemonics.
  - Onyomi / Kunyomi tabs with audio TTS button.
  - Linked vocabulary examples with clickable pronunciations.

### 4.3 Timed Mock Exam Engine
- **Floating Header**:
  - Sticky at top. Displays remaining time countdown with color shift from Slate -> Amber (<10 min) -> Crimson (<3 min).
- **Question Viewport**:
  - Large legible prompt with audio player for listening sections.
  - 4 radio selection cards with hover transitions and selected border highlight.
- **Navigator Grid Drawer**:
  - Grid of question numbers (1 to 50).
  - States: Unanswered (Gray), Answered (Green), Flagged for Review (Amber flag badge).

### 4.4 Mobile-First Bottom Navigation Bar
- **Visibility**: Strictly visible on mobile (`< 768px`), strictly hidden on desktop (`md:hidden`).
- **Items (5 tabs)**:
  1. 🏠 Home (`/`)
  2. 📖 Learn (`/learn`)
  3. 🧪 Exams (`/exams`)
  4. 👥 Community (`/rooms` / `/community`)
  5. 👤 Profile / Dashboard (`/dashboard`)
- **Safe Area**: Uses `padding-bottom: env(safe-area-inset-bottom)` for iPhone home bar compatibility.

### 4.5 Caregiving & Vocational Diagrams
- **Interactive Hotspots**: Diagrams of care beds, transfer belts, and wheelchairs have pulsating circular badges that open detailed safety tooltips and Japanese/Nepali terminology when tapped.

---

## 5. Micro-Interactions & Animation Presets

```css
/* Animation Keyframes defined in globals.css & tailwind.config.ts */
.animate-fade-in {
  animation: fade-in 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-slide-up {
  animation: slide-up 0.3s cubic-bezier(0.32, 0.72, 0, 1) forwards;
}

.animate-slide-left {
  animation: slide-in-left 0.25s ease forwards;
}
```

- **Hover States**: Cards lift smoothly `-2px` on desktop with increased shadow depth.
- **Button Press Feedback**: Active state scales down slightly (`active:scale-[0.98]`).
- **Audio Feedback**: TTS audio button pulses with a wave icon when playing speech.

---

## 6. Responsive Breakpoints

| Breakpoint | Minimum Width | Target Devices | Layout Adjustments |
|---|---|---|---|
| **`sm`** | 640px | Large phones (landscape) | 2-column vocabulary cards |
| **`md`** | 768px | Tablets & iPads | Desktop top navigation revealed; mobile bottom bar hidden |
| **`lg`** | 1024px | Small Laptops | 3-column mock exam questions & sidebar navigator |
| **`xl`** | 1280px | Standard Desktops | Full-width dashboard with split analytics and live feeds |
| **`2xl`** | 1536px | Ultra-wide Displays | Max-width content container (1400px) centered |

---

## 7. Universal DESIGN.md Blueprint for Upcoming Projects

When scaffolding a new application, follow this design initialization checklist:
- [ ] Define primary and secondary color tokens (60-30-10 rule).
- [ ] Configure light and dark surface variables in `globals.css`.
- [ ] Specify font families (including regional non-Latin scripts if applicable).
- [ ] Establish standard card, modal, and button primitives.
- [ ] Implement mobile-first navigation rules (e.g. bottom bar for touch devices).
- [ ] Set up transition curves and touch-active feedback states.
