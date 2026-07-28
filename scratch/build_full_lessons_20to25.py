import json, re

# ============================================================
# LESSON 20 VOCABULARY
# ============================================================
l20_data = [
    { "id": "n5_20_01", "lesson": 20, "level": "N5", "word": "要ります", "reading": "いります", "meaning": "Need / Require (a visa)", "meaningNepali": "चाहिनु / आवश्यकता हुनु", "kanjiCharacters": ["要"], "partOfSpeech": "Verb (Group 1)",
      "grammarSentences": [{ "japanese": "日本へ行くのにビザが要ります。", "reading": "にほんへいくのにビザがいります。", "english": "I need a visa to go to Japan.", "nepali": "जापान जान भिसा चाहिन्छ।" }] },
    { "id": "n5_20_02", "lesson": 20, "level": "N5", "word": "調べます", "reading": "しらべます", "meaning": "Investigate / Check / Look up", "meaningNepali": "जाँच गर्नु / खोजी गर्नु", "kanjiCharacters": ["調"], "partOfSpeech": "Verb (Group 2)",
      "grammarSentences": [{ "japanese": "辞書で意味を調べます。", "reading": "じしょでいみをしらべます。", "english": "I look up the meaning in a dictionary.", "nepali": "म शब्दकोशमा अर्थ खोज्छु।" }] },
    { "id": "n5_20_03", "lesson": 20, "level": "N5", "word": "修理します", "reading": "しゅうりします", "meaning": "Repair / Fix", "meaningNepali": "मर्मत गर्नु", "kanjiCharacters": ["修", "理"], "partOfSpeech": "Verb (Irregular)",
      "grammarSentences": [{ "japanese": "壊れた自転車を修理します。", "reading": "こわれたじてんしゃをしゅうりします。", "english": "I repair the broken bicycle.", "nepali": "म बिग्रिएको साइकल मर्मत गर्छु।" }] },
    { "id": "n5_20_04", "lesson": 20, "level": "N5", "word": "僕", "reading": "ぼく", "meaning": "I (used by males informally)", "meaningNepali": "म (पुरुषहरूको प्रयोग)", "kanjiCharacters": ["僕"], "partOfSpeech": "Pronoun",
      "grammarSentences": [{ "japanese": "僕も一緒に行くよ。", "reading": "ぼくにいっしょにいくよ。", "english": "I'll go together too.", "nepali": "म पनि सँगै जान्छु।" }] },
    { "id": "n5_20_05", "lesson": 20, "level": "N5", "word": "君", "reading": "きみ", "meaning": "You (informal)", "meaningNepali": "तिमी (साथी/सानालाई)", "kanjiCharacters": ["君"], "partOfSpeech": "Pronoun",
      "grammarSentences": [{ "japanese": "君はどこへ行くの？", "reading": "きみはどこへいくの？", "english": "Where are you going?", "nepali": "तिमी कहाँ जाँदैछौ?" }] },
    { "id": "n5_20_06", "lesson": 20, "level": "N5", "word": "〜君", "reading": "〜くん", "meaning": "Mr. / Boy suffix", "meaningNepali": "~ बाबु / साथी (केटाहरूको लागि)", "kanjiCharacters": ["君"], "partOfSpeech": "Suffix",
      "grammarSentences": [{ "japanese": "山田君、元気？", "reading": "やまだくん、げんき？", "english": "Yamada-kun, how are you?", "nepali": "यामादा बाबु, कस्तो छ?" }] },
    { "id": "n5_20_07", "lesson": 20, "level": "N5", "word": "うん", "reading": "うん", "meaning": "Yes (casual)", "meaningNepali": "अँ / हो (अनौपचारिक)", "kanjiCharacters": [], "partOfSpeech": "Expression",
      "grammarSentences": [{ "japanese": "うん、わかった。", "reading": "うん、わかった。", "english": "Yeah, I understood.", "nepali": "अँ, मैले बुझें।" }] },
    { "id": "n5_20_08", "lesson": 20, "level": "N5", "word": "うーん", "reading": "うーん", "meaning": "Well / Let me see...", "meaningNepali": "अँ... (सोच्दा)", "kanjiCharacters": [], "partOfSpeech": "Expression",
      "grammarSentences": [{ "japanese": "うーん、どうしようかな。", "reading": "うーん、どうしようかな。", "english": "Hmm, what should I do...", "nepali": "अँ... के गरौँ त होला।" }] },
    { "id": "n5_20_09", "lesson": 20, "level": "N5", "word": "ううん", "reading": "ううん", "meaning": "No (casual)", "meaningNepali": "अहँ / होइन (अनौपचारिक)", "kanjiCharacters": [], "partOfSpeech": "Expression",
      "grammarSentences": [{ "japanese": "ううん、行かない。", "reading": "ううん、いかない。", "english": "No, I'm not going.", "nepali": "अहँ, जान्न।" }] },
    { "id": "n5_20_10", "lesson": 20, "level": "N5", "word": "言葉", "reading": "ことば", "meaning": "Word / Language", "meaningNepali": "शब्द / भाषा", "kanjiCharacters": ["言", "葉"], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "日本の言葉を勉強します。", "reading": "にほんのことばをべんきょうします。", "english": "I study the Japanese language.", "nepali": "म जापानी भाषा पढ्छु।" }] },
    { "id": "n5_20_11", "lesson": 20, "level": "N5", "word": "物価", "reading": "ぶっか", "meaning": "Commodity prices", "meaningNepali": "वस्तुको मूल्य / महँगी", "kanjiCharacters": ["物", "価"], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "東京は物価が高いです。", "reading": "とうきょうはぶっかがたかいです。", "english": "Prices in Tokyo are high.", "nepali": "टोकियोमा महँगी छ।" }] },
    { "id": "n5_20_12", "lesson": 20, "level": "N5", "word": "着物", "reading": "きもの", "meaning": "Kimono (Japanese traditional clothes)", "meaningNepali": "किमोनो (जापानी पोशाक)", "kanjiCharacters": ["着", "物"], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "きれいな着物を着ています。", "reading": "きれいなきものをきています。", "english": "She is wearing a beautiful kimono.", "nepali": "उहाँले सुन्दर किमोनो लगाउनुभएको छ।" }] },
    { "id": "n5_20_13", "lesson": 20, "level": "N5", "word": "ビザ", "reading": "ビザ", "meaning": "Visa", "meaningNepali": "भिसा", "kanjiCharacters": [], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "ビザを申請しました。", "reading": "ビザをしんせいしました。", "english": "I applied for a visa.", "nepali": "मैले भिसा आवेदन दिएँ।" }] },
    { "id": "n5_20_14", "lesson": 20, "level": "N5", "word": "始まり", "reading": "はじまり", "meaning": "Beginning / Start", "meaningNepali": "शुरुवात", "kanjiCharacters": ["始"], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "映画の始まりに間に合いました。", "reading": "えいがのはじまりにまにあいました。", "english": "I made it in time for the start of the movie.", "nepali": "म फिल्मको सुरुवातमा समयमै पुगें।" }] },
    { "id": "n5_20_15", "lesson": 20, "level": "N5", "word": "終わり", "reading": "おわり", "meaning": "End / Finish", "meaningNepali": "अन्त्य / समाप्ति", "kanjiCharacters": ["終"], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "仕事の終わりに飲みに行きます。", "reading": "しごとのおわりにのみにいきます。", "english": "I go for a drink at the end of work.", "nepali": "म कामको अन्त्यमा पिउन जान्छु।" }] },
    { "id": "n5_20_16", "lesson": 20, "level": "N5", "word": "こっち", "reading": "こっち", "meaning": "This way / Here (casual)", "meaningNepali": "यता / यहाँ (अनौपचारिक)", "kanjiCharacters": [], "partOfSpeech": "Pronoun",
      "grammarSentences": [{ "japanese": "こっちへ来て！", "reading": "こっちへきて！", "english": "Come over here! (casual)", "nepali": "यता आऊ!" }] },
    { "id": "n5_20_17", "lesson": 20, "level": "N5", "word": "そっち", "reading": "そっち", "meaning": "That way / There (casual)", "meaningNepali": "उता / त्यहाँ (अनौपचारिक)", "kanjiCharacters": [], "partOfSpeech": "Pronoun",
      "grammarSentences": [{ "japanese": "そっちは危ないよ。", "reading": "そっちはあぶないよ。", "english": "That way is dangerous. (casual)", "nepali": "उता खतरा छ।" }] },
    { "id": "n5_20_18", "lesson": 20, "level": "N5", "word": "あっち", "reading": "あっち", "meaning": "That way over there (casual)", "meaningNepali": "उता टाढा (अनौपचारिक)", "kanjiCharacters": [], "partOfSpeech": "Pronoun",
      "grammarSentences": [{ "japanese": "あっちへ行こう。", "reading": "あっちへいこう。", "english": "Let's go over there. (casual)", "nepali": "उता टाढा जाऔँ।" }] },
    { "id": "n5_20_19", "lesson": 20, "level": "N5", "word": "どっち", "reading": "どっち", "meaning": "Which way / Which one (casual)", "meaningNepali": "कुन / कता (अनौपचारिक)", "kanjiCharacters": [], "partOfSpeech": "Pronoun",
      "grammarSentences": [{ "japanese": "どっちがいい？", "reading": "どっちがいい？", "english": "Which one do you prefer?", "nepali": "कुन राम्रो छ?" }] },
    { "id": "n5_20_20", "lesson": 20, "level": "N5", "word": "みんなで", "reading": "みんなで", "meaning": "All together / Everyone", "meaningNepali": "सबै जना मिलेर", "kanjiCharacters": [], "partOfSpeech": "Adverb",
      "grammarSentences": [{ "japanese": "みんなで写真を撮りました。", "reading": "みんなでしゃしんをとりました。", "english": "We took a photo all together.", "nepali": "हामी सबै जना मिलेर फोटो खिच्यौँ।" }] },
    { "id": "n5_20_21", "lesson": 20, "level": "N5", "word": "〜けど", "reading": "〜けど", "meaning": "..., but (casual)", "meaningNepali": "..., तर (अनौपचारिक)", "kanjiCharacters": [], "partOfSpeech": "Conjunction",
      "grammarSentences": [{ "japanese": "高いけど、美味しいよ。", "reading": "たかいけど、おいしいよ。", "english": "It's expensive, but delicious.", "nepali": "महँगो छ तर मिठो छ।" }] },
    { "id": "n5_20_22", "lesson": 20, "level": "N5", "word": "お腹がいっぱいです", "reading": "おなかがいっぱいです", "meaning": "Full (stomach)", "meaningNepali": "पेट भरियो", "kanjiCharacters": ["腹"], "partOfSpeech": "Expression",
      "grammarSentences": [{ "japanese": "もうお腹がいっぱいです。", "reading": "もうおなかがいっぱいです。", "english": "I'm already full.", "nepali": "अहिले मेरो पेट भरिसक्यो।" }] },
    { "id": "n5_20_23", "lesson": 20, "level": "N5", "word": "よかったら", "reading": "よかったら", "meaning": "If you like", "meaningNepali": "मन परेमा / सम्भव भए", "kanjiCharacters": [], "partOfSpeech": "Expression",
      "grammarSentences": [{ "japanese": "よかったら一緒に行きませんか。", "reading": "よかったらいっしょにいきませんか。", "english": "If you like, would you like to go together?", "nepali": "मन परेमा सँगै जाने हो?" }] },
    { "id": "n5_20_24", "lesson": 20, "level": "N5", "word": "色々な", "reading": "いろいろな", "meaning": "Various / Diverse", "meaningNepali": "विभिन्न / थरीथरीका", "kanjiCharacters": ["色"], "partOfSpeech": "Na-Adjective",
      "grammarSentences": [{ "japanese": "色々な国へ行きたいです。", "reading": "いろいろなくにへいきたいです。", "english": "I want to go to various countries.", "nepali": "म विभिन्न देशहरूमा जान चाहन्छु।" }] },
    { "id": "n5_20_25", "lesson": 20, "level": "N5", "word": "サラリーマン", "reading": "サラリーマン", "meaning": "Company worker / Salaryman", "meaningNepali": "जागिरे / कम्पनी कर्मचारी", "kanjiCharacters": [], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "父は日本のサラリーマンです。", "reading": "ちちはにほんのサラリーマンです。", "english": "My father is a Japanese company worker.", "nepali": "मेरो बुबा जापानी कम्पनीको कर्मचारी हुनुहुन्छ।" }] }
]

