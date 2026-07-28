import json, re

# ============================================================
# VOCABULARY FOR LESSONS 30 TO 35 (Minna no Nihongo II)
# ============================================================

l30_vocab = [
    { "id": "v30_1", "lesson": 30, "level": "N4", "word": "貼ります", "reading": "はりま", "meaning": "Put up / Paste / Stick", "meaningNepali": "टाँस्नु", "kanjiCharacters": ["貼"], "partOfSpeech": "Verb" },
    { "id": "v30_2", "lesson": 30, "level": "N4", "word": "掛けます", "reading": "かけます", "meaning": "Hang", "meaningNepali": "झुन्ड्याउनु", "kanjiCharacters": ["掛"], "partOfSpeech": "Verb" },
    { "id": "v30_3", "lesson": 30, "level": "N4", "word": "飾ります", "reading": "かざります", "meaning": "Decorate", "meaningNepali": "सजाउनु", "kanjiCharacters": ["飾"], "partOfSpeech": "Verb" },
    { "id": "v30_4", "lesson": 30, "level": "N4", "word": "並べます", "reading": "ならべます", "meaning": "Arrange / Line up", "meaningNepali": "क्रमबद्ध मिलाउनु", "kanjiCharacters": ["並"], "partOfSpeech": "Verb" },
    { "id": "v30_5", "lesson": 30, "level": "N4", "word": "植えます", "reading": "うえます", "meaning": "Plant", "meaningNepali": "रोप्नु", "kanjiCharacters": ["植"], "partOfSpeech": "Verb" },
    { "id": "v30_6", "lesson": 30, "level": "N4", "word": "戻します", "reading": "もどします", "meaning": "Return / Put back", "meaningNepali": "फर्ता राख्नु", "kanjiCharacters": ["戻"], "partOfSpeech": "Verb" },
    { "id": "v30_7", "lesson": 30, "level": "N4", "word": "まとめます", "reading": "まとめます", "meaning": "Put together / Summarize", "meaningNepali": "सङ्कलन गर्नु", "kanjiCharacters": [], "partOfSpeech": "Verb" },
    { "id": "v30_8", "lesson": 30, "level": "N4", "word": "片付けます", "reading": "かたづけます", "meaning": "Put in order / Tidy up", "meaningNepali": "मिलाएर राख्नु", "kanjiCharacters": ["片", "付"], "partOfSpeech": "Verb" },
    { "id": "v30_9", "lesson": 30, "level": "N4", "word": "しまいます", "reading": "しまいます", "meaning": "Put away", "meaningNepali": "थन्क्याउनु", "kanjiCharacters": [], "partOfSpeech": "Verb" },
    { "id": "v30_10", "lesson": 30, "level": "N4", "word": "決めます", "reading": "きめます", "meaning": "Decide", "meaningNepali": "निर्णय गर्नु", "kanjiCharacters": ["決"], "partOfSpeech": "Verb" },
    { "id": "v30_11", "lesson": 30, "level": "N4", "word": "知らせます", "reading": "しらせます", "meaning": "Inform / Notify", "meaningNepali": "जानकारी दिनु", "kanjiCharacters": ["知"], "partOfSpeech": "Verb" },
    { "id": "v30_12", "lesson": 30, "level": "N4", "word": "相談します", "reading": "そうだんします", "meaning": "Consult / Discuss", "meaningNepali": "सल्लाह गर्नु", "kanjiCharacters": ["相", "談"], "partOfSpeech": "Verb" },
    { "id": "v30_13", "lesson": 30, "level": "N4", "word": "予習します", "reading": "よしゅうします", "meaning": "Prepare lesson", "meaningNepali": "पूर्व-तयारी गर्नु", "kanjiCharacters": ["予", "習"], "partOfSpeech": "Verb" },
    { "id": "v30_14", "lesson": 30, "level": "N4", "word": "復習します", "reading": "ふくしゅうします", "meaning": "Review lesson", "meaningNepali": "पुनरावलोकन गर्नु", "kanjiCharacters": ["復", "習"], "partOfSpeech": "Verb" },
    { "id": "v30_15", "lesson": 30, "level": "N4", "word": "そのままにします", "reading": "そのままにします", "meaning": "Leave as it is", "meaningNepali": "यत्तिकै छाड्नु", "kanjiCharacters": [], "partOfSpeech": "Verb" },
    { "id": "v30_16", "lesson": 30, "level": "N4", "word": "カレンダー", "reading": "カレンダー", "meaning": "Calendar", "meaningNepali": "पात्रो / क्यालेन्डर", "kanjiCharacters": [], "partOfSpeech": "Noun" },
    { "id": "v30_17", "lesson": 30, "level": "N4", "word": "ポスター", "reading": "ポスター", "meaning": "Poster", "meaningNepali": "पोस्टर", "kanjiCharacters": [], "partOfSpeech": "Noun" },
    { "id": "v30_18", "lesson": 30, "level": "N4", "word": "予定表", "reading": "よていひょう", "meaning": "Schedule / Timetable", "meaningNepali": "कार्यतालिका", "kanjiCharacters": ["予", "定", "表"], "partOfSpeech": "Noun" },
    { "id": "v30_19", "lesson": 30, "level": "N4", "word": "ごみ箱", "reading": "ごみばこ", "meaning": "Trash bin", "meaningNepali": "फोहरदानी", "kanjiCharacters": ["箱"], "partOfSpeech": "Noun" },
    { "id": "v30_20", "lesson": 30, "level": "N4", "word": "人形", "reading": "にんぎょう", "meaning": "Doll", "meaningNepali": "पुतली", "kanjiCharacters": ["人", "形"], "partOfSpeech": "Noun" },
    { "id": "v30_21", "lesson": 30, "level": "N4", "word": "花瓶", "reading": "かびん", "meaning": "Vase", "meaningNepali": "फुलदानी", "kanjiCharacters": ["花", "瓶"], "partOfSpeech": "Noun" },
    { "id": "v30_22", "lesson": 30, "level": "N4", "word": "鏡", "reading": "かがみ", "meaning": "Mirror", "meaningNepali": "ऐना", "kanjiCharacters": ["鏡"], "partOfSpeech": "Noun" },
    { "id": "v30_23", "lesson": 30, "level": "N4", "word": "引き出し", "reading": "ひきだし", "meaning": "Drawer", "meaningNepali": "दराजको घर", "kanjiCharacters": ["引", "出"], "partOfSpeech": "Noun" },
    { "id": "v30_24", "lesson": 30, "level": "N4", "word": "玄関", "reading": "げんかん", "meaning": "Entrance hall", "meaningNepali": "मूल ढोका", "kanjiCharacters": ["玄", "関"], "partOfSpeech": "Noun" },
    { "id": "v30_25", "lesson": 30, "level": "N4", "word": "廊下", "reading": "ろうか", "meaning": "Corridor / Hallway", "meaningNepali": "गल्ली", "kanjiCharacters": ["廊", "下"], "partOfSpeech": "Noun" },
    { "id": "v30_26", "lesson": 30, "level": "N4", "word": "壁", "reading": "かべ", "meaning": "Wall", "meaningNepali": "भित्ता", "kanjiCharacters": ["壁"], "partOfSpeech": "Noun" },
    { "id": "v30_27", "lesson": 30, "level": "N4", "word": "池", "reading": "いけ", "meaning": "Pond", "meaningNepali": "पोखरी", "kanjiCharacters": ["池"], "partOfSpeech": "Noun" },
    { "id": "v30_28", "lesson": 30, "level": "N4", "word": "元の所", "reading": "もとのところ", "meaning": "Original place", "meaningNepali": "पुराना ठाउँ", "kanjiCharacters": ["元", "所"], "partOfSpeech": "Noun" },
    { "id": "v30_29", "lesson": 30, "level": "N4", "word": "周り", "reading": "まわり", "meaning": "Around / Surroundings", "meaningNepali": "वरिपरि", "kanjiCharacters": ["周"], "partOfSpeech": "Noun" },
    { "id": "v30_30", "lesson": 30, "level": "N4", "word": "真ん中", "reading": "まんなか", "meaning": "Center / Middle", "meaningNepali": "बीच", "kanjiCharacters": ["真", "中"], "partOfSpeech": "Noun" },
    { "id": "v30_31", "lesson": 30, "level": "N4", "word": "隅", "reading": "すみ", "meaning": "Corner", "meaningNepali": "कुना", "kanjiCharacters": ["隅"], "partOfSpeech": "Noun" },
    { "id": "v30_32", "lesson": 30, "level": "N4", "word": "まだ", "reading": "まだ", "meaning": "Still / Yet", "meaningNepali": "अझै", "kanjiCharacters": [], "partOfSpeech": "Adverb" },
    { "id": "v30_33", "lesson": 30, "level": "N4", "word": "リュック", "reading": "リュック", "meaning": "Backpack", "meaningNepali": "झोला / ब्याकप्याक", "kanjiCharacters": [], "partOfSpeech": "Noun" },
    { "id": "v30_34", "lesson": 30, "level": "N4", "word": "非常袋", "reading": "ひじょうぶくろ", "meaning": "Emergency kit bag", "meaningNepali": "आपत्कालीन झोला", "kanjiCharacters": ["非", "常", "袋"], "partOfSpeech": "Noun" }
]

