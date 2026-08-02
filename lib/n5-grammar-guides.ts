// ============================================================
// MINNA NO NIHONGO JLPT N5 — Complete Grammar Guides (Lessons 1–25)
// Official explanations & patterns from Minna no Nihongo I textbook
// Full explanations in English & Nepali with pattern rules and examples
// ============================================================

import type { LessonGrammarGuide } from './grammar-guide';

export const N5_GRAMMAR_GUIDES: LessonGrammarGuide[] = [
  {
    "language": "JAPANESE",
    "level": "N5",
    "lesson": 1,
    "lessonTitle": "Introductions & Identity (自己紹介と身分)",
    "grammarPoints": [
      {
        "title": "1. N は N です",
        "pattern": "1. N は N です",
        "explanationEnglish": "The particle は marks the topic of the sentence; a noun is selected as the topic and a statement is made about it. です marks a noun predicate, indicating judgment/assertion and conveying politeness. は here is pronounced 'wa'.",
        "explanationNepali": "N1 ले विषय र N2 ले पहिचान/गुण जनाउँछ। です ले 'हो/हुन्/हुनुहुन्छ' भन्ने अर्थ दिन्छ।",
        "examples": [
          {
            "target": "わたしはマイク・ミラーです。",
            "reading": "わたしはマイク・ミラーです。",
            "english": "I am Mike Miller.",
            "nepali": "उदाहरण: I am Mike Miller."
          },
          {
            "target": "わたしはエンジニアです。",
            "reading": "わたしはエンジニアです。",
            "english": "Example sentence.",
            "nepali": "उदाहरण: Example sentence."
          }
        ]
      },
      {
        "title": "2. N1は N2じゃ(では) ありません",
        "pattern": "2. N1は N2じゃ(では) ありません",
        "explanationEnglish": "じゃありません is the negative form of です, used in daily conversation (ではありません is used in formal speech/writing).",
        "explanationNepali": "じゃありません (वा ではありません) ले です को नकारात्मक (होइन) रूप जनाउँछ।",
        "examples": [
          {
            "target": "サントスさんは 学生じゃ ありません。",
            "reading": "サントスさんは 学生じゃ ありません。",
            "english": "Mr. Santos is not a student.",
            "nepali": "उदाहरण: Mr. Santos is not a student."
          }
        ]
      },
      {
        "title": "3. N は N か — question with か",
        "pattern": "3. N は N か — question with か",
        "explanationEnglish": "A sentence becomes a question by simply adding か to the end, with a rising intonation; word order doesn't change. Answers begin はい or いいえ. Interrogatives replace the part being asked about, and か is still added at the end.",
        "explanationNepali": "वाक्यको अन्त्यमा か थपेर प्रश्न बनाइन्छ। वाक्यको पदक्रम परिवर्तन गर्नु पर्दैन।",
        "examples": [
          {
            "target": "ミラーさんは アメリカ人ですか。― はい、アメリカ人です。",
            "reading": "ミラーさんは アメリカ人ですか。― はい、アメリカ人です。",
            "english": "Example sentence.",
            "nepali": "उदाहरण: Example sentence."
          },
          {
            "target": "あの人は どなたですか。― ミラーさんです。",
            "reading": "あの人は どなたですか。― ミラーさんです。",
            "english": "Example sentence.",
            "nepali": "उदाहरण: Example sentence."
          }
        ]
      },
      {
        "title": "4. N も",
        "pattern": "4. N も",
        "explanationEnglish": "も is used after a topic instead of は when the statement about it matches the previous topic.",
        "explanationNepali": "も निपातले 'पनि' (also/too) भन्ने अर्थ दिन्छ र は को सट्टामा प्रयोग हुन्छ।",
        "examples": [
          {
            "target": "ミラーさんは 会社員です。グプタさんも 会社員です。",
            "reading": "ミラーさんは 会社員です。グプタさんも 会社員です。",
            "english": "Mr. Miller is a company employee. Mr. Gupta is also a company employee.",
            "nepali": "उदाहरण: Mr. Miller is a company employee. Mr. Gupta is also a company employee."
          }
        ]
      },
      {
        "title": "5. N1の N2",
        "pattern": "5. N1の N2",
        "explanationEnglish": "の connects two nouns; N1 modifies N2. In Lesson 1, N1 is an organization or group N2 belongs to.",
        "explanationNepali": "の निपातले दुई नामपदलाई जोड्छ र स्वामित्व (को/का/की) वा सम्बन्ध जनाउँछ।",
        "examples": [
          {
            "target": "ミラーさんは IMCの 社員です。",
            "reading": "ミラーさんは IMCの 社員です。",
            "english": "Mr. Miller is an employee of IMC.",
            "nepali": "उदाहरण: Mr. Miller is an employee of IMC."
          }
        ]
      },
      {
        "title": "6. ～さん",
        "pattern": "6. ～さん",
        "explanationEnglish": "さん is added to the listener's or a third person's name to show respect; it is never used with the speaker's own name.",
        "explanationNepali": "さん is added to the listener's or a third person's name to show respect; it is never used with the speaker's own name. को आधारमा व्याकरणिक नियम।",
        "examples": [
          {
            "target": "あの方は ミラーさんです。",
            "reading": "あの方は ミラーさんです。",
            "english": "That's Mr. Miller.",
            "nepali": "उदाहरण: That's Mr. Miller."
          }
        ]
      }
    ]
  },
  {
    "language": "JAPANESE",
    "level": "N5",
    "lesson": 2,
    "lessonTitle": "Demonstratives & Belongings (指示詞と所有物)",
    "grammarPoints": [
      {
        "title": "1. これ／それ／あれ",
        "pattern": "1. これ／それ／あれ",
        "explanationEnglish": "Demonstrative pronouns functioning as nouns. これ refers to a thing near the speaker; それ, near the listener; あれ, far from both.",
        "explanationNepali": "これ (यो), それ (त्यो), あれ (त्यो पर) वस्तु जनाउने सर्वनाम हुन्।",
        "examples": [
          {
            "target": "それは 辞書ですか。",
            "reading": "それは 辞書ですか。",
            "english": "Is that a dictionary?",
            "nepali": "उदाहरण: Is that a dictionary?"
          }
        ]
      },
      {
        "title": "2. この／その／あの + N",
        "pattern": "2. この／その／あの + N",
        "explanationEnglish": "These modify nouns (never stand alone). このN = a thing/person near the speaker; そのN = near the listener; あのN = far from both.",
        "explanationNepali": "の निपातले दुई नामपदलाई जोड्छ र स्वामित्व (को/का/की) वा सम्बन्ध जनाउँछ।",
        "examples": [
          {
            "target": "この本は わたしのです。",
            "reading": "この本は わたしのです。",
            "english": "This book is mine.",
            "nepali": "उदाहरण: This book is mine."
          },
          {
            "target": "あの人は どなたですか。",
            "reading": "あの人は どなたですか。",
            "english": "Example sentence.",
            "nepali": "उदाहरण: Example sentence."
          }
        ]
      },
      {
        "title": "3. そうです／そうじゃありません",
        "pattern": "3. そうです／そうじゃありません",
        "explanationEnglish": "In noun sentences, そうです is often used to answer yes/no questions affirmatively; そうじゃ(では)ありません negatively. 違います can also mean 'No, that's not right.'",
        "explanationNepali": "N1 ले विषय र N2 ले पहिचान/गुण जनाउँछ। です ले 'हो/हुन्/हुनुहुन्छ' भन्ने अर्थ दिन्छ।",
        "examples": [
          {
            "target": "それは テレホンカードですか。― はい、そうです。／いいえ、そうじゃ ありません。",
            "reading": "それは テレホンカードですか。― はい、そうです。／いいえ、そうじゃ ありません。",
            "english": "Example sentence.",
            "nepali": "उदाहरण: Example sentence."
          }
        ]
      },
      {
        "title": "4. S1か、S2か",
        "pattern": "4. S1か、S2か",
        "explanationEnglish": "Asks the listener to choose between two alternatives; the answer states the chosen option directly (without はい/いいえ).",
        "explanationNepali": "वाक्यको अन्त्यमा か थपेर प्रश्न बनाइन्छ। वाक्यको पदक्रम परिवर्तन गर्नु पर्दैन।",
        "examples": [
          {
            "target": "これは '9' ですか、'7' ですか。― '9' です。",
            "reading": "これは '9' ですか、'7' ですか。― '9' です。",
            "english": "Example sentence.",
            "nepali": "उदाहरण: Example sentence."
          }
        ]
      },
      {
        "title": "5. N1の N2",
        "pattern": "5. N1の N2",
        "explanationEnglish": "の connecting two nouns can also mean: (1) N1 explains what N2 is about, or (2) N1 explains who owns N2. N1 can be omitted if obvious, but not when N1 denotes a person.",
        "explanationNepali": "も निपातले 'पनि' (also/too) भन्ने अर्थ दिन्छ र は को सट्टामा प्रयोग हुन्छ।",
        "examples": [
          {
            "target": "これは コンピューターの 本です。",
            "reading": "これは コンピューターの 本です。",
            "english": "This is a book on computers.",
            "nepali": "उदाहरण: This is a book on computers."
          },
          {
            "target": "これは わたしの 本です。",
            "reading": "これは わたしの 本です。",
            "english": "This is my book.",
            "nepali": "उदाहरण: This is my book."
          }
        ]
      },
      {
        "title": "6. そうですか",
        "pattern": "6. そうですか",
        "explanationEnglish": "Used when the speaker receives new information and shows understanding of it.",
        "explanationNepali": "N1 ले विषय र N2 ले पहिचान/गुण जनाउँछ। です ले 'हो/हुन्/हुनुहुन्छ' भन्ने अर्थ दिन्छ।",
        "examples": [
          {
            "target": "このかさは ミラーさんのですか。― いいえ、シュミットさんのです。― そうですか。",
            "reading": "このかさは ミラーさんのですか。― いいえ、シュミットさんのです。― そうですか。",
            "english": "Example sentence.",
            "nepali": "उदाहरण: Example sentence."
          }
        ]
      }
    ]
  },
  {
    "language": "JAPANESE",
    "level": "N5",
    "lesson": 3,
    "lessonTitle": "Places & Directions (場所と方向)",
    "grammarPoints": [
      {
        "title": "1. ここ／そこ／あそこ, こちら／そちら／あちら",
        "pattern": "1. ここ／そこ／あそこ, こちら／そちら／あちら",
        "explanationEnglish": "These demonstratives refer to a place, unlike これ／それ／あれ (Lesson 2), which refer to a thing. こちら等 are politer than ここ等 and can also indicate direction.",
        "explanationNepali": "も निपातले 'पनि' (also/too) भन्ने अर्थ दिन्छ र は को सट्टामा प्रयोग हुन्छ।",
        "examples": [
          {
            "target": "電話は あそこです。",
            "reading": "電話は あそこです。",
            "english": "The telephone is over there.",
            "nepali": "उदाहरण: The telephone is over there."
          }
        ]
      },
      {
        "title": "2. N1は N2(place)です",
        "pattern": "2. N1は N2(place)です",
        "explanationEnglish": "Explains where a place, thing, or person is.",
        "explanationNepali": "N1 ले विषय र N2 ले पहिचान/गुण जनाउँछ। です ले 'हो/हुन्/हुनुहुन्छ' भन्ने अर्थ दिन्छ।",
        "examples": [
          {
            "target": "お手洗いは あそこです。",
            "reading": "お手洗いは あそこです。",
            "english": "The rest room is over there.",
            "nepali": "उदाहरण: The rest room is over there."
          },
          {
            "target": "山田さんは 事務所です。",
            "reading": "山田さんは 事務所です。",
            "english": "Mr. Yamada is in the office.",
            "nepali": "उदाहरण: Mr. Yamada is in the office."
          }
        ]
      },
      {
        "title": "3. どこ／どちら",
        "pattern": "3. どこ／どちら",
        "explanationEnglish": "どこ = where; どちら also means 'where' (politer) or 'which direction,' and is used to ask the name of a country, company, or school (なに cannot be used for this).",
        "explanationNepali": "も निपातले 'पनि' (also/too) भन्ने अर्थ दिन्छ र は को सट्टामा प्रयोग हुन्छ।",
        "examples": [
          {
            "target": "お国は どちらですか。",
            "reading": "お国は どちらですか。",
            "english": "Where are you from?",
            "nepali": "उदाहरण: Where are you from?"
          },
          {
            "target": "会社は どちらですか。",
            "reading": "会社は どちらですか。",
            "english": "What company do you work for?",
            "nepali": "उदाहरण: What company do you work for?"
          }
        ]
      },
      {
        "title": "4. N1の N2 (origin/maker)",
        "pattern": "4. N1の N2 (origin/maker)",
        "explanationEnglish": "When N1 is a country or company and N2 is a product, の shows N2 is made in/by N1. どこ asks where/by whom N2 is made.",
        "explanationNepali": "の निपातले दुई नामपदलाई जोड्छ र स्वामित्व (को/का/की) वा सम्बन्ध जनाउँछ।",
        "examples": [
          {
            "target": "これは どこの コンピューターですか。― 日本の コンピューターです。",
            "reading": "これは どこの コンピューターですか。― 日本の コンピューターです。",
            "english": "Where is this computer made? — It's made in Japan.",
            "nepali": "उदाहरण: Where is this computer made? — It's made in Japan."
          }
        ]
      },
      {
        "title": "5. こ／そ／あ／ど demonstrative system",
        "pattern": "5. こ／そ／あ／ど demonstrative system",
        "explanationEnglish": "A full paradigm table: things (これ/それ/あれ/どれ), things-modifying (この/その/あの/どの), people (この方 etc., L.16), places (ここ/そこ/あそこ/どこ), directions (こちら/そちら/あちら/どちら).",
        "explanationNepali": "へ (ए) निपातले गन्तव्य वा प्रस्थानको दिशा जनाउँछ।",
        "examples": [
          {
            "target": "例です。",
            "reading": "れいです。",
            "english": "This is an example.",
            "nepali": "यो एउटा उदाहरण हो।"
          }
        ]
      },
      {
        "title": "6. お～",
        "pattern": "6. お～",
        "explanationEnglish": "The prefix お is added to a word regarding the listener or a third person to express respect.",
        "explanationNepali": "The prefix お is added to a word regarding the listener or a third person to express respect. को आधारमा व्याकरणिक नियम।",
        "examples": [
          {
            "target": "お国は どちらですか。",
            "reading": "お国は どちらですか。",
            "english": "Where are you from?",
            "nepali": "उदाहरण: Where are you from?"
          }
        ]
      }
    ]
  },
  {
    "language": "JAPANESE",
    "level": "N5",
    "lesson": 4,
    "lessonTitle": "Time, Daily Routines & Days (時間と日課)",
    "grammarPoints": [
      {
        "title": "1. ～じ～ふん",
        "pattern": "1. ～じ～ふん",
        "explanationEnglish": "Time is expressed using the counter suffixes 時 (o'clock) and 分 (minutes), placed after numbers. 何時 asks the time.",
        "explanationNepali": "Time is expressed using the counter suffixes 時 (o'clock) and 分 (minutes), placed after numbers. 何時 asks the time. को आधारमा व्याकरणिक नियम।",
        "examples": [
          {
            "target": "今、何時ですか。― 7時10分です。",
            "reading": "今、何時ですか。― 7時10分です。",
            "english": "What time is it now? — It's 7:10.",
            "nepali": "उदाहरण: What time is it now? — It's 7:10."
          }
        ]
      },
      {
        "title": "2. ～ます",
        "pattern": "2. ～ます",
        "explanationEnglish": "Verbs ending in ます work as predicates; ます makes the sentence polite.",
        "explanationNepali": "Verbs ending in ます work as predicates; ます makes the sentence polite. को आधारमा व्याकरणिक नियम।",
        "examples": [
          {
            "target": "わたしは 毎日 勉強します。",
            "reading": "わたしは 毎日 勉強します。",
            "english": "I study every day.",
            "nepali": "उदाहरण: I study every day."
          }
        ]
      },
      {
        "title": "3. Vます／Vません／Vました／Vませんでした",
        "pattern": "3. Vます／Vません／Vました／Vませんでした",
        "explanationEnglish": "ます is used for habitual actions, general truths, or future events. Non-past/past and affirmative/negative forms follow a regular table. Questions are formed the same way as noun sentences (add か).",
        "explanationNepali": "じゃありません (वा ではありません) ले です को नकारात्मक (होइन) रूप जनाउँछ।",
        "examples": [
          {
            "target": "毎朝 6時に 起きます。",
            "reading": "毎朝 6時に 起きます。",
            "english": "I get up at 6 every morning.",
            "nepali": "उदाहरण: I get up at 6 every morning."
          },
          {
            "target": "今朝 6時に 起きました。",
            "reading": "今朝 6時に 起きました。",
            "english": "I got up at 6 this morning.",
            "nepali": "उदाहरण: I got up at 6 this morning."
          }
        ]
      },
      {
        "title": "4. ～から～まで",
        "pattern": "4. ～から～まで",
        "explanationEnglish": "Marks the starting and ending points of a time range (or place). から and まで need not always be used together; です can be attached directly after either.",
        "explanationNepali": "वाक्यको अन्त्यमा か थपेर प्रश्न बनाइन्छ। वाक्यको पदक्रम परिवर्तन गर्नु पर्दैन।",
        "examples": [
          {
            "target": "9時から 5時まで 働きます。",
            "reading": "9時から 5時まで 働きます。",
            "english": "I work from 9 to 5.",
            "nepali": "उदाहरण: I work from 9 to 5."
          },
          {
            "target": "銀行は 9時から 3時までです。",
            "reading": "銀行は 9時から 3時までです。",
            "english": "Example sentence.",
            "nepali": "उदाहरण: Example sentence."
          }
        ]
      },
      {
        "title": "5. N1と N2",
        "pattern": "5. N1と N2",
        "explanationEnglish": "The particle と connects two nouns in a coordinate (equal) relationship.",
        "explanationNepali": "The particle と connects two nouns in a coordinate (equal) relationship. को आधारमा व्याकरणिक नियम।",
        "examples": [
          {
            "target": "銀行は 土曜日と 日曜日は 休みです。",
            "reading": "銀行は 土曜日と 日曜日は 休みです。",
            "english": "The bank is closed on Saturdays and Sundays.",
            "nepali": "उदाहरण: The bank is closed on Saturdays and Sundays."
          }
        ]
      },
      {
        "title": "6. ね (sentence-final particle)",
        "pattern": "6. ね (sentence",
        "explanationEnglish": "Added at the end of a sentence to add feeling — expressing sympathy or seeking the listener's agreement/confirmation.",
        "explanationNepali": "Added at the end of a sentence to add feeling — expressing sympathy or seeking the listener's agreement/confirmation. को आधारमा व्याकरणिक नियम।",
        "examples": [
          {
            "target": "それは たいへんですね。",
            "reading": "それは たいへんですね。",
            "english": "That must be hard, isn't it?",
            "nepali": "उदाहरण: That must be hard, isn't it?"
          },
          {
            "target": "871-6813ですね。",
            "reading": "871-6813ですね。",
            "english": "That's 871-6813, right?",
            "nepali": "उदाहरण: That's 871-6813, right?"
          }
        ]
      }
    ]
  },
  {
    "language": "JAPANESE",
    "level": "N5",
    "lesson": 5,
    "lessonTitle": "Movement, Transportation & Dates (移動と交通)",
    "grammarPoints": [
      {
        "title": "1. N(place)へ 行きます／来ます／帰ります",
        "pattern": "1. N(place)へ 行きます／来ます／帰ります",
        "explanationEnglish": "へ marks the direction of movement (goal). へ used this way is read 'e'.",
        "explanationNepali": "へ (ए) निपातले गन्तव्य वा प्रस्थानको दिशा जनाउँछ।",
        "examples": [
          {
            "target": "京都へ 行きます。",
            "reading": "京都へ 行きます。",
            "english": "I will go to Kyoto.",
            "nepali": "उदाहरण: I will go to Kyoto."
          }
        ]
      },
      {
        "title": "2. N(vehicle)で 行きます／来ます／帰ります",
        "pattern": "2. N(vehicle)で 行きます／来ます／帰ります",
        "explanationEnglish": "で marks the means of transportation.",
        "explanationNepali": "で निपातले माध्यम, सवारी साधन वा प्रयोग गरिएको साधन जनाउँछ।",
        "examples": [
          {
            "target": "タクシーで 帰ります。",
            "reading": "タクシーで 帰ります。",
            "english": "I will go home by taxi.",
            "nepali": "उदाहरण: I will go home by taxi."
          },
          {
            "target": "歩いて 帰ります。",
            "reading": "歩いて 帰ります。",
            "english": "I go home on foot — no で with 歩いて.",
            "nepali": "उदाहरण: I go home on foot — no で with 歩いて."
          }
        ]
      },
      {
        "title": "3. N(person)と 行きます／来ます／帰ります",
        "pattern": "3. N(person)と 行きます／来ます／帰ります",
        "explanationEnglish": "と marks the person one does something with. If alone, ひとりで is used instead (と is not used).",
        "explanationNepali": "と निपातले 'सँग' (with) भन्ने अर्थ दिन्छ।",
        "examples": [
          {
            "target": "家族と 日本へ 来ました。",
            "reading": "家族と 日本へ 来ました。",
            "english": "I came to Japan with my family.",
            "nepali": "उदाहरण: I came to Japan with my family."
          },
          {
            "target": "一人で 東京へ 行きます。",
            "reading": "一人で 東京へ 行きます。",
            "english": "I'll go to Tokyo alone.",
            "nepali": "उदाहरण: I'll go to Tokyo alone."
          }
        ]
      },
      {
        "title": "4. いつ",
        "pattern": "4. いつ",
        "explanationEnglish": "いつ (when) is used without a particle, unlike time-counter interrogatives such as 何時 or 何日, which use に.",
        "explanationNepali": "いつ (when) is used without a particle, unlike time-counter interrogatives such as 何時 or 何日, which use に. को आधारमा व्याकरणिक नियम।",
        "examples": [
          {
            "target": "日本へ いつ 来ましたか。― 3月25日に 来ました。",
            "reading": "日本へ いつ 来ましたか。― 3月25日に 来ました。",
            "english": "When did you come to Japan? — I came on March 25th.",
            "nepali": "उदाहरण: When did you come to Japan? — I came on March 25th."
          }
        ]
      },
      {
        "title": "5. よ (sentence-final particle)",
        "pattern": "5. よ (sentence",
        "explanationEnglish": "Placed at the end of a sentence to emphasize information the listener doesn't know, or to state one's view assertively.",
        "explanationNepali": "Placed at the end of a sentence to emphasize information the listener doesn't know, or to state one's view assertively. को आधारमा व्याकरणिक नियम।",
        "examples": [
          {
            "target": "この電車は 甲子園へ 行きますか。― いいえ、行きません。次の各駅停車が 行きますよ。",
            "reading": "この電車は 甲子園へ 行きますか。― いいえ、行きません。次の各駅停車が 行きますよ。",
            "english": "Example sentence.",
            "nepali": "उदाहरण: Example sentence."
          }
        ]
      }
    ]
  },
  {
    "language": "JAPANESE",
    "level": "N5",
    "lesson": 6,
    "lessonTitle": "Direct Objects & Daily Actions (目的語と行動)",
    "grammarPoints": [
      {
        "title": "1. Vます-form を Vます (transitive verbs)",
        "pattern": "1. Vます",
        "explanationEnglish": "を marks the direct object of the verb.",
        "explanationNepali": "を (ओ) निपातले सकर्मक क्रियाको प्रत्यक्ष कर्म (Direct Object) जनाउँछ।",
        "examples": [
          {
            "target": "わたしは ジュースを 飲みます。",
            "reading": "わたしは ジュースを 飲みます。",
            "english": "I drink juice.",
            "nepali": "उदाहरण: I drink juice."
          }
        ]
      },
      {
        "title": "2. N(place)で V",
        "pattern": "2. N(place)で V",
        "explanationEnglish": "で marks the location where an action takes place (distinct from に used for existence, L.10).",
        "explanationNepali": "で निपातले कार्य सम्पादन हुने स्थान जनाउँछ।",
        "examples": [
          {
            "target": "駅で 新聞を 買います。",
            "reading": "駅で 新聞を 買います。",
            "english": "I buy a newspaper at the station.",
            "nepali": "उदाहरण: I buy a newspaper at the station."
          }
        ]
      },
      {
        "title": "3. S1。それから、S2。",
        "pattern": "3. S1。それから、S2。",
        "explanationEnglish": "それから connects two sentences to show sequence — 'and then.'",
        "explanationNepali": "वाक्यको अन्त्यमा か थपेर प्रश्न बनाइन्छ। वाक्यको पदक्रम परिवर्तन गर्नु पर्दैन।",
        "examples": [
          {
            "target": "日本語を 勉強しました。それから、映画を 見ました。",
            "reading": "日本語を 勉強しました。それから、映画を 見ました。",
            "english": "I studied Japanese. Then I saw a movie.",
            "nepali": "उदाहरण: I studied Japanese. Then I saw a movie."
          }
        ]
      },
      {
        "title": "4. 一緒に Vませんか — won't you join me?",
        "pattern": "4. 一緒に Vませんか — won't you join me?",
        "explanationEnglish": "Vませんか invites the listener to do something together.",
        "explanationNepali": "वाक्यको अन्त्यमा か थपेर प्रश्न बनाइन्छ। वाक्यको पदक्रम परिवर्तन गर्नु पर्दैन।",
        "examples": [
          {
            "target": "一緒に 神戸へ 行きませんか。",
            "reading": "一緒に 神戸へ 行きませんか。",
            "english": "Won't you come to Kobe with me?",
            "nepali": "उदाहरण: Won't you come to Kobe with me?"
          },
          {
            "target": "ちょっと 休みましょう。",
            "reading": "ちょっと 休みましょう。",
            "english": "Let's take a short rest.",
            "nepali": "उदाहरण: Let's take a short rest."
          }
        ]
      },
      {
        "title": "5. Vませんか vs. Vましょう",
        "pattern": "5. Vませんか vs. Vましょう",
        "explanationEnglish": "Vませんか politely invites/asks the listener's will; Vましょう is used when the speaker is confident the listener will agree, or to actively suggest doing something together.",
        "explanationNepali": "वाक्यको अन्त्यमा か थपेर प्रश्न बनाइन्छ। वाक्यको पदक्रम परिवर्तन गर्नु पर्दैन।",
        "examples": [
          {
            "target": "一緒に 昼ご飯を 食べませんか。― ええ、食べましょう。",
            "reading": "一緒に 昼ご飯を 食べませんか。― ええ、食べましょう。",
            "english": "Won't you have lunch with me? — Yes, let's eat.",
            "nepali": "उदाहरण: Won't you have lunch with me? — Yes, let's eat."
          }
        ]
      },
      {
        "title": "6. お～ (review)",
        "pattern": "6. お～ (review)",
        "explanationEnglish": "As in Lesson 3, お is attached to words related to the listener, and also to various words when the speaker wants to sound polite (お酒, お花見); some words are habitually used with お without implying respect (お茶, お金).",
        "explanationNepali": "も निपातले 'पनि' (also/too) भन्ने अर्थ दिन्छ र は को सट्टामा प्रयोग हुन्छ।",
        "examples": [
          {
            "target": "例です。",
            "reading": "れいです。",
            "english": "This is an example.",
            "nepali": "यो एउटा उदाहरण हो।"
          }
        ]
      }
    ]
  },
  {
    "language": "JAPANESE",
    "level": "N5",
    "lesson": 7,
    "lessonTitle": "Tools, Giving & Receiving (道具と授受)",
    "grammarPoints": [
      {
        "title": "1. N1は N2に Nを あげます／貸します／教えます／etc.",
        "pattern": "1. N1は N2に Nを あげます／貸します／教えます／etc.",
        "explanationEnglish": "N1 gives/lends/teaches N to N2; the recipient is marked with に.",
        "explanationNepali": "を (ओ) निपातले सकर्मक क्रियाको प्रत्यक्ष कर्म (Direct Object) जनाउँछ।",
        "examples": [
          {
            "target": "わたしは 木村さんに 花を あげます。",
            "reading": "わたしは 木村さんに 花を あげます。",
            "english": "I will give some flowers to Ms. Kimura.",
            "nepali": "उदाहरण: I will give some flowers to Ms. Kimura."
          }
        ]
      },
      {
        "title": "2. N1は N2に Nを もらいます／借ります／習います",
        "pattern": "2. N1は N2に Nを もらいます／借ります／習います",
        "explanationEnglish": "N1 receives/borrows/learns from N2; the source/giver is marked with に (or から for things like letters/money).",
        "explanationNepali": "も निपातले 'पनि' (also/too) भन्ने अर्थ दिन्छ र は को सट्टामा प्रयोग हुन्छ।",
        "examples": [
          {
            "target": "わたしは カリナさんに チョコレートを もらいました。",
            "reading": "わたしは カリナさんに チョコレートを もらいました。",
            "english": "I received some chocolates from Ms. Karina.",
            "nepali": "उदाहरण: I received some chocolates from Ms. Karina."
          }
        ]
      },
      {
        "title": "3. N(method/means)で — by means of",
        "pattern": "3. N(method/means)で — by means of",
        "explanationEnglish": "で, previously used for transportation (L.5) and location (L.6), is also used to mark the tool, material, or language/method by which an action is carried out.",
        "explanationNepali": "も निपातले 'पनि' (also/too) भन्ने अर्थ दिन्छ र は को सट्टामा प्रयोग हुन्छ।",
        "examples": [
          {
            "target": "わたしは ワープロで 手紙を 書きます。",
            "reading": "わたしは ワープロで 手紙を 書きます。",
            "english": "I write letters with a word processor.",
            "nepali": "उदाहरण: I write letters with a word processor."
          },
          {
            "target": "レポートは 日本語で 書きます。",
            "reading": "レポートは 日本語で 書きます。",
            "english": "Example sentence.",
            "nepali": "उदाहरण: Example sentence."
          }
        ]
      },
      {
        "title": "4. ～は 日本語で 何と 言いますか — how do you say ~ in Japanese?",
        "pattern": "4. ～は 日本語で 何と 言いますか — how do you say ~ in Japanese?",
        "explanationEnglish": "Asks how to express something in a given language, using 何と言いますか.",
        "explanationNepali": "वाक्यको अन्त्यमा か थपेर प्रश्न बनाइन्छ। वाक्यको पदक्रम परिवर्तन गर्नु पर्दैन।",
        "examples": [
          {
            "target": "'Good-bye' は 日本語で 何と言いますか。― 'さようなら' です。",
            "reading": "'Good-bye' は 日本語で 何と言いますか。― 'さようなら' です。",
            "english": "Example sentence.",
            "nepali": "उदाहरण: Example sentence."
          }
        ]
      },
      {
        "title": "5. もう／まだ + affirmative／negative",
        "pattern": "5. もう／まだ + affirmative／negative",
        "explanationEnglish": "もう + affirmative = already done; まだ + negative = not yet done.",
        "explanationNepali": "じゃありません (वा ではありません) ले です को नकारात्मक (होइन) रूप जनाउँछ।",
        "examples": [
          {
            "target": "もう 昼ご飯を 食べましたか。― いいえ、まだです。今から 食べます。",
            "reading": "もう 昼ご飯を 食べましたか。― いいえ、まだです。今から 食べます。",
            "english": "Have you had lunch? — Not yet. I'm going to eat now.",
            "nepali": "उदाहरण: Have you had lunch? — Not yet. I'm going to eat now."
          }
        ]
      },
      {
        "title": "6. これから",
        "pattern": "6. これから",
        "explanationEnglish": "Means 'from now on' or 'soon,' often used in set greetings.",
        "explanationNepali": "वाक्यको अन्त्यमा か थपेर प्रश्न बनाइन्छ। वाक्यको पदक्रम परिवर्तन गर्नु पर्दैन।",
        "examples": [
          {
            "target": "これから お世話に なります。",
            "reading": "これから お世話に なります。",
            "english": "I hope for your kind assistance hereafter, L.2.",
            "nepali": "उदाहरण: I hope for your kind assistance hereafter, L.2."
          }
        ]
      }
    ]
  },
  {
    "language": "JAPANESE",
    "level": "N5",
    "lesson": 8,
    "lessonTitle": "Adjectives & Qualities (形容詞と性質)",
    "grammarPoints": [
      {
        "title": "1. い-adjective／な-adjective as predicate",
        "pattern": "1. い",
        "explanationEnglish": "Both types of adjectives can serve as the predicate of a sentence. な-adjectives take です directly; い-adjectives also take です (which doesn't change their meaning, just adds politeness).",
        "explanationNepali": "も निपातले 'पनि' (also/too) भन्ने अर्थ दिन्छ र は को सट्टामा प्रयोग हुन्छ।",
        "examples": [
          {
            "target": "桜は きれいです。",
            "reading": "桜は きれいです。",
            "english": "Cherry blossoms are beautiful.",
            "nepali": "उदाहरण: Cherry blossoms are beautiful."
          },
          {
            "target": "富士山は 高いです。",
            "reading": "富士山は 高いです。",
            "english": "Mt. Fuji is high.",
            "nepali": "उदाहरण: Mt. Fuji is high."
          }
        ]
      },
      {
        "title": "2. い-adjective／な-adjective + Noun",
        "pattern": "2. い",
        "explanationEnglish": "Both adjective types can directly modify a following noun; な-adjectives keep な before the noun.",
        "explanationNepali": "विशेषण (い-विशेषण र な-विशेषण) ले नामपदको विशेषता जनाउँछ वा वाक्य पूरा गर्छ।",
        "examples": [
          {
            "target": "桜は きれいな 花です。",
            "reading": "桜は きれいな 花です。",
            "english": "Cherry blossoms are beautiful flowers.",
            "nepali": "उदाहरण: Cherry blossoms are beautiful flowers."
          },
          {
            "target": "富士山は 高い 山です。",
            "reading": "富士山は 高い 山です。",
            "english": "Mt. Fuji is a high mountain.",
            "nepali": "उदाहरण: Mt. Fuji is a high mountain."
          }
        ]
      },
      {
        "title": "3. あまり～ません",
        "pattern": "3. あまり～ません",
        "explanationEnglish": "あまり with a negative predicate means 'not very' or 'not so much.'",
        "explanationNepali": "じゃありません (वा ではありません) ले です को नकारात्मक (होइन) रूप जनाउँछ।",
        "examples": [
          {
            "target": "上海は あまり 寒くないです。",
            "reading": "上海は あまり 寒くないです。",
            "english": "Shanghai is not very cold.",
            "nepali": "उदाहरण: Shanghai is not very cold."
          }
        ]
      },
      {
        "title": "4. Nは どうですか",
        "pattern": "4. Nは どうですか",
        "explanationEnglish": "Asks for an impression or opinion about something the listener has experienced.",
        "explanationNepali": "N1 ले विषय र N2 ले पहिचान/गुण जनाउँछ। です ले 'हो/हुन्/हुनुहुन्छ' भन्ने अर्थ दिन्छ।",
        "examples": [
          {
            "target": "日本の生活は どうですか。(How is life in Japan?) ― 楽しいです。",
            "reading": "日本の生活は どうですか。(How is life in Japan?) ― 楽しいです。",
            "english": "Example sentence.",
            "nepali": "उदाहरण: Example sentence."
          }
        ]
      },
      {
        "title": "5. N1は どんな N2ですか",
        "pattern": "5. N1は どんな N2ですか",
        "explanationEnglish": "Asks the listener to describe/characterize N1, where N2 denotes the category N1 belongs to.",
        "explanationNepali": "N1 ले विषय र N2 ले पहिचान/गुण जनाउँछ। です ले 'हो/हुन्/हुनुहुन्छ' भन्ने अर्थ दिन्छ।",
        "examples": [
          {
            "target": "奈良は どんな 町ですか。(What kind of town is Nara?) ― 古い 町です。",
            "reading": "奈良は どんな 町ですか。(What kind of town is Nara?) ― 古い 町です。",
            "english": "Example sentence.",
            "nepali": "उदाहरण: Example sentence."
          }
        ]
      },
      {
        "title": "6. ～が、～ (conjunction 'but')",
        "pattern": "6. ～が、～ (conjunction 'but')",
        "explanationEnglish": "が links two sentences with a contrasting or qualifying meaning.",
        "explanationNepali": "たら ले 'भने' (शर्त वा निश्चित भविष्यको समय) जनाउँछ।",
        "examples": [
          {
            "target": "日本の食べ物は おいしいですが、高いです。",
            "reading": "日本の食べ物は おいしいですが、高いです。",
            "english": "Japanese food is good, but expensive.",
            "nepali": "उदाहरण: Japanese food is good, but expensive."
          }
        ]
      },
      {
        "title": "7. どれ",
        "pattern": "7. どれ",
        "explanationEnglish": "Used to ask the listener to choose/identify one item from three or more concrete options.",
        "explanationNepali": "たら ले 'भने' (शर्त वा निश्चित भविष्यको समय) जनाउँछ।",
        "examples": [
          {
            "target": "ミラーさんの傘は どれですか。― あの青いのです。",
            "reading": "ミラーさんの傘は どれですか。― あの青いのです。",
            "english": "Which is Mr. Miller's umbrella? — That blue one.",
            "nepali": "उदाहरण: Which is Mr. Miller's umbrella? — That blue one."
          }
        ]
      }
    ]
  },
  {
    "language": "JAPANESE",
    "level": "N5",
    "lesson": 9,
    "lessonTitle": "Preferences, Skills & Reasons (好き嫌いと理由)",
    "grammarPoints": [
      {
        "title": "1. N が わかります",
        "pattern": "1. N が わかります",
        "explanationEnglish": "With わかります, the thing understood is marked with が, not を.",
        "explanationNepali": "वाक्यको अन्त्यमा か थपेर प्रश्न बनाइन्छ। वाक्यको पदक्रम परिवर्तन गर्नु पर्दैन।",
        "examples": [
          {
            "target": "わたしは 日本語が 少し 分かります。",
            "reading": "わたしは 日本語が 少し 分かります。",
            "english": "I understand Japanese a little.",
            "nepali": "उदाहरण: I understand Japanese a little."
          }
        ]
      },
      {
        "title": "2. すき／きらい／じょうず／へた + が",
        "pattern": "2. すき／きらい／じょうず／へた + が",
        "explanationEnglish": "With these な-adjectives, the object of liking/disliking/skill is marked with が.",
        "explanationNepali": "へ (ए) निपातले गन्तव्य वा प्रस्थानको दिशा जनाउँछ।",
        "examples": [
          {
            "target": "わたしは 料理が 好きです。",
            "reading": "わたしは 料理が 好きです。",
            "english": "I like cooking.",
            "nepali": "उदाहरण: I like cooking."
          },
          {
            "target": "カリナさんは 絵が 上手です。",
            "reading": "カリナさんは 絵が 上手です。",
            "english": "Example sentence.",
            "nepali": "उदाहरण: Example sentence."
          }
        ]
      },
      {
        "title": "3. N が あります (possession)",
        "pattern": "3. N が あります (possession)",
        "explanationEnglish": "In this usage あります expresses possession of an abstract or inanimate thing (money, time, plans, etc.) — distinct from the 'existence' meaning in Lesson 10.",
        "explanationNepali": "In this usage あります expresses possession of an abstract or inanimate thing (money, time, plans, etc.) — distinct from the 'existence' meaning in Lesson 10. को आधारमा व्याकरणिक नियम।",
        "examples": [
          {
            "target": "小銭が ありますか。",
            "reading": "小銭が ありますか。",
            "english": "Do you have any small change?",
            "nepali": "उदाहरण: Do you have any small change?"
          }
        ]
      },
      {
        "title": "4. ～から、～ (reason)",
        "pattern": "4. ～から、～ (reason)",
        "explanationEnglish": "から attaches to the end of a clause giving the reason for the following statement.",
        "explanationNepali": "वाक्यको अन्त्यमा か थपेर प्रश्न बनाइन्छ। वाक्यको पदक्रम परिवर्तन गर्नु पर्दैन।",
        "examples": [
          {
            "target": "今日は 子供の 誕生日ですから、早く 帰ります。",
            "reading": "今日は 子供の 誕生日ですから、早く 帰ります。",
            "english": "Today is my child's birthday, so I will go home early.",
            "nepali": "उदाहरण: Today is my child's birthday, so I will go home early."
          }
        ]
      },
      {
        "title": "5. どうして — why",
        "pattern": "5. どうして — why",
        "explanationEnglish": "Asks the reason for something; typically answered with ～からです.",
        "explanationNepali": "Asks the reason for something; typically answered with ～からです. को आधारमा व्याकरणिक नियम।",
        "examples": [
          {
            "target": "どうして 早く 帰りましたか。― 用が ありましたから。",
            "reading": "どうして 早く 帰りましたか。― 用が ありましたから。",
            "english": "Why did you go home early? — Because I had something to do.",
            "nepali": "उदाहरण: Why did you go home early? — Because I had something to do."
          }
        ]
      }
    ]
  },
  {
    "language": "JAPANESE",
    "level": "N5",
    "lesson": 10,
    "lessonTitle": "Existence & Location of Things (存在と positional words)",
    "grammarPoints": [
      {
        "title": "1. N が あります／います",
        "pattern": "1. N が あります／います",
        "explanationEnglish": "Expresses the existence of a thing or person, treated as the subject and marked with が. あります is used for inanimate things (including plants and places); います is used for animate things that move by themselves (people, animals).",
        "explanationNepali": "Expresses the existence of a thing or person, treated as the subject and marked with が. あります is used for inanimate things (including plants and places); います is used for animate things that move by themselves (people, animals). को आधारमा व्याकरणिक नियम।",
        "examples": [
          {
            "target": "公園が あります。",
            "reading": "公園が あります。",
            "english": "There is a park.",
            "nepali": "उदाहरण: There is a park."
          },
          {
            "target": "男の人が います。",
            "reading": "男の人が います。",
            "english": "There is a man.",
            "nepali": "उदाहरण: There is a man."
          }
        ]
      },
      {
        "title": "2. N1(place)に N2が あります／います",
        "pattern": "2. N1(place)に N2が あります／います",
        "explanationEnglish": "に marks the place where something/someone is present. どこ asks about a place for things; だれ asks about a person.",
        "explanationNepali": "に marks the place where something/someone is present. どこ asks about a place for things; だれ asks about a person. को आधारमा व्याकरणिक नियम।",
        "examples": [
          {
            "target": "地下に 何が ありますか。― レストランが あります。",
            "reading": "地下に 何が ありますか。― レストランが あります。",
            "english": "What's in the basement? — There are restaurants.",
            "nepali": "उदाहरण: What's in the basement? — There are restaurants."
          }
        ]
      },
      {
        "title": "3. N1は N2(place)に あります／います",
        "pattern": "3. N1は N2(place)に あります／います",
        "explanationEnglish": "Here N1 is picked up as the topic (something both speaker and listener know) and its location is explained; the particle on N1 is は (topic), not が (subject).",
        "explanationNepali": "Here N1 is picked up as the topic (something both speaker and listener know) and its location is explained; the particle on N1 is は (topic), not が (subject). को आधारमा व्याकरणिक नियम।",
        "examples": [
          {
            "target": "東京ディズニーランドは 千葉県に あります。(Tokyo Disneyland is in Chiba Prefecture.) — this can also be rephrased with で as in Lesson 3: N1は N2(place)です.",
            "reading": "東京ディズニーランドは 千葉県に あります。(Tokyo Disneyland is in Chiba Prefecture.) — this can also be rephrased with で as in Lesson 3: N1は N2(place)です.",
            "english": "Example sentence.",
            "nepali": "उदाहरण: Example sentence."
          }
        ]
      },
      {
        "title": "4. Position words + の + N",
        "pattern": "4. Position words + の + N",
        "explanationEnglish": "上/下/前/後ろ/右/左/中/外/隣/近く/間 combine with の to modify a following noun, indicating relative position.",
        "explanationNepali": "の निपातले दुई नामपदलाई जोड्छ र स्वामित्व (को/का/की) वा सम्बन्ध जनाउँछ।",
        "examples": [
          {
            "target": "机の 上に 写真が あります。",
            "reading": "机の 上に 写真が あります。",
            "english": "There's a photo on the desk.",
            "nepali": "उदाहरण: There's a photo on the desk."
          }
        ]
      },
      {
        "title": "5. N1や N2[など]",
        "pattern": "5. N1や N2[など]",
        "explanationEnglish": "Used like と (L.4) to connect nouns, but implies a non-exhaustive example list ('such things as').",
        "explanationNepali": "Used like と (L.4) to connect nouns, but implies a non-exhaustive example list ('such things as'). को आधारमा व्याकरणिक नियम।",
        "examples": [
          {
            "target": "箱の 中に 古い 手紙や 写真などが あります。",
            "reading": "箱の 中に 古い 手紙や 写真などが あります。",
            "english": "There are old letters, photos, and so on in the box.",
            "nepali": "उदाहरण: There are old letters, photos, and so on in the box."
          }
        ]
      },
      {
        "title": "6. いちばん + adjective",
        "pattern": "6. いちばん + adjective",
        "explanationEnglish": "いちばん before an adjective means 'the most ~.'",
        "explanationNepali": "विशेषण (い-विशेषण र な-विशेषण) ले नामपदको विशेषता जनाउँछ वा वाक्य पूरा गर्छ।",
        "examples": [
          {
            "target": "いちばん 高い たなに あります。",
            "reading": "いちばん 高い たなに あります。",
            "english": "It's on the top shelf.",
            "nepali": "उदाहरण: It's on the top shelf."
          }
        ]
      }
    ]
  },
  {
    "language": "JAPANESE",
    "level": "N5",
    "lesson": 11,
    "lessonTitle": "Counting & Quantifiers (助数詞と数量)",
    "grammarPoints": [
      {
        "title": "1. Native Japanese numbers (ひとつ～とお) and counter suffixes",
        "pattern": "1. Native Japanese numbers (ひとつ～とお) and counter suffixes",
        "explanationEnglish": "Objects up to ten can be counted with the native series ひとつ～とお; beyond that, plain numbers are used. Different counter suffixes attach to numbers depending on the type of item: 〜人 (people, with exceptions ひとり/ふたり), 〜台 (machines/vehicles), 〜枚 (flat things), 〜回 (times), 〜分/〜時間 (minutes/hours), 〜日 (days, using date-style readings from 2–10), 〜週間, 〜か月, 〜年.",
        "explanationNepali": "を (ओ) निपातले सकर्मक क्रियाको प्रत्यक्ष कर्म (Direct Object) जनाउँछ।",
        "examples": [
          {
            "target": "りんごを 四つ 買いました。",
            "reading": "りんごを 四つ 買いました。",
            "english": "I bought four apples.",
            "nepali": "उदाहरण: I bought four apples."
          },
          {
            "target": "外国人の 学生が 二人 います。",
            "reading": "外国人の 学生が 二人 います。",
            "english": "There are two foreign students.",
            "nepali": "उदाहरण: There are two foreign students."
          }
        ]
      },
      {
        "title": "2. Position of quantifiers",
        "pattern": "2. Position of quantifiers",
        "explanationEnglish": "Quantifiers (number + counter) are usually placed right before the verb they modify, though this is not always the case with lengths of time.",
        "explanationNepali": "たら ले 'भने' (शर्त वा निश्चित भविष्यको समय) जनाउँछ।",
        "examples": [
          {
            "target": "国で 2か月 日本語を 勉強しました。",
            "reading": "国で 2か月 日本語を 勉強しました。",
            "english": "I studied Japanese for two months in my country.",
            "nepali": "उदाहरण: I studied Japanese for two months in my country."
          }
        ]
      },
      {
        "title": "3. いくつ／なんにん／etc. — asking quantity",
        "pattern": "3. いくつ／なんにん／etc. — asking quantity",
        "explanationEnglish": "いくつ asks 'how many' for things counted with ひとつ〜とお; other counter-specific interrogatives (何人, 何枚, 何回...) are used for their respective counters.",
        "explanationNepali": "たら ले 'भने' (शर्त वा निश्चित भविष्यको समय) जनाउँछ।",
        "examples": [
          {
            "target": "みかんを いくつ 買いましたか。― 8つ 買いました。",
            "reading": "みかんを いくつ 買いましたか。― 8つ 買いました。",
            "english": "How many mandarin oranges did you buy? — I bought eight.",
            "nepali": "उदाहरण: How many mandarin oranges did you buy? — I bought eight."
          }
        ]
      },
      {
        "title": "4. ～だけ — only",
        "pattern": "4. ～だけ — only",
        "explanationEnglish": "だけ restricts the preceding element to an exact/limited amount.",
        "explanationNepali": "だけ restricts the preceding element to an exact/limited amount. को आधारमा व्याकरणिक नियम।",
        "examples": [
          {
            "target": "3か月だけ 勉強しました。",
            "reading": "3か月だけ 勉強しました。",
            "english": "I studied for only three months.",
            "nepali": "उदाहरण: I studied for only three months."
          }
        ]
      },
      {
        "title": "5. ～ぐらい — about, approximately",
        "pattern": "5. ～ぐらい — about, approximately",
        "explanationEnglish": "Attached after a quantity to indicate an approximation.",
        "explanationNepali": "Attached after a quantity to indicate an approximation. को आधारमा व्याकरणिक नियम।",
        "examples": [
          {
            "target": "1週間に 2回ぐらい テニスを します。",
            "reading": "1週間に 2回ぐらい テニスを します。",
            "english": "I play tennis about twice a week.",
            "nepali": "उदाहरण: I play tennis about twice a week."
          }
        ]
      },
      {
        "title": "6. どのくらい — how long/how much",
        "pattern": "6. どのくらい — how long/how much",
        "explanationEnglish": "Asks about the extent, duration, or amount of something.",
        "explanationNepali": "の निपातले दुई नामपदलाई जोड्छ र स्वामित्व (को/का/की) वा सम्बन्ध जनाउँछ।",
        "examples": [
          {
            "target": "大阪から 東京まで 新幹線で どのくらい かかりますか。― 2時間半ぐらい かかります。",
            "reading": "大阪から 東京まで 新幹線で どのくらい かかりますか。― 2時間半ぐらい かかります。",
            "english": "How long does it take from Osaka to Tokyo by Shinkansen? — About two and a half hours.",
            "nepali": "उदाहरण: How long does it take from Osaka to Tokyo by Shinkansen? — About two and a half hours."
          }
        ]
      }
    ]
  },
  {
    "language": "JAPANESE",
    "level": "N5",
    "lesson": 12,
    "lessonTitle": "Past Tense Adjectives & Comparisons (過去形と比較)",
    "grammarPoints": [
      {
        "title": "1. Past tense of noun／な-adjective sentences",
        "pattern": "1. Past tense of noun／な",
        "explanationEnglish": "です → でした (affirmative past); じゃありません → じゃありませんでした (negative past).",
        "explanationNepali": "じゃありません (वा ではありません) ले です को नकारात्मक (होइन) रूप जनाउँछ।",
        "examples": [
          {
            "target": "きのうは 雨でした。",
            "reading": "きのうは 雨でした。",
            "english": "It was rainy yesterday.",
            "nepali": "उदाहरण: It was rainy yesterday."
          },
          {
            "target": "きのうの試験は 簡単じゃ ありませんでした。",
            "reading": "きのうの試験は 簡単じゃ ありませんでした。",
            "english": "Example sentence.",
            "nepali": "उदाहरण: Example sentence."
          }
        ]
      },
      {
        "title": "2. Past tense of い-adjective sentences",
        "pattern": "2. Past tense of い",
        "explanationEnglish": "～い → ～かったです (affirmative past); ～いです → ～くなかったです (negative past). (いい is irregular: よかったです.)",
        "explanationNepali": "じゃありません (वा ではありません) ले です को नकारात्मक (होइन) रूप जनाउँछ।",
        "examples": [
          {
            "target": "きのうは 暑かったです。",
            "reading": "きのうは 暑かったです。",
            "english": "It was hot yesterday.",
            "nepali": "उदाहरण: It was hot yesterday."
          },
          {
            "target": "パーティーは あまり 楽しく なかったです。",
            "reading": "パーティーは あまり 楽しく なかったです。",
            "english": "Example sentence.",
            "nepali": "उदाहरण: Example sentence."
          }
        ]
      },
      {
        "title": "3. N1は N2より adjective です — comparison",
        "pattern": "3. N1は N2より adjective です — comparison",
        "explanationEnglish": "Describes N1's quality relative to N2, using より ('than').",
        "explanationNepali": "N1 ले विषय र N2 ले पहिचान/गुण जनाउँछ। です ले 'हो/हुन्/हुनुहुन्छ' भन्ने अर्थ दिन्छ।",
        "examples": [
          {
            "target": "この車は あの車より 大きいです。",
            "reading": "この車は あの車より 大きいです。",
            "english": "This car is bigger than that car.",
            "nepali": "उदाहरण: This car is bigger than that car."
          }
        ]
      },
      {
        "title": "4. N1と N2と どちらが adjective ですか",
        "pattern": "4. N1と N2と どちらが adjective ですか",
        "explanationEnglish": "Asks the listener to choose between two items; どちら is always the interrogative used for a two-item comparison.",
        "explanationNepali": "N1 ले विषय र N2 ले पहिचान/गुण जनाउँछ। です ले 'हो/हुन्/हुनुहुन्छ' भन्ने अर्थ दिन्छ।",
        "examples": [
          {
            "target": "野球と サッカーと どちらが 面白いですか。― サッカーのほうが 面白いです。",
            "reading": "野球と サッカーと どちらが 面白いですか。― サッカーのほうが 面白いです。",
            "english": "Which is more interesting, baseball or soccer? — Soccer is.",
            "nepali": "उदाहरण: Which is more interesting, baseball or soccer? — Soccer is."
          }
        ]
      },
      {
        "title": "5. N(group)で 何が いちばん adjective ですか — superlative among 3+",
        "pattern": "5. N(group)で 何が いちばん adjective ですか — superlative among 3+",
        "explanationEnglish": "Asks the listener to choose the most '~' from a category/group of three or more; the interrogative depends on the category (何, どこ, だれ, いつ, etc.).",
        "explanationNepali": "N1 ले विषय र N2 ले पहिचान/गुण जनाउँछ। です ले 'हो/हुन्/हुनुहुन्छ' भन्ने अर्थ दिन्छ।",
        "examples": [
          {
            "target": "日本の料理で 何が いちばん おいしいですか。― てんぷらが いちばん おいしいです。",
            "reading": "日本の料理で 何が いちばん おいしいですか。― てんぷらが いちばん おいしいです。",
            "english": "Of Japanese dishes, what's the most delicious? — Tempura is.",
            "nepali": "उदाहरण: Of Japanese dishes, what's the most delicious? — Tempura is."
          }
        ]
      },
      {
        "title": "6. Nが adjective ですか (subject as interrogative)",
        "pattern": "6. Nが adjective ですか (subject as interrogative)",
        "explanationEnglish": "As in Lesson 10, when the subject is an interrogative, が is used instead of は.",
        "explanationNepali": "N1 ले विषय र N2 ले पहिचान/गुण जनाउँछ। です ले 'हो/हुन्/हुनुहुन्छ' भन्ने अर्थ दिन्छ।",
        "examples": [
          {
            "target": "家族で 誰が いちばん 背が 高いですか。― 弟が いちばん 高いです。",
            "reading": "家族で 誰が いちばん 背が 高いですか。― 弟が いちばん 高いです。",
            "english": "Example sentence.",
            "nepali": "उदाहरण: Example sentence."
          }
        ]
      }
    ]
  },

  {
    language: 'JAPANESE', level: 'N5', lesson: 13,
    lessonTitle: 'Desires & Purpose of Movement (欲しい・〜たい・目的)',
    grammarPoints: [
      {
        title: '1. Nが ほしいです',
        pattern: '1. Nが ほしいです',
        explanationEnglish: 'Expresses the speaker\'s desire to possess/have an object; also used to ask what the listener wants. The object is marked by が. ほしい is an い-adjective.',
        explanationNepali: 'N が ほしいです ले कुनै भौतिक वस्तुको चाहना (\'मलाई... चाहिएको छ\') व्यक्त गर्दछ।',
        examples: [
          { target: 'わたしは 友だちが ほしいです。', reading: 'わたしは 友だちが ほしいです。', english: 'I want a friend.', nepali: 'मलाई साथी चाहिएको छ।' },
          { target: '今 何が いちばん ほしいですか。― 車が いちばん ほしいです。', reading: '今 何が いちばん ほしいですか。― 車が いちばん ほしいです。', english: '今 何が いちばん ほしいですか。― 車が いちばん ほしいです。', nepali: '今 何が いちばん ほしいですか。― 車が いちばん ほしいです。' }
        ]
      },
      {
        title: '2. Verb ます-form → ます-stem; V(ます-stem)たいです',
        pattern: '2. Verb ます-form → ます-stem; V(ます-stem)たいです',
        explanationEnglish: 'Expresses the speaker\'s desire to do something; also used to ask the listener\'s wish. The object particle を can be replaced by が (only in this construction). たい inflects like an い-adjective. Cannot be used for a third person\'s desire; not used to offer something (use くださいませんか / いかがですか instead).',
        explanationNepali: 'Verb ます-stem + たいです ले कुनै कार्य गर्ने इच्छा (\'गर्न चाहन्छु\') व्यक्त गर्दछ।',
        examples: [
          { target: 'おきなわへ 行きたいです。', reading: 'おきなわへ 行きたいです。', english: 'I want to go to Okinawa.', nepali: 'I want to go to Okinawa. (नेपाली)' },
          { target: 'てんぷらが/を 食べたいです。', reading: 'てんぷらが/を 食べたいです。', english: 'てんぷらが/を 食べたいです。', nepali: 'てんぷらが/を 食べたいです。' }
        ]
      },
      {
        title: '3. V(ます-stem)に 行きます／来ます／帰ります — Purpose of movement',
        pattern: '3. V(ます-stem)に 行きます／来ます／帰ります — Purpose of movement',
        explanationEnglish: 'Expresses the purpose of going/coming/returning, marked with に. A noun before に must denote an action (or an event such as a festival/concert).',
        explanationNepali: 'V(dictionary form) / Nの まえに ले कुनै कार्य गर्नुअघि (\'गर्नुअघि\') अर्को कार्य हुनु जनाउँछ।',
        examples: [
          { target: '神戸へ インド料理を 食べに 行きます。', reading: '神戸へ インド料理を 食べに 行きます。', english: 'I\'m going to Kobe to eat Indian food.', nepali: 'I\'m going to Kobe to eat Indian food. (नेपाली)' },
          { target: '買い物に 行きます。', reading: '買い物に 行きます。', english: '買い物に 行きます。', nepali: '買い物に 行きます。' }
        ]
      },
      {
        title: '4. Nに 乗ります／Nを 降ります',
        pattern: '4. Nに 乗ります／Nを 降ります',
        explanationEnglish: 'に marks the goal with verbs like 乗ります(get on); を marks the starting point with verbs like 降ります(get off), 出ます(leave).',
        explanationNepali: 'に marks the goal with verbs like 乗ります(get on); を marks the starting point with verbs like 降ります(get off), 出ます(leave). (नेपाली व्याख्या)',
        examples: [
          { target: 'あの きっさてんに 入りましょう。', reading: 'あの きっさてんに 入りましょう。', english: 'あの きっさてんに 入りましょう。', nepali: 'あの きっさてんに 入りましょう。' }
        ]
      },
      {
        title: '5. どこか／なにか',
        pattern: '5. どこか／なにか',
        explanationEnglish: 'どこか = anywhere/somewhere; なにか = anything/something. The particles に and を can be omitted.',
        explanationNepali: 'どこか = anywhere/somewhere; なにか = anything/something. The particles に and を can be omitted. (नेपाली व्याख्या)',
        examples: [
          { target: '冬休みは どこか 行きましたか。― ええ、行きました。', reading: '冬休みは どこか 行きましたか。― ええ、行きました。', english: '冬休みは どこか 行きましたか。― ええ、行きました。', nepali: '冬休みは どこか 行きましたか。― ええ、行きました。' },
          { target: 'のどが かわきましたから、何か 飲みたいです。', reading: 'のどが かわきましたから、何か 飲みたいです。', english: 'のどが かわきましたから、何か 飲みたいです。', nepali: 'のどが かわきましたから、何か 飲みたいです。' }
        ]
      },
      {
        title: '6. ご~',
        pattern: '6. ご~',
        explanationEnglish: 'A prefix added to some words to express respect/politeness.',
        explanationNepali: 'A prefix added to some words to express respect/politeness. (नेपाली व्याख्या)',
        examples: [
          { target: 'ごちゅうもんは。', reading: 'ごちゅうもんは。', english: 'May I have your order?', nepali: 'May I have your order? (नेपाली)' }
        ]
      },
    ]
  },
  // ────────────────────────────────────────────────────────────
  // LESSON 14
  // ────────────────────────────────────────────────────────────
  {
    language: 'JAPANESE', level: 'N5', lesson: 14,
    lessonTitle: 'Te-Form Conjugation & Polite Requests (て形と依頼)',
    grammarPoints: [
      {
        title: '1. Verb conjugation & verb groups',
        pattern: '1. Verb conjugation & verb groups',
        explanationEnglish: 'Japanese verbs conjugate and are divided into three groups. Group I: ます-stem ends in an い-line sound (かきます, のみます). Group II: ます-stem mostly ends in an え-line sound, some in い-line (たべます, みせます, みます). Group III: irregular — します and \'noun+します\', and きます.',
        explanationNepali: 'Japanese verbs conjugate and are divided into three groups. Group I: ます-stem ends in an い-line sound (かきます, のみます). Group II: ます-stem mostly ends in an え-line sound, some in い-line (たべます, みせます, みます). Group III: irregular — します and \'noun+します\', and きます. (नेपाली व्याख्या)',
        examples: [

        ]
      },
      {
        title: '2. Verb て-form',
        pattern: '2. Verb て-form',
        explanationEnglish: 'The verb form ending in て or で is called the て-form. Group I: formed depending on the last sound of the ます-form (see conjugation table; いきます→いって is an exception). Group II: attach て to the ます-stem. Group III: attach て to the ます-stem (します→して, きます→きて).',
        explanationNepali: 'The verb form ending in て or で is called the て-form. Group I: formed depending on the last sound of the ます-form (see conjugation table; いきます→いって is an exception). Group II: attach て to the ます-stem. Group III: attach て to the ます-stem (します→して, きます→きて). (नेपाली व्याख्या)',
        examples: [

        ]
      },
      {
        title: '3. Vて-form ください',
        pattern: '3. Vて-form ください',
        explanationEnglish: 'Used to ask, instruct, or encourage the listener to do something (not for superiors). すみませんが is often added before the request to make it more polite.',
        explanationNepali: 'V(dictionary form) / Nの まえに ले कुनै कार्य गर्नुअघि (\'गर्नुअघि\') अर्को कार्य हुनु जनाउँछ।',
        examples: [
          { target: 'ここに 名前と 住所を 書いて ください。', reading: 'ここに 名前と 住所を 書いて ください。', english: 'Please write your name and address here.', nepali: 'कृपया यहाँ आफ्नो नाम लेख्नुहोस्।' },
          { target: 'すみませんが、この かんじの 読み方を 教えて ください。', reading: 'すみませんが、この かんじの 読み方を 教えて ください。', english: 'すみませんが、この かんじの 読み方を 教えて ください。', nepali: 'すみませんが、この かんじの 読み方を 教えて ください。' }
        ]
      },
      {
        title: '4. Vて-form います (progressive)',
        pattern: '4. Vて-form います (progressive)',
        explanationEnglish: 'Indicates that an action/motion is currently in progress.',
        explanationNepali: 'Indicates that an action/motion is currently in progress. (नेपाली व्याख्या)',
        examples: [
          { target: 'ミラーさんは 今 電話を かけて います。', reading: 'ミラーさんは 今 電話を かけて います。', english: 'Mr. Miller is making a phone call now.', nepali: 'Mr. Miller is making a phone call now. (नेपाली)' },
          { target: '今 雨が 降って いますか。', reading: '今 雨が 降って いますか。', english: '今 雨が 降って いますか。', nepali: '今 雨が 降って いますか。' }
        ]
      },
      {
        title: '5. Vます-stem ましょうか',
        pattern: '5. Vます-stem ましょうか',
        explanationEnglish: 'Used when the speaker offers to do something for the listener.',
        explanationNepali: 'Vましょうか ले सुन्ने व्यक्तिका लागि मद्दत वा कार्य गर्ने प्रस्ताव गर्दा प्रयोग गरिन्छ।',
        examples: [
          { target: '明日も 来ましょうか。― ええ、10時に 来て ください。/ かさを 貸しましょうか。― ええ、お願いします。', reading: '明日も 来ましょうか。― ええ、10時に 来て ください。/ かさを 貸しましょうか。― ええ、お願いします。', english: '明日も 来ましょうか。― ええ、10時に 来て ください。/ かさを 貸しましょうか。― ええ、お願いします。', nepali: '明日も 来ましょうか。― ええ、10時に 来て ください。/ かさを 貸しましょうか。― ええ、お願いします。' }
        ]
      },
      {
        title: '6. ～が (light connective)',
        pattern: '6. ～が (light connective)',
        explanationEnglish: 'The conjunctive particle が, learned in Lesson 8, is also used—losing its original contrastive meaning—to lightly connect two sentences as an introductory remark.',
        explanationNepali: 'The conjunctive particle が, learned in Lesson 8, is also used—losing its original contrastive meaning—to lightly connect two sentences as an introductory remark. (नेपाली व्याख्या)',
        examples: [
          { target: 'すみませんが、お名前は。', reading: 'すみませんが、お名前は。', english: 'すみませんが、お名前は。', nepali: 'すみませんが、お名前は。' },
          { target: 'すみませんが、塩を 取って ください。', reading: 'すみませんが、塩を 取って ください。', english: 'すみませんが、塩を 取って ください。', nepali: 'すみませんが、塩を 取って ください。' }
        ]
      },
      {
        title: '7. Nが (subject of natural phenomena)',
        pattern: '7. Nが (subject of natural phenomena)',
        explanationEnglish: 'When describing a natural phenomenon, the subject is marked with が.',
        explanationNepali: 'When describing a natural phenomenon, the subject is marked with が. (नेपाली व्याख्या)',
        examples: [
          { target: '雨が 降って います。', reading: '雨が 降って います。', english: 'It is raining.', nepali: 'अहिले पानी परिरहेको छ।' }
        ]
      },
    ]
  },
  // ────────────────────────────────────────────────────────────
  // LESSON 15
  // ────────────────────────────────────────────────────────────
  {
    language: 'JAPANESE', level: 'N5', lesson: 15,
    lessonTitle: 'Permission, Prohibition & States (許可・禁止・状態)',
    grammarPoints: [
      {
        title: '1. Vて-form も いいです',
        pattern: '1. Vて-form も いいです',
        explanationEnglish: 'Grants permission (\'you may do...\'). Question form used to ask permission; euphemistic phrasing (すみません、ちょっと…) used to deny it.',
        explanationNepali: 'Vて もいいです ले कुनै काम गर्ने अनुमति (\'गरे हुन्छ\') व्यक्त गर्दछ।',
        examples: [
          { target: '写真を 撮っても いいです。', reading: '写真を 撮っても いいです。', english: 'You may take pictures.', nepali: 'You may take pictures. (नेपाली)' },
          { target: 'たばこを 吸っても いいですか。― ええ、いいですよ。／すみません、ちょっと…。', reading: 'たばこを 吸っても いいですか。― ええ、いいですよ。／すみません、ちょっと…。', english: 'たばこを 吸っても いいですか。― ええ、いいですよ。／すみません、ちょっと…。', nepali: 'たばこを 吸っても いいですか。― ええ、いいですよ。／すみません、ちょっと…。' }
        ]
      },
      {
        title: '2. Vて-form は いけません',
        pattern: '2. Vて-form は いけません',
        explanationEnglish: 'Expresses prohibition (\'you must not do...\'). Cannot be used by an inferior toward a superior.',
        explanationNepali: 'Vて は いけません ले कडा मनाही (\'गर्नु हुँदैन\') व्यक्त गर्दछ।',
        examples: [
          { target: 'ここで たばこを 吸っては いけません。ここは きんえんですから。', reading: 'ここで たばこを 吸っては いけません。ここは きんえんですから。', english: 'You must not smoke here — this is a no-smoking area.', nepali: 'यहाँ धुम्रपान गर्नु हुँदैन।' }
        ]
      },
      {
        title: '3. Vて-form います (resulting state)',
        pattern: '3. Vて-form います (resulting state)',
        explanationEnglish: 'In addition to the progressive meaning (Lesson 14), て-form います also describes a continuing state resulting from a past action.',
        explanationNepali: 'Vて います ले हाल भइरहेको कार्य (निरन्तर वर्तमान) वा कार्यको नतिजाको स्थिति जनाउँछ।',
        examples: [
          { target: '結婚して います。', reading: '結婚して います。', english: 'I\'m married.', nepali: 'म विवाहित हुँ।' },
          { target: '田中さんを 知って います。', reading: '田中さんを 知って います。', english: 'I know Mr. Tanaka.', nepali: 'म तानाका-जीलाई चिन्छु।' },
          { target: '大阪に 住んで います。', reading: '大阪に 住んで います。', english: '大阪に 住んで います。', nepali: '大阪に 住んで います。' },
          { target: 'カメラを 持って います。', reading: 'カメラを 持って います。', english: '持って います also means \'possess\'.', nepali: '持って います also means \'possess\'. (नेपाली)' }
        ]
      },
      {
        title: '4. Vて-form います (habitual action)',
        pattern: '4. Vて-form います (habitual action)',
        explanationEnglish: 'Also describes a habitual/repeated action — expressing one\'s occupation.',
        explanationNepali: 'Also describes a habitual/repeated action — expressing one\'s occupation. (नेपाली व्याख्या)',
        examples: [
          { target: 'IMCは コンピューターの ソフトを 作って います。', reading: 'IMCは コンピューターの ソフトを 作って います。', english: 'IMC makes computer software.', nepali: 'IMC makes computer software. (नेपाली)' },
          { target: 'ミラーさんは IMCで 働いて います。', reading: 'ミラーさんは IMCで 働いて います。', english: 'ミラーさんは IMCで 働いて います。', nepali: 'ミラーさんは IMCで 働いて います。' }
        ]
      },
      {
        title: '5. Negative of 知って います',
        pattern: '5. Negative of 知って います',
        explanationEnglish: 'The negative of 知って います is 知りません (not 知って いません).',
        explanationNepali: 'The negative of 知って います is 知りません (not 知って いません). (नेपाली व्याख्या)',
        examples: [
          { target: '市役所の 電話番号を 知って いますか。― はい、知って います。／いいえ、知りません。', reading: '市役所の 電話番号を 知って いますか。― はい、知って います。／いいえ、知りません。', english: '市役所の 電話番号を 知って いますか。― はい、知って います。／いいえ、知りません。', nepali: '市役所の 電話番号を 知って いますか。― はい、知って います。／いいえ、知りません。' }
        ]
      },
    ]
  },
  // ────────────────────────────────────────────────────────────
  // LESSON 16
  // ────────────────────────────────────────────────────────────
  {
    language: 'JAPANESE', level: 'N5', lesson: 16,
    lessonTitle: 'Connecting Sentences & Actions in Sequence (文の接続)',
    grammarPoints: [
      {
        title: '1. Vて-form, Vて-form, ~',
        pattern: '1. Vて-form, Vて-form, ~',
        explanationEnglish: 'Used to connect verb sentences where two or more actions occur in succession, in the order mentioned. Sentence tense is determined by the last verb.',
        explanationNepali: 'Used to connect verb sentences where two or more actions occur in succession, in the order mentioned. Sentence tense is determined by the last verb. (नेपाली व्याख्या)',
        examples: [
          { target: '朝 ジョギングを して、シャワーを あびて、会社へ 行きます。/ 神戸へ 行って、映画を 見て、お茶を 飲みました。', reading: '朝 ジョギングを して、シャワーを あびて、会社へ 行きます。/ 神戸へ 行って、映画を 見て、お茶を 飲みました。', english: '朝 ジョギングを して、シャワーを あびて、会社へ 行きます。/ 神戸へ 行って、映画を 見て、お茶を 飲みました。', nepali: '朝 ジョギングを して、シャワーを あびて、会社へ 行きます。/ 神戸へ 行って、映画を 見て、お茶を 飲みました。' }
        ]
      },
      {
        title: '2. い-adjective(～い→～くて), ~',
        pattern: '2. い-adjective(～い→～くて), ~',
        explanationEnglish: 'When joining an い-adjective sentence to another, drop い and attach くて (いい becomes よくて, exceptionally).',
        explanationNepali: 'い-adj(く) / な-adj(に) / N(に) なります ले स्थितिमा परिवर्तन (\'हुनु / बन्नु\') जनाउँछ।',
        examples: [
          { target: 'ミラーさんは 若くて 元気です。', reading: 'ミラーさんは 若くて 元気です。', english: 'Mr. Miller is young and lively.', nepali: 'मिलर-जी जवान र ऊर्जावान हुनुहुन्छ।' },
          { target: 'きのうは いい天気で、暑かったです。', reading: 'きのうは いい天気で、暑かったです。', english: 'きのうは いい天気で、暑かったです。', nepali: 'きのうは いい天気で、暑かったです。' }
        ]
      },
      {
        title: '3. N／な-adjective, ~ (です→で)',
        pattern: '3. N／な-adjective, ~ (です→で)',
        explanationEnglish: 'When joining noun sentences or な-adjective sentences, です changes to で. Can connect sentences about different topics; not used to connect sentences of contradictory meaning (use が instead).',
        explanationNepali: 'When joining noun sentences or な-adjective sentences, です changes to で. Can connect sentences about different topics; not used to connect sentences of contradictory meaning (use が instead). (नेपाली व्याख्या)',
        examples: [
          { target: 'カリナさんは インドネシア人で、京都大学の 学生です。/ この 部屋は 小さいですが、きれいです。', reading: 'カリナさんは インドネシア人で、京都大学の 学生です。/ この 部屋は 小さいですが、きれいです。', english: 'カリナさんは インドネシア人で、京都大学の 学生です。/ この 部屋は 小さいですが、きれいです。', nepali: 'カリナさんは インドネシア人で、京都大学の 学生です。/ この 部屋は 小さいですが、きれいです。' }
        ]
      },
      {
        title: '4. V1て-form から、V2',
        pattern: '4. V1て-form から、V2',
        explanationEnglish: 'Indicates that upon completion of V1, the action of V2 is conducted. Tense determined by the last verb. The subject of a subordinate clause is marked with が.',
        explanationNepali: 'Indicates that upon completion of V1, the action of V2 is conducted. Tense determined by the last verb. The subject of a subordinate clause is marked with が. (नेपाली व्याख्या)',
        examples: [
          { target: '国へ 帰ってから、父の 会社で 働きます。/ コンサートが 終わってから、レストランで 食事しました。', reading: '国へ 帰ってから、父の 会社で 働きます。/ コンサートが 終わってから、レストランで 食事しました。', english: '国へ 帰ってから、父の 会社で 働きます。/ コンサートが 終わってから、レストランで 食事しました。', nepali: '国へ 帰ってから、父の 会社で 働きます。/ コンサートが 終わってから、レストランで 食事しました。' }
        ]
      },
      {
        title: '5. N1は N2が [な-adjective]',
        pattern: '5. N1は N2が [な-adjective]',
        explanationEnglish: 'Describes an attribute of a thing or person. N1 is the topic; N2 is the subject of the adjective\'s description.',
        explanationNepali: 'Describes an attribute of a thing or person. N1 is the topic; N2 is the subject of the adjective\'s description. (नेपाली व्याख्या)',
        examples: [
          { target: '大阪は 食べ物が おいしいです。/ マリアさんは 髪が 長いです。', reading: '大阪は 食べ物が おいしいです。/ マリアさんは 髪が 長いです。', english: '大阪は 食べ物が おいしいです。/ マリアさんは 髪が 長いです。', nepali: '大阪は 食べ物が おいしいです。/ マリアさんは 髪が 長いです。' }
        ]
      },
      {
        title: '6. どうやって',
        pattern: '6. どうやって',
        explanationEnglish: 'Used to ask the way/method of doing something; answered using the て-form connective pattern.',
        explanationNepali: 'Used to ask the way/method of doing something; answered using the て-form connective pattern. (नेपाली व्याख्या)',
        examples: [
          { target: '大学まで どうやって 行きますか。― 京都駅から 16番の バスに 乗って、大学前で 降ります。', reading: '大学まで どうやって 行きますか。― 京都駅から 16番の バスに 乗って、大学前で 降ります。', english: '大学まで どうやって 行きますか。― 京都駅から 16番の バスに 乗って、大学前で 降ります。', nepali: '大学まで どうやって 行きますか。― 京都駅から 16番の バスに 乗って、大学前で 降ります。' }
        ]
      },
      {
        title: '7. どの',
        pattern: '7. どの',
        explanationEnglish: 'どの asks the listener to identify one among more than two concrete items.',
        explanationNepali: 'どの asks the listener to identify one among more than two concrete items. (नेपाली व्याख्या)',
        examples: [
          { target: 'サントスさんは どの 人ですか。― あの 髪の 黒い、背の 高い 人です。', reading: 'サントスさんは どの 人ですか。― あの 髪の 黒い、背の 高い 人です。', english: 'サントスさんは どの 人ですか。― あの 髪の 黒い、背の 高い 人です。', nepali: 'サントスさんは どの 人ですか。― あの 髪の 黒い、背の 高い 人です。' }
        ]
      },
    ]
  },
  // ────────────────────────────────────────────────────────────
  // LESSON 17
  // ────────────────────────────────────────────────────────────
  {
    language: 'JAPANESE', level: 'N5', lesson: 17,
    lessonTitle: 'Nai-Form, Instructions & Must-Do Rules (ない形と義務)',
    grammarPoints: [
      {
        title: '1. Verb い-form',
        pattern: '1. Verb い-form',
        explanationEnglish: 'The verb form used with た/たり is called the い-form (e.g., かいて\'s かい is the い-form of かきます). Group I: replace the い-line ます-stem sound with the appropriate sound (いきます is an exception: いって→いい-form). Group II: same as the ます-form. Group III: same as the ます-form (します→して, きます→きて — pattern parallels て-form).',
        explanationNepali: 'The verb form used with た/たり is called the い-form (e.g., かいて\'s かい is the い-form of かきます). Group I: replace the い-line ます-stem sound with the appropriate sound (いきます is an exception: いって→いい-form). Group II: same as the ます-form. Group III: same as the ます-form (します→して, きます→きて — pattern parallels て-form). (नेपाली व्याख्या)',
        examples: [

        ]
      },
      {
        title: '2. Vない-form ないで ください',
        pattern: '2. Vない-form ないで ください',
        explanationEnglish: 'Used to ask or instruct someone NOT to do something.',
        explanationNepali: 'Vないで ください ले कृपया कुनै काम नगर्न अनुरोध (\'नगर्नुहोस्\') गर्दा प्रयोग गरिन्छ।',
        examples: [
          { target: '心配しないで ください。', reading: '心配しないで ください。', english: 'Please don\'t worry.', nepali: 'Please don\'t worry. (नेपाली)' },
          { target: 'ここで 写真を 撮らないで ください。', reading: 'ここで 写真を 撮らないで ください。', english: 'ここで 写真を 撮らないで ください。', nepali: 'ここで 写真を 撮らないで ください。' }
        ]
      },
      {
        title: '3. Vない-form なければ なりません',
        pattern: '3. Vない-form なければ なりません',
        explanationEnglish: 'Means something must be done regardless of the actor\'s will. Not a negative meaning despite the ない form.',
        explanationNepali: 'Vなければ なりません ले अनिवार्य रूपमा गर्नुपर्ने दायित्व (\'गर्नै पर्छ\') व्यक्त गर्दछ।',
        examples: [
          { target: '薬を 飲まなければ なりません。', reading: '薬を 飲まなければ なりません。', english: 'I must take medicine.', nepali: 'मलाई औषधि खानै पर्छ।' }
        ]
      },
      {
        title: '4. Vない-form なくても いいです',
        pattern: '4. Vない-form なくても いいです',
        explanationEnglish: 'Indicates that the action described does not have to be done.',
        explanationNepali: 'Vて もいいです ले कुनै काम गर्ने अनुमति (\'गरे हुन्छ\') व्यक्त गर्दछ।',
        examples: [
          { target: '明日 来なくても いいです。', reading: '明日 来なくても いいです。', english: 'You don\'t have to come tomorrow.', nepali: 'You don\'t have to come tomorrow. (नेपाली)' }
        ]
      },
      {
        title: '5. N(object)は',
        pattern: '5. N(object)は',
        explanationEnglish: 'The direct-object particle を can be replaced by は to make the object a topic.',
        explanationNepali: 'The direct-object particle を can be replaced by は to make the object a topic. (नेपाली व्याख्या)',
        examples: [
          { target: '荷物は ここに 置かないで ください。', reading: '荷物は ここに 置かないで ください。', english: 'As for the parcel, please don\'t put it here.', nepali: 'As for the parcel, please don\'t put it here. (नेपाली)' },
          { target: '昼ごはんは 会社の食堂で 食べます。', reading: '昼ごはんは 会社の食堂で 食べます。', english: '昼ごはんは 会社の食堂で 食べます。', nepali: '昼ごはんは 会社の食堂で 食べます。' }
        ]
      },
      {
        title: '6. N(time)までに',
        pattern: '6. N(time)までに',
        explanationEnglish: 'までに marks the time limit by which an action must be completed (contrast with まで, meaning \'until\', L.4).',
        explanationNepali: 'までに marks the time limit by which an action must be completed (contrast with まで, meaning \'until\', L.4). (नेपाली व्याख्या)',
        examples: [
          { target: '会議は 5時までに 終わります。/ 土曜日までに 本を 返さなければ なりません。', reading: '会議は 5時までに 終わります。/ 土曜日までに 本を 返さなければ なりません。', english: '会議は 5時までに 終わります。/ 土曜日までに 本を 返さなければ なりません。', nepali: '会議は 5時までに 終わります。/ 土曜日までに 本を 返さなければ なりません。' }
        ]
      },
    ]
  },
  // ────────────────────────────────────────────────────────────
  // LESSON 18
  // ────────────────────────────────────────────────────────────
  {
    language: 'JAPANESE', level: 'N5', lesson: 18,
    lessonTitle: 'Dictionary Form & Expressing Ability/Hobbies (辞書形と可能)',
    grammarPoints: [
      {
        title: '1. Verb dictionary form',
        pattern: '1. Verb dictionary form',
        explanationEnglish: 'The basic (plain, non-past affirmative) form. Group I: replace the い-line ます-stem sound with a う-line sound. Group II: attach る to the ます-stem. Group III: します→する, きます→くる.',
        explanationNepali: 'The basic (plain, non-past affirmative) form. Group I: replace the い-line ます-stem sound with a う-line sound. Group II: attach る to the ます-stem. Group III: します→する, きます→くる. (नेपाली व्याख्या)',
        examples: [

        ]
      },
      {
        title: '2. N／V dictionary form こと が できます — can...',
        pattern: '2. N／V dictionary form こと が できます — can...',
        explanationEnglish: 'できます expresses ability/possibility. A noun (denoting an action) or a nominalized verb phrase (dictionary form + こと) marks what one can do.',
        explanationNepali: 'N / V(dictionary form) ことが できます ले क्षमता वा सम्भावना (\'गर्न सक्नु\') व्यक्त गर्दछ।',
        examples: [
          { target: 'ミラーさんは 日本語を 話す ことが できます。', reading: 'ミラーさんは 日本語を 話す ことが できます。', english: 'Mr. Miller can speak Japanese.', nepali: 'मिलर-जी जापानी बोल्न सक्नुहुन्छ।' },
          { target: 'ミラーさんは 漢字を 読む ことが できます。', reading: 'ミラーさんは 漢字を 読む ことが できます。', english: 'ミラーさんは 漢字を 読む ことが できます。', nepali: 'ミラーさんは 漢字を 読む ことが できます。' },
          { target: 'クレジットカードで 払う ことが できます。', reading: 'クレジットカードで 払う ことが できます。', english: 'クレジットカードで 払う ことが できます。', nepali: 'クレジットカードで 払う ことが できます。' }
        ]
      },
      {
        title: '3. わたしの しゅみは N／V dictionary form こと です — My hobby is...',
        pattern: '3. わたしの しゅみは N／V dictionary form こと です — My hobby is...',
        explanationEnglish: 'V dictionary form こと can express the content of a hobby more concretely than a noun alone.',
        explanationNepali: 'わたしの しゅみは V(dictionary form) ことです ले आफ्नो रुचि/हबी स्पष्ट रूपमा व्यक्त गर्दछ।',
        examples: [
          { target: 'わたしの しゅみは 音楽です。／わたしの しゅみは 音楽を 聞く ことです。', reading: 'わたしの しゅみは 音楽です。／わたしの しゅみは 音楽を 聞く ことです。', english: 'わたしの しゅみは 音楽です。／わたしの しゅみは 音楽を 聞く ことです。', nepali: 'わたしの しゅみは 音楽です。／わたしの しゅみは 音楽を 聞く ことです。' }
        ]
      },
      {
        title: '4. V dictionary form／N の まえに、~ — before...',
        pattern: '4. V dictionary form／N の まえに、~ — before...',
        explanationEnglish: 'Indicates that the action of the main clause occurs before that of the subordinate clause. The subordinate verb is always in the dictionary form, regardless of the main clause\'s tense. With a noun, の is inserted; with a quantifier (period of time), no particle is needed.',
        explanationNepali: 'V(dictionary form) / Nの まえに ले कुनै कार्य गर्नुअघि (\'गर्नुअघि\') अर्को कार्य हुनु जनाउँछ।',
        examples: [
          { target: '日本へ 来る まえに、日本語を 勉強しました。', reading: '日本へ 来る まえに、日本語を 勉強しました。', english: 'I studied Japanese before I came to Japan.', nepali: 'I studied Japanese before I came to Japan. (नेपाली)' },
          { target: '食事の まえに、手を 洗います。', reading: '食事の まえに、手を 洗います。', english: '食事の まえに、手を 洗います。', nepali: '食事の まえに、手を 洗います。' },
          { target: '田中さんは 1時間まえに 帰りました。', reading: '田中さんは 1時間まえに 帰りました。', english: '田中さんは 1時間まえに 帰りました。', nepali: '田中さんは 1時間まえに 帰りました。' }
        ]
      },
      {
        title: '5. あまり～ (negative)',
        pattern: '5. あまり～ (negative)',
        explanationEnglish: 'When paired with a negative, あまり means \'not easily\' or \'not as expected\'.',
        explanationNepali: 'When paired with a negative, あまり means \'not easily\' or \'not as expected\'. (नेपाली व्याख्या)',
        examples: [
          { target: '日本では あまり 馬を 見る ことが できません。', reading: '日本では あまり 馬を 見る ことが できません。', english: 'In Japan we can rarely see horses.', nepali: 'In Japan we can rarely see horses. (नेपाली)' }
        ]
      },
      {
        title: '6. ぜひ',
        pattern: '6. ぜひ',
        explanationEnglish: 'Used with expressions of hope/request (~たいです, ~ませんか, ~てください) to emphasize the wish.',
        explanationNepali: 'Used with expressions of hope/request (~たいです, ~ませんか, ~てください) to emphasize the wish. (नेपाली व्याख्या)',
        examples: [
          { target: 'ぜひ 北海道へ 行きたいです。', reading: 'ぜひ 北海道へ 行きたいです。', english: 'I really want to go to Hokkaido.', nepali: 'I really want to go to Hokkaido. (नेपाली)' },
          { target: 'ぜひ 家へ 来て ください。', reading: 'ぜひ 家へ 来て ください。', english: 'ぜひ 家へ 来て ください。', nepali: 'ぜひ 家へ 来て ください。' }
        ]
      },
    ]
  },
  // ────────────────────────────────────────────────────────────
  // LESSON 19
  // ────────────────────────────────────────────────────────────
  {
    language: 'JAPANESE', level: 'N5', lesson: 19,
    lessonTitle: 'Ta-Form & Past Experiences (た形と経験)',
    grammarPoints: [
      {
        title: '1. Verb た-form',
        pattern: '1. Verb た-form',
        explanationEnglish: 'Formed by changing て/で of the て-form to た/だ respectively (e.g., 買って→買った; 飲んで→飲んだ). Same grouping pattern as the て-form.',
        explanationNepali: 'Formed by changing て/で of the て-form to た/だ respectively (e.g., 買って→買った; 飲んで→飲んだ). Same grouping pattern as the て-form. (नेपाली व्याख्या)',
        examples: [

        ]
      },
      {
        title: '2. Vた-form ことが あります — have the experience of...',
        pattern: '2. Vた-form ことが あります — have the experience of...',
        explanationEnglish: 'Describes a past experience (parallels N/普通形+んです patterns from L.9). The content of the experience is the nominalized phrase Vた-form こと.',
        explanationNepali: 'Vた ことがあります ले विगतको व्यक्तिगत अनुभव (\'पहिले गरेको छु\') व्यक्त गर्दछ।',
        examples: [
          { target: '馬に 乗った ことが あります。(I have ridden a horse.) — distinct from a sentence simply stating that something happened at a fixed past time.', reading: '馬に 乗った ことが あります。(I have ridden a horse.) — distinct from a sentence simply stating that something happened at a fixed past time.', english: '馬に 乗った ことが あります。(I have ridden a horse.) — distinct from a sentence simply stating that something happened at a fixed past time.', nepali: '馬に 乗った ことが あります。(I have ridden a horse.) — distinct from a sentence simply stating that something happened at a fixed past time.' }
        ]
      },
      {
        title: '3. Vた-form り、Vた-form り します — do such things as V, V, and so on',
        pattern: '3. Vた-form り、Vた-form り します — do such things as V, V, and so on',
        explanationEnglish: 'Refers to some (not all) actions among several, similar to ～や～(など) for nouns (L.10). Sentence-final tense shows overall tense.',
        explanationNepali: 'Refers to some (not all) actions among several, similar to ～や～(など) for nouns (L.10). Sentence-final tense shows overall tense. (नेपाली व्याख्या)',
        examples: [
          { target: '日曜日は テニスを したり、映画を 見たり します。(On Sundays I do things like play tennis, see a movie, etc.) — Note: distinct from a plain て-form sequence, which implies a fixed chronological order; たり implies example activities, not necessarily sequential or exhaustive.', reading: '日曜日は テニスを したり、映画を 見たり します。(On Sundays I do things like play tennis, see a movie, etc.) — Note: distinct from a plain て-form sequence, which implies a fixed chronological order; たり implies example activities, not necessarily sequential or exhaustive.', english: '日曜日は テニスを したり、映画を 見たり します。(On Sundays I do things like play tennis, see a movie, etc.) — Note: distinct from a plain て-form sequence, which implies a fixed chronological order; たり implies example activities, not necessarily sequential or exhaustive.', nepali: '日曜日は テニスを したり、映画を 見たり します。(On Sundays I do things like play tennis, see a movie, etc.) — Note: distinct from a plain て-form sequence, which implies a fixed chronological order; たり implies example activities, not necessarily sequential or exhaustive.' }
        ]
      },
      {
        title: '4. い-adjective(～い→～く)/な-adjective(に) なります — become...',
        pattern: '4. い-adjective(～い→～く)/な-adjective(に) なります — become...',
        explanationEnglish: 'なります indicates a change of state or condition. い-adjective: drop い, add く; な-adjective/noun: add に before なります.',
        explanationNepali: 'V(dictionary form) / Nの まえに ले कुनै कार्य गर्नुअघि (\'गर्नुअघि\') अर्को कार्य हुनु जनाउँछ।',
        examples: [
          { target: '寒く なります。', reading: '寒く なります。', english: 'It becomes cold.', nepali: 'जाडो हुँदै जान्छ।' },
          { target: '元気に なります。', reading: '元気に なります。', english: 'become well', nepali: 'become well (नेपाली)' },
          { target: '25歳に なります。', reading: '25歳に なります。', english: 'turn 25', nepali: 'turn 25 (नेपाली)' }
        ]
      },
      {
        title: '5. そうですね',
        pattern: '5. そうですね',
        explanationEnglish: 'Used to agree/sympathize with the conversation partner. Differs from そうですか (an exclamation upon learning new information); そうですね expresses agreement with something already known/shared.',
        explanationNepali: 'Used to agree/sympathize with the conversation partner. Differs from そうですか (an exclamation upon learning new information); そうですね expresses agreement with something already known/shared. (नेपाली व्याख्या)',
        examples: [
          { target: '寒く なりましたね。― そうですね。', reading: '寒く なりましたね。― そうですね。', english: 'It\'s gotten cold, hasn\'t it? — Yes, it has.', nepali: 'It\'s gotten cold, hasn\'t it? — Yes, it has. (नेपाली)' }
        ]
      },
    ]
  },
  // ────────────────────────────────────────────────────────────
  // LESSON 20
  // ────────────────────────────────────────────────────────────
  {
    language: 'JAPANESE', level: 'N5', lesson: 20,
    lessonTitle: 'Casual & Plain Speech Style (普通体と会話)',
    grammarPoints: [
      {
        title: '1. Polite style and plain style',
        pattern: '1. Polite style and plain style',
        explanationEnglish: 'Japanese has two speech styles: polite style (です/ます forms) and plain style (だ / plain verb forms). Predicates accompanied by です or ます are the polite form; predicates in plain-style sentences are the plain form.',
        explanationNepali: 'जापानी भाषामा दुई शैली हुन्छन्: नम्र शैली (です/ます) र साधारण शैली (普通体 - साथी र परिवारका बीच)।',
        examples: [
          { target: '明日 東京へ 行きます。／明日 東京へ 行く。 (polite', reading: '明日 東京へ 行きます。／明日 東京へ 行く。 (polite', english: '明日 東京へ 行きます。／明日 東京へ 行く。 (polite', nepali: '明日 東京へ 行きます。／明日 東京へ 行く。 (polite' },
          { target: 'plain) — 忙しいです。／忙しい。 — すもうが 好きです。／すもうが 好きだ。', reading: 'plain) — 忙しいです。／忙しい。 — すもうが 好きです。／すもうが 好きだ。', english: 'plain) — 忙しいです。／忙しい。 — すもうが 好きです。／すもうが 好きだ。', nepali: 'plain) — 忙しいです。／忙しい。 — すもうが 好きです。／すもうが 好きだ。' }
        ]
      },
      {
        title: '2. Proper use of polite and plain style',
        pattern: '2. Proper use of polite and plain style',
        explanationEnglish: 'Polite style can be used at any time, in any place, to anybody — it is the standard for conversation between adults who aren\'t close, with strangers, superiors, or people of similar age one isn\'t close to. Plain style is used with close friends, colleagues, and family. Using plain style inappropriately can sound rude, so when unsure, polite style is safer. Plain style is also standard in written work (newspapers, books, theses, diaries); most letters use polite style.',
        explanationNepali: 'जापानी भाषामा दुई शैली हुन्छन्: नम्र शैली (です/ます) र साधारण शैली (普通体 - साथी र परिवारका बीच)।',
        examples: [

        ]
      },
      {
        title: '3. Conversation in the plain style',
        pattern: '3. Conversation in the plain style',
        explanationEnglish: '(1) Questions omit か and end with a rising intonation. (2) In noun/な-adjective questions, plain-form だ is omitted (affirmative answers ending flatly in だ can sound rough; women rarely use だ). (3) Certain particles (を, へ, etc.) are often dropped when meaning is clear from context, though が, は, で, と, etc. are usually kept. (4) In plain style, the い of Vて-form いい is often dropped (e.g., 持って(い)る).',
        explanationNepali: 'जापानी भाषामा दुई शैली हुन्छन्: नम्र शैली (です/ます) र साधारण शैली (普通体 - साथी र परिवारका बीच)।',
        examples: [
          { target: 'コーヒー 飲む？― うん、飲む。', reading: 'コーヒー 飲む？― うん、飲む。', english: 'コーヒー 飲む？― うん、飲む。', nepali: 'コーヒー 飲む？― うん、飲む。' },
          { target: '今晩 暇？― うん、暇。(men) ／ ええ、暇。(women) ― ううん、暇じゃない。', reading: '今晩 暇？― うん、暇。(men) ／ ええ、暇。(women) ― ううん、暇じゃない。', english: '今晩 暇？― うん、暇。(men) ／ ええ、暇。(women) ― ううん、暇じゃない。', nepali: '今晩 暇？― うん、暇。(men) ／ ええ、暇。(women) ― ううん、暇じゃない。' },
          { target: 'ご飯[を] 食べる？', reading: 'ご飯[を] 食べる？', english: 'ご飯[を] 食べる？', nepali: 'ご飯[を] 食べる？' },
          { target: '辞書 持ってる？― うん、持ってる。／ううん、持ってない。', reading: '辞書 持ってる？― うん、持ってる。／ううん、持ってない。', english: '辞書 持ってる？― うん、持ってる。／ううん、持ってない。', nepali: '辞書 持ってる？― うん、持ってる。／ううん、持ってない。' }
        ]
      },
    ]
  },

  // LESSON 21
  // ────────────────────────────────────────────────────────────
  {
    language: 'JAPANESE', level: 'N5', lesson: 21,
    lessonTitle: 'Opinions & Quotations (意見と引用)',
    grammarPoints: [
      {
        title: '1. Expressing Opinions [Plain Form] と 思います',
        pattern: '[Plain form sentence] と 思います',
        explanationEnglish: 'Expresses personal opinion or conjecture ("I think that...").',
        explanationNepali: '"मलाई लाग्छ कि..." भनी व्यक्तिगत विचार व्यक्त गर्दा प्रयोग गरिन्छ।',
        examples: [
          { target: '明日はいい天気になると想います。', reading: 'あしたはいいてんきになるとおもいます。', english: 'I think it will be good weather tomorrow.', nepali: 'मलाई लाग्छ भोलि मौसम राम्रो हुनेछ।' }
        ]
      },
      {
        title: '2. Quoting Speech [Plain Form / Direct Quote] と 言いました',
        pattern: '[Quote] と 言いました',
        explanationEnglish: 'Reports what someone said ("said that...").',
        explanationNepali: 'कसैले भनेको कुरा उद्धृत गर्दा ("भन्नुभयो") प्रयोग गरिन्छ।',
        examples: [
          { target: '田中さんは「来週出張する」と言いました。', reading: 'たなかさんは「らいしゅうしゅっちょうする」といいました。', english: 'Mr. Tanaka said he will go on a business trip next week.', nepali: 'तानाका-जीले अर्को हप्ता व्यापारिक भ्रमणमा जान्छु भन्नुभयो।' }
        ]
      }
    ]
  },

  // ────────────────────────────────────────────────────────────
  // LESSON 22
  // ────────────────────────────────────────────────────────────
  {
    language: 'JAPANESE', level: 'N5', lesson: 22,
    lessonTitle: 'Noun Modification with Relative Clauses (連体修飾)',
    grammarPoints: [
      {
        title: '1. Modifying Nouns with Verb Clauses',
        pattern: '[Clause in Plain Form] + Noun',
        explanationEnglish: 'Japanese places relative clauses BEFORE the noun they describe (e.g. "the cake that I made"). Subject in the clause takes が.',
        explanationNepali: 'जापानी भाषामा विशेषण वाक्य नामको अगाडि आउँछ (जस्तै: "मैले बनाएको केक")। वाक्यको कर्तासँग が लाग्छ।',
        examples: [
          { target: 'これは私が作ったケーキです。', reading: 'これはわたしがつくったケーキです。', english: 'This is the cake that I made.', nepali: 'यो मैले बनाएको केक हो।' },
          { target: 'あそこで眼鏡をかけている人は田中さんです。', reading: 'あそこでめがねをかけているひとはたなかさんです。', english: 'The person wearing glasses over there is Mr. Tanaka.', nepali: 'त्यहाँ चश्मा लगाइरहेको मान्छे तानाका-जी हुनुहुन्छ।' }
        ]
      }
    ]
  },

  // ────────────────────────────────────────────────────────────
  // LESSON 23
  // ────────────────────────────────────────────────────────────
  {
    language: 'JAPANESE', level: 'N5', lesson: 23,
    lessonTitle: 'Time Clauses & Natural Conditionals (とき・と)',
    grammarPoints: [
      {
        title: '1. Time Clause とき (When)',
        pattern: 'V[dict/ta/nai] / い-adj / な-adj な / N の + とき',
        explanationEnglish: 'Expresses "when [situation/action]". V[dict]とき = before completing action, V[ta]とき = after completing action.',
        explanationNepali: '"कुनै काम वा अवस्था हुँदा (बेलामा)"।',
        examples: [
          { target: '図書館で本を借りるとき、カードがいります。', reading: 'としょかんでほんをかりるとき、カードがいります。', english: 'When borrowing a book at the library, you need a card.', nepali: 'पुस्तकालयमा किताब सापट लिँदा कार्ड चाहिन्छ।' }
        ]
      },
      {
        title: '2. Natural Conditional と (If/When)',
        pattern: 'V[dictionary-form] + と、[Result]',
        explanationEnglish: 'Expresses an inevitable natural result or mechanical reaction ("whenever X happens, Y automatically occurs").',
        explanationNepali: 'प्राकृतिक वा स्वचालित परिणाम ("यसो गर्दा स्वतः त्यसो हुन्छ")।',
        examples: [
          { target: 'このボタンを押すと、お湯が出ます。', reading: 'このボタンをおすと、おゆがでます。', english: 'When you press this button, hot water comes out.', nepali: 'यो बटन थिच्दा तातो पानी निस्कन्छ।' }
        ]
      }
    ]
  },

  // ────────────────────────────────────────────────────────────
  // LESSON 24
  // ────────────────────────────────────────────────────────────
  {
    language: 'JAPANESE', level: 'N5', lesson: 24,
    lessonTitle: 'Favors of Action (〜て くれます・もらいます・あげます)',
    grammarPoints: [
      {
        title: '1. Someone gives to me くれます',
        pattern: '[Giver] が わたしに [Object] を くれます',
        explanationEnglish: 'くれます (kuremasu) means someone gives something to me or my family.',
        explanationNepali: 'कसैले मलाई वा मेरो परिवारलाई दिँदा くれます प्रयोग हुन्छ।',
        examples: [
          { target: '佐藤さんが私に本をくれました。', reading: 'さとうさんがわたしにほんをくれました。', english: 'Ms. Sato gave a book to me.', nepali: 'सातो-जीले मलाई किताब दिनुभयो।' }
        ]
      },
      {
        title: '2. Action Favors Vて くれます / Vて もらいます / Vて あげます',
        pattern: 'Vて くれます (do for me) | Vて もらいます (have done for me) | Vて あげます (do for someone)',
        explanationEnglish: 'Vてくれます: someone does a favor for me. Vてもらいます: I receive the favor of someone doing an action for me.',
        explanationNepali: 'Vてくれます: कसैले मेरो लागि गरिदिने। Vてもらいます: अरूबाट काम गराउने/पाउने।',
        examples: [
          { target: '山田さんが写真を撮ってくれました。', reading: 'やまださんがしゃしんをとってくれました。', english: 'Mr. Yamada kindly took a photo for me.', nepali: 'यामाडा-जीले मेरो लागि फोटो खिचिदिनुभयो।' }
        ]
      }
    ]
  },

  // ────────────────────────────────────────────────────────────
  // LESSON 25
  // ────────────────────────────────────────────────────────────
  {
    language: 'JAPANESE', level: 'N5', lesson: 25,
    lessonTitle: 'Conditionals & Concessions (〜たら・〜ても)',
    grammarPoints: [
      {
        title: '1. Conditional "If / When" 〜たら',
        pattern: 'Vた ら / い-adj(〜かったら) / な-adj・N(〜だったら)',
        explanationEnglish: 'Formed by adding ら to the past ta-form. Expresses conditional "if" or temporal "when/after".',
        explanationNepali: 'भूतकाल (た形) मा ら थपेर "भने / गरेपछि" भन्ने अर्थ दिन्छ।',
        examples: [
          { target: '雨が降ったら、出かけません。', reading: 'あめがふったら、でかけません。', english: 'If it rains, I will not go out.', nepali: 'पानी पर्यो भने म बाहिर जान्दिन।' },
          { target: '駅についたら、電話をしてください。', reading: 'えきについたら、でんわをしてください。', english: 'When you arrive at the station, please call me.', nepali: 'स्टेशनमा पुगेपछि मलाई फोन गर्नुहोस्।' }
        ]
      },
      {
        title: '2. Concession "Even if / Even though" 〜ても',
        pattern: 'Vて も / い-adj(〜くても) / な-adj・N(〜でも)',
        explanationEnglish: 'Formed by adding も to the te-form. Expresses "even if / even though".',
        explanationNepali: 'て形 मा も थपेर "भए पनि / गरे पनि" भन्ने अर्थ दिन्छ।',
        examples: [
          { target: '安くても、買いません。', reading: 'やすくても、かいません。', english: 'Even if it is cheap, I won\'t buy it.', nepali: 'सस्तो भए पनि म किन्दिन।' }
        ]
      }
    ]
  }
];
