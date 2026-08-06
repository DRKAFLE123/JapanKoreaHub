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
  level: 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
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
    // ════════════════════════════════════
  // LESSON 28 — FULL TEXTBOOK VOCABULARY SHEET (42 WORDS)
  // ════════════════════════════════════
  {"id": "v28_1", "lesson": 28, "level": "N4", "word": "売れます", "reading": "うれます", "meaning": "Sell / Be sold", "meaningNepali": "बिक्नु", "kanjiCharacters": ["売"], "partOfSpeech": "Verb"},
  {"id": "v28_2", "lesson": 28, "level": "N4", "word": "踊ります", "reading": "おどります", "meaning": "Dance", "meaningNepali": "नाच्नु", "kanjiCharacters": ["踊"], "partOfSpeech": "Verb"},
  {"id": "v28_3", "lesson": 28, "level": "N4", "word": "かみます", "reading": "かみます", "meaning": "Chew / Bite", "meaningNepali": "चबाउनु", "kanjiCharacters": [], "partOfSpeech": "Verb"},
  {"id": "v28_4", "lesson": 28, "level": "N4", "word": "選びます", "reading": "えらびます", "meaning": "Choose", "meaningNepali": "छान्नु", "kanjiCharacters": ["選"], "partOfSpeech": "Verb"},
  {"id": "v28_5", "lesson": 28, "level": "N4", "word": "通います", "reading": "かよいます", "meaning": "Commute", "meaningNepali": "आउजाउ गर्नु", "kanjiCharacters": ["通"], "partOfSpeech": "Verb"},
  {"id": "v28_6", "lesson": 28, "level": "N4", "word": "メモします", "reading": "メモします", "meaning": "Take a note", "meaningNepali": "टिपोट गर्नु", "kanjiCharacters": [], "partOfSpeech": "Verb"},
  {"id": "v28_7", "lesson": 28, "level": "N4", "word": "真面目", "reading": "まじめ", "meaning": "Serious / Earnest", "meaningNepali": "इमानदार", "kanjiCharacters": ["真", "面", "目"], "partOfSpeech": "Adj"},
  {"id": "v28_8", "lesson": 28, "level": "N4", "word": "熱心", "reading": "ねっしん", "meaning": "Enthusiastic / Zealous", "meaningNepali": "मेहनती", "kanjiCharacters": ["熱", "心"], "partOfSpeech": "Adj"},
  {"id": "v28_9", "lesson": 28, "level": "N4", "word": "偉い", "reading": "えらい", "meaning": "Great / Admirable", "meaningNepali": "महान्", "kanjiCharacters": ["偉"], "partOfSpeech": "Adj"},
  {"id": "v28_10", "lesson": 28, "level": "N4", "word": "ちょうどいい", "reading": "ちょうどいい", "meaning": "Just right / Suitable", "meaningNepali": "ठिकै", "kanjiCharacters": [], "partOfSpeech": "Adj"},
  {"id": "v28_11", "lesson": 28, "level": "N4", "word": "景色", "reading": "けしき", "meaning": "Scenery / View", "meaningNepali": "दृश्य", "kanjiCharacters": ["景", "色"], "partOfSpeech": "Noun"},
  {"id": "v28_12", "lesson": 28, "level": "N4", "word": "美容院", "reading": "びよういん", "meaning": "Beauty salon", "meaningNepali": "ब्युटी पार्लर", "kanjiCharacters": ["美", "容", "院"], "partOfSpeech": "Noun"},
  {"id": "v28_13", "lesson": 28, "level": "N4", "word": "台所", "reading": "だいどころ", "meaning": "Kitchen", "meaningNepali": "भान्सा", "kanjiCharacters": ["台", "所"], "partOfSpeech": "Noun"},
  {"id": "v28_14", "lesson": 28, "level": "N4", "word": "経験", "reading": "けいけん", "meaning": "Experience", "meaningNepali": "अनुभव", "kanjiCharacters": ["経", "験"], "partOfSpeech": "Noun"},
  {"id": "v28_15", "lesson": 28, "level": "N4", "word": "力", "reading": "ちから", "meaning": "Power / Strength", "meaningNepali": "शक्ति", "kanjiCharacters": ["力"], "partOfSpeech": "Noun"},
  {"id": "v28_16", "lesson": 28, "level": "N4", "word": "人気", "reading": "にんき", "meaning": "Popularity", "meaningNepali": "लोकप्रियता", "kanjiCharacters": ["人", "気"], "partOfSpeech": "Noun"},
  {"id": "v28_17", "lesson": 28, "level": "N4", "word": "形", "reading": "かたち", "meaning": "Shape", "meaningNepali": "आकार", "kanjiCharacters": ["形"], "partOfSpeech": "Noun"},
  {"id": "v28_18", "lesson": 28, "level": "N4", "word": "色", "reading": "いろ", "meaning": "Color", "meaningNepali": "रङ", "kanjiCharacters": ["色"], "partOfSpeech": "Noun"},
  {"id": "v28_19", "lesson": 28, "level": "N4", "word": "味", "reading": "あじ", "meaning": "Taste", "meaningNepali": "स्वाद", "kanjiCharacters": ["味"], "partOfSpeech": "Noun"},
  {"id": "v28_20", "lesson": 28, "level": "N4", "word": "ガム", "reading": "ガム", "meaning": "Chewing gum", "meaningNepali": "गम", "kanjiCharacters": [], "partOfSpeech": "Noun"},
  {"id": "v28_21", "lesson": 28, "level": "N4", "word": "品物", "reading": "しなもの", "meaning": "Goods / Merchandise", "meaningNepali": "सामान", "kanjiCharacters": ["品", "物"], "partOfSpeech": "Noun"},
  {"id": "v28_22", "lesson": 28, "level": "N4", "word": "値段", "reading": "ねだん", "meaning": "Price", "meaningNepali": "मूल्य", "kanjiCharacters": ["値", "段"], "partOfSpeech": "Noun"},
  {"id": "v28_23", "lesson": 28, "level": "N4", "word": "給料", "reading": "きゅうりょう", "meaning": "Salary", "meaningNepali": "तलब", "kanjiCharacters": ["給", "料"], "partOfSpeech": "Noun"},
  {"id": "v28_24", "lesson": 28, "level": "N4", "word": "ボーナス", "reading": "ボーナス", "meaning": "Bonus", "meaningNepali": "बोनस", "kanjiCharacters": [], "partOfSpeech": "Noun"},
  {"id": "v28_25", "lesson": 28, "level": "N4", "word": "番組", "reading": "ばんぐみ", "meaning": "TV/Radio Program", "meaningNepali": "कार्यक्रम", "kanjiCharacters": ["番", "組"], "partOfSpeech": "Noun"},
  {"id": "v28_26", "lesson": 28, "level": "N4", "word": "歌手", "reading": "かしゅ", "meaning": "Singer", "meaningNepali": "गायक", "kanjiCharacters": ["歌", "手"], "partOfSpeech": "Noun"},
  {"id": "v28_27", "lesson": 28, "level": "N4", "word": "小説", "reading": "しょうせつ", "meaning": "Novel", "meaningNepali": "उपन्यास", "kanjiCharacters": ["小", "説"], "partOfSpeech": "Noun"},
  {"id": "v28_28", "lesson": 28, "level": "N4", "word": "小説家", "reading": "しょうせつか", "meaning": "Novelist", "meaningNepali": "उपन्यासकार", "kanjiCharacters": ["小", "説", "家"], "partOfSpeech": "Noun"},
  {"id": "v28_29", "lesson": 28, "level": "N4", "word": "息子", "reading": "むすこ", "meaning": "My son", "meaningNepali": "छोरा", "kanjiCharacters": ["息", "子"], "partOfSpeech": "Noun"},
  {"id": "v28_30", "lesson": 28, "level": "N4", "word": "息子さん", "reading": "むすこさん", "meaning": "Someone else's son", "meaningNepali": "छोरा (आदरणीय)", "kanjiCharacters": ["息", "子"], "partOfSpeech": "Noun"},
  {"id": "v28_31", "lesson": 28, "level": "N4", "word": "娘", "reading": "むすめ", "meaning": "My daughter", "meaningNepali": "छोरी", "kanjiCharacters": ["娘"], "partOfSpeech": "Noun"},
  {"id": "v28_32", "lesson": 28, "level": "N4", "word": "娘さん", "reading": "むすめさん", "meaning": "Someone else's daughter", "meaningNepali": "छोरी (आदरणीय)", "kanjiCharacters": ["娘"], "partOfSpeech": "Noun"},
  {"id": "v28_33", "lesson": 28, "level": "N4", "word": "自分", "reading": "じぶん", "meaning": "Oneself", "meaningNepali": "आफू", "kanjiCharacters": ["自", "分"], "partOfSpeech": "Noun"},
  {"id": "v28_34", "lesson": 28, "level": "N4", "word": "将来", "reading": "しょうらい", "meaning": "Future", "meaningNepali": "भविष्य", "kanjiCharacters": ["将", "来"], "partOfSpeech": "Noun"},
  {"id": "v28_35", "lesson": 28, "level": "N4", "word": "しばらく", "reading": "しばらく", "meaning": "For a while", "meaningNepali": "केही समय", "kanjiCharacters": [], "partOfSpeech": "Adverb"},
  {"id": "v28_36", "lesson": 28, "level": "N4", "word": "たいてい", "reading": "たいてい", "meaning": "Usually / Mostly", "meaningNepali": "साधारणतया", "kanjiCharacters": [], "partOfSpeech": "Adverb"},
  {"id": "v28_37", "lesson": 28, "level": "N4", "word": "それに", "reading": "それに", "meaning": "In addition / Moreover", "meaningNepali": "त्यसमाथि", "kanjiCharacters": [], "partOfSpeech": "Conjunction"},
  {"id": "v28_38", "lesson": 28, "level": "N4", "word": "それで", "reading": "それで", "meaning": "Therefore / So", "meaningNepali": "त्यसैले", "kanjiCharacters": [], "partOfSpeech": "Conjunction"},
  {"id": "v28_39", "lesson": 28, "level": "N4", "word": "お知らせ", "reading": "おしらせ", "meaning": "Notice / Information", "meaningNepali": "सूचना", "kanjiCharacters": ["知"], "partOfSpeech": "Noun"},
  {"id": "v28_40", "lesson": 28, "level": "N4", "word": "参加します", "reading": "さんかします", "meaning": "Participate / Join", "meaningNepali": "भाग लिनु", "kanjiCharacters": ["参", "加"], "partOfSpeech": "Verb"},
  {"id": "v28_41", "lesson": 28, "level": "N4", "word": "日にち", "reading": "ひにち", "meaning": "Date", "meaningNepali": "मिति", "kanjiCharacters": ["日"], "partOfSpeech": "Noun"},
  {"id": "v28_42", "lesson": 28, "level": "N4", "word": "体育館", "reading": "たいいくかん", "meaning": "Gymnasium", "meaningNepali": "व्यायामशाला", "kanjiCharacters": ["体", "育", "館"], "partOfSpeech": "Noun"},

    // ════════════════════════════════════
  // LESSON 29 — FULL TEXTBOOK VOCABULARY SHEET (42 WORDS)
  // ════════════════════════════════════
  {"id": "v29_1", "lesson": 29, "level": "N4", "word": "開きます", "reading": "あきます", "meaning": "Door open (Intransitive)", "meaningNepali": "ढोका खुल्नु", "kanjiCharacters": ["開"], "partOfSpeech": "Verb"},
  {"id": "v29_2", "lesson": 29, "level": "N4", "word": "閉まります", "reading": "しまります", "meaning": "Door close (Intransitive)", "meaningNepali": "ढोका बन्द हुनु", "kanjiCharacters": ["閉"], "partOfSpeech": "Verb"},
  {"id": "v29_3", "lesson": 29, "level": "N4", "word": "つきます", "reading": "つきます", "meaning": "Light turn on", "meaningNepali": "बत्ती बल्नु", "kanjiCharacters": [], "partOfSpeech": "Verb"},
  {"id": "v29_4", "lesson": 29, "level": "N4", "word": "消えます", "reading": "きえます", "meaning": "Light turn off", "meaningNepali": "बत्ती निभ्नु", "kanjiCharacters": ["消"], "partOfSpeech": "Verb"},
  {"id": "v29_5", "lesson": 29, "level": "N4", "word": "壊れます", "reading": "こわれます", "meaning": "Chair break / Malfunction", "meaningNepali": "बिग्रनु", "kanjiCharacters": ["壊"], "partOfSpeech": "Verb"},
  {"id": "v29_6", "lesson": 29, "level": "N4", "word": "割れます", "reading": "われます", "meaning": "Glass break / Shatter", "meaningNepali": "फुट्नु", "kanjiCharacters": ["割"], "partOfSpeech": "Verb"},
  {"id": "v29_7", "lesson": 29, "level": "N4", "word": "折れます", "reading": "おれます", "meaning": "Tree break / Snap", "meaningNepali": "भाँचिनु", "kanjiCharacters": ["折"], "partOfSpeech": "Verb"},
  {"id": "v29_8", "lesson": 29, "level": "N4", "word": "破れます", "reading": "やぶれます", "meaning": "Paper tear", "meaningNepali": "च्यातिनु", "kanjiCharacters": ["破"], "partOfSpeech": "Verb"},
  {"id": "v29_9", "lesson": 29, "level": "N4", "word": "汚れます", "reading": "よごれます", "meaning": "Clothes get dirty", "meaningNepali": "फोहर हुनु", "kanjiCharacters": ["汚"], "partOfSpeech": "Verb"},
  {"id": "v29_10", "lesson": 29, "level": "N4", "word": "付きます", "reading": "つきます", "meaning": "Pocket be attached", "meaningNepali": "टाँसिनु", "kanjiCharacters": ["付"], "partOfSpeech": "Verb"},
  {"id": "v29_11", "lesson": 29, "level": "N4", "word": "外れます", "reading": "はずれます", "meaning": "Button come off", "meaningNepali": "फुकनु", "kanjiCharacters": ["外"], "partOfSpeech": "Verb"},
  {"id": "v29_12", "lesson": 29, "level": "N4", "word": "止まります", "reading": "とまります", "meaning": "Car stop", "meaningNepali": "रोकिनु", "kanjiCharacters": ["止"], "partOfSpeech": "Verb"},
  {"id": "v29_13", "lesson": 29, "level": "N4", "word": "間違えます", "reading": "まちがえます", "meaning": "Make a mistake", "meaningNepali": "गलती गर्नु", "kanjiCharacters": ["間", "違"], "partOfSpeech": "Verb"},
  {"id": "v29_14", "lesson": 29, "level": "N4", "word": "落とします", "reading": "おとします", "meaning": "Drop / Lose", "meaningNepali": "खसाल्नु", "kanjiCharacters": ["落"], "partOfSpeech": "Verb"},
  {"id": "v29_15", "lesson": 29, "level": "N4", "word": "かかります", "reading": "かかります", "meaning": "Key be locked", "meaningNepali": "ताल्चा लाग्नु", "kanjiCharacters": [], "partOfSpeech": "Verb"},
  {"id": "v29_16", "lesson": 29, "level": "N4", "word": "ふきます", "reading": "ふきます", "meaning": "Wipe", "meaningNepali": "पुछ्नु", "kanjiCharacters": [], "partOfSpeech": "Verb"},
  {"id": "v29_17", "lesson": 29, "level": "N4", "word": "取り替えます", "reading": "とりかえます", "meaning": "Exchange / Replace", "meaningNepali": "फेर्नु", "kanjiCharacters": ["取", "替"], "partOfSpeech": "Verb"},
  {"id": "v29_18", "lesson": 29, "level": "N4", "word": "片付けます", "reading": "かたづけます", "meaning": "Tidy up / Put in order", "meaningNepali": "व्यवस्थापन गर्नु", "kanjiCharacters": ["片", "付"], "partOfSpeech": "Verb"},
  {"id": "v29_19", "lesson": 29, "level": "N4", "word": "お皿", "reading": "おさら", "meaning": "Plate / Dish", "meaningNepali": "थाल", "kanjiCharacters": ["皿"], "partOfSpeech": "Noun"},
  {"id": "v29_20", "lesson": 29, "level": "N4", "word": "お茶碗", "reading": "おちゃわん", "meaning": "Rice bowl", "meaningNepali": "कटोरा", "kanjiCharacters": ["茶", "碗"], "partOfSpeech": "Noun"},
  {"id": "v29_21", "lesson": 29, "level": "N4", "word": "コップ", "reading": "コップ", "meaning": "Glass", "meaningNepali": "ग्लास", "kanjiCharacters": [], "partOfSpeech": "Noun"},
  {"id": "v29_22", "lesson": 29, "level": "N4", "word": "ガラス", "reading": "ガラス", "meaning": "Glass material", "meaningNepali": "काँच", "kanjiCharacters": [], "partOfSpeech": "Noun"},
  {"id": "v29_23", "lesson": 29, "level": "N4", "word": "袋", "reading": "ふくろ", "meaning": "Bag", "meaningNepali": "झोला", "kanjiCharacters": ["袋"], "partOfSpeech": "Noun"},
  {"id": "v29_24", "lesson": 29, "level": "N4", "word": "書類", "reading": "しょるい", "meaning": "Documents / Papers", "meaningNepali": "कागजात", "kanjiCharacters": ["書", "類"], "partOfSpeech": "Noun"},
  {"id": "v29_25", "lesson": 29, "level": "N4", "word": "枝", "reading": "えだ", "meaning": "Branch", "meaningNepali": "हाँगा", "kanjiCharacters": ["枝"], "partOfSpeech": "Noun"},
  {"id": "v29_26", "lesson": 29, "level": "N4", "word": "駅員", "reading": "えきいん", "meaning": "Station attendant", "meaningNepali": "कर्मचारी", "kanjiCharacters": ["駅", "員"], "partOfSpeech": "Noun"},
  {"id": "v29_27", "lesson": 29, "level": "N4", "word": "交番", "reading": "こうばん", "meaning": "Police box", "meaningNepali": "प्रहरी चौकी", "kanjiCharacters": ["交", "番"], "partOfSpeech": "Noun"},
  {"id": "v29_28", "lesson": 29, "level": "N4", "word": "返事", "reading": "へんじ", "meaning": "Reply / Answer", "meaningNepali": "जवाफ", "kanjiCharacters": ["返", "事"], "partOfSpeech": "Noun"},
  {"id": "v29_29", "lesson": 29, "level": "N4", "word": "お先にどうぞ", "reading": "おさきにどうぞ", "meaning": "After you / Go ahead first", "meaningNepali": "पहिला तपाईं जानुस्", "kanjiCharacters": ["先"], "partOfSpeech": "Expression"},
  {"id": "v29_30", "lesson": 29, "level": "N4", "word": "今電車", "reading": "いまのでんしゃ", "meaning": "The train which just left", "meaningNepali": "अहिलेको ट्रेन", "kanjiCharacters": ["電", "車"], "partOfSpeech": "Noun"},
  {"id": "v29_31", "lesson": 29, "level": "N4", "word": "忘れ物", "reading": "わすれもの", "meaning": "Thing left behind / Lost property", "meaningNepali": "छुटेको सामान", "kanjiCharacters": ["忘", "物"], "partOfSpeech": "Noun"},
  {"id": "v29_32", "lesson": 29, "level": "N4", "word": "このくらい", "reading": "このくらい", "meaning": "About this size", "meaningNepali": "यति जति", "kanjiCharacters": [], "partOfSpeech": "Adverb"},
  {"id": "v29_33", "lesson": 29, "level": "N4", "word": "〜側", "reading": "〜がわ", "meaning": "~ side", "meaningNepali": "~ तिर", "kanjiCharacters": ["側"], "partOfSpeech": "Suffix"},
  {"id": "v29_34", "lesson": 29, "level": "N4", "word": "ポケット", "reading": "ポケット", "meaning": "Pocket", "meaningNepali": "पकेट", "kanjiCharacters": [], "partOfSpeech": "Noun"},
  {"id": "v29_35", "lesson": 29, "level": "N4", "word": "覚えていません", "reading": "おぼえていません", "meaning": "Don't remember", "meaningNepali": "याद छैन", "kanjiCharacters": ["覚"], "partOfSpeech": "Expression"},
  {"id": "v29_36", "lesson": 29, "level": "N4", "word": "網棚", "reading": "あみだな", "meaning": "Overhead luggage rack", "meaningNepali": "माथिल्लो र्याक", "kanjiCharacters": ["網", "棚"], "partOfSpeech": "Noun"},
  {"id": "v29_37", "lesson": 29, "level": "N4", "word": "確か", "reading": "たしか", "meaning": "If I remember correctly", "meaningNepali": "सायद", "kanjiCharacters": ["確"], "partOfSpeech": "Adverb"},
  {"id": "v29_38", "lesson": 29, "level": "N4", "word": "ああ、よかった", "reading": "ああ、よかった", "meaning": "Oh, thank goodness!", "meaningNepali": "स्याबास / राम्रो भयो", "kanjiCharacters": [], "partOfSpeech": "Expression"},
  {"id": "v29_39", "lesson": 29, "level": "N4", "word": "地震", "reading": "じしん", "meaning": "Earthquake", "meaningNepali": "भूकम्प", "kanjiCharacters": ["地", "震"], "partOfSpeech": "Noun"},
  {"id": "v29_40", "lesson": 29, "level": "N4", "word": "壁", "reading": "かべ", "meaning": "Wall", "meaningNepali": "भित्ता", "kanjiCharacters": ["壁"], "partOfSpeech": "Noun"},
  {"id": "v29_41", "lesson": 29, "level": "N4", "word": "針", "reading": "はり", "meaning": "Hand of clock / Needle", "meaningNepali": "सुई", "kanjiCharacters": ["針"], "partOfSpeech": "Noun"},
  {"id": "v29_42", "lesson": 29, "level": "N4", "word": "指します", "reading": "さします", "meaning": "Point to", "meaningNepali": "देखाउनु", "kanjiCharacters": ["指"], "partOfSpeech": "Verb"},

    // ════════════════════════════════════
  // LESSON 30 — FULL TEXTBOOK VOCABULARY SHEET (42 WORDS)
  // ════════════════════════════════════
  {"id": "v30_1", "lesson": 30, "level": "N4", "word": "貼ります", "reading": "はりま", "meaning": "Put up / Stick / Post", "meaningNepali": "टाँस्नु", "kanjiCharacters": ["貼"], "partOfSpeech": "Verb"},
  {"id": "v30_2", "lesson": 30, "level": "N4", "word": "掛けます", "reading": "かけます", "meaning": "Hang", "meaningNepali": "झुन्ड्याउनु", "kanjiCharacters": ["掛"], "partOfSpeech": "Verb"},
  {"id": "v30_3", "lesson": 30, "level": "N4", "word": "飾ります", "reading": "かざります", "meaning": "Decorate / Display", "meaningNepali": "सजाउनु", "kanjiCharacters": ["飾"], "partOfSpeech": "Verb"},
  {"id": "v30_4", "lesson": 30, "level": "N4", "word": "並べます", "reading": "ならべます", "meaning": "Arrange / Line up", "meaningNepali": "मिलाउनु", "kanjiCharacters": ["並"], "partOfSpeech": "Verb"},
  {"id": "v30_5", "lesson": 30, "level": "N4", "word": "植えます", "reading": "うえます", "meaning": "Plant", "meaningNepali": "रोप्नु", "kanjiCharacters": ["植"], "partOfSpeech": "Verb"},
  {"id": "v30_6", "lesson": 30, "level": "N4", "word": "戻します", "reading": "もどします", "meaning": "Put back / Return", "meaningNepali": "फर्ता राख्नु", "kanjiCharacters": ["戻"], "partOfSpeech": "Verb"},
  {"id": "v30_7", "lesson": 30, "level": "N4", "word": "まとめます", "reading": "まとめます", "meaning": "Put together / Summarize", "meaningNepali": "सङ्कलन गर्नु", "kanjiCharacters": [], "partOfSpeech": "Verb"},
  {"id": "v30_8", "lesson": 30, "level": "N4", "word": "片付けます", "reading": "かたづけます", "meaning": "Tidy up / Put away", "meaningNepali": "मिलाउनु", "kanjiCharacters": ["片", "付"], "partOfSpeech": "Verb"},
  {"id": "v30_9", "lesson": 30, "level": "N4", "word": "しまいます", "reading": "しまいます", "meaning": "Put away / Store", "meaningNepali": "थन्क्याउनु", "kanjiCharacters": [], "partOfSpeech": "Verb"},
  {"id": "v30_10", "lesson": 30, "level": "N4", "word": "決めます", "reading": "きめます", "meaning": "Decide", "meaningNepali": "निर्णय गर्नु", "kanjiCharacters": ["決"], "partOfSpeech": "Verb"},
  {"id": "v30_11", "lesson": 30, "level": "N4", "word": "知らせます", "reading": "しらせます", "meaning": "Inform / Notice", "meaningNepali": "जानकारी दिनु", "kanjiCharacters": ["知"], "partOfSpeech": "Verb"},
  {"id": "v30_12", "lesson": 30, "level": "N4", "word": "相談します", "reading": "そうだんします", "meaning": "Consult / Discuss", "meaningNepali": "सल्लाह गर्नु", "kanjiCharacters": ["相", "談"], "partOfSpeech": "Verb"},
  {"id": "v30_13", "lesson": 30, "level": "N4", "word": "予習します", "reading": "よしゅうします", "meaning": "Prepare one's lesson", "meaningNepali": "पूर्व-तयारी गर्नु", "kanjiCharacters": ["予", "習"], "partOfSpeech": "Verb"},
  {"id": "v30_14", "lesson": 30, "level": "N4", "word": "復習します", "reading": "ふくしゅうします", "meaning": "Review one's lesson", "meaningNepali": "पुनरावलोकन गर्नु", "kanjiCharacters": ["復", "習"], "partOfSpeech": "Verb"},
  {"id": "v30_15", "lesson": 30, "level": "N4", "word": "そのままにします", "reading": "そのままにします", "meaning": "Leave things as they are", "meaningNepali": "यत्तिकै छाड्नु", "kanjiCharacters": [], "partOfSpeech": "Verb"},
  {"id": "v30_16", "lesson": 30, "level": "N4", "word": "授業", "reading": "じゅぎょう", "meaning": "Class / Lesson", "meaningNepali": "कक्षा", "kanjiCharacters": ["授", "業"], "partOfSpeech": "Noun"},
  {"id": "v30_17", "lesson": 30, "level": "N4", "word": "講義", "reading": "こうぎ", "meaning": "Lecture", "meaningNepali": "प्रवचन", "kanjiCharacters": ["講", "義"], "partOfSpeech": "Noun"},
  {"id": "v30_18", "lesson": 30, "level": "N4", "word": "ミーティング", "reading": "ミーティング", "meaning": "Meeting", "meaningNepali": "बैठक", "kanjiCharacters": [], "partOfSpeech": "Noun"},
  {"id": "v30_19", "lesson": 30, "level": "N4", "word": "予定", "reading": "よてい", "meaning": "Plan / Schedule", "meaningNepali": "योजना", "kanjiCharacters": ["予", "定"], "partOfSpeech": "Noun"},
  {"id": "v30_20", "lesson": 30, "level": "N4", "word": "お知らせ", "reading": "おしらせ", "meaning": "Notice / Announcement", "meaningNepali": "सूचना", "kanjiCharacters": ["知"], "partOfSpeech": "Noun"},
  {"id": "v30_21", "lesson": 30, "level": "N4", "word": "ガイドブック", "reading": "ガイドブック", "meaning": "Guidebook", "meaningNepali": "गाइडबुक", "kanjiCharacters": [], "partOfSpeech": "Noun"},
  {"id": "v30_22", "lesson": 30, "level": "N4", "word": "カレンダー", "reading": "カレンダー", "meaning": "Calendar", "meaningNepali": "पात्रो", "kanjiCharacters": [], "partOfSpeech": "Noun"},
  {"id": "v30_23", "lesson": 30, "level": "N4", "word": "ポスター", "reading": "ポスター", "meaning": "Poster", "meaningNepali": "पोस्टर", "kanjiCharacters": [], "partOfSpeech": "Noun"},
  {"id": "v30_24", "lesson": 30, "level": "N4", "word": "予定表", "reading": "よていひょう", "meaning": "Schedule table", "meaningNepali": "कार्यतालिका", "kanjiCharacters": ["予", "定", "表"], "partOfSpeech": "Noun"},
  {"id": "v30_25", "lesson": 30, "level": "N4", "word": "ごみ箱", "reading": "ごみばこ", "meaning": "Trash bin", "meaningNepali": "फोहरदानी", "kanjiCharacters": ["箱"], "partOfSpeech": "Noun"},
  {"id": "v30_26", "lesson": 30, "level": "N4", "word": "人形", "reading": "にんぎょう", "meaning": "Doll", "meaningNepali": "पुतली", "kanjiCharacters": ["人", "形"], "partOfSpeech": "Noun"},
  {"id": "v30_27", "lesson": 30, "level": "N4", "word": "花瓶", "reading": "かびん", "meaning": "Vase", "meaningNepali": "फुलदानी", "kanjiCharacters": ["花", "瓶"], "partOfSpeech": "Noun"},
  {"id": "v30_28", "lesson": 30, "level": "N4", "word": "鏡", "reading": "かがみ", "meaning": "Mirror", "meaningNepali": "ऐना", "kanjiCharacters": ["鏡"], "partOfSpeech": "Noun"},
  {"id": "v30_29", "lesson": 30, "level": "N4", "word": "引き出し", "reading": "ひきだし", "meaning": "Drawer", "meaningNepali": "दराजको घर", "kanjiCharacters": ["引", "出"], "partOfSpeech": "Noun"},
  {"id": "v30_30", "lesson": 30, "level": "N4", "word": "玄関", "reading": "げんかん", "meaning": "Entrance hall", "meaningNepali": "मूल ढोका", "kanjiCharacters": ["玄", "関"], "partOfSpeech": "Noun"},
  {"id": "v30_31", "lesson": 30, "level": "N4", "word": "廊下", "reading": "ろうか", "meaning": "Corridor / Hallway", "meaningNepali": "गल्ली", "kanjiCharacters": ["廊", "下"], "partOfSpeech": "Noun"},
  {"id": "v30_32", "lesson": 30, "level": "N4", "word": "壁", "reading": "かべ", "meaning": "Wall", "meaningNepali": "भित्ता", "kanjiCharacters": ["壁"], "partOfSpeech": "Noun"},
  {"id": "v30_33", "lesson": 30, "level": "N4", "word": "池", "reading": "いけ", "meaning": "Pond", "meaningNepali": "पोखरी", "kanjiCharacters": ["池"], "partOfSpeech": "Noun"},
  {"id": "v30_34", "lesson": 30, "level": "N4", "word": "元の所", "reading": "もとのところ", "meaning": "Original place", "meaningNepali": "पुराना ठाउँ", "kanjiCharacters": ["元", "所"], "partOfSpeech": "Noun"},
  {"id": "v30_35", "lesson": 30, "level": "N4", "word": "周り", "reading": "まわり", "meaning": "Surroundings / Around", "meaningNepali": "वरिपरि", "kanjiCharacters": ["周"], "partOfSpeech": "Noun"},
  {"id": "v30_36", "lesson": 30, "level": "N4", "word": "真ん中", "reading": "まんなか", "meaning": "Center / Middle", "meaningNepali": "बीच", "kanjiCharacters": ["真", "中"], "partOfSpeech": "Noun"},
  {"id": "v30_37", "lesson": 30, "level": "N4", "word": "隅", "reading": "すみ", "meaning": "Corner", "meaningNepali": "कुना", "kanjiCharacters": ["隅"], "partOfSpeech": "Noun"},
  {"id": "v30_38", "lesson": 30, "level": "N4", "word": "まだ", "reading": "まだ", "meaning": "Still / Yet", "meaningNepali": "अझै", "kanjiCharacters": [], "partOfSpeech": "Adverb"},
  {"id": "v30_39", "lesson": 30, "level": "N4", "word": "リュック", "reading": "リュック", "meaning": "Backpack", "meaningNepali": "झोला", "kanjiCharacters": [], "partOfSpeech": "Noun"},
  {"id": "v30_40", "lesson": 30, "level": "N4", "word": "非常袋", "reading": "ひじょうぶくろ", "meaning": "Emergency kit bag", "meaningNepali": "आपत्कालीन झोला", "kanjiCharacters": ["非", "常", "袋"], "partOfSpeech": "Noun"},
  {"id": "v30_41", "lesson": 30, "level": "N4", "word": "非常時", "reading": "ひじょうじ", "meaning": "Emergency time", "meaningNepali": "आपत्कालीन समय", "kanjiCharacters": ["非", "常", "時"], "partOfSpeech": "Noun"},
  {"id": "v30_42", "lesson": 30, "level": "N4", "word": "懐中電灯", "reading": "かいちゅうでんとう", "meaning": "Flashlight", "meaningNepali": "टर्चलाइट", "kanjiCharacters": ["懐", "中", "電", "灯"], "partOfSpeech": "Noun"},

    // ════════════════════════════════════
  // LESSON 31 — FULL TEXTBOOK VOCABULARY SHEET (42 WORDS)
  // ════════════════════════════════════
  {"id": "v31_1", "lesson": 31, "level": "N4", "word": "始まります", "reading": "はじまります", "meaning": "Start (Intransitive)", "meaningNepali": "सुरु हुनु", "kanjiCharacters": ["始"], "partOfSpeech": "Verb"},
  {"id": "v31_2", "lesson": 31, "level": "N4", "word": "続けます", "reading": "つづけます", "meaning": "Continue", "meaningNepali": "निरन्तरता दिनु", "kanjiCharacters": ["続"], "partOfSpeech": "Verb"},
  {"id": "v31_3", "lesson": 31, "level": "N4", "word": "見つけます", "reading": "みつけます", "meaning": "Find / Discover", "meaningNepali": "फेला पार्नु", "kanjiCharacters": ["見"], "partOfSpeech": "Verb"},
  {"id": "v31_4", "lesson": 31, "level": "N4", "word": "受けます", "reading": "うけます", "meaning": "Take [an exam]", "meaningNepali": "परीक्षा दिनु", "kanjiCharacters": ["受"], "partOfSpeech": "Verb"},
  {"id": "v31_5", "lesson": 31, "level": "N4", "word": "入学します", "reading": "にゅうがくします", "meaning": "Enter [a university]", "meaningNepali": "भर्ना हुनु", "kanjiCharacters": ["入", "学"], "partOfSpeech": "Verb"},
  {"id": "v31_6", "lesson": 31, "level": "N4", "word": "卒業します", "reading": "そつぎょうします", "meaning": "Graduate from", "meaningNepali": "स्नातक गर्नु", "kanjiCharacters": ["卒", "業"], "partOfSpeech": "Verb"},
  {"id": "v31_7", "lesson": 31, "level": "N4", "word": "出席します", "reading": "しゅっせきします", "meaning": "Attend [a meeting]", "meaningNepali": "उपस्थित हुनु", "kanjiCharacters": ["出", "席"], "partOfSpeech": "Verb"},
  {"id": "v31_8", "lesson": 31, "level": "N4", "word": "休憩します", "reading": "きゅうけいします", "meaning": "Take a break", "meaningNepali": "विश्राम गर्नु", "kanjiCharacters": ["休", "憩"], "partOfSpeech": "Verb"},
  {"id": "v31_9", "lesson": 31, "level": "N4", "word": "連休", "reading": "れんきゅう", "meaning": "Consecutive holidays", "meaningNepali": "लगातार बिदा", "kanjiCharacters": ["連", "休"], "partOfSpeech": "Noun"},
  {"id": "v31_10", "lesson": 31, "level": "N4", "word": "作文", "reading": "さくぶん", "meaning": "Essay / Composition", "meaningNepali": "निबन्ध", "kanjiCharacters": ["作", "文"], "partOfSpeech": "Noun"},
  {"id": "v31_11", "lesson": 31, "level": "N4", "word": "展覧会", "reading": "てんらんかい", "meaning": "Exhibition", "meaningNepali": "प्रदर्शनी", "kanjiCharacters": ["展", "覧", "会"], "partOfSpeech": "Noun"},
  {"id": "v31_12", "lesson": 31, "level": "N4", "word": "結婚式", "reading": "けっこんしき", "meaning": "Wedding ceremony", "meaningNepali": "विवाह समारोह", "kanjiCharacters": ["結", "婚", "式"], "partOfSpeech": "Noun"},
  {"id": "v31_13", "lesson": 31, "level": "N4", "word": "葬式", "reading": "そうしき", "meaning": "Funeral ceremony", "meaningNepali": "अन्त्येष्टि", "kanjiCharacters": ["葬", "式"], "partOfSpeech": "Noun"},
  {"id": "v31_14", "lesson": 31, "level": "N4", "word": "式", "reading": "しき", "meaning": "Ceremony", "meaningNepali": "समारोह", "kanjiCharacters": ["式"], "partOfSpeech": "Noun"},
  {"id": "v31_15", "lesson": 31, "level": "N4", "word": "本社", "reading": "ほんしゃ", "meaning": "Head office", "meaningNepali": "प्रधान कार्यालय", "kanjiCharacters": ["本", "社"], "partOfSpeech": "Noun"},
  {"id": "v31_16", "lesson": 31, "level": "N4", "word": "支店", "reading": "してん", "meaning": "Branch office", "meaningNepali": "शाखा कार्यालय", "kanjiCharacters": ["支", "店"], "partOfSpeech": "Noun"},
  {"id": "v31_17", "lesson": 31, "level": "N4", "word": "教会", "reading": "きょうかい", "meaning": "Church", "meaningNepali": "गिरजाघर", "kanjiCharacters": ["教", "会"], "partOfSpeech": "Noun"},
  {"id": "v31_18", "lesson": 31, "level": "N4", "word": "大学院", "reading": "だいがくいん", "meaning": "Graduate school", "meaningNepali": "स्नातकोत्तर तह", "kanjiCharacters": ["大", "学", "院"], "partOfSpeech": "Noun"},
  {"id": "v31_19", "lesson": 31, "level": "N4", "word": "温泉", "reading": "おんせん", "meaning": "Hot spring", "meaningNepali": "तातोपानी कुण्ड", "kanjiCharacters": ["温", "泉"], "partOfSpeech": "Noun"},
  {"id": "v31_20", "lesson": 31, "level": "N4", "word": "帰り", "reading": "かえり", "meaning": "Return / Way back", "meaningNepali": "फर्किने बाटो", "kanjiCharacters": ["帰"], "partOfSpeech": "Noun"},
  {"id": "v31_21", "lesson": 31, "level": "N4", "word": "お子さん", "reading": "おこさん", "meaning": "Someone else's child", "meaningNepali": "बच्चा (आदरणीय)", "kanjiCharacters": ["子"], "partOfSpeech": "Noun"},
  {"id": "v31_22", "lesson": 31, "level": "N4", "word": "〜のほう", "reading": "〜のほう", "meaning": "Direction / Side", "meaningNepali": "तिर", "kanjiCharacters": [], "partOfSpeech": "Suffix"},
  {"id": "v31_23", "lesson": 31, "level": "N4", "word": "ずっと", "reading": "ずっと", "meaning": "All the time / By far", "meaningNepali": "सधैँभरि", "kanjiCharacters": [], "partOfSpeech": "Adverb"},
  {"id": "v31_24", "lesson": 31, "level": "N4", "word": "残ります", "reading": "のこります", "meaning": "Remain / Stay behind", "meaningNepali": "बाँकी रहनु", "kanjiCharacters": ["残"], "partOfSpeech": "Verb"},
  {"id": "v31_25", "lesson": 31, "level": "N4", "word": "月に", "reading": "つきに", "meaning": "Per month", "meaningNepali": "प्रति महिना", "kanjiCharacters": ["月"], "partOfSpeech": "Adverb"},
  {"id": "v31_26", "lesson": 31, "level": "N4", "word": "普通", "reading": "ふつうの", "meaning": "Ordinary / Normal", "meaningNepali": "साधारण", "kanjiCharacters": ["普", "通"], "partOfSpeech": "Adj"},
  {"id": "v31_27", "lesson": 31, "level": "N4", "word": "インターネット", "reading": "インターネット", "meaning": "Internet", "meaningNepali": "इन्टरनेट", "kanjiCharacters": [], "partOfSpeech": "Noun"},
  {"id": "v31_28", "lesson": 31, "level": "N4", "word": "夢", "reading": "ゆめ", "meaning": "Dream", "meaningNepali": "सपना", "kanjiCharacters": ["夢"], "partOfSpeech": "Noun"},
  {"id": "v31_29", "lesson": 31, "level": "N4", "word": "天才", "reading": "てんさい", "meaning": "Genius", "meaningNepali": "प्रतिभाशाली", "kanjiCharacters": ["天", "才"], "partOfSpeech": "Noun"},
  {"id": "v31_30", "lesson": 31, "level": "N4", "word": "応援します", "reading": "おうえんします", "meaning": "Support / Cheer", "meaningNepali": "समर्थन गर्नु", "kanjiCharacters": ["応", "援"], "partOfSpeech": "Verb"},
  {"id": "v31_31", "lesson": 31, "level": "N4", "word": "飛行機", "reading": "ひこうき", "meaning": "Airplane", "meaningNepali": "हवाईजहाज", "kanjiCharacters": ["飛", "行", "機"], "partOfSpeech": "Noun"},
  {"id": "v31_32", "lesson": 31, "level": "N4", "word": "宇宙", "reading": "うちゅう", "meaning": "Space / Universe", "meaningNepali": "अन्तरिक्ष", "kanjiCharacters": ["宇", "宙"], "partOfSpeech": "Noun"},
  {"id": "v31_33", "lesson": 31, "level": "N4", "word": "景色", "reading": "けしき", "meaning": "Scenery", "meaningNepali": "दृश्य", "kanjiCharacters": ["景", "色"], "partOfSpeech": "Noun"},
  {"id": "v31_34", "lesson": 31, "level": "N4", "word": "月", "reading": "つき", "meaning": "Moon", "meaningNepali": "चन्द्रमा", "kanjiCharacters": ["月"], "partOfSpeech": "Noun"},
  {"id": "v31_35", "lesson": 31, "level": "N4", "word": "太陽", "reading": "たいよう", "meaning": "Sun", "meaningNepali": "सूर्य", "kanjiCharacters": ["太", "陽"], "partOfSpeech": "Noun"},
  {"id": "v31_36", "lesson": 31, "level": "N4", "word": "星", "reading": "ほし", "meaning": "Star", "meaningNepali": "तारा", "kanjiCharacters": ["星"], "partOfSpeech": "Noun"},
  {"id": "v31_37", "lesson": 31, "level": "N4", "word": "地球", "reading": "ちきゅう", "meaning": "Earth", "meaningNepali": "पृथ्वी", "kanjiCharacters": ["地", "球"], "partOfSpeech": "Noun"},
  {"id": "v31_38", "lesson": 31, "level": "N4", "word": "世界", "reading": "せかい", "meaning": "World", "meaningNepali": "संसार", "kanjiCharacters": ["世", "界"], "partOfSpeech": "Noun"},
  {"id": "v31_39", "lesson": 31, "level": "N4", "word": "貿易", "reading": "ぼうえき", "meaning": "Foreign trade", "meaningNepali": "व्यापार", "kanjiCharacters": ["貿", "易"], "partOfSpeech": "Noun"},
  {"id": "v31_40", "lesson": 31, "level": "N4", "word": "政治", "reading": "せいじ", "meaning": "Politics", "meaningNepali": "राजनीति", "kanjiCharacters": ["政", "治"], "partOfSpeech": "Noun"},
  {"id": "v31_41", "lesson": 31, "level": "N4", "word": "経済", "reading": "けいざい", "meaning": "Economy", "meaningNepali": "अर्थशास्त्र", "kanjiCharacters": ["経", "済"], "partOfSpeech": "Noun"},
  {"id": "v31_42", "lesson": 31, "level": "N4", "word": "法律", "reading": "ほうりつ", "meaning": "Law", "meaningNepali": "कानुन", "kanjiCharacters": ["法", "律"], "partOfSpeech": "Noun"},

    // ════════════════════════════════════
  // LESSON 32 — FULL TEXTBOOK VOCABULARY SHEET (42 WORDS)
  // ════════════════════════════════════
  {"id": "v32_1", "lesson": 32, "level": "N4", "word": "運動します", "reading": "うんどうします", "meaning": "Exercise / Take exercise", "meaningNepali": "व्यायाम गर्नु", "kanjiCharacters": ["運", "動"], "partOfSpeech": "Verb"},
  {"id": "v32_2", "lesson": 32, "level": "N4", "word": "成功します", "reading": "せいこうします", "meaning": "Succeed", "meaningNepali": "सफल हुनु", "kanjiCharacters": ["成", "功"], "partOfSpeech": "Verb"},
  {"id": "v32_3", "lesson": 32, "level": "N4", "word": "失敗します", "reading": "しっぱいします", "meaning": "Fail [an exam]", "meaningNepali": "असफल हुनु", "kanjiCharacters": ["失", "敗"], "partOfSpeech": "Verb"},
  {"id": "v32_4", "lesson": 32, "level": "N4", "word": "合格します", "reading": "ごうかくします", "meaning": "Pass [an exam]", "meaningNepali": "उत्तीर्ण हुनु", "kanjiCharacters": ["合", "格"], "partOfSpeech": "Verb"},
  {"id": "v32_5", "lesson": 32, "level": "N4", "word": "戻ります", "reading": "もどります", "meaning": "Return / Come back", "meaningNepali": "फर्कनु", "kanjiCharacters": ["戻"], "partOfSpeech": "Verb"},
  {"id": "v32_6", "lesson": 32, "level": "N4", "word": "やみます", "reading": "やみます", "meaning": "[Rain] Stop", "meaningNepali": "पानी रोकिनु", "kanjiCharacters": [], "partOfSpeech": "Verb"},
  {"id": "v32_7", "lesson": 32, "level": "N4", "word": "晴れます", "reading": "はれます", "meaning": "Clear up / Become sunny", "meaningNepali": "मौसम खुल्नु", "kanjiCharacters": ["晴"], "partOfSpeech": "Verb"},
  {"id": "v32_8", "lesson": 32, "level": "N4", "word": "曇ります", "reading": "くもります", "meaning": "Become cloudy", "meaningNepali": "बादल लाग्नु", "kanjiCharacters": ["曇"], "partOfSpeech": "Verb"},
  {"id": "v32_9", "lesson": 32, "level": "N4", "word": "吹きます", "reading": "ふきます", "meaning": "[Wind] Blow", "meaningNepali": "हावा चल्नु", "kanjiCharacters": ["吹"], "partOfSpeech": "Verb"},
  {"id": "v32_10", "lesson": 32, "level": "N4", "word": "病気", "reading": "びょうき", "meaning": "Illness / Sickness", "meaningNepali": "बिरामी", "kanjiCharacters": ["病", "気"], "partOfSpeech": "Noun"},
  {"id": "v32_11", "lesson": 32, "level": "N4", "word": "熱", "reading": "ねつ", "meaning": "Fever / Heat", "meaningNepali": "ज्वरो", "kanjiCharacters": ["熱"], "partOfSpeech": "Noun"},
  {"id": "v32_12", "lesson": 32, "level": "N4", "word": "火傷", "reading": "やけど", "meaning": "Burn injury", "meaningNepali": "पोलेको चोट", "kanjiCharacters": ["火", "傷"], "partOfSpeech": "Noun"},
  {"id": "v32_13", "lesson": 32, "level": "N4", "word": "けが", "reading": "けが", "meaning": "Injury", "meaningNepali": "चोटपटक", "kanjiCharacters": [], "partOfSpeech": "Noun"},
  {"id": "v32_14", "lesson": 32, "level": "N4", "word": "咳", "reading": "せき", "meaning": "Cough", "meaningNepali": "खोकी", "kanjiCharacters": ["咳"], "partOfSpeech": "Noun"},
  {"id": "v32_15", "lesson": 32, "level": "N4", "word": "インフルエンザ", "reading": "インフルエンザ", "meaning": "Influenza / Flu", "meaningNepali": "फ्लु", "kanjiCharacters": [], "partOfSpeech": "Noun"},
  {"id": "v32_16", "lesson": 32, "level": "N4", "word": "太陽", "reading": "たいよう", "meaning": "Sun", "meaningNepali": "सूर्य", "kanjiCharacters": ["太", "陽"], "partOfSpeech": "Noun"},
  {"id": "v32_17", "lesson": 32, "level": "N4", "word": "星", "reading": "ほし", "meaning": "Star", "meaningNepali": "तारा", "kanjiCharacters": ["星"], "partOfSpeech": "Noun"},
  {"id": "v32_18", "lesson": 32, "level": "N4", "word": "月", "reading": "つき", "meaning": "Moon", "meaningNepali": "चन्द्रमा", "kanjiCharacters": ["月"], "partOfSpeech": "Noun"},
  {"id": "v32_19", "lesson": 32, "level": "N4", "word": "風", "reading": "かぜ", "meaning": "Wind", "meaningNepali": "हावा", "kanjiCharacters": ["風"], "partOfSpeech": "Noun"},
  {"id": "v32_20", "lesson": 32, "level": "N4", "word": "北", "reading": "きた", "meaning": "North", "meaningNepali": "उत्तर", "kanjiCharacters": ["北"], "partOfSpeech": "Noun"},
  {"id": "v32_21", "lesson": 32, "level": "N4", "word": "南", "reading": "みなみ", "meaning": "South", "meaningNepali": "दक्षिण", "kanjiCharacters": ["南"], "partOfSpeech": "Noun"},
  {"id": "v32_22", "lesson": 32, "level": "N4", "word": "東", "reading": "ひがし", "meaning": "East", "meaningNepali": "पूर्व", "kanjiCharacters": ["東"], "partOfSpeech": "Noun"},
  {"id": "v32_23", "lesson": 32, "level": "N4", "word": "西", "reading": "にし", "meaning": "West", "meaningNepali": "पश्चिम", "kanjiCharacters": ["西"], "partOfSpeech": "Noun"},
  {"id": "v32_24", "lesson": 32, "level": "N4", "word": "水道", "reading": "すいどう", "meaning": "Water supply / Tap", "meaningNepali": "खानेपानी", "kanjiCharacters": ["水", "道"], "partOfSpeech": "Noun"},
  {"id": "v32_25", "lesson": 32, "level": "N4", "word": "エンジン", "reading": "エンジン", "meaning": "Engine", "meaningNepali": "इन्जिन", "kanjiCharacters": [], "partOfSpeech": "Noun"},
  {"id": "v32_26", "lesson": 32, "level": "N4", "word": "チーム", "reading": "チーム", "meaning": "Team", "meaningNepali": "टोली", "kanjiCharacters": [], "partOfSpeech": "Noun"},
  {"id": "v32_27", "lesson": 32, "level": "N4", "word": "今夜", "reading": "こんや", "meaning": "Tonight", "meaningNepali": "आज राति", "kanjiCharacters": ["今", "夜"], "partOfSpeech": "Noun"},
  {"id": "v32_28", "lesson": 32, "level": "N4", "word": "夕方", "reading": "ゆうがた", "meaning": "Late afternoon / Evening", "meaningNepali": "साँझपख", "kanjiCharacters": ["夕", "方"], "partOfSpeech": "Noun"},
  {"id": "v32_29", "lesson": 32, "level": "N4", "word": "前", "reading": "まえ", "meaning": "Before / Ago", "meaningNepali": "अघि", "kanjiCharacters": ["前"], "partOfSpeech": "Noun"},
  {"id": "v32_30", "lesson": 32, "level": "N4", "word": "遅く", "reading": "おそく", "meaning": "Late (time)", "meaningNepali": "ढिलो गरी", "kanjiCharacters": ["遅"], "partOfSpeech": "Adverb"},
  {"id": "v32_31", "lesson": 32, "level": "N4", "word": "こんなに", "reading": "こんなに", "meaning": "Like this (degree)", "meaningNepali": "यति धेरै", "kanjiCharacters": [], "partOfSpeech": "Adverb"},
  {"id": "v32_32", "lesson": 32, "level": "N4", "word": "そんなに", "reading": "そんなに", "meaning": "Like that (degree)", "meaningNepali": "त्यति धेरै", "kanjiCharacters": [], "partOfSpeech": "Adverb"},
  {"id": "v32_33", "lesson": 32, "level": "N4", "word": "あんなに", "reading": "あんなに", "meaning": "Like that (far degree)", "meaningNepali": "ऊ त्यति धेरै", "kanjiCharacters": [], "partOfSpeech": "Adverb"},
  {"id": "v32_34", "lesson": 32, "level": "N4", "word": "ヨーロッパ", "reading": "ヨーロッパ", "meaning": "Europe", "meaningNepali": "युरोप", "kanjiCharacters": [], "partOfSpeech": "Noun"},
  {"id": "v32_35", "lesson": 32, "level": "N4", "word": "元気", "reading": "げんき", "meaning": "Healthy / Vigorous", "meaningNepali": "निरोगी", "kanjiCharacters": ["元", "気"], "partOfSpeech": "Adj"},
  {"id": "v32_36", "lesson": 32, "level": "N4", "word": "無理をします", "reading": "むりをします", "meaning": "Overdo things / Strain", "meaningNepali": "जबर्जस्ती गर्नु", "kanjiCharacters": ["無", "理"], "partOfSpeech": "Verb"},
  {"id": "v32_37", "lesson": 32, "level": "N4", "word": "胃", "reading": "い", "meaning": "Stomach", "meaningNepali": "पेट", "kanjiCharacters": ["胃"], "partOfSpeech": "Noun"},
  {"id": "v32_38", "lesson": 32, "level": "N4", "word": "ストレス", "reading": "ストレス", "meaning": "Stress", "meaningNepali": "तनाव", "kanjiCharacters": [], "partOfSpeech": "Noun"},
  {"id": "v32_39", "lesson": 32, "level": "N4", "word": "それはいけませんね", "reading": "それはいけませんね", "meaning": "That's too bad", "meaningNepali": "त्यो त नराम्रो भयो", "kanjiCharacters": [], "partOfSpeech": "Expression"},
  {"id": "v32_40", "lesson": 32, "level": "N4", "word": "星占い", "reading": "ほしうらない", "meaning": "Horoscope / Astrology", "meaningNepali": "राशिफल", "kanjiCharacters": ["星", "占"], "partOfSpeech": "Noun"},
  {"id": "v32_41", "lesson": 32, "level": "N4", "word": "牡牛座", "reading": "おうしざ", "meaning": "Taurus (constellation)", "meaningNepali": "वृष राशि", "kanjiCharacters": ["牛", "座"], "partOfSpeech": "Noun"},
  {"id": "v32_42", "lesson": 32, "level": "N4", "word": "宝くじ", "reading": "たからくじ", "meaning": "Lottery ticket", "meaningNepali": "चिठ्ठा", "kanjiCharacters": ["宝"], "partOfSpeech": "Noun"},

    // ════════════════════════════════════
  // LESSON 33 — FULL TEXTBOOK VOCABULARY SHEET (42 WORDS)
  // ════════════════════════════════════
  {"id": "v33_1", "lesson": 33, "level": "N4", "word": "逃げます", "reading": "にげます", "meaning": "Run away / Escape", "meaningNepali": "भाग्नु", "kanjiCharacters": ["逃"], "partOfSpeech": "Verb"},
  {"id": "v33_2", "lesson": 33, "level": "N4", "word": "騒ぎます", "reading": "さわぎます", "meaning": "Make a noise / Clamor", "meaningNepali": "हल्ला गर्नु", "kanjiCharacters": ["騒"], "partOfSpeech": "Verb"},
  {"id": "v33_3", "lesson": 33, "level": "N4", "word": "あきらめます", "reading": "あきらめます", "meaning": "Give up", "meaningNepali": "हार मान्नु", "kanjiCharacters": [], "partOfSpeech": "Verb"},
  {"id": "v33_4", "lesson": 33, "level": "N4", "word": "投げます", "reading": "なげます", "meaning": "Throw", "meaningNepali": "फ्याँक्नु", "kanjiCharacters": ["投"], "partOfSpeech": "Verb"},
  {"id": "v33_5", "lesson": 33, "level": "N4", "word": "守ります", "reading": "まもります", "meaning": "Keep / Protect / Obey", "meaningNepali": "पालना गर्नु / रक्षा गर्नु", "kanjiCharacters": ["守"], "partOfSpeech": "Verb"},
  {"id": "v33_6", "lesson": 33, "level": "N4", "word": "上げます", "reading": "あげます", "meaning": "Raise / Lift", "meaningNepali": "उठाउनु", "kanjiCharacters": ["上"], "partOfSpeech": "Verb"},
  {"id": "v33_7", "lesson": 33, "level": "N4", "word": "下げます", "reading": "さげます", "meaning": "Lower", "meaningNepali": "घटाउनु", "kanjiCharacters": ["下"], "partOfSpeech": "Verb"},
  {"id": "v33_8", "lesson": 33, "level": "N4", "word": "伝えます", "reading": "つたえます", "meaning": "Convey / Pass on message", "meaningNepali": "सन्देश पुर्‍याउनु", "kanjiCharacters": ["伝"], "partOfSpeech": "Verb"},
  {"id": "v33_9", "lesson": 33, "level": "N4", "word": "注意します", "reading": "ちゅういします", "meaning": "Be careful / Pay attention", "meaningNepali": "सावधान हुनु", "kanjiCharacters": ["注", "意"], "partOfSpeech": "Verb"},
  {"id": "v33_10", "lesson": 33, "level": "N4", "word": "外します", "reading": "はずします", "meaning": "Be away [from desk]", "meaningNepali": "छोड्नु", "kanjiCharacters": ["外"], "partOfSpeech": "Verb"},
  {"id": "v33_11", "lesson": 33, "level": "N4", "word": "席を外します", "reading": "せきをはずします", "meaning": "Leave one's seat", "meaningNepali": "सीट छोड्नु", "kanjiCharacters": ["席", "外"], "partOfSpeech": "Verb"},
  {"id": "v33_12", "lesson": 33, "level": "N4", "word": "締め切ります", "reading": "しめきります", "meaning": "Close / Deadline", "meaningNepali": "म्याद सकिनु", "kanjiCharacters": ["締", "切"], "partOfSpeech": "Verb"},
  {"id": "v33_13", "lesson": 33, "level": "N4", "word": "規則", "reading": "きそく", "meaning": "Rule / Regulation", "meaningNepali": "नियम", "kanjiCharacters": ["規", "則"], "partOfSpeech": "Noun"},
  {"id": "v33_14", "lesson": 33, "level": "N4", "word": "危険", "reading": "きけん", "meaning": "Danger / Hazardous", "meaningNepali": "खतरा", "kanjiCharacters": ["危", "険"], "partOfSpeech": "Adj"},
  {"id": "v33_15", "lesson": 33, "level": "N4", "word": "使用禁止", "reading": "しようきんし", "meaning": "Do not use / Out of service", "meaningNepali": "प्रयोग निषेध", "kanjiCharacters": ["使", "用", "禁", "止"], "partOfSpeech": "Noun"},
  {"id": "v33_16", "lesson": 33, "level": "N4", "word": "立入禁止", "reading": "たちいりきんし", "meaning": "No entry / Keep out", "meaningNepali": "प्रवेश निषेध", "kanjiCharacters": ["立", "入", "禁", "止"], "partOfSpeech": "Noun"},
  {"id": "v33_17", "lesson": 33, "level": "N4", "word": "非常口", "reading": "ひじょうぐち", "meaning": "Emergency exit", "meaningNepali": "आपत्कालीन ढोका", "kanjiCharacters": ["非", "常", "口"], "partOfSpeech": "Noun"},
  {"id": "v33_18", "lesson": 33, "level": "N4", "word": "無料", "reading": "むりょう", "meaning": "Free of charge", "meaningNepali": "नि:शुल्क", "kanjiCharacters": ["無", "料"], "partOfSpeech": "Noun"},
  {"id": "v33_19", "lesson": 33, "level": "N4", "word": "割引", "reading": "わりびき", "meaning": "Discount", "meaningNepali": "छुट", "kanjiCharacters": ["割", "引"], "partOfSpeech": "Noun"},
  {"id": "v33_20", "lesson": 33, "level": "N4", "word": "飲み放題", "reading": "のみほうだい", "meaning": "All-you-can-drink", "meaningNepali": "असीमित पेय", "kanjiCharacters": ["飲", "放", "題"], "partOfSpeech": "Noun"},
  {"id": "v33_21", "lesson": 33, "level": "N4", "word": "使用中", "reading": "しようちゅう", "meaning": "In use / Occupied", "meaningNepali": "प्रयोग भइरहेको", "kanjiCharacters": ["使", "用", "中"], "partOfSpeech": "Noun"},
  {"id": "v33_22", "lesson": 33, "level": "N4", "word": "募集中", "reading": "ぼしゅうちゅう", "meaning": "Hiring / Applications wanted", "meaningNepali": "भर्ना भइरहेको", "kanjiCharacters": ["募", "集", "中"], "partOfSpeech": "Noun"},
  {"id": "v33_23", "lesson": 33, "level": "N4", "word": "〜中", "reading": "〜ちゅう", "meaning": "In the middle of ~", "meaningNepali": "~ भइरहेको", "kanjiCharacters": ["中"], "partOfSpeech": "Suffix"},
  {"id": "v33_24", "lesson": 33, "level": "N4", "word": "どういう", "reading": "どういう", "meaning": "What kind of / What meaning", "meaningNepali": "कस्तो किसिमको", "kanjiCharacters": [], "partOfSpeech": "Adverb"},
  {"id": "v33_25", "lesson": 33, "level": "N4", "word": "いくら", "reading": "いくら", "meaning": "However much ~", "meaningNepali": "जतिसुकै भए पनि", "kanjiCharacters": [], "partOfSpeech": "Adverb"},
  {"id": "v33_26", "lesson": 33, "level": "N4", "word": "もう", "reading": "もう", "meaning": "Not ~ any more", "meaningNepali": "अब ~ छैन", "kanjiCharacters": [], "partOfSpeech": "Adverb"},
  {"id": "v33_27", "lesson": 33, "level": "N4", "word": "あと", "reading": "あと", "meaning": "~ left / ~ remaining", "meaningNepali": "बाँकी", "kanjiCharacters": [], "partOfSpeech": "Adverb"},
  {"id": "v33_28", "lesson": 33, "level": "N4", "word": "標識", "reading": "ひょうしき", "meaning": "Signboard / Mark", "meaningNepali": "चिह्न", "kanjiCharacters": ["標", "識"], "partOfSpeech": "Noun"},
  {"id": "v33_29", "lesson": 33, "level": "N4", "word": "警察", "reading": "けいさつ", "meaning": "Police", "meaningNepali": "प्रहरी", "kanjiCharacters": ["警", "察"], "partOfSpeech": "Noun"},
  {"id": "v33_30", "lesson": 33, "level": "N4", "word": "駐車違反", "reading": "ちゅうしゃいはん", "meaning": "Parking violation", "meaningNepali": "पार्किङ नियम उल्लङ्घन", "kanjiCharacters": ["駐", "車", "違", "反"], "partOfSpeech": "Noun"},
  {"id": "v33_31", "lesson": 33, "level": "N4", "word": "罰金", "reading": "ばっきん", "meaning": "Fine / Penalty money", "meaningNepali": "जरिवाना", "kanjiCharacters": ["罰", "金"], "partOfSpeech": "Noun"},
  {"id": "v33_32", "lesson": 33, "level": "N4", "word": "電報", "reading": "でんぽう", "meaning": "Telegram", "meaningNepali": "तार सन्देश", "kanjiCharacters": ["電", "報"], "partOfSpeech": "Noun"},
  {"id": "v33_33", "lesson": 33, "level": "N4", "word": "人々", "reading": "ひとびと", "meaning": "People", "meaningNepali": "मानिसहरू", "kanjiCharacters": ["人"], "partOfSpeech": "Noun"},
  {"id": "v33_34", "lesson": 33, "level": "N4", "word": "急用", "reading": "きゅうよう", "meaning": "Urgent business", "meaningNepali": "जरुरी काम", "kanjiCharacters": ["急", "用"], "partOfSpeech": "Noun"},
  {"id": "v33_35", "lesson": 33, "level": "N4", "word": "打ちます", "reading": "うちます", "meaning": "Send [a telegram]", "meaningNepali": "पठाउनु", "kanjiCharacters": ["打"], "partOfSpeech": "Verb"},
  {"id": "v33_36", "lesson": 33, "level": "N4", "word": "電報代", "reading": "でんぽうだい", "meaning": "Telegram charge", "meaningNepali": "तार महसुल", "kanjiCharacters": ["電", "報", "代"], "partOfSpeech": "Noun"},
  {"id": "v33_37", "lesson": 33, "level": "N4", "word": "できるだけ", "reading": "できるだけ", "meaning": "As much as possible", "meaningNepali": "सकेसम्म", "kanjiCharacters": [], "partOfSpeech": "Adverb"},
  {"id": "v33_38", "lesson": 33, "level": "N4", "word": "短く", "reading": "みじかく", "meaning": "Short / Concisely", "meaningNepali": "छोटकरीमा", "kanjiCharacters": ["短"], "partOfSpeech": "Adverb"},
  {"id": "v33_39", "lesson": 33, "level": "N4", "word": "また", "reading": "また", "meaning": "And / Furthermore", "meaningNepali": "साथै", "kanjiCharacters": [], "partOfSpeech": "Conjunction"},
  {"id": "v33_40", "lesson": 33, "level": "N4", "word": "例えば", "reading": "たとえば", "meaning": "For example", "meaningNepali": "उदाहरणका लागि", "kanjiCharacters": ["例"], "partOfSpeech": "Adverb"},
  {"id": "v33_41", "lesson": 33, "level": "N4", "word": "キトク", "reading": "キトク", "meaning": "Critically ill (telegram)", "meaningNepali": "गम्भीर बिरामी", "kanjiCharacters": [], "partOfSpeech": "Noun"},
  {"id": "v33_42", "lesson": 33, "level": "N4", "word": "重体", "reading": "じゅうたい", "meaning": "Seriously ill condition", "meaningNepali": "गम्भीर अवस्था", "kanjiCharacters": ["重", "体"], "partOfSpeech": "Noun"},

    // ════════════════════════════════════
  // LESSON 34 — FULL TEXTBOOK VOCABULARY SHEET (42 WORDS)
  // ════════════════════════════════════
  {"id": "v34_1", "lesson": 34, "level": "N4", "word": "磨きます", "reading": "みがきます", "meaning": "Brush [teeth] / Polish", "meaningNepali": "माझ्नु / माझ्नु", "kanjiCharacters": ["磨"], "partOfSpeech": "Verb"},
  {"id": "v34_2", "lesson": 34, "level": "N4", "word": "組み立てます", "reading": "くみたてます", "meaning": "Assemble", "meaningNepali": "जोड्नु", "kanjiCharacters": ["組", "立"], "partOfSpeech": "Verb"},
  {"id": "v34_3", "lesson": 34, "level": "N4", "word": "折ります", "reading": "おります", "meaning": "Fold / Break", "meaningNepali": "मोड्नु / भाच्नु", "kanjiCharacters": ["折"], "partOfSpeech": "Verb"},
  {"id": "v34_4", "lesson": 34, "level": "N4", "word": "気がつきます", "reading": "きがつきます", "meaning": "Notice / Become aware", "meaningNepali": "ख्याल गर्नु", "kanjiCharacters": ["気", "付"], "partOfSpeech": "Verb"},
  {"id": "v34_5", "lesson": 34, "level": "N4", "word": "つけます", "reading": "つけます", "meaning": "Put in [soy sauce]", "meaningNepali": "हाल्नु", "kanjiCharacters": [], "partOfSpeech": "Verb"},
  {"id": "v34_6", "lesson": 34, "level": "N4", "word": "見つかります", "reading": "みつかります", "meaning": "Be found", "meaningNepali": "फेला पर्नु", "kanjiCharacters": ["見"], "partOfSpeech": "Verb"},
  {"id": "v34_7", "lesson": 34, "level": "N4", "word": "質問します", "reading": "しつもんします", "meaning": "Ask a question", "meaningNepali": "प्रश्न सोध्नु", "kanjiCharacters": ["質", "問"], "partOfSpeech": "Verb"},
  {"id": "v34_8", "lesson": 34, "level": "N4", "word": "させます", "reading": "させます", "meaning": "Make / Let do", "meaningNepali": "गराउनु", "kanjiCharacters": [], "partOfSpeech": "Verb"},
  {"id": "v34_9", "lesson": 34, "level": "N4", "word": "矢印", "reading": "やじるし", "meaning": "Arrow sign", "meaningNepali": "तीरको चिह्न", "kanjiCharacters": ["矢", "印"], "partOfSpeech": "Noun"},
  {"id": "v34_10", "lesson": 34, "level": "N4", "word": "醤油", "reading": "しょうゆ", "meaning": "Soy sauce", "meaningNepali": "सोया सस", "kanjiCharacters": ["醬", "油"], "partOfSpeech": "Noun"},
  {"id": "v34_11", "lesson": 34, "level": "N4", "word": "ソース", "reading": "ソース", "meaning": "Sauce", "meaningNepali": "सस", "kanjiCharacters": [], "partOfSpeech": "Noun"},
  {"id": "v34_12", "lesson": 34, "level": "N4", "word": "〜か〜", "reading": "〜か〜", "meaning": "~ or ~", "meaningNepali": "~ वा ~", "kanjiCharacters": [], "partOfSpeech": "Particle"},
  {"id": "v34_13", "lesson": 34, "level": "N4", "word": "紺", "reading": "こん", "meaning": "Navy blue", "meaningNepali": "गाढा नीलो", "kanjiCharacters": ["紺"], "partOfSpeech": "Noun"},
  {"id": "v34_14", "lesson": 34, "level": "N4", "word": "水色", "reading": "みずいろ", "meaning": "Light blue", "meaningNepali": "हल्का नीलो", "kanjiCharacters": ["水", "色"], "partOfSpeech": "Noun"},
  {"id": "v34_15", "lesson": 34, "level": "N4", "word": "黄色", "reading": "きいろ", "meaning": "Yellow", "meaningNepali": "पहेंलो", "kanjiCharacters": ["黄", "色"], "partOfSpeech": "Noun"},
  {"id": "v34_16", "lesson": 34, "level": "N4", "word": "茶色", "reading": "ちゃいろ", "meaning": "Brown", "meaningNepali": "खैरो", "kanjiCharacters": ["茶", "色"], "partOfSpeech": "Noun"},
  {"id": "v34_17", "lesson": 34, "level": "N4", "word": "苦い", "reading": "にがい", "meaning": "Bitter", "meaningNepali": "तीतो", "kanjiCharacters": ["苦"], "partOfSpeech": "Adj"},
  {"id": "v34_18", "lesson": 34, "level": "N4", "word": "濃い", "reading": "こい", "meaning": "Strong (taste) / Dark", "meaningNepali": "गाढा", "kanjiCharacters": ["濃"], "partOfSpeech": "Adj"},
  {"id": "v34_19", "lesson": 34, "level": "N4", "word": "薄い", "reading": "うすい", "meaning": "Weak (taste) / Light", "meaningNepali": "हल्का", "kanjiCharacters": ["薄"], "partOfSpeech": "Adj"},
  {"id": "v34_20", "lesson": 34, "level": "N4", "word": "理由", "reading": "りゆう", "meaning": "Reason", "meaningNepali": "कारण", "kanjiCharacters": ["理", "由"], "partOfSpeech": "Noun"},
  {"id": "v34_21", "lesson": 34, "level": "N4", "word": "途中で", "reading": "とちゅうで", "meaning": "On the way / In middle of", "meaningNepali": "बाटोमा", "kanjiCharacters": ["途", "中"], "partOfSpeech": "Adverb"},
  {"id": "v34_22", "lesson": 34, "level": "N4", "word": "係員", "reading": "かかりいん", "meaning": "Person in charge", "meaningNepali": "जिम्मेवार व्यक्ति", "kanjiCharacters": ["係", "員"], "partOfSpeech": "Noun"},
  {"id": "v34_23", "lesson": 34, "level": "N4", "word": "卒業式", "reading": "そつぎょうしき", "meaning": "Graduation ceremony", "meaningNepali": "दीक्षान्त समारोह", "kanjiCharacters": ["卒", "業", "式"], "partOfSpeech": "Noun"},
  {"id": "v34_24", "lesson": 34, "level": "N4", "word": "招待状", "reading": "しょうたいじょう", "meaning": "Invitation card", "meaningNepali": "निमन्त्रणा कार्ड", "kanjiCharacters": ["招", "待", "状"], "partOfSpeech": "Noun"},
  {"id": "v34_25", "lesson": 34, "level": "N4", "word": "結婚指輪", "reading": "けっこんゆびわ", "meaning": "Wedding ring", "meaningNepali": "विवाहको औंठी", "kanjiCharacters": ["結", "婚", "指", "輪"], "partOfSpeech": "Noun"},
  {"id": "v34_26", "lesson": 34, "level": "N4", "word": "家具", "reading": "かぐ", "meaning": "Furniture", "meaningNepali": "फर्निचर", "kanjiCharacters": ["家", "具"], "partOfSpeech": "Noun"},
  {"id": "v34_27", "lesson": 34, "level": "N4", "word": "キー", "reading": "キー", "meaning": "Key", "meaningNepali": "साँचो", "kanjiCharacters": [], "partOfSpeech": "Noun"},
  {"id": "v34_28", "lesson": 34, "level": "N4", "word": "糸", "reading": "いと", "meaning": "Thread / String", "meaningNepali": "धागो", "kanjiCharacters": ["糸"], "partOfSpeech": "Noun"},
  {"id": "v34_29", "lesson": 34, "level": "N4", "word": "クラブ", "reading": "クラブ", "meaning": "Club", "meaningNepali": "क्लब", "kanjiCharacters": [], "partOfSpeech": "Noun"},
  {"id": "v34_30", "lesson": 34, "level": "N4", "word": "スポーツクラブ", "reading": "スポーツクラブ", "meaning": "Sports club", "meaningNepali": "खेलकुद क्लब", "kanjiCharacters": [], "partOfSpeech": "Noun"},
  {"id": "v34_31", "lesson": 34, "level": "N4", "word": "城", "reading": "しろ", "meaning": "Castle", "meaningNepali": "दरबार / किल्ला", "kanjiCharacters": ["城"], "partOfSpeech": "Noun"},
  {"id": "v34_32", "lesson": 34, "level": "N4", "word": "説明書", "reading": "せつめいしょ", "meaning": "Instruction manual", "meaningNepali": "निर्देशिका", "kanjiCharacters": ["説", "明", "書"], "partOfSpeech": "Noun"},
  {"id": "v34_33", "lesson": 34, "level": "N4", "word": "図", "reading": "ず", "meaning": "Figure / Diagram", "meaningNepali": "चित्र", "kanjiCharacters": ["図"], "partOfSpeech": "Noun"},
  {"id": "v34_34", "lesson": 34, "level": "N4", "word": "線", "reading": "せん", "meaning": "Line", "meaningNepali": "रेखा", "kanjiCharacters": ["線"], "partOfSpeech": "Noun"},
  {"id": "v34_35", "lesson": 34, "level": "N4", "word": "細い", "reading": "ほそい", "meaning": "Thin / Fine", "meaningNepali": "पातलो", "kanjiCharacters": ["細"], "partOfSpeech": "Adj"},
  {"id": "v34_36", "lesson": 34, "level": "N4", "word": "太い", "reading": "ふとい", "meaning": "Thick / Fat", "meaningNepali": "मोटो", "kanjiCharacters": ["太"], "partOfSpeech": "Adj"},
  {"id": "v34_37", "lesson": 34, "level": "N4", "word": "黒", "reading": "くろ", "meaning": "Black", "meaningNepali": "कालो", "kanjiCharacters": ["黒"], "partOfSpeech": "Noun"},
  {"id": "v34_38", "lesson": 34, "level": "N4", "word": "白", "reading": "しろ", "meaning": "White", "meaningNepali": "सेतो", "kanjiCharacters": ["白"], "partOfSpeech": "Noun"},
  {"id": "v34_39", "lesson": 34, "level": "N4", "word": "赤", "reading": "あか", "meaning": "Red", "meaningNepali": "रातो", "kanjiCharacters": ["赤"], "partOfSpeech": "Noun"},
  {"id": "v34_40", "lesson": 34, "level": "N4", "word": "青", "reading": "あお", "meaning": "Blue", "meaningNepali": "नीलो", "kanjiCharacters": ["青"], "partOfSpeech": "Noun"},
  {"id": "v34_41", "lesson": 34, "level": "N4", "word": "紺色", "reading": "こんいろ", "meaning": "Navy color", "meaningNepali": "गाढा नीलो", "kanjiCharacters": ["紺", "色"], "partOfSpeech": "Noun"},
  {"id": "v34_42", "lesson": 34, "level": "N4", "word": "黄色い", "reading": "きいろい", "meaning": "Yellowish", "meaningNepali": "पहेंलो", "kanjiCharacters": ["黄", "色"], "partOfSpeech": "Adj"},

    // ════════════════════════════════════
  // LESSON 35 — FULL TEXTBOOK VOCABULARY SHEET (42 WORDS)
  // ════════════════════════════════════
  {"id": "v35_1", "lesson": 35, "level": "N4", "word": "咲きます", "reading": "さきます", "meaning": "[Flowers] Bloom", "meaningNepali": "फुल्नु", "kanjiCharacters": ["咲"], "partOfSpeech": "Verb"},
  {"id": "v35_2", "lesson": 35, "level": "N4", "word": "変わります", "reading": "かわります", "meaning": "[Color] Change", "meaningNepali": "परिवर्तन हुनु", "kanjiCharacters": ["変"], "partOfSpeech": "Verb"},
  {"id": "v35_3", "lesson": 35, "level": "N4", "word": "困ります", "reading": "こまります", "meaning": "Be in trouble / Have problem", "meaningNepali": "समस्यामा पर्नु", "kanjiCharacters": ["困"], "partOfSpeech": "Verb"},
  {"id": "v35_4", "lesson": 35, "level": "N4", "word": "付けます", "reading": "つけます", "meaning": "Put on / Mark [a circle]", "meaningNepali": "चिह्न लगाउनु", "kanjiCharacters": ["付"], "partOfSpeech": "Verb"},
  {"id": "v35_5", "lesson": 35, "level": "N4", "word": "拾います", "reading": "ひろいます", "meaning": "Pick up / Find", "meaningNepali": "भेट्टाउनु", "kanjiCharacters": ["拾"], "partOfSpeech": "Verb"},
  {"id": "v35_6", "lesson": 35, "level": "N4", "word": "かかります", "reading": "かかります", "meaning": "Take [time/money]", "meaningNepali": "लाग्नु", "kanjiCharacters": [], "partOfSpeech": "Verb"},
  {"id": "v35_7", "lesson": 35, "level": "N4", "word": "楽な", "reading": "らく", "meaning": "Easy / Comfortable", "meaningNepali": "सजिलो", "kanjiCharacters": ["楽"], "partOfSpeech": "Adj"},
  {"id": "v35_8", "lesson": 35, "level": "N4", "word": "正しい", "reading": "ただしい", "meaning": "Correct / Right", "meaningNepali": "सही", "kanjiCharacters": ["正"], "partOfSpeech": "Adj"},
  {"id": "v35_9", "lesson": 35, "level": "N4", "word": "珍しい", "reading": "めずらしい", "meaning": "Rare / Uncommon", "meaningNepali": "दुर्लभ", "kanjiCharacters": ["珍"], "partOfSpeech": "Adj"},
  {"id": "v35_10", "lesson": 35, "level": "N4", "word": "方", "reading": "かた", "meaning": "Person (polite)", "meaningNepali": "व्यक्ति", "kanjiCharacters": ["方"], "partOfSpeech": "Noun"},
  {"id": "v35_11", "lesson": 35, "level": "N4", "word": "向こう", "reading": "むこう", "meaning": "Over there / Opposite side", "meaningNepali": "उतातिर", "kanjiCharacters": ["向"], "partOfSpeech": "Noun"},
  {"id": "v35_12", "lesson": 35, "level": "N4", "word": "島", "reading": "しま", "meaning": "Island", "meaningNepali": "टापु", "kanjiCharacters": ["島"], "partOfSpeech": "Noun"},
  {"id": "v35_13", "lesson": 35, "level": "N4", "word": "港", "reading": "みなと", "meaning": "Port / Harbor", "meaningNepali": "बन्दरगाह", "kanjiCharacters": ["港"], "partOfSpeech": "Noun"},
  {"id": "v35_14", "lesson": 35, "level": "N4", "word": "近所", "reading": "きんじょ", "meaning": "Neighborhood", "meaningNepali": "छिमेक", "kanjiCharacters": ["近", "所"], "partOfSpeech": "Noun"},
  {"id": "v35_15", "lesson": 35, "level": "N4", "word": "屋上", "reading": "おくじょう", "meaning": "Rooftop", "meaningNepali": "छत", "kanjiCharacters": ["屋", "上"], "partOfSpeech": "Noun"},
  {"id": "v35_16", "lesson": 35, "level": "N4", "word": "海外", "reading": "かいがい", "meaning": "Overseas / Abroad", "meaningNepali": "विदेश", "kanjiCharacters": ["海", "外"], "partOfSpeech": "Noun"},
  {"id": "v35_17", "lesson": 35, "level": "N4", "word": "山登り", "reading": "やまのぼり", "meaning": "Mountain climbing", "meaningNepali": "पर्वतारोहण", "kanjiCharacters": ["山", "登"], "partOfSpeech": "Noun"},
  {"id": "v35_18", "lesson": 35, "level": "N4", "word": "ハイキング", "reading": "ハイキング", "meaning": "Hiking", "meaningNepali": "हाइकिङ", "kanjiCharacters": [], "partOfSpeech": "Noun"},
  {"id": "v35_19", "lesson": 35, "level": "N4", "word": "制限", "reading": "せいげん", "meaning": "Restriction / Limit", "meaningNepali": "सीमा", "kanjiCharacters": ["制", "限"], "partOfSpeech": "Noun"},
  {"id": "v35_20", "lesson": 35, "level": "N4", "word": "自由", "reading": "じゆう", "meaning": "Freedom", "meaningNepali": "स्वतन्त्रता", "kanjiCharacters": ["自", "由"], "partOfSpeech": "Noun"},
  {"id": "v35_21", "lesson": 35, "level": "N4", "word": "法律", "reading": "ほうりつ", "meaning": "Law", "meaningNepali": "कानुन", "kanjiCharacters": ["法", "律"], "partOfSpeech": "Noun"},
  {"id": "v35_22", "lesson": 35, "level": "N4", "word": "許可", "reading": "きょか", "meaning": "Permission / License", "meaningNepali": "अनुमति", "kanjiCharacters": ["許", "可"], "partOfSpeech": "Noun"},
  {"id": "v35_23", "lesson": 35, "level": "N4", "word": "規則", "reading": "きそく", "meaning": "Rule / Regulation", "meaningNepali": "नियम", "kanjiCharacters": ["規", "則"], "partOfSpeech": "Noun"},
  {"id": "v35_24", "lesson": 35, "level": "N4", "word": "理由", "reading": "りゆう", "meaning": "Reason", "meaningNepali": "कारण", "kanjiCharacters": ["理", "由"], "partOfSpeech": "Noun"},
  {"id": "v35_25", "lesson": 35, "level": "N4", "word": "機会", "reading": "きかい", "meaning": "Opportunity / Chance", "meaningNepali": "अवसर", "kanjiCharacters": ["機", "会"], "partOfSpeech": "Noun"},
  {"id": "v35_26", "lesson": 35, "level": "N4", "word": "設備", "reading": "せつび", "meaning": "Equipment / Facilities", "meaningNepali": "सुविधा", "kanjiCharacters": ["設", "備"], "partOfSpeech": "Noun"},
  {"id": "v35_27", "lesson": 35, "level": "N4", "word": "レバー", "reading": "レバー", "meaning": "Lever", "meaningNepali": "लिभर", "kanjiCharacters": [], "partOfSpeech": "Noun"},
  {"id": "v35_28", "lesson": 35, "level": "N4", "word": "キー", "reading": "キー", "meaning": "Key", "meaningNepali": "साँचो", "kanjiCharacters": [], "partOfSpeech": "Noun"},
  {"id": "v35_29", "lesson": 35, "level": "N4", "word": "文法", "reading": "ぶんぽう", "meaning": "Grammar", "meaningNepali": "व्याकरण", "kanjiCharacters": ["文", "法"], "partOfSpeech": "Noun"},
  {"id": "v35_30", "lesson": 35, "level": "N4", "word": "意味", "reading": "いみ", "meaning": "Meaning", "meaningNepali": "अर्थ", "kanjiCharacters": ["意", "味"], "partOfSpeech": "Noun"},
  {"id": "v35_31", "lesson": 35, "level": "N4", "word": "辞書", "reading": "じしょ", "meaning": "Dictionary", "meaningNepali": "शब्दकोश", "kanjiCharacters": ["辞", "書"], "partOfSpeech": "Noun"},
  {"id": "v35_32", "lesson": 35, "level": "N4", "word": "案内", "reading": "あんない", "meaning": "Guidance / Information", "meaningNepali": "जानकारी", "kanjiCharacters": ["案", "内"], "partOfSpeech": "Noun"},
  {"id": "v35_33", "lesson": 35, "level": "N4", "word": "専門", "reading": "せんもん", "meaning": "Specialty / Major", "meaningNepali": "विशेषज्ञता", "kanjiCharacters": ["専", "門"], "partOfSpeech": "Noun"},
  {"id": "v35_34", "lesson": 35, "level": "N4", "word": "道具", "reading": "どうぐ", "meaning": "Tool / Instrument", "meaningNepali": "औजार", "kanjiCharacters": ["道", "具"], "partOfSpeech": "Noun"},
  {"id": "v35_35", "lesson": 35, "level": "N4", "word": "紐", "reading": "ひも", "meaning": "String / Cord", "meaningNepali": "डोरी", "kanjiCharacters": ["紐"], "partOfSpeech": "Noun"},
  {"id": "v35_36", "lesson": 35, "level": "N4", "word": "炊飯器", "reading": "すいはんき", "meaning": "Rice cooker", "meaningNepali": "राइसर कुकर", "kanjiCharacters": ["炊", "飯", "器"], "partOfSpeech": "Noun"},
  {"id": "v35_37", "lesson": 35, "level": "N4", "word": "葉", "reading": "は", "meaning": "Leaf", "meaningNepali": "पात", "kanjiCharacters": ["葉"], "partOfSpeech": "Noun"},
  {"id": "v35_38", "lesson": 35, "level": "N4", "word": "昔", "reading": "むかし", "meaning": "Old times / Past", "meaningNepali": "पुराना जमाना", "kanjiCharacters": ["昔"], "partOfSpeech": "Noun"},
  {"id": "v35_39", "lesson": 35, "level": "N4", "word": "もっと", "reading": "もっと", "meaning": "More", "meaningNepali": "अझ धेरै", "kanjiCharacters": [], "partOfSpeech": "Adverb"},
  {"id": "v35_40", "lesson": 35, "level": "N4", "word": "昔話", "reading": "むかしばなし", "meaning": "Folk tale / Old story", "meaningNepali": "लोककथा", "kanjiCharacters": ["昔", "話"], "partOfSpeech": "Noun"},
  {"id": "v35_41", "lesson": 35, "level": "N4", "word": "ある〜", "reading": "ある〜", "meaning": "A certain ~", "meaningNepali": "कुनै एक ~", "kanjiCharacters": [], "partOfSpeech": "Prefix"},
  {"id": "v35_42", "lesson": 35, "level": "N4", "word": "男", "reading": "おとこ", "meaning": "Man / Male", "meaningNepali": "पुरुष", "kanjiCharacters": ["男"], "partOfSpeech": "Noun"},

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

  // ════════════════════════════════════════════════════════
  // LESSONS 51 TO 60 — N3 COMPLETE VOCABULARY
  // ════════════════════════════════════════════════════════
  {"id": "N3-L51-001", "lesson": 51, "level": "N3", "word": "時間", "reading": "じかん", "meaning": "time", "meaningNepali": "समय", "kanjiCharacters": ["時", "間"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "時間がありますか。", "reading": "じかんがありますか。", "english": "Do you have time?", "nepali": "तपाईंसँग समय छ?"}]},
  {"id": "N3-L51-002", "lesson": 51, "level": "N3", "word": "現在", "reading": "げんざい", "meaning": "present", "meaningNepali": "वर्तमान", "kanjiCharacters": ["現", "在"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "現在は東京に住んでいます。", "reading": "げんざいはとうきょうにすんでいます。", "english": "Currently, I live in Tokyo.", "nepali": "वर्तमानमा म टोकियोमा बस्छु।"}]},
  {"id": "N3-L51-003", "lesson": 51, "level": "N3", "word": "過去", "reading": "かこ", "meaning": "past", "meaningNepali": "भूतकाल / विगत", "kanjiCharacters": ["過", "去"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "過去の経験を生かす。", "reading": "かこのけいけんをいかす。", "english": "Make use of past experience.", "nepali": "विगतको अनुभवको प्रयोग गर्नु।"}]},
  {"id": "N3-L51-004", "lesson": 51, "level": "N3", "word": "未来", "reading": "みらい", "meaning": "future", "meaningNepali": "भविष्य", "kanjiCharacters": ["未", "来"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "明るい未来を目指す。", "reading": "あかるいみらいをめざす。", "english": "Aim for a bright future.", "nepali": "उज्ज्वल भविष्यको लक्ष्य राख्नु।"}]},
  {"id": "N3-L51-005", "lesson": 51, "level": "N3", "word": "将来の夢", "reading": "しょうらいのゆめ", "meaning": "dream for the future", "meaningNepali": "भविष्यको सपना", "kanjiCharacters": ["将", "来", "夢"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "将来の夢は医者になることです。", "reading": "しょうらいのゆめはいしゃになることです。", "english": "My dream for the future is to become a doctor.", "nepali": "मेरो भविष्यको सपना डाक्टर बन्नु हो।"}]},
  {"id": "N3-L51-006", "lesson": 51, "level": "N3", "word": "早朝", "reading": "そうちょう", "meaning": "morning / early morning", "meaningNepali": "बिहानै / सबेरै", "kanjiCharacters": ["早", "朝"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "早朝に散歩をする。", "reading": "そうちょうにさんぽをする。", "english": "Take a walk early in the morning.", "nepali": "बिहानै घुम्न जानु।"}]},
  {"id": "N3-L51-007", "lesson": 51, "level": "N3", "word": "昼間の暖かい", "reading": "ひるまはあたたかい", "meaning": "the warmth of noon", "meaningNepali": "दिउँसोको न्यानो", "kanjiCharacters": ["昼", "間", "暖"], "partOfSpeech": "Expression", "grammarSentences": [{"japanese": "昼間の暖かい光を浴びる。", "reading": "ひるまのあたたかいひかりをあびる。", "english": "Bask in the warmth of midday.", "nepali": "दिउँसोको न्यानो घाम ताप्नु।"}]},
  {"id": "N3-L51-008", "lesson": 51, "level": "N3", "word": "日中", "reading": "にっちゅう", "meaning": "daytime", "meaningNepali": "दिउँसोको समय", "kanjiCharacters": ["日", "中"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "日中はとても暑い。", "reading": "にっちゅうはとてもあつい。", "english": "It is very hot during the daytime.", "nepali": "दिउँसोको समयमा धेरै गर्मी हुन्छ।"}]},
  {"id": "N3-L51-009", "lesson": 51, "level": "N3", "word": "夜中", "reading": "やちゅう", "meaning": "night", "meaningNepali": "रातिको समय", "kanjiCharacters": ["夜", "中"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "夜中に電話がかかってきた。", "reading": "やちゅうにでんわがかかってきた。", "english": "A phone call came in the middle of the night.", "nepali": "रातिको समयमा फोन आयो।"}]},
  {"id": "N3-L51-010", "lesson": 51, "level": "N3", "word": "真夜中", "reading": "まよなか", "meaning": "midnight (まよなか / しんや)", "meaningNepali": "मध्यराति", "kanjiCharacters": ["真", "夜", "中"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "真夜中に目が覚めた。", "reading": "まよなかにめがさめた。", "english": "Woke up at midnight.", "nepali": "मध्यराति आँखा खुल्यो।"}]},
  {"id": "N3-L51-011", "lesson": 51, "level": "N3", "word": "平日", "reading": "へいじつ", "meaning": "weekdays", "meaningNepali": "हप्ताका काम गर्ने दिनहरू", "kanjiCharacters": ["平", "日"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "平日は仕事があります。", "reading": "へいじつはしごとがあります。", "english": "I have work on weekdays.", "nepali": "हप्ताका दिनहरूमा काम हुन्छ।"}]},
  {"id": "N3-L51-012", "lesson": 51, "level": "N3", "word": "休日", "reading": "きゅうじつ", "meaning": "day off", "meaningNepali": "बिदाको दिन", "kanjiCharacters": ["休", "日"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "休日は家でゆっくりする。", "reading": "きゅうじつはいえでゆっくりする。", "english": "Relax at home on my day off.", "nepali": "बिदाको दिन घरमा आराम गर्नु।"}]},
  {"id": "N3-L51-013", "lesson": 51, "level": "N3", "word": "祝日", "reading": "しゅくじつ", "meaning": "holiday", "meaningNepali": "सार्वजनिक बिदा", "kanjiCharacters": ["祝", "日"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "明日は国の祝日です。", "reading": "あしたはくにのしゅくじつです。", "english": "Tomorrow is a national holiday.", "nepali": "भोलि राष्ट्रिय बिदा हो।"}]},
  {"id": "N3-L51-014", "lesson": 51, "level": "N3", "word": "週末", "reading": "しゅうまつ", "meaning": "weekend", "meaningNepali": "सप्ताहन्त (हप्ताको अन्त्य)", "kanjiCharacters": ["週", "末"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "週末に買い物へ行く。", "reading": "しゅうまつにかいものへいく。", "english": "Go shopping on the weekend.", "nepali": "सप्ताहन्तमा किनमेल गर्न जानु।"}]},
  {"id": "N3-L51-015", "lesson": 51, "level": "N3", "word": "月末", "reading": "げつまつ", "meaning": "end of month", "meaningNepali": "महिनाको अन्त्य", "kanjiCharacters": ["月", "末"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "月末までに支払いを済ませる。", "reading": "げつまつまでにしはらいをすませる。", "english": "Complete payment by the end of the month.", "nepali": "महिनाको अन्त्यसम्ममा भुक्तानी गरिसक्नु।"}]},
  {"id": "N3-L51-016", "lesson": 51, "level": "N3", "word": "年末", "reading": "ねんまつ", "meaning": "end of the year", "meaningNepali": "वर्षको अन्त्य", "kanjiCharacters": ["年", "末"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "年末は大掃除をする。", "reading": "ねんまつはおおおそうじをする。", "english": "Do major cleaning at the end of the year.", "nepali": "वर्षको अन्त्यमा ठूलो सरसफाइ गर्नु।"}]},
  {"id": "N3-L51-017", "lesson": 51, "level": "N3", "word": "年末年始", "reading": "ねんまつねんし", "meaning": "the beginning and end of the year", "meaningNepali": "पुराना र नयाँ वर्षको बिदा", "kanjiCharacters": ["年", "末", "始"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "年末年始は休業いたします。", "reading": "ねんまつねんしはきゅうぎょういたします。", "english": "We are closed during the New Year holidays.", "nepali": "नयाँ वर्षको अवधिमा कारोबार बन्द रहनेछ।"}]},
  {"id": "N3-L51-018", "lesson": 51, "level": "N3", "word": "上旬", "reading": "じょうじゅん", "meaning": "upper week (first 10 days of month / しょじゅん)", "meaningNepali": "महिनाको पहिलो १० दिन", "kanjiCharacters": ["上", "旬"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "4月の上旬に桜が咲く。", "reading": "しがつのじょうじゅんにさくらがさく。", "english": "Cherry blossoms bloom in early April.", "nepali": "अप्रिलको पहिलो १० दिनमा साकुरा फूल्छ।"}]},
  {"id": "N3-L51-019", "lesson": 51, "level": "N3", "word": "中旬", "reading": "ちゅうじゅん", "meaning": "mid-month (10 days in middle of month)", "meaningNepali": "महिनाको मध्य १० दिन", "kanjiCharacters": ["中", "旬"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "月中旬に試験がある。", "reading": "がつちゅうじゅんにしけんがある。", "english": "There is an exam in the middle of the month.", "nepali": "महिनाको मध्यतिर परीक्षा छ।"}]},
  {"id": "N3-L51-020", "lesson": 51, "level": "N3", "word": "下旬", "reading": "げじゅん", "meaning": "end of month (last 10 days of month)", "meaningNepali": "महिनाको अन्तिम १० दिन", "kanjiCharacters": ["下", "旬"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "5月の下旬に出張する。", "reading": "ごがつのげじゅんにしゅっちょうする。", "english": "Go on a business trip in late May.", "nepali": "मे को अन्तिम १० दिनमा भ्रमणमा जानु।"}]},
  {"id": "N3-L51-021", "lesson": 51, "level": "N3", "word": "連休", "reading": "れんきゅう", "meaning": "long vacation / consecutive holidays", "meaningNepali": "लगातारको बिदा", "kanjiCharacters": ["連", "休"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "来週は3連休です。", "reading": "らいしゅうはさんれんきゅうです。", "english": "Next week is a 3-day consecutive holiday.", "nepali": "आउने हप्ता ३ दिन लगातार बिदा छ।"}]},
  {"id": "N3-L51-022", "lesson": 51, "level": "N3", "word": "お盆休み", "reading": "おぼんやすみ", "meaning": "obon holidays", "meaningNepali": "ओबोन बिदा (जापानी परम्परागत बिदा)", "kanjiCharacters": ["盆", "休"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "お盆休みに田舎へ帰る。", "reading": "おぼんやすみにいなかへかえる。", "english": "Return to hometown during Obon holidays.", "nepali": "ओबोन बिदामा गाउँ फर्कनु।"}]},
  {"id": "N3-L51-023", "lesson": 51, "level": "N3", "word": "ゴールデンウィーク", "reading": "ゴールデンウィーク", "meaning": "Golden week holiday", "meaningNepali": "गोल्डेन विक बिदा", "kanjiCharacters": [], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "ゴールデンウィークに旅行する。", "reading": "ゴールデンウィークにりょこうする。", "english": "Travel during Golden Week.", "nepali": "गोल्डेन विकमा भ्रमण गर्नु।"}]},
  {"id": "N3-L51-024", "lesson": 51, "level": "N3", "word": "週明け", "reading": "しゅうあけ", "meaning": "beginning of the week", "meaningNepali": "हप्ताको सुरुवात (सोमबार)", "kanjiCharacters": ["週", "明"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "週明けに会議を行います。", "reading": "しゅうあけにかいぎをおこないます。", "english": "Hold a meeting at the beginning of the week.", "nepali": "हप्ताको सुरुवातमा बैठक बस्नु।"}]},
  {"id": "N3-L51-025", "lesson": 51, "level": "N3", "word": "年中無休", "reading": "ねんじゅうむきゅう", "meaning": "the whole year without a break / open 365 days", "meaningNepali": "वर्षैभरि खुला (बिदा बिना)", "kanjiCharacters": ["年", "中", "無", "休"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "このスーパーは年中無休です。", "reading": "このスーパーはねんじゅうむきゅうです。", "english": "This supermarket is open all year round.", "nepali": "यो सुपरमार्केट वर्षैभरि खुला रहन्छ।"}]},
  {"id": "v52_01", "lesson": 52, "level": "N3", "word": "立場", "reading": "たちば", "meaning": "Standpoint / Position", "meaningNepali": "दृष्टिकोण / स्थिति", "kanjiCharacters": ["立", "場"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "相手の立場になって考える。", "reading": "あいてのたちばになってかんがえる。", "english": "Consider things from the other person's standpoint.", "nepali": "अर्काको स्थितिमा रहेर विचार गर्नुहोस्।"}]},
  {"id": "v52_02", "lesson": 52, "level": "N3", "word": "反対", "reading": "はんたい", "meaning": "Opposite / Opposition", "meaningNepali": "विपरित / विरोध", "kanjiCharacters": ["反", "対"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "彼の意見に反対する。", "reading": "かれのいけんにはんたいする。", "english": "I oppose his opinion.", "nepali": "म उहाँको विचारको विरोध गर्छु।"}]},
  {"id": "v52_03", "lesson": 52, "level": "N3", "word": "苦労", "reading": "くろう", "meaning": "Hardship / Trouble", "meaningNepali": "दुःख / कष्ट", "kanjiCharacters": ["苦", "労"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "多くの苦労を乗り越えた。", "reading": "おおくのくろうをのりこえた。", "english": "Overcame many hardships.", "nepali": "अनेकौँ दुःख पार गरे।"}]},
  {"id": "v52_04", "lesson": 52, "level": "N3", "word": "会議", "reading": "かいぎ", "meaning": "Meeting / Conference", "meaningNepali": "बैठक / सभा", "kanjiCharacters": ["会", "議"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "明日の会議に出席する。", "reading": "あしたのかいぎにしゅっせきする。", "english": "Attend tomorrow's meeting.", "nepali": "भोलिको बैठकमा उपस्थित हुनेछ।"}]},
  {"id": "v52_05", "lesson": 52, "level": "N3", "word": "議論", "reading": "ぎろん", "meaning": "Discussion / Debate", "meaningNepali": "छलफल / बहस", "kanjiCharacters": ["議", "論"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "活発な議論が行われた。", "reading": "かっぱつなぎろんがおこなわれた。", "english": "Lively discussion took place.", "nepali": "सक्रिय छलफल भयो।"}]},
  {"id": "v53_01", "lesson": 53, "level": "N3", "word": "中心", "reading": "ちゅうしん", "meaning": "Center / Core", "meaningNepali": "केन्द्र", "kanjiCharacters": ["中", "心"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "台風は東京を中心に接近している。", "reading": "たいふうはとうきょうをちゅうしんにせっきんしている。", "english": "The typhoon is approaching centered on Tokyo.", "nepali": "आँधी टोकीयोलाई केन्द्र बनाएर नजिकिँदैछ।"}]},
  {"id": "v53_02", "lesson": 53, "level": "N3", "word": "焦点", "reading": "しょうてん", "meaning": "Focus / Focal point", "meaningNepali": "मुख्य ध्यान / केन्द्रविन्दु", "kanjiCharacters": ["焦", "点"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "問題の焦点が明確になった。", "reading": "もんだいのしょうてんがめいかくになった。", "english": "The focus of the problem became clear.", "nepali": "समस्याको केन्द्रविन्दु स्पष्ट भयो।"}]},
  {"id": "v53_03", "lesson": 53, "level": "N3", "word": "国民", "reading": "こくみん", "meaning": "National / People", "meaningNepali": "जनता / नागरिक", "kanjiCharacters": ["国", "民"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "国民の生活を守る。", "reading": "こくみんのせいかつをまもる。", "english": "Protect the lives of the citizens.", "nepali": "नागरिकको जीवन रक्षा गर्नु।"}]},
  {"id": "v53_04", "lesson": 53, "level": "N3", "word": "市民", "reading": "しみん", "meaning": "Citizen / City resident", "meaningNepali": "नगरवासी", "kanjiCharacters": ["市", "民"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "市民公園を清掃する。", "reading": "しみんこうえんをせいそうする。", "english": "Clean the citizens' park.", "nepali": "नगरवासी पार्क सफा गर्नु।"}]},
  {"id": "v53_05", "lesson": 53, "level": "N3", "word": "民主主義", "reading": "みんしゅしゅぎ", "meaning": "Democracy", "meaningNepali": "प्रजातन्त्र / लोकतन्त्र", "kanjiCharacters": ["民", "主", "義"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "民主主義の精神を尊重する。", "reading": "みんしゅしゅぎのせいしんをそんちょうする。", "english": "Respect the spirit of democracy.", "nepali": "लोकतन्त्रको भावनाको सम्मान गर्नु।"}]},
  {"id": "v54_01", "lesson": 54, "level": "N3", "word": "結果", "reading": "けっか", "meaning": "Result / Outcome", "meaningNepali": "परिणाम / नतिजा", "kanjiCharacters": ["結", "果"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "努力の結果、試験に合格した。", "reading": "どりょくのけっか、しけんにごうかくした。", "english": "As a result of effort, passed the exam.", "nepali": "मेहनतको परिणाम स्वरूप परीक्षा पास गरियो।"}]},
  {"id": "v54_02", "lesson": 54, "level": "N3", "word": "影響", "reading": "えいきょう", "meaning": "Influence / Effect", "meaningNepali": "प्रभाव", "kanjiCharacters": ["影", "響"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "環境への影響を懸念する。", "reading": "かんきょうへのえいきょうをけねんする。", "english": "Worry about the effect on the environment.", "nepali": "वातावरणमा पर्ने प्रभावको चिन्ता गर्नु।"}]},
  {"id": "v54_03", "lesson": 54, "level": "N3", "word": "連絡", "reading": "れんらく", "meaning": "Contact / Connection", "meaningNepali": "सम्पर्क", "kanjiCharacters": ["連", "絡"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "すぐにお客さまに連絡します。", "reading": "すぐにおきゃくさまにれんらくします。", "english": "I will contact the customer immediately.", "nepali": "तुरुन्तै ग्राहकलाई सम्पर्क गर्नेछु।"}]},
  {"id": "v54_04", "lesson": 54, "level": "N3", "word": "連れて行く", "reading": "つれていく", "meaning": "Take someone along", "meaningNepali": "साथमा लैजानु", "kanjiCharacters": ["連", "行"], "partOfSpeech": "Verb", "grammarSentences": [{"japanese": "子供を公園に連れて行く。", "reading": "こどもをこうえんにつれていく。", "english": "Take the child to the park.", "nepali": "बच्चालाई पार्कमा लैजानु।"}]},
  {"id": "v55_01", "lesson": 55, "level": "N3", "word": "限界", "reading": "げんかい", "meaning": "Limit / Bound", "meaningNepali": "सीमा / हद", "kanjiCharacters": ["限", "界"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "体力に限界を感じる。", "reading": "たいりょくにげんかいをかんじる。", "english": "Feel the limits of physical strength.", "nepali": "शारीरिक क्षमताको सीमा महसुस हुनु।"}]},
  {"id": "v55_02", "lesson": 55, "level": "N3", "word": "制限", "reading": "せいげん", "meaning": "Restriction / Limitation", "meaningNepali": "प्रतिबन्ध / सीमांकन", "kanjiCharacters": ["制", "限"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "速度制限を守ってください。", "reading": "そくどせいげんをまもってください。", "english": "Please observe the speed limit.", "nepali": "कृपया गति सीमा पालना गर्नुहोस्।"}]},
  {"id": "v55_03", "lesson": 55, "level": "N3", "word": "対象", "reading": "たいしょう", "meaning": "Target / Object", "meaningNepali": "लक्ष्य / दायरा", "kanjiCharacters": ["対", "象"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "高校生を対象としたセミナー。", "reading": "こうこうせいをたいしょうとしたセミナー。", "english": "Seminar targeted at high school students.", "nepali": "उच्च मावि विद्यार्थीहरू लक्षित सेमिनार।"}]},
  {"id": "v56_01", "lesson": 56, "level": "N3", "word": "傾向", "reading": "けいこう", "meaning": "Tendency / Trend", "meaningNepali": "प्रवृत्ति / झुकाव", "kanjiCharacters": ["傾", "向"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "若者の活字離れの傾向が見られる。", "reading": "わかもののかつじばなれのけいこうがみられる。", "english": "A trend of young people reading less is observed.", "nepali": "युवाहरूमा पुस्तक पढ्ने कम हुने प्रवृत्ति देखिन्छ।"}]},
  {"id": "v56_02", "lesson": 56, "level": "N3", "word": "特徴", "reading": "とくちょう", "meaning": "Feature / Characteristic", "meaningNepali": "विशेषता / लक्षण", "kanjiCharacters": ["特", "徴"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "この商品の特徴を説明する。", "reading": "このしょうひんのとくちょうをせつめいする。", "english": "Explain the features of this product.", "nepali": "यस सामानको विशेषता व्याख्या गर्नु।"}]},
  {"id": "v56_03", "lesson": 56, "level": "N3", "word": "部分", "reading": "ぶぶん", "meaning": "Part / Portion", "meaningNepali": "भाग / खण्ड", "kanjiCharacters": ["部", "分"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "文章の重要な部分に線を引く。", "reading": "ぶんしょうのじゅうようなぶぶんにせんをひく。", "english": "Underline important parts of the text.", "nepali": "लेखको महत्वपूर्ण भागमा रेखा तान्नु।"}]},
  {"id": "v57_01", "lesson": 57, "level": "N3", "word": "変化", "reading": "へんか", "meaning": "Change / Variation", "meaningNepali": "परिवर्तन / फेरबदल", "kanjiCharacters": ["変", "化"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "社会の急激な変化に対応する。", "reading": "しゃかいのきゅうげきなへんかにたいおうする。", "english": "Adapt to rapid social changes.", "nepali": "समाजको तीव्र परिवर्तनसँग अनुकूल हुनु।"}]},
  {"id": "v57_02", "lesson": 57, "level": "N3", "word": "発展", "reading": "はってん", "meaning": "Development / Growth", "meaningNepali": "विकास / उन्नति", "kanjiCharacters": ["発", "展"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "経済が急速に発展している。", "reading": "けいざいがきゅうそくにはってんしている。", "english": "The economy is developing rapidly.", "nepali": "अर्थतन्त्र तीव्र रूपमा विकास भइरहेको छ।"}]},
  {"id": "v57_03", "lesson": 57, "level": "N3", "word": "割合", "reading": "わりあい", "meaning": "Ratio / Percentage / Relatively", "meaningNepali": "अनुपात / तुलनात्मक रूपमा", "kanjiCharacters": ["割", "合"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "今日は割合に暖かい。", "reading": "きょうはわりあいにあたたかい。", "english": "It is relatively warm today.", "nepali": "आज तुलनात्मक रूपमा न्यानो छ।"}]},
  {"id": "v58_01", "lesson": 58, "level": "N3", "word": "前提", "reading": "ぜんてい", "meaning": "Premise / Condition", "meaningNepali": "पूर्वसर्त / आधार", "kanjiCharacters": ["前", "提"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "結婚を前提に付き合っている。", "reading": "けっこんをぜんていにつきあっている。", "english": "Dating on the premise of marriage.", "nepali": "विवाहको सर्तमा सम्बन्धमा रहनु।"}]},
  {"id": "v58_02", "lesson": 58, "level": "N3", "word": "条件", "reading": "じょうけん", "meaning": "Condition / Requirement", "meaningNepali": "सर्त / आवश्यकता", "kanjiCharacters": ["条", "件"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "採用の条件を確認する。", "reading": "さいようのじょうけんをかくにんする。", "english": "Confirm the hiring conditions.", "nepali": "भर्नाका सर्तहरू पुष्टि गर्नु।"}]},
  {"id": "v58_03", "lesson": 58, "level": "N3", "word": "都市", "reading": "とし", "meaning": "City / Metropolis", "meaningNepali": "सहर / महानगर", "kanjiCharacters": ["都", "市"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "大都市での生活に慣れる。", "reading": "だいとしでのせいかつになれる。", "english": "Get used to life in a big city.", "nepali": "ठूलो सहरको जीवनमा अभ्यस्त हुनु।"}]},
  {"id": "v59_01", "lesson": 59, "level": "N3", "word": "助言", "reading": "じょげん", "meaning": "Advice / Suggestion", "meaningNepali": "सल्लाह / परामर्श", "kanjiCharacters": ["助", "言"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "先輩からの適切な助言を受けた。", "reading": "せんぱいからのてきせつなじょげんをうけた。", "english": "Received appropriate advice from a senior.", "nepali": "वरिष्ठबाट उपयुक्त सल्लाह पाइयो।"}]},
  {"id": "v59_02", "lesson": 59, "level": "N3", "word": "案内", "reading": "あんない", "meaning": "Guidance / Information", "meaningNepali": "मार्गदर्शन / जानकारी", "kanjiCharacters": ["案", "内"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "館内を案内いたします。", "reading": "かんないをあんないいたします。", "english": "I will guide you through the building.", "nepali": "भवन भित्र मार्गदर्शन गराउनेछु।"}]},
  {"id": "v59_03", "lesson": 59, "level": "N3", "word": "内容", "reading": "ないよう", "meaning": "Content / Substance", "meaningNepali": "सामग्री / विषयवस्तु", "kanjiCharacters": ["内", "容"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "本の内容を深く理解する。", "reading": "ほんのないようをふかくりかいする。", "english": "Deeply understand the content of the book.", "nepali": "किताबको विषयवस्तु गहिरो गरी बुझ्नु।"}]},
  {"id": "v60_01", "lesson": 60, "level": "N3", "word": "評価", "reading": "ひょうか", "meaning": "Evaluation / Rating", "meaningNepali": "मूल्यांकन", "kanjiCharacters": ["評", "価"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "高い評価を受ける。", "reading": "たかいひょうかをうける。", "english": "Receive a high evaluation.", "nepali": "उच्च मूल्यांकन प्राप्त गर्नु।"}]},
  {"id": "v60_02", "lesson": 60, "level": "N3", "word": "相談", "reading": "そうだん", "meaning": "Consultation / Discussion", "meaningNepali": "परामर्श / छलफल", "kanjiCharacters": ["相", "談"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "先生に進路を相談する。", "reading": "せんせいにしんろをそうだんする。", "english": "Consult a teacher about future career.", "nepali": "शिक्षकसँग भविष्यको बाटोबारे परामर्श गर्नु।"}]},
  {"id": "v60_03", "lesson": 60, "level": "N3", "word": "相手", "reading": "あいて", "meaning": "Partner / Opponent", "meaningNepali": "साझेदार / विपक्षी", "kanjiCharacters": ["相", "手"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "対戦相手の動きを観察する。", "reading": "たいせんあいてのうごきをかんさつする。", "english": "Observe the movements of the opponent.", "nepali": "विपक्षी खेलाडीको चाल अवलोकन गर्नु।"}]},
  {"id": "v60_04", "lesson": 60, "level": "N3", "word": "首相", "reading": "しゅしょう", "meaning": "Prime Minister", "meaningNepali": "प्रधानमन्त्री", "kanjiCharacters": ["首", "相"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "首相が記者会見を行う。", "reading": "しゅしょうがきしゃかいけんをおこなう。", "english": "The Prime Minister holds a press conference.", "nepali": "प्रधानमन्त्रीले पत्रकार सम्मेलन गर्नुहुन्छ।"}]},

  // ════════════════════════════════════════════════════════
  // N3 MASTER SYLLABUS VOCABULARY (CHAPTERS 1-12)
  // ════════════════════════════════════════════════════════
  {"id": "N3-CH01-001", "lesson": 51, "level": "N3", "word": "お辞儀", "reading": "おじぎ", "meaning": "Bowing / Greeting", "meaningNepali": "निहुरिएर नमस्कार गर्नु", "kanjiCharacters": ["辞", "儀"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "お辞儀を使います。", "reading": "おじぎをつかいます。", "english": "Use Bowing / Greeting.", "nepali": "उदाहरण: निहुरिएर नमस्कार गर्नु।"}]},
  {"id": "N3-CH01-002", "lesson": 51, "level": "N3", "word": "向かい合う", "reading": "むかいあう", "meaning": "To face each other", "meaningNepali": "आमनेसामने हुनु", "kanjiCharacters": ["向", "合"], "partOfSpeech": "Verb", "grammarSentences": [{"japanese": "向かい合うを使います。", "reading": "むかいあうをつかいます。", "english": "Use To face each other.", "nepali": "उदाहरण: आमनेसामने हुनु।"}]},
  {"id": "N3-CH01-003", "lesson": 51, "level": "N3", "word": "家事", "reading": "かじ", "meaning": "Housework / Domestic chores", "meaningNepali": "घरको काम", "kanjiCharacters": ["家", "事"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "家事を使います。", "reading": "かじをつかいます。", "english": "Use Housework / Domestic chores.", "nepali": "उदाहरण: घरको काम।"}]},
  {"id": "N3-CH01-004", "lesson": 51, "level": "N3", "word": "規則正しい", "reading": "きそくただしい", "meaning": "Regular / Systematic", "meaningNepali": "नियमित / नियमबद्ध", "kanjiCharacters": ["規", "則", "正"], "partOfSpeech": "I-Adj", "grammarSentences": [{"japanese": "規則正しいを使います。", "reading": "きそくただしいをつかいます。", "english": "Use Regular / Systematic.", "nepali": "उदाहरण: नियमित / नियमबद्ध।"}]},
  {"id": "N3-CH01-005", "lesson": 51, "level": "N3", "word": "早起き", "reading": "はやおき", "meaning": "Waking up early", "meaningNepali": "बिहानै उठ्ने बानी", "kanjiCharacters": ["早", "起"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "早起きを使います。", "reading": "はやおきをつかいます。", "english": "Use Waking up early.", "nepali": "उदाहरण: बिहानै उठ्ने बानी।"}]},
  {"id": "N3-CH02-001", "lesson": 52, "level": "N3", "word": "勘定", "reading": "かんじょう", "meaning": "Bill / Check / Calculation", "meaningNepali": "बिल / हिसाब", "kanjiCharacters": ["勘", "定"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "勘定を使います。", "reading": "かんじょうをつかいます。", "english": "Use Bill / Check / Calculation.", "nepali": "उदाहरण: बिल / हिसाब।"}]},
  {"id": "N3-CH02-002", "lesson": 52, "level": "N3", "word": "領収書", "reading": "りょうしゅうしょ", "meaning": "Receipt", "meaningNepali": "रसिद / भर्पाई", "kanjiCharacters": ["領", "収", "書"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "領収書を使います。", "reading": "りょうしゅうしょをつかいます。", "english": "Use Receipt.", "nepali": "उदाहरण: रसिद / भर्पाई।"}]},
  {"id": "N3-CH02-003", "lesson": 52, "level": "N3", "word": "一戸建て", "reading": "いっこだて", "meaning": "Detached house", "meaningNepali": "छुट्टै बनेको घर", "kanjiCharacters": ["一", "戸", "建"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "一戸建てを使います。", "reading": "いっこだてをつかいます。", "english": "Use Detached house.", "nepali": "उदाहरण: छुट्टै बनेको घर।"}]},
  {"id": "N3-CH02-004", "lesson": 52, "level": "N3", "word": "家具", "reading": "かぐ", "meaning": "Furniture", "meaningNepali": "फर्निचर", "kanjiCharacters": ["家", "具"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "家具を使います。", "reading": "かぐをつかいます。", "english": "Use Furniture.", "nepali": "उदाहरण: फर्निचर।"}]},
  {"id": "N3-CH02-005", "lesson": 52, "level": "N3", "word": "費やす", "reading": "ついやす", "meaning": "To spend / To consume", "meaningNepali": "खर्च गर्नु / समय बिताउनु", "kanjiCharacters": ["費"], "partOfSpeech": "Verb", "grammarSentences": [{"japanese": "費やすを使います。", "reading": "ついやすをつかいます。", "english": "Use To spend / To consume.", "nepali": "उदाहरण: खर्च गर्नु / समय बिताउनु।"}]},
  {"id": "N3-CH03-001", "lesson": 53, "level": "N3", "word": "歓迎", "reading": "かんげい", "meaning": "Welcome", "meaningNepali": "स्वागत", "kanjiCharacters": ["歓", "迎"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "歓迎を使います。", "reading": "かんげいをつかいます。", "english": "Use Welcome.", "nepali": "उदाहरण: स्वागत।"}]},
  {"id": "N3-CH03-002", "lesson": 53, "level": "N3", "word": "都合", "reading": "つごう", "meaning": "Convenience / Circumstances", "meaningNepali": "अनुकूलता / समय", "kanjiCharacters": ["都", "合"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "都合を使います。", "reading": "つごうをつかいます。", "english": "Use Convenience / Circumstances.", "nepali": "उदाहरण: अनुकूलता / समय।"}]},
  {"id": "N3-CH03-003", "lesson": 53, "level": "N3", "word": "居眠り", "reading": "いねむり", "meaning": "Dozing off / Nodding off", "meaningNepali": "झुक्नु / निदाउनु", "kanjiCharacters": ["居", "眠"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "居眠りを使います。", "reading": "いねむりをつかいます。", "english": "Use Dozing off / Nodding off.", "nepali": "उदाहरण: झुक्नु / निदाउनु।"}]},
  {"id": "N3-CH03-004", "lesson": 53, "level": "N3", "word": "成績", "reading": "せいせき", "meaning": "Grades / Academic record", "meaningNepali": "प्राप्तांक / नतिजा", "kanjiCharacters": ["成", "績"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "成績を使います。", "reading": "せいせきをつかいます。", "english": "Use Grades / Academic record.", "nepali": "उदाहरण: प्राप्तांक / नतिजा।"}]},
  {"id": "N3-CH03-005", "lesson": 53, "level": "N3", "word": "教授", "reading": "きょうじゅ", "meaning": "Professor", "meaningNepali": "प्राध्यापक", "kanjiCharacters": ["教", "授"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "教授を使います。", "reading": "きょうじゅをつかいます。", "english": "Use Professor.", "nepali": "उदाहरण: प्राध्यापक।"}]},
  {"id": "N3-CH04-001", "lesson": 54, "level": "N3", "word": "看板", "reading": "かんばん", "meaning": "Signboard / Menu board", "meaningNepali": "साइनबोर्ड / बोर्ड", "kanjiCharacters": ["看", "板"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "看板を使います。", "reading": "かんばんをつかいます。", "english": "Use Signboard / Menu board.", "nepali": "उदाहरण: साइनबोर्ड / बोर्ड।"}]},
  {"id": "N3-CH04-002", "lesson": 54, "level": "N3", "word": "行列", "reading": "ぎょうれつ", "meaning": "Line / Queue", "meaningNepali": "लाइन / लहर", "kanjiCharacters": ["行", "列"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "行列を使います。", "reading": "ぎょうれつをつかいます。", "english": "Use Line / Queue.", "nepali": "उदाहरण: लाइन / लहर।"}]},
  {"id": "N3-CH04-003", "lesson": 54, "level": "N3", "word": "材料", "reading": "ざいりょう", "meaning": "Ingredients / Materials", "meaningNepali": "सामग्री / मरमसला", "kanjiCharacters": ["材", "料"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "材料を使います。", "reading": "ざいりょうをつかいます。", "english": "Use Ingredients / Materials.", "nepali": "उदाहरण: सामग्री / मरमसला।"}]},
  {"id": "N3-CH04-004", "lesson": 54, "level": "N3", "word": "調味料", "reading": "ちょうみりょう", "meaning": "Seasoning / Condiments", "meaningNepali": "मसला / स्वाद बढाउने चीज", "kanjiCharacters": ["調", "味", "料"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "調味料を使います。", "reading": "ちょうみりょうをつかいます。", "english": "Use Seasoning / Condiments.", "nepali": "उदाहरण: मसला / स्वाद बढाउने चीज।"}]},
  {"id": "N3-CH04-005", "lesson": 54, "level": "N3", "word": "沸騰", "reading": "ふっとう", "meaning": "Boiling / Bubbling up", "meaningNepali": "उम्लिनु", "kanjiCharacters": ["沸", "騰"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "沸騰を使います。", "reading": "ふっとうをつかいます。", "english": "Use Boiling / Bubbling up.", "nepali": "उदाहरण: उम्लिनु।"}]},
  {"id": "N3-CH05-001", "lesson": 55, "level": "N3", "word": "診察", "reading": "しんさつ", "meaning": "Medical examination", "meaningNepali": "स्वास्थ्य जाँच", "kanjiCharacters": ["診", "察"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "診察を使います。", "reading": "しんさつをつかいます。", "english": "Use Medical examination.", "nepali": "उदाहरण: स्वास्थ्य जाँच।"}]},
  {"id": "N3-CH05-002", "lesson": 55, "level": "N3", "word": "症状", "reading": "しょうじょう", "meaning": "Symptoms", "meaningNepali": "लक्षण", "kanjiCharacters": ["症", "状"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "症状を使います。", "reading": "しょうじょうをつかいます。", "english": "Use Symptoms.", "nepali": "उदाहरण: लक्षण।"}]},
  {"id": "N3-CH05-003", "lesson": 55, "level": "N3", "word": "副作用", "reading": "ふくさよう", "meaning": "Side effect", "meaningNepali": "साइड इफेक्ट / पार्श्व प्रभाव", "kanjiCharacters": ["副", "作", "用"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "副作用を使います。", "reading": "ふくさようをつかいます。", "english": "Use Side effect.", "nepali": "उदाहरण: साइड इफेक्ट / पार्श्व प्रभाव।"}]},
  {"id": "N3-CH05-004", "lesson": 55, "level": "N3", "word": "予防", "reading": "よぼう", "meaning": "Prevention / Precaution", "meaningNepali": "रोकथाम / पूर्वसावधानी", "kanjiCharacters": ["予", "防"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "予防を使います。", "reading": "よぼうをつかいます。", "english": "Use Prevention / Precaution.", "nepali": "उदाहरण: रोकथाम / पूर्वसावधानी।"}]},
  {"id": "N3-CH05-005", "lesson": 55, "level": "N3", "word": "回復", "reading": "かいふく", "meaning": "Recovery / Recuperation", "meaningNepali": "सुधार / निको हुनु", "kanjiCharacters": ["回", "復"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "回復を使います。", "reading": "かいふくをつかいます。", "english": "Use Recovery / Recuperation.", "nepali": "उदाहरण: सुधार / निको हुनु।"}]},
  {"id": "N3-CH06-001", "lesson": 56, "level": "N3", "word": "車掌", "reading": "しゃしょう", "meaning": "Train conductor", "meaningNepali": "ट्रेन कन्डक्टर", "kanjiCharacters": ["車", "掌"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "車掌を使います。", "reading": "しゃしょうをつかいます。", "english": "Use Train conductor.", "nepali": "उदाहरण: ट्रेन कन्डक्टर।"}]},
  {"id": "N3-CH06-002", "lesson": 56, "level": "N3", "word": "往復", "reading": "おうふく", "meaning": "Round trip", "meaningNepali": "आउने जाने (दुवैतर्फी टिकट)", "kanjiCharacters": ["往", "復"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "往復を使います。", "reading": "おうふくをつかいます。", "english": "Use Round trip.", "nepali": "उदाहरण: आउने जाने (दुवैतर्फी टिकट)।"}]},
  {"id": "N3-CH06-003", "lesson": 56, "level": "N3", "word": "混雑", "reading": "こんざつ", "meaning": "Crowdedness / Congestion", "meaningNepali": "भिडभाड / ठेलमठेल", "kanjiCharacters": ["混", "雑"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "混雑を使います。", "reading": "こんざつをつかいます。", "english": "Use Crowdedness / Congestion.", "nepali": "उदाहरण: भिडभाड / ठेलमठेल।"}]},
  {"id": "N3-CH06-004", "lesson": 56, "level": "N3", "word": "遠回り", "reading": "とおまわり", "meaning": "Detour", "meaningNepali": "घुमाउरो बाटो", "kanjiCharacters": ["遠", "回"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "遠回りを使います。", "reading": "とおまわりをつかいます。", "english": "Use Detour.", "nepali": "उदाहरण: घुमाउरो बाटो।"}]},
  {"id": "N3-CH06-005", "lesson": 56, "level": "N3", "word": "踏切", "reading": "ふみきり", "meaning": "Railway crossing", "meaningNepali": "रेलवे क्रसिङ", "kanjiCharacters": ["踏", "切"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "踏切を使います。", "reading": "ふみきりをつかいます。", "english": "Use Railway crossing.", "nepali": "उदाहरण: रेलवे क्रसिङ।"}]},
  {"id": "N3-CH07-001", "lesson": 57, "level": "N3", "word": "屋台", "reading": "やたい", "meaning": "Food stall / Street kiosk", "meaningNepali": "सडक पसल / ठेला", "kanjiCharacters": ["屋", "台"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "屋台を使います。", "reading": "やたいをつかいます。", "english": "Use Food stall / Street kiosk.", "nepali": "उदाहरण: सडक पसल / ठेला।"}]},
  {"id": "N3-CH07-002", "lesson": 57, "level": "N3", "word": "行列", "reading": "ぎょうれつ", "meaning": "Procession / Parade", "meaningNepali": "र्याली / झाँकी", "kanjiCharacters": ["行", "列"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "行列を使います。", "reading": "ぎょうれつをつかいます。", "english": "Use Procession / Parade.", "nepali": "उदाहरण: र्याली / झाँकी।"}]},
  {"id": "N3-CH07-003", "lesson": 57, "level": "N3", "word": "伝統", "reading": "でんとう", "meaning": "Tradition / Heritage", "meaningNepali": "परम्परा", "kanjiCharacters": ["伝", "統"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "伝統を使います。", "reading": "でんとうをつかいます。", "english": "Use Tradition / Heritage.", "nepali": "उदाहरण: परम्परा।"}]},
  {"id": "N3-CH07-004", "lesson": 57, "level": "N3", "word": "にぎやか", "reading": "にぎやか", "meaning": "Lively / Bustling", "meaningNepali": "चहलपहल भएको", "kanjiCharacters": ["賑"], "partOfSpeech": "Na-Adj", "grammarSentences": [{"japanese": "にぎやかを使います。", "reading": "にぎやかをつかいます。", "english": "Use Lively / Bustling.", "nepali": "उदाहरण: चहलपहल भएको।"}]},
  {"id": "N3-CH07-005", "lesson": 57, "level": "N3", "word": "開催", "reading": "かいさい", "meaning": "Holding an event / Hosting", "meaningNepali": "आयोजना गर्नु", "kanjiCharacters": ["開", "催"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "開催を使います。", "reading": "かいさいをつかいます。", "english": "Use Holding an event / Hosting.", "nepali": "उदाहरण: आयोजना गर्नु।"}]},
  {"id": "N3-CH08-001", "lesson": 58, "level": "N3", "word": "勝敗", "reading": "しょうはい", "meaning": "Victory or defeat / Outcome", "meaningNepali": "हारजीत / नतिजा", "kanjiCharacters": ["勝", "敗"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "勝敗を使います。", "reading": "しょうはいをつかいます。", "english": "Use Victory or defeat / Outcome.", "nepali": "उदाहरण: हारजीत / नतिजा।"}]},
  {"id": "N3-CH08-002", "lesson": 58, "level": "N3", "word": "応援", "reading": "おうえん", "meaning": "Cheering / Support", "meaningNepali": "हौसला / समर्थन", "kanjiCharacters": ["応", "援"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "応援を使います。", "reading": "おうえんをつかいます。", "english": "Use Cheering / Support.", "nepali": "उदाहरण: हौसला / समर्थन।"}]},
  {"id": "N3-CH08-003", "lesson": 58, "level": "N3", "word": "娯楽", "reading": "ごらく", "meaning": "Entertainment / Amusement", "meaningNepali": "मनोरञ्जन", "kanjiCharacters": ["娯", "楽"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "娯楽を使います。", "reading": "ごらくをつかいます。", "english": "Use Entertainment / Amusement.", "nepali": "उदाहरण: मनोरञ्जन।"}]},
  {"id": "N3-CH08-004", "lesson": 58, "level": "N3", "word": "息抜き", "reading": "いきぬき", "meaning": "Breather / Relaxation", "meaningNepali": "थकाइ मेट्नु / विश्राम", "kanjiCharacters": ["息", "抜"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "息抜きを使います。", "reading": "いきぬきをつかいます。", "english": "Use Breather / Relaxation.", "nepali": "उदाहरण: थकाइ मेट्नु / विश्राम।"}]},
  {"id": "N3-CH08-005", "lesson": 58, "level": "N3", "word": "競技", "reading": "きょうぎ", "meaning": "Game / Match / Contest", "meaningNepali": "प्रतियोगिता / खेल", "kanjiCharacters": ["競", "技"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "競技を使います。", "reading": "きょうぎをつかいます。", "english": "Use Game / Match / Contest.", "nepali": "उदाहरण: प्रतियोगिता / खेल।"}]},
  {"id": "N3-CH09-001", "lesson": 59, "level": "N3", "word": "雷", "reading": "かみなり", "meaning": "Thunder / Lightning", "meaningNepali": "चट्याङ / गर्जन", "kanjiCharacters": ["雷"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "雷を使います。", "reading": "かみなりをつかいます。", "english": "Use Thunder / Lightning.", "nepali": "उदाहरण: चट्याङ / गर्जन।"}]},
  {"id": "N3-CH09-002", "lesson": 59, "level": "N3", "word": "異常気象", "reading": "いじょうきしょう", "meaning": "Abnormal weather", "meaningNepali": "अस्वाभाविक मौसम", "kanjiCharacters": ["異", "常", "気", "象"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "異常気象を使います。", "reading": "いじょうきしょうをつかいます。", "english": "Use Abnormal weather.", "nepali": "उदाहरण: अस्वाभाविक मौसम।"}]},
  {"id": "N3-CH09-003", "lesson": 59, "level": "N3", "word": "湿気", "reading": "しっけ", "meaning": "Moisture / Humidity", "meaningNepali": "चिसोपन / ओस", "kanjiCharacters": ["湿", "気"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "湿気を使います。", "reading": "しっけをつかいます。", "english": "Use Moisture / Humidity.", "nepali": "उदाहरण: चिसोपन / ओस।"}]},
  {"id": "N3-CH09-004", "lesson": 59, "level": "N3", "word": "観測", "reading": "かんそく", "meaning": "Observation / Surveying", "meaningNepali": "अवलोकन / मापन", "kanjiCharacters": ["観", "測"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "観測を使います。", "reading": "かんそくをつかいます。", "english": "Use Observation / Surveying.", "nepali": "उदाहरण: अवलोकन / मापन।"}]},
  {"id": "N3-CH09-005", "lesson": 59, "level": "N3", "word": "避難", "reading": "ひなん", "meaning": "Evacuation / Seeking refuge", "meaningNepali": "सुरक्षित ठाउँमा भाग्राम/सर्नु", "kanjiCharacters": ["避", "難"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "避難を使います。", "reading": "ひなんをつかいます。", "english": "Use Evacuation / Seeking refuge.", "nepali": "उदाहरण: सुरक्षित ठाउँमा भाग्राम/सर्नु।"}]},
  {"id": "N3-CH10-001", "lesson": 60, "level": "N3", "word": "出張", "reading": "しゅっちょう", "meaning": "Business trip", "meaningNepali": "व्यापारिक भ्रमण", "kanjiCharacters": ["出", "張"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "出張を使います。", "reading": "しゅっちょうをつかいます。", "english": "Use Business trip.", "nepali": "उदाहरण: व्यापारिक भ्रमण।"}]},
  {"id": "N3-CH10-002", "lesson": 60, "level": "N3", "word": "日程", "reading": "にってい", "meaning": "Schedule / Agenda", "meaningNepali": "कार्यतालिका", "kanjiCharacters": ["日", "程"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "日程を使います。", "reading": "にっていをつかいます。", "english": "Use Schedule / Agenda.", "nepali": "उदाहरण: कार्यतालिका।"}]},
  {"id": "N3-CH10-003", "lesson": 60, "level": "N3", "word": "上司", "reading": "じょうし", "meaning": "Boss / Superior", "meaningNepali": "हाकिम / वरिष्ठ", "kanjiCharacters": ["上", "司"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "上司を使います。", "reading": "じょうしをつかいます。", "english": "Use Boss / Superior.", "nepali": "उदाहरण: हाकिम / वरिष्ठ।"}]},
  {"id": "N3-CH10-004", "lesson": 60, "level": "N3", "word": "妥協", "reading": "だきょう", "meaning": "Compromise", "meaningNepali": "सम्झौता / सहमति", "kanjiCharacters": ["妥", "協"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "妥協を使います。", "reading": "だきょうをつかいます。", "english": "Use Compromise.", "nepali": "उदाहरण: सम्झौता / सहमति।"}]},
  {"id": "N3-CH10-005", "lesson": 60, "level": "N3", "word": "承認", "reading": "しょうにん", "meaning": "Approval / Sanction", "meaningNepali": "स्वीकृति / अनुमति", "kanjiCharacters": ["承", "認"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "承認を使います。", "reading": "しょうにんをつかいます。", "english": "Use Approval / Sanction.", "nepali": "उदाहरण: स्वीकृति / अनुमति।"}]},
  {"id": "N3-CH11-001", "lesson": 61, "level": "N3", "word": "恐縮", "reading": "きょうしゅく", "meaning": "Feeling obliged / Sorry to trouble", "meaningNepali": "आभारी महसुस / क्षमाप्रार्थी", "kanjiCharacters": ["恐", "縮"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "恐縮を使います。", "reading": "きょうしゅくをつかいます。", "english": "Use Feeling obliged / Sorry to trouble.", "nepali": "उदाहरण: आभारी महसुस / क्षमाप्रार्थी।"}]},
  {"id": "N3-CH11-002", "lesson": 61, "level": "N3", "word": "ご丁寧", "reading": "ごていねい", "meaning": "Polite / Courteous", "meaningNepali": "नम्र / शिष्ट", "kanjiCharacters": ["丁", "寧"], "partOfSpeech": "Na-Adj", "grammarSentences": [{"japanese": "ご丁寧を使います。", "reading": "ごていねいをつかいます。", "english": "Use Polite / Courteous.", "nepali": "उदाहरण: नम्र / शिष्ट।"}]},
  {"id": "N3-CH11-003", "lesson": 61, "level": "N3", "word": "拝見", "reading": "はいけん", "meaning": "Humbly looking at / Seeing", "meaningNepali": "नम्रतापूर्वक हेर्नु", "kanjiCharacters": ["拝", "見"], "partOfSpeech": "Verb", "grammarSentences": [{"japanese": "拝見を使います。", "reading": "はいけんをつかいます。", "english": "Use Humbly looking at / Seeing.", "nepali": "उदाहरण: नम्रतापूर्वक हेर्नु।"}]},
  {"id": "N3-CH11-004", "lesson": 61, "level": "N3", "word": "存じる", "reading": "ぞんじる", "meaning": "Humbly knowing / Thinking", "meaningNepali": "नम्रतापूर्वक सोच्नु/थाहा पाउनु", "kanjiCharacters": ["存"], "partOfSpeech": "Verb", "grammarSentences": [{"japanese": "存じるを使います。", "reading": "ぞんじるをつかいます。", "english": "Use Humbly knowing / Thinking.", "nepali": "उदाहरण: नम्रतापूर्वक सोच्नु/थाहा पाउनु।"}]},
  {"id": "N3-CH11-005", "lesson": 61, "level": "N3", "word": "お越しになる", "reading": "おこしになる", "meaning": "Honorific for coming/arriving", "meaningNepali": "सवारी हुनु / आउनु (आदरार्थी)", "kanjiCharacters": ["越"], "partOfSpeech": "Verb", "grammarSentences": [{"japanese": "お越しになるを使います。", "reading": "おこしになるをつかいます。", "english": "Use Honorific for coming/arriving.", "nepali": "उदाहरण: सवारी हुनु / आउनु (आदरार्थी)।"}]},
  {"id": "N3-CH12-001", "lesson": 62, "level": "N3", "word": "矛盾", "reading": "むじゅん", "meaning": "Contradiction", "meaningNepali": "बाझिनु / विरोधाभास", "kanjiCharacters": ["矛", "盾"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "矛盾を使います。", "reading": "むじゅんをつかいます。", "english": "Use Contradiction.", "nepali": "उदाहरण: बाझिनु / विरोधाभास।"}]},
  {"id": "N3-CH12-002", "lesson": 62, "level": "N3", "word": "核心", "reading": "かくしん", "meaning": "Core / Heart of the matter", "meaningNepali": "मुख्य भाग / चुरो कुरा", "kanjiCharacters": ["核", "心"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "核心を使います。", "reading": "かくしんをつかいます。", "english": "Use Core / Heart of the matter.", "nepali": "उदाहरण: मुख्य भाग / चुरो कुरा।"}]},
  {"id": "N3-CH12-003", "lesson": 62, "level": "N3", "word": "客観的", "reading": "きゃっかんてき", "meaning": "Objective / Unbiased", "meaningNepali": "वस्तुनिष्ठ / निष्पक्ष", "kanjiCharacters": ["客", "観", "的"], "partOfSpeech": "Na-Adj", "grammarSentences": [{"japanese": "客観的を使います。", "reading": "きゃっかんてきをつかいます。", "english": "Use Objective / Unbiased.", "nepali": "उदाहरण: वस्तुनिष्ठ / निष्पक्ष।"}]},
  {"id": "N3-CH12-004", "lesson": 62, "level": "N3", "word": "成果", "reading": "せいか", "meaning": "Fruit of labor / Positive results", "meaningNepali": "उपलब्धि / प्रतिफल", "kanjiCharacters": ["成", "果"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "成果を使います。", "reading": "せいかをつかいます。", "english": "Use Fruit of labor / Positive results.", "nepali": "उदाहरण: उपलब्धि / प्रतिफल।"}]},
  {"id": "N3-CH12-005", "lesson": 62, "level": "N3", "word": "一連", "reading": "いちれん", "meaning": "A series / Sequence of events", "meaningNepali": "श्रृंखला / घटनाक्रम", "kanjiCharacters": ["一", "連"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "一連を使います。", "reading": "いちれんをつかいます。", "english": "Use A series / Sequence of events.", "nepali": "उदाहरण: श्रृंखला / घटनाक्रम।"}]},

  // ─────────────────────────────────────────────
  // JLPT N2 ADVANCED LESSONS 76–90
  // ─────────────────────────────────────────────
  {"id": "N2-L76-001", "lesson": 76, "level": "N2", "word": "承諾", "reading": "しょうだく", "meaning": "Consent / Approval", "meaningNepali": "स्वीकृति / सहमति", "kanjiCharacters": ["承", "諾"], "partOfSpeech": "Noun/Verb"},
  {"id": "N2-L76-002", "lesson": 76, "level": "N2", "word": "検討", "reading": "けんとう", "meaning": "Consideration / Examination", "meaningNepali": "विचार-विमर्श गर्नु", "kanjiCharacters": ["検", "討"], "partOfSpeech": "Noun/Verb"},
  {"id": "N2-L76-003", "lesson": 76, "level": "N2", "word": "提案", "reading": "ていあん", "meaning": "Proposal / Suggestion", "meaningNepali": "प्रस्ताव", "kanjiCharacters": ["提", "案"], "partOfSpeech": "Noun/Verb"},
  {"id": "N2-L76-004", "lesson": 76, "level": "N2", "word": "契約", "reading": "けいやく", "meaning": "Contract / Agreement", "meaningNepali": "सम्झौता", "kanjiCharacters": ["契", "約"], "partOfSpeech": "Noun/Verb"},
  {"id": "N2-L76-005", "lesson": 76, "level": "N2", "word": "取引先", "reading": "とりひきさき", "meaning": "Business partner / Client", "meaningNepali": "व्यापारिक साझेदार", "kanjiCharacters": ["取", "引", "先"], "partOfSpeech": "Noun"},

  {"id": "N2-L77-001", "lesson": 77, "level": "N2", "word": "告示", "reading": "こくじ", "meaning": "Public notice / Announcement", "meaningNepali": "सार्वजनिक सूचना", "kanjiCharacters": ["告", "示"], "partOfSpeech": "Noun/Verb"},
  {"id": "N2-L77-002", "lesson": 77, "level": "N2", "word": "義務", "reading": "ぎむ", "meaning": "Duty / Obligation", "meaningNepali": "कर्तव्य / दायित्व", "kanjiCharacters": ["義", "務"], "partOfSpeech": "Noun"},
  {"id": "N2-L77-003", "lesson": 77, "level": "N2", "word": "提出", "reading": "ていしゅつ", "meaning": "Submission / Filing", "meaningNepali": "पेस गर्नु", "kanjiCharacters": ["提", "出"], "partOfSpeech": "Noun/Verb"},

  {"id": "N2-L78-001", "lesson": 78, "level": "N2", "word": "温暖化", "reading": "おんだんか", "meaning": "Global warming", "meaningNepali": "विश्वव्यापी तापक्रम वृद्धि", "kanjiCharacters": ["温", "暖", "化"], "partOfSpeech": "Noun"},
  {"id": "N2-L78-002", "lesson": 78, "level": "N2", "word": "削減", "reading": "さくげん", "meaning": "Reduction / Cutback", "meaningNepali": "कटौती", "kanjiCharacters": ["削", "減"], "partOfSpeech": "Noun/Verb"},
  {"id": "N2-L78-003", "lesson": 78, "level": "N2", "word": "保全", "reading": "ほぜん", "meaning": "Preservation / Conservation", "meaningNepali": "संरक्षण", "kanjiCharacters": ["保", "全"], "partOfSpeech": "Noun/Verb"},

  {"id": "N2-L79-001", "lesson": 79, "level": "N2", "word": "景気", "reading": "けいき", "meaning": "Economic state / Business condition", "meaningNepali": "आर्थिक अवस्था", "kanjiCharacters": ["景", "気"], "partOfSpeech": "Noun"},
  {"id": "N2-L79-002", "lesson": 79, "level": "N2", "word": "投資", "reading": "とうし", "meaning": "Investment", "meaningNepali": "लगानी", "kanjiCharacters": ["投", "資"], "partOfSpeech": "Noun/Verb"},
  {"id": "N2-L79-003", "lesson": 79, "level": "N2", "word": "収益", "reading": "しゅうえき", "meaning": "Earnings / Revenue", "meaningNepali": "आम्दानी / प्रतिफल", "kanjiCharacters": ["収", "益"], "partOfSpeech": "Noun"},

  {"id": "N2-L80-001", "lesson": 80, "level": "N2", "word": "人工知能", "reading": "じんこうちのう", "meaning": "Artificial Intelligence (AI)", "meaningNepali": "कृत्रिम बुद्धिमत्ता", "kanjiCharacters": ["人", "工", "知", "能"], "partOfSpeech": "Noun"},
  {"id": "N2-L80-002", "lesson": 80, "level": "N2", "word": "開発", "reading": "かいはつ", "meaning": "Development", "meaningNepali": "विकास", "kanjiCharacters": ["開", "発"], "partOfSpeech": "Noun/Verb"},
  {"id": "N2-L80-003", "lesson": 80, "level": "N2", "word": "特許", "reading": "とっきょ", "meaning": "Patent", "meaningNepali": "पेटेन्ट अधिकार", "kanjiCharacters": ["特", "許"], "partOfSpeech": "Noun"},

  ...Array.from({ length: 10 }, (_, idx) => {
    const lNum = 81 + idx;
    return [
      {"id": `N2-L${lNum}-001`, "lesson": lNum, "level": "N2", "word": "促進", "reading": "そくしん", "meaning": "Promotion / Encouragement", "meaningNepali": "प्रोत्साहन / प्रवर्धन", "kanjiCharacters": ["促", "進"], "partOfSpeech": "Noun/Verb"},
      {"id": `N2-L${lNum}-002`, "lesson": lNum, "level": "N2", "word": "推進", "reading": "すいしん", "meaning": "Propulsion / Driving forward", "meaningNepali": "अगाडि बढाउनु", "kanjiCharacters": ["推", "進"], "partOfSpeech": "Noun/Verb"},
      {"id": `N2-L${lNum}-003`, "lesson": lNum, "level": "N2", "word": "維持", "reading": "いじ", "meaning": "Maintenance / Preservation", "meaningNepali": "कायम राख्नु", "kanjiCharacters": ["維", "持"], "partOfSpeech": "Noun/Verb"}
    ];
  }).flat() as VocabItem[],

  // ─────────────────────────────────────────────
  // JLPT N1 EXPERT FLUENCY LESSONS 91–100
  // ─────────────────────────────────────────────
  {"id": "N1-L91-001", "lesson": 91, "level": "N1", "word": "謹んで", "reading": "つつしんで", "meaning": "Respectfully / Humbly", "meaningNepali": "आदरपूर्वक", "kanjiCharacters": ["謹"], "partOfSpeech": "Adverb"},
  {"id": "N1-L91-002", "lesson": 91, "level": "N1", "word": "拝聴", "reading": "はいちょう", "meaning": "Listening respectfully", "meaningNepali": "ध्यानपूर्वक सुन्नु", "kanjiCharacters": ["拝", "聴"], "partOfSpeech": "Noun/Verb"},
  {"id": "N1-L91-003", "lesson": 91, "level": "N1", "word": "賜る", "reading": "たまわる", "meaning": "To be granted / Bestowed", "meaningNepali": "प्राप्त गर्नु / बक्सनु", "kanjiCharacters": ["賜"], "partOfSpeech": "Verb"},
  {"id": "N1-L91-004", "lesson": 91, "level": "N1", "word": "存じ上げる", "reading": "ぞんじあげる", "meaning": "Humbly know / Think", "meaningNepali": "थाहा पाउनु (आदरपूर्वक)", "kanjiCharacters": ["存", "上"], "partOfSpeech": "Verb"},

  {"id": "N1-L92-001", "lesson": 92, "level": "N1", "word": "概念", "reading": "がいねん", "meaning": "Concept / General idea", "meaningNepali": "अवधारणा", "kanjiCharacters": ["概", "念"], "partOfSpeech": "Noun"},
  {"id": "N1-L92-002", "lesson": 92, "level": "N1", "word": "葛藤", "reading": "かっとう", "meaning": "Conflict / Emotional struggle", "meaningNepali": "द्वन्द्व", "kanjiCharacters": ["葛", "藤"], "partOfSpeech": "Noun/Verb"},
  {"id": "N1-L92-003", "lesson": 92, "level": "N1", "word": "普遍的", "reading": "ふへんてき", "meaning": "Universal / Ubiquitous", "meaningNepali": "सर्वव्यापी", "kanjiCharacters": ["普", "遍", "的"], "partOfSpeech": "Na-Adj"},

  {"id": "N1-L93-001", "lesson": 93, "level": "N1", "word": "憲法", "reading": "けんぽう", "meaning": "Constitution", "meaningNepali": "संविधान", "kanjiCharacters": ["憲", "法"], "partOfSpeech": "Noun"},
  {"id": "N1-L93-002", "lesson": 93, "level": "N1", "word": "制定", "reading": "せいてい", "meaning": "Enactment / Legislation", "meaningNepali": "ऐन निर्माण", "kanjiCharacters": ["制", "定"], "partOfSpeech": "Noun/Verb"},
  {"id": "N1-L93-003", "lesson": 93, "level": "N1", "word": "侵害", "reading": "しんがい", "meaning": "Infringement / Violation", "meaningNepali": "अतिक्रमण / उल्लङ्घन", "kanjiCharacters": ["侵", "害"], "partOfSpeech": "Noun/Verb"},

  ...Array.from({ length: 7 }, (_, idx) => {
    const lNum = 94 + idx;
    return [
      {"id": `N1-L${lNum}-001`, "lesson": lNum, "level": "N1", "word": "権威", "reading": "けんい", "meaning": "Authority / Power", "meaningNepali": "अधिकार / शक्ति", "kanjiCharacters": ["権", "威"], "partOfSpeech": "Noun"},
      {"id": `N1-L${lNum}-002`, "lesson": lNum, "level": "N1", "word": "秩序", "reading": "ちつじょ", "meaning": "Order / Discipline", "meaningNepali": "व्यवस्था / अनुशासन", "kanjiCharacters": ["秩", "序"], "partOfSpeech": "Noun"},
      {"id": `N1-L${lNum}-003`, "lesson": lNum, "level": "N1", "word": "誇張", "reading": "こちょう", "meaning": "Exaggeration", "meaningNepali": "अतिशयोक्ति", "kanjiCharacters": ["誇", "張"], "partOfSpeech": "Noun/Verb"}
    ];
  }).flat() as VocabItem[]
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
  if (level === 'N2') {
    const nums: number[] = [];
    for (let i = 76; i <= 90; i++) nums.push(i);
    return nums;
  }
  if (level === 'N1') {
    const nums: number[] = [];
    for (let i = 91; i <= 100; i++) nums.push(i);
    return nums;
  }
  const data = getVocabByLevel(level);
  return [...new Set(data.map(v => v.lesson).filter((l): l is number => typeof l === 'number'))].sort((a, b) => a - b);
}

