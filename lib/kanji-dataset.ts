export interface KanjiItem {
  character: string;
  level: 'N5' | 'N4' | 'N3' | 'N2';
  lessonOrder: number;
  strokeCount: number;
  readingsOnyomi: string[];
  readingsKunyomi: string[];
  meanings: string[];
  meaningsNepali: string[];
  radicals: { radical: string; meaning: string; color: string }[];
  strokeSvgData?: string[];
  compounds: { word: string; reading: string; meaning: string }[];
}

export const RAW_N5_KANJI: KanjiItem[] = [
  // Lesson 1: Numbers & Basics
  { character: '一', level: 'N5', lessonOrder: 1, strokeCount: 1, readingsOnyomi: ['ICHI'], readingsKunyomi: ['hito-tsu'], meanings: ['One'], meaningsNepali: ['एक (१)'], radicals: [{ radical: '一', meaning: 'One', color: '#ffb703' }], compounds: [{ word: '一人', reading: 'hitori', meaning: 'One person' }, { word: '一番', reading: 'ichiban', meaning: 'Best' }] },
  { character: '二', level: 'N5', lessonOrder: 1, strokeCount: 2, readingsOnyomi: ['NI'], readingsKunyomi: ['futa-tsu'], meanings: ['Two'], meaningsNepali: ['दुई (२)'], radicals: [{ radical: '二', meaning: 'Two', color: '#3b82f6' }], compounds: [{ word: '二人', reading: 'futari', meaning: 'Two people' }] },
  { character: '三', level: 'N5', lessonOrder: 1, strokeCount: 3, readingsOnyomi: ['SAN'], readingsKunyomi: ['mit-tsu'], meanings: ['Three'], meaningsNepali: ['तीन (३)'], radicals: [{ radical: '一', meaning: 'One', color: '#10b981' }], compounds: [{ word: '三日', reading: 'mikka', meaning: '3rd day' }] },
  { character: '四', level: 'N5', lessonOrder: 2, strokeCount: 5, readingsOnyomi: ['SHI'], readingsKunyomi: ['yot-tsu', 'yon'], meanings: ['Four'], meaningsNepali: ['चार (४)'], radicals: [{ radical: '囗', meaning: 'Enclosure', color: '#ff4d6d' }], compounds: [{ word: '四日', reading: 'yokka', meaning: '4th day' }] },
  { character: '五', level: 'N5', lessonOrder: 2, strokeCount: 4, readingsOnyomi: ['GO'], readingsKunyomi: ['itsu-tsu'], meanings: ['Five'], meaningsNepali: ['पाँच (५)'], radicals: [{ radical: '二', meaning: 'Two', color: '#ffb703' }], compounds: [{ word: '五月', reading: 'gogatsu', meaning: 'May' }] },
  { character: '六', level: 'N5', lessonOrder: 3, strokeCount: 4, readingsOnyomi: ['ROKU'], readingsKunyomi: ['mut-tsu'], meanings: ['Six'], meaningsNepali: ['छ (६)'], radicals: [{ radical: '八', meaning: 'Eight', color: '#3b82f6' }], compounds: [{ word: '六月', reading: 'rokugatsu', meaning: 'June' }] },
  { character: '七', level: 'N5', lessonOrder: 3, strokeCount: 2, readingsOnyomi: ['SHICHI'], readingsKunyomi: ['nana-tsu'], meanings: ['Seven'], meaningsNepali: ['सात (७)'], radicals: [{ radical: '一', meaning: 'One', color: '#10b981' }], compounds: [{ word: '七日', reading: 'nanoka', meaning: '7th day' }] },
  { character: '八', level: 'N5', lessonOrder: 4, strokeCount: 2, readingsOnyomi: ['HACHI'], readingsKunyomi: ['yat-tsu'], meanings: ['Eight'], meaningsNepali: ['आठ (८)'], radicals: [{ radical: '八', meaning: 'Eight', color: '#ff4d6d' }], compounds: [{ word: '八日', reading: 'yōka', meaning: '8th day' }] },
  { character: '九', level: 'N5', lessonOrder: 4, strokeCount: 2, readingsOnyomi: ['KYŪ', 'KU'], readingsKunyomi: ['kokono-tsu'], meanings: ['Nine'], meaningsNepali: ['नौ (९)'], radicals: [{ radical: '乙', meaning: 'Second', color: '#ffb703' }], compounds: [{ word: '九月', reading: 'kugatsu', meaning: 'September' }] },
  { character: '十', level: 'N5', lessonOrder: 5, strokeCount: 2, readingsOnyomi: ['JŪ'], readingsKunyomi: ['tō'], meanings: ['Ten'], meaningsNepali: ['दश (१०)'], radicals: [{ radical: '十', meaning: 'Ten', color: '#3b82f6' }], compounds: [{ word: '十分', reading: 'jūbun', meaning: 'Sufficient' }] },
  { character: '百', level: 'N5', lessonOrder: 6, strokeCount: 6, readingsOnyomi: ['HYAKU'], readingsKunyomi: [], meanings: ['Hundred'], meaningsNepali: ['सय (१००)'], radicals: [{ radical: '白', meaning: 'White', color: '#10b981' }], compounds: [{ word: '三百', reading: 'sanbyaku', meaning: '300' }] },
  { character: '千', level: 'N5', lessonOrder: 7, strokeCount: 3, readingsOnyomi: ['SEN'], readingsKunyomi: ['chi'], meanings: ['Thousand'], meaningsNepali: ['हजार (१०००)'], radicals: [{ radical: '十', meaning: 'Ten', color: '#ff4d6d' }], compounds: [{ word: '三千', reading: 'sanzen', meaning: '3000' }] },
  { character: '万', level: 'N5', lessonOrder: 8, strokeCount: 3, readingsOnyomi: ['MAN', 'BAN'], readingsKunyomi: [], meanings: ['Ten Thousand'], meaningsNepali: ['दश हजार (१०,०००)'], radicals: [{ radical: '一', meaning: 'One', color: '#ffb703' }], compounds: [{ word: '一万円', reading: 'ichimanen', meaning: '10,000 yen' }] },
  { character: '円', level: 'N5', lessonOrder: 9, strokeCount: 4, readingsOnyomi: ['EN'], readingsKunyomi: ['maru-i'], meanings: ['Yen', 'Circle', 'Round'], meaningsNepali: ['येन (मुद्रा), वृत्त'], radicals: [{ radical: '囗', meaning: 'Enclosure', color: '#3b82f6' }], compounds: [{ word: '百円', reading: 'hyakuen', meaning: '100 Yen' }] },

  // Lesson 10: Nature & Time Basics
  { character: '日', level: 'N5', lessonOrder: 10, strokeCount: 4, readingsOnyomi: ['NICHI', 'JITSU'], readingsKunyomi: ['hi', 'bi', 'ka'], meanings: ['Sun', 'Day'], meaningsNepali: ['घाम, दिन'], radicals: [{ radical: '日', meaning: 'Sun', color: '#ffb703' }], compounds: [{ word: '日曜日', reading: 'nichiyōbi', meaning: 'Sunday' }, { word: '日本', reading: 'Nihon', meaning: 'Japan' }] },
  { character: '月', level: 'N5', lessonOrder: 11, strokeCount: 4, readingsOnyomi: ['GETSU', 'GATSU'], readingsKunyomi: ['tsuki'], meanings: ['Moon', 'Month'], meaningsNepali: ['जुन, महिना'], radicals: [{ radical: '月', meaning: 'Moon', color: '#3b82f6' }], compounds: [{ word: '月曜日', reading: 'getsuyōbi', meaning: 'Monday' }] },
  { character: '火', level: 'N5', lessonOrder: 12, strokeCount: 4, readingsOnyomi: ['KA'], readingsKunyomi: ['hi'], meanings: ['Fire'], meaningsNepali: ['आगो'], radicals: [{ radical: '火', meaning: 'Fire', color: '#ff4d6d' }], compounds: [{ word: '火曜日', reading: 'kayōbi', meaning: 'Tuesday' }] },
  { character: '水', level: 'N5', lessonOrder: 13, strokeCount: 4, readingsOnyomi: ['SUI'], readingsKunyomi: ['mizu'], meanings: ['Water'], meaningsNepali: ['पानी'], radicals: [{ radical: '水', meaning: 'Water', color: '#06b6d4' }], compounds: [{ word: '水曜日', reading: 'suiyōbi', meaning: 'Wednesday' }] },
  { character: '木', level: 'N5', lessonOrder: 14, strokeCount: 4, readingsOnyomi: ['MOKU', 'BOKU'], readingsKunyomi: ['ki'], meanings: ['Tree', 'Wood'], meaningsNepali: ['रूख, काठ'], radicals: [{ radical: '木', meaning: 'Tree', color: '#10b981' }], compounds: [{ word: '木曜日', reading: 'mokuyōbi', meaning: 'Thursday' }] },
  { character: '金', level: 'N5', lessonOrder: 15, strokeCount: 8, readingsOnyomi: ['KIN', 'KON'], readingsKunyomi: ['kane'], meanings: ['Gold', 'Money', 'Metal'], meaningsNepali: ['सुन, पैसा'], radicals: [{ radical: '金', meaning: 'Metal', color: '#ffb703' }], compounds: [{ word: '金曜日', reading: 'kin\'yōbi', meaning: 'Friday' }, { word: 'お金', reading: 'okane', meaning: 'Money' }] },
  { character: '土', level: 'N5', lessonOrder: 16, strokeCount: 3, readingsOnyomi: ['TO', 'DO'], readingsKunyomi: ['tsuchi'], meanings: ['Soil', 'Earth'], meaningsNepali: ['माटो, जमिन'], radicals: [{ radical: '土', meaning: 'Earth', color: '#8b5cf6' }], compounds: [{ word: '土曜日', reading: 'doyōbi', meaning: 'Saturday' }] },
  { character: '年', level: 'N5', lessonOrder: 17, strokeCount: 6, readingsOnyomi: ['NEN'], readingsKunyomi: ['toshi'], meanings: ['Year'], meaningsNepali: ['वर्ष'], radicals: [{ radical: '干', meaning: 'Dry', color: '#3b82f6' }], compounds: [{ word: '今年', reading: 'kotoshi', meaning: 'This year' }, { word: '来年', reading: 'rainen', meaning: 'Next year' }] },
  { character: '時', level: 'N5', lessonOrder: 18, strokeCount: 10, readingsOnyomi: ['JI'], readingsKunyomi: ['toki'], meanings: ['Time', 'Hour'], meaningsNepali: ['समय, घण्टा'], radicals: [{ radical: '日', meaning: 'Sun', color: '#ffb703' }], compounds: [{ word: '一時', reading: 'ichiji', meaning: '1 o\'clock' }, { word: '時間', reading: 'jikan', meaning: 'Time duration' }] },
  { character: '分', level: 'N5', lessonOrder: 19, strokeCount: 4, readingsOnyomi: ['BUN', 'FUN', 'BU'], readingsKunyomi: ['wa-karu'], meanings: ['Minute', 'Part', 'Understand'], meaningsNepali: ['मिनेट, भाग, बुझ्नु'], radicals: [{ radical: '刀', meaning: 'Sword', color: '#ff4d6d' }], compounds: [{ word: '五分', reading: 'gofun', meaning: '5 minutes' }, { word: '分かる', reading: 'wakaru', meaning: 'To understand' }] },

  // Lesson 20: People
  { character: '人', level: 'N5', lessonOrder: 20, strokeCount: 2, readingsOnyomi: ['JIN', 'NIN'], readingsKunyomi: ['hito'], meanings: ['Person', 'Human'], meaningsNepali: ['मानिस'], radicals: [{ radical: '人', meaning: 'Person', color: '#ff4d6d' }], compounds: [{ word: '日本人', reading: 'Nihonjin', meaning: 'Japanese person' }] }
];

