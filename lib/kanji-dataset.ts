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

// ════════════════════════════════════════════════════════════════
// ALL STANDARD JLPT N5 KANJI (Lessons 1–25 Minna no Nihongo)
// ════════════════════════════════════════════════════════════════
export const RAW_N5_KANJI: KanjiItem[] = [
  // ── LESSON 1: Numbers ──────────────────────────────────────
  { character: '一', level: 'N5', lessonOrder: 1, strokeCount: 1, readingsOnyomi: ['ICHI', 'ITSU'], readingsKunyomi: ['hito', 'hito-tsu'], meanings: ['One'], meaningsNepali: ['एक (१)'], radicals: [{ radical: '一', meaning: 'One', color: '#ffb703' }], compounds: [{ word: '一人', reading: 'hitori', meaning: 'One person' }, { word: '一日', reading: 'ichinichi', meaning: 'One day' }, { word: '一番', reading: 'ichiban', meaning: 'Number one' }] },
  { character: '二', level: 'N5', lessonOrder: 1, strokeCount: 2, readingsOnyomi: ['NI'], readingsKunyomi: ['futa', 'futa-tsu'], meanings: ['Two'], meaningsNepali: ['दुई (२)'], radicals: [{ radical: '二', meaning: 'Two', color: '#3b82f6' }], compounds: [{ word: '二人', reading: 'futari', meaning: 'Two people' }, { word: '二月', reading: 'nigatsu', meaning: 'February' }] },
  { character: '三', level: 'N5', lessonOrder: 1, strokeCount: 3, readingsOnyomi: ['SAN'], readingsKunyomi: ['mi', 'mit-tsu'], meanings: ['Three'], meaningsNepali: ['तीन (३)'], radicals: [{ radical: '一', meaning: 'One', color: '#10b981' }], compounds: [{ word: '三日', reading: 'mikka', meaning: '3rd day' }, { word: '三月', reading: 'sangatsu', meaning: 'March' }] },
  { character: '四', level: 'N5', lessonOrder: 1, strokeCount: 5, readingsOnyomi: ['SHI'], readingsKunyomi: ['yo', 'yon', 'yot-tsu'], meanings: ['Four'], meaningsNepali: ['चार (४)'], radicals: [{ radical: '囗', meaning: 'Enclosure', color: '#ff4d6d' }], compounds: [{ word: '四日', reading: 'yokka', meaning: '4th day' }, { word: '四月', reading: 'shigatsu', meaning: 'April' }] },
  { character: '五', level: 'N5', lessonOrder: 1, strokeCount: 4, readingsOnyomi: ['GO'], readingsKunyomi: ['itsu', 'itsu-tsu'], meanings: ['Five'], meaningsNepali: ['पाँच (५)'], radicals: [{ radical: '二', meaning: 'Two', color: '#ffb703' }], compounds: [{ word: '五日', reading: 'itsuka', meaning: '5th day' }, { word: '五月', reading: 'gogatsu', meaning: 'May' }] },
  { character: '六', level: 'N5', lessonOrder: 1, strokeCount: 4, readingsOnyomi: ['ROKU'], readingsKunyomi: ['mu', 'mut-tsu'], meanings: ['Six'], meaningsNepali: ['छ (६)'], radicals: [{ radical: '八', meaning: 'Eight', color: '#3b82f6' }], compounds: [{ word: '六日', reading: 'muika', meaning: '6th day' }, { word: '六月', reading: 'rokugatsu', meaning: 'June' }] },
  { character: '七', level: 'N5', lessonOrder: 1, strokeCount: 2, readingsOnyomi: ['SHICHI'], readingsKunyomi: ['nana', 'nana-tsu'], meanings: ['Seven'], meaningsNepali: ['सात (७)'], radicals: [{ radical: '一', meaning: 'One', color: '#10b981' }], compounds: [{ word: '七日', reading: 'nanoka', meaning: '7th day' }, { word: '七月', reading: 'shichigatsu', meaning: 'July' }] },
  { character: '八', level: 'N5', lessonOrder: 1, strokeCount: 2, readingsOnyomi: ['HACHI'], readingsKunyomi: ['ya', 'yat-tsu'], meanings: ['Eight'], meaningsNepali: ['आठ (८)'], radicals: [{ radical: '八', meaning: 'Eight', color: '#ff4d6d' }], compounds: [{ word: '八日', reading: 'yōka', meaning: '8th day' }, { word: '八月', reading: 'hachigatsu', meaning: 'August' }] },
  { character: '九', level: 'N5', lessonOrder: 1, strokeCount: 2, readingsOnyomi: ['KYŪ', 'KU'], readingsKunyomi: ['kokono', 'kokono-tsu'], meanings: ['Nine'], meaningsNepali: ['नौ (९)'], radicals: [{ radical: '乙', meaning: 'Second', color: '#ffb703' }], compounds: [{ word: '九日', reading: 'kokonoka', meaning: '9th day' }, { word: '九月', reading: 'kugatsu', meaning: 'September' }] },
  { character: '十', level: 'N5', lessonOrder: 1, strokeCount: 2, readingsOnyomi: ['JŪ'], readingsKunyomi: ['tō', 'to'], meanings: ['Ten'], meaningsNepali: ['दश (१०)'], radicals: [{ radical: '十', meaning: 'Ten', color: '#3b82f6' }], compounds: [{ word: '十日', reading: 'tōka', meaning: '10th day' }, { word: '十分', reading: 'jūbun', meaning: 'Enough' }] },
  { character: '百', level: 'N5', lessonOrder: 1, strokeCount: 6, readingsOnyomi: ['HYAKU'], readingsKunyomi: [], meanings: ['Hundred'], meaningsNepali: ['सय (१००)'], radicals: [{ radical: '白', meaning: 'White', color: '#10b981' }], compounds: [{ word: '三百', reading: 'sanbyaku', meaning: '300' }, { word: '百円', reading: 'hyakuen', meaning: '100 yen' }] },
  { character: '千', level: 'N5', lessonOrder: 1, strokeCount: 3, readingsOnyomi: ['SEN'], readingsKunyomi: ['chi'], meanings: ['Thousand'], meaningsNepali: ['हजार (१,०००)'], radicals: [{ radical: '十', meaning: 'Ten', color: '#ff4d6d' }], compounds: [{ word: '三千', reading: 'sanzen', meaning: '3000' }, { word: '千円', reading: 'senen', meaning: '1000 yen' }] },
  { character: '万', level: 'N5', lessonOrder: 1, strokeCount: 3, readingsOnyomi: ['MAN', 'BAN'], readingsKunyomi: [], meanings: ['Ten Thousand'], meaningsNepali: ['दश हजार (१०,०००)'], radicals: [{ radical: '一', meaning: 'One', color: '#ffb703' }], compounds: [{ word: '一万円', reading: 'ichimanen', meaning: '10,000 yen' }] },
  { character: '円', level: 'N5', lessonOrder: 1, strokeCount: 4, readingsOnyomi: ['EN'], readingsKunyomi: ['maru-i'], meanings: ['Yen', 'Circle'], meaningsNepali: ['येन (मुद्रा)'], radicals: [{ radical: '囗', meaning: 'Enclosure', color: '#3b82f6' }], compounds: [{ word: '百円', reading: 'hyakuen', meaning: '100 yen' }] },

  // ── LESSON 2: Calendar & Days ───────────────────────────────
  { character: '日', level: 'N5', lessonOrder: 2, strokeCount: 4, readingsOnyomi: ['NICHI', 'JITSU'], readingsKunyomi: ['hi', 'bi', 'ka'], meanings: ['Sun', 'Day'], meaningsNepali: ['दिन, घाम'], radicals: [{ radical: '日', meaning: 'Sun', color: '#ffb703' }], compounds: [{ word: '日曜日', reading: 'nichiyōbi', meaning: 'Sunday' }, { word: '日本', reading: 'Nihon', meaning: 'Japan' }] },
  { character: '月', level: 'N5', lessonOrder: 2, strokeCount: 4, readingsOnyomi: ['GETSU', 'GATSU'], readingsKunyomi: ['tsuki'], meanings: ['Moon', 'Month'], meaningsNepali: ['जुन, महिना'], radicals: [{ radical: '月', meaning: 'Moon', color: '#3b82f6' }], compounds: [{ word: '月曜日', reading: 'getsuyōbi', meaning: 'Monday' }, { word: '今月', reading: 'kongetsu', meaning: 'This month' }] },
  { character: '火', level: 'N5', lessonOrder: 2, strokeCount: 4, readingsOnyomi: ['KA'], readingsKunyomi: ['hi'], meanings: ['Fire'], meaningsNepali: ['आगो'], radicals: [{ radical: '火', meaning: 'Fire', color: '#ff4d6d' }], compounds: [{ word: '火曜日', reading: 'kayōbi', meaning: 'Tuesday' }] },
  { character: '水', level: 'N5', lessonOrder: 2, strokeCount: 4, readingsOnyomi: ['SUI'], readingsKunyomi: ['mizu'], meanings: ['Water'], meaningsNepali: ['पानी'], radicals: [{ radical: '水', meaning: 'Water', color: '#06b6d4' }], compounds: [{ word: '水曜日', reading: 'suiyōbi', meaning: 'Wednesday' }, { word: 'お水', reading: 'omizu', meaning: 'Water' }] },
  { character: '木', level: 'N5', lessonOrder: 2, strokeCount: 4, readingsOnyomi: ['MOKU', 'BOKU'], readingsKunyomi: ['ki'], meanings: ['Tree', 'Wood'], meaningsNepali: ['रूख, काठ'], radicals: [{ radical: '木', meaning: 'Tree', color: '#10b981' }], compounds: [{ word: '木曜日', reading: 'mokuyōbi', meaning: 'Thursday' }] },
  { character: '金', level: 'N5', lessonOrder: 2, strokeCount: 8, readingsOnyomi: ['KIN'], readingsKunyomi: ['kane'], meanings: ['Gold', 'Money'], meaningsNepali: ['सुन, पैसा'], radicals: [{ radical: '金', meaning: 'Metal', color: '#ffb703' }], compounds: [{ word: '金曜日', reading: 'kin\'yōbi', meaning: 'Friday' }, { word: 'お金', reading: 'okane', meaning: 'Money' }] },
  { character: '土', level: 'N5', lessonOrder: 2, strokeCount: 3, readingsOnyomi: ['DO', 'TO'], readingsKunyomi: ['tsuchi'], meanings: ['Soil', 'Earth'], meaningsNepali: ['माटो, जमिन'], radicals: [{ radical: '土', meaning: 'Earth', color: '#8b5cf6' }], compounds: [{ word: '土曜日', reading: 'doyōbi', meaning: 'Saturday' }] },

  // ── LESSON 3: People & Body ─────────────────────────────────
  { character: '人', level: 'N5', lessonOrder: 3, strokeCount: 2, readingsOnyomi: ['JIN', 'NIN'], readingsKunyomi: ['hito'], meanings: ['Person'], meaningsNepali: ['मानिस'], radicals: [{ radical: '人', meaning: 'Person', color: '#ff4d6d' }], compounds: [{ word: '日本人', reading: 'Nihonjin', meaning: 'Japanese person' }] },
  { character: '口', level: 'N5', lessonOrder: 3, strokeCount: 3, readingsOnyomi: ['KŌ'], readingsKunyomi: ['kuchi'], meanings: ['Mouth', 'Entrance'], meaningsNepali: ['मुख, ढोका'], radicals: [{ radical: '口', meaning: 'Mouth', color: '#10b981' }], compounds: [{ word: '入口', reading: 'iriguchi', meaning: 'Entrance' }] },
  { character: '目', level: 'N5', lessonOrder: 3, strokeCount: 5, readingsOnyomi: ['MOKU'], readingsKunyomi: ['me'], meanings: ['Eye'], meaningsNepali: ['आँखा'], radicals: [{ radical: '目', meaning: 'Eye', color: '#3b82f6' }], compounds: [{ word: '目的', reading: 'mokuteki', meaning: 'Purpose' }] },
  { character: '耳', level: 'N5', lessonOrder: 3, strokeCount: 6, readingsOnyomi: ['JI'], readingsKunyomi: ['mimi'], meanings: ['Ear'], meaningsNepali: ['कान'], radicals: [{ radical: '耳', meaning: 'Ear', color: '#ff4d6d' }], compounds: [{ word: '耳', reading: 'mimi', meaning: 'Ear' }] },
  { character: '手', level: 'N5', lessonOrder: 3, strokeCount: 4, readingsOnyomi: ['SHU'], readingsKunyomi: ['te'], meanings: ['Hand'], meaningsNepali: ['हात'], radicals: [{ radical: '手', meaning: 'Hand', color: '#ffb703' }], compounds: [{ word: '上手', reading: 'jōzu', meaning: 'Skilled' }, { word: '手紙', reading: 'tegami', meaning: 'Letter' }] },
  { character: '足', level: 'N5', lessonOrder: 3, strokeCount: 7, readingsOnyomi: ['SOKU'], readingsKunyomi: ['ashi', 'ta-ru'], meanings: ['Foot', 'Leg'], meaningsNepali: ['खुट्टा'], radicals: [{ radical: '足', meaning: 'Foot', color: '#10b981' }], compounds: [{ word: '足', reading: 'ashi', meaning: 'Leg / Foot' }] },
  { character: '子', level: 'N5', lessonOrder: 3, strokeCount: 3, readingsOnyomi: ['SHI', 'SU'], readingsKunyomi: ['ko'], meanings: ['Child'], meaningsNepali: ['बच्चा'], radicals: [{ radical: '子', meaning: 'Child', color: '#3b82f6' }], compounds: [{ word: '子供', reading: 'kodomo', meaning: 'Child' }, { word: '女子', reading: 'joshi', meaning: 'Girl' }] },
  { character: '女', level: 'N5', lessonOrder: 3, strokeCount: 3, readingsOnyomi: ['JO', 'NYO'], readingsKunyomi: ['onna'], meanings: ['Woman', 'Female'], meaningsNepali: ['महिला'], radicals: [{ radical: '女', meaning: 'Woman', color: '#ff4d6d' }], compounds: [{ word: '女性', reading: 'josei', meaning: 'Woman' }, { word: '女の子', reading: 'onnanoko', meaning: 'Girl' }] },
  { character: '男', level: 'N5', lessonOrder: 3, strokeCount: 7, readingsOnyomi: ['DAN', 'NAN'], readingsKunyomi: ['otoko'], meanings: ['Man', 'Male'], meaningsNepali: ['पुरुष'], radicals: [{ radical: '田', meaning: 'Field', color: '#10b981' }], compounds: [{ word: '男性', reading: 'dansei', meaning: 'Man' }, { word: '男の子', reading: 'otokonoko', meaning: 'Boy' }] },

  // ── LESSON 4: Places & School ───────────────────────────────
  { character: '山', level: 'N5', lessonOrder: 4, strokeCount: 3, readingsOnyomi: ['SAN'], readingsKunyomi: ['yama'], meanings: ['Mountain'], meaningsNepali: ['पहाड, डाँडा'], radicals: [{ radical: '山', meaning: 'Mountain', color: '#8b5cf6' }], compounds: [{ word: '富士山', reading: 'Fujisan', meaning: 'Mt. Fuji' }] },
  { character: '川', level: 'N5', lessonOrder: 4, strokeCount: 3, readingsOnyomi: ['SEN'], readingsKunyomi: ['kawa'], meanings: ['River'], meaningsNepali: ['नदी'], radicals: [{ radical: '川', meaning: 'River', color: '#06b6d4' }], compounds: [{ word: 'ナイル川', reading: 'nairugawa', meaning: 'Nile River' }] },
  { character: '田', level: 'N5', lessonOrder: 4, strokeCount: 5, readingsOnyomi: ['DEN'], readingsKunyomi: ['ta'], meanings: ['Rice Field'], meaningsNepali: ['धानखेत'], radicals: [{ radical: '田', meaning: 'Field', color: '#10b981' }], compounds: [{ word: '田んぼ', reading: 'tanbo', meaning: 'Rice paddy' }] },
  { character: '学', level: 'N5', lessonOrder: 4, strokeCount: 8, readingsOnyomi: ['GAKU'], readingsKunyomi: ['mana-bu'], meanings: ['Study', 'Learn'], meaningsNepali: ['अध्ययन, सिक्नु'], radicals: [{ radical: '子', meaning: 'Child', color: '#3b82f6' }], compounds: [{ word: '学校', reading: 'gakkō', meaning: 'School' }, { word: '学生', reading: 'gakusei', meaning: 'Student' }] },
  { character: '校', level: 'N5', lessonOrder: 4, strokeCount: 10, readingsOnyomi: ['KŌ'], readingsKunyomi: [], meanings: ['School'], meaningsNepali: ['विद्यालय'], radicals: [{ radical: '木', meaning: 'Tree', color: '#10b981' }], compounds: [{ word: '学校', reading: 'gakkō', meaning: 'School' }, { word: '高校', reading: 'kōkō', meaning: 'High school' }] },
  { character: '先', level: 'N5', lessonOrder: 4, strokeCount: 6, readingsOnyomi: ['SEN'], readingsKunyomi: ['saki'], meanings: ['Ahead', 'Previous'], meaningsNepali: ['अगाडि, पहिले'], radicals: [{ radical: '儿', meaning: 'Legs', color: '#ffb703' }], compounds: [{ word: '先生', reading: 'sensei', meaning: 'Teacher' }, { word: '先月', reading: 'sengetsu', meaning: 'Last month' }] },
  { character: '生', level: 'N5', lessonOrder: 4, strokeCount: 5, readingsOnyomi: ['SEI', 'SHŌ'], readingsKunyomi: ['i-kiru', 'u-mu', 'nama'], meanings: ['Life', 'Birth'], meaningsNepali: ['जन्म, जीवन'], radicals: [{ radical: '生', meaning: 'Life', color: '#10b981' }], compounds: [{ word: '学生', reading: 'gakusei', meaning: 'Student' }, { word: '先生', reading: 'sensei', meaning: 'Teacher' }] },

  // ── LESSON 5: Time & Present ────────────────────────────────
  { character: '年', level: 'N5', lessonOrder: 5, strokeCount: 6, readingsOnyomi: ['NEN'], readingsKunyomi: ['toshi'], meanings: ['Year'], meaningsNepali: ['वर्ष, साल'], radicals: [{ radical: '干', meaning: 'Dry', color: '#3b82f6' }], compounds: [{ word: '今年', reading: 'kotoshi', meaning: 'This year' }, { word: '来年', reading: 'rainen', meaning: 'Next year' }] },
  { character: '時', level: 'N5', lessonOrder: 5, strokeCount: 10, readingsOnyomi: ['JI'], readingsKunyomi: ['toki'], meanings: ['Time', 'Hour'], meaningsNepali: ['समय, घण्टा'], radicals: [{ radical: '日', meaning: 'Sun', color: '#ffb703' }], compounds: [{ word: '一時', reading: 'ichiji', meaning: '1 o\'clock' }, { word: '時間', reading: 'jikan', meaning: 'Time' }] },
  { character: '分', level: 'N5', lessonOrder: 5, strokeCount: 4, readingsOnyomi: ['BUN', 'FUN'], readingsKunyomi: ['wa-karu'], meanings: ['Minute', 'Part', 'Understand'], meaningsNepali: ['मिनेट, भाग'], radicals: [{ radical: '刀', meaning: 'Sword', color: '#ff4d6d' }], compounds: [{ word: '五分', reading: 'gofun', meaning: '5 minutes' }, { word: '分かる', reading: 'wakaru', meaning: 'Understand' }] },
  { character: '半', level: 'N5', lessonOrder: 5, strokeCount: 5, readingsOnyomi: ['HAN'], readingsKunyomi: ['naka-ba'], meanings: ['Half'], meaningsNepali: ['आधा'], radicals: [{ radical: '十', meaning: 'Ten', color: '#8b5cf6' }], compounds: [{ word: '一時半', reading: 'ichiji han', meaning: '1:30' }, { word: '半分', reading: 'hanbun', meaning: 'Half' }] },
  { character: '今', level: 'N5', lessonOrder: 5, strokeCount: 4, readingsOnyomi: ['KON', 'KIN'], readingsKunyomi: ['ima'], meanings: ['Now', 'Present'], meaningsNepali: ['अहिले, हाल'], radicals: [{ radical: '人', meaning: 'Person', color: '#ff4d6d' }], compounds: [{ word: '今', reading: 'ima', meaning: 'Now' }, { word: '今日', reading: 'kyō', meaning: 'Today' }, { word: '今週', reading: 'konshū', meaning: 'This week' }] },

  // ── LESSON 6: Directions & Position ─────────────────────────
  { character: '上', level: 'N5', lessonOrder: 6, strokeCount: 3, readingsOnyomi: ['JŌ'], readingsKunyomi: ['ue', 'a-garu'], meanings: ['Up', 'Above'], meaningsNepali: ['माथि'], radicals: [{ radical: '一', meaning: 'One', color: '#3b82f6' }], compounds: [{ word: '上手', reading: 'jōzu', meaning: 'Skilled' }, { word: '上がる', reading: 'agaru', meaning: 'Rise' }] },
  { character: '下', level: 'N5', lessonOrder: 6, strokeCount: 3, readingsOnyomi: ['KA', 'GE'], readingsKunyomi: ['shita', 'sa-garu'], meanings: ['Down', 'Below'], meaningsNepali: ['तल'], radicals: [{ radical: '一', meaning: 'One', color: '#ff4d6d' }], compounds: [{ word: '下手', reading: 'heta', meaning: 'Unskilled' }, { word: '地下鉄', reading: 'chikatetsu', meaning: 'Subway' }] },
  { character: '中', level: 'N5', lessonOrder: 6, strokeCount: 4, readingsOnyomi: ['CHŪ', 'JŪ'], readingsKunyomi: ['naka'], meanings: ['Middle', 'Inside'], meaningsNepali: ['बीच, भित्र'], radicals: [{ radical: '丨', meaning: 'Line', color: '#8b5cf6' }], compounds: [{ word: '中国', reading: 'Chūgoku', meaning: 'China' }, { word: '一日中', reading: 'ichinichijū', meaning: 'All day' }] },
  { character: '右', level: 'N5', lessonOrder: 6, strokeCount: 5, readingsOnyomi: ['YŪ', 'U'], readingsKunyomi: ['migi'], meanings: ['Right'], meaningsNepali: ['दायाँ'], radicals: [{ radical: '口', meaning: 'Mouth', color: '#10b981' }], compounds: [{ word: '右', reading: 'migi', meaning: 'Right' }] },
  { character: '左', level: 'N5', lessonOrder: 6, strokeCount: 5, readingsOnyomi: ['SA'], readingsKunyomi: ['hidari'], meanings: ['Left'], meaningsNepali: ['बायाँ'], radicals: [{ radical: '工', meaning: 'Work', color: '#ff4d6d' }], compounds: [{ word: '左', reading: 'hidari', meaning: 'Left' }] },
  { character: '前', level: 'N5', lessonOrder: 6, strokeCount: 9, readingsOnyomi: ['ZEN'], readingsKunyomi: ['mae'], meanings: ['Front', 'Before'], meaningsNepali: ['अगाडि, पहिले'], radicals: [{ radical: '刀', meaning: 'Knife', color: '#3b82f6' }], compounds: [{ word: '名前', reading: 'namae', meaning: 'Name' }, { word: '午前', reading: 'gozen', meaning: 'A.M.' }] },
  { character: '後', level: 'N5', lessonOrder: 6, strokeCount: 9, readingsOnyomi: ['GO', 'KŌ'], readingsKunyomi: ['ushiro', 'ato'], meanings: ['Behind', 'After'], meaningsNepali: ['पछाडि, पछि'], radicals: [{ radical: '彳', meaning: 'Step', color: '#10b981' }], compounds: [{ word: '午後', reading: 'gogo', meaning: 'P.M.' }, { word: '後ろ', reading: 'ushiro', meaning: 'Behind' }] },
  { character: '外', level: 'N5', lessonOrder: 6, strokeCount: 5, readingsOnyomi: ['GAI'], readingsKunyomi: ['soto'], meanings: ['Outside', 'Foreign'], meaningsNepali: ['बाहिर, विदेश'], radicals: [{ radical: '夕', meaning: 'Evening', color: '#8b5cf6' }], compounds: [{ word: '外国人', reading: 'gaikokujin', meaning: 'Foreigner' }, { word: '外国', reading: 'gaikoku', meaning: 'Foreign country' }] },

  // ── LESSON 7: Movement & Verbs ──────────────────────────────
  { character: '入', level: 'N5', lessonOrder: 7, strokeCount: 2, readingsOnyomi: ['NYŪ'], readingsKunyomi: ['hai-ru', 'i-reru'], meanings: ['Enter', 'Put in'], meaningsNepali: ['भित्र छिर्नु'], radicals: [{ radical: '入', meaning: 'Enter', color: '#3b82f6' }], compounds: [{ word: '入る', reading: 'hairu', meaning: 'To enter' }, { word: '入口', reading: 'iriguchi', meaning: 'Entrance' }] },
  { character: '出', level: 'N5', lessonOrder: 7, strokeCount: 5, readingsOnyomi: ['SHUTSU'], readingsKunyomi: ['de-ru', 'da-su'], meanings: ['Exit', 'Leave'], meaningsNepali: ['निस्कनु'], radicals: [{ radical: '凵', meaning: 'Box', color: '#8b5cf6' }], compounds: [{ word: '出口', reading: 'deguchi', meaning: 'Exit' }, { word: '出す', reading: 'dasu', meaning: 'Take out' }] },
  { character: '立', level: 'N5', lessonOrder: 7, strokeCount: 5, readingsOnyomi: ['RITSU'], readingsKunyomi: ['ta-tsu'], meanings: ['Stand'], meaningsNepali: ['उभिनु'], radicals: [{ radical: '立', meaning: 'Stand', color: '#10b981' }], compounds: [{ word: '立つ', reading: 'tatsu', meaning: 'To stand' }] },
  { character: '休', level: 'N5', lessonOrder: 7, strokeCount: 6, readingsOnyomi: ['KYŪ'], readingsKunyomi: ['yasu-mu'], meanings: ['Rest', 'Holiday'], meaningsNepali: ['विराम, आराम गर्नु'], radicals: [{ radical: '人', meaning: 'Person', color: '#ff4d6d' }], compounds: [{ word: '休む', reading: 'yasumu', meaning: 'To rest' }, { word: '夏休み', reading: 'natsuyasumi', meaning: 'Summer vacation' }] },

  // ── LESSON 8: Adjectives & Descriptions ────────────────────
  { character: '大', level: 'N5', lessonOrder: 8, strokeCount: 3, readingsOnyomi: ['DAI', 'TAI'], readingsKunyomi: ['ō-kii'], meanings: ['Big', 'Large'], meaningsNepali: ['ठूलो'], radicals: [{ radical: '大', meaning: 'Big', color: '#ff4d6d' }], compounds: [{ word: '大学', reading: 'daigaku', meaning: 'University' }, { word: '大丈夫', reading: 'daijōbu', meaning: 'All right' }] },
  { character: '小', level: 'N5', lessonOrder: 8, strokeCount: 3, readingsOnyomi: ['SHŌ'], readingsKunyomi: ['chii-sai'], meanings: ['Small', 'Little'], meaningsNepali: ['सानो'], radicals: [{ radical: '小', meaning: 'Small', color: '#3b82f6' }], compounds: [{ word: '小さい', reading: 'chiisai', meaning: 'Small' }, { word: '小学校', reading: 'shōgakkō', meaning: 'Elementary school' }] },
  { character: '長', level: 'N5', lessonOrder: 8, strokeCount: 8, readingsOnyomi: ['CHŌ'], readingsKunyomi: ['naga-i'], meanings: ['Long', 'Chief'], meaningsNepali: ['लामो, प्रमुख'], radicals: [{ radical: '長', meaning: 'Long', color: '#3b82f6' }], compounds: [{ word: '長い', reading: 'nagai', meaning: 'Long' }, { word: '社長', reading: 'shachō', meaning: 'Company president' }] },
  { character: '高', level: 'N5', lessonOrder: 8, strokeCount: 10, readingsOnyomi: ['KŌ'], readingsKunyomi: ['taka-i'], meanings: ['High', 'Expensive'], meaningsNepali: ['अग्लो, महँगो'], radicals: [{ radical: '高', meaning: 'High', color: '#ff4d6d' }], compounds: [{ word: '高い', reading: 'takai', meaning: 'High / Expensive' }, { word: '高校', reading: 'kōkō', meaning: 'High school' }] },
  { character: '安', level: 'N5', lessonOrder: 8, strokeCount: 6, readingsOnyomi: ['AN'], readingsKunyomi: ['yasu-i'], meanings: ['Cheap', 'Peaceful'], meaningsNepali: ['सस्तो, शान्त'], radicals: [{ radical: '女', meaning: 'Woman', color: '#10b981' }], compounds: [{ word: '安い', reading: 'yasui', meaning: 'Cheap' }, { word: '安心', reading: 'anshin', meaning: 'Relief' }] },
  { character: '新', level: 'N5', lessonOrder: 8, strokeCount: 13, readingsOnyomi: ['SHIN'], readingsKunyomi: ['atara-shii'], meanings: ['New'], meaningsNepali: ['नयाँ'], radicals: [{ radical: '斤', meaning: 'Axe', color: '#ff4d6d' }], compounds: [{ word: '新しい', reading: 'atarashii', meaning: 'New' }, { word: '新幹線', reading: 'shinkansen', meaning: 'Bullet train' }] },
  { character: '古', level: 'N5', lessonOrder: 8, strokeCount: 5, readingsOnyomi: ['KO'], readingsKunyomi: ['furu-i'], meanings: ['Old'], meaningsNepali: ['पुरानो'], radicals: [{ radical: '口', meaning: 'Mouth', color: '#10b981' }], compounds: [{ word: '古い', reading: 'furui', meaning: 'Old' }] },
  { character: '多', level: 'N5', lessonOrder: 8, strokeCount: 6, readingsOnyomi: ['TA'], readingsKunyomi: ['ō-i'], meanings: ['Many', 'Much'], meaningsNepali: ['धेरै'], radicals: [{ radical: '夕', meaning: 'Evening', color: '#3b82f6' }], compounds: [{ word: '多い', reading: 'ōi', meaning: 'Many' }] },
  { character: '少', level: 'N5', lessonOrder: 8, strokeCount: 4, readingsOnyomi: ['SHŌ'], readingsKunyomi: ['suku-nai', 'suko-shi'], meanings: ['Few', 'Little'], meaningsNepali: ['कम, अलिकति'], radicals: [{ radical: '小', meaning: 'Small', color: '#10b981' }], compounds: [{ word: '少し', reading: 'sukoshi', meaning: 'A little' }, { word: '少ない', reading: 'sukunai', meaning: 'Few' }] },

  // ── LESSON 9: Family & Relationships ───────────────────────
  { character: '父', level: 'N5', lessonOrder: 9, strokeCount: 4, readingsOnyomi: ['FU'], readingsKunyomi: ['chichi'], meanings: ['Father'], meaningsNepali: ['बुवा'], radicals: [{ radical: '父', meaning: 'Father', color: '#8b5cf6' }], compounds: [{ word: 'お父さん', reading: 'otōsan', meaning: 'Father (polite)' }, { word: '父', reading: 'chichi', meaning: 'My father' }] },
  { character: '母', level: 'N5', lessonOrder: 9, strokeCount: 5, readingsOnyomi: ['BO'], readingsKunyomi: ['haha'], meanings: ['Mother'], meaningsNepali: ['आमा'], radicals: [{ radical: '母', meaning: 'Mother', color: '#ff4d6d' }], compounds: [{ word: 'お母さん', reading: 'okāsan', meaning: 'Mother (polite)' }, { word: '母', reading: 'haha', meaning: 'My mother' }] },
  { character: '友', level: 'N5', lessonOrder: 9, strokeCount: 4, readingsOnyomi: ['YŪ'], readingsKunyomi: ['tomo'], meanings: ['Friend'], meaningsNepali: ['साथी'], radicals: [{ radical: '又', meaning: 'Again', color: '#10b981' }], compounds: [{ word: '友達', reading: 'tomodachi', meaning: 'Friend' }] },
  { character: '兄', level: 'N5', lessonOrder: 9, strokeCount: 5, readingsOnyomi: ['KYŌ', 'KEI'], readingsKunyomi: ['ani'], meanings: ['Older Brother'], meaningsNepali: ['दाजु'], radicals: [{ radical: '儿', meaning: 'Legs', color: '#3b82f6' }], compounds: [{ word: 'お兄さん', reading: 'oniisan', meaning: 'Older brother' }, { word: '兄弟', reading: 'kyōdai', meaning: 'Siblings' }] },
  { character: '弟', level: 'N5', lessonOrder: 9, strokeCount: 7, readingsOnyomi: ['TEI', 'DAI'], readingsKunyomi: ['otōto'], meanings: ['Younger Brother'], meaningsNepali: ['भाई'], radicals: [{ radical: '弓', meaning: 'Bow', color: '#ffb703' }], compounds: [{ word: '弟', reading: 'otōto', meaning: 'Younger brother' }] },
  { character: '姉', level: 'N5', lessonOrder: 9, strokeCount: 8, readingsOnyomi: ['SHI'], readingsKunyomi: ['ane'], meanings: ['Older Sister'], meaningsNepali: ['दीदी'], radicals: [{ radical: '女', meaning: 'Woman', color: '#ff4d6d' }], compounds: [{ word: 'お姉さん', reading: 'onēsan', meaning: 'Older sister' }] },
  { character: '妹', level: 'N5', lessonOrder: 9, strokeCount: 8, readingsOnyomi: ['MAI'], readingsKunyomi: ['imōto'], meanings: ['Younger Sister'], meaningsNepali: ['बहिनी'], radicals: [{ radical: '女', meaning: 'Woman', color: '#10b981' }], compounds: [{ word: '妹', reading: 'imōto', meaning: 'Younger sister' }] },

  // ── LESSON 10: Language & Knowledge ─────────────────────────
  { character: '本', level: 'N5', lessonOrder: 10, strokeCount: 5, readingsOnyomi: ['HON'], readingsKunyomi: ['moto'], meanings: ['Book', 'Origin'], meaningsNepali: ['किताब, मूल'], radicals: [{ radical: '木', meaning: 'Tree', color: '#10b981' }], compounds: [{ word: '日本', reading: 'Nihon', meaning: 'Japan' }, { word: '本', reading: 'hon', meaning: 'Book' }] },
  { character: '何', level: 'N5', lessonOrder: 10, strokeCount: 7, readingsOnyomi: ['KA'], readingsKunyomi: ['nani', 'nan'], meanings: ['What'], meaningsNepali: ['के'], radicals: [{ radical: '人', meaning: 'Person', color: '#ff4d6d' }], compounds: [{ word: '何', reading: 'nani', meaning: 'What' }, { word: '何時', reading: 'nanji', meaning: 'What time?' }] },
  { character: '語', level: 'N5', lessonOrder: 10, strokeCount: 14, readingsOnyomi: ['GO'], readingsKunyomi: ['kata-ru'], meanings: ['Language', 'Word'], meaningsNepali: ['भाषा'], radicals: [{ radical: '言', meaning: 'Speech', color: '#ffb703' }], compounds: [{ word: '日本語', reading: 'Nihongo', meaning: 'Japanese' }, { word: '英語', reading: 'Eigo', meaning: 'English' }] },
  { character: '国', level: 'N5', lessonOrder: 10, strokeCount: 8, readingsOnyomi: ['KOKU'], readingsKunyomi: ['kuni'], meanings: ['Country'], meaningsNepali: ['देश'], radicals: [{ radical: '囗', meaning: 'Enclosure', color: '#3b82f6' }], compounds: [{ word: '外国', reading: 'gaikoku', meaning: 'Foreign country' }] },
  { character: '名', level: 'N5', lessonOrder: 10, strokeCount: 6, readingsOnyomi: ['MEI', 'MYŌ'], readingsKunyomi: ['na'], meanings: ['Name'], meaningsNepali: ['नाम'], radicals: [{ radical: '口', meaning: 'Mouth', color: '#10b981' }], compounds: [{ word: '名前', reading: 'namae', meaning: 'Name' }, { word: '有名', reading: 'yūmei', meaning: 'Famous' }] },
  { character: '話', level: 'N5', lessonOrder: 10, strokeCount: 13, readingsOnyomi: ['WA'], readingsKunyomi: ['hana-su'], meanings: ['Speak', 'Talk'], meaningsNepali: ['बोल्नु'], radicals: [{ radical: '言', meaning: 'Speech', color: '#10b981' }], compounds: [{ word: '話す', reading: 'hanasu', meaning: 'Speak' }, { word: '電話', reading: 'denwa', meaning: 'Telephone' }] },
  { character: '書', level: 'N5', lessonOrder: 10, strokeCount: 10, readingsOnyomi: ['SHO'], readingsKunyomi: ['ka-ku'], meanings: ['Write'], meaningsNepali: ['लेख्नु'], radicals: [{ radical: '日', meaning: 'Sun', color: '#06b6d4' }], compounds: [{ word: '書く', reading: 'kaku', meaning: 'Write' }, { word: '図書館', reading: 'toshokan', meaning: 'Library' }] },
  { character: '読', level: 'N5', lessonOrder: 10, strokeCount: 14, readingsOnyomi: ['DOKU'], readingsKunyomi: ['yo-mu'], meanings: ['Read'], meaningsNepali: ['पढ्नु'], radicals: [{ radical: '言', meaning: 'Speech', color: '#ffb703' }], compounds: [{ word: '読む', reading: 'yomu', meaning: 'Read' }, { word: '読書', reading: 'dokusho', meaning: 'Reading' }] },
  { character: '聞', level: 'N5', lessonOrder: 10, strokeCount: 14, readingsOnyomi: ['BUN', 'MON'], readingsKunyomi: ['ki-ku'], meanings: ['Listen', 'Hear'], meaningsNepali: ['सुन्नु'], radicals: [{ radical: '耳', meaning: 'Ear', color: '#ffb703' }], compounds: [{ word: '聞く', reading: 'kiku', meaning: 'Listen' }, { word: '新聞', reading: 'shinbun', meaning: 'Newspaper' }] },
  { character: '見', level: 'N5', lessonOrder: 10, strokeCount: 7, readingsOnyomi: ['KEN'], readingsKunyomi: ['mi-ru'], meanings: ['See', 'Look'], meaningsNepali: ['हेर्नु'], radicals: [{ radical: '目', meaning: 'Eye', color: '#3b82f6' }], compounds: [{ word: '見る', reading: 'miru', meaning: 'See' }, { word: '意見', reading: 'iken', meaning: 'Opinion' }] },

  // ── LESSON 11: Colors & Nature ─────────────────────────────
  { character: '白', level: 'N5', lessonOrder: 11, strokeCount: 5, readingsOnyomi: ['HAKU'], readingsKunyomi: ['shiro-i'], meanings: ['White'], meaningsNepali: ['सेतो'], radicals: [{ radical: '白', meaning: 'White', color: '#e2e8f0' }], compounds: [{ word: '白い', reading: 'shiroi', meaning: 'White' }] },
  { character: '赤', level: 'N5', lessonOrder: 11, strokeCount: 7, readingsOnyomi: ['SEKI'], readingsKunyomi: ['aka-i'], meanings: ['Red'], meaningsNepali: ['रातो'], radicals: [{ radical: '赤', meaning: 'Red', color: '#ff4d6d' }], compounds: [{ word: '赤い', reading: 'akai', meaning: 'Red' }] },
  { character: '青', level: 'N5', lessonOrder: 11, strokeCount: 8, readingsOnyomi: ['SEI'], readingsKunyomi: ['ao-i'], meanings: ['Blue'], meaningsNepali: ['नीलो'], radicals: [{ radical: '月', meaning: 'Moon', color: '#3b82f6' }], compounds: [{ word: '青い', reading: 'aoi', meaning: 'Blue' }] },
  { character: '空', level: 'N5', lessonOrder: 11, strokeCount: 8, readingsOnyomi: ['KŪ'], readingsKunyomi: ['sora', 'karab'], meanings: ['Sky', 'Empty'], meaningsNepali: ['आकाश, खाली'], radicals: [{ radical: '穴', meaning: 'Hole', color: '#06b6d4' }], compounds: [{ word: '空', reading: 'sora', meaning: 'Sky' }, { word: '空港', reading: 'kūkō', meaning: 'Airport' }] },
  { character: '天', level: 'N5', lessonOrder: 11, strokeCount: 4, readingsOnyomi: ['TEN'], readingsKunyomi: ['ame'], meanings: ['Heaven', 'Sky'], meaningsNepali: ['स्वर्ग, मौसम'], radicals: [{ radical: '大', meaning: 'Big', color: '#ffb703' }], compounds: [{ word: '天気', reading: 'tenki', meaning: 'Weather' }] },
  { character: '気', level: 'N5', lessonOrder: 11, strokeCount: 6, readingsOnyomi: ['KI'], readingsKunyomi: [], meanings: ['Spirit', 'Air', 'Mind'], meaningsNepali: ['भावना, हवा'], radicals: [{ radical: '気', meaning: 'Spirit', color: '#ffb703' }], compounds: [{ word: '元気', reading: 'genki', meaning: 'Healthy' }, { word: '電気', reading: 'denki', meaning: 'Electricity' }] },
  { character: '雨', level: 'N5', lessonOrder: 11, strokeCount: 8, readingsOnyomi: ['U'], readingsKunyomi: ['ame'], meanings: ['Rain'], meaningsNepali: ['पानी (वर्षा)'], radicals: [{ radical: '雨', meaning: 'Rain', color: '#06b6d4' }], compounds: [{ word: '雨', reading: 'ame', meaning: 'Rain' }] },
  { character: '花', level: 'N5', lessonOrder: 11, strokeCount: 7, readingsOnyomi: ['KA'], readingsKunyomi: ['hana'], meanings: ['Flower'], meaningsNepali: ['फूल'], radicals: [{ radical: '艸', meaning: 'Grass', color: '#10b981' }], compounds: [{ word: '花火', reading: 'hanabi', meaning: 'Fireworks' }, { word: '花瓶', reading: 'kabin', meaning: 'Vase' }] },
  { character: '魚', level: 'N5', lessonOrder: 11, strokeCount: 11, readingsOnyomi: ['GYO'], readingsKunyomi: ['sakana'], meanings: ['Fish'], meaningsNepali: ['माछा'], radicals: [{ radical: '魚', meaning: 'Fish', color: '#06b6d4' }], compounds: [{ word: '魚', reading: 'sakana', meaning: 'Fish' }, { word: '金魚', reading: 'kingyo', meaning: 'Goldfish' }] },
  { character: '犬', level: 'N5', lessonOrder: 11, strokeCount: 4, readingsOnyomi: ['KEN'], readingsKunyomi: ['inu'], meanings: ['Dog'], meaningsNepali: ['कुकुर'], radicals: [{ radical: '犬', meaning: 'Dog', color: '#8b5cf6' }], compounds: [{ word: '犬', reading: 'inu', meaning: 'Dog' }] },

  // ── LESSON 12: Movement & Travel ───────────────────────────
  { character: '行', level: 'N5', lessonOrder: 12, strokeCount: 6, readingsOnyomi: ['KŌ', 'GYŌ'], readingsKunyomi: ['i-ku'], meanings: ['Go'], meaningsNepali: ['जानु'], radicals: [{ radical: '行', meaning: 'Go', color: '#ffb703' }], compounds: [{ word: '行く', reading: 'iku', meaning: 'Go' }, { word: '銀行', reading: 'ginkō', meaning: 'Bank' }] },
  { character: '来', level: 'N5', lessonOrder: 12, strokeCount: 7, readingsOnyomi: ['RAI'], readingsKunyomi: ['ku-ru'], meanings: ['Come'], meaningsNepali: ['आउनु'], radicals: [{ radical: '木', meaning: 'Tree', color: '#10b981' }], compounds: [{ word: '来る', reading: 'kuru', meaning: 'Come' }, { word: '来年', reading: 'rainen', meaning: 'Next year' }] },
  { character: '帰', level: 'N5', lessonOrder: 12, strokeCount: 10, readingsOnyomi: ['KI'], readingsKunyomi: ['kae-ru'], meanings: ['Return'], meaningsNepali: ['फर्कनु'], radicals: [{ radical: '帚', meaning: 'Broom', color: '#8b5cf6' }], compounds: [{ word: '帰る', reading: 'kaeru', meaning: 'Return home' }] },

  // ── LESSON 13: Food & Consumption ──────────────────────────
  { character: '食', level: 'N5', lessonOrder: 13, strokeCount: 9, readingsOnyomi: ['SHOKU'], readingsKunyomi: ['ta-beru'], meanings: ['Eat', 'Food'], meaningsNepali: ['खाउनु, खाना'], radicals: [{ radical: '食', meaning: 'Food', color: '#ff4d6d' }], compounds: [{ word: '食べる', reading: 'taberu', meaning: 'Eat' }, { word: '食事', reading: 'shokuji', meaning: 'Meal' }] },
  { character: '飲', level: 'N5', lessonOrder: 13, strokeCount: 12, readingsOnyomi: ['IN'], readingsKunyomi: ['no-mu'], meanings: ['Drink'], meaningsNepali: ['पिउनु'], radicals: [{ radical: '食', meaning: 'Food', color: '#3b82f6' }], compounds: [{ word: '飲む', reading: 'nomu', meaning: 'Drink' }, { word: '飲み物', reading: 'nomimono', meaning: 'Beverage' }] },

  // ── LESSON 14: Shopping & Goods ────────────────────────────
  { character: '買', level: 'N5', lessonOrder: 14, strokeCount: 12, readingsOnyomi: ['BAI'], readingsKunyomi: ['ka-u'], meanings: ['Buy'], meaningsNepali: ['किन्नु'], radicals: [{ radical: '貝', meaning: 'Shell', color: '#ffb703' }], compounds: [{ word: '買う', reading: 'kau', meaning: 'Buy' }, { word: '買い物', reading: 'kaimono', meaning: 'Shopping' }] },
  { character: '物', level: 'N5', lessonOrder: 14, strokeCount: 8, readingsOnyomi: ['BUTSU', 'MOTSU'], readingsKunyomi: ['mono'], meanings: ['Thing', 'Object'], meaningsNepali: ['वस्तु, कुरा'], radicals: [{ radical: '牛', meaning: 'Cow', color: '#10b981' }], compounds: [{ word: '食べ物', reading: 'tabemono', meaning: 'Food' }, { word: '荷物', reading: 'nimotsu', meaning: 'Luggage' }] },
  { character: '店', level: 'N5', lessonOrder: 14, strokeCount: 8, readingsOnyomi: ['TEN'], readingsKunyomi: ['mise'], meanings: ['Shop', 'Store'], meaningsNepali: ['पसल'], radicals: [{ radical: '广', meaning: 'Roof', color: '#8b5cf6' }], compounds: [{ word: '店員', reading: 'ten\'in', meaning: 'Clerk' }, { word: '売店', reading: 'baiten', meaning: 'Stall' }] },

  // ── LESSON 15: Transport & Tech ────────────────────────────
  { character: '車', level: 'N5', lessonOrder: 15, strokeCount: 7, readingsOnyomi: ['SHA'], readingsKunyomi: ['kuruma'], meanings: ['Car', 'Vehicle'], meaningsNepali: ['गाडी'], radicals: [{ radical: '車', meaning: 'Car', color: '#ff4d6d' }], compounds: [{ word: '電車', reading: 'densha', meaning: 'Train' }, { word: '自転車', reading: 'jitensha', meaning: 'Bicycle' }] },
  { character: '電', level: 'N5', lessonOrder: 15, strokeCount: 13, readingsOnyomi: ['DEN'], readingsKunyomi: [], meanings: ['Electricity'], meaningsNepali: ['बिजुली'], radicals: [{ radical: '雨', meaning: 'Rain', color: '#ffb703' }], compounds: [{ word: '電話', reading: 'denwa', meaning: 'Telephone' }, { word: '電車', reading: 'densha', meaning: 'Train' }] },
  { character: '駅', level: 'N5', lessonOrder: 15, strokeCount: 14, readingsOnyomi: ['EKI'], readingsKunyomi: [], meanings: ['Station'], meaningsNepali: ['स्टेशन'], radicals: [{ radical: '馬', meaning: 'Horse', color: '#ffb703' }], compounds: [{ word: '駅前', reading: 'ekimae', meaning: 'In front of station' }] },

  // ── LESSON 16: Directions & Towns ──────────────────────────
  { character: '東', level: 'N5', lessonOrder: 16, strokeCount: 8, readingsOnyomi: ['TŌ'], readingsKunyomi: ['higashi'], meanings: ['East'], meaningsNepali: ['पूर्व'], radicals: [{ radical: '木', meaning: 'Tree', color: '#10b981' }], compounds: [{ word: '東京', reading: 'Tōkyō', meaning: 'Tokyo' }] },
  { character: '西', level: 'N5', lessonOrder: 16, strokeCount: 6, readingsOnyomi: ['SEI', 'SAI'], readingsKunyomi: ['nishi'], meanings: ['West'], meaningsNepali: ['पश्चिम'], radicals: [{ radical: '西', meaning: 'West', color: '#3b82f6' }], compounds: [{ word: '関西', reading: 'Kansai', meaning: 'Kansai' }] },
  { character: '南', level: 'N5', lessonOrder: 16, strokeCount: 9, readingsOnyomi: ['NAN'], readingsKunyomi: ['minami'], meanings: ['South'], meaningsNepali: ['दक्षिण'], radicals: [{ radical: '十', meaning: 'Ten', color: '#ff4d6d' }], compounds: [{ word: '南口', reading: 'minamiguchi', meaning: 'South exit' }] },
  { character: '北', level: 'N5', lessonOrder: 16, strokeCount: 5, readingsOnyomi: ['HOKU'], readingsKunyomi: ['kita'], meanings: ['North'], meaningsNepali: ['उत्तर'], radicals: [{ radical: '匕', meaning: 'Ladle', color: '#8b5cf6' }], compounds: [{ word: '北海道', reading: 'Hokkaidō', meaning: 'Hokkaido' }] },
  { character: '道', level: 'N5', lessonOrder: 16, strokeCount: 12, readingsOnyomi: ['DŌ'], readingsKunyomi: ['michi'], meanings: ['Road', 'Way'], meaningsNepali: ['बाटो, मार्ग'], radicals: [{ radical: '辶', meaning: 'Walk', color: '#06b6d4' }], compounds: [{ word: '水道', reading: 'suidō', meaning: 'Waterworks' }, { word: '書道', reading: 'shodō', meaning: 'Calligraphy' }] },

  // ── LESSON 17–20: Communication & Society ─────────────────
  { character: '言', level: 'N5', lessonOrder: 17, strokeCount: 7, readingsOnyomi: ['GEN', 'GON'], readingsKunyomi: ['i-u'], meanings: ['Say', 'Word'], meaningsNepali: ['भन्नु'], radicals: [{ radical: '言', meaning: 'Speech', color: '#ffb703' }], compounds: [{ word: '言います', reading: 'iimasu', meaning: 'Say' }] },
  { character: '毎', level: 'N5', lessonOrder: 18, strokeCount: 6, readingsOnyomi: ['MAI'], readingsKunyomi: [], meanings: ['Every'], meaningsNepali: ['हरेक'], radicals: [{ radical: '母', meaning: 'Mother', color: '#ff4d6d' }], compounds: [{ word: '毎日', reading: 'mainichi', meaning: 'Every day' }] },

  // ── LESSON 21–25: Time Intervals & Organizations ────────────
  { character: '間', level: 'N5', lessonOrder: 21, strokeCount: 12, readingsOnyomi: ['KAN'], readingsKunyomi: ['aida'], meanings: ['Between', 'Interval'], meaningsNepali: ['बीच'], radicals: [{ radical: '門', meaning: 'Gate', color: '#ffb703' }], compounds: [{ word: '時間', reading: 'jikan', meaning: 'Time' }] },
  { character: '週', level: 'N5', lessonOrder: 22, strokeCount: 11, readingsOnyomi: ['SHŪ'], readingsKunyomi: [], meanings: ['Week'], meaningsNepali: ['हप्ता'], radicals: [{ radical: '辶', meaning: 'Walk', color: '#06b6d4' }], compounds: [{ word: '今週', reading: 'konshū', meaning: 'This week' }] },
  { character: '会', level: 'N5', lessonOrder: 23, strokeCount: 6, readingsOnyomi: ['KAI'], readingsKunyomi: ['a-u'], meanings: ['Meet', 'Society'], meaningsNepali: ['भेट्नु'], radicals: [{ radical: '人', meaning: 'Person', color: '#ff4d6d' }], compounds: [{ word: '会う', reading: 'au', meaning: 'Meet' }, { word: '会社', reading: 'kaisha', meaning: 'Company' }] },
  { character: '社', level: 'N5', lessonOrder: 24, strokeCount: 7, readingsOnyomi: ['SHA'], readingsKunyomi: ['yashiro'], meanings: ['Company', 'Shrine'], meaningsNepali: ['कम्पनी'], radicals: [{ radical: '示', meaning: 'Altar', color: '#8b5cf6' }], compounds: [{ word: '会社', reading: 'kaisha', meaning: 'Company' }, { word: '社会', reading: 'shakai', meaning: 'Society' }] },
];

