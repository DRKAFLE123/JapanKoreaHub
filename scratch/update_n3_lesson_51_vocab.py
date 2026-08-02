import json
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

# Lesson 51 Exact Vocab from User Image Table
lesson_51_vocab = [
    {
        "id": "N3-L51-001", "lesson": 51, "level": "N3",
        "word": "時間", "reading": "じかん",
        "meaning": "time", "meaningNepali": "समय",
        "kanjiCharacters": ["時", "間"], "partOfSpeech": "Noun",
        "grammarSentences": [{"japanese": "時間がありますか。", "reading": "じかんがありますか。", "english": "Do you have time?", "nepali": "तपाईंसँग समय छ?"}]
    },
    {
        "id": "N3-L51-002", "lesson": 51, "level": "N3",
        "word": "現在", "reading": "げんざい",
        "meaning": "present", "meaningNepali": "वर्तमान",
        "kanjiCharacters": ["現", "在"], "partOfSpeech": "Noun",
        "grammarSentences": [{"japanese": "現在は東京に住んでいます。", "reading": "げんざいはとうきょうにすんでいます。", "english": "Currently, I live in Tokyo.", "nepali": "वर्तमानमा म टोकियोमा बस्छु।"}]
    },
    {
        "id": "N3-L51-003", "lesson": 51, "level": "N3",
        "word": "過去", "reading": "かこ",
        "meaning": "past", "meaningNepali": "भूतकाल / विगत",
        "kanjiCharacters": ["過", "去"], "partOfSpeech": "Noun",
        "grammarSentences": [{"japanese": "過去の経験を生かす。", "reading": "かこのけいけんをいかす。", "english": "Make use of past experience.", "nepali": "विगतको अनुभवको प्रयोग गर्नु।"}]
    },
    {
        "id": "N3-L51-004", "lesson": 51, "level": "N3",
        "word": "未来", "reading": "みらい",
        "meaning": "future", "meaningNepali": "भविष्य",
        "kanjiCharacters": ["未", "来"], "partOfSpeech": "Noun",
        "grammarSentences": [{"japanese": "明るい未来を目指す。", "reading": "あかるいみらいをめざす。", "english": "Aim for a bright future.", "nepali": "उज्ज्वल भविष्यको लक्ष्य राख्नु।"}]
    },
    {
        "id": "N3-L51-005", "lesson": 51, "level": "N3",
        "word": "将来の夢", "reading": "しょうらいのゆめ",
        "meaning": "dream for the future", "meaningNepali": "भविष्यको सपना",
        "kanjiCharacters": ["将", "来", "夢"], "partOfSpeech": "Noun",
        "grammarSentences": [{"japanese": "将来の夢は医者になることです。", "reading": "しょうらいのゆめはいしゃになることです。", "english": "My dream for the future is to become a doctor.", "nepali": "मेरो भविष्यको सपना डाक्टर बन्नु हो।"}]
    },
    {
        "id": "N3-L51-006", "lesson": 51, "level": "N3",
        "word": "早朝", "reading": "そうちょう",
        "meaning": "morning / early morning", "meaningNepali": "बिहानै / सबेरै",
        "kanjiCharacters": ["早", "朝"], "partOfSpeech": "Noun",
        "grammarSentences": [{"japanese": "早朝に散歩をする。", "reading": "そうちょうにさんぽをする。", "english": "Take a walk early in the morning.", "nepali": "बिहानै घुम्न जानु।"}]
    },
    {
        "id": "N3-L51-007", "lesson": 51, "level": "N3",
        "word": "昼間の暖かい", "reading": "ひるまはあたたかい",
        "meaning": "the warmth of noon", "meaningNepali": "दिउँसोको न्यानो",
        "kanjiCharacters": ["昼", "間", "暖"], "partOfSpeech": "Expression",
        "grammarSentences": [{"japanese": "昼間の暖かい光を浴びる。", "reading": "ひるまのあたたかいひかりをあびる。", "english": "Bask in the warmth of midday.", "nepali": "दिउँसोको न्यानो घाम ताप्नु।"}]
    },
    {
        "id": "N3-L51-008", "lesson": 51, "level": "N3",
        "word": "日中", "reading": "にっちゅう",
        "meaning": "daytime", "meaningNepali": "दिउँसोको समय",
        "kanjiCharacters": ["日", "中"], "partOfSpeech": "Noun",
        "grammarSentences": [{"japanese": "日中はとても暑い。", "reading": "にっちゅうはとてもあつい。", "english": "It is very hot during the daytime.", "nepali": "दिउँसोको समयमा धेरै गर्मी हुन्छ।"}]
    },
    {
        "id": "N3-L51-009", "lesson": 51, "level": "N3",
        "word": "夜中", "reading": "やちゅう",
        "meaning": "night", "meaningNepali": "रातिको समय",
        "kanjiCharacters": ["夜", "中"], "partOfSpeech": "Noun",
        "grammarSentences": [{"japanese": "夜中に電話がかかってきた。", "reading": "やちゅうにでんわがかかってきた。", "english": "A phone call came in the middle of the night.", "nepali": "रातिको समयमा फोन आयो।"}]
    },
    {
        "id": "N3-L51-010", "lesson": 51, "level": "N3",
        "word": "真夜中", "reading": "まよなか",
        "meaning": "midnight (まよなか / しんや)", "meaningNepali": "मध्यराति",
        "kanjiCharacters": ["真", "夜", "中"], "partOfSpeech": "Noun",
        "grammarSentences": [{"japanese": "真夜中に目が覚めた。", "reading": "まよなかにめがさめた。", "english": "Woke up at midnight.", "nepali": "मध्यराति आँखा खुल्यो।"}]
    },
    {
        "id": "N3-L51-011", "lesson": 51, "level": "N3",
        "word": "平日", "reading": "へいじつ",
        "meaning": "weekdays", "meaningNepali": "हप्ताका काम गर्ने दिनहरू",
        "kanjiCharacters": ["平", "日"], "partOfSpeech": "Noun",
        "grammarSentences": [{"japanese": "平日は仕事があります。", "reading": "へいじつはしごとがあります。", "english": "I have work on weekdays.", "nepali": "हप्ताका दिनहरूमा काम हुन्छ।"}]
    },
    {
        "id": "N3-L51-012", "lesson": 51, "level": "N3",
        "word": "休日", "reading": "きゅうじつ",
        "meaning": "day off", "meaningNepali": "बिदाको दिन",
        "kanjiCharacters": ["休", "日"], "partOfSpeech": "Noun",
        "grammarSentences": [{"japanese": "休日は家でゆっくりする。", "reading": "きゅうじつはいえでゆっくりする。", "english": "Relax at home on my day off.", "nepali": "बिदाको दिन घरमा आराम गर्नु।"}]
    },
    {
        "id": "N3-L51-013", "lesson": 51, "level": "N3",
        "word": "祝日", "reading": "しゅくじつ",
        "meaning": "holiday", "meaningNepali": "सार्वजनिक बिदा",
        "kanjiCharacters": ["祝", "日"], "partOfSpeech": "Noun",
        "grammarSentences": [{"japanese": "明日は国の祝日です。", "reading": "あしたはくにのしゅくじつです。", "english": "Tomorrow is a national holiday.", "nepali": "भोलि राष्ट्रिय बिदा हो।"}]
    },
    {
        "id": "N3-L51-014", "lesson": 51, "level": "N3",
        "word": "週末", "reading": "しゅうまつ",
        "meaning": "weekend", "meaningNepali": "सप्ताहन्त (हप्ताको अन्त्य)",
        "kanjiCharacters": ["週", "末"], "partOfSpeech": "Noun",
        "grammarSentences": [{"japanese": "週末に買い物へ行く。", "reading": "しゅうまつにかいものへいく。", "english": "Go shopping on the weekend.", "nepali": "सप्ताहन्तमा किनमेल गर्न जानु।"}]
    },
    {
        "id": "N3-L51-015", "lesson": 51, "level": "N3",
        "word": "月末", "reading": "げつまつ",
        "meaning": "end of month", "meaningNepali": "महिनाको अन्त्य",
        "kanjiCharacters": ["月", "末"], "partOfSpeech": "Noun",
        "grammarSentences": [{"japanese": "月末までに支払いを済ませる。", "reading": "げつまつまでにしはらいをすませる。", "english": "Complete payment by the end of the month.", "nepali": "महिनाको अन्त्यसम्ममा भुक्तानी गरिसक्नु।"}]
    },
    {
        "id": "N3-L51-016", "lesson": 51, "level": "N3",
        "word": "年末", "reading": "ねんまつ",
        "meaning": "end of the year", "meaningNepali": "वर्षको अन्त्य",
        "kanjiCharacters": ["年", "末"], "partOfSpeech": "Noun",
        "grammarSentences": [{"japanese": "年末は大掃除をする。", "reading": "ねんまつはおおおそうじをする。", "english": "Do major cleaning at the end of the year.", "nepali": "वर्षको अन्त्यमा ठूलो सरसफाइ गर्नु।"}]
    },
    {
        "id": "N3-L51-017", "lesson": 51, "level": "N3",
        "word": "年末年始", "reading": "ねんまつねんし",
        "meaning": "the beginning and end of the year", "meaningNepali": "पुराना र नयाँ वर्षको बिदा",
        "kanjiCharacters": ["年", "末", "始"], "partOfSpeech": "Noun",
        "grammarSentences": [{"japanese": "年末年始は休業いたします。", "reading": "ねんまつねんしはきゅうぎょういたします。", "english": "We are closed during the New Year holidays.", "nepali": "नयाँ वर्षको अवधिमा कारोबार बन्द रहनेछ।"}]
    },
    {
        "id": "N3-L51-018", "lesson": 51, "level": "N3",
        "word": "上旬", "reading": "じょうじゅん",
        "meaning": "upper week (first 10 days of month / しょじゅん)", "meaningNepali": "महिनाको पहिलो १० दिन",
        "kanjiCharacters": ["上", "旬"], "partOfSpeech": "Noun",
        "grammarSentences": [{"japanese": "4月の上旬に桜が咲く。", "reading": "しがつのじょうじゅんにさくらがさく。", "english": "Cherry blossoms bloom in early April.", "nepali": "अप्रिलको पहिलो १० दिनमा साकुरा फूल्छ।"}]
    },
    {
        "id": "N3-L51-019", "lesson": 51, "level": "N3",
        "word": "中旬", "reading": "ちゅうじゅん",
        "meaning": "mid-month (10 days in middle of month)", "meaningNepali": "महिनाको मध्य १० दिन",
        "kanjiCharacters": ["中", "旬"], "partOfSpeech": "Noun",
        "grammarSentences": [{"japanese": "月中旬に試験がある。", "reading": "がつちゅうじゅんにしけんがある。", "english": "There is an exam in the middle of the month.", "nepali": "महिनाको मध्यतिर परीक्षा छ।"}]
    },
    {
        "id": "N3-L51-020", "lesson": 51, "level": "N3",
        "word": "下旬", "reading": "げじゅん",
        "meaning": "end of month (last 10 days of month)", "meaningNepali": "महिनाको अन्तिम १० दिन",
        "kanjiCharacters": ["下", "旬"], "partOfSpeech": "Noun",
        "grammarSentences": [{"japanese": "5月の下旬に出張する。", "reading": "ごがつのげじゅんにしゅっちょうする。", "english": "Go on a business trip in late May.", "nepali": "मे को अन्तिम १० दिनमा भ्रमणमा जानु।"}]
    },
    {
        "id": "N3-L51-021", "lesson": 51, "level": "N3",
        "word": "連休", "reading": "れんきゅう",
        "meaning": "long vacation / consecutive holidays", "meaningNepali": "लगातारको बिदा",
        "kanjiCharacters": ["連", "休"], "partOfSpeech": "Noun",
        "grammarSentences": [{"japanese": "来週は3連休です。", "reading": "らいしゅうはさんれんきゅうです。", "english": "Next week is a 3-day consecutive holiday.", "nepali": "आउने हप्ता ३ दिन लगातार बिदा छ।"}]
    },
    {
        "id": "N3-L51-022", "lesson": 51, "level": "N3",
        "word": "お盆休み", "reading": "おぼんやすみ",
        "meaning": "obon holidays", "meaningNepali": "ओबोन बिदा (जापानी परम्परागत बिदा)",
        "kanjiCharacters": ["盆", "休"], "partOfSpeech": "Noun",
        "grammarSentences": [{"japanese": "お盆休みに田舎へ帰る。", "reading": "おぼんやすみにいなかへかえる。", "english": "Return to hometown during Obon holidays.", "nepali": "ओबोन बिदामा गाउँ फर्कनु।"}]
    },
    {
        "id": "N3-L51-023", "lesson": 51, "level": "N3",
        "word": "ゴールデンウィーク", "reading": "ゴールデンウィーク",
        "meaning": "Golden week holiday", "meaningNepali": "गोल्डेन विक बिदा",
        "kanjiCharacters": [], "partOfSpeech": "Noun",
        "grammarSentences": [{"japanese": "ゴールデンウィークに旅行する。", "reading": "ゴールデンウィークにりょこうする。", "english": "Travel during Golden Week.", "nepali": "गोल्डेन विकमा भ्रमण गर्नु।"}]
    },
    {
        "id": "N3-L51-024", "lesson": 51, "level": "N3",
        "word": "週明け", "reading": "しゅうあけ",
        "meaning": "beginning of the week", "meaningNepali": "हप्ताको सुरुवात (सोमबार)",
        "kanjiCharacters": ["週", "明"], "partOfSpeech": "Noun",
        "grammarSentences": [{"japanese": "週明けに会議を行います。", "reading": "しゅうあけにかいぎをおこないます。", "english": "Hold a meeting at the beginning of the week.", "nepali": "हप्ताको सुरुवातमा बैठक बस्नु।"}]
    },
    {
        "id": "N3-L51-025", "lesson": 51, "level": "N3", "word": "年中無休", "reading": "ねんじゅうむきゅう",
        "meaning": "the whole year without a break / open 365 days", "meaningNepali": "वर्षैभरि खुला (बिदा बिना)",
        "kanjiCharacters": ["年", "中", "無", "休"], "partOfSpeech": "Noun",
        "grammarSentences": [{"japanese": "このスーパーは年中無休です。", "reading": "このスーパーはねんじゅうむきゅうです。", "english": "This supermarket is open all year round.", "nepali": "यो सुपरमार्केट वर्षैभरि खुला रहन्छ।"}]
    }
]