export interface KanaItem {
  char: string;
  romaji: string;
  nepali: string;
}

export const JAPANESE_HIRAGANA: KanaItem[] = [
  { char: 'あ', romaji: 'a', nepali: 'आ' }, { char: 'い', romaji: 'i', nepali: 'इ' }, { char: 'う', romaji: 'u', nepali: 'उ' }, { char: 'え', romaji: 'e', nepali: 'ए' }, { char: 'お', romaji: 'o', nepali: 'ओ' },
  { char: 'か', romaji: 'ka', nepali: 'का' }, { char: 'き', romaji: 'ki', nepali: 'कि' }, { char: 'く', romaji: 'ku', nepali: 'कु' }, { char: 'け', romaji: 'ke', nepali: 'के' }, { char: 'こ', romaji: 'ko', nepali: 'को' },
  { char: 'さ', romaji: 'sa', nepali: 'सा' }, { char: 'し', romaji: 'shi', nepali: 'शि' }, { char: 'す', romaji: 'su', nepali: 'सु' }, { char: 'せ', romaji: 'se', nepali: 'से' }, { char: 'そ', romaji: 'so', nepali: 'सो' },
  { char: 'た', romaji: 'ta', nepali: 'ता' }, { char: 'ち', romaji: 'chi', nepali: 'चि' }, { char: 'つ', romaji: 'tsu', nepali: 'त्सु' }, { char: 'て', romaji: 'te', nepali: 'ते' }, { char: 'と', romaji: 'to', nepali: 'तो' },
  { char: 'な', romaji: 'na', nepali: 'ना' }, { char: 'に', romaji: 'ni', nepali: 'नि' }, { char: 'ぬ', romaji: 'nu', nepali: 'नु' }, { char: 'ね', romaji: 'ne', nepali: 'ने' }, { char: 'の', romaji: 'no', nepali: 'नो' },
  { char: 'は', romaji: 'ha', nepali: 'हा' }, { char: 'ひ', romaji: 'hi', nepali: 'हि' }, { char: 'ふ', romaji: 'fu', nepali: 'फु' }, { char: 'へ', romaji: 'he', nepali: 'हे' }, { char: 'ほ', romaji: 'ho', nepali: 'हो' },
  { char: 'ま', romaji: 'ma', nepali: 'मा' }, { char: 'み', romaji: 'mi', nepali: 'मि' }, { char: 'む', romaji: 'mu', nepali: 'मु' }, { char: 'め', romaji: 'me', nepali: 'मे' }, { char: 'も', romaji: 'mo', nepali: 'मो' },
  { char: 'や', romaji: 'ya', nepali: 'या' }, { char: 'ゆ', romaji: 'yu', nepali: 'यु' }, { char: 'よ', romaji: 'yo', nepali: 'यो' },
  { char: 'ら', romaji: 'ra', nepali: 'रा' }, { char: 'り', romaji: 'ri', nepali: 'रि' }, { char: 'る', romaji: 'ru', nepali: 'रु' }, { char: 'れ', romaji: 're', nepali: 'रे' }, { char: 'ろ', romaji: 'ro', nepali: 'रो' },
  { char: 'わ', romaji: 'wa', nepali: 'वा' }, { char: 'を', romaji: 'wo', nepali: 'ओ/वो' }, { char: 'ん', romaji: 'n', nepali: 'न्' }
];

