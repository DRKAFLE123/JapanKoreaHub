import json

# Generate 48 Questions for JFT_SET_2
jft2_questions = []

# Section 1: Script & Vocabulary (Q1-12)
s1 = [
    ("【文字・語彙 Q1】Choose the correct reading of 食べます。", ["のみます", "たべます", "ききます", "みます"], "たべます", "「食べます」の読み方は「たべます」(To eat)です。"),
    ("【文字・語彙 Q2】Choose the correct meaning of 先生。", ["Student", "Teacher", "Friend", "Parent"], "Teacher", "「先生」(せんせい) means Teacher."),
    ("【文字・語彙 Q3】毎朝６時に（　　　）。", ["おきます", "ねます", "のみます", "あいます"], "おきます", "「毎朝６時に起きます」(Wake up at 6 AM every morning)が適切です。"),
    ("【文字・語彙 Q4】Which word means \"hospital\"?", ["銀行", "学校", "病院", "公園"], "病院", "「病院」(びょういん) means Hospital."),
    ("【文字・語彙 Q5】Choose the correct kanji for きょう.", ["今日", "教", "京", "強"], "今日", "「きょう」(Today)の漢字は「今日」です。"),
    ("【文字・語彙 Q6】Choose the opposite of 新しい.", ["高い", "古い", "大きい", "白い"], "古い", "「新しい」(New)の反対語は「古い」(Old)です。"),
    ("【文字・語彙 Q7】Which word means \"umbrella\"?", ["財布", "傘", "靴", "帽子"], "傘", "「傘」(かさ) means Umbrella."),
    ("【文字・語彙 Q8】これは（　　　）です。", ["本", "食べます", "行きます", "飲みます"], "本", "名詞文「これは本です」(This is a book)が適切です。"),
    ("【文字・語彙 Q9】Choose the correct reading of 水.", ["ひ", "みず", "やま", "そら"], "みず", "「水」の読み方は「みず」(Water)です。"),
    ("【文字・語彙 Q10】Which word means \"station\"?", ["店", "駅", "家", "部屋"], "駅", "「駅」(えき) means Station."),
    ("【文字・語彙 Q11】日本語を（　　　）。", ["話します", "食べます", "飲みます", "買います"], "話します", "「日本語を話します」(Speak Japanese)が適切です。"),
    ("【文字・語彙 Q12】Which word means \"yesterday\"?", ["今日", "明日", "昨日", "毎日"], "昨日", "「昨日」(きのう) means Yesterday.")
]

for idx, (p, opts, c, expl) in enumerate(s1, 1):
    jft2_questions.append({
        "id": f"jft_set2_{idx}",
        "level": "JFT",
        "mockSet": "JFT_SET_2",
        "type": "MULTIPLE_CHOICE",
        "prompt": p,
        "options": opts,
        "correctAnswer": c,
        "explanation": expl
    })