# Write updated Lesson 20 into n5-lessons-16to20.ts
with open("lib/n5-lessons-16to20.ts", "r", encoding="utf-8") as f:
    l16_20_text = f.read()

# Replace Lesson 20 portion
l20_marker = "// LESSON 20 — Informal / Plain Style Expressions"
marker_pos = l16_20_text.find(l20_marker)
base_text = l16_20_text[:marker_pos]

l20_ts = l20_marker + "\n  // Grammar: Plain forms in conversation (たべない, たべた, たべなかった etc.)\n  // ════════════════════════════════════════════════════════\n"
for item in l20_data:
    l20_ts += "  " + json.dumps(item, ensure_ascii=False) + ",\n"

new_l16_20 = base_text + l20_ts + "];\n"

with open("lib/n5-lessons-16to20.ts", "w", encoding="utf-8") as f:
    f.write(new_l16_20)

print("Updated lib/n5-lessons-16to20.ts with 25 complete Lesson 20 vocabulary words!")

# ============================================================
# LESSONS 21-25 VOCABULARY
# ============================================================
l21_data = [
    { "id": "n5_21_01", "lesson": 21, "level": "N5", "word": "思います", "reading": "おもいます", "meaning": "Think / Suppose", "meaningNepali": "सोच्नु / विचार गर्नु", "kanjiCharacters": ["思"], "partOfSpeech": "Verb (Group 1)",
      "grammarSentences": [{ "japanese": "あしたは雨が降ると思います。", "reading": "あしたはあめがふるとおもいます。", "english": "I think it will rain tomorrow.", "nepali": "मलाई लाग्छ भोलि पानी पर्छ।" }] },
    { "id": "n5_21_02", "lesson": 21, "level": "N5", "word": "言います", "reading": "いいまし", "meaning": "Say / State", "meaningNepali": "भन्नु", "kanjiCharacters": ["言"], "partOfSpeech": "Verb (Group 1)",
      "grammarSentences": [{ "japanese": "ミラーさんは「来週出張する」と言いました。", "reading": "ミラーさんは「らいしゅうしゅっちょうする」といいました。", "english": "Mr. Miller said that he would go on a business trip next week.", "nepali": "मिलर-जीले अर्को हप्ता व्यापारिक भ्रमणमा जान्छु भन्नुभयो।" }] },
    { "id": "n5_21_03", "lesson": 21, "level": "N5", "word": "勝ちます", "reading": "かちます", "meaning": "Win", "meaningNepali": "जित्नु", "kanjiCharacters": ["勝"], "partOfSpeech": "Verb (Group 1)",
      "grammarSentences": [{ "japanese": "試合に勝ちました。", "reading": "しあいにかちました。", "english": "We won the match.", "nepali": "हामीले खेल जित्यौँ।" }] },
    { "id": "n5_21_04", "lesson": 21, "level": "N5", "word": "負けます", "reading": "まけます", "meaning": "Lose / Be defeated", "meaningNepali": "हार्नु", "kanjiCharacters": ["負"], "partOfSpeech": "Verb (Group 2)",
      "grammarSentences": [{ "japanese": "試合に負けました。", "reading": "しあいにまけました。", "english": "We lost the match.", "nepali": "हामीले खेल हार्यौँ।" }] },
    { "id": "n5_21_05", "lesson": 21, "level": "N5", "word": "有ります", "reading": "あります", "meaning": "Take place / Be held (festival, party)", "meaningNepali": "हुनु (उत्सव/कार्यक्रम)", "kanjiCharacters": ["有"], "partOfSpeech": "Verb (Group 1)",
      "grammarSentences": [{ "japanese": "明日お祭りがあります。", "reading": "あしたおまつりがあります。", "english": "There is a festival tomorrow.", "nepali": "भोलि उत्सव छ।" }] },
    { "id": "n5_21_06", "lesson": 21, "level": "N5", "word": "役に立ちます", "reading": "やくにたちます", "meaning": "Be useful / Help", "meaningNepali": "उपयोगी हुनु / काम लाग्नु", "kanjiCharacters": ["役", "立"], "partOfSpeech": "Verb (Group 1)",
      "grammarSentences": [{ "japanese": "この辞書はとても役に立ちます。", "reading": "このじしょはとてもやくにたちます。", "english": "This dictionary is very useful.", "nepali": "यो शब्दकोश धेरै उपयोगी छ।" }] },
    { "id": "n5_21_07", "lesson": 21, "level": "N5", "word": "動きます", "reading": "うごきます", "meaning": "Move / Work (machine)", "meaningNepali": "चल्नु (मेसिन आदि)", "kanjiCharacters": ["動"], "partOfSpeech": "Verb (Group 1)",
      "grammarSentences": [{ "japanese": "エレベーターが動きません。", "reading": "エレベーターがうごきません。", "english": "The elevator is not working.", "nepali": "लिफ्ट चलेको छैन।" }] },
    { "id": "n5_21_08", "lesson": 21, "level": "N5", "word": "辞めます", "reading": "やめます", "meaning": "Quit / Stop (company, smoking)", "meaningNepali": "छोड्नु (काम/चुरोट)", "kanjiCharacters": ["辞"], "partOfSpeech": "Verb (Group 2)",
      "grammarSentences": [{ "japanese": "会社を辞めました。", "reading": "かいしゃをやめました。", "english": "I quit the company.", "nepali": "मैले कम्पनीको काम छोडें।" }] },
    { "id": "n5_21_09", "lesson": 21, "level": "N5", "word": "気をつけます", "reading": "きをつけます", "meaning": "Pay attention / Be careful", "meaningNepali": "होशियार हुनु / ध्यान दिनु", "kanjiCharacters": ["気"], "partOfSpeech": "Verb (Group 2)",
      "grammarSentences": [{ "japanese": "車に気をつけてください。", "reading": "くるまにきをつけてください。", "english": "Please be careful of cars.", "nepali": "कृपया गाडीहरूबाट होशियार रहनुहोस्।" }] },
    { "id": "n5_21_10", "lesson": 21, "level": "N5", "word": "留学します", "reading": "りゅうがくします", "meaning": "Study abroad", "meaningNepali": "विदेशमा पढ्नु", "kanjiCharacters": ["留", "学"], "partOfSpeech": "Verb (Irregular)",
      "grammarSentences": [{ "japanese": "日本へ留学したいです。", "reading": "にほんへりゅうがくしたいです。", "english": "I want to study abroad in Japan.", "nepali": "म जापानमा अध्ययन गर्न जान चाहन्छु।" }] },
    { "id": "n5_21_11", "lesson": 21, "level": "N5", "word": "無駄な", "reading": "むだな", "meaning": "Wasteful / Useless", "meaningNepali": "व्यर्थ / खेर जाने", "kanjiCharacters": ["無", "駄"], "partOfSpeech": "Na-Adjective",
      "grammarSentences": [{ "japanese": "時間を無駄にしないでください。", "reading": "じかんをむだにしないでください。", "english": "Please do not waste time.", "nepali": "कृपया समय खेर नफाल्नुहोस्।" }] },
    { "id": "n5_21_12", "lesson": 21, "level": "N5", "word": "不便な", "reading": "ふべんな", "meaning": "Inconvenient", "meaningNepali": "असुविधाजनक", "kanjiCharacters": ["不", "便"], "partOfSpeech": "Na-Adjective",
      "grammarSentences": [{ "japanese": "ここは交通が不便です。", "reading": "ここはこうつうがふべんです。", "english": "Transportation here is inconvenient.", "nepali": "यहाँ यातायात असुविधाजनक छ।" }] },
    { "id": "n5_21_13", "lesson": 21, "level": "N5", "word": "すごい", "reading": "すごい", "meaning": "Great / Amazing / Awful", "meaningNepali": "अद्भुत / साह्रै राम्रो", "kanjiCharacters": [], "partOfSpeech": "I-Adjective",
      "grammarSentences": [{ "japanese": "あの人はすごいです。", "reading": "あのひとはすごいです。", "english": "That person is amazing.", "nepali": "त्यो मान्छे अद्भुत हुनुहुन्छ।" }] },
    { "id": "n5_21_14", "lesson": 21, "level": "N5", "word": "本当", "reading": "ほんとう", "meaning": "Truth / Reality", "meaningNepali": "साँचो / सत्य", "kanjiCharacters": ["本", "当"], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "それは本当ですか。", "reading": "それはほんとうですか。", "english": "Is that true?", "nepali": "के त्यो साँचो हो?" }] },
    { "id": "n5_21_15", "lesson": 21, "level": "N5", "word": "嘘", "reading": "うそ", "meaning": "Lie / Untruth", "meaningNepali": "झूट", "kanjiCharacters": ["嘘"], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "嘘をついてはいけません。", "reading": "うそをついてはいけません。", "english": "You must not tell a lie.", "nepali": "झूट बोल्नु हुँदैन।" }] },
    { "id": "n5_21_16", "lesson": 21, "level": "N5", "word": "自動車", "reading": "じどうしゃ", "meaning": "Automobile / Car", "meaningNepali": "गाडी / कार", "kanjiCharacters": ["自", "動", "車"], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "自動車会社で働いています。", "reading": "じどうしゃかいしゃではたらいています。", "english": "I work at an automobile company.", "nepali": "म गाडी कम्पनीमा काम गर्छु।" }] },
    { "id": "n5_21_17", "lesson": 21, "level": "N5", "word": "交通", "reading": "こうつう", "meaning": "Traffic / Transportation", "meaningNepali": "यातायात", "kanjiCharacters": ["交", "通"], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "交通ルールを守ります。", "reading": "こうつうルールをまもります。", "english": "I follow traffic rules.", "nepali": "म यातायातको नियम पालना गर्छु।" }] },
    { "id": "n5_21_18", "lesson": 21, "level": "N5", "word": "物価", "reading": "ぶっか", "meaning": "Commodity prices", "meaningNepali": "वस्तुको मूल्य", "kanjiCharacters": ["物", "価"], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "物価が上がりました。", "reading": "ぶっかがあがりました。", "english": "Prices have gone up.", "nepali": "मूल्य बढेको छ।" }] },
    { "id": "n5_21_19", "lesson": 21, "level": "N5", "word": "放送", "reading": "ほうそう", "meaning": "Broadcast / News announcement", "meaningNepali": "प्रसारण", "kanjiCharacters": ["放", "送"], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "ニュースの放送を聞きます。", "reading": "ニュースのほうそうをききます。", "english": "I listen to the news broadcast.", "nepali": "म समाचार प्रसारण सुन्छु।" }] },
    { "id": "n5_21_20", "lesson": 21, "level": "N5", "word": "ニュース", "reading": "ニュース", "meaning": "News", "meaningNepali": "समाचार", "kanjiCharacters": [], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "毎晩ニュースを見ます。", "reading": "まいばんニュースをみます。", "english": "I watch the news every evening.", "nepali": "म हरेक साँझ समाचार हेर्छु।" }] },
    { "id": "n5_21_21", "lesson": 21, "level": "N5", "word": "アニメ", "reading": "アニメ", "meaning": "Anime / Animation", "meaningNepali": "एनिमेसन", "kanjiCharacters": [], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "日本のアニメが好きです。", "reading": "にほんのアニメがすきです。", "english": "I like Japanese anime.", "nepali": "मलाई जापानी एनिमे मन पर्छ।" }] },
    { "id": "n5_21_22", "lesson": 21, "level": "N5", "word": "漫画", "reading": "まんが", "meaning": "Manga / Comic book", "meaningNepali": "मान्गा / कमिक पुस्तक", "kanjiCharacters": ["漫", "画"], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "日本語の漫画を読みます。", "reading": "にほんごのまんかをよみます。", "english": "I read Japanese manga.", "nepali": "म जापानी कमिक पुस्तक पढ्छु।" }] },
    { "id": "n5_21_23", "lesson": 21, "level": "N5", "word": "デザイン", "reading": "デザイン", "meaning": "Design", "meaningNepali": "डिजाइन", "kanjiCharacters": [], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "この車はデザインがいいです。", "reading": "このくるまはデザインがいいです。", "english": "This car has a good design.", "nepali": "यो कारको डिजाइन राम्रो छ।" }] },
    { "id": "n5_21_24", "lesson": 21, "level": "N5", "word": "夢", "reading": "ゆめ", "meaning": "Dream", "meaningNepali": "सपना", "kanjiCharacters": ["夢"], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "わたしの夢は歌手になることです。", "reading": "わたしのゆめはかしゅになることです。", "english": "My dream is to become a singer.", "nepali": "मेरो सपना गायक बन्नु हो।" }] },
    { "id": "n5_21_25", "lesson": 21, "level": "N5", "word": "天才", "reading": "てんさい", "meaning": "Genius", "meaningNepali": "प्रतिभाशाली / जिनियस", "kanjiCharacters": ["天", "才"], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "彼は数学の天才です。", "reading": "かれはすうがくのてんさいです。", "english": "He is a math genius.", "nepali": "उहाँ गणितको जिनियस हुनुहुन्छ।" }] },
    { "id": "n5_21_26", "lesson": 21, "level": "N5", "word": "試合", "reading": "しあい", "meaning": "Match / Game", "meaningNepali": "खेल / म्याच", "kanjiCharacters": ["試", "合"], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "サッカーの試合を見に行きます。", "reading": "サッカーのしあいをみにいきます。", "english": "I go to watch a soccer match.", "nepali": "म फुटबल खेल हेर्न जान्छु।" }] },
    { "id": "n5_21_27", "lesson": 21, "level": "N5", "word": "意見", "reading": "いけん", "meaning": "Opinion", "meaningNepali": "विचार / राय", "kanjiCharacters": ["意", "見"], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "自分の意見を言います。", "reading": "じぶんのいけんをいいまし。", "english": "I state my own opinion.", "nepali": "म आफ्नो विचार व्यक्त गर्छु।" }] },
    { "id": "n5_21_28", "lesson": 21, "level": "N5", "word": "話", "reading": "はなし", "meaning": "Talk / Story / Conversation", "meaningNepali": "कुराकानी / कथा", "kanjiCharacters": ["話"], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "先生の話を聞きます。", "reading": "せんせいのはなしをききます。", "english": "I listen to the teacher's story.", "nepali": "म गुरुको कुरा सुन्छु।" }] },
    { "id": "n5_21_29", "lesson": 21, "level": "N5", "word": "地球", "reading": "ちきゅう", "meaning": "Earth / Planet", "meaningNepali": "पृथ्वी", "kanjiCharacters": ["地", "球"], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "地球環境を守ります。", "reading": "ちきゅうかんきょうをまもります。", "english": "We protect the Earth's environment.", "nepali": "हामी पृथ्वीको वातावरण जोगाउँछौँ।" }] },
    { "id": "n5_21_30", "lesson": 21, "level": "N5", "word": "月", "reading": "つき", "meaning": "Moon", "meaningNepali": "चन्द्रमा", "kanjiCharacters": ["月"], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "今夜は月がきれいです。", "reading": "こんやはつきがきれいです。", "english": "The moon is beautiful tonight.", "nepali": "आज राति चन्द्रमा सुन्दर छ।" }] },
    { "id": "n5_21_31", "lesson": 21, "level": "N5", "word": "最近", "reading": "さいきん", "meaning": "Recently / Nowadays", "meaningNepali": "हालसालै", "kanjiCharacters": ["最", "近"], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "最近忙しいです。", "reading": "さいきんいそがしいです。", "english": "I have been busy recently.", "nepali": "हालसालै म व्यस्त छु।" }] },
    { "id": "n5_21_32", "lesson": 21, "level": "N5", "word": "多分", "reading": "たぶん", "meaning": "Probably / Perhaps", "meaningNepali": "शायद", "kanjiCharacters": ["多", "分"], "partOfSpeech": "Adverb",
      "grammarSentences": [{ "japanese": "多分明日は晴れるでしょう。", "reading": "たぶんあしたははれるでしょう。", "english": "It will probably be fine tomorrow.", "nepali": "शायद भोलि घाम लाग्छ।" }] },
    { "id": "n5_21_33", "lesson": 21, "level": "N5", "word": "きっと", "reading": "きっと", "meaning": "Surely / Definitely", "meaningNepali": "निश्चय नै", "kanjiCharacters": [], "partOfSpeech": "Adverb",
      "grammarSentences": [{ "japanese": "きっと合格すると思います。", "reading": "きっとごうかくするとおもいます。", "english": "I think you will surely pass.", "nepali": "मलाई लाग्छ तपाईं निश्चय नै पास हुनुहुनेछ।" }] },
    { "id": "n5_21_34", "lesson": 21, "level": "N5", "word": "本当に", "reading": "ほんとうに", "meaning": "Really / Truly", "meaningNepali": "साँचै नै", "kanjiCharacters": ["本", "当"], "partOfSpeech": "Adverb",
      "grammarSentences": [{ "japanese": "本当にありがとうございます。", "reading": "ほんとうにありがとうございます。", "english": "Thank you very much indeed.", "nepali": "साँचै नै धेरै धेरै धन्यवाद।" }] },
    { "id": "n5_21_35", "lesson": 21, "level": "N5", "word": "そんなに", "reading": "そんなに", "meaning": "Not so much (used with negative)", "meaningNepali": "त्यति धेरै (नकारात्मक)", "kanjiCharacters": [], "partOfSpeech": "Adverb",
      "grammarSentences": [{ "japanese": "そんなに難しくないです。", "reading": "そんなにむずかしくないです。", "english": "It is not so difficult.", "nepali": "त्यति धेरै गाह्रो छैन।" }] },
    { "id": "n5_21_36", "lesson": 21, "level": "N5", "word": "〜について", "reading": "〜について", "meaning": "About ~ / Concerning ~", "meaningNepali": "~ को बारेमा", "kanjiCharacters": [], "partOfSpeech": "Expression",
      "grammarSentences": [{ "japanese": "日本の文化について調べます。", "reading": "にほんのぶんかについてしらべます。", "english": "I research about Japanese culture.", "nepali": "म जापानी संस्कृति को बारेमा अनुसन्धान गर्छु।" }] },
    { "id": "n5_21_37", "lesson": 21, "level": "N5", "word": "久しぶり", "reading": "ひさしぶり", "meaning": "After a long time", "meaningNepali": "धेरै समयपछि", "kanjiCharacters": ["久"], "partOfSpeech": "Expression",
      "grammarSentences": [{ "japanese": "お久しぶりですね！", "reading": "おひさしぶりですね！", "english": "Long time no see!", "nepali": "धेरै समयपछि भेट भयो है!" }] }
]

