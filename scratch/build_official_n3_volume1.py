import json, re

# Formulate all 65 questions from User Prompt
n3_full_questions = []

# Part B: Grammar (Q26-Q50) -> mapped to Q1-Q25
grammar_items = [
    ("【文法 Q26】雨が降る（　　　）、試合は中止になります。", ["とき", "と", "なら", "まで"], "と", "条件・仮定を表す接続助詞「と」が正解です。"),
    ("【文法 Q27】日本へ来てから、日本料理が好き（　　　）。", ["になりました", "をしました", "がしました", "をなりました"], "になりました", "状態の変化を表す「〜が好きになりました」が正解です。"),
    ("【文法 Q28】疲れていた（　　　）、早く寝ました。", ["ので", "ように", "ながら", "まで"], "ので", "原因・理由を表す「〜ので」(Because)が正解です。"),
    ("【文法 Q29】電車に乗る（　　　）、財布がないことに気がついた。", ["とき", "あいだ", "ため", "しか"], "とき", "場面・時間を表す「〜とき」(When)が正解です。"),
    ("【文法 Q30】明日までにレポートを（　　　）なければならない。", ["書き", "書く", "書いて", "書いた"], "書き", "義務表現「〜書かなければならない」の語幹「書き」が正解です。"),
    ("【文法 Q31】部長はまだ来て（　　　）。", ["いません", "あります", "おきます", "しまいます"], "いません", "動作の未完了を表す「〜来ていません」(Has not arrived)が正解です。"),
    ("【文法 Q32】時間があれば、一緒に映画を（　　　）。", ["見に行きましょう", "見ます", "見た", "見ようです"], "見に行きましょう", "お誘い・提案の意向表現「〜見に行きましょう」(Let's go watch)が正解です。"),
    ("【文法 Q33】彼は日本語が話せる（　　　）、英語も上手です。", ["だけでなく", "だけ", "しか", "ほど"], "だけでなく", "累加・付加の表現「〜だけでなく」(Not only... but also)が正解です。"),
    ("【文法 Q34】暑い（　　　）、窓を開けましょう。", ["ので", "のに", "でも", "しか"], "ので", "理由・客観的根拠「〜ので」が正解です。"),
    ("【文法 Q35】駅へ行く（　　　）バスを利用します。", ["ために", "ように", "だけ", "ほど"], "ために", "目的を表す「〜ために」(In order to)が正解です。"),
    ("【文法 Q36】私は毎朝コーヒーを飲んで（　　　）。", ["います", "あります", "おきます", "しまいます"], "います", "日常の習慣を表す「〜飲んでいます」(Am drinking)が正解です。"),
    ("【文法 Q37】今日は昨日（　　　）寒くありません。", ["ほど", "しか", "まで", "だけ"], "ほど", "比較否定表現「〜ほど...ない」(Not as... as)が正解です。"),
    ("【文法 Q38】先生に宿題を出す（　　{の}）を 忘れました。", ["のを", "のに", "ので", "のが"], "のを", "動作の目的語を名詞化する「〜のを忘れました」が正解です。"),
    ("【文法 Q39】財布を落として（　　　）。", ["しまいました", "おきました", "あります", "います"], "しまいました", "遺憾・失敗を表す「〜てしまいました」(Accidentally dropped)が正解です。"),
    ("【文法 Q40】彼は子どもの（　　　）元気です。", ["ように", "ような", "らしい", "みたい"], "ように", "比喩・様態を表す「〜のように」(Like a child)が正解です。"),
    ("【文法 Q41】会議は３時（　　　）始まります。", ["から", "ごろ", "まで", "しか"], "から", "開始時点を表す「〜から」(From 3:00)が正解です。"),
    ("【文法 Q42】この問題は私には難し（　　　）。", ["すぎます", "させます", "られます", "なおします"], "すぎます", "過度を表す「〜難しすぎます」(Too difficult)が正解です。"),
    ("【文法 Q43】病気だった（　　　）、学校を休みました。", ["ので", "のに", "でも", "しか"], "ので", "理由・原因を表す「〜ので」が正解です。"),
    ("【文法 Q44】友達が来る（　　　）部屋を掃除しました。", ["ので", "ため", "まで", "ように"], "ように", "目的・準備を表す「〜ように」(So that friend can come)が正解です。"),
    ("【文法 Q45】この薬は食後に飲む（　　　）。", ["べきです", "ことです", "ようです", "はずです"], "べきです", "義務・当然の推奨「〜飲むべきです」(Should take after meals)が正解です。"),
    ("【文法 Q46】急いでいた（　　　）、転んでしまいました。", ["ので", "のに", "ながら", "ほど"], "ので", "原因・理由の「〜ので」が正解です。"),
    ("【文法 Q47】彼は約束を守る（　　　）人です。", ["まじめな", "まじめ", "まじめに", "まじめさ"], "まじめな", "名詞修飾のな形容詞「まじめな」(Serious/Honest person)が正解です。"),
    ("【文法 Q48】雨が降っている（　　　）、出かけます。", ["のに", "ので", "から", "ため"], "のに", "逆説の「〜のに」(Even though it's raining)が正解です。"),
    ("【文法 Q49】母は料理を作り（　　　）、私は皿を並べた。", ["ながら", "ので", "ても", "しか"], "ながら", "同時並行動作「〜作りながら」(While cooking)が正解です。"),
    ("【文法 Q50】もっと勉強すれば、日本語が上手に（　　　）。", ["なります", "します", "あります", "います"], "なります", "変化を表す「〜上手に習得してなります」が正解です。")
]

