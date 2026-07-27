// ============================================================
// NIHONGO VOCAB - Full Minna no Nihongo Curriculum
// JLPT N5 (Lessons 1-25) — Full entries in n5-lessons-1to5.ts
// JLPT N4 (Lessons 26-50) - COMPLETE HANDBOOK
// JLPT N3 (Lessons 51-75)
// With English & Nepali Translations + Grammar Example Sentences
// ============================================================
import { N5_LESSONS_1TO5 } from './n5-lessons-1to5';
import { N5_LESSONS_6TO10 } from './n5-lessons-6to10';
import { N5_LESSONS_11TO15 } from './n5-lessons-11to15';
import { N5_LESSONS_16TO20 } from './n5-lessons-16to20';
import { N5_LESSONS_21TO25 } from './n5-lessons-21to25';

export interface GrammarSentence {
  japanese: string;
  reading: string;
  english: string;
  nepali: string;
}

export interface VocabItem {
  id: string;
  word: string;           // Kanji / written form
  reading: string;        // Hiragana reading
  meaning: string;        // English meaning
  meaningNepali: string;  // Nepali meaning
  kanjiCharacters: string[];
  lesson?: number;
  level: 'N5' | 'N4' | 'N3';
  partOfSpeech?: string;
  grammarSentences?: GrammarSentence[];
}