l22_data = [
    { "id": "n5_22_01", "lesson": 22, "level": "N5", "word": "着ます", "reading": "きます", "meaning": "Wear / Put on (shirt, coat)", "meaningNepali": "लगाउनु (कमिज/कोट)", "kanjiCharacters": ["着"], "partOfSpeech": "Verb (Group 2)",
      "grammarSentences": [{ "japanese": "白いシャツを着ています。", "reading": "しろいシャツをきています。", "english": "I am wearing a white shirt.", "nepali": "म सेतो शर्ट लगाउँदैछु।" }] },
    { "id": "n5_22_02", "lesson": 22, "level": "N5", "word": "履きます", "reading": "はきます", "meaning": "Put on (trousers, shoes)", "meaningNepali": "लगाउनु (जुत्ता/पैन्ट)", "kanjiCharacters": ["履"], "partOfSpeech": "Verb (Group 1)",
      "grammarSentences": [{ "japanese": "黒い靴を履いています。", "reading": "くろいくつをはいています。", "english": "I am wearing black shoes.", "nepali": "म कालो जुत्ता लगाउँदैछु।" }] },
    { "id": "n5_22_03", "lesson": 22, "level": "N5", "word": "被ります", "reading": "かぶります", "meaning": "Put on (a hat/cap)", "meaningNepali": "लगाउनु (टोपी)", "kanjiCharacters": ["被"], "partOfSpeech": "Verb (Group 1)",
      "grammarSentences": [{ "japanese": "赤い帽子を被っています。", "reading": "あかいぼうしをかぶっています。", "english": "I am wearing a red hat.", "nepali": "म रातो टोपी लगाउँदैछु।" }] },
    { "id": "n5_22_04", "lesson": 22, "level": "N5", "word": "掛けます", "reading": "かけます", "meaning": "Put on (glasses)", "meaningNepali": "लगाउनु (चश्मा)", "kanjiCharacters": ["掛"], "partOfSpeech": "Verb (Group 2)",
      "grammarSentences": [{ "japanese": "眼鏡を掛けます。", "reading": "めがねをかけます。", "english": "I put on glasses.", "nepali": "म चश्मा लगाउँछु।" }] },
    { "id": "n5_22_05", "lesson": 22, "level": "N5", "word": "生まれました", "reading": "うまれました", "meaning": "Be born", "meaningNepali": "जन्म हुनु", "kanjiCharacters": ["生"], "partOfSpeech": "Verb (Group 2)",
      "grammarSentences": [{ "japanese": "わたしはネパールで生まれました。", "reading": "わたしはネパールでうまれました。", "english": "I was born in Nepal.", "nepali": "मेरो जन्म नेपालमा भएको हो।" }] },
    { "id": "n5_22_06", "lesson": 22, "level": "N5", "word": "コート", "reading": "コート", "meaning": "Coat", "meaningNepali": "कोट", "kanjiCharacters": [], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "暖かいコートを買いました。", "reading": "あたたかいコートをかいました。", "english": "I bought a warm coat.", "nepali": "मैले न्यानो कोट किनें।" }] },
    { "id": "n5_22_07", "lesson": 22, "level": "N5", "word": "セーター", "reading": "セーター", "meaning": "Sweater", "meaningNepali": "स्वेटर", "kanjiCharacters": [], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "母がセーターを編んでくれました。", "reading": "ははがセーターをあんでくれました。", "english": "My mother knitted a sweater for me.", "nepali": "आमाले मेरो लागि स्वेटर बुनिदिनुभयो।" }] },
    { "id": "n5_22_08", "lesson": 22, "level": "N5", "word": "スーツ", "reading": "スーツ", "meaning": "Suit", "meaningNepali": "सूट (पोशाक)", "kanjiCharacters": [], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "仕事でスーツを着ます。", "reading": "しごとでスーツをきます。", "english": "I wear a suit for work.", "nepali": "म काममा सूट लगाउँछु।" }] },
    { "id": "n5_22_09", "lesson": 22, "level": "N5", "word": "帽子", "reading": "ぼうし", "meaning": "Hat / Cap", "meaningNepali": "टोपी", "kanjiCharacters": ["帽", "子"], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "帽子をどこに置きましたか。", "reading": "ぼうしをどこにおきましたか。", "english": "Where did I put my hat?", "nepali": "मैले टोपी कहाँ राखें?" }] },
    { "id": "n5_22_10", "lesson": 22, "level": "N5", "word": "眼鏡", "reading": "めがね", "meaning": "Glasses / Spectacles", "meaningNepali": "चश्मा", "kanjiCharacters": ["眼", "鏡"], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "新しい眼鏡を買いました。", "reading": "あたらしいめがねをかいました。", "english": "I bought new glasses.", "nepali": "मैले नयाँ चश्मा किनें।" }] },
    { "id": "n5_22_11", "lesson": 22, "level": "N5", "word": "家賃", "reading": "やちん", "meaning": "House rent", "meaningNepali": "घर भाडा", "kanjiCharacters": ["家", "賃"], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "毎月家賃を払います。", "reading": "まいつきやちんをはらいます。", "english": "I pay rent every month.", "nepali": "म हरेक महिना घर भाडा तिर्छु।" }] },
    { "id": "n5_22_12", "lesson": 22, "level": "N5", "word": "ダイニングキッチン", "reading": "ダイニングキッチン", "meaning": "Dining-kitchen (DK)", "meaningNepali": "भान्सा र भोजन कक्ष", "kanjiCharacters": [], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "このアパートはダイニングキッチンがあります。", "reading": "このアパートはダイニングキッチンがあります。", "english": "This apartment has a dining-kitchen.", "nepali": "यो अपार्टमेन्टमा भान्सा र भोजन कक्ष छ।" }] },
    { "id": "n5_22_13", "lesson": 22, "level": "N5", "word": "和室", "reading": "わしつ", "meaning": "Japanese-style room", "meaningNepali": "जापानी शैलीको कोठा", "kanjiCharacters": ["和", "室"], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "和室には畳があります。", "reading": "わしつにはtatamiがあります。", "english": "There are tatami mats in a Japanese-style room.", "nepali": "जापानी शैलीको कोठामा टाटामी म्याट हुन्छ।" }] },
    { "id": "n5_22_14", "lesson": 22, "level": "N5", "word": "押入れ", "reading": "おしいれ", "meaning": "Futon closet", "meaningNepali": "सिरक ढुकुटी / ढोकाको दराज", "kanjiCharacters": ["押", "入"], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "布団を押入れにしまします。", "reading": "ふとんをおしいれにしまします。", "english": "I put the futon in the closet.", "nepali": "म फुटोन दराजमा राख्छु।" }] },
    { "id": "n5_22_15", "lesson": 22, "level": "N5", "word": "布団", "reading": "ふとん", "meaning": "Futon bedding", "meaningNepali": "फुटोन / जापानी ओछ्यान", "kanjiCharacters": ["布", "団"], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "あたたかい布団で寝ます。", "reading": "あたたかいふとんでねます。", "english": "I sleep in a warm futon.", "nepali": "म न्यानो ओछ्यानमा सुत्छु।" }] },
    { "id": "n5_22_16", "lesson": 22, "level": "N5", "word": "アパート", "reading": "アパート", "meaning": "Apartment", "meaningNepali": "अपार्टमेन्ट", "kanjiCharacters": [], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "駅から近いアパートを探しています。", "reading": "えきからちかいアパートをさがしています。", "english": "I am looking for an apartment near the station.", "nepali": "म स्टेशन नजिकैको अपार्टमेन्ट खोज्दैछु।" }] },
    { "id": "n5_22_17", "lesson": 22, "level": "N5", "word": "パリ", "reading": "パリ", "meaning": "Paris", "meaningNepali": "पेरिस", "kanjiCharacters": [], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "パリはフランスの首都です。", "reading": "パリはフランスのしゅとです。", "english": "Paris is the capital of France.", "nepali": "पेरिस फ्रान्सको राजधानी हो।" }] },
    { "id": "n5_22_18", "lesson": 22, "level": "N5", "word": "万里の長城", "reading": "ばんりのちょうじょう", "meaning": "Great Wall of China", "meaningNepali": "चीनको विशाल पर्खाल", "kanjiCharacters": ["万", "里", "長", "城"], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "万里の長城へ行ったことがあります。", "reading": "ばんりのちょうじょうへいったことがあります。", "english": "I have been to the Great Wall of China.", "nepali": "म चीनको विशाल पर्खालमा गएको छु।" }] },
    { "id": "n5_22_19", "lesson": 22, "level": "N5", "word": "おめでとうございます", "reading": "おめでとうございます", "meaning": "Congratulations", "meaningNepali": "बधाई छ", "kanjiCharacters": [], "partOfSpeech": "Expression",
      "grammarSentences": [{ "japanese": "お誕生日おめでとうございます！", "reading": "おたんじょうびおめでとうございます！", "english": "Happy Birthday!", "nepali": "जन्मदिनको हार्दिक बधाई छ!" }] }
]