l31_vocab = [
    { "id": "v31_1", "lesson": 31, "level": "N4", "word": "始まります", "reading": "はじまります", "meaning": "[Ceremony] Start (Intransitive)", "meaningNepali": "सुरु हुनु", "kanjiCharacters": ["始"], "partOfSpeech": "Verb" },
    { "id": "v31_2", "lesson": 31, "level": "N4", "word": "続けます", "reading": "つづけます", "meaning": "Continue", "meaningNepali": "निरन्तरता दिनु", "kanjiCharacters": ["続"], "partOfSpeech": "Verb" },
    { "id": "v31_3", "lesson": 31, "level": "N4", "word": "見つけます", "reading": "みつけます", "meaning": "Find / Discover", "meaningNepali": "फेला पार्नु", "kanjiCharacters": ["見"], "partOfSpeech": "Verb" },
    { "id": "v31_4", "lesson": 31, "level": "N4", "word": "受けます", "reading": "うけます", "meaning": "Take [an exam]", "meaningNepali": "परीक्षा दिनु", "kanjiCharacters": ["受"], "partOfSpeech": "Verb" },
    { "id": "v31_5", "lesson": 31, "level": "N4", "word": "入学します", "reading": "にゅうがくします", "meaning": "Enter [a university]", "meaningNepali": "भर्ना हुनु", "kanjiCharacters": ["入", "学"], "partOfSpeech": "Verb" },
    { "id": "v31_6", "lesson": 31, "level": "N4", "word": "卒業します", "reading": "そつぎょうします", "meaning": "Graduate [from university]", "meaningNepali": "स्नातक पूरा गर्नु", "kanjiCharacters": ["卒", "業"], "partOfSpeech": "Verb" },
    { "id": "v31_7", "lesson": 31, "level": "N4", "word": "出席します", "reading": "しゅっせきします", "meaning": "Attend [a meeting]", "meaningNepali": "उपस्थित हुनु", "kanjiCharacters": ["出", "席"], "partOfSpeech": "Verb" },
    { "id": "v31_8", "lesson": 31, "level": "N4", "word": "休憩します", "reading": "きゅうけいします", "meaning": "Take a break", "meaningNepali": "विश्राम गर्नु", "kanjiCharacters": ["休", "憩"], "partOfSpeech": "Verb" },
    { "id": "v31_9", "lesson": 31, "level": "N4", "word": "連休", "reading": "れんきゅう", "meaning": "Consecutive holidays", "meaningNepali": "लगातार बिदा", "kanjiCharacters": ["連", "休"], "partOfSpeech": "Noun" },
    { "id": "v31_10", "lesson": 31, "level": "N4", "word": "作文", "reading": "さくぶん", "meaning": "Essay / Composition", "meaningNepali": "निबन्ध", "kanjiCharacters": ["作", "文"], "partOfSpeech": "Noun" },
    { "id": "v31_11", "lesson": 31, "level": "N4", "word": "展覧会", "reading": "てんらんかい", "meaning": "Exhibition", "meaningNepali": "प्रदर्शनी", "kanjiCharacters": ["展", "覧", "会"], "partOfSpeech": "Noun" },
    { "id": "v31_12", "lesson": 31, "level": "N4", "word": "結婚式", "reading": "けっこんしき", "meaning": "Wedding ceremony", "meaningNepali": "विवाह समारोह", "kanjiCharacters": ["結", "婚", "式"], "partOfSpeech": "Noun" },
    { "id": "v31_13", "lesson": 31, "level": "N4", "word": "葬式", "reading": "そうしき", "meaning": "Funeral", "meaningNepali": "अन्त्येष्टि समारोह", "kanjiCharacters": ["葬", "式"], "partOfSpeech": "Noun" },
    { "id": "v31_14", "lesson": 31, "level": "N4", "word": "本社", "reading": "ほんしゃ", "meaning": "Head office", "meaningNepali": "प्रधान कार्यालय", "kanjiCharacters": ["本", "社"], "partOfSpeech": "Noun" },
    { "id": "v31_15", "lesson": 31, "level": "N4", "word": "支店", "reading": "してん", "meaning": "Branch office", "meaningNepali": "शाखा कार्यालय", "kanjiCharacters": ["支", "店"], "partOfSpeech": "Noun" },
    { "id": "v31_16", "lesson": 31, "level": "N4", "word": "教会", "reading": "きょうかい", "meaning": "Church", "meaningNepali": "गिरजाघर", "kanjiCharacters": ["教", "会"], "partOfSpeech": "Noun" },
    { "id": "v31_17", "lesson": 31, "level": "N4", "word": "大学院", "reading": "だいがくいん", "meaning": "Graduate school", "meaningNepali": "स्नातकोत्तर तह", "kanjiCharacters": ["大", "学", "院"], "partOfSpeech": "Noun" },
    { "id": "v31_18", "lesson": 31, "level": "N4", "word": "温泉", "reading": "おんせん", "meaning": "Hot spring", "meaningNepali": "तातोपानीको कुण्ड", "kanjiCharacters": ["温", "泉"], "partOfSpeech": "Noun" },
    { "id": "v31_19", "lesson": 31, "level": "N4", "word": "帰り", "reading": "かえり", "meaning": "Return / Way back", "meaningNepali": "फर्किने बाटो", "kanjiCharacters": ["帰"], "partOfSpeech": "Noun" },
    { "id": "v31_20", "lesson": 31, "level": "N4", "word": "お子さん", "reading": "おこさん", "meaning": "(Someone else's) Child", "meaningNepali": "(अरूको) बच्चा", "kanjiCharacters": ["子"], "partOfSpeech": "Noun" },
    { "id": "v31_21", "lesson": 31, "level": "N4", "word": "ずっと", "reading": "ずっと", "meaning": "All the time / By far", "meaningNepali": "सधैँभरि", "kanjiCharacters": [], "partOfSpeech": "Adverb" },
    { "id": "v31_22", "lesson": 31, "level": "N4", "word": "残ります", "reading": "のこります", "meaning": "Remain / Stay behind", "meaningNepali": "बाँकी रहनु", "kanjiCharacters": ["残"], "partOfSpeech": "Verb" }
]