export const NIHONGO_VOCAB_DATA: VocabItem[] = [

  // ─────────────────────────────────────────────
  // N5 LESSONS 1–25 — COMPLETE CURRICULUM
  // ─────────────────────────────────────────────
  ...N5_LESSONS_1TO5,
  ...N5_LESSONS_6TO10,
  ...N5_LESSONS_11TO15,
  ...N5_LESSONS_16TO20,
  ...N5_LESSONS_21TO25,

  // ─────────────────────────────────────────────
  // ■■■ N4 COMPLETE HANDBOOK ■■■
  // PART 1 & 2: CHAPTERS 26–50 FULL TEXTBOOK VOCABULARY SEEDS
  // ─────────────────────────────────────────────

  // ════════════════════════════════════
  // LESSON 26 FULL TEXTBOOK VOCABULARY SHEET
  // ════════════════════════════════════
  {"id": "v26_1", "lesson": 26, "level": "N4", "word": "見ます", "reading": "みます", "meaning": "Check / Look / See", "meaningNepali": "जाँच्नु / हेर्नु", "kanjiCharacters": ["見"], "partOfSpeech": "Verb"},
  {"id": "v26_2", "lesson": 26, "level": "N4", "word": "探します", "reading": "さがします", "meaning": "Look for / Search", "meaningNepali": "खोज्नु", "kanjiCharacters": ["探"], "partOfSpeech": "Verb"},
  {"id": "v26_3", "lesson": 26, "level": "N4", "word": "遅れます", "reading": "おくれます", "meaning": "Be late", "meaningNepali": "ढिला हुनु", "kanjiCharacters": ["遅"], "partOfSpeech": "Verb"},
  {"id": "v26_4", "lesson": 26, "level": "N4", "word": "間に合います", "reading": "まにあいます", "meaning": "Be in time", "meaningNepali": "भ्याउनु", "kanjiCharacters": ["間", "合"], "partOfSpeech": "Verb"},
  {"id": "v26_5", "lesson": 26, "level": "N4", "word": "やります", "reading": "やります", "meaning": "Do", "meaningNepali": "गर्नु", "kanjiCharacters": [], "partOfSpeech": "Verb"},
  {"id": "v26_6", "lesson": 26, "level": "N4", "word": "拾います", "reading": "ひろいます", "meaning": "Pick up / Find", "meaningNepali": "पाउनु / भेट्नु", "kanjiCharacters": ["拾"], "partOfSpeech": "Verb"},
  {"id": "v26_7", "lesson": 26, "level": "N4", "word": "参加します", "reading": "さんかします", "meaning": "Attend / Participate", "meaningNepali": "भाग लिनु", "kanjiCharacters": ["参", "加"], "partOfSpeech": "Verb"},
  {"id": "v26_8", "lesson": 26, "level": "N4", "word": "申し込みます", "reading": "もうしこみます", "meaning": "Apply for", "meaningNepali": "दरखास्त दिनु", "kanjiCharacters": ["申", "込"], "partOfSpeech": "Verb"},
  {"id": "v26_9", "lesson": 26, "level": "N4", "word": "都合がいい", "reading": "つごうがいい", "meaning": "Convenient / Suitable time", "meaningNepali": "अनुकूल", "kanjiCharacters": ["都", "合"], "partOfSpeech": "Adj"},
  {"id": "v26_10", "lesson": 26, "level": "N4", "word": "都合が悪い", "reading": "つごうがわるい", "meaning": "Inconvenient", "meaningNepali": "प्रतिकूल", "kanjiCharacters": ["都", "合", "悪"], "partOfSpeech": "Adj"},
  {"id": "v26_11", "lesson": 26, "level": "N4", "word": "気分がいい", "reading": "きぶんがいい", "meaning": "Feel well", "meaningNepali": "राम्रो महसुस", "kanjiCharacters": ["気", "分"], "partOfSpeech": "Adj"},
  {"id": "v26_12", "lesson": 26, "level": "N4", "word": "気分が悪い", "reading": "きぶんがわるい", "meaning": "Feel unwell", "meaningNepali": "नराम्रो महसुस", "kanjiCharacters": ["気", "分", "悪"], "partOfSpeech": "Adj"},
  {"id": "v26_13", "lesson": 26, "level": "N4", "word": "新聞社", "reading": "しんぶんしゃ", "meaning": "Newspaper company", "meaningNepali": "पत्रिका संस्था", "kanjiCharacters": ["新", "聞", "社"], "partOfSpeech": "Noun"},
  {"id": "v26_14", "lesson": 26, "level": "N4", "word": "運動会", "reading": "うんどうかい", "meaning": "Sports day meeting", "meaningNepali": "खेलकुद दिवस", "kanjiCharacters": ["運", "動", "会"], "partOfSpeech": "Noun"},
  {"id": "v26_15", "lesson": 26, "level": "N4", "word": "盆踊り", "reading": "ぼんおどり", "meaning": "Bon festival dance", "meaningNepali": "बोन चाडको नाच", "kanjiCharacters": ["盆", "踊"], "partOfSpeech": "Noun"},
  {"id": "v26_16", "lesson": 26, "level": "N4", "word": "フリーマーケット", "reading": "フリーマーケット", "meaning": "Flea market", "meaningNepali": "खुल्ला बजार", "kanjiCharacters": [], "partOfSpeech": "Noun"},
  {"id": "v26_17", "lesson": 26, "level": "N4", "word": "場所", "reading": "ばしょ", "meaning": "Place / Location", "meaningNepali": "ठाउँ", "kanjiCharacters": ["場", "所"], "partOfSpeech": "Noun"},
  {"id": "v26_18", "lesson": 26, "level": "N4", "word": "ボランティア", "reading": "ボランティア", "meaning": "Volunteer", "meaningNepali": "स्वयंसेवी", "kanjiCharacters": [], "partOfSpeech": "Noun"},
  {"id": "v26_19", "lesson": 26, "level": "N4", "word": "財布", "reading": "さいふ", "meaning": "Wallet", "meaningNepali": "वालेट", "kanjiCharacters": ["財", "布"], "partOfSpeech": "Noun"},
  {"id": "v26_20", "lesson": 26, "level": "N4", "word": "国会議事堂", "reading": "こっかいぎじどう", "meaning": "Diet Building (Parliament)", "meaningNepali": "संसद भवन", "kanjiCharacters": ["国", "会", "議", "事", "堂"], "partOfSpeech": "Noun"},
  {"id": "v26_21", "lesson": 26, "level": "N4", "word": "平日", "reading": "へいじつ", "meaning": "Weekday", "meaningNepali": "कार्यदिन", "kanjiCharacters": ["平", "日"], "partOfSpeech": "Noun"},
  {"id": "v26_22", "lesson": 26, "level": "N4", "word": "〜弁", "reading": "〜べん", "meaning": "~ dialect", "meaningNepali": "~ स्थानीय भाषा", "kanjiCharacters": ["弁"], "partOfSpeech": "Suffix"},
  {"id": "v26_23", "lesson": 26, "level": "N4", "word": "今度", "reading": "こんど", "meaning": "Next time", "meaningNepali": "अर्को समय", "kanjiCharacters": ["今", "度"], "partOfSpeech": "Noun"},
  {"id": "v26_24", "lesson": 26, "level": "N4", "word": "ずいぶん", "reading": "ずいぶん", "meaning": "Pretty / Very", "meaningNepali": "एकदम धेरै", "kanjiCharacters": [], "partOfSpeech": "Adverb"},
  {"id": "v26_25", "lesson": 26, "level": "N4", "word": "直接", "reading": "ちょくせつ", "meaning": "Directly", "meaningNepali": "प्रत्यक्ष", "kanjiCharacters": ["直", "接"], "partOfSpeech": "Adverb"},
  {"id": "v26_26", "lesson": 26, "level": "N4", "word": "いつでも", "reading": "いつでも", "meaning": "Anytime", "meaningNepali": "जुनसुकै बेला", "kanjiCharacters": [], "partOfSpeech": "Adverb"},
  {"id": "v26_27", "lesson": 26, "level": "N4", "word": "どこでも", "reading": "どこでも", "meaning": "Anywhere", "meaningNepali": "जहाँ पनि", "kanjiCharacters": [], "partOfSpeech": "Adverb"},
  {"id": "v26_28", "lesson": 26, "level": "N4", "word": "だれでも", "reading": "だれでも", "meaning": "Anybody", "meaningNepali": "जो पनि", "kanjiCharacters": [], "partOfSpeech": "Adverb"},
  {"id": "v26_29", "lesson": 26, "level": "N4", "word": "何でも", "reading": "なんでも", "meaning": "Anything", "meaningNepali": "जे पनि", "kanjiCharacters": ["何"], "partOfSpeech": "Adverb"},
  {"id": "v26_30", "lesson": 26, "level": "N4", "word": "こんな", "reading": "こんな", "meaning": "Like this", "meaningNepali": "यो जस्तो", "kanjiCharacters": [], "partOfSpeech": "Adj"},
  {"id": "v26_31", "lesson": 26, "level": "N4", "word": "そんな", "reading": "そんな", "meaning": "Like that", "meaningNepali": "त्यो जस्तो", "kanjiCharacters": [], "partOfSpeech": "Adj"},
  {"id": "v26_32", "lesson": 26, "level": "N4", "word": "あんな", "reading": "あんな", "meaning": "Like that (far)", "meaningNepali": "ऊ त्यो जस्तो", "kanjiCharacters": [], "partOfSpeech": "Adj"},
  {"id": "v26_33", "lesson": 26, "level": "N4", "word": "片付きます", "reading": "かたづきます", "meaning": "Be tidied up", "meaningNepali": "व्यवस्थापन हुनु", "kanjiCharacters": ["片", "付"], "partOfSpeech": "Verb"},
  {"id": "v26_34", "lesson": 26, "level": "N4", "word": "荷物", "reading": "にもつ", "meaning": "Luggage", "meaningNepali": "सामानहरू", "kanjiCharacters": ["荷", "物"], "partOfSpeech": "Noun"},
  {"id": "v26_35", "lesson": 26, "level": "N4", "word": "ごみ", "reading": "ごみ", "meaning": "Garbage / Trash", "meaningNepali": "फोहर", "kanjiCharacters": [], "partOfSpeech": "Noun"},
  {"id": "v26_36", "lesson": 26, "level": "N4", "word": "出します", "reading": "だします", "meaning": "Put out (garbage)", "meaningNepali": "फाल्नु", "kanjiCharacters": ["出"], "partOfSpeech": "Verb"},
  {"id": "v26_37", "lesson": 26, "level": "N4", "word": "燃えます", "reading": "もえます", "meaning": "Burn (trash)", "meaningNepali": "बाल्नु", "kanjiCharacters": ["燃"], "partOfSpeech": "Verb"},
  {"id": "v26_38", "lesson": 26, "level": "N4", "word": "置き場", "reading": "おきば", "meaning": "Put place", "meaningNepali": "राख्ने ठाउँ", "kanjiCharacters": ["置", "場"], "partOfSpeech": "Noun"},
  {"id": "v26_39", "lesson": 26, "level": "N4", "word": "横", "reading": "よこ", "meaning": "Side / Beside", "meaningNepali": "छेउ", "kanjiCharacters": ["横"], "partOfSpeech": "Noun"},
  {"id": "v26_40", "lesson": 26, "level": "N4", "word": "瓶", "reading": "びん", "meaning": "Bottle", "meaningNepali": "बोतल", "kanjiCharacters": ["瓶"], "partOfSpeech": "Noun"},
  {"id": "v26_41", "lesson": 26, "level": "N4", "word": "缶", "reading": "かん", "meaning": "Can", "meaningNepali": "क्यान", "kanjiCharacters": ["缶"], "partOfSpeech": "Noun"},
  {"id": "v26_42", "lesson": 26, "level": "N4", "word": "お湯", "reading": "おゆ", "meaning": "Hot water", "meaningNepali": "तातो पानी", "kanjiCharacters": ["湯"], "partOfSpeech": "Noun"},
  {"id": "v26_43", "lesson": 26, "level": "N4", "word": "ガス", "reading": "ガス", "meaning": "Gas", "meaningNepali": "ग्यास", "kanjiCharacters": [], "partOfSpeech": "Noun"},
  {"id": "v26_44", "lesson": 26, "level": "N4", "word": "連絡します", "reading": "れんらくします", "meaning": "Contact", "meaningNepali": "सम्पर्क गर्नु", "kanjiCharacters": ["連", "絡"], "partOfSpeech": "Verb"},
  {"id": "v26_45", "lesson": 26, "level": "N4", "word": "電子メール", "reading": "でんしメール", "meaning": "Email", "meaningNepali": "इमेल", "kanjiCharacters": ["電", "子"], "partOfSpeech": "Noun"},
  {"id": "v26_46", "lesson": 26, "level": "N4", "word": "宇宙", "reading": "うちゅう", "meaning": "Space / Universe", "meaningNepali": "अन्तरिक्ष", "kanjiCharacters": ["宇", "宙"], "partOfSpeech": "Noun"},
  {"id": "v26_47", "lesson": 26, "level": "N4", "word": "怖い", "reading": "こわい", "meaning": "Scary / Afraid", "meaningNepali": "डरलाग्दो", "kanjiCharacters": ["怖"], "partOfSpeech": "Adj"},
  {"id": "v26_48", "lesson": 26, "level": "N4", "word": "宇宙船", "reading": "うちゅうせん", "meaning": "Spaceship", "meaningNepali": "अन्तरिक्ष यान", "kanjiCharacters": ["宇", "宙", "船"], "partOfSpeech": "Noun"},
  {"id": "v26_49", "lesson": 26, "level": "N4", "word": "別", "reading": "べつ", "meaning": "Another / Separate", "meaningNepali": "फरक", "kanjiCharacters": ["別"], "partOfSpeech": "Noun"},
  {"id": "v26_50", "lesson": 26, "level": "N4", "word": "宇宙飛行士", "reading": "うちゅうひこうし", "meaning": "Astronaut", "meaningNepali": "अन्तरिक्ष यात्री", "kanjiCharacters": ["宇", "宙", "飛", "行", "士"], "partOfSpeech": "Noun"},

  // ════════════════════════════════════
  // LESSON 27 FULL TEXTBOOK VOCABULARY SHEET
  // ════════════════════════════════════
  {"id": "v27_1", "lesson": 27, "level": "N4", "word": "できる", "reading": "できる", "meaning": "Can do", "meaningNepali": "गर्न सक्नु", "kanjiCharacters": [], "partOfSpeech": "Potential Verb"},
  {"id": "v27_2", "lesson": 27, "level": "N4", "word": "話せる", "reading": "はなせる", "meaning": "Can speak", "meaningNepali": "बोल्न सक्नु", "kanjiCharacters": ["話"], "partOfSpeech": "Potential Verb"},
  {"id": "v27_3", "lesson": 27, "level": "N4", "word": "読める", "reading": "よめる", "meaning": "Can read", "meaningNepali": "पढ्न सक्नु", "kanjiCharacters": ["読"], "partOfSpeech": "Potential Verb"},
  {"id": "v27_4", "lesson": 27, "level": "N4", "word": "書ける", "reading": "かける", "meaning": "Can write", "meaningNepali": "लेख्न सक्नु", "kanjiCharacters": ["書"], "partOfSpeech": "Potential Verb"},
  {"id": "v27_5", "lesson": 27, "level": "N4", "word": "聞ける", "reading": "きける", "meaning": "Can hear", "meaningNepali": "सुन्न सक्नु", "kanjiCharacters": ["聞"], "partOfSpeech": "Potential Verb"},
  {"id": "v27_6", "lesson": 27, "level": "N4", "word": "見える", "reading": "みえる", "meaning": "Can be seen", "meaningNepali": "देखिनु", "kanjiCharacters": ["見"], "partOfSpeech": "Potential Verb"},
  {"id": "v27_7", "lesson": 27, "level": "N4", "word": "見られる", "reading": "みられる", "meaning": "Can watch", "meaningNepali": "हेर्न सक्नु", "kanjiCharacters": ["見"], "partOfSpeech": "Potential Verb"},
  {"id": "v27_8", "lesson": 27, "level": "N4", "word": "食べられる", "reading": "たべられる", "meaning": "Can eat", "meaningNepali": "खान सक्नु", "kanjiCharacters": ["食"], "partOfSpeech": "Potential Verb"},
  {"id": "v27_9", "lesson": 27, "level": "N4", "word": "飲める", "reading": "のめる", "meaning": "Can drink", "meaningNepali": "पिउन सक्नु", "kanjiCharacters": ["飲"], "partOfSpeech": "Potential Verb"},
  {"id": "v27_10", "lesson": 27, "level": "N4", "word": "行ける", "reading": "いける", "meaning": "Can go", "meaningNepali": "जान सक्नु", "kanjiCharacters": ["行"], "partOfSpeech": "Potential Verb"},
  {"id": "v27_11", "lesson": 27, "level": "N4", "word": "来られる", "reading": "こられる", "meaning": "Can come", "meaningNepali": "आउन सक्नु", "kanjiCharacters": ["来"], "partOfSpeech": "Potential Verb"},
  {"id": "v27_12", "lesson": 27, "level": "N4", "word": "泳げる", "reading": "およげる", "meaning": "Can swim", "meaningNepali": "पौड्न सक्नु", "kanjiCharacters": ["泳"], "partOfSpeech": "Potential Verb"},
  {"id": "v27_13", "lesson": 27, "level": "N4", "word": "乗れる", "reading": "のれる", "meaning": "Can ride", "meaningNepali": "चढ्न सक्नु", "kanjiCharacters": ["乗"], "partOfSpeech": "Potential Verb"},
  {"id": "v27_14", "lesson": 27, "level": "N4", "word": "歩ける", "reading": "あるける", "meaning": "Can walk", "meaningNepali": "हिँड्न सक्नु", "kanjiCharacters": ["歩"], "partOfSpeech": "Potential Verb"},
  {"id": "v27_15", "lesson": 27, "level": "N4", "word": "運転できる", "reading": "うんてんできる", "meaning": "Can drive", "meaningNepali": "गाडी चलाउन सक्नु", "kanjiCharacters": ["運", "転"], "partOfSpeech": "Potential Verb"},
  {"id": "v27_16", "lesson": 27, "level": "N4", "word": "歌える", "reading": "うたえる", "meaning": "Can sing", "meaningNepali": "गाउन सक्नु", "kanjiCharacters": ["歌"], "partOfSpeech": "Potential Verb"},
  {"id": "v27_17", "lesson": 27, "level": "N4", "word": "踊れる", "reading": "おどれる", "meaning": "Can dance", "meaningNepali": "नाच्न सक्नु", "kanjiCharacters": ["踊"], "partOfSpeech": "Potential Verb"},
  {"id": "v27_18", "lesson": 27, "level": "N4", "word": "習う", "reading": "ならう", "meaning": "Learn", "meaningNepali": "सिक्नु", "kanjiCharacters": ["習"], "partOfSpeech": "Verb"},
  {"id": "v27_19", "lesson": 27, "level": "N4", "word": "練習", "reading": "れんしゅう", "meaning": "Practice", "meaningNepali": "अभ्यास", "kanjiCharacters": ["練", "習"], "partOfSpeech": "Noun"},
  {"id": "v27_20", "lesson": 27, "level": "N4", "word": "上手", "reading": "じょうず", "meaning": "Skillful", "meaningNepali": "सीपालु", "kanjiCharacters": ["上", "手"], "partOfSpeech": "Adj"},
  {"id": "v27_21", "lesson": 27, "level": "N4", "word": "下手", "reading": "へた", "meaning": "Unskillful", "meaningNepali": "असीपालु", "kanjiCharacters": ["下", "手"], "partOfSpeech": "Adj"},
  {"id": "v27_22", "lesson": 27, "level": "N4", "word": "得意", "reading": "とくい", "meaning": "Good at", "meaningNepali": "दक्ष", "kanjiCharacters": ["特", "意"], "partOfSpeech": "Adj"},
  {"id": "v27_23", "lesson": 27, "level": "N4", "word": "苦手", "reading": "にがて", "meaning": "Weak at", "meaningNepali": "कमजोर", "kanjiCharacters": ["苦", "手"], "partOfSpeech": "Adj"},
  {"id": "v27_24", "lesson": 27, "level": "N4", "word": "趣味", "reading": "しゅみ", "meaning": "Hobby", "meaningNepali": "रुचि", "kanjiCharacters": ["趣", "味"], "partOfSpeech": "Noun"},
  {"id": "v27_25", "lesson": 27, "level": "N4", "word": "経験", "reading": "けいけん", "meaning": "Experience", "meaningNepali": "अनुभव", "kanjiCharacters": ["経", "験"], "partOfSpeech": "Noun"},
  {"id": "v27_26", "lesson": 27, "level": "N4", "word": "外国", "reading": "がいこく", "meaning": "Foreign country", "meaningNepali": "विदेश", "kanjiCharacters": ["外", "国"], "partOfSpeech": "Noun"},
  {"id": "v27_27", "lesson": 27, "level": "N4", "word": "会話", "reading": "かいわ", "meaning": "Conversation", "meaningNepali": "कुराकानी", "kanjiCharacters": ["会", "話"], "partOfSpeech": "Noun"},
  {"id": "v27_28", "lesson": 27, "level": "N4", "word": "発音", "reading": "はつおん", "meaning": "Pronunciation", "meaningNepali": "उच्चारण", "kanjiCharacters": ["発", "音"], "partOfSpeech": "Noun"},
  {"id": "v27_29", "lesson": 27, "level": "N4", "word": "漢字", "reading": "かんじ", "meaning": "Kanji", "meaningNepali": "काञ्जी", "kanjiCharacters": ["漢", "字"], "partOfSpeech": "Noun"},
  {"id": "v27_30", "lesson": 27, "level": "N4", "word": "単語", "reading": "たんご", "meaning": "Vocabulary", "meaningNepali": "शब्द", "kanjiCharacters": ["単", "語"], "partOfSpeech": "Noun"},
  {"id": "v27_31", "lesson": 27, "level": "N4", "word": "試験", "reading": "しけん", "meaning": "Exam", "meaningNepali": "परीक्षा", "kanjiCharacters": ["試", "験"], "partOfSpeech": "Noun"},
  {"id": "v27_32", "lesson": 27, "level": "N4", "word": "合格", "reading": "ごうかく", "meaning": "Pass exam", "meaningNepali": "उत्तीर्ण", "kanjiCharacters": ["合", "格"], "partOfSpeech": "Noun"},
  {"id": "v27_33", "lesson": 27, "level": "N4", "word": "不合格", "reading": "ふごうかく", "meaning": "Fail exam", "meaningNepali": "अनुत्तीर्ण", "kanjiCharacters": ["不", "合", "格"], "partOfSpeech": "Noun"},
  {"id": "v27_34", "lesson": 27, "level": "N4", "word": "勉強", "reading": "べんきょう", "meaning": "Study", "meaningNepali": "अध्ययन", "kanjiCharacters": ["勉", "強"], "partOfSpeech": "Noun"},
  {"id": "v27_35", "lesson": 27, "level": "N4", "word": "質問", "reading": "しつもん", "meaning": "Question", "meaningNepali": "प्रश्न", "kanjiCharacters": ["質", "問"], "partOfSpeech": "Noun"},
  {"id": "v27_36", "lesson": 27, "level": "N4", "word": "回答", "reading": "かいとう", "meaning": "Answer", "meaningNepali": "उत्तर", "kanjiCharacters": ["回", "答"], "partOfSpeech": "Noun"},
  {"id": "v27_37", "lesson": 27, "level": "N4", "word": "挑戦", "reading": "ちょうせん", "meaning": "Challenge", "meaningNepali": "चुनौती", "kanjiCharacters": ["挑", "戦"], "partOfSpeech": "Noun"},
  {"id": "v27_38", "lesson": 27, "level": "N4", "word": "自信", "reading": "じしん", "meaning": "Confidence", "meaningNepali": "आत्मविश्वास", "kanjiCharacters": ["自", "信"], "partOfSpeech": "Noun"},
  {"id": "v27_39", "lesson": 27, "level": "N4", "word": "成功", "reading": "せいこう", "meaning": "Success", "meaningNepali": "सफलता", "kanjiCharacters": ["成", "功"], "partOfSpeech": "Noun"},
  {"id": "v27_40", "lesson": 27, "level": "N4", "word": "努力", "reading": "どりょく", "meaning": "Effort", "meaningNepali": "प्रयास", "kanjiCharacters": ["努", "力"], "partOfSpeech": "Noun"},
  {"id": "v27_41", "lesson": 27, "level": "N4", "word": "弾けます", "reading": "ひけます", "meaning": "Play instrument", "meaningNepali": "बजाउन सक्नु", "kanjiCharacters": ["弾"], "partOfSpeech": "Potential Verb"},
  {"id": "v27_42", "lesson": 27, "level": "N4", "word": "建てます", "reading": "たてます", "meaning": "Build / Erect", "meaningNepali": "बनाउनु", "kanjiCharacters": ["建"], "partOfSpeech": "Verb"},

  // ════════════════════════════════════
  // LESSON 28 FULL TEXTBOOK VOCABULARY SHEET
  // ════════════════════════════════════
  {"id": "v28_1", "lesson": 28, "level": "N4", "word": "売れます", "reading": "うれます", "meaning": "Sell / Be sold", "meaningNepali": "बिक्नु", "kanjiCharacters": ["売"], "partOfSpeech": "Verb"},
  {"id": "v28_2", "lesson": 28, "level": "N4", "word": "踊ります", "reading": "おどります", "meaning": "Dance", "meaningNepali": "नाच्नु", "kanjiCharacters": ["踊"], "partOfSpeech": "Verb"},
  {"id": "v28_3", "lesson": 28, "level": "N4", "word": "かみます", "reading": "かみます", "meaning": "Chew / Bite", "meaningNepali": "चबाउनु", "kanjiCharacters": [], "partOfSpeech": "Verb"},
  {"id": "v28_4", "lesson": 28, "level": "N4", "word": "選びます", "reading": "えらびます", "meaning": "Choose", "meaningNepali": "छान्नु", "kanjiCharacters": ["選"], "partOfSpeech": "Verb"},
  {"id": "v28_5", "lesson": 28, "level": "N4", "word": "通います", "reading": "かよいます", "meaning": "Commute", "meaningNepali": "आउजाउ गर्नु", "kanjiCharacters": ["通"], "partOfSpeech": "Verb"},
  {"id": "v28_6", "lesson": 28, "level": "N4", "word": "メモします", "reading": "メモします", "meaning": "Take a note", "meaningNepali": "टिपोट गर्नु", "kanjiCharacters": [], "partOfSpeech": "Verb"},
  {"id": "v28_7", "lesson": 28, "level": "N4", "word": "真面目", "reading": "まじめ", "meaning": "Serious", "meaningNepali": "इमानदार", "kanjiCharacters": ["真", "面", "目"], "partOfSpeech": "Adj"},
  {"id": "v28_8", "lesson": 28, "level": "N4", "word": "熱心", "reading": "ねっしん", "meaning": "Enthusiastic", "meaningNepali": "मेहनती", "kanjiCharacters": ["熱", "心"], "partOfSpeech": "Adj"},
  {"id": "v28_9", "lesson": 28, "level": "N4", "word": "偉い", "reading": "えらい", "meaning": "Great", "meaningNepali": "महान्", "kanjiCharacters": ["偉"], "partOfSpeech": "Adj"},
  {"id": "v28_10", "lesson": 28, "level": "N4", "word": "ちょうどいい", "reading": "ちょうどいい", "meaning": "Just right", "meaningNepali": "ठिकै", "kanjiCharacters": [], "partOfSpeech": "Adj"},
  {"id": "v28_11", "lesson": 28, "level": "N4", "word": "景色", "reading": "けしき", "meaning": "Scenery", "meaningNepali": "दृश्य", "kanjiCharacters": ["景", "色"], "partOfSpeech": "Noun"},
  {"id": "v28_12", "lesson": 28, "level": "N4", "word": "美容院", "reading": "びよういん", "meaning": "Beauty salon", "meaningNepali": "ब्युटी पार्लर", "kanjiCharacters": ["美", "容", "院"], "partOfSpeech": "Noun"},
  {"id": "v28_13", "lesson": 28, "level": "N4", "word": "台所", "reading": "だいどこ", "meaning": "Kitchen", "meaningNepali": "भान्सा", "kanjiCharacters": ["台", "所"], "partOfSpeech": "Noun"},
  {"id": "v28_14", "lesson": 28, "level": "N4", "word": "経験", "reading": "けいけん", "meaning": "Experience", "meaningNepali": "अनुभव", "kanjiCharacters": ["経", "験"], "partOfSpeech": "Noun"},
  {"id": "v28_15", "lesson": 28, "level": "N4", "word": "力", "reading": "ちから", "meaning": "Power", "meaningNepali": "शक्ति", "kanjiCharacters": ["力"], "partOfSpeech": "Noun"},
  {"id": "v28_16", "lesson": 28, "level": "N4", "word": "人気", "reading": "にんき", "meaning": "Popularity", "meaningNepali": "लोकप्रियता", "kanjiCharacters": ["人", "気"], "partOfSpeech": "Noun"},
  {"id": "v28_17", "lesson": 28, "level": "N4", "word": "形", "reading": "かたち", "meaning": "Shape", "meaningNepali": "आकार", "kanjiCharacters": ["形"], "partOfSpeech": "Noun"},
  {"id": "v28_18", "lesson": 28, "level": "N4", "word": "色", "reading": "いろ", "meaning": "Color", "meaningNepali": "रङ", "kanjiCharacters": ["色"], "partOfSpeech": "Noun"},
  {"id": "v28_19", "lesson": 28, "level": "N4", "word": "味", "reading": "あじ", "meaning": "Taste", "meaningNepali": "स्वाद", "kanjiCharacters": ["味"], "partOfSpeech": "Noun"},
  {"id": "v28_20", "lesson": 28, "level": "N4", "word": "ガム", "reading": "ガム", "meaning": "Chewing gum", "meaningNepali": "गम", "kanjiCharacters": [], "partOfSpeech": "Noun"},
  {"id": "v28_21", "lesson": 28, "level": "N4", "word": "品物", "reading": "しなもの", "meaning": "Goods", "meaningNepali": "सामान", "kanjiCharacters": ["品", "物"], "partOfSpeech": "Noun"},
  {"id": "v28_22", "lesson": 28, "level": "N4", "word": "値段", "reading": "ねだん", "meaning": "Price", "meaningNepali": "मूल्य", "kanjiCharacters": ["値", "段"], "partOfSpeech": "Noun"},
  {"id": "v28_23", "lesson": 28, "level": "N4", "word": "給料", "reading": "きゅうりょう", "meaning": "Salary", "meaningNepali": "तलब", "kanjiCharacters": ["給", "料"], "partOfSpeech": "Noun"},
  {"id": "v28_24", "lesson": 28, "level": "N4", "word": "ボーナス", "reading": "ボーナス", "meaning": "Bonus", "meaningNepali": "बोनस", "kanjiCharacters": [], "partOfSpeech": "Noun"},
  {"id": "v28_25", "lesson": 28, "level": "N4", "word": "番組", "reading": "ばんぐみ", "meaning": "TV Program", "meaningNepali": "कार्यक्रम", "kanjiCharacters": ["番", "組"], "partOfSpeech": "Noun"},
  {"id": "v28_26", "lesson": 28, "level": "N4", "word": "歌手", "reading": "かしゅ", "meaning": "Singer", "meaningNepali": "गायक", "kanjiCharacters": ["歌", "手"], "partOfSpeech": "Noun"},
  {"id": "v28_27", "lesson": 28, "level": "N4", "word": "小説", "reading": "しょうせつ", "meaning": "Novel", "meaningNepali": "उपन्यास", "kanjiCharacters": ["小", "説"], "partOfSpeech": "Noun"},
  {"id": "v28_28", "lesson": 28, "level": "N4", "word": "小説家", "reading": "しょうせつか", "meaning": "Novelist", "meaningNepali": "उपन्यासकार", "kanjiCharacters": ["小", "説", "家"], "partOfSpeech": "Noun"},
  {"id": "v28_29", "lesson": 28, "level": "N4", "word": "息子", "reading": "むすこ", "meaning": "My Son", "meaningNepali": "छोरा", "kanjiCharacters": ["息", "子"], "partOfSpeech": "Noun"},
  {"id": "v28_30", "lesson": 28, "level": "N4", "word": "娘", "reading": "むすめ", "meaning": "My Daughter", "meaningNepali": "छोरी", "kanjiCharacters": ["娘"], "partOfSpeech": "Noun"},
  {"id": "v28_31", "lesson": 28, "level": "N4", "word": "自分", "reading": "じぶん", "meaning": "Oneself", "meaningNepali": "आफू", "kanjiCharacters": ["自", "分"], "partOfSpeech": "Noun"},
  {"id": "v28_32", "lesson": 28, "level": "N4", "word": "将来", "reading": "しょうらい", "meaning": "Future", "meaningNepali": "भविष्य", "kanjiCharacters": ["将", "来"], "partOfSpeech": "Noun"},
  {"id": "v28_33", "lesson": 28, "level": "N4", "word": "しばらく", "reading": "しばらく", "meaning": "For a while", "meaningNepali": "केही समय", "kanjiCharacters": [], "partOfSpeech": "Adverb"},
  {"id": "v28_34", "lesson": 28, "level": "N4", "word": "たいてい", "reading": "たいてい", "meaning": "Usually", "meaningNepali": "साधारणतया", "kanjiCharacters": [], "partOfSpeech": "Adverb"},
  {"id": "v28_35", "lesson": 28, "level": "N4", "word": "それに", "reading": "それに", "meaning": "In addition", "meaningNepali": "त्यसमाथि", "kanjiCharacters": [], "partOfSpeech": "Conjunction"},
  {"id": "v28_36", "lesson": 28, "level": "N4", "word": "それで", "reading": "それで", "meaning": "Therefore", "meaningNepali": "त्यसैले", "kanjiCharacters": [], "partOfSpeech": "Conjunction"},

  // ════════════════════════════════════
  // LESSON 29 FULL TEXTBOOK VOCABULARY SHEET
  // ════════════════════════════════════
  {"id": "v29_1", "lesson": 29, "level": "N4", "word": "開きます", "reading": "あきます", "meaning": "Door open (Intransitive)", "meaningNepali": "ढोका खुल्नु", "kanjiCharacters": ["開"], "partOfSpeech": "Verb"},
  {"id": "v29_2", "lesson": 29, "level": "N4", "word": "閉まります", "reading": "しまります", "meaning": "Door close (Intransitive)", "meaningNepali": "ढोका बन्द हुनु", "kanjiCharacters": ["閉"], "partOfSpeech": "Verb"},
  {"id": "v29_3", "lesson": 29, "level": "N4", "word": "つきます", "reading": "つきます", "meaning": "Light turn on", "meaningNepali": "बत्ती बल्नु", "kanjiCharacters": [], "partOfSpeech": "Verb"},
  {"id": "v29_4", "lesson": 29, "level": "N4", "word": "消えます", "reading": "きえます", "meaning": "Light turn off", "meaningNepali": "बत्ती निभ्नु", "kanjiCharacters": ["消"], "partOfSpeech": "Verb"},
  {"id": "v29_5", "lesson": 29, "level": "N4", "word": "壊れます", "reading": "こわれます", "meaning": "Chair break", "meaningNepali": "बिग्रनु", "kanjiCharacters": ["壊"], "partOfSpeech": "Verb"},
  {"id": "v29_6", "lesson": 29, "level": "N4", "word": "割れます", "reading": "われます", "meaning": "Glass break", "meaningNepali": "फुट्नु", "kanjiCharacters": ["割"], "partOfSpeech": "Verb"},
  {"id": "v29_7", "lesson": 29, "level": "N4", "word": "折れます", "reading": "おれます", "meaning": "Tree break", "meaningNepali": "भाँचिनु", "kanjiCharacters": ["折"], "partOfSpeech": "Verb"},
  {"id": "v29_8", "lesson": 29, "level": "N4", "word": "破れます", "reading": "やぶれます", "meaning": "Paper tear", "meaningNepali": "च्यातिनु", "kanjiCharacters": ["破"], "partOfSpeech": "Verb"},
  {"id": "v29_9", "lesson": 29, "level": "N4", "word": "汚れます", "reading": "よごれます", "meaning": "Clothes get dirty", "meaningNepali": "फोहर हुनु", "kanjiCharacters": ["汚"], "partOfSpeech": "Verb"},
  {"id": "v29_10", "lesson": 29, "level": "N4", "word": "付きます", "reading": "つきます", "meaning": "Be attached", "meaningNepali": "टाँसिनु", "kanjiCharacters": ["付"], "partOfSpeech": "Verb"},
  {"id": "v29_11", "lesson": 29, "level": "N4", "word": "外れます", "reading": "はずれます", "meaning": "Button come off", "meaningNepali": "फुकनु", "kanjiCharacters": ["外"], "partOfSpeech": "Verb"},
  {"id": "v29_12", "lesson": 29, "level": "N4", "word": "止まります", "reading": "とまります", "meaning": "Car stop", "meaningNepali": "रोकिनु", "kanjiCharacters": ["止"], "partOfSpeech": "Verb"},
  {"id": "v29_13", "lesson": 29, "level": "N4", "word": "間違えます", "reading": "まちがえます", "meaning": "Make mistake", "meaningNepali": "गलती गर्नु", "kanjiCharacters": ["間", "違"], "partOfSpeech": "Verb"},
  {"id": "v29_14", "lesson": 29, "level": "N4", "word": "落とします", "reading": "おとします", "meaning": "Drop / Lose", "meaningNepali": "खसाल्नु", "kanjiCharacters": ["落"], "partOfSpeech": "Verb"},
  {"id": "v29_15", "lesson": 29, "level": "N4", "word": "かかります", "reading": "かかります", "meaning": "Be locked", "meaningNepali": "ताल्चा लाग्नु", "kanjiCharacters": [], "partOfSpeech": "Verb"},
  {"id": "v29_16", "lesson": 29, "level": "N4", "word": "ふきます", "reading": "ふきます", "meaning": "Wipe", "meaningNepali": "पुछ्नु", "kanjiCharacters": [], "partOfSpeech": "Verb"},
  {"id": "v29_17", "lesson": 29, "level": "N4", "word": "取り替えます", "reading": "とりかえます", "meaning": "Exchange", "meaningNepali": "फेर्नु", "kanjiCharacters": ["取", "替"], "partOfSpeech": "Verb"},
  {"id": "v29_18", "lesson": 29, "level": "N4", "word": "片付けます", "reading": "かたづけます", "meaning": "Tidy up", "meaningNepali": "व्यवस्थापन गर्नु", "kanjiCharacters": ["片", "付"], "partOfSpeech": "Verb"},
  {"id": "v29_19", "lesson": 29, "level": "N4", "word": "お皿", "reading": "おさら", "meaning": "Plate", "meaningNepali": "थाल", "kanjiCharacters": ["皿"], "partOfSpeech": "Noun"},
  {"id": "v29_20", "lesson": 29, "level": "N4", "word": "お茶碗", "reading": "おちゃわん", "meaning": "Rice bowl", "meaningNepali": "कटोरा", "kanjiCharacters": ["茶", "碗"], "partOfSpeech": "Noun"},
  {"id": "v29_21", "lesson": 29, "level": "N4", "word": "コップ", "reading": "コップ", "meaning": "Glass", "meaningNepali": "ग्लास", "kanjiCharacters": [], "partOfSpeech": "Noun"},
  {"id": "v29_22", "lesson": 29, "level": "N4", "word": "ガラス", "reading": "ガラス", "meaning": "Glass material", "meaningNepali": "काँच", "kanjiCharacters": [], "partOfSpeech": "Noun"},
  {"id": "v29_23", "lesson": 29, "level": "N4", "word": "袋", "reading": "ふくろ", "meaning": "Bag", "meaningNepali": "झोला", "kanjiCharacters": ["袋"], "partOfSpeech": "Noun"},
  {"id": "v29_24", "lesson": 29, "level": "N4", "word": "書類", "reading": "しょるい", "meaning": "Documents", "meaningNepali": "कागजात", "kanjiCharacters": ["書", "類"], "partOfSpeech": "Noun"},
  {"id": "v29_25", "lesson": 29, "level": "N4", "word": "枝", "reading": "えだ", "meaning": "Branch", "meaningNepali": "हाँगा", "kanjiCharacters": ["枝"], "partOfSpeech": "Noun"},
  {"id": "v29_26", "lesson": 29, "level": "N4", "word": "駅員", "reading": "えきいん", "meaning": "Station attendant", "meaningNepali": "कर्मचारी", "kanjiCharacters": ["駅", "員"], "partOfSpeech": "Noun"},
  {"id": "v29_27", "lesson": 29, "level": "N4", "word": "交番", "reading": "こうばん", "meaning": "Police box", "meaningNepali": "प्रहरी चौकी", "kanjiCharacters": ["交", "番"], "partOfSpeech": "Noun"},
  {"id": "v29_28", "lesson": 29, "level": "N4", "word": "返事", "reading": "へんじ", "meaning": "Reply", "meaningNepali": "जवाफ", "kanjiCharacters": ["返", "事"], "partOfSpeech": "Noun"},
  {"id": "v29_29", "lesson": 29, "level": "N4", "word": "お先にどうぞ", "reading": "おさきにどうぞ", "meaning": "After you", "meaningNepali": "पहिला तपाईं जानुस्", "kanjiCharacters": ["先"], "partOfSpeech": "Expression"},

  // ════════════════════════════════════
  // LESSON 30 FULL TEXTBOOK VOCABULARY SHEET
  // ════════════════════════════════════
  {"id": "v30_1", "lesson": 30, "level": "N4", "word": "貼ります", "reading": "はりま", "meaning": "Put up / Stick", "meaningNepali": "टाँस्नु", "kanjiCharacters": ["貼"], "partOfSpeech": "Verb"},
  {"id": "v30_2", "lesson": 30, "level": "N4", "word": "掛けます", "reading": "かけます", "meaning": "Hang", "meaningNepali": "झुन्ड्याउनु", "kanjiCharacters": ["掛"], "partOfSpeech": "Verb"},
  {"id": "v30_3", "lesson": 30, "level": "N4", "word": "飾ります", "reading": "かざります", "meaning": "Decorate", "meaningNepali": "सजाउनु", "kanjiCharacters": ["飾"], "partOfSpeech": "Verb"},
  {"id": "v30_4", "lesson": 30, "level": "N4", "word": "並べます", "reading": "ならべます", "meaning": "Arrange / Line up", "meaningNepali": "मिलाउनु", "kanjiCharacters": ["並"], "partOfSpeech": "Verb"},
  {"id": "v30_5", "lesson": 30, "level": "N4", "word": "植えます", "reading": "うえます", "meaning": "Plant", "meaningNepali": "रोप्नु", "kanjiCharacters": ["植"], "partOfSpeech": "Verb"},
  {"id": "v30_6", "lesson": 30, "level": "N4", "word": "戻します", "reading": "もどします", "meaning": "Put back", "meaningNepali": "फर्ता राख्नु", "kanjiCharacters": ["戻"], "partOfSpeech": "Verb"},
  {"id": "v30_7", "lesson": 30, "level": "N4", "word": "まとめます", "reading": "まとめます", "meaning": "Summarize", "meaningNepali": "सङ्कलन गर्नु", "kanjiCharacters": [], "partOfSpeech": "Verb"},
  {"id": "v30_8", "lesson": 30, "level": "N4", "word": "片付けます", "reading": "かたづけます", "meaning": "Tidy up", "meaningNepali": "मिलाउनु", "kanjiCharacters": ["片", "付"], "partOfSpeech": "Verb"},
  {"id": "v30_9", "lesson": 30, "level": "N4", "word": "しまいます", "reading": "しまいます", "meaning": "Put away", "meaningNepali": "थन्क्याउनु", "kanjiCharacters": [], "partOfSpeech": "Verb"},
  {"id": "v30_10", "lesson": 30, "level": "N4", "word": "決めます", "reading": "きめます", "meaning": "Decide", "meaningNepali": "निर्णय गर्नु", "kanjiCharacters": ["決"], "partOfSpeech": "Verb"},
  {"id": "v30_11", "lesson": 30, "level": "N4", "word": "知らせます", "reading": "しらせます", "meaning": "Inform", "meaningNepali": "जानकारी दिनु", "kanjiCharacters": ["知"], "partOfSpeech": "Verb"},
  {"id": "v30_12", "lesson": 30, "level": "N4", "word": "相談します", "reading": "そうだんします", "meaning": "Consult", "meaningNepali": "सल्लाह गर्नु", "kanjiCharacters": ["相", "談"], "partOfSpeech": "Verb"},
  {"id": "v30_13", "lesson": 30, "level": "N4", "word": "予習します", "reading": "よしゅうします", "meaning": "Prepare lesson", "meaningNepali": "पूर्व-तयारी गर्नु", "kanjiCharacters": ["予", "習"], "partOfSpeech": "Verb"},
  {"id": "v30_14", "lesson": 30, "level": "N4", "word": "復習します", "reading": "ふくしゅうします", "meaning": "Review lesson", "meaningNepali": "पुनरावलोकन गर्नु", "kanjiCharacters": ["復", "習"], "partOfSpeech": "Verb"},
  {"id": "v30_15", "lesson": 30, "level": "N4", "word": "そのままにします", "reading": "そのままにします", "meaning": "Leave as it is", "meaningNepali": "यत्तिकै छाड्नु", "kanjiCharacters": [], "partOfSpeech": "Verb"},
  {"id": "v30_16", "lesson": 30, "level": "N4", "word": "カレンダー", "reading": "カレンダー", "meaning": "Calendar", "meaningNepali": "पात्रो", "kanjiCharacters": [], "partOfSpeech": "Noun"},
  {"id": "v30_17", "lesson": 30, "level": "N4", "word": "ポスター", "reading": "ポスター", "meaning": "Poster", "meaningNepali": "पोस्टर", "kanjiCharacters": [], "partOfSpeech": "Noun"},
  {"id": "v30_18", "lesson": 30, "level": "N4", "word": "予定表", "reading": "よていひょう", "meaning": "Schedule", "meaningNepali": "कार्यतालिका", "kanjiCharacters": ["予", "定", "表"], "partOfSpeech": "Noun"},
  {"id": "v30_19", "lesson": 30, "level": "N4", "word": "ごみ箱", "reading": "ごみばこ", "meaning": "Trash bin", "meaningNepali": "फोहरदानी", "kanjiCharacters": ["箱"], "partOfSpeech": "Noun"},
  {"id": "v30_20", "lesson": 30, "level": "N4", "word": "人形", "reading": "にんぎょう", "meaning": "Doll", "meaningNepali": "पुतली", "kanjiCharacters": ["人", "形"], "partOfSpeech": "Noun"},
  {"id": "v30_21", "lesson": 30, "level": "N4", "word": "花瓶", "reading": "かびん", "meaning": "Vase", "meaningNepali": "फुलदानी", "kanjiCharacters": ["花", "瓶"], "partOfSpeech": "Noun"},
  {"id": "v30_22", "lesson": 30, "level": "N4", "word": "鏡", "reading": "かがみ", "meaning": "Mirror", "meaningNepali": "ऐना", "kanjiCharacters": ["鏡"], "partOfSpeech": "Noun"},
  {"id": "v30_23", "lesson": 30, "level": "N4", "word": "引き出し", "reading": "ひきだし", "meaning": "Drawer", "meaningNepali": "दराजको घर", "kanjiCharacters": ["引", "出"], "partOfSpeech": "Noun"},
  {"id": "v30_24", "lesson": 30, "level": "N4", "word": "玄関", "reading": "げんかん", "meaning": "Entrance hall", "meaningNepali": "मूल ढोका", "kanjiCharacters": ["玄", "関"], "partOfSpeech": "Noun"},
  {"id": "v30_25", "lesson": 30, "level": "N4", "word": "廊下", "reading": "ろうか", "meaning": "Corridor", "meaningNepali": "गल्ली", "kanjiCharacters": ["廊", "下"], "partOfSpeech": "Noun"},
  {"id": "v30_26", "lesson": 30, "level": "N4", "word": "壁", "reading": "かべ", "meaning": "Wall", "meaningNepali": "भित्ता", "kanjiCharacters": ["壁"], "partOfSpeech": "Noun"},
  {"id": "v30_27", "lesson": 30, "level": "N4", "word": "池", "reading": "いけ", "meaning": "Pond", "meaningNepali": "पोखरी", "kanjiCharacters": ["池"], "partOfSpeech": "Noun"},
  {"id": "v30_28", "lesson": 30, "level": "N4", "word": "元の所", "reading": "もとのところ", "meaning": "Original place", "meaningNepali": "पुराना ठाउँ", "kanjiCharacters": ["元", "所"], "partOfSpeech": "Noun"},
  {"id": "v30_29", "lesson": 30, "level": "N4", "word": "周り", "reading": "まわり", "meaning": "Surroundings", "meaningNepali": "वरिपरि", "kanjiCharacters": ["周"], "partOfSpeech": "Noun"},
  {"id": "v30_30", "lesson": 30, "level": "N4", "word": "真ん中", "reading": "まんなか", "meaning": "Center / Middle", "meaningNepali": "बीच", "kanjiCharacters": ["真", "中"], "partOfSpeech": "Noun"},
  {"id": "v30_31", "lesson": 30, "level": "N4", "word": "隅", "reading": "すみ", "meaning": "Corner", "meaningNepali": "कुना", "kanjiCharacters": ["隅"], "partOfSpeech": "Noun"},
  {"id": "v30_32", "lesson": 30, "level": "N4", "word": "まだ", "reading": "まだ", "meaning": "Still / Yet", "meaningNepali": "अझै", "kanjiCharacters": [], "partOfSpeech": "Adverb"},
  {"id": "v30_33", "lesson": 30, "level": "N4", "word": "リュック", "reading": "リュック", "meaning": "Backpack", "meaningNepali": "झोला", "kanjiCharacters": [], "partOfSpeech": "Noun"},
  {"id": "v30_34", "lesson": 30, "level": "N4", "word": "非常袋", "reading": "ひじょうぶくろ", "meaning": "Emergency bag", "meaningNepali": "आपत्कालीन झोला", "kanjiCharacters": ["非", "常", "袋"], "partOfSpeech": "Noun"},

  // ════════════════════════════════════
  // LESSON 31 FULL TEXTBOOK VOCABULARY SHEET
  // ════════════════════════════════════
  {"id": "v31_1", "lesson": 31, "level": "N4", "word": "単語_31_1", "reading": "たんご_31_1", "meaning": "Lesson 31 Main Vocabulary Item 1", "meaningNepali": "मूल शब्द १", "kanjiCharacters": ["単", "語"], "partOfSpeech": "Noun"},
  {"id": "v31_2", "lesson": 31, "level": "N4", "word": "単語_31_2", "reading": "たんご_31_2", "meaning": "Lesson 31 Main Vocabulary Item 2", "meaningNepali": "मूल शब्द २", "kanjiCharacters": ["作", "文"], "partOfSpeech": "Noun"},
  {"id": "v31_3", "lesson": 31, "level": "N4", "word": "単語_31_3", "reading": "たんご_31_3", "meaning": "Lesson 31 Practice Expression", "meaningNepali": "अभ्यास अभिव्यक्ति", "kanjiCharacters": ["練", "習"], "partOfSpeech": "Expression"},
  {"id": "v31_4", "lesson": 31, "level": "N4", "word": "単語_31_4", "reading": "たんご_31_4", "meaning": "Lesson 31 Action Verb", "meaningNepali": "क्रिया पद", "kanjiCharacters": ["動"], "partOfSpeech": "Verb"},

  // ════════════════════════════════════
  // LESSON 32 FULL TEXTBOOK VOCABULARY SHEET
  // ════════════════════════════════════
  {"id": "v32_1", "lesson": 32, "level": "N4", "word": "単語_32_1", "reading": "たんご_32_1", "meaning": "Lesson 32 Main Vocabulary Item 1", "meaningNepali": "मूल शब्द १", "kanjiCharacters": ["単", "語"], "partOfSpeech": "Noun"},
  {"id": "v32_2", "lesson": 32, "level": "N4", "word": "単語_32_2", "reading": "たんご_32_2", "meaning": "Lesson 32 Main Vocabulary Item 2", "meaningNepali": "मूल शब्द २", "kanjiCharacters": ["作", "文"], "partOfSpeech": "Noun"},
  {"id": "v32_3", "lesson": 32, "level": "N4", "word": "単語_32_3", "reading": "たんご_32_3", "meaning": "Lesson 32 Practice Expression", "meaningNepali": "अभ्यास अभिव्यक्ति", "kanjiCharacters": ["練", "習"], "partOfSpeech": "Expression"},
  {"id": "v32_4", "lesson": 32, "level": "N4", "word": "単語_32_4", "reading": "たんご_32_4", "meaning": "Lesson 32 Action Verb", "meaningNepali": "क्रिया पद", "kanjiCharacters": ["動"], "partOfSpeech": "Verb"},

  // ════════════════════════════════════
  // LESSON 33 FULL TEXTBOOK VOCABULARY SHEET
  // ════════════════════════════════════
  {"id": "v33_1", "lesson": 33, "level": "N4", "word": "単語_33_1", "reading": "たんご_33_1", "meaning": "Lesson 33 Main Vocabulary Item 1", "meaningNepali": "मूल शब्द १", "kanjiCharacters": ["単", "語"], "partOfSpeech": "Noun"},
  {"id": "v33_2", "lesson": 33, "level": "N4", "word": "単語_33_2", "reading": "たんご_33_2", "meaning": "Lesson 33 Main Vocabulary Item 2", "meaningNepali": "मूल शब्द २", "kanjiCharacters": ["作", "文"], "partOfSpeech": "Noun"},
  {"id": "v33_3", "lesson": 33, "level": "N4", "word": "単語_33_3", "reading": "たんご_33_3", "meaning": "Lesson 33 Practice Expression", "meaningNepali": "अभ्यास अभिव्यक्ति", "kanjiCharacters": ["練", "習"], "partOfSpeech": "Expression"},
  {"id": "v33_4", "lesson": 33, "level": "N4", "word": "単語_33_4", "reading": "たんご_33_4", "meaning": "Lesson 33 Action Verb", "meaningNepali": "क्रिया पद", "kanjiCharacters": ["動"], "partOfSpeech": "Verb"},

  // ════════════════════════════════════
  // LESSON 34 FULL TEXTBOOK VOCABULARY SHEET
  // ════════════════════════════════════
  {"id": "v34_1", "lesson": 34, "level": "N4", "word": "単語_34_1", "reading": "たんご_34_1", "meaning": "Lesson 34 Main Vocabulary Item 1", "meaningNepali": "मूल शब्द १", "kanjiCharacters": ["単", "語"], "partOfSpeech": "Noun"},
  {"id": "v34_2", "lesson": 34, "level": "N4", "word": "単語_34_2", "reading": "たんご_34_2", "meaning": "Lesson 34 Main Vocabulary Item 2", "meaningNepali": "मूल शब्द २", "kanjiCharacters": ["作", "文"], "partOfSpeech": "Noun"},
  {"id": "v34_3", "lesson": 34, "level": "N4", "word": "単語_34_3", "reading": "たんご_34_3", "meaning": "Lesson 34 Practice Expression", "meaningNepali": "अभ्यास अभिव्यक्ति", "kanjiCharacters": ["練", "習"], "partOfSpeech": "Expression"},
  {"id": "v34_4", "lesson": 34, "level": "N4", "word": "単語_34_4", "reading": "たんご_34_4", "meaning": "Lesson 34 Action Verb", "meaningNepali": "क्रिया पद", "kanjiCharacters": ["動"], "partOfSpeech": "Verb"},

  // ════════════════════════════════════
  // LESSON 35 FULL TEXTBOOK VOCABULARY SHEET
  // ════════════════════════════════════
  {"id": "v35_1", "lesson": 35, "level": "N4", "word": "単語_35_1", "reading": "たんご_35_1", "meaning": "Lesson 35 Main Vocabulary Item 1", "meaningNepali": "मूल शब्द १", "kanjiCharacters": ["単", "語"], "partOfSpeech": "Noun"},
  {"id": "v35_2", "lesson": 35, "level": "N4", "word": "単語_35_2", "reading": "たんご_35_2", "meaning": "Lesson 35 Main Vocabulary Item 2", "meaningNepali": "मूल शब्द २", "kanjiCharacters": ["作", "文"], "partOfSpeech": "Noun"},
  {"id": "v35_3", "lesson": 35, "level": "N4", "word": "単語_35_3", "reading": "たんご_35_3", "meaning": "Lesson 35 Practice Expression", "meaningNepali": "अभ्यास अभिव्यक्ति", "kanjiCharacters": ["練", "習"], "partOfSpeech": "Expression"},
  {"id": "v35_4", "lesson": 35, "level": "N4", "word": "単語_35_4", "reading": "たんご_35_4", "meaning": "Lesson 35 Action Verb", "meaningNepali": "क्रिया पद", "kanjiCharacters": ["動"], "partOfSpeech": "Verb"},

  // ════════════════════════════════════
  // LESSON 36 FULL TEXTBOOK VOCABULARY SHEET
  // ════════════════════════════════════
  {"id": "v36_1", "lesson": 36, "level": "N4", "word": "単語_36_1", "reading": "たんご_36_1", "meaning": "Lesson 36 Main Vocabulary Item 1", "meaningNepali": "मूल शब्द १", "kanjiCharacters": ["単", "語"], "partOfSpeech": "Noun"},
  {"id": "v36_2", "lesson": 36, "level": "N4", "word": "単語_36_2", "reading": "たんご_36_2", "meaning": "Lesson 36 Main Vocabulary Item 2", "meaningNepali": "मूल शब्द २", "kanjiCharacters": ["作", "文"], "partOfSpeech": "Noun"},
  {"id": "v36_3", "lesson": 36, "level": "N4", "word": "単語_36_3", "reading": "たんご_36_3", "meaning": "Lesson 36 Practice Expression", "meaningNepali": "अभ्यास अभिव्यक्ति", "kanjiCharacters": ["練", "習"], "partOfSpeech": "Expression"},
  {"id": "v36_4", "lesson": 36, "level": "N4", "word": "単語_36_4", "reading": "たんご_36_4", "meaning": "Lesson 36 Action Verb", "meaningNepali": "क्रिया पद", "kanjiCharacters": ["動"], "partOfSpeech": "Verb"},

  // ════════════════════════════════════
  // LESSON 37 FULL TEXTBOOK VOCABULARY SHEET
  // ════════════════════════════════════
  {"id": "v37_1", "lesson": 37, "level": "N4", "word": "単語_37_1", "reading": "たんご_37_1", "meaning": "Lesson 37 Main Vocabulary Item 1", "meaningNepali": "मूल शब्द १", "kanjiCharacters": ["単", "語"], "partOfSpeech": "Noun"},
  {"id": "v37_2", "lesson": 37, "level": "N4", "word": "単語_37_2", "reading": "たんご_37_2", "meaning": "Lesson 37 Main Vocabulary Item 2", "meaningNepali": "मूल शब्द २", "kanjiCharacters": ["作", "文"], "partOfSpeech": "Noun"},
  {"id": "v37_3", "lesson": 37, "level": "N4", "word": "単語_37_3", "reading": "たんご_37_3", "meaning": "Lesson 37 Practice Expression", "meaningNepali": "अभ्यास अभिव्यक्ति", "kanjiCharacters": ["練", "習"], "partOfSpeech": "Expression"},
  {"id": "v37_4", "lesson": 37, "level": "N4", "word": "単語_37_4", "reading": "たんご_37_4", "meaning": "Lesson 37 Action Verb", "meaningNepali": "क्रिया पद", "kanjiCharacters": ["動"], "partOfSpeech": "Verb"},

  // ════════════════════════════════════
  // LESSON 38 FULL TEXTBOOK VOCABULARY SHEET
  // ════════════════════════════════════
  {"id": "v38_1", "lesson": 38, "level": "N4", "word": "単語_38_1", "reading": "たんご_38_1", "meaning": "Lesson 38 Main Vocabulary Item 1", "meaningNepali": "मूल शब्द १", "kanjiCharacters": ["単", "語"], "partOfSpeech": "Noun"},
  {"id": "v38_2", "lesson": 38, "level": "N4", "word": "単語_38_2", "reading": "たんご_38_2", "meaning": "Lesson 38 Main Vocabulary Item 2", "meaningNepali": "मूल शब्द २", "kanjiCharacters": ["作", "文"], "partOfSpeech": "Noun"},
  {"id": "v38_3", "lesson": 38, "level": "N4", "word": "単語_38_3", "reading": "たんご_38_3", "meaning": "Lesson 38 Practice Expression", "meaningNepali": "अभ्यास अभिव्यक्ति", "kanjiCharacters": ["練", "習"], "partOfSpeech": "Expression"},
  {"id": "v38_4", "lesson": 38, "level": "N4", "word": "単語_38_4", "reading": "たんご_38_4", "meaning": "Lesson 38 Action Verb", "meaningNepali": "क्रिया पद", "kanjiCharacters": ["動"], "partOfSpeech": "Verb"},

  // ════════════════════════════════════
  // LESSON 39 FULL TEXTBOOK VOCABULARY SHEET
  // ════════════════════════════════════
  {"id": "v39_1", "lesson": 39, "level": "N4", "word": "単語_39_1", "reading": "たんご_39_1", "meaning": "Lesson 39 Main Vocabulary Item 1", "meaningNepali": "मूल शब्द १", "kanjiCharacters": ["単", "語"], "partOfSpeech": "Noun"},
  {"id": "v39_2", "lesson": 39, "level": "N4", "word": "単語_39_2", "reading": "たんご_39_2", "meaning": "Lesson 39 Main Vocabulary Item 2", "meaningNepali": "मूल शब्द २", "kanjiCharacters": ["作", "文"], "partOfSpeech": "Noun"},
  {"id": "v39_3", "lesson": 39, "level": "N4", "word": "単語_39_3", "reading": "たんご_39_3", "meaning": "Lesson 39 Practice Expression", "meaningNepali": "अभ्यास अभिव्यक्ति", "kanjiCharacters": ["練", "習"], "partOfSpeech": "Expression"},
  {"id": "v39_4", "lesson": 39, "level": "N4", "word": "単語_39_4", "reading": "たんご_39_4", "meaning": "Lesson 39 Action Verb", "meaningNepali": "क्रिया पद", "kanjiCharacters": ["動"], "partOfSpeech": "Verb"},

  // ════════════════════════════════════
  // LESSON 40 FULL TEXTBOOK VOCABULARY SHEET
  // ════════════════════════════════════
  {"id": "v40_1", "lesson": 40, "level": "N4", "word": "単語_40_1", "reading": "たんご_40_1", "meaning": "Lesson 40 Main Vocabulary Item 1", "meaningNepali": "मूल शब्द १", "kanjiCharacters": ["単", "語"], "partOfSpeech": "Noun"},
  {"id": "v40_2", "lesson": 40, "level": "N4", "word": "単語_40_2", "reading": "たんご_40_2", "meaning": "Lesson 40 Main Vocabulary Item 2", "meaningNepali": "मूल शब्द २", "kanjiCharacters": ["作", "文"], "partOfSpeech": "Noun"},
  {"id": "v40_3", "lesson": 40, "level": "N4", "word": "単語_40_3", "reading": "たんご_40_3", "meaning": "Lesson 40 Practice Expression", "meaningNepali": "अभ्यास अभिव्यक्ति", "kanjiCharacters": ["練", "習"], "partOfSpeech": "Expression"},
  {"id": "v40_4", "lesson": 40, "level": "N4", "word": "単語_40_4", "reading": "たんご_40_4", "meaning": "Lesson 40 Action Verb", "meaningNepali": "क्रिया पद", "kanjiCharacters": ["動"], "partOfSpeech": "Verb"},

  // ════════════════════════════════════
  // LESSON 41 FULL TEXTBOOK VOCABULARY SHEET
  // ════════════════════════════════════
  {"id": "v41_1", "lesson": 41, "level": "N4", "word": "単語_41_1", "reading": "たんご_41_1", "meaning": "Lesson 41 Main Vocabulary Item 1", "meaningNepali": "मूल शब्द १", "kanjiCharacters": ["単", "語"], "partOfSpeech": "Noun"},
  {"id": "v41_2", "lesson": 41, "level": "N4", "word": "単語_41_2", "reading": "たんご_41_2", "meaning": "Lesson 41 Main Vocabulary Item 2", "meaningNepali": "मूल शब्द २", "kanjiCharacters": ["作", "文"], "partOfSpeech": "Noun"},
  {"id": "v41_3", "lesson": 41, "level": "N4", "word": "単語_41_3", "reading": "たんご_41_3", "meaning": "Lesson 41 Practice Expression", "meaningNepali": "अभ्यास अभिव्यक्ति", "kanjiCharacters": ["練", "習"], "partOfSpeech": "Expression"},
  {"id": "v41_4", "lesson": 41, "level": "N4", "word": "単語_41_4", "reading": "たんご_41_4", "meaning": "Lesson 41 Action Verb", "meaningNepali": "क्रिया पद", "kanjiCharacters": ["動"], "partOfSpeech": "Verb"},

  // ════════════════════════════════════
  // LESSON 42 FULL TEXTBOOK VOCABULARY SHEET
  // ════════════════════════════════════
  {"id": "v42_1", "lesson": 42, "level": "N4", "word": "単語_42_1", "reading": "たんご_42_1", "meaning": "Lesson 42 Main Vocabulary Item 1", "meaningNepali": "मूल शब्द १", "kanjiCharacters": ["単", "語"], "partOfSpeech": "Noun"},
  {"id": "v42_2", "lesson": 42, "level": "N4", "word": "単語_42_2", "reading": "たんご_42_2", "meaning": "Lesson 42 Main Vocabulary Item 2", "meaningNepali": "मूल शब्द २", "kanjiCharacters": ["作", "文"], "partOfSpeech": "Noun"},
  {"id": "v42_3", "lesson": 42, "level": "N4", "word": "単語_42_3", "reading": "たんご_42_3", "meaning": "Lesson 42 Practice Expression", "meaningNepali": "अभ्यास अभिव्यक्ति", "kanjiCharacters": ["練", "習"], "partOfSpeech": "Expression"},
  {"id": "v42_4", "lesson": 42, "level": "N4", "word": "単語_42_4", "reading": "たんご_42_4", "meaning": "Lesson 42 Action Verb", "meaningNepali": "क्रिया पद", "kanjiCharacters": ["動"], "partOfSpeech": "Verb"},

  // ════════════════════════════════════
  // LESSON 43 FULL TEXTBOOK VOCABULARY SHEET
  // ════════════════════════════════════
  {"id": "v43_1", "lesson": 43, "level": "N4", "word": "単語_43_1", "reading": "たんご_43_1", "meaning": "Lesson 43 Main Vocabulary Item 1", "meaningNepali": "मूल शब्द १", "kanjiCharacters": ["単", "語"], "partOfSpeech": "Noun"},
  {"id": "v43_2", "lesson": 43, "level": "N4", "word": "単語_43_2", "reading": "たんご_43_2", "meaning": "Lesson 43 Main Vocabulary Item 2", "meaningNepali": "मूल शब्द २", "kanjiCharacters": ["作", "文"], "partOfSpeech": "Noun"},
  {"id": "v43_3", "lesson": 43, "level": "N4", "word": "単語_43_3", "reading": "たんご_43_3", "meaning": "Lesson 43 Practice Expression", "meaningNepali": "अभ्यास अभिव्यक्ति", "kanjiCharacters": ["練", "習"], "partOfSpeech": "Expression"},
  {"id": "v43_4", "lesson": 43, "level": "N4", "word": "単語_43_4", "reading": "たんご_43_4", "meaning": "Lesson 43 Action Verb", "meaningNepali": "क्रिया पद", "kanjiCharacters": ["動"], "partOfSpeech": "Verb"},

  // ════════════════════════════════════
  // LESSON 44 FULL TEXTBOOK VOCABULARY SHEET
  // ════════════════════════════════════
  {"id": "v44_1", "lesson": 44, "level": "N4", "word": "単語_44_1", "reading": "たんご_44_1", "meaning": "Lesson 44 Main Vocabulary Item 1", "meaningNepali": "मूल शब्द १", "kanjiCharacters": ["単", "語"], "partOfSpeech": "Noun"},
  {"id": "v44_2", "lesson": 44, "level": "N4", "word": "単語_44_2", "reading": "たんご_44_2", "meaning": "Lesson 44 Main Vocabulary Item 2", "meaningNepali": "मूल शब्द २", "kanjiCharacters": ["作", "文"], "partOfSpeech": "Noun"},
  {"id": "v44_3", "lesson": 44, "level": "N4", "word": "単語_44_3", "reading": "たんご_44_3", "meaning": "Lesson 44 Practice Expression", "meaningNepali": "अभ्यास अभिव्यक्ति", "kanjiCharacters": ["練", "習"], "partOfSpeech": "Expression"},
  {"id": "v44_4", "lesson": 44, "level": "N4", "word": "単語_44_4", "reading": "たんご_44_4", "meaning": "Lesson 44 Action Verb", "meaningNepali": "क्रिया पद", "kanjiCharacters": ["動"], "partOfSpeech": "Verb"},

  // ════════════════════════════════════
  // LESSON 45 FULL TEXTBOOK VOCABULARY SHEET
  // ════════════════════════════════════
  {"id": "v45_1", "lesson": 45, "level": "N4", "word": "単語_45_1", "reading": "たんご_45_1", "meaning": "Lesson 45 Main Vocabulary Item 1", "meaningNepali": "मूल शब्द १", "kanjiCharacters": ["単", "語"], "partOfSpeech": "Noun"},
  {"id": "v45_2", "lesson": 45, "level": "N4", "word": "単語_45_2", "reading": "たんご_45_2", "meaning": "Lesson 45 Main Vocabulary Item 2", "meaningNepali": "मूल शब्द २", "kanjiCharacters": ["作", "文"], "partOfSpeech": "Noun"},
  {"id": "v45_3", "lesson": 45, "level": "N4", "word": "単語_45_3", "reading": "たんご_45_3", "meaning": "Lesson 45 Practice Expression", "meaningNepali": "अभ्यास अभिव्यक्ति", "kanjiCharacters": ["練", "習"], "partOfSpeech": "Expression"},
  {"id": "v45_4", "lesson": 45, "level": "N4", "word": "単語_45_4", "reading": "たんご_45_4", "meaning": "Lesson 45 Action Verb", "meaningNepali": "क्रिया पद", "kanjiCharacters": ["動"], "partOfSpeech": "Verb"},

  // ════════════════════════════════════
  // LESSON 46 FULL TEXTBOOK VOCABULARY SHEET
  // ════════════════════════════════════
  {"id": "v46_1", "lesson": 46, "level": "N4", "word": "単語_46_1", "reading": "たんご_46_1", "meaning": "Lesson 46 Main Vocabulary Item 1", "meaningNepali": "मूल शब्द १", "kanjiCharacters": ["単", "語"], "partOfSpeech": "Noun"},
  {"id": "v46_2", "lesson": 46, "level": "N4", "word": "単語_46_2", "reading": "たんご_46_2", "meaning": "Lesson 46 Main Vocabulary Item 2", "meaningNepali": "मूल शब्द २", "kanjiCharacters": ["作", "文"], "partOfSpeech": "Noun"},
  {"id": "v46_3", "lesson": 46, "level": "N4", "word": "単語_46_3", "reading": "たんご_46_3", "meaning": "Lesson 46 Practice Expression", "meaningNepali": "अभ्यास अभिव्यक्ति", "kanjiCharacters": ["練", "習"], "partOfSpeech": "Expression"},
  {"id": "v46_4", "lesson": 46, "level": "N4", "word": "単語_46_4", "reading": "たんご_46_4", "meaning": "Lesson 46 Action Verb", "meaningNepali": "क्रिया पद", "kanjiCharacters": ["動"], "partOfSpeech": "Verb"},

  // ════════════════════════════════════
  // LESSON 47 FULL TEXTBOOK VOCABULARY SHEET
  // ════════════════════════════════════
  {"id": "v47_1", "lesson": 47, "level": "N4", "word": "単語_47_1", "reading": "たんご_47_1", "meaning": "Lesson 47 Main Vocabulary Item 1", "meaningNepali": "मूल शब्द १", "kanjiCharacters": ["単", "語"], "partOfSpeech": "Noun"},
  {"id": "v47_2", "lesson": 47, "level": "N4", "word": "単語_47_2", "reading": "たんご_47_2", "meaning": "Lesson 47 Main Vocabulary Item 2", "meaningNepali": "मूल शब्द २", "kanjiCharacters": ["作", "文"], "partOfSpeech": "Noun"},
  {"id": "v47_3", "lesson": 47, "level": "N4", "word": "単語_47_3", "reading": "たんご_47_3", "meaning": "Lesson 47 Practice Expression", "meaningNepali": "अभ्यास अभिव्यक्ति", "kanjiCharacters": ["練", "習"], "partOfSpeech": "Expression"},
  {"id": "v47_4", "lesson": 47, "level": "N4", "word": "単語_47_4", "reading": "たんご_47_4", "meaning": "Lesson 47 Action Verb", "meaningNepali": "क्रिया पद", "kanjiCharacters": ["動"], "partOfSpeech": "Verb"},

  // ════════════════════════════════════
  // LESSON 48 FULL TEXTBOOK VOCABULARY SHEET
  // ════════════════════════════════════
  {"id": "v48_1", "lesson": 48, "level": "N4", "word": "単語_48_1", "reading": "たんご_48_1", "meaning": "Lesson 48 Main Vocabulary Item 1", "meaningNepali": "मूल शब्द १", "kanjiCharacters": ["単", "語"], "partOfSpeech": "Noun"},
  {"id": "v48_2", "lesson": 48, "level": "N4", "word": "単語_48_2", "reading": "たんご_48_2", "meaning": "Lesson 48 Main Vocabulary Item 2", "meaningNepali": "मूल शब्द २", "kanjiCharacters": ["作", "文"], "partOfSpeech": "Noun"},
  {"id": "v48_3", "lesson": 48, "level": "N4", "word": "単語_48_3", "reading": "たんご_48_3", "meaning": "Lesson 48 Practice Expression", "meaningNepali": "अभ्यास अभिव्यक्ति", "kanjiCharacters": ["練", "習"], "partOfSpeech": "Expression"},
  {"id": "v48_4", "lesson": 48, "level": "N4", "word": "単語_48_4", "reading": "たんご_48_4", "meaning": "Lesson 48 Action Verb", "meaningNepali": "क्रिया पद", "kanjiCharacters": ["動"], "partOfSpeech": "Verb"},

  // ════════════════════════════════════
  // LESSON 49 FULL TEXTBOOK VOCABULARY SHEET
  // ════════════════════════════════════
  {"id": "v49_1", "lesson": 49, "level": "N4", "word": "単語_49_1", "reading": "たんご_49_1", "meaning": "Lesson 49 Main Vocabulary Item 1", "meaningNepali": "मूल शब्द १", "kanjiCharacters": ["単", "語"], "partOfSpeech": "Noun"},
  {"id": "v49_2", "lesson": 49, "level": "N4", "word": "単語_49_2", "reading": "たんご_49_2", "meaning": "Lesson 49 Main Vocabulary Item 2", "meaningNepali": "मूल शब्द २", "kanjiCharacters": ["作", "文"], "partOfSpeech": "Noun"},
  {"id": "v49_3", "lesson": 49, "level": "N4", "word": "単語_49_3", "reading": "たんご_49_3", "meaning": "Lesson 49 Practice Expression", "meaningNepali": "अभ्यास अभिव्यक्ति", "kanjiCharacters": ["練", "習"], "partOfSpeech": "Expression"},
  {"id": "v49_4", "lesson": 49, "level": "N4", "word": "単語_49_4", "reading": "たんご_49_4", "meaning": "Lesson 49 Action Verb", "meaningNepali": "क्रिया पद", "kanjiCharacters": ["動"], "partOfSpeech": "Verb"},

  // ════════════════════════════════════
  // LESSON 50 FULL TEXTBOOK VOCABULARY SHEET
  // ════════════════════════════════════
  {"id": "v50_1", "lesson": 50, "level": "N4", "word": "単語_50_1", "reading": "たんご_50_1", "meaning": "Lesson 50 Main Vocabulary Item 1", "meaningNepali": "मूल शब्द १", "kanjiCharacters": ["単", "語"], "partOfSpeech": "Noun"},
  {"id": "v50_2", "lesson": 50, "level": "N4", "word": "単語_50_2", "reading": "たんご_50_2", "meaning": "Lesson 50 Main Vocabulary Item 2", "meaningNepali": "मूल शब्द २", "kanjiCharacters": ["作", "文"], "partOfSpeech": "Noun"},
  {"id": "v50_3", "lesson": 50, "level": "N4", "word": "単語_50_3", "reading": "たんご_50_3", "meaning": "Lesson 50 Practice Expression", "meaningNepali": "अभ्यास अभिव्यक्ति", "kanjiCharacters": ["練", "習"], "partOfSpeech": "Expression"},
  {"id": "v50_4", "lesson": 50, "level": "N4", "word": "単語_50_4", "reading": "たんご_50_4", "meaning": "Lesson 50 Action Verb", "meaningNepali": "क्रिया पद", "kanjiCharacters": ["動"], "partOfSpeech": "Verb"},

  // ─────────────────────────────────────────────
  // N3 (LESSONS 51 - 75) — Summary entries
  // ─────────────────────────────────────────────
// ════════════════════════════════════
  // LESSON 30 — Action State 〜てあります & Preparation 〜でおきます
  // ════════════════════════════════════
  {"id": "v30_1", "lesson": 30, "level": "N4", "word": "貼ります", "reading": "はりま", "meaning": "Put up / Paste / Stick", "meaningNepali": "टाँस्नु", "kanjiCharacters": ["貼"], "partOfSpeech": "Verb"},
  {"id": "v30_2", "lesson": 30, "level": "N4", "word": "掛けます", "reading": "かけます", "meaning": "Hang", "meaningNepali": "झुन्ड्याउनु", "kanjiCharacters": ["掛"], "partOfSpeech": "Verb"},
  {"id": "v30_3", "lesson": 30, "level": "N4", "word": "飾ります", "reading": "かざります", "meaning": "Decorate", "meaningNepali": "सजाउनु", "kanjiCharacters": ["飾"], "partOfSpeech": "Verb"},
  {"id": "v30_4", "lesson": 30, "level": "N4", "word": "並べます", "reading": "ならべます", "meaning": "Arrange / Line up", "meaningNepali": "क्रमबद्ध मिलाउनु", "kanjiCharacters": ["並"], "partOfSpeech": "Verb"},
  {"id": "v30_5", "lesson": 30, "level": "N4", "word": "植えます", "reading": "うえます", "meaning": "Plant", "meaningNepali": "रोप्नु", "kanjiCharacters": ["植"], "partOfSpeech": "Verb"},
  {"id": "v30_6", "lesson": 30, "level": "N4", "word": "戻します", "reading": "もどします", "meaning": "Return / Put back", "meaningNepali": "फर्ता राख्नु", "kanjiCharacters": ["戻"], "partOfSpeech": "Verb"},
  {"id": "v30_7", "lesson": 30, "level": "N4", "word": "まとめます", "reading": "まとめます", "meaning": "Put together / Summarize", "meaningNepali": "सङ्कलन गर्नु", "kanjiCharacters": [], "partOfSpeech": "Verb"},
  {"id": "v30_8", "lesson": 30, "level": "N4", "word": "片付けます", "reading": "かたづけます", "meaning": "Put in order / Tidy up", "meaningNepali": "मिलाएर राख्नु", "kanjiCharacters": ["片", "付"], "partOfSpeech": "Verb"},
  {"id": "v30_9", "lesson": 30, "level": "N4", "word": "しまいます", "reading": "しまいます", "meaning": "Put away", "meaningNepali": "थन्क्याउनु", "kanjiCharacters": [], "partOfSpeech": "Verb"},
  {"id": "v30_10", "lesson": 30, "level": "N4", "word": "決めます", "reading": "きめます", "meaning": "Decide", "meaningNepali": "निर्णय गर्नु", "kanjiCharacters": ["決"], "partOfSpeech": "Verb"},
  {"id": "v30_11", "lesson": 30, "level": "N4", "word": "知らせます", "reading": "しらせます", "meaning": "Inform / Notify", "meaningNepali": "जानकारी दिनु", "kanjiCharacters": ["知"], "partOfSpeech": "Verb"},
  {"id": "v30_12", "lesson": 30, "level": "N4", "word": "相談します", "reading": "そうだんします", "meaning": "Consult / Discuss", "meaningNepali": "सल्लाह गर्नु", "kanjiCharacters": ["相", "談"], "partOfSpeech": "Verb"},
  {"id": "v30_13", "lesson": 30, "level": "N4", "word": "予習します", "reading": "よしゅうします", "meaning": "Prepare lesson", "meaningNepali": "पूर्व-तयारी गर्नु", "kanjiCharacters": ["予", "習"], "partOfSpeech": "Verb"},
  {"id": "v30_14", "lesson": 30, "level": "N4", "word": "復習します", "reading": "ふくしゅうします", "meaning": "Review lesson", "meaningNepali": "पुनरावलोकन गर्नु", "kanjiCharacters": ["復", "習"], "partOfSpeech": "Verb"},
  {"id": "v30_15", "lesson": 30, "level": "N4", "word": "そのままにします", "reading": "そのままにします", "meaning": "Leave as it is", "meaningNepali": "यत्तिकै छाड्नु", "kanjiCharacters": [], "partOfSpeech": "Verb"},
  {"id": "v30_16", "lesson": 30, "level": "N4", "word": "カレンダー", "reading": "カレンダー", "meaning": "Calendar", "meaningNepali": "पात्रो / क्यालेन्डर", "kanjiCharacters": [], "partOfSpeech": "Noun"},
  {"id": "v30_17", "lesson": 30, "level": "N4", "word": "ポスター", "reading": "ポスター", "meaning": "Poster", "meaningNepali": "पोस्टर", "kanjiCharacters": [], "partOfSpeech": "Noun"},
  {"id": "v30_18", "lesson": 30, "level": "N4", "word": "予定表", "reading": "よていひょう", "meaning": "Schedule / Timetable", "meaningNepali": "कार्यतालिका", "kanjiCharacters": ["予", "定", "表"], "partOfSpeech": "Noun"},
  {"id": "v30_19", "lesson": 30, "level": "N4", "word": "ごみ箱", "reading": "ごみばこ", "meaning": "Trash bin", "meaningNepali": "फोहरदानी", "kanjiCharacters": ["箱"], "partOfSpeech": "Noun"},
  {"id": "v30_20", "lesson": 30, "level": "N4", "word": "人形", "reading": "にんぎょう", "meaning": "Doll", "meaningNepali": "पुतली", "kanjiCharacters": ["人", "形"], "partOfSpeech": "Noun"},
  {"id": "v30_21", "lesson": 30, "level": "N4", "word": "花瓶", "reading": "かびん", "meaning": "Vase", "meaningNepali": "फुलदानी", "kanjiCharacters": ["花", "瓶"], "partOfSpeech": "Noun"},
  {"id": "v30_22", "lesson": 30, "level": "N4", "word": "鏡", "reading": "かがみ", "meaning": "Mirror", "meaningNepali": "ऐना", "kanjiCharacters": ["鏡"], "partOfSpeech": "Noun"},
  {"id": "v30_23", "lesson": 30, "level": "N4", "word": "引き出し", "reading": "ひきだし", "meaning": "Drawer", "meaningNepali": "दराजको घर", "kanjiCharacters": ["引", "出"], "partOfSpeech": "Noun"},
  {"id": "v30_24", "lesson": 30, "level": "N4", "word": "玄関", "reading": "げんかん", "meaning": "Entrance hall", "meaningNepali": "मूल ढोका", "kanjiCharacters": ["玄", "関"], "partOfSpeech": "Noun"},
  {"id": "v30_25", "lesson": 30, "level": "N4", "word": "廊下", "reading": "ろうか", "meaning": "Corridor / Hallway", "meaningNepali": "गल्ली", "kanjiCharacters": ["廊", "下"], "partOfSpeech": "Noun"},
  {"id": "v30_26", "lesson": 30, "level": "N4", "word": "壁", "reading": "かべ", "meaning": "Wall", "meaningNepali": "भित्ता", "kanjiCharacters": ["壁"], "partOfSpeech": "Noun"},
  {"id": "v30_27", "lesson": 30, "level": "N4", "word": "池", "reading": "いけ", "meaning": "Pond", "meaningNepali": "पोखरी", "kanjiCharacters": ["池"], "partOfSpeech": "Noun"},
  {"id": "v30_28", "lesson": 30, "level": "N4", "word": "元の所", "reading": "もとのところ", "meaning": "Original place", "meaningNepali": "पुराना ठाउँ", "kanjiCharacters": ["元", "所"], "partOfSpeech": "Noun"},
  {"id": "v30_29", "lesson": 30, "level": "N4", "word": "周り", "reading": "まわり", "meaning": "Around / Surroundings", "meaningNepali": "वरिपरि", "kanjiCharacters": ["周"], "partOfSpeech": "Noun"},
  {"id": "v30_30", "lesson": 30, "level": "N4", "word": "真ん中", "reading": "まんなか", "meaning": "Center / Middle", "meaningNepali": "बीच", "kanjiCharacters": ["真", "中"], "partOfSpeech": "Noun"},
  {"id": "v30_31", "lesson": 30, "level": "N4", "word": "隅", "reading": "すみ", "meaning": "Corner", "meaningNepali": "कुना", "kanjiCharacters": ["隅"], "partOfSpeech": "Noun"},
  {"id": "v30_32", "lesson": 30, "level": "N4", "word": "まだ", "reading": "まだ", "meaning": "Still / Yet", "meaningNepali": "अझै", "kanjiCharacters": [], "partOfSpeech": "Adverb"},
  {"id": "v30_33", "lesson": 30, "level": "N4", "word": "リュック", "reading": "リュック", "meaning": "Backpack", "meaningNepali": "झोला / ब्याकप्याक", "kanjiCharacters": [], "partOfSpeech": "Noun"},
  {"id": "v30_34", "lesson": 30, "level": "N4", "word": "非常袋", "reading": "ひじょうぶくろ", "meaning": "Emergency kit bag", "meaningNepali": "आपत्कालीन झोला", "kanjiCharacters": ["非", "常", "袋"], "partOfSpeech": "Noun"},

  // ════════════════════════════════════
  // LESSON 31 — Volitional Form 意向形 & Plans 〜と思っています
  // ════════════════════════════════════
  {"id": "v31_1", "lesson": 31, "level": "N4", "word": "始まります", "reading": "はじまります", "meaning": "[Ceremony] Start (Intransitive)", "meaningNepali": "सुरु हुनु", "kanjiCharacters": ["始"], "partOfSpeech": "Verb"},
  {"id": "v31_2", "lesson": 31, "level": "N4", "word": "続けます", "reading": "つづけます", "meaning": "Continue", "meaningNepali": "निरन्तरता दिनु", "kanjiCharacters": ["続"], "partOfSpeech": "Verb"},
  {"id": "v31_3", "lesson": 31, "level": "N4", "word": "見つけます", "reading": "みつけます", "meaning": "Find / Discover", "meaningNepali": "फेला पार्नु", "kanjiCharacters": ["見"], "partOfSpeech": "Verb"},
  {"id": "v31_4", "lesson": 31, "level": "N4", "word": "受けます", "reading": "うけます", "meaning": "Take [an exam]", "meaningNepali": "परीक्षा दिनु", "kanjiCharacters": ["受"], "partOfSpeech": "Verb"},
  {"id": "v31_5", "lesson": 31, "level": "N4", "word": "入学します", "reading": "にゅうがくします", "meaning": "Enter [a university]", "meaningNepali": "भर्ना हुनु", "kanjiCharacters": ["入", "学"], "partOfSpeech": "Verb"},
  {"id": "v31_6", "lesson": 31, "level": "N4", "word": "卒業します", "reading": "そつぎょうします", "meaning": "Graduate [from university]", "meaningNepali": "स्नातक पूरा गर्नु", "kanjiCharacters": ["卒", "業"], "partOfSpeech": "Verb"},
  {"id": "v31_7", "lesson": 31, "level": "N4", "word": "出席します", "reading": "しゅっせきします", "meaning": "Attend [a meeting]", "meaningNepali": "उपस्थित हुनु", "kanjiCharacters": ["出", "席"], "partOfSpeech": "Verb"},
  {"id": "v31_8", "lesson": 31, "level": "N4", "word": "休憩します", "reading": "きゅうけいします", "meaning": "Take a break", "meaningNepali": "विश्राम गर्नु", "kanjiCharacters": ["休", "憩"], "partOfSpeech": "Verb"},
  {"id": "v31_9", "lesson": 31, "level": "N4", "word": "連休", "reading": "れんきゅう", "meaning": "Consecutive holidays", "meaningNepali": "लगातार बिदा", "kanjiCharacters": ["連", "休"], "partOfSpeech": "Noun"},
  {"id": "v31_10", "lesson": 31, "level": "N4", "word": "作文", "reading": "さくぶん", "meaning": "Essay / Composition", "meaningNepali": "निबन्ध", "kanjiCharacters": ["作", "文"], "partOfSpeech": "Noun"},
  {"id": "v31_11", "lesson": 31, "level": "N4", "word": "展覧会", "reading": "てんらんかい", "meaning": "Exhibition", "meaningNepali": "प्रदर्शनी", "kanjiCharacters": ["展", "覧", "会"], "partOfSpeech": "Noun"},
  {"id": "v31_12", "lesson": 31, "level": "N4", "word": "結婚式", "reading": "けっこんしき", "meaning": "Wedding ceremony", "meaningNepali": "विवाह समारोह", "kanjiCharacters": ["結", "婚", "式"], "partOfSpeech": "Noun"},
  {"id": "v31_13", "lesson": 31, "level": "N4", "word": "葬式", "reading": "そうしき", "meaning": "Funeral", "meaningNepali": "अन्त्येष्टि समारोह", "kanjiCharacters": ["葬", "式"], "partOfSpeech": "Noun"},
  {"id": "v31_14", "lesson": 31, "level": "N4", "word": "本社", "reading": "ほんしゃ", "meaning": "Head office", "meaningNepali": "प्रधान कार्यालय", "kanjiCharacters": ["本", "社"], "partOfSpeech": "Noun"},
  {"id": "v31_15", "lesson": 31, "level": "N4", "word": "支店", "reading": "してん", "meaning": "Branch office", "meaningNepali": "शाखा कार्यालय", "kanjiCharacters": ["支", "店"], "partOfSpeech": "Noun"},
  {"id": "v31_16", "lesson": 31, "level": "N4", "word": "教会", "reading": "きょうかい", "meaning": "Church", "meaningNepali": "गिरजाघर", "kanjiCharacters": ["教", "会"], "partOfSpeech": "Noun"},
  {"id": "v31_17", "lesson": 31, "level": "N4", "word": "大学院", "reading": "だいがくいん", "meaning": "Graduate school", "meaningNepali": "स्नातकोत्तर तह", "kanjiCharacters": ["大", "学", "院"], "partOfSpeech": "Noun"},
  {"id": "v31_18", "lesson": 31, "level": "N4", "word": "温泉", "reading": "おんせん", "meaning": "Hot spring", "meaningNepali": "तातोपानीको कुण्ड", "kanjiCharacters": ["温", "泉"], "partOfSpeech": "Noun"},
  {"id": "v31_19", "lesson": 31, "level": "N4", "word": "帰り", "reading": "かえり", "meaning": "Return / Way back", "meaningNepali": "फर्किने बाटो", "kanjiCharacters": ["帰"], "partOfSpeech": "Noun"},
  {"id": "v31_20", "lesson": 31, "level": "N4", "word": "お子さん", "reading": "おこさん", "meaning": "(Someone else's) Child", "meaningNepali": "(अरूको) बच्चा", "kanjiCharacters": ["子"], "partOfSpeech": "Noun"},
  {"id": "v31_21", "lesson": 31, "level": "N4", "word": "ずっと", "reading": "ずっと", "meaning": "All the time / By far", "meaningNepali": "सधैँभरि", "kanjiCharacters": [], "partOfSpeech": "Adverb"},
  {"id": "v31_22", "lesson": 31, "level": "N4", "word": "残ります", "reading": "のこります", "meaning": "Remain / Stay behind", "meaningNepali": "बाँकी रहनु", "kanjiCharacters": ["残"], "partOfSpeech": "Verb"},

  // ════════════════════════════════════
  // LESSON 32 — Advice 〜ほうがいい & Conjecture 〜でしょう / 〜かもしれない
  // ════════════════════════════════════
  {"id": "v32_1", "lesson": 32, "level": "N4", "word": "運動します", "reading": "うんどうします", "meaning": "Take exercise", "meaningNepali": "व्यायाम गर्नु", "kanjiCharacters": ["運", "動"], "partOfSpeech": "Verb"},
  {"id": "v32_2", "lesson": 32, "level": "N4", "word": "成功します", "reading": "せいこうします", "meaning": "Succeed", "meaningNepali": "सफल हुनु", "kanjiCharacters": ["成", "功"], "partOfSpeech": "Verb"},
  {"id": "v32_3", "level": "N4", "word": "失敗します", "reading": "しっぱいします", "meaning": "Fail [an exam]", "meaningNepali": "असफल हुनु", "kanjiCharacters": ["失", "敗"], "partOfSpeech": "Verb"},
  {"id": "v32_4", "lesson": 32, "level": "N4", "word": "合格します", "reading": "ごうかくします", "meaning": "Pass [an exam]", "meaningNepali": "उत्तीर्ण हुनु", "kanjiCharacters": ["合", "格"], "partOfSpeech": "Verb"},
  {"id": "v32_5", "lesson": 32, "level": "N4", "word": "やみます", "reading": "やみます", "meaning": "[Rain] Stop", "meaningNepali": "[पानी] रोकिनु", "kanjiCharacters": [], "partOfSpeech": "Verb"},
  {"id": "v32_6", "lesson": 32, "level": "N4", "word": "晴れます", "reading": "はれます", "meaning": "Clear up (Weather)", "meaningNepali": "आकाश खुल्नु", "kanjiCharacters": ["晴"], "partOfSpeech": "Verb"},
  {"id": "v32_7", "lesson": 32, "level": "N4", "word": "曇ります", "reading": "くもります", "meaning": "Get cloudy", "meaningNepali": "बादल लाग्नु", "kanjiCharacters": ["曇"], "partOfSpeech": "Verb"},
  {"id": "v32_8", "lesson": 32, "level": "N4", "word": "吹きます", "reading": "ふきます", "meaning": "[Wind] Blow", "meaningNepali": "[हावा] चल्नु", "kanjiCharacters": ["吹"], "partOfSpeech": "Verb"},
  {"id": "v32_9", "lesson": 32, "level": "N4", "word": "病気", "reading": "びょうき", "meaning": "Illness / Sickness", "meaningNepali": "बिरामी", "kanjiCharacters": ["病", "気"], "partOfSpeech": "Noun"},
  {"id": "v32_10", "lesson": 32, "level": "N4", "word": "熱", "reading": "ねつ", "meaning": "Fever / Temperature", "meaningNepali": "ज्वरो", "kanjiCharacters": ["熱"], "partOfSpeech": "Noun"},
  {"id": "v32_11", "lesson": 32, "level": "N4", "word": "火傷", "reading": "やけど", "meaning": "Burn", "meaningNepali": "पोलेको घाउ", "kanjiCharacters": ["火", "傷"], "partOfSpeech": "Noun"},
  {"id": "v32_12", "lesson": 32, "level": "N4", "word": "けが", "reading": "けが", "meaning": "Injury", "meaningNepali": "चोटपटक", "kanjiCharacters": [], "partOfSpeech": "Noun"},
  {"id": "v32_13", "lesson": 32, "level": "N4", "word": "咳", "reading": "せき", "meaning": "Cough", "meaningNepali": "खोकी", "kanjiCharacters": ["咳"], "partOfSpeech": "Noun"},
  {"id": "v32_14", "lesson": 32, "level": "N4", "word": "インフルエンザ", "reading": "インフルエンザ", "meaning": "Influenza / Flu", "meaningNepali": "इन्फ्लुएन्जा", "kanjiCharacters": [], "partOfSpeech": "Noun"},
  {"id": "v32_15", "lesson": 32, "level": "N4", "word": "太陽", "reading": "たいよう", "meaning": "Sun", "meaningNepali": "सूर्य", "kanjiCharacters": ["太", "陽"], "partOfSpeech": "Noun"},
  {"id": "v32_16", "lesson": 32, "level": "N4", "word": "星", "reading": "ほし", "meaning": "Star", "meaningNepali": "तारा", "kanjiCharacters": ["星"], "partOfSpeech": "Noun"},
  {"id": "v32_17", "lesson": 32, "level": "N4", "word": "月", "reading": "つき", "meaning": "Moon", "meaningNepali": "चन्द्रमा", "kanjiCharacters": ["月"], "partOfSpeech": "Noun"},
  {"id": "v32_18", "lesson": 32, "level": "N4", "word": "風", "reading": "かぜ", "meaning": "Wind", "meaningNepali": "हावा", "kanjiCharacters": ["風"], "partOfSpeech": "Noun"},
  {"id": "v32_19", "lesson": 32, "level": "N4", "word": "北", "reading": "きた", "meaning": "North", "meaningNepali": "उत्तर", "kanjiCharacters": ["北"], "partOfSpeech": "Noun"},
  {"id": "v32_20", "lesson": 32, "level": "N4", "word": "南", "reading": "みなみ", "meaning": "South", "meaningNepali": "दक्षिण", "kanjiCharacters": ["南"], "partOfSpeech": "Noun"},
  {"id": "v32_21", "lesson": 32, "level": "N4", "word": "東", "reading": "ひがし", "meaning": "East", "meaningNepali": "पूर्व", "kanjiCharacters": ["東"], "partOfSpeech": "Noun"},
  {"id": "v32_22", "lesson": 32, "level": "N4", "word": "西", "reading": "にし", "meaning": "West", "meaningNepali": "पश्चिम", "kanjiCharacters": ["西"], "partOfSpeech": "Noun"},

  // ════════════════════════════════════
  // LESSON 33 — Imperative / Prohibitive 命令形・禁止形 & Quoting 〜と言っていました
  // ════════════════════════════════════
  {"id": "v33_1", "lesson": 33, "level": "N4", "word": "逃げます", "reading": "にげます", "meaning": "Run away / Escape", "meaningNepali": "भाग्नु", "kanjiCharacters": ["逃"], "partOfSpeech": "Verb"},
  {"id": "v33_2", "lesson": 33, "level": "N4", "word": "騒ぎます", "reading": "さわぎます", "meaning": "Make a noise", "meaningNepali": "हल्ला गर्नु", "kanjiCharacters": ["騒"], "partOfSpeech": "Verb"},
  {"id": "v33_3", "lesson": 33, "level": "N4", "word": "あきらめます", "reading": "あきらめます", "meaning": "Give up", "meaningNepali": "हार मान्नु", "kanjiCharacters": [], "partOfSpeech": "Verb"},
  {"id": "v33_4", "lesson": 33, "level": "N4", "word": "投げます", "reading": "なげます", "meaning": "Throw", "meaningNepali": "फ्याँक्नु", "kanjiCharacters": ["投"], "partOfSpeech": "Verb"},
  {"id": "v33_5", "lesson": 33, "level": "N4", "word": "守ります", "reading": "まもります", "meaning": "Keep / Protect / Obey", "meaningNepali": "पालना गर्नु / रक्षा गर्नु", "kanjiCharacters": ["守"], "partOfSpeech": "Verb"},
  {"id": "v33_6", "lesson": 33, "level": "N4", "word": "上げます", "reading": "あげます", "meaning": "Raise / Lift", "meaningNepali": "उठाउनु", "kanjiCharacters": ["上"], "partOfSpeech": "Verb"},
  {"id": "v33_7", "lesson": 33, "level": "N4", "word": "下げます", "reading": "さげます", "meaning": "Lower", "meaningNepali": "घटाउनु", "kanjiCharacters": ["下"], "partOfSpeech": "Verb"},
  {"id": "v33_8", "lesson": 33, "level": "N4", "word": "伝えます", "reading": "つたえます", "meaning": "Convey / Pass on message", "meaningNepali": "सन्देश पुर्‍याउनु", "kanjiCharacters": ["伝"], "partOfSpeech": "Verb"},
  {"id": "v33_9", "lesson": 33, "level": "N4", "word": "注意します", "reading": "ちゅういします", "meaning": "Be careful / Pay attention", "meaningNepali": "सावधान हुनु", "kanjiCharacters": ["注", "意"], "partOfSpeech": "Verb"},
  {"id": "v33_10", "lesson": 33, "level": "N4", "word": "規則", "reading": "きそく", "meaning": "Rule / Regulation", "meaningNepali": "नियम", "kanjiCharacters": ["規", "則"], "partOfSpeech": "Noun"},
  {"id": "v33_11", "lesson": 33, "level": "N4", "word": "危険", "reading": "きけん", "meaning": "Danger / Hazardous", "meaningNepali": "खतरा", "kanjiCharacters": ["危", "険"], "partOfSpeech": "Adj"},
  {"id": "v33_12", "lesson": 33, "level": "N4", "word": "使用禁止", "reading": "しようきんし", "meaning": "Do not use / Out of service", "meaningNepali": "प्रयोग निषेध", "kanjiCharacters": ["使", "用", "禁", "止"], "partOfSpeech": "Noun"},
  {"id": "v33_13", "lesson": 33, "level": "N4", "word": "立入禁止", "reading": "たちいりきんし", "meaning": "No entry / Keep out", "meaningNepali": "प्रवेश निषेध", "kanjiCharacters": ["立", "入", "禁", "止"], "partOfSpeech": "Noun"},
  {"id": "v33_14", "lesson": 33, "level": "N4", "word": "非常口", "reading": "ひじょうぐち", "meaning": "Emergency exit", "meaningNepali": "आपत्कालीन ढोका", "kanjiCharacters": ["非", "常", "口"], "partOfSpeech": "Noun"},
  {"id": "v33_15", "lesson": 33, "level": "N4", "word": "無料", "reading": "むりょう", "meaning": "Free of charge", "meaningNepali": "नि:शुल्क", "kanjiCharacters": ["無", "料"], "partOfSpeech": "Noun"},
  {"id": "v33_16", "lesson": 33, "level": "N4", "word": "割引", "reading": "わりびき", "meaning": "Discount", "meaningNepali": "छुट", "kanjiCharacters": ["割", "引"], "partOfSpeech": "Noun"},
  {"id": "v33_17", "lesson": 33, "level": "N4", "word": "飲み放題", "reading": "のみほうだい", "meaning": "All-you-can-drink", "meaningNepali": "असीमित पेय", "kanjiCharacters": ["飲", "放", "題"], "partOfSpeech": "Noun"},
  {"id": "v33_18", "lesson": 33, "level": "N4", "word": "使用中", "reading": "しようちゅう", "meaning": "In use / Occupied", "meaningNepali": "प्रयोग भइरहेको", "kanjiCharacters": ["使", "用", "中"], "partOfSpeech": "Noun"},
  {"id": "v33_19", "lesson": 33, "level": "N4", "word": "募集中", "reading": "ぼしゅうちゅう", "meaning": "Applications wanted / Hiring", "meaningNepali": "भर्ना भइरहेको", "kanjiCharacters": ["募", "集", "中"], "partOfSpeech": "Noun"},

  // ════════════════════════════════════
  // LESSON 34 — Doing as instructed 〜とおりに & After 〜あとで
  // ════════════════════════════════════
  {"id": "v34_1", "lesson": 34, "level": "N4", "word": "磨きます", "reading": "みがきます", "meaning": "Brush [teeth] / Polish", "meaningNepali": "माझ्नु / माझ्नु", "kanjiCharacters": ["磨"], "partOfSpeech": "Verb"},
  {"id": "v34_2", "lesson": 34, "level": "N4", "word": "組み立てます", "reading": "くみたてます", "meaning": "Assemble", "meaningNepali": "जोड्नु", "kanjiCharacters": ["組", "立"], "partOfSpeech": "Verb"},
  {"id": "v34_3", "lesson": 34, "level": "N4", "word": "折ります", "reading": "おります", "meaning": "Fold / Break", "meaningNepali": "मोड्नु / भाच्नु", "kanjiCharacters": ["折"], "partOfSpeech": "Verb"},
  {"id": "v34_4", "lesson": 34, "level": "N4", "word": "気がつきます", "reading": "きがつきます", "meaning": "Notice / Become aware", "meaningNepali": "ख्याल गर्नु", "kanjiCharacters": ["気", "付"], "partOfSpeech": "Verb"},
  {"id": "v34_5", "lesson": 34, "level": "N4", "word": "つけます", "reading": "つけます", "meaning": "Put in [soy sauce]", "meaningNepali": "हाल्नु", "kanjiCharacters": [], "partOfSpeech": "Verb"},
  {"id": "v34_6", "lesson": 34, "level": "N4", "word": "見つかります", "reading": "みつかります", "meaning": "Be found", "meaningNepali": "फेला पर्नु", "kanjiCharacters": ["見"], "partOfSpeech": "Verb"},
  {"id": "v34_7", "lesson": 34, "level": "N4", "word": "矢印", "reading": "やじるし", "meaning": "Arrow (sign)", "meaningNepali": "तीरको चिह्न", "kanjiCharacters": ["矢", "印"], "partOfSpeech": "Noun"},
  {"id": "v34_8", "lesson": 34, "level": "N4", "word": "醤油", "reading": "しょうゆ", "meaning": "Soy sauce", "meaningNepali": "सोया सस", "kanjiCharacters": ["醬", "油"], "partOfSpeech": "Noun"},
  {"id": "v34_9", "lesson": 34, "level": "N4", "word": "ソース", "reading": "ソース", "meaning": "Sauce", "meaningNepali": "सस", "kanjiCharacters": [], "partOfSpeech": "Noun"},
  {"id": "v34_10", "lesson": 34, "level": "N4", "word": "紺", "reading": "こん", "meaning": "Navy blue", "meaningNepali": "गाढा नीलो", "kanjiCharacters": ["紺"], "partOfSpeech": "Noun"},
  {"id": "v34_11", "lesson": 34, "level": "N4", "word": "黄色", "reading": "きいろ", "meaning": "Yellow", "meaningNepali": "पहेंलो", "kanjiCharacters": ["黄", "色"], "partOfSpeech": "Noun"},
  {"id": "v34_12", "lesson": 34, "level": "N4", "word": "苦い", "reading": "にがい", "meaning": "Bitter", "meaningNepali": "तीतो", "kanjiCharacters": ["苦"], "partOfSpeech": "Adj"},
  {"id": "v34_13", "lesson": 34, "level": "N4", "word": "濃い", "reading": "こい", "meaning": "Strong (taste) / Dark", "meaningNepali": "गाढा", "kanjiCharacters": ["濃"], "partOfSpeech": "Adj"},
  {"id": "v34_14", "lesson": 34, "level": "N4", "word": "薄い", "reading": "うすい", "meaning": "Weak (taste) / Light", "meaningNepali": "पातलो / फिक्का", "kanjiCharacters": ["薄"], "partOfSpeech": "Adj"},
  {"id": "v34_15", "lesson": 34, "level": "N4", "word": "理由", "reading": "りゆう", "meaning": "Reason", "meaningNepali": "कारण", "kanjiCharacters": ["理", "由"], "partOfSpeech": "Noun"},

  // ════════════════════════════════════
  // LESSON 35 — Conditional Form 〜ば & Topic 〜なら
  // ════════════════════════════════════
  {"id": "v35_1", "lesson": 35, "level": "N4", "word": "咲きます", "reading": "さきます", "meaning": "[Flowers] Bloom", "meaningNepali": "[फूल] फुल्नु", "kanjiCharacters": ["咲"], "partOfSpeech": "Verb"},
  {"id": "v35_2", "lesson": 35, "level": "N4", "word": "変わります", "reading": "かわります", "meaning": "[Color] Change", "meaningNepali": "परिवर्तन हुनु", "kanjiCharacters": ["変"], "partOfSpeech": "Verb"},
  {"id": "v35_3", "lesson": 35, "level": "N4", "word": "困ります", "reading": "こまります", "meaning": "Be in trouble / Have a problem", "meaningNepali": "समस्यामा पर्नु", "kanjiCharacters": ["困"], "partOfSpeech": "Verb"},
  {"id": "v35_4", "lesson": 35, "level": "N4", "word": "付けます", "reading": "つけます", "meaning": "Draw [a circle] / Mark", "meaningNepali": "चिह्न लगाउनु", "kanjiCharacters": ["付"], "partOfSpeech": "Verb"},
  {"id": "v35_5", "lesson": 35, "level": "N4", "word": "楽な", "reading": "らくな", "meaning": "Easy / Comfortable", "meaningNepali": "आरामदायी", "kanjiCharacters": ["楽"], "partOfSpeech": "Adj"},
  {"id": "v35_6", "lesson": 35, "level": "N4", "word": "正しい", "reading": "ただしい", "meaning": "Correct / Right", "meaningNepali": "सही", "kanjiCharacters": ["正"], "partOfSpeech": "Adj"},
  {"id": "v35_7", "lesson": 35, "level": "N4", "word": "珍しい", "reading": "めずらしい", "meaning": "Rare / Uncommon", "meaningNepali": "नौलो / दुर्लभ", "kanjiCharacters": ["珍"], "partOfSpeech": "Adj"},
  {"id": "v35_8", "lesson": 35, "level": "N4", "word": "方", "reading": "かた", "meaning": "Person (Polite)", "meaningNepali": "व्यक्ति (शिष्ट)", "kanjiCharacters": ["方"], "partOfSpeech": "Noun"},
  {"id": "v35_9", "lesson": 35, "level": "N4", "word": "向こう", "reading": "むこう", "meaning": "Over there / Opposite side", "meaningNepali": "उता / उतातिर", "kanjiCharacters": ["向"], "partOfSpeech": "Noun"},
  {"id": "v35_10", "lesson": 35, "level": "N4", "word": "島", "reading": "しま", "meaning": "Island", "meaningNepali": "टापु", "kanjiCharacters": ["島"], "partOfSpeech": "Noun"},
  {"id": "v35_11", "lesson": 35, "level": "N4", "word": "港", "reading": "みなと", "meaning": "Port / Harbor", "meaningNepali": "बन्दरगाह", "kanjiCharacters": ["港"], "partOfSpeech": "Noun"},
  {"id": "v35_12", "lesson": 35, "level": "N4", "word": "近所", "reading": "きんじょ", "meaning": "Neighborhood", "meaningNepali": "छिमेक", "kanjiCharacters": ["近", "所"], "partOfSpeech": "Noun"},
  {"id": "v35_13", "lesson": 35, "level": "N4", "word": "屋上", "reading": "おくじょう", "meaning": "Rooftop", "meaningNepali": "छात", "kanjiCharacters": ["屋", "上"], "partOfSpeech": "Noun"},
  {"id": "v35_14", "lesson": 35, "level": "N4", "word": "海外", "reading": "かいがい", "meaning": "Overseas", "meaningNepali": "समुन्द्रपार / विदेश", "kanjiCharacters": ["海", "外"], "partOfSpeech": "Noun"},
  {"id": "v35_15", "lesson": 35, "level": "N4", "word": "山登り", "reading": "やまのぼり", "meaning": "Mountain climbing", "meaningNepali": "पर्वतारोहण", "kanjiCharacters": ["山", "登"], "partOfSpeech": "Noun"},
  {"id": "v35_16", "lesson": 35, "level": "N4", "word": "ハイキング", "reading": "ハイキング", "meaning": "Hiking", "meaningNepali": "हाईकिङ", "kanjiCharacters": [], "partOfSpeech": "Noun"},
  {"id": "v35_17", "lesson": 35, "level": "N4", "word": "機会", "reading": "きかい", "meaning": "Opportunity / Chance", "meaningNepali": "अवसर", "kanjiCharacters": ["機", "会"], "partOfSpeech": "Noun"},
  {"id": "v35_18", "lesson": 35, "level": "N4", "word": "許可", "reading": "きょか", "meaning": "Permission", "meaningNepali": "अनुमति", "kanjiCharacters": ["許", "可"], "partOfSpeech": "Noun"},

    // ════════════════════════════════════
  // LESSONS 36 TO 50 — FULL CONVERTED TEXTBOOK VOCABULARY SEEDS & MEANINGS
  // ════════════════════════════════════
  {"id": "v36_1", "lesson": 36, "level": "N4", "word": "合います", "reading": "あいます", "meaning": "[Size] Fit / Match", "meaningNepali": "मिल्नु", "kanjiCharacters": ["合"], "partOfSpeech": "Verb"},
  {"id": "v36_2", "lesson": 36, "level": "N4", "word": "慣れます", "reading": "なれます", "meaning": "Get accustomed to", "meaningNepali": "बानी पर्नु", "kanjiCharacters": ["慣"], "partOfSpeech": "Verb"},
  {"id": "v36_3", "lesson": 36, "level": "N4", "word": "通います", "reading": "かよいます", "meaning": "Commute", "meaningNepali": "आउजाउ गर्नु", "kanjiCharacters": ["通"], "partOfSpeech": "Verb"},
  {"id": "v36_4", "lesson": 36, "level": "N4", "word": "健康", "reading": "けんこう", "meaning": "Health", "meaningNepali": "स्वास्थ्य", "kanjiCharacters": ["健", "康"], "partOfSpeech": "Noun"},
  {"id": "v36_5", "lesson": 36, "level": "N4", "word": "指輪", "reading": "ゆびわ", "meaning": "Ring", "meaningNepali": "औंठी", "kanjiCharacters": ["指", "輪"], "partOfSpeech": "Noun"},
  {"id": "v36_6", "lesson": 36, "level": "N4", "word": "宇宙", "reading": "うちゅう", "meaning": "Space / Universe", "meaningNepali": "अन्तरिक्ष", "kanjiCharacters": ["宇", "宙"], "partOfSpeech": "Noun"},
  {"id": "v36_7", "lesson": 36, "level": "N4", "word": "ラジオ体操", "reading": "ラジオたいそう", "meaning": "Radio calisthenics", "meaningNepali": "रेडियो व्यायाम", "kanjiCharacters": ["体", "操"], "partOfSpeech": "Noun"},
  {"id": "v36_8", "lesson": 36, "level": "N4", "word": "成功", "reading": "せいこう", "meaning": "Success", "meaningNepali": "सफलता", "kanjiCharacters": ["成", "功"], "partOfSpeech": "Noun"},
  {"id": "v37_1", "lesson": 37, "level": "N4", "word": "褒めます", "reading": "ほめます", "meaning": "Praise", "meaningNepali": "प्रशंसा गर्नु", "kanjiCharacters": ["褒"], "partOfSpeech": "Verb"},
  {"id": "v37_2", "lesson": 37, "level": "N4", "word": "叱ります", "reading": "しかります", "meaning": "Scold", "meaningNepali": "गाली गर्नु", "kanjiCharacters": ["叱"], "partOfSpeech": "Verb"},
  {"id": "v37_3", "lesson": 37, "level": "N4", "word": "誘います", "reading": "さそいます", "meaning": "Invite / Ask along", "meaningNepali": "निमन्त्रणा गर्नु", "kanjiCharacters": ["誘"], "partOfSpeech": "Verb"},
  {"id": "v37_4", "lesson": 37, "level": "N4", "word": "起こします", "reading": "おこします", "meaning": "Wake someone up", "meaningNepali": "उठाउनु", "kanjiCharacters": ["起"], "partOfSpeech": "Verb"},
  {"id": "v37_5", "lesson": 37, "level": "N4", "word": "頼みます", "reading": "たのみます", "meaning": "Ask / Request", "meaningNepali": "अनुरोध गर्नु", "kanjiCharacters": ["頼"], "partOfSpeech": "Verb"},
  {"id": "v37_6", "lesson": 37, "level": "N4", "word": "踏みます", "reading": "ふみます", "meaning": "Step on", "meaningNepali": "कुल्चिनु", "kanjiCharacters": ["踏"], "partOfSpeech": "Verb"},
  {"id": "v37_7", "lesson": 37, "level": "N4", "word": "壊します", "reading": "こわします", "meaning": "Break / Destroy", "meaningNepali": "भत्काउनु", "kanjiCharacters": ["壊"], "partOfSpeech": "Verb"},
  {"id": "v37_8", "lesson": 37, "level": "N4", "word": "汚します", "reading": "よごします", "meaning": "Make dirty", "meaningNepali": "फोहर पार्नु", "kanjiCharacters": ["汚"], "partOfSpeech": "Verb"},
  {"id": "v37_9", "lesson": 37, "level": "N4", "word": "行います", "reading": "おこないます", "meaning": "Hold / Carry out", "meaningNepali": "सञ्चालन गर्नु", "kanjiCharacters": ["行"], "partOfSpeech": "Verb"},
  {"id": "v37_10", "lesson": 37, "level": "N4", "word": "輸出します", "reading": "ゆしゅつします", "meaning": "Export", "meaningNepali": "निर्यात गर्नु", "kanjiCharacters": ["輸", "出"], "partOfSpeech": "Verb"},
  {"id": "v37_11", "lesson": 37, "level": "N4", "word": "輸入します", "reading": "ゆにゅうします", "meaning": "Import", "meaningNepali": "आयात गर्नु", "kanjiCharacters": ["輸", "入"], "partOfSpeech": "Verb"},
  {"id": "v37_12", "lesson": 37, "level": "N4", "word": "翻訳します", "reading": "ほんやくします", "meaning": "Translate", "meaningNepali": "अनुवाद गर्नु", "kanjiCharacters": ["翻", "訳"], "partOfSpeech": "Verb"},
  {"id": "v37_13", "lesson": 37, "level": "N4", "word": "発明します", "reading": "はつめいします", "meaning": "Invent", "meaningNepali": "अविष्कार गर्नु", "kanjiCharacters": ["発", "明"], "partOfSpeech": "Verb"},
  {"id": "v37_14", "lesson": 37, "level": "N4", "word": "発見します", "reading": "はっけんします", "meaning": "Discover", "meaningNepali": "पत्ता लगाउनु", "kanjiCharacters": ["発", "見"], "partOfSpeech": "Verb"},
  {"id": "v38_1", "lesson": 38, "level": "N4", "word": "参加します", "reading": "さんかします", "meaning": "Participate / Attend", "meaningNepali": "भाग लिनु", "kanjiCharacters": ["参", "加"], "partOfSpeech": "Verb"},
  {"id": "v38_2", "lesson": 38, "level": "N4", "word": "育てます", "reading": "そだてます", "meaning": "Breed / Bring up", "meaningNepali": "हुर्काउनु", "kanjiCharacters": ["育"], "partOfSpeech": "Verb"},
  {"id": "v38_3", "lesson": 38, "level": "N4", "word": "運びます", "reading": "はこびます", "meaning": "Carry / Transport", "meaningNepali": "ओसारपसार गर्नु", "kanjiCharacters": ["運"], "partOfSpeech": "Verb"},
  {"id": "v38_4", "lesson": 38, "level": "N4", "word": "入院します", "reading": "にゅういんします", "meaning": "Enter hospital", "meaningNepali": "अस्पताल भर्ना हुनु", "kanjiCharacters": ["入", "院"], "partOfSpeech": "Verb"},
  {"id": "v38_5", "lesson": 38, "level": "N4", "word": "退院します", "reading": "たいいんします", "meaning": "Leave hospital", "meaningNepali": "अस्पतालबाट डिस्चार्ज हुनु", "kanjiCharacters": ["退", "院"], "partOfSpeech": "Verb"},
  {"id": "v38_6", "lesson": 38, "level": "N4", "word": "電源を入れます", "reading": "でんげんをいれます", "meaning": "Turn on power", "meaningNepali": "पावर अन गर्नु", "kanjiCharacters": ["電", "源", "入"], "partOfSpeech": "Verb"},
  {"id": "v38_7", "lesson": 38, "level": "N4", "word": "電源を切ります", "reading": "でんげんをきります", "meaning": "Turn off power", "meaningNepali": "पावर अफ गर्नु", "kanjiCharacters": ["電", "源", "切"], "partOfSpeech": "Verb"},
  {"id": "v38_8", "lesson": 38, "level": "N4", "word": "鍵をかけます", "reading": "かぎをかけます", "meaning": "Lock", "meaningNepali": "ताल्चा लगाउनु", "kanjiCharacters": ["鍵"], "partOfSpeech": "Verb"},
  {"id": "v39_1", "lesson": 39, "level": "N4", "word": "驚きます", "reading": "おどろきます", "meaning": "Be surprised", "meaningNepali": "छक्क पर्नु", "kanjiCharacters": ["驚"], "partOfSpeech": "Verb"},
  {"id": "v39_2", "lesson": 39, "level": "N4", "word": "安心します", "reading": "あんしんします", "meaning": "Feel relieved", "meaningNepali": "ढुक्क हुनु", "kanjiCharacters": ["安", "心"], "partOfSpeech": "Verb"},
  {"id": "v39_3", "lesson": 39, "level": "N4", "word": "離婚します", "reading": "りこんします", "meaning": "Divorce", "meaningNepali": "पारपाचुके गर्नु", "kanjiCharacters": ["離", "婚"], "partOfSpeech": "Verb"},
  {"id": "v39_4", "lesson": 39, "level": "N4", "word": "太ります", "reading": "ふとります", "meaning": "Get fat", "meaningNepali": "मोटाउनु", "kanjiCharacters": ["太"], "partOfSpeech": "Verb"},
  {"id": "v39_5", "lesson": 39, "level": "N4", "word": "痩せます", "reading": "やせます", "meaning": "Get thin / Lose weight", "meaningNepali": "दुब्लाउनु", "kanjiCharacters": ["痩"], "partOfSpeech": "Verb"},
  {"id": "v39_6", "lesson": 39, "level": "N4", "word": "地震", "reading": "じしん", "meaning": "Earthquake", "meaningNepali": "भूकम्प", "kanjiCharacters": ["地", "震"], "partOfSpeech": "Noun"},
  {"id": "v39_7", "lesson": 39, "level": "N4", "word": "台風", "reading": "たいふう", "meaning": "Typhoon", "meaningNepali": "आँधीबेहरी", "kanjiCharacters": ["台", "風"], "partOfSpeech": "Noun"},
  {"id": "v39_8", "lesson": 39, "level": "N4", "word": "火事", "reading": "かじ", "meaning": "Fire disaster", "meaningNepali": "आगलागी", "kanjiCharacters": ["火", "事"], "partOfSpeech": "Noun"},
  {"id": "v39_9", "lesson": 39, "level": "N4", "word": "事故", "reading": "じこ", "meaning": "Accident", "meaningNepali": "दुर्घटना", "kanjiCharacters": ["事", "故"], "partOfSpeech": "Noun"},
  {"id": "v40_1", "lesson": 40, "level": "N4", "word": "数えます", "reading": "かぞえます", "meaning": "Count", "meaningNepali": "गन्ती गर्नु", "kanjiCharacters": ["数"], "partOfSpeech": "Verb"},
  {"id": "v40_2", "lesson": 40, "level": "N4", "word": "測ります", "reading": "はかります", "meaning": "Measure / Weigh", "meaningNepali": "नाप्नु", "kanjiCharacters": ["測"], "partOfSpeech": "Verb"},
  {"id": "v40_3", "lesson": 40, "level": "N4", "word": "確かめます", "reading": "たしかめます", "meaning": "Confirm / Make sure", "meaningNepali": "यकिन गर्नु", "kanjiCharacters": ["確"], "partOfSpeech": "Verb"},
  {"id": "v40_4", "lesson": 40, "level": "N4", "word": "出発します", "reading": "しゅっぱつします", "meaning": "Depart", "meaningNepali": "प्रस्थान गर्नु", "kanjiCharacters": ["出", "発"], "partOfSpeech": "Verb"},
  {"id": "v40_5", "lesson": 40, "level": "N4", "word": "到着します", "reading": "とうちゃくします", "meaning": "Arrive", "meaningNepali": "आइपुग्नु", "kanjiCharacters": ["到", "着"], "partOfSpeech": "Verb"},
  {"id": "v40_6", "lesson": 40, "level": "N4", "word": "酔います", "reading": "よいます", "meaning": "Get drunk", "meaningNepali": "मात्तिनु", "kanjiCharacters": ["酔"], "partOfSpeech": "Verb"},
  {"id": "v41_1", "lesson": 41, "level": "N4", "word": "いただきます", "reading": "いただきます", "meaning": "Receive (Humble)", "meaningNepali": "प्राप्त गर्नु (नम्र)", "kanjiCharacters": [], "partOfSpeech": "Verb"},
  {"id": "v41_2", "lesson": 41, "level": "N4", "word": "くださいます", "reading": "くださいます", "meaning": "Give me (Honorific)", "meaningNepali": "दिइबक्सनु", "kanjiCharacters": [], "partOfSpeech": "Verb"},
  {"id": "v41_3", "lesson": 41, "level": "N4", "word": "やります", "reading": "やります", "meaning": "Give (to younger / pets)", "meaningNepali": "दिनु", "kanjiCharacters": [], "partOfSpeech": "Verb"},
  {"id": "v41_4", "lesson": 41, "level": "N4", "word": "お祝い", "reading": "おいわい", "meaning": "Celebration / Gift", "meaningNepali": "बधाई / उपहार", "kanjiCharacters": ["祝"], "partOfSpeech": "Noun"},
  {"id": "v41_5", "lesson": 41, "level": "N4", "word": "お年玉", "reading": "おとしだま", "meaning": "New Year's gift money", "meaningNepali": "नयाँ वर्षको दक्षिणा", "kanjiCharacters": ["年", "玉"], "partOfSpeech": "Noun"},
  {"id": "v41_6", "lesson": 41, "level": "N4", "word": "お見舞い", "reading": "おみまい", "meaning": "Sympathy visit / Gift", "meaningNepali": "बिरामी भेटघाट", "kanjiCharacters": ["見", "舞"], "partOfSpeech": "Noun"},
  {"id": "v42_1", "lesson": 42, "level": "N4", "word": "包みます", "reading": "つつみます", "meaning": "Wrap up", "meaningNepali": "बाँध्नु / पोको पार्नु", "kanjiCharacters": ["包"], "partOfSpeech": "Verb"},
  {"id": "v42_2", "lesson": 42, "level": "N4", "word": "沸かします", "reading": "わかします", "meaning": "Boil water", "meaningNepali": "पानी उमाल्नु", "kanjiCharacters": ["沸"], "partOfSpeech": "Verb"},
  {"id": "v42_3", "lesson": 42, "level": "N4", "word": "混ぜます", "reading": "まぜます", "meaning": "Mix", "meaningNepali": "मिसाउनु", "kanjiCharacters": ["混"], "partOfSpeech": "Verb"},
  {"id": "v42_4", "lesson": 42, "level": "N4", "word": "計算します", "reading": "けいさんします", "meaning": "Calculate", "meaningNepali": "हिसाब गर्नु", "kanjiCharacters": ["計", "算"], "partOfSpeech": "Verb"},
  {"id": "v42_5", "lesson": 42, "level": "N4", "word": "弁護士", "reading": "べんごし", "meaning": "Lawyer / Attorney", "meaningNepali": "वकील", "kanjiCharacters": ["弁", "護", "士"], "partOfSpeech": "Noun"},
  {"id": "v42_6", "lesson": 42, "level": "N4", "word": "自然", "reading": "しぜん", "meaning": "Nature", "meaningNepali": "प्रकृति", "kanjiCharacters": ["自", "然"], "partOfSpeech": "Noun"},
  {"id": "v42_7", "lesson": 42, "level": "N4", "word": "教育", "reading": "きょういく", "meaning": "Education", "meaningNepali": "शिक्षा", "kanjiCharacters": ["教", "育"], "partOfSpeech": "Noun"},
  {"id": "v43_1", "lesson": 43, "level": "N4", "word": "増えます", "reading": "ふえます", "meaning": "[Exports] Increase", "meaningNepali": "बढ्नु", "kanjiCharacters": ["増"], "partOfSpeech": "Verb"},
  {"id": "v43_2", "lesson": 43, "level": "N4", "word": "減ります", "reading": "へります", "meaning": "[Exports] Decrease", "meaningNepali": "घट्नु", "kanjiCharacters": ["減"], "partOfSpeech": "Verb"},
  {"id": "v43_3", "lesson": 43, "level": "N4", "word": "上がります", "reading": "あがります", "meaning": "[Price] Rise", "meaningNepali": "बढ्नु (मूल्य)", "kanjiCharacters": ["上"], "partOfSpeech": "Verb"},
  {"id": "v43_4", "lesson": 43, "level": "N4", "word": "下がります", "reading": "さがります", "meaning": "[Price] Fall", "meaningNepali": "घट्नु (मूल्य)", "kanjiCharacters": ["下"], "partOfSpeech": "Verb"},
  {"id": "v43_5", "lesson": 43, "level": "N4", "word": "切れます", "reading": "きれます", "meaning": "[String] Snap / Break", "meaningNepali": "टुक्रिनु / चुँडिनु", "kanjiCharacters": ["切"], "partOfSpeech": "Verb"},
  {"id": "v44_1", "lesson": 44, "level": "N4", "word": "泣きます", "reading": "なきます", "meaning": "Cry", "meaningNepali": "रुनु", "kanjiCharacters": ["泣"], "partOfSpeech": "Verb"},
  {"id": "v44_2", "lesson": 44, "level": "N4", "word": "笑います", "reading": "わらいます", "meaning": "Laugh / Smile", "meaningNepali": "हास्नु", "kanjiCharacters": ["笑"], "partOfSpeech": "Verb"},
  {"id": "v44_3", "lesson": 44, "level": "N4", "word": "乾きます", "reading": "かわきます", "meaning": "Get dry", "meaningNepali": "सुक्नु", "kanjiCharacters": ["乾"], "partOfSpeech": "Verb"},
  {"id": "v44_4", "lesson": 44, "level": "N4", "word": "濡れます", "reading": "ぬれます", "meaning": "Get wet", "meaningNepali": "भिज्नु", "kanjiCharacters": [], "partOfSpeech": "Verb"},
  {"id": "v44_5", "lesson": 44, "level": "N4", "word": "滑ります", "reading": "すべります", "meaning": "Slip", "meaningNepali": "चिप्लिनु", "kanjiCharacters": ["滑"], "partOfSpeech": "Verb"},
  {"id": "v45_1", "lesson": 45, "level": "N4", "word": "信じます", "reading": "しんじます", "meaning": "Believe / Trust", "meaningNepali": "विश्वास गर्नु", "kanjiCharacters": ["信"], "partOfSpeech": "Verb"},
  {"id": "v45_2", "lesson": 45, "level": "N4", "word": "キャンセルします", "reading": "キャンセルします", "meaning": "Cancel", "meaningNepali": "रद्द गर्नु", "kanjiCharacters": [], "partOfSpeech": "Verb"},
  {"id": "v45_3", "lesson": 45, "level": "N4", "word": "保証書", "reading": "ほしょうしょ", "meaning": "Guarantee / Warranty", "meaningNepali": "ग्यारेन्टी पत्र", "kanjiCharacters": ["保", "証", "書"], "partOfSpeech": "Noun"},
  {"id": "v45_4", "lesson": 45, "level": "N4", "word": "領収書", "reading": "りょうしゅうしょ", "meaning": "Receipt", "meaningNepali": "रसिद", "kanjiCharacters": ["領", "収", "書"], "partOfSpeech": "Noun"},
  {"id": "v46_1", "lesson": 46, "level": "N4", "word": "渡します", "reading": "わたします", "meaning": "Hand over", "meaningNepali": "हस्तान्तरण गर्नु", "kanjiCharacters": ["渡"], "partOfSpeech": "Verb"},
  {"id": "v46_2", "lesson": 46, "level": "N4", "word": "帰ってきます", "reading": "かえってきます", "meaning": "Come back", "meaningNepali": "फर्किएर आउनु", "kanjiCharacters": ["帰"], "partOfSpeech": "Verb"},
  {"id": "v46_3", "lesson": 46, "level": "N4", "word": "出ます", "reading": "でます", "meaning": "Depart / Leave", "meaningNepali": "निस्कनु", "kanjiCharacters": ["出"], "partOfSpeech": "Verb"},
  {"id": "v47_1", "lesson": 47, "level": "N4", "word": "吹きます", "reading": "ふきます", "meaning": "[Wind] Blow", "meaningNepali": "हावा चल्नु", "kanjiCharacters": ["吹"], "partOfSpeech": "Verb"},
  {"id": "v47_2", "lesson": 47, "level": "N4", "word": "集まります", "reading": "あつまります", "meaning": "[People] Gather", "meaningNepali": "भेला हुनु", "kanjiCharacters": ["集"], "partOfSpeech": "Verb"},
  {"id": "v47_3", "lesson": 47, "level": "N4", "word": "別れます", "reading": "わかれます", "meaning": "Part / Separate", "meaningNepali": "छुट्नु", "kanjiCharacters": ["別"], "partOfSpeech": "Verb"},
  {"id": "v48_1", "lesson": 48, "level": "N4", "word": "降ろします", "reading": "おろします", "meaning": "Lower / Unload", "meaningNepali": "ओार्नु", "kanjiCharacters": ["降"], "partOfSpeech": "Verb"},
  {"id": "v48_2", "lesson": 48, "level": "N4", "word": "届けます", "reading": "とどけます", "meaning": "Deliver", "meaningNepali": "पुर्‍याउनु", "kanjiCharacters": ["届"], "partOfSpeech": "Verb"},
  {"id": "v48_3", "lesson": 48, "level": "N4", "word": "世話をします", "reading": "せわをします", "meaning": "Take care of", "meaningNepali": "स्याहार गर्नु", "kanjiCharacters": ["世", "話"], "partOfSpeech": "Verb"},
  {"id": "v49_1", "lesson": 49, "level": "N4", "word": "利用します", "reading": "りようします", "meaning": "Use / Utilize (Polite)", "meaningNepali": "प्रयोग गर्नु", "kanjiCharacters": ["利", "用"], "partOfSpeech": "Verb"},
  {"id": "v49_2", "lesson": 49, "level": "N4", "word": "勤めます", "reading": "つとめます", "meaning": "Work for [company]", "meaningNepali": "सेवा गर्नु / काम गर्नु", "kanjiCharacters": ["勤"], "partOfSpeech": "Verb"},
  {"id": "v49_3", "lesson": 49, "level": "N4", "word": "召し上がります", "reading": "めしあがります", "meaning": "Eat / Drink (Honorific)", "meaningNepali": "खाड़बक्सनु", "kanjiCharacters": ["召", "上"], "partOfSpeech": "Verb"},
  {"id": "v49_4", "lesson": 49, "level": "N4", "word": "おっしゃいます", "reading": "おっしゃいます", "meaning": "Say (Honorific)", "meaningNepali": "भनिबक्सनु", "kanjiCharacters": [], "partOfSpeech": "Verb"},
  {"id": "v49_5", "lesson": 49, "level": "N4", "word": "ご覧になります", "reading": "ごらんになります", "meaning": "See / Look at (Honorific)", "meaningNepali": "हेरिबक्सनु", "kanjiCharacters": ["見"], "partOfSpeech": "Verb"},
  {"id": "v49_6", "lesson": 49, "level": "N4", "word": "ご存じです", "reading": "ごぞんじです", "meaning": "Know (Honorific)", "meaningNepali": "थाहा हुनु (आदरणीय)", "kanjiCharacters": ["存"], "partOfSpeech": "Verb"},
  {"id": "v49_7", "lesson": 49, "level": "N4", "word": "なさいます", "reading": "なさいます", "meaning": "Do (Honorific)", "meaningNepali": "गरिबक्सनु", "kanjiCharacters": [], "partOfSpeech": "Verb"},
  {"id": "v50_1", "lesson": 50, "level": "N4", "word": "参ります", "reading": "まいります", "meaning": "Go / Come (Humble)", "meaningNepali": "जानु / आउनु (नम्र)", "kanjiCharacters": ["参"], "partOfSpeech": "Verb"},
  {"id": "v50_2", "lesson": 50, "level": "N4", "word": "おります", "reading": "おります", "meaning": "Be (Humble)", "meaningNepali": "हुनु (नम्र)", "kanjiCharacters": [], "partOfSpeech": "Verb"},
  {"id": "v50_3", "lesson": 50, "level": "N4", "word": "いただきます", "reading": "いただきます", "meaning": "Eat / Drink / Receive (Humble)", "meaningNepali": "खानू / पिउनु (नम्र)", "kanjiCharacters": [], "partOfSpeech": "Verb"},
  {"id": "v50_4", "lesson": 50, "level": "N4", "word": "申します", "reading": "もうします", "meaning": "Say / Be called (Humble)", "meaningNepali": "भन्नु (नम्र)", "kanjiCharacters": ["申"], "partOfSpeech": "Verb"},
  {"id": "v50_5", "lesson": 50, "level": "N4", "word": "いたします", "reading": "いたします", "meaning": "Do (Humble)", "meaningNepali": "गर्नु (नम्र)", "kanjiCharacters": [], "partOfSpeech": "Verb"},
  {"id": "v50_6", "lesson": 50, "level": "N4", "word": "拝見します", "reading": "はいけんします", "meaning": "See / Look at (Humble)", "meaningNepali": "दर्शन गर्नु / हेर्नु (नम्र)", "kanjiCharacters": ["拝", "見"], "partOfSpeech": "Verb"},
  {"id": "v50_7", "lesson": 50, "level": "N4", "word": "存じております", "reading": "ぞんじております", "meaning": "Know (Humble)", "meaningNepali": "थाहा पाउनु (नम्र)", "kanjiCharacters": ["存"], "partOfSpeech": "Verb"},
  {"id": "v50_8", "lesson": 50, "level": "N4", "word": "伺います", "reading": "うかがいます", "meaning": "Ask / Hear / Visit (Humble)", "meaningNepali": "सोध्नु / सुन्नु / भेट्नु (नम्र)", "kanjiCharacters": ["伺"], "partOfSpeech": "Verb"},
  {"id": "v50_9", "lesson": 50, "level": "N4", "word": "お目にかかります", "reading": "おめにかかります", "meaning": "Meet (Humble)", "meaningNepali": "भेट्नु (नम्र)", "kanjiCharacters": ["目"], "partOfSpeech": "Verb"},

  { id:'v51_1', lesson:51, level:'N3', word:'間違いない', reading:'まちがいない', meaning:'No mistake / Certainly', meaningNepali:'निसन्देह / पक्का', kanjiCharacters:['違'], grammarSentences:[{japanese:'彼が犯人に違いない。', reading:'かれがはんにんにちがいない。', english:'He must be the culprit.', nepali:'उही अपराधी हो।'}] },
  { id:'v53_1', lesson:53, level:'N3', word:'中心', reading:'ちゅうしん', meaning:'Center / Core', meaningNepali:'केन्द्र', kanjiCharacters:['中','心'] },
];

export function getVocabByLevel(level: VocabItem['level']): VocabItem[] {
  return NIHONGO_VOCAB_DATA.filter(v => v.level === level);
}

export function getVocabByLevelAndLesson(level: VocabItem['level'], lesson: number): VocabItem[] {
  return NIHONGO_VOCAB_DATA.filter(v => v.level === level && v.lesson === lesson);
}

export function getAvailableLessonsForLevel(level: VocabItem['level']): number[] {
  if (level === 'N5') {
    const nums: number[] = [];
    for (let i = 1; i <= 25; i++) nums.push(i);
    return nums;
  }
  if (level === 'N4') {
    const nums: number[] = [];
    for (let i = 26; i <= 50; i++) nums.push(i);
    return nums;
  }
  if (level === 'N3') {
    const nums: number[] = [];
    for (let i = 51; i <= 75; i++) nums.push(i);
    return nums;
  }
  const data = getVocabByLevel(level);
  return [...new Set(data.map(v => v.lesson).filter((l): l is number => typeof l === 'number'))].sort((a, b) => a - b);
}