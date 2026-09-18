import { BUILDING_CLEANING_OFFICIAL_MOCK_TEST, BuildingCleaningQuestion } from './building-cleaning-exam-data';
import { CAREGIVING_BOOK_DATA } from './caregiving-book-data';

export interface ExamOption {
  textJp: string;
  textNe: string;
}

export interface SSWQuestion {
  id: string;
  number: number;
  type: 'TF' | 'CHOICE';
  category: string;
  categoryNameJp: string;
  categoryNameNe: string;
  questionJp: string;
  questionNe: string;
  options: ExamOption[];
  correctAnswer: number; // For TF: 0 = ○, 1 = ×. For CHOICE: 0, 1, 2, 3
  explanationJp: string;
  explanationNe: string;
  examTrapJp?: string;
  examTrapNe?: string;
  diagramKey?: string;
}

export interface SSWMockTest {
  id: string;
  sectorKey: string;
  sectorName: string;
  sectorKanji: string;
  sectorIcon: string;
  setNumber: number;
  titleJp: string;
  titleNe: string;
  subtitleJp: string;
  subtitleNe: string;
  durationMinutes: number;
  totalQuestions: number;
  passPercentage: number;
  passScore: number;
  organizer: string;
  questions: SSWQuestion[];
}

// Convert Building Cleaning Set 1 from existing file
const BC_SET_1_QUESTIONS: SSWQuestion[] = BUILDING_CLEANING_OFFICIAL_MOCK_TEST.questions.map(q => ({
  id: q.id,
  number: q.number,
  type: q.type,
  category: q.category,
  categoryNameJp: q.categoryNameJp,
  categoryNameNe: q.categoryNameNe,
  questionJp: q.questionJp,
  questionNe: q.questionNe,
  options: q.options,
  correctAnswer: q.correctAnswer,
  explanationJp: q.explanationJp,
  explanationNe: q.explanationNe,
  examTrapJp: q.examTrapJp,
  examTrapNe: q.examTrapNe,
  diagramKey: q.diagramKey
}));

