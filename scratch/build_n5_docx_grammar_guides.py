import json
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open("scratch/docx_lessons_13_20.json", "r", encoding="utf-8") as f:
    data_all = json.load(f)

# Helper function to parse example string into array of targets, english, nepali
def parse_examples(ex_str):
    if not ex_str.strip():
        return []
        
    parts = ex_str.split(' / ')
    parsed_examples = []
    
    for part in parts:
        part = part.strip()
        if not part:
            continue
            
        # Match pattern: Japanese (English)
        m = re.match(r'^(.*?)\s*[\(\（](.*?)[\)\）]$', part)
        if m:
            jp = m.group(1).strip()
            eng = m.group(2).strip()
            parsed_examples.append({
                "target": jp,
                "reading": jp,
                "english": eng,
                "nepali": f"{eng} (नेपाली)"
            })
        else:
            parsed_examples.append({
                "target": part,
                "reading": part,
                "english": part,
                "nepali": part
            })
            
    return parsed_examples

lesson_grammar_ts = []

for l in range(13, 21):
    g_points = data_all[str(l)]["grammar"]
    ts_points = []
    
    for gp in g_points:
        pattern = gp["title"]
        title = gp["title"]
        explanation_eng = gp["explanation"]
        explanation_np = f"{gp['explanation']} (नेपाली व्याख्या)"
        examples = parse_examples(gp["examples"])
        
        ts_points.append({
            "title": title,
            "pattern": pattern,
            "explanationEnglish": explanation_eng,
            "explanationNepali": explanation_np,
            "examples": examples
        })
        
    lesson_title = f"Lesson {l} Grammar Guide (から Minna no Nihongo I)"
    
    lesson_grammar_ts.append({
        "language": "JAPANESE",
        "level": "N5",
        "lesson": l,
        "lessonTitle": lesson_title,
        "grammarPoints": ts_points
    })

print(f"Generated grammar guides for {len(lesson_grammar_ts)} lessons!")
print("Sample Lesson 13 Grammar Point 1:")
print(json.dumps(lesson_grammar_ts[0]["grammarPoints"][0], ensure_ascii=False, indent=2))
