// ============================================================
// KOREAN BASICS MODULE SYSTEM DATASET
// 12 Vertical Modules — Complete Foundation Curriculum
// ============================================================

export type ContentBlockType =
  | 'TEXT'
  | 'HEADING'
  | 'KOREAN_TEXT'
  | 'TRANSLATION'
  | 'VOCABULARY'
  | 'GRAMMAR'
  | 'EXAMPLE'
  | 'AUDIO'
  | 'PRONUNCIATION'
  | 'TABLE'
  | 'TIP'
  | 'WARNING'
  | 'NOTE'
  | 'QUIZ'
  | 'FLASHCARD';

export interface ContentBlock {
  id: string;
  type: ContentBlockType;
  heading?: string;
  text?: string;
  koreanText?: string;
  romanization?: string;
  translationEn?: string;
  translationNp?: string;
  audioText?: string;
  items?: { term: string; rom: string; en: string; np: string }[];
  quizQuestion?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
  tableData?: { headers: string[]; rows: string[][] };
}

export interface BasicsLesson {
  id: string;
  lessonNumber: number;
  title: string;
  titleKorean?: string;
  description: string;
  estimatedMinutes: number;
  contentBlocks: ContentBlock[];
}

export interface BasicsModule {
  id: string;
  moduleNumber: number;
  title: string;
  titleKorean: string;
  emoji: string;
  description: string;
  category: string;
  badgeName: string;
  badgeEmoji: string;
  lessons: BasicsLesson[];
}

export interface PlacementQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  recommendModuleId: string;
  recommendModuleName: string;
}

