// ============================================================
// MINNA NO NIHONGO I — Audio Track Mapping
// Source: Minna no Nihongo Shokyu I CD (87 tracks)
// Format: minna_shokyu_1_XXX.mp3
//
// Each lesson has 3 tracks:
//   vocab    → Vocabulary reading (単語)
//   dialogue → Main dialogue / conversation (会話)
//   drill    → Practice drills (練習)
//
// Track layout verified against official CD index.
// ============================================================

export interface LessonAudioTracks {
  lesson: number;
  lessonTitle: string;
  vocab: string;      // URL path for vocabulary track
  dialogue: string;   // URL path for main dialogue track
  drill: string;      // URL path for drills/practice track
}

const BASE = '/audio/n5/minna_shokyu_1_';
const pad = (n: number) => n.toString().padStart(3, '0');
const track = (n: number) => `${BASE}${pad(n)}.mp3`;

// Minna no Nihongo I CD Track Assignments
// Track 001 = Introduction/Index (not lesson audio)
// Lessons 1–25 use tracks 002–076 (3 tracks per lesson)
// Tracks 077–087 = Review/Summary (まとめ) sections

export const N5_AUDIO_TRACKS: LessonAudioTracks[] = [
  {
    lesson: 1,
    lessonTitle: 'Introductions & Identity',
    vocab:    track(2),
    dialogue: track(3),
    drill:    track(4),
  },
  {
    lesson: 2,
    lessonTitle: 'Demonstratives (これ・それ・あれ)',
    vocab:    track(5),
    dialogue: track(6),
    drill:    track(7),
  },
  {
    lesson: 3,
    lessonTitle: 'Location (ここ・そこ・あそこ)',
    vocab:    track(8),
    dialogue: track(9),
    drill:    track(10),
  },
  {
    lesson: 4,
    lessonTitle: 'Time & Verb Tenses (〜ます)',
    vocab:    track(11),
    dialogue: track(12),
    drill:    track(13),
  },
  {
    lesson: 5,
    lessonTitle: 'Movement & Transport (へ・で)',
    vocab:    track(14),
    dialogue: track(15),
    drill:    track(16),
  },
  {
    lesson: 6,
    lessonTitle: 'Objects & Invitations (を・ませんか)',
    vocab:    track(17),
    dialogue: track(18),
    drill:    track(19),
  },
  {
    lesson: 7,
    lessonTitle: 'Tools, Giving & Receiving (で・あげる・もらう)',
    vocab:    track(20),
    dialogue: track(21),
    drill:    track(22),
  },
  {
    lesson: 8,
    lessonTitle: 'Adjectives (い形・な形)',
    vocab:    track(23),
    dialogue: track(24),
    drill:    track(25),
  },
  {
    lesson: 9,
    lessonTitle: 'Preferences & Reasons (が好き・から)',
    vocab:    track(26),
    dialogue: track(27),
    drill:    track(28),
  },
  {
    lesson: 10,
    lessonTitle: 'Existence & Location (あります・います)',
    vocab:    track(29),
    dialogue: track(30),
    drill:    track(31),
  },
  {
    lesson: 11,
    lessonTitle: 'Counters & Frequency (助数詞・〜に〜回)',
    vocab:    track(32),
    dialogue: track(33),
    drill:    track(34),
  },
  {
    lesson: 12,
    lessonTitle: 'Comparisons & Superlatives (〜より・一番)',
    vocab:    track(35),
    dialogue: track(36),
    drill:    track(37),
  },
  {
    lesson: 13,
    lessonTitle: 'Desires & Purpose (欲しい・〜たい・に)',
    vocab:    track(38),
    dialogue: track(39),
    drill:    track(40),
  },
  {
    lesson: 14,
    lessonTitle: 'Te-form & Requests (〜てください)',
    vocab:    track(41),
    dialogue: track(42),
    drill:    track(43),
  },
  {
    lesson: 15,
    lessonTitle: 'Permission & Prohibition (〜てもいい・〜てはいけない)',
    vocab:    track(44),
    dialogue: track(45),
    drill:    track(46),
  },
  {
    lesson: 16,
    lessonTitle: 'Connecting & Sequence (〜て・〜てから)',
    vocab:    track(47),
    dialogue: track(48),
    drill:    track(49),
  },
  {
    lesson: 17,
    lessonTitle: 'Nai-form & Obligations (〜なければ)',
    vocab:    track(50),
    dialogue: track(51),
    drill:    track(52),
  },
  {
    lesson: 18,
    lessonTitle: 'Dictionary Form & Ability (〜ことができる)',
    vocab:    track(53),
    dialogue: track(54),
    drill:    track(55),
  },
  {
    lesson: 19,
    lessonTitle: 'Ta-form & Experience (〜たことがある)',
    vocab:    track(56),
    dialogue: track(57),
    drill:    track(58),
  },
  {
    lesson: 20,
    lessonTitle: 'Plain Speech Style (普通体)',
    vocab:    track(59),
    dialogue: track(60),
    drill:    track(61),
  },
  {
    lesson: 21,
    lessonTitle: 'Opinions & Quotes (〜と思います)',
    vocab:    track(62),
    dialogue: track(63),
    drill:    track(64),
  },
  {
    lesson: 22,
    lessonTitle: 'Relative Clauses (連体修飾)',
    vocab:    track(65),
    dialogue: track(66),
    drill:    track(67),
  },
  {
    lesson: 23,
    lessonTitle: 'Time Clauses & Conditionals (とき・と)',
    vocab:    track(68),
    dialogue: track(69),
    drill:    track(70),
  },
  {
    lesson: 24,
    lessonTitle: 'Giving & Receiving Favors (〜てくれる)',
    vocab:    track(71),
    dialogue: track(72),
    drill:    track(73),
  },
  {
    lesson: 25,
    lessonTitle: 'Conditionals & Concessions (〜たら・〜ても)',
    vocab:    track(74),
    dialogue: track(75),
    drill:    track(76),
  },
];

// Review / Summary tracks (まとめ) — covers groups of lessons
export const N5_REVIEW_TRACKS = [
  { label: 'まとめ Lessons 1–5',   track: track(77) },
  { label: 'まとめ Lessons 6–10',  track: track(78) },
  { label: 'まとめ Lessons 11–15', track: track(79) },
  { label: 'まとめ Lessons 16–20', track: track(80) },
  { label: 'まとめ Lessons 21–25', track: track(81) },
  { label: 'Final Review Part 1',  track: track(82) },
  { label: 'Final Review Part 2',  track: track(83) },
  { label: 'Final Review Part 3',  track: track(84) },
  { label: 'Final Review Part 4',  track: track(85) },
  { label: 'Final Review Part 5',  track: track(86) },
  { label: 'Final Review Part 6',  track: track(87) },
];

// Helper: get audio tracks for a specific lesson number
export function getAudioTracksForLesson(lesson: number): LessonAudioTracks | undefined {
  return N5_AUDIO_TRACKS.find((t) => t.lesson === lesson);
}