l32_vocab = [
    { "id": "v32_1", "lesson": 32, "level": "N4", "word": "運動します", "reading": "うんどうします", "meaning": "Take exercise", "meaningNepali": "व्यायाम गर्नु", "kanjiCharacters": ["運", "動"], "partOfSpeech": "Verb" },
    { "id": "v32_2", "lesson": 32, "level": "N4", "word": "成功します", "reading": "せいこうします", "meaning": "Succeed", "meaningNepali": "सफल हुनु", "kanjiCharacters": ["成", "功"], "partOfSpeech": "Verb" },
    { "id": "v32_3", "level": "N4", "word": "失敗します", "reading": "しっぱいします", "meaning": "Fail [an exam]", "meaningNepali": "असफल हुनु", "kanjiCharacters": ["失", "敗"], "partOfSpeech": "Verb" },
    { "id": "v32_4", "lesson": 32, "level": "N4", "word": "合格します", "reading": "ごうかくします", "meaning": "Pass [an exam]", "meaningNepali": "उत्तीर्ण हुनु", "kanjiCharacters": ["合", "格"], "partOfSpeech": "Verb" },
    { "id": "v32_5", "lesson": 32, "level": "N4", "word": "やみます", "reading": "やみます", "meaning": "[Rain] Stop", "meaningNepali": "[पानी] रोकिनु", "kanjiCharacters": [], "partOfSpeech": "Verb" },
    { "id": "v32_6", "lesson": 32, "level": "N4", "word": "晴れます", "reading": "はれます", "meaning": "Clear up (Weather)", "meaningNepali": "आकाश खुल्नु", "kanjiCharacters": ["晴"], "partOfSpeech": "Verb" },
    { "id": "v32_7", "lesson": 32, "level": "N4", "word": "曇ります", "reading": "くもります", "meaning": "Get cloudy", "meaningNepali": "बादल लाग्नु", "kanjiCharacters": ["曇"], "partOfSpeech": "Verb" },
    { "id": "v32_8", "lesson": 32, "level": "N4", "word": "吹きます", "reading": "ふきます", "meaning": "[Wind] Blow", "meaningNepali": "[हावा] चल्नु", "kanjiCharacters": ["吹"], "partOfSpeech": "Verb" },
    { "id": "v32_9", "lesson": 32, "level": "N4", "word": "病気", "reading": "びょうき", "meaning": "Illness / Sickness", "meaningNepali": "बिरामी", "kanjiCharacters": ["病", "気"], "partOfSpeech": "Noun" },
    { "id": "v32_10", "lesson": 32, "level": "N4", "word": "熱", "reading": "ねつ", "meaning": "Fever / Temperature", "meaningNepali": "ज्वरो", "kanjiCharacters": ["熱"], "partOfSpeech": "Noun" },
    { "id": "v32_11", "lesson": 32, "level": "N4", "word": "火傷", "reading": "やけど", "meaning": "Burn", "meaningNepali": "पोलेको घाउ", "kanjiCharacters": ["火", "傷"], "partOfSpeech": "Noun" },
    { "id": "v32_12", "lesson": 32, "level": "N4", "word": "けが", "reading": "けが", "meaning": "Injury", "meaningNepali": "चोटपटक", "kanjiCharacters": [], "partOfSpeech": "Noun" },
    { "id": "v32_13", "lesson": 32, "level": "N4", "word": "咳", "reading": "せき", "meaning": "Cough", "meaningNepali": "खोकी", "kanjiCharacters": ["咳"], "partOfSpeech": "Noun" },
    { "id": "v32_14", "lesson": 32, "level": "N4", "word": "インフルエンザ", "reading": "インフルエンザ", "meaning": "Influenza / Flu", "meaningNepali": "इन्फ्लुएन्जा", "kanjiCharacters": [], "partOfSpeech": "Noun" },
    { "id": "v32_15", "lesson": 32, "level": "N4", "word": "太陽", "reading": "たいよう", "meaning": "Sun", "meaningNepali": "सूर्य", "kanjiCharacters": ["太", "陽"], "partOfSpeech": "Noun" },
    { "id": "v32_16", "lesson": 32, "level": "N4", "word": "星", "reading": "ほし", "meaning": "Star", "meaningNepali": "तारा", "kanjiCharacters": ["星"], "partOfSpeech": "Noun" },
    { "id": "v32_17", "lesson": 32, "level": "N4", "word": "月", "reading": "つき", "meaning": "Moon", "meaningNepali": "चन्द्रमा", "kanjiCharacters": ["月"], "partOfSpeech": "Noun" },
    { "id": "v32_18", "lesson": 32, "level": "N4", "word": "風", "reading": "かぜ", "meaning": "Wind", "meaningNepali": "हावा", "kanjiCharacters": ["風"], "partOfSpeech": "Noun" },
    { "id": "v32_19", "lesson": 32, "level": "N4", "word": "北", "reading": "きた", "meaning": "North", "meaningNepali": "उत्तर", "kanjiCharacters": ["北"], "partOfSpeech": "Noun" },
    { "id": "v32_20", "lesson": 32, "level": "N4", "word": "南", "reading": "みなみ", "meaning": "South", "meaningNepali": "दक्षिण", "kanjiCharacters": ["南"], "partOfSpeech": "Noun" },
    { "id": "v32_21", "lesson": 32, "level": "N4", "word": "東", "reading": "ひがし", "meaning": "East", "meaningNepali": "पूर्व", "kanjiCharacters": ["東"], "partOfSpeech": "Noun" },
    { "id": "v32_22", "lesson": 32, "level": "N4", "word": "西", "reading": "にし", "meaning": "West", "meaningNepali": "पश्चिम", "kanjiCharacters": ["西"], "partOfSpeech": "Noun" }
]

