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
  lesson: number;
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
  // PART 1: CHAPTERS 26–35
  // ─────────────────────────────────────────────

  // ════════════════════════════════════
  // LESSON 26 — Explanatory Form 〜んです (Full Textbook Vocabulary 語彙)
  // ════════════════════════════════════
  { id:'v26_1', lesson:26, level:'N4', word:'見ます', reading:'みます', meaning:'Check / Look / See', meaningNepali:'जाँच्नु / हेर्नु', kanjiCharacters:['見'], partOfSpeech:'Verb' },
  { id:'v26_2', lesson:26, level:'N4', word:'探します', reading:'さがします', meaning:'Look for / Search', meaningNepali:'खोज्नु / हेर्नु', kanjiCharacters:['探'], partOfSpeech:'Verb' },
  { id:'v26_3', lesson:26, level:'N4', word:'遅れます', reading:'おくれます', meaning:'Be late [for an appointment]', meaningNepali:'ढिला हुनु [समयमा]', kanjiCharacters:['遅'], partOfSpeech:'Verb' },
  { id:'v26_4', lesson:26, level:'N4', word:'間に合います', reading:'まにあいます', meaning:'Be in time [for an appointment]', meaningNepali:'भ्याउनु [समयमा]', kanjiCharacters:['間','合'], partOfSpeech:'Verb' },
  { id:'v26_5', lesson:26, level:'N4', word:'やります', reading:'やります', meaning:'Do', meaningNepali:'गर्नु', kanjiCharacters:[], partOfSpeech:'Verb' },
  { id:'v26_6', lesson:26, level:'N4', word:'拾います', reading:'ひろいます', meaning:'Pick up / Find', meaningNepali:'पाउनु / पत्ता लगाउनु', kanjiCharacters:['拾'], partOfSpeech:'Verb' },
  { id:'v26_7', lesson:26, level:'N4', word:'参加します', reading:'さんかします', meaning:'Attend [a party] / Participate', meaningNepali:'उपस्थित हुनु / भाग लिनु', kanjiCharacters:['参','加'], partOfSpeech:'Verb' },
  { id:'v26_8', lesson:26, level:'N4', word:'申し込みます', reading:'もうしこみます', meaning:'Apply for / Enter for', meaningNepali:'दरखास्त दिनु', kanjiCharacters:['申','込'], partOfSpeech:'Verb' },
  { id:'v26_9', lesson:26, level:'N4', word:'都合がいい', reading:'つごうがいい', meaning:'Convenient / Suitable time', meaningNepali:'अनुकूल / ठिक छ', kanjiCharacters:['都','合'], partOfSpeech:'Adj' },
  { id:'v26_10', lesson:26, level:'N4', word:'都合が悪い', reading:'つごうがわるい', meaning:'Inconvenient / Bad time', meaningNepali:'प्रतिकूल / ठिक छैन', kanjiCharacters:['都','合','悪'], partOfSpeech:'Adj' },
  { id:'v26_11', lesson:26, level:'N4', word:'気分がいい', reading:'きぶんがいい', meaning:'Feel well / Good mood', meaningNepali:'राम्रो महसुस', kanjiCharacters:['気','分'], partOfSpeech:'Adj' },
  { id:'v26_12', lesson:26, level:'N4', word:'気分が悪い', reading:'きぶんがわるい', meaning:'Feel unwell / Bad mood', meaningNepali:'नराम्रो महसुस', kanjiCharacters:['気','分','悪'], partOfSpeech:'Adj' },
  { id:'v26_13', lesson:26, level:'N4', word:'新聞社', reading:'しんぶんしゃ', meaning:'Newspaper publishing company', meaningNepali:'पत्रिका प्रकाशन संस्था', kanjiCharacters:['新','聞','社'], partOfSpeech:'Noun' },
  { id:'v26_14', lesson:26, level:'N4', word:'運動会', reading:'うんどうかい', meaning:'Athletic meeting / Sports day', meaningNepali:'खेलकुद दिवस', kanjiCharacters:['運','動','会'], partOfSpeech:'Noun' },
  { id:'v26_15', lesson:26, level:'N4', word:'盆踊り', reading:'ぼんおどり', meaning:'Bon festival dance', meaningNepali:'बोन चाडको नाच', kanjiCharacters:['盆','踊'], partOfSpeech:'Noun' },
  { id:'v26_16', lesson:26, level:'N4', word:'フリーマーケット', reading:'フリーマーケット', meaning:'Free market / Flea market', meaningNepali:'खुल्ला बजार', kanjiCharacters:[], partOfSpeech:'Noun' },
  { id:'v26_17', lesson:26, level:'N4', word:'場所', reading:'ばしょ', meaning:'Place / Location', meaningNepali:'ठाउँ / स्थान', kanjiCharacters:['場','所'], partOfSpeech:'Noun' },
  { id:'v26_18', lesson:26, level:'N4', word:'ボランティア', reading:'ボランティア', meaning:'Volunteer', meaningNepali:'स्वयंसेवी', kanjiCharacters:[], partOfSpeech:'Noun' },
  { id:'v26_19', lesson:26, level:'N4', word:'財布', reading:'さいふ', meaning:'Wallet / Purse', meaningNepali:'थैली / वालेट', kanjiCharacters:['財','布'], partOfSpeech:'Noun' },
  { id:'v26_20', lesson:26, level:'N4', word:'国会議事堂', reading:'こっかいぎじどう', meaning:'Diet Building (Parliament)', meaningNepali:'संसद भवन', kanjiCharacters:['国','会','議','事','堂'], partOfSpeech:'Noun' },
  { id:'v26_21', lesson:26, level:'N4', word:'平日', reading:'へいじつ', meaning:'Weekday', meaningNepali:'हप्ताको कार्यदिन', kanjiCharacters:['平','日'], partOfSpeech:'Noun' },
  { id:'v26_22', lesson:26, level:'N4', word:'〜弁', reading:'〜べん', meaning:'~ dialect', meaningNepali:'स्थानीय भाषा', kanjiCharacters:['弁'], partOfSpeech:'Suffix' },
  { id:'v26_23', lesson:26, level:'N4', word:'今度', reading:'こんど', meaning:'Next time / Another time', meaningNepali:'फेरि / अर्को समय', kanjiCharacters:['今','度'], partOfSpeech:'Noun' },
  { id:'v26_24', lesson:26, level:'N4', word:'ずいぶん', reading:'ずいぶん', meaning:'Pretty / Very', meaningNepali:'एकदम / धेरै', kanjiCharacters:[], partOfSpeech:'Adverb' },
  { id:'v26_25', lesson:26, level:'N4', word:'直接', reading:'ちょくせつ', meaning:'Directly / In person', meaningNepali:'प्रत्यक्ष', kanjiCharacters:['直','接'], partOfSpeech:'Adverb' },
  { id:'v26_26', lesson:26, level:'N4', word:'いつでも', reading:'いつでも', meaning:'Any time', meaningNepali:'जुनसुकै बेला', kanjiCharacters:[], partOfSpeech:'Adverb' },
  { id:'v26_27', lesson:26, level:'N4', word:'どこでも', reading:'どこでも', meaning:'Anywhere', meaningNepali:'जहाँ पनि', kanjiCharacters:[], partOfSpeech:'Adverb' },
  { id:'v26_28', lesson:26, level:'N4', word:'だれでも', reading:'だれでも', meaning:'Anybody', meaningNepali:'जो पनि', kanjiCharacters:[], partOfSpeech:'Adverb' },
  { id:'v26_29', lesson:26, level:'N4', word:'何でも', reading:'なんでも', meaning:'Anything', meaningNepali:'जे पनि', kanjiCharacters:['何'], partOfSpeech:'Adverb' },
  { id:'v26_30', lesson:26, level:'N4', word:'こんな', reading:'こんな', meaning:'Like this', meaningNepali:'यो जस्तो', kanjiCharacters:[], partOfSpeech:'Adj' },
  { id:'v26_31', lesson:26, level:'N4', word:'そんな', reading:'そんな', meaning:'Like that (near listener)', meaningNepali:'त्यो जस्तो', kanjiCharacters:[], partOfSpeech:'Adj' },
  { id:'v26_32', lesson:26, level:'N4', word:'あんな', reading:'あんな', meaning:'Like that (far away)', meaningNepali:'ऊ त्यो जस्तो', kanjiCharacters:[], partOfSpeech:'Adj' },
  { id:'v26_33', lesson:26, level:'N4', word:'NHK', reading:'エヌエイチケイ', meaning:'Broadcasting company', meaningNepali:'रेडियो / टेलिभिजन कम्पनी', kanjiCharacters:[], partOfSpeech:'Noun' },
  { id:'v26_34', lesson:26, level:'N4', word:'子供の日', reading:'こどものひ', meaning:'Children\'s day', meaningNepali:'बाल दिवस', kanjiCharacters:['子','供','日'], partOfSpeech:'Noun' },
  { id:'v26_35', lesson:26, level:'N4', word:'エドストア', reading:'エドストア', meaning:'Store name', meaningNepali:'पसल (एडो स्टोर)', kanjiCharacters:[], partOfSpeech:'Noun' },
  { id:'v26_36', lesson:26, level:'N4', word:'片付きます', reading:'かたづきます', meaning:'Be put in order / Be tidied up', meaningNepali:'मिलाउनु / व्यवस्थापन हुनु', kanjiCharacters:['片','付'], partOfSpeech:'Verb' },
  { id:'v26_37', lesson:26, level:'N4', word:'荷物', reading:'にもつ', meaning:'Luggage / Baggage', meaningNepali:'सामानहरू / झोला', kanjiCharacters:['荷','物'], partOfSpeech:'Noun' },
  { id:'v26_38', lesson:26, level:'N4', word:'ごみ', reading:'ごみ', meaning:'Garbage / Trash / Dust', meaningNepali:'फोहर', kanjiCharacters:[], partOfSpeech:'Noun' },
  { id:'v26_39', lesson:26, level:'N4', word:'出します', reading:'だします', meaning:'Put out (garbage)', meaningNepali:'फाल्नु / बाहिर निकाल्नु', kanjiCharacters:['出'], partOfSpeech:'Verb' },
  { id:'v26_40', lesson:26, level:'N4', word:'燃えます', reading:'もえます', meaning:'Burn (trash)', meaningNepali:'जलाउनु / बाल्नु', kanjiCharacters:['燃'], partOfSpeech:'Verb' },
  { id:'v26_41', lesson:26, level:'N4', word:'月、水、金', reading:'げつ、すい、きん', meaning:'Monday, Wednesday, Friday', meaningNepali:'सोम, बुध, शुक्र', kanjiCharacters:['月','水','金'], partOfSpeech:'Noun' },
  { id:'v26_42', lesson:26, level:'N4', word:'置き場', reading:'おきば', meaning:'Place where something is put', meaningNepali:'राख्ने ठाउँ', kanjiCharacters:['置','場'], partOfSpeech:'Noun' },
  { id:'v26_43', lesson:26, level:'N4', word:'横', reading:'よこ', meaning:'Side / Beside', meaningNepali:'पक्ष / किनार / छेउ', kanjiCharacters:['横'], partOfSpeech:'Noun' },
  { id:'v26_44', lesson:26, level:'N4', word:'瓶', reading:'びん', meaning:'Bottle', meaningNepali:'सिसी / बोतल', kanjiCharacters:['瓶'], partOfSpeech:'Noun' },
  { id:'v26_45', lesson:26, level:'N4', word:'缶', reading:'かん', meaning:'Can', meaningNepali:'क्यान / डब्बा', kanjiCharacters:['缶'], partOfSpeech:'Noun' },
  { id:'v26_46', lesson:26, level:'N4', word:'お湯', reading:'おゆ', meaning:'Hot water', meaningNepali:'तातो पानी', kanjiCharacters:['湯'], partOfSpeech:'Noun' },
  { id:'v26_47', lesson:26, level:'N4', word:'ガス', reading:'ガス', meaning:'Gas', meaningNepali:'ग्यास', kanjiCharacters:[], partOfSpeech:'Noun' },
  { id:'v26_48', lesson:26, level:'N4', word:'〜会社', reading:'〜かいしゃ', meaning:'~ Company', meaningNepali:'~ कम्पनी', kanjiCharacters:['会','社'], partOfSpeech:'Suffix' },
  { id:'v26_49', lesson:26, level:'N4', word:'連絡します', reading:'れんらくします', meaning:'Contact / Communicate', meaningNepali:'सम्पर्क गर्नु', kanjiCharacters:['連','絡'], partOfSpeech:'Verb' },
  { id:'v26_50', lesson:26, level:'N4', word:'困ったなあ', reading:'こまったなあ', meaning:'What shall I do?', meaningNepali:'के गर्ने होला?', kanjiCharacters:['困'], partOfSpeech:'Expression' },
  { id:'v26_51', lesson:26, level:'N4', word:'電子メール', reading:'でんしメール', meaning:'Electronic mail / Email', meaningNepali:'विद्युतीय पत्राचार / इमेल', kanjiCharacters:['電','子'], partOfSpeech:'Noun' },
  { id:'v26_52', lesson:26, level:'N4', word:'宇宙', reading:'うちゅう', meaning:'Space / Universe', meaningNepali:'अन्तरिक्ष', kanjiCharacters:['宇','宙'], partOfSpeech:'Noun' },
  { id:'v26_53', lesson:26, level:'N4', word:'怖い', reading:'こわい', meaning:'Be afraid of / Scary', meaningNepali:'डर लाग्दो', kanjiCharacters:['怖'], partOfSpeech:'Adj' },
  { id:'v26_54', lesson:26, level:'N4', word:'宇宙船', reading:'うちゅうせん', meaning:'Spaceship', meaningNepali:'अन्तरिक्ष यान', kanjiCharacters:['宇','宙','船'], partOfSpeech:'Noun' },
  { id:'v26_55', lesson:26, level:'N4', word:'別', reading:'べつ', meaning:'Another / Separate', meaningNepali:'अर्को / फरक', kanjiCharacters:['別'], partOfSpeech:'Noun' },
  { id:'v26_56', lesson:26, level:'N4', word:'宇宙飛行士', reading:'うちゅうひこうし', meaning:'Astronaut', meaningNepali:'अन्तरिक्ष यात्री', kanjiCharacters:['宇','宙','飛','行','士'], partOfSpeech:'Noun' },

  // ════════════════════════════════════
  // ════════════════════════════════════
  // LESSON 27 — Potential Form (可能形) (Full 40 Words)
  // ════════════════════════════════════
  {"id": "v27_1",  "lesson": 27, "level": "N4",  "word": "できる",  "reading": "できる",  "meaning": "Can do",  "meaningNepali": "गर्न सक्नु",  "kanjiCharacters": [], "partOfSpeech": "Potential Verb"},
  {"id": "v27_2",  "lesson": 27, "level": "N4",  "word": "話せる",  "reading": "はなせる",  "meaning": "Can speak",  "meaningNepali": "बोल्न सक्नु",  "kanjiCharacters": ["話"], "partOfSpeech": "Potential Verb"},
  {"id": "v27_3",  "lesson": 27, "level": "N4",  "word": "読める",  "reading": "よめる",  "meaning": "Can read",  "meaningNepali": "पढ्न सक्नु",  "kanjiCharacters": ["読"], "partOfSpeech": "Potential Verb"},
  {"id": "v27_4",  "lesson": 27, "level": "N4",  "word": "書ける",  "reading": "かける",  "meaning": "Can write",  "meaningNepali": "लेख्न सक्नु",  "kanjiCharacters": ["書"], "partOfSpeech": "Potential Verb"},
  {"id": "v27_5",  "lesson": 27, "level": "N4",  "word": "聞ける",  "reading": "きける",  "meaning": "Can hear / Can listen",  "meaningNepali": "सुन्न सक्नु",  "kanjiCharacters": ["聞"], "partOfSpeech": "Potential Verb"},
  {"id": "v27_6",  "lesson": 27, "level": "N4",  "word": "見える",  "reading": "みえる",  "meaning": "Can be seen (visible)",  "meaningNepali": "देखिनु",  "kanjiCharacters": ["見"], "partOfSpeech": "Potential Verb"},
  {"id": "v27_7",  "lesson": 27, "level": "N4",  "word": "見られる",  "reading": "みられる",  "meaning": "Can watch",  "meaningNepali": "हेर्न सक्नु",  "kanjiCharacters": ["見"], "partOfSpeech": "Potential Verb"},
  {"id": "v27_8",  "lesson": 27, "level": "N4",  "word": "食べられる",  "reading": "たべられる",  "meaning": "Can eat",  "meaningNepali": "खान सक्नु",  "kanjiCharacters": ["食"], "partOfSpeech": "Potential Verb"},
  {"id": "v27_9",  "lesson": 27, "level": "N4",  "word": "飲める",  "reading": "のめる",  "meaning": "Can drink",  "meaningNepali": "पिउन सक्नु",  "kanjiCharacters": ["飲"], "partOfSpeech": "Potential Verb"},
  {"id": "v27_10",  "lesson": 27, "level": "N4",  "word": "行ける",  "reading": "いける",  "meaning": "Can go",  "meaningNepali": "जान सक्नु",  "kanjiCharacters": ["行"], "partOfSpeech": "Potential Verb"},
  {"id": "v27_11",  "lesson": 27, "level": "N4",  "word": "来られる",  "reading": "こられる",  "meaning": "Can come",  "meaningNepali": "आउन सक्नु",  "kanjiCharacters": ["来"], "partOfSpeech": "Potential Verb"},
  {"id": "v27_12",  "lesson": 27, "level": "N4",  "word": "泳げる",  "reading": "およげる",  "meaning": "Can swim",  "meaningNepali": "पौड्न सक्नु",  "kanjiCharacters": ["泳"], "partOfSpeech": "Potential Verb"},
  {"id": "v27_13",  "lesson": 27, "level": "N4",  "word": "乗れる",  "reading": "のれる",  "meaning": "Can ride",  "meaningNepali": "चढ्न सक्नु",  "kanjiCharacters": ["乗"], "partOfSpeech": "Potential Verb"},
  {"id": "v27_14",  "lesson": 27, "level": "N4",  "word": "歩ける",  "reading": "あるける",  "meaning": "Can walk",  "meaningNepali": "हिँड्न सक्नु",  "kanjiCharacters": ["歩"], "partOfSpeech": "Potential Verb"},
  {"id": "v27_15",  "lesson": 27, "level": "N4",  "word": "運転できる",  "reading": "うんてんできる",  "meaning": "Can drive",  "meaningNepali": "गाडी चलाउन सक्नु",  "kanjiCharacters": ["運",  "転"], "partOfSpeech": "Potential Verb"},
  {"id": "v27_16",  "lesson": 27, "level": "N4",  "word": "歌える",  "reading": "うたえる",  "meaning": "Can sing",  "meaningNepali": "गाउन सक्नु",  "kanjiCharacters": ["歌"], "partOfSpeech": "Potential Verb"},
  {"id": "v27_17",  "lesson": 27, "level": "N4",  "word": "踊れる",  "reading": "おどれる",  "meaning": "Can dance",  "meaningNepali": "नाच्न सक्नु",  "kanjiCharacters": ["踊"], "partOfSpeech": "Potential Verb"},
  {"id": "v27_18",  "lesson": 27, "level": "N4",  "word": "習う",  "reading": "ならう",  "meaning": "Learn",  "meaningNepali": "सिक्नु",  "kanjiCharacters": ["習"], "partOfSpeech": "Verb"},
  {"id": "v27_19",  "lesson": 27, "level": "N4",  "word": "練習",  "reading": "れんしゅう",  "meaning": "Practice",  "meaningNepali": "अभ्यास",  "kanjiCharacters": ["練",  "習"], "partOfSpeech": "Noun"},
  {"id": "v27_20",  "lesson": 27, "level": "N4",  "word": "上手",  "reading": "じょうず",  "meaning": "Skillful / Good at",  "meaningNepali": "सीपालु / जान्ने",  "kanjiCharacters": ["上",  "手"], "partOfSpeech": "Adj"},
  {"id": "v27_21",  "lesson": 27, "level": "N4",  "word": "下手",  "reading": "へた",  "meaning": "Unskillful / Poor at",  "meaningNepali": "असीपालु / नजान्ने",  "kanjiCharacters": ["下",  "手"], "partOfSpeech": "Adj"},
  {"id": "v27_22",  "lesson": 27, "level": "N4",  "word": "得意",  "reading": "とくい",  "meaning": "Good at (strong point)",  "meaningNepali": "दक्ष / राम्रो",  "kanjiCharacters": ["特",  "意"], "partOfSpeech": "Adj"},
  {"id": "v27_23",  "lesson": 27, "level": "N4",  "word": "苦手",  "reading": "にがて",  "meaning": "Weak at (weak point)",  "meaningNepali": "कमजोर",  "kanjiCharacters": ["苦",  "手"], "partOfSpeech": "Adj"},
  {"id": "v27_24",  "lesson": 27, "level": "N4",  "word": "趣味",  "reading": "しゅみ",  "meaning": "Hobby",  "meaningNepali": "रुचि / हबी",  "kanjiCharacters": ["趣",  "味"], "partOfSpeech": "Noun"},
  {"id": "v27_25",  "lesson": 27, "level": "N4",  "word": "経験",  "reading": "けいけん",  "meaning": "Experience",  "meaningNepali": "अनुभव",  "kanjiCharacters": ["経",  "験"], "partOfSpeech": "Noun"},
  {"id": "v27_26",  "lesson": 27, "level": "N4",  "word": "外国",  "reading": "がいこく",  "meaning": "Foreign country",  "meaningNepali": "विदेश",  "kanjiCharacters": ["外",  "国"], "partOfSpeech": "Noun"},
  {"id": "v27_27",  "lesson": 27, "level": "N4",  "word": "会話",  "reading": "かいわ",  "meaning": "Conversation",  "meaningNepali": "कुराकानी",  "kanjiCharacters": ["会",  "話"], "partOfSpeech": "Noun"},
  {"id": "v27_28",  "lesson": 27, "level": "N4",  "word": "発音",  "reading": "はつおん",  "meaning": "Pronunciation",  "meaningNepali": "उच्चारण",  "kanjiCharacters": ["発",  "音"], "partOfSpeech": "Noun"},
  {"id": "v27_29",  "lesson": 27, "level": "N4",  "word": "漢字",  "reading": "かんじ",  "meaning": "Kanji",  "meaningNepali": "काञ्जी",  "kanjiCharacters": ["漢",  "字"], "partOfSpeech": "Noun"},
  {"id": "v27_30",  "lesson": 27, "level": "N4",  "word": "単語",  "reading": "たんご",  "meaning": "Vocabulary / Word",  "meaningNepali": "शब्द",  "kanjiCharacters": ["単",  "語"], "partOfSpeech": "Noun"},
  {"id": "v27_31",  "lesson": 27, "level": "N4",  "word": "試験",  "reading": "しけん",  "meaning": "Examination / Test",  "meaningNepali": "परीक्षा",  "kanjiCharacters": ["試",  "験"], "partOfSpeech": "Noun"},
  {"id": "v27_32",  "lesson": 27, "level": "N4",  "word": "合格",  "reading": "ごうかく",  "meaning": "Pass (an exam)",  "meaningNepali": "उत्तीर्ण",  "kanjiCharacters": ["合",  "格"], "partOfSpeech": "Noun"},
  {"id": "v27_33",  "lesson": 27, "level": "N4",  "word": "不合格",  "reading": "ふごうかく",  "meaning": "Fail (an exam)",  "meaningNepali": "अनुत्तीर्ण",  "kanjiCharacters": ["不",  "合",  "格"], "partOfSpeech": "Noun"},
  {"id": "v27_34",  "lesson": 27, "level": "N4",  "word": "勉強",  "reading": "べんきょう",  "meaning": "Study",  "meaningNepali": "अध्ययन",  "kanjiCharacters": ["勉",  "強"], "partOfSpeech": "Noun"},
  {"id": "v27_35",  "lesson": 27, "level": "N4",  "word": "質問",  "reading": "しつもん",  "meaning": "Question",  "meaningNepali": "प्रश्न",  "kanjiCharacters": ["質",  "問"], "partOfSpeech": "Noun"},
  {"id": "v27_36",  "lesson": 27, "level": "N4",  "word": "回答",  "reading": "かいとう",  "meaning": "Answer / Response",  "meaningNepali": "उत्तर",  "kanjiCharacters": ["回",  "答"], "partOfSpeech": "Noun"},
  {"id": "v27_37",  "lesson": 27, "level": "N4",  "word": "挑戦",  "reading": "ちょうせん",  "meaning": "Challenge",  "meaningNepali": "चुनौती",  "kanjiCharacters": ["挑",  "戦"], "partOfSpeech": "Noun"},
  {"id": "v27_38",  "lesson": 27, "level": "N4",  "word": "自信",  "reading": "じしん",  "meaning": "Confidence",  "meaningNepali": "आत्मविश्वास",  "kanjiCharacters": ["自",  "信"], "partOfSpeech": "Noun"},
  {"id": "v27_39",  "lesson": 27, "level": "N4",  "word": "成功",  "reading": "せいこう",  "meaning": "Success",  "meaningNepali": "सफलता",  "kanjiCharacters": ["成",  "功"], "partOfSpeech": "Noun"},
  {"id": "v27_40",  "lesson": 27, "level": "N4",  "word": "努力",  "reading": "どりょく",  "meaning": "Effort",  "meaningNepali": "प्रयास / मेहनत",  "kanjiCharacters": ["努",  "力"], "partOfSpeech": "Noun"},

  // ════════════════════════════════════
  // LESSON 28 — Simultaneous Actions 〜ながら / Multiple Reasons 〜し〜し
  // ════════════════════════════════════
  {"id": "v28_1", "lesson": 28, "level": "N4", "word": "売れます", "reading": "うれます", "meaning": "Sell / Be sold", "meaningNepali": "बिक्नु", "kanjiCharacters": ["売"], "partOfSpeech": "Verb"},
  {"id": "v28_2", "lesson": 28, "level": "N4", "word": "踊ります", "reading": "おどります", "meaning": "Dance", "meaningNepali": "नाच्नु", "kanjiCharacters": ["踊"], "partOfSpeech": "Verb"},
  {"id": "v28_3", "lesson": 28, "level": "N4", "word": "かみます", "reading": "かみます", "meaning": "Chew / Bite", "meaningNepali": "चबाउनु / टोक्नु", "kanjiCharacters": [], "partOfSpeech": "Verb"},
  {"id": "v28_4", "lesson": 28, "level": "N4", "word": "選びます", "reading": "えらびます", "meaning": "Choose / Select", "meaningNepali": "छान्नु", "kanjiCharacters": ["選"], "partOfSpeech": "Verb"},
  {"id": "v28_5", "lesson": 28, "level": "N4", "word": "通います", "reading": "かよいます", "meaning": "Commute / Go to and fro", "meaningNepali": "आउजाउ गर्नु", "kanjiCharacters": ["通"], "partOfSpeech": "Verb"},
  {"id": "v28_6", "lesson": 28, "level": "N4", "word": "メモします", "reading": "メモします", "meaning": "Take a note", "meaningNepali": "टिपोट गर्नु", "kanjiCharacters": [], "partOfSpeech": "Verb"},
  {"id": "v28_7", "lesson": 28, "level": "N4", "word": "真面目", "reading": "まじめ", "meaning": "Serious / Earnest", "meaningNepali": "गम्भीर / इमानदार", "kanjiCharacters": ["真", "面", "目"], "partOfSpeech": "Adj"},
  {"id": "v28_8", "lesson": 28, "level": "N4", "word": "熱心", "reading": "ねっしん", "meaning": "Enthusiastic / Zealous", "meaningNepali": "मेहनती / उत्साही", "kanjiCharacters": ["熱", "心"], "partOfSpeech": "Adj"},
  {"id": "v28_9", "lesson": 28, "level": "N4", "word": "偉い", "reading": "えらい", "meaning": "Great / Admirable", "meaningNepali": "महान् / आदरणीय", "kanjiCharacters": ["偉"], "partOfSpeech": "Adj"},
  {"id": "v28_10", "lesson": 28, "level": "N4", "word": "ちょうどいい", "reading": "ちょうどいい", "meaning": "Proper / Just right", "meaningNepali": "बराबर / ठिकै", "kanjiCharacters": [], "partOfSpeech": "Adj"},
  {"id": "v28_11", "lesson": 28, "level": "N4", "word": "景色", "reading": "けしき", "meaning": "Scenery / View", "meaningNepali": "दृश्य", "kanjiCharacters": ["景", "色"], "partOfSpeech": "Noun"},
  {"id": "v28_12", "lesson": 28, "level": "N4", "word": "美容院", "reading": "びよういん", "meaning": "Beauty salon / Hairdresser", "meaningNepali": "ब्युटी पार्लर", "kanjiCharacters": ["美", "容", "院"], "partOfSpeech": "Noun"},
  {"id": "v28_13", "lesson": 28, "level": "N4", "word": "台所", "reading": "だいどこ", "meaning": "Kitchen", "meaningNepali": "भान्सा", "kanjiCharacters": ["台", "所"], "partOfSpeech": "Noun"},
  {"id": "v28_14", "lesson": 28, "level": "N4", "word": "経験", "reading": "けいけん", "meaning": "Experience", "meaningNepali": "अनुभव", "kanjiCharacters": ["経", "験"], "partOfSpeech": "Noun"},
  {"id": "v28_15", "lesson": 28, "level": "N4", "word": "力", "reading": "ちから", "meaning": "Power / Strength", "meaningNepali": "शक्ति", "kanjiCharacters": ["力"], "partOfSpeech": "Noun"},
  {"id": "v28_16", "lesson": 28, "level": "N4", "word": "人気", "reading": "にんき", "meaning": "Popularity", "meaningNepali": "लोकप्रियता", "kanjiCharacters": ["人", "気"], "partOfSpeech": "Noun"},
  {"id": "v28_17", "lesson": 28, "level": "N4", "word": "形", "reading": "かたち", "meaning": "Shape / Form", "meaningNepali": "आकार", "kanjiCharacters": ["形"], "partOfSpeech": "Noun"},
  {"id": "v28_18", "lesson": 28, "level": "N4", "word": "色", "reading": "いろ", "meaning": "Color", "meaningNepali": "रङ", "kanjiCharacters": ["色"], "partOfSpeech": "Noun"},
  {"id": "v28_19", "lesson": 28, "level": "N4", "word": "味", "reading": "あじ", "meaning": "Taste / Flavor", "meaningNepali": "स्वाद", "kanjiCharacters": ["味"], "partOfSpeech": "Noun"},
  {"id": "v28_20", "lesson": 28, "level": "N4", "word": "ガム", "reading": "ガム", "meaning": "Chewing gum", "meaningNepali": "गम / चुइगम", "kanjiCharacters": [], "partOfSpeech": "Noun"},
  {"id": "v28_21", "lesson": 28, "level": "N4", "word": "品物", "reading": "しなもの", "meaning": "Goods / Articles", "meaningNepali": "सामान", "kanjiCharacters": ["品", "物"], "partOfSpeech": "Noun"},
  {"id": "v28_22", "lesson": 28, "level": "N4", "word": "値段", "reading": "ねだん", "meaning": "Price", "meaningNepali": "मूल्य", "kanjiCharacters": ["値", "段"], "partOfSpeech": "Noun"},
  {"id": "v28_23", "lesson": 28, "level": "N4", "word": "給料", "reading": "きゅうりょう", "meaning": "Salary / Pay", "meaningNepali": "तलब", "kanjiCharacters": ["給", "料"], "partOfSpeech": "Noun"},
  {"id": "v28_24", "lesson": 28, "level": "N4", "word": "ボーナス", "reading": "ボーナス", "meaning": "Bonus", "meaningNepali": "बोनस", "kanjiCharacters": [], "partOfSpeech": "Noun"},
  {"id": "v28_25", "lesson": 28, "level": "N4", "word": "番組", "reading": "ばんぐみ", "meaning": "TV/Radio Program", "meaningNepali": "कार्यक्रम", "kanjiCharacters": ["番", "組"], "partOfSpeech": "Noun"},
  {"id": "v28_26", "lesson": 28, "level": "N4", "word": "歌手", "reading": "かしゅ", "meaning": "Singer", "meaningNepali": "गायक", "kanjiCharacters": ["歌", "手"], "partOfSpeech": "Noun"},
  {"id": "v28_27", "lesson": 28, "level": "N4", "word": "小説", "reading": "しょうせつ", "meaning": "Novel", "meaningNepali": "उपन्यास", "kanjiCharacters": ["小", "説"], "partOfSpeech": "Noun"},
  {"id": "v28_28", "lesson": 28, "level": "N4", "word": "小説家", "reading": "しょうせつか", "meaning": "Novelist", "meaningNepali": "उपन्यासकार", "kanjiCharacters": ["小", "説", "家"], "partOfSpeech": "Noun"},
  {"id": "v28_29", "lesson": 28, "level": "N4", "word": "息子", "reading": "むすこ", "meaning": "(My) Son", "meaningNepali": "(मेरो) छोरा", "kanjiCharacters": ["息", "子"], "partOfSpeech": "Noun"},
  {"id": "v28_30", "lesson": 28, "level": "N4", "word": "娘", "reading": "むすめ", "meaning": "(My) Daughter", "meaningNepali": "(मेरो) छोरी", "kanjiCharacters": ["娘"], "partOfSpeech": "Noun"},
  {"id": "v28_31", "lesson": 28, "level": "N4", "word": "自分", "reading": "じぶん", "meaning": "Oneself / Myself", "meaningNepali": "आफू", "kanjiCharacters": ["自", "分"], "partOfSpeech": "Noun"},
  {"id": "v28_32", "lesson": 28, "level": "N4", "word": "将来", "reading": "しょうらい", "meaning": "Future", "meaningNepali": "भविष्य", "kanjiCharacters": ["将", "来"], "partOfSpeech": "Noun"},
  {"id": "v28_33", "lesson": 28, "level": "N4", "word": "しばらく", "reading": "しばらく", "meaning": "For a while / A little while", "meaningNepali": "केही समय", "kanjiCharacters": [], "partOfSpeech": "Adverb"},
  {"id": "v28_34", "lesson": 28, "level": "N4", "word": "たいてい", "reading": "たいてい", "meaning": "Usually / Mostly", "meaningNepali": "साधारणतया", "kanjiCharacters": [], "partOfSpeech": "Adverb"},
  {"id": "v28_35", "lesson": 28, "level": "N4", "word": "それに", "reading": "それに", "meaning": "In addition / Moreover", "meaningNepali": "त्यसमाथि", "kanjiCharacters": [], "partOfSpeech": "Conjunction"},
  {"id": "v28_36", "lesson": 28, "level": "N4", "word": "それで", "reading": "それで", "meaning": "Therefore / So", "meaningNepali": "त्यसैले", "kanjiCharacters": [], "partOfSpeech": "Conjunction"},

  // ════════════════════════════════════
  // LESSON 29 — Intransitive States 〜ています / Regret 〜てしまいました
  // ════════════════════════════════════
  {"id": "v29_1", "lesson": 29, "level": "N4", "word": "開きます", "reading": "あきます", "meaning": "[Door] Open (Intransitive)", "meaningNepali": "[ढोका] खुल्नु", "kanjiCharacters": ["開"], "partOfSpeech": "Verb"},
  {"id": "v29_2", "lesson": 29, "level": "N4", "word": "閉まります", "reading": "しまります", "meaning": "[Door] Close (Intransitive)", "meaningNepali": "[ढोका] बन्द हुनु", "kanjiCharacters": ["閉"], "partOfSpeech": "Verb"},
  {"id": "v29_3", "lesson": 29, "level": "N4", "word": "つきます", "reading": "つきます", "meaning": "[Light] Turn on (Intransitive)", "meaningNepali": "[बत्ती] बल्नु", "kanjiCharacters": [], "partOfSpeech": "Verb"},
  {"id": "v29_4", "lesson": 29, "level": "N4", "word": "消えます", "reading": "きえます", "meaning": "[Light] Go off / Turn off", "meaningNepali": "[बत्ती] निभ्नु", "kanjiCharacters": ["消"], "partOfSpeech": "Verb"},
  {"id": "v29_5", "lesson": 29, "level": "N4", "word": "壊れます", "reading": "こわれます", "meaning": "[Chair] Break (Intransitive)", "meaningNepali": "बिग्रनु / भत्कनु", "kanjiCharacters": ["壊"], "partOfSpeech": "Verb"},
  {"id": "v29_6", "lesson": 29, "level": "N4", "word": "割れます", "reading": "われます", "meaning": "[Glass] Break / Smash", "meaningNepali": "फुट्नु (काँच)", "kanjiCharacters": ["割"], "partOfSpeech": "Verb"},
  {"id": "v29_7", "lesson": 29, "level": "N4", "word": "折れます", "reading": "おれます", "meaning": "[Tree] Snap / Break", "meaningNepali": "भाँचिनु", "kanjiCharacters": ["折"], "partOfSpeech": "Verb"},
  {"id": "v29_8", "lesson": 29, "level": "N4", "word": "破れます", "reading": "やぶれます", "meaning": "[Paper] Tear", "meaningNepali": "च्यातिनु", "kanjiCharacters": ["破"], "partOfSpeech": "Verb"},
  {"id": "v29_9", "lesson": 29, "level": "N4", "word": "汚れます", "reading": "よごれます", "meaning": "[Clothes] Get dirty", "meaningNepali": "फोहर हुनु", "kanjiCharacters": ["汚"], "partOfSpeech": "Verb"},
  {"id": "v29_10", "lesson": 29, "level": "N4", "word": "付きます", "reading": "つきます", "meaning": "[Pocket] Be attached", "meaningNepali": "टाँसिनु / लाग्नु", "kanjiCharacters": ["付"], "partOfSpeech": "Verb"},
  {"id": "v29_11", "lesson": 29, "level": "N4", "word": "外れます", "reading": "はずれます", "meaning": "[Button] Come off / Unfasten", "meaningNepali": "फुकनु", "kanjiCharacters": ["外"], "partOfSpeech": "Verb"},
  {"id": "v29_12", "lesson": 29, "level": "N4", "word": "止まります", "reading": "とまります", "meaning": "[Car] Stop (Intransitive)", "meaningNepali": "रोकिनु", "kanjiCharacters": ["止"], "partOfSpeech": "Verb"},
  {"id": "v29_13", "lesson": 29, "level": "N4", "word": "間違えます", "reading": "まちがえます", "meaning": "Make a mistake", "meaningNepali": "गलती गर्नु", "kanjiCharacters": ["間", "違"], "partOfSpeech": "Verb"},
  {"id": "v29_14", "lesson": 29, "level": "N4", "word": "落とします", "reading": "おとします", "meaning": "Drop / Lose", "meaningNepali": "खसाल्नु", "kanjiCharacters": ["落"], "partOfSpeech": "Verb"},
  {"id": "v29_15", "lesson": 29, "level": "N4", "word": "かかります", "reading": "かかります", "meaning": "Be locked", "meaningNepali": "ताल्चा लाग्नु", "kanjiCharacters": [], "partOfSpeech": "Verb"},
  {"id": "v29_16", "lesson": 29, "level": "N4", "word": "ふきます", "reading": "ふきます", "meaning": "Wipe", "meaningNepali": "पुछ्नु", "kanjiCharacters": [], "partOfSpeech": "Verb"},
  {"id": "v29_17", "lesson": 29, "level": "N4", "word": "取り替えます", "reading": "とりかえます", "meaning": "Exchange / Change", "meaningNepali": "फेर्नु / साट्नु", "kanjiCharacters": ["取", "替"], "partOfSpeech": "Verb"},
  {"id": "v29_18", "lesson": 29, "level": "N4", "word": "片付けます", "reading": "かたづけます", "meaning": "Tidy up / Put in order", "meaningNepali": "व्यवस्थापन गर्नु", "kanjiCharacters": ["片", "付"], "partOfSpeech": "Verb"},
  {"id": "v29_19", "lesson": 29, "level": "N4", "word": "お皿", "reading": "おさら", "meaning": "Plate / Dish", "meaningNepali": "प्लेट / थाल", "kanjiCharacters": ["皿"], "partOfSpeech": "Noun"},
  {"id": "v29_20", "lesson": 29, "level": "N4", "word": "お茶碗", "reading": "おちゃわん", "meaning": "Rice bowl", "meaningNepali": "कटोरा", "kanjiCharacters": ["茶", "碗"], "partOfSpeech": "Noun"},
  {"id": "v29_21", "lesson": 29, "level": "N4", "word": "コップ", "reading": "コップ", "meaning": "Glass / Tumbler", "meaningNepali": "ग्लास", "kanjiCharacters": [], "partOfSpeech": "Noun"},
  {"id": "v29_22", "lesson": 29, "level": "N4", "word": "ガラス", "reading": "ガラス", "meaning": "Glass (material)", "meaningNepali": "काँच", "kanjiCharacters": [], "partOfSpeech": "Noun"},
  {"id": "v29_23", "lesson": 29, "level": "N4", "word": "袋", "reading": "ふくろ", "meaning": "Bag / Sack", "meaningNepali": "झोला", "kanjiCharacters": ["袋"], "partOfSpeech": "Noun"},
  {"id": "v29_24", "lesson": 29, "level": "N4", "word": "書類", "reading": "しょるい", "meaning": "Documents / Papers", "meaningNepali": "कागजात", "kanjiCharacters": ["書", "類"], "partOfSpeech": "Noun"},
  {"id": "v29_25", "lesson": 29, "level": "N4", "word": "枝", "reading": "えだ", "meaning": "Branch / Twig", "meaningNepali": "हाँगा", "kanjiCharacters": ["枝"], "partOfSpeech": "Noun"},
  {"id": "v29_26", "lesson": 29, "level": "N4", "word": "駅員", "reading": "えきいん", "meaning": "Station attendant", "meaningNepali": "स्टेसन कर्मचारी", "kanjiCharacters": ["駅", "員"], "partOfSpeech": "Noun"},
  {"id": "v29_27", "lesson": 29, "level": "N4", "word": "交番", "reading": "こうばん", "meaning": "Police box", "meaningNepali": "प्रहरी चौकी", "kanjiCharacters": ["交", "番"], "partOfSpeech": "Noun"},
  {"id": "v29_28", "lesson": 29, "level": "N4", "word": "返事", "reading": "へんじ", "meaning": "Reply / Answer", "meaningNepali": "जवाफ", "kanjiCharacters": ["返", "事"], "partOfSpeech": "Noun"},
  {"id": "v29_29", "lesson": 29, "level": "N4", "word": "お先にどうぞ", "reading": "おさきにどうぞ", "meaning": "After you / Go ahead", "meaningNepali": "पहिला तपाईं जानुस्", "kanjiCharacters": ["先"], "partOfSpeech": "Expression"},

  // LESSON 30 — Preparatory Action 〜ておきます / 〜てあります
  // ════════════════════════════════════
  { id:'v30_1', lesson:30, level:'N4', word:'〜ておきます', reading:'〜ておきます', meaning:'Do in advance / Prepare for later', meaningNepali:'अगाडि गरेर राख्नु', kanjiCharacters:['置'], partOfSpeech:'Grammar', grammarSentences:[{japanese:'パーティーの前に料理を作っておきます。', reading:'パーティーのまえにりょうりをつくっておきます。', english:'I will prepare the food in advance for the party.', nepali:'पार्टीअघि नै खाना बनाएर राख्छु।'}] },
  { id:'v30_2', lesson:30, level:'N4', word:'〜てあります', reading:'〜てあります', meaning:'Has been done (result visible)', meaningNepali:'पहिले नै गरिएको छ (नतिजा देखिन्छ)', kanjiCharacters:[], partOfSpeech:'Grammar', grammarSentences:[{japanese:'壁に絵が飾ってあります。', reading:'かべにえがかざってあります。', english:'A picture has been hung on the wall.', nepali:'भित्तामा तस्वीर झुन्ड्याइएको छ।'}] },
  { id:'v30_3', lesson:30, level:'N4', word:'予約する', reading:'よやくする', meaning:'To reserve / To book', meaningNepali:'बुकिङ गर्नु / आरक्षण गर्नु', kanjiCharacters:['予','約'], partOfSpeech:'Verb', grammarSentences:[{japanese:'ホテルを予約しておきました。', reading:'ホテルをよやくしておきました。', english:'I booked the hotel in advance.', nepali:'होटल अगाडि नै बुक गरेर राखेँ।'}] },
  { id:'v30_4', lesson:30, level:'N4', word:'用意する', reading:'ようにする', meaning:'To prepare / To get ready', meaningNepali:'तयारी गर्नु', kanjiCharacters:['用','意'], partOfSpeech:'Verb', grammarSentences:[{japanese:'発表の準備をしておいてください。', reading:'はっぴょうのじゅんびをしておいてください。', english:'Please prepare for the presentation in advance.', nepali:'प्रस्तुतिको तयारी पहिले नै गरेर राख्नुस्।'}] },
  { id:'v30_5', lesson:30, level:'N4', word:'整理する', reading:'せいりする', meaning:'To organize / To sort out', meaningNepali:'व्यवस्थित गर्नु / मिलाउनु', kanjiCharacters:['整','理'], partOfSpeech:'Verb', grammarSentences:[{japanese:'資料を整理しておきます。', reading:'しりょうをせいりしておきます。', english:'I will organize the documents beforehand.', nepali:'कागजातहरू अगाडि नै मिलाएर राख्छु।'}] },
  { id:'v30_6', lesson:30, level:'N4', word:'確認する', reading:'かくにんする', meaning:'To confirm / To verify', meaningNepali:'पुष्टि गर्नु / जाँच्नु', kanjiCharacters:['確','認'], partOfSpeech:'Verb', grammarSentences:[{japanese:'時間を確認しておいてください。', reading:'じかんをかくにんしておいてください。', english:'Please confirm the time in advance.', nepali:'समय पहिले नै पुष्टि गरेर राख्नुस्।'}] },
  { id:'v30_7', lesson:30, level:'N4', word:'調べる', reading:'しらべる', meaning:'To investigate / To research', meaningNepali:'अनुसन्धान गर्नु / खोज्नु', kanjiCharacters:['調'], partOfSpeech:'Verb', grammarSentences:[{japanese:'行く前に地図を調べておきましょう。', reading:'いくまえにちずをしらべておきましょう。', english:'Let us check the map before going.', nepali:'जानुअघि नक्सा हेरेर राखौँ।'}] },

  // ════════════════════════════════════
  // LESSON 31 — Volitional Form 〜おう/〜よう / 〜と思っています
  // ════════════════════════════════════
  { id:'v31_1', lesson:31, level:'N4', word:'〜意向形', reading:'いこうけい', meaning:'Volitional form (Let\'s ~ / I will ~)', meaningNepali:'इच्छा प्रकट रूप (गरौँ / गर्छु)', kanjiCharacters:['意','向','形'], partOfSpeech:'Grammar', grammarSentences:[{japanese:'明日いっしょに映画を見よう！', reading:'あしたいっしょにえいがをみよう！', english:'Let\'s watch a movie together tomorrow!', nepali:'भोलि सँगै सिनेमा हेरौँ!'}] },
  { id:'v31_2', lesson:31, level:'N4', word:'〜と思っています', reading:'〜とおもっています', meaning:'I am thinking of doing ~ / Planning to', meaningNepali:'~ गर्ने सोचेको छु', kanjiCharacters:['思'], partOfSpeech:'Grammar', grammarSentences:[{japanese:'来年、日本へ行こうと思っています。', reading:'らいねん、にほんへいこうとおもっています。', english:'I am thinking of going to Japan next year.', nepali:'अर्को वर्ष जापान जाने सोचेको छु।'}] },
  { id:'v31_3', lesson:31, level:'N4', word:'決める', reading:'きめる', meaning:'To decide', meaningNepali:'निर्णय गर्नु', kanjiCharacters:['決'], partOfSpeech:'Verb', grammarSentences:[{japanese:'転職しようと決めました。', reading:'てんしょくしようとしました。', english:'I decided to change jobs.', nepali:'काम परिवर्तन गर्ने निर्णय गरेँ।'}] },
  { id:'v31_4', lesson:31, level:'N4', word:'計画する', reading:'けいかくする', meaning:'To plan', meaningNepali:'योजना बनाउनु', kanjiCharacters:['計','画'], partOfSpeech:'Verb', grammarSentences:[{japanese:'旅行を計画しようと思っています。', reading:'りょこうをけいかくしようとおもっています。', english:'I am planning to plan a trip.', nepali:'यात्राको योजना बनाउने सोचेको छु।'}] },
  { id:'v31_5', lesson:31, level:'N4', word:'始める', reading:'はじめる', meaning:'To start / To begin', meaningNepali:'सुरु गर्नु', kanjiCharacters:['始'], partOfSpeech:'Verb', grammarSentences:[{japanese:'ダイエットを始めようと思っています。', reading:'ダイエットをはじめようとおもっています。', english:'I am thinking of starting a diet.', nepali:'डाइट सुरु गर्ने सोचेको छु।'}] },
  { id:'v31_6', lesson:31, level:'N4', word:'辞める', reading:'やめる', meaning:'To quit / To resign', meaningNepali:'छोड्नु / राजीनामा दिनु', kanjiCharacters:['辞'], partOfSpeech:'Verb', grammarSentences:[{japanese:'会社を辞めようかと思っています。', reading:'かいしゃをやめようかとおもっています。', english:'I am thinking about whether to quit the company.', nepali:'कम्पनी छोड्ने सोच्दैछु।'}] },

  // ════════════════════════════════════
  // LESSON 32 — Advice & Probability 〜ほうがいい / 〜でしょう / 〜かもしれない
  // ════════════════════════════════════
  { id:'v32_1', lesson:32, level:'N4', word:'〜ほうがいい', reading:'〜ほうがいい', meaning:'You had better ~ / It is better to ~', meaningNepali:'~ गर्दा राम्रो हुन्छ / ~ गर्नुपर्छ', kanjiCharacters:[], partOfSpeech:'Grammar', grammarSentences:[{japanese:'早く病院へ行ったほうがいいです。', reading:'はやくびょういんへいったほうがいいです。', english:'You had better go to the hospital soon.', nepali:'चाँडो अस्पताल जानु राम्रो हुन्छ।'}] },
  { id:'v32_2', lesson:32, level:'N4', word:'〜でしょう', reading:'〜でしょう', meaning:'Probably / I suppose', meaningNepali:'होला / हुनुपर्छ', kanjiCharacters:[], partOfSpeech:'Grammar', grammarSentences:[{japanese:'明日は雨が降るでしょう。', reading:'あしたはあめがふるでしょう。', english:'It will probably rain tomorrow.', nepali:'भोलि पानी पर्ला।'}] },
  { id:'v32_3', lesson:32, level:'N4', word:'〜かもしれない', reading:'〜かもしれない', meaning:'Might be ~ / Perhaps', meaningNepali:'हुन सक्छ / सायद', kanjiCharacters:[], partOfSpeech:'Grammar', grammarSentences:[{japanese:'彼は忙しいかもしれません。', reading:'かれはいそがしいかもしれません。', english:'He might be busy.', nepali:'उ व्यस्त हुन सक्छ।'}] },
  { id:'v32_4', lesson:32, level:'N4', word:'休む', reading:'やすむ', meaning:'To rest / To take a day off', meaningNepali:'आराम गर्नु / बिदा लिनु', kanjiCharacters:['休'], partOfSpeech:'Verb', grammarSentences:[{japanese:'疲れているなら、休んだほうがいいです。', reading:'つかれているなら、やすんだほうがいいです。', english:'If you are tired, you should rest.', nepali:'थकित छौ भने, आराम गर्दा राम्रो हुन्छ।'}] },
  { id:'v32_5', lesson:32, level:'N4', word:'傘', reading:'かさ', meaning:'Umbrella', meaningNepali:'छाता', kanjiCharacters:['傘'], partOfSpeech:'Noun', grammarSentences:[{japanese:'傘を持っていったほうがいいですよ。', reading:'かさをもっていったほうがいいですよ。', english:'You should take an umbrella.', nepali:'छाता लिएर जानु राम्रो हुन्छ।'}] },
  { id:'v32_6', lesson:32, level:'N4', word:'薬', reading:'くすり', meaning:'Medicine / Drug', meaningNepali:'औषधि', kanjiCharacters:['薬'], partOfSpeech:'Noun', grammarSentences:[{japanese:'薬を飲んだほうがいいです。', reading:'くすりをのんだほうがいいです。', english:'You should take medicine.', nepali:'औषधि खानु राम्रो हुन्छ।'}] },

  // ════════════════════════════════════
  // LESSON 33 — Imperative & Prohibition 命令形 / 禁止形
  // ════════════════════════════════════
  { id:'v33_1', lesson:33, level:'N4', word:'命令形', reading:'めいれいけい', meaning:'Imperative form (command)', meaningNepali:'आदेश रूप (गर!)', kanjiCharacters:['命','令','形'], partOfSpeech:'Grammar', grammarSentences:[{japanese:'急げ！(早く行け！)', reading:'いそげ！(はやくいけ！)', english:'Hurry! (Go quickly!)', nepali:'हतार गर! (चाँडो जा!)'}] },
  { id:'v33_2', lesson:33, level:'N4', word:'禁止形', reading:'きんしけい', meaning:'Prohibition form (don\'t ~!)', meaningNepali:'निषेध रूप (नगर!)', kanjiCharacters:['禁','止','形'], partOfSpeech:'Grammar', grammarSentences:[{japanese:'ここに入るな！', reading:'ここにはいるな！', english:'Do not enter here!', nepali:'यहाँ नछिर!'}] },
  { id:'v33_3', lesson:33, level:'N4', word:'〜という意味です', reading:'〜といういみです', meaning:'It means ~ / The meaning is ~', meaningNepali:'यसको अर्थ ~ हो', kanjiCharacters:['意','味'], partOfSpeech:'Grammar', grammarSentences:[{japanese:'「忙しい」は「busy」という意味です。', reading:'「いそがしい」は「busy」といういみです。', english:'「忙しい」 means "busy".', nepali:'「いそがしい」 को अर्थ "व्यस्त" हो।'}] },
  { id:'v33_4', lesson:33, level:'N4', word:'〜と言っています', reading:'〜といっています', meaning:'Is saying that ~ / Reporting speech', meaningNepali:'~ भन्दैछ / भनेको छ', kanjiCharacters:['言'], partOfSpeech:'Grammar', grammarSentences:[{japanese:'先生は宿題を出せと言っています。', reading:'せんせいはしゅくだいをだせといっています。', english:'The teacher is saying to hand in homework.', nepali:'शिक्षकले गृहकार्य बुझाउ भन्नुहुन्छ।'}] },
  { id:'v33_5', lesson:33, level:'N4', word:'注意する', reading:'ちゅういする', meaning:'To be careful / To warn', meaningNepali:'सावधान हुनु / सचेत गराउनु', kanjiCharacters:['注','意'], partOfSpeech:'Verb', grammarSentences:[{japanese:'危険なので注意してください。', reading:'きけんなのでちゅういしてください。', english:'Please be careful as it is dangerous.', nepali:'खतरनाक भएकाले सावधान हुनुस्।'}] },
  { id:'v33_6', lesson:33, level:'N4', word:'危険', reading:'きけん', meaning:'Danger / Dangerous', meaningNepali:'खतरा / खतरनाक', kanjiCharacters:['危','険'], partOfSpeech:'Noun/Adj', grammarSentences:[{japanese:'この道は危険です。走るな！', reading:'このみちはきけんです。はしるな！', english:'This road is dangerous. Do not run!', nepali:'यो बाटो खतरनाक छ। नदौड!'}] },

  // ════════════════════════════════════
  // LESSON 34 — Instructions 〜通りに / 〜あとで / 〜ないで
  // ════════════════════════════════════
  { id:'v34_1', lesson:34, level:'N4', word:'〜とおりに', reading:'〜とおりに', meaning:'Exactly as ~ / Just as told', meaningNepali:'ठ्याक्कै ~ अनुसार', kanjiCharacters:['通'], partOfSpeech:'Grammar', grammarSentences:[{japanese:'教えたとおりにやってください。', reading:'おしえたとおりにやってください。', english:'Please do it exactly as I taught you.', nepali:'मैले सिकाएको ठ्याक्कै गर्नुस्।'}] },
  { id:'v34_2', lesson:34, level:'N4', word:'〜あとで', reading:'〜あとで', meaning:'After doing ~', meaningNepali:'~ गरेपछि', kanjiCharacters:['後'], partOfSpeech:'Grammar', grammarSentences:[{japanese:'食事のあとで薬を飲んでください。', reading:'しょくじのあとでくすりをのんでください。', english:'Please take the medicine after meals.', nepali:'खाना खाएपछि औषधि खानुस्।'}] },
  { id:'v34_3', lesson:34, level:'N4', word:'〜ないで', reading:'〜ないで', meaning:'Without doing ~', meaningNepali:'~ नगरिकन', kanjiCharacters:[], partOfSpeech:'Grammar', grammarSentences:[{japanese:'朝ごはんを食べないで学校に来ました。', reading:'あさごはんをたべないでがっこうにきました。', english:'I came to school without eating breakfast.', nepali:'बिहानको खाना नखाइकन स्कूल आएँ।'}] },
  { id:'v34_4', lesson:34, level:'N4', word:'説明書', reading:'せつめいしょ', meaning:'Manual / Instruction booklet', meaningNepali:'निर्देशिका / म्यानुअल', kanjiCharacters:['説','明','書'], partOfSpeech:'Noun', grammarSentences:[{japanese:'説明書のとおりに操作してください。', reading:'せつめいしょのとおりにそうさしてください。', english:'Please operate it according to the manual.', nepali:'निर्देशिका अनुसार चलाउनुस्।'}] },
  { id:'v34_5', lesson:34, level:'N4', word:'順番', reading:'じゅんばん', meaning:'Order / Turn / Sequence', meaningNepali:'क्रम / पालो', kanjiCharacters:['順','番'], partOfSpeech:'Noun', grammarSentences:[{japanese:'順番どおりに並んでください。', reading:'じゅんばんどおりにならんでください。', english:'Please line up in order.', nepali:'क्रमबद्ध रूपमा लाइनमा उभिनुस्।'}] },
  { id:'v34_6', lesson:34, level:'N4', word:'押す', reading:'おす', meaning:'To press / To push', meaningNepali:'थिच्नु / धकेल्नु', kanjiCharacters:['押'], partOfSpeech:'Verb', grammarSentences:[{japanese:'このボタンを押してください。', reading:'このボタンをおしてください。', english:'Please press this button.', nepali:'यो बटन थिच्नुस्।'}] },

  // ════════════════════════════════════
  // LESSON 35 — Conditional Form 〜ば / 〜なら
  // ════════════════════════════════════
  { id:'v35_1', lesson:35, level:'N4', word:'〜ば条件形', reading:'〜ばじょうけんけい', meaning:'Conditional form (If ~ then)', meaningNepali:'शर्त रूप (यदि ~ भए)', kanjiCharacters:['条','件','形'], partOfSpeech:'Grammar', grammarSentences:[{japanese:'右に曲がれば、駅が見えます。', reading:'みぎにまがれば、えきがみえます。', english:'If you turn right, you will see the station.', nepali:'दाहिने मोडे स्टेशन देखिन्छ।'}] },
  { id:'v35_2', lesson:35, level:'N4', word:'〜なら', reading:'〜なら', meaning:'If it is the case that ~ (contextual)', meaningNepali:'~ हो भने / ~ को कुरा गर्नुपर्दा', kanjiCharacters:[], partOfSpeech:'Grammar', grammarSentences:[{japanese:'日本語を勉強したいなら、この教科書がいいですよ。', reading:'にほんごをべんきょうしたいなら、このきょうかしょがいいですよ。', english:'If you want to study Japanese, this textbook is good.', nepali:'जापानी सिक्न चाहनुहुन्छ भने, यो पाठ्यपुस्तक राम्रो छ।'}] },
  { id:'v35_3', lesson:35, level:'N4', word:'春になれば', reading:'はるになれば', meaning:'When spring comes (If it becomes spring)', meaningNepali:'वसन्त आए (यदि बसन्त भए)', kanjiCharacters:['春'], partOfSpeech:'Expression', grammarSentences:[{japanese:'春になれば、花が咲きます。', reading:'はるになれば、はながさきます。', english:'When spring comes, flowers bloom.', nepali:'वसन्त आए फूलहरू फुल्छन्।'}] },
  { id:'v35_4', lesson:35, level:'N4', word:'迷子', reading:'まいご', meaning:'Lost child / Getting lost', meaningNepali:'हराएको बच्चा / बाटो बिराउनु', kanjiCharacters:['迷','子'], partOfSpeech:'Noun', grammarSentences:[{japanese:'迷子になれば、警察に行きなさい。', reading:'まいごになれば、けいさつにいきなさい。', english:'If you get lost, go to the police.', nepali:'बाटो बिराए प्रहरीकोमा जानुस्।'}] },
  { id:'v35_5', lesson:35, level:'N4', word:'もし', reading:'もし', meaning:'If / Suppose (hypothetical opener)', meaningNepali:'यदि / मान्नुस् (काल्पनिक)', kanjiCharacters:[], partOfSpeech:'Conjunction', grammarSentences:[{japanese:'もし宝くじが当たれば、何がしたいですか。', reading:'もしたからくじがあたれば、なにがしたいですか。', english:'If you won the lottery, what would you want to do?', nepali:'यदि लटरी जिते के गर्न चाहनुहुन्थ्यो?'}] },

  // ─────────────────────────────────────────────
  // ■■■ N4 COMPLETE HANDBOOK ■■■
  // PART 2: CHAPTERS 36–45
  // ─────────────────────────────────────────────

  // ════════════════════════════════════
  // LESSON 36 — Habits & Abilities 〜ようにします / 〜ようになりました
  // ════════════════════════════════════
  { id:'v36_1', lesson:36, level:'N4', word:'〜ようにします', reading:'〜ようにします', meaning:'Try to do ~ / Make an effort to', meaningNepali:'~ गर्ने प्रयास गर्नु', kanjiCharacters:[], partOfSpeech:'Grammar', grammarSentences:[{japanese:'毎日野菜を食べるようにしています。', reading:'まいにちやさいをたべるようにしています。', english:'I try to eat vegetables every day.', nepali:'म हरेक दिन तरकारी खाने प्रयास गर्छु।'}] },
  { id:'v36_2', lesson:36, level:'N4', word:'〜ようになりました', reading:'〜ようになりました', meaning:'Came to be able to ~ / Have grown to', meaningNepali:'~ गर्न सक्ने भयो (क्रमशः)', kanjiCharacters:[], partOfSpeech:'Grammar', grammarSentences:[{japanese:'漢字が少し読めるようになりました。', reading:'かんじがすこしよめるようになりました。', english:'I have come to be able to read Kanji a little.', nepali:'काञ्जी अलिकति पढ्न सक्ने भएँ।'}] },
  { id:'v36_3', lesson:36, level:'N4', word:'〜なくなりました', reading:'〜なくなりました', meaning:'No longer ~ / Stopped doing ~', meaningNepali:'~ गर्न छोडेँ / अब ~ गर्दिन', kanjiCharacters:[], partOfSpeech:'Grammar', grammarSentences:[{japanese:'タバコを吸わなくなりました。', reading:'タバコをすわなくなりました。', english:'I no longer smoke.', nepali:'अब सिगरेट खाँदिन।'}] },
  { id:'v36_4', lesson:36, level:'N4', word:'習慣', reading:'しゅうかん', meaning:'Habit / Custom', meaningNepali:'बानी / रीतिरिवाज', kanjiCharacters:['習','慣'], partOfSpeech:'Noun', grammarSentences:[{japanese:'早起きの習慣をつけるようにしています。', reading:'はやおきのしゅうかんをつけるようにしています。', english:'I try to get into the habit of waking up early.', nepali:'बिहान चाँडो उठ्ने बानी बसाउने प्रयास गर्दैछु।'}] },
  { id:'v36_5', lesson:36, level:'N4', word:'運動する', reading:'うんどうする', meaning:'To exercise', meaningNepali:'व्यायाम गर्नु', kanjiCharacters:['運','動'], partOfSpeech:'Verb', grammarSentences:[{japanese:'週に三回運動するようにしています。', reading:'しゅうにさんかいうんどうするようにしています。', english:'I try to exercise three times a week.', nepali:'हप्तामा तीन पटक व्यायाम गर्ने प्रयास गर्छु।'}] },
  { id:'v36_6', lesson:36, level:'N4', word:'節約する', reading:'せつやくする', meaning:'To save / To economize', meaningNepali:'बचत गर्नु / किफायती हुनु', kanjiCharacters:['節','約'], partOfSpeech:'Verb', grammarSentences:[{japanese:'お金を節約するようにしています。', reading:'おかねをせつやくするようにしています。', english:'I try to save money.', nepali:'पैसा बचत गर्ने कोशिस गर्छु।'}] },

  // ════════════════════════════════════
  // LESSON 37 — Passive Voice 受身形 〜れる / 〜られる
  // ════════════════════════════════════
  { id:'v37_1', lesson:37, level:'N4', word:'受身形', reading:'うけみけい', meaning:'Passive voice form', meaningNepali:'कर्मवाच्य रूप (गरिनु)', kanjiCharacters:['受','身','形'], partOfSpeech:'Grammar', grammarSentences:[{japanese:'財布を盗まれました。', reading:'さいふをぬすまれました。', english:'My wallet was stolen (by someone).', nepali:'मेरो पर्स चोरियो।'}] },
  { id:'v37_2', lesson:37, level:'N4', word:'叱られる', reading:'しかられる', meaning:'To be scolded (passive)', meaningNepali:'डाँट खानु / फटकार पाउनु', kanjiCharacters:['叱'], partOfSpeech:'Passive Verb', grammarSentences:[{japanese:'先生に叱られました。', reading:'せんせいにしかられました。', english:'I was scolded by the teacher.', nepali:'शिक्षकबाट डाँट खाएँ।'}] },
  { id:'v37_3', lesson:37, level:'N4', word:'褒められる', reading:'ほめられる', meaning:'To be praised (passive)', meaningNepali:'प्रशंसा पाउनु', kanjiCharacters:['褒'], partOfSpeech:'Passive Verb', grammarSentences:[{japanese:'上司に褒められました。', reading:'じょうしにほめられました。', english:'I was praised by my boss.', nepali:'मालिकबाट प्रशंसा पाएँ।'}] },
  { id:'v37_4', lesson:37, level:'N4', word:'踏まれる', reading:'ふまれる', meaning:'To be stepped on (passive)', meaningNepali:'पाइला थिचिनु', kanjiCharacters:['踏'], partOfSpeech:'Passive Verb', grammarSentences:[{japanese:'電車の中で足を踏まれました。', reading:'でんしゃのなかであしをふまれました。', english:'My foot was stepped on in the train.', nepali:'रेलभित्र खुट्टामा पाइला पर्यो।'}] },
  { id:'v37_5', lesson:37, level:'N4', word:'押しつけられる', reading:'おしつけられる', meaning:'To be forced upon / pushed on', meaningNepali:'जबरजस्ती थोपरिनु', kanjiCharacters:['押'], partOfSpeech:'Passive Verb', grammarSentences:[{japanese:'残業を押しつけられました。', reading:'ざんぎょうをおしつけられました。', english:'I was forced to do overtime work.', nepali:'अतिरिक्त काम थोपरियो।'}] },
  { id:'v37_6', lesson:37, level:'N4', word:'発明される', reading:'はつめいされる', meaning:'To be invented (passive)', meaningNepali:'आविष्कार गरिनु', kanjiCharacters:['発','明'], partOfSpeech:'Passive Verb', grammarSentences:[{japanese:'電話はベルによって発明されました。', reading:'でんわはベルによってはつめいされました。', english:'The telephone was invented by Bell.', nepali:'टेलिफोन बेलद्वारा आविष्कार गरियो।'}] },

  // ════════════════════════════════════
  // LESSON 38 — Nominalization 〜の (Noun Clauses) / 〜のは〜です
  // ════════════════════════════════════
  { id:'v38_1', lesson:38, level:'N4', word:'〜のは〜です', reading:'〜のは〜です', meaning:'The thing that ~ is ~', meaningNepali:'~ गर्नु ~ हो (नामकरण)', kanjiCharacters:[], partOfSpeech:'Grammar', grammarSentences:[{japanese:'私が好きなのは旅行することです。', reading:'わたしがすきなのはりょこうすることです。', english:'What I like is travelling.', nepali:'मलाई मन पर्ने कुरा यात्रा गर्नु हो।'}] },
  { id:'v38_2', lesson:38, level:'N4', word:'〜のが好きです', reading:'〜のがすきです', meaning:'I like ~ (doing)', meaningNepali:'~ गर्न मन पर्छ', kanjiCharacters:[], partOfSpeech:'Grammar', grammarSentences:[{japanese:'本を読むのが好きです。', reading:'ほんをよむのがすきです。', english:'I like reading books.', nepali:'किताब पढ्न मन पर्छ।'}] },
  { id:'v38_3', lesson:38, level:'N4', word:'〜のが上手です', reading:'〜のがじょうずです', meaning:'Is good at ~ (doing)', meaningNepali:'~ गर्न सिपालु छ', kanjiCharacters:['上','手'], partOfSpeech:'Grammar', grammarSentences:[{japanese:'田中さんは料理するのが上手です。', reading:'たなかさんはりょうりするのがじょうずです。', english:'Mr. Tanaka is good at cooking.', nepali:'तानाका-जी खाना पकाउन सिपालु हुनुहुन्छ।'}] },
  { id:'v38_4', lesson:38, level:'N4', word:'趣味', reading:'しゅみ', meaning:'Hobby / Interest', meaningNepali:'शौख / अभिरुचि', kanjiCharacters:['趣','味'], partOfSpeech:'Noun', grammarSentences:[{japanese:'私の趣味は写真を撮ることです。', reading:'わたしのしゅみはしゃしんをとることです。', english:'My hobby is taking photographs.', nepali:'मेरो शौख फोटो खिच्नु हो।'}] },
  { id:'v38_5', lesson:38, level:'N4', word:'得意', reading:'とくい', meaning:'Good at / Specialty', meaningNepali:'सिपालु / बलियो पक्ष', kanjiCharacters:['得','意'], partOfSpeech:'Adj', grammarSentences:[{japanese:'歌を歌うのが得意です。', reading:'うたをうたうのがとくいです。', english:'I am good at singing.', nepali:'गाउन सिपालु छु।'}] },

  // ════════════════════════════════════
  // LESSON 39 — Causes 〜て / 〜ので (Linking cause and effect)
  // ════════════════════════════════════
  { id:'v39_1', lesson:39, level:'N4', word:'〜て（原因）', reading:'〜て（げんいん）', meaning:'Due to ~ / Because of ~ (cause)', meaningNepali:'~ भएर / ~ कारण (कारण)', kanjiCharacters:[], partOfSpeech:'Grammar', grammarSentences:[{japanese:'事故があって、道が混んでいます。', reading:'じこがあって、みちがこんでいます。', english:'Because of an accident, the road is congested.', nepali:'दुर्घटना भएर बाटो जाम छ।'}] },
  { id:'v39_2', lesson:39, level:'N4', word:'〜ので（理由）', reading:'〜ので（りゆう）', meaning:'Because ~ / Since ~ (reason)', meaningNepali:'किनभने ~ / भएकाले ~ (कारण)', kanjiCharacters:[], partOfSpeech:'Grammar', grammarSentences:[{japanese:'頭が痛いので、早退したいんですが。', reading:'あたまがいたいので、そうたいしたいんですが。', english:'Since I have a headache, I would like to leave early.', nepali:'टाउको दुखेकाले, चाँडो जान चाहन्छु।'}] },
  { id:'v39_3', lesson:39, level:'N4', word:'遅刻する', reading:'ちこくする', meaning:'To be late / To arrive late', meaningNepali:'ढिलो पुग्नु / लेट हुनु', kanjiCharacters:['遅','刻'], partOfSpeech:'Verb', grammarSentences:[{japanese:'バスが来なくて、会議に遅刻しました。', reading:'バスがこなくて、かいぎにちこくしました。', english:'Because the bus did not come, I was late for the meeting.', nepali:'बस नआएर मिटिङमा ढिलो भयो।'}] },
  { id:'v39_4', lesson:39, level:'N4', word:'渋滞', reading:'じゅうたい', meaning:'Traffic jam / Congestion', meaningNepali:'ट्राफिक जाम', kanjiCharacters:['渋','滞'], partOfSpeech:'Noun', grammarSentences:[{japanese:'渋滞があって、約束の時間に間に合いませんでした。', reading:'じゅうたいがあって、やくそくのじかんにまにあいませんでした。', english:'Due to the traffic jam, I could not make it on time.', nepali:'ट्राफिक जाम भएर समयमा पुग्न सकिनँ।'}] },
  { id:'v39_5', lesson:39, level:'N4', word:'地震', reading:'じしん', meaning:'Earthquake', meaningNepali:'भूकम्प', kanjiCharacters:['地','震'], partOfSpeech:'Noun', grammarSentences:[{japanese:'地震があって、建物が壊れました。', reading:'じしんがあって、たてものがこわれました。', english:'An earthquake occurred and the building was damaged.', nepali:'भूकम्प भएर भवन भत्कियो।'}] },

  // ════════════════════════════════════
  // LESSON 40 — Embedded Questions 〜かどうか / 〜か
  // ════════════════════════════════════
  { id:'v40_1', lesson:40, level:'N4', word:'〜かどうか', reading:'〜かどうか', meaning:'Whether or not ~', meaningNepali:'~ हो कि होइन', kanjiCharacters:[], partOfSpeech:'Grammar', grammarSentences:[{japanese:'試験に合格できるかどうか、心配です。', reading:'しけんにごうかくできるかどうか、しんぱいです。', english:'I am worried about whether I can pass the exam or not.', nepali:'परीक्षामा पास हुन्छु कि हुन्नँ भन्ने चिन्ता छ।'}] },
  { id:'v40_2', lesson:40, level:'N4', word:'〜かわかりません', reading:'〜かわかりません', meaning:'I do not know whether ~ / unknown', meaningNepali:'~ थाहा छैन', kanjiCharacters:[], partOfSpeech:'Grammar', grammarSentences:[{japanese:'彼が来るかどうかわかりません。', reading:'かれがくるかどうかわかりません。', english:'I do not know whether he will come.', nepali:'उ आउँछ कि आउँदैन थाहा छैन।'}] },
  { id:'v40_3', lesson:40, level:'N4', word:'聞く', reading:'きく', meaning:'To ask / To listen', meaningNepali:'सोध्नु / सुन्नु', kanjiCharacters:['聞'], partOfSpeech:'Verb', grammarSentences:[{japanese:'駅がどこにあるか聞いてみます。', reading:'えきがどこにあるかきいてみます。', english:'I will try asking where the station is.', nepali:'स्टेशन कहाँ छ भनेर सोध्छु।'}] },
  { id:'v40_4', lesson:40, level:'N4', word:'忘れる', reading:'わすれる', meaning:'To forget', meaningNepali:'बिर्सनु', kanjiCharacters:['忘'], partOfSpeech:'Verb', grammarSentences:[{japanese:'宿題を持ってきたかどうか忘れました。', reading:'しゅくだいをもってきたかどうかわすれました。', english:'I forgot whether I brought my homework or not.', nepali:'गृहकार्य ल्याएँ कि ल्याइनँ बिर्सिएँ।'}] },
  { id:'v40_5', lesson:40, level:'N4', word:'確かめる', reading:'たしかめる', meaning:'To confirm / To make sure', meaningNepali:'निश्चित गर्नु / सुनिश्चित गर्नु', kanjiCharacters:['確'], partOfSpeech:'Verb', grammarSentences:[{japanese:'予約ができているかどうか確かめてください。', reading:'よやくができているかどうかたしかめてください。', english:'Please check whether the reservation has been made.', nepali:'बुकिङ भयो कि भएन जाँच्नुस्।'}] },

  // ════════════════════════════════════
  // LESSON 41 — Polite Giving & Receiving くれる / もらう / あげる (Keigo)
  // ════════════════════════════════════
  { id:'v41_1', lesson:41, level:'N4', word:'いただきます', reading:'いただきます', meaning:'Humble: To receive / To eat', meaningNepali:'प्राप्त गर्नु (विनम्र) / खानु', kanjiCharacters:[], partOfSpeech:'Humble Verb', grammarSentences:[{japanese:'社長からお土産をいただきました。', reading:'しゃちょうからおみやげをいただきました。', english:'I received a souvenir from the company president.', nepali:'कम्पनी अध्यक्षबाट उपहार पाएँ।'}] },
  { id:'v41_2', lesson:41, level:'N4', word:'くださいます', reading:'くださいます', meaning:'Honorific: To give (to me)', meaningNepali:'दिनुहुन्छ (आदरार्थी)', kanjiCharacters:[], partOfSpeech:'Honorific Verb', grammarSentences:[{japanese:'先生が本をくださいました。', reading:'せんせいがほんをくださいました。', english:'The teacher gave me a book.', nepali:'शिक्षकले मलाई किताब दिनुभयो।'}] },
  { id:'v41_3', lesson:41, level:'N4', word:'さしあげます', reading:'さしあげます', meaning:'Humble: To give (to superior)', meaningNepali:'दिन्छु (आफूभन्दा माथिलाई, विनम्र)', kanjiCharacters:[], partOfSpeech:'Humble Verb', grammarSentences:[{japanese:'先生にお花をさしあげました。', reading:'せんせいにおはなをさしあげました。', english:'I gave flowers to the teacher (humbly).', nepali:'शिक्षकलाई फूल दिएँ (विनम्र रूपमा)।'}] },
  { id:'v41_4', lesson:41, level:'N4', word:'やります', reading:'やります', meaning:'To give (to lower / pet)', meaningNepali:'दिनु (सानोलाई / पशुलाई)', kanjiCharacters:[], partOfSpeech:'Verb', grammarSentences:[{japanese:'犬にえさをやります。', reading:'いぬにえさをやります。', english:'I give food to the dog.', nepali:'कुकुरलाई खाना दिन्छु।'}] },
  { id:'v41_5', lesson:41, level:'N4', word:'手伝う', reading:'てつだう', meaning:'To help / To assist', meaningNepali:'सहयोग गर्नु', kanjiCharacters:['手','伝'], partOfSpeech:'Verb', grammarSentences:[{japanese:'引越しを手伝っていただけませんか。', reading:'ひっこしをてつだっていただけませんか。', english:'Could you please help me move?', nepali:'सरुवामा सहयोग गरिदिनुहुन्छ?'}] },

  // ════════════════════════════════════
  // LESSON 42 — Purpose 〜ために / 〜のに使います
  // ════════════════════════════════════
  { id:'v42_1', lesson:42, level:'N4', word:'〜ために', reading:'〜ために', meaning:'In order to ~ / For the sake of ~', meaningNepali:'~ को लागि / ~ गर्नका लागि', kanjiCharacters:[], partOfSpeech:'Grammar', grammarSentences:[{japanese:'健康のために毎日運動します。', reading:'けんこうのためにまいにちうんどうします。', english:'I exercise every day for my health.', nepali:'स्वास्थ्यको लागि हरेक दिन व्यायाम गर्छु।'}] },
  { id:'v42_2', lesson:42, level:'N4', word:'〜のに使います', reading:'〜のにつかいます', meaning:'Used for ~ / This is used to ~', meaningNepali:'~ को लागि प्रयोग गरिन्छ', kanjiCharacters:['使'], partOfSpeech:'Grammar', grammarSentences:[{japanese:'この機械は野菜を切るのに使います。', reading:'このきかいはやさいをきるのにつかいます。', english:'This machine is used for cutting vegetables.', nepali:'यो मेसिन तरकारी काट्नका लागि प्रयोग गरिन्छ।'}] },
  { id:'v42_3', lesson:42, level:'N4', word:'資金', reading:'しきん', meaning:'Funds / Capital', meaningNepali:'पुँजी / कोष', kanjiCharacters:['資','金'], partOfSpeech:'Noun', grammarSentences:[{japanese:'会社を作るために資金が必要です。', reading:'かいしゃをつくるためにしきんがひつようです。', english:'Funds are needed in order to start a company.', nepali:'कम्पनी खोल्नका लागि पुँजी चाहिन्छ।'}] },
  { id:'v42_4', lesson:42, level:'N4', word:'目的', reading:'もくてき', meaning:'Purpose / Goal / Objective', meaningNepali:'लक्ष्य / उद्देश्य', kanjiCharacters:['目','的'], partOfSpeech:'Noun', grammarSentences:[{japanese:'目的のために努力します。', reading:'もくてきのためにどりょくします。', english:'I work hard for my goal.', nepali:'लक्ष्यको लागि मेहनत गर्छु।'}] },
  { id:'v42_5', lesson:42, level:'N4', word:'努力する', reading:'どりょくする', meaning:'To make an effort / To work hard', meaningNepali:'मेहनत गर्नु / परिश्रम गर्नु', kanjiCharacters:['努','力'], partOfSpeech:'Verb', grammarSentences:[{japanese:'合格するために一生懸命努力します。', reading:'ごうかくするためにいっしょうけんめいどりょくします。', english:'I work hard in order to pass.', nepali:'पास गर्नका लागि पूरा मेहनत गर्छु।'}] },

  // ════════════════════════════════════
  // LESSON 43 — Conjecture 〜そうです (Appearance) / 〜らしい
  // ════════════════════════════════════
  { id:'v43_1', lesson:43, level:'N4', word:'〜そうです（様態）', reading:'〜そうです', meaning:'Looks like ~ / Appears to ~', meaningNepali:'~ जस्तो देखिन्छ (दृष्टिले)', kanjiCharacters:[], partOfSpeech:'Grammar', grammarSentences:[{japanese:'この料理はおいしそうです。', reading:'このりょうりはおいしそうです。', english:'This food looks delicious.', nepali:'यो खाना स्वादिलो देखिन्छ।'}] },
  { id:'v43_2', lesson:43, level:'N4', word:'〜らしい', reading:'〜らしい', meaning:'Seems like ~ / Typical of ~', meaningNepali:'~ जस्तो लाग्छ / ~ जस्तै', kanjiCharacters:[], partOfSpeech:'Grammar', grammarSentences:[{japanese:'彼は忙しいらしいです。', reading:'かれはいそがしいらしいです。', english:'He seems to be busy.', nepali:'उ व्यस्त जस्तो देखिन्छ।'}] },
  { id:'v43_3', lesson:43, level:'N4', word:'楽しそう', reading:'たのしそう', meaning:'Looks fun / Appears enjoyable', meaningNepali:'मजेदार देखिन्छ', kanjiCharacters:['楽'], partOfSpeech:'Adjective', grammarSentences:[{japanese:'あのパーティーは楽しそうですね。', reading:'あのパーティーはたのしそうですね。', english:'That party looks fun, doesn\'t it?', nepali:'त्यो पार्टी मजेदार देखिन्छ, हैन?'}] },
  { id:'v43_4', lesson:43, level:'N4', word:'難しそう', reading:'むずかしそう', meaning:'Looks difficult', meaningNepali:'गाह्रो देखिन्छ', kanjiCharacters:['難'], partOfSpeech:'Adjective', grammarSentences:[{japanese:'この問題は難しそうです。', reading:'このもんだいはむずかしそうです。', english:'This problem looks difficult.', nepali:'यो समस्या गाह्रो देखिन्छ।'}] },
  { id:'v43_5', lesson:43, level:'N4', word:'元気そう', reading:'げんきそう', meaning:'Looks healthy / Seems well', meaningNepali:'स्वस्थ देखिन्छ / ठीक जस्तो देखिन्छ', kanjiCharacters:['元','気'], partOfSpeech:'Adjective', grammarSentences:[{japanese:'田中さんは元気そうですね。', reading:'たなかさんはげんきそうですね。', english:'Mr. Tanaka looks well, doesn\'t he?', nepali:'तानाका-जी स्वस्थ देखिनुहुन्छ, हैन?'}] },

  // ════════════════════════════════════
  // LESSON 44 — Excess & Ease 〜すぎます / 〜やすい / 〜にくい
  // ════════════════════════════════════
  { id:'v44_1', lesson:44, level:'N4', word:'〜すぎます', reading:'〜すぎます', meaning:'Too much ~ / Excessively ~', meaningNepali:'अत्यधिक ~ / धेरै ~', kanjiCharacters:['過'], partOfSpeech:'Grammar', grammarSentences:[{japanese:'昨日食べすぎて、お腹が痛いです。', reading:'きのうたべすぎて、おなかがいたいです。', english:'I ate too much yesterday and my stomach hurts.', nepali:'हिजो धेरै खाएर पेट दुख्यो।'}] },
  { id:'v44_2', lesson:44, level:'N4', word:'〜やすい', reading:'〜やすい', meaning:'Easy to ~ / Tends to ~', meaningNepali:'~ गर्न सजिलो / ~ हुने सम्भावना', kanjiCharacters:[], partOfSpeech:'Grammar', grammarSentences:[{japanese:'この字は読みやすいです。', reading:'このじはよみやすいです。', english:'This character is easy to read.', nepali:'यो अक्षर पढ्न सजिलो छ।'}] },
  { id:'v44_3', lesson:44, level:'N4', word:'〜にくい', reading:'〜にくい', meaning:'Difficult to ~ / Hard to ~', meaningNepali:'~ गर्न गाह्रो', kanjiCharacters:[], partOfSpeech:'Grammar', grammarSentences:[{japanese:'この漢字は書きにくいです。', reading:'このかんじはかきにくいです。', english:'This Kanji is difficult to write.', nepali:'यो काञ्जी लेख्न गाह्रो छ।'}] },
  { id:'v44_4', lesson:44, level:'N4', word:'飲みすぎる', reading:'のみすぎる', meaning:'To drink too much', meaningNepali:'धेरै पिउनु', kanjiCharacters:['飲'], partOfSpeech:'Verb', grammarSentences:[{japanese:'お酒を飲みすぎないでください。', reading:'おさけをのみすぎないでください。', english:'Please do not drink too much alcohol.', nepali:'धेरै मदिरा नपिउनुस्।'}] },
  { id:'v44_5', lesson:44, level:'N4', word:'使いやすい', reading:'つかいやすい', meaning:'Easy to use', meaningNepali:'प्रयोग गर्न सजिलो', kanjiCharacters:['使'], partOfSpeech:'Adj', grammarSentences:[{japanese:'このアプリは使いやすいです。', reading:'このアプリはつかいやすいです。', english:'This app is easy to use.', nepali:'यो एप प्रयोग गर्न सजिलो छ।'}] },

  // ════════════════════════════════════
  // LESSON 45 — Cases / Situations 〜場合は / 〜として
  // ════════════════════════════════════
  { id:'v45_1', lesson:45, level:'N4', word:'〜場合は', reading:'〜ばあいは', meaning:'In the event of ~ / In case of ~', meaningNepali:'~ को अवस्थामा / ~ भएमा', kanjiCharacters:['場','合'], partOfSpeech:'Grammar', grammarSentences:[{japanese:'緊急の場合は、119に電話してください。', reading:'きんきゅうのばあいは、119にでんわしてください。', english:'In case of an emergency, please call 119.', nepali:'आपतकालीन अवस्थामा 119 मा फोन गर्नुस्।'}] },
  { id:'v45_2', lesson:45, level:'N4', word:'〜として', reading:'〜として', meaning:'As ~ / In the capacity of ~', meaningNepali:'~ को रूपमा / ~ भएर', kanjiCharacters:[], partOfSpeech:'Grammar', grammarSentences:[{japanese:'通訳として働いています。', reading:'つうやくとしてはたらいています。', english:'I work as an interpreter.', nepali:'म दोभाषेको रूपमा काम गर्छु।'}] },
  { id:'v45_3', lesson:45, level:'N4', word:'緊急', reading:'きんきゅう', meaning:'Emergency / Urgent', meaningNepali:'आपतकाल / अत्यावश्यक', kanjiCharacters:['緊','急'], partOfSpeech:'Noun/Adj', grammarSentences:[{japanese:'緊急の場合には遠慮なく連絡ください。', reading:'きんきゅうのばあいにはえんりょなくれんらくください。', english:'In case of an emergency, please contact us without hesitation.', nepali:'आपतकालमा नहिचकिचाई सम्पर्क गर्नुस्।'}] },
  { id:'v45_4', lesson:45, level:'N4', word:'代わりに', reading:'かわりに', meaning:'Instead of ~ / In place of ~', meaningNepali:'~ को ठाउँमा / ~ बदलामा', kanjiCharacters:['代'], partOfSpeech:'Expression', grammarSentences:[{japanese:'田中さんの代わりに出席します。', reading:'たなかさんのかわりにしゅっせきします。', english:'I will attend in place of Mr. Tanaka.', nepali:'तानाका-जीको ठाउँमा उपस्थित हुन्छु।'}] },

  // ─────────────────────────────────────────────
  // ■■■ N4 COMPLETE HANDBOOK ■■■
  // PART 3: CHAPTERS 46–50
  // ─────────────────────────────────────────────

  // ════════════════════════════════════
  // LESSON 46 — Timing 〜ところです / 〜はずです
  // ════════════════════════════════════
  { id:'v46_1', lesson:46, level:'N4', word:'〜ところです（今）', reading:'〜ところです', meaning:'Just about to / Currently doing / Just finished', meaningNepali:'भर्खर ~ गर्दैछु / गरेर सकेँ', kanjiCharacters:['所'], partOfSpeech:'Grammar', grammarSentences:[{japanese:'今、出かけるところです。', reading:'いま、でかけるところです。', english:'I am just about to go out now.', nepali:'अहिले भर्खर बाहिर जान लागेको छु।'}] },
  { id:'v46_2', lesson:46, level:'N4', word:'〜たところです', reading:'〜たところです', meaning:'Just finished ~ (just now)', meaningNepali:'भर्खरै ~ गरेँ', kanjiCharacters:[], partOfSpeech:'Grammar', grammarSentences:[{japanese:'ちょうど宿題が終わったところです。', reading:'ちょうどしゅくだいがおわったところです。', english:'I just finished my homework right now.', nepali:'भर्खरै गृहकार्य सकेँ।'}] },
  { id:'v46_3', lesson:46, level:'N4', word:'〜ているところです', reading:'〜ているところです', meaning:'In the middle of doing ~', meaningNepali:'~ गर्दैछु (बिचैमा)', kanjiCharacters:[], partOfSpeech:'Grammar', grammarSentences:[{japanese:'今、報告書を書いているところです。', reading:'いま、ほうこくしょをかいているところです。', english:'I am in the middle of writing a report right now.', nepali:'अहिले रिपोर्ट लेख्दैछु।'}] },
  { id:'v46_4', lesson:46, level:'N4', word:'〜はずです', reading:'〜はずです', meaning:'Expected to ~ / Supposed to ~', meaningNepali:'~ हुनुपर्ने हो / ~ हुनुपर्छ', kanjiCharacters:[], partOfSpeech:'Grammar', grammarSentences:[{japanese:'彼はもう来ているはずです。', reading:'かれはもうきているはずです。', english:'He is supposed to be here already.', nepali:'उ पहिले नै आइसक्नुपर्ने हो।'}] },
  { id:'v46_5', lesson:46, level:'N4', word:'〜はずがありません', reading:'〜はずがありません', meaning:'There is no way ~ / Cannot possibly', meaningNepali:'~ हुनै सक्दैन / सम्भव नै छैन', kanjiCharacters:[], partOfSpeech:'Grammar', grammarSentences:[{japanese:'彼がそんなことをするはずがありません。', reading:'かれがそんなことをするはずがありません。', english:'There is no way he would do such a thing.', nepali:'उसले त्यस्तो काम गर्ने सम्भव नै छैन।'}] },
  { id:'v46_6', lesson:46, level:'N4', word:'到着する', reading:'とうちゃくする', meaning:'To arrive', meaningNepali:'पुग्नु / आइपुग्नु', kanjiCharacters:['到','着'], partOfSpeech:'Verb', grammarSentences:[{japanese:'電車はもうすぐ到着するはずです。', reading:'でんしゃはもうすぐとうちゃくするはずです。', english:'The train is supposed to arrive soon.', nepali:'रेल चाँडै आइपुग्नुपर्ने हो।'}] },
  { id:'v46_7', lesson:46, level:'N4', word:'準備する', reading:'じゅんびする', meaning:'To prepare / To get ready', meaningNepali:'तयारी गर्नु', kanjiCharacters:['準','備'], partOfSpeech:'Verb', grammarSentences:[{japanese:'今、準備しているところです。', reading:'いま、じゅんびしているところです。', english:'I am in the middle of preparing now.', nepali:'अहिले तयारी गर्दैछु।'}] },
  { id:'v46_8', lesson:46, level:'N4', word:'完了する', reading:'かんりょうする', meaning:'To complete / To finish', meaningNepali:'पूर्ण गर्नु / सम्पन्न गर्नु', kanjiCharacters:['完','了'], partOfSpeech:'Verb', grammarSentences:[{japanese:'報告書が完了したところです。', reading:'ほうこくしょがかんりょうしたところです。', english:'The report has just been completed.', nepali:'रिपोर्ट भर्खरै सम्पन्न भयो।'}] },

  // ════════════════════════════════════
  // LESSON 47 — Hearsay 〜そうです (Reported Speech)
  // ════════════════════════════════════
  { id:'v47_1', lesson:47, level:'N4', word:'〜そうです（伝聞）', reading:'〜そうです（でんぶん）', meaning:'I heard that ~ / Reportedly ~', meaningNepali:'सुने अनुसार ~ रे / कसैले भन्यो कि ~', kanjiCharacters:[], partOfSpeech:'Grammar', grammarSentences:[{japanese:'来月、雨が多いそうです。', reading:'らいげつ、あめがおおいそうです。', english:'I heard that there will be a lot of rain next month.', nepali:'सुनेँ, अर्को महिना धेरै पानी पर्ने रे।'}] },
  { id:'v47_2', lesson:47, level:'N4', word:'〜とのことです', reading:'〜とのことです', meaning:'It has been said that ~ (formal)', meaningNepali:'~ भनिएको छ (औपचारिक)', kanjiCharacters:[], partOfSpeech:'Grammar', grammarSentences:[{japanese:'社長は明日来られないとのことです。', reading:'しゃちょうはあしたこられないとのことです。', english:'It has been said that the president cannot come tomorrow.', nepali:'अध्यक्ष भोलि आउन नसक्ने भनिएको छ।'}] },
  { id:'v47_3', lesson:47, level:'N4', word:'噂', reading:'うわさ', meaning:'Rumour / Gossip', meaningNepali:'हल्ला / अफवाह', kanjiCharacters:['噂'], partOfSpeech:'Noun', grammarSentences:[{japanese:'うわさによると、田中さんが転職したそうです。', reading:'うわさによると、たなかさんがてんしょくしたそうです。', english:'According to rumours, Mr. Tanaka changed jobs.', nepali:'हल्ला सुन्दा तानाका-जीले काम परिवर्तन गरेको रे।'}] },
  { id:'v47_4', lesson:47, level:'N4', word:'天気予報', reading:'てんきよほう', meaning:'Weather forecast', meaningNepali:'मौसम पूर्वानुमान', kanjiCharacters:['天','気','予','報'], partOfSpeech:'Noun', grammarSentences:[{japanese:'天気予報によると、明日は晴れるそうです。', reading:'てんきよほうによると、あしたははれるそうです。', english:'According to the weather forecast, it will be sunny tomorrow.', nepali:'मौसम पूर्वानुमान अनुसार भोलि घाम लाग्ने रे।'}] },
  { id:'v47_5', lesson:47, level:'N4', word:'ニュース', reading:'ニュース', meaning:'News', meaningNepali:'समाचार', kanjiCharacters:[], partOfSpeech:'Noun', grammarSentences:[{japanese:'ニュースによると、事故があったそうです。', reading:'ニュースによると、じこがあったそうです。', english:'According to the news, there was an accident.', nepali:'समाचार अनुसार दुर्घटना भएको रे।'}] },

  // ════════════════════════════════════
  // LESSON 48 — Causative Form 使役形 〜させる
  // ════════════════════════════════════
  { id:'v48_1', lesson:48, level:'N4', word:'使役形', reading:'しえきけい', meaning:'Causative form (Make / Let someone do)', meaningNepali:'प्रेरणार्थक रूप (गराउनु / गर्न दिनु)', kanjiCharacters:['使','役','形'], partOfSpeech:'Grammar', grammarSentences:[{japanese:'子供に野菜を食べさせます。', reading:'こどもにやさいをたべさせます。', english:'I make my child eat vegetables.', nepali:'बच्चालाई तरकारी खुवाउँछु।'}] },
  { id:'v48_2', lesson:48, level:'N4', word:'〜させてください', reading:'〜させてください', meaning:'Please let me ~ (request permission)', meaningNepali:'मलाई ~ गर्न दिनुस् (अनुमति माग्नु)', kanjiCharacters:[], partOfSpeech:'Grammar', grammarSentences:[{japanese:'ちょっと確認させてください。', reading:'ちょっとかくにんさせてください。', english:'Please let me confirm for a moment.', nepali:'अलि जाँच्न दिनुस् त।'}] },
  { id:'v48_3', lesson:48, level:'N4', word:'待たせる', reading:'またせる', meaning:'To make someone wait', meaningNepali:'कुराउनु / प्रतीक्षा गराउनु', kanjiCharacters:['待'], partOfSpeech:'Causative Verb', grammarSentences:[{japanese:'長い間待たせてすみませんでした。', reading:'ながいあいだまたせてすみませんでした。', english:'I am sorry for making you wait so long.', nepali:'लामो समय कुराउनुभएकोमा क्षमा।'}] },
  { id:'v48_4', lesson:48, level:'N4', word:'参加させる', reading:'さんかさせる', meaning:'To allow to participate / To make join', meaningNepali:'सहभागी गराउनु', kanjiCharacters:['参','加'], partOfSpeech:'Causative Verb', grammarSentences:[{japanese:'インターンを会議に参加させました。', reading:'インターンをかいぎにさんかさせました。', english:'I had the intern participate in the meeting.', nepali:'इन्टर्नलाई मिटिङमा सहभागी गराएँ।'}] },
  { id:'v48_5', lesson:48, level:'N4', word:'紹介させていただきます', reading:'しょうかいさせていただきます', meaning:'Allow me to introduce (humble request)', meaningNepali:'परिचय गराउन अनुमति लिन चाहन्छु', kanjiCharacters:['紹','介'], partOfSpeech:'Expression', grammarSentences:[{japanese:'では、自己紹介させていただきます。', reading:'では、じこしょうかいさせていただきます。', english:'Now, please allow me to introduce myself.', nepali:'अब, आफ्नो परिचय दिन अनुमति लिन्छु।'}] },

  // ════════════════════════════════════
  // LESSON 49 — Honorific Keigo 尊敬語
  // ════════════════════════════════════
  { id:'v49_1', lesson:49, level:'N4', word:'尊敬語', reading:'そんけいご', meaning:'Honorific language (respectful)', meaningNepali:'सम्मानार्थी भाषा (आदरार्थी)', kanjiCharacters:['尊','敬','語'], partOfSpeech:'Noun', grammarSentences:[{japanese:'社長がいらっしゃいました。', reading:'しゃちょうがいらっしゃいました。', english:'The company president has arrived.', nepali:'कम्पनी अध्यक्ष आइपुग्नुभयो।'}] },
  { id:'v49_2', lesson:49, level:'N4', word:'いらっしゃいます', reading:'いらっしゃいます', meaning:'Honorific: To be / To go / To come', meaningNepali:'हुनुहुन्छ / जानुहुन्छ / आउनुहुन्छ (आदर)', kanjiCharacters:[], partOfSpeech:'Honorific Verb', grammarSentences:[{japanese:'田中部長はどちらにいらっしゃいますか。', reading:'たなかぶちょうはどちらにいらっしゃいますか。', english:'Where is Department Manager Tanaka?', nepali:'तानाका विभाग प्रमुख कहाँ हुनुहुन्छ?'}] },
  { id:'v49_3', lesson:49, level:'N4', word:'おっしゃいます', reading:'おっしゃいます', meaning:'Honorific: To say', meaningNepali:'भन्नुहुन्छ (आदर)', kanjiCharacters:[], partOfSpeech:'Honorific Verb', grammarSentences:[{japanese:'先生は何とおっしゃいましたか。', reading:'せんせいはなんとおっしゃいましたか。', english:'What did the teacher say?', nepali:'शिक्षकले के भन्नुभयो?'}] },
  { id:'v49_4', lesson:49, level:'N4', word:'なさいます', reading:'なさいます', meaning:'Honorific: To do', meaningNepali:'गर्नुहुन्छ (आदर)', kanjiCharacters:[], partOfSpeech:'Honorific Verb', grammarSentences:[{japanese:'社長は何時に来られますか。', reading:'しゃちょうはなんじにこられますか。', english:'What time will the president come?', nepali:'अध्यक्ष कति बजे आउनुहुन्छ?'}] },
  { id:'v49_5', lesson:49, level:'N4', word:'ご存知ですか', reading:'ごぞんじですか', meaning:'Honorific: Do you know? (respectful)', meaningNepali:'थाहा हुनुहुन्छ? (आदरार्थी)', kanjiCharacters:['存','知'], partOfSpeech:'Expression', grammarSentences:[{japanese:'この件についてご存知ですか。', reading:'このけんについてごぞんじですか。', english:'Are you aware of this matter?', nepali:'यो विषयमा थाहा हुनुहुन्छ?'}] },
  { id:'v49_6', lesson:49, level:'N4', word:'お〜になります', reading:'お〜になります', meaning:'Honorific pattern (do ~)', meaningNepali:'~ गर्नुहुन्छ (आदर ढाँचा)', kanjiCharacters:[], partOfSpeech:'Grammar Pattern', grammarSentences:[{japanese:'先生はもうお帰りになりましたか。', reading:'せんせいはもうおかえりになりましたか。', english:'Has the teacher already gone home?', nepali:'शिक्षक पहिले नै घर फर्किनुभयो?'}] },

  // ════════════════════════════════════
  // LESSON 50 — Humble Keigo 謙譲語
  // ════════════════════════════════════
  { id:'v50_1', lesson:50, level:'N4', word:'謙譲語', reading:'けんじょうご', meaning:'Humble language (self-lowering)', meaningNepali:'नम्र भाषा (आफूलाई सानो देखाउने)', kanjiCharacters:['謙','譲','語'], partOfSpeech:'Noun', grammarSentences:[{japanese:'私がご案内いたします。', reading:'わたしがごあんないいたします。', english:'I will guide you (humble).', nepali:'म तपाईंलाई बाटो देखाउँछु (विनम्र)।'}] },
  { id:'v50_2', lesson:50, level:'N4', word:'いたします', reading:'いたします', meaning:'Humble: To do', meaningNepali:'गर्छु (विनम्र)', kanjiCharacters:[], partOfSpeech:'Humble Verb', grammarSentences:[{japanese:'ご連絡いたします。', reading:'ごれんらくいたします。', english:'I will contact you (humbly).', nepali:'म सम्पर्क गर्छु (विनम्र)।'}] },
  { id:'v50_3', lesson:50, level:'N4', word:'参ります', reading:'まいります', meaning:'Humble: To come / To go', meaningNepali:'जान्छु / आउँछु (विनम्र)', kanjiCharacters:['参'], partOfSpeech:'Humble Verb', grammarSentences:[{japanese:'すぐに参ります。', reading:'すぐにまいります。', english:'I will be right there.', nepali:'म तुरुन्त आउँछु (विनम्र)।'}] },
  { id:'v50_4', lesson:50, level:'N4', word:'申します', reading:'もうします', meaning:'Humble: To say / To be called', meaningNepali:'भन्छु / नाम हो (विनम्र)', kanjiCharacters:['申'], partOfSpeech:'Humble Verb', grammarSentences:[{japanese:'田中と申します。よろしくお願いいたします。', reading:'たなかともうします。よろしくおねがいいたします。', english:'My name is Tanaka. Please treat me well.', nepali:'मेरो नाम तानाका हो। सहयोगको अपेक्षा गर्छु।'}] },
  { id:'v50_5', lesson:50, level:'N4', word:'拝見する', reading:'はいけんする', meaning:'Humble: To see / To look at', meaningNepali:'हेर्छु (विनम्र)', kanjiCharacters:['拝','見'], partOfSpeech:'Humble Verb', grammarSentences:[{japanese:'ご資料を拝見してもよろしいですか。', reading:'ごしりょうをはいけんしてもよろしいですか。', english:'May I have a look at the documents?', nepali:'के कागजातहरू हेर्न हुन्छ?'}] },
  { id:'v50_6', lesson:50, level:'N4', word:'存じます', reading:'ぞんじます', meaning:'Humble: To know / To think', meaningNepali:'थाहा छ / सोच्छु (विनम्र)', kanjiCharacters:['存'], partOfSpeech:'Humble Verb', grammarSentences:[{japanese:'ご住所は存じておりません。', reading:'ごじゅうしょはぞんじておりません。', english:'I am not aware of your address.', nepali:'तपाईंको ठेगाना मलाई थाहा छैन (विनम्र)।'}] },
  { id:'v50_7', lesson:50, level:'N4', word:'お〜します', reading:'お〜します', meaning:'Humble pattern (humble action toward listener)', meaningNepali:'~ गर्छु (नम्र ढाँचा)', kanjiCharacters:[], partOfSpeech:'Grammar Pattern', grammarSentences:[{japanese:'荷物をお持ちします。', reading:'にもつをおもちします。', english:'I will carry your luggage (for you).', nepali:'म तपाईंको सामान बोक्छु (विनम्र)।'}] },

  // ─────────────────────────────────────────────
  // N3 (LESSONS 51 - 75) — Summary entries
  // ─────────────────────────────────────────────
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
  return [...new Set(data.map(v => v.lesson))].sort((a, b) => a - b);
}

export function getAvailableLessons(): number[] {
  return getAvailableLessonsForLevel('N5');
}
