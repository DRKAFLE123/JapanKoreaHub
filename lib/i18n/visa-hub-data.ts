export interface VisaHubItem {
  type: string;
  title: string;
  desc: string;
  icon: string;
}

export function getVisaHubData(country: 'japan' | 'korea', isNe: boolean) {
  const isJapan = country === 'japan';
  const cName = isJapan ? (isNe ? 'जापान' : 'Japan') : (isNe ? 'कोरिया' : 'Korea');

  const header = {
    title: isNe ? `${cName} भिसा पूर्ण मार्गदर्शन` : `${cName} Visa Guide`,
    sub: isNe ? 'भिसाका आवश्यकताहरू, प्रक्रिया, आवश्यक कागजात र अन्तर्वार्ता तयारी' : 'Requirements, processes, and interview preparation',
    breadcrumb: isNe ? `फर्कनुहोस्: ${cName}` : `Back to ${cName}`,
    officialNoticeTag: isNe ? '🛂 आधिकारिक जानकारी' : '🛂 Official Information',
    pathwayTitle: isNe
      ? (isJapan ? 'आधिकारिक SSW-1 रोजगारी प्रक्रिया' : 'आधिकारिक EPS E-9 रोजगारी प्रक्रिया')
      : (isJapan ? 'Official SSW Employment Pathway' : 'Official EPS E-9 Employment Pathway'),
    pathwaySub: isNe
      ? (isJapan
          ? 'विशिष्ट दक्ष कामदार (SSW-1) भिसा आवेदकहरूका लागि चरणबद्ध मार्गदर्शन'
          : 'रोजगार अनुमति प्रणाली (EPS) आवेदकहरूका लागि चरणबद्ध मार्गदर्शन')
      : (isJapan
          ? 'Step-by-step roadmap for Specified Skilled Worker (SSW-1) visa applicants'
          : 'Step-by-step roadmap for Employment Permit System (EPS) applicants'),
    consultTitle: isNe ? 'भिसा आवेदनमा विशेषज्ञ सहयोग चाहिन्छ?' : 'Need help with your application?',
    consultDesc: isNe
      ? 'हाम्रा अनुभवी भिसा कन्सल्टेन्टहरूले तपाईंका कागजात जाँच गर्न, फारम भर्न र दूतावास अन्तर्वार्ताको पूर्ण तयारी गर्न मद्दत गर्नेछन्।'
      : 'Our verified visa consultants can review your documents, help you fill out forms, and prepare you for the embassy interview.',
    consultBtn: isNe ? 'परामर्श बुक गर्नुहोस्' : 'Book a consultation',
    freeBadge: isNe ? 'निःशुल्क १५ मिनेट' : 'Free 15 min',
  };

  const sswSteps = isNe
    ? [
        'JFT-Basic (A2) वा JLPT N4 जापानी भाषा परीक्षा उत्तीर्ण गर्ने',
        'तोकिएको क्षेत्रको सीप परीक्षा (जस्तै केयरगिभिङ, कृषि, रेस्टुरेन्ट वा भवन सरसफाइ) उत्तीर्ण गर्ने',
        'जापानी रोजगारदातासँग म्याचिङ / इजाजतपत्र प्राप्त म्यानपावरमार्फत अन्तर्वार्ता',
        'रोजगार सम्झौतामा हस्ताक्षर गरी जापानको योग्यता प्रमाणपत्र (COE) प्राप्त गर्ने',
        'काठमाडौंस्थित जापानी दूतावासमा भिसा आवेदन र जापान प्रस्थान',
      ]
    : [
        'Pass JFT-Basic (A2) or JLPT N4 exam',
        'Pass Sector Skill Evaluation Test (e.g. Kaigo, Agriculture, Food Service, Building Cleaning)',
        'Match with Japanese employer / Interview via accredited agency',
        'Sign Employment Contract & Receive Certificate of Eligibility (COE)',
        'Embassy Visa Application & Departure to Japan',
      ];

  const epsSteps = isNe
    ? [
        'HRD कोरियामार्फत EPS-TOPIK कोरियन भाषा परीक्षाको आवेदन दिने',
        'EPS-TOPIK कम्प्युटर परीक्षा (CBT) र सीप परीक्षा उत्तीर्ण गर्ने',
        'स्वास्थ्य परीक्षण पूरा गरी रोष्टर (Candidate Roster) मा नाम समावेश गर्ने',
        'कोरियन रोजगारदाताको छनोट र भिसा जारी पुष्टि प्रमाणपत्र (CCVI) प्राप्त गर्ने',
        'प्रस्थानपूर्वको अभिमुखीकरण तालिम पूरा गरी कोरिया प्रस्थान',
      ]
    : [
        'Register for EPS-TOPIK Examination via HRD Korea',
        'Pass EPS-TOPIK CBT & Skill Evaluation Test',
        'Complete Medical Checkup & Enter SPAS Candidate Roster',
        'Korean Employer Selection & Certificate for Confirmation of Visa Issuance (CCVI)',
        'Pre-departure orientation & Flight departure to Korea',
      ];

  const visaTypes: Record<string, { title: string; desc: string }> = isNe
    ? {
        student: {
          title: 'विद्यार्थी भिसा (Student Visa)',
          desc: 'कलेज भर्ना, COE प्रक्रिया, स्पन्सर कागजात र अन्तर्वार्ता तयारी',
        },
        ssw: {
          title: 'एसएसडब्ल्यू भिसा (Specified Skilled Worker - SSW)',
          desc: '१२ प्राविधिक क्षेत्र, JFT भाषा परीक्षा, सीप परीक्षा र प्रत्यक्ष रोजगारी',
        },
        work: {
          title: 'इन्जिनियर तथा दक्ष कामदार भिसा (Work Visa)',
          desc: 'विश्वविद्यालय डिग्री भएकाहरूका लागि IT, इन्जिनियरिङ र बिजनेस भिसा',
        },
        dependent: {
          title: 'डिपेन्डेन्ट भिसा (Dependent Visa - परिवार आमन्त्रण)',
          desc: 'जापान वा कोरियामा श्रीमान्/श्रीमती र छोराछोरी बोलाउने सम्पूर्ण नियम',
        },
        interview: {
          title: 'दूतावास अन्तर्वार्ता तयारी (Visa Interview Prep)',
          desc: 'दूतावासमा सोधिने मुख्य प्रश्नोत्तर, नमुना अन्तर्वार्ता र ध्यान दिनुपर्ने कुराहरू',
        },
        e9: {
          title: 'ईपीएस E-9 कामदार भिसा (EPS Worker)',
          desc: 'उत्पादन, कृषि तथा पशुपालन क्षेत्रका लागि सरकारी कोटा र नियमहरू',
        },
        e7: {
          title: 'E-7 दक्ष पेशाकर्मी भिसा (Professional Worker)',
          desc: 'E-7-4 अंक प्रणाली, कम्पनी परिवर्तन र परिवार ल्याउन पाउने सुविधा',
        },
      }
    : {
        student: {
          title: isJapan ? 'Student Visa' : 'Student Visa (D-2/D-4)',
          desc: isJapan ? 'Requirements, COE process, and school applications' : 'University and language school requirements',
        },
        ssw: {
          title: 'Specified Skilled Worker (SSW)',
          desc: '12 approved industries, technical skill tests, JFT-Basic exam, and direct employment contracts',
        },
        work: {
          title: isJapan ? 'Work Visa (Engineer / Specialist)' : 'Work Visa (E-7 / Professional)',
          desc: 'Requirements, job matching, contracts, and application procedures',
        },
        dependent: {
          title: 'Dependent Visa',
          desc: 'Bringing family members: spouse and children eligibility, documentation, and sponsor requirements',
        },
        interview: {
          title: 'Visa & Interview Preparation',
          desc: 'Master the Embassy interview: common questions, required documents, mock test, and red flags to avoid',
        },
        e9: {
          title: 'Non-Professional Employment (E-9)',
          desc: 'EPS system, EPS-TOPIK requirements, and point system',
        },
        e7: {
          title: 'Foreign National of Special Ability (E-7)',
          desc: 'Professional employment categories, points system, and conversion pathways',
        },
      };

  return {
    header,
    pathwaySteps: isJapan ? sswSteps : epsSteps,
    visaTypes,
  };
}