l33_vocab = [
    { "id": "v33_1", "lesson": 33, "level": "N4", "word": "逃げます", "reading": "にげます", "meaning": "Run away / Escape", "meaningNepali": "भाग्नु", "kanjiCharacters": ["逃"], "partOfSpeech": "Verb" },
    { "id": "v33_2", "lesson": 33, "level": "N4", "word": "騒ぎます", "reading": "さわぎます", "meaning": "Make a noise", "meaningNepali": "हल्ला गर्नु", "kanjiCharacters": ["騒"], "partOfSpeech": "Verb" },
    { "id": "v33_3", "lesson": 33, "level": "N4", "word": "あきらめます", "reading": "あきらめます", "meaning": "Give up", "meaningNepali": "हार मान्नु", "kanjiCharacters": [], "partOfSpeech": "Verb" },
    { "id": "v33_4", "lesson": 33, "level": "N4", "word": "投げます", "reading": "なげます", "meaning": "Throw", "meaningNepali": "फ्याँक्नु", "kanjiCharacters": ["投"], "partOfSpeech": "Verb" },
    { "id": "v33_5", "lesson": 33, "level": "N4", "word": "守ります", "reading": "まもります", "meaning": "Keep / Protect / Obey", "meaningNepali": "पालना गर्नु / रक्षा गर्नु", "kanjiCharacters": ["守"], "partOfSpeech": "Verb" },
    { "id": "v33_6", "lesson": 33, "level": "N4", "word": "上げます", "reading": "あげます", "meaning": "Raise / Lift", "meaningNepali": "उठाउनु", "kanjiCharacters": ["上"], "partOfSpeech": "Verb" },
    { "id": "v33_7", "lesson": 33, "level": "N4", "word": "下げます", "reading": "さげます", "meaning": "Lower", "meaningNepali": "घटाउनु", "kanjiCharacters": ["下"], "partOfSpeech": "Verb" },
    { "id": "v33_8", "lesson": 33, "level": "N4", "word": "伝えます", "reading": "つたえます", "meaning": "Convey / Pass on message", "meaningNepali": "सन्देश पुर्‍याउनु", "kanjiCharacters": ["伝"], "partOfSpeech": "Verb" },
    { "id": "v33_9", "lesson": 33, "level": "N4", "word": "注意します", "reading": "ちゅういします", "meaning": "Be careful / Pay attention", "meaningNepali": "सावधान हुनु", "kanjiCharacters": ["注", "意"], "partOfSpeech": "Verb" },
    { "id": "v33_10", "lesson": 33, "level": "N4", "word": "規則", "reading": "きそく", "meaning": "Rule / Regulation", "meaningNepali": "नियम", "kanjiCharacters": ["規", "則"], "partOfSpeech": "Noun" },
    { "id": "v33_11", "lesson": 33, "level": "N4", "word": "危険", "reading": "きけん", "meaning": "Danger / Hazardous", "meaningNepali": "खतरा", "kanjiCharacters": ["危", "険"], "partOfSpeech": "Adj" },
    { "id": "v33_12", "lesson": 33, "level": "N4", "word": "使用禁止", "reading": "しようきんし", "meaning": "Do not use / Out of service", "meaningNepali": "प्रयोग निषेध", "kanjiCharacters": ["使", "用", "禁", "止"], "partOfSpeech": "Noun" },
    { "id": "v33_13", "lesson": 33, "level": "N4", "word": "立入禁止", "reading": "たちいりきんし", "meaning": "No entry / Keep out", "meaningNepali": "प्रवेश निषेध", "kanjiCharacters": ["立", "入", "禁", "止"], "partOfSpeech": "Noun" },
    { "id": "v33_14", "lesson": 33, "level": "N4", "word": "非常口", "reading": "ひじょうぐち", "meaning": "Emergency exit", "meaningNepali": "आपत्कालीन ढोका", "kanjiCharacters": ["非", "常", "口"], "partOfSpeech": "Noun" },
    { "id": "v33_15", "lesson": 33, "level": "N4", "word": "無料", "reading": "むりょう", "meaning": "Free of charge", "meaningNepali": "नि:शुल्क", "kanjiCharacters": ["無", "料"], "partOfSpeech": "Noun" },
    { "id": "v33_16", "lesson": 33, "level": "N4", "word": "割引", "reading": "わりびき", "meaning": "Discount", "meaningNepali": "छुट", "kanjiCharacters": ["割", "引"], "partOfSpeech": "Noun" },
    { "id": "v33_17", "lesson": 33, "level": "N4", "word": "飲み放題", "reading": "のみほうだい", "meaning": "All-you-can-drink", "meaningNepali": "असीमित पेय", "kanjiCharacters": ["飲", "放", "題"], "partOfSpeech": "Noun" },
    { "id": "v33_18", "lesson": 33, "level": "N4", "word": "使用中", "reading": "しようちゅう", "meaning": "In use / Occupied", "meaningNepali": "प्रयोग भइरहेको", "kanjiCharacters": ["使", "用", "中"], "partOfSpeech": "Noun" },
    { "id": "v33_19", "lesson": 33, "level": "N4", "word": "募集中", "reading": "ぼしゅうちゅう", "meaning": "Applications wanted / Hiring", "meaningNepali": "भर्ना भइरहेको", "kanjiCharacters": ["募", "集", "中"], "partOfSpeech": "Noun" }
]

