import sys

sys.stdout.reconfigure(encoding='utf-8')

with open("lib/n5-grammar-guides.ts", "r", encoding="utf-8") as f:
    lines = f.readlines()

print(f"Total lines in lib/n5-grammar-guides.ts: {len(lines)}")
for i, line in enumerate(lines[:30], 1):
    print(f"{i:02d}: {line}", end="")
