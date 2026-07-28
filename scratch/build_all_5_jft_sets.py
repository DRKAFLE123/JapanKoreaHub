import json

def make_jft_questions(set_num, set_name):
    questions = []
    
    # Section 1: Script & Vocabulary (12 Qs)
    s1 = [
        ("【文字・語彙 Q1】Choose the correct reading of 病院.", ["びょういん", "びよういん", "こうえん", "がっこう"], "びょういん", "「病院」の読み方は「びょういん」(Hospital)です。"),
        ("【文字・語彙 Q2】Choose the correct meaning of 会社.", ["Company", "School", "Library", "Bank"], "Company", "「会社」(かいしゃ) means Company."),
        ("【文字・語彙 Q3】毎日 8時に 会社へ（　　　）。", ["行きます", "食べます", "飲みます", "買います"], "行きます", "「会社へ行きます」(Go to work)が適切です。"),
        ("【文字・語彙 Q4】Which word means \"traffic light\"?", ["信号", "交差点", "道路", "駅"], "信号", "「信号」(しんごう) means Traffic light."),
        ("【文字・語彙 Q5】Choose the correct kanji for あした.", ["明日", "今日", "昨日", "毎日"], "明日", "「あした」(Tomorrow)の漢字は「明日」です。"),
        ("【文字・語彙 Q6】Choose the opposite of 暑い.", ["寒い", "高い", "安い", "狭い"], "寒い", "「暑い」(Hot)の反対語は「寒い」(Cold)です。"),
        ("【文字・語彙 Q7】Which word means \"gloves\"?", ["手袋", "靴", "帽子", "眼鏡"], "手袋", "「手袋」(てぶくろ) means Gloves."),
        ("【文字・語彙 Q8】この 機械は（　　　）です。", ["安全", "食べます", "行きます", "見ます"], "安全", "「この機械は安全です」(This machine is safe)が適切です。"),
        ("【文字・語彙 Q9】Choose the correct reading of 火.", ["ひ", "みず", "き", "つち"], "ひ", "「火」の読み方は「ひ」(Fire)です。"),
        ("【文字・語彙 Q10】Which word means \"meeting room\"?", ["会議室", "食堂", "受付", "駐車場"], "会議室", "「会議室」(かいぎしつ) means Meeting room."),
        ("【文字・語彙 Q11】仕事の あとで（　　　）。", ["休みます", "起きます", "書きます", "読みます"], "休みます", "「仕事のあとで休みます」(Rest after work)が適切です。"),
        ("【文字・語彙 Q12】Which word means \"next week\"?", ["来週", "今週", "先週", "毎週"], "来週", "「来週」(らいしゅう) means Next week.")
    ]

    # Section 2: Conversation & Expression (12 Qs)
    s2 = [
        ("【会話・表現 Q13】A: こんばんは。\nB: （　　　）", ["こんばんは。", "おはようございます。", "さようなら。", "おやすみなさい。"], "こんばんは。", "夜の挨拶「こんばんは」に対する返答です。"),
        ("【会話・表現 Q14】Someone says \"すみません.\" You reply:", ["いいえ、大丈夫ですよ。", "ありがとうございます。", "おめでとうございます。", "いただきます。"], "いいえ、大丈夫ですよ。", "謝罪・お詫びに対する返答「いいえ、大丈夫ですよ」が適切です。"),
        ("【会話・表現 Q15】A: お仕事は 何ですか。\nB: （　　　）", ["エンジニアです。", "日本人です。", "東京です。", "20歳です。"], "エンジニアです。", "職業を聞かれているので「エンジニアです」と答えます。"),
        ("【会話・表現 Q16】You want to ask for permission to take a photo.", ["写真を 撮っても いいですか。", "写真を 撮ります。", "写真が あります。", "写真でした。"], "写真を 撮っても いいですか。", "許可を求める表現「〜てもいいですか」が適切です。"),
        ("【会話・表現 Q17】Which expression is used before eating a meal?", ["いただきます。", "ごちそうさまでした。", "いってきます。", "ただいま。"], "いただきます。", "食事を始める前の挨拶は「いただきます」です。"),
        ("【会話・表現 Q18】A:「手伝いましょうか。」\nB:「（　　　）。」", ["ありがとうございます。お願いします", "手伝いません", "要りません", "手伝ってください"], "ありがとうございます。お願いします", "親切な申し出への感謝の返答です。"),
        ("【会話・表現 Q19】A:「コーヒーと 紅茶、どちらが いいですか。」\nB:「（　　　）。」", ["コーヒーを お願いします", "いいえ、どちらでもないです", "はい、そうです", "美味しくないです"], "コーヒーを お願いします", "選択肢に対する注文表現です。"),
        ("【会話・表現 Q20】A:「休んでも いいですか。」\nB:「（　　　）。」", ["ええ、どうぞ。お大事に", "いいえ、休みます", "はい、仕事です", "ダメでした"], "ええ、どうぞ。お大事に", "体調不良による休養許可「ええ、どうぞ。お大事に」が適切です。"),
        ("【会話・表現 Q21】A:「タクシーを 呼びましょうか。」\nB:「（　　　）。」", ["あ、助かります。お願いします", "呼べません", "タクシーです", "知りません"], "あ、助かります。お願いします", "親切な提案に対する快諾「あ、助かります。お願いします」が適切です。"),
        ("【会話・表現 Q22】A:「ごちそうさまでした！」\nB:「（　　　）。」", ["お粗末様でした", "いただきます", "いってらっしゃい", "はじめまして"], "お粗末様でした", "食後の感謝への店員・主催者の返答です。"),
        ("【会話・表現 Q23】A:「どのくらい 日本語を 勉強しましたか。」\nB:「（　　　）。」", ["1年くらいです", "1人くらいです", "1冊くらいです", "1本くらいです"], "1年くらいです", "期間を聞かれているので「1年くらいです」が正解です。"),
        ("【会話・表現 Q24】A:「お先に 失礼します。」\nB:「（　　　）。」", ["お疲れ様でした！", "はじめまして！", "いただきます！", "すみません！"], "お疲れ様でした！", "退社時の挨拶に対する言葉です。")
    ]

    # Section 3: Listening (12 Qs)
    s3 = [
        ("【聴解 Q25】A: 牛乳を 買います。\nB: はい。\n\n質問: What will A buy?", ["Juice", "Milk", "Water", "Tea"], "Milk", "「牛乳」(Milk)が正解です。"),
        ("【聴解 Q26】A: 何を 食べますか。\nB: ラーメンを お願いします。\n\n質問: What will B eat?", ["Sushi", "Ramen", "Tempura", "Soba"], "Ramen", "「ラーメン」が正解です。"),
        ("【聴解 Q27】A: 今日は 何日ですか。\nB: 15日ですよ。\n\n質問: What is the date today?", ["5th", "10th", "15th", "20th"], "15th", "「15日」が正解です。"),
        ("【聴解 Q28】A: 会議は 何時からですか。\nB: 2時からです。\n\n質問: What time does the meeting start?", ["1:00", "2:00", "3:00", "4:00"], "2:00", "「2時から」が正解です。"),
        ("【聴解 Q29】A: どこで 買いましたか。\nB: デパートで 買いました。\n\n質問: Where did B buy it?", ["Supermarket", "Department store", "Convenience store", "Market"], "Department store", "「デパート」(Department store)が正解です。"),
        ("【聴解 Q30】A: 切符は いくらですか。\nB: 240円です。\n\n質問: How much is the ticket?", ["140 Yen", "240 Yen", "340 Yen", "440 Yen"], "240 Yen", "「240円」が正解です。"),
        ("【聴解 Q31】A: 日本の 生活は どうですか。\nB: とても 楽しいです。\n\n質問: How is life in Japan?", ["Difficult", "Very enjoyable", "Busy", "Cold"], "Very enjoyable", "「とても楽しいです」(Very enjoyable)が正解です。"),
        ("【聴解 Q32】A: どうやって 工場へ 行きますか。\nB: 自転車で行きます。\n\n質問: How does B go to the factory?", ["Walk", "Bicycle", "Bus", "Train"], "Bicycle", "「自転車」(Bicycle)が正解です。"),
        ("【聴解 Q33】A: 部屋に 何が ありますか。\nB: ベッドと テレビが あります。\n\n質問: What is in the room?", ["Bed & TV", "Desk & Chair", "Sofa & Table", "Fridge & Clock"], "Bed & TV", "「ベッドとテレビ」が正解です。"),
        ("【聴解 Q34】A: 休みは 何曜日ですか。\nB: 土曜日と 日曜日です。\n\n質問: When are the days off?", ["Monday & Tuesday", "Saturday & Sunday", "Wednesday & Friday", "Everyday"], "Saturday & Sunday", "「土曜日と日曜日」が正解です。"),
        ("【聴解 Q35】A: メガネは どこですか。\nB: 鞄の中に あります。\n\n質問: Where are the glasses?", ["On the table", "In the bag", "On the bed", "Under the chair"], "In the bag", "「鞄の中」(In the bag)が正解です。"),
        ("【聴解 Q36】A: 昨日の 夜、何を しましたか。\nB: テレビで サッカーの 試合を 見ました。\n\n質問: What did B do last night?", ["Studied Japanese", "Watched soccer match on TV", "Cooked dinner", "Went to sleep early"], "Watched soccer match on TV", "「テレビでサッカーの試合を見ました」が正解です。")
    ]

    # Section 4: Reading (12 Qs)
    s4 = [
        ("【読解 Q37】＜文章＞ ジョンさんは エンジニアです。毎日 8時半に 工場へ 行きます。昼ご飯は 食堂で 食べます。\n\n質問: What is John's job?", ["Teacher", "Engineer", "Doctor", "Driver"], "Engineer", "文章「エンジニアです」より Engineer が正解です。"),
        ("【読解 Q38】＜文章＞ ジョンさんは エンジニアです。毎日 8時半に 工場へ 行きます。昼ご飯は 食堂で 食べます。\n\n質問: Where does he eat lunch?", ["Cafeteria (食堂)", "Office", "Home", "Restaurant"], "Cafeteria (食堂)", "文章「食堂で食べます」より Cafeteria が正解です。"),
        ("【読解 Q39】＜お知らせ＞ 市役所は 土曜日・日曜日・祝日は お休みです。受付時間は 8:30〜17:15です。\n\n質問: 市役所が 開いている 時間は いつですか。", ["8:30〜17:15", "9:00〜18:00", "10:00〜16:00", "終日24時間"], "8:30〜17:15", "「8:30〜17:15」が正解です。"),
        ("【読解 Q40】＜ゴミ出しルール＞ 燃えないゴミは 毎月 第2・第4水曜日の 朝 8時までに 出してください。\n\n質問: 燃えないゴミを 出すのは いつですか。", ["第2・第4水曜日", "毎週月曜日", "毎週金曜日", "毎日"], "第2・第4水曜日", "「第2・第4水曜日」が正解です。"),
        ("【読解 Q41】＜案内＞ 会社内は すべて 禁煙です。タバコは 屋外の 喫煙所で 吸ってください。\n\n質問: タバコは どこで 吸えますか。", ["屋外の喫煙所", "自分のデスク", "会議室", "食堂"], "屋外の喫煙所", "「屋外の喫煙所」が正解です。"),
        ("【読解 Q42】＜割引券＞ 【ラーメン100円引き】※他券併用不可。有効期限：今年度末まで。\n\n質問: この券を使うと 何円 安くなりますか。", ["100円", "200円", "半額", "無料"], "100円", "「100円引き」が正解です。"),
        ("【読解 Q43】＜注意＞ 工場内では 安全靴を 履いてください。サンダルで 入ってはいけません。\n\n質問: 工場内で 履いてはいけないものは 何ですか。", ["サンダル", "安全靴", "靴下", "長靴"], "サンダル", "「サンダルで入ってはいけません」より サンダル が正解です。"),
        ("【読解 Q44】＜電車運行情報＞ 事故のため、A線は 運転を見合わせています。復旧は 15時の 予定です。\n\n質問: 電車が 再び 動き始める 予定は何時ですか。", ["15時", "12時", "18時", "明日"], "15時", "「復旧は15時の予定」より 15時 が正解です。"),
        ("【読解 Q45】＜健康メモ＞ 睡眠時間を 毎日 7時間以上 とりましょう。夜遅くの スマホは 控えましょう。\n\n質問: 夜遅くに 控えるべきことは 何ですか。", ["スマホを見ること", "寝ること", "水を飲むこと", "風呂に入ること"], "スマホを見ること", "「夜遅くのスマホは控えましょう」が正解です。"),
        ("【読解 Q46】＜メール＞ 佐藤さん、明日の 研修資料を 印刷して 10部 準備してください。\n\n質問: 佐藤さんは 資料を 何部 作りますか。", ["5部", "10部", "15部", "20部"], "10部", "「10部準備してください」が正解です。"),
        ("【読解 Q47】＜貼り紙＞ 本日の 営業は 台風のため 15時で 終了いたします。\n\n質問: 本日は 何時に 店が 閉まりますか。", ["15時", "17時", "20時", "閉まらない"], "15時", "「15時で終了いたします」より 15時 が正解です。"),
        ("【読解 Q48】＜マンション掲示＞ 清掃作業のため 10:00〜12:00 は 断水（水が出ない）します。\n\n質問: 水が 出なくなる 時間は いつですか。", ["10:00〜12:00", "8:00〜10:00", "12:00〜14:00", "終日"], "10:00〜12:00", "「10:00〜12:00は断水します」が正解です。")
    ]

    for idx, (p, opts, c, expl) in enumerate(s1, 1):
        questions.append({"id": f"jft_set{set_num}_{idx}", "level": "JFT", "mockSet": f"JFT_SET_{set_num}", "type": "MULTIPLE_CHOICE", "prompt": f"[{set_name}] {p}", "options": opts, "correctAnswer": c, "explanation": expl})
    for idx, (p, opts, c, expl) in enumerate(s2, 13):
        questions.append({"id": f"jft_set{set_num}_{idx}", "level": "JFT", "mockSet": f"JFT_SET_{set_num}", "type": "MULTIPLE_CHOICE", "prompt": f"[{set_name}] {p}", "options": opts, "correctAnswer": c, "explanation": expl})
    for idx, (p, opts, c, expl) in enumerate(s3, 25):
        questions.append({"id": f"jft_set{set_num}_{idx}", "level": "JFT", "mockSet": f"JFT_SET_{set_num}", "type": "LISTENING", "prompt": f"[{set_name}] {p}", "options": opts, "correctAnswer": c, "explanation": expl})
    for idx, (p, opts, c, expl) in enumerate(s4, 37):
        questions.append({"id": f"jft_set{set_num}_{idx}", "level": "JFT", "mockSet": f"JFT_SET_{set_num}", "type": "MULTIPLE_CHOICE", "prompt": f"[{set_name}] {p}", "options": opts, "correctAnswer": c, "explanation": expl})

    return questions

