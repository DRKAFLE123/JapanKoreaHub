import json, re

# ============================================================
# LESSON 10 VOCABULARY
# ============================================================
l10_data = [
    { "id": "n5_10_01", "lesson": 10, "level": "N5", "word": "男の人", "reading": "おとこのひと", "meaning": "Man", "meaningNepali": "पुरुष / मान्छे", "kanjiCharacters": ["男", "人"], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "あそこにおとこのひとがいます。", "reading": "あそこにおとこのひとがいます。", "english": "There is a man over there.", "nepali": "त्यहाँ एकजना पुरुष हुनुहुन्छ।" }] },
    { "id": "n5_10_02", "lesson": 10, "level": "N5", "word": "女の人", "reading": "おんなのひと", "meaning": "Woman", "meaningNepali": "महिला / स्त्री", "kanjiCharacters": ["女", "人"], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "おんなのひとがはなしています。", "reading": "おんなのひとがはなしています。", "english": "A woman is talking.", "nepali": "एकजना महिला बोल्दै हुनुहुन्छ।" }] },
    { "id": "n5_10_03", "lesson": 10, "level": "N5", "word": "男の子", "reading": "おとこのこ", "meaning": "Boy", "meaningNepali": "केटा (बालक)", "kanjiCharacters": ["男", "子"], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "おとこのこがこうえんであそんでいます。", "reading": "おとこのこがこうえんであそんでいます。", "english": "A boy is playing in the park.", "nepali": "केटा पार्कमा खेल्दैछ।" }] },
    { "id": "n5_10_04", "lesson": 10, "level": "N5", "word": "女の子", "reading": "おんなのこ", "meaning": "Girl", "meaningNepali": "केटी (बालिका)", "kanjiCharacters": ["女", "子"], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "おんなのこがほんをよんでいます。", "reading": "おんなのこがほんをよんでいます。", "english": "A girl is reading a book.", "nepali": "केटी किताब पढ्दैछे।" }] },
    { "id": "n5_10_05", "lesson": 10, "level": "N5", "word": "犬", "reading": "いぬ", "meaning": "Dog", "meaningNepali": "कुकुर", "kanjiCharacters": ["犬"], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "にわにいぬがいます。", "reading": "にわにいぬがいます。", "english": "There is a dog in the garden.", "nepali": "बगैंचामा कुकुर छ।" }] },
    { "id": "n5_10_06", "lesson": 10, "level": "N5", "word": "猫", "reading": "ねこ", "meaning": "Cat", "meaningNepali": "बिरालो", "kanjiCharacters": ["猫"], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "つくえのしたにねこがいます。", "reading": "つくえのしたにねこがいます。", "english": "There is a cat under the desk.", "nepali": "डेस्कको मुनि बिरालो छ।" }] },
    { "id": "n5_10_07", "lesson": 10, "level": "N5", "word": "木", "reading": "き", "meaning": "Tree / Wood", "meaningNepali": "रूख / काठ", "kanjiCharacters": ["木"], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "こうえんに大きなきがあります。", "reading": "こうえんにおおきなきがあります。", "english": "There is a big tree in the park.", "nepali": "पार्कमा एउटा ठूलो रूख छ।" }] },
    { "id": "n5_10_08", "lesson": 10, "level": "N5", "word": "物", "reading": "もの", "meaning": "Thing / Object", "meaningNepali": "चीज / वस्तु", "kanjiCharacters": ["物"], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "はこのなかにいろいろなものがあります。", "reading": "はこのなかにいろいろなものがあります。", "english": "There are various things in the box.", "nepali": "बाकसभित्र विभिन्न चीजहरू छन्।" }] },
    { "id": "n5_10_09", "lesson": 10, "level": "N5", "word": "フィルム", "reading": "フィルム", "meaning": "Film", "meaningNepali": "फिल्म / रिल", "kanjiCharacters": [], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "カメラのフィルムをかいました。", "reading": "カメラのフィルムをかいました。", "english": "I bought camera film.", "nepali": "मैले क्यामेराको रिल किनें।" }] },
    { "id": "n5_10_10", "lesson": 10, "level": "N5", "word": "電池", "reading": "でんち", "meaning": "Battery", "meaningNepali": "ब्याट्री", "kanjiCharacters": ["電", "池"], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "でんちをこうかんします。", "reading": "でんちをこうかんします。", "english": "I will change the battery.", "nepali": "म ब्याट्री फेर्छु।" }] },
    { "id": "n5_10_11", "lesson": 10, "level": "N5", "word": "箱", "reading": "はこ", "meaning": "Box", "meaningNepali": "बाकस / बाक्स", "kanjiCharacters": ["箱"], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "このはこはおもいです。", "reading": "このはこはおもいです。", "english": "This box is heavy.", "nepali": "यो बाकस भारी छ।" }] },
    { "id": "n5_10_12", "lesson": 10, "level": "N5", "word": "スイッチ", "reading": "スイッチ", "meaning": "Switch", "meaningNepali": "स्विच", "kanjiCharacters": [], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "スイッチをおしてください。", "reading": "スイッチをおしてください。", "english": "Please press the switch.", "nepali": "कृपया स्विच थिच्नुहोस्।" }] },
    { "id": "n5_10_13", "lesson": 10, "level": "N5", "word": "冷蔵庫", "reading": "れいぞうこ", "meaning": "Refrigerator / Fridge", "meaningNepali": "फ्रिज / फ्रिज", "kanjiCharacters": ["冷", "蔵", "庫"], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "れいぞうこのなかにみずがあります。", "reading": "れいぞうこのなかにみずがあります。", "english": "There is water in the fridge.", "nepali": "फ्रिजभित्र पानी छ।" }] },
    { "id": "n5_10_14", "lesson": 10, "level": "N5", "word": "テーブル", "reading": "テーブル", "meaning": "Table", "meaningNepali": "टेबुल", "kanjiCharacters": [], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "テーブルのうえにパンがあります。", "reading": "テーブルのうえにパンがあります。", "english": "There is bread on the table.", "nepali": "टेबुलमा पाउरोटी छ।" }] },
    { "id": "n5_10_15", "lesson": 10, "level": "N5", "word": "ベッド", "reading": "ベッド", "meaning": "Bed", "meaningNepali": "खाट / बेड", "kanjiCharacters": [], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "ベッドのうえでねます。", "reading": "ベッドのうえでねます。", "english": "I sleep on the bed.", "nepali": "म खाटमा सुत्छु।" }] },
    { "id": "n5_10_16", "lesson": 10, "level": "N5", "word": "棚", "reading": "たな", "meaning": "Shelf / Bookshelf", "meaningNepali": "दराज / र्याक", "kanjiCharacters": ["棚"], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "たなにほんをならべます。", "reading": "たなにほんをならべます。", "english": "I arrange books on the shelf.", "nepali": "म र्याकमा किताबहरू मिलाउँछु।" }] },
    { "id": "n5_10_17", "lesson": 10, "level": "N5", "word": "ドア", "reading": "ドア", "meaning": "Door", "meaningNepali": "ढोका", "kanjiCharacters": [], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "ドアをあけてください。", "reading": "ドアをあけてください。", "english": "Please open the door.", "nepali": "कृपया ढोका खोल्नुहोस्।" }] },
    { "id": "n5_10_18", "lesson": 10, "level": "N5", "word": "窓", "reading": "まど", "meaning": "Window", "meaningNepali": "झ्याल", "kanjiCharacters": ["窓"], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "まどをしめてください。", "reading": "まどをしめてください。", "english": "Please close the window.", "nepali": "कृपया झ्याल ढोका बन्द गर्नुहोस्।" }] },
    { "id": "n5_10_19", "lesson": 10, "level": "N5", "word": "ポスト", "reading": "ポスト", "meaning": "Postbox / Mailbox", "meaningNepali": "पत्र मञ्जुषा / हुलाक बाकस", "kanjiCharacters": [], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "ポストにてがみをいれました。", "reading": "ポストにてがみをいれました。", "english": "I posted a letter in the mailbox.", "nepali": "मैले हुलाक बाकसमा पत्र खसालेँ।" }] },
    { "id": "n5_10_20", "lesson": 10, "level": "N5", "word": "ビル", "reading": "ビル", "meaning": "Building", "meaningNepali": "भवन / बिल्डिङ", "kanjiCharacters": [], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "たかいビルがたくさんあります。", "reading": "たかいビルがたくさんあります。", "english": "There are many tall buildings.", "nepali": "धेरै अग्ला भवनहरू छन्।" }] },
    { "id": "n5_10_21", "lesson": 10, "level": "N5", "word": "コンビニ", "reading": "コンビニ", "meaning": "Convenience store", "meaningNepali": "सुविधाजनक पसल", "kanjiCharacters": [], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "コンビニでお弁当をかいました。", "reading": "コンビニでおべんとうをかいました。", "english": "I bought a bento at the convenience store.", "nepali": "मैले पसलबाट खाजा किनें।" }] },
    { "id": "n5_10_22", "lesson": 10, "level": "N5", "word": "公園", "reading": "こうえん", "meaning": "Park", "meaningNepali": "पार्क / बगैँचा", "kanjiCharacters": ["公", "園"], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "公園で散歩をします。", "reading": "こうえんでさんぽをします。", "english": "I take a walk in the park.", "nepali": "म पार्कमा घुम्छु।" }] },
    { "id": "n5_10_23", "lesson": 10, "level": "N5", "word": "喫茶店", "reading": "きっさてん", "meaning": "Coffee shop / Cafe", "meaningNepali": "चिया/कफी पसल", "kanjiCharacters": ["喫", "茶", "店"], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "喫茶店でコーヒーを飲みます。", "reading": "きっさてんでコーヒーをのみます。", "english": "I drink coffee at the coffee shop.", "nepali": "म कफी पसलमा कफी पिउँछु।" }] },
    { "id": "n5_10_24", "lesson": 10, "level": "N5", "word": "本屋", "reading": "ほんや", "meaning": "Bookstore", "meaningNepali": "पुस्तक पसल", "kanjiCharacters": ["本", "屋"], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "本屋で辞書を買いました。", "reading": "ほんやでじしょをかいました。", "english": "I bought a dictionary at the bookstore.", "nepali": "मैले पुस्तक पसलबाट शब्दकोश किनें।" }] },
    { "id": "n5_10_25", "lesson": 10, "level": "N5", "word": "乗り場", "reading": "のりば", "meaning": "Bus stop / Taxi stand / Platform", "meaningNepali": "चढ्ने ठाउँ / बिसौनी", "kanjiCharacters": ["乗", "場"], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "タクシーの乗り場はあそこです。", "reading": "タクシーののりばはあそこです。", "english": "The taxi stand is over there.", "nepali": "ट्याक्सी चढ्ने ठाउँ त्यहाँ छ।" }] },
    { "id": "n5_10_26", "lesson": 10, "level": "N5", "word": "県", "reading": "けん", "meaning": "Prefecture", "meaningNepali": "अञ्चल / प्रदेश", "kanjiCharacters": ["県"], "partOfSpeech": "Suffix",
      "grammarSentences": [{ "japanese": "わたしはかながわけんにすんでいます。", "reading": "わたしはかながわけんにすんでいます。", "english": "I live in Kanagawa Prefecture.", "nepali": "म कानागावा प्रदेशमा बस्छु।" }] },
    { "id": "n5_10_27", "lesson": 10, "level": "N5", "word": "上", "reading": "うえ", "meaning": "On / Above / Top", "meaningNepali": "माथि", "kanjiCharacters": ["上"], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "机の上に本があります。", "reading": "つくえのうえにほんがあります。", "english": "There is a book on the desk.", "nepali": "डेस्कमाथि किताब छ।" }] },
    { "id": "n5_10_28", "lesson": 10, "level": "N5", "word": "下", "reading": "した", "meaning": "Under / Below / Bottom", "meaningNepali": "मुनि / तल", "kanjiCharacters": ["下"], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "椅子の下に猫がいます。", "reading": "いすのしたにねこがいます。", "english": "There is a cat under the chair.", "nepali": "कुर्सीको मुनि बिरालो छ।" }] },
    { "id": "n5_10_29", "lesson": 10, "level": "N5", "word": "前", "reading": "まえ", "meaning": "Front / Before", "meaningNepali": "अगाडि", "kanjiCharacters": ["前"], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "駅の前に人がたくさんいます。", "reading": "えきのまえにひとがたくさんいます。", "english": "There are many people in front of the station.", "nepali": "स्टेशन अगाडि धेरै मान्छेहरू छन्।" }] },
    { "id": "n5_10_30", "lesson": 10, "level": "N5", "word": "後ろ", "reading": "うしろ", "meaning": "Back / Behind", "meaningNepali": "पछाडि", "kanjiCharacters": ["後"], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "私の後ろに誰かがいます。", "reading": "わたしのうしろにだれかがいます。", "english": "There is someone behind me.", "nepali": "मेरो पछाडि कोही छ।" }] },
    { "id": "n5_10_31", "lesson": 10, "level": "N5", "word": "右", "reading": "みぎ", "meaning": "Right side", "meaningNepali": "दायाँ", "kanjiCharacters": ["右"], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "右へ曲がってください。", "reading": "みぎへまがってください。", "english": "Please turn to the right.", "nepali": "कृपया दायाँ मोडिनुहोस्।" }] },
    { "id": "n5_10_32", "lesson": 10, "level": "N5", "word": "左", "reading": "ひだり", "meaning": "Left side", "meaningNepali": "बायाँ", "kanjiCharacters": ["左"], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "左に交番があります。", "reading": "ひだりにこうばんがあります。", "english": "There is a police box on the left.", "nepali": "बायाँतर्फ प्रहरी चौकी छ।" }] },
    { "id": "n5_10_33", "lesson": 10, "level": "N5", "word": "中", "reading": "なか", "meaning": "Inside / In", "meaningNepali": "भित्र", "kanjiCharacters": ["中"], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "カバンのの中に鍵があります。", "reading": "カバンのなかにかぎがあります。", "english": "There is a key inside the bag.", "nepali": "झोलाभित्र साँचो छ।" }] },
    { "id": "n5_10_34", "lesson": 10, "level": "N5", "word": "外", "reading": "そと", "meaning": "Outside", "meaningNepali": "बाहिर", "kanjiCharacters": ["外"], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "部屋の外に出ます。", "reading": "へやのそとにでます。", "english": "I go outside the room.", "nepali": "म कोठा बाहिर जान्छु।" }] },
    { "id": "n5_10_35", "lesson": 10, "level": "N5", "word": "隣", "reading": "となり", "meaning": "Next to / Neighbor", "meaningNepali": "छेउमा / छेउको", "kanjiCharacters": ["隣"], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "銀行の隣に郵便局があります。", "reading": "ぎんこうのとなりにごうびんきょくがあります。", "english": "There is a post office next to the bank.", "nepali": "बैंकको छेउमा हुलाक घर छ।" }] },
    { "id": "n5_10_36", "lesson": 10, "level": "N5", "word": "近く", "reading": "ちかく", "meaning": "Near / Vicinity", "meaningNepali": "नजिकै", "kanjiCharacters": ["近"], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "家の近くにスーパーがあります。", "reading": "うちのちかくにスーパーがあります。", "english": "There is a supermarket near my house.", "nepali": "घर नजिकै सुपरमार्केट छ।" }] },
    { "id": "n5_10_37", "lesson": 10, "level": "N5", "word": "間", "reading": "あいだ", "meaning": "Between", "meaningNepali": "बीचमा", "kanjiCharacters": ["間"], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "本屋とデパートの間にあります。", "reading": "ほんやとデパートのあいだにあります。", "english": "It is between the bookstore and department store.", "nepali": "यो पुस्तक पसल र डिपार्टमेन्ट स्टोरको बीचमा छ।" }] },
    { "id": "n5_10_38", "lesson": 10, "level": "N5", "word": "〜や〜［など］", "reading": "〜や〜［など］", "meaning": "~ and ~, etc.", "meaningNepali": "~ र ~ [आदि]", "kanjiCharacters": [], "partOfSpeech": "Particle",
      "grammarSentences": [{ "japanese": "箱の中に本やペンなどがあります。", "reading": "はこのなかにほんやペンなどがあります。", "english": "There are books, pens, etc. in the box.", "nepali": "बाकसभित्र किताब र कलम आदि छन्।" }] }
]

# Update n5-lessons-6to10.ts
with open("lib/n5-lessons-6to10.ts", "r", encoding="utf-8") as f:
    l6_10_text = f.read()

m_pos = l6_10_text.find("// LESSON 10 — Existence & Positional Location")
base_text_6to10 = l6_10_text[:m_pos]

l10_ts = "// LESSON 10 — Existence & Positional Location\n  // Grammar: N が あります/います  ·  N1 (place) に N2 が あります/います\n  // ════════════════════════════════════════════════════════\n"
for item in l10_data:
    l10_ts += "  " + json.dumps(item, ensure_ascii=False) + ",\n"

new_l6_10 = base_text_6to10 + l10_ts + "];\n"

with open("lib/n5-lessons-6to10.ts", "w", encoding="utf-8") as f:
    f.write(new_l6_10)

print("Updated Lesson 10 in lib/n5-lessons-6to10.ts!")