l34_vocab = [
    { "id": "v34_1", "lesson": 34, "level": "N4", "word": "磨きます", "reading": "みがきます", "meaning": "Brush [teeth] / Polish", "meaningNepali": "माझ्नु / माझ्नु", "kanjiCharacters": ["磨"], "partOfSpeech": "Verb" },
    { "id": "v34_2", "lesson": 34, "level": "N4", "word": "組み立てます", "reading": "くみたてます", "meaning": "Assemble", "meaningNepali": "जोड्नु", "kanjiCharacters": ["組", "立"], "partOfSpeech": "Verb" },
    { "id": "v34_3", "lesson": 34, "level": "N4", "word": "折ります", "reading": "おります", "meaning": "Fold / Break", "meaningNepali": "मोड्नु / भाच्नु", "kanjiCharacters": ["折"], "partOfSpeech": "Verb" },
    { "id": "v34_4", "lesson": 34, "level": "N4", "word": "気がつきます", "reading": "きがつきます", "meaning": "Notice / Become aware", "meaningNepali": "ख्याल गर्नु", "kanjiCharacters": ["気", "付"], "partOfSpeech": "Verb" },
    { "id": "v34_5", "lesson": 34, "level": "N4", "word": "つけます", "reading": "つけます", "meaning": "Put in [soy sauce]", "meaningNepali": "हाल्नु", "kanjiCharacters": [], "partOfSpeech": "Verb" },
    { "id": "v34_6", "lesson": 34, "level": "N4", "word": "見つかります", "reading": "みつかります", "meaning": "Be found", "meaningNepali": "फेला पर्नु", "kanjiCharacters": ["見"], "partOfSpeech": "Verb" },
    { "id": "v34_7", "lesson": 34, "level": "N4", "word": "矢印", "reading": "やじるし", "meaning": "Arrow (sign)", "meaningNepali": "तीरको चिह्न", "kanjiCharacters": ["矢", "印"], "partOfSpeech": "Noun" },
    { "id": "v34_8", "lesson": 34, "level": "N4", "word": "醤油", "reading": "しょうゆ", "meaning": "Soy sauce", "meaningNepali": "सोया सस", "kanjiCharacters": ["醬", "油"], "partOfSpeech": "Noun" },
    { "id": "v34_9", "lesson": 34, "level": "N4", "word": "ソース", "reading": "ソース", "meaning": "Sauce", "meaningNepali": "सस", "kanjiCharacters": [], "partOfSpeech": "Noun" },
    { "id": "v34_10", "lesson": 34, "level": "N4", "word": "紺", "reading": "こん", "meaning": "Navy blue", "meaningNepali": "गाढा नीलो", "kanjiCharacters": ["紺"], "partOfSpeech": "Noun" },
    { "id": "v34_11", "lesson": 34, "level": "N4", "word": "黄色", "reading": "きいろ", "meaning": "Yellow", "meaningNepali": "पहेंलो", "kanjiCharacters": ["黄", "色"], "partOfSpeech": "Noun" },
    { "id": "v34_12", "lesson": 34, "level": "N4", "word": "苦い", "reading": "にがい", "meaning": "Bitter", "meaningNepali": "तीतो", "kanjiCharacters": ["苦"], "partOfSpeech": "Adj" },
    { "id": "v34_13", "lesson": 34, "level": "N4", "word": "濃い", "reading": "こい", "meaning": "Strong (taste) / Dark", "meaningNepali": "गाढा", "kanjiCharacters": ["濃"], "partOfSpeech": "Adj" },
    { "id": "v34_14", "lesson": 34, "level": "N4", "word": "薄い", "reading": "うすい", "meaning": "Weak (taste) / Light", "meaningNepali": "पातलो / फिक्का", "kanjiCharacters": ["薄"], "partOfSpeech": "Adj" },
    { "id": "v34_15", "lesson": 34, "level": "N4", "word": "理由", "reading": "りゆう", "meaning": "Reason", "meaningNepali": "कारण", "kanjiCharacters": ["理", "由"], "partOfSpeech": "Noun" }
]