for idx, (p, opts, c, expl) in enumerate(grammar_items, 1):
    n3_full_questions.append({
        "id": f"jpn3_v1_{idx}",
        "level": "N3",
        "mockSet": "N3_SET_1",
        "type": "MULTIPLE_CHOICE",
        "prompt": p,
        "options": opts,
        "correctAnswer": c,
        "explanation": expl
    })

# Part C: Reading (Q51-70) -> mapped to Q26-Q45
reading_items = [
    ("【読解 Passage 1】田中さんは毎日会社へ電車で通っています。しかし、先週から駅の工事が始まり、電車が10分ほど遅れるようになりました。そのため、田中さんはいつもより20分早く家を出ています。最初は大変でしたが、最近は朝の時間に本を読む習慣ができました。\n\n質問 Q51: Why has the train been delayed?", ["Bad weather", "Station construction", "Heavy traffic", "Train accident"], "Station construction", "Passage specifies station construction (駅の工事) delayed the train."),
    ("【読解 Passage 1】田中さんは毎日会社へ電車で通っています。しかし、先週から駅の工事が始まり、電車が10分ほど遅れるようになりました。そのため、田中さんはいつもより20分早く家を出ています。最初は大変でしたが、最近は朝の時間に本を読む習慣ができました。\n\n質問 Q52: How much earlier does Tanaka leave home now?", ["10 minutes", "15 minutes", "20 minutes", "30 minutes"], "20 minutes", "Passage states 20 minutes earlier (20分早く家を出ています)."),
    ("【読解 Passage 1】田中さんは毎日会社へ電車で通っています。しかし、先週から駅の工事が始まり、電車が10分ほど遅れるようになりました。そのため、田中さんはいつもより20分早く家を出ています。最初は大変でしたが、最近は朝の時間に本を読む習慣ができました。\n\n質問 Q53: What new habit has Tanaka developed?", ["Running", "Reading books", "Cooking breakfast", "Studying English"], "Reading books", "Passage states reading books (本を読む習慣) in the morning."),
    ("【読解 Passage 1】田中さんは毎日会社へ電車で通っています。しかし、先週から駅の工事が始まり、電車が10分ほど遅れるようになりました。そのため、田中さんはいつもより20分早く家を出ています。最初は大変でしたが、最近は朝の時間に本を読む習慣ができました。\n\n質問 Q54: Which statement is correct?", ["He drives to work.", "The delays started last month.", "He now leaves earlier than before.", "He changed jobs."], "He now leaves earlier than before.", "Correct: He leaves 20 minutes earlier than before."),

    ("【読解 Passage 2】＜図書館のお知らせ＞ 図書館は来週月曜日から水曜日まで館内点検のため休館します。本の返却は入口横の返却ボックスをご利用ください。木曜日から通常どおり開館します。\n\n質問 Q55: Why is the library closed?", ["Holiday", "Staff meeting", "Building inspection", "Festival"], "Building inspection", "Passage specifies building inspection (館内点検)."),
    ("【読解 Passage 2】＜図書館のお知らせ＞ 図書館は来週月曜日から水曜日まで館内点検のため休館します。本の返却は入口横の返却ボックスをご利用ください。木曜日から通常どおり開館します。\n\n質問 Q56: How can books be returned?", ["At the reception desk", "By post", "In the return box", "At another library"], "In the return box", "Passage specifies using the return box (返却ボックス)."),
    ("【読解 Passage 2】＜図書館のお知らせ＞ 図書館は来週月曜日から水曜日まで館内点検のため休館します。本の返却は入口横の返却ボックスをご利用ください。木曜日から通常どおり開館します。\n\n質問 Q57: When will the library reopen?", ["Wednesday", "Thursday", "Friday", "Saturday"], "Thursday", "Passage specifies reopening on Thursday (木曜日から通常どおり開館)."),
    ("【読解 Passage 2】＜図書館のお知らせ＞ 図書館は来週月曜日から水曜日まで館内点検のため休館します。本の返却は入口横の返却ボックスをご利用ください。木曜日から通常どおり開館します。\n\n質問 Q58: What is this passage?", ["Advertisement", "Notice", "Diary", "Story"], "Notice", "This passage is a Library Notice (お知らせ)."),

    ("【読解 Passage 3】佐藤さんは新しい仕事を始めました。最初は仕事を覚えるのが大変でしたが、同僚が親切に教えてくれたので、少しずつ自信がついてきました。今では毎日楽しく働いています。\n\n質問 Q59: What was difficult at first?", ["Finding the office", "Learning the job", "Waking up early", "Travelling"], "Learning the job", "Passage states learning the job was hard (仕事を覚えるのが大変)."),
    ("【読解 Passage 3】佐藤さんは新しい仕事を始めました。最初は仕事を覚えるのが大変でしたが、同僚が親切に教えてくれたので、少しずつ自信がついてきました。今では毎日楽しく働いています。\n\n質問 Q60: Why did Sato improve?", ["He studied alone.", "His boss was strict.", "His coworkers helped him.", "He changed departments."], "His coworkers helped him.", "Passage states coworkers kindly taught him (同僚が親切に教えてくれた)."),
    ("【読解 Passage 3】佐藤さんは新しい仕事を始めました。最初は仕事を覚えるのが大変でしたが、同僚が親切に教えてくれたので、少しずつ自信がついてきました。今では毎日楽しく働いています。\n\n質問 Q61: How does Sato feel now?", ["Worried", "Bored", "Happy", "Angry"], "Happy", "Passage states he works happily every day (毎日楽しく働いています)."),
    ("【読解 Passage 3】佐藤さんは新しい仕事を始めました。最初は仕事を覚えるのが大変でしたが、同僚が親切に教えてくれたので、少しずつ自信がついてきました。今では毎日楽しく働いています。\n\n質問 Q62: Choose the best summary.", ["He quit his job.", "He gradually became confident.", "He works only on weekends.", "He dislikes his colleagues."], "He gradually became confident.", "Passage states he gradually gained confidence (少しずつ自信がついてきました)."),

    ("【読解 Passage 4】＜山本さんへのメール＞ 山本さん、明日の会議は午後2時から3時に変更になりました。場所は3階会議室です。資料は今日中にメールで送ります。 鈴木\n\n質問 Q63: When is the meeting?", ["1:00", "2:00", "3:00", "4:00"], "2:00", "Passage specifies meeting starts at 2:00 PM (午後2時から3時)."),
    ("【読解 Passage 4】＜山本さんへのメール＞ 山本さん、明日の会議は午後2時から3時に変更になりました。場所は3階会議室です。資料は今日中にメールで送ります。 鈴木\n\n質問 Q64: Where will it be held?", ["Second floor", "Third floor", "Fourth floor", "Online"], "Third floor", "Passage specifies 3rd floor meeting room (3階会議室)."),
    ("【読解 Passage 4】＜山本さんへのメール＞ 山本さん、明日の会議は午後2時から3時に変更になりました。場所は3階会議室です。資料は今日中にメールで送ります。 鈴木\n\n質問 Q65: What will Suzuki send?", ["Tickets", "Lunch", "Documents", "Photos"], "Documents", "Passage specifies documents (資料は今日中にメールで送ります)."),
    ("【読解 Passage 4】＜山本さんへのメール＞ 山本さん、明日の会議は午後2時から3時に変更になりました。場所は3階会議室です。資料は今日中にメールで送ります。 鈴木\n\n質問 Q66: When will the documents be sent?", ["Tomorrow morning", "Today", "After the meeting", "Next week"], "Today", "Passage specifies sending documents today (今日中に)."),

    ("【読解 Passage 5】山へ行くときは、天気を確認してから出発しましょう。雨が降る可能性がある日は、雨具を持って行くことをおすすめします。また、一人で山へ行くより、友達と一緒に行くほうが安全です。\n\n質問 Q67: What should you check before leaving?", ["Map", "Weather", "Shoes", "Camera"], "Weather", "Passage advises checking the weather (天気を確認してから)."),
    ("【読解 Passage 5】山へ行くときは、天気を確認してから出発しましょう。雨が降る可能性がある日は、雨具を持って行くことをおすすめします。また、一人で山へ行くより、友達と一緒に行くほうが安全です。\n\n質問 Q68: What should you bring if rain is possible?", ["Hat", "Umbrella or rain gear", "Food", "Tent"], "Umbrella or rain gear", "Passage advises bringing rain gear (雨具を持って行く)."),
    ("【読解 Passage 5】山へ行くときは、天気を確認してから出発しましょう。雨が降る可能性がある日は、雨具を持って行くことをおすすめします。また、一人で山へ行くより、友達と一緒に行くほうが安全です。\n\n質問 Q69: According to the passage, what is safer?", ["Going alone", "Going at night", "Going with friends", "Going by car"], "Going with friends", "Passage specifies going with friends is safer (友達と一緒に行くほうが安全)."),
    ("【読解 Passage 5】山へ行くときは、天気を確認してから出発しましょう。雨が降る可能性がある日は、雨具を持って行くことをおすすめします。また、一人で山へ行くより、友達と一緒に行くほうが安全です。\n\n質問 Q70: What is the main purpose of the passage?", ["Describe a mountain", "Give hiking safety advice", "Explain train travel", "Introduce a new park"], "Give hiking safety advice", "Main purpose is hiking safety advice.")
]

