export interface StudentTabItem {
  key: 'COLLEGES' | 'SCHOLARSHIPS' | 'TIPS_SOP' | 'PROCESS' | 'FINANCIALS' | 'CHECKLIST' | 'WORK_RIGHTS';
  slug: string;
  label: string;
}

export function getStudentVisaData(country: 'japan' | 'korea', isNe: boolean) {
  const isJapan = country === 'japan';
  const cName = isJapan ? (isNe ? 'जापान' : 'Japan') : (isNe ? 'दक्षिण कोरिया' : 'Korea');

  const hero = {
    badge: isNe
      ? (isJapan ? '🇯🇵 जापान अध्ययन पूर्ण मार्गदर्शन' : '🇰🇷 कोरिया अध्ययन पूर्ण मार्गदर्शन')
      : (isJapan ? '🇯🇵 Study in Japan Master Guide' : '🇰🇷 Study in Korea Master Guide'),
    updatedBadge: isNe ? '२०२६/२०२७ इन्टेकका लागि अद्यावधिक' : 'Updated for 2026/2027 Intakes',
    title: isNe
      ? (isJapan
          ? 'जापान विद्यार्थी भिसा (Ryugaku 留学) को पूर्ण मास्टर गाइड'
          : 'कोरिया विद्यार्थी भिसा (D-2 / D-4 유학) को पूर्ण मास्टर गाइड')
      : (isJapan
          ? 'Complete Master Guide to Student Visa (Ryugaku 留学) in Japan'
          : 'Complete Master Guide to Student Visa (D-2 / D-4 유학) in Korea'),
    sub: isNe
      ? (isJapan
          ? 'नेपाली विद्यार्थीहरूका लागि सम्पूर्ण प्रक्रिया: भाषा विद्यालय र सेन्मोन गाक्को छनोट, MEXT तथा JASSO छात्रवृत्ति, उद्देश्य पत्र (SOP) लेखन, वडा कार्यालयका स्पन्सर कागजात (नाता प्रमाणित/कर चुक्ता), र जापानी राजदूतावास काठमाडौंको अन्तर्वार्ता तयारी।'
          : 'GKS छात्रवृत्ति, D-4 कोरियन भाषा तालिम, D-2 डिग्री भर्ना, बैंक मौज्दात प्रमाणपत्र, वडा कार्यालय कर चुक्ता, र TOPIK ट्युसन छुटसम्बन्धी प्रामाणिक मार्गदर्शन।')
      : (isJapan
          ? 'Everything Nepali students need: choosing language schools & Senmon Gakko, MEXT scholarships, Statement of Purpose (SOP) blueprints, ward sponsor documents (Nata Pramanit), and Embassy Kathmandu interview readiness.'
          : 'The definitive roadmap for GKS scholarships, D-4 Korean language courses, D-2 degree admissions, Bank balance proof, Ward tax clearance, and TOPIK tuition merit waivers.'),
    quickLinks: isNe
      ? [
          { label: 'अध्ययन सामग्री', key: 'learn' },
          { label: 'अन्तर्वार्ता तयारी', key: 'interview' },
          { label: 'नमुना परीक्षा (CBT)', key: 'exams' },
          { label: 'कोठा तथा आवास', key: 'rooms' },
        ]
      : [
          { label: 'Study Materials', key: 'learn' },
          { label: 'Interview Prep', key: 'interview' },
          { label: 'Mock Test CBT', key: 'exams' },
          { label: 'Rooms & Housing', key: 'rooms' },
        ],
  };

  const tabs: StudentTabItem[] = isNe
    ? [
        { key: 'COLLEGES', slug: 'schools', label: '१. विद्यालय छनोट' },
        { key: 'SCHOLARSHIPS', slug: 'scholarships', label: '२. छात्रवृत्ति' },
        { key: 'TIPS_SOP', slug: 'sop', label: '३. SOP र अन्तर्वार्ता' },
        { key: 'PROCESS', slug: 'process', label: '४. भिसा प्रक्रिया' },
        { key: 'FINANCIALS', slug: 'financials', label: '५. स्पन्सर र कागजात' },
        { key: 'CHECKLIST', slug: 'checklist', label: '६. कागजात चेकलिस्ट' },
        { key: 'WORK_RIGHTS', slug: 'work-rights', label: '७. कामको अधिकार (२८ घ)' },
      ]
    : [
        { key: 'COLLEGES', slug: 'schools', label: '1. Choosing Schools' },
        { key: 'SCHOLARSHIPS', slug: 'scholarships', label: '2. Scholarships' },
        { key: 'TIPS_SOP', slug: 'sop', label: '3. SOP & Guidance' },
        { key: 'PROCESS', slug: 'process', label: '4. Visa Process' },
        { key: 'FINANCIALS', slug: 'financials', label: '5. Sponsor & Ward Docs' },
        { key: 'CHECKLIST', slug: 'checklist', label: '6. Document Checklist' },
        { key: 'WORK_RIGHTS', slug: 'work-rights', label: '7. Student Work (28h)' },
      ];

  const colleges = isNe
    ? [
        {
          icon: isJapan ? '🏫' : '🏛️',
          title: isJapan ? 'जापानी भाषा विद्यालय (日本語学校)' : 'विश्वविद्यालय भाषा इन्स्टिच्युट (어학당)',
          desc: isJapan
            ? '१ देखि २ वर्षको गहन भाषा अध्ययनको मुख्य प्रवेशद्वार। विद्यार्थीहरूलाई JLPT N2/N1, EJU परीक्षा र विश्वविद्यालय वा सेन्मोन गाक्को भर्नाका लागि तयार पार्छ।'
            : '१० हप्ताको गहन सत्रहरू। डिग्री अध्ययनमा जानका लागि TOPIK Level 3-4 हासिल गर्न मद्दत गर्दछ।',
          criteria: isJapan
            ? 'छनोटका आधार: मन्त्रालयको मान्यता, ९०% भन्दा बढी भिसा सफलता दर, होस्टल सुविधा, JLPT उत्तीर्ण दर।'
            : 'छनोटका आधार: विश्वविद्यालयको मान्यता, छात्रवृत्ति सुविधा, TOPIK कक्षा र आवास।',
          tuition: isJapan ? '¥७००,००० – ¥८५०,००० / वर्ष' : '₩५,०००,००० – ₩६,८००,००० / वर्ष',
          intakes: isJapan ? 'इन्टेकहरू: अप्रिल, जुलाई, अक्टोबर, जनवरी' : 'इन्टेकहरू: मार्च, जुन, सेप्टेम्बर, डिसेम्बर',
        },
        {
          icon: '⚙️',
          title: isJapan ? 'भोकेसनल कलेज (専門学校 - सेन्मोन गाक्को)' : 'जुनियर कलेज (전문대학)',
          desc: isJapan
            ? '२ वर्षे प्राविधिक कलेजहरू जसले IT, अटोमोबाइल इन्जिनियरिङ, होटल म्यानेजमेन्ट, केयरगिभिङ (Kaigo) र बिजनेस अनुवादमा १००% रोजगारी दिलाउँछन्।'
            : '२ देखि ३ वर्षे व्यावहारिक औद्योगिक तालिम जसबाट सिधै E-7 दक्ष कामदार भिसामा परिवर्तन गर्न सकिन्छ।',
          criteria: isJapan
            ? 'भर्ना योग्यता: JLPT N2 (वा ६ महिना भाषा विद्यालय पढेर N3) / EJU स्कोर।'
            : 'भर्ना योग्यता: TOPIK Level 3 वा सोसरह।',
          tuition: isJapan ? 'Senmonshi (डिप्लोमा डिग्री) जसले सिधै कामदार भिसा पाउँछ' : 'प्राविधिक डिग्री',
          intakes: isJapan ? 'सिधै गिजिनकोकु (Gijinkoku) वा SSW कामदार भिसामा जान सकिने' : 'E-7 कामदार भिसामा जान सकिने',
        },
        {
          icon: '🎓',
          title: isJapan ? 'विश्वविद्यालय (大学 - Daigaku)' : 'विश्वविद्यालय (대학교 - 4 वर्षे)',
          desc: '४ वर्षे स्नातक (Bachelor) वा २ वर्षे स्नातकोत्तर (Master) डिग्री। जापानी/कोरियन माध्यमका साथै पूर्ण अंग्रेजी (English Medium) कार्यक्रमहरू पनि उपलब्ध छन्।',
          criteria: isJapan
            ? 'प्रमुख संस्थाहरू: टोकियो युनिभर्सिटी, क्योतो, वासेदा, केइओ, APU।'
            : 'प्रमुख संस्थाहरू: SKY (सियोल नेशनल, कोरिया, योन्सेई), KAIST, सुङक्युङक्वान।',
          tuition: 'शैक्षिक योग्यता र प्रवेश परीक्षाका आधारमा ३०% देखि १००% सम्म ट्युसन छुट।',
          intakes: 'पीआर (PR) का लागि उच्चतम अंक प्राप्त हुने (Highly Skilled Professional Track)',
        },
      ]
    : [
        {
          icon: isJapan ? '🏫' : '🏛️',
          title: isJapan ? 'Japanese Language Schools (日本語学校)' : 'University Language Institutes (어학당)',
          desc: isJapan
            ? 'Primary gateway for 1 to 2-year intensive study. Prepares students for JLPT N2/N1, EJU exams, and university/Senmon Gakko admission.'
            : '10-week intensive terms at recognized Korean universities (Yonsei, Korea Univ, SNU, Pusan). Focuses on TOPIK Level 3–4 attainment for degree transfer.',
          criteria: 'Selection Criteria: Ministry accreditation, visa passing rate (>90%), hostel availability, JLPT pass rate.',
          tuition: isJapan ? '¥700,000 – ¥850,000 / year' : '₩5,000,000 – ₩6,800,000 / year',
          intakes: isJapan ? 'Intakes: April, July, October, January' : 'Intakes: March, June, September, December',
        },
        {
          icon: '⚙️',
          title: isJapan ? 'Vocational Colleges (専門学校 - Senmon Gakko)' : 'Junior Colleges (전문대학)',
          desc: isJapan
            ? '2-year diploma granting technical colleges focused on 100% employment in IT, Automotive, Hotel, Caregiving, and Business Translation.'
            : '2 to 3-year practical industry training in South Korea with fast-track direct employment E-7 work visa conversion.',
          criteria: 'Admission Requirement: JLPT N2 (or N3 with 6 months language school) / TOPIK Level 3.',
          tuition: 'Degree Conferred: Senmonshi (Diploma) eligible for work visa.',
          intakes: 'Leads directly to Gijinkoku or E-7 Work Visa',
        },
        {
          icon: '🎓',
          title: isJapan ? 'Universities (大学 - Daigaku)' : 'Universities (대학교 - 4-Year)',
          desc: '4-year Bachelor’s or 2-year Master’s degree programs. Offers both Japanese/Korean-medium degree tracks and all-English EMI degree programs.',
          criteria: isJapan ? 'Top Institutions: Tokyo, Kyoto, Waseda, Keio, APU' : 'Top Institutions: SKY (Seoul National, Korea, Yonsei), KAIST',
          tuition: 'Merit Waivers: 30% to 100% tuition waivers widely granted based on academic entrance score.',
          intakes: 'Maximum PR Points (Highly Skilled Professional Track)',
        },
      ];

  const scholarships = {
    bannerTitle: isNe
      ? (isJapan ? 'जापानी सरकारी MEXT तथा JASSO छात्रवृत्तिहरू' : 'कोरियाली सरकारी GKS तथा विश्वविद्यालय छात्रवृत्तिहरू')
      : (isJapan ? 'Official Japanese Government & JASSO Scholarships' : 'Official Korean Government (GKS) & University Scholarships'),
    bannerDesc: isNe
      ? (isJapan
          ? 'जापान सरकार र निजी फाउन्डेसनहरूले १००% ट्युसन छुट, दुईतर्फी हवाई टिकट र मासिक आकर्षक भत्तासहित पूर्ण छात्रवृत्ति प्रदान गर्छन्। नेपाली विद्यार्थीहरूले काठमाडौंस्थित जापानी राजदूतावास वा जापान पुगेपछि कलेजको सिफारिसमा आवेदन दिन सक्छन्।'
          : 'कोरिया सरकार (NIIED) र विश्वविद्यालयहरूले १००% ट्युसन छुट, टिकट र मासिक जीवनयापन भत्तासहित पूर्ण छात्रवृत्ति दिन्छन्। काठमाडौंस्थित कोरियाली राजदूतावास वा सिधै विश्वविद्यालयमार्फत आवेदन दिन सकिन्छ।')
      : (isJapan
          ? 'The Japanese government and private foundations offer fully-funded scholarships covering 100% tuition, return airfare, and a substantial monthly living stipend. Nepali students can apply via the Embassy of Japan in Kathmandu or through university/school recommendations.'
          : 'The Korean government (NIIED) and universities offer fully-funded scholarships covering 100% tuition, return airfare, and monthly living stipends.'),
    items: isJapan
      ? isNe
        ? [
            {
              title: 'मेक्स्ट (MEXT - Monbukagakusho) पूर्ण छात्रवृत्ति',
              badge: '१००% निःशुल्क (Full Ride)',
              points: [
                'सुविधा: १००% कलेज शुल्क मिनाहा + मासिक ¥११७,००० देखि ¥१४५,००० भत्ता + नेपाल-जापान आउने-जाने हवाई टिकट।',
                'विधा: स्नातक (Undergraduate ५ वर्ष), अनुसन्धान/मास्टर्स (Research २-३ वर्ष), प्राविधिक कलेज (४ वर्ष)।',
                'काठमाडौं तालिका: प्रत्येक वर्ष वैशाख/जेठमा पानीपोखरीस्थित जापानी राजदूतावासमा आवेदन खुल्छ। अंग्रेजी, जापानी र गणितको लिखित परीक्षा हुन्छ।',
              ],
            },
            {
              title: 'जास्सो (JASSO Honors) छात्रवृत्ति',
              badge: '¥४८,००० / महिना',
              points: [
                'सुविधा: उत्कृष्ट हाजिरी र GPA भएका स्व-लगानी (Self-financed) विद्यार्थीलाई मासिक ¥४८,००० (वार्षिक ¥५७६,०००) प्रदान गरिन्छ।',
                'योग्यता: जापानी भाषा कलेज वा विश्वविद्यालयमा ९०% भन्दा बढी हाजिरी भएको हुनुपर्छ।',
                'सिफारिस: जापान पुगिसकेपछि कलेजका प्रिन्सिपलले सिधै JASSO मा सिफारिस गर्दछन्।',
              ],
            },
          ]
        : [
            {
              title: 'MEXT (Monbukagakusho) Scholarship',
              badge: '100% Full Ride',
              points: [
                'Benefits: 100% tuition waiver + ¥117,000 to ¥145,000 monthly living stipend + roundtrip flights.',
                'Tracks: Undergraduate (5 yrs), Research/Master (2-3 yrs), College of Technology (4 yrs).',
                'Kathmandu Timeline: Applications open April/May at Embassy of Japan, Panipokhari, Kathmandu. Written exam in English/Japanese/Maths.',
              ],
            },
            {
              title: 'JASSO Honors Scholarship',
              badge: '¥48,000 / mo',
              points: [
                'Benefit: ¥48,000 per month (¥576,000 / year) awarded to self-financed students with top GPA and attendance.',
                'Eligibility: Enrolled in Japanese language school or university with >90% attendance record.',
                'Nomination: Recommended directly by your school principal after arrival in Japan.',
              ],
            },
          ]
      : isNe
        ? [
            {
              title: 'ग्लोबल कोरिया छात्रवृत्ति (GKS Scholarship)',
              badge: '१००% निःशुल्क (Full Ride)',
              points: [
                'सुविधा: १००% ट्युसन + मासिक ₩१,०००,००० भत्ता + बस्ने व्यवस्था + दुईतर्फी हवाई टिकट।',
                'माध्यम: राजदूतावास ट्र्याक (कोरियाली राजदूतावास ताहाचल) वा सिधै विश्वविद्यालय ट्र्याक।',
                'समय: सेप्टेम्बर (स्नातक) र फेब्रुअरी (मास्टर्स/पीएचडी)। १ वर्ष निःशुल्क कोरियन भाषा तालिम समावेश हुन्छ।',
              ],
            },
            {
              title: 'विश्वविद्यालय TOPIK मेरिट ट्युसन छुट',
              badge: '३०% देखि १००% सम्म छुट',
              points: [
                'TOPIK Level 3: धेरैजसो विश्वविद्यालयमा ३०% देखि ५०% सम्म ट्युसन स्वतः छुट हुन्छ।',
                'TOPIK Level 4–6: ७०% देखि १००% सम्म पूर्ण ट्युसन मिनाहा र क्याम्पस होस्टल सुविधा।',
                'BK21+ रिसर्च: साइन्स/इन्जिनियरिङमा प्रोफेसरको ल्याबबाट मासिक रिसर्च भत्ता पाइन्छ।',
              ],
            },
          ]
        : [
            {
              title: 'Global Korea Scholarship (GKS)',
              badge: '100% Full Ride',
              points: [
                'Benefits: 100% tuition + ₩1,000,000 monthly living stipend + settlement allowance + roundtrip airfare.',
                'Tracks: Embassy Track (Embassy of ROK, Tahachal, Kathmandu) and University Direct Track.',
                'Timeline: September (Undergrad) and February (Graduate/Master’s). Includes 1 free year of Korean language training!',
              ],
            },
            {
              title: 'University TOPIK Merit Waivers',
              badge: '30% to 100% Off',
              points: [
                'TOPIK Level 3: Automatically grants 30% to 50% tuition reduction at most universities.',
                'TOPIK Level 4–6: Grants 70% to 100% full tuition waiver plus on-campus dormitory support.',
                'BK21+ Assistantships: Research & teaching assistantships in STEM majors with monthly lab stipends.',
              ],
            },
          ],
  };

  const sop = {
    title: isNe
      ? 'उद्देश्य पत्र (SOP / 志望理由書) लेख्ने सही ढाँचा र नियम'
      : (isJapan ? 'Statement of Purpose (SOP / 志望理由書) Framework' : 'Statement of Purpose (SOP / 자기소개서) Framework'),
    desc: isNe
      ? 'तपाईंको उद्देश्य पत्र (SOP) जापानी अध्यागमनले सबैभन्दा बढी सूक्ष्म अध्ययन गर्ने मुख्य कागजात हो। अधिकृतहरूले तपाईंको अध्ययनको वास्तविक उद्देश्य, जापानी भाषाको आवश्यकता र आर्थिक स्रोतको स्पष्टता जाँच्ने गर्छन्।'
      : (isJapan
          ? 'Your SOP is the single most scrutinized document by Japanese Immigration. Officers assess authentic academic purpose, genuine Japanese study necessity, and clear financial solvency.'
          : 'Your SOP is the single most scrutinized document by Korean university admissions and Korea Immigration Service.'),
    paragraphs: isNe
      ? [
          { title: 'पहिलो अनुच्छेद: पृष्ठभूमि र परिचय', desc: 'नेपालमा पढेको विषय (+2 वा ब्याचलर) र आफ्नो करियर लक्ष्य बीचको सम्बन्ध स्पष्ट पार्नुहोस्।' },
          { title: isJapan ? 'दोस्रो अनुच्छेद: जापान नै किन?' : 'दोस्रो अनुच्छेद: दक्षिण कोरिया नै किन?', desc: isJapan ? 'अंग्रेजी बोल्ने देशको सट्टा जापान किन रोज्नुभयो? प्रविधि, कार्यसंस्कृति वा विशेष सीपबारे उल्लेख गर्नुहोस्।' : 'कोरियाली प्रविधि, उद्योग र कार्यसंस्कृतिबारे उल्लेख गर्नुहोस्।' },
          { title: 'तेस्रो अनुच्छेद: अध्ययन योजना', desc: 'पहिलो वर्षमा भाषा विद्यालय र JLPT N2/N1 उत्तीर्ण गर्ने र दोस्रो वर्षमा कलेज/विश्वविद्यालयको योजना।' },
          { title: 'चौथो अनुच्छेद: भविष्यको लक्ष्य', desc: 'पढाइ सकेपछि जापानको कम्पनीमा रोजगारी (Gijinkoku) वा नेपाल फर्केर उद्यमशीलता सुरु गर्ने स्पष्ट दृष्टिकोण।' },
        ]
      : [
          { title: 'Paragraph 1: Hook & Background', desc: 'Why this specific field? Connect your +2 or Bachelor’s major in Nepal with your career ambition.' },
          { title: isJapan ? 'Paragraph 2: Why Japan?' : 'Paragraph 2: Why South Korea?', desc: isJapan ? 'Why Japan over English-speaking countries? Mention technology, work culture, specialized Senmon skills, or academic research.' : 'Why South Korea over other destinations?' },
          { title: 'Paragraph 3: Study Plan', desc: 'Language school curriculum, target JLPT score in Year 1 (N2/N1), and intended college / Senmon major in Year 2.' },
          { title: 'Paragraph 4: Career Plan', desc: 'Clear future trajectory (e.g. working in Japanese IT/hospitality via Gijinkoku or returning to establish enterprise in Nepal).' },
        ],
    fraudWarningTitle: isNe
      ? 'नक्कली कन्सल्टेन्सी र कमसल विद्यालयहरूबाट बच्ने उपाय'
      : (isJapan ? 'How to Avoid Fake Consultancies & Unaccredited Japanese Schools' : 'How to Avoid Fake Consultancies & Uncertified Korean Universities'),
    fraudWarnings: isNe
      ? [
          'नेपालमा कन्सल्टेन्सीको व्यक्तिगत वा स्थानीय बैंक खातामा कलेजको ट्युसन कहिल्यै नतिर्नुहोस्। ट्युसन शुल्क सधैं बैंक TT मार्फत सिधै जापानको कलेजको खातामा पठाउनुपर्छ।',
          'जापानको भाषा विद्यालय ९०% भन्दा बढी भिसा सफलता दर भएको "तेकिकौकौ" (適正校 - Proper Accredited School) भए-नभएको जाँच गर्नुहोस्।',
          '"१००% ग्यारेन्टीसहित फुल-टाइम काम पाइने" भन्दै भ्रम छर्ने कन्सल्टेन्सीबाट टाढा रहनुहोस् — जापानमा विद्यार्थी भिसामा हप्ताको २८ घण्टा मात्र काम गर्न कानुनी अनुमति हुन्छ!',
        ]
      : [
          'Never pay tuition directly to local consultancy bank accounts in Nepal. Tuition must always be transferred directly to the school’s official institutional bank account via bank TT.',
          'Verify that the Japanese language school has a "Tekikoukou" (Proper Accredited School) designation with over 90% student visa renewal success.',
          'Avoid consultancies promising "100% full-time work with guaranteed visa" — international student visas in Japan strictly restrict work to 28 hours per week by law!',
        ],
  };

  const processSteps = isNe
    ? [
        {
          step: '०१',
          title: 'विद्यालय छनोट र अनलाइन अन्तर्वार्ता (इन्टेकभन्दा ६-८ महिनाअघि)',
          desc: 'आफूले रोजेको मान्यताप्राप्त भाषा विद्यालय छनोट गर्नुहोस्। जापानी शिक्षकहरूसँग १५ मिनेटको अनलाइन (Zoom/Skype) अन्तर्वार्ता दिएर सामान्य भाषा र प्रेरणा देखाउनुहोस्।',
        },
        {
          step: '०२',
          title: 'सीओई (COE) का लागि अध्यागमनमा कागजात पेश (४-५ महिनाअघि)',
          desc: 'नेपालबाट अनुवादित सम्पूर्ण कागजातहरू (नाता प्रमाणित, बैंक ब्यालेन्स, कर चुक्ता, जग्गा मूल्याङ्कन) जापानको क्षेत्रीय अध्यागमन कार्यालय (टोकियो/ओसाका) मा पेश गरिन्छ।',
        },
        {
          step: '०३',
          title: 'सीओई (COE) जारी र कलेज शुल्क बैंक ट्रान्सफर (२ महिनाअघि)',
          desc: 'अध्यागमनले योग्यता प्रमाणपत्र (COE) स्वीकृत गरेपछि कलेजबाट इनभ्वाइस आउँछ। नेपालको वाणिज्य बैंकबाट TT मार्फत सिधै जापानी कलेजको खातामा शुल्क पठाउनुहोस्।',
        },
        {
          step: '०४',
          title: 'काठमाडौंस्थित जापानी राजदूतावासमा भिसा आवेदन',
          desc: 'जापानी राजदूतावास (पानीपोखरी) वा अधिकृत VFS सेन्टरमा सक्कल COE, राहदानी र भिसा फारम बुझाउनुहोस् र आवश्यक परेमा अन्तर्वार्ता दिनुहोस्।',
        },
        {
          step: '०५',
          title: 'शिक्षा मन्त्रालय सानोठिमीबाट एनओसी (NOC) लिने',
          desc: 'शिक्षा मन्त्रालयको अनलाइन पोर्टल (सानोठिमी, भक्तपुर) बाट No Objection Certificate (NOC) लिनुहोस्। नेपाल राष्ट्र बैंकबाट विदेशी मुद्रा सटही गर्न यो अनिवार्य छ।',
        },
        {
          step: '०६',
          title: 'हवाई टिकट, कोठा व्यवस्थापन र जापान प्रस्थान',
          desc: 'टोकियो वा ओसाकाको टिकट काट्नुहोस्। विमानस्थल (नारिता/हानेदा) को अध्यागमन काउन्टरमै तपाईंको रेसिडेन्स कार्ड (Zairyu Card) र २८ घण्टा काम गर्ने अनुमति छाप तुरुन्त प्राप्त हुन्छ!',
        },
      ]
    : [
        {
          step: '01',
          title: 'School Selection & Online Video Interview (6–8 Months Before Intake)',
          desc: 'Select your accredited language school. Attend a 15-minute Zoom/Skype interview with Japanese school staff to assess your motivation and elementary Japanese.',
        },
        {
          step: '02',
          title: 'Document Submission for COE (Japan Immigration) (4–5 Months Before)',
          desc: 'All translated documents (Nata Pramanit, bank balance, property valuation, transcripts) submitted to Regional Immigration Bureau for Certificate of Eligibility (COE).',
        },
        {
          step: '03',
          title: 'COE Grant & Tuition Wire Transfer (2 Months Before Intake)',
          desc: 'Immigration grants your official Certificate of Eligibility (COE). Wire transfer tuition directly to the Japanese institution bank account via TT.',
        },
        {
          step: '04',
          title: 'Embassy of Japan Kathmandu Visa Submission',
          desc: 'Book appointment at Embassy of Japan in Panipokhari or authorized VFS Global Center in Kathmandu. Submit Original COE, Passport, and Visa Application Form.',
        },
        {
          step: '05',
          title: 'Ministry of Education (MOE) Sanothimi NOC Processing',
          desc: 'Apply online for the No Objection Certificate (NOC) through the Ministry of Education portal at Sanothimi, Bhaktapur.',
        },
        {
          step: '06',
          title: 'Flight Booking, Housing Arrangement & Departure',
          desc: 'Book flight ticket. Receive your Resident Card (Zairyu Card) and 28-hour part-time work permit stamp directly at the airport immigration counter!',
        },
      ];

  const financials = {
    title: isNe
      ? 'नेपालको वडा कार्यालय र आर्थिक स्पन्सरका कागजात नियम'
      : 'Nepal Ward Office & Financial Sponsor Requirements',
    sub: isNe
      ? 'जापानी अध्यागमनले विद्यार्थीका स्पन्सरसँग अवैध काममा भर नपरी ट्युसन र खर्च बेहोर्ने यथार्थ क्षमता छ कि छैन भनी कडा प्रमाण माग्दछ।'
      : 'Immigration requires strict proof that your sponsor has genuine capacity to cover your tuition and living expenses without relying on illegal work.',
    cards: isNe
      ? [
          {
            title: '१. मान्य स्पन्सरहरू (नाता प्रमाणित)',
            desc: 'पहिलो रगतको नाता मात्र: बुबा वा आमा हुनु सबैभन्दा राम्रो र बलियो मानिन्छ। कर र आम्दानी राम्रो भएमा आफ्नै दाजु वा दिदीले पनि स्पन्सर गर्न सक्छन्। वडा कार्यालयबाट छापसहितको सक्कल नाता प्रमाणित पत्र चाहिन्छ।',
          },
          {
            title: '२. बैंक ब्यालेन्स र स्टेटमेन्ट (Bank Balance)',
            desc: 'नेपालको "क" वर्गको वाणिज्य बैंकमा १८ देखि २५ लाख रुपैयाँ (करिब ¥२.५M देखि ¥३M) ३ देखि ६ महिनासम्म राखेको ब्यालेन्स सर्टिफिकेट। स्टेटमेन्टमा रकमको वास्तविक स्रोत (जग्गा बिक्री, व्यापार वा तलब) स्पष्ट हुनुपर्छ।',
          },
          {
            title: '३. वार्षिक आम्दानी प्रमाणपत्र (Annual Income)',
            desc: 'स्पन्सरको वार्षिक आम्दानी कम्तीमा ८ देखि १५ लाख रुपैयाँ हुनुपर्छ। दर्ता भएको व्यापार, कृषि आम्दानी प्रमाणपत्र, घर भाडा सम्झौता वा सरकारी/संस्थागत जागिरको तलब जोड्न सकिन्छ।',
          },
          {
            title: '४. कर चुक्ता प्रमाणपत्र (Tax Clearance)',
            desc: 'आन्तरिक राजस्व कार्यालय (IRD) वा स्थानीय नगरपालिका/वडाबाट पछिल्लो लगातार ३ आर्थिक वर्षको कर चुक्ता प्रमाणपत्र अनिवार्य छ। अपूरो वा नक्कली कर रेकर्डले भिसा तुरुन्त अस्वीकृत हुन्छ।',
          },
        ]
      : [
          {
            title: '1. Eligible Sponsors (नाता प्रमाणित)',
            desc: 'First blood relation only: Father or Mother is strongly recommended. Real elder brother or sister can also sponsor if their tax and income documents are exceptional.',
          },
          {
            title: '2. Bank Balance Certificate & Statement',
            desc: 'NPR 18 to 25 Lakhs maintained in a Class "A" commercial bank of Nepal for 3 to 6 months. Bank statement must clearly explain the authentic source of funds.',
          },
          {
            title: '3. Annual Income Proof (वार्षिक आम्दानी)',
            desc: 'Sponsor’s annual income should be NPR 8 to 15 Lakhs per year. Income sources can combine registered business earnings, agriculture, rent, or salary.',
          },
          {
            title: '4. Tax Clearance (कर चुक्ता प्रमाणपत्र)',
            desc: 'Tax clearance certificates for the last 3 consecutive fiscal years issued by the Inland Revenue Department (IRD) / local municipality.',
          },
        ],
  };

  const checklist = {
    title: isNe ? 'आवश्यक कागजातहरूको चेकलिस्ट' : 'Document Dossier Checklist',
    sub: isNe ? 'अध्यागमनमा बुझाउनुअघि सबै कागजात तयार छन् भनी निश्चित गर्नुहोस्।' : 'Track and verify all essential documents before submitting to immigration.',
    items: isNe
      ? [
          { id: 'doc1', title: 'शैक्षिक प्रमाणपत्रहरू (SEE / +2 / Bachelor)', desc: 'सक्कल ट्रान्सक्रिप्ट, क्यारेक्टर सर्टिफिकेट र प्रोभिजनल' },
          { id: 'doc2', title: 'जापानी भाषा दक्षता प्रमाणपत्र (JLPT N5 / NAT 5Q वा १५० घण्टा)', desc: 'प्रमाणित इन्स्टिच्युटबाट भाषा तालिमको हाजिरी र ग्रेड' },
          { id: 'doc3', title: 'सक्कल राहदानी (Passport)', desc: 'कम्तीमा २ वर्ष म्याद बाँकी भएको र डिजिटल कपी' },
          { id: 'doc4', title: 'उद्देश्य पत्र (Statement of Purpose / SOP)', desc: 'अध्ययनको कारण र भविष्यको योजना खुलाइएको हस्ताक्षरसहितको पत्र' },
          { id: 'doc5', title: 'वडा कार्यालय नाता प्रमाणित पत्र (Relationship Verification)', desc: 'स्पन्सर र विद्यार्थी बीचको पहिलो पुस्ताको नाता' },
          { id: 'doc6', title: 'बैंक मौज्दात प्रमाणपत्र र ६ महिनाको स्टेटमेन्ट', desc: 'नेपालको "क" वर्गको बैंकमा १८ देखि २५ लाख रुपैयाँ' },
          { id: 'doc7', title: 'पछिल्लो ३ वर्षको कर चुक्ता र आम्दानी प्रमाणपत्र', desc: 'आन्तरिक राजस्व कार्यालय वा नगरपालिकाबाट प्रमाणित' },
          { id: 'doc8', title: 'सक्कल योग्यता प्रमाणपत्र (COE) र दूतावास आवेदन फारम', desc: 'जापानी अध्यागमनबाट प्राप्त सक्कल COE' },
        ]
      : [
          { id: 'doc1', title: 'Academic Certificates (SLC/SEE, +2, Bachelor)', desc: 'Original Transcripts, Character Certificates & Provisional' },
          { id: 'doc2', title: 'Language Proficiency (JLPT N5 / NAT-TEST 5Q or 150h cert)', desc: 'Certified study hours from registered institute' },
          { id: 'doc3', title: 'Valid Passport', desc: 'At least 2 years validity remaining' },
          { id: 'doc4', title: 'Statement of Purpose (SOP / 志望理由書)', desc: 'Clear motivation and career roadmap signed by applicant' },
          { id: 'doc5', title: 'Sponsor Relationship Verification (नाता प्रमाणित)', desc: 'First blood relation from local ward office' },
          { id: 'doc6', title: 'Bank Balance & 6 Months Statement', desc: 'NPR 18 to 25 Lakhs from Class "A" commercial bank' },
          { id: 'doc7', title: '3 Years Tax Clearance & Income Certificates', desc: 'Official Inland Revenue Department verified records' },
          { id: 'doc8', title: 'Certificate of Eligibility (COE) Original & Visa Form', desc: 'Original grant from Japanese Immigration' },
        ],
  };

  const workRights = {
    title: isNe
      ? 'विद्यार्थीका काम गर्ने अधिकार: हप्तामा २८ घण्टाको कडा नियम'
      : 'Student Work Rights: Strict 28-Hour Rule & Restrictions',
    sub: isNe
      ? 'जापानमा अन्तर्राष्ट्रिय विद्यार्थीहरूले कानुनको दायराभित्र रहेर पार्ट-टाइम काम (Arubaito) गर्न पाउँछन्।'
      : 'International students in Japan can legally work part-time (Arubaito) within statutory limits.',
    cards: isNe
      ? [
          {
            title: '१. अध्यागमनको काम गर्ने अनुमति छाप (資格外活動許可)',
            desc: 'जापानको विमानस्थल (नारिता/हानेदा) मा अवतरण गर्दा नै "Shikakugai Katsudo Kyoka" फारम बुझाउनुहोस्। रेसिडेन्स कार्डको पछाडि हप्तामा २८ घण्टा काम गर्न पाउने छाप तुरुन्तै लगाइदिन्छन्।',
          },
          {
            title: '२. हप्तामा २८ घण्टाको कडा नियम (कदापि उल्लंघन नगर्नुहोस्)',
            desc: 'तपाईंले जतिवटा काम गरे पनि सबै जोडेर हप्तामा बढीमा २८ घण्टा मात्र काम गर्न पाइन्छ। २९ घण्टा काम गरेमा पनि बैंक खाता र कर प्रणालीबाट अध्यागमनले पत्ता लगाएर भिसा थप्न अस्वीकार गर्छ र नेपाल फर्काइदिन्छ।',
            alert: true,
          },
          {
            title: '३. कलेजको लामो विदामा दिनको ८ घण्टा (हप्ताको ४० घण्टा)',
            desc: 'गर्मी (Summer) र जाडो (Winter) को आधिकारिक कलेज विदाको अवधिमा कलेजको सिफारिस पत्रसहित हप्तामा ४० घण्टा (दिनको ८ घण्टा) सम्म काम गर्न पूर्ण कानुनी छुट हुन्छ।',
          },
          {
            title: '४. पूर्ण निषेधित कामहरू (Strictly Prohibited Jobs)',
            desc: 'पचिङ्को (Pachinko), बार, पब, रात्रिकालीन क्लब, डिस्को, क्याबरे वा वयस्क मनोरञ्जन (Fuzoku) क्षेत्रमा भाडा माझ्ने वा सरसफाइ गर्ने कामसमेत गर्न पूर्ण प्रतिबन्ध छ। यस्तो ठाउँमा भेटिएमा तुरुन्त पक्राउ र देश निकाला हुन्छ।',
            alert: true,
          },
          {
            title: '५. टोकियो र प्रिफेक्चरअनुसार न्यूनतम प्रतिघण्टा पारिश्रमिक',
            desc: 'टोकियोमा न्यूनतम तलब ¥१,१६३/घण्टा छ। प्रायः नेपाली विद्यार्थीहरूले कम्बिनी (7-Eleven, Lawson), होटल सरसफाइ, बान्तो (खाना प्याकिङ) वा रेस्टुरेन्टमा ¥१,२०० देखि ¥१,४०० प्रतिघण्टा कमाउँछन्। राति १० बजेपछिको काममा २५% थप रात्रि भत्ता पाइन्छ।',
          },
        ]
      : [
          {
            title: '1. Work Permit Stamp (資格外活動許可)',
            desc: 'Submit the Shikakugai Katsudo Kyoka form directly at Narita/Haneda airport immigration upon arrival. The official stamp will be placed on your Residence Card immediately.',
          },
          {
            title: '2. Strict 28-Hour Weekly Limit Across All Jobs',
            desc: 'You can work up to 28 hours per week across ALL part-time jobs combined. Exceeding even 29 hours can be detected via your bank and tax records, resulting in visa cancellation and deportation.',
            alert: true,
          },
          {
            title: '3. Up to 40 Hours/Week During Official Vacations',
            desc: 'During official summer and winter university vacations, students are legally permitted to work up to 40 hours per week (8 hours/day).',
          },
          {
            title: '4. Strictly Prohibited Adult Entertainment Jobs',
            desc: 'Students are strictly forbidden from working in pachinko parlors, hostess clubs, bars, or adult entertainment venues even for cleaning or dishwashing.',
            alert: true,
          },
          {
            title: '5. Hourly Wage Benchmarks',
            desc: 'Statutory minimum wage in Tokyo is ¥1,163/hr. Most students earn between ¥1,200 and ¥1,400/hr in convenience stores, bento factories, and hotels. Night shifts after 10 PM receive an additional 25% allowance.',
          },
        ],
  };

  return {
    hero,
    tabs,
    colleges,
    scholarships,
    sop,
    processSteps,
    financials,
    checklist,
    workRights,
  };
}