l35_vocab = [
    { "id": "v35_1", "lesson": 35, "level": "N4", "word": "咲きます", "reading": "さきます", "meaning": "[Flowers] Bloom", "meaningNepali": "[फूल] फुल्नु", "kanjiCharacters": ["咲"], "partOfSpeech": "Verb" },
    { "id": "v35_2", "lesson": 35, "level": "N4", "word": "変わります", "reading": "かわります", "meaning": "[Color] Change", "meaningNepali": "परिवर्तन हुनु", "kanjiCharacters": ["変"], "partOfSpeech": "Verb" },
    { "id": "v35_3", "lesson": 35, "level": "N4", "word": "困ります", "reading": "こまります", "meaning": "Be in trouble / Have a problem", "meaningNepali": "समस्यामा पर्नु", "kanjiCharacters": ["困"], "partOfSpeech": "Verb" },
    { "id": "v35_4", "lesson": 35, "level": "N4", "word": "付けます", "reading": "つけます", "meaning": "Draw [a circle] / Mark", "meaningNepali": "चिह्न लगाउनु", "kanjiCharacters": ["付"], "partOfSpeech": "Verb" },
    { "id": "v35_5", "lesson": 35, "level": "N4", "word": "楽な", "reading": "らくな", "meaning": "Easy / Comfortable", "meaningNepali": "आरामदायी", "kanjiCharacters": ["楽"], "partOfSpeech": "Adj" },
    { "id": "v35_6", "lesson": 35, "level": "N4", "word": "正しい", "reading": "ただしい", "meaning": "Correct / Right", "meaningNepali": "सही", "kanjiCharacters": ["正"], "partOfSpeech": "Adj" },
    { "id": "v35_7", "lesson": 35, "level": "N4", "word": "珍しい", "reading": "めずらしい", "meaning": "Rare / Uncommon", "meaningNepali": "नौलो / दुर्लभ", "kanjiCharacters": ["珍"], "partOfSpeech": "Adj" },
    { "id": "v35_8", "lesson": 35, "level": "N4", "word": "方", "reading": "かた", "meaning": "Person (Polite)", "meaningNepali": "व्यक्ति (शिष्ट)", "kanjiCharacters": ["方"], "partOfSpeech": "Noun" },
    { "id": "v35_9", "lesson": 35, "level": "N4", "word": "向こう", "reading": "むこう", "meaning": "Over there / Opposite side", "meaningNepali": "उता / उतातिर", "kanjiCharacters": ["向"], "partOfSpeech": "Noun" },
    { "id": "v35_10", "lesson": 35, "level": "N4", "word": "島", "reading": "しま", "meaning": "Island", "meaningNepali": "टापु", "kanjiCharacters": ["島"], "partOfSpeech": "Noun" },
    { "id": "v35_11", "lesson": 35, "level": "N4", "word": "港", "reading": "みなと", "meaning": "Port / Harbor", "meaningNepali": "बन्दरगाह", "kanjiCharacters": ["港"], "partOfSpeech": "Noun" },
    { "id": "v35_12", "lesson": 35, "level": "N4", "word": "近所", "reading": "きんじょ", "meaning": "Neighborhood", "meaningNepali": "छिमेक", "kanjiCharacters": ["近", "所"], "partOfSpeech": "Noun" },
    { "id": "v35_13", "lesson": 35, "level": "N4", "word": "屋上", "reading": "おくじょう", "meaning": "Rooftop", "meaningNepali": "छात", "kanjiCharacters": ["屋", "上"], "partOfSpeech": "Noun" },
    { "id": "v35_14", "lesson": 35, "level": "N4", "word": "海外", "reading": "かいがい", "meaning": "Overseas", "meaningNepali": "समुन्द्रपार / विदेश", "kanjiCharacters": ["海", "外"], "partOfSpeech": "Noun" },
    { "id": "v35_15", "lesson": 35, "level": "N4", "word": "山登り", "reading": "やまのぼり", "meaning": "Mountain climbing", "meaningNepali": "पर्वतारोहण", "kanjiCharacters": ["山", "登"], "partOfSpeech": "Noun" },
    { "id": "v35_16", "lesson": 35, "level": "N4", "word": "ハイキング", "reading": "ハイキング", "meaning": "Hiking", "meaningNepali": "हाईकिङ", "kanjiCharacters": [], "partOfSpeech": "Noun" },
    { "id": "v35_17", "lesson": 35, "level": "N4", "word": "機会", "reading": "きかい", "meaning": "Opportunity / Chance", "meaningNepali": "अवसर", "kanjiCharacters": ["機", "会"], "partOfSpeech": "Noun" },
    { "id": "v35_18", "lesson": 35, "level": "N4", "word": "許可", "reading": "きょか", "meaning": "Permission", "meaningNepali": "अनुमति", "kanjiCharacters": ["許", "可"], "partOfSpeech": "Noun" }
]

# Read lib/nihongo-vocab.ts
with open("lib/nihongo-vocab.ts", "r", encoding="utf-8") as f:
    vocab_code = f.read()

# Locate Lesson 30 section insertion point
l29_end = vocab_code.find('// ════════════════════════════════════\n  // LESSON 29')
l29_next = vocab_code.find('// ─────────────────────────────────────────────\n  // PART 2:')
if l29_next == -1:
    l29_next = len(vocab_code) - 10

all_30_to_35_vocab_str = ""

def format_vocab_block(lesson_num, title, items):
    res = f"\n  // ════════════════════════════════════\n  // LESSON {lesson_num} — {title}\n  // ════════════════════════════════════\n"
    for v in items:
        res += "  " + json.dumps(v, ensure_ascii=False) + ",\n"
    return res