for idx, (p, opts, c, expl) in enumerate(reading_items, 26):
    n3_full_questions.append({
        "id": f"jpn3_v1_{idx}",
        "level": "N3",
        "mockSet": "N3_SET_1",
        "type": "MULTIPLE_CHOICE",
        "prompt": p,
        "options": opts,
        "correctAnswer": c,
        "explanation": expl
    })

# Part D: Listening (Q71-90) -> mapped to Q46-Q65
listening_items = [
    ("【聴解 Dialogue 1】男: 明日の会議は10時からでしたね。\n女: いいえ、部長の予定が変わったので11時からです。\n男: わかりました。では30分前に行きます。\n\n質問 Q71: What time does the meeting start?", ["9:30", "10:00", "11:00", "11:30"], "11:00", "女の会話「11時からです」より 11:00 が正解です。"),
    ("【聴解 Dialogue 1】男: 明日の会議は10時からでしたね。\n女: いいえ、部長の予定が変わったので11時からです。\n男: わかりました。では30分前に行きます。\n\n質問 Q72: What will the man do?", ["Arrive at 10:30", "Cancel the meeting", "Arrive at 11:30", "Work from home"], "Arrive at 10:30", "30分前に行くため 10:30 に到着します。"),

    ("【聴解 Dialogue 2】店員: いらっしゃいませ。\n女: このかばんは少し大きいですね。もっと小さいものはありますか。\n店員: はい、こちらはいかがでしょうか。\n\n質問 Q73: What is the woman looking for?", ["Shoes", "A smaller bag", "A jacket", "A suitcase"], "A smaller bag", "会話より「もっと小さいかばん」(A smaller bag)が正解です。"),
    ("【聴解 Dialogue 2】店員: いらっしゃいませ。\n女: このかばんは少し大きいですね。もっと小さいものはありますか。\n店員: はい、こちらはいかがでしょうか。\n\n質問 Q74: Who is speaking?", ["Two friends", "Teacher and student", "Customer and shop assistant", "Doctor and patient"], "Customer and shop assistant", "会話者「店員と客」(Customer and shop assistant)です。"),

    ("【聴解 Dialogue 3】男: 今日の天気はどうですか。\n女: 午後から雨が降るそうです。\n男: じゃあ傘を持って行きます。\n\n質問 Q75: What is the weather forecast?", ["Snow", "Strong wind", "Rain in the afternoon", "Sunny all day"], "Rain in the afternoon", "予報「午後から雨が降る」が正解です。"),
    ("【聴解 Dialogue 3】男: 今日の天気はどうですか。\n女: 午後から雨が降るそうです。\n男: じゃあ傘を持って行きます。\n\n質問 Q76: What will the man do?", ["Stay home", "Take an umbrella", "Ride a bicycle", "Buy a coat"], "Take an umbrella", "「傘を持って行きます」より Take an umbrella が正解です。"),

    ("【聴解 Dialogue 4】先生: 宿題は来週の月曜日までです。\n学生: 金曜日に出してもいいですか。\n先生: はい、大丈夫です。\n\n質問 Q77: When is the homework due?", ["Friday", "Saturday", "Sunday", "Monday"], "Monday", "宿題の提出期限は「来週の月曜日」(Monday)です。"),
    ("【聴解 Dialogue 4】先生: 宿題は来週の月曜日までです。\n学生: 金曜日に出してもいいですか。\n先生: はい、大丈夫です。\n\n質問 Q78: What does the student ask?", ["To submit early", "To cancel homework", "To change classes", "To leave school"], "To submit early", "金曜日に提出（期限前提出）できるか聞いています。"),

    ("【聴解 Dialogue 5】男: 週末は何をしましたか。\n女: 家族と公園へ行って、昼ご飯を食べました。\n\n質問 Q79: Where did the woman go?", ["Library", "Park", "Station", "Office"], "Park", "会話「公園へ行って」より Park が正解です。"),
    ("【聴解 Dialogue 5】男: 週末は何をしましたか。\n女: 家族と公園へ行って、昼ご飯を食べました。\n\n質問 Q80: Who did she go with?", ["Friends", "Coworkers", "Family", "Alone"], "Family", "会話「家族と」より Family が正解です。"),

    ("【聴解 Dialogue 6】女: パソコンの調子が悪いです。\n男: 電源を入れ直してみましたか。\n女: はい。でもまだ動きません。\n\n質問 Q81: What is the problem?", ["Phone", "Computer", "Television", "Printer"], "Computer", "問題になっている機器は「パソコン」(Computer)です。"),
    ("【聴解 Dialogue 6】女: パソコンの調子が悪いです。\n男: 電源を入れ直してみましたか。\n女: はい。でもまだ動きません。\n\n質問 Q82: What has the woman already tried?", ["Buying a new computer", "Restarting it", "Calling a repair shop", "Updating software"], "Restarting it", "女性が試したのは「電源を入れ直す」(Restarting it)です。"),

    ("【聴解 Dialogue 7】男: 来月旅行に行く予定です。\n女: どこへ行くんですか。\n男: 北海道です。\n\n質問 Q83: Where is the man going?", ["Tokyo", "Osaka", "Hokkaido", "Kyoto"], "Hokkaido", "行き先は「北海道」(Hokkaido)です。"),
    ("【聴解 Dialogue 7】男: 来月旅行に行く予定です。\n女: どこへ行くんですか。\n男: 北海道です。\n\n質問 Q84: When is the trip?", ["This week", "Next month", "Tomorrow", "Next year"], "Next month", "時期は「来月」(Next month)です。"),

    ("【聴解 Dialogue 8】店員: この商品は20％引きです。\n客: では一つお願いします。\n\n質問 Q85: What discount is offered?", ["10%", "15%", "20%", "30%"], "20%", "割引率は「20%引き」(20%)です。"),
    ("【聴解 Dialogue 8】店員: この商品は20％引きです。\n客: では一つお願いします。\n\n質問 Q86: What does the customer decide?", ["Buy one", "Buy two", "Leave the shop", "Ask for another colour"], "Buy one", "客の決定は「一つ購入する」(Buy one)です。"),

    ("【聴解 Dialogue 9】男: 電車が遅れています。\n女: バスで行きましょう。\n\n質問 Q87: Why do they change plans?", ["Heavy rain", "Train delay", "Road closed", "Bus delay"], "Train delay", "変更の理由は「電車が遅れている」(Train delay)からです。"),
    ("【聴解 Dialogue 9】男: 電車が遅れています。\n女: バスで行きましょう。\n\n質問 Q88: How will they travel?", ["Taxi", "Train", "Bus", "Bicycle"], "Bus", "変更後の移動手段は「バス」(Bus)です。"),

    ("【聴解 Dialogue 10】女: レポートは終わりましたか。\n男: あと少しで終わります。\n\n質問 Q89: Has the man finished the report?", ["Yes", "Almost", "No, he hasn't started", "He forgot"], "Almost", "男性の返答「あと少しで終わります」(Almost)が正解です。"),
    ("【聴解 Dialogue 10】女: レポートは終わりましたか。\n男: あと少しで終わります。\n\n質問 Q90: What is the main topic?", ["Homework", "Shopping", "Report completion", "Travel"], "Report completion", "主なテーマは「レポートの完了」(Report completion)です。")
]