# Section 2: Conversation & Expression (Q13-24)
s2 = [
    ("【会話・表現 Q13】A: おはようございます。\nB: （　　　）", ["おはようございます。", "こんばんは。", "さようなら。", "いただきます。"], "おはようございます。", "朝の挨拶「おはようございます」に対する返答です。"),
    ("【会話・表現 Q14】Someone says \"ありがとうございます.\" You reply:", ["どういたしまして。", "おねがいします。", "はじめまして。", "ごめんなさい。"], "どういたしまして。", "感謝のお礼に対する返答は「どういたしまして」(You're welcome)です。"),
    ("【会話・表現 Q15】A: お名前は？\nB: （　　　）", ["田中です。", "学生です。", "日本です。", "東京です。"], "田中です。", "名前を聞かれたので「田中です」(I am Tanaka)と答えます。"),
    ("【会話・表現 Q16】You want to ask for water.", ["水をください。", "水です。", "水があります。", "水でした。"], "水をください。", "水をお願いする表現は「水をください」(Water please)です。"),
    ("【会話・表現 Q17】Which expression is used when leaving home?", ["いってきます。", "ただいま。", "おかえり。", "おやすみ。"], "いってきます。", "外出時の挨拶は「いってきます」(I'm leaving)です。"),
    ("【会話・表現 Q18】A:「すみません、この 電車は 東京へ 行きますか。」\nB:「（　　　）。」", ["はい、行きますよ", "いいえ、電車です", "はい、東京です", "いいえ、行きました"], "はい、行きますよ", "行先確認への適切な返答「はい、行きますよ」です。"),
    ("【会話・表現 Q19】A:「いらっしゃいませ！」\nB:「（　　　）。」", ["コーヒーを お願いします", "いってきます", "ごちそうさまでした", "お邪魔します"], "コーヒーを お願いします", "お店での注文表現「コーヒーをお願いします」が適切です。"),
    ("【会話・表現 Q20】A:「明日、いっしょに 映画を 見に行きませんか。」\nB:「（　　　）。」", ["いいですね。行きましょう", "いいえ、見ません", "はい、映画です", "いいえ、行きませんでした"], "いいですね。行きましょう", "お誘いへの快諾表現「いいですね。行きましょう」が正解です。"),
    ("【会話・表現 Q21】A:「お腹が すきましたね。」\nB:「（　　　）。」", ["じゃあ、何か 食べに行きましょう", "はい、すき焼きです", "いいえ、食べません", "おめでとうございます"], "じゃあ、何か 食べに行きましょう", "「何か食べに行きましょう」(Let's go eat something)が適切です。"),
    ("【会話・表現 Q22】A:「荷物を 持ちましょうか。」\nB:「（　　　）。」", ["ありがとうございます。お願いします", "持ちません", "要りません", "持ってください"], "ありがとうございます。お願いします", "申し出への感謝と依頼の表現です。"),
    ("【会話・表現 Q23】A:「失礼ですが、おいくつですか。」\nB:「（　　　）。」", ["25歳です", "25個です", "25本です", "25人です"], "25歳です", "年齢の単位は「歳」(years old)です。"),
    ("【会話・表現 Q24】A:「また 明日！」\nB:「（　　　）。」", ["また 明日！", "はじめまして！", "いただきます！", "ごめんなさい！"], "また 明日！", "別れの挨拶「また明日」(See you tomorrow)に対する返答です。")
]

for idx, (p, opts, c, expl) in enumerate(s2, 13):
    jft2_questions.append({
        "id": f"jft_set2_{idx}",
        "level": "JFT",
        "mockSet": "JFT_SET_2",
        "type": "MULTIPLE_CHOICE",
        "prompt": p,
        "options": opts,
        "correctAnswer": c,
        "explanation": expl
    })

# Section 3: Listening (Q25-36) - No wrong audio URLs, clean audio prompts!
s3 = [
    ("【聴解 Q25】A: パンを買います。\nB: はい。\n\n質問: What will A buy?", ["Rice", "Bread", "Fish", "Tea"], "Bread", "「パンを買います」より Bread(パン) が正解です。"),
    ("【聴解 Q26】A: 何を 飲みますか。\nB: お茶を お願いします。\n\n質問: What will B drink?", ["Coffee", "Water", "Tea", "Juice"], "Tea", "「お茶をお願いします」より Tea(お茶) が正解です。"),
    ("【聴解 Q27】A: 明日は 何曜日ですか。\nB: 金曜日ですよ。\n\n質問: What day is tomorrow?", ["Monday", "Wednesday", "Friday", "Sunday"], "Friday", "「金曜日ですよ」より Friday(金曜日) が正解です。"),
    ("【聴解 Q28】A: 今、何時ですか。\nB: 3時半です。\n\n質問: What time is it now?", ["2:00", "2:30", "3:00", "3:30"], "3:30", "「3時半」(3:30) が正解です。"),
    ("【聴解 Q29】A: どこへ 行きますか。\nB: 郵便局へ 行きます。\n\n質問: Where is B going?", ["Bank", "Post Office", "Library", "Station"], "Post Office", "「郵便局」(Post Office) が正解です。"),
    ("【聴解 Q30】A: この りんごは いくらですか。\nB: 100円です。\n\n質問: How much is the apple?", ["100 Yen", "200 Yen", "300 Yen", "500 Yen"], "100 Yen", "「100円」が正解です。"),
    ("【聴解 Q31】A: 昨日の 映画は どうでしたか。\nB: とても 面白かったです。\n\n質問: How was the movie?", ["Boring", "Very interesting", "Scary", "Difficult"], "Very interesting", "「とても面白かったです」(Very interesting) が正解です。"),
    ("【聴解 Q32】A: 何で 会社へ 行きますか。\nB: 電車で行きます。\n\n質問: How does B commute to work?", ["Bus", "Train", "Car", "Bicycle"], "Train", "「電車で行きます」(By train) が正解です。"),
    ("【聴解 Q33】A: 家族は 何人ですか。\nB: 4人です。\n\n質問: How many people are in B's family?", ["3 people", "4 people", "5 people", "6 people"], "4 people", "「4人です」が正解です。"),
    ("【聴解 Q34】A: 誕生日は いつですか。\nB: 5月10日です。\n\n質問: When is B's birthday?", ["April 10th", "May 10th", "June 10th", "May 1st"], "May 10th", "「5月10日」(May 10th) が正解です。"),
    ("【聴解 Q35】A: 部屋の 鍵は どこですか。\nB: 机の上に ありますよ。\n\n質問: Where is the room key?", ["In the bag", "On the desk", "Under the chair", "In the pocket"], "On the desk", "「机の上にあります」(On the desk) が正解です。"),
    ("【聴解 Q36】A: 日曜日、何を しましたか。\nB: 友達と サッカーを しました。\n\n質問: What did B do on Sunday?", ["Studied", "Played soccer with friends", "Watched TV", "Went shopping"], "Played soccer with friends", "「友達とサッカーをしました」が正解です。")
]