export const JAPANESE_KATAKANA: KanaItem[] = [
  { char: 'ア', romaji: 'a', nepali: 'आ' }, { char: 'イ', romaji: 'i', nepali: 'इ' }, { char: 'ウ', romaji: 'u', nepali: 'उ' }, { char: 'エ', romaji: 'e', nepali: 'ए' }, { char: 'オ', romaji: 'o', nepali: 'ओ' },
  { char: 'カ', romaji: 'ka', nepali: 'का' }, { char: 'キ', romaji: 'ki', nepali: 'कि' }, { char: 'ク', romaji: 'ku', nepali: 'कु' }, { char: 'ケ', romaji: 'ke', nepali: 'के' }, { char: 'コ', romaji: 'ko', nepali: 'को' },
  { char: 'サ', romaji: 'sa', nepali: 'सा' }, { char: 'シ', romaji: 'shi', nepali: 'शि' }, { char: 'ス', romaji: 'su', nepali: 'सु' }, { char: 'セ', romaji: 'se', nepali: 'से' }, { char: 'ソ', romaji: 'so', nepali: 'सो' },
  { char: 'タ', romaji: 'ta', nepali: 'ता' }, { char: 'チ', romaji: 'chi', nepali: 'चि' }, { char: 'ツ', romaji: 'tsu', nepali: 'त्सु' }, { char: 'テ', romaji: 'te', nepali: 'ते' }, { char: 'ト', romaji: 'to', nepali: 'तो' },
  { char: 'ナ', romaji: 'na', nepali: 'ना' }, { char: 'ニ', romaji: 'ni', nepali: 'नि' }, { char: 'ヌ', romaji: 'nu', nepali: 'नु' }, { char: 'ネ', romaji: 'ne', nepali: 'ने' }, { char: 'ノ', romaji: 'no', nepali: 'नो' },
  { char: 'ハ', romaji: 'ha', nepali: 'हा' }, { char: 'ヒ', romaji: 'hi', nepali: 'हि' }, { char: 'フ', romaji: 'fu', nepali: 'फु' }, { char: 'ヘ', romaji: 'he', nepali: 'हे' }, { char: 'ホ', romaji: 'ho', nepali: 'हो' },
  { char: 'マ', romaji: 'ma', nepali: 'मा' }, { char: 'ミ', romaji: 'mi', nepali: 'मि' }, { char: 'ム', romaji: 'mu', nepali: 'मु' }, { char: 'メ', romaji: 'me', nepali: 'मे' }, { char: 'モ', romaji: 'mo', nepali: 'मो' },
  { char: 'ヤ', romaji: 'ya', nepali: 'या' }, { char: 'ユ', romaji: 'yu', nepali: 'यु' }, { char: 'ヨ', romaji: 'yo', nepali: 'यो' },
  { char: 'ラ', romaji: 'ra', nepali: 'रा' }, { char: 'リ', romaji: 'ri', nepali: 'रि' }, { char: 'ル', romaji: 'ru', nepali: 'रु' }, { char: 'レ', romaji: 're', nepali: 'रे' }, { char: 'ロ', romaji: 'ro', nepali: 'रो' },
  { char: 'ワ', romaji: 'wa', nepali: 'वा' }, { char: 'ヲ', romaji: 'wo', nepali: 'ओ/वो' }, { char: 'ン', romaji: 'n', nepali: 'न्' }
];

