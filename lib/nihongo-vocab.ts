// ============================================================
// NIHONGO VOCAB - Full Minna no Nihongo Curriculum
// JLPT N5 (Lessons 1-25)
// JLPT N4 (Lessons 26-50)
// JLPT N3 (Lessons 51-75)
// With English & Nepali Translations + Grammar Example Sentences
// ============================================================

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
  // N5 (LESSONS 1 - 25)
  // ─────────────────────────────────────────────
  { id:'v1_1',  lesson:1, level:'N5', word:'私',      reading:'わたし',       meaning:'I, Me',                  meaningNepali:'म',                     kanjiCharacters:['私'], partOfSpeech:'Pronoun', grammarSentences:[{japanese:'私はマリアです。', reading:'わたしはマリアです。', english:'I am Maria.', nepali:'म मारिया हुँ।'}] },
  { id:'v1_2',  lesson:1, level:'N5', word:'先生',    reading:'せんせい',     meaning:'Teacher',                 meaningNepali:'शिक्षक / गुरु',         kanjiCharacters:['先','生'], partOfSpeech:'Noun', grammarSentences:[{japanese:'サントスさんは先生です。', reading:'サントスさんはせんせいです。', english:'Mr. Santos is a teacher.', nepali:'सान्तोस-जी शिक्षक हुनुहुन्छ।'}] },
  { id:'v1_3',  lesson:1, level:'N5', word:'学生',    reading:'がくせい',     meaning:'Student',                 meaningNepali:'विद्यार्थी',            kanjiCharacters:['学','生'], partOfSpeech:'Noun' },
  { id:'v1_4',  lesson:1, level:'N5', word:'会社員',  reading:'かいしゃいん', meaning:'Company Employee',        meaningNepali:'कम्पनी कर्मचारी',       kanjiCharacters:['会','社','員'], partOfSpeech:'Noun' },
  { id:'v1_5',  lesson:1, level:'N5', word:'医者',    reading:'いしゃ',       meaning:'Doctor',                  meaningNepali:'डाक्टर',                kanjiCharacters:['医','者'], partOfSpeech:'Noun' },

  { id:'v2_1',  lesson:2, level:'N5', word:'本',      reading:'ほん',         meaning:'Book',                    meaningNepali:'किताब',                 kanjiCharacters:['本'], grammarSentences:[{japanese:'これは本です。', reading:'これはほんです。', english:'This is a book.', nepali:'यो किताब हो।'}] },
  { id:'v2_2',  lesson:2, level:'N5', word:'辞書',    reading:'じしょ',       meaning:'Dictionary',              meaningNepali:'शब्दकोश',               kanjiCharacters:['辞','書'] },
  { id:'v2_3',  lesson:2, level:'N5', word:'新聞',    reading:'しんぶん',     meaning:'Newspaper',               meaningNepali:'समाचार पत्र',           kanjiCharacters:['新','聞'] },

  { id:'v3_1',  lesson:3, level:'N5', word:'教室',    reading:'きょうしつ',   meaning:'Classroom',               meaningNepali:'कक्षाकोठा',             kanjiCharacters:['教','室'], grammarSentences:[{japanese:'教室はどこですか。', reading:'きょうしつはどこですか。', english:'Where is the classroom?', nepali:'कक्षाकोठा कहाँ छ?'}] },
  { id:'v3_2',  lesson:3, level:'N5', word:'食堂',    reading:'しょくどう',   meaning:'Cafeteria',               meaningNepali:'क्यान्टिन',             kanjiCharacters:['食','堂'] },
  { id:'v3_3',  lesson:3, level:'N5', word:'事務所',  reading:'じむしょ',     meaning:'Office',                  meaningNepali:'कार्यालय',              kanjiCharacters:['事','務','所'] },

  { id:'v4_1',  lesson:4, level:'N5', word:'今',      reading:'いま',         meaning:'Now',                     meaningNepali:'अहिले',                 kanjiCharacters:['今'], grammarSentences:[{japanese:'今、何時ですか。', reading:'いま、なんじですか。', english:'What time is it now?', nepali:'अहिले कति बज्यो?'}] },
  { id:'v4_2',  lesson:4, level:'N5', word:'〜時',    reading:'〜じ',         meaning:'O\'clock',                meaningNepali:'बजे (समय)',              kanjiCharacters:['時'] },
  { id:'v4_3',  lesson:4, level:'N5', word:'半',      reading:'はん',         meaning:'Half past',               meaningNepali:'आधा',                   kanjiCharacters:['半'] },

  { id:'v5_1',  lesson:5, level:'N5', word:'いくら',  reading:'いくら',       meaning:'How much?',               meaningNepali:'कति पर्छ?',             kanjiCharacters:[], grammarSentences:[{japanese:'これはいくらですか。', reading:'これはいくらですか。', english:'How much is this?', nepali:'यो कति पर्छ?'}] },
  { id:'v5_2',  lesson:5, level:'N5', word:'〜円',    reading:'〜えん',       meaning:'Yen',                     meaningNepali:'येन',                   kanjiCharacters:['円'] },

  { id:'v6_1',  lesson:6, level:'N5', word:'食べます', reading:'たべます',    meaning:'To eat',                  meaningNepali:'खाउनु',                 kanjiCharacters:['食'], grammarSentences:[{japanese:'朝ごはんを食べます。', reading:'あさごはんをたべます。', english:'I eat breakfast.', nepali:'म बिहानको खाना खान्छु।'}] },
  { id:'v6_2',  lesson:6, level:'N5', word:'飲みます', reading:'のみます',    meaning:'To drink',                meaningNepali:'पिउनु',                 kanjiCharacters:['飲'] },
  { id:'v6_3',  lesson:6, level:'N5', word:'見ます',   reading:'みます',      meaning:'To watch',                meaningNepali:'हेर्नु',                kanjiCharacters:['見'] },

  { id:'v7_1',  lesson:7, level:'N5', word:'家族',    reading:'かぞく',       meaning:'Family',                  meaningNepali:'परिवार',                kanjiCharacters:['家','族'], grammarSentences:[{japanese:'家族は五人です。', reading:'かぞくはごにんです。', english:'My family has 5 people.', nepali:'मेरो परिवारमा ५ जना छन्।'}] },
  { id:'v8_1',  lesson:8, level:'N5', word:'電車',    reading:'でんしゃ',     meaning:'Train',                   meaningNepali:'रेलगाडी',               kanjiCharacters:['電','車'] },
  { id:'v9_1',  lesson:9, level:'N5', word:'図書館',  reading:'としょかん',   meaning:'Library',                 meaningNepali:'पुस्तकालय',             kanjiCharacters:['図','書','館'] },

  // ─────────────────────────────────────────────
  // N4 (LESSONS 26 - 50)
  // ─────────────────────────────────────────────
  { id:'v26_1', lesson:26, level:'N4', word:'見学', reading:'けんがく', meaning:'Study tour / Field trip', meaningNepali:'अध्ययन अवलोकन / भ्रमण', kanjiCharacters:['見','学'], partOfSpeech:'Noun / Verb', grammarSentences:[{japanese:'明日工場を見学します。', reading:'あしたこうじょうをけんがくします。', english:'We will tour the factory tomorrow.', nepali:'भोलि कारखाना अवलोकन गर्छौँ।'}] },
  { id:'v26_2', lesson:26, level:'N4', word:'案内', reading:'あんない', meaning:'Guidance / Tour guiding', meaningNepali: 'मार्गदर्शन / जानकारी', kanjiCharacters:['案','内'], partOfSpeech:'Noun / Verb', grammarSentences:[{japanese:'市役所を案内していただけませんか。', reading:'しやくしょをあんないしていただけませんか。', english:'Could you please show me around city hall?', nepali:'के मलाई नगरपालिकासम्म बाटो देखाउनुहुन्छ?'}] },
  { id:'v26_3', lesson:26, level:'N4', word:'探す', reading:'さがす', meaning:'To search for / To look for', meaningNepali:'खोज्नु', kanjiCharacters:['探'], partOfSpeech:'Verb', grammarSentences:[{japanese:'いい部屋を探しているんです。', reading:'いいへやをさがしているんです。', english:'I am looking for a nice room.', nepali:'म राम्रो कोठा खोज्दैछु।'}] },
  { id:'v26_4', lesson:26, level:'N4', word:'都合', reading:'つごう', meaning:'Convenience / Schedule condition', meaningNepali:'समय अनुकूलता', kanjiCharacters:['都','合'], partOfSpeech:'Noun', grammarSentences:[{japanese:'土曜日の都合はいかがですか。', reading:'どようびのつごうはいかがですか。', english:'Is Saturday convenient for you?', nepali:'शनिबार तपाईंलाई अनुकूल हुन्छ?'}] },
  { id:'v26_5', lesson:26, level:'N4', word:'遅れる', reading:'おくれる', meaning:'To be late / To delay', meaningNepali:'ढिलो हुनु', kanjiCharacters:['遅'], partOfSpeech:'Verb', grammarSentences:[{japanese:'時間に遅れないでください。', reading:'じかんにおくれないでください。', english:'Please do not be late for the time.', nepali:'कृपया समयमा ढिलो नगर्नुस्।'}] },
  { id:'v26_6', lesson:26, level:'N4', word:'参加する', reading:'さんかする', meaning:'To participate / To join', meaningNepali:'भाग लिनु / सहभागी हुनु', kanjiCharacters:['参','加'], partOfSpeech:'Verb', grammarSentences:[{japanese:'パーティーに参加します。', reading:'パーティーにさんかします。', english:'I will attend the party.', nepali:'म पार्टीमा सहभागी हुन्छु।'}] },
  { id:'v26_7', lesson:26, level:'N4', word:'連絡', reading:'れんらく', meaning:'Contact / Communication', meaningNepali:'सम्पर्क', kanjiCharacters:['連','絡'], partOfSpeech:'Noun / Verb' },
  { id:'v26_8', lesson:26, level:'N4', word:'直接', reading:'ちょくせつ', meaning:'Directly / In person', meaningNepali:'प्रत्यक्ष', kanjiCharacters:['直','接'], partOfSpeech:'Adverb' },
  { id:'v26_9', lesson:26, level:'N4', word:'片付く', reading:'かたづく', meaning:'To be put in order / Tidy up', meaningNepali:'सफा हुनु / व्यवस्थापन हुनु', kanjiCharacters:['片','付'], partOfSpeech:'Verb' },

  { id:'v27_1', lesson:27, level:'N4', word:'見られます', reading:'みられます', meaning:'Can see / be seen', meaningNepali:'हेर्न सकिन्छ', kanjiCharacters:['見'] },
  { id:'v27_2', lesson:27, level:'N4', word:'聞こえます', reading:'きこえます', meaning:'Can hear / be heard', meaningNepali:'सुन्न सकिन्छ', kanjiCharacters:['聞'] },
  { id:'v27_3', lesson:27, level:'N4', word:'完成', reading:'かんせい', meaning:'Completion / Perfection', meaningNepali:'पूरा हुनु / सम्पन्न', kanjiCharacters:['完','成'] },

  { id:'v28_1', lesson:28, level:'N4', word:'〜ながら', reading:'〜ながら', meaning:'While doing ~', meaningNepali:'~ गर्दै गर्दा', kanjiCharacters:[], grammarSentences:[{japanese:'音楽を聞きながら勉強します。', reading:'おんがくをききながらべんきょうします。', english:'I study while listening to music.', nepali:'सङ्गीत सुन्दै पढ्छु।'}] },

  { id:'v29_1', lesson:29, level:'N4', word:'開いています', reading:'あいています', meaning:'Is open (state)', meaningNepali:'खुलेको छ', kanjiCharacters:['開'] },
  { id:'v29_2', lesson:29, level:'N4', word:'閉まっています', reading:'しまっています', meaning:'Is closed (state)', meaningNepali:'बन्द छ', kanjiCharacters:['閉'] },

  // ─────────────────────────────────────────────
  // N3 (LESSONS 51 - 75)
  // ─────────────────────────────────────────────
  { id:'v51_1', lesson:51, level:'N3', word:'間違いない', reading:'まちがいない', meaning:'No mistake / Certain', meaningNepali:'निसन्देह / पक्का', kanjiCharacters:['違'], grammarSentences:[{japanese:'彼が犯人に違いない。', reading:'かれがはんにんにちがいない。', english:'He must be the culprit.', nepali:'उही अपराधी हो भन्नेमा शङ्का छैन।'}] },
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
