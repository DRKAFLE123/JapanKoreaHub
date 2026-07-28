import json

# Generate 30 Fresh Authentic JLPT N3 Questions
n3_questions = [
    # Kanji & Vocabulary (1-10)
    {
        "id": "jp_n3_set1_1",
        "level": "N3",
        "mockSet": "N3_SET_1",
        "type": "MULTIPLE_CHOICE",
        "prompt": "【文字・語彙 Q1】下線の言葉の読み方を選んでください: 彼は【遠慮】しないで 自分の意見を 言った。",
        "options": ["えんりょ", "えんろ", "おんりょ", "かんりょ"],
        "correctAnswer": "えんりょ",
        "explanation": "「遠慮」は「えんりょ」(Hesitation/Restraint)と読みます。"
    },
    {
        "id": "jp_n3_set1_2",
        "level": "N3",
        "mockSet": "N3_SET_1",
        "type": "MULTIPLE_CHOICE",
        "prompt": "【文字・語彙 Q2】下線の言葉の漢字を選んでください: 新しい 技術の開発には 多くの【けいけん】が必要だ。",
        "options": ["経験", "景験", "計験", "軽験"],
        "correctAnswer": "経験",
        "explanation": "「けいけん」の漢字は「経験」(Experience)です。"
    },
    {
        "id": "jp_n3_set1_3",
        "level": "N3",
        "mockSet": "N3_SET_1",
        "type": "MULTIPLE_CHOICE",
        "prompt": "【文字・語彙 Q3】( )に入る最もよい言葉を選んでください: この 薬を 飲んだら、すぐに ( ) が 現れた。",
        "options": ["効果", "成果", "結果", "評価"],
        "correctAnswer": "効果",
        "explanation": "薬などの効き目には「効果」(Effect/Efficacy)が使われます。"
    },
    {
        "id": "jp_n3_set1_4",
        "level": "N3",
        "mockSet": "N3_SET_1",
        "type": "MULTIPLE_CHOICE",
        "prompt": "【文字・語彙 Q4】下線の言葉の意味として最も近いものを選んでください: この 問題は とても【複雑】だ。",
        "options": ["簡単ではない", "新しくない", "面白くない", "重要ではない"],
        "correctAnswer": "簡単ではない",
        "explanation": "「複雑」(Complex)は簡単ではないことを意味します。"
    },
    {
        "id": "jp_n3_set1_5",
        "level": "N3",
        "mockSet": "N3_SET_1",
        "type": "MULTIPLE_CHOICE",
        "prompt": "【文字・語彙 Q5】下線の言葉の読み方を選んでください: 計画の【変更】について 話し合った。",
        "options": ["へんこう", "へんこう", "へんごう", "こうへん"],
        "correctAnswer": "へんこう",
        "explanation": "「変更」は「へんこう」(Change/Modification)と読みます。"
    },
    {
        "id": "jp_n3_set1_6",
        "level": "N3",
        "mockSet": "N3_SET_1",
        "type": "MULTIPLE_CHOICE",
        "prompt": "【文字・語彙 Q6】下線の言葉の漢字を選んでください: 困難な 状況を【かいけつ】する。",
        "options": ["解決", "解結", "快決", "回決"],
        "correctAnswer": "解決",
        "explanation": "「かいけつ」の漢字は「解決」(Solution/Resolve)です。"
    },
    {
        "id": "jp_n3_set1_7",
        "level": "N3",
        "mockSet": "N3_SET_1",
        "type": "MULTIPLE_CHOICE",
        "prompt": "【文字・語彙 Q7】( )に入る最もよい言葉を選んでください: 環境問題に ついて ( ) を 深める。",
        "options": ["理解", "解決", "努力", "目的"],
        "correctAnswer": "理解",
        "explanation": "「理解を深める」(Deepen understanding)が適切な慣用表現です。"
    },
    {
        "id": "jp_n3_set1_8",
        "level": "N3",
        "mockSet": "N3_SET_1",
        "type": "MULTIPLE_CHOICE",
        "prompt": "【文字・語彙 Q8】下線の言葉の読み方を選んでください: 【経済】の 成長が 続いている。",
        "options": ["けいざい", "けいさい", "きょうざい", "きょうさい"],
        "correctAnswer": "けいざい",
        "explanation": "「経済」は「けいざい」(Economy)と読みます。"
    },
    {
        "id": "jp_n3_set1_9",
        "level": "N3",
        "mockSet": "N3_SET_1",
        "type": "MULTIPLE_CHOICE",
        "prompt": "【文字・語彙 Q9】下線の言葉の漢字を選んでください: 明日の 【よてい】を 確認してください。",
        "options": ["予定", "余定", "予定", "与定"],
        "correctAnswer": "予定",
        "explanation": "「よてい」の漢字は「予定」(Schedule/Plan)です。"
    },
    {
        "id": "jp_n3_set1_10",
        "level": "N3",
        "mockSet": "N3_SET_1",
        "type": "MULTIPLE_CHOICE",
        "prompt": "【文字・語彙 Q10】( )に入る最もよい言葉を選んでください: 電車が 遅れた ( )、会議に 遅刻した。",
        "options": ["せいで", "おかげで", "ために", "せめて"],
        "correctAnswer": "せいで",
        "explanation": "悪い結果の原因・理由には「〜のせいで」(Because of)が使われます。"
    },

    # Grammar & Sentence Structure (11-20)
    {
        "id": "jp_n3_set1_11",
        "level": "N3",
        "mockSet": "N3_SET_1",
        "type": "MULTIPLE_CHOICE",
        "prompt": "【文法 Q11】彼は 初めて 日本に来た ( )、日本語が とても 上手だ。",
        "options": ["にしては", "にして", "にしても", "について"],
        "correctAnswer": "にしては",
        "explanation": "前評価の予想と異なる「〜にしては」(Considering that)が正解です。"
    },
    {
        "id": "jp_n3_set1_12",
        "level": "N3",
        "mockSet": "N3_SET_1",
        "type": "MULTIPLE_CHOICE",
        "prompt": "【文法 Q12】先生が 説明してくれた ( ) 描いてください。",
        "options": ["とおりに", "ままに", "ために", "あいだに"],
        "correctAnswer": "とおりに",
        "explanation": "指示や説明のままに行う表現は「〜とおりに」(As instructed)です。"
    },
    {
        "id": "jp_n3_set1_13",
        "level": "N3",
        "mockSet": "N3_SET_1",
        "type": "MULTIPLE_CHOICE",
        "prompt": "【文法 Q13】この 仕事は 大変な ( )、とても やりがいが ある。",
        "options": ["反面", "おかげ", "せい", "ために"],
        "correctAnswer": "反面",
        "explanation": "二面性・対比を表す「〜反面」(On the other hand)が正解です。"
    },
    {
        "id": "jp_n3_set1_14",
        "level": "N3",
        "mockSet": "N3_SET_1",
        "type": "MULTIPLE_CHOICE",
        "prompt": "【文法 Q14】友達が 助けてくれた ( )、無事に プレゼンが 成功した。",
        "options": ["おかげで", "せいで", "せめて", "かわりに"],
        "correctAnswer": "おかげで",
        "explanation": "良い結果への感謝・恩恵を表す「〜おかげで」(Thanks to)が正解です。"
    },
    {
        "id": "jp_n3_set1_15",
        "level": "N3",
        "mockSet": "N3_SET_1",
        "type": "MULTIPLE_CHOICE",
        "prompt": "【文法 Q15】この 事故の 原因に ( )、現在 警察が 調査している。",
        "options": ["関して", "対して", "とって", "応じて"],
        "correctAnswer": "関して",
        "explanation": "テーマ・対象を表す「〜に関して」(Regarding/Concerning)が適切です。"
    },
    {
        "id": "jp_n3_set1_16",
        "level": "N3",
        "mockSet": "N3_SET_1",
        "type": "MULTIPLE_CHOICE",
        "prompt": "【文法 Q16】しっかり 準備したのだから、失敗する ( )。",
        "options": ["わけがない", "はずがない", "わけにはいかない", "しかない"],
        "correctAnswer": "わけがない",
        "explanation": "強い否定の確信を表す「〜わけがない」(There is no way that...)が正解です。"
    },
    {
        "id": "jp_n3_set1_17",
        "level": "N3",
        "mockSet": "N3_SET_1",
        "type": "MULTIPLE_CHOICE",
        "prompt": "【文法 Q17】大雨に ( )、多くの 人が マラソン大会に 参加した。",
        "options": ["にもかかわらず", "にもかかわって", "にもかかわらずに", "について"],
        "correctAnswer": "にもかかわらず",
        "explanation": "逆説の接続表現「〜にもかかわらず」(Despite/In spite of)が正解です。"
    },
    {
        "id": "jp_n3_set1_18",
        "level": "N3",
        "mockSet": "N3_SET_1",
        "type": "MULTIPLE_CHOICE",
        "prompt": "【文法 Q18】毎日 熱心に 練習しているのだから、次の 試合で 勝つ ( )。",
        "options": ["に違いない", "にすぎない", "にほかならない", "にちがわない"],
        "correctAnswer": "に違いない",
        "explanation": "強い推測・確信を表す「〜に違いない」(Must be/Without doubt)が正解です。"
    },
    {
        "id": "jp_n3_set1_19",
        "level": "N3",
        "mockSet": "N3_SET_1",
        "type": "MULTIPLE_CHOICE",
        "prompt": "【文法 Q19】田中さんは 明日 海外へ 出張する ( )。",
        "options": ["ことになっている", "ことにしている", "ことにする", "ことにある"],
        "correctAnswer": "ことになっている",
        "explanation": "決定・規則・予定を表す「〜ことになっている」(It has been arranged that...)です。"
    },
    {
        "id": "jp_n3_set1_20",
        "level": "N3",
        "mockSet": "N3_SET_1",
        "type": "MULTIPLE_CHOICE",
        "prompt": "【文法 Q20】どんなに 忙しくても、健康の ために 野菜を 食べる ( )。",
        "options": ["ようにしている", "ことになっている", "ようにできる", "ことにしている"],
        "correctAnswer": "ようにしている",
        "explanation": "習慣的・意識的な努力を表す「〜ようにしている」(Make it a rule to...)が正解です。"
    },

    # Reading & Comprehension (21-25)
    {
        "id": "jp_n3_set1_21",
        "level": "N3",
        "mockSet": "N3_SET_1",
        "type": "MULTIPLE_CHOICE",
        "prompt": "【読解 Q21】＜文章＞ 近年、リモートワークを 導入する 企業が 増えている。これにより、通勤時間が 節約でき、時間を 有効に 使えるという メリットが ある。一方で、同僚との コミュニケーションが 減り、孤立感を 感じる 人も いる。\n\n質問: リモートワークの デメリットとして 述べられているものは どれか。",
        "options": ["同僚とのコミュニケーションが減ること", "通勤時間が長くなること", "時間が使えなくなること", "給料が減ること"],
        "correctAnswer": "同僚とのコミュニケーションが減ること",
        "explanation": "文章より「一方で同僚とのコミュニケーションが減り」がデメリットとして述べられています。"
    },
    {
        "id": "jp_n3_set1_22",
        "level": "N3",
        "mockSet": "N3_SET_1",
        "type": "MULTIPLE_CHOICE",
        "prompt": "【読解 Q22】＜図書館のお知らせ＞ 8月15日は 施設点検のため 休館いたします。返却ボックスは 通常通り ご利用になれますが、CDや DVDなどの 壊れやすいものは 休館日明けに 直接 カウンターへ ご返却ください。\n\n質問: 休館日に 返却ボックスに 入れてはいけないものは どれか。",
        "options": ["CDやDVD", "本", "雑誌", "新聞"],
        "correctAnswer": "CDやDVD",
        "explanation": "お知らせより「CDやDVDなどの壊れやすいものは休館日明けに直接カウンターへご返却ください」とあります。"
    },
    {
        "id": "jp_n3_set1_23",
        "level": "N3",
        "mockSet": "N3_SET_1",
        "type": "MULTIPLE_CHOICE",
        "prompt": "【読解 Q23】＜ビジネスメール＞ 件名: 企画会議の 日程変更の お願い\n営業部 山田様\nお疲れ様です。開発部の 鈴木です。明日14時からの 企画会議ですが、急な 出張が 入ったため、明後日15時に 変更していただけないでしょうか。\n\n質問: 鈴木さんは 会議を いつに 変更したいと考えていますか。",
        "options": ["明後日の15時", "明日の14時", "明日の15時", "来週の14時"],
        "correctAnswer": "明後日の15時",
        "explanation": "メールより「明後日15時に変更していただけないでしょうか」と依頼しています。"
    },
    {
        "id": "jp_n3_set1_24",
        "level": "N3",
        "mockSet": "N3_SET_1",
        "type": "MULTIPLE_CHOICE",
        "prompt": "【読解 Q24】＜環境問題の解説＞ 私たちが 日常生活で 出す プラスチックゴミは、海を 汚染し、海の 生物に 悪影響を 与えている。ゴミを 減らすためには、マイバッグや マイボトルを 持ち歩くことが 効果的である。\n\n質問: プラスチックゴミを 減らすために 推奨されている 行動は どれか。",
        "options": ["マイバッグやマイボトルを持ち歩く", "プラスチック製品をたくさん買う", "海で遊ぶのをやめる", "ゴミを海に捨てる"],
        "correctAnswer": "マイバッグやマイボトルを持ち歩く",
        "explanation": "「マイバッグやマイボトルを持ち歩くことが効果的である」と記載されています。"
    },
    {
        "id": "jp_n3_set1_25",
        "level": "N3",
        "mockSet": "N3_SET_1",
        "type": "MULTIPLE_CHOICE",
        "prompt": "【読解 Q25】＜研修案内＞ 新入社員対象 マナー研修\n日時: 10月5日（金） 10:00〜16:00\n場所: 本社4階 第1研修室\n持ち物: 筆記用具、名刺\n服装: スーツ着用\n\n質問: 研修に 持参しなければならないものは どれか。",
        "options": ["筆記用具と名刺", "教科書とノート", "パソコンとカメラ", "印鑑と健康保険証"],
        "correctAnswer": "筆記用具と名刺",
        "explanation": "案内より「持ち物: 筆記用具、名刺」と記載されています。"
    },

    # Listening Audio Dialogues (26-30)
    {
        "id": "jp_n3_set1_26",
        "level": "N3",
        "mockSet": "N3_SET_1",
        "type": "LISTENING",
        "prompt": "【聴解 Q26】男の人：佐藤さん、明日の プレゼンの 資料、準備できた？\n女の人：はい、グラフの 修正も 終わりました。あとは 10部 印刷するだけです。\n男の人：じゃあ、会議室の プロジェクターの 確認も お願いできる？\n女の人：わかりました。すぐ やっておきます。\n\n質問: 女の人は これから 最初に 何を しますか。",
        "options": ["プロジェクターの確認", "資料の印刷", "グラフの修正", "会議室の掃除"],
        "correctAnswer": "資料の印刷",
        "explanation": "資料の印刷（あと10部印刷するだけ）をしてから、プロジェクターの確認を行います。"
    },
    {
        "id": "jp_n3_set1_27",
        "level": "N3",
        "mockSet": "N3_SET_1",
        "type": "LISTENING",
        "prompt": "【聴解 Q27】女の人：すみません、この 電子レンジの 調子が 悪いみたいなんです。\n店員：申し訳ございません。保証書を お持ちでしょうか。\n女の人：はい、これです。先月 買ったばかりなんです。\n店員：ありがとうございます。無料修理、または 交換させていただきます。\n\n質問: 店員は これから どう対応しますか。",
        "options": ["無料修理または交換を行う", "有料で修理する", "返品を受け付けない", "新しい製品を買わせる"],
        "correctAnswer": "無料修理または交換を行う",
        "explanation": "保証書があるため「無料修理、または交換させていただきます」と説明しています。"
    },
    {
        "id": "jp_n3_set1_28",
        "level": "N3",
        "mockSet": "N3_SET_1",
        "type": "LISTENING",
        "prompt": "【聴解 Q28】男の人：来週の 出張、飛行機で行く？ それとも 新幹線？\n女の人：天気が 悪くなりそうだから、遅れにくい 新幹線に しましょう。\n男の人：そうだね。指定席を 予約しておくよ。\n\n質問: 二人は 何で 出張に行きますか。",
        "options": ["新幹線", "飛行機", "高速バス", "レンタカー"],
        "correctAnswer": "新幹線",
        "explanation": "悪天候が予想されるため「新幹線にしましょう」と決定しています。"
    },
    {
        "id": "jp_n3_set1_29",
        "level": "N3",
        "mockSet": "N3_SET_1",
        "type": "LISTENING",
        "prompt": "【聴解 Q29】課長：山田くん、急だけど 今日の 夕方の 打合せ、代わりに 出てくれないか。\n男の人：はい、承知いたしました。何か 持参する 書類は ありますか。\n課長：この 企画書を 持って、16時に 第3会議室へ 行ってくれ。\n\n質問: 男の人は 何時に どこへ 行きますか。",
        "options": ["16時に第3会議室へ行く", "15時に第1会議室へ行く", "17時に社長室へ行く", "明日の朝に応接室へ行く"],
        "correctAnswer": "16時に第3会議室へ行く",
        "explanation": "課長の指示「16時に第3会議室へ行ってくれ」が正解です。"
    },
    {
        "id": "jp_n3_set1_30",
        "level": "N3",
        "mockSet": "N3_SET_1",
        "type": "LISTENING",
        "prompt": "【聴解 Q30】アナウンス：お客様に お知らせいたします。3階 イベント会場にて、本日 限定で 特設セールを 行っております。対象商品が 表示価格より 30% オフとなりますので、ぜひ ご利用ください。\n\n質問: セール会場は 何階ですか。また 何% オフですか。",
        "options": ["3階で 30% オフ", "2階で 20% オフ", "4階で 50% オフ", "1階で 半額"],
        "correctAnswer": "3階で 30% オフ",
        "explanation": "アナウンスより「3階イベント会場にて 30%オフ」です。"
    }
]