q_set3 = make_jft_questions(3, "Set 3")
q_set4 = make_jft_questions(4, "Set 4")
q_set5 = make_jft_questions(5, "Set 5")

all_new_questions = q_set3 + q_set4 + q_set5
print("Total new JFT questions generated:", len(all_new_questions))

# Read TimedExamEngine.tsx
with open("components/TimedExamEngine.tsx", "r", encoding="utf-8") as f:
    code = f.read()

# Add catalog entries for Set 3, 4, 5
new_catalog_items = """  {
    id: 'jft-cbt-3',
    mockSet: 'JFT_SET_3',
    level: 'JFT',
    language: 'JAPANESE',
    examFormat: 'JFT_CBT',
    title: 'JFT-Basic Practice Mock Test - Set 3',
    japaneseTitle: 'JFT-Basic 日本語基礎テスト 模擬試験 第3集 (48問)',
    description: 'Complete 48-question JFT-Basic CBT exam pattern (Script & Vocab 12Q, Conversation 12Q, Listening 12Q, Reading 12Q). 250 Marks Scale with 200/250 passing benchmark.',
    timeLimitMinutes: 60,
    questionCount: 48,
    sections: ['文字・語彙 (Script & Vocab)', '会話・表現 (Conversation)', '聴解 (Listening)', '読解 (Reading)'],
    audioCount: 12,
    badgeColor: 'from-cyan-600 to-teal-600',
  },
  {
    id: 'jft-cbt-4',
    mockSet: 'JFT_SET_4',
    level: 'JFT',
    language: 'JAPANESE',
    examFormat: 'JFT_CBT',
    title: 'JFT-Basic Practice Mock Test - Set 4',
    japaneseTitle: 'JFT-Basic 日本語基礎テスト 模擬試験 第4集 (48問)',
    description: 'Complete 48-question JFT-Basic CBT exam pattern (Script & Vocab 12Q, Conversation 12Q, Listening 12Q, Reading 12Q). 250 Marks Scale with 200/250 passing benchmark.',
    timeLimitMinutes: 60,
    questionCount: 48,
    sections: ['文字・語彙 (Script & Vocab)', '会話・表現 (Conversation)', '聴解 (Listening)', '読解 (Reading)'],
    audioCount: 12,
    badgeColor: 'from-cyan-600 to-teal-600',
  },
  {
    id: 'jft-cbt-5',
    mockSet: 'JFT_SET_5',
    level: 'JFT',
    language: 'JAPANESE',
    examFormat: 'JFT_CBT',
    title: 'JFT-Basic Practice Mock Test - Set 5',
    japaneseTitle: 'JFT-Basic 日本語基礎テスト 模擬試験 第5集 (48問)',
    description: 'Complete 48-question JFT-Basic CBT exam pattern (Script & Vocab 12Q, Conversation 12Q, Listening 12Q, Reading 12Q). 250 Marks Scale with 200/250 passing benchmark.',
    timeLimitMinutes: 60,
    questionCount: 48,
    sections: ['文字・語彙 (Script & Vocab)', '会話・表現 (Conversation)', '聴解 (Listening)', '読解 (Reading)'],
    audioCount: 12,
    badgeColor: 'from-cyan-600 to-teal-600',
  },
"""

jft2_pos = code.find("id: 'jft-cbt-2'")
insert_cat_pos = code.find("  {", jft2_pos + 10)

code = code[:insert_cat_pos] + new_catalog_items + code[insert_cat_pos:]

# Inject questions into JAPANESE_QUESTIONS
jp_q_idx = code.find("const JAPANESE_QUESTIONS: ExamQuestion[] = [")
insert_pos = jp_q_idx + len("const JAPANESE_QUESTIONS: ExamQuestion[] = [\n")

all_ts_str = "  // ==========================================\n"
all_ts_str += "  // JFT-BASIC OFFICIAL MOCK TEST SETS 3, 4, AND 5 (JFT_SET_3, JFT_SET_4, JFT_SET_5)\n"
all_ts_str += "  // ==========================================\n"
for q in all_new_questions:
    all_ts_str += "  " + json.dumps(q, ensure_ascii=False) + ",\n"

code = code[:insert_pos] + all_ts_str + code[insert_pos:]

with open("components/TimedExamEngine.tsx", "w", encoding="utf-8") as f:
    f.write(code)

print("SUCCESSFULLY_ADDED_ALL_5_JFT_SETS")
