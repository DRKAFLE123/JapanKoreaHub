import os, re

file_path = "components/TimedExamEngine.tsx"
with open(file_path, "r", encoding="utf-8") as f:
    code = f.read()

# Replace state and component logic to add currentJftSectionIndex and CEFR ranking
sub_idx = code.find("export const TimedExamEngine: React.FC<TimedExamEngineProps>")

# Let's inspect where currentJftSectionIndex can be added in component state
old_state_marker = "const [currentPaperIndex, setCurrentPaperIndex] = useState<number>(0);"
new_state_marker = """const [currentPaperIndex, setCurrentPaperIndex] = useState<number>(0);
  const [currentJftSectionIndex, setCurrentJftSectionIndex] = useState<number>(0);
  const [showJftSectionLockModal, setShowJftSectionLockModal] = useState<boolean>(false);"""

code = code.replace(old_state_marker, new_state_marker)

# Update reset states in handleStartExam and handleExitExam
code = code.replace("setCurrentPaperIndex(0);", "setCurrentPaperIndex(0);\n    setCurrentJftSectionIndex(0);\n    setShowJftSectionLockModal(false);")

# Update currentPaperQuestions selector for JFT
old_memo = """  const currentPaperQuestions = React.useMemo(() => {
    if (!selectedMockTest || selectedMockTest.language !== 'JAPANESE' || rawQuestions.length < 40 || isJFT) {
      return rawQuestions;
    }
    if (currentPaperIndex === 0) return rawQuestions.slice(0, 36); // Paper 1: Vocab + Grammar + Reading (Q1 to Q36)
    return rawQuestions.slice(36); // Paper 2: Audio Listening (Q37 to Q44)
  }, [rawQuestions, currentPaperIndex, selectedMockTest, isJFT]);"""

new_memo = """  const currentPaperQuestions = React.useMemo(() => {
    if (!selectedMockTest || selectedMockTest.language !== 'JAPANESE' || rawQuestions.length < 40) {
      return rawQuestions;
    }
    if (isJFT) {
      if (currentJftSectionIndex === 0) return rawQuestions.slice(0, 12);  // Sec 1: Script & Vocab
      if (currentJftSectionIndex === 1) return rawQuestions.slice(12, 24); // Sec 2: Conversation
      if (currentJftSectionIndex === 2) return rawQuestions.slice(24, 36); // Sec 3: Listening
      return rawQuestions.slice(36); // Sec 4: Reading
    }
    if (currentPaperIndex === 0) return rawQuestions.slice(0, 36); // Paper 1: Vocab + Grammar + Reading (Q1 to Q36)
    return rawQuestions.slice(36); // Paper 2: Audio Listening (Q37 to Q44)
  }, [rawQuestions, currentPaperIndex, currentJftSectionIndex, selectedMockTest, isJFT]);"""

code = code.replace(old_memo, new_memo)

# Update CEFR Ranking labels in JFT Score Result state and rendering
code = code.replace("jftScore?: number;", "jftScore?: number;\n    cefrRank?: string;")

# Update handleSubmitExam for CEFR Rank calculation
old_jft_score_calc = "const jftPoints = Math.max(10, Math.min(250, jftSec1.pts + jftSec2.pts + jftSec3.pts + jftSec4.pts));\n      const passed = jftPoints >= 200;"

new_jft_score_calc = """const jftPoints = Math.max(10, Math.min(250, jftSec1.pts + jftSec2.pts + jftSec3.pts + jftSec4.pts));
      const passed = jftPoints >= 200;

      let cefrRank = 'Below A1 (Unranked)';
      if (jftPoints >= 200) cefrRank = 'A2.2 Level (SSW Visa Qualified 🎉)';
      else if (jftPoints >= 175) cefrRank = 'A2.1 Level (Elementary)';
      else if (jftPoints >= 145) cefrRank = 'A1 Level (Basic Beginner)';"""

code = code.replace(old_jft_score_calc, new_jft_score_calc)

code = code.replace("jftScore: jftPoints,", "jftScore: jftPoints,\n        cefrRank,")

with open(file_path, "w", encoding="utf-8") as f:
    f.write(code)

print("SUCCESSFULLY_UPDATED_JFT_SECTION_LOCK_ENGINE")