export const JAPANESE_DAKUTON_HANDAKUTON: KanaItem[] = [
  { char: 'が', romaji: 'ga', nepali: 'गा' }, { char: 'ぎ', romaji: 'gi', nepali: 'गि' }, { char: 'ぐ', romaji: 'gu', nepali: 'गु' }, { char: 'げ', romaji: 'ge', nepali: 'गे' }, { char: 'ご', romaji: 'go', nepali: 'गो' },
  { char: 'ざ', romaji: 'za', nepali: 'जा' }, { char: 'じ', romaji: 'ji', nepali: 'जि' }, { char: 'ず', romaji: 'zu', nepali: 'जु' }, { char: 'ぜ', romaji: 'ze', nepali: 'जे' }, { char: 'ぞ', romaji: 'zo', nepali: 'जो' },
  { char: 'だ', romaji: 'da', nepali: 'दा' }, { char: 'ぢ', romaji: 'ji', nepali: 'जि' }, { char: 'づ', romaji: 'zu', nepali: 'जु' }, { char: 'で', romaji: 'de', nepali: 'दे' }, { char: 'ど', romaji: 'do', nepali: 'दो' },
  { char: 'ば', romaji: 'ba', nepali: 'बा' }, { char: 'び', romaji: 'bi', nepali: 'बि' }, { char: 'ぶ', romaji: 'bu', nepali: 'बु' }, { char: 'べ', romaji: 'be', nepali: 'बे' }, { char: 'ぼ', romaji: 'bo', nepali: 'बो' },
  { char: 'ぱ', romaji: 'pa', nepali: 'पा' }, { char: 'ぴ', romaji: 'pi', nepali: 'पि' }, { char: 'ぷ', romaji: 'pu', nepali: 'पु' }, { char: 'ぺ', romaji: 'pe', nepali: 'पे' }, { char: 'ぽ', romaji: 'po', nepali: 'पो' }
];

