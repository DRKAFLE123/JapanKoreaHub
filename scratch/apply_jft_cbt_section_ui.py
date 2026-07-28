import os

file_path = "components/TimedExamEngine.tsx"
with open(file_path, "r", encoding="utf-8") as f:
    code = f.read()

# 1. Add JFT Section Lock Modal HTML before exit modal
modal_code = """      {/* Official JFT CBT Section Lock Confirmation Modal */}
      {showJftSectionLockModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 text-center">
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center text-3xl mx-auto shadow-glow">
              🔒
            </div>
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-black uppercase tracking-wider mb-2">
                Prometric CBT Section Lock
              </div>
              <h3 className="text-xl font-black text-white">
                Complete & Seal Section {currentJftSectionIndex + 1}?
              </h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Official Prometric Rule: Once you submit and advance past Section {currentJftSectionIndex + 1}, your answers in this section will be permanently locked and cannot be edited.
              </p>
            </div>
            <div className="space-y-2 pt-2">
              <button
                onClick={() => {
                  stopCurrentAudio();
                  setShowJftSectionLockModal(false);
                  setCurrentJftSectionIndex((prev) => prev + 1);
                  setCurrentIndex(0);
                }}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-black text-xs shadow-glow transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
              >
                <span>Lock Section {currentJftSectionIndex + 1} & Proceed to Section {currentJftSectionIndex + 2} 🔒 ➔</span>
              </button>

              <button
                onClick={() => setShowJftSectionLockModal(false)}
                className="w-full py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-all cursor-pointer"
              >
                Review Section {currentJftSectionIndex + 1} Questions
              </button>
            </div>
          </div>
        </div>
      )}

"""

exit_modal_idx = code.find("{/* Exit Confirmation Modal Prompt */}")
code = code[:exit_modal_idx] + modal_code + code[exit_modal_idx:]

# 2. Update CEFR Ranking display in Scorecard
old_cefr_tag = """                    {isJFT
                      ? (examResult.passed ? '★ CEFR A2 Level • SSW Visa Eligible (200+ Pts)' : 'Below 200 Pts Benchmark')
                      : (examResult.passed ? '★ JLPT Certificate Eligible' : 'Retake Practice Advised')}"""

new_cefr_tag = """                    {isJFT
                      ? `★ ${examResult.cefrRank || (examResult.passed ? 'A2.2 Level • SSW Visa Qualified (200+ Pts)' : 'Below 200 Pts Benchmark')}`
                      : (examResult.passed ? '★ JLPT Certificate Eligible' : 'Retake Practice Advised')}"""

code = code.replace(old_cefr_tag, new_cefr_tag)

# 3. Update Header Section Title for JFT
old_hdr_sec = """              {isJFT && (
                <span className="px-2 py-0.5 rounded-md bg-cyan-600/30 text-cyan-300 border border-cyan-500/40 text-[10px] font-bold">
                  Prometric CBT Interface
                </span>
              )}"""

new_hdr_sec = """              {isJFT && (
                <span className="px-2 py-0.5 rounded-md bg-cyan-600/30 text-cyan-300 border border-cyan-500/40 text-[10px] font-bold">
                  {currentJftSectionIndex === 0 && 'Sec 1: 文字・語彙 (Script & Vocab)'}
                  {currentJftSectionIndex === 1 && 'Sec 2: 会話・表現 (Conversation)'}
                  {currentJftSectionIndex === 2 && 'Sec 3: 聴解 (Listening)'}
                  {currentJftSectionIndex === 3 && 'Sec 4: 読解 (Reading)'}
                </span>
              )}"""

code = code.replace(old_hdr_sec, new_hdr_sec)

# 4. Update Section Submit Buttons in Header and Footer
old_hdr_btn = """{!isSubmitted && (
            <button
              onClick={currentPaperIndex === 0 && rawQuestions.length >= 40 && !isJFT ? handleFinishPaper1 : handleSubmitExam}
              className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-glow transition-all cursor-pointer"
            >
              {currentPaperIndex === 0 && rawQuestions.length >= 40 && !isJFT ? 'Submit Paper 1 ➔' : 'Submit Final Exam 🏁'}
            </button>
          )}"""

new_hdr_btn = """{!isSubmitted && (
            <button
              onClick={() => {
                if (isJFT) {
                  if (currentJftSectionIndex < 3) setShowJftSectionLockModal(true);
                  else handleSubmitExam();
                } else if (currentPaperIndex === 0 && rawQuestions.length >= 40) {
                  handleFinishPaper1();
                } else {
                  handleSubmitExam();
                }
              }}
              className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs shadow-glow transition-all cursor-pointer"
            >
              {isJFT
                ? (currentJftSectionIndex < 3 ? `Lock Section ${currentJftSectionIndex + 1} 🔒 ➔` : 'Submit Final CBT Exam 🏁')
                : (currentPaperIndex === 0 && rawQuestions.length >= 40 ? 'Submit Paper 1 ➔' : 'Submit Final Exam 🏁')}
            </button>
          )}"""

code = code.replace(old_hdr_btn, new_hdr_btn)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(code)

print("SUCCESSFULLY_UPDATED_JFT_CBT_UI_MODALS")
