import re

with open("lib/nihongo-vocab.ts", "r", encoding="utf-8") as f:
    code = f.read()

# Locate the misplaced lesson 30-35 items
l30_pos = code.find("// ════════════════════════════════════\n  // LESSON 30 — Action State")
v35_18_end = code.find('{"id": "v35_18", "lesson": 35, "level": "N4", "word": "許可", "reading": "きょか", "meaning": "Permission", "meaningNepali": "अनुमति", "kanjiCharacters": ["許", "可"], "partOfSpeech": "Noun"}')
if v35_18_end != -1:
    v35_18_end = code.find("\n", v35_18_end) + 1

l30_35_block = code[l30_pos:v35_18_end]

# Remove the misplaced block from getAvailableLessonsForLevel
code_clean = code[:l30_pos] + code[v35_18_end:]

# Restore getAvailableLessonsForLevel
old_n3_func_block = "if (level === 'N3') {\n    const nums: number[] = [\n];"
new_n3_func_block = """  if (level === 'N3') {
    const nums: number[] = [];
    for (let i = 51; i <= 75; i++) nums.push(i);
    return nums;
  }
  const data = getVocabByLevel(level);
  return [...new Set(data.map(v => v.lesson))].sort((a, b) => a - b);
}"""

code_clean = re.sub(r'  if \(level === \'N3\'\) \{\n\s*const nums: number\[\] = \[\n\s*\];\n.*', new_n3_func_block, code_clean, flags=re.DOTALL)

# Insert l30_35_block inside NIHONGO_VOCAB_DATA before line 444 ];
array_close_idx = code_clean.find("  { id:'v51_1', lesson:51")
code_fixed = code_clean[:array_close_idx] + l30_35_block + "\n  " + code_clean[array_close_idx:]

with open("lib/nihongo-vocab.ts", "w", encoding="utf-8") as f:
    f.write(code_fixed)

print("SUCCESSFULLY_FIXED_NIHONGO_VOCAB_STRUCTURE")