# Update lib/nihongo-vocab.ts for Lesson 51
with open("lib/nihongo-vocab.ts", "r", encoding="utf-8") as f:
    vocab_ts = f.read()

# Remove existing v51 items if any
vocab_ts_cleaned = re.sub(r'  \{\s*"id": "v51_.*?\n', '', vocab_ts)
vocab_ts_cleaned = re.sub(r'  \{\s*"id": "N3-L51-.*?\n', '', vocab_ts_cleaned)

# Find where LESSONS 51 TO 60 section is or insert before array close
section_hdr = "// LESSONS 51 TO 60 — N3 COMPLETE VOCABULARY"
hdr_pos = vocab_ts_cleaned.find(section_hdr)

items_formatted = ",\n".join("  " + json.dumps(item, ensure_ascii=False) for item in lesson_51_vocab)

if hdr_pos != -1:
    end_of_hdr = vocab_ts_cleaned.find("\n", hdr_pos) + 1
    # Check if header line was double line
    if "═" in vocab_ts_cleaned[end_of_hdr:end_of_hdr+60]:
        end_of_hdr = vocab_ts_cleaned.find("\n", end_of_hdr) + 1
    
    new_code = vocab_ts_cleaned[:end_of_hdr] + items_formatted + ",\n" + vocab_ts_cleaned[end_of_hdr:]
else:
    array_close = vocab_ts_cleaned.rfind("];")
    new_code = vocab_ts_cleaned[:array_close].rstrip() + ",\n" + items_formatted + "\n];\n"

with open("lib/nihongo-vocab.ts", "w", encoding="utf-8") as f:
    f.write(new_code)

print("✅ Updated Lesson 51 vocabulary in lib/nihongo-vocab.ts with all 25 items from user image!")