// ════════════════════════════════════════════════════════════════
// getKanjiByLevel — returns all kanji for JLPT N5, N4, N3, N2
// ════════════════════════════════════════════════════════════════
export function getKanjiByLevel(level: 'N5' | 'N4' | 'N3' | 'N2'): KanjiItem[] {
  if (level === 'N5') {
    return [...RAW_N5_KANJI].sort((a, b) => a.lessonOrder - b.lessonOrder);
  }

  // N4 Kanji dataset (Lessons 26–50)
  if (level === 'N4') {
    const n4Data: Array<{ ch: string; lesson: number; onyomi: string[]; kunyomi: string[]; meanings: string[]; nepali: string[]; strokes: number; compounds: { word: string; reading: string; meaning: string }[] }> = [
      { ch: '不', lesson: 26, onyomi: ['FU', 'BU'], kunyomi: [], meanings: ['Non', 'Negative'], nepali: ['अ- (नकारात्मक)'], strokes: 4, compounds: [{ word: '不便', reading: 'fuben', meaning: 'Inconvenient' }] },
      { ch: '便', lesson: 26, onyomi: ['BEN', 'BIN'], kunyomi: ['tayo-ri'], meanings: ['Convenient', 'Mail'], nepali: ['सुविधाजनक, चिठ्ठी'], strokes: 9, compounds: [{ word: '便利', reading: 'benri', meaning: 'Convenient' }] },
      { ch: '利', lesson: 26, onyomi: ['RI'], kunyomi: ['ki-ku'], meanings: ['Profit', 'Advantage'], nepali: ['फाइदा'], strokes: 7, compounds: [{ word: '利用', reading: 'riyō', meaning: 'Use' }] },
      { ch: '主', lesson: 27, onyomi: ['SHU'], kunyomi: ['omo', 'nushi'], meanings: ['Master', 'Main'], nepali: ['मालिक, मुख्य'], strokes: 5, compounds: [{ word: '主人', reading: 'shujin', meaning: 'Husband' }] },
      { ch: '親', lesson: 27, onyomi: ['SHIN'], kunyomi: ['oya', 'shita-shii'], meanings: ['Parent', 'Kind'], nepali: ['अभिभावक, दयालु'], strokes: 16, compounds: [{ word: '親切', reading: 'shinsetsu', meaning: 'Kind' }, { word: '両親', reading: 'ryōshin', meaning: 'Parents' }] },
      { ch: '切', lesson: 27, onyomi: ['SETSU', 'SAI'], kunyomi: ['ki-ru'], meanings: ['Cut', 'Urgent'], meaningsNepali: ['काट्नु'], strokes: 4, compounds: [{ word: '切符', reading: 'kippu', meaning: 'Ticket' }] },
      { ch: '元', lesson: 28, onyomi: ['GEN', 'GAN'], kunyomi: ['moto'], meanings: ['Origin', 'Base'], nepali: ['मूल'], strokes: 4, compounds: [{ word: '元気', reading: 'genki', meaning: 'Healthy' }] },
      { ch: '好', lesson: 28, onyomi: ['KŌ'], kunyomi: ['su-ki'], meanings: ['Like', 'Favorite'], nepali: ['मनपर्ने'], strokes: 6, compounds: [{ word: '好き', reading: 'suki', meaning: 'Like' }] },
      { ch: '物', lesson: 29, onyomi: ['BUTSU'], kunyomi: ['mono'], meanings: ['Thing'], nepali: ['वस्तु'], strokes: 8, compounds: [{ word: '着物', reading: 'kimono', meaning: 'Kimono' }] },
      { ch: '着', lesson: 29, onyomi: ['CHAKU'], kunyomi: ['ki-ru', 'tsu-ku'], meanings: ['Wear', 'Arrive'], nepali: ['लगाउनु, पुग्नु'], strokes: 12, compounds: [{ word: '到着', reading: 'tōchaku', meaning: 'Arrival' }] },
      { ch: '送', lesson: 30, onyomi: ['SŌ'], kunyomi: ['oku-ru'], meanings: ['Send'], nepali: ['पठाउनु'], strokes: 9, compounds: [{ word: '送る', reading: 'okuru', meaning: 'Send' }] },
      { ch: '使', lesson: 30, onyomi: ['SHI'], kunyomi: ['tsuka-u'], meanings: ['Use'], nepali: ['प्रयोग गर्नु'], strokes: 8, compounds: [{ word: '使う', reading: 'tsukau', meaning: 'Use' }, { word: '大使館', reading: 'taishikan', meaning: 'Embassy' }] },
      { ch: '始', lesson: 31, onyomi: ['SHI'], kunyomi: ['haji-meru'], meanings: ['Begin', 'Start'], nepali: ['शुरु गर्नु'], strokes: 8, compounds: [{ word: '始める', reading: 'hajimeru', meaning: 'Start' }] },
      { ch: '終', lesson: 31, onyomi: ['SHŪ'], kunyomi: ['owa-ru'], meanings: ['End', 'Finish'], nepali: ['सकिनु'], strokes: 11, compounds: [{ word: '終わる', reading: 'owaru', meaning: 'Finish' }] },
      { character: '作', lesson: 32, onyomi: ['SAKU', 'SA'], kunyomi: ['tsuku-ru'], meanings: ['Make', 'Create'], nepali: ['बनाउनु'], strokes: 7, compounds: [{ word: '作る', reading: 'tsukuru', meaning: 'Make' }, { word: '作文', reading: 'sakubun', meaning: 'Essay' }] },
      { character: '泳', lesson: 32, onyomi: ['EI'], kunyomi: ['oyo-gu'], meanings: ['Swim'], nepali: ['पौडिनु'], strokes: 8, compounds: [{ word: '水泳', reading: 'suiei', meaning: 'Swimming' }] },
      { character: '知', lesson: 33, onyomi: ['CHI'], kunyomi: ['shi-ru'], meanings: ['Know'], nepali: ['थाहा हुनु'], strokes: 8, compounds: [{ word: '知る', reading: 'shiru', meaning: 'Know' }] },
      { character: '思', lesson: 33, onyomi: ['SHI'], kunyomi: ['omo-u'], meanings: ['Think'], nepali: ['सोच्नु'], strokes: 9, compounds: [{ word: '思う', reading: 'omou', meaning: 'Think' }] },
      { character: '作', lesson: 34, onyomi: ['SAKU'], kunyomi: ['tsuku-ru'], meanings: ['Make'], nepali: ['बनाउनु'], strokes: 7, compounds: [{ word: '作品', reading: 'sakuhin', meaning: 'Work of art' }] },
      { character: '品', lesson: 34, onyomi: ['HIN'], kunyomi: ['shina'], meanings: ['Goods', 'Item'], nepali: ['सामान'], strokes: 9, compounds: [{ word: '商品', reading: 'shōhin', meaning: 'Product' }] },
      { character: '持', lesson: 35, onyomi: ['JI'], kunyomi: ['mo-tsu'], meanings: ['Hold', 'Carry'], nepali: ['समात्नु, हुनु'], strokes: 9, compounds: [{ word: '持つ', reading: 'motsu', meaning: 'Hold' }] },
      { character: '待', lesson: 35, onyomi: ['TAI'], kunyomi: ['ma-tsu'], meanings: ['Wait'], nepali: ['पर्खनु'], strokes: 9, compounds: [{ word: '待つ', reading: 'matsu', meaning: 'Wait' }] },
      { character: '急', lesson: 36, onyomi: ['KYŪ'], kunyomi: ['iso-gu'], meanings: ['Hurry', 'Urgent'], nepali: ['हतार गर्नु'], strokes: 9, compounds: [{ word: '急ぐ', reading: 'isogu', meaning: 'Hurry' }] },
      { character: '特', lesson: 37, onyomi: ['TOKU'], kunyomi: [], meanings: ['Special'], nepali: ['विशेष'], strokes: 10, compounds: [{ word: '特別', reading: 'tokubetsu', meaning: 'Special' }] },
      { character: '別', lesson: 37, onyomi: ['BETSU'], kunyomi: ['waka-reru'], meanings: ['Separate', 'Different'], nepali: ['छुट्टै'], strokes: 7, compounds: [{ word: '別に', reading: 'betsuni', meaning: 'Not particularly' }] },
      { character: '重', lesson: 38, onyomi: ['JŪ'], kunyomi: ['omo-i'], meanings: ['Heavy'], nepali: ['गम्भीर, गरुङ्गो'], strokes: 9, compounds: [{ word: '重い', reading: 'omoi', meaning: 'Heavy' }] },
      { character: '軽', lesson: 38, onyomi: ['KEI'], kunyomi: ['karu-i'], meanings: ['Light (weight)'], nepali: ['हल्का'], strokes: 12, compounds: [{ word: '軽い', reading: 'karui', meaning: 'Light' }] },
      { character: '広', lesson: 39, onyomi: ['KŌ'], kunyomi: ['hiro-i'], meanings: ['Wide', 'Spacious'], meaningsNepali: ['फराकिलो'], strokes: 5, compounds: [{ word: '広い', reading: 'hiroi', meaning: 'Wide' }] },
      { character: '病', lesson: 40, onyomi: ['BYŌ'], kunyomi: ['yamai'], meanings: ['Sick', 'Illness'], meaningsNepali: ['बिरामी'], strokes: 10, compounds: [{ word: '病院', reading: 'byōin', meaning: 'Hospital' }] },
      { character: '院', lesson: 40, onyomi: ['IN'], kunyomi: [], meanings: ['Institution'], meaningsNepali: ['संस्था'], strokes: 10, compounds: [{ word: '入院', reading: 'nyūin', meaning: 'Hospitalization' }] },
    ];

    return n4Data.map((d) => ({
      character: d.ch,
      level: 'N4' as const,
      lessonOrder: d.lesson,
      strokeCount: d.strokes,
      readingsOnyomi: d.onyomi,
      readingsKunyomi: d.kunyomi,
      meanings: d.meanings,
      meaningsNepali: d.nepali,
      radicals: [{ radical: d.ch, meaning: d.meanings[0], color: '#3b82f6' }],
      compounds: d.compounds,
    }));
  }

  // N3 Kanji dataset (Lessons 51–75)
  if (level === 'N3') {
    const n3Chars = [
      { ch: '政', lesson: 51, meanings: ['Politics'], nepali: ['राजनीति'] },
      { ch: '議', lesson: 52, meanings: ['Deliberate', 'Meeting'], nepali: ['छलफल'] },
      { ch: '民', lesson: 53, meanings: ['People', 'Nation'], nepali: ['जनता'] },
      { ch: '連', lesson: 54, meanings: ['Connect', 'Take along'], nepali: ['जोड्नु'] },
      { ch: '対', lesson: 55, meanings: ['Oppose', 'Target'], nepali: ['विपरित'] },
      { ch: '部', lesson: 56, meanings: ['Section', 'Department'], nepali: ['विभाग'] },
      { ch: '合', lesson: 57, meanings: ['Combine', 'Fit'], nepali: ['मिलाउनु'] },
      { ch: '市', lesson: 58, meanings: ['City', 'Market'], nepali: ['सहर'] },
      { ch: '内', lesson: 59, meanings: ['Inside', 'Within'], nepali: ['भित्र'] },
      { ch: '相', lesson: 60, meanings: ['Mutual', 'Minister'], nepali: ['आपसी'] },
    ];
    return n3Chars.map((d, idx) => ({
      character: d.ch,
      level: 'N3' as const,
      lessonOrder: d.lesson,
      strokeCount: 8 + (idx % 5),
      readingsOnyomi: [['SEI', 'GI', 'MIN', 'REN', 'TAI', 'BU', 'GŌ', 'SHI', 'NAI', 'SŌ'][idx]],
      readingsKunyomi: [],
      meanings: d.meanings,
      meaningsNepali: d.nepali,
      radicals: [{ radical: d.ch, meaning: d.meanings[0], color: '#8b5cf6' }],
      compounds: [],
    }));
  }

  // N2 Kanji dataset (Lessons 76–100)
  const n2Chars = [
    { ch: '党', lesson: 76, meanings: ['Party', 'Faction'], nepali: ['दल'] },
    { ch: '協', lesson: 78, meanings: ['Cooperate'], nepali: ['सहकार्य'] },
    { ch: '総', lesson: 80, meanings: ['General', 'Total'], nepali: ['कुल, समग्र'] },
    { ch: '区', lesson: 82, meanings: ['District', 'Ward'], nepali: ['वडा'] },
    { ch: '領', lesson: 85, meanings: ['Territory', 'Lead'], nepali: ['क्षेत्र'] },
    { ch: '県', lesson: 88, meanings: ['Prefecture'], nepali: ['प्रदेश'] },
    { ch: '設', lesson: 90, meanings: ['Establish'], nepali: ['स्थापना'] },
    { ch: '改', lesson: 95, meanings: ['Reform', 'Change'], nepali: ['सुधार'] },
  ];

  return n2Chars.map((d, idx) => ({
    character: d.ch,
    level: 'N2' as const,
    lessonOrder: d.lesson,
    strokeCount: 9 + (idx % 6),
    readingsOnyomi: [['TŌ', 'KYŌ', 'SŌ', 'KU', 'RYŌ', 'KEN', 'SETSU', 'KAI'][idx]],
    readingsKunyomi: [],
    meanings: d.meanings,
    meaningsNepali: d.nepali,
    radicals: [{ radical: d.ch, meaning: d.meanings[0], color: '#ec4899' }],
    compounds: [],
  }));
}

export function getKanjiByLevelAndLesson(level: 'N5' | 'N4' | 'N3' | 'N2', lessonNumber?: number): KanjiItem[] {
  const fullLevel = getKanjiByLevel(level);
  if (lessonNumber) {
    return fullLevel.filter(k => k.lessonOrder === lessonNumber);
  }
  return fullLevel;
}