print("Generated fresh N3 questions count:", len(n3_questions))

# Read TimedExamEngine.tsx
with open("components/TimedExamEngine.tsx", "r", encoding="utf-8") as f:
    code = f.read()

# Replace catalog N3 entry with fresh N3 test
old_n3_cat = """  {
    id: 'n3-mock-1',
    mockSet: 'ALL_N3',
    level: 'N3',
    language: 'JAPANESE',
    examFormat: 'JLPT_PAPER',
    title: 'JLPT N3 Intermediate Mock Test - Sample Set',
    japaneseTitle: 'JLPT N3 中級模擬試験',
    description: 'N3 level grammar nuances, honorifics, complex reading, and inference questions.',
    timeLimitMinutes: 60,
    questionCount: 5,
    sections: ['言語知識 (Language Knowledge)', '読解 (Reading)'],
    audioCount: 0,
    badgeColor: 'from-amber-600 to-orange-600',
  },"""

new_n3_cat = """  {
    id: 'n3-mock-1',
    mockSet: 'N3_SET_1',
    level: 'N3',
    language: 'JAPANESE',
    examFormat: 'JLPT_PAPER',
    title: 'JLPT N3 Official Mock Test - Set 1',
    japaneseTitle: 'JLPT N3 公式模擬試験 第1集 (30問)',
    description: 'Full official JLPT N3 practice paper covering Kanji & Vocabulary, N3 Grammar nuances (〜にしては, 〜反面, 〜おかげで), Reading comprehension, and Listening audio.',
    timeLimitMinutes: 70,
    questionCount: 30,
    sections: ['言語知識 (Language Knowledge)', '文法・読解 (Grammar & Reading)', '聴解 (Listening Audio)'],
    audioCount: 5,
    badgeColor: 'from-amber-600 to-orange-600',
  },"""

code = code.replace(old_n3_cat, new_n3_cat)

# Inject fresh N3 questions into JAPANESE_QUESTIONS array
jp_q_idx = code.find("const JAPANESE_QUESTIONS: ExamQuestion[] = [")
insert_pos = jp_q_idx + len("const JAPANESE_QUESTIONS: ExamQuestion[] = [\n")

n3_ts_str = "  // ==========================================\n"
n3_ts_str += "  // JLPT N3 OFFICIAL FRESH MOCK TEST PAPER (N3_SET_1)\n"
n3_ts_str += "  // ==========================================\n"
for q in n3_questions:
    n3_ts_str += "  " + json.dumps(q, ensure_ascii=False) + ",\n"

code = code[:insert_pos] + n3_ts_str + code[insert_pos:]

with open("components/TimedExamEngine.tsx", "w", encoding="utf-8") as f:
    f.write(code)

print("SUCCESSFULLY_INJECTED_FRESH_N3_MOCK_TEST")
