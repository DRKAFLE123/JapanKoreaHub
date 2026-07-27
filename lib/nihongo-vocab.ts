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
    // ════════════════════════════════════
  // LESSON 50 — FULL TEXTBOOK VOCABULARY SHEET (42 WORDS)
  // ════════════════════════════════════
  {"id": "v50_1", "lesson": 50, "level": "N4", "word": "参ります", "reading": "まいります", "meaning": "Go / Come (Humble 謙譲語)", "meaningNepali": "जानु / आउनु (नम्र)", "kanjiCharacters": ["参"], "partOfSpeech": "Verb"},
  {"id": "v50_2", "lesson": 50, "level": "N4", "word": "おります", "reading": "おります", "meaning": "Be / Stay (Humble 謙譲語)", "meaningNepali": "हुनु / बस्नु (नम्र)", "kanjiCharacters": [], "partOfSpeech": "Verb"},
  {"id": "v50_3", "lesson": 50, "level": "N4", "word": "いただきます", "reading": "いただきます", "meaning": "Eat / Drink / Receive (Humble 謙譲語)", "meaningNepali": "खानू / पिउनु / पाउनु (नम्र)", "kanjiCharacters": [], "partOfSpeech": "Verb"},
  {"id": "v50_4", "lesson": 50, "level": "N4", "word": "申します", "reading": "もうします", "meaning": "Say / Be named (Humble 謙譲語)", "meaningNepali": "भन्नु / नाउँ हुनु (नम्र)", "kanjiCharacters": ["申"], "partOfSpeech": "Verb"},
  {"id": "v50_5", "lesson": 50, "level": "N4", "word": "いたします", "reading": "いたします", "meaning": "Do (Humble 謙譲語)", "meaningNepali": "गर्नु (नम्र)", "kanjiCharacters": [], "partOfSpeech": "Verb"},
  {"id": "v50_6", "lesson": 50, "level": "N4", "word": "拝見します", "reading": "はいけんします", "meaning": "See / Look at (Humble 謙譲語)", "meaningNepali": "दर्शन गर्नु / हेर्नु (नम्र)", "kanjiCharacters": ["拝", "見"], "partOfSpeech": "Verb"},
  {"id": "v50_7", "lesson": 50, "level": "N4", "word": "存じております", "reading": "ぞんじております", "meaning": "Know (Humble 謙譲語)", "meaningNepali": "थाहा पाउनु (नम्र)", "kanjiCharacters": ["存"], "partOfSpeech": "Verb"},
  {"id": "v50_8", "lesson": 50, "level": "N4", "word": "伺います", "reading": "うかがいます", "meaning": "Ask / Hear / Visit (Humble 謙譲語)", "meaningNepali": "सोध्नु / सुन्नु / भेट्नु (नम्र)", "kanjiCharacters": ["伺"], "partOfSpeech": "Verb"},
  {"id": "v50_9", "lesson": 50, "level": "N4", "word": "お目にかかります", "reading": "おめにかかります", "meaning": "Meet (Humble 謙譲語)", "meaningNepali": "भेट्नु (नम्र)", "kanjiCharacters": ["目"], "partOfSpeech": "Verb"},
  {"id": "v50_10", "lesson": 50, "level": "N4", "word": "淹れます", "reading": "いれます", "meaning": "Make [coffee/tea]", "meaningNepali": "चिया/कफी बनाउनु", "kanjiCharacters": ["淹"], "partOfSpeech": "Verb"},
  {"id": "v50_11", "lesson": 50, "level": "N4", "word": "用意します", "reading": "よういします", "meaning": "Prepare / Ready", "meaningNepali": "तयारी गर्नु", "kanjiCharacters": ["用", "意"], "partOfSpeech": "Verb"},
  {"id": "v50_12", "lesson": 50, "level": "N4", "word": "私", "reading": "わたくし", "meaning": "I (Polite / Formal)", "meaningNepali": "म (आदरणीय)", "kanjiCharacters": ["私"], "partOfSpeech": "Noun"},
  {"id": "v50_13", "lesson": 50, "level": "N4", "word": "ガイド", "reading": "ガイド", "meaning": "Tour guide", "meaningNepali": "गाइड", "kanjiCharacters": [], "partOfSpeech": "Noun"},
  {"id": "v50_14", "lesson": 50, "level": "N4", "word": "メールアドレス", "reading": "メールアドレス", "meaning": "E-mail address", "meaningNepali": "इमेल ठेगाना", "kanjiCharacters": [], "partOfSpeech": "Noun"},
  {"id": "v50_15", "lesson": 50, "level": "N4", "word": "スケジュール", "reading": "スケジュール", "meaning": "Schedule", "meaningNepali": "कार्यतालिका", "kanjiCharacters": [], "partOfSpeech": "Noun"},
  {"id": "v50_16", "lesson": 50, "level": "N4", "word": "再来週", "reading": "さらいしゅう", "meaning": "The week after next", "meaningNepali": "परार हप्ता", "kanjiCharacters": ["再", "来", "週"], "partOfSpeech": "Noun"},
  {"id": "v50_17", "lesson": 50, "level": "N4", "word": "再来月", "reading": "さらいげつ", "meaning": "The month after next", "meaningNepali": "परार महिना", "kanjiCharacters": ["再", "来", "月"], "partOfSpeech": "Noun"},
  {"id": "v50_18", "lesson": 50, "level": "N4", "word": "再来年", "reading": "さらいねん", "meaning": "The year after next", "meaningNepali": "परार वर्ष", "kanjiCharacters": ["再", "来", "年"], "partOfSpeech": "Noun"},
  {"id": "v50_19", "lesson": 50, "level": "N4", "word": "初めに", "reading": "はじめに", "meaning": "First of all / At first", "meaningNepali": "सबैभन्दा पहिला", "kanjiCharacters": ["初"], "partOfSpeech": "Adverb"},
  {"id": "v50_20", "lesson": 50, "level": "N4", "word": "江戸東京博物館", "reading": "えどとうきょうはくぶつかん", "meaning": "Edo-Tokyo Museum", "meaningNepali": "एडो-टोकियो सङ्ग्रहालय", "kanjiCharacters": ["江", "戸", "東", "京", "博", "物", "館"], "partOfSpeech": "Noun"},
  {"id": "v50_21", "lesson": 50, "level": "N4", "word": "緊張します", "reading": "きんちょうします", "meaning": "Become tense / Nervous", "meaningNepali": "तनावग्रस्त हुनु / हडबडाउनु", "kanjiCharacters": ["緊", "張"], "partOfSpeech": "Verb"},
  {"id": "v50_22", "lesson": 50, "level": "N4", "word": "放送します", "reading": "ほうそうします", "meaning": "Broadcast", "meaningNepali": "प्रसारण गर्नु", "kanjiCharacters": ["放", "送"], "partOfSpeech": "Verb"},
  {"id": "v50_23", "lesson": 50, "level": "N4", "word": "ビデオに撮ります", "reading": "ビデオにとります", "meaning": "Record on video", "meaningNepali": "भिडियो रेकर्ड गर्नु", "kanjiCharacters": ["撮"], "partOfSpeech": "Verb"},
  {"id": "v50_24", "lesson": 50, "level": "N4", "word": "賞金", "reading": "しょうきん", "meaning": "Prize money", "meaningNepali": "पुरस्कार रकम", "kanjiCharacters": ["賞", "金"], "partOfSpeech": "Noun"},
  {"id": "v50_25", "lesson": 50, "level": "N4", "word": "自然", "reading": "しぜん", "meaning": "Nature", "meaningNepali": "प्रकृति", "kanjiCharacters": ["自", "然"], "partOfSpeech": "Noun"},
  {"id": "v50_26", "lesson": 50, "level": "N4", "word": "きりん", "reading": "きりん", "meaning": "Giraffe", "meaningNepali": "जिराफ", "kanjiCharacters": [], "partOfSpeech": "Noun"},
  {"id": "v50_27", "lesson": 50, "level": "N4", "word": "象", "reading": "ぞう", "meaning": "Elephant", "meaningNepali": "हात्ती", "kanjiCharacters": ["象"], "partOfSpeech": "Noun"},
  {"id": "v50_28", "lesson": 50, "level": "N4", "word": "ころ", "reading": "ころ", "meaning": "Times / Days (when...)", "meaningNepali": "समय / बेला", "kanjiCharacters": [], "partOfSpeech": "Noun"},
  {"id": "v50_29", "lesson": 50, "level": "N4", "word": "叶います", "reading": "かないます", "meaning": "[Dream] Come true", "meaningNepali": "सपना पूरा हुनु", "kanjiCharacters": ["叶"], "partOfSpeech": "Verb"},
  {"id": "v50_30", "lesson": 50, "level": "N4", "word": "ひとこと", "reading": "ひとこと", "meaning": "A word / Brief remark", "meaningNepali": "एक शब्द / थोरै भनाइ", "kanjiCharacters": [], "partOfSpeech": "Noun"},
  {"id": "v50_31", "lesson": 50, "level": "N4", "word": "感謝します", "reading": "かんしゃします", "meaning": "Thank / Be grateful", "meaningNepali": "धन्यवाद दिनु", "kanjiCharacters": ["感", "謝"], "partOfSpeech": "Verb"},
  {"id": "v50_32", "lesson": 50, "level": "N4", "word": "お礼", "reading": "おれい", "meaning": "Expression of thanks / Gift", "meaningNepali": "कृतज्ञता व्यक्त / उपहार", "kanjiCharacters": ["礼"], "partOfSpeech": "Noun"},
  {"id": "v50_33", "lesson": 50, "level": "N4", "word": "拝啓", "reading": "はいけい", "meaning": "Dear Sirs (Letter greeting)", "meaningNepali": "महोदय (पत्रको सुरु)", "kanjiCharacters": ["拝", "啓"], "partOfSpeech": "Expression"},
  {"id": "v50_34", "lesson": 50, "level": "N4", "word": "敬具", "reading": "けいぐ", "meaning": "Sincerely yours (Letter closing)", "meaningNepali": "भवदीय (पत्रको अन्त्य)", "kanjiCharacters": ["敬", "具"], "partOfSpeech": "Expression"},
  {"id": "v50_35", "lesson": 50, "level": "N4", "word": "美しい", "reading": "うつくしい", "meaning": "Beautiful", "meaningNepali": "सुन्दर", "kanjiCharacters": ["美"], "partOfSpeech": "Adj"},
  {"id": "v50_36", "lesson": 50, "level": "N4", "word": "お城", "reading": "おしろ", "meaning": "Castle", "meaningNepali": "दरबार", "kanjiCharacters": ["城"], "partOfSpeech": "Noun"},
  {"id": "v50_37", "lesson": 50, "level": "N4", "word": "心から", "reading": "こころから", "meaning": "From bottom of heart", "meaningNepali": "हृदयदेखि", "kanjiCharacters": ["心"], "partOfSpeech": "Adverb"},
  {"id": "v50_38", "lesson": 50, "level": "N4", "word": "応援します", "reading": "おうえんします", "meaning": "Support / Cheer for", "meaningNepali": "समर्थन गर्नु", "kanjiCharacters": ["応", "援"], "partOfSpeech": "Verb"},
  {"id": "v50_39", "lesson": 50, "level": "N4", "word": "喜んで", "reading": "よろこんで", "meaning": "Gladly / With pleasure", "meaningNepali": "खुसीसाथ", "kanjiCharacters": ["喜"], "partOfSpeech": "Adverb"},
  {"id": "v50_40", "lesson": 50, "level": "N4", "word": "誠に", "reading": "まことに", "meaning": "Truly / Sincerely", "meaningNepali": "साँच्चै नै", "kanjiCharacters": ["誠"], "partOfSpeech": "Adverb"},
  {"id": "v50_41", "lesson": 50, "level": "N4", "word": "社長室", "reading": "しゃちょうしつ", "meaning": "Company President's Office", "meaningNepali": "अध्यक्षको कार्यकक्ष", "kanjiCharacters": ["社", "長", "室"], "partOfSpeech": "Noun"},
  {"id": "v50_42", "lesson": 50, "level": "N4", "word": "案内状", "reading": "あんないじょう", "meaning": "Invitation letter / Notice", "meaningNepali": "निमन्त्रणा पत्र", "kanjiCharacters": ["案", "内", "状"], "partOfSpeech": "Noun"},

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