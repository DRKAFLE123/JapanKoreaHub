import os

file_path = "components/VocabularyExplorer.tsx"
with open(file_path, "r", encoding="utf-8") as f:
    code = f.read()

# Add state for scanned textbook modal
state_marker = "const [showGrammarModal, setShowGrammarModal] = useState<boolean>(false);"
new_state = """const [showGrammarModal, setShowGrammarModal] = useState<boolean>(false);
  const [showScannedSheetModal, setShowScannedSheetModal] = useState<boolean>(false);"""

code = code.replace(state_marker, new_state)

# Add Scanned Book Sheet Button next to Meanings button
meanings_btn = """                  <button onClick={() => setShowShortNoteModal(true)} className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-extrabold flex items-center gap-1 shadow-sm transition-all whitespace-nowrap cursor-pointer">
                    <FileText className="w-3 h-3" /><span>Meanings</span>
                  </button>"""

new_meanings_btn = """                  <button onClick={() => setShowScannedSheetModal(true)} className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-extrabold flex items-center gap-1 shadow-sm transition-all whitespace-nowrap cursor-pointer" title="View scanned Minna no Nihongo textbook image">
                    <span>🖼️ Scanned Book Sheet (Lesson {selectedLesson})</span>
                  </button>
                  <button onClick={() => setShowShortNoteModal(true)} className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-extrabold flex items-center gap-1 shadow-sm transition-all whitespace-nowrap cursor-pointer">
                    <FileText className="w-3 h-3" /><span>Meanings</span>
                  </button>"""

code = code.replace(meanings_btn, new_meanings_btn)

# Add Scanned Sheet Modal HTML before end of component return
modal_code = """
      {/* SCANNED TEXTBOOK VOCABULARY SHEET MODAL (public/N4-26-50-vocab/lesson{N}.jpg) */}
      {showScannedSheetModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-6 max-w-4xl w-full max-h-[92vh] flex flex-col justify-between shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xl font-bold">
                  📖
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-white">
                    Minna no Nihongo II — Lesson {selectedLesson} Original Textbook Vocabulary Sheet
                  </h3>
                  <p className="text-xs text-slate-400">
                    High-resolution original textbook scan (`/N4-26-50-vocab/lesson{selectedLesson}.jpg`)
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowScannedSheetModal(false)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-rose-900/40 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto max-h-[75vh] flex justify-center bg-slate-950 p-2 rounded-2xl border border-slate-800">
              <img
                src={`/N4-26-50-vocab/lesson${selectedLesson <= 50 ? selectedLesson : 26}.jpg`}
                alt={`Minna no Nihongo Lesson ${selectedLesson} Original Vocabulary`}
                className="max-w-full h-auto rounded-xl object-contain shadow-lg"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs text-slate-400">
              <span>Lesson {selectedLesson}: {LESSON_TOPICS[selectedLesson] || 'N4 Vocabulary'}</span>
              <button
                onClick={() => setShowScannedSheetModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors cursor-pointer"
              >
                Close Textbook Sheet
              </button>
            </div>
          </div>
        </div>
      )}
"""

last_div_idx = code.rfind("</div>\n  );\n};")
code = code[:last_div_idx] + modal_code + code[last_div_idx:]

with open(file_path, "w", encoding="utf-8") as f:
    f.write(code)

print("SUCCESSFULLY_ADDED_SCANNED_SHEET_VIEWER")
