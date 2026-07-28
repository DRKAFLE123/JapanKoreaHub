import json

with open("lib/nihongo-vocab.ts", "r", encoding="utf-8") as f:
    code = f.read()

# Extract Lesson 50 entries
l50_items = []
for line in code.splitlines():
    if '"lesson": 50' in line or "'lesson': 50" in line:
        line_clean = line.strip().rstrip(",")
        try:
            obj = json.loads(line_clean)
            l50_items.append(obj)
        except Exception as e:
            pass

print(f"Current Lesson 50 entries in lib/nihongo-vocab.ts: {len(l50_items)}")
for idx, item in enumerate(l50_items, 1):
    print(f"{idx}. {item['meaning']}")
