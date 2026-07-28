import json
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open("scratch/docx_lessons_13_20.json", "r", encoding="utf-8") as f:
    data_all = json.load(f)

# Helper function to extract Kanji array from Japanese text
def extract_kanji_array(jp_text):
    kanjis = re.findall(r'[\u4e00-\u9faf]', jp_text)
    return list(dict.fromkeys(kanjis))  # deduplicate preserving order

# Helper for basic pos tagging
def get_pos(jp, eng):
    eng_lower = eng.lower()
    if any(jp.endswith(v) for v in ['ます', 'する']) or 'verb' in eng_lower or 'go' in eng_lower or 'do' in eng_lower:
        return 'Verb'
    elif jp.endswith('い') or 'adjective' in eng_lower:
        return 'I-Adj'
    elif jp.endswith('な'):
        return 'Na-Adj'
    return 'Noun'

print("Preparing dataset generator for Lessons 13 to 20...")