for idx, (p, opts, c, expl) in enumerate(listening_items, 46):
    n3_full_questions.append({
        "id": f"jpn3_v1_{idx}",
        "level": "N3",
        "mockSet": "N3_SET_1",
        "type": "LISTENING",
        "prompt": p,
        "options": opts,
        "correctAnswer": c,
        "explanation": expl
    })

print("Generated total official N3 Vol 1 questions count:", len(n3_full_questions))

# Read TimedExamEngine.tsx
with open("components/TimedExamEngine.tsx", "r", encoding="utf-8") as f:
    code = f.read()

# Update catalog N3 item
old_n3_cat = """  {
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

new_n3_cat = """  {
    id: 'n3-mock-1',
    mockSet: 'N3_SET_1',
    level: 'N3',
    language: 'JAPANESE',
    examFormat: 'JLPT_PAPER',
    title: 'JLPT N3 Official Practice Examination - Volume 1',
    japaneseTitle: 'JLPT N3 公式模擬試験 第1巻 (65問)',
    description: 'Complete 65-question official JLPT N3 examination paper (Part B: Grammar Q26-50, Part C: Reading Passages Q51-70, Part D: Listening Dialogues Q71-90).',
    timeLimitMinutes: 70,
    questionCount: 65,
    sections: ['文法 (Grammar Q26-50)', '読解 (Reading Passages Q51-70)', '聴解 (Listening Dialogues Q71-90)'],
    audioCount: 20,
    badgeColor: 'from-amber-600 to-orange-600',
  },"""

code = code.replace(old_n3_cat, new_n3_cat)

# Strip out any old dummy N3/N4 questions from JAPANESE_QUESTIONS and inject n3_full_questions
jp_q_idx = code.find("const JAPANESE_QUESTIONS: ExamQuestion[] = [")
insert_pos = jp_q_idx + len("const JAPANESE_QUESTIONS: ExamQuestion[] = [\n")

# Remove previous temporary N3 questions block if present
code = re.sub(r'  // ===+[\s\S]*?JLPT N3 OFFICIAL FRESH MOCK TEST PAPER[\s\S]*?\n\n', '', code)

n3_v1_ts_str = "  // ==========================================\n"
n3_v1_ts_str += "  // JLPT N3 OFFICIAL PRACTICE BOOK VOLUME 1 (65 QUESTIONS: GRAMMAR, READING, LISTENING)\n"
n3_v1_ts_str += "  // ==========================================\n"
for q in n3_full_questions:
    n3_v1_ts_str += "  " + json.dumps(q, ensure_ascii=False) + ",\n"

code = code[:insert_pos] + n3_v1_ts_str + code[insert_pos:]

with open("components/TimedExamEngine.tsx", "w", encoding="utf-8") as f:
    f.write(code)

print("SUCCESSFULLY_INJECTED_65_N3_OFFICIAL_QUESTIONS")