all_30_to_35_vocab_str += format_vocab_block(30, "Action State 〜てあります & Preparation 〜でおきます", l30_vocab)
all_30_to_35_vocab_str += format_vocab_block(31, "Volitional Form 意向形 & Plans 〜と思っています", l31_vocab)
all_30_to_35_vocab_str += format_vocab_block(32, "Advice 〜ほうがいい & Conjecture 〜でしょう / 〜かもしれない", l32_vocab)
all_30_to_35_vocab_str += format_vocab_block(33, "Imperative / Prohibitive 命令形・禁止形 & Quoting 〜と言っていました", l33_vocab)
all_30_to_35_vocab_str += format_vocab_block(34, "Doing as instructed 〜とおりに & After 〜あとで", l34_vocab)
all_30_to_35_vocab_str += format_vocab_block(35, "Conditional Form 〜ば & Topic 〜なら", l35_vocab)

# Insert after lesson 29 in lib/nihongo-vocab.ts before export or end of array
vocab_insert_pos = vocab_code.find("];\n\nexport const NIHONGO_LESSONS")
if vocab_insert_pos == -1:
    vocab_insert_pos = vocab_code.rfind("];")

vocab_code = vocab_code[:vocab_insert_pos] + all_30_to_35_vocab_str + "\n" + vocab_code[vocab_insert_pos:]

with open("lib/nihongo-vocab.ts", "w", encoding="utf-8") as f:
    f.write(vocab_code)

print("SUCCESSFULLY_INJECTED_LESSONS_30_TO_35_VOCAB")

# Read lib/grammar-guide.ts
with open("lib/grammar-guide.ts", "r", encoding="utf-8") as f:
    g_code = f.read()

