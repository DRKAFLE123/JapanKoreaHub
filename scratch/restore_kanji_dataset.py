import git
import sys

# Let's restore lib/kanji-dataset.ts using git checkout
import subprocess

subprocess.run(["git", "checkout", "lib/kanji-dataset.ts"])
print("Restored lib/kanji-dataset.ts from git!")