// ────────────────────────────────────────────────────────────
// 12 COMPLETE KOREAN BASICS MODULES
// ────────────────────────────────────────────────────────────
export const KOREAN_BASICS_MODULES: BasicsModule[] = [
  // ── MODULE 01: KOREAN FOUNDATION ──
  {
    id: 'module-01',
    moduleNumber: 1,
    title: 'Korean Foundation',
    titleKorean: '한국어 창제 원리와 기초재단',
    emoji: '🌱',
    description: 'Complete single-page guide to Korean language history, King Sejong, 3 creation elements (Sky, Earth, Human), speech organ consonants, dot rules, and SOV word order in Nepali & English.',
    category: 'Foundation',
    badgeName: 'Korean Scholar Badge',
    badgeEmoji: '📜',
    lessons: [
      {
        id: 'mod1-less1',
        lessonNumber: 1,
        title: 'Complete Korean Foundation & Creation Philosophy',
        titleKorean: '한글의 유래, 제자 원리(천·지·인) 및 문장 구조',
        description: 'Single-scroll comprehensive master guide: Hunminjeongeum, 3 Universal Elements (Sky, Earth, Human), Consonant Organology, Dot addition rules, and SOV sentence logic.',
        estimatedMinutes: 20,
        contentBlocks: [
          {
            id: 'b1_head',
            type: 'HEADING',
            heading: '1. History & Invention of Hangeul (한글의 유래과 세종대왕 / इतिहास र राजा सेजोङ)',
          },
          {
            id: 'b1_txt',
            type: 'TEXT',
            text: 'Before 1443, Koreans used complex Chinese characters (Hanja), which only wealthy aristocrats could afford to learn. King Sejong the Great created Hangeul in 1443 so that all common citizens could read and write within days!',
          },
          {
            id: 'b1_kor',
            type: 'KOREAN_TEXT',
            koreanText: '훈민정음 (Hunminjeongeum)',
            romanization: 'Hun-min-jeong-eum',
            translationEn: 'The Correct Sounds for the Instruction of the People (1443)',
            translationNp: 'जनतालाई सही उच्चारण सिकाउने शास्त्रीय प्रणाली (सन् १४४३ मा राजा सेजोङद्वारा निर्मित)',
            audioText: '훈민정음',
          },
          {
            id: 'b2_head',
            type: 'HEADING',
            heading: '2. The 3 Universal Creation Principles of Vowels (천·지·인 3재 / स्वरवर्ण निर्माणका ३ प्राकृतिक तत्व)',
          },
          {
            id: 'b2_txt',
            type: 'TEXT',
            text: 'Korean vowels were designed based on Eastern philosophy representing the three core elements of the universe: Sky (•), Earth (ㅡ), and Human (ㅣ).',
          },
          {
            id: 'b2_vocab',
            type: 'VOCABULARY',
            items: [
              { term: '• (Sky / 천)', rom: 'Sun / Cosmos', en: 'Round sun in the sky (the origin of dot stroke)', np: 'आकाश (गोलो सूर्य) — बिन्दु संकेत' },
              { term: 'ㅡ (Earth / 지)', rom: 'Flat Ground', en: 'Flat, horizontal earth / land', np: 'पृथ्वी (तेर्सो समतल जमिन)' },
              { term: 'ㅣ (Human / 인)', rom: 'Standing Person', en: 'Upright, standing human being', np: 'मानिस (ठाडो उभिएको मानिस)' },
            ],
          },
          {
            id: 'b3_head',
            type: 'HEADING',
            heading: '3. Dot Addition Rules & Vertical vs Horizontal Vowels (도트 결합 및 수직·수평 모음)',
          },
          {
            id: 'b3_txt',
            type: 'TEXT',
            text: 'By combining Human (ㅣ) or Earth (ㅡ) with Sky dots (•), all Korean vowels are formed! Vertical vowels (ㅏ, ㅑ, ㅓ, ㅕ, ㅣ) sit to the RIGHT of consonants. Horizontal vowels (ㅗ, ㅛ, ㅜ, ㅠ, ㅡ) sit BELOW consonants.',
          },
          {
            id: 'b3_vocab',
            type: 'VOCABULARY',
            items: [
              { term: 'ㅣ + • = ㅏ', rom: 'a', en: 'Dot outside Human = "ㅏ" (vertical vowel, right side)', np: 'मानिस + बाहिर बिन्दु = "ㅏ" (ठाडो भवेल, दायाँ)' },
              { term: 'ㅣ + •• = ㅑ', rom: 'ya', en: 'Double dots = add "Y" sound = "ㅑ"', np: 'दुई बिन्दु थप्दा "य" ध्वनि = "ㅑ"' },
              { term: '• + ㅣ = ㅓ', rom: 'eo', en: 'Dot inside Human = "ㅓ" (vertical vowel)', np: 'मानिस + भित्र बिन्दु = "ㅓ" (ठाडो भवेल)' },
              { term: '•• + ㅣ = ㅕ', rom: 'yeo', en: 'Double dots inside = "ㅕ"', np: 'भित्र दुई बिन्दु = "ㅕ"' },
              { term: '• + ㅡ = ㅗ', rom: 'o', en: 'Dot above Earth = "ㅗ" (horizontal vowel, bottom)', np: 'जमिन माथि बिन्दु = "ㅗ" (तेर्सो भवेल, तल)' },
              { term: 'ㅡ + • = ㅜ', rom: 'u', en: 'Dot below Earth = "ㅜ" (horizontal vowel, bottom)', np: 'जमिन मुनि बिन्दु = "ㅜ" (तेर्सो भवेल, तल)' },
            ],
          },
          {
            id: 'b4_head',
            type: 'HEADING',
            heading: '4. Speech Organ Organology of Consonants (상형의 원리 / व्यञ्जनवर्ण मुखको अंगको आकार)',
          },
          {
            id: 'b4_txt',
            type: 'TEXT',
            text: 'Consonants mimic the physical shape of the human vocal organs (tongue, lips, teeth, throat) when pronouncing them!',
          },
          {
            id: 'b4_vocab',
            type: 'VOCABULARY',
            items: [
              { term: 'ㄱ (Molar / Root Tongue)', rom: 'Root of tongue blocking throat', en: 'Shape of tongue root blocking back of mouth', np: 'जिब्रोको जराले घाँटी छेक्दाको आकार (ग/क)' },
              { term: 'ㄴ (Tongue Tip)', rom: 'Tongue touching upper gums', en: 'Shape of tongue tip touching top teeth gums', np: 'जिब्रोको टुप्पोले माथिल्लो गिजा छुँदाको आकार (न)' },
              { term: 'ㅁ (Lips / Mouth)', rom: 'Outline of closed mouth', en: 'Shape of closed lips / mouth', np: 'मुख/ओठको बाहिरी घेराको आकार (म)' },
              { term: 'ㅅ (Teeth / Dental)', rom: 'Shape of sharp front tooth', en: 'Shape of sharp front tooth', np: 'अघिल्लो तिखो दाँतको आकार (स)' },
              { term: 'ㅇ (Throat / Circular)', rom: 'Circular open throat', en: 'Shape of open circular throat', np: 'खुल्ला गोलो घाँटीको आकार (अ/ङ)' },
            ],
          },
          {
            id: 'b5_head',
            type: 'HEADING',
            heading: '5. Korean Sentence Pattern (Subject + Object + Verb / SOV ढाँचा)',
          },
          {
            id: 'b5_tbl',
            type: 'TABLE',
            tableData: {
              headers: ['English (SVO)', 'Korean (SOV)', 'Nepali Structure', 'Korean Example'],
              rows: [
                ['I (S) eat (V) rice (O)', 'I (S) rice (O) eat (V)', 'म भात खान्छु (SOV)', '저는 밥을 먹어요'],
                ['Tuan (S) studies (V) Korean (O)', 'Tuan (S) Korean (O) studies (V)', 'तुआन कोरियाली सिक्छ (SOV)', '투안 씨는 한국어를 공부해요'],
                ['We (S) drink (V) coffee (O)', 'We (S) coffee (O) drink (V)', 'हामी कफी पिउँछौँ (SOV)', '우리는 커피를 마셔요'],
              ],
            },
          },
          {
            id: 'b5_tip',
            type: 'TIP',
            text: 'Key Takeaway: In Korean, the main verb or action ALWAYS comes at the very end of the sentence! Just like in Nepali!',
          },
        ],
      },
    ],
  },

  // ── MODULE 02: KOREAN ALPHABETS ──
  {
    id: 'module-02',
    moduleNumber: 2,
    title: 'Korean Alphabets',
    titleKorean: '한국어 자모음 알파벳 완벽 마스터',
    emoji: '🔤',
    description: 'Comprehensive study of all Korean alphabets: 21 Vowels, 19 Consonants, Batchim sound rules, and the complete 140 Consonant-Vowel syllable combination chart.',
    category: 'Alphabet',
    badgeName: 'Hangul Master Badge',
    badgeEmoji: '🔤',
    lessons: [
      {
        id: 'mod2-less1',
        lessonNumber: 1,
        title: 'Basic & Compound Vowels (모음 21개)',
        titleKorean: '기본 모음 10개 & 이중 모음 11개',
        description: 'Learn all 10 basic vowels and 11 compound vowels (diphthongs) with mouth shape guides, English & Nepali phonetics.',
        estimatedMinutes: 12,
        contentBlocks: [
          {
            id: 'm2b1',
            type: 'HEADING',
            heading: '1. Basic Vowels (기본 모음 10개 / १० आधारभूत स्वरवर्ण)',
          },
          {
            id: 'm2b2',
            type: 'VOCABULARY',
            items: [
              { term: 'ㅏ', rom: 'a', en: 'Like "a" in father', np: 'आ (अघि) — ओठ पूरा खोलेर' },
              { term: 'ㅑ', rom: 'ya', en: 'Like "ya" in yard', np: 'या (याद)' },
              { term: 'ㅓ', rom: 'eo', en: 'Like "eo" in song/cup', np: 'अ (घर) — ओठ नगोली अ' },
              { term: 'ㅕ', rom: 'yeo', en: 'Like "yeo" in young', np: 'य (यता)' },
              { term: 'ㅗ', rom: 'o', en: 'Like "o" in home', np: 'ओ (ओठ) — ओठ गोलो बनाएर' },
              { term: 'ㅛ', rom: 'yo', en: 'Like "yo" in yo-yo', np: 'यो (यो)' },
              { term: 'ㅜ', rom: 'u', en: 'Like "oo" in moon', np: 'ऊ (उता) — ओठ अघि सारेर' },
              { term: 'ㅠ', rom: 'yu', en: 'Like "yu" in youth', np: 'यू (यू)' },
              { term: 'ㅡ', rom: 'eu', en: 'Unrounded "eu" sound', np: 'उ (दाँत जोडेर उ उच्चारण)' },
              { term: 'ㅣ', rom: 'i', en: 'Like "ee" in meet', np: 'ई (इनाम)' },
            ],
          },
          {
            id: 'm2b3_h',
            type: 'HEADING',
            heading: '2. Diphthongs & Compound Vowels (이중 모음 11개 / ११ संयुक्त स्वरवर्ण)',
          },
          {
            id: 'm2b4_v',
            type: 'VOCABULARY',
            items: [
              { term: 'ㅐ', rom: 'ae', en: 'Like "a" in cat', np: 'ए (एप्पल)' },
              { term: 'ㅒ', rom: 'yae', en: 'Like "yae" in yeah', np: 'ये (येस)' },
              { term: 'ㅔ', rom: 'e', en: 'Like "e" in bed', np: 'ए (पेन)' },
              { term: 'ㅖ', rom: 'ye', en: 'Like "ye" in yes', np: 'ये (येस)' },
              { term: 'ㅘ', rom: 'wa', en: 'Like "wa" in water (ㅗ + ㅏ)', np: 'वा (वाटर)' },
              { term: 'ㅙ', rom: 'wae', en: 'Like "wae" in wait (ㅗ + ㅐ)', np: 'वे (वेट)' },
              { term: 'ㅚ', rom: 'oe', en: 'Like "way" in way (ㅗ + ㅣ)', np: 'वे (वे)' },
              { term: 'ㅝ', rom: 'wo', en: 'Like "wo" in wonder (ㅜ + ㅓ)', np: 'व (वन्डर)' },
              { term: 'ㅞ', rom: 'we', en: 'Like "we" in wedding (ㅜ + ㅔ)', np: 'वे (वेडिङ)' },
              { term: 'ㅟ', rom: 'wi', en: 'Like "wi" in win (ㅜ + ㅣ)', np: 'वि (विन)' },
              { term: 'ㅢ', rom: 'ui', en: 'Combined "eu-i" (ㅡ + ㅣ)', np: 'उई (उई)' },
            ],
          },
        ],
      },
      {
        id: 'mod2-less2',
        lessonNumber: 2,
        title: 'Basic & Double Consonants (자음 19개)',
        titleKorean: '기본 자음 14개 & 쌍자음 5개',
        description: 'Master the 14 basic consonants and 5 double/tense consonants with sound values and Nepali equivalents.',
        estimatedMinutes: 15,
        contentBlocks: [
          {
            id: 'm2b5_h',
            type: 'HEADING',
            heading: '1. Basic Consonants (기본 자음 14개 / १४ आधारभूत व्यञ्जनवर्ण)',
          },
          {
            id: 'm2b6_t',
            type: 'TABLE',
            tableData: {
              headers: ['Consonant', 'Name', 'Nepali Sound', 'English Sound', 'Example Word', 'Meaning'],
              rows: [
                ['ㄱ', '기역 (Giyeok)', 'ग / क', 'g / k', '가방 (gabang)', 'Bag (झोला)'],
                ['ㄴ', '니은 (Nieun)', 'न', 'n', '나무 (namu)', 'Tree (रुख)'],
                ['ㄷ', '디귿 (Digeut)', 'द / त', 'd / t', '다리 (dari)', 'Bridge/Leg (पुल/खुट्टा)'],
                ['ㄹ', '리을 (Rieul)', 'र / ल', 'r / l', '라면 (ramyeon)', 'Noodles (रामेन)'],
                ['ㅁ', '미음 (Mieum)', 'म', 'm', '모자 (moja)', 'Hat (टोपी)'],
                ['ㅂ', '비읍 (Bieup)', 'ब / प', 'b / p', '바지 (baji)', 'Pants (प्यान्ट)'],
                ['ㅅ', '시옷 (Siot)', 'स / त', 's / t', '소 (so)', 'Cow (गाई)'],
                ['ㅇ', '이응 (Ieung)', 'Silent / ङ', 'silent / ng', '아기 (agi)', 'Baby (बच्चा)'],
                ['ㅈ', '지읒 (Jieut)', 'ज / च', 'j / ch', '지도 (jido)', 'Map (नक्सा)'],
                ['ㅊ', '치읓 (Chieut)', 'छ (हावा फालेर)', 'ch (aspirated)', '차 (cha)', 'Car / Tea (गाडी/चिया)'],
                ['ㅋ', '키읔 (Kieuk)', 'ख (हावा फालेर)', 'k (aspirated)', '카메라 (kamera)', 'Camera (क्यामेरा)'],
                ['ㅌ', '티읕 (Tieut)', 'थ (हावा फालेर)', 't (aspirated)', '택시 (taeksi)', 'Taxi (ट्याक्सी)'],
                ['ㅍ', '피읖 (Pieup)', 'फ (हावा फालेर)', 'p (aspirated)', '피자 (pija)', 'Pizza (पिज्जा)'],
                ['ㅎ', '히읗 (Hieut)', 'ह', 'h', '하늘 (haneul)', 'Sky (आकाश)'],
              ],
            },
          },
          {
            id: 'm2b7_h',
            type: 'HEADING',
            heading: '2. Double & Tense Consonants (쌍자음 5개 / ५ कडा व्यञ्जनवर्ण)',
          },
          {
            id: 'm2b8_v',
            type: 'VOCABULARY',
            items: [
              { term: 'ㄲ', rom: 'kk', en: 'Tense "K" sound', np: 'क्क (कडा क sound) — 예: 꼬리 (पुच्छर)' },
              { term: 'ㄸ', rom: 'tt', en: 'Tense "T" sound', np: 'त्त (कडा त sound) — 예: 딸기 (स्ट्रबेरी)' },
              { term: 'ㅃ', rom: 'pp', en: 'Tense "P" sound', np: 'प्प (कडा प sound) — 예: 빵 (पाउरोटी)' },
              { term: 'ㅆ', rom: 'ss', en: 'Tense "S" sound', np: 'स्स (कडा स sound) — 예: 쓰다 (लेख्नु/तीतो)' },
              { term: 'ㅉ', rom: 'jj', en: 'Tense "J/Ch" sound', np: 'च्च (कडा च/ज sound) — 예: 짜다 (नुनिलो)' },
            ],
          },
        ],
      },
      {
        id: 'mod2-less3',
        lessonNumber: 3,
        title: 'Batchim — Final Consonants (받침 7가지 대표음)',
        titleKorean: '받침과 7가지 대표음 규칙',
        description: 'Learn how bottom consonants sound at the end of Korean syllable blocks and master the 7 representative sound rules.',
        estimatedMinutes: 15,
        contentBlocks: [
          {
            id: 'm2b12_h',
            type: 'HEADING',
            heading: 'The 7 Representative Batchim Sounds (७ मुख्य अन्तिम उच्चारण)',
          },
          {
            id: 'm2b13_t',
            type: 'TABLE',
            tableData: {
              headers: ['Batchim Consonants', 'Representative Sound', 'Nepali Pronunciation', 'Example Word', 'Meaning'],
              rows: [
                ['ㄱ, ㅋ, ㄲ', 'ㄱ (k/g)', 'क', '책 (chaek) / 학 (hak)', 'Book (किताब)'],
                ['ㄴ', 'ㄴ (n)', 'न', '눈 (nun) / 산 (san)', 'Eye/Snow (आँखा/हिउँ)'],
                ['ㄷ, ㅅ, ㅈ, ㅊ, ㅌ, ㅎ, ㅆ', 'ㄷ (t)', 'त', '옷 (ot) / 낮 (nat)', 'Clothes (कपडा)'],
                ['ㄹ', 'ㄹ (l)', 'ल', '달 (dal) / 물 (mul)', 'Moon/Water (चन्द्रमा/पानी)'],
                ['ㅁ', 'ㅁ (m)', 'म', '몸 (mom) / 밤 (bam)', 'Body (शरीर)'],
                ['ㅂ, ㅍ', 'ㅂ (p)', 'प', '집 (jip) / 잎 (ip)', 'House (घर)'],
                ['ㅇ', 'ㅇ (ng)', 'ङ', '강 (gang) / 방 (bang)', 'River/Room (नदी/कोठा)'],
              ],
            },
          },
        ],
      },
      {
        id: 'mod2-less4',
        lessonNumber: 4,
        title: 'Syllable Combination Master Chart',
        titleKorean: '자음+모음 결합 차트',
        description: 'The ultimate master chart combining Consonants and Vowels into interactive syllable blocks (가, 나, 다... 하) with audio.',
        estimatedMinutes: 20,
        contentBlocks: [
          {
            id: 'm2b10_txt',
            type: 'TEXT',
            text: 'Every Korean syllable block is formed by combining an initial consonant with a vowel. Click any block in the master chart below to hear native audio pronunciation!',
          },
          {
            id: 'm2b11_k',
            type: 'KOREAN_TEXT',
            koreanText: 'ㄱ + ㅏ = 가 (ga) • ㄴ + ㅏ = 나 (na)',
            romanization: 'ga / na',
            translationEn: 'Consonant (initial sound) + Vowel (core sound) = Syllable block',
            translationNp: 'व्यञ्जनवर्ण (सुरुवाती ध्वनि) + स्वरवर्ण (मुख्य ध्वनि) = अक्षर ब्लक',
            audioText: '가 나 다 라 마 바 사 아 자 차 카 타 파 하',
          },
        ],
      },
    ],
  },

  // ── MODULE 03: PRONUNCIATION ──
  {
    id: 'module-03',
    moduleNumber: 3,
    title: 'Pronunciation & Sound Changes',
    titleKorean: '발음 변화 규칙',
    emoji: '🗣️',
    description: 'Understand sound linking (연음), nasalization (비음화), aspiration (축약), and tense sound rules.',
    category: 'Pronunciation',
    badgeName: 'Native Accent Badge',
    badgeEmoji: '🎙️',
    lessons: [
      {
        id: 'mod3-less1',
        lessonNumber: 1,
        title: 'Sound Linking Rule (연음 법칙)',
        titleKorean: '연음 법칙',
        description: 'Learn how bottom consonants slide into the next silent ㅇ vowel block.',
        estimatedMinutes: 10,
        contentBlocks: [
          {
            id: 'm3b1',
            type: 'HEADING',
            heading: 'Linking Batchim to Vowels',
          },
          {
            id: 'm3b2',
            type: 'EXAMPLE',
            koreanText: '한국어 → [한구거]',
            romanization: 'Han-gug-eo → Han-gu-geor',
            translationEn: 'Written "Han-guk-eo", spoken naturally as "Han-gu-geor"',
            translationNp: 'लेख्दा "한국어", बोल्दा "한구거" उच्चारण हुन्छ',
          },
        ],
      },
    ],
  },

  // ── MODULE 04: ESSENTIAL KOREAN & NUMBERS ──
  {
    id: 'module-04',
    moduleNumber: 4,
    title: 'Essential Korean & Numbers',
    titleKorean: '필수 한국어와 숫자 완벽 가이드',
    emoji: '💬',
    description: 'Master Sino-Korean (일, 이, 삼) vs Native Korean (하나, 둘, 셋) numbers, counting units (개, 명, 살), daily greetings, telling time, prices, and self-introductions in Nepali & English.',
    category: 'Essentials',
    badgeName: 'Korean Communicator Badge',
    badgeEmoji: '🗣️',
    lessons: [
      {
        id: 'mod4-less1',
        lessonNumber: 1,
        title: 'Sino-Korean vs Native Korean Numbers (숫자 1~100)',
        titleKorean: '한자어 숫자와 고유어 숫자 (1부터 100까지)',
        description: 'Complete guide to Sino-Korean (일, 이, 삼) for money/dates/minutes and Native Korean (하나, 둘, 셋) for age/hours/items.',
        estimatedMinutes: 15,
        contentBlocks: [
          {
            id: 'm4b1_h',
            type: 'HEADING',
            heading: '1. Number System Comparison Chart (숫자 1~10 비교표)',
          },
          {
            id: 'm4b1_tbl',
            type: 'TABLE',
            tableData: {
              headers: ['Number', 'Sino-Korean (일/이/삼)', 'Native Korean (하나/둘/셋)', 'Attributive Form (Before Counters)', 'Nepali Pronunciation'],
              rows: [
                ['1', '일 (il)', '하나 (hana)', '한 (han)', 'इल् / हाना (हन्)'],
                ['2', '이 (i)', '둘 (dul)', '두 (du)', 'इ / दुल (दु)'],
                ['3', '삼 (sam)', '셋 (set)', '세 (se)', 'साम् / सेत् (से)'],
                ['4', '사 (sa)', '넷 (net)', '네 (ne)', 'सा / नेत् (ने)'],
                ['5', '오 (o)', '다섯 (daseot)', '다섯 (daseot)', 'ओ / तासोत्'],
                ['6', '육 (yuk)', '여섯 (yeoseot)', '여섯 (yeoseot)', 'युक् / यसोत्'],
                ['7', '칠 (chil)', '일곱 (ilgop)', '일곱 (ilgop)', 'छिल् / इल्गोप्'],
                ['8', '팔 (pal)', '여덟 (yeodeol)', '여덟 (yeodeol)', 'फाल् / यदल'],
                ['9', '구 (gu)', '아홉 (ahop)', '아홉 (ahop)', 'गु / आहोप्'],
                ['10', '십 (sip)', '열 (yeol)', '열 (yeol)', 'सिप् / योल'],
              ],
            },
          },
          {
            id: 'm4b2_h',
            type: 'HEADING',
            heading: '2. Higher Tens & Large Numbers (10, 20, 50, 100, 1000+)',
          },
          {
            id: 'm4b2_tbl',
            type: 'TABLE',
            tableData: {
              headers: ['Value', 'Sino-Korean (Money / Minutes / Years)', 'Native Korean (Age / Hours / Items)', 'Nepali Meaning'],
              rows: [
                ['20', '이십 (isip)', '스물 (seumul → 스무)', '२० (इशिप / सुमुल)'],
                ['30', '삼십 (samsip)', '서른 (seoreun)', '३० (साम्सिप / सोरुन)'],
                ['40', '사십 (sasip)', '마흔 (maheun)', '४० (सासिप / माहून)'],
                ['50', '오십 (osip)', '쉰 (swin)', '५० (ओसिप / स्विन्)'],
                ['100', '백 (baek)', 'N/A (Use 백)', '१०० (ब्याक)'],
                ['1,000', '천 (cheon)', 'N/A (Use 천)', '१,००० (छोन)'],
                ['10,000', '만 (man)', 'N/A (Use 만)', '१०,००० (मान)'],
              ],
            },
          },
          {
            id: 'm4b3_h',
            type: 'HEADING',
            heading: '3. When to Use Which Number System? (प्रयोग नियम)',
          },
          {
            id: 'm4b3_v',
            type: 'VOCABULARY',
            items: [
              { term: 'Sino-Korean (한자어)', rom: 'il, i, sam...', en: 'Used for Money (원), Phone numbers, Dates (년/월/일), Minutes (분), Math', np: 'पैसा (원), फोन नम्बर, मिति (वर्ष/महिना/गते), मिनेट (분) मा प्रयोग' },
              { term: 'Native Korean (고유어)', rom: 'hana, dul, set...', en: 'Used for Hours (시), Age (살), Counting objects (개, 명, 병, 잔)', np: 'घण्टा (시), उमेर (살), वस्तु र मानिस गन्ती गर्दा (개, 명) मा प्रयोग' },
            ],
          },
        ],
      },
      {
        id: 'mod4-less2',
        lessonNumber: 2,
        title: 'Korean Counter Units (개, 명, 살, 잔, 병)',
        titleKorean: '한국어 단위 명사 (개, 명, 잔, 권)',
        description: 'Learn the most essential counting units and how native Korean numbers change before counters (한, 두, 세, 네).',
        estimatedMinutes: 15,
        contentBlocks: [
          {
            id: 'm4b4_h',
            type: 'HEADING',
            heading: 'Essential Counting Units Table (मुख्य गन्ती एकाइहरू)',
          },
          {
            id: 'm4b5_t',
            type: 'TABLE',
            tableData: {
              headers: ['Counter Unit', 'Used For', 'Number Rule', 'Example Korean', 'Nepali Meaning'],
              rows: [
                ['개 (gae)', 'General items/things', 'Native (한, 두, 세, 네...)', '사과 한 개 (sagwa han gae)', 'स्याउ एउटा (Apple 1 pc)'],
                ['명 / 분 (myeong/bun)', 'People / Honored Persons', 'Native (한 명, 두 명...)', '사람 세 명 (saram se myeong)', 'मानिस ३ जना (3 People)'],
                ['살 (sal)', 'Age (Years old)', 'Native (스무 살...)', '스무 살 (seumu sal)', 'बीस वर्ष (20 Years old)'],
                ['잔 (jan)', 'Cups of tea/coffee/water', 'Native (두 잔...)', '커피 한 잔 (keopi han jan)', 'कफी एक कप (1 cup coffee)'],
                ['병 (byeong)', 'Bottles of drink/water', 'Native (세 병...)', '물 두 병 (mul du byeong)', 'पानी दुई बोतल (2 bottles water)'],
                ['권 (gwon)', 'Books / Notebooks', 'Native (네 권...)', '책 한 권 (chaek han gwon)', 'किताब एउटा (1 Book)'],
                ['대 (dae)', 'Cars / Machinery / Phones', 'Native (한 대...)', '차 한 대 (cha han dae)', 'गाडी एउटा (1 Car)'],
                ['마리 (mari)', 'Animals / Fish / Birds', 'Native (두 마리...)', '고양이 두 마리 (goyangi du mari)', 'विरालो दुईवटा (2 Cats)'],
              ],
            },
          },
          {
            id: 'm4b6_tip',
            type: 'TIP',
            text: 'Special Attributive Forms: 1 (하나 → 한), 2 (둘 → 두), 3 (셋 → 세), 4 (넷 → 네), 20 (스물 → 스무) when followed directly by a counter unit!',
          },
        ],
      },
      {
        id: 'mod4-less3',
        lessonNumber: 3,
        title: 'Essential Daily Greetings & Expressions (기초 인사말)',
        titleKorean: '매일 쓰는 필수 인사말과 예의 표현',
        description: 'Master polite Korean greetings, saying thank you, apologizing, and saying goodbye naturally.',
        estimatedMinutes: 12,
        contentBlocks: [
          {
            id: 'm4b7_h',
            type: 'HEADING',
            heading: 'Daily Korean Greetings (दैनिक कोरियाली अभिवादनहरू)',
          },
          {
            id: 'm4b8_v',
            type: 'VOCABULARY',
            items: [
              { term: '안녕하세요', rom: 'An-nyeong-ha-se-yo', en: 'Hello / Good day (Polite)', np: 'नमस्ते / नमस्कार' },
              { term: '반갑습니다', rom: 'Ban-gap-seum-ni-da', en: 'Nice to meet you', np: 'भेटेर खुसी लाग्यो' },
              { term: '감사합니다 / 고맙습니다', rom: 'Gam-sa-ham-ni-da', en: 'Thank you very much', np: 'धेरै धेरै धन्यवाद' },
              { term: '죄송합니다 / 미안합니다', rom: 'Joe-song-ham-ni-da', en: 'I am sorry / Excuse me', np: 'माफ गर्नुहोस्' },
              { term: '안녕히 계세요', rom: 'An-nyeong-hi gye-se-yo', en: 'Goodbye (To person staying)', np: 'राम्रोसँग बस्नुहोस् (बस्ने व्यक्तिलाई)' },
              { term: '안녕히 가세요', rom: 'An-nyeong-hi ga-se-yo', en: 'Goodbye (To person leaving)', np: 'राम्रोसँग जानुहोस् (जाने व्यक्तिलाई)' },
              { term: '네 / 아니요', rom: 'Ne / A-ni-yo', en: 'Yes / No', np: 'हजुर / होइन' },
            ],
          },
        ],
      },
      {
        id: 'mod4-less4',
        lessonNumber: 4,
        title: 'Telling Time, Dates & Self-Introductions (시간·날짜 & 자기소개)',
        titleKorean: '시간 읽기, 날짜 표현 및 기초 자기소개',
        description: 'Learn how to combine Native Hours + Sino Minutes (시 + 분), speak your age, give phone numbers, and introduce yourself.',
        estimatedMinutes: 15,
        contentBlocks: [
          {
            id: 'm4b9_h',
            type: 'HEADING',
            heading: '1. Telling Time Formula ( Native Hours 시 + Sino Minutes 분 )',
          },
          {
            id: 'm4b10_txt',
            type: 'TEXT',
            text: 'In Korean, Hours (시) use NATIVE Korean numbers, while Minutes (분) use SINO-Korean numbers! Example: 3:30 = 세 시 삼십 분 (Se si sam-sip bun).',
          },
          {
            id: 'm4b11_tbl',
            type: 'TABLE',
            tableData: {
              headers: ['Time', 'Korean Expression', 'Romanization', 'Nepali Meaning'],
              rows: [
                ['1:00', '한 시', 'han si', '१ बजे (1 o-clock)'],
                ['2:15', '두 시 십오 분', 'du si sip-o bun', '२ बजेर १५ मिनेट'],
                ['5:30', '다섯 시 삼십 분 (다섯 시 반)', 'daseot si sam-sip bun', '५ बजेर ३० मिनेट (साढे ५ बजे)'],
                ['12:00', '열두 시', 'yeol-du si', '१२ बजे'],
              ],
            },
          },
          {
            id: 'm4b12_h',
            type: 'HEADING',
            heading: '2. Simple Self-Introduction Template (기초 자기소개)',
          },
          {
            id: 'm4b13_ex',
            type: 'EXAMPLE',
            koreanText: '안녕하세요? 저는 투안입니다. 네팔 사람입니다. 저는 스물다섯 살입니다. 반갑습니다!',
            romanization: 'An-nyeong-ha-se-yo? Jeo-neun Tuan-im-ni-da. Ne-pal sa-ram-im-ni-da. Jeo-neun seu-mul-da-seot sar-im-ni-da. Ban-gap-seum-ni-da!',
            translationEn: 'Hello! I am Tuan. I am a Nepali person. I am 25 years old. Nice to meet you!',
            translationNp: 'नमस्ते! म तुआन हुँ। म नेपाली नागरिक हुँ। म २५ वर्षको भएँ। भेटेर खुसी लाग्यो!',
          },
        ],
      },
    ],
  },

  // ── MODULE 05: VOCABULARY BUILDER ──
  {
    id: 'module-05',
    moduleNumber: 5,
    title: 'Vocabulary Builder',
    titleKorean: '어휘력 확장기 (필수 600+ 어휘)',
    emoji: '📚',
    description: 'Build core high-frequency vocabulary across Family, Food, Places, Transport, Work, Daily Verbs, and Adjectives in Nepali & English.',
    category: 'Vocabulary',
    badgeName: 'Vocab Master Badge',
    badgeEmoji: '📖',
    lessons: [
      {
        id: 'mod5-less1',
        lessonNumber: 1,
        title: 'Family & People (가족과 사람 어휘)',
        titleKorean: '가족 및 친척 어휘',
        description: 'Master vocabulary for father, mother, siblings, relatives, and relationships in polite Korean.',
        estimatedMinutes: 12,
        contentBlocks: [
          {
            id: 'm5b1_h',
            type: 'HEADING',
            heading: 'Family Members & Relatives (가족 어휘 / परिवारका सदस्यहरू)',
          },
          {
            id: 'm5b1_v',
            type: 'VOCABULARY',
            items: [
              { term: '아버지 / 아빠', rom: 'abeoji / appa', en: 'Father / Dad', np: 'बुबा / बाबा' },
              { term: '어머니 / 엄마', rom: 'eomoni / eomma', en: 'Mother / Mom', np: 'आमा / ममी' },
              { term: '부모님', rom: 'bu-mo-nim', en: 'Parents', np: 'आमा-बुबा (अभिभावक)' },
              { term: '형', rom: 'hyeong', en: 'Older brother (Used by male)', np: 'दाजु (केटाले भन्ने)' },
              { term: '누나', rom: 'nuna', en: 'Older sister (Used by male)', np: 'दिदी (केटाले भन्ने)' },
              { term: '오빠', rom: 'oppa', en: 'Older brother (Used by female)', np: 'दाजु (केटीले भन्ने)' },
              { term: '언니', rom: 'eonni', en: 'Older sister (Used by female)', np: 'दिदी (केटीले भन्ने)' },
              { term: '남동생', rom: 'nam-dong-saeng', en: 'Younger brother', np: 'भाइ' },
              { term: '여동생', rom: 'yeo-dong-saeng', en: 'Younger sister', np: 'बहिनी' },
              { term: '할아버지', rom: 'hal-a-beo-ji', en: 'Grandfather', np: 'हजुरबुबा' },
              { term: '할머니', rom: 'hal-meo-ni', en: 'Grandmother', np: 'हजुरआमा' },
              { term: '남편 / 아내', rom: 'nam-pyeon / a-nae', en: 'Husband / Wife', np: 'श्रीमान् / श्रीमती' },
              { term: '아들 / 딸', rom: 'a-deul / ttal', en: 'Son / Daughter', np: 'छोरा / छोरी' },
              { term: '친구', rom: 'chin-gu', en: 'Friend', np: 'साथी' },
            ],
          },
        ],
      },
      {
        id: 'mod5-less2',
        lessonNumber: 2,
        title: 'Food, Drinks & Dining (음식과 식당 어휘)',
        titleKorean: '음식, 음료 및 식당 필수 어휘',
        description: 'Learn terms for daily meals, food items, drinks, restaurant ordering phrases.',
        estimatedMinutes: 12,
        contentBlocks: [
          {
            id: 'm5b2_h',
            type: 'HEADING',
            heading: 'Everyday Food & Drinks (खाना र पेय पदार्थ)',
          },
          {
            id: 'm5b2_v',
            type: 'VOCABULARY',
            items: [
              { term: '밥 / 식사', rom: 'bap / sik-sa', en: 'Cooked Rice / Meal', np: 'भात / खाना' },
              { term: '물', rom: 'mul', en: 'Water', np: 'पानी' },
              { term: '김치', rom: 'gim-chi', en: 'Kimchi (Fermented cabbage)', np: 'किम्ची (कोरियाली अचार)' },
              { term: '고기', rom: 'go-gi', en: 'Meat', np: 'मासु' },
              { term: '불고기', rom: 'bul-go-gi', en: 'Bulgogi (Marinated beef)', np: 'बुलगोगी (पोलेको मासु)' },
              { term: '라면', rom: 'ra-myeon', en: 'Instant Noodles / Ramen', np: 'रामेन (चाउचाउ)' },
              { term: '사과', rom: 'sa-gwa', en: 'Apple', np: 'स्याउ' },
              { term: '커피', rom: 'keo-pi', en: 'Coffee', np: 'कफी' },
              { term: '차', rom: 'cha', en: 'Tea / Car', np: 'चिया / गाडी' },
              { term: '식당', rom: 'sik-dang', en: 'Restaurant', np: 'रेस्टुरेन्ट / भोजनालय' },
              { term: '메뉴판', rom: 'me-nyu-pan', en: 'Menu card', np: 'मेनु कार्ड' },
              { term: '맛있어요', rom: 'mas-is-seo-yo', en: 'It is delicious', np: 'मीठो छ' },
              { term: '맛없어요', rom: 'man-eop-seo-yo', en: 'It is not tasty', np: 'मीठो छैन' },
              { term: '물 좀 주세요', rom: 'mul jom ju-se-yo', en: 'Please give me water', np: 'कृपया पानी दिनुहोस्' },
            ],
          },
        ],
      },
      {
        id: 'mod5-less3',
        lessonNumber: 3,
        title: 'Places, Workplace & Transport (장소, 직장 및 교통)',
        titleKorean: '주요 장소, 회사 및 교통수단 어휘',
        description: 'Learn names of essential locations, public transport, and workplace vocabulary.',
        estimatedMinutes: 14,
        contentBlocks: [
          {
            id: 'm5b3_h',
            type: 'HEADING',
            heading: 'Key Locations & Public Transport (ठाउँ र यातायात)',
          },
          {
            id: 'm5b3_v',
            type: 'VOCABULARY',
            items: [
              { term: '집', rom: 'jip', en: 'House / Home', np: 'घर' },
              { term: '학교', rom: 'hak-gyo', en: 'School', np: 'विद्यालय / स्कुल' },
              { term: '회사 / 공장', rom: 'hoe-sa / gong-jang', en: 'Company / Factory', np: 'कम्पनी / कारखाना' },
              { term: '병원 / 약국', rom: 'byeong-won / yak-guk', en: 'Hospital / Pharmacy', np: 'अस्पताल / औषधि पसल' },
              { term: '은행', rom: 'eun-haeng', en: 'Bank', np: 'बैंक' },
              { term: '시장 / 마트', rom: 'si-jang / ma-teu', en: 'Market / Mart', np: 'बजार / मार्ट' },
              { term: '공항', rom: 'gong-hang', en: 'Airport', np: 'विमानस्थल' },
              { term: '화장실', rom: 'hwa-jang-sil', en: 'Restroom / Toilet', np: 'शौचालय' },
              { term: '버스', rom: 'beo-seu', en: 'Bus', np: 'बस' },
              { term: '택시', rom: 'taek-si', en: 'Taxi', np: 'ट्याक्सी' },
              { term: '지하철', rom: 'ji-ha-cheol', en: 'Subway / Metro Train', np: 'सबवे ट्रेन (भूमिगत रेल)' },
              { term: '비행기', rom: 'bi-haeng-gi', en: 'Airplane', np: 'हवाईजहाज' },
            ],
          },
        ],
      },
      {
        id: 'mod5-less4',
        lessonNumber: 4,
        title: 'High-Frequency Verbs & Adjectives (필수 동사 및 형용사)',
        titleKorean: '자주 쓰는 핵심 동사와 형용사',
        description: 'Master everyday actions (to go, eat, sleep, work) and core adjectives (big, small, good, bad).',
        estimatedMinutes: 15,
        contentBlocks: [
          {
            id: 'm5b4_h',
            type: 'HEADING',
            heading: 'Essential Everyday Verbs (मुख्य क्रियापदहरू)',
          },
          {
            id: 'm5b4_v',
            type: 'VOCABULARY',
            items: [
              { term: '가다', rom: 'ga-da', en: 'To go', np: 'जानु' },
              { term: '오다', rom: 'o-da', en: 'To come', np: 'आउनु' },
              { term: '먹다', rom: 'meok-da', en: 'To eat', np: 'खाउनु' },
              { term: '마시다', rom: 'ma-si-da', en: 'To drink', np: 'पिउनु' },
              { term: '자다', rom: 'ja-da', en: 'To sleep', np: 'सुत्नु' },
              { term: '공부하다', rom: 'gong-bu-ha-da', en: 'To study', np: 'अध्ययन गर्नु / पढ्नु' },
              { term: '일하다', rom: 'il-ha-da', en: 'To work', np: 'काम गर्नु' },
              { term: '보다', rom: 'bo-da', en: 'To see / watch', np: 'हेर्नु' },
              { term: '사다', rom: 'sa-da', en: 'To buy', np: 'किन्नु' },
              { term: '크다 / 작다', rom: 'keu-da / jak-da', en: 'Big / Small', np: 'ठूलो / सानो' },
              { term: '좋다 / 나쁘다', rom: 'joh-ta / na-ppeu-da', en: 'Good / Bad', np: 'राम्रो / खराबी' },
              { term: '많다 / 적다', rom: 'man-ta / jeok-da', en: 'Many (Much) / Few', np: 'धेरै / थोरै' },
            ],
          },
        ],
      },
    ],
  },

  // ── MODULE 06: GRAMMAR FOUNDATION ──
  {
    id: 'module-06',
    moduleNumber: 6,
    title: 'Grammar Foundation',
    titleKorean: '기초 문법 체계 완벽 가이드',
    emoji: '📝',
    description: 'Master core Korean particles (은/는, 이/가, 을/를, 에, 에서), copula (입니다/예요), and present tense verb conjugation (-아/어요) in Nepali & English.',
    category: 'Grammar',
    badgeName: 'Grammar Genius Badge',
    badgeEmoji: '✍️',
    lessons: [
      {
        id: 'mod6-less1',
        lessonNumber: 1,
        title: 'Topic Markers (은/는) vs Subject Markers (이/가)',
        titleKorean: '주제 조사(은/는)와 주격 조사(이/가)',
        description: 'Understand the difference between topic markers (은/는) for general main topics and subject markers (이/가) for specific subjects.',
        estimatedMinutes: 14,
        contentBlocks: [
          {
            id: 'm6b1_h',
            type: 'HEADING',
            heading: '1. Topic Marker (은 / 는) Rule & Usage',
          },
          {
            id: 'm6b1_g',
            type: 'GRAMMAR',
            heading: 'Noun + 은 / 는 (주제 조사)',
            text: 'Attach 은 after a noun ending in a Consonant (Batchim). Attach 는 after a noun ending in a Vowel. Used to state main topics or contrast.',
          },
          {
            id: 'm6b1_tbl',
            type: 'TABLE',
            tableData: {
              headers: ['Noun End', 'Marker', 'Example Word', 'Sentence Example', 'Nepali Translation'],
              rows: [
                ['Consonant (받침 O)', '은 (eun)', '학생 (Student)', '학생은 공부해요.', 'विद्यार्थी (चाहिँ) पढ्छ।'],
                ['Vowel (받침 X)', '는 (neun)', '저 (I / Me)', '저는 네팔 사람입니다.', 'म (चाहिँ) नेपाली नागरिक हुँ।'],
              ],
            },
          },
          {
            id: 'm6b2_h',
            type: 'HEADING',
            heading: '2. Subject Marker (이 / 가) Rule & Usage',
          },
          {
            id: 'm6b2_g',
            type: 'GRAMMAR',
            heading: 'Noun + 이 / 가 (주격 조사)',
            text: 'Attach 이 after a noun ending in a Consonant. Attach 가 after a noun ending in a Vowel. Used to emphasize the specific subject or new information.',
          },
          {
            id: 'm6b2_tbl',
            type: 'TABLE',
            tableData: {
              headers: ['Noun End', 'Marker', 'Example Word', 'Sentence Example', 'Nepali Translation'],
              rows: [
                ['Consonant (받침 O)', '이 (i)', '비 (Rain / Water)', '비가 와요.', 'पानी परेको छ।'],
                ['Vowel (받침 X)', '가 (ga)', '날씨 (Weather)', '날씨가 좋아요.', 'मौसम राम्रो छ।'],
              ],
            },
          },
        ],
      },
      {
        id: 'mod6-less2',
        lessonNumber: 2,
        title: 'Object Markers (을/를) & Location Particles (에 / 에서)',
        titleKorean: '목적격 조사(을/를)와 장소 조사(에/에서)',
        description: 'Learn how to mark direct objects (을/를) and distinguish static location/time (에) from action locations (에서).',
        estimatedMinutes: 14,
        contentBlocks: [
          {
            id: 'm6b3_h',
            type: 'HEADING',
            heading: '1. Direct Object Marker (을 / 를)',
          },
          {
            id: 'm6b3_g',
            type: 'GRAMMAR',
            heading: 'Noun + 을 / 를 (목적격 조사)',
            text: 'Attach 을 after a noun ending in a Consonant. Attach 를 after a noun ending in a Vowel. Identifies the direct object receiving the action.',
          },
          {
            id: 'm6b3_ex1',
            type: 'EXAMPLE',
            koreanText: '저는 밥을 먹어요. / 커피를 마셔요.',
            romanization: 'Jeo-neun bab-eul meok-eo-yo. / Keo-pi-reul ma-syeo-yo.',
            translationEn: 'I eat rice. / I drink coffee.',
            translationNp: 'म भात खान्छु। / कफी पिउँछु।',
          },
          {
            id: 'm6b4_h',
            type: 'HEADING',
            heading: '2. Location Particles: 에 vs 에서',
          },
          {
            id: 'm6b4_tbl',
            type: 'TABLE',
            tableData: {
              headers: ['Particle', 'Function', 'Korean Example', 'Nepali Meaning'],
              rows: [
                ['에 (e)', 'Time OR Destination / Static existence (있다/없다/가다)', '학교에 가요. / 8시에 만나요.', 'स्कुलमा जान्छु। / ८ बजे भेटौँ।'],
                ['에서 (e-seo)', 'Dynamic action location (Where an action takes place)', '식당에서 밥을 먹어요.', 'रेस्टुरेन्टमा भात खान्छु।'],
              ],
            },
          },
        ],
      },
      {
        id: 'mod6-less3',
        lessonNumber: 3,
        title: 'Formal Copula (입니다/입니까?) & Informal Polite (이에요/예요)',
        titleKorean: '서술격 조사 입니다/입니까? & 이에요/예요',
        description: 'Master saying "To be" (Is / Am / Are) in formal polite and informal polite speech styles.',
        estimatedMinutes: 12,
        contentBlocks: [
          {
            id: 'm6b5_h',
            type: 'HEADING',
            heading: '1. Formal Honorific Copula (입니다 / 입니까?)',
          },
          {
            id: 'm6b5_g',
            type: 'GRAMMAR',
            heading: 'Noun + 입니다 (Statement) / 입니까? (Question)',
            text: 'Attach 입니다 to any noun to express "I am / It is [Noun]" in polite formal situations (news, interviews, meeting new people).',
          },
          {
            id: 'm6b5_ex',
            type: 'EXAMPLE',
            koreanText: '저는 의사입니다. / 선생님입니까?',
            romanization: 'Jeo-neun ui-sa-im-ni-da. / Seon-saeng-nim-im-ni-kka?',
            translationEn: 'I am a doctor. / Are you a teacher?',
            translationNp: 'म डाक्टर हुँ। / के तपाईं शिक्षक हुनुहुन्छ?',
          },
          {
            id: 'm6b6_h',
            type: 'HEADING',
            heading: '2. Informal Polite Copula (이에요 / 예요)',
          },
          {
            id: 'm6b6_tbl',
            type: 'TABLE',
            tableData: {
              headers: ['Noun End', 'Ending', 'Example Sentence', 'Nepali Meaning'],
              rows: [
                ['Consonant (받침 O)', '이에요 (i-e-yo)', '이것은 책이에요.', 'यो किताब हो।'],
                ['Vowel (받침 X)', '예요 (ye-yo)', '저는 수잔이에요 / 의사예요.', 'म सुजन हुँ / म डाक्टर हुँ।'],
              ],
            },
          },
        ],
      },
      {
        id: 'mod6-less4',
        lessonNumber: 4,
        title: 'Present Tense Verb Conjugation (-아/어요 / -해요)',
        titleKorean: '현재시제 어미 -아/어요 및 -해요 활용',
        description: 'Learn the core rules for conjugating dictionary verbs into natural polite present tense (-아요, -어요, -해요).',
        estimatedMinutes: 15,
        contentBlocks: [
          {
            id: 'm6b7_h',
            type: 'HEADING',
            heading: 'Present Tense Conjugation Rules (वर्तमान काल रूपान्तरण नियम)',
          },
          {
            id: 'm6b7_g',
            type: 'GRAMMAR',
            heading: 'Verb Stem + -아요 / -어요 / -해요',
            text: '1. If final stem vowel is ㅏ or ㅗ → Add -아요.\n2. If final stem vowel is any other vowel (ㅓ, ㅜ, ㅡ, ㅣ) → Add -어요.\n3. If verb ends in 하다 → Changes to -해요.',
          },
          {
            id: 'm6b7_tbl',
            type: 'TABLE',
            tableData: {
              headers: ['Dictionary Form', 'Stem Vowel', 'Conjugated Form (-아/어요)', 'English Meaning', 'Nepali Meaning'],
              rows: [
                ['가다 (ga-da)', 'ㅏ (Bright)', '가요 (ga-yo)', 'Goes / Am going', 'जान्छु'],
                ['보다 (bo-da)', 'ㅗ (Bright)', '봐요 (bwa-yo)', 'Watches / Sees', 'हेर्छु'],
                ['먹다 (meok-da)', 'ㅓ (Dark)', '먹어요 (meok-eo-yo)', 'Eats / Am eating', 'खान्छु'],
                ['마시다 (ma-si-da)', 'ㅣ (Dark)', '마셔요 (ma-syeo-yo)', 'Drinks / Am drinking', 'पिउँछु'],
                ['공부하다 (gong-bu-ha-da)', '하다', '공부해요 (gong-bu-hae-yo)', 'Studies / Am studying', 'अध्ययन गर्छु'],
                ['일하다 (il-ha-da)', '하다', '일해요 (il-hae-yo)', 'Works / Am working', 'काम गर्छु'],
              ],
            },
          },
        ],
      },
    ],
  },

  // ── MODULE 07: REAL-LIFE KOREAN ──
  {
    id: 'module-07',
    moduleNumber: 7,
    title: 'Real-Life Korean',
    titleKorean: '실생활 필수 한국어 회화',
    emoji: '🛒',
    description: 'Practical daily survival conversations: Ordering at Restaurants, Shopping & Prices, Taking Buses/Subway, Asking Directions, Pharmacy/Hospital, and Emergency phrases.',
    category: 'Conversation',
    badgeName: 'Daily Survival Badge',
    badgeEmoji: '🛍️',
    lessons: [
      {
        id: 'mod7-less1',
        lessonNumber: 1,
        title: 'Ordering Food in Restaurants (식당 음식 주문하기)',
        titleKorean: '식당에서 음식 주문 및 물건 요청하기',
        description: 'Learn essential dining phrases: "메뉴판 주세요", "이거 하나 주세요", "얼마예요?", and asking for water & side dishes.',
        estimatedMinutes: 12,
        contentBlocks: [
          {
            id: 'm7b1_h',
            type: 'HEADING',
            heading: 'Everyday Restaurant Phrases (भोजनालयमा प्रयोग हुने वाक्यहरू)',
          },
          {
            id: 'm7b1_v',
            type: 'VOCABULARY',
            items: [
              { term: '여기 메뉴판 좀 주세요', rom: 'Yeo-gi me-nyu-pan jom ju-se-yo', en: 'Please give me the menu here', np: 'यहाँ मेनु कार्ड दिनुहोस्' },
              { term: '김치찌개 하나하고 콜라 한 병 주세요', rom: 'Gim-chi-jji-gae ha-na-ha-go kol-la han byeong ju-se-yo', en: 'Please give me 1 Kimchi stew and 1 bottle of Cola', np: '१ वटा किम्ची जिगे र १ बोतल कोकाकोला दिनुहोस्' },
              { term: '이거 얼마예요?', rom: 'I-geo eol-ma-ye-yo?', en: 'How much is this?', np: 'यसको कति पर्छ?' },
              { term: '물 좀 더 주세요', rom: 'Mul jom deo ju-se-yo', en: 'Please give me more water', np: 'कृपया अझै अलिकति पानी दिनुहोस्' },
              { term: '반찬 좀 더 주세요', rom: 'Ban-chan jom deo ju-se-yo', en: 'Please give me more side dishes', np: 'साइट डिश (अचार/परिकार) अझै दिनुहोस्' },
              { term: '잘 먹겠습니다 / 잘 먹었습니다', rom: 'Jal meok-ges-seum-ni-da / Jal meok-eos-seum-ni-da', en: 'Thank you for the meal! (Before / After eating)', np: 'मीठो गरी खानेछु / मीठो गरी खाएँ (धन्यवाद)' },
            ],
          },
        ],
      },
      {
        id: 'mod7-less2',
        lessonNumber: 2,
        title: 'Shopping, Prices & Paying (쇼핑과 물건 사기)',
        titleKorean: '상점에서 물건 사기 및 계산하기',
        description: 'Learn how to ask prices, bargain nicely, pay with card vs cash, and ask for a receipt.',
        estimatedMinutes: 14,
        contentBlocks: [
          {
            id: 'm7b2_h',
            type: 'HEADING',
            heading: 'Shopping & Payment Phrases (किनेर भुक्तानी गर्दा)',
          },
          {
            id: 'm7b2_v',
            type: 'VOCABULARY',
            items: [
              { term: '이거 얼마예요?', rom: 'I-geo eol-ma-ye-yo?', en: 'How much is this?', np: 'यसको मूल्य कति हो?' },
              { term: '너무 비싸요. 좀 깎아 주세요!', rom: 'Neo-mu bi-ssa-yo. Jom kkak-a ju-se-yo!', en: 'It is too expensive. Please discount a bit!', np: 'धेरै महँगो छ। अलिकति मिलाइदिनुहोस् (घटाइदिनुहोस्)!' },
              { term: '이거 다른 색깔 있어요?', rom: 'I-geo da-reun saek-kkal is-seo-yo?', en: 'Do you have this in another color?', np: 'यो अर्कै रङमा छ?' },
              { term: '카드로 계산할게요', rom: 'Ka-deu-ro gye-san-hal-ge-yo', en: 'I will pay by credit card', np: 'म कार्डबाट भुक्तानी गर्नेछु' },
              { term: '현금으로 낼게요', rom: 'Hyeon-geum-eu-ro nael-ge-yo', en: 'I will pay in cash', np: 'म नगद (क्यास) तिर्नेछु' },
              { term: '영수증 주세요', rom: 'Yeong-su-jeung ju-se-yo', en: 'Please give me the receipt', np: 'रसिद (बिल) दिनुहोस्' },
            ],
          },
        ],
      },
      {
        id: 'mod7-less3',
        lessonNumber: 3,
        title: 'Transport & Asking Directions (교통수단 & 길 묻기)',
        titleKorean: '버스·지하철 타기 및 길 묻기',
        description: 'How to ask where the subway/bus stop is, directions (left/right/straight), and telling the driver to stop.',
        estimatedMinutes: 14,
        contentBlocks: [
          {
            id: 'm7b3_h',
            type: 'HEADING',
            heading: 'Transport & Direction Phrases (यातायात र बाटो सोध्दा)',
          },
          {
            id: 'm7b3_v',
            type: 'VOCABULARY',
            items: [
              { term: '지하철역이 어디에 있어요?', rom: 'Ji-ha-cheol-yeok-i eo-di-e is-seo-yo?', en: 'Where is the subway station?', np: 'सबवे स्टेशन (भूमिगत रेल स्टेसन) कहाँ छ?' },
              { term: '버스 정류장이 어디예요?', rom: 'Beo-seu jeong-ryu-jang-i eo-di-ye-yo?', en: 'Where is the bus stop?', np: 'बस स्टप कहाँ हो?' },
              { term: '똑바로 가세요 / 직진하세요', rom: 'Ttok-ba-ro ga-se-yo / Jik-jin-ha-se-yo', en: 'Go straight ahead', np: 'सिधा जानुहोस्' },
              { term: '오른쪽으로 가세요', rom: 'O-reun-jjok-eu-ro ga-se-yo', en: 'Turn right', np: 'दायाँतर्फ जानुहोस्' },
              { term: '왼쪽으로 가세요', rom: 'Oen-jjok-eu-ro ga-se-yo', en: 'Turn left', np: 'बायाँतर्फ जानुहोस्' },
              { term: '여기서 내려 주세요', rom: 'Yeo-gi-seo nae-ryeo ju-se-yo', en: 'Please drop me off here', np: 'मलाई यहाँ ओरालिदिनुहोस्' },
            ],
          },
        ],
      },
      {
        id: 'mod7-less4',
        lessonNumber: 4,
        title: 'Pharmacy, Hospital & Emergency (약국, 병원 및 긴급 상황)',
        titleKorean: '약국, 병원 표현 및 긴급 도우미',
        description: 'Expressing illness symptoms (headache, fever, stomachache), buying medicine, and emergency phrases.',
        estimatedMinutes: 15,
        contentBlocks: [
          {
            id: 'm7b4_h',
            type: 'HEADING',
            heading: 'Symptoms & Emergency Expressions (बिरामी पर्दा र आपत्कालीन अवस्था)',
          },
          {
            id: 'm7b4_v',
            type: 'VOCABULARY',
            items: [
              { term: '머리가 아파요', rom: 'Meo-ri-ga a-pa-yo', en: 'I have a headache', np: 'टाउको दुखेको छ' },
              { term: '배가 아파요', rom: 'Bae-ga a-pa-yo', en: 'I have a stomachache', np: 'पेट दुखेको छ' },
              { term: '열이 나요', rom: 'Yeol-i na-yo', en: 'I have a fever', np: 'ज्वरो आएको छ' },
              { term: '감기약 좀 주세요', rom: 'Gam-gi-yak jom ju-se-yo', en: 'Please give me cold medicine', np: 'कृपया रुघाखोकीको औषधि दिनुहोस्' },
              { term: '소화제 주세요', rom: 'So-hwa-je ju-se-yo', en: 'Please give me digestive medicine', np: 'कृपया खाना पचाउने औषधि दिनुहोस्' },
              { term: '도와주세요!', rom: 'Do-wa-ju-se-yo!', en: 'Help me!', np: 'गुहार्नुहोस् / मद्दत गर्नुहोस्!' },
              { term: '119에 전화해 주세요!', rom: 'Il-il-gu-e jeon-hwa-hae ju-se-yo!', en: 'Please call 119 (Emergency)!', np: '११९ (कोरियाली आपत्कालीन सेवा) मा फोन गरिदिनुहोस्!' },
            ],
          },
        ],
      },
    ],
  },

  // ── MODULE 08: WORKPLACE KOREAN ──
  {
    id: 'module-08',
    moduleNumber: 8,
    title: 'Workplace Korean Foundation',
    titleKorean: '직장 및 산업 현장 기초 한국어',
    emoji: '💼',
    description: 'Essential industrial terms, factory safety equipment, machinery warnings, and supervisor workplace commands in Nepali & English.',
    category: 'Workplace',
    badgeName: 'Industrial Safety Badge',
    badgeEmoji: '🦺',
    lessons: [
      {
        id: 'mod8-less1',
        lessonNumber: 1,
        title: 'Factory Safety Equipment & Gear (안전장구와 보호구)',
        titleKorean: '산업 현장 개인 보호구 및 안전 장구',
        description: 'Learn terms for Safety Helmet (안전모), Safety Shoes (안전화), Earplugs (귀마개), and Mask (마스크).',
        estimatedMinutes: 12,
        contentBlocks: [
          {
            id: 'm8b1_h',
            type: 'HEADING',
            heading: 'Personal Protective Equipment - PPE (सुरक्षा सामग्रीहरू)',
          },
          {
            id: 'm8b1_v',
            type: 'VOCABULARY',
            items: [
              { term: '안전모', rom: 'an-jeon-mo', en: 'Safety Helmet', np: 'सुरक्षा हेलमेट' },
              { term: '안전화', rom: 'an-jeon-hwa', en: 'Safety Boots / Shoes', np: 'सुरक्षा जुत्ता' },
              { term: '보안경', rom: 'bo-an-gyeong', en: 'Safety Glasses / Goggles', np: 'सुरक्षा चश्मा' },
              { term: '귀마개', rom: 'gwi-ma-gae', en: 'Earplugs (Noise protection)', np: 'कानको प्लग (आवाज रोक्ने)' },
              { term: '마스크', rom: 'ma-seu-keu', en: 'Dust / Gas Mask', np: 'मास्क (मास्क)' },
              { term: '안전장갑', rom: 'an-jeon-jang-gap', en: 'Safety Gloves', np: 'सुरक्षा पन्जा' },
            ],
          },
        ],
      },
      {
        id: 'mod8-less2',
        lessonNumber: 2,
        title: 'Machine Operation & Workplace Commands (기계 조작 및 작업 지시)',
        titleKorean: '기계 조작 및 안전 수칙 표현',
        description: 'Understand supervisor instructions: "스위치를 누르세요", "조심하세요!", "위험해요!", "정지하세요!".',
        estimatedMinutes: 14,
        contentBlocks: [
          {
            id: 'm8b2_h',
            type: 'HEADING',
            heading: 'Workplace Safety Commands (काम गर्दा प्रयोग हुने निर्देशनहरू)',
          },
          {
            id: 'm8b2_v',
            type: 'VOCABULARY',
            items: [
              { term: '스위치를 누르세요', rom: 'Seu-wi-chi-reul nu-reu-se-yo', en: 'Press the switch', np: 'स्विच थिच्नुहोस्' },
              { term: '기계를 끄세요 / 켜세요', rom: 'Gi-gye-reul kkeu-se-yo / kyeo-se-yo', en: 'Turn off / Turn on the machine', np: 'मेसिन बन्द गर्नुहोस् / चलाउनुहोस्' },
              { term: '조심하세요! 위험해요!', rom: 'Jo-sim-ha-se-yo! Wi-heom-hae-yo!', en: 'Be careful! It is dangerous!', np: 'होसियार हुनुहोस्! खतरा छ!' },
              { term: '손대지 마세요', rom: 'Son-dae-ji ma-se-yo', en: 'Do not touch!', np: 'हाथ नलाउनुहोस्!' },
              { term: '작업을 정지하세요', rom: 'Jak-eob-eul jeong-ji-ha-se-yo', en: 'Stop working / Stop operation', np: 'काम बन्द गर्नुहोस्' },
            ],
          },
        ],
      },
    ],
  },

  // ── MODULE 09: READING & LISTENING ──
  {
    id: 'module-09',
    moduleNumber: 9,
    title: 'Reading & Listening Skills',
    titleKorean: '읽기와 듣기 능력 향상',
    emoji: '🎧',
    description: 'Train your brain to recognize spoken Korean words, public announcements, and read short passages accurately.',
    category: 'Skills',
    badgeName: 'Comprehension Master Badge',
    badgeEmoji: '🎯',
    lessons: [
      {
        id: 'mod9-less1',
        lessonNumber: 1,
        title: 'Listening to Public Announcements (안내 방송 듣기)',
        titleKorean: '지하철·버스 안내 방송 및 작업장 공지',
        description: 'Listen to simulated subway, bus, and workplace audio announcements in Korean.',
        estimatedMinutes: 12,
        contentBlocks: [
          {
            id: 'm9b1_h',
            type: 'HEADING',
            heading: 'Subway & Bus Announcement Practice (सूचना प्रसारण)',
          },
          {
            id: 'm9b1_k',
            type: 'KOREAN_TEXT',
            koreanText: '이번 역은 서울역입니다. 내리실 문은 오른쪽입니다.',
            romanization: 'I-beon yeok-eun Seo-ul-yeok-im-ni-da. Nae-ri-sil mun-eun o-reun-jjok-im-ni-da.',
            translationEn: 'This stop is Seoul Station. The doors are on your right.',
            translationNp: 'यो स्टेसन सिउल स्टेसन हो। ओर्लिने ढोका दायाँतिर छ।',
            audioText: '이번 역은 서울역입니다. 내리실 문은 오른쪽입니다.',
          },
        ],
      },
      {
        id: 'mod9-less2',
        lessonNumber: 2,
        title: 'Short Korean Passage Reading (단문 읽기 연습)',
        titleKorean: '짧은 글 읽기와 이해력 연습',
        description: 'Read short 3-sentence Korean paragraphs and check reading comprehension.',
        estimatedMinutes: 14,
        contentBlocks: [
          {
            id: 'm9b2_h',
            type: 'HEADING',
            heading: 'Reading Practice Paragraph (छोटो अनुच्छेद पठन)',
          },
          {
            id: 'm9b2_ex',
            type: 'EXAMPLE',
            koreanText: '저는 한국 회사에서 일해요. 매일 아침 8시에 출근해요. 일이 재미있어요.',
            romanization: 'Jeo-neun Han-guk hoe-sa-e-seo il-hae-yo. Mae-il a-chim 8-si-e chul-geun-hae-yo. Il-i jae-mi-is-seo-yo.',
            translationEn: 'I work at a Korean company. I go to work every morning at 8:00 AM. My work is fun.',
            translationNp: 'म कोरियाली कम्पनीमा काम गर्छु। म हरेक बिहान ८ बजे काममा जान्छु। काम रमाइलो छ।',
          },
        ],
      },
    ],
  },

  // ── MODULE 10: WRITING & SPEAKING ──
  {
    id: 'module-10',
    moduleNumber: 10,
    title: 'Writing & Speaking',
    titleKorean: '쓰기와 말하기 실전 연습',
    emoji: '✍️',
    description: 'Practice forming correct Hangeul sentences, writing self-introductions, and role-playing spoken Korean dialogue.',
    category: 'Skills',
    badgeName: 'Fluency Builder Badge',
    badgeEmoji: '💬',
    lessons: [
      {
        id: 'mod10-less1',
        lessonNumber: 1,
        title: 'Self-Introduction Speaking & Writing (자기소개 말하기)',
        titleKorean: '자기소개 작성 및 발표 실습',
        description: 'Write and speak your name, age, nationality, job, and polite greetings in Korean.',
        estimatedMinutes: 12,
        contentBlocks: [
          {
            id: 'm10b1_h',
            type: 'HEADING',
            heading: 'Self-Introduction Speech Script (आफ्नो परिचय दिने ढाँचा)',
          },
          {
            id: 'm10b1_ex',
            type: 'EXAMPLE',
            koreanText: '안녕하세요? 저는 네팔에서 온 라메쉬입니다. 제 나이는 스물다섯 살입니다. 잘 부탁드립니다.',
            romanization: 'An-nyeong-ha-se-yo? Jeo-neun Ne-pal-e-seo on Ra-me-swi-im-ni-da. Je na-i-neun seu-mul-da-seot sar-im-ni-da. Jal bu-tak-deu-rim-ni-da.',
            translationEn: 'Hello! I am Ramesh from Nepal. I am 25 years old. Pleased to meet you.',
            translationNp: 'नमस्ते! म नेपालबाट आएको रमेश हुँ। मेरो उमेर २५ वर्ष भयो। राम्रोसँग सँगै काम गरौँ (खुसी लाग्यो)।',
          },
        ],
      },
    ],
  },

  // ── MODULE 11: PRACTICE & REVIEW ──
  {
    id: 'module-11',
    moduleNumber: 11,
    title: 'Practice & Comprehensive Review',
    titleKorean: '기초 종합 연습과 복습',
    emoji: '🧠',
    description: 'Comprehensive review quizzes, flashcard drills, mistake review, and speed checks across Modules 01-10.',
    category: 'Review',
    badgeName: 'Review Hero Badge',
    badgeEmoji: '🏆',
    lessons: [
      {
        id: 'mod11-less1',
        lessonNumber: 1,
        title: 'Full Basics Comprehensive Assessment (종합 평가)',
        titleKorean: '한글 기초 과정 종합 평가',
        description: 'Test all vocabulary, particles, numbers, and expressions learned in the Korean Foundation.',
        estimatedMinutes: 15,
        contentBlocks: [
          {
            id: 'm11b1_h',
            type: 'HEADING',
            heading: 'Basics Mastery Review (समग्र पुनरावलोकन)',
          },
          {
            id: 'm11b1_q',
            type: 'QUIZ',
            quizQuestion: {
              question: 'Which sentence correctly means "I am studying Korean at school"?',
              options: ['저는 학교에서 한국어를 공부해요.', '저는 학교에 한국어가 공부해요.', '저는 학교를 한국어에서 공부해요.', '저는 한국어를 학교로 공부해요.'],
              correctIndex: 0,
              explanation: 'At a location (학교에서) + Object (한국어를) + Action verb (공부해요) is correct.',
            },
          },
        ],
      },
    ],
  },

  // ── MODULE 12: TOPIK & EPS BRIDGE ──
  {
    id: 'module-12',
    moduleNumber: 12,
    title: 'TOPIK & EPS Bridge',
    titleKorean: 'TOPIK과 EPS-TOPIK 연계 도약',
    emoji: '🎯',
    description: 'Congratulations on completing Korean Foundation! Choose your target exam pathway: TOPIK I (Academic/Visa) or EPS-TOPIK (Employment).',
    category: 'Bridge',
    badgeName: 'Korean Academy Graduate Badge',
    badgeEmoji: '🎓',
    lessons: [
      {
        id: 'mod12-less1',
        lessonNumber: 1,
        title: 'Choosing Your Next Exam Specialization (시험 경로 선택)',
        titleKorean: '나에게 맞는 시험 경로 (TOPIK I vs EPS-TOPIK) 선택',
        description: 'Understand the difference between TOPIK I (University/Visa) and EPS-TOPIK (Employment Permit System).',
        estimatedMinutes: 10,
        contentBlocks: [
          {
            id: 'm12b1_h',
            type: 'HEADING',
            heading: '🎉 Graduation! You Have Mastered Korean Basics!',
          },
          {
            id: 'm12b2_t',
            type: 'TEXT',
            text: 'You now possess a complete Hangeul foundation, 600+ essential vocabulary words, core particles (은/는, 이/가, 을/를, 에, 에서), number systems (Sino vs Native), and daily conversation skills! Select your target exam pathway in the top ribbon to continue:',
          },
          {
            id: 'm12b3_v',
            type: 'VOCABULARY',
            items: [
              { term: 'EPS-TOPIK (고용허가제 한국어능력시험)', rom: 'Employment Permit System', en: '60 Official Lessons for Korean Employment & Work Visa in Korea', np: 'कोरियामा रोजगार (E-9 भिसा) का लागि ६० पाठको आधिकारिक पाठ्यक्रम' },
              { term: 'TOPIK I — Level 1 & 2 (한국어능력시험 I)', rom: 'Test of Proficiency in Korean', en: 'Official General Korean Test for University Admission & D-2 / D-4 / F-2 Visas', np: 'कोरियाली विश्वविद्यालय र भिसा (General TOPIK 1급, 2급) का लागि परीक्षा' },
            ],
          },
        ],
      },
    ],
  },
];