for idx, (p, opts, c, expl) in enumerate(s3, 25):
    jft2_questions.append({
        "id": f"jft_set2_{idx}",
        "level": "JFT",
        "mockSet": "JFT_SET_2",
        "type": "LISTENING",
        "prompt": p,
        "options": opts,
        "correctAnswer": c,
        "explanation": expl
    })

# Section 4: Reading (Q37-48)
s4 = [
    ("【読解 Q37】＜文章＞ わたしはマリアです。毎日７時に起きます。朝ごはんを食べて、８時に会社へ行きます。\n\n質問: What time does Maria wake up?", ["6:00", "7:00", "8:00", "9:00"], "7:00", "文章「毎日７時に起きます」より 7:00 が正解です。"),
    ("【読解 Q38】＜文章＞ わたしはマリアです。毎日７時に起きます。朝ごはんを食べて、８時に会社へ行きます。\n\n質問: Where does she go at 8:00?", ["School", "Company", "Hospital", "Station"], "Company", "文章「８時に会社へ行きます」より Company(会社) が正解です。"),
    ("【読解 Q39】＜お知らせ＞ 図書館は 毎週 月曜日が お休みです。土曜日と 日曜日は 朝 9時から 夕方 5時まで 開いています。\n\n質問: 図書館が お休みなのは 何曜日ですか。", ["月曜日", "土曜日", "日曜日", "金曜日"], "月曜日", "「毎週月曜日がお休みです」より 月曜日 が正解です。"),
    ("【読解 Q40】＜ゴミ出しルール＞ ペットボトルは 洗って、ラベルを はがしてから、青い ゴミ箱へ 入れてください。\n\n質問: ペットボトルは どの ゴミ箱に 入れますか。", ["赤色のゴミ箱", "青いゴミ箱", "黄色いゴミ箱", "黒いゴミ箱"], "青いゴミ箱", "「青いゴミ箱へ入れてください」が正解です。"),
    ("【読解 Q41】＜メッセージ＞ 田中さんへ。今日の 午後 2時からの 会議は、3階の 第2会議室に 変更になりました。\n\n質問: 会議は どこで 行われますか。", ["1階の受付", "2階の食堂", "3階の第2会議室", "4階の屋上"], "3階の第2会議室", "「3階の第2会議室」が正解です。"),
    ("【読解 Q42】＜バーゲンセール＞ 全商品 20% オフ！ 期間：8月1日 〜 8月7日まで。\n\n質問: セールは いつまでですか。", ["8月1日まで", "8月7日まで", "8月10日まで", "8月末まで"], "8月7日まで", "「8月7日まで」が正解です。"),
    ("【読解 Q43】＜注意＞ 作業中は 必ず 保護メガネを 着用してください。メガネを かけないで 作業をしてはいけません。\n\n質問: 作業中に 必ず かけるものは 何ですか。", ["サングラス", "保護メガネ", "読書用メガネ", "マスク"], "保護メガネ", "「保護メガネ」(Safety glasses) が正解です。"),
    ("【読解 Q44】＜バスの 時刻表＞ 駅から 病院行き：9:00, 9:30, 10:00, 10:30。\n\n質問: 9時の 次の バスは 何時ですか。", ["9:15", "9:30", "9:45", "10:00"], "9:30", "時刻表より 9:30 が正解です。"),
    ("【読解 Q45】＜貼り紙＞ この 水道水は 飲めません。飲み水は 自動販売機で 買ってください。\n\n質問: 水を 飲みたいとき、どうしますか。", ["水道水を飲む", "自動販売機で買う", "公園へ行く", "我慢する"], "自動販売機で買う", "「飲み水は自動販売機で買ってください」が正解です。"),
    ("【読解 Q46】＜メール＞ 木村さん、明日の バーベキューは 雨のため 中止になりました。\n\n質問: 明日の バーベキューは どうなりましたか。", ["予定通り行う", "時間変更になった", "中止になった", "場所変更になった"], "中止になった", "「雨のため中止になりました」より 中止になった が正解です。"),
    ("【読解 Q47】＜エレベーター前＞ この エレベーターは 工事のため 本日 使用できません。\n\n質問: エレベーターが 使えない 理由は 何ですか。", ["清掃のため", "工事のため", "点検のため", "停電のため"], "工事のため", "「工事のため」が正解です。"),
    ("【読解 Q48】＜食堂メニュー＞ Aランチ：ハンバーグ（600円）、Bランチ：魚フライ（550円）。ご飯の 大盛りは 無料です。\n\n質問: ご飯を 大盛りに すると いくら 加算されますか。", ["100円", "50円", "無料（0円）", "200円"], "無料（0円）", "「ご飯の大盛りは無料です」より 無料（0円） が正解です。")
]

