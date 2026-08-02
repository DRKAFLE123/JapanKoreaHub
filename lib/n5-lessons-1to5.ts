// ============================================================
// MINNA NO NIHONGO JLPT N5 — Vocab (Lessons 1 to 5)
// Official definitions from Minna no Nihongo I textbook
// With Kanji written forms & proper Nepali translations
// ============================================================
import type { VocabItem } from './nihongo-vocab';

export const N5_LESSONS_1TO5: VocabItem[] = [
  // ════════════════════════════════════════════════════════
  // LESSON 01 (31 ITEMS)
  // ════════════════════════════════════════════════════════
  {
    id: 'N5-L01-001', lesson: 1, level: 'N5', word: "私", reading: "わたし",
    meaning: "I", meaningNepali: "म",
    kanjiCharacters: ["私"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "私。", reading: "わたし。", english: "Example: I.", nepali: "उदाहरण: म।" }
    ]
  },
  {
    id: 'N5-L01-002', lesson: 1, level: 'N5', word: "私たち", reading: "わたしたち",
    meaning: "we", meaningNepali: "हामीहरू",
    kanjiCharacters: ["私"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "私たち。", reading: "わたしたち。", english: "Example: we.", nepali: "उदाहरण: हामीहरू।" }
    ]
  },
  {
    id: 'N5-L01-003', lesson: 1, level: 'N5', word: "あなた", reading: "あなた",
    meaning: "you", meaningNepali: "तपाईं / तिमी",
    kanjiCharacters: [], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "あなた。", reading: "あなた。", english: "Example: you.", nepali: "उदाहरण: तपाईं / तिमी।" }
    ]
  },
  {
    id: 'N5-L01-004', lesson: 1, level: 'N5', word: "あの方", reading: "あの人",
    meaning: "that person, he, she (あの方 is the polite equivalent of あの人)", meaningNepali: "उहाँ (आदरार्थी)",
    kanjiCharacters: ["方"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "あの方。", reading: "あの人。", english: "Example: that person, he, she (あの方 is the polite equivalent of あの人).", nepali: "उदाहरण: उहाँ (आदरार्थी)।" }
    ]
  },
  {
    id: 'N5-L01-005', lesson: 1, level: 'N5', word: "皆さん", reading: "みなさん",
    meaning: "ladies and gentlemen, all of you", meaningNepali: "सबैजना / सम्पूर्ण महानुभावहरू",
    kanjiCharacters: ["皆"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "皆さん。", reading: "みなさん。", english: "Example: ladies and gentlemen, all of you.", nepali: "उदाहरण: सबैजना / सम्पूर्ण महानुभावहरू।" }
    ]
  },
  {
    id: 'N5-L01-006', lesson: 1, level: 'N5', word: "～さん", reading: "～さん",
    meaning: "Mr., Ms. (title of respect added to a name)", meaningNepali: "~ जी (आदरार्थी",
    kanjiCharacters: [], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "～さん。", reading: "～さん。", english: "Example: Mr., Ms. (title of respect added to a name).", nepali: "उदाहरण: ~ जी (आदरार्थी।" }
    ]
  },
  {
    id: 'N5-L01-007', lesson: 1, level: 'N5', word: "～ちゃん", reading: "～ちゃん",
    meaning: "(suffix often added to a child's name instead of ~さん)", meaningNepali: "~ चान (साना बालबालिकाका लागि)",
    kanjiCharacters: [], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "～ちゃん。", reading: "～ちゃん。", english: "Example: (suffix often added to a child's name instead of ~さん).", nepali: "उदाहरण: ~ चान (साना बालबालिकाका लागि)।" }
    ]
  },
  {
    id: 'N5-L01-008', lesson: 1, level: 'N5', word: "～君", reading: "～くん",
    meaning: "(suffix often added to a boy's name)", meaningNepali: "~ कुन (केटाहरूका लागि)",
    kanjiCharacters: ["君"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "～君。", reading: "～くん。", english: "Example: (suffix often added to a boy's name).", nepali: "उदाहरण: ~ कुन (केटाहरूका लागि)।" }
    ]
  },
  {
    id: 'N5-L01-009', lesson: 1, level: 'N5', word: "～人", reading: "～じん",
    meaning: "(suffix meaning 'a national of'; e.g., アメリカ人, an American)", meaningNepali: "~ नागरिक",
    kanjiCharacters: ["人"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "～人。", reading: "～じん。", english: "Example: (suffix meaning 'a national of'; e.g., アメリカ人, an American).", nepali: "उदाहरण: ~ नागरिक।" }
    ]
  },
  {
    id: 'N5-L01-010', lesson: 1, level: 'N5', word: "先生", reading: "せんせい",
    meaning: "teacher, instructor (not used when referring to one's own job)", meaningNepali: "शिक्षक / गुरु",
    kanjiCharacters: ["先", "生"], partOfSpeech: "I-Adj",
    grammarSentences: [
      { japanese: "先生。", reading: "せんせい。", english: "Example: teacher, instructor (not used when referring to one's own job).", nepali: "उदाहरण: शिक्षक / गुरु।" }
    ]
  },
  {
    id: 'N5-L01-011', lesson: 1, level: 'N5', word: "教師", reading: "きょうし",
    meaning: "teacher, instructor", meaningNepali: "शिक्षक (पेशा)",
    kanjiCharacters: ["教", "師"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "教師。", reading: "きょうし。", english: "Example: teacher, instructor.", nepali: "उदाहरण: शिक्षक (पेशा)।" }
    ]
  },
  {
    id: 'N5-L01-012', lesson: 1, level: 'N5', word: "学生", reading: "がくせい",
    meaning: "student", meaningNepali: "विद्यार्थी",
    kanjiCharacters: ["学", "生"], partOfSpeech: "I-Adj",
    grammarSentences: [
      { japanese: "学生。", reading: "がくせい。", english: "Example: student.", nepali: "उदाहरण: विद्यार्थी।" }
    ]
  },
  {
    id: 'N5-L01-013', lesson: 1, level: 'N5', word: "会社員", reading: "かいしゃいん",
    meaning: "company employee", meaningNepali: "कम्पनी कर्मचारी",
    kanjiCharacters: ["会", "社", "員"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "会社員。", reading: "かいしゃいん。", english: "Example: company employee.", nepali: "उदाहरण: कम्पनी कर्मचारी।" }
    ]
  },
  {
    id: 'N5-L01-014', lesson: 1, level: 'N5', word: "～社員", reading: "～しゃいん",
    meaning: "employee of ~ Company (e.g. IMCの社員)", meaningNepali: "employee of ~ Company (e.g. IMCの社員)",
    kanjiCharacters: ["社", "員"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "～社員。", reading: "～しゃいん。", english: "Example: employee of ~ Company (e.g. IMCの社員).", nepali: "उदाहरण: employee of ~ Company (e.g. IMCの社員)।" }
    ]
  },
  {
    id: 'N5-L01-015', lesson: 1, level: 'N5', word: "銀行員", reading: "ぎんこういん",
    meaning: "bank employee", meaningNepali: "बैंक कर्मचारी",
    kanjiCharacters: ["銀", "行", "員"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "銀行員。", reading: "ぎんこういん。", english: "Example: bank employee.", nepali: "उदाहरण: बैंक कर्मचारी।" }
    ]
  },
  {
    id: 'N5-L01-016', lesson: 1, level: 'N5', word: "医者", reading: "いしゃ",
    meaning: "medical doctor", meaningNepali: "डाक्टर / चिकित्सक",
    kanjiCharacters: ["医", "者"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "医者。", reading: "いしゃ。", english: "Example: medical doctor.", nepali: "उदाहरण: डाक्टर / चिकित्सक।" }
    ]
  },
  {
    id: 'N5-L01-017', lesson: 1, level: 'N5', word: "研究者", reading: "けんきゅうしゃ",
    meaning: "researcher, scholar", meaningNepali: "अनुसन्धानकर्ता",
    kanjiCharacters: ["研", "究", "者"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "研究者。", reading: "けんきゅうしゃ。", english: "Example: researcher, scholar.", nepali: "उदाहरण: अनुसन्धानकर्ता।" }
    ]
  },
  {
    id: 'N5-L01-018', lesson: 1, level: 'N5', word: "エンジニア", reading: "エンジニア",
    meaning: "engineer", meaningNepali: "इन्जिनियर",
    kanjiCharacters: [], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "エンジニア。", reading: "エンジニア。", english: "Example: engineer.", nepali: "उदाहरण: इन्जिनियर।" }
    ]
  },
  {
    id: 'N5-L01-019', lesson: 1, level: 'N5', word: "大学", reading: "だいがく",
    meaning: "university", meaningNepali: "विश्वविद्यालय",
    kanjiCharacters: ["大", "学"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "大学。", reading: "だいがく。", english: "Example: university.", nepali: "उदाहरण: विश्वविद्यालय।" }
    ]
  },
  {
    id: 'N5-L01-020', lesson: 1, level: 'N5', word: "病院", reading: "びょういん",
    meaning: "hospital", meaningNepali: "अस्पताल",
    kanjiCharacters: ["病", "院"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "病院。", reading: "びょういん。", english: "Example: hospital.", nepali: "उदाहरण: अस्पताल।" }
    ]
  },
  {
    id: 'N5-L01-021', lesson: 1, level: 'N5', word: "電気", reading: "でんき",
    meaning: "electricity, light", meaningNepali: "बिजुली / बत्ती",
    kanjiCharacters: ["電", "気"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "電気。", reading: "でんき。", english: "Example: electricity, light.", nepali: "उदाहरण: बिजुली / बत्ती।" }
    ]
  },
  {
    id: 'N5-L01-022', lesson: 1, level: 'N5', word: "誰／どなた", reading: "だれ／どなた",
    meaning: "who (どなた is the polite equivalent of だれ)", meaningNepali: "who (どなた is the polite equivalent of だれ)",
    kanjiCharacters: ["誰"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "誰／どなた。", reading: "だれ／どなた。", english: "Example: who (どなた is the polite equivalent of だれ).", nepali: "उदाहरण: who (どなた is the polite equivalent of だれ)।" }
    ]
  },
  {
    id: 'N5-L01-023', lesson: 1, level: 'N5', word: "～歳", reading: "～さい",
    meaning: "~ years old", meaningNepali: "~ वर्ष (उमेर)",
    kanjiCharacters: ["歳"], partOfSpeech: "I-Adj",
    grammarSentences: [
      { japanese: "～歳。", reading: "～さい。", english: "Example: ~ years old.", nepali: "उदाहरण: ~ वर्ष (उमेर)।" }
    ]
  },
  {
    id: 'N5-L01-024', lesson: 1, level: 'N5', word: "何歳／おいくつ", reading: "なんさい／おいくつ",
    meaning: "how old (おいくつ is the polite equivalent of 何歳)", meaningNepali: "how old (おいくつ is the polite equivalent of 何歳)",
    kanjiCharacters: ["何", "歳"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "何歳／おいくつ。", reading: "なんさい／おいくつ。", english: "Example: how old (おいくつ is the polite equivalent of 何歳).", nepali: "उदाहरण: how old (おいくつ is the polite equivalent of 何歳)।" }
    ]
  },
  {
    id: 'N5-L01-025', lesson: 1, level: 'N5', word: "はい", reading: "はい",
    meaning: "yes", meaningNepali: "हजुर / हो",
    kanjiCharacters: [], partOfSpeech: "I-Adj",
    grammarSentences: [
      { japanese: "はい。", reading: "はい。", english: "Example: yes.", nepali: "उदाहरण: हजुर / हो।" }
    ]
  },
  {
    id: 'N5-L01-026', lesson: 1, level: 'N5', word: "いいえ", reading: "いいえ",
    meaning: "no", meaningNepali: "होइन / अहिल्यै",
    kanjiCharacters: [], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "いいえ。", reading: "いいえ。", english: "Example: no.", nepali: "उदाहरण: होइन / अहिल्यै।" }
    ]
  },
  {
    id: 'N5-L01-027', lesson: 1, level: 'N5', word: "失礼ですが、お名前は。", reading: "しつれいですが、おなまえは。",
    meaning: "Excuse me, but may I have your name?", meaningNepali: "Excuse me, but may I have your name?",
    kanjiCharacters: ["失", "礼", "名", "前"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "失礼ですが、お名前は。。", reading: "しつれいですが、おなまえは。。", english: "Example: Excuse me, but may I have your name?.", nepali: "उदाहरण: Excuse me, but may I have your name?।" }
    ]
  },
  {
    id: 'N5-L01-028', lesson: 1, level: 'N5', word: "はじめまして。", reading: "はじめまして。",
    meaning: "How do you do? (lit. I am meeting you for the first time.)", meaningNepali: "पहिलो पटक भेट्दा खुशी लाग्यो।",
    kanjiCharacters: [], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "はじめまして。。", reading: "はじめまして。。", english: "Example: How do you do? (lit. I am meeting you for the first time.).", nepali: "उदाहरण: पहिलो पटक भेट्दा खुशी लाग्यो।।" }
    ]
  },
  {
    id: 'N5-L01-029', lesson: 1, level: 'N5', word: "どうぞよろしく[おねがいします]。", reading: "どうぞよろしく[おねがいします]。",
    meaning: "Pleased to meet you.", meaningNepali: "Pleased to meet you.",
    kanjiCharacters: [], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "どうぞよろしく[おねがいします]。。", reading: "どうぞよろしく[おねがいします]。。", english: "Example: Pleased to meet you..", nepali: "उदाहरण: Pleased to meet you.।" }
    ]
  },
  {
    id: 'N5-L01-030', lesson: 1, level: 'N5', word: "こちらは～さんです。", reading: "こちらは～さんです。",
    meaning: "This is Mr./Ms.~.", meaningNepali: "This is Mr./Ms.~.",
    kanjiCharacters: [], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "こちらは～さんです。。", reading: "こちらは～さんです。。", english: "Example: This is Mr./Ms.~..", nepali: "उदाहरण: This is Mr./Ms.~.।" }
    ]
  },
  {
    id: 'N5-L01-031', lesson: 1, level: 'N5', word: "～から きました。", reading: "～から きました。",
    meaning: "I came (come) from ~.", meaningNepali: "म ~ बाट आएको हुँ।",
    kanjiCharacters: [], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "～から きました。。", reading: "～から きました。。", english: "Example: I came (come) from ~..", nepali: "उदाहरण: म ~ बाट आएको हुँ।।" }
    ]
  },
  // ════════════════════════════════════════════════════════
  // LESSON 02 (39 ITEMS)
  // ════════════════════════════════════════════════════════
  {
    id: 'N5-L02-001', lesson: 2, level: 'N5', word: "これ／それ／あれ", reading: "これ／それ／あれ",
    meaning: "this／that／that over there (things)", meaningNepali: "this／that／that over there (things)",
    kanjiCharacters: [], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "これ／それ／あれ。", reading: "これ／それ／あれ。", english: "Example: this／that／that over there (things).", nepali: "उदाहरण: this／that／that over there (things)।" }
    ]
  },
  {
    id: 'N5-L02-002', lesson: 2, level: 'N5', word: "この～／その～／あの～", reading: "この～／その～／あの～",
    meaning: "this ~／that ~／that ~ over there", meaningNepali: "this ~／that ~／that ~ over there",
    kanjiCharacters: [], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "この～／その～／あの～。", reading: "この～／その～／あの～。", english: "Example: this ~／that ~／that ~ over there.", nepali: "उदाहरण: this ~／that ~／that ~ over there।" }
    ]
  },
  {
    id: 'N5-L02-003', lesson: 2, level: 'N5', word: "本", reading: "ほん",
    meaning: "book", meaningNepali: "किताब",
    kanjiCharacters: ["本"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "本。", reading: "ほん。", english: "Example: book.", nepali: "उदाहरण: किताब।" }
    ]
  },
  {
    id: 'N5-L02-004', lesson: 2, level: 'N5', word: "辞書", reading: "じしょ",
    meaning: "dictionary", meaningNepali: "शब्दकोश",
    kanjiCharacters: ["辞", "書"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "辞書。", reading: "じしょ。", english: "Example: dictionary.", nepali: "उदाहरण: शब्दकोश।" }
    ]
  },
  {
    id: 'N5-L02-005', lesson: 2, level: 'N5', word: "雑誌", reading: "ざっし",
    meaning: "magazine", meaningNepali: "पत्रिका",
    kanjiCharacters: ["雑", "誌"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "雑誌。", reading: "ざっし。", english: "Example: magazine.", nepali: "उदाहरण: पत्रिका।" }
    ]
  },
  {
    id: 'N5-L02-006', lesson: 2, level: 'N5', word: "新聞", reading: "しんぶん",
    meaning: "newspaper", meaningNepali: "समाचार पत्र / पत्रिका",
    kanjiCharacters: ["新", "聞"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "新聞。", reading: "しんぶん。", english: "Example: newspaper.", nepali: "उदाहरण: समाचार पत्र / पत्रिका।" }
    ]
  },
  {
    id: 'N5-L02-007', lesson: 2, level: 'N5', word: "ノート", reading: "ノート",
    meaning: "notebook", meaningNepali: "नोटबुक",
    kanjiCharacters: [], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "ノート。", reading: "ノート。", english: "Example: notebook.", nepali: "उदाहरण: नोटबुक।" }
    ]
  },
  {
    id: 'N5-L02-008', lesson: 2, level: 'N5', word: "手帳", reading: "てちょう",
    meaning: "pocket notebook", meaningNepali: "पकेट नोटबुक / डायरी",
    kanjiCharacters: ["手", "帳"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "手帳。", reading: "てちょう。", english: "Example: pocket notebook.", nepali: "उदाहरण: पकेट नोटबुक / डायरी।" }
    ]
  },
  {
    id: 'N5-L02-009', lesson: 2, level: 'N5', word: "名刺", reading: "めいし",
    meaning: "business card", meaningNepali: "भिजिटिङ कार्ड / परिचयपत्र",
    kanjiCharacters: ["名", "刺"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "名刺。", reading: "めいし。", english: "Example: business card.", nepali: "उदाहरण: भिजिटिङ कार्ड / परिचयपत्र।" }
    ]
  },
  {
    id: 'N5-L02-010', lesson: 2, level: 'N5', word: "カード", reading: "カード",
    meaning: "card", meaningNepali: "कार्ड",
    kanjiCharacters: [], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "カード。", reading: "カード。", english: "Example: card.", nepali: "उदाहरण: कार्ड।" }
    ]
  },
  {
    id: 'N5-L02-011', lesson: 2, level: 'N5', word: "テレホンカード", reading: "テレホンカード",
    meaning: "telephone card", meaningNepali: "टेलिफोन कार्ड",
    kanjiCharacters: [], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "テレホンカード。", reading: "テレホンカード。", english: "Example: telephone card.", nepali: "उदाहरण: टेलिफोन कार्ड।" }
    ]
  },
  {
    id: 'N5-L02-012', lesson: 2, level: 'N5', word: "鉛筆", reading: "えんぴつ",
    meaning: "pencil", meaningNepali: "पेन्सिल",
    kanjiCharacters: ["鉛", "筆"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "鉛筆。", reading: "えんぴつ。", english: "Example: pencil.", nepali: "उदाहरण: पेन्सिल।" }
    ]
  },
  {
    id: 'N5-L02-013', lesson: 2, level: 'N5', word: "ボールペン", reading: "ボールペン",
    meaning: "ballpoint pen", meaningNepali: "बलपेन",
    kanjiCharacters: [], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "ボールペン。", reading: "ボールペン。", english: "Example: ballpoint pen.", nepali: "उदाहरण: बलपेन।" }
    ]
  },
  {
    id: 'N5-L02-014', lesson: 2, level: 'N5', word: "シャープペンシル", reading: "シャープペンシル",
    meaning: "mechanical pencil", meaningNepali: "मेकानिकल पेन्सिल",
    kanjiCharacters: [], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "シャープペンシル。", reading: "シャープペンシル。", english: "Example: mechanical pencil.", nepali: "उदाहरण: मेकानिकल पेन्सिल।" }
    ]
  },
  {
    id: 'N5-L02-015', lesson: 2, level: 'N5', word: "鍵", reading: "かぎ",
    meaning: "key", meaningNepali: "चाबी / साँचो",
    kanjiCharacters: ["鍵"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "鍵。", reading: "かぎ。", english: "Example: key.", nepali: "उदाहरण: चाबी / साँचो।" }
    ]
  },
  {
    id: 'N5-L02-016', lesson: 2, level: 'N5', word: "時計", reading: "とけい",
    meaning: "watch, clock", meaningNepali: "घडी",
    kanjiCharacters: ["時", "計"], partOfSpeech: "I-Adj",
    grammarSentences: [
      { japanese: "時計。", reading: "とけい。", english: "Example: watch, clock.", nepali: "उदाहरण: घडी।" }
    ]
  },
  {
    id: 'N5-L02-017', lesson: 2, level: 'N5', word: "傘", reading: "かさ",
    meaning: "umbrella", meaningNepali: "छाता",
    kanjiCharacters: ["傘"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "傘。", reading: "かさ。", english: "Example: umbrella.", nepali: "उदाहरण: छाता।" }
    ]
  },
  {
    id: 'N5-L02-018', lesson: 2, level: 'N5', word: "かばん", reading: "かばん",
    meaning: "bag, briefcase", meaningNepali: "झोला / ब्याग",
    kanjiCharacters: [], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "かばん。", reading: "かばん。", english: "Example: bag, briefcase.", nepali: "उदाहरण: झोला / ब्याग।" }
    ]
  },
  {
    id: 'N5-L02-019', lesson: 2, level: 'N5', word: "テープ", reading: "テープ",
    meaning: "[cassette] tape", meaningNepali: "[cassette] tape",
    kanjiCharacters: [], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "テープ。", reading: "テープ。", english: "Example: [cassette] tape.", nepali: "उदाहरण: [cassette] tape।" }
    ]
  },
  {
    id: 'N5-L02-020', lesson: 2, level: 'N5', word: "テープレコーダー", reading: "テープレコーダー",
    meaning: "tape recorder", meaningNepali: "टेप रेकर्डर",
    kanjiCharacters: [], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "テープレコーダー。", reading: "テープレコーダー。", english: "Example: tape recorder.", nepali: "उदाहरण: टेप रेकर्डर।" }
    ]
  },
  {
    id: 'N5-L02-021', lesson: 2, level: 'N5', word: "テレビ", reading: "テレビ",
    meaning: "television", meaningNepali: "टेलिभिजन",
    kanjiCharacters: [], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "テレビ。", reading: "テレビ。", english: "Example: television.", nepali: "उदाहरण: टेलिभिजन।" }
    ]
  },
  {
    id: 'N5-L02-022', lesson: 2, level: 'N5', word: "ラジオ", reading: "ラジオ",
    meaning: "radio", meaningNepali: "रेडियो",
    kanjiCharacters: [], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "ラジオ。", reading: "ラジオ。", english: "Example: radio.", nepali: "उदाहरण: रेडियो।" }
    ]
  },
  {
    id: 'N5-L02-023', lesson: 2, level: 'N5', word: "カメラ", reading: "カメラ",
    meaning: "camera", meaningNepali: "क्यामेरा",
    kanjiCharacters: [], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "カメラ。", reading: "カメラ。", english: "Example: camera.", nepali: "उदाहरण: क्यामेरा।" }
    ]
  },
  {
    id: 'N5-L02-024', lesson: 2, level: 'N5', word: "コンピューター", reading: "コンピューター",
    meaning: "computer", meaningNepali: "कम्प्यूटर",
    kanjiCharacters: [], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "コンピューター。", reading: "コンピューター。", english: "Example: computer.", nepali: "उदाहरण: कम्प्यूटर।" }
    ]
  },
  {
    id: 'N5-L02-025', lesson: 2, level: 'N5', word: "車", reading: "くるま",
    meaning: "automobile, car", meaningNepali: "गाडी",
    kanjiCharacters: ["車"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "車。", reading: "くるま。", english: "Example: automobile, car.", nepali: "उदाहरण: गाडी।" }
    ]
  },
  {
    id: 'N5-L02-026', lesson: 2, level: 'N5', word: "机", reading: "つくえ",
    meaning: "desk", meaningNepali: "टेबुल / डेस्क",
    kanjiCharacters: ["机"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "机。", reading: "つくえ。", english: "Example: desk.", nepali: "उदाहरण: टेबुल / डेस्क।" }
    ]
  },
  {
    id: 'N5-L02-027', lesson: 2, level: 'N5', word: "椅子", reading: "いす",
    meaning: "chair", meaningNepali: "कुर्सी",
    kanjiCharacters: ["椅", "子"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "椅子。", reading: "いす。", english: "Example: chair.", nepali: "उदाहरण: कुर्सी।" }
    ]
  },
  {
    id: 'N5-L02-028', lesson: 2, level: 'N5', word: "チョコレート", reading: "チョコレート",
    meaning: "chocolate", meaningNepali: "चॉकलेट",
    kanjiCharacters: [], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "チョコレート。", reading: "チョコレート。", english: "Example: chocolate.", nepali: "उदाहरण: चॉकलेट।" }
    ]
  },
  {
    id: 'N5-L02-029', lesson: 2, level: 'N5', word: "コーヒー", reading: "コーヒー",
    meaning: "coffee", meaningNepali: "कफी",
    kanjiCharacters: [], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "コーヒー。", reading: "コーヒー。", english: "Example: coffee.", nepali: "उदाहरण: कफी।" }
    ]
  },
  {
    id: 'N5-L02-030', lesson: 2, level: 'N5', word: "英語", reading: "えいご",
    meaning: "the English language", meaningNepali: "अंग्रेजी भाषा",
    kanjiCharacters: ["英", "語"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "英語。", reading: "えいご。", english: "Example: the English language.", nepali: "उदाहरण: अंग्रेजी भाषा।" }
    ]
  },
  {
    id: 'N5-L02-031', lesson: 2, level: 'N5', word: "日本語", reading: "にほんご",
    meaning: "the Japanese language", meaningNepali: "जापानी भाषा",
    kanjiCharacters: ["日", "本", "語"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "日本語。", reading: "にほんご。", english: "Example: the Japanese language.", nepali: "उदाहरण: जापानी भाषा।" }
    ]
  },
  {
    id: 'N5-L02-032', lesson: 2, level: 'N5', word: "～語", reading: "～ご",
    meaning: "~ language", meaningNepali: "~ भाषा",
    kanjiCharacters: ["語"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "～語。", reading: "～ご。", english: "Example: ~ language.", nepali: "उदाहरण: ~ भाषा।" }
    ]
  },
  {
    id: 'N5-L02-033', lesson: 2, level: 'N5', word: "何", reading: "なん／なに",
    meaning: "what", meaningNepali: "what",
    kanjiCharacters: ["何"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "何。", reading: "なん／なに。", english: "Example: what.", nepali: "उदाहरण: what।" }
    ]
  },
  {
    id: 'N5-L02-034', lesson: 2, level: 'N5', word: "そう", reading: "そう",
    meaning: "so", meaningNepali: "त्यस्तै / हो",
    kanjiCharacters: [], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "そう。", reading: "そう。", english: "Example: so.", nepali: "उदाहरण: त्यस्तै / हो।" }
    ]
  },
  {
    id: 'N5-L02-035', lesson: 2, level: 'N5', word: "違います。", reading: "ちがいます。",
    meaning: "No, it isn't./You are wrong.", meaningNepali: "होइन / फरक छ।",
    kanjiCharacters: ["違"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "違います。。", reading: "ちがいます。。", english: "Example: No, it isn't./You are wrong..", nepali: "उदाहरण: होइन / फरक छ।।" }
    ]
  },
  {
    id: 'N5-L02-036', lesson: 2, level: 'N5', word: "そうですか。", reading: "そうですか。",
    meaning: "I see./Is that so?", meaningNepali: "ए, हो र? / अच्छा।",
    kanjiCharacters: [], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "そうですか。。", reading: "そうですか。。", english: "Example: I see./Is that so?.", nepali: "उदाहरण: ए, हो र? / अच्छा।।" }
    ]
  },
  {
    id: 'N5-L02-037', lesson: 2, level: 'N5', word: "あのう", reading: "あのう",
    meaning: "well (used to show hesitation)", meaningNepali: "उह... (कुरा सुरु गर्दा)",
    kanjiCharacters: [], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "あのう。", reading: "あのう。", english: "Example: well (used to show hesitation).", nepali: "उदाहरण: उह... (कुरा सुरु गर्दा)।" }
    ]
  },
  {
    id: 'N5-L02-038', lesson: 2, level: 'N5', word: "これから お世話に なります。", reading: "これから おせわに なります。",
    meaning: "I hope for your kind assistance hereafter.", meaningNepali: "I hope for your kind assistance hereafter.",
    kanjiCharacters: ["世", "話"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "これから お世話に なります。。", reading: "これから おせわに なります。。", english: "Example: I hope for your kind assistance hereafter..", nepali: "उदाहरण: I hope for your kind assistance hereafter.।" }
    ]
  },
  {
    id: 'N5-L02-039', lesson: 2, level: 'N5', word: "こちらこそ よろしく [おねがいします]。", reading: "こちらこそ よろしく [おねがいします]。",
    meaning: "I am pleased to meet you. (response)", meaningNepali: "I am pleased to meet you. (response)",
    kanjiCharacters: [], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "こちらこそ よろしく [おねがいします]。。", reading: "こちらこそ よろしく [おねがいします]。。", english: "Example: I am pleased to meet you. (response).", nepali: "उदाहरण: I am pleased to meet you. (response)।" }
    ]
  },
  // ════════════════════════════════════════════════════════
  // LESSON 03 (36 ITEMS)
  // ════════════════════════════════════════════════════════
  {
    id: 'N5-L03-001', lesson: 3, level: 'N5', word: "ここ／そこ／あそこ", reading: "ここ／そこ／あそこ",
    meaning: "here／there／that place over there", meaningNepali: "here／there／that place over there",
    kanjiCharacters: [], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "ここ／そこ／あそこ。", reading: "ここ／そこ／あそこ。", english: "Example: here／there／that place over there.", nepali: "उदाहरण: here／there／that place over there।" }
    ]
  },
  {
    id: 'N5-L03-002', lesson: 3, level: 'N5', word: "こちら／そちら／あちら", reading: "こちら／そちら／あちら",
    meaning: "this way, this place／that way, near you／that way, over there (polite equivalents of ここ／そこ／あそこ)", meaningNepali: "this way, this place／that way, near you／that way, over there (polite equivalents of ここ／そこ／あそこ)",
    kanjiCharacters: [], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "こちら／そちら／あちら。", reading: "こちら／そちら／あちら。", english: "Example: this way, this place／that way, near you／that way, over there (polite equivalents of ここ／そこ／あそこ).", nepali: "उदाहरण: this way, this place／that way, near you／that way, over there (polite equivalents of ここ／そこ／あそこ)।" }
    ]
  },
  {
    id: 'N5-L03-003', lesson: 3, level: 'N5', word: "どこ／どちら", reading: "どこ／どちら",
    meaning: "where, what place (どちら is the polite equivalent of どこ)", meaningNepali: "where, what place (どちら is the polite equivalent of どこ)",
    kanjiCharacters: [], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "どこ／どちら。", reading: "どこ／どちら。", english: "Example: where, what place (どちら is the polite equivalent of どこ).", nepali: "उदाहरण: where, what place (どちら is the polite equivalent of どこ)।" }
    ]
  },
  {
    id: 'N5-L03-004', lesson: 3, level: 'N5', word: "教室", reading: "きょうしつ",
    meaning: "classroom", meaningNepali: "कक्षा कोठा",
    kanjiCharacters: ["教", "室"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "教室。", reading: "きょうしつ。", english: "Example: classroom.", nepali: "उदाहरण: कक्षा कोठा।" }
    ]
  },
  {
    id: 'N5-L03-005', lesson: 3, level: 'N5', word: "食堂", reading: "しょくどう",
    meaning: "dining hall, canteen", meaningNepali: "खाना खाने ठाउँ / क्यान्टीन",
    kanjiCharacters: ["食", "堂"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "食堂。", reading: "しょくどう。", english: "Example: dining hall, canteen.", nepali: "उदाहरण: खाना खाने ठाउँ / क्यान्टीन।" }
    ]
  },
  {
    id: 'N5-L03-006', lesson: 3, level: 'N5', word: "事務所", reading: "じむしょ",
    meaning: "office", meaningNepali: "कार्यालय / अफिस",
    kanjiCharacters: ["事", "務", "所"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "事務所。", reading: "じむしょ。", english: "Example: office.", nepali: "उदाहरण: कार्यालय / अफिस।" }
    ]
  },
  {
    id: 'N5-L03-007', lesson: 3, level: 'N5', word: "会議室", reading: "かいぎしつ",
    meaning: "conference room, assembly room", meaningNepali: "मीटिंग हल / सभा कक्ष",
    kanjiCharacters: ["会", "議", "室"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "会議室。", reading: "かいぎしつ。", english: "Example: conference room, assembly room.", nepali: "उदाहरण: मीटिंग हल / सभा कक्ष।" }
    ]
  },
  {
    id: 'N5-L03-008', lesson: 3, level: 'N5', word: "受付", reading: "うけつけ",
    meaning: "reception desk", meaningNepali: "रिसेप्शन desk",
    kanjiCharacters: ["受", "付"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "受付。", reading: "うけつけ。", english: "Example: reception desk.", nepali: "उदाहरण: रिसेप्शन desk।" }
    ]
  },
  {
    id: 'N5-L03-009', lesson: 3, level: 'N5', word: "ロビー", reading: "ロビー",
    meaning: "lobby", meaningNepali: "लबी",
    kanjiCharacters: [], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "ロビー。", reading: "ロビー。", english: "Example: lobby.", nepali: "उदाहरण: लबी।" }
    ]
  },
  {
    id: 'N5-L03-010', lesson: 3, level: 'N5', word: "部屋", reading: "へや",
    meaning: "room", meaningNepali: "कोठा",
    kanjiCharacters: ["部", "屋"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "部屋。", reading: "へや。", english: "Example: room.", nepali: "उदाहरण: कोठा।" }
    ]
  },
  {
    id: 'N5-L03-011', lesson: 3, level: 'N5', word: "トイレ（お手洗い）", reading: "トイレ（おてあらい）",
    meaning: "toilet, rest room", meaningNepali: "toilet, rest room",
    kanjiCharacters: ["手", "洗"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "トイレ（お手洗い）。", reading: "トイレ（おてあらい）。", english: "Example: toilet, rest room.", nepali: "उदाहरण: toilet, rest room।" }
    ]
  },
  {
    id: 'N5-L03-012', lesson: 3, level: 'N5', word: "階段", reading: "かいだん",
    meaning: "staircase", meaningNepali: "सीढी / भर्याङ",
    kanjiCharacters: ["階", "段"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "階段。", reading: "かいだん。", english: "Example: staircase.", nepali: "उदाहरण: सीढी / भर्याङ।" }
    ]
  },
  {
    id: 'N5-L03-013', lesson: 3, level: 'N5', word: "エレベーター", reading: "エレベーター",
    meaning: "elevator, lift", meaningNepali: "लिफ्ट / एलिभेटर",
    kanjiCharacters: [], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "エレベーター。", reading: "エレベーター。", english: "Example: elevator, lift.", nepali: "उदाहरण: लिफ्ट / एलिभेटर।" }
    ]
  },
  {
    id: 'N5-L03-014', lesson: 3, level: 'N5', word: "エスカレーター", reading: "エスカレーター",
    meaning: "escalator, lift", meaningNepali: "एस्कलेटर",
    kanjiCharacters: [], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "エスカレーター。", reading: "エスカレーター。", english: "Example: escalator, lift.", nepali: "उदाहरण: एस्कलेटर।" }
    ]
  },
  {
    id: 'N5-L03-015', lesson: 3, level: 'N5', word: "国", reading: "くに",
    meaning: "country", meaningNepali: "country",
    kanjiCharacters: ["国"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "国。", reading: "くに。", english: "Example: country.", nepali: "उदाहरण: country।" }
    ]
  },
  {
    id: 'N5-L03-016', lesson: 3, level: 'N5', word: "会社", reading: "かいしゃ",
    meaning: "company", meaningNepali: "कम्पनी",
    kanjiCharacters: ["会", "社"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "会社。", reading: "かいしゃ。", english: "Example: company.", nepali: "उदाहरण: कम्पनी।" }
    ]
  },
  {
    id: 'N5-L03-017', lesson: 3, level: 'N5', word: "家", reading: "うち",
    meaning: "house, home", meaningNepali: "घर",
    kanjiCharacters: ["家"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "家。", reading: "うち。", english: "Example: house, home.", nepali: "उदाहरण: घर।" }
    ]
  },
  {
    id: 'N5-L03-018', lesson: 3, level: 'N5', word: "電話", reading: "でんわ",
    meaning: "telephone, telephone call", meaningNepali: "फोन / टेलिफोन",
    kanjiCharacters: ["電", "話"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "電話。", reading: "でんわ。", english: "Example: telephone, telephone call.", nepali: "उदाहरण: फोन / टेलिफोन।" }
    ]
  },
  {
    id: 'N5-L03-019', lesson: 3, level: 'N5', word: "靴", reading: "くつ",
    meaning: "shoes", meaningNepali: "जुत्ता",
    kanjiCharacters: ["靴"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "靴。", reading: "くつ。", english: "Example: shoes.", nepali: "उदाहरण: जुत्ता।" }
    ]
  },
  {
    id: 'N5-L03-020', lesson: 3, level: 'N5', word: "ネクタイ", reading: "ネクタイ",
    meaning: "necktie", meaningNepali: "नेकटाई",
    kanjiCharacters: [], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "ネクタイ。", reading: "ネクタイ。", english: "Example: necktie.", nepali: "उदाहरण: नेकटाई।" }
    ]
  },
  {
    id: 'N5-L03-021', lesson: 3, level: 'N5', word: "ワイン", reading: "ワイン",
    meaning: "wine", meaningNepali: "वाइन / रक्सी",
    kanjiCharacters: [], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "ワイン。", reading: "ワイン。", english: "Example: wine.", nepali: "उदाहरण: वाइन / रक्सी।" }
    ]
  },
  {
    id: 'N5-L03-022', lesson: 3, level: 'N5', word: "たばこ", reading: "たばこ",
    meaning: "tobacco, cigarette", meaningNepali: "चुरोट",
    kanjiCharacters: [], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "たばこ。", reading: "たばこ。", english: "Example: tobacco, cigarette.", nepali: "उदाहरण: चुरोट।" }
    ]
  },
  {
    id: 'N5-L03-023', lesson: 3, level: 'N5', word: "売り場", reading: "うりば",
    meaning: "department, counter (in a department store)", meaningNepali: "बिक्री कक्ष / काउन्टर",
    kanjiCharacters: ["売", "場"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "売り場。", reading: "うりば。", english: "Example: department, counter (in a department store).", nepali: "उदाहरण: बिक्री कक्ष / काउन्टर।" }
    ]
  },
  {
    id: 'N5-L03-024', lesson: 3, level: 'N5', word: "地下", reading: "ちか",
    meaning: "basement", meaningNepali: "भूमिगत / बेसमेन्ट",
    kanjiCharacters: ["地", "下"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "地下。", reading: "ちか。", english: "Example: basement.", nepali: "उदाहरण: भूमिगत / बेसमेन्ट।" }
    ]
  },
  {
    id: 'N5-L03-025', lesson: 3, level: 'N5', word: "～階", reading: "～かい",
    meaning: "-th floor", meaningNepali: "~ पटक / ~ चोटि",
    kanjiCharacters: ["階"], partOfSpeech: "I-Adj",
    grammarSentences: [
      { japanese: "～階。", reading: "～かい。", english: "Example: -th floor.", nepali: "उदाहरण: ~ पटक / ~ चोटि।" }
    ]
  },
  {
    id: 'N5-L03-026', lesson: 3, level: 'N5', word: "何階", reading: "なんがい",
    meaning: "what floor", meaningNepali: "कति औं तल्ला",
    kanjiCharacters: ["何", "階"], partOfSpeech: "I-Adj",
    grammarSentences: [
      { japanese: "何階。", reading: "なんがい。", english: "Example: what floor.", nepali: "उदाहरण: कति औं तल्ला।" }
    ]
  },
  {
    id: 'N5-L03-027', lesson: 3, level: 'N5', word: "～円", reading: "～えん",
    meaning: "~ yen", meaningNepali: "~ yen",
    kanjiCharacters: ["円"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "～円。", reading: "～えん。", english: "Example: ~ yen.", nepali: "उदाहरण: ~ yen।" }
    ]
  },
  {
    id: 'N5-L03-028', lesson: 3, level: 'N5', word: "いくら", reading: "いくら",
    meaning: "how much", meaningNepali: "कति (मूल्य)",
    kanjiCharacters: [], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "いくら。", reading: "いくら。", english: "Example: how much.", nepali: "उदाहरण: कति (मूल्य)।" }
    ]
  },
  {
    id: 'N5-L03-029', lesson: 3, level: 'N5', word: "百", reading: "ひゃく",
    meaning: "hundred", meaningNepali: "सय (१००)",
    kanjiCharacters: ["百"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "百。", reading: "ひゃく。", english: "Example: hundred.", nepali: "उदाहरण: सय (१००)।" }
    ]
  },
  {
    id: 'N5-L03-030', lesson: 3, level: 'N5', word: "千", reading: "せん",
    meaning: "thousand", meaningNepali: "हजार (१,०००)",
    kanjiCharacters: ["千"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "千。", reading: "せん。", english: "Example: thousand.", nepali: "उदाहरण: हजार (१,०००)।" }
    ]
  },
  {
    id: 'N5-L03-031', lesson: 3, level: 'N5', word: "万", reading: "まん",
    meaning: "ten thousand", meaningNepali: "दस हजार (१०,०००)",
    kanjiCharacters: ["万"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "万。", reading: "まん。", english: "Example: ten thousand.", nepali: "उदाहरण: दस हजार (१०,०००)।" }
    ]
  },
  {
    id: 'N5-L03-032', lesson: 3, level: 'N5', word: "すみません。", reading: "すみません。",
    meaning: "Excuse me.", meaningNepali: "माफ गर्नुहोला।",
    kanjiCharacters: [], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "すみません。。", reading: "すみません。。", english: "Example: Excuse me..", nepali: "उदाहरण: माफ गर्नुहोला।।" }
    ]
  },
  {
    id: 'N5-L03-033', lesson: 3, level: 'N5', word: "でございます", reading: "でございます",
    meaning: "(polite equivalent of です)", meaningNepali: "(polite equivalent of です)",
    kanjiCharacters: [], partOfSpeech: "Verb",
    grammarSentences: [
      { japanese: "でございます。", reading: "でございます。", english: "Example: (polite equivalent of です).", nepali: "उदाहरण: (polite equivalent of です)।" }
    ]
  },
  {
    id: 'N5-L03-034', lesson: 3, level: 'N5', word: "[～を] 見せて ください。", reading: "[～を] みせて ください。",
    meaning: "Please show me [~].", meaningNepali: "Please show me [~].",
    kanjiCharacters: ["見"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "[～を] 見せて ください。。", reading: "[～を] みせて ください。。", english: "Example: Please show me [~]..", nepali: "उदाहरण: Please show me [~].।" }
    ]
  },
  {
    id: 'N5-L03-035', lesson: 3, level: 'N5', word: "それでは", reading: "それでは",
    meaning: "well, then, in that case", meaningNepali: "well, then, in that case",
    kanjiCharacters: [], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "それでは。", reading: "それでは。", english: "Example: well, then, in that case.", nepali: "उदाहरण: well, then, in that case।" }
    ]
  },
  {
    id: 'N5-L03-036', lesson: 3, level: 'N5', word: "[～を] ください。", reading: "[～を] ください。",
    meaning: "Give me [~], please.", meaningNepali: "Give me [~], please.",
    kanjiCharacters: [], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "[～を] ください。。", reading: "[～を] ください。。", english: "Example: Give me [~], please..", nepali: "उदाहरण: Give me [~], please.।" }
    ]
  },
  // ════════════════════════════════════════════════════════
  // LESSON 04 (55 ITEMS)
  // ════════════════════════════════════════════════════════
  {
    id: 'N5-L04-001', lesson: 4, level: 'N5', word: "起きます", reading: "おきます",
    meaning: "get up, wake up", meaningNepali: "उठ्नु (बिहान)",
    kanjiCharacters: ["起"], partOfSpeech: "Verb",
    grammarSentences: [
      { japanese: "起きます。", reading: "おきます。", english: "Example: get up, wake up.", nepali: "उदाहरण: उठ्नु (बिहान)।" }
    ]
  },
  {
    id: 'N5-L04-002', lesson: 4, level: 'N5', word: "寝ます", reading: "ねます",
    meaning: "sleep, go to bed", meaningNepali: "सुत्नु",
    kanjiCharacters: ["寝"], partOfSpeech: "Verb",
    grammarSentences: [
      { japanese: "寝ます。", reading: "ねます。", english: "Example: sleep, go to bed.", nepali: "उदाहरण: सुत्नु।" }
    ]
  },
  {
    id: 'N5-L04-003', lesson: 4, level: 'N5', word: "働きます", reading: "はたらきます",
    meaning: "work", meaningNepali: "काम गर्नु",
    kanjiCharacters: ["働"], partOfSpeech: "Verb",
    grammarSentences: [
      { japanese: "働きます。", reading: "はたらきます。", english: "Example: work.", nepali: "उदाहरण: काम गर्नु।" }
    ]
  },
  {
    id: 'N5-L04-004', lesson: 4, level: 'N5', word: "休みます", reading: "やすみます",
    meaning: "take a rest, take a holiday", meaningNepali: "आराम गर्नु / बिदा लिनु",
    kanjiCharacters: ["休"], partOfSpeech: "Verb",
    grammarSentences: [
      { japanese: "休みます。", reading: "やすみます。", english: "Example: take a rest, take a holiday.", nepali: "उदाहरण: आराम गर्नु / बिदा लिनु।" }
    ]
  },
  {
    id: 'N5-L04-005', lesson: 4, level: 'N5', word: "勉強します", reading: "べんきょうします",
    meaning: "study", meaningNepali: "अध्ययन गर्नु / पढ्नु",
    kanjiCharacters: ["勉", "強"], partOfSpeech: "Verb",
    grammarSentences: [
      { japanese: "勉強します。", reading: "べんきょうします。", english: "Example: study.", nepali: "उदाहरण: अध्ययन गर्नु / पढ्नु।" }
    ]
  },
  {
    id: 'N5-L04-006', lesson: 4, level: 'N5', word: "終わります", reading: "おわります",
    meaning: "finish", meaningNepali: "सकिनु / समाप्त हुनु",
    kanjiCharacters: ["終"], partOfSpeech: "Verb",
    grammarSentences: [
      { japanese: "終わります。", reading: "おわります。", english: "Example: finish.", nepali: "उदाहरण: सकिनु / समाप्त हुनु।" }
    ]
  },
  {
    id: 'N5-L04-007', lesson: 4, level: 'N5', word: "デパート", reading: "デパート",
    meaning: "department store", meaningNepali: "डिपार्टमेन्ट स्टोर",
    kanjiCharacters: [], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "デパート。", reading: "デパート。", english: "Example: department store.", nepali: "उदाहरण: डिपार्टमेन्ट स्टोर।" }
    ]
  },
  {
    id: 'N5-L04-008', lesson: 4, level: 'N5', word: "銀行", reading: "ぎんこう",
    meaning: "bank", meaningNepali: "बैंक",
    kanjiCharacters: ["銀", "行"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "銀行。", reading: "ぎんこう。", english: "Example: bank.", nepali: "उदाहरण: बैंक।" }
    ]
  },
  {
    id: 'N5-L04-009', lesson: 4, level: 'N5', word: "郵便局", reading: "ゆうびんきょく",
    meaning: "post office", meaningNepali: "हुलाक कार्यालय",
    kanjiCharacters: ["郵", "便", "局"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "郵便局。", reading: "ゆうびんきょく。", english: "Example: post office.", nepali: "उदाहरण: हुलाक कार्यालय।" }
    ]
  },
  {
    id: 'N5-L04-010', lesson: 4, level: 'N5', word: "図書館", reading: "としょかん",
    meaning: "library", meaningNepali: "पुस्तकालय",
    kanjiCharacters: ["図", "書", "館"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "図書館。", reading: "としょかん。", english: "Example: library.", nepali: "उदाहरण: पुस्तकालय।" }
    ]
  },
  {
    id: 'N5-L04-011', lesson: 4, level: 'N5', word: "美術館", reading: "びじゅつかん",
    meaning: "art museum", meaningNepali: "कला संग्रहालय",
    kanjiCharacters: ["美", "術", "館"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "美術館。", reading: "びじゅつかん。", english: "Example: art museum.", nepali: "उदाहरण: कला संग्रहालय।" }
    ]
  },
  {
    id: 'N5-L04-012', lesson: 4, level: 'N5', word: "今", reading: "いま",
    meaning: "now", meaningNepali: "अहिले",
    kanjiCharacters: ["今"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "今。", reading: "いま。", english: "Example: now.", nepali: "उदाहरण: अहिले।" }
    ]
  },
  {
    id: 'N5-L04-013', lesson: 4, level: 'N5', word: "～時", reading: "～じ",
    meaning: "~ o'clock", meaningNepali: "~ बजे",
    kanjiCharacters: ["時"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "～時。", reading: "～じ。", english: "Example: ~ o'clock.", nepali: "उदाहरण: ~ बजे।" }
    ]
  },
  {
    id: 'N5-L04-014', lesson: 4, level: 'N5', word: "～分", reading: "～ふん／ぷん",
    meaning: "~ minute", meaningNepali: "~ minute",
    kanjiCharacters: ["分"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "～分。", reading: "～ふん／ぷん。", english: "Example: ~ minute.", nepali: "उदाहरण: ~ minute।" }
    ]
  },
  {
    id: 'N5-L04-015', lesson: 4, level: 'N5', word: "半", reading: "はん",
    meaning: "half", meaningNepali: "आधा (साढे)",
    kanjiCharacters: ["半"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "半。", reading: "はん。", english: "Example: half.", nepali: "उदाहरण: आधा (साढे)।" }
    ]
  },
  {
    id: 'N5-L04-016', lesson: 4, level: 'N5', word: "何時", reading: "なんじ",
    meaning: "what time", meaningNepali: "कति बजे",
    kanjiCharacters: ["何", "時"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "何時。", reading: "なんじ。", english: "Example: what time.", nepali: "उदाहरण: कति बजे।" }
    ]
  },
  {
    id: 'N5-L04-017', lesson: 4, level: 'N5', word: "何分", reading: "なんぷん",
    meaning: "what minute", meaningNepali: "what minute",
    kanjiCharacters: ["何", "分"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "何分。", reading: "なんぷん。", english: "Example: what minute.", nepali: "उदाहरण: what minute।" }
    ]
  },
  {
    id: 'N5-L04-018', lesson: 4, level: 'N5', word: "午前", reading: "ごぜん",
    meaning: "a.m., morning", meaningNepali: "बिहान (AM)",
    kanjiCharacters: ["午", "前"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "午前。", reading: "ごぜん。", english: "Example: a.m., morning.", nepali: "उदाहरण: बिहान (AM)।" }
    ]
  },
  {
    id: 'N5-L04-019', lesson: 4, level: 'N5', word: "午後", reading: "ごご",
    meaning: "p.m., afternoon", meaningNepali: "दिउँसो/साँझ (PM)",
    kanjiCharacters: ["午", "後"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "午後。", reading: "ごご。", english: "Example: p.m., afternoon.", nepali: "उदाहरण: दिउँसो/साँझ (PM)।" }
    ]
  },
  {
    id: 'N5-L04-020', lesson: 4, level: 'N5', word: "朝", reading: "あさ",
    meaning: "morning", meaningNepali: "बिहान",
    kanjiCharacters: ["朝"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "朝。", reading: "あさ。", english: "Example: morning.", nepali: "उदाहरण: बिहान।" }
    ]
  },
  {
    id: 'N5-L04-021', lesson: 4, level: 'N5', word: "昼", reading: "ひる",
    meaning: "daytime, noon", meaningNepali: "दिउँसो",
    kanjiCharacters: ["昼"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "昼。", reading: "ひる。", english: "Example: daytime, noon.", nepali: "उदाहरण: दिउँसो।" }
    ]
  },
  {
    id: 'N5-L04-022', lesson: 4, level: 'N5', word: "晩／夜", reading: "ばん／よる",
    meaning: "night, evening", meaningNepali: "night, evening",
    kanjiCharacters: ["晩", "夜"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "晩／夜。", reading: "ばん／よる。", english: "Example: night, evening.", nepali: "उदाहरण: night, evening।" }
    ]
  },
  {
    id: 'N5-L04-023', lesson: 4, level: 'N5', word: "一昨日", reading: "おととい",
    meaning: "the day before yesterday", meaningNepali: "अस्ति",
    kanjiCharacters: ["一", "昨", "日"], partOfSpeech: "I-Adj",
    grammarSentences: [
      { japanese: "一昨日。", reading: "おととい。", english: "Example: the day before yesterday.", nepali: "उदाहरण: अस्ति।" }
    ]
  },
  {
    id: 'N5-L04-024', lesson: 4, level: 'N5', word: "昨日", reading: "きのう",
    meaning: "yesterday", meaningNepali: "हिजो",
    kanjiCharacters: ["昨", "日"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "昨日。", reading: "きのう。", english: "Example: yesterday.", nepali: "उदाहरण: हिजो।" }
    ]
  },
  {
    id: 'N5-L04-025', lesson: 4, level: 'N5', word: "今日", reading: "きょう",
    meaning: "today", meaningNepali: "आज",
    kanjiCharacters: ["今", "日"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "今日。", reading: "きょう。", english: "Example: today.", nepali: "उदाहरण: आज।" }
    ]
  },
  {
    id: 'N5-L04-026', lesson: 4, level: 'N5', word: "明日", reading: "あした",
    meaning: "tomorrow", meaningNepali: "भोलि",
    kanjiCharacters: ["明", "日"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "明日。", reading: "あした。", english: "Example: tomorrow.", nepali: "उदाहरण: भोलि।" }
    ]
  },
  {
    id: 'N5-L04-027', lesson: 4, level: 'N5', word: "明後日", reading: "あさって",
    meaning: "the day after tomorrow", meaningNepali: "पर्सि",
    kanjiCharacters: ["明", "後", "日"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "明後日。", reading: "あさって。", english: "Example: the day after tomorrow.", nepali: "उदाहरण: पर्सि।" }
    ]
  },
  {
    id: 'N5-L04-028', lesson: 4, level: 'N5', word: "今朝", reading: "けさ",
    meaning: "this morning", meaningNepali: "आज बिहान",
    kanjiCharacters: ["今", "朝"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "今朝。", reading: "けさ。", english: "Example: this morning.", nepali: "उदाहरण: आज बिहान।" }
    ]
  },
  {
    id: 'N5-L04-029', lesson: 4, level: 'N5', word: "今晩", reading: "こんばん",
    meaning: "this evening, tonight", meaningNepali: "आज राति",
    kanjiCharacters: ["今", "晩"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "今晩。", reading: "こんばん。", english: "Example: this evening, tonight.", nepali: "उदाहरण: आज राति।" }
    ]
  },
  {
    id: 'N5-L04-030', lesson: 4, level: 'N5', word: "休み", reading: "やすみ",
    meaning: "rest, a holiday, a day off", meaningNepali: "बिदा / विश्राम",
    kanjiCharacters: ["休"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "休み。", reading: "やすみ。", english: "Example: rest, a holiday, a day off.", nepali: "उदाहरण: बिदा / विश्राम।" }
    ]
  },
  {
    id: 'N5-L04-031', lesson: 4, level: 'N5', word: "昼休み", reading: "ひるやすみ",
    meaning: "lunchtime", meaningNepali: "दिउँसोको खाना खाने समय / ब्रेक",
    kanjiCharacters: ["昼", "休"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "昼休み。", reading: "ひるやすみ。", english: "Example: lunchtime.", nepali: "उदाहरण: दिउँसोको खाना खाने समय / ब्रेक।" }
    ]
  },
  {
    id: 'N5-L04-032', lesson: 4, level: 'N5', word: "毎朝", reading: "まいあさ",
    meaning: "every morning", meaningNepali: "हरेक बिहान",
    kanjiCharacters: ["毎", "朝"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "毎朝。", reading: "まいあさ。", english: "Example: every morning.", nepali: "उदाहरण: हरेक बिहान।" }
    ]
  },
  {
    id: 'N5-L04-033', lesson: 4, level: 'N5', word: "毎晩", reading: "まいばん",
    meaning: "every night", meaningNepali: "हरेक राति",
    kanjiCharacters: ["毎", "晩"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "毎晩。", reading: "まいばん。", english: "Example: every night.", nepali: "उदाहरण: हरेक राति।" }
    ]
  },
  {
    id: 'N5-L04-034', lesson: 4, level: 'N5', word: "毎日", reading: "まいにち",
    meaning: "every day", meaningNepali: "हरेक दिन",
    kanjiCharacters: ["毎", "日"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "毎日。", reading: "まいにち。", english: "Example: every day.", nepali: "उदाहरण: हरेक दिन।" }
    ]
  },
  {
    id: 'N5-L04-035', lesson: 4, level: 'N5', word: "月曜日", reading: "げつようび",
    meaning: "Monday", meaningNepali: "सोमबार",
    kanjiCharacters: ["月", "曜", "日"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "月曜日。", reading: "げつようび。", english: "Example: Monday.", nepali: "उदाहरण: सोमबार।" }
    ]
  },
  {
    id: 'N5-L04-036', lesson: 4, level: 'N5', word: "火曜日", reading: "かようび",
    meaning: "Tuesday", meaningNepali: "मंगलबार",
    kanjiCharacters: ["火", "曜", "日"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "火曜日。", reading: "かようび。", english: "Example: Tuesday.", nepali: "उदाहरण: मंगलबार।" }
    ]
  },
  {
    id: 'N5-L04-037', lesson: 4, level: 'N5', word: "水曜日", reading: "すいようび",
    meaning: "Wednesday", meaningNepali: "बुधबार",
    kanjiCharacters: ["水", "曜", "日"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "水曜日。", reading: "すいようび。", english: "Example: Wednesday.", nepali: "उदाहरण: बुधबार।" }
    ]
  },
  {
    id: 'N5-L04-038', lesson: 4, level: 'N5', word: "木曜日", reading: "もくようび",
    meaning: "Thursday", meaningNepali: "बिहीबार",
    kanjiCharacters: ["木", "曜", "日"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "木曜日。", reading: "もくようび。", english: "Example: Thursday.", nepali: "उदाहरण: बिहीबार।" }
    ]
  },
  {
    id: 'N5-L04-039', lesson: 4, level: 'N5', word: "金曜日", reading: "きんようび",
    meaning: "Friday", meaningNepali: "शुक्रबार",
    kanjiCharacters: ["金", "曜", "日"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "金曜日。", reading: "きんようび。", english: "Example: Friday.", nepali: "उदाहरण: शुक्रबार।" }
    ]
  },
  {
    id: 'N5-L04-040', lesson: 4, level: 'N5', word: "土曜日", reading: "どようび",
    meaning: "Saturday", meaningNepali: "शनिबार",
    kanjiCharacters: ["土", "曜", "日"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "土曜日。", reading: "どようび。", english: "Example: Saturday.", nepali: "उदाहरण: शनिबार।" }
    ]
  },
  {
    id: 'N5-L04-041', lesson: 4, level: 'N5', word: "日曜日", reading: "にちようび",
    meaning: "Sunday", meaningNepali: "आइतबार",
    kanjiCharacters: ["日", "曜"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "日曜日。", reading: "にちようび。", english: "Example: Sunday.", nepali: "उदाहरण: आइतबार।" }
    ]
  },
  {
    id: 'N5-L04-042', lesson: 4, level: 'N5', word: "何曜日", reading: "なんようび",
    meaning: "what day of the week", meaningNepali: "कुन बार",
    kanjiCharacters: ["何", "曜", "日"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "何曜日。", reading: "なんようび。", english: "Example: what day of the week.", nepali: "उदाहरण: कुन बार।" }
    ]
  },
  {
    id: 'N5-L04-043', lesson: 4, level: 'N5', word: "～番", reading: "～ばん",
    meaning: "number ~", meaningNepali: "number ~",
    kanjiCharacters: ["番"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "～番。", reading: "～ばん。", english: "Example: number ~.", nepali: "उदाहरण: number ~।" }
    ]
  },
  {
    id: 'N5-L04-044', lesson: 4, level: 'N5', word: "何番", reading: "なんばん",
    meaning: "what number", meaningNepali: "कति नम्बर",
    kanjiCharacters: ["何", "番"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "何番。", reading: "なんばん。", english: "Example: what number.", nepali: "उदाहरण: कति नम्बर।" }
    ]
  },
  {
    id: 'N5-L04-045', lesson: 4, level: 'N5', word: "～から", reading: "～から",
    meaning: "from ~", meaningNepali: "~ भएकोले / ~ कारण",
    kanjiCharacters: [], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "～から。", reading: "～から。", english: "Example: from ~.", nepali: "उदाहरण: ~ भएकोले / ~ कारण।" }
    ]
  },
  {
    id: 'N5-L04-046', lesson: 4, level: 'N5', word: "～まで", reading: "～まで",
    meaning: "up to ~, until ~", meaningNepali: "~ सम्म",
    kanjiCharacters: [], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "～まで。", reading: "～まで。", english: "Example: up to ~, until ~.", nepali: "उदाहरण: ~ सम्म।" }
    ]
  },
  {
    id: 'N5-L04-047', lesson: 4, level: 'N5', word: "～と～", reading: "～と～",
    meaning: "and (used to connect nouns)", meaningNepali: "~ र ~",
    kanjiCharacters: [], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "～と～。", reading: "～と～。", english: "Example: and (used to connect nouns).", nepali: "उदाहरण: ~ र ~।" }
    ]
  },
  {
    id: 'N5-L04-048', lesson: 4, level: 'N5', word: "お宅", reading: "おたく",
    meaning: "your place", meaningNepali: "your place",
    kanjiCharacters: ["宅"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "お宅。", reading: "おたく。", english: "Example: your place.", nepali: "उदाहरण: your place।" }
    ]
  },
  {
    id: 'N5-L04-049', lesson: 4, level: 'N5', word: "それは たいへんですね。", reading: "それは たいへんですね。",
    meaning: "That's tough, isn't it? (expressing sympathy)", meaningNepali: "That's tough, isn't it? (expressing sympathy)",
    kanjiCharacters: [], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "それは たいへんですね。。", reading: "それは たいへんですね。。", english: "Example: That's tough, isn't it? (expressing sympathy).", nepali: "उदाहरण: That's tough, isn't it? (expressing sympathy)।" }
    ]
  },
  {
    id: 'N5-L04-050', lesson: 4, level: 'N5', word: "さあ", reading: "さあ",
    meaning: "well, let me see", meaningNepali: "well, let me see",
    kanjiCharacters: [], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "さあ。", reading: "さあ。", english: "Example: well, let me see.", nepali: "उदाहरण: well, let me see।" }
    ]
  },
  {
    id: 'N5-L04-051', lesson: 4, level: 'N5', word: "104", reading: "104",
    meaning: "information, directory assistance", meaningNepali: "information, directory assistance",
    kanjiCharacters: [], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "104。", reading: "104。", english: "Example: information, directory assistance.", nepali: "उदाहरण: information, directory assistance।" }
    ]
  },
  {
    id: 'N5-L04-052', lesson: 4, level: 'N5', word: "お願いします。", reading: "おねがいします。",
    meaning: "Please. (lit. ask for a favor)", meaningNepali: "कृपया गरिदिनुहोस्।",
    kanjiCharacters: ["願"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "お願いします。。", reading: "おねがいします。。", english: "Example: Please. (lit. ask for a favor).", nepali: "उदाहरण: कृपया गरिदिनुहोस्।।" }
    ]
  },
  {
    id: 'N5-L04-053', lesson: 4, level: 'N5', word: "少々 お待ちください。", reading: "しょうしょう おまちください。",
    meaning: "Certainly (sir, madam) (lit. please wait a little)", meaningNepali: "Certainly (sir, madam) (lit. please wait a little)",
    kanjiCharacters: ["少", "待"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "少々 お待ちください。。", reading: "しょうしょう おまちください。。", english: "Example: Certainly (sir, madam) (lit. please wait a little).", nepali: "उदाहरण: Certainly (sir, madam) (lit. please wait a little)।" }
    ]
  },
  {
    id: 'N5-L04-054', lesson: 4, level: 'N5', word: "お尋ねの 番号", reading: "おたずねの ばんごう",
    meaning: "the number being inquired about", meaningNepali: "the number being inquired about",
    kanjiCharacters: ["尋", "番", "号"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "お尋ねの 番号。", reading: "おたずねの ばんごう。", english: "Example: the number being inquired about.", nepali: "उदाहरण: the number being inquired about।" }
    ]
  },
  {
    id: 'N5-L04-055', lesson: 4, level: 'N5', word: "[どうも] ありがとうございました。", reading: "[どうも] ありがとうございました。",
    meaning: "Thank you very much.", meaningNepali: "Thank you very much.",
    kanjiCharacters: [], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "[どうも] ありがとうございました。。", reading: "[どうも] ありがとうございました。。", english: "Example: Thank you very much..", nepali: "उदाहरण: Thank you very much.।" }
    ]
  },
  // ════════════════════════════════════════════════════════
  // LESSON 05 (55 ITEMS)
  // ════════════════════════════════════════════════════════
  {
    id: 'N5-L05-001', lesson: 5, level: 'N5', word: "行きます", reading: "いきます",
    meaning: "go", meaningNepali: "जानु",
    kanjiCharacters: ["行"], partOfSpeech: "Verb",
    grammarSentences: [
      { japanese: "行きます。", reading: "いきます。", english: "Example: go.", nepali: "उदाहरण: जानु।" }
    ]
  },
  {
    id: 'N5-L05-002', lesson: 5, level: 'N5', word: "来ます", reading: "きます",
    meaning: "come", meaningNepali: "आउनु",
    kanjiCharacters: ["来"], partOfSpeech: "Verb",
    grammarSentences: [
      { japanese: "来ます。", reading: "きます。", english: "Example: come.", nepali: "उदाहरण: आउनु।" }
    ]
  },
  {
    id: 'N5-L05-003', lesson: 5, level: 'N5', word: "帰ります", reading: "かえります",
    meaning: "go home, return", meaningNepali: "फर्कनु (घर)",
    kanjiCharacters: ["帰"], partOfSpeech: "Verb",
    grammarSentences: [
      { japanese: "帰ります。", reading: "かえります。", english: "Example: go home, return.", nepali: "उदाहरण: फर्कनु (घर)।" }
    ]
  },
  {
    id: 'N5-L05-004', lesson: 5, level: 'N5', word: "学校", reading: "がっこう",
    meaning: "school", meaningNepali: "विद्यालय / स्कूल",
    kanjiCharacters: ["学", "校"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "学校。", reading: "がっこう。", english: "Example: school.", nepali: "उदाहरण: विद्यालय / स्कूल।" }
    ]
  },
  {
    id: 'N5-L05-005', lesson: 5, level: 'N5', word: "スーパー", reading: "スーパー",
    meaning: "supermarket", meaningNepali: "सुपरमार्केट",
    kanjiCharacters: [], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "スーパー。", reading: "スーパー。", english: "Example: supermarket.", nepali: "उदाहरण: सुपरमार्केट।" }
    ]
  },
  {
    id: 'N5-L05-006', lesson: 5, level: 'N5', word: "駅", reading: "えき",
    meaning: "station", meaningNepali: "स्टेशन",
    kanjiCharacters: ["駅"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "駅。", reading: "えき。", english: "Example: station.", nepali: "उदाहरण: स्टेशन।" }
    ]
  },
  {
    id: 'N5-L05-007', lesson: 5, level: 'N5', word: "飛行機", reading: "ひこうき",
    meaning: "airplane", meaningNepali: "हवाईजहाज",
    kanjiCharacters: ["飛", "行", "機"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "飛行機。", reading: "ひこうき。", english: "Example: airplane.", nepali: "उदाहरण: हवाईजहाज।" }
    ]
  },
  {
    id: 'N5-L05-008', lesson: 5, level: 'N5', word: "船", reading: "ふね",
    meaning: "ship", meaningNepali: "पानीजहाज",
    kanjiCharacters: ["船"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "船。", reading: "ふね。", english: "Example: ship.", nepali: "उदाहरण: पानीजहाज।" }
    ]
  },
  {
    id: 'N5-L05-009', lesson: 5, level: 'N5', word: "電車", reading: "でんしゃ",
    meaning: "electric train", meaningNepali: "रेल / ट्रेन",
    kanjiCharacters: ["電", "車"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "電車。", reading: "でんしゃ。", english: "Example: electric train.", nepali: "उदाहरण: रेल / ट्रेन।" }
    ]
  },
  {
    id: 'N5-L05-010', lesson: 5, level: 'N5', word: "地下鉄", reading: "ちかてつ",
    meaning: "subway, underground", meaningNepali: "सबवे / भूमिगत रेल",
    kanjiCharacters: ["地", "下", "鉄"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "地下鉄。", reading: "ちかてつ。", english: "Example: subway, underground.", nepali: "उदाहरण: सबवे / भूमिगत रेल।" }
    ]
  },
  {
    id: 'N5-L05-011', lesson: 5, level: 'N5', word: "新幹線", reading: "しんかんせん",
    meaning: "the Shinkansen, the bullet train", meaningNepali: "बुलेट ट्रेन (शिन्कान्सेन)",
    kanjiCharacters: ["新", "幹", "線"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "新幹線。", reading: "しんかんせん。", english: "Example: the Shinkansen, the bullet train.", nepali: "उदाहरण: बुलेट ट्रेन (शिन्कान्सेन)।" }
    ]
  },
  {
    id: 'N5-L05-012', lesson: 5, level: 'N5', word: "バス", reading: "バス",
    meaning: "bus", meaningNepali: "बस",
    kanjiCharacters: [], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "バス。", reading: "バス。", english: "Example: bus.", nepali: "उदाहरण: बस।" }
    ]
  },
  {
    id: 'N5-L05-013', lesson: 5, level: 'N5', word: "タクシー", reading: "タクシー",
    meaning: "taxi", meaningNepali: "ट्याक्सी",
    kanjiCharacters: [], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "タクシー。", reading: "タクシー。", english: "Example: taxi.", nepali: "उदाहरण: ट्याक्सी।" }
    ]
  },
  {
    id: 'N5-L05-014', lesson: 5, level: 'N5', word: "自転車", reading: "じてんしゃ",
    meaning: "bicycle", meaningNepali: "साइकल",
    kanjiCharacters: ["自", "転", "車"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "自転車。", reading: "じてんしゃ。", english: "Example: bicycle.", nepali: "उदाहरण: साइकल।" }
    ]
  },
  {
    id: 'N5-L05-015', lesson: 5, level: 'N5', word: "歩いて", reading: "あるいて",
    meaning: "on foot", meaningNepali: "पैदल (हिँडेर)",
    kanjiCharacters: ["歩"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "歩いて。", reading: "あるいて。", english: "Example: on foot.", nepali: "उदाहरण: पैदल (हिँडेर)।" }
    ]
  },
  {
    id: 'N5-L05-016', lesson: 5, level: 'N5', word: "人", reading: "ひと",
    meaning: "person, people", meaningNepali: "मान्छे / व्यक्ति",
    kanjiCharacters: ["人"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "人。", reading: "ひと。", english: "Example: person, people.", nepali: "उदाहरण: मान्छे / व्यक्ति।" }
    ]
  },
  {
    id: 'N5-L05-017', lesson: 5, level: 'N5', word: "友達", reading: "ともだち",
    meaning: "friend", meaningNepali: "साथी",
    kanjiCharacters: ["友", "達"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "友達。", reading: "ともだち。", english: "Example: friend.", nepali: "उदाहरण: साथी।" }
    ]
  },
  {
    id: 'N5-L05-018', lesson: 5, level: 'N5', word: "彼", reading: "かれ",
    meaning: "he, boyfriend, lover", meaningNepali: "उहाँ / प्रेमी",
    kanjiCharacters: ["彼"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "彼。", reading: "かれ。", english: "Example: he, boyfriend, lover.", nepali: "उदाहरण: उहाँ / प्रेमी।" }
    ]
  },
  {
    id: 'N5-L05-019', lesson: 5, level: 'N5', word: "彼女", reading: "かのじょ",
    meaning: "she, girlfriend, lover", meaningNepali: "उहाँ (महिला) / प्रेमिका",
    kanjiCharacters: ["彼", "女"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "彼女。", reading: "かのじょ。", english: "Example: she, girlfriend, lover.", nepali: "उदाहरण: उहाँ (महिला) / प्रेमिका।" }
    ]
  },
  {
    id: 'N5-L05-020', lesson: 5, level: 'N5', word: "家族", reading: "かぞく",
    meaning: "family", meaningNepali: "परिवार",
    kanjiCharacters: ["家", "族"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "家族。", reading: "かぞく。", english: "Example: family.", nepali: "उदाहरण: परिवार।" }
    ]
  },
  {
    id: 'N5-L05-021', lesson: 5, level: 'N5', word: "一人で", reading: "ひとりで",
    meaning: "alone, by oneself", meaningNepali: "एक्लै",
    kanjiCharacters: ["一", "人"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "一人で。", reading: "ひとりで。", english: "Example: alone, by oneself.", nepali: "उदाहरण: एक्लै।" }
    ]
  },
  {
    id: 'N5-L05-022', lesson: 5, level: 'N5', word: "先週", reading: "せんしゅう",
    meaning: "last week", meaningNepali: "गएको हप्ता",
    kanjiCharacters: ["先", "週"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "先週。", reading: "せんしゅう。", english: "Example: last week.", nepali: "उदाहरण: गएको हप्ता।" }
    ]
  },
  {
    id: 'N5-L05-023', lesson: 5, level: 'N5', word: "今週", reading: "こんしゅう",
    meaning: "this week", meaningNepali: "यो हप्ता",
    kanjiCharacters: ["今", "週"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "今週。", reading: "こんしゅう。", english: "Example: this week.", nepali: "उदाहरण: यो हप्ता।" }
    ]
  },
  {
    id: 'N5-L05-024', lesson: 5, level: 'N5', word: "来週", reading: "らいしゅう",
    meaning: "next week", meaningNepali: "आउने हप्ता",
    kanjiCharacters: ["来", "週"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "来週。", reading: "らいしゅう。", english: "Example: next week.", nepali: "उदाहरण: आउने हप्ता।" }
    ]
  },
  {
    id: 'N5-L05-025', lesson: 5, level: 'N5', word: "先月", reading: "せんげつ",
    meaning: "last month", meaningNepali: "गएको महिना",
    kanjiCharacters: ["先", "月"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "先月。", reading: "せんげつ。", english: "Example: last month.", nepali: "उदाहरण: गएको महिना।" }
    ]
  },
  {
    id: 'N5-L05-026', lesson: 5, level: 'N5', word: "今月", reading: "こんげつ",
    meaning: "this month", meaningNepali: "यो महिना",
    kanjiCharacters: ["今", "月"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "今月。", reading: "こんげつ。", english: "Example: this month.", nepali: "उदाहरण: यो महिना।" }
    ]
  },
  {
    id: 'N5-L05-027', lesson: 5, level: 'N5', word: "来月", reading: "らいげつ",
    meaning: "next month", meaningNepali: "आउने महिना",
    kanjiCharacters: ["来", "月"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "来月。", reading: "らいげつ。", english: "Example: next month.", nepali: "उदाहरण: आउने महिना।" }
    ]
  },
  {
    id: 'N5-L05-028', lesson: 5, level: 'N5', word: "去年", reading: "きょねん",
    meaning: "last year", meaningNepali: "गएको वर्ष",
    kanjiCharacters: ["去", "年"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "去年。", reading: "きょねん。", english: "Example: last year.", nepali: "उदाहरण: गएको वर्ष।" }
    ]
  },
  {
    id: 'N5-L05-029', lesson: 5, level: 'N5', word: "今年", reading: "ことし",
    meaning: "this year", meaningNepali: "यो वर्ष",
    kanjiCharacters: ["今", "年"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "今年。", reading: "ことし。", english: "Example: this year.", nepali: "उदाहरण: यो वर्ष।" }
    ]
  },
  {
    id: 'N5-L05-030', lesson: 5, level: 'N5', word: "来年", reading: "らいねん",
    meaning: "next year", meaningNepali: "आउने वर्ष",
    kanjiCharacters: ["来", "年"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "来年。", reading: "らいねん。", english: "Example: next year.", nepali: "उदाहरण: आउने वर्ष।" }
    ]
  },
  {
    id: 'N5-L05-031', lesson: 5, level: 'N5', word: "～月", reading: "～がつ",
    meaning: "-th month of the year", meaningNepali: "~ महिना",
    kanjiCharacters: ["月"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "～月。", reading: "～がつ。", english: "Example: -th month of the year.", nepali: "उदाहरण: ~ महिना।" }
    ]
  },
  {
    id: 'N5-L05-032', lesson: 5, level: 'N5', word: "何月", reading: "なんがつ",
    meaning: "what month", meaningNepali: "कुन महिना",
    kanjiCharacters: ["何", "月"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "何月。", reading: "なんがつ。", english: "Example: what month.", nepali: "उदाहरण: कुन महिना।" }
    ]
  },
  {
    id: 'N5-L05-033', lesson: 5, level: 'N5', word: "一日", reading: "ついたち",
    meaning: "first day of the month", meaningNepali: "१ गते / पहिलो दिन",
    kanjiCharacters: ["一", "日"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "一日。", reading: "ついたち。", english: "Example: first day of the month.", nepali: "उदाहरण: १ गते / पहिलो दिन।" }
    ]
  },
  {
    id: 'N5-L05-034', lesson: 5, level: 'N5', word: "二日", reading: "ふつか",
    meaning: "second, two days", meaningNepali: "२ गते / दुई दिन",
    kanjiCharacters: ["二", "日"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "二日。", reading: "ふつか。", english: "Example: second, two days.", nepali: "उदाहरण: २ गते / दुई दिन।" }
    ]
  },
  {
    id: 'N5-L05-035', lesson: 5, level: 'N5', word: "三日", reading: "みっか",
    meaning: "third, three days", meaningNepali: "३ गते / तीन दिन",
    kanjiCharacters: ["三", "日"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "三日。", reading: "みっか。", english: "Example: third, three days.", nepali: "उदाहरण: ३ गते / तीन दिन।" }
    ]
  },
  {
    id: 'N5-L05-036', lesson: 5, level: 'N5', word: "四日", reading: "よっか",
    meaning: "fourth, four days", meaningNepali: "४ गते / चार दिन",
    kanjiCharacters: ["四", "日"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "四日。", reading: "よっか。", english: "Example: fourth, four days.", nepali: "उदाहरण: ४ गते / चार दिन।" }
    ]
  },
  {
    id: 'N5-L05-037', lesson: 5, level: 'N5', word: "五日", reading: "いつか",
    meaning: "fifth, five days", meaningNepali: "५ गते / पाँच दिन",
    kanjiCharacters: ["五", "日"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "五日。", reading: "いつか。", english: "Example: fifth, five days.", nepali: "उदाहरण: ५ गते / पाँच दिन।" }
    ]
  },
  {
    id: 'N5-L05-038', lesson: 5, level: 'N5', word: "六日", reading: "むいか",
    meaning: "sixth, six days", meaningNepali: "६ गते / छह दिन",
    kanjiCharacters: ["六", "日"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "六日。", reading: "むいか。", english: "Example: sixth, six days.", nepali: "उदाहरण: ६ गते / छह दिन।" }
    ]
  },
  {
    id: 'N5-L05-039', lesson: 5, level: 'N5', word: "七日", reading: "なのか",
    meaning: "seventh, seven days", meaningNepali: "७ गते / सात दिन",
    kanjiCharacters: ["七", "日"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "七日。", reading: "なのか。", english: "Example: seventh, seven days.", nepali: "उदाहरण: ७ गते / सात दिन।" }
    ]
  },
  {
    id: 'N5-L05-040', lesson: 5, level: 'N5', word: "八日", reading: "ようか",
    meaning: "eighth, eight days", meaningNepali: "८ गते / आठ दिन",
    kanjiCharacters: ["八", "日"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "八日。", reading: "ようか。", english: "Example: eighth, eight days.", nepali: "उदाहरण: ८ गते / आठ दिन।" }
    ]
  },
  {
    id: 'N5-L05-041', lesson: 5, level: 'N5', word: "九日", reading: "ここのか",
    meaning: "ninth, nine days", meaningNepali: "९ गते / नौ दिन",
    kanjiCharacters: ["九", "日"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "九日。", reading: "ここのか。", english: "Example: ninth, nine days.", nepali: "उदाहरण: ९ गते / नौ दिन।" }
    ]
  },
  {
    id: 'N5-L05-042', lesson: 5, level: 'N5', word: "十日", reading: "とおか",
    meaning: "tenth, ten days", meaningNepali: "१० गते / दस दिन",
    kanjiCharacters: ["十", "日"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "十日。", reading: "とおか。", english: "Example: tenth, ten days.", nepali: "उदाहरण: १० गते / दस दिन।" }
    ]
  },
  {
    id: 'N5-L05-043', lesson: 5, level: 'N5', word: "十四日", reading: "じゅうよっか",
    meaning: "fourteenth, fourteen days", meaningNepali: "१४ गते / चौध दिन",
    kanjiCharacters: ["十", "四", "日"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "十四日。", reading: "じゅうよっか。", english: "Example: fourteenth, fourteen days.", nepali: "उदाहरण: १४ गते / चौध दिन।" }
    ]
  },
  {
    id: 'N5-L05-044', lesson: 5, level: 'N5', word: "二十日", reading: "はつか",
    meaning: "twentieth, twenty days", meaningNepali: "२० गते / बीस दिन",
    kanjiCharacters: ["二", "十", "日"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "二十日。", reading: "はつか。", english: "Example: twentieth, twenty days.", nepali: "उदाहरण: २० गते / बीस दिन।" }
    ]
  },
  {
    id: 'N5-L05-045', lesson: 5, level: 'N5', word: "二十四日", reading: "にじゅうよっか",
    meaning: "twenty-fourth, twenty-four days", meaningNepali: "२४ गते / चौबीस दिन",
    kanjiCharacters: ["二", "十", "四", "日"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "二十四日。", reading: "にじゅうよっか。", english: "Example: twenty-fourth, twenty-four days.", nepali: "उदाहरण: २४ गते / चौबीस दिन।" }
    ]
  },
  {
    id: 'N5-L05-046', lesson: 5, level: 'N5', word: "～日", reading: "～にち",
    meaning: "-th day of the month, ~ days", meaningNepali: "~ गते / ~ दिन",
    kanjiCharacters: ["日"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "～日。", reading: "～にち。", english: "Example: -th day of the month, ~ days.", nepali: "उदाहरण: ~ गते / ~ दिन।" }
    ]
  },
  {
    id: 'N5-L05-047', lesson: 5, level: 'N5', word: "何日", reading: "なんにち",
    meaning: "which day of the month, how many days", meaningNepali: "which day of the month, how many days",
    kanjiCharacters: ["何", "日"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "何日。", reading: "なんにち。", english: "Example: which day of the month, how many days.", nepali: "उदाहरण: which day of the month, how many days।" }
    ]
  },
  {
    id: 'N5-L05-048', lesson: 5, level: 'N5', word: "いつ", reading: "いつ",
    meaning: "when", meaningNepali: "कहिले",
    kanjiCharacters: [], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "いつ。", reading: "いつ。", english: "Example: when.", nepali: "उदाहरण: कहिले।" }
    ]
  },
  {
    id: 'N5-L05-049', lesson: 5, level: 'N5', word: "誕生日", reading: "たんじょうび",
    meaning: "birthday", meaningNepali: "जन्मदिन",
    kanjiCharacters: ["誕", "生", "日"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "誕生日。", reading: "たんじょうび。", english: "Example: birthday.", nepali: "उदाहरण: जन्मदिन।" }
    ]
  },
  {
    id: 'N5-L05-050', lesson: 5, level: 'N5', word: "各駅停車", reading: "かくえきていしゃ",
    meaning: "local (train)", meaningNepali: "local (train)",
    kanjiCharacters: ["各", "駅", "停", "車"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "各駅停車。", reading: "かくえきていしゃ。", english: "Example: local (train).", nepali: "उदाहरण: local (train)।" }
    ]
  },
  {
    id: 'N5-L05-051', lesson: 5, level: 'N5', word: "急行", reading: "きゅうこう",
    meaning: "rapid", meaningNepali: "एक्सप्रेस (रेल)",
    kanjiCharacters: ["急", "行"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "急行。", reading: "きゅうこう。", english: "Example: rapid.", nepali: "उदाहरण: एक्सप्रेस (रेल)।" }
    ]
  },
  {
    id: 'N5-L05-052', lesson: 5, level: 'N5', word: "特急", reading: "とっきゅう",
    meaning: "express", meaningNepali: "सुपर एक्सप्रेस (रेल)",
    kanjiCharacters: ["特", "急"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "特急。", reading: "とっきゅう。", english: "Example: express.", nepali: "उदाहरण: सुपर एक्सप्रेस (रेल)।" }
    ]
  },
  {
    id: 'N5-L05-053', lesson: 5, level: 'N5', word: "次の", reading: "つぎの",
    meaning: "next", meaningNepali: "अर्को",
    kanjiCharacters: ["次"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "次の。", reading: "つぎの。", english: "Example: next.", nepali: "उदाहरण: अर्को।" }
    ]
  },
  {
    id: 'N5-L05-054', lesson: 5, level: 'N5', word: "どういたしまして。", reading: "どういたしまして。",
    meaning: "You're welcome./Don't mention it.", meaningNepali: "You're welcome./Don't mention it.",
    kanjiCharacters: [], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "どういたしまして。。", reading: "どういたしまして。。", english: "Example: You're welcome./Don't mention it..", nepali: "उदाहरण: You're welcome./Don't mention it.।" }
    ]
  },
  {
    id: 'N5-L05-055', lesson: 5, level: 'N5', word: "～番線", reading: "～ばんせん",
    meaning: "platform ~, the ~th platform", meaningNepali: "platform ~, the ~th platform",
    kanjiCharacters: ["番", "線"], partOfSpeech: "Noun",
    grammarSentences: [
      { japanese: "～番線。", reading: "～ばんせん。", english: "Example: platform ~, the ~th platform.", nepali: "उदाहरण: platform ~, the ~th platform।" }
    ]
  },
];