l23_data = [
    { "id": "n5_23_01", "lesson": 23, "level": "N5", "word": "聞きます", "reading": "ききます", "meaning": "Ask (a question)", "meaningNepali": "सोध्नु (प्रश्न)", "kanjiCharacters": ["聞"], "partOfSpeech": "Verb (Group 1)",
      "grammarSentences": [{ "japanese": "先生に質問を聞きます。", "reading": "せんせいにしつもんをききます。", "english": "I ask the teacher a question.", "nepali": "म गुरुलाई प्रश्न सोध्छु।" }] },
    { "id": "n5_23_02", "lesson": 23, "level": "N5", "word": "回します", "reading": "まわします", "meaning": "Turn / Rotate", "meaningNepali": "घुमाउनु (बटन आदि)", "kanjiCharacters": ["回"], "partOfSpeech": "Verb (Group 1)",
      "grammarSentences": [{ "japanese": "これを右へ回してください。", "reading": "これをみぎへまわしてください。", "english": "Please turn this to the right.", "nepali": "कृपया यसलाई दायाँ घुमाउनुहोस्।" }] },
    { "id": "n5_23_03", "lesson": 23, "level": "N5", "word": "引きます", "reading": "ひきます", "meaning": "Pull", "meaningNepali": "तान्नु", "kanjiCharacters": ["引"], "partOfSpeech": "Verb (Group 1)",
      "grammarSentences": [{ "japanese": "ドアを引いてください。", "reading": "ドアをひいてください。", "english": "Please pull the door.", "nepali": "कृपया ढोका तान्नुहोस्।" }] },
    { "id": "n5_23_04", "lesson": 23, "level": "N5", "word": "変えます", "reading": "かえます", "meaning": "Change / Alter", "meaningNepali": "बद्ल्नु / परिवर्तन गर्नु", "kanjiCharacters": ["変"], "partOfSpeech": "Verb (Group 2)",
      "grammarSentences": [{ "japanese": "音を大きく変えます。", "reading": "おとをおおきくかえます。", "english": "I turn up the sound.", "nepali": "म आवाज ठूलो बनाउँछु।" }] },
    { "id": "n5_23_05", "lesson": 23, "level": "N5", "word": "触ります", "reading": "さわります", "meaning": "Touch (a machine/button)", "meaningNepali": "छुनु", "kanjiCharacters": ["触"], "partOfSpeech": "Verb (Group 1)",
      "grammarSentences": [{ "japanese": "機械に触らないでください。", "reading": "きかいにさわらないでください。", "english": "Please do not touch the machine.", "nepali": "कृपया मेसिन नछुनुहोस्।" }] },
    { "id": "n5_23_06", "lesson": 23, "level": "N5", "word": "出ます", "reading": "でます", "meaning": "Come out (water, change)", "meaningNepali": "निस्कनु (तातो पानी/खुद्रा)", "kanjiCharacters": ["出"], "partOfSpeech": "Verb (Group 2)",
      "grammarSentences": [{ "japanese": "お湯が出ます。", "reading": "おゆがでます。", "english": "Hot water comes out.", "nepali": "तातो पानी आउँछ।" }] },
    { "id": "n5_23_07", "lesson": 23, "level": "N5", "word": "歩きます", "reading": "あるきます", "meaning": "Walk", "meaningNepali": "हिँड्नु", "kanjiCharacters": ["歩"], "partOfSpeech": "Verb (Group 1)",
      "grammarSentences": [{ "japanese": "公園を歩きます。", "reading": "こうえんをあるきます。", "english": "I walk through the park.", "nepali": "म पार्कमा हिँड्छु।" }] },
    { "id": "n5_23_08", "lesson": 23, "level": "N5", "word": "渡ります", "reading": "わたります", "meaning": "Cross (a bridge/road)", "meaningNepali": "तर्नु / काट्नु (बाटो/पुल)", "kanjiCharacters": ["渡"], "partOfSpeech": "Verb (Group 1)",
      "grammarSentences": [{ "japanese": "橋を渡ります。", "reading": "はしをわたります。", "english": "I cross the bridge.", "nepali": "म पुल तर्छु।" }] },
    { "id": "n5_23_09", "lesson": 23, "level": "N5", "word": "曲がります", "reading": "まがります", "meaning": "Turn (to the right/left)", "meaningNepali": "मोडिनु (दायाँ/बायाँ)", "kanjiCharacters": ["曲"], "partOfSpeech": "Verb (Group 1)",
      "grammarSentences": [{ "japanese": "角を右へ曲がってください。", "reading": "かどをみぎへまがってください。", "english": "Please turn right at the corner.", "nepali": "कृपया कुनामा दायाँ मोडिनुहोस्।" }] },
    { "id": "n5_23_10", "lesson": 23, "level": "N5", "word": "寂しい", "reading": "さびしい", "meaning": "Lonely / Sad", "meaningNepali": "उदासी / एक्लो", "kanjiCharacters": ["寂"], "partOfSpeech": "I-Adjective",
      "grammarSentences": [{ "japanese": "暇なとき、寂しいです。", "reading": "ひまなとき、さびしいです。", "english": "When I am free, I am lonely.", "nepali": "फुर्सदको बेला म उदास महसुस गर्छु।" }] },
    { "id": "n5_23_11", "lesson": 23, "level": "N5", "word": "お湯", "reading": "おゆ", "meaning": "Hot water", "meaningNepali": "तातो पानी", "kanjiCharacters": ["湯"], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "お湯を飲みます。", "reading": "おゆをのみます。", "english": "I drink hot water.", "nepali": "म तातो पानी पिउँछु।" }] },
    { "id": "n5_23_12", "lesson": 23, "level": "N5", "word": "音", "reading": "おと", "meaning": "Sound", "meaningNepali": "आवाज / ध्वनि", "kanjiCharacters": ["音"], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "変な音が聞こえます。", "reading": "へんなおとがきこえます。", "english": "I can hear a strange sound.", "nepali": "एउटा अनौठो आवाज सुनिन्छ।" }] },
    { "id": "n5_23_13", "lesson": 23, "level": "N5", "word": "サイズ", "reading": "サイズ", "meaning": "Size", "meaningNepali": "साइज / नाप", "kanjiCharacters": [], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "このサイズはちょうどいいです。", "reading": "このサイズはちょうどいいです。", "english": "This size is just right.", "nepali": "यो साइज ठ्याक्कै ठिक छ।" }] },
    { "id": "n5_23_14", "lesson": 23, "level": "N5", "word": "故障", "reading": "こしょう", "meaning": "Breakdown / Malfunction", "meaningNepali": "बिग्रिनु / खराबी", "kanjiCharacters": ["故", "障"], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "車が故障しました。", "reading": "くるまがこしょうしました。", "english": "The car broke down.", "nepali": "गाडी बिग्रियो।" }] },
    { "id": "n5_23_15", "lesson": 23, "level": "N5", "word": "道", "reading": "みち", "meaning": "Road / Way / Street", "meaningNepali": "बाटो", "kanjiCharacters": ["道"], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "道に迷いました。", "reading": "みちにまよいました。", "english": "I got lost on the road.", "nepali": "म बाटोमा हराएँ।" }] },
    { "id": "n5_23_16", "lesson": 23, "level": "N5", "word": "交差点", "reading": "こうさてん", "meaning": "Intersection / Crossing", "meaningNepali": "चौबाटो", "kanjiCharacters": ["交", "差", "点"], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "交差点で曲がります。", "reading": "こうさてんでまがります。", "english": "I turn at the intersection.", "nepali": "म चौबाटोमा मोडिन्छु।" }] },
    { "id": "n5_23_17", "lesson": 23, "level": "N5", "word": "信号", "reading": "しんごう", "meaning": "Traffic light", "meaningNepali": "ट्राफिक बत्ती", "kanjiCharacters": ["信", "号"], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "赤信号で止まります。", "reading": "あかしんごうでとまります。", "english": "I stop at the red light.", "nepali": "म रातो बत्तीमा रोकिन्छु।" }] },
    { "id": "n5_23_18", "lesson": 23, "level": "N5", "word": "角", "reading": "かど", "meaning": "Corner", "meaningNepali": "कुना / मोड", "kanjiCharacters": ["角"], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "次の角を左へ曲がります。", "reading": "つぎのかどをひだりへまがります。", "english": "I turn left at the next corner.", "nepali": "म अर्को कुनामा बायाँ मोडिन्छु।" }] },
    { "id": "n5_23_19", "lesson": 23, "level": "N5", "word": "橋", "reading": "はし", "meaning": "Bridge", "meaningNepali": "पुल", "kanjiCharacters": ["橋"], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "高い橋を渡ります。", "reading": "たかいはしをわたります。", "english": "I cross the high bridge.", "nepali": "म अग्लो पुल तर्छु।" }] },
    { "id": "n5_23_20", "lesson": 23, "level": "N5", "word": "駐車場", "reading": "ちゅうしゃじょう", "meaning": "Parking lot", "meaningNepali": "पार्किङ स्थल", "kanjiCharacters": ["駐", "車", "場"], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "駐車場に車を止めます。", "reading": "ちゅうしゃじょうにくるまをとめます。", "english": "I park the car in the parking lot.", "nepali": "म पार्किङ स्थलमा गाडी रोक्छु।" }] },
    { "id": "n5_23_21", "lesson": 23, "level": "N5", "word": "建物", "reading": "たてもの", "meaning": "Building", "meaningNepali": "भवन / घर", "kanjiCharacters": ["建", "物"], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "大きな建物が見えます。", "reading": "おおきなたてものがみえます。", "english": "I can see a large building.", "nepali": "एउटा ठूलो भवन देखिन्छ।" }] },
    { "id": "n5_23_22", "lesson": 23, "level": "N5", "word": "何回も", "reading": "なんかいも", "meaning": "Many times", "meaningNepali": "धेरै पटक", "kanjiCharacters": ["何", "回"], "partOfSpeech": "Adverb",
      "grammarSentences": [{ "japanese": "何回も練習しました。", "reading": "なんかいもれんしゅうしました。", "english": "I practiced many times.", "nepali": "मैले धेरै पटक अभ्यास गरें।" }] },
    { "id": "n5_23_23", "lesson": 23, "level": "N5", "word": "〜目", "reading": "〜め", "meaning": "-th (ordinal suffix)", "meaningNepali": "~ औँ (क्रम दर्शक)", "kanjiCharacters": ["目"], "partOfSpeech": "Suffix",
      "grammarSentences": [{ "japanese": "二つ目の信号を左へ曲がります。", "reading": "ふたつめのしんごうをひだりへまがります。", "english": "Turn left at the second traffic light.", "nepali": "दोस्रो ट्राफिक बत्तीमा बायाँ मोडिनुहोस्।" }] }
]