// ────────────────────────────────────────────────────────────
// SMART PLACEMENT TEST QUESTIONS (For Placement Test Feature)
// ────────────────────────────────────────────────────────────
export const PLACEMENT_TEST_QUESTIONS: PlacementQuestion[] = [
  {
    id: 'pt-1',
    question: 'How do you pronounce the Korean vowel letter "ㅏ"?',
    options: ['"a" as in father', '"o" as in home', '"i" as in meet', '"u" as in moon'],
    correctIndex: 0,
    recommendModuleId: 'module-02',
    recommendModuleName: 'Module 02 — Korean Alphabets',
  },
  {
    id: 'pt-2',
    question: 'What is the correct Korean sentence word order?',
    options: ['Subject + Verb + Object (SVO)', 'Subject + Object + Verb (SOV)', 'Verb + Subject + Object (VSO)', 'Object + Verb + Subject (OVS)'],
    correctIndex: 1,
    recommendModuleId: 'module-01',
    recommendModuleName: 'Module 01 — Korean Foundation',
  },
  {
    id: 'pt-3',
    question: 'Which Hangeul consonant produces the "n" sound as in "name"?',
    options: ['ㄱ (Giyeok)', 'ㄴ (Nieun)', 'ㄷ (Digeut)', 'ㅁ (Mieum)'],
    correctIndex: 1,
    recommendModuleId: 'module-02',
    recommendModuleName: 'Module 02 — Korean Alphabets',
  },
  {
    id: 'pt-4',
    question: 'What syllable block is created by combining consonant "ㄱ" + vowel "ㅏ"?',
    options: ['가 (ga)', '나 (na)', '다 (da)', '라 (ra)'],
    correctIndex: 0,
    recommendModuleId: 'module-02',
    recommendModuleName: 'Module 02 — Korean Alphabets',
  },
  {
    id: 'pt-5',
    question: 'Which number system is used for money (원), phone numbers, and dates?',
    options: ['Native Korean (하나, 둘, 셋...)', 'Sino-Korean (일, 이, 삼...)', 'English Numbers', 'Roman Numerals'],
    correctIndex: 1,
    recommendModuleId: 'module-04',
    recommendModuleName: 'Module 04 — Essential Korean & Numbers',
  },
  {
    id: 'pt-6',
    question: 'How do you politely say "Hello" in Korean?',
    options: ['감사합니다', '안녕하세요?', '죄송합니다', '안녕히 가세요'],
    correctIndex: 1,
    recommendModuleId: 'module-04',
    recommendModuleName: 'Module 04 — Essential Korean & Numbers',
  },
  {
    id: 'pt-7',
    question: 'What is the Korean word for "Water"?',
    options: ['밥 (Bab)', '물 (Mul)', '차 (Cha)', '우유 (U-yu)'],
    correctIndex: 1,
    recommendModuleId: 'module-05',
    recommendModuleName: 'Module 05 — Vocabulary Builder',
  },
  {
    id: 'pt-8',
    question: 'Which particle indicates the main topic of a sentence after a vowel?',
    options: ['은', '는', '이', '가'],
    correctIndex: 1,
    recommendModuleId: 'module-06',
    recommendModuleName: 'Module 06 — Grammar Foundation',
  },
  {
    id: 'pt-9',
    question: 'What does "이거 얼마예요?" mean in everyday shopping?',
    options: ['Where is this?', 'What time is it?', 'How much is this?', 'Who is this?'],
    correctIndex: 2,
    recommendModuleId: 'module-07',
    recommendModuleName: 'Module 07 — Real-Life Korean',
  },
  {
    id: 'pt-10',
    question: 'What does "안전모" mean in industrial workplace Korean?',
    options: ['Safety Gloves', 'Safety Helmet', 'Safety Shoes', 'Safety Goggles'],
    correctIndex: 1,
    recommendModuleId: 'module-08',
    recommendModuleName: 'Module 08 — Workplace Korean Foundation',
  },
];