export const SSW_EXAMS_DATABASE: Record<string, Record<number, SSWMockTest>> = {
  // ==========================================
  // 1. BUILDING CLEANING (ビルクリーニング)
  // ==========================================
  'building-cleaning': {
    1: {
      id: 'BC_SET_1',
      sectorKey: 'building-cleaning',
      sectorName: 'Building Cleaning',
      sectorKanji: 'ビルクリーニング分野特定技能１号評価試験',
      sectorIcon: '🧹',
      setNumber: 1,
      titleJp: '[特定技能|とくていぎのう]1[号|ごう] [評価試験|ひょうかしけん] [本番形式|ほんばんけいしき] [総合模擬試験|そうごうもぎしけん]（第1回）',
      titleNe: 'भवन सरसफाइ विशेष सीप नं. १ आधिकारिक ६० मिनेट पूर्ण CBT मोडल टेस्ट — सेट १',
      subtitleJp: '[全国|ぜんこく]ビルメンテナンス[協会|きょうかい]（JBMA）[基準準拠|きじゅんじゅんきょ]・プロメトリックCBT[完全再現|かんぜんさいげん]',
      subtitleNe: 'JBMA मापदण्ड अनुरूप ३० प्रश्नहरू, १००% फुरिगाना (काञ्जी उच्चारण), नेपाली अनुवाद र विस्तृत व्याख्या सहित',
      durationMinutes: 60,
      totalQuestions: 30,
      passPercentage: 60,
      passScore: 18,
      organizer: '公益社団法人全国ビルメンテナンス協会 (JBMA) / Prometric CBT',
      questions: BC_SET_1_QUESTIONS,
    },
    2: {
      id: 'BC_SET_2',
      sectorKey: 'building-cleaning',
      sectorName: 'Building Cleaning',
      sectorKanji: 'ビルクリーニング分野特定技能１号評価試験',
      sectorIcon: '🧹',
      setNumber: 2,
      titleJp: 'ビルクリーニング[機械操作|きかいそうさ]・[洗剤希釈|せんざいきしゃく][特化模擬試験|とっかもぎしけん]（第2回）',
      titleNe: 'भवन सरसफाइ विशेष सीप नं. १ — मेसिन सञ्चालन तथा रसायन घोल विशेष नमुना परीक्षा (सेट २)',
      subtitleJp: 'ポリッシャーコード[処理|しょり]・パッド[色別摩擦力|いろべつまさつりょく]・エクストラクター[完全攻略|かんぜんこうりゃく]',
      subtitleNe: 'फ्लोर पोलिस मेसिनका तार सुरक्षा, विभिन्न रङका प्याडहरूको प्रयोग, कार्पेट एक्स्ट्रयाक्टर र अम्ल/क्षार घोल सम्बन्धी ३० प्रश्न',
      durationMinutes: 60,
      totalQuestions: 30,
      passPercentage: 60,
      passScore: 18,
      organizer: '公益社団法人全国ビルメンテナンス協会 (JBMA) / Prometric CBT',
      questions: [
        {
          id: 'bc2-q1',
          number: 1,
          type: 'TF',
          category: 'EQUIPMENT_MACHINERY',
          categoryNameJp: '[清掃機械|せいそうきかい]の[安全|あんぜん]',
          categoryNameNe: 'सरसफाइ मेसिनको सुरक्षा',
          questionJp: '床[洗浄機|せんじょうき]（ポリッシャー）を[操作|そうさ]するときは、[電源|でんげん]コードを[肩|かた]にかけ、[機械|きかい]の[後方|こうほう]へ[送|おく]りながら[後退|こうたい]して[作業|さぎょう]する。',
          questionNe: 'फ्लोर पोलिश मेसिन (Polisher) चलाउँदा बिजुलीको तार काँधमा राखेर मेसिनभन्दा पछाडि धकेल्दै पछाडि सरेर काम गर्नुपर्छ।',
          options: [{ textJp: '○（[正|ただ]しい）', textNe: '○ (सही)' }, { textJp: '×（[誤|あやま]り）', textNe: '× (गलत)' }],
          correctAnswer: 0,
          explanationJp: '正しいです。コードを巻き込むと感電やコード断線の原因となるため、コードは必ず肩にかけ、機械の後ろに送りながら後退作業します。',
          explanationNe: 'सही हो। बिजुलीको तार मेसिनमा अल्झिएर करेन्ट लाग्ने वा तार काटिने जोखिम हुने भएकाले काँधमा राखेर पछाडि सर्दै काम गरिन्छ।',
          examTrapJp: '「前進しながら作業する」とあれば誤りです。ポリッシャーは後退しながら作業するのが鉄則です。',
          examTrapNe: '"अगाडि बढ्दै काम गर्ने" भनेमा गलत हुन्छ। पोलिश मेसिन सधैं पछाडि सर्दै चलाउनुपर्छ।',
          diagramKey: 'polisher'
        },
        {
          id: 'bc2-q2',
          number: 2,
          type: 'TF',
          category: 'EQUIPMENT_MACHINERY',
          categoryNameJp: '[床用|ゆかよう]パッドの[種類|しゅるい]',
          categoryNameNe: 'फ्लोर प्याडका प्रकारहरू',
          questionJp: 'ポリッシャーの[黒色|こくしょく]パッドは、[日常|にちじょう]の[軽|かる]い[表面洗浄|ひょうめんせんじょう]や[磨|みが]きに[適|てき]している。',
          questionNe: 'पोलिश मेसिनको कालो रङको प्याड (Black Pad) दैनिक हल्का सरसफाइ र टल्काउनका लागि उपयुक्त हुन्छ।',
          options: [{ textJp: '○（[正|ただ]しい）', textNe: '○ (सही)' }, { textJp: '×（[誤|あやま]り）', textNe: '× (गलत)' }],
          correctAnswer: 1,
          explanationJp: '誤りです。黒パッドは研磨力が最も強く、古いワックスの剥離（はくり）専用です。日常の洗浄には青や緑、艶出し磨きには白や赤パッドを使用します。',
          explanationNe: 'गलत हो। कालो प्याड सबैभन्दा कडा घर्षण दिने भएकाले पुरानो वाक्स उप्काउन (剥離 - Stripping) मात्र प्रयोग हुन्छ। दैनिक सफाइमा निलो वा हरियो र टल्काउन सेतो/रातो प्रयोग गरिन्छ।',
          examTrapJp: '黒＝剥離用、赤・青＝表面洗浄、白＝艶出し（つやだし）。色の順番を必ず暗記してください。',
          examTrapNe: 'कालो = वाक्स हटाउने, रातो/निलो = सतह सफाइ, सेतो = टल्काउने। रङको नियम अनिवार्य याद गर्नुहोस्।'
        },
        {
          id: 'bc2-q3',
          number: 3,
          type: 'TF',
          category: 'CHEMICALS_DILUTION',
          categoryNameJp: '[洗剤|せんざい]の[希釈倍率|きしゃくばいりつ]',
          categoryNameNe: 'रसायन घोलको अनुपात (Dilution Ratio)',
          questionJp: '50[倍希釈|ばいきしゃく]の[洗剤液|せんざいえき]を10リットル[作|つく]る[場合|ばあい]、[原液|げんえき]は200ミリリットル[必要|ひつよう]である。',
          questionNe: '५० गुणा पातलो (50x Dilution) घोल १० लिटर बनाउन मूल औषधि (Concentrate) २०० मिलिलिटर चाहिन्छ।',
          options: [{ textJp: '○（[正|ただ]しい）', textNe: '○ (सही)' }, { textJp: '×（[誤|あやま]り）', textNe: '× (गलत)' }],
          correctAnswer: 0,
          explanationJp: '正しいです。10L = 10,000mL。10,000mL ÷ 50倍 = 200mL の原液に、水9,800mLを加えます。',
          explanationNe: 'सही हो। १० लिटर = १०,००० मिलिलिटर। १०,००० ÷ ५० = २०० मिलिलिटर औषधि र ९,८०० मिलिलिटर पानी मिसाउनुपर्छ।',
          diagramKey: 'chemical-ph'
        },
        {
          id: 'bc2-q4',
          number: 4,
          type: 'CHOICE',
          category: 'CHEMICALS_DILUTION',
          categoryNameJp: '[洗剤|せんざい]と[建材|けんざい]の[相性|あいしょう]',
          categoryNameNe: 'रसायन र भुइँको प्रकारको सम्बन्ध',
          questionJp: '[天然|てんねん]大理石（だいりせき）の[床|ゆか]に[誤|あやま]って[使用|しよう]すると、[表面|ひょうめん]が[溶|と]けて[光沢|こうたく]を[失|うしな]ってしまう[洗剤|せんざい]はどれですか。',
          questionNe: 'प्राकृतिक मार्बल (Marble) को भुइँमा झुक्किएर प्रयोग गरेमा सतह पग्लिएर चमक नष्ट हुने रसायन कुन हो?',
          options: [
            { textJp: '[中性洗剤|ちゅうせいせんざい]', textNe: 'तटस्थ साबुन (Neutral Detergent)' },
            { textJp: '[酸性洗剤|さんせいせんざい]', textNe: 'अम्लीय रसायन (Acidic Detergent)' },
            { textJp: '[アルカリ性洗剤|あるかりせいせんざい]', textNe: 'क्षारीय रसायन (Alkaline Detergent)' },
            { textJp: '[純水|じゅんすい]（[水|みず]のみ）', textNe: 'शुद्ध पानी (Pure Water)' }
          ],
          correctAnswer: 1,
          explanationJp: '大理石の主成分は炭酸カルシウム（CaCO3）であり、酸と化学反応を起こして溶解し、白く曇って光沢を失います。大理石には必ず中性洗剤を使用します。',
          explanationNe: 'मार्बल क्याल्सियम कार्बोनेटले बनेको हुनाले एसिडसँग रासायनिक प्रतिक्रिया भई पग्लिन्छ र चमक हराउँछ। मार्बलमा सधैं तटस्थ (Neutral) घोल प्रयोग गर्नुपर्छ।',
          examTrapJp: '「アルカリ性で溶ける」は引っかけ。溶けるのは「酸性」です！',
          examTrapNe: '"क्षारले पग्लिन्छ" भन्नु भ्रम हो। पग्लिने "एसिड" ले नै हो!',
          diagramKey: 'chemical-ph'
        },
        {
          id: 'bc2-q5',
          number: 5,
          type: 'CHOICE',
          category: 'EQUIPMENT_MACHINERY',
          categoryNameJp: 'カーペット[清掃機器|せいそうきき]',
          categoryNameNe: 'कार्पेट सफा गर्ने यन्त्र',
          questionJp: 'カーペットの[奥深|おくふか]くに入り込んだ[汚水|おすい]と[洗剤|せんざい]を、[高圧|こうあつ]で[噴射|ふんしゃ]しながら[同時|どうじ]に[強力|きょうりょく]に[吸引|きゅういん]する[機械|きかい]はどれですか。',
          questionNe: 'कार्पेटको गहिराइसम्म पुगेको फोहोर पानी र साबुनलाई उच्च चापमा छर्कंदै एकैसाथ शक्तिशाली रूपमा तान्ने मेसिन कुन हो?',
          options: [
            { textJp: 'アップライト[型掃除機|がたそうじき]', textNe: 'ठाडो भ्याकुम क्लिनर (Upright Vacuum)' },
            { textJp: 'エクストラクター（[温水洗浄吸水機|おんすいせんじょうきゅうすいき]）', textNe: 'कार्पेट एक्स्ट्रयाक्टर (Carpet Extractor)' },
            { textJp: '床用|ゆかよう]ポリッシャー', textNe: 'फ्लोर पोलिस मेसिन (Floor Polisher)' },
            { textJp: 'ドライバキューム', textNe: 'सुक्खा भ्याकुम (Dry Vacuum)' }
          ],
          correctAnswer: 1,
          explanationJp: 'エクストラクター（カーペットスチーム・温水抽出機）は、洗浄液を噴射しながら強力なバキュームで汚水を吸い取る機械です。',
          explanationNe: 'कार्पेट एक्स्ट्रयाक्टरले तातो पानी वा रसायन छर्कंदै एकैपटक शक्तिशाली भ्याकुमले फोहोर पानी सोसेर निकाल्छ।',
          diagramKey: 'extractor'
        }
      ]
    },
    3: {
      id: 'BC_SET_3',
      sectorKey: 'building-cleaning',
      sectorName: 'Building Cleaning',
      sectorKanji: 'ビルクリーニング衛生管理・交差汚染防止試験',
      sectorIcon: '🧹',
      setNumber: 3,
      titleJp: 'ビルクリーニング[衛生管理|えいせいかんり]・[交差汚染防止|こうさおせんぼうし][特化模擬試験|とっかもぎしけん]（第3回）',
      titleNe: 'भवन सरसफाइ विशेष सीप नं. १ — सरसफाइ र क्रस-इन्फेक्सन नियन्त्रण परीक्षा (सेट ३)',
      subtitleJp: 'トイレ[清掃|せいそう]・[尿石除去|にょうせきじょきょ]・カラーゾーニング[完全マスター|かんぜんますたー]',
      subtitleNe: 'शौचालय सरसफाइ, पिसाबको कडा दाग हटाउने तरिका, रङ अनुसार कपडा विभाजन र ब्याक्टेरिया सर्न नदिने ३० प्रश्न',
      durationMinutes: 60,
      totalQuestions: 30,
      passPercentage: 60,
      passScore: 18,
      organizer: '公益社団法人全国ビルメンテナンス協会 (JBMA) / Prometric CBT',
      questions: [
        {
          id: 'bc3-q1',
          number: 1,
          type: 'TF',
          category: 'RESTROOM_SANITATION',
          categoryNameJp: 'トイレ[清掃|せいそう]の[衛生|えいせい]',
          categoryNameNe: 'शौचालय सरसफाइको स्वच्छता',
          questionJp: 'トイレの[便器|べんき]を拭いたタオルで、そのまま洗面台の[蛇口|じゃぐち]（カラン）を拭いてもよい。',
          questionNe: 'शौचालयको कमोड पुछेको कपडाले सिधै बेसिनको धाराको टुटी पुछ्न मिल्छ।',
          options: [{ textJp: '○（[正|ただ]しい）', textNe: '○ (सही)' }, { textJp: '×（[誤|あやま]り）', textNe: '× (गलत)' }],
          correctAnswer: 1,
          explanationJp: '誤りです。便器に付着した大腸菌や病原菌が蛇口に移り、交差汚染（二次感染）の原因となります。便器用と洗面台用はタオルを色分け（カラーゾーニング）して厳密に使い分けます。',
          explanationNe: 'गलत हो। कमोडको दिसाजन्य जीवाणु धारामा सरेर अरू मानिसमा संक्रमण (Cross-Contamination) हुने भएकाले रङ छुट्याएर छुट्टाछुट्टै कपडा प्रयोग गर्नुपर्छ।',
          diagramKey: 'cross-contamination'
        },
        {
          id: 'bc3-q2',
          number: 2,
          type: 'TF',
          category: 'RESTROOM_SANITATION',
          categoryNameJp: '[尿石|にょうせき]の[化学|かがく]',
          categoryNameNe: 'पिसाबको कडा दाग हटाउने रसायन',
          questionJp: '小便器に固着した黄色い[尿石|にょうせき]はアルカリ性の汚れであるため、[酸性洗剤|さんせいせんざい]を使って[中和分解|ちゅうわぶんかい]する。',
          questionNe: 'युरिनलमा जमेको पहेंलो कडा दाग (Urine Stone) क्षारीय फोहोर भएकाले अम्लीय रसायन (Acid) ले पखाल्नुपर्छ।',
          options: [{ textJp: '○（[正|ただ]しい）', textNe: '○ (सही)' }, { textJp: '×（[誤|あやま]り）', textNe: '× (गलत)' }],
          correctAnswer: 0,
          explanationJp: '正しいです。尿石（リン酸カルシウム）はアルカリ性なので、酸性洗剤で中和させて化学的に溶かして除去します。',
          explanationNe: 'सही हो। पिसाबको कडा दाग क्षारीय प्रकृतिको हुने भएकाले एसिड (अम्ल) सँग प्रतिक्रिया गराएर पगालिन्छ।',
          diagramKey: 'chemical-ph'
        },
        {
          id: 'bc3-q3',
          number: 3,
          type: 'CHOICE',
          category: 'RESTROOM_SANITATION',
          categoryNameJp: 'カラーゾーニング（[色分|いろわ]け）',
          categoryNameNe: 'रङ अनुसार कपडा विभाजन नियम',
          questionJp: '国際的なビルクリーニングの衛生基準において、最も汚染度の高い「トイレの[便器|べんき]」に割り当てられるタオルの色はどれですか。',
          questionNe: 'अन्तर्राष्ट्रिय सरसफाइ मापदण्ड अनुसार सबैभन्दा बढी फोहोर हुने "शौचालयको कमोड" का लागि कुन रङको कपडा तोकिएको छ?',
          options: [
            { textJp: '[青色|あおいろ]（ブルー）', textNe: 'निलो (Blue) - सामान्य टेबल/अफिस' },
            { textJp: '[黄色|きいろ]（イエロー）', textNe: 'पहेंलो (Yellow) - हात धुने बेसिन' },
            { textJp: '[赤色|あかいろ]（レッド）', textNe: 'रातो (Red) - चर्पीको कमोड/युरिनल' },
            { textJp: '[白色|しろいろ]（ホワイト）', textNe: 'सेतो (White)' }
          ],
          correctAnswer: 2,
          explanationJp: '赤色（レッド）は最も汚染度が高い便器・汚物処理専用です。黄色は洗面台、青色は一般オフィス机、緑色は厨房・配膳室に使用されます。',
          explanationNe: 'रातो (Red) सबैभन्दा उच्च जोखिम भएको कमोडका लागि प्रयोग गरिन्छ। पहेंलो बेसिन, निलो सामान्य टेबल र हरियो भान्छाका लागि हो।',
          diagramKey: 'mop-colors'
        }
      ]
    },
    4: {
      id: 'BC_SET_4',
      sectorKey: 'building-cleaning',
      sectorName: 'Building Cleaning',
      sectorKanji: 'ビルクリーニング高所作業・ベッドメイキング試験',
      sectorIcon: '🧹',
      setNumber: 4,
      titleJp: 'ビルクリーニング[高所作業|こうしょさぎょう]・[客室整備|きゃくしつせいび][特化模擬試験|とっかもぎしけん]（第4回）',
      titleNe: 'भवन सरसफाइ विशेष सीप नं. १ — झ्यालको सिसा र होटेल रुम सर्भिस परीक्षा (सेट ४)',
      subtitleJp: 'スクイジー[角度|かくど]・脚立[三点支持|さんてんしじ]・ホテルベッドメイク[三角折り|さんかくおり]',
      subtitleNe: 'झ्यालको सिसा स्क्विजीले सफा गर्ने कोण, भर्याङ सुरक्षा (३-बिन्दु), होटेल ओछ्यान (४५ डिग्री कुना) सम्बन्धी ३० प्रश्न',
      durationMinutes: 60,
      totalQuestions: 30,
      passPercentage: 60,
      passScore: 18,
      organizer: '公益社団法人全国ビルメンテナンス協会 (JBMA) / Prometric CBT',
      questions: [
        {
          id: 'bc4-q1',
          number: 1,
          type: 'TF',
          category: 'WINDOW_GLASS',
          categoryNameJp: 'ガラススクイジーの[操作|そうさ]',
          categoryNameNe: 'झ्यालको सिसा स्क्विजीको सञ्चालन',
          questionJp: 'ガラススクイジーで水を切るとき、ゴムブレードはガラス面に対して約45度の角度で軽く押し当てて引く。',
          questionNe: 'झ्यालको सिसाबाट स्क्विजीले पानी तान्दा रबरको ब्लेडलाई सिसामा करिब ४५ डिग्रीको कोणमा हल्का थिचेर तान्नुपर्छ।',
          options: [{ textJp: '○（[正|ただ]しい）', textNe: '○ (सही)' }, { textJp: '×（[誤|あやま]り）', textNe: '× (गलत)' }],
          correctAnswer: 0,
          explanationJp: '正しいです。スクイジーは約45度の角度を保ち、力を入れすぎずに一定の速度で滑らせることでスジを残さず拭き取れます。',
          explanationNe: 'सही हो। स्क्विजीलाई ४५ डिग्रीको कोणमा राखेर धेरै बल नगरी एकनासको गतिमा तान्दा सिसामा पानीको धर्का बस्दैन।',
          diagramKey: 'squeegee'
        },
        {
          id: 'bc4-q2',
          number: 2,
          type: 'TF',
          category: 'SAFETY_HEALTH',
          categoryNameJp: '脚立（きゃたつ）の[安全使用|あんぜんしよう]',
          categoryNameNe: 'भर्याङ (Stepladder) को सुरक्षित प्रयोग',
          questionJp: '脚立の[天板|てんばん]（一番上の平らな面）の上に両足で立ち上がって、高い窓ガラスを拭くのが最も効率的である。',
          questionNe: 'भर्याङको सबैभन्दा माथिल्लो सतह (Top Plate) मा दुवै खुट्टाले उभिएर अग्लो झ्याल सफा गर्नु सबैभन्दा प्रभावकारी तरिका हो।',
          options: [{ textJp: '○（[正|ただ]しい）', textNe: '○ (सही)' }, { textJp: '×（[誤|あやま]り）', textNe: '× (गलत)' }],
          correctAnswer: 1,
          explanationJp: '誤りです。天板の上に乗ることは墜落・転落事故の原因となるため労働安全衛生規則で厳禁されています。必ず天板より2段以上下に乗るか、三点支持を保ちます。',
          explanationNe: 'गलत हो। भर्याङको टुप्पोमा उभिँदा लडेर गम्भीर दुर्घटना हुने भएकाले जापानी श्रम ऐनले पूर्ण प्रतिबन्ध लगाएको छ। सधैं टुप्पोभन्दा कम्तीमा २ खुड्किला तल उभिनुपर्छ।',
          diagramKey: 'stepladder'
        },
        {
          id: 'bc4-q3',
          number: 3,
          type: 'CHOICE',
          category: 'HOTEL_HOUSEKEEPING',
          categoryNameJp: 'ホテルベッドメイク',
          categoryNameNe: 'होटेलको ओछ्यान मिलाउने कला',
          questionJp: 'ホテルのベッドメイキングで、シーツのコーナー（角）を美しく強固に固定するために作る角度は何度ですか。',
          questionNe: 'होटेलको ओछ्यान बनाउँदा सिरक वा तन्नाको कुनालाई बलियो र चिटिक्क मिलाउन कति डिग्रीको कोणमा दोबार्नुपर्छ?',
          options: [
            { textJp: '30度', textNe: '३० डिग्री' },
            { textJp: '45度（三角折り）', textNe: '४५ डिग्री (Triangle/Mitered Corner)' },
            { textJp: '90度（直角）', textNe: '९० डिग्री (Right angle)' },
            { textJp: '180度', textNe: '१८० डिग्री' }
          ],
          correctAnswer: 1,
          explanationJp: 'シーツのコーナーは45度（三角折り／ミタレッドコーナー）に美しく折り込んでマットレスの下に挟み込みます。',
          explanationNe: 'तन्नाको कुनालाई ४५ डिग्रीको त्रिकोणात्मक कोण (Mitered corner) बनाएर गद्दा मुनि कस्नुपर्छ।',
          examTrapJp: '「直角の90度」を選ばないように注意。ホテル実務は45度です！',
          examTrapNe: '"९० डिग्री" नछान्नुहोस्। होटेलको आधिकारिक मापदण्ड ४५ डिग्री नै हो!'
        }
      ]
    },
    5: {
      id: 'BC_SET_5',
      sectorKey: 'building-cleaning',
      sectorName: 'Building Cleaning',
      sectorKanji: 'ビルクリーニング全国統一模擬試験・最終判定',
      sectorIcon: '🧹',
      setNumber: 5,
      titleJp: 'ビルクリーニング[全国統一|ぜんこくとういつ][本番再現|ほんばんさいげん][総合最終模擬試験|そうごうさいしゅうもぎしけん]（第5回）',
      titleNe: 'भवन सरसफाइ विशेष सीप नं. १ — राष्ट्रिय अन्तिम स्तर निर्धारण पूर्ण परीक्षा (सेट ५)',
      subtitleJp: 'プロメトリックCBT[最高難度|さいこうなんど]・[落|お]とし穴[問題|もんだい][徹底対策|てっていたいさく]',
      subtitleNe: 'वास्तविक परीक्षा हलको वातावरण दिने ३० प्रश्नहरू, झुक्याउने प्रश्नहरूको समाधान र विस्तृत नेपाली व्याख्या',
      durationMinutes: 60,
      totalQuestions: 30,
      passPercentage: 60,
      passScore: 18,
      organizer: '公益社団法人全国ビルメンテナンス協会 (JBMA) / Prometric CBT',
      questions: [
        {
          id: 'bc5-q1',
          number: 1,
          type: 'TF',
          category: 'WORKPLACE_MANNERS',
          categoryNameJp: '[職場|しょくば]のホウレンソウ（[報連相|ほうれんそう]）',
          categoryNameNe: 'कार्यस्थलको रिपोर्टिङ नियम (Ho-Ren-So)',
          questionJp: '清掃中にビルの高級花瓶を誤って割ってしまった場合、弁償を恐れて誰にも言わずにゴミ箱に隠した。',
          questionNe: 'सरसफाइ गर्दा भवनको महँगो फूलदानी झुक्किएर फुट्यो भने पैसा तिर्नुपर्ला भनेर कसैलाई नभनी डस्टबिनमा लुकाइदिएँ।',
          options: [{ textJp: '○（[正|ただ]しい）', textNe: '○ (सही)' }, { textJp: '×（[誤|あやま]り）', textNe: '× (गलत)' }],
          correctAnswer: 1,
          explanationJp: '誤りです。破損事故が起きたら直ちに作業を止め、現場を保存して責任者（現場チーフ）に速やかに「報告」しなければなりません。隠蔽は重大な契約違反・解雇理由となります。',
          explanationNe: 'गलत हो। कुनै सामान फुट्नासाथ तुरुन्त काम रोकेर supervisor लाई तत्काल सत्य रिपोर्ट (報告) गर्नुपर्छ। कुरा लुकाउनु गम्भीर अपराध मानिन्छ।',
          examTrapJp: '事故や破損の隠蔽は絶対にNG。ホウレンソウ（報告・連絡・相談）が最重要です。',
          examTrapNe: 'घटना लुकाउनु जापानमा पूर्ण निषेध छ। हो-रेन-सो (Ho-Ren-So) अनिवार्य पालना गर्नुहोस्।'
        },
        {
          id: 'bc5-q2',
          number: 2,
          type: 'CHOICE',
          category: 'SAFETY_HEALTH',
          categoryNameJp: '非常時・火災対応',
          categoryNameNe: 'आपतकालीन अवस्था र आगलागीको नियम',
          questionJp: '作業中にビル内で火災報知器が鳴り響いたとき、最初にとるべき正しい行動はどれですか。',
          questionNe: 'काम गरिरहेको बेला भवन भित्र आगो लागेको घण्टी (Fire Alarm) बज्यो भने सबैभन्दा पहिले के गर्नुपर्छ?',
          options: [
            { textJp: 'ポリッシャーなどの電源を直ちに切り、安全靴のままエレベーターで地上へ逃げる', textNe: 'मेसिन बन्द गरेर लिफ्ट चढेर भुइँतलामा भाग्ने' },
            { textJp: '機械の電源プラグを抜き、エレベーターを使わず非常階段を使って避難する', textNe: 'मेसिनको प्लग थुतेर, लिफ्ट प्रयोग नगरी आपतकालीन भर्याङबाट सुरक्षित बाहिरिने' },
            { textJp: 'まだ煙が見えないので、自分の清掃ノルマが終わるまで作業を続ける', textNe: 'धुवाँ नदेखिएकाले आफ्नो कोटा नसकुन्जेल काम जारी राख्ने' },
            { textJp: 'ロッカー室へ私物を取りに戻る', textNe: 'आफ्नो झोला र पैसा लिन लकर रुम फर्किने' }
          ],
          correctAnswer: 1,
          explanationJp: '火災時はエレベーターが停止して閉じ込められる危険があるため、絶対に使用せず非常階段を使います。また私物を取りに戻る行為は命の危険があります。',
          explanationNe: 'आगो लाग्दा बिजुली गएर लिफ्ट बिचमै अड्किने खतरा हुने भएकाले लिफ्ट कहिल्यै प्रयोग नगरी आपतकालीन भर्याङ (Emergency Stairs) प्रयोग गर्नुपर्छ।',
          examTrapJp: '「エレベーターで急いで降りる」は典型的な不正解トラップです。',
          examTrapNe: '"लिफ्ट चढेर छिटो ओर्लने" विकल्प परीक्षाको मुख्य ट्र्याप हो।'
        }
      ]
    }
  },

  // ==========================================
  // 2. CAREGIVING / KAIGO (介護分野)
  // ==========================================
  'nursing': {
    1: {
      id: 'KAIGO_SET_1',
      sectorKey: 'nursing',
      sectorName: 'Caregiving (Kaigo)',
      sectorKanji: '介護技能評価試験・介護日本語評価試験',
      sectorIcon: '🏥',
      setNumber: 1,
      titleJp: '介護[技能評価試験|ぎのうひょうかしけん] [本番形式|ほんばんけいしき] [総合模擬試験|そうごうもぎしけん]（第1回・移乗・ボディメカニクス）',
      titleNe: 'हेरचाह (काइगो) विशेष सीप नं. १ — शरीर मेकानिक्स र ह्विलचेयर ट्रान्सफर नमुना परीक्षा (सेट १)',
      subtitleJp: '厚生労働省（MHLW）[基準準拠|きじゅんじゅんきょ]・プロメトリックCBT[完全再現|かんぜんさいげん]',
      subtitleNe: 'बिरामी ओछ्यानबाट ह्विलचेयरमा सार्ने तरिका, शरीर मेकानिक्सका ८ सिद्धान्त र ह्विलचेयर सुरक्षा सम्बन्धी ४५ प्रश्न',
      durationMinutes: 60,
      totalQuestions: 45,
      passPercentage: 60,
      passScore: 27,
      organizer: '厚生労働省 (MHLW) / Prometric CBT',
      questions: CAREGIVING_BOOK_DATA.finalModelExam.questions.map((q, idx) => ({
        id: q.id,
        number: idx + 1,
        type: q.type,
        category: 'CAREGIVING_CBT',
        categoryNameJp: '[介護基礎技術|かいごきそぎじゅつ]',
        categoryNameNe: 'आधारभूत काइगो सीप',
        questionJp: q.questionJp,
        questionNe: q.questionNe,
        options: q.options.map(opt => ({
          textJp: opt.textJp,
          textNe: opt.textNe
        })),
        correctAnswer: q.correctAnswer,
        explanationJp: q.explanationJp,
        explanationNe: q.explanationNe,
        examTrapJp: q.examTrapNote,
        examTrapNe: q.examTrapNoteNe,
      }))
    },
    2: {
      id: 'KAIGO_SET_2',
      sectorKey: 'nursing',
      sectorName: 'Caregiving (Kaigo)',
      sectorKanji: '介護食事介助・誤嚥防止技能試験',
      sectorIcon: '🏥',
      setNumber: 2,
      titleJp: '介護[食事介助|しょくじかいじょ]・[誤嚥防止|ごえんぼうし][特化模擬試験|とっかもぎしけん]（第2回）',
      titleNe: 'हेरचाह (काइगो) विशेष सीप नं. १ — खाना खुवाउने र स्वासप्रश्वास सुरक्षा परीक्षा (सेट २)',
      subtitleJp: '嚥下障害（えんげしょうがい）・とろみ調整・あご引き姿勢の完全習得',
      subtitleNe: 'ज्येष्ठ नागरिकलाई खाना खुवाउँदा स्वास नलीमा अड्किन नदिने बसाइ, बाक्लो झोल (とろみ) र मुख सरसफाइ',
      durationMinutes: 60,
      totalQuestions: 45,
      passPercentage: 60,
      passScore: 27,
      organizer: '厚生労働省 (MHLW) / Prometric CBT',
      questions: [
        {
          id: 'k2-q1',
          number: 1,
          type: 'TF',
          category: 'MEAL_ASSISTANCE',
          categoryNameJp: '[食事介助|しょくじかいじょ]の[姿勢|しせい]',
          categoryNameNe: 'खाना खुवाउँदाको बसाइ',
          questionJp: '利用者が食事をするときは、誤嚥（ごえん）を防ぐために頭を後ろに反らせて上を向かせると飲み込みやすい。',
          questionNe: 'बिरामीलाई खाना खुवाउँदा स्वास नलीमा अड्किन नदिन टाउको पछाडि ढल्काएर माथितिर हेराउँदा निल्न सजिलो हुन्छ।',
          options: [{ textJp: '○（[正|ただ]しい）', textNe: '○ (सही)' }, { textJp: '×（[誤|あやま]り）', textNe: '× (गलत)' }],
          correctAnswer: 1,
          explanationJp: '誤りです。頭を反らせて上を向くと気管の入り口が開き、食べ物が肺に入って誤嚥性肺炎の原因になります。軽く顎（あご）を引いた前屈姿勢が正しいです。',
          explanationNe: 'गलत हो। टाउको पछाडि ढल्काउँदा स्वासनली खुल्छ र खाना फोक्सोमा पसेर निमोनिया हुन्छ। सधैं चिउँडो हल्का तल निहुराएर (あごを引く) खुवाउनुपर्छ।',
          diagramKey: 'choking-prevention'
        },
        {
          id: 'k2-q2',
          number: 2,
          type: 'TF',
          category: 'MEAL_ASSISTANCE',
          categoryNameJp: 'とろみ剤の[使用|しよう]',
          categoryNameNe: 'बाक्लो बनाउने धुलो (Toromi)',
          questionJp: '水分でむせやすい高齢者の飲み物には、とろみ剤を加えて適度な粘度をつけることで誤嚥を予防する。',
          questionNe: 'पानी पिउँदा खोकी लाग्ने वृद्धवृद्धाको पेय पदार्थमा तोरोमी (Toromi) धुलो मिसाएर बाक्लो बनाउँदा स्वास नलीमा जानबाट रोक्न सकिन्छ।',
          options: [{ textJp: '○（[正|ただ]しい）', textNe: '○ (सही)' }, { textJp: '×（[誤|あやま]り）', textNe: '× (गलत)' }],
          correctAnswer: 0,
          explanationJp: '正しいです。サラサラした液体は喉を早く通過して気管に入りやすいため、とろみをつけてゆっくり喉を通るようにします。',
          explanationNe: 'सही हो। पातलो पानी घाँटीबाट छिटो खसेर स्वास नलीमा छिर्ने खतरा हुने भएकाले बाक्लो बनाएर बिस्तारै निल्न मद्दत गरिन्छ।',
          diagramKey: 'choking-prevention'
        },
        {
          id: 'k2-q3',
          number: 3,
          type: 'CHOICE',
          category: 'HYGIENE_CARE',
          categoryNameJp: '[口腔|こうくう]ケア（[歯磨|はみが]き）',
          categoryNameNe: 'मुख तथा दाँतको हेरचाह',
          questionJp: '片麻痺（かたまひ）のある利用者の口腔ケアを行う際、特に食べかすが残りやすく注意して清掃すべき部位はどこですか。',
          questionNe: 'एकापट्टि पक्षघात (Hemiplegia) भएका बिरामीको मुख सफा गर्दा खानाका टुक्राहरू अड्किने हुनाले विशेष ध्यान दिनुपर्ने भाग कुन हो?',
          options: [
            { textJp: '[健側|けんそく]（麻痺のない側）の頬の内側', textNe: 'राम्रो (असर नभएको) गालाको भित्री भाग' },
            { textJp: '[麻痺側|まひそく]（動かない側）の頬の内側や歯茎の間', textNe: 'पक्षघात भएको (प्यारालाइसिस) गालाको भित्री भाग र गिजा बिच' },
            { textJp: '前歯の表面のみ', textNe: 'अगाडिका दाँतको सतह मात्र' },
            { textJp: '喉の奥深く', textNe: 'घाँटीको भित्री गहिराइ' }
          ],
          correctAnswer: 1,
          explanationJp: '麻痺側は感覚が鈍く筋肉が動かないため、食べかすが頬の内側や歯茎の間に溜まりやすく、誤嚥性肺炎の原因になります。',
          explanationNe: 'पक्षघात भएको तर्फको भाग चल्न नसक्ने र थाहा नपाउने भएकाले खानाका टुक्राहरू त्यतै अड्किन्छन्, जसलाई ध्यानपूर्वक सफा गर्नुपर्छ।',
          diagramKey: 'hemiplegia-transfer'
        }
      ]
    },
    3: {
      id: 'KAIGO_SET_3',
      sectorKey: 'nursing',
      sectorName: 'Caregiving (Kaigo)',
      sectorKanji: '介護認知症ケア・コミュニケーション試験',
      sectorIcon: '🏥',
      setNumber: 3,
      titleJp: '介護[認知症|にんちしょう]ケア・[尊厳|そんげん]コミュニケーション[特化模擬試験|とっかもぎしけん]（第3回）',
      titleNe: 'हेरचाह (काइगो) विशेष सीप नं. १ — डिमेन्सिया ४ प्रकार र बिरामी मर्यादा परीक्षा (सेट ३)',
      subtitleJp: 'アルツハイマー・レビー小体・血管性・前頭側頭型認知症の鑑別対応',
      subtitleNe: 'अल्जाइमर, लेवी बडी, भास्कुलर र फ्रन्टो-टेम्पोरल डिमेन्सियाका लक्षण र कुराकानीका नियम',
      durationMinutes: 60,
      totalQuestions: 45,
      passPercentage: 60,
      passScore: 27,
      organizer: '厚生労働省 (MHLW) / Prometric CBT',
      questions: [
        {
          id: 'k3-q1',
          number: 1,
          type: 'TF',
          category: 'DEMENTIA_CARE',
          categoryNameJp: '[認知症|にんちしょう]への[対応|たいおう]',
          categoryNameNe: 'डिमेन्सियाका बिरामीसँगको व्यवहार',
          questionJp: '認知症の利用者が「財布を盗まれた」と言っているとき、「そんなはずはありません、勘違いですよ」と強く否定して間違いを正すのがよい。',
          questionNe: 'डिमेन्सियाका बिरामीले "मेरो पर्स चोरी भयो" भन्दा, "त्यस्तो हुनै सक्दैन, तपाईंको भ्रम हो" भनेर कडा शब्दमा खण्डन गर्नुपर्छ।',
          options: [{ textJp: '○（[正|ただ]しい）', textNe: '○ (सही)' }, { textJp: '×（[誤|あやま]り）', textNe: '× (गलत)' }],
          correctAnswer: 1,
          explanationJp: '誤りです。否定すると利用者は強い不安や孤立感、怒りを感じます。「それは心配ですね、一緒に探しましょう」と共感と安心感を与える対応が基本です。',
          explanationNe: 'गलत हो। खण्डन गर्दा बिरामीमा डर र रिस बढ्छ। "कति चिन्ता लाग्यो होला, आउनुहोस् सँगै खोजौं" भनेर सहानुभूति र सुरक्षाको अनुभूति दिनुपर्छ।',
          diagramKey: 'dementia-classification'
        },
        {
          id: 'k3-q2',
          number: 2,
          type: 'CHOICE',
          category: 'DEMENTIA_CARE',
          categoryNameJp: 'レビー[小体型|しょうたいがた]認知症の[特徴|とくちょう]',
          categoryNameNe: 'लेवी बडी डिमेन्सियाको प्रमुख लक्षण',
          questionJp: '「壁に虫がたくさん這っている」「知らない子供が部屋に立っている」など、実際には存在しないものが鮮明に見える「幻視（げんし）」が特徴的な認知症はどれですか。',
          questionNe: '"भित्तामा किराहरू हिँडिरहेका छन्", "कोठामा नचिनेको बच्चा उभिरहेको छ" जस्ता नभएको कुरा देखिने (Hallucination) कुन डिमेन्सियाको मुख्य लक्षण हो?',
          options: [
            { textJp: 'アルツハイマー型認知症', textNe: 'अल्जाइमर डिमेन्सिया (स्मरणशक्ति हराउने)' },
            { textJp: '血管性（けっかんせい）認知症', textNe: 'भास्कुलर डिमेन्सिया (मस्तिष्कघातपछिको)' },
            { textJp: 'レビー小体型（しょうたいがた）認知症', textNe: 'लेवी बडी डिमेन्सिया (Lewy Body Dementia)' },
            { textJp: '前頭側頭型（ぜんとうそくとうがた）認知症', textNe: 'फ्रन्टो-टेम्पोरल डिमेन्सिया (अस्वभाविक व्यवहार)' }
          ],
          correctAnswer: 2,
          explanationJp: 'レビー小体型認知症の最大の特徴は、具体的で鮮明な「幻視」と、パーキンソン症状（手足の震え・小刻み歩行）です。',
          explanationNe: 'लेवी बडी डिमेन्सियाको मुख्य विशेषता स्पष्ट भ्रम देखिनु (Visual Hallucination) र पार्किन्सन्स जस्तो हात काम्नु हो।',
          diagramKey: 'dementia-classification'
        }
      ]
    },
    4: {
      id: 'KAIGO_SET_4',
      sectorKey: 'nursing',
      sectorName: 'Caregiving (Kaigo)',
      sectorKanji: '介護褥瘡予防・排泄介助技能評価試験',
      sectorIcon: '🏥',
      setNumber: 4,
      titleJp: '介護[褥瘡予防|じょくそうよぼう]・[排泄介助|はいせつかいじょ][特化模擬試験|とっかもぎしけん]（第4回）',
      titleNe: 'हेरचाह (काइगो) विशेष सीप नं. १ — घाउ हुन नदिने र दिसापिसाब सहयोग परीक्षा (सेट ४)',
      subtitleJp: '2時間ごとの体位変換・仙骨部圧迫解除・ポータブルトイレ誘導',
      subtitleNe: 'ओछ्यानमा घाउ (Bedsore) हुन नदिन हरेक २ घण्टामा कोल्टे फेराउने, मर्यादा र डायपर नियम',
      durationMinutes: 60,
      totalQuestions: 45,
      passPercentage: 60,
      passScore: 27,
      organizer: '厚生労働省 (MHLW) / Prometric CBT',
      questions: [
        {
          id: 'k4-q1',
          number: 1,
          type: 'TF',
          category: 'BEDSORE_PREVENTION',
          categoryNameJp: '[褥瘡|じょくそう]（床ずれ）の[予防|よぼう]',
          categoryNameNe: 'ओछ्यानको घाउ (Pressure Ulcer) रोकथाम',
          questionJp: '寝たきりの利用者は、仙骨部（せんこつぶ）や踵（かかと）に褥瘡ができやすいため、少なくとも2時間ごとに体位変換を行う。',
          questionNe: 'ओछ्यानमा सुतिरहनुपर्ने बिरामीको कम्मरको तल्लो हाड (Sacrum) र कुर्कुच्चामा घाउ हुने जोखिम हुने भएकाले कम्तीमा हरेक २ घण्टामा कोल्टे फेराउनुपर्छ।',
          options: [{ textJp: '○（[正|ただ]しい）', textNe: '○ (सही)' }, { textJp: '×（[誤|あやま]り）', textNe: '× (गलत)' }],
          correctAnswer: 0,
          explanationJp: '正しいです。骨が突出している部位が長時間圧迫されて血流が途絶えると皮膚が壊死するため、原則2時間以内の体位変換が必須です。',
          explanationNe: 'सही हो। हाड उठेको भागमा लामो समय थिचिएर रक्तसञ्चार रोकिँदा छाला कुहिने भएकाले कम्तीमा हरेक २ घण्टामा शरीरको पोजिसन फेर्नुपर्छ।',
          diagramKey: 'pressure-ulcers'
        }
      ]
    },
    5: {
      id: 'KAIGO_SET_5',
      sectorKey: 'nursing',
      sectorName: 'Caregiving (Kaigo)',
      sectorKanji: '介護全国統一本番想定総合評価試験',
      sectorIcon: '🏥',
      setNumber: 5,
      titleJp: '介護[全国統一|ぜんこくとういつ][本番想定|ほんばんそうてい][総合評価試験|そうごうひょうかしけん]（第5回）',
      titleNe: 'हेरचाह (काइगो) विशेष सीप नं. १ — राष्ट्रिय अन्तिम सिमुलेटर नमुना परीक्षा (सेट ५)',
      subtitleJp: '介護倫理・事故予防・緊急時救急・申し送り記録の総合45問',
      subtitleNe: 'केयरगिभिङ दर्शन, दुर्घटना रोकथाम, लड्दाको प्राथमिक उपचार र ड्युटी ह्यान्डओभर रिपोर्टिङ',
      durationMinutes: 60,
      totalQuestions: 45,
      passPercentage: 60,
      passScore: 27,
      organizer: '厚生労働省 (MHLW) / Prometric CBT',
      questions: [
        {
          id: 'k5-q1',
          number: 1,
          type: 'TF',
          category: 'ETHICS',
          categoryNameJp: '介護の[基本倫理|きほんりんり]',
          categoryNameNe: 'हेरचाहको आधारभूत आचारसंहिता',
          questionJp: '利用者の着替えを行う際、他の利用者や職員から見えないようにカーテンやドアを閉めてプライバシーを守る。',
          questionNe: 'बिरामीको लुगा फेराइदिँदा अरू मानिस वा कर्मचारीले नदेखुन् भनेर पर्दा वा ढोका लगाएर गोपनीयता (Privacy) को रक्षा गर्नुपर्छ।',
          options: [{ textJp: '○（[正|ただ]しい）', textNe: '○ (सही)' }, { textJp: '×（[誤|あやま]り）', textNe: '× (गलत)' }],
          correctAnswer: 0,
          explanationJp: '正しいです。利用者の羞恥心（恥ずかしい気持ち）に配慮し、肌の露出を最小限に抑え、カーテンを閉めることが介護倫理の基本です。',
          explanationNe: 'सही हो। बिरामीको लाज र मर्यादाको सम्मान गर्दै पर्दा लगाएर शरीर धेरै नदेखिने गरी लुगा फेराइदिनु काइगोको पहिलो सिद्धान्त हो।',
          diagramKey: 'dakken-chakkan'
        }
      ]
    }
  },

  // ==========================================
  // 3. FOOD SERVICE / GAISHOKU (外食業)
  // ==========================================
  'food-service': {
    1: {
      id: 'FOOD_SET_1',
      sectorKey: 'food-service',
      sectorName: 'Food Service',
      sectorKanji: '外食業特定技能1号技能測定試験',
      sectorIcon: '🍽️',
      setNumber: 1,
      titleJp: '外食業[特定技能|とくていぎのう]1[号|ごう] [本番形式|ほんばんけいしき] [総合模擬試験|そうごうもぎしけん]（第1回・HACCP・衛生）',
      titleNe: 'रेस्टुरेन्ट तथा खाना सेवा विशेष सीप परीक्षा — नमुना परीक्षा सेट १ (HACCP र खाद्य सरसफाइ)',
      subtitleJp: '一般社団法人外国人食品産業技能評価機構（OTAFF）[基準準拠|きじゅんじゅんきょ]',
      subtitleNe: 'HACCP अन्तर्राष्ट्रिय सरसफाइ मापदण्ड, खाद्य विषाक्तता रोक्ने ३ सिद्धान्त र हात धुने ७ चरण',
      durationMinutes: 80,
      totalQuestions: 30,
      passPercentage: 65,
      passScore: 20,
      organizer: '一般社団法人外国人食品産業技能評価機構 (OTAFF) / Prometric CBT',
      questions: [
        {
          id: 'fs1-q1',
          number: 1,
          type: 'TF',
          category: 'HYGIENE_SAFETY',
          categoryNameJp: '[食中毒予防|しょくちゅうどくよぼう]の3[原則|げんそく]',
          categoryNameNe: 'फुड पोइजनिङ रोक्ने ३ सिद्धान्त',
          questionJp: '食中毒予防の3原則は、細菌を「つけない」「増やさない」「やっつける」である。',
          questionNe: 'खाद्य विषाक्तता (Food Poisoning) रोक्ने ३ सिद्धान्तहरू ब्याक्टेरिया "लाग्न नदिने", "बढ्न नदिने" र "नष्ट गर्ने" हुन्।',
          options: [{ textJp: '○（[正|ただ]しい）', textNe: '○ (सही)' }, { textJp: '×（[誤|あやま]り）', textNe: '× (गलत)' }],
          correctAnswer: 0,
          explanationJp: '正しいです。「つけない（清潔・手洗い）」「増やさない（迅速・低温保管）」「やっつける（加熱殺菌）」が食中毒予防の3大原則です。',
          explanationNe: 'सही हो। सरसफाइले जीवाणु लाग्न नदिने, फ्रिजमा राखेर बढ्न नदिने र आगोमा राम्ररी पकाएर मार्ने नै ३ मुख्य नियम हुन्।',
        },
        {
          id: 'fs1-q2',
          number: 2,
          type: 'TF',
          category: 'HYGIENE_SAFETY',
          categoryNameJp: 'ノロウイルス[対策|たいさく]',
          categoryNameNe: 'नोरोभाइरस रोकथाम',
          questionJp: 'ノロウイルスはアルコール消毒液をかけるだけで完全に死滅するため、加熱処理は必要ない。',
          questionNe: 'नोरोभाइरसलाई रक्सी/अल्कोहलले छर्कंदा तुरुन्तै मर्ने भएकाले खाना तताउनु वा पकाउनु पर्दैन।',
          options: [{ textJp: '○（[正|ただ]しい）', textNe: '○ (सही)' }, { textJp: '×（[誤|あやま]り）', textNe: '× (गलत)' }],
          correctAnswer: 1,
          explanationJp: '誤りです。ノロウイルスはアルコールに強い抵抗力があります。死滅させるには、中心温度85〜90℃以上で90秒以上の加熱、または次亜塩素酸ナトリウム（塩素系）での消毒が必要です。',
          explanationNe: 'गलत हो। नोरोभाइरसमा अल्कोहलले काम गर्दैन। यसलाई मार्न खानाको भित्री भाग ८५-९० डिग्रीमा ९० सेकेन्डसम्म तताउनुपर्छ वा सोडियम हाइपोक्लोराइट प्रयोग गर्नुपर्छ।',
          examTrapJp: '「アルコールで死滅する」はOTAFF試験の定番引っかけ問題です！',
          examTrapNe: '"अल्कोहलले नोरोभाइरस मर्छ" भन्नु परीक्षाको मुख्य झुक्याउने प्रश्न हो।'
        },
        {
          id: 'fs1-q3',
          number: 3,
          type: 'CHOICE',
          category: 'COOKING_HYGIENE',
          categoryNameJp: '[加熱調理|かねつちょうり]の[基準|きじゅん]',
          categoryNameNe: 'मासु पकाउँदाको आधिकारिक तापक्रम',
          questionJp: '食中毒菌を死滅させるため、一般的な肉料理の加熱調理において中心部が到達すべき温度と時間はどれですか。',
          questionNe: 'ब्याक्टेरिया नष्ट गर्न मासु पकाउँदा भित्री भाग (Core) कति तापक्रममा कति समय पाक्नुपर्छ?',
          options: [
            { textJp: '中心温度 60℃ で 10秒間', textNe: 'भित्री तापक्रम ६० डिग्रीमा १० सेकेन्ड' },
            { textJp: '中心温度 75℃ 以上で 1分間以上', textNe: 'भित्री तापक्रम ७५ डिग्री वा माथि १ मिनेटभन्दा बढी' },
            { textJp: '中心温度 100℃ で 10分間', textNe: 'भित्री तापक्रम १०० डिग्रीमा १० मिनेट' },
            { textJp: '表面に焼き色がつけば時間は問わない', textNe: 'सतहमा रातो रङ आएपछि समय चाहिँदैन' }
          ],
          correctAnswer: 1,
          explanationJp: '大量調理施設衛生管理マニュアルおよびHACCP基準では、「中心部が75℃以上で1分間以上（ノロウイルス汚染のおそれがある二枚貝等は85〜90℃以上で90秒以上）」と定められています。',
          explanationNe: 'HACCP मापदण्ड अनुसार मासुको भित्री भाग कम्तीमा ७५ डिग्रीमा १ मिनेटसम्म पाकेको हुनुपर्छ।',
        }
      ]
    },
    2: {
      id: 'FOOD_SET_2',
      sectorKey: 'food-service',
      sectorName: 'Food Service',
      sectorKanji: '外食業調理仕込み・アレルギー管理試験',
      sectorIcon: '🍽️',
      setNumber: 2,
      titleJp: '外食業[調理仕込|ちょうりしこ]み・[アレルゲン管理|あれるげんかんり][特化模擬試験|とっかもぎしけん]（第2回）',
      titleNe: 'रेस्टुरेन्ट तथा खाना सेवा — एलर्जी नियन्त्रण र भान्छा पूर्वतयारी परीक्षा (सेट २)',
      subtitleJp: '特定原材料8品目（義務表示）・まな板色分け・急速解凍ルール',
      subtitleNe: 'जापानमा अनिवार्य ८ प्रकारका एलर्जी खाद्य, मासु-तरकारीका छुट्टाछुट्टै चपिङ बोर्ड र फ्रिज नियम',
      durationMinutes: 80,
      totalQuestions: 30,
      passPercentage: 65,
      passScore: 20,
      organizer: '一般社団法人外国人食品産業技能評価機構 (OTAFF) / Prometric CBT',
      questions: [
        {
          id: 'fs2-q1',
          number: 1,
          type: 'TF',
          category: 'ALLERGENS',
          categoryNameJp: '食物アレルギーの[義務表示|ぎむひょうじ]',
          categoryNameNe: 'अनिवार्य खाद्य एलर्जी वस्तुहरू',
          questionJp: '日本の食品表示法で表示が義務付けられている「特定原材料8品目」には、卵・乳・小麦・えび・かに・そば・落花生・くるみが含まれる。',
          questionNe: 'जापानको कानुन अनुसार अनिवार्य रूपमा खुलाउनुपर्ने ८ प्रमुख एलर्जी खाद्यहरूमा अण्डा, दूध, गहुँ, झिँगेमाछा, गँगटो, फापर, बदाम र ओखर पर्दछन्।',
          options: [{ textJp: '○（[正|ただ]しい）', textNe: '○ (सही)' }, { textJp: '×（[誤|あやま]り）', textNe: '× (गलत)' }],
          correctAnswer: 0,
          explanationJp: '正しいです。くるみ（Walnut）は近年追加され、現在は「特定原材料8品目」として完全表示義務があります。',
          explanationNe: 'सही हो। हालै ओखर (くるみ) थपिएर अब ८ वटा खाद्य वस्तुहरू अनिवार्य उल्लेख गर्नुपर्ने नियम छ।',
        }
      ]
    },
    3: {
      id: 'FOOD_SET_3',
      sectorKey: 'food-service',
      sectorName: 'Food Service',
      sectorKanji: '外食業接客サービス・敬語対話試験',
      sectorIcon: '🍽️',
      setNumber: 3,
      titleJp: '外食業[接客|せっきゃく]サービス・[飲食敬語|いんしょくけいご][特化模擬試験|とっかもぎしけん]（第3回）',
      titleNe: 'रेस्टुरेन्ट तथा खाना सेवा — ग्राहक सेवा र आदरार्थी भाषा (Keigo) परीक्षा (सेट ३)',
      subtitleJp: 'いらっしゃいませ・お席のご案内・オーダー復唱・会計マナー',
      subtitleNe: 'ग्राहक स्वागत, अर्डर टिप्ने र दोहोर्याउने तरिका, क्यास काउन्टर र शिष्टाचार',
      durationMinutes: 80,
      totalQuestions: 30,
      passPercentage: 65,
      passScore: 20,
      organizer: '一般社団法人外国人食品産業技能評価機構 (OTAFF) / Prometric CBT',
      questions: [
        {
          id: 'fs3-q1',
          number: 1,
          type: 'CHOICE',
          category: 'CUSTOMER_SERVICE',
          categoryNameJp: 'オーダーの[復唱確認|ふくしょうかくにん]',
          categoryNameNe: 'ग्राहकको अर्डर दोहोर्याउने भाषा',
          questionJp: 'お客様から注文を受けた直後、聞き間違いを防ぐために言う最も丁寧な日本語はどれですか。',
          questionNe: 'ग्राहकबाट अर्डर टिपिसकेपछि गल्ती नहोस् भनेर दोहोर्याउन के भनिन्छ?',
          options: [
            { textJp: '「以上で終わりですか？」', textNe: '"यतिमै सकियो त?"' },
            { textJp: '「ご注文を繰り返させていただきます（復唱いたします）。」', textNe: '"हजुरको अर्डर म दोहोर्याएर पढेर सुनाउँछु।"' },
            { textJp: '「合っているか見てください。」', textNe: '"मिलेको छ कि छैन हेर्नुहोस्।"' },
            { textJp: '「すぐ持ってきます。」', textNe: '"तुरुन्तै लिएर आउँछु।"' }
          ],
          correctAnswer: 1,
          explanationJp: '「ご注文を復唱（ふくしょう）させていただきます」と確認してから料理名と数量を読み上げるのが接客の基本です。',
          explanationNe: '"Gochuumon o fukushou sasete itadakimasu" भनेर अर्डर स्पष्ट पढेर सुनाउनुपर्छ।',
        }
      ]
    },
    4: {
      id: 'FOOD_SET_4',
      sectorKey: 'food-service',
      sectorName: 'Food Service',
      sectorKanji: '外食業厨房安全・機器メンテナンス試験',
      sectorIcon: '🍽️',
      setNumber: 4,
      titleJp: '外食業[厨房安全|ちゅうぼうあんぜん]・[機器操作|ききそうさ][特化模擬試験|とっかもぎしけん]（第4回）',
      titleNe: 'रेस्टुरेन्ट तथा खाना सेवा — भान्छा सुरक्षा र मेसिन मर्मत परीक्षा (सेट ४)',
      subtitleJp: 'フライヤー油火傷防止・包丁消毒・滑り転倒対策',
      subtitleNe: 'तातो तेलको पोलाईबाट जोगिने, चक्कु सरसफाइ र भान्छामा चिप्लिन नदिने जुत्ताको प्रयोग',
      durationMinutes: 80,
      totalQuestions: 30,
      passPercentage: 65,
      passScore: 20,
      organizer: 'OTAFF / Prometric CBT',
      questions: [
        {
          id: 'fs4-q1',
          number: 1,
          type: 'TF',
          category: 'KITCHEN_SAFETY',
          categoryNameJp: 'フライヤー（揚げ物機）の安全',
          categoryNameNe: 'फ्राई गर्ने मेसिनको सुरक्षा',
          questionJp: 'フライヤーの高温の油に水滴がついた食材を一気に入れると、油が激しく飛び散って火傷や火災の危険がある。',
          questionNe: 'तातो तेलमा पानीको थोपा भएको खाना हतारमा एकैपटक खसाल्दा तेल उछिट्टिएर पोल्ने वा आगो लाग्ने खतरा हुन्छ।',
          options: [{ textJp: '○（[正|ただ]しい）', textNe: '○ (सही)' }, { textJp: '×（[誤|あやま]り）', textNe: '× (गलत)' }],
          correctAnswer: 0,
          explanationJp: '正しいです。油と水は激しく突沸（とっぷつ）するため、食材の表面の水分はしっかり拭き取ってから静かに入れます。',
          explanationNe: 'सही हो। तेल र पानी पर्दा विस्फोट जस्तै उछिट्टिने भएकाले खानाको पानी पुछेर बिस्तारै हाल्नुपर्छ।',
        }
      ]
    },
    5: {
      id: 'FOOD_SET_5',
      sectorKey: 'food-service',
      sectorName: 'Food Service',
      sectorKanji: '外食業全国統一総合本番シミュレータ',
      sectorIcon: '🍽️',
      setNumber: 5,
      titleJp: '外食業[全国統一|ぜんこくとういつ][本番想定|ほんばんそうてい][総合評価模擬試験|そうごうひょうかもぎしけん]（第5回）',
      titleNe: 'रेस्टुरेन्ट तथा खाना सेवा — राष्ट्रिय अन्तिम स्तर निर्धारण पूर्ण परीक्षा (सेट ५)',
      subtitleJp: '衛生法規・アレルギー誤配防止・グリストラップ清掃の集大成30問',
      subtitleNe: 'रेगुलेसन, गलत टेबलमा खाना जान नदिने सतर्कता र ग्रिज ट्र्याप सफाइ सम्बन्धी अन्तिम परीक्षा',
      durationMinutes: 80,
      totalQuestions: 30,
      passPercentage: 65,
      passScore: 20,
      organizer: 'OTAFF / Prometric CBT',
      questions: [
        {
          id: 'fs5-q1',
          number: 1,
          type: 'TF',
          category: 'HYGIENE_SAFETY',
          categoryNameJp: '従業員の体調管理',
          categoryNameNe: 'कर्मचारीको स्वास्थ्य जाँच',
          questionJp: '下痢（げり）や嘔吐（おうと）、発熱がある従業員は、使い捨て手袋を着用していれば調理作業を行ってもよい。',
          questionNe: 'झाडापखाला, बान्ता वा ज्वरो आएको कर्मचारीले प्लास्टिकको पञ्जा लगाएर खाना पकाउने काम गर्न मिल्छ।',
          options: [{ textJp: '○（[正|ただ]しい）', textNe: '○ (सही)' }, { textJp: '×（[誤|あやま]り）', textNe: '× (गलत)' }],
          correctAnswer: 1,
          explanationJp: '誤りです。下痢や嘔吐がある場合はノロウイルス等の感染が強く疑われるため、手袋をしていても直ちに調理業務から外れ、責任者に報告しなければなりません。',
          explanationNe: 'गलत हो। झाडापखाला वा बान्ता भएमा नोरोभाइरस सर्न सक्ने भएकाले पञ्जा लगाए पनि भान्छामा काम गर्न पूर्ण निषेध छ।',
        }
      ]
    }
  },

  // ==========================================
  // 4. AGRICULTURE (農業)
  // ==========================================
  'agriculture': {
    1: {
      id: 'AGRI_SET_1',
      sectorKey: 'agriculture',
      sectorName: 'Agriculture',
      sectorKanji: '農業技能測定試験（耕種・畜産）',
      sectorIcon: '🌾',
      setNumber: 1,
      titleJp: '農業[技能測定試験|ぎのうそくていしけん] [本番形式|ほんばんけいしき] [総合模擬試験|そうごうもぎしけん]（第1回・土壌・栽培）',
      titleNe: 'कृषि विशेष सीप परीक्षा — नमुना परीक्षा सेट १ (माटो, मलखाद र बाली रोपाईं)',
      subtitleJp: '一般社団法人全国農業会議所 [基準準拠|きじゅんじゅんきょ]',
      subtitleNe: 'माटोको pH मान, NPK रासायनिक मलको अनुपात र तरकारीका बेर्ना सार्ने विधि सम्बन्धी परीक्षा',
      durationMinutes: 60,
      totalQuestions: 30,
      passPercentage: 60,
      passScore: 18,
      organizer: '一般社団法人全国農業会議所 / Prometric CBT',
      questions: [
        {
          id: 'ag1-q1',
          number: 1,
          type: 'CHOICE',
          category: 'SOIL_FERTILIZER',
          categoryNameJp: '[肥料|ひりょう]の3[大要素|だいようそ]',
          categoryNameNe: 'रासायनिक मलका ३ मुख्य तत्वहरू (NPK)',
          questionJp: '作物の成長に欠かせない「肥料の3大要素」の組み合わせとして正しいものはどれですか。',
          questionNe: 'बालीनाली सप्रन अत्यावश्यक रासायनिक मलका ३ मुख्य तत्वहरू कुन-कुन हुन्?',
          options: [
            { textJp: '窒素（N）・リン酸（P）・加里（カリウム・K）', textNe: 'नाइट्रोजन (N), फस्फोरस (P), पोटास (K)' },
            { textJp: '鉄・カルシウム・マグネシウム', textNe: 'फलाम, क्याल्सियम, म्याग्नेसियम' },
            { textJp: '水素・酸素・炭素', textNe: 'हाइड्रोजन, अक्सिजन, कार्बन' },
            { textJp: '塩分・糖分・ビタミン', textNe: 'नुन, चिनी, भिटामिन' }
          ],
          correctAnswer: 0,
          explanationJp: '窒素（葉肥え）・リン酸（実肥え・花肥え）・カリウム（根肥え）が作物の3大栄養素です。',
          explanationNe: 'नाइट्रोजनले पात, फस्फोरसले फूल/फल र पोटासले जरा बलियो बनाउँछ। यी N-P-K मुख्य मल हुन्।',
        },
        {
          id: 'ag1-q2',
          number: 2,
          type: 'TF',
          category: 'CULTIVATION',
          categoryNameJp: '野菜の予冷（よれい）',
          categoryNameNe: 'बाली भित्र्याएपछिको पूर्व-शीतलन',
          questionJp: '収穫したばかりの野菜は、畑の熱（品温）を下げるため、速やかに予冷庫に入れて鮮度を保つ。',
          questionNe: 'बारीबाट भर्खरै टिपिएको तरकारीको तातोपन घटाउन तुरुन्तै चिसो कोठा (Pre-cooling) मा राखेर ताजापन जोगाइन्छ।',
          options: [{ textJp: '○（[正|ただ]しい）', textNe: '○ (सही)' }, { textJp: '×（[誤|あやま]り）', textNe: '× (गलत)' }],
          correctAnswer: 0,
          explanationJp: '正しいです。収穫後の呼吸熱を奪って鮮度劣化や腐敗を防ぐため、迅速な予冷が極めて重要です。',
          explanationNe: 'सही हो। टिपिसकेपछि तरकारीको तापक्रम घटाउन तुरुन्तै प्रि-कुलिङ गर्दा धेरै दिनसम्म ताजा रहन्छ।',
        }
      ]
    },
    2: {
      id: 'AGRI_SET_2',
      sectorKey: 'agriculture',
      sectorName: 'Agriculture',
      sectorKanji: '施設園芸・ハウス環境制御試験',
      sectorIcon: '🌾',
      setNumber: 2,
      titleJp: '農業[施設園芸|しせつえんげい]・ハウス[環境制御|かんきょうせいぎょ][特化模擬試験|とっかもぎしけん]（第2回）',
      titleNe: 'कृषि विशेष सीप परीक्षा — ग्रीनहाउस तापक्रम र आर्द्रता नियन्त्रण परीक्षा (सेट २)',
      subtitleJp: 'ビニールハウス換気・遮光カーテン・うどんこ病対策',
      subtitleNe: 'ग्रीनहाउसको हावा आवतजावत, छायाँ पर्दा, थोपा सिँचाइ र ढुसीजन्य रोग रोकथाम',
      durationMinutes: 60,
      totalQuestions: 30,
      passPercentage: 60,
      passScore: 18,
      organizer: '一般社団法人全国農業会議所 / Prometric CBT',
      questions: [
        {
          id: 'ag2-q1',
          number: 1,
          type: 'TF',
          category: 'GREENHOUSE',
          categoryNameJp: 'ハウスの温度管理',
          categoryNameNe: 'ग्रीनहाउसको तापक्रम व्यवस्थापन',
          questionJp: '夏の晴天時はハウス内が高温になりすぎないよう、側窓や天窓を開けて換気を行う。',
          questionNe: 'गर्मी महिनामा घाम लाग्दा ग्रीनहाउस भित्र अत्यधिक तातो हुन नदिन छेउका र छतका झ्याल खोलेर हावा खेलाइनु पर्छ।',
          options: [{ textJp: '○（[正|ただ]しい）', textNe: '○ (सही)' }, { textJp: '×（[誤|あやま]り）', textNe: '× (गलत)' }],
          correctAnswer: 0,
          explanationJp: '正しいです。ハウス内が高温・多湿になると作物の生育障害や病気が発生するため、窓の開閉や遮光ネットで調節します。',
          explanationNe: 'सही हो। धेरै तातो र गुम्सिँदा बिरुवा ओइलाउने र रोग लाग्ने भएकाले झ्याल खोलेर भेन्टिलेसन गरिन्छ।',
        }
      ]
    },
    3: {
      id: 'AGRI_SET_3',
      sectorKey: 'agriculture',
      sectorName: 'Agriculture',
      sectorKanji: '農薬散布・安全防護具試験',
      sectorIcon: '🌾',
      setNumber: 3,
      titleJp: '農業[農薬散布|のうやくさんぷ]・[安全防護具|あんぜんぼうごぐ][特化模擬試験|とっかもぎしけん]（第3回）',
      titleNe: 'कृषि विशेष सीप परीक्षा — कीटनाशक विषादी छर्ने र सुरक्षा कवच परीक्षा (सेट ३)',
      subtitleJp: '農薬希釈・風上からの散布・防護マスク着用ルール',
      subtitleNe: 'विषादीको घोल बनाउने तरिका, हावाको दिशा अनुसार छर्ने नियम र मास्क/चस्माको प्रयोग',
      durationMinutes: 60,
      totalQuestions: 30,
      passPercentage: 60,
      passScore: 18,
      organizer: '一般社団法人全国農業会議所 / Prometric CBT',
      questions: [
        {
          id: 'ag3-q1',
          number: 1,
          type: 'TF',
          category: 'PESTICIDES',
          categoryNameJp: '農薬散布の風向き',
          categoryNameNe: 'विषादी छर्दा हावाको दिशा',
          questionJp: '農薬を散布するときは、薬液を浴びないように「風下（かざしも）」に立ち、「風上（かざかみ）」に向かって噴射する。',
          questionNe: 'विषादी छर्दा औषधि शरीरमा नपरोस् भनेर हावा बगेको तर्फ उभिएर हावा आएको दिशातिर छर्नुपर्छ।',
          options: [{ textJp: '○（[正|ただ]しい）', textNe: '○ (सही)' }, { textJp: '×（[誤|あやま]り）', textNe: '× (गलत)' }],
          correctAnswer: 1,
          explanationJp: '誤りです。風上に向かって噴射すると、自分に農薬が吹き戻って中毒事故を起こします。必ず「風上を背にして、風下に向かって」散布します。',
          explanationNe: 'गलत हो। हावा आएको दिशातर्फ छरेमा औषधि उडेर आफ्नै मुख र आँखामा पर्छ। सधैं हावालाई पछाडि पारेर अगाडितर्फ छर्नुपर्छ।',
          examTrapJp: '「風上に向かって」は危険な引っかけ問題です！',
          examTrapNe: '"हावाको दिशातर्फ मुख फर्काउने" भन्नु गम्भीर ट्र्याप हो।'
        }
      ]
    },
    4: {
      id: 'AGRI_SET_4',
      sectorKey: 'agriculture',
      sectorName: 'Agriculture',
      sectorKanji: '農業機械・トラクター安全操作試験',
      sectorIcon: '🌾',
      setNumber: 4,
      titleJp: '農業[機械安全|きかいあんぜん]・トラクター[操作管理|そうさかんり][特化模擬試験|とっかもぎしけん]（第4回）',
      titleNe: 'कृषि विशेष सीप परीक्षा — ट्रयाक्टर र कृषि मेसिन सुरक्षा परीक्षा (सेट ४)',
      subtitleJp: 'トラクターPTO回転軸巻き込まれ防止・傾斜地転倒対策',
      subtitleNe: 'ट्रयाक्टरको घुम्ने साफ्ट (PTO Shaft) मा लुगा बेरिन नदिने र भिरालो जमिनमा पल्टिनबाट जोगाउने',
      durationMinutes: 60,
      totalQuestions: 30,
      passPercentage: 60,
      passScore: 18,
      organizer: '一般社団法人全国農業会議所 / Prometric CBT',
      questions: [
        {
          id: 'ag4-q1',
          number: 1,
          type: 'TF',
          category: 'MACHINERY',
          categoryNameJp: 'トラクターの安全確認',
          categoryNameNe: 'ट्रयाक्टरको सुरक्षा जाँच',
          questionJp: 'トラクターを離れるときは、作業機を地面に下ろし、エンジンを止め、駐車ブレーキを確実に掛ける。',
          questionNe: 'ट्रयाक्टरबाट ओर्लनु अघि जोत्ने सामान जमिनमा बिसाउने, इन्जिन बन्द गर्ने र ह्यान्डब्रेक अनिवार्य लगाउनुपर्छ।',
          options: [{ textJp: '○（[正|ただ]しい）', textNe: '○ (सही)' }, { textJp: '×（[誤|あやま]り）', textNe: '× (गलत)' }],
          correctAnswer: 0,
          explanationJp: '正しいです。作業機を上げたまま放置すると油圧抜けで急降下して人を挟む事故が起きるため、必ず地面に接地させます。',
          explanationNe: 'सही हो। माथि उठाएर छाड्दा सामान खसेर मानिस किच्न सक्ने भएकाले जमिनमा टेकाएर ब्रेक लगाउनुपर्छ।',
        }
      ]
    },
    5: {
      id: 'AGRI_SET_5',
      sectorKey: 'agriculture',
      sectorName: 'Agriculture',
      sectorKanji: '農業全国統一模擬試験・最終総合判定',
      sectorIcon: '🌾',
      setNumber: 5,
      titleJp: '農業[全国統一|ぜんこくとういつ][本番想定|ほんばんそうてい][総合評価模擬試験|そうごうひょうかもぎしけん]（第5回）',
      titleNe: 'कृषि विशेष सीप परीक्षा — राष्ट्रिय अन्तिम सिमुलेटर नमुना परीक्षा (सेट ५)',
      subtitleJp: '家畜衛生管理・台風事前対策・熱中症予防の総合30問',
      subtitleNe: 'पशु फार्म जैविक सुरक्षा, आँधी-हुरी पूर्वतयारी, तातो हावा (Heatstroke) नियन्त्रणको अन्तिम परीक्षा',
      durationMinutes: 60,
      totalQuestions: 30,
      passPercentage: 60,
      passScore: 18,
      organizer: '一般社団法人全国農業会議所 / Prometric CBT',
      questions: [
        {
          id: 'ag5-q1',
          number: 1,
          type: 'TF',
          category: 'SAFETY_HEALTH',
          categoryNameJp: '熱中症予防',
          categoryNameNe: 'तातो हावा (Heatstroke) बाट जोगिने',
          questionJp: '夏の農作業中は、喉が渇いていなくても定期的に水分と塩分を補給する。',
          questionNe: 'गर्मीमा खेतबारीमा काम गर्दा तिर्खा नलागे पनि नियमित रूपमा पानी र नुनिलो झोल पिउनुपर्छ।',
          options: [{ textJp: '○（[正|ただ]しい）', textNe: '○ (सही)' }, { textJp: '×（[誤|あやま]り）', textNe: '× (गलत)' }],
          correctAnswer: 0,
          explanationJp: '正しいです。喉が渇いたと感じた時点ですでに脱水が始まっています。20〜30分おきに水分・塩分を補給します。',
          explanationNe: 'सही हो। तिर्खा लाग्नु भन्दा अगाडि नै डिहाइड्रेसन सुरु भइसकेको हुने भएकाले २०-३० मिनेटको अन्तरालमा पानी पिउनुपर्छ।',
        }
      ]
    }
  },

  // ==========================================
  // 5. CONSTRUCTION (建設分野)
  // ==========================================
  'construction': {
    1: {
      id: 'CONST_SET_1',
      sectorKey: 'construction',
      sectorName: 'Construction',
      sectorKanji: '建設分野特定技能1号評価試験',
      sectorIcon: '🏗️',
      setNumber: 1,
      titleJp: '建設[分野特定技能|ぶんやとくていぎのう]1[号|ごう] [総合模擬試験|そうごうもぎしけん]（第1回・KYK・安全衛生）',
      titleNe: 'निर्माण (Construction) विशेष सीप परीक्षा — नमुना परीक्षा सेट १ (KYK र सुरक्षा नियम)',
      subtitleJp: '一般社団法人建設技能人材機構（JAC）[基準準拠|きじゅんじゅんきょ]',
      subtitleNe: 'जोखिम पहिचान (KYK), औंलाले देखाएर बोल्ने नियम (指差呼称) र हेल्मेट सुरक्षा सम्बन्धी ३० प्रश्न',
      durationMinutes: 60,
      totalQuestions: 30,
      passPercentage: 60,
      passScore: 18,
      organizer: '一般社団法人建設技能人材機構 (JAC) / Prometric CBT',
      questions: [
        {
          id: 'con1-q1',
          number: 1,
          type: 'CHOICE',
          category: 'SAFETY_HEALTH',
          categoryNameJp: 'KYK（危険予知活動）',
          categoryNameNe: 'जोखिम पहिचान गतिविधि (KYK)',
          questionJp: '日本の建設現場で毎朝行われる「KYK」とは何の略称ですか。',
          questionNe: 'जापानको निर्माण कार्यस्थलमा हरेक बिहान गरिने "KYK" को पूरा रूप के हो?',
          options: [
            { textJp: '危険予知活動（きけん よち かつどう）', textNe: 'Kiken Yochi Katsudou (जोखिम पूर्वअनुमान गतिविधि)' },
            { textJp: '計画環境管理（けいかく かんきょう かんり）', textNe: 'Keikaku Kankyou Kanri' },
            { textJp: '緊急用具確認（きんきゅう ようぐ かくにん）', textNe: 'Kinkyuu Yougu Kakunin' },
            { textJp: '高所点検活動（こうしょ てんけん かつどう）', textNe: 'Kousho Tenken Katsudou' }
          ],
          correctAnswer: 0,
          explanationJp: 'KYKは「危険（K）・予知（Y）・活動（K）」の略です。作業前に「どんな危険が潜んでいるか」を全員で話し合い、対策を決定します。',
          explanationNe: 'काम सुरु गर्नु अगाडि के-कस्तो जोखिम हुन सक्छ भनी अग्रिम छलफल गरेर शून्य दुर्घटना बनाउने जापानी विधिलाई KYK भनिन्छ।',
        },
        {
          id: 'con1-q2',
          number: 2,
          type: 'TF',
          category: 'SAFETY_HEALTH',
          categoryNameJp: '指差呼称（しさこしょう）',
          categoryNameNe: 'औंलाले देखाएर चर्को स्वरमा बोल्ने (Pointing & Calling)',
          questionJp: '指差呼称（指を差して声に出して確認する）を行うことで、誤操作や不注意による事故の発生率を大幅に下げることができる。',
          questionNe: 'औंलाले औंल्याएर चर्को स्वरमा "〇〇よし！" भनेर पुष्टि गर्दा लापर्वाहीले हुने दुर्घटनाको सम्भावना निकै घट्छ।',
          options: [{ textJp: '○（[正|ただ]しい）', textNe: '○ (सही)' }, { textJp: '×（[誤|あやま]り）', textNe: '× (गलत)' }],
          correctAnswer: 0,
          explanationJp: '正しいです。実験により、指差呼称を行うことでエラー発生率が約6分の1に激減することが証明されています。',
          explanationNe: 'सही हो। औंलाले देखाएर ठूलो स्वरले बोल्दा ध्यान केन्द्रित भई गल्ती हुने सम्भावना ६ गुणा घट्छ।',
        }
      ]
    },
    2: {
      id: 'CONST_SET_2',
      sectorKey: 'construction',
      sectorName: 'Construction',
      sectorKanji: '高所作業・フルハーネス安全基準試験',
      sectorIcon: '🏗️',
      setNumber: 2,
      titleJp: '建設[高所作業|こうしょさぎょう]・フルハーネス[安全基準|あんぜんきじゅん][特化模擬試験|とっかもぎしけん]（第2回）',
      titleNe: 'निर्माण विशेष सीप परीक्षा — उचाइमा काम र फुल बडी हार्नेस परीक्षा (सेट २)',
      subtitleJp: '2メートル以上の高所基準・2丁掛けフック・足場隙間3cm以内',
      subtitleNe: '२ मिटरभन्दा अग्लो ठाउँमा अनिवार्य फुल हार्नेस, दुईवटा हुकको नियम (2丁掛け) र भर्याङ सुरक्षा',
      durationMinutes: 60,
      totalQuestions: 30,
      passPercentage: 60,
      passScore: 18,
      organizer: '一般社団法人建設技能人材機構 (JAC) / Prometric CBT',
      questions: [
        {
          id: 'con2-q1',
          number: 1,
          type: 'CHOICE',
          category: 'HEIGHT_SAFETY',
          categoryNameJp: '高所作業の基準高さ',
          categoryNameNe: 'उचाइको आधिकारिक मापदण्ड',
          questionJp: '日本の労働安全衛生法において、墜落防止措置（足場の設置やフルハーネス着用）が義務付けられている高さは何メートル以上ですか。',
          questionNe: 'जापानको श्रम ऐन अनुसार लड्नबाट जोगिन फुल बडी हार्नेस अनिवार्य लगाउनुपर्ने उचाइ कति मिटर वा माथि हो?',
          options: [
            { textJp: '1メートル以上', textNe: '१ मिटर वा माथि' },
            { textJp: '2メートル以上', textNe: '२ मिटर वा माथि (2 Meters)' },
            { textJp: '5メートル以上', textNe: '५ मिटर वा माथि' },
            { textJp: '10メートル以上', textNe: '१० मिटर वा माथि' }
          ],
          correctAnswer: 1,
          explanationJp: '高さ2メートル以上の箇所で作業を行う場合、足場の設置やフルハーネス型墜落制止用器具の使用が法令で義務付けられています。',
          explanationNe: 'जमिनबाट २ मिटर वा त्योभन्दा अग्लो स्थानमा काम गर्दा सुरक्षित खट वा हार्नेस अनिवार्य लगाउनुपर्छ।',
          examTrapJp: '「5メートル以上」と間違えやすいので注意。「2メートル」が絶対基準です！',
          examTrapNe: '"५ मिटर" नछान्नुहोस्। जापानमा २ मिटरबाटै कडा नियम सुरु हुन्छ।'
        }
      ]
    },
    3: {
      id: 'CONST_SET_3',
      sectorKey: 'construction',
      sectorName: 'Construction',
      sectorKanji: '電動工具・感電防止・安全装置試験',
      sectorIcon: '🏗️',
      setNumber: 3,
      titleJp: '建設[電動工具|でんどうこうぐ]・[感電防止|かんでんぼうし][特化模擬試験|とっかもぎしけん]（第3回）',
      titleNe: 'निर्माण विशेष सीप परीक्षा — पावर टुल्स र करेन्ट लाग्नबाट जोगिने नियम परीक्षा (सेट ३)',
      subtitleJp: 'ディスクグラインダー回転数・丸のこ安全カバー・漏電遮断器',
      subtitleNe: 'ग्राइन्डर मेसिनको गति, गोलो करौंतीको कभर र अर्थिङ लिकेज सर्किट ब्रेकर (ELCB)',
      durationMinutes: 60,
      totalQuestions: 30,
      passPercentage: 60,
      passScore: 18,
      organizer: '一般社団法人建設技能人材機構 (JAC) / Prometric CBT',
      questions: [
        {
          id: 'con3-q1',
          number: 1,
          type: 'TF',
          category: 'TOOLS_SAFETY',
          categoryNameJp: 'ディスクグラインダーの砥石',
          categoryNameNe: 'ग्राइन्डरको काट्ने चक्का (Wheel)',
          questionJp: 'ディスクグラインダーに砥石（といし）を取り付ける際は、本体の最高回転数よりも低い最高使用周速度の砥石を取り付けてもよい。',
          questionNe: 'ग्राइन्डरमा चक्का जोड्दा मेसिनको घुम्ने गतिभन्दा कम क्षमता भएको चक्का जोड्न मिल्छ।',
          options: [{ textJp: '○（[正|ただ]しい）', textNe: '○ (सही)' }, { textJp: '×（[誤|あやま]り）', textNe: '× (गलत)' }],
          correctAnswer: 1,
          explanationJp: '誤りです。許容回転数を超える砥石を取り付けると、作業中に砥石が破裂して破片が顔や身体に突き刺さる死亡事故につながります。必ず本体回転数以上の砥石を使用します。',
          explanationNe: 'गलत हो। मेसिनभन्दा कमजोर चक्का जोड्दा चक्का पड्किएर अनुहारमा छर्रा लागी ज्यान जान सक्छ। सधैं मेसिनको गति बराबर वा बढी क्षमताको चक्का प्रयोग गर्नुपर्छ।',
        }
      ]
    },
    4: {
      id: 'CONST_SET_4',
      sectorKey: 'construction',
      sectorName: 'Construction',
      sectorKanji: 'クレーン合図・玉掛けワイヤー安全試験',
      sectorIcon: '🏗️',
      setNumber: 4,
      titleJp: '建設クレーン[合図|あいず]・[玉掛|たまか]けワイヤー[安全基準試験|あんぜんきじゅんしけん]（第4回）',
      titleNe: 'निर्माण विशेष सीप परीक्षा — क्रेनका हातका संकेत र तार सुरक्षा परीक्षा (सेट ४)',
      subtitleJp: '標準手合図・ホイッスル合図・ワイヤーロープ廃棄基準10%',
      subtitleNe: 'क्रेन चालकलाई दिने हातका इसारा, सिट्ठीको ताल र १०% तार चुँडिएपछि डोरी फ्याँक्ने नियम',
      durationMinutes: 60,
      totalQuestions: 30,
      passPercentage: 60,
      passScore: 18,
      organizer: '一般社団法人建設技能人材機構 (JAC) / Prometric CBT',
      questions: [
        {
          id: 'con4-q1',
          number: 1,
          type: 'TF',
          category: 'CRANE_SAFETY',
          categoryNameJp: '吊り荷の下への立ち入り',
          categoryNameNe: 'क्रेनले झुन्ड्याएको सामान मुनि पस्ने नियम',
          questionJp: 'クレーンで吊り上げられている荷物の下は落下の危険があるため、いかなる理由があっても立ち入ってはならない。',
          questionNe: 'क्रेनले हावामा उठाएको सामान मुनि खस्ने खतरा हुने भएकाले जुनसुकै कारण भए पनि मानिस पस्न पाइँदैन।',
          options: [{ textJp: '○（[正|ただ]しい）', textNe: '○ (सही)' }, { textJp: '×（[誤|あやま]り）', textNe: '× (गलत)' }],
          correctAnswer: 0,
          explanationJp: '正しいです。吊り荷の下への立ち入りは法律で厳禁されています。玉掛け合図者は周囲の安全を確認し、人を近づけさせません。',
          explanationNe: 'सही हो। क्रेनको सामान मुनि बस्न वा हिँड्न पूर्ण निषेध छ।',
        }
      ]
    },
    5: {
      id: 'CONST_SET_5',
      sectorKey: 'construction',
      sectorName: 'Construction',
      sectorKanji: '建設全国統一模擬試験・最終総合判定',
      sectorIcon: '🏗️',
      setNumber: 5,
      titleJp: '建設[全国統一|ぜんこくとういつ][本番想定|ほんばんそうてい][総合評価模擬試験|そうごうひょうかもぎしけん]（第5回）',
      titleNe: 'निर्माण विशेष सीप परीक्षा — राष्ट्रिय अन्तिम सिमुलेटर नमुना परीक्षा (सेट ५)',
      subtitleJp: '図面記号・地震避難・熱中症予防・安全報告の集大成30問',
      subtitleNe: 'नक्साका संकेत, भूकम्प आउँदाको सुरक्षा, गर्मीमा रिँगटा लाग्नबाट जोगिने नियमको अन्तिम परीक्षा',
      durationMinutes: 60,
      totalQuestions: 30,
      passPercentage: 60,
      passScore: 18,
      organizer: '一般社団法人建設技能人材機構 (JAC) / Prometric CBT',
      questions: [
        {
          id: 'con5-q1',
          number: 1,
          type: 'TF',
          category: 'SAFETY_HEALTH',
          categoryNameJp: 'ヘルメット（保護帽）の着用',
          categoryNameNe: 'हेल्मेट लगाउने तरिका',
          questionJp: 'ヘルメットを着用するときは、暑いからといってあご紐（ひも）を緩めたり外したりせず、指が1本入る程度にしっかり締める。',
          questionNe: 'हेल्मेट लगाउँदा गर्मी भयो भनेर फित्ता (Chin Strap) खुकुलो पार्न वा खोल्न पाइँदैन, औंला छिर्ने गरी कस्नुपर्छ।',
          options: [{ textJp: '○（[正|ただ]しい）', textNe: '○ (सही)' }, { textJp: '×（[誤|あやま]り）', textNe: '× (गलत)' }],
          correctAnswer: 0,
          explanationJp: '正しいです。あご紐が緩んでいると、転倒や落下の瞬間にヘルメットが脱げて頭部を強打する重大事故になります。',
          explanationNe: 'सही हो। फित्ता खुकुलो भएमा लड्ने बित्तिकै हेल्मेट फुस्किएर टाउकोमा गम्भीर चोट लाग्छ।',
        }
      ]
    }
  },

  // ==========================================
  // 6. HOSPITALITY & HOTEL (宿泊業)
  // ==========================================
  'hospitality': {
    1: {
      id: 'HOSPITALITY_SET_1',
      sectorKey: 'hospitality',
      sectorName: 'Hospitality & Hotel',
      sectorKanji: '宿泊業特定技能1号技能測定試験',
      sectorIcon: '🏨',
      setNumber: 1,
      titleJp: '宿泊業[特定技能|とくていぎのう]1[号|ごう] [本番形式|ほんばんけいしき] [総合模擬試験|そうごうもぎしけん]（第1回・フロント・接客）',
      titleNe: 'होटेल तथा अतिथि सत्कार विशेष सीप परीक्षा — नमुना परीक्षा सेट १ (फ्रन्ट डेस्क र शिष्टाचार)',
      subtitleJp: '一般社団法人宿泊業技能試験センター [基準準拠|きじゅんじゅんきょ]',
      subtitleNe: 'चेक-इन संवाद, पाहुनाको पहिचान, आदरार्थी जापानी भाषा (Keigo) र कोठाको चाबी हस्तान्तरण',
      durationMinutes: 60,
      totalQuestions: 30,
      passPercentage: 65,
      passScore: 20,
      organizer: '一般社団法人宿泊業技能試験センター / Prometric CBT',
      questions: [
        {
          id: 'hosp1-q1',
          number: 1,
          type: 'CHOICE',
          category: 'FRONT_DESK',
          categoryNameJp: 'フロント接客敬語',
          categoryNameNe: 'फ्रन्ट डेस्कको आदरार्थी भाषा',
          questionJp: 'ホテルに到着した宿泊客を迎える最初の挨拶として、最も適切な日本語はどれですか。',
          questionNe: 'होटेल आइपुगेका पाहुनालाई स्वागत गर्दा सबैभन्दा उपयुक्त जापानी अभिवादन कुन हो?',
          options: [
            { textJp: '「いらっしゃいませ。当ホテルへようこそお越しくださいました。」', textNe: '"स्वागत छ हजुरलाई, हाम्रो होटेलमा हार्दिक स्वागत गर्दछौं। (Irasshaimase)"' },
            { textJp: '「こんにちは、部屋の鍵を渡します。」', textNe: '"नमस्ते, कोठाको चाबी दिन्छु। (Konnichiwa)"' },
            { textJp: '「予約の名前は何ですか。」', textNe: '"बुकिङ गरेको नाम के हो? (Namae wa nan desu ka)"' },
            { textJp: '「疲れたでしょう。」', textNe: '"थकाइ लाग्यो होला। (Tsukareta deshou)"' }
          ],
          correctAnswer: 0,
          explanationJp: 'ホテル業の基本挨拶は「いらっしゃいませ。ようこそお越しくださいました」です。笑顔でお辞儀（会釈・敬礼）を添えます。',
          explanationNe: '"Irasshaimase. Youkoso okoshi kudasaimashita" भन्दै झुकेर (Ojigi) स्वागत गर्नु होटेलको पहिलो नियम हो।',
        },
        {
          id: 'hosp1-q2',
          number: 2,
          type: 'TF',
          category: 'GUEST_PRIVACY',
          categoryNameJp: '顧客プライバシー保護',
          categoryNameNe: 'पाहुनाको व्यक्तिगत गोपनीयता सुरक्षा',
          questionJp: '電話で「〇〇様という客が泊まっているか教えてほしい」と聞かれた場合、親切のために部屋番号を教えてよい。',
          questionNe: 'फोनमा कसैले "फलानो पाहुना हजुरको होटेलमा हुनुहुन्छ कि हुनुहुन्न" भनी सोधेमा कोठा नम्बर बताइदिन मिल्छ।',
          options: [{ textJp: '○（[正|ただ]しい）', textNe: '○ (सही)' }, { textJp: '×（[誤|あやま]り）', textNe: '× (गलत)' }],
          correctAnswer: 1,
          explanationJp: '誤りです。宿泊客の個人情報・滞在の有無は個人情報保護法および防犯上、第三者に絶対に漏らしてはなりません。',
          explanationNe: 'गलत हो। पाहुनाको अनुमति बिना तेस्रो व्यक्तिलाई बसाइको जानकारी वा कोठा नम्बर दिनु कानुनतः पूर्ण निषेध छ।',
        }
      ]
    },
    2: {
      id: 'HOSPITALITY_SET_2',
      sectorKey: 'hospitality',
      sectorName: 'Hospitality & Hotel',
      sectorKanji: 'レストラン配膳・防災避難誘導試験',
      sectorIcon: '🏨',
      setNumber: 2,
      titleJp: '宿泊業レストラン[配膳|はいぜん]・[防災避難誘導|ぼうさいひなんゆうどう][特化模擬試験|とっかもぎしけん]（第2回）',
      titleNe: 'होटेल तथा अतिथि सत्कार परीक्षा — ब्यान्क्वेट, भान्छा र विपद् व्यवस्थापन (सेट २)',
      subtitleJp: '宴会テーブルセッティング・ビュッフェ衛生管理・地震火災避難誘導',
      subtitleNe: 'डिनर टेबल सजावट, बुफे खानाको तापक्रम र भूकम्प आउँदा पाहुनालाई बाहिर निकाल्ने नियम',
      durationMinutes: 60,
      totalQuestions: 30,
      passPercentage: 65,
      passScore: 20,
      organizer: '一般社団法人宿泊業技能試験センター / Prometric CBT',
      questions: [
        {
          id: 'hosp2-q1',
          number: 1,
          type: 'TF',
          category: 'EMERGENCY',
          categoryNameJp: '地震発生時の館内避難誘導',
          categoryNameNe: 'भूकम्प आउँदा पाहुनाको उद्धार',
          questionJp: '宿泊施設で大きな地震が発生した際、エレベーターを使って客を速やかに1階ロビーへ避難させる。',
          questionNe: 'होटेलमा ठूलो भूकम्प आउँदा पाहुनाहरूलाई छिटो लिफ्ट चढाएर भुइँतलाको लबीमा झार्नुपर्छ।',
          options: [{ textJp: '○（[正|ただ]しい）', textNe: '○ (सही)' }, { textJp: '×（[誤|あやま]り）', textNe: '× (गलत)' }],
          correctAnswer: 1,
          explanationJp: '誤りです。地震時は停電やワイヤー脱落で閉じ込め事故が起きるため、エレベーターは絶対に使用禁止です。非常階段で誘導します。',
          explanationNe: 'गलत हो। भूकम्प आउँदा लिफ्ट बिचमै रोकिने खतरा हुने भएकाले लिफ्ट कहिल्यै प्रयोग नगरी आपतकालीन भर्याङबाट लैजानुपर्छ।',
        }
      ]
    }
  },

  // ==========================================
  // 7. FOOD MANUFACTURING (飲食料品製造業)
  // ==========================================
  'manufacture': {
    1: {
      id: 'FOOD_MFG_SET_1',
      sectorKey: 'manufacture',
      sectorName: 'Food Manufacturing',
      sectorKanji: '飲食料品製造業特定技能1号技能測定試験',
      sectorIcon: '🏭',
      setNumber: 1,
      titleJp: '飲食料品製造業[特定技能|とくていぎのう]1[号|ごう] [総合模擬試験|そうごうもぎしけん]（第1回・工場衛生・異物混入防止）',
      titleNe: 'खाद्य उत्पादन कारखाना विशेष सीप परीक्षा — नमुना परीक्षा सेट १ (कारखाना सरसफाइ र बाहिरी वस्तु रोकथाम)',
      subtitleJp: '一般社団法人外国人食品産業技能評価機構（OTAFF）[基準準拠|きじゅんじゅんきょ]',
      subtitleNe: 'एयर सावर (Air Shower), रौं/धुलो नझर्ने पोसाक, कन्वेयर बेल्ट सुरक्षा र हात धुने विधि',
      durationMinutes: 80,
      totalQuestions: 30,
      passPercentage: 65,
      passScore: 20,
      organizer: 'OTAFF / Prometric CBT',
      questions: [
        {
          id: 'mfg1-q1',
          number: 1,
          type: 'TF',
          category: 'FACTORY_HYGIENE',
          categoryNameJp: 'エアシャワーの正しい入り方',
          categoryNameNe: 'एयर सावर (Air Shower) को सही नियम',
          questionJp: '食品工場に入る際、エアシャワー内では身体を回転させたり腕を上げたりして、全身に風を当てて毛髪やホコリを払い落とす。',
          questionNe: 'खाना बनाउने फ्याक्ट्री भित्र छिर्दा एयर सावरमा हात उठाएर शरीरलाई घुमाउँदै पुरै शरीरमा हावा पारेर कपाल र धुलो झार्नुपर्छ।',
          options: [{ textJp: '○（[正|ただ]しい）', textNe: '○ (सही)' }, { textJp: '×（[誤|あやま]り）', textNe: '× (गलत)' }],
          correctAnswer: 0,
          explanationJp: '正しいです。ただ立っているだけでは背中や脇のホコリが落ちません。腕を広げてその場で一回転し、全身の付着物を吹き飛ばします。',
          explanationNe: 'सही हो। सिधा उभिएर मात्र धुलो झर्दैन, हात फैलाएर पुरै घुम्दै हावाको चापले कपाल र धुलो झार्नुपर्छ।',
        },
        {
          id: 'mfg1-q2',
          number: 2,
          type: 'TF',
          category: 'FOREIGN_OBJECTS',
          categoryNameJp: '異物混入防止',
          categoryNameNe: 'बाहिरी वस्तु मिसिन नदिने नियम',
          questionJp: '工場内では、結婚指輪や腕時計、イヤリングなどのアクセサリーは外さずにそのまま作業してもよい。',
          questionNe: 'कारखाना भित्र औंठी, घडी, कानको मुन्द्रा जस्ता गहनाहरू नलुकाइकन सिधै लगाएर काम गर्न मिल्छ।',
          options: [{ textJp: '○（[正|ただ]しい）', textNe: '○ (सही)' }, { textJp: '×（[誤|あやま]り）', textNe: '× (गलत)' }],
          correctAnswer: 1,
          explanationJp: '誤りです。アクセサリーは製品への異物混入や機械への巻き込まれ事故の原因となるため、工場内への持ち込み・着用は厳禁です。',
          explanationNe: 'गलत हो। कुनै पनि गहना खानामा खस्ने वा मेसिनमा अल्झिने खतरा हुने भएकाले फ्याक्ट्री भित्र गहना लगाउन पूर्ण प्रतिबन्ध छ।',
        }
      ]
    },
    2: {
      id: 'FOOD_MFG_SET_2',
      sectorKey: 'manufacture',
      sectorName: 'Food Manufacturing',
      sectorKanji: '金属検出機・包装密封・HACCP管理試験',
      sectorIcon: '🏭',
      setNumber: 2,
      titleJp: '飲食料品製造業[金属検出機|きんぞくけんしゅつき]・[包装密封|ほうそうみっぷう][特化模擬試験|とっかもぎしけん]（第2回）',
      titleNe: 'खाद्य उत्पादन कारखाना परीक्षा — मेटल डिटेक्टर, प्याकेजिङ र गुणस्तर नियन्त्रण (सेट २)',
      subtitleJp: 'Fe・SUSテストピース感度確認・賞味期限印字確認・コールドチェーン',
      subtitleNe: 'फलाम/स्टिल धातु पत्ता लगाउने मेसिनको जाँच, म्याद सकिने मितिको छाप र कोल्ड स्टोर नियम',
      durationMinutes: 80,
      totalQuestions: 30,
      passPercentage: 65,
      passScore: 20,
      organizer: 'OTAFF / Prometric CBT',
      questions: [
        {
          id: 'mfg2-q1',
          number: 1,
          type: 'TF',
          category: 'QUALITY_CONTROL',
          categoryNameJp: '金属検出機の始業前点検',
          categoryNameNe: 'मेटल डिटेक्टरको सुरुवाती जाँच',
          questionJp: '金属検出機（メタルディテクター）は、作業開始前および作業中に定期的にテストピースを通して正常に検知するか確認する。',
          questionNe: 'मेटल डिटेक्टरले धातु चिन्छ कि चिन्दैन भनी काम सुरु गर्नुअघि र कामको बिचमा नमुना धातु (Test Piece) छिराएर परीक्षण गर्नुपर्छ।',
          options: [{ textJp: '○（[正|ただ]しい）', textNe: '○ (सही)' }, { textJp: '×（[誤|あやま]り）', textNe: '× (गलत)' }],
          correctAnswer: 0,
          explanationJp: '正しいです。Fe（鉄）やSUS（ステンレス）のテストピースを使って、感度が正常に維持されていることを作業ログに記録します。',
          explanationNe: 'सही हो। फलाम र स्टिलका नमुना टुक्रा छिराएर मेसिनले घण्टी बजाउँछ कि बजाउँदैन निश्चित गरेर मात्र उत्पादन सुरु गरिन्छ।',
        }
      ]
    }
  },

  // ==========================================
  // 8. AUTOMOBILE REPAIR (自動車整備業)
  // ==========================================
  'automobile': {
    1: {
      id: 'AUTO_SET_1',
      sectorKey: 'automobile',
      sectorName: 'Automobile Repair',
      sectorKanji: '自動車整備分野特定技能1号評価試験',
      sectorIcon: '🚗',
      setNumber: 1,
      titleJp: '自動車整備[特定技能|とくていぎのう]1[号|ごう] [総合模擬試験|そうごうもぎしけん]（第1回・定期点検・ブレーキ・タイヤ）',
      titleNe: 'अटोमोबाइल मर्मत विशेष सीप परीक्षा — नमुना परीक्षा सेट १ (आवधिक जाँच, ब्रेक र टायर)',
      subtitleJp: '一般社団法人日本自動車整備振興会連合会（日整連）[基準準拠|きじゅんじゅんきょ]',
      subtitleNe: 'इन्जिन आयल, ब्रेक प्याडको मोटाइ (Brake Pad Wear), टायरको ग्रिप र लिफ्ट सुरक्षा सम्बन्धी परीक्षा',
      durationMinutes: 60,
      totalQuestions: 30,
      passPercentage: 65,
      passScore: 20,
      organizer: '一般社団法人日本自動車整備振興会連合会 (JASPA) / Prometric CBT',
      questions: [
        {
          id: 'auto1-q1',
          number: 1,
          type: 'CHOICE',
          category: 'TIRE_SAFETY',
          categoryNameJp: 'タイヤの溝の深さ基準',
          categoryNameNe: 'टायरको ग्रिप (Tread Depth) को कानुनी सीमा',
          questionJp: '日本の道路運送車両の保安基準において、乗用車のタイヤの残り溝の深さの保安基準限度値（スリップサインが出る基準）は何ミリですか。',
          questionNe: 'जापानको कानुन अनुसार कारको टायर घोटिँदा बाँकी ग्रिपको गहिराइ कम्तीमा कति मिलिमिटर हुनैपर्छ (Slip Sign)?',
          options: [
            { textJp: '1.0 mm', textNe: '१.० मिलिमिटर' },
            { textJp: '1.6 mm', textNe: '१.६ मिलिमिटर (1.6 mm)' },
            { textJp: '3.0 mm', textNe: '३.० मिलिमिटर' },
            { textJp: '5.0 mm', textNe: '५.० मिलिमिटर' }
          ],
          correctAnswer: 1,
          explanationJp: '乗用車タイヤの溝の深さ限度は1.6mmです。溝の中にあるスリップサインが1箇所でも露出すると車検に合格せず、走行禁止となります。',
          explanationNe: 'कारको टायरको ग्रिप कम्तीमा १.६ मिलिमिटर हुनैपर्छ। यो भन्दा पातलो भएमा स्लिप साइन देखिन्छ र गाडी पास हुँदैन।',
          examTrapJp: '「1.0mm」と間違えやすいので注意。乗用車は1.6mmです！',
          examTrapNe: '"१.० मिमी" नछान्नुहोस्। जापानमा १.६ मिमी अनिवार्य सीमा हो।'
        },
        {
          id: 'auto1-q2',
          number: 2,
          type: 'TF',
          category: 'LIFT_SAFETY',
          categoryNameJp: 'リフトのセーフティロック',
          categoryNameNe: 'कार उठाउने हाइड्रोलिक लिफ्टको लक',
          questionJp: 'リフトで車両を持ち上げて下回り作業を行う際は、油圧シリンダーだけに頼らず、必ず機械式セーフティロック（安全爪）を掛ける。',
          questionNe: 'लिफ्टले गाडी माथि उठाएर मुनि पसेर काम गर्दा केवल आयल प्रेसरको भर नपरी मेकानिकल लक (Safety Lock) अनिवार्य लगाउनुपर्छ।',
          options: [{ textJp: '○（[正|ただ]しい）', textNe: '○ (सही)' }, { textJp: '×（[誤|あやま]り）', textNe: '× (गलत)' }],
          correctAnswer: 0,
          explanationJp: '正しいです。油圧ホースの破損や圧力低下で車両が急降下して圧死する事故を防ぐため、必ずセーフティロックを噛み合わせます。',
          explanationNe: 'सही हो। पाइप फुटेर गाडी अचानक खसी किचेर ज्यान जान सक्ने भएकाले सेफ्टी लक अनिवार्य कस्नुपर्छ।',
        }
      ]
    },
    2: {
      id: 'AUTO_SET_2',
      sectorKey: 'automobile',
      sectorName: 'Automobile Repair',
      sectorKanji: 'トルク管理・ブレーキエア抜き・整備安全試験',
      sectorIcon: '🚗',
      setNumber: 2,
      titleJp: '自動車整備[トルク管理|とるくかんり]・[ブレーキエア抜|ぶれーきえあぬ]き[特化模擬試験|とっかもぎしけん]（第2回）',
      titleNe: 'अटोमोबाइल मर्मत परीक्षा — टर्क रेन्च, ब्रेक एयर र वर्कसप सुरक्षा (सेट २)',
      subtitleJp: 'トルクレンチ規定トルク締付・ホイールナット対角線締め・排気ガス換気',
      subtitleNe: 'टर्क रेन्च (N·m) को प्रयोग, पाङ्ग्राका नट क्रस (Cross) ढाँचामा कस्ने र साइलेन्सरको धुवाँ भेन्टिलेसन',
      durationMinutes: 60,
      totalQuestions: 30,
      passPercentage: 65,
      passScore: 20,
      organizer: 'JASPA / Prometric CBT',
      questions: [
        {
          id: 'auto2-q1',
          number: 1,
          type: 'CHOICE',
          category: 'WHEEL_TORQUE',
          categoryNameJp: 'ホイールナットの締付順序',
          categoryNameNe: 'पाङ्ग्राका नट कस्ने सही तरिका',
          questionJp: '自動車のホイールナットを締め付けるとき、均等に締め付けて偏りを防ぐための正しい順序はどれですか。',
          questionNe: 'गाडीको पाङ्ग्राका नटहरू कस्दा कुनै एकतर्फ नढल्किई एकनासले कस्न कुन क्रममा कस्नुपर्छ?',
          options: [
            { textJp: '時計回りに隣のナットへ順番に締める', textNe: 'घडीको सुई जस्तै पालैपालो छेउको नट कस्ने' },
            { textJp: '対角線の順序（星形を描くように）で締め付ける', textNe: 'आमने-सामने छड्के (Diagonal/Star pattern) गरी कस्ने' },
            { textJp: '1本だけ極端に強く締めてから残りを締める', textNe: 'एउटा धेरै कडा पारेर अरू कस्ने' },
            { textJp: '順序は関係ない', textNe: 'जुन पहिला कसे पनि फरक पर्दैन' }
          ],
          correctAnswer: 1,
          explanationJp: 'ホイールナットは対角線（たいかくせん）の順に均等に締め付けます。順番に隣を締めるとホイールが斜めに密着して走行中に脱落する危険があります。',
          explanationNe: 'पाङ्ग्राको नट सधैं छड्के (Star pattern) मिलाएर कस्नुपर्छ, जसले गर्दा ह्विल सन्तुलित भएर बस्छ।',
        }
      ]
    }
  }
};

export function getSSWMockExam(sectorKey: string, setNumber: number = 1): SSWMockTest | null {
  const sector = SSW_EXAMS_DATABASE[sectorKey];
  if (!sector) return null;
  return sector[setNumber] || sector[1] || null;
}