l24_data = [
    { "id": "n5_24_01", "lesson": 24, "level": "N5", "word": "呉れます", "reading": "くれます", "meaning": "Give (me or my family)", "meaningNepali": "दिनु (मलाई वा मेरो परिवारलाई)", "kanjiCharacters": ["呉"], "partOfSpeech": "Verb (Group 2)",
      "grammarSentences": [{ "japanese": "佐藤さんはわたしにお菓子を呉れました。", "reading": "さとうさんはわたしにおかしをくれました。", "english": "Ms. Sato gave me sweets.", "nepali": "सातो-जीले मलाई मिठाई दिनुभयो।" }] },
    { "id": "n5_24_02", "lesson": 24, "level": "N5", "word": "直します", "reading": "なおします", "meaning": "Repair / Correct", "meaningNepali": "मर्मत गर्नु / मिलाउनु", "kanjiCharacters": ["直"], "partOfSpeech": "Verb (Group 1)",
      "grammarSentences": [{ "japanese": "時計を直してもらいました。", "reading": "とけいをなおしてもらいました。", "english": "I had my watch repaired.", "nepali": "मैले मेरो घडी मर्मत गराएँ।" }] },
    { "id": "n5_24_03", "lesson": 24, "level": "N5", "word": "連れて行きます", "reading": "つれていきます", "meaning": "Take (someone) along", "meaningNepali": "साथमा लैजानु (मान्छेलाई)", "kanjiCharacters": ["連", "行"], "partOfSpeech": "Verb (Group 1)",
      "grammarSentences": [{ "japanese": "子供を公園へ連れて行きます。", "reading": "こどもをこうえんへつれていきます。", "english": "I take my child to the park.", "nepali": "म बच्चालाई पार्कमा लैजान्छु।" }] },
    { "id": "n5_24_04", "lesson": 24, "level": "N5", "word": "連れて来ます", "reading": "つれてきます", "meaning": "Bring (someone) along", "meaningNepali": "साथमा ल्याउनु (मान्छेलाई)", "kanjiCharacters": ["連", "来"], "partOfSpeech": "Verb (Irregular)",
      "grammarSentences": [{ "japanese": "友達をパーティーに連れて来ました。", "reading": "ともだちをパーティーにつれてきました。", "english": "I brought a friend to the party.", "nepali": "मैले साथीलाई पार्टीमा ल्याएँ।" }] },
    { "id": "n5_24_05", "lesson": 24, "level": "N5", "word": "送ります", "reading": "おくります", "meaning": "Escort / See off (someone)", "meaningNepali": "पुर्‍याउनु / बिदा गर्नु", "kanjiCharacters": ["送"], "partOfSpeech": "Verb (Group 1)",
      "grammarSentences": [{ "japanese": "駅まで友達を送ります。", "reading": "えきまでともだちをおくります。", "english": "I escort my friend to the station.", "nepali": "म साथीलाई स्टेशनसम्म पुर्‍याउँछु।" }] },
    { "id": "n5_24_06", "lesson": 24, "level": "N5", "word": "紹介します", "reading": "しょうかいします", "meaning": "Introduce", "meaningNepali": "परिचय गराउनु", "kanjiCharacters": ["紹", "介"], "partOfSpeech": "Verb (Irregular)",
      "grammarSentences": [{ "japanese": "みんなに田中さんを紹介します。", "reading": "みんなにたなかさんをしょうかいします。", "english": "I introduce Mr. Tanaka to everyone.", "nepali": "म सबैलाई तानाका-जीको परिचय गराउँछु।" }] },
    { "id": "n5_24_07", "lesson": 24, "level": "N5", "word": "案内します", "reading": "あんないします", "meaning": "Guide / Show around", "meaningNepali": "बाटो देखाउनु / घुमाउनु", "kanjiCharacters": ["案", "内"], "partOfSpeech": "Verb (Irregular)",
      "grammarSentences": [{ "japanese": "東京を案内します。", "reading": "とうきょうをあんないします。", "english": "I will show you around Tokyo.", "nepali": "म तपाईंलाई टोक्यो घुमाउँछु।" }] },
    { "id": "n5_24_08", "lesson": 24, "level": "N5", "word": "説明します", "reading": "せつめいします", "meaning": "Explain", "meaningNepali": "स्पष्ट पार्नु / सम्झाउनु", "kanjiCharacters": ["説", "明"], "partOfSpeech": "Verb (Irregular)",
      "grammarSentences": [{ "japanese": "使いかたを説明します。", "reading": "つかいかたをせつめいします。", "english": "I will explain how to use it.", "nepali": "म कसरी प्रयोग गर्ने भनेर सम्झाउँछु।" }] },
    { "id": "n5_24_09", "lesson": 24, "level": "N5", "word": "お爺さん", "reading": "おじいさん", "meaning": "Grandfather / Old man", "meaningNepali": "हजुरबुबा / वृद्ध", "kanjiCharacters": ["爺"], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "お爺さんは元気です。", "reading": "おじいさんはげんきです。", "english": "Grandfather is doing well.", "nepali": "हजुरबुबा सञ्चै हुनुहुन्छ।" }] },
    { "id": "n5_24_10", "lesson": 24, "level": "N5", "word": "お婆さん", "reading": "おばあさん", "meaning": "Grandmother / Old woman", "meaningNepali": "हजुरआमा / वृद्धा", "kanjiCharacters": ["婆"], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "お婆さんに料理を教わりました。", "reading": "おばあさんにりょうりをおそわりました。", "english": "I learned cooking from my grandmother.", "nepali": "मैले हजुरआमाबाट खाना पकाउन सिकें।" }] },
    { "id": "n5_24_11", "lesson": 24, "level": "N5", "word": "準備", "reading": "じゅんび", "meaning": "Preparation", "meaningNepali": "तयारी", "kanjiCharacters": ["準", "備"], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "旅行の準備をします。", "reading": "りょこうのじゅんびをします。", "english": "I prepare for the trip.", "nepali": "म यात्राको तयारी गर्छु।" }] },
    { "id": "n5_24_12", "lesson": 24, "level": "N5", "word": "引っ越し", "reading": "ひっこし", "meaning": "Moving house", "meaningNepali": "डेरा / घर सर्नु", "kanjiCharacters": ["引", "越"], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "来週引っ越しをします。", "reading": "らいしゅうひっこしをします。", "english": "I am moving house next week.", "nepali": "म अर्को हप्ता घर सर्छु।" }] },
    { "id": "n5_24_13", "lesson": 24, "level": "N5", "word": "お菓子", "reading": "おかし", "meaning": "Sweets / Snacks", "meaningNepali": "मिठाई / खाजा", "kanjiCharacters": ["菓", "子"], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "子供にお菓子をあげました。", "reading": "こどもにおかしをあげました。", "english": "I gave snacks to the children.", "nepali": "मैले बच्चाहरूलाई खाजा दिएँ।" }] },
    { "id": "n5_24_14", "lesson": 24, "level": "N5", "word": "ホームステイ", "reading": "ホームステイ", "meaning": "Homestay", "meaningNepali": "होमस्टे", "kanjiCharacters": [], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "日本でホームステイをしました。", "reading": "にほんでホームステイをしました。", "english": "I did a homestay in Japan.", "nepali": "मैले जापानमा होमस्टे गरें।" }] },
    { "id": "n5_24_15", "lesson": 24, "level": "N5", "word": "全部", "reading": "ぜんぶ", "meaning": "All / Everything", "meaningNepali": "सबै", "kanjiCharacters": ["全", "部"], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "宿題を全部終わらせました。", "reading": "しゅくだいをぜんぶおわらせました。", "english": "I finished all my homework.", "nepali": "मैले सबै गृहकार्य सकें।" }] },
    { "id": "n5_24_16", "lesson": 24, "level": "N5", "word": "自分で", "reading": "じぶんで", "meaning": "By oneself", "meaningNepali": "आफैँले", "kanjiCharacters": ["自", "分"], "partOfSpeech": "Adverb",
      "grammarSentences": [{ "japanese": "自分で料理を作りました。", "reading": "じぶんでりょうりをつくりました。", "english": "I made the food by myself.", "nepali": "मैले आफैँले खाना बनाएँ।" }] },
    { "id": "n5_24_17", "lesson": 24, "level": "N5", "word": "他に", "reading": "ほかに", "meaning": "Besides / In addition", "meaningNepali": "बाहेक / अरू", "kanjiCharacters": ["他"], "partOfSpeech": "Adverb",
      "grammarSentences": [{ "japanese": "他に質問はありますか。", "reading": "ほかにしつもんはありますか。", "english": "Do you have any other questions?", "nepali": "के अरू केही प्रश्न छ?" }] }
]

