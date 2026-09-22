export interface LifeCostItem {
  category: string;
  amount: string;
  note: string;
}

export interface LifeCulturePoint {
  label: string;
  desc: string;
}

export interface LifeCultureModule {
  id: string;
  cat: 'ETIQUETTE' | 'DINING' | 'WORKPLACE' | 'TRADITIONS' | 'NEPALI_TIPS';
  title: string;
  sub: string;
  badge: string;
  summary: string;
  points: LifeCulturePoint[];
  proTip: string;
}

export interface LifeQuizItem {
  q: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface LifeTabConfig {
  key: 'SETUP' | 'HOUSING' | 'CULTURE' | 'VISA_RENEWAL' | 'RIGHTS' | 'EMERGENCY';
  slug: string;
  label: string;
  hasDot?: boolean;
}

export function getLifeData(country: 'japan' | 'korea', isNe: boolean) {
  const isJapan = country === 'japan';
  const cName = isJapan ? (isNe ? 'जापान' : 'Japan') : (isNe ? 'दक्षिण कोरिया' : 'South Korea');

  // 1. Hero
  const hero = {
    badge: isNe
      ? (isJapan ? '🇯🇵 जापान जीवन तथा संस्कृति गाइड' : '🇰🇷 कोरिया जीवन तथा संस्कृति गाइड')
      : `${isJapan ? '🇯🇵 Japan' : '🇰🇷 Korea'} Resident & Culture Guide`,
    title: isNe
      ? `${cName}मा जीवन र संस्कृति: पूर्ण आवासीय मार्गदर्शन`
      : `Life & Culture in ${cName}: Complete Resident Guide`,
    sub: isNe
      ? `${cName}मा सहज र सुरक्षित जीवनका लागि आवश्यक सम्पूर्ण जानकारी — वडा कार्यालयको ठेगाना दर्ता, कोठा भाडा र डिपोजिटदेखि जापानी शिष्टाचार, खानपान नियम, कम्पनी कोड, श्रम अधिकार र आपतकालीन सम्पर्क नम्बरहरू।`
      : `Master everything for living smoothly in ${cName} — from municipal address registration, housing deposits, and legal rights to deep cultural etiquette, dining manners, workplace codes, and emergency helplines.`,
  };

  // 2. Tabs
  const tabs: LifeTabConfig[] = isNe
    ? [
        { key: 'SETUP', slug: 'city-office', label: '१. वडा कार्यालय दर्ता' },
        { key: 'HOUSING', slug: 'housing', label: '२. कोठा भाडा र खर्च' },
        { key: 'CULTURE', slug: 'culture', label: '३. संस्कृति र शिष्टाचार', hasDot: true },
        { key: 'VISA_RENEWAL', slug: 'visa-pr', label: '४. भिसा र पीआर (PR)' },
        { key: 'RIGHTS', slug: 'labor-rights', label: '५. कामदारको अधिकार' },
        { key: 'EMERGENCY', slug: 'helplines', label: '६. आपतकालीन नम्बरहरू' },
      ]
    : [
        { key: 'SETUP', slug: 'city-office', label: '1. City Office' },
        { key: 'HOUSING', slug: 'housing', label: '2. Housing & Rent' },
        { key: 'CULTURE', slug: 'culture', label: '3. Culture & Etiquette', hasDot: true },
        { key: 'VISA_RENEWAL', slug: 'visa-pr', label: '4. Visa & PR' },
        { key: 'RIGHTS', slug: 'labor-rights', label: '5. Labor Rights' },
        { key: 'EMERGENCY', slug: 'helplines', label: '6. Helplines' },
      ];

  // 3. Costs
  const costs: LifeCostItem[] = isJapan
    ? isNe
      ? [
          { category: 'कोठा भाडा (अपार्टमेन्ट / शेयर)', amount: '¥३५,००० – ¥७०,००० / महिना', note: 'टोकियो बाहिर (साइतामा, चिबा, कान्साई) धेरै सस्तो पर्छ' },
          { category: 'खाना तथा खाद्यान्न खर्च', amount: '¥२५,००० – ¥४०,००० / महिना', note: 'ग्योमु सुपर (Gyomu Super) जस्ता सस्तो सुपरमार्केटबाट किनेर पकाउँदा' },
          { category: 'बत्ती, ग्यास र पानी (Utilities)', amount: '¥८,००० – ¥१५,००० / महिना', note: 'जाडोमा हिटर र गर्मीमा एसी चलाउँदा थपघट हुन सक्छ' },
          { category: 'मोबाइल सिम र इन्टरनेट (WiFi)', amount: '¥३,००० – ¥६,००० / महिना', note: 'सस्तो ई-सिम वा सिम (राकुतेन मोबाइल, आहामो, यूक्यू मोबाइल)' },
          { category: 'राष्ट्रिय स्वास्थ्य बीमा (NHI)', amount: '¥१,५०० – ¥३,००० / महिना', note: 'विद्यार्थीका लागि छुट हुन्छ; सबै क्लिनिक र अस्पतालमा ७०% खर्च कभर गर्छ' },
        ]
      : [
          { category: 'Rent (Apartment / Shared)', amount: '¥35,000 – ¥70,000 / mo', note: 'Cheaper outside central Tokyo (e.g. Saitama, Chiba, Kansai)' },
          { category: 'Groceries & Food', amount: '¥25,000 – ¥40,000 / mo', note: 'Cooking at discount supermarkets like Gyomu Super' },
          { category: 'Utilities (Electricity/Gas/Water)', amount: '¥8,000 – ¥15,000 / mo', note: 'Varies with winter AC heating & summer cooling' },
          { category: 'Mobile SIM & WiFi', amount: '¥3,000 – ¥6,000 / mo', note: 'Budget eSIM/SIM (Rakuten Mobile, ahamo, UQ Mobile)' },
          { category: 'National Health Insurance (NHI)', amount: '¥1,500 – ¥3,000 / mo', note: 'Covers 70% of medical costs at all clinics; student discounts apply' },
        ]
    : isNe
      ? [
          { category: 'कोठा भाडा (वान-रुम / गोसीवोन)', amount: '₩३५०,००० – ₩६५०,००० / महिना', note: 'गोसीवोनमा भात र किम्ची निःशुल्क; वान-रुममा डिपोजिट चाहिन्छ' },
          { category: 'खाना तथा खाद्यान्न खर्च', amount: '₩३००,००० – ₩४५०,००० / महिना', note: 'कलेज क्यान्टिन (~₩५,०००) र स्थानीय बजारबाट' },
          { category: 'बत्ती, ग्यास र पानी खर्च', amount: '₩५०,००० – ₩१००,००० / महिना', note: 'जाडो महिनामा ओन्दोल (भुइँ तताउने) चलाउँदा बढी हुन्छ' },
          { category: 'मोबाइल सिम कार्ड', amount: '₩३०,००० – ₩६०,००० / महिना', note: 'अल्तुल (Alteul) बजेट सिम सेवाहरू (KT M Mobile, U+)' },
          { category: 'राष्ट्रिय स्वास्थ्य बीमा (NHIS)', amount: '₩७०,००० / महिना', note: 'सबै विदेशी नागरिकका लागि अनिवार्य सरकारी स्वास्थ्य बीमा' },
        ]
      : [
          { category: 'Rent (One-room / Goshiwon)', amount: '₩350,000 – ₩650,000 / mo', note: 'Goshiwon includes free rice/kimchi; One-room requires deposit' },
          { category: 'Food & Groceries', amount: '₩300,000 – ₩450,000 / mo', note: 'Affordable university cafeterias (~₩5,000) & local marts' },
          { category: 'Utilities (Gas/Electric/Water)', amount: '₩50,000 – ₩100,000 / mo', note: 'Ondol underfloor heating in winter' },
          { category: 'Mobile SIM', amount: '₩30,000 – ₩60,000 / mo', note: 'Alteul budget carriers (KT M Mobile, U+)' },
          { category: 'National Health Insurance (NHIS)', amount: '₩70,000 / mo', note: 'Mandatory coverage for all foreign residents' },
        ];

  // 4. Tab 1: Setup (City Office)
  const setup = {
    title: isNe
      ? 'पहिलो १४ दिनको चेकलिस्ट: वडा तथा नगरपालिका कार्यालय दर्ता (区役所 / 市役所)'
      : 'First 14 Days Checklist: Municipal City Office Registration (जिल्ला कार्यालय दर्ता)',
    sub: isNe
      ? (isJapan
          ? 'जापान पुगेको वा नयाँ कोठा सरेको १४ दिनभित्र आफ्नो स्थानीय वडा वा नगरपालिका कार्यालय (कुयाकुशो/शियाकुशो) गएर स्थायी ठेगाना दर्ता अनिवार्य गर्नुपर्छ।'
          : 'दक्षिण कोरिया पुगेको ९० दिनभित्र अध्यागमन कार्यालय गई विदेशी परिचयपत्र (ARC) बनाउनुपर्छ र स्थानीय केन्द्रमा ठेगाना दर्ता गर्नुपर्छ।')
      : (isJapan
          ? 'Within 14 days of arriving or moving to a new apartment in Japan, you must visit your local City or Ward Office (区役所 / 市役所 Kuyakusho / Shiyakusho) to complete address registration.'
          : 'Within 90 days of arriving in South Korea, you must register at the local Immigration Office to apply for your Alien Registration Card (ARC) and register address at community center.'),
    cards: isNe
      ? [
          {
            title: '१. निवास कार्डमा ठेगाना प्रिन्ट (住民票 Juminhyo)',
            desc: isJapan
              ? 'आफ्नो जुमिनह्यो (बसोबास फारम) बुझाउनुहोस्। वडा अधिकारीले तपाईंको रेसिडेन्स कार्ड (Zairyu Card) को पछाडि स्थायी ठेगाना छाप लगाइदिनेछन्।'
              : 'राहदानी र भाडा सम्झौतापत्र लिएर स्थानीय सामुदायिक केन्द्रमा ठेगाना दर्ता गर्नुहोस्।',
          },
          {
            title: '२. राष्ट्रिय स्वास्थ्य बीमा (国民健康保険 NHI)',
            desc: isJapan
              ? 'स्वास्थ्य बीमा कार्ड सोही दिन प्राप्त हुन्छ। नेपाली विद्यार्थीहरूले आम्दानी कम भएको फारम भरेर मासिक करिब ¥१,५०० मा ७०% अस्पताल खर्च छुट पाउँछन्।'
              : 'राष्ट्रिय स्वास्थ्य बीमामा अनिवार्य दर्ता हुन्छ। यसले क्लिनिक, दाँत र आपतकालीन उपचारमा ७०% सम्म खर्च बेहोर्छ।',
          },
          {
            title: '३. माइ नम्बर कार्ड दर्ता (マイナンバー)',
            desc: isJapan
              ? '१२ अंकको व्यक्तिगत माइ नम्बर कार्ड आवेदन गर्नुहोस्। पार्ट-टाइम कामको तलब दर्ता, कर चुक्ता प्रमाणपत्र र कम्बिनीबाट कागजात निकाल्न यो अनिवार्य छ।'
              : 'विदेशी दर्ता कार्ड (ARC) लिनुहोस्। यो सिम कार्ड, बैंक खाता र अनलाइन किनमेलका लागि मुख्य फोटो परिचयपत्र हो।',
          },
          {
            title: '४. बैंक खाता र सिम कार्ड खोल्ने',
            desc: isJapan
              ? 'नयाँ विद्यार्थी र कामदारले युचो बैंक (Japan Post Bank) मा सजिलै खाता खोल्न सक्छन्। अन्य ठूला बैंकहरूले ६ महिना बसेको खोज्न सक्छन्।'
              : 'आफ्नो राहदानी र एआरसी लिएर हाना बैंक, शिनहान वा वुरी बैंकमा प्रत्यक्ष तलब खाता र अनलाइन बैंकिङ सुरु गर्नुहोस्।',
          },
        ]
      : [
          {
            title: '1. Residence Card & Address Seal',
            desc: isJapan
              ? 'Submit your Juminhyo moving-in notice. The city officer prints your permanent address on the back of your Residence Card (Zairyu Card).'
              : 'Bring your passport, rental lease agreement, and school/work documents to register your residential address.',
          },
          {
            title: '2. National Health Insurance (NHI)',
            desc: isJapan
              ? 'Enroll in Kokumin Kenko Hoken. You receive your insurance card on the same day. Foreign students receive low-income premium discounts (~¥1,500/mo).'
              : 'Enroll in National Health Insurance (NHIS). Covers clinic visits, dental, and emergency hospitalization at 70%.',
          },
          {
            title: '3. Identification Card Setup',
            desc: isJapan
              ? 'Apply for the My Number Card. Essential for tax certificates, convenience store official printing, and part-time salary registration.'
              : 'Obtain your Alien Registration Card (ARC). It serves as your primary Korean photo ID for SIM cards, online shopping, and banking.',
          },
          {
            title: '4. Opening Bank Account & SIM Card',
            desc: isJapan
              ? 'Newcomers can immediately open an account with Japan Post Bank (Yucho Bank) with passport and Zairyu card. Major banks require 6 months residence.'
              : 'Open bank accounts at Hana Bank, Shinhan, or Woori with your passport and ARC for wage direct deposit and online banking.',
          },
        ],
  };

  // 5. Tab 2: Housing
  const housing = {
    title: isNe
      ? 'मासिक बजेट र कोठा भाडासम्बन्धी सम्पूर्ण जानकारी'
      : `Monthly Budget & Apartment Renting Guide (कोठा र खर्च)`,
    sub: isNe
      ? `${cName}मा बस्ने नेपाली विद्यार्थी तथा कामदारहरूका लागि यथार्थपरक मासिक खर्च र कोठा भाडाका नियमहरू।`
      : `Realistic breakdown of monthly expenditures and housing rules for students and workers living in ${cName}.`,
    tipTitle: isNe
      ? (isJapan ? 'जापानमा कोठा भाडा लिँदा ध्यान दिनुपर्ने शब्दहरू (Shikikin / Reikin)' : 'कोरियामा कोठा भाडाका सर्तहरू (Jeonse / Wolse)')
      : (isJapan ? 'Japan Renting Terms (Shikikin / Reikin)' : 'Korea Housing Terms (Jeonse / Wolse)'),
    tipDesc: isNe
      ? (isJapan
          ? 'जापानमा कोठा भाडामा लिँदा सिकिकिन (敷金 - फिर्ता हुने धरौटी), रेइकिन (礼金 - घरबेटीलाई दिने फिर्ता नहुने उपहार रकम, प्रायः १ महिनाको भाडा), र ग्यारेन्टर कम्पनी शुल्क तिर्नुपर्छ। सुरुवाती खर्च बचाउन "Zero Reikin" (रेइकिन नभएको) अपार्टमेन्ट खोज्नुहोस्।'
          : 'कोरियामा दुई मुख्य प्रणाली छन्: वोल्से (Wolse - मासिक भाडा र थोरै धरौटी) र जोनसे (Jeonse - ठूलो एकमुष्ट धरौटी जो अवधि सकिएपछि फिर्ता हुन्छ)। सुरुमा नेपाली विद्यार्थीहरू प्रायः गोसीवोन (Goshiwon) मा बस्छन् जहाँ धरौटी पर्दैन र बत्ती/पानी निःशुल्क हुन्छ।')
      : (isJapan
          ? 'When renting an apartment in Japan, be aware of Shikikin (refundable deposit), Reikin (non-refundable gift money to landlord, usually 1 month), and Guarantor company fee. Look for "Zero-Reikin" apartments to save initial move-in costs.'
          : 'Korea uses two major rent systems: Wolse (monthly rent with small deposit ₩3M–₩10M) and Jeonse (large lump-sum deposit ₩50M+ returned at lease end). Students usually start in Goshiwon with zero deposit and free utilities.'),
  };

  // 6. Tab 3: Culture & Modules
  const cultureCategories = isNe
    ? [
        { id: 'ALL', label: 'सबै विषयहरू' },
        { id: 'ETIQUETTE', label: 'अभिवादन र शिष्टाचार' },
        { id: 'DINING', label: 'खानपान र टेबल नियम' },
        { id: 'WORKPLACE', label: 'कम्पनी र कार्यस्थल' },
        { id: 'TRADITIONS', label: 'चाडपर्व र परम्परा' },
        { id: 'NEPALI_TIPS', label: 'नेपालीका लागि विशेष टिप्स' },
      ]
    : [
        { id: 'ALL', label: 'All Topics' },
        { id: 'ETIQUETTE', label: 'Manners & Greetings' },
        { id: 'DINING', label: 'Dining & Table' },
        { id: 'WORKPLACE', label: 'Company & Factory' },
        { id: 'TRADITIONS', label: 'Festivals & Bath' },
        { id: 'NEPALI_TIPS', label: 'Nepali Immigrant Tips' },
      ];

  const japanCultureModules: LifeCultureModule[] = isNe
    ? [
        {
          id: 'jp-bowing',
          cat: 'ETIQUETTE',
          title: 'निहुरिएर अभिवादन गर्ने कला (ओजिगी - お辞儀)',
          sub: 'जापानी नमस्कार तथा शिष्टाचार',
          badge: 'दैनिक शिष्टाचार',
          summary: 'जापानमा हात मिलाउनुको सट्टा निहुरिएर अभिवादन गरिन्छ, जसले आदर, कृतज्ञता र विनम्रता झल्काउँछ।',
          points: [
          { label: 'एशाकु (Eshaku - १५°)', desc: 'बाटो वा हलवेमा साथीभाइ, छिमेकी वा सहकर्मीलाई सामान्य देख्दा गरिने हल्का निहुराइ।' },
          { label: 'केइरेइ (Keirei - ३०°)', desc: 'ग्राहक, शिक्षक, पाहुना वा सिनियरहरूलाई गरिने औपचारिक र आदरणीय निहुराइ।' },
          { label: 'साइकेइरेइ (Saikeirei - ४५°)', desc: 'गहिरो माफी माग्दा (Shazai) वा अत्यन्तै ठूलो कृतज्ञता व्यक्त गर्दा गरिने पूर्ण निहुराइ।' },
        ],
        proTip: 'ढाड सिधा राखेर कम्मरबाट निहुरिनुहोस्; निहुरिएको बेला व्यक्तिको आँखामा सिधै नहेर्नुहोस्।',
      },
      {
        id: 'jp-genkan',
        cat: 'ETIQUETTE',
        title: 'गेन्कान (Genkan) मा जुत्ता फुकाल्ने र चप्पल नियम (玄関)',
        sub: 'घरभित्र जुत्ता फुकाल्ने र चप्पल नियम (玄関)',
        badge: 'घर र कार्यालय',
        summary: 'घरको प्रवेशद्वार (गेन्कान) ले बाहिरको फोहोर संसारलाई घरभित्रको सफा क्षेत्रबाट अलग गर्दछ।',
        points: [
          { label: 'खुड्किलो नियम', desc: 'सधैं तल्लो भुइँमा जुत्ता फुकाल्नुहोस् र मोजा लगाएको खुट्टाले माथिल्लो काठे भुइँमा टेक्नुहोस्।' },
          { label: 'जुत्ता फर्काउने नियम', desc: 'माथि चढेपछि आफ्नो जुत्ताको अघिल्लो भाग ढोकातर्फ फर्काएर चिटिक्क पारेर राख्नुहोस्।' },
          { label: 'शौचालय चप्पल (Toilet Slippers)', desc: 'शौचालय छिर्दा छुट्टै राखिएको चप्पल लगाउनुहोस्। त्यो चप्पल लगाएर कहिल्यै कोठामा नहिँड्नुहोस्!' },
        ],
        proTip: 'टाटामी (Tatami) गुन्द्रीमा कहिल्यै खाली खुट्टा नटेक्नुहोस्; सफा मोजा अनिवार्य लगाउनुहोस्।',
      },
      {
        id: 'jp-trains',
        cat: 'ETIQUETTE',
        title: 'रेल तथा सार्वजनिक यातायातका कडा नियम (マナーモード)',
        sub: 'रेल तथा सार्वजनिक यातायात शिष्टाचार (マナーモード)',
        badge: 'सार्वजनिक स्थल',
        summary: 'जापानी रेलहरू शान्तिको नमुना हुन् जहाँ अरू यात्रुलाई असर नपार्नु नै मुख्य कर्तव्य हो।',
        points: [
          { label: 'म्यानर मोड (Manner Mode)', desc: 'मोबाइल सधैं साइलेन्ट राख्नुहोस्। रेल र बसभित्र फोनमा कुरा गर्न पूर्ण रूपमा निषेध गरिएको छ।' },
          { label: 'प्राथमिकता सिट (Priority Seats)', desc: 'वृद्धवृद्धा, गर्भवती र बिरामीलाई सिट छोडिदिनुहोस्; भीडभाड हुँदा नजिक मोबाइल चलाउनबाट बच्नुहोस्।' },
          { label: 'झोला अगाडि भिर्ने नियम', desc: 'भीडभाड हुने समयमा आफ्नो ब्याकप्याक अगाडिपट्टि भिर्नुहोस् वा माथिल्लो र्‍याकमा राख्नुहोस्।' },
        ],
        proTip: 'रेलको ढोका खुल्नुअघि स्टेसनको भुइँमा कोरिएका दुई धर्काभित्र लाइन लागेर सभ्य तरिकाले उभिनुहोस्।',
      },
      {
        id: 'jp-chopsticks',
        cat: 'DINING',
        title: 'खाना खाने नियम र चपस्टिकको निषेध (箸の作法)',
        sub: 'खाना खाने नियम र चपस्टिकको निषेध (箸の作法)',
        badge: 'टेबल शिष्टाचार',
        summary: 'जापानमा खाना पवित्र मानिन्छ; टेबलको नियमले प्रकृति र पकाउने मान्छेप्रति सम्मान जनाउँछ।',
        points: [
          { label: 'खान अघि र पछिका शब्दहरू', desc: 'खान सुरु गर्नुअघि हात जोडेर "इतादाकिमासु" (いただきます) र खाइसकेपछि "गोचिसोसामा-देशिता" (ごちそうさまでした) भन्नुहोस्।' },
          { label: 'हाशी-वाताशी (चपस्टिकबाट चपस्टिकमा खाना दिनु निषेध)', desc: 'एउटाको चपस्टिकबाट अर्काको चपस्टिकमा कहिल्यै खाना नदिनुहोस्! यो बौद्ध अन्तिम संस्कारको अस्तु संकलन जस्तो देखिन्छ।' },
          { label: 'चुकिताते-बाशी (भातमा चपस्टिक ठाडो गाड्नु निषेध)', desc: 'भातको कचौरामा चपस्टिक ठाडो कहिल्यै नगाड्नुहोस्; यो मृत्यु संस्कारमा मात्र गरिन्छ।' },
          { label: 'चाउचाउको आवाज निकालेर खानु (Slurping)', desc: 'रामेन वा सोबा चाउचाउ आवाज निकालेर सुरूप्प तानेर खानु राम्रो मानिन्छ, यसले स्वाद बढाउँछ।' },
        ],
        proTip: 'जापानमा टिप्स (Tips) दिने चलन छैन। टेबुलमा पैसा छोड्नुभयो भने वेटर तपाईंलाई खोज्दै बाहिरसम्म आउनेछन्।',
      },
      {
        id: 'jp-hourenso',
        cat: 'WORKPLACE',
        title: 'कम्पनीको मुख्य नियम: हो-रेन-सो (報連相 Hou-Ren-So)',
        sub: 'कम्पनीको मुख्य नियम: हो-रेन-सो (報連相)',
        badge: 'कार्यस्थल संस्कृति',
        summary: 'जापानी कम्पनी र फ्याक्ट्रीहरू चलाउने सुनौलो तीन-सूत्रीय कार्यप्रणाली।',
        points: [
          { label: 'होकोकु (Hōkoku - रिपोर्ट)', desc: 'आफ्नो कामको प्रगतिबारे सुपरभाइजरलाई नियमित जानकारी दिनुहोस्, विशेष गरी काम सकिँदा वा अड्किँदा।' },
          { label: 'रेनराकु (Renraku - सूचना/सम्पर्क)', desc: 'समय परिवर्तन, ढिलाइ वा नयाँ परिस्थितिबारे तुरुन्तै आफ्नो टिमलाई बिना पूर्वाग्रह जानकारी दिनुहोस्।' },
          { label: 'सोदान (Sōdan - सल्लाह)', desc: 'जोखिमपूर्ण निर्णय एक्लै लिनुअघि सिनियर वा म्यानेजरसँग सधैं सल्लाह र अनुमति लिनुहोस्।' },
          { label: '५-१० मिनेट अगाडि पुग्ने नियम', desc: 'ठ्याक्कै समयमा पुग्नुलाई ढिलो भएको मानिन्छ। काम वा बैठक सुरु हुनुभन्दा ५-१० मिनेटअघि नै तयार हुनुहोस्।' },
        ],
        proTip: 'भिजिटिङ कार्ड (Meishi) दुवै हातले समातेर आदरपूर्वक लिनुहोस् र बैठकको टेबलमा आफ्नो कार्ड-केस माथि सफासँग राख्नुहोस्।',
      },
      {
        id: 'jp-garbage',
        cat: 'NEPALI_TIPS',
        title: 'फोहोर वर्गीकरण र नियम (Gomi Bunbetsu)',
        sub: 'जापानमा फोहोर छुट्याउने कडा नियम',
        badge: 'नेपाली आवास गाइड',
        summary: 'जापानमा फोहोर नछुट्याई फाल्नु गैरकानुनी मानिन्छ र यसले घरबेटीसँग ठूलो समस्या निम्त्याउन सक्छ।',
        points: [
          { label: 'बल्ने फोहोर (Moeru Gomi)', desc: 'खानाको फोहोर, कागज, कपडा — तोकिएको बारमा बिहान ८ बजेअघि मात्र फाल्नुहोस्।' },
          { label: 'नबल्ने फोहोर (Moenai Gomi)', desc: 'प्लास्टिक, धातु, सिसाका टुक्रा, ब्याट्री — छुट्टै झोलामा राख्नुहोस्।' },
          { label: 'प्लास्टिक बोतल र क्यान (PET/Cans)', desc: 'PET बोतलको बिर्को र बाहिरी स्टिकर निकालेर पखालेपछि मात्र फाल्नुहोस्।' },
        ],
        proTip: 'आफ्नो वडाको फोहोर क्यालेन्डर फ्रिजमा टाँस्नुहोस् र पारदर्शी प्लास्टिकको झोला मात्र प्रयोग गर्नुहोस्।',
      },
    ]
  : [
      {
        id: 'jp-bowing',
        cat: 'ETIQUETTE',
        title: 'The Art of Bowing (お辞儀 Ojigi)',
        sub: 'जापानी नमस्कार तथा शिष्टाचार',
        badge: 'Daily Etiquette',
        summary: 'Bowing replaces handshakes in daily life and conveys gratitude, greeting, and respect.',
        points: [
          { label: 'Eshaku (会釈 - 15°)', desc: 'Casual greeting when passing coworkers or neighbors in hallways.' },
          { label: 'Keirei (敬礼 - 30°)', desc: 'Standard respectful bow used for customers, clients, teachers, and elders.' },
          { label: 'Saikeirei (最敬礼 - 45°)', desc: 'Deepest bow reserved for sincere apologies (Shazai) or profound gratitude.' },
        ],
        proTip: 'Keep your back completely straight and bend from the waist; do not maintain eye contact while bowing.',
      },
      {
        id: 'jp-genkan',
        cat: 'ETIQUETTE',
        title: 'Shoes Off at Genkan & Slipper Etiquette',
        sub: 'घरभित्र जुत्ता फुकाल्ने र चप्पल नियम (玄関)',
        badge: 'Home & Office',
        summary: 'The entrance (Genkan) separates the outside world from clean indoor living spaces.',
        points: [
          { label: 'Step Up Rule', desc: 'Always remove shoes on the lower sunken floor; step onto the raised floor in socks.' },
          { label: 'Shoe Direction', desc: 'Neatly point your shoes toward the door after stepping onto the raised floor.' },
          { label: 'Toilet Slippers (トイレ用スリッパ)', desc: 'Switch into dedicated restroom slippers when entering the toilet. Never walk back into living areas with toilet slippers!' },
        ],
        proTip: 'Never step barefoot onto straw Tatami mats; wear clean socks.',
      },
      {
        id: 'jp-trains',
        cat: 'ETIQUETTE',
        title: 'Train & Public Transit Etiquette',
        sub: 'रेल तथा सार्वजनिक यातायात शिष्टाचार (マナーモード)',
        badge: 'Public Spaces',
        summary: 'Japanese trains are peaceful shared sanctuaries where personal consideration is paramount.',
        points: [
          { label: 'Manner Mode (マナーモード)', desc: 'Keep phones muted. Voice phone calls on trains and buses are strictly forbidden.' },
          { label: 'Priority Seats (優先席 Yūsenseki)', desc: 'Give seats to elderly, pregnant women, and injured passengers; avoid using mobile phones near these seats when crowded.' },
          { label: 'Backpack Courtesy', desc: 'Carry backpacks on your front or place them on the overhead racks during rush hour.' },
        ],
        proTip: 'Line up neatly between the painted double lines on station platforms before train doors open.',
      },
      {
        id: 'jp-chopsticks',
        cat: 'DINING',
        title: 'Dining Customs & Chopstick Taboos',
        sub: 'खाना खाने नियम र चपस्टिकको निषेध (箸の作法)',
        badge: 'Table Etiquette',
        summary: 'Food is sacred in Japan; table rituals show gratitude to nature and the cook.',
        points: [
          { label: 'Phrases Before & After', desc: 'Say "Itadakimasu" (いただきます) with palms together before eating, and "Gochisousama-deshita" (ごちそうさまでした) upon finishing.' },
          { label: 'Hashi-Watashi (箸渡し - Taboo!)', desc: 'Never pass food chopstick-to-chopstick! This directly mimics the Buddhist funeral bone-gathering ritual.' },
          { label: 'Tsukitate-Bashi (突き立て箸 - Taboo!)', desc: 'Never stick chopsticks vertically into rice bowls; this is only done as an offering at funerals.' },
          { label: 'Noodle Slurping', desc: 'Slurping ramen and soba noodles is completely acceptable and aerates the broth aroma.' },
        ],
        proTip: 'Japan has NO tipping culture. If you leave cash tips on the table, staff will run outside after you to return your forgotten money.',
      },
      {
        id: 'jp-hourenso',
        cat: 'WORKPLACE',
        title: 'Workplace Hou-Ren-So & Punctuality',
        sub: 'कम्पनीको मुख्य नियम: हो-रेन-सो (報連相)',
        badge: 'Business Culture',
        summary: 'The legendary tripartite framework governing all Japanese businesses and factories.',
        points: [
          { label: 'Hōkoku (報告 - Report)', desc: 'Regularly inform your supervisor on task progress, especially when finished or stuck.' },
          { label: 'Renraku (連絡 - Communicate)', desc: 'Instantly notify relevant teammates of schedule changes, delays, or new facts without opinion.' },
          { label: 'Sōdan (相談 - Consult)', desc: 'Seek advice and confirmation from seniors before making risky decisions independently.' },
          { label: '5-10 Minutes Early Rule', desc: 'Being exactly on time is considered late. Arrive 5 to 10 minutes before all meetings and shifts.' },
        ],
        proTip: 'Business cards (Meishi 名刺) are received with both hands, held respectfully, and placed neatly atop your card case on the meeting table.',
      },
    ];

  // 7. Tab 4: Visa & PR
  const visaRenewal = {
    title: isNe
      ? 'भिसा नवीकरण, स्टाटस परिवर्तन र स्थायी बसोबास (PR) प्रक्रिया'
      : 'Visa Renewal, Status Change & PR Pathways (भिसा नवीकरण र पीआर)',
    sub: isNe
      ? 'जापानमा कानुनी बसाइ थप्ने, विद्यार्थीबाट कामदार भिसामा जाने र स्थायी बसोबास (PR) पाउने नियमहरू।'
      : 'Step-by-step guidance for renewing your stay, transitioning from Student to Work visa, and qualifying for Permanent Residency (PR).',
    cards: isNe
      ? [
          {
            title: 'भिसा नवीकरण कहिले गर्ने? (Extension Timeline)',
            desc: 'आफ्नो भिसा सकिनुभन्दा ३ महिना अगावै क्षेत्रीय अध्यागमन कार्यालय (Immigration Bureau) मा नवीकरण आवेदन दिन सकिन्छ। भिसाको म्याद कहिल्यै गुज्रिन नदिनुहोस्!',
          },
          {
            title: isJapan ? 'विद्यार्थीबाट एसएसडब्ल्यू (SSW) वा इन्जिनियर भिसा' : 'E-9 बाट E-7-4 दक्ष कामदार भिसा',
            desc: isJapan
              ? 'भाषा कलेज वा विश्वविद्यालय सकिएपछि सीप परीक्षा र JLPT N4 उत्तीर्ण गरी SSW-1 भिसा वा विश्वविद्यालयको डिग्री भएमा कम्पनीसँग सम्झौता गरी "Engineer/Specialist in Humanities" भिसामा जान सकिन्छ।'
              : '४ वर्षभन्दा बढी बसेका ईपीएस कामदारहरूले कोरियन भाषा (TOPIK 3+ वा KIIP Level 3) पूरा गरी E-7-4 दक्ष कामदार भिसामा परिवर्तन गर्न सक्छन्, जसबाट परिवार ल्याउन पाइन्छ।',
          },
          {
            title: 'परिवार (श्रीमान्/श्रीमती र छोराछोरी) बोलाउने नियम',
            desc: isJapan
              ? 'कामदार भिसा भएका र SSW-2 कामदारहरूले डिपेन्डेन्ट भिसा (家族滞在 Kazoku Taizai) मा परिवार बोलाउन पाउँछन्। यसका लागि पर्याप्त आम्दानी र कर चुक्ता प्रमाणपत्र चाहिन्छ।'
              : 'E-7 तथा उच्च दक्ष भिसावाहकहरूले F-3 डिपेन्डेन्ट भिसामा परिवारलाई आमन्त्रण गर्न सक्छन्।',
          },
          {
            title: 'स्थायी बसोबास (PR - Permanent Residency)',
            desc: isJapan
              ? 'सामान्यतया लगातार १० वर्ष जापान बसेको हुनुपर्छ (जसमा कम्तीमा ५ वर्ष कामदार भिसामा हुनुपर्छ)। उच्च दक्ष जनशक्ति (HSP) ले ७०-८० अंक ल्याएमा १ देखि ३ वर्षमै पीआर पाउन सक्छन्।'
              : 'कोरियामा F-5 स्थायी बसोबासका लागि KIIP Level 5 उत्तीर्ण हुनुपर्छ र तोकिएको वार्षिक आम्दानी मापदण्ड पूरा गर्नुपर्छ।',
          },
        ]
      : [
          {
            title: 'When to Apply for Renewal (नवीकरण कहिले गर्ने?)',
            desc: 'Applications for extension of period of stay can be filed starting 3 months prior to your visa expiration date at Regional Immigration Bureau. Never let your visa expire!',
          },
          {
            title: isJapan ? 'Student to SSW / Engineer Visa' : 'E-9 to E-7-4 Skilled Worker',
            desc: isJapan
              ? 'Graduating students can transition to SSW-1 (Specified Skilled Worker) with technical exam pass + N4/JFT, or to "Engineer/Specialist in Humanities" visa with a university degree and company job contract.'
              : 'Diligent E-9 workers with 4+ years residence can convert to E-7-4 point-based skilled worker visa with Korean language proficiency (TOPIK 3+ or KIIP level 3), enabling family accompaniment.',
          },
          {
            title: 'Dependent Family Invitation (परिवार बोलाउने)',
            desc: isJapan
              ? 'Work visa holders and SSW-2 workers can invite spouse and children on Dependent Visa (Kazoku Taizai). Requires tax certificate proving sufficient income.'
              : 'E-7, D-2 advanced, and long-term professional visa holders can sponsor family under F-3 Dependent Visa.',
          },
          {
            title: 'Permanent Residence (PR 永住権 / 영주권)',
            desc: isJapan
              ? 'General requirement is 10 consecutive years of residence (including 5 years on a work visa). Highly Skilled Professionals (HSP) can apply in just 1 to 3 years with 70–80 points.'
              : 'F-5 Permanent Residency requires passing KIIP Level 5, continuous residence, and meeting GNI per capita income threshold.',
          },
        ],
  };

  // 8. Tab 5: Labor Rights
  const rights = {
    title: isNe
      ? 'श्रम अधिकार, न्यूनतम पारिश्रमिक र काम गर्ने कडा नियमहरू'
      : 'Labor Rights, Minimum Wage & Part-Time Rules (कामदारको अधिकार र नियम)',
    cards: isNe
      ? [
          {
            title: 'हप्तामा २८ घण्टा कामको कडा नियम (Strict 28-Hour Rule)',
            desc: isJapan
              ? 'विद्यार्थी भिसा भएकाहरूले सबै पार्ट-टाइम काम जोडेर हप्तामा बढीमा २८ घण्टा मात्र काम गर्न पाउँछन्। २९ घण्टा काम गरेमा पनि अध्यागमनले भिसा रद्द गरी नेपाल डिपोर्ट गर्न सक्छ। कलेजको लामो विदा (गर्मी/जाडो) मा दिनको ८ घण्टा (हप्ताको ४० घण्टा) सम्म काम गर्न पाइन्छ।'
              : 'D-2 विद्यार्थीले पढाइ चल्दा हप्तामा २०-२५ घण्टा मात्र काम गर्न पाउँछन्। E-9 कामदारहरू तोकिएको दर्ता भएको कम्पनीमा मात्र काम गर्नुपर्छ।',
            alert: true,
          },
          {
            title: 'न्यूनतम ज्यालाको कानुनी ग्यारेन्टी (Minimum Wage)',
            desc: isJapan
              ? 'सबै मालिकले तोकिएको सरकारी न्यूनतम ज्याला दिनैपर्छ (जस्तै टोकियो ¥१,१६३/घण्टा, कानागावा ¥१,१६२/घण्टा, ओसाका ¥१,११४/घण्टा)। यसभन्दा कम दिनु गैरकानुनी हो।'
              : 'कोरियामा राष्ट्रिय न्यूनतम ज्याला करिब ₩९,८६०/घण्टा छ, साथै १ वर्ष काम गरेपछि विदाको अतिरिक्त भत्ता र उपदान (Severance Pay) अनिवार्य छ।',
          },
          {
            title: 'ओभरटाइम र रात्रिकालीन भत्ता (Overtime & Night Allowance)',
            desc: 'दिनको ८ घण्टा वा हप्ताको ४० घण्टाभन्दा बढी काम गरेमा २५% थप ज्याला (१२५%) पाउनुपर्छ। राति १० बजेदेखि बिहान ५ बजेसम्म काम गर्दा थप २५% रात्रि भत्ता अनिवार्य छ।',
          },
          {
            title: 'तलब नपाएमा वा दुर्व्यवहार भएमा उजुरी गर्ने ठाउँ (Labor Bureau)',
            desc: isJapan
              ? 'मालिकले तलब रोकेमा वा अन्याय गरेमा श्रम मानक निरीक्षण कार्यालय (Rouki 労働基準監督署) मा उजुरी गर्नुहोस्। उनीहरूले नाम गोप्य राखेर छानबिन गर्छन् र तलब दिलाइदिन्छन्।'
              : 'तलब नपाएमा रोजगार तथा श्रम मन्त्रालय (MOEL) वा विदेशी कामदार सहायता केन्द्रमा तुरुन्त उजुरी दिनुहोस्।',
          },
        ]
      : [
          {
            title: 'Strict Part-Time Limits (हप्तामा २८ घण्टा नियम)',
            desc: isJapan
              ? 'Student visa holders are strictly capped at 28 hours per week across ALL part-time jobs combined. Working even 29 hours can result in visa renewal rejection and deportation. During official school vacations (summer/winter), up to 40 hours/week (8h/day) is permitted.'
              : 'D-2 students are limited to 20–25 hours/week during term time. E-9 workers must only work at their registered designated employer site.',
            alert: true,
          },
          {
            title: 'Minimum Wage Protection (न्यूनतम ज्याला अधिकार)',
            desc: isJapan
              ? 'All employers must pay at least the statutory prefectural minimum wage (e.g. Tokyo ¥1,163/hr, Kanagawa ¥1,162/hr, Osaka ¥1,114/hr). Paying less is illegal.'
              : 'Korea enforces a nationwide statutory minimum wage of approx ₩9,860/hr, with guaranteed holiday pay and severance pay for 1+ year service.',
          },
          {
            title: 'Overtime & Night Allowance (ओभरटाइम थप रकम)',
            desc: 'Work exceeding 8 hours/day or 40 hours/week must be paid at 125% regular wage. Night shifts (10:00 PM – 5:00 AM) must receive an additional 25% night shift premium.',
          },
          {
            title: 'Unpaid Wages & Harassment Recourse',
            desc: isJapan
              ? 'If your employer withholds salary or abuses rights, report to the Labor Standards Inspection Office (Rouki). They investigate anonymously and compel payment.'
              : 'Report unpaid wages to the Ministry of Employment and Labor (MOEL) or EPS counseling center for foreign workers.',
          },
        ],
  };

  // 9. Tab 6: Emergency
  const emergency = {
    title: isNe
      ? 'आपतकालीन हटलाइन र नेपाली राजदूतावास सम्पर्क'
      : 'Emergency Helplines & Embassy Contacts (आपतकालीन सम्पर्क)',
    cards: isNe
      ? [
          {
            title: 'प्रहरी आपतकालीन सेवा (Police 110)',
            contact: isJapan ? '११० (110)' : '११२ (112)',
            desc: 'सडक दुर्घटना, चोरी, अपराधको सूचना, हराएको पर्स वा कार्ड रिपोर्ट गर्न (२४ घण्टा निःशुल्क)',
          },
          {
            title: 'एम्बुलेन्स तथा दमकल (Ambulance & Fire 119)',
            contact: '११९ (119)',
            desc: 'अकस्मात गम्भीर बिरामी पर्दा, चोटपटक लाग्दा वा आगलागी हुँदा तुरुन्त डायल गर्नुहोस्',
          },
          {
            title: `नेपाली राजदूतावास (${isJapan ? 'टोकियो' : 'सियोल'})`,
            contact: isJapan ? '📍 मेगुरो-कु, टोकियो · फोन: 03-3713-6240' : '📍 सियोल · फोन: 02-3789-9770',
            desc: 'राहदानी नवीकरण, कन्सुलर प्रमाणीकरण, कानूनी समस्या तथा आपतकालीन उद्धार सहायताका लागि',
          },
          {
            title: isJapan ? 'टोकियो बहुभाषिक स्वास्थ्य तथा कानुनी परामर्श' : 'कोरिया १३४५ अध्यागमन परामर्श केन्द्र',
            contact: isJapan ? 'टोकियो मेडिकल गाइड: 03-5285-8181' : '१३४५ सम्पर्क केन्द्र (नेपाली भाषा उपलब्ध)',
            desc: 'विदेशी नागरिकका लागि डाक्टर खोज्न तथा भिसासम्बन्धी आधिकारिक कानूनी सल्लाह लिन',
          },
        ]
      : [
          {
            title: 'Police Emergency (प्रहरी)',
            contact: isJapan ? '110' : '112',
            desc: 'Traffic accidents, theft, crime report, lost wallet/card',
          },
          {
            title: 'Ambulance & Fire (एम्बुलेन्स तथा दमकल)',
            contact: '119',
            desc: 'Sudden illness, severe injury, fire accident (Available 24/7)',
          },
          {
            title: `Embassy of Nepal (${isJapan ? 'Tokyo' : 'Seoul'})`,
            contact: isJapan ? '📍 Meguro-ku, Tokyo · Tel: 03-3713-6240' : '📍 Seongbuk-gu, Seoul · Tel: 02-3789-9770',
            desc: 'Passport renewal, consular verification, emergency repatriation assistance',
          },
          {
            title: isJapan ? 'Japan Health & Medical Hotline' : 'Korea 1345 Immigration Hotline',
            contact: isJapan ? 'Tokyo Multilingual Medical Guide: 03-5285-8181' : '1345 Contact Center (Nepali service available)',
            desc: 'Finding foreign-friendly doctors and official visa advice in Nepali & English',
          },
        ],
  };

  // 10. Quiz
  const quiz: LifeQuizItem[] = isJapan
    ? isNe
      ? [
          {
            q: 'जापानमा रामेन वा सोबा चाउचाउ खाँदा कस्तो नियम प्रचलित छ?',
            options: [
              'आवाज निकालेर सुरूप्प तान्नु अपमानजनक र निषेधित मानिन्छ',
              'आवाज निकालेर खानु राम्रो मानिन्छ, यसले स्वाद बढाउँछ र पकाउनेप्रति आदर जनाउँछ',
              'चपस्टिकले चाउचाउ काटेर मात्र खानुपर्छ',
              'पहिले सेफसँग अनुमति लिनुपर्छ',
            ],
            correct: 1,
            explanation: 'जापानमा चाउचाउ आवाज निकालेर खानु (Slurping) संस्कृतिमै राम्रो मानिन्छ! यसले तातो चाउचाउलाई चिस्याउँछ र सुगन्ध मुखभरि फैलाउँछ।',
          },
          {
            q: 'जापानमा "हाशी-वाताशी" (चपस्टिकबाट अर्काको चपस्टिकमा सिधै खाना दिनु) किन कडा निषेध छ?',
            options: [
              'साथीभाइबीचको आत्मीयता देखाउने चलन हो',
              'कडा निषेध छ किनभने यो बौद्ध मृत्यु संस्कारमा अस्तु संकलन गर्ने विधि जस्तो देखिन्छ',
              'विवाहको औपचारिक परम्परा हो',
              'खाना पकाउने एउटा तरिका हो',
            ],
            correct: 1,
            explanation: 'हाशी-वाताशी जापानमा कडा निषेध (Taboo) छ। दाहसंस्कारको बेला मात्र अस्तुलाई एक चपस्टिकबाट अर्को चपस्टिकमा पास गरिन्छ।',
          },
          {
            q: 'जापानका रेस्टुरेन्ट र ट्याक्सीमा टिप्स (Tips) दिनुपर्छ कि पर्दैन?',
            options: [
              'सधैं १५% देखि २०% सम्म अनिवार्य टिप्स दिनुपर्छ',
              'टेबुलमा अतिरिक्त सिक्का छोडिदिनुपर्छ',
              'कदापि टिप्स दिनुहुँदैन; टेबुलमा पैसा छोडे वेटर पैसा फिर्ता गर्न तपाईंको पछि दौडिनेछन्',
              'ठूला तारे होटलमा मात्र दिनुपर्छ',
            ],
            correct: 2,
            explanation: 'जापानमा टिप्स दिने कुनै संस्कृति छैन। सेवा शुल्क पहिल्यै बिलमा जोडिएको हुन्छ। टेबुलमा पैसा छोड्दा भुलेको ठानेर वेटर बाहिरसम्म फिर्ता गर्न आउँछन्!',
          },
        ]
      : [
          {
            q: 'When eating ramen or soba noodles in Japan, what is the customary rule?',
            options: [
              'Slurping is rude and forbidden',
              'Slurping is polite, welcomed, and aerates the broth flavor',
              'You must cut noodles with chopsticks before eating',
              'You must ask the chef for permission',
            ],
            correct: 1,
            explanation: 'Slurping noodles (Soba and Ramen) is culturally encouraged in Japan! It cools the hot noodles and enhances the broth aroma.',
          },
          {
            q: 'What is "Hashi-watashi" (passing food chopstick-to-chopstick) in Japan?',
            options: [
              'A warm friendly gesture between friends',
              'A strict taboo because it resembles crematorium funeral bone rituals',
              'A formal wedding tradition',
              'A cooking technique',
            ],
            correct: 1,
            explanation: 'Hashi-watashi is a strict taboo. Only during Japanese Buddhist crematorium ceremonies are bone fragments passed from chopstick to chopstick.',
          },
          {
            q: 'How should you handle tipping at Japanese restaurants and taxis?',
            options: [
              'Always tip 15% to 20%',
              'Leave extra coins on the table',
              'Never tip; service is included and staff will chase you to return forgotten money',
              'Tip only in luxury hotels',
            ],
            correct: 2,
            explanation: 'Japan has no tipping culture. Leaving extra coins causes confusion, and waiters will literally run outside to return your forgotten change!',
          },
        ]
    : isNe
      ? [
          {
            q: 'कोरियामा सिनियर वा हाकिमलाई पैसा, पेय वा सामान दिँदा कसरी दिनुपर्छ?',
            options: [
              'छिटो देब्रे हातले दिने',
              'दुवै हातले दिने, वा दायाँ हातले दिँदा बायाँ हातले दायाँ कुहिनो वा पाखुरालाई छुने',
              'टेबलमा फ्याँकेर दिने',
              'दायाँ हातले दिने र देब्रे हात खल्तीमा राख्ने',
            ],
            correct: 1,
            explanation: 'कोरियामा दुई-हात नियम (Two-hand rule) आधारभूत शिष्टाचार हो। आदर देखाउन सधैं दुवै हातले सामान दिनु र लिनुपर्छ।',
          },
        ]
      : [
          {
            q: 'When handing money, a drink, or documents to an elder or boss in Korea, how should you do it?',
            options: [
              'Quickly with your left hand',
              'With both hands, or with right hand supported under the forearm',
              'Throw it on the table politely',
              'With your right hand only while keeping left hand in your pocket',
            ],
            correct: 1,
            explanation: 'The two-hand rule is fundamental in Korea. Always give and receive items with both hands to show respect.',
          },
        ];

  return {
    hero,
    tabs,
    costs,
    setup,
    housing,
    cultureCategories,
    cultureModules: isJapan ? japanCultureModules : [],
    visaRenewal,
    rights,
    emergency,
    quiz,
  };
}