# Generate Grammar Guides for Lessons 30 through 35
new_l30_to_l35_g = """  {
    language: 'JAPANESE', level: 'N4', lesson: 30,
    lessonTitle: 'Lesson 30 – State of Preparation 〜てあります & Advance Preparation 〜ておきます',
    grammarPoints: [
      {
        title: '1. State of Intentional Action (N が V-て あります)',
        pattern: '[Noun] が [Transitive Verb て-form] + あります',
        explanationEnglish: 'Expresses that a state has been brought about intentionally for a specific purpose by someone.',
        explanationNepali: 'कुनै खास उद्देश्यले कसैद्वारा पूर्व-तयारी गरी राखिएको स्थिति व्यक्त गर्दछ।',
        examples: [
          { target: 'カレンダーに予定が書いてあります。', reading: 'カレンダーによていが書いてあります。', english: 'The schedule is written on the calendar.', nepali: 'पात्रोमा कार्यतालिका लेखिएको छ।' }
        ]
      },
      {
        title: '2. Preparation in Advance (V-て おきます)',
        pattern: '[Verb て-form] + おきます',
        explanationEnglish: '1) Doing an action in advance for future convenience. 2) Leaving a state as it is for the next use.',
        explanationNepali: '१) भविष्यको सुविधाका लागि पहिले नै तयारी स्वरूप काम गर्नु। २) अर्को पटकको प्रयोगका लागि अवस्था यत्तिकै राख्नु।',
        examples: [
          { target: '旅行の前にチケットを買っておきます。', reading: 'りょこうのまえにチケットをかっておきます。', english: 'I will buy the tickets in advance before the trip.', nepali: 'यात्रा अघि नै टिकट किनेर राख्नेछु।' }
        ]
      }
    ]
  },
  {
    language: 'JAPANESE', level: 'N4', lesson: 31,
    lessonTitle: 'Lesson 31 – Volitional Form (意向形) & Expressing Intentions 〜と思っています',
    grammarPoints: [
      {
        title: '1. Volitional Form Conjugation (意向形)',
        pattern: 'Gr.1: う→おう (書く→書こう) | Gr.2: る→よう (食べる→食べよう) | Irreg: する→しよう, 来る→来よう',
        explanationEnglish: 'The casual equivalent of 〜ましょう. Used to invite or express willpower.',
        explanationNepali: '〜ましょう को सामान्य बोलचाल रूप। प्रस्ताव राख्न वा इच्छा व्यक्त गर्न प्रयोग हुन्छ।',
        examples: [
          { target: '一緒にご飯を食べよう。', reading: 'いっしょにごはんをたべよう。', english: 'Let us eat together.', nepali: 'सँगै खाना खाऔँ।' }
        ]
      },
      {
        title: '2. Expressing Intentions (V-Volitional + と思っています)',
        pattern: '[Verb Volitional form] + と思っています',
        explanationEnglish: 'Expresses a decision or plan that the speaker has been holding for some time.',
        explanationNepali: 'वक्ताले केही समयदेखि मनमा बनाइराखेको योजना वा विचार व्यक्त गर्दछ।',
        examples: [
          { target: '週末は海へ行こうと思っています。', reading: 'しゅうまつはうみへいこうとおもっています。', english: 'I am planning to go to the sea this weekend.', nepali: 'यो साताको अन्तमा समुन्द्र जाने सोचिरहेको छु।' }
        ]
      }
    ]
  },
  {
    language: 'JAPANESE', level: 'N4', lesson: 32,
    lessonTitle: 'Lesson 32 – Suggestions 〜ほうがいい & Conjecture 〜でしょう / 〜かもしれない',
    grammarPoints: [
      {
        title: '1. Giving Advice / Suggestion (V-た / V-ない ほうがいいです)',
        pattern: '[Verb た-form / ない-form] + ほうがいいです',
        explanationEnglish: 'Used to give direct advice or recommendations.',
        explanationNepali: 'सुझाव वा सल्लाह दिन प्रयोग गरिन्छ।',
        examples: [
          { target: '毎日運動したほうがいいです。', reading: 'まいにちうんどうしたほうがいいです。', english: 'You had better exercise every day.', nepali: 'हरेक दिन व्यायाम गरेको राम्रो हुन्छ।' }
        ]
      },
      {
        title: '2. Conjecture / Probability (〜でしょう / 〜かもしれない)',
        pattern: '[Plain Form] + でしょう (70-80% likely) / かもしれない (50% possibility)',
        explanationEnglish: '〜でしょう expresses high probability ("probably"). 〜かもしれない expresses possibility ("might/maybe").',
        explanationNepali: '〜でしょう ले उच्च सम्भावना जनाउँछ। 〜かもしれない ले सम्भावना हुन सक्ने जनाउँछ।',
        examples: [
          { target: '明日は雨が降るでしょう。', reading: 'あしたはあめがふるでしょう。', english: 'It will probably rain tomorrow.', nepali: 'भोलि पानी पर्ला।' },
          { target: '時間に間に合わないかもしれない。', reading: 'じかんにまにあわないかもしれない。', english: 'We might not be in time.', nepali: 'समयमा नपुग्न पनि सकिन्छ।' }
        ]
      }
    ]
  },
  {
    language: 'JAPANESE', level: 'N4', lesson: 33,
    lessonTitle: 'Lesson 33 – Imperative / Prohibitive Forms (命令形・禁止形) & Quoting 〜と言っていました',
    grammarPoints: [
      {
        title: '1. Imperative and Prohibitive Forms (命令形・禁止形)',
        pattern: 'Imperative: 行け / 食べろ | Prohibitive: 行くな / 食べるな',
        explanationEnglish: 'Commands and strict prohibitions used in emergencies, sports, or by superiors.',
        explanationNepali: 'आपत्कालीन अवस्था वा खेलकुदमा दिइने कडा आदेश र निषेध।',
        examples: [
          { target: '早く走れ！', reading: 'はやくはしれ！', english: 'Run fast!', nepali: 'छिटो दगुर्!' },
          { target: 'ここに触るな！', reading: 'ここにさわるな！', english: 'Do not touch here!', nepali: 'यहाँ नछोऊ!' }
        ]
      },
      {
        title: '2. Indirect Quoting (〜と言っていました / 〜という意味です)',
        pattern: '[Sentence Plain form] + と言っていました / という意味です',
        explanationEnglish: 'Used to pass on a message or explain the meaning of a sign or word.',
        explanationNepali: 'सन्देश पुर्‍याउन वा कुनै शब्द/चिह्नको अर्थ बुझाउन प्रयोग गरिन्छ।',
        examples: [
          { target: '田中さんは明日休むと言っていました。', reading: 'たなかさんはあしたやすむといっていました。', english: 'Tanaka said he will take tomorrow off.', nepali: 'नाकाजीले भोलि बिदा बस्छु भन्नुभएको थियो।' }
        ]
      }
    ]
  },
  {
    language: 'JAPANESE', level: 'N4', lesson: 34,
    lessonTitle: 'Lesson 34 – Doing as Instructed 〜とおりに & Sequence 〜あとで',
    grammarPoints: [
      {
        title: '1. Doing as Instructed (V-とおりに / N の とおりに)',
        pattern: '[Verb Plain / Noun の] + とおりに',
        explanationEnglish: 'Doing an action in the exact manner as instructed or shown.',
        explanationNepali: 'निर्देशन वा प्रदर्शन अनुसार नै दुरुस्त काम गर्नु।',
        examples: [
          { target: '私が言ったとおりに書いてください。', reading: 'わたしがいったとおりにかいてください。', english: 'Please write down exactly as I said.', nepali: 'मैले भने अनुसार नै लेख्नुहोस्।' }
        ]
      },
      {
        title: '2. Action Sequence (V-た あとで / N の あとで)',
        pattern: '[Verb た-form / Noun の] + あとで',
        explanationEnglish: 'Expresses that an event occurs after completing another action.',
        explanationNepali: 'एउटा काम सकिएपछि अर्को काम गर्ने क्रम जनाउँछ।',
        examples: [
          { target: '仕事が終わったあとで、飲みに行きます。', reading: 'しごとがおわったあとで、のみにいきます。', english: 'After work finishes, we will go for a drink.', nepali: 'काम सकिएपछि पिउन जानेछौँ।' }
        ]
      }
    ]
  },
  {
    language: 'JAPANESE', level: 'N4', lesson: 35,
    lessonTitle: 'Lesson 35 – Conditional Form (条件形 〜ば) & Topic Suggestion 〜なら',
    grammarPoints: [
      {
        title: '1. Conditional Form (〜ば)',
        pattern: 'Gr 1: え+ば (書けば) | Gr 2: れば (食べれば) | い-adj: ければ | N/な: なら',
        explanationEnglish: 'Expresses conditional requirements for a result to occur ("if... then").',
        explanationNepali: 'कुनै परिणाम हुन आवश्यक सर्त व्यक्त गर्दछ ("यदि... भने")।',
        examples: [
          { target: '安ければ、買います。', reading: 'やすければ、かいます。', english: 'If it is cheap, I will buy it.', nepali: 'सस्तो भयो भने, किन्नेछु।' },
          { target: 'ボタンを押せば、お湯が出ます。', reading: 'ボタンをおせば、おゆがでます。', english: 'If you press the button, hot water comes out.', nepali: 'बटन थिच्नुभयो भने तातोपानी आउँछ।' }
        ]
      },
      {
        title: '2. Topic Advice (N なら)',
        pattern: '[Noun] + なら',
        explanationEnglish: 'Used to offer information or recommendations on a topic mentioned by the listener.',
        explanationNepali: 'सुन्ने व्यक्तिले उठाएको विषयमा जानकारी वा सुझाव दिन प्रयोग गरिन्छ।',
        examples: [
          { target: 'カメラなら、秋葉原がいいですよ。', reading: 'カメラなら、あきはばらがいいですよ。', english: 'If you want a camera, Akihabara is great.', nepali: 'क्यामेराको लागि त अकिहाबारा राम्रो छ।' }
        ]
      }
    ]
  },"""

# Replace insertion position in grammar-guide.ts
g_insert_pos = g_code.find("];\n\nexport const KOREAN_GRAMMAR_GUIDES")
if g_insert_pos == -1:
    g_insert_pos = g_code.rfind("];")

g_code = g_code[:g_insert_pos] + new_l30_to_l35_g + "\n" + g_code[g_insert_pos:]

with open("lib/grammar-guide.ts", "w", encoding="utf-8") as f:
    f.write(g_code)

print("SUCCESSFULLY_INJECTED_LESSONS_30_TO_35_GRAMMAR_GUIDE")