l25_data = [
    { "id": "n5_25_01", "lesson": 25, "level": "N5", "word": "考えます", "reading": "かんがえます", "meaning": "Think / Consider", "meaningNepali": "सोच्नु / विचार पुर्‍याउनु", "kanjiCharacters": ["考"], "partOfSpeech": "Verb (Group 2)",
      "grammarSentences": [{ "japanese": "よく考えてください。", "reading": "よくかんがえてください。", "english": "Please think carefully.", "nepali": "कृपया राम्ररी विचार गर्नुहोस्।" }] },
    { "id": "n5_25_02", "lesson": 25, "level": "N5", "word": "着きます", "reading": "つきます", "meaning": "Arrive (at destination)", "meaningNepali": "पुग्नु (गन्तव्यमा)", "kanjiCharacters": ["着"], "partOfSpeech": "Verb (Group 1)",
      "grammarSentences": [{ "japanese": "九時に駅に着きます。", "reading": "くじにえきにつきます。", "english": "I arrive at the station at 9.", "nepali": "म ९ बजे स्टेशनमा पुग्छु।" }] },
    { "id": "n5_25_03", "lesson": 25, "level": "N5", "word": "留学します", "reading": "りゅうがくします", "meaning": "Study abroad", "meaningNepali": "विदेशमा अध्ययन गर्नु", "kanjiCharacters": ["留", "学"], "partOfSpeech": "Verb (Irregular)",
      "grammarSentences": [{ "japanese": "お金があったら留学したいです。", "reading": "おかねがあったらりゅうがくしたいです。", "english": "If I had money, I would like to study abroad.", "nepali": "पैसा भयो भने म विदेशमा अध्ययन गर्न जान चाहन्छु।" }] },
    { "id": "n5_25_04", "lesson": 25, "level": "N5", "word": "年を取ります", "reading": "としをとります", "meaning": "Grow old / Age", "meaningNepali": "उमेर ढल्किनु / बुढो हुनु", "kanjiCharacters": ["年", "取"], "partOfSpeech": "Verb (Group 1)",
      "grammarSentences": [{ "japanese": "年を取っても働きたいです。", "reading": "としをとってもはたらきたいです。", "english": "Even if I grow old, I want to work.", "nepali": "बुढो भए पनि म काम गर्न चाहन्छु।" }] },
    { "id": "n5_25_05", "lesson": 25, "level": "N5", "word": "足ります", "reading": "たります", "meaning": "Be enough / Sufficient", "meaningNepali": "पुग्नु / पर्याप्त हुनु", "kanjiCharacters": ["足"], "partOfSpeech": "Verb (Group 2)",
      "grammarSentences": [{ "japanese": "時間が足ります。", "reading": "じかんがたります。", "english": "There is enough time.", "nepali": "समय पर्याप्त छ।" }] },
    { "id": "n5_25_06", "lesson": 25, "level": "N5", "word": "田舎", "reading": "いなか", "meaning": "Countryside / Hometown", "meaningNepali": "गाउँघर / ग्रामीण क्षेत्र", "kanjiCharacters": ["田", "舎"], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "田舎は静かです。", "reading": "いなかはしずかです。", "english": "The countryside is quiet.", "nepali": "गाउँघर शान्त हुन्छ।" }] },
    { "id": "n5_25_07", "lesson": 25, "level": "N5", "word": "大使館", "reading": "たいしかん", "meaning": "Embassy", "meaningNepali": "दूतावास", "kanjiCharacters": ["大", "使", "館"], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "大使館へ行かなければなりません。", "reading": "たいしかんへいかなければなりません。", "english": "I must go to the embassy.", "nepali": "मैले दूतावासमा जानुपर्छ।" }] },
    { "id": "n5_25_08", "lesson": 25, "level": "N5", "word": "グループ", "reading": "グループ", "meaning": "Group", "meaningNepali": "समूह / ग्रुप", "kanjiCharacters": [], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "グループで話し合います。", "reading": "グループではなしあいます。", "english": "We discuss in groups.", "nepali": "हामी समूहमा छलफल गर्छौँ।" }] },
    { "id": "n5_25_09", "lesson": 25, "level": "N5", "word": "チャンス", "reading": "チャンス", "meaning": "Chance / Opportunity", "meaningNepali": "मौका / अवसर", "kanjiCharacters": [], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "チャンスがあったら日本へ行きます。", "reading": "チャンスがあったらにほんへいきます。", "english": "If I get a chance, I will go to Japan.", "nepali": "मौका मिले भने म जापान जानेछु।" }] },
    { "id": "n5_25_10", "lesson": 25, "level": "N5", "word": "億", "reading": "おく", "meaning": "One hundred million", "meaningNepali": "करोड (१० करोड)", "kanjiCharacters": ["億"], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "一億億円当たったら家を買います。", "reading": "いちおくえんあたたらいえをかいます。", "english": "If I win 100 million yen, I will buy a house.", "nepali": "१० करोड येन जितें भने म घर किन्छु।" }] },
    { "id": "n5_25_11", "lesson": 25, "level": "N5", "word": "もし", "reading": "もし", "meaning": "If ~", "meaningNepali": "यदि", "kanjiCharacters": [], "partOfSpeech": "Adverb",
      "grammarSentences": [{ "japanese": "もし雨が降ったら中止です。", "reading": "もしあめがふったらちゅうしです。", "english": "If it rains, it will be cancelled.", "nepali": "यदि पानी पर्यो भने रद्द हुनेछ।" }] },
    { "id": "n5_25_12", "lesson": 25, "level": "N5", "word": "いくら", "reading": "いくら", "meaning": "However much ~", "meaningNepali": "जति नै भए पनि", "kanjiCharacters": [], "partOfSpeech": "Adverb",
      "grammarSentences": [{ "japanese": "いくら考えてもわかりません。", "reading": "いくらかんがえてもわかりません。", "english": "No matter how much I think, I don't understand.", "nepali": "जति सोचे पनि बुझ्न सकिन।" }] },
    { "id": "n5_25_13", "lesson": 25, "level": "N5", "word": "転勤", "reading": "てんきん", "meaning": "Transfer to another office", "meaningNepali": "सरुवा", "kanjiCharacters": ["転", "勤"], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "大阪へ転勤になります。", "reading": "おおさかへてんきんになります。", "english": "I am being transferred to Osaka.", "nepali": "मेरो ओसाकामा सरुवा हुँदैछ।" }] },
    { "id": "n5_25_14", "lesson": 25, "level": "N5", "word": "事", "reading": "こと", "meaning": "Thing / Matter", "meaningNepali": "कुरा / विषय", "kanjiCharacters": ["事"], "partOfSpeech": "Noun",
      "grammarSentences": [{ "japanese": "将来の事を考えます。", "reading": "しょうらいのことのかんがえます。", "english": "I think about the future.", "nepali": "म भविष्यको कुरा सोच्छु।" }] },
    { "id": "n5_25_15", "lesson": 25, "level": "N5", "word": "一杯飲みましょう", "reading": "いっぱいのみましょう", "meaning": "Let's have a drink", "meaningNepali": "एक कप/ग्लास पिऔँ", "kanjiCharacters": ["一", "杯", "飲"], "partOfSpeech": "Expression",
      "grammarSentences": [{ "japanese": "今晩一杯飲みましょう！", "reading": "こんばんいっぱいのみましょう！", "english": "Let's have a drink tonight!", "nepali": "आज साँझ एक कप पिऔँ!" }] },
    { "id": "n5_25_16", "lesson": 25, "level": "N5", "word": "お世話になりました", "reading": "おせわになりました", "meaning": "Thank you for taking care of me", "meaningNepali": "सहयोगको लागि धन्यवाद", "kanjiCharacters": ["世", "話"], "partOfSpeech": "Expression",
      "grammarSentences": [{ "japanese": "いろいろお世話になりました。", "reading": "いろいろおせわになりました。", "english": "Thank you very much for all your help.", "nepali": "विभिन्न सहयोगको लागि धेरै धेरै धन्यवाद।" }] },
    { "id": "n5_25_17", "lesson": 25, "level": "N5", "word": "頑張ります", "reading": "がんばります", "meaning": "Do one's best", "meaningNepali": "मेहनत गर्नु / प्रयास गर्नु", "kanjiCharacters": ["頑", "張"], "partOfSpeech": "Verb (Group 1)",
      "grammarSentences": [{ "japanese": "日本語の勉強を頑張ります。", "reading": "にほんごのべんきょうをがんばります。", "english": "I will do my best in studying Japanese.", "nepali": "म जापानी भाषा पढाइमा कडा मेहनत गर्छु।" }] },
    { "id": "n5_25_18", "lesson": 25, "level": "N5", "word": "どうぞお元気で", "reading": "どうぞおげんきで", "meaning": "Best wishes / Take care of yourself", "meaningNepali": "राम्रोसँग बस्नुहोला", "kanjiCharacters": ["元", "気"], "partOfSpeech": "Expression",
      "grammarSentences": [{ "japanese": "お元気で、さようなら。", "reading": "おげんきで、さようなら。", "english": "Take care, goodbye.", "nepali": "राम्रोसँग बस्नुहोला, बिदा!" }] }
]

# Form file text for lib/n5-lessons-21to25.ts
ts21_25_header = """// ============================================================
// MINNA NO NIHONGO N5 — Complete Vocabulary & Grammar
// SOURCE: Minna no Nihongo I (Translations & Grammar Notes)
// LESSONS 21–25 (Full coverage with Kanji, Hiragana, English, Nepali)
// ============================================================

import type { VocabItem } from './nihongo-vocab';

export const N5_LESSONS_21TO25: VocabItem[] = [
  // LESSON 21
"""

all_21_25 = l21_data + l22_data + l23_data + l24_data + l25_data

ts_body = ""
for item in all_21_25:
    ts_body += "  " + json.dumps(item, ensure_ascii=False) + ",\n"

full_21_25_ts = ts21_25_header + ts_body + "];\n"

with open("lib/n5-lessons-21to25.ts", "w", encoding="utf-8") as f:
    f.write(full_21_25_ts)

print(f"Updated lib/n5-lessons-21to25.ts with {len(all_21_25)} complete entries for Lessons 21 to 25!")