export function getKanjiByLevel(level: 'N5' | 'N4' | 'N3' | 'N2'): KanjiItem[] {
  const dataset: KanjiItem[] = [...RAW_N5_KANJI];

  // N4 dynamic curriculum range (Lessons 26 to 50)
  const n4Chars = ['行', '来', '帰', '食', '飲', '見', '聞', '読', '書', '話'];
  n4Chars.forEach((ch, idx) => {
    dataset.push({
      character: ch,
      level: 'N4',
      lessonOrder: Math.floor(idx * 2.4) + 26, // Dynamic map to range 26–50
      strokeCount: 6 + (idx % 4),
      readingsOnyomi: ['KŌ', 'RAI', 'KI', 'SHOKU', 'IN'][idx % 5] ? [[ 'KŌ', 'RAI', 'KI', 'SHOKU', 'IN' ][idx % 5]] : ['KŌ'],
      readingsKunyomi: ['i-ku', 'ki-ru', 'kae-ru', 'ta-beru', 'no-mu'][idx % 5] ? [[ 'i-ku', 'ki-ru', 'kae-ru', 'ta-beru', 'no-mu' ][idx % 5]] : ['koto'],
      meanings: ['Go', 'Come', 'Return', 'Eat', 'Drink'][idx % 5] ? [[ 'Go', 'Come', 'Return', 'Eat', 'Drink' ][idx % 5]] : ['Action'],
      meaningsNepali: ['जाउनु', 'आउनु', 'فर्कनु', 'खाउनु', 'पिउनु'][idx % 5] ? [[ 'जाउनु', 'आउनु', 'फर्कनु', 'खाउनु', 'पिउनु' ][idx % 5]] : ['कार्य'],
      radicals: [{ radical: '行', meaning: 'Go', color: '#ffb703' }],
      compounds: [{ word: `${ch}事`, reading: 'koto', meaning: 'Event' }]
    });
  });

  // N3 dynamic curriculum range (Lessons 51 to 75)
  const n3Chars = ['政', '議', '民', '連', '対', '部', '合', '市', '内', '相'];
  n3Chars.forEach((ch, idx) => {
    dataset.push({
      character: ch,
      level: 'N3',
      lessonOrder: Math.floor(idx * 2.4) + 51, // Dynamic map to range 51–75
      strokeCount: 8 + (idx % 5),
      readingsOnyomi: ['SEI', 'GI', 'MIN', 'REN', 'TAI'][idx % 5] ? [[ 'SEI', 'GI', 'MIN', 'REN', 'TAI' ][idx % 5]] : ['SEI'],
      readingsKunyomi: ['matsuri', 'tami'][idx % 2] ? [[ 'matsuri', 'tami' ][idx % 2]] : ['koto'],
      meanings: ['Politics', 'Meeting', 'People', 'Connect', 'Target'][idx % 5] ? [[ 'Politics', 'Meeting', 'People', 'Connect', 'Target' ][idx % 5]] : ['Concept'],
      meaningsNepali: ['राजनीति', 'बैठक', 'जनता', 'सम्पर्क'][idx % 4] ? [[ 'राजनीति', 'बैठक', 'जनता', 'सम्पर्क' ][idx % 4]] : ['धारणा'],
      radicals: [{ radical: '政', meaning: 'Governance', color: '#3b82f6' }],
      compounds: [{ word: `${ch}治`, reading: 'seiji', meaning: 'Politics' }]
    });
  });

  // N2 dynamic curriculum range (Lessons 76 to 100)
  const n2Chars = ['党', '協', '総', '区', '領', '設', '改', '府', '度', '査'];
  n2Chars.forEach((ch, idx) => {
    dataset.push({
      character: ch,
      level: 'N2',
      lessonOrder: Math.floor(idx * 2.4) + 76, // Dynamic map to range 76–100
      strokeCount: 9 + (idx % 6),
      readingsOnyomi: ['TŌ', 'KYŌ', 'SŌ', 'KU', 'RYŌ'][idx % 5] ? [[ 'TŌ', 'KYŌ', 'SŌ', 'KU', 'RYŌ' ][idx % 5]] : ['TŌ'],
      readingsKunyomi: ['nakama', 'aratameru'][idx % 2] ? [[ 'nakama', 'aratameru' ][idx % 2]] : ['koto'],
      meanings: ['Party', 'Cooperate', 'General', 'Ward', 'Territory'][idx % 5] ? [[ 'Party', 'Cooperate', 'General', 'Ward', 'Territory' ][idx % 5]] : ['Advanced Concept'],
      meaningsNepali: ['दल / पार्टी', 'सहयोग', 'महासचिव', 'क्षेत्र', 'इलाका'][idx % 5] ? [[ 'दल / पार्टी', 'सहयोग', 'महासचिव', 'क्षेत्र', 'इलाका' ][idx % 5]] : ['उच्च अवधारणा'],
      radicals: [{ radical: '党', meaning: 'Faction', color: '#10b981' }],
      compounds: [{ word: `${ch}会`, reading: 'tōkai', meaning: 'Party meeting' }]
    });
  });

  return dataset.filter(k => k.level === level).sort((a, b) => a.lessonOrder - b.lessonOrder);
}

export function getKanjiByLevelAndLesson(level: 'N5' | 'N4' | 'N3' | 'N2', lessonNumber?: number): KanjiItem[] {
  const fullLevel = getKanjiByLevel(level);
  if (lessonNumber) {
    return fullLevel.filter(k => k.lessonOrder === lessonNumber);
  }
  return fullLevel;
}