export const JAPANESE_YOON: KanaItem[] = [
  { char: 'きゃ', romaji: 'kya', nepali: 'क्या' }, { char: 'きゅ', romaji: 'kyu', nepali: 'क्यु' }, { char: 'きょ', romaji: 'kyo', nepali: 'क्यो' },
  { char: 'しゃ', romaji: 'sha', nepali: 'शा' }, { char: 'しゅ', romaji: 'shu', nepali: 'शु' }, { char: 'しょ', romaji: 'sho', nepali: 'शो' },
  { char: 'ちゃ', romaji: 'cha', nepali: 'चा' }, { char: 'ちゅ', romaji: 'chu', nepali: 'चु' }, { char: 'ちょ', romaji: 'cho', nepali: 'चो' },
  { char: 'にゃ', romaji: 'nya', nepali: 'न्या' }, { char: 'にゅ', romaji: 'nyu', nepali: 'न्यु' }, { char: 'にょ', romaji: 'nyo', nepali: 'न्यो' },
  { char: 'ひゃ', romaji: 'hya', nepali: 'ह्या' }, { char: 'ひゅ', romaji: 'hyu', nepali: 'ह्यु' }, { char: 'ひょ', romaji: 'hyo', nepali: 'ह्यो' },
  { char: 'みゃ', romaji: 'mya', nepali: 'म्या' }, { char: 'みゅ', romaji: 'myu', nepali: 'म्यु' }, { char: 'みょ', romaji: 'myo', nepali: 'म्यो' },
  { char: 'りゃ', romaji: 'rya', nepali: 'र्या' }, { char: 'りゅ', romaji: 'ryu', nepali: 'र्यु' }, { char: 'りょ', romaji: 'ryo', nepali: 'र्यो' },
  { char: 'ぎゃ', romaji: 'gya', nepali: 'ग्या' }, { char: 'ぎゅ', romaji: 'gyu', nepali: 'ग्यु' }, { char: 'ぎょ', romaji: 'gyo', nepali: 'ग्यो' },
  { char: 'じゃ', romaji: 'ja', nepali: 'जा' }, { char: 'じゅ', romaji: 'ju', nepali: 'जु' }, { char: 'じょ', romaji: 'jo', nepali: 'जो' },
  { char: 'びゃ', romaji: 'bya', nepali: 'ब्या' }, { char: 'びゅ', romaji: 'byu', nepali: 'ब्यु' }, { char: 'びょ', romaji: 'byo', nepali: 'ब्यो' },
  { char: 'ぴゃ', romaji: 'pya', nepali: 'प्या' }, { char: 'ぴゅ', romaji: 'pyu', nepali: 'प्यु' }, { char: 'ぴょ', romaji: 'pyo', nepali: 'प्यो' }
];