for idx, (p, opts, c, expl) in enumerate(s4, 37):
    jft2_questions.append({
        "id": f"jft_set2_{idx}",
        "level": "JFT",
        "mockSet": "JFT_SET_2",
        "type": "MULTIPLE_CHOICE",
        "prompt": p,
        "options": opts,
        "correctAnswer": c,
        "explanation": expl
    })

print("Generated JFT SET 2 questions count:", len(jft2_questions))

# Read TimedExamEngine.tsx
with open("components/TimedExamEngine.tsx", "r", encoding="utf-8") as f:
    code = f.read()

# Add jft-cbt-2 to catalog right after jft-cbt-1
jft2_catalog_item = """  {
    id: 'jft-cbt-2',
    mockSet: 'JFT_SET_2',
    level: 'JFT',
    language: 'JAPANESE',
    examFormat: 'JFT_CBT',
    title: 'JFT-Basic Practice Mock Test - Set 2',
    japaneseTitle: 'JFT-Basic 日本語基礎テスト 模擬試験 第2集 (48問)',
    description: 'Complete 48-question JFT-Basic CBT exam pattern (Script & Vocab 12Q, Conversation 12Q, Listening 12Q, Reading 12Q). 250 Marks Scale with 200/250 passing benchmark.',
    timeLimitMinutes: 60,
    questionCount: 48,
    sections: ['文字・語彙 (Script & Vocab)', '会話・表現 (Conversation)', '聴解 (Listening)', '読解 (Reading)'],
    audioCount: 12,
    badgeColor: 'from-cyan-600 to-teal-600',
  },
"""

jft1_pos = code.find("id: 'jft-cbt-1'")
insert_cat_pos = code.find("  {", jft1_pos + 10)

code = code[:insert_cat_pos] + jft2_catalog_item + code[insert_cat_pos:]

# Inject jft2_questions into JAPANESE_QUESTIONS array
jp_q_idx = code.find("const JAPANESE_QUESTIONS: ExamQuestion[] = [")
insert_pos = jp_q_idx + len("const JAPANESE_QUESTIONS: ExamQuestion[] = [\n")

jft2_ts_str = "  // ==========================================\n"
jft2_ts_str += "  // JFT-BASIC OFFICIAL 48-QUESTION CBT MOCK TEST (JFT_SET_2)\n"
jft2_ts_str += "  // ==========================================\n"
for q in jft2_questions:
    jft2_ts_str += "  " + json.dumps(q, ensure_ascii=False) + ",\n"

code = code[:insert_pos] + jft2_ts_str + code[insert_pos:]

with open("components/TimedExamEngine.tsx", "w", encoding="utf-8") as f:
    f.write(code)

print("SUCCESSFULLY_ADDED_JFT_SET_2_TO_TIMED_EXAM_ENGINE")
