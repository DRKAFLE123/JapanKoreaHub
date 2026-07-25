'use client';

import React, { useState } from 'react';
import { Layers, Sparkles, BookOpen, Search, Info, HelpCircle, ArrowRight, Grid, Eye } from 'lucide-react';

export interface RadicalPart {
  radical: string;
  name: string;
  meaning: string;
  meaningNepali: string;
  position: 'Hen (偏 - Left)' | 'Tsukuri (旁 - Right)' | 'Kanmuri (冠 - Top)' | 'Ashi (脚 - Bottom)' | 'Tare (垂 - Top-Left)' | 'Nyo (尿 - Bottom-Left)' | 'Kamae (構 - Enclosure)' | 'Center (中)';
  strokeCount: number;
  color: string;
}

export interface KanjiDecomposition {
  character: string;
  reading: string;
  meaning: string;
  meaningNepali: string;
  jlpt: 'N5' | 'N4' | 'N3' | 'N2';
  totalStrokes: number;
  parts: RadicalPart[];
  mnemonicEnglish: string;
  mnemonicNepali: string;
  relatedKanji: string[];
}

const DECOMPOSED_KANJI_DATABASE: KanjiDecomposition[] = [
  {
    character: '明',
    reading: 'あかるい / めい (Akarui / Mei)',
    meaning: 'Bright, Clear, Tomorrow',
    meaningNepali: 'उज्यालो, स्पष्ट, भोलि',
    jlpt: 'N5',
    totalStrokes: 8,
    parts: [
      { radical: '日', name: 'Hi-hen (日偏)', meaning: 'Sun / Day', meaningNepali: 'घाम / दिन', position: 'Hen (偏 - Left)', strokeCount: 4, color: '#f59e0b' },
      { radical: '月', name: 'Tsuki (月)', meaning: 'Moon / Month', meaningNepali: 'जौन / महिना', position: 'Tsukuri (旁 - Right)', strokeCount: 4, color: '#3b82f6' },
    ],
    mnemonicEnglish: 'Combining the Sun (日) and the Moon (月) creates ultimate BRIGHTNESS (明).',
    mnemonicNepali: 'घाम (日) र जौन (月) दुवै मिलेर उज्यालो (明) बन्छ।',
    relatedKanji: ['晴', '時', '春', '朝', '期'],
  },
  {
    character: '休',
    reading: 'やすむ / きゅう (Yasumu / Kyuu)',
    meaning: 'Rest, Holiday, Sleep',
    meaningNepali: 'आराम गर्नु, बिदा',
    jlpt: 'N5',
    totalStrokes: 6,
    parts: [
      { radical: '亻', name: 'Nin-ben (人偏)', meaning: 'Person / Human', meaningNepali: 'मानिस', position: 'Hen (偏 - Left)', strokeCount: 2, color: '#ec4899' },
      { radical: '木', name: 'Ki (木)', meaning: 'Tree / Wood', meaningNepali: 'रुख / काठ', position: 'Tsukuri (旁 - Right)', strokeCount: 4, color: '#10b981' },
    ],
    mnemonicEnglish: 'A Person (亻) leaning against a Tree (木) is RESTING (休).',
    mnemonicNepali: 'मानिस (亻) रुख (木) मा अडेस लागेर आराम (休) गर्छ।',
    relatedKanji: ['体', '保', '信', '林', '森'],
  },
  {
    character: '語',
    reading: 'かたる / ご (Kataru / Go)',
    meaning: 'Language, Speech, Word',
    meaningNepali: 'भाषा, बोली, शब्द',
    jlpt: 'N5',
    totalStrokes: 14,
    parts: [
      { radical: '言', name: 'Gon-ben (言偏)', meaning: 'Words / Speech', meaningNepali: 'शब्द / बोली', position: 'Hen (偏 - Left)', strokeCount: 7, color: '#8b5cf6' },
      { radical: '五', name: 'Go (五)', meaning: 'Five', meaningNepali: 'पाँच', position: 'Kanmuri (冠 - Top)', strokeCount: 4, color: '#f43f5e' },
      { radical: '口', name: 'Kuchi (口)', meaning: 'Mouth', meaningNepali: 'मुख', position: 'Ashi (脚 - Bottom)', strokeCount: 3, color: '#06b6d4' },
    ],
    mnemonicEnglish: 'Words (言) spoken by Five (五) Mouths (口) form a LANGUAGE (語).',
    mnemonicNepali: 'पाँच (五) मुख (口) बाट निस्किएका शब्द (言) नै भाषा (語) हो।',
    relatedKanji: ['話', '読', '記', '吾', '味'],
  },
  {
    character: '男',
    reading: '오토코 / だん (Otoko / Dan)',
    meaning: 'Man, Male',
    meaningNepali: 'पुरुष, मानिस (लोग्नेमान्छे)',
    jlpt: 'N5',
    totalStrokes: 7,
    parts: [
      { radical: '田', name: 'Ta (田)', meaning: 'Rice Field', meaningNepali: 'खेत', position: 'Kanmuri (冠 - Top)', strokeCount: 5, color: '#84cc16' },
      { radical: '力', name: 'Chikara (力)', meaning: 'Power / Strength', meaningNepali: 'शक्ति / तागत', position: 'Ashi (脚 - Bottom)', strokeCount: 2, color: '#ef4444' },
    ],
    mnemonicEnglish: 'The person using Strength (力) in the Rice Field (田) is a MAN (男).',
    mnemonicNepali: 'खेत (田) मा तागत (力) लगाउने मानिस पुरुष (男) हो।',
    relatedKanji: ['町', '畑', '勇', '動', '加'],
  },
  {
    character: '好',
    reading: 'すき / こう (Suki / Kou)',
    meaning: 'Like, Favorite, Good',
    meaningNepali: 'मन पर्नु, मनपर्ने',
    jlpt: 'N4',
    totalStrokes: 6,
    parts: [
      { radical: '女', name: 'Onna-hen (女偏)', meaning: 'Woman / Mother', meaningNepali: 'महिला / आमा', position: 'Hen (偏 - Left)', strokeCount: 3, color: '#f43f5e' },
      { radical: '子', name: 'Ko (子)', meaning: 'Child / Baby', meaningNepali: 'बच्चा', position: 'Tsukuri (旁 - Right)', strokeCount: 3, color: '#3b82f6' },
    ],
    mnemonicEnglish: 'A Mother (女) holding her Child (子) is what everyone LIKES (好).',
    mnemonicNepali: 'आमा (女) ले बच्चा (子) लाई माया गरेको दृश्य सबैलाई मन पर्छ (好)।',
    relatedKanji: ['妹', '姉', '学', '字', '存'],
  },
  {
    character: '晴',
    reading: 'はれる / せい (Hareru / Sei)',
    meaning: 'Clear Weather, Fine Sky',
    meaningNepali: 'सफा मौसम, घाम लाग्नु',
    jlpt: 'N4',
    totalStrokes: 12,
    parts: [
      { radical: '日', name: 'Hi-hen (日偏)', meaning: 'Sun', meaningNepali: 'घाम', position: 'Hen (偏 - Left)', strokeCount: 4, color: '#f59e0b' },
      { radical: '青', name: 'Ao (青)', meaning: 'Blue / Clean', meaningNepali: 'नीलो / सफा', position: 'Tsukuri (旁 - Right)', strokeCount: 8, color: '#06b6d4' },
    ],
    mnemonicEnglish: 'When the Sun (日) shines on a Blue (青) sky, it is CLEAR WEATHER (晴).',
    mnemonicNepali: 'नीलो (青) आकाशमा घाम (日) लाग्नु भनेको सफा मौसम (晴) हो।',
    relatedKanji: ['時', '明', '静', '清', '情'],
  },
  {
    character: '森',
    reading: 'もり / しん (Mori / Shin)',
    meaning: 'Forest, Woods',
    meaningNepali: 'जङ्गल, वन',
    jlpt: 'N4',
    totalStrokes: 12,
    parts: [
      { radical: '木', name: 'Ki (木)', meaning: 'Tree 1', meaningNepali: 'रुख १', position: 'Kanmuri (冠 - Top)', strokeCount: 4, color: '#10b981' },
      { radical: '木', name: 'Ki (木)', meaning: 'Tree 2', meaningNepali: 'रुख २', position: 'Hen (偏 - Left)', strokeCount: 4, color: '#059669' },
      { radical: '木', name: 'Ki (木)', meaning: 'Tree 3', meaningNepali: 'रुख ३', position: 'Tsukuri (旁 - Right)', strokeCount: 4, color: '#047857' },
    ],
    mnemonicEnglish: 'Three Trees (木 + 木 + 木) grouped together form a dense FOREST (森).',
    mnemonicNepali: 'तीनवटा रुखहरू (木 + 木 + 木) मिलेर ठूलो जङ्गल (森) बन्छ।',
    relatedKanji: ['林', '休', '村', '本', '校'],
  },
  {
    character: '働',
    reading: 'はたらく / どう (Hataraku / Dou)',
    meaning: 'Work, Labor',
    meaningNepali: 'काम गर्नु, श्रम',
    jlpt: 'N3',
    totalStrokes: 13,
    parts: [
      { radical: '亻', name: 'Nin-ben (人偏)', meaning: 'Person', meaningNepali: 'मानिस', position: 'Hen (偏 - Left)', strokeCount: 2, color: '#ec4899' },
      { radical: '重', name: 'Juu (重)', meaning: 'Heavy / Heavy Burden', meaningNepali: 'गह्रौँ / भारी', position: 'Center (中)', strokeCount: 9, color: '#6366f1' },
      { radical: '力', name: 'Chikara (力)', meaning: 'Power / Effort', meaningNepali: 'शक्ति', position: 'Tsukuri (旁 - Right)', strokeCount: 2, color: '#ef4444' },
    ],
    mnemonicEnglish: 'A Person (亻) putting Power (力) into Heavy (重) tasks is WORKING (働).',
    mnemonicNepali: 'मानिस (亻) ले गह्रौँ (重) काममा शक्ति (力) लगाउनु नै काम गर्नु (働) हो।',
    relatedKanji: ['動', '重', '種', '力', '体'],
  },
];

const RADICAL_POSITIONS_GUIDE = [
  { code: 'Hen', japanese: '偏 (へん)', english: 'Left Side Component', example: '亻, 言, 木, 日', desc: 'Sits on the left side of the Kanji character.' },
  { code: 'Tsukuri', japanese: '旁 (つくり)', english: 'Right Side Component', example: '月, 刀, 欠', desc: 'Sits on the right side of the Kanji character.' },
  { code: 'Kanmuri', japanese: '冠 (かんむり)', english: 'Top Crown Component', example: '宀, 竹, 艹', desc: 'Sits on the top portion of the Kanji character.' },
  { code: 'Ashi', japanese: '脚 (あし)', english: 'Bottom Foot Component', example: '心, 灬, 足', desc: 'Sits at the bottom base of the Kanji character.' },
  { code: 'Tare', japanese: '垂 (たれ)', english: 'Top-Left Enclosure', example: '广, 病, 厂', desc: 'Hangs from top-left over the character.' },
  { code: 'Nyo', japanese: '尿 (にょう)', english: 'Bottom-Left Enclosure', example: '辶, 廴', desc: 'Surrounds the bottom and left side.' },
  { code: 'Kamae', japanese: '構 (かまえ)', english: 'Full Enclosure Box', example: '囗, 門, 行', desc: 'Frames or completely encloses the inner elements.' },
];

export const RadicalBreakdown: React.FC = () => {
  const [selectedKanji, setSelectedKanji] = useState<KanjiDecomposition>(DECOMPOSED_KANJI_DATABASE[0]);
  const [activePart, setActivePart] = useState<RadicalPart>(DECOMPOSED_KANJI_DATABASE[0].parts[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'VISUALIZER' | 'POSITIONS_GUIDE'>('VISUALIZER');

  const filteredKanjiList = DECOMPOSED_KANJI_DATABASE.filter(
    item =>
      item.character.includes(searchQuery) ||
      item.meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.meaningNepali.includes(searchQuery) ||
      item.reading.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectKanji = (item: KanjiDecomposition) => {
    setSelectedKanji(item);
    setActivePart(item.parts[0]);
  };

  return (
    <div className="w-full max-w-5xl mx-auto font-sans space-y-6">
      {/* Top Header Card */}
      <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
            <Layers className="w-4 h-4 text-amber-400" />
            <span>Kanji Structural Anatomy & Mnemonic Visualizer</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">
            Character Structural Decomposition (漢字部首分解 & 記憶法)
          </h2>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center bg-slate-950 p-1 rounded-2xl border border-slate-800">
          <button
            onClick={() => setActiveTab('VISUALIZER')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'VISUALIZER' ? 'bg-amber-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Kanji Formula Visualizer</span>
          </button>
          <button
            onClick={() => setActiveTab('POSITIONS_GUIDE')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'POSITIONS_GUIDE' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>7 Radical Positions (偏・旁・冠)</span>
          </button>
        </div>
      </div>

      {activeTab === 'VISUALIZER' ? (
        <>
          {/* Kanji Selection Strip */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-4 shadow-xl">
            <div className="flex items-center justify-between gap-4 mb-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Select Kanji to Decompose ({filteredKanjiList.length} items)
              </div>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search Kanji, meaning, or Nepali..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-700">
              {filteredKanjiList.map((item) => (
                <button
                  key={item.character}
                  onClick={() => handleSelectKanji(item)}
                  className={`p-3 rounded-2xl border transition-all flex flex-col items-center justify-center min-w-[76px] cursor-pointer ${
                    selectedKanji.character === item.character
                      ? 'bg-amber-600 border-amber-400 text-white scale-105 shadow-glow'
                      : 'bg-slate-950/80 hover:bg-slate-800 border-slate-800 text-slate-300'
                  }`}
                >
                  <span className="text-2xl font-jp font-black">{item.character}</span>
                  <span className="text-[10px] font-bold mt-1 text-amber-200">{item.jlpt}</span>
                  <span className="text-[9px] text-slate-400 truncate max-w-[64px]">{item.meaning.split(',')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Main Visualizer Decomposition Display */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Decomposed Structural Anatomy */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    Character Structural Anatomy
                  </span>
                  <span className="px-2.5 py-0.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold">
                    JLPT {selectedKanji.jlpt} • {selectedKanji.totalStrokes} Strokes
                  </span>
                </div>

                {/* Target Kanji Character Box */}
                <div className="my-6 text-center space-y-2">
                  <div className="relative inline-flex items-center justify-center w-36 h-36 rounded-3xl bg-slate-950 border-2 border-amber-500/40 shadow-inner">
                    <div className="text-7xl font-jp font-black text-transparent bg-clip-text bg-gradient-to-tr from-amber-300 via-yellow-100 to-white select-none">
                      {selectedKanji.character}
                    </div>
                  </div>
                  <div className="text-xl font-extrabold text-white">{selectedKanji.meaning}</div>
                  <div className="text-sm font-bold text-amber-400">🇳🇵 {selectedKanji.meaningNepali}</div>
                  <div className="text-xs text-slate-400 italic">{selectedKanji.reading}</div>
                </div>

                {/* Radical Assembly Formula */}
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 text-center">
                    Structural Addition Formula
                  </div>
                  <div className="flex items-center justify-center gap-3 flex-wrap p-4 rounded-2xl bg-slate-950 border border-slate-800">
                    {selectedKanji.parts.map((part, idx) => (
                      <React.Fragment key={idx}>
                        {idx > 0 && <span className="text-xl font-black text-slate-500">+</span>}
                        <button
                          onClick={() => setActivePart(part)}
                          className={`px-4 py-2 rounded-2xl font-jp font-black text-2xl shadow-lg transition-all border flex flex-col items-center cursor-pointer ${
                            activePart.radical === part.radical
                              ? 'scale-110 ring-2 ring-white text-slate-950 shadow-glow'
                              : 'hover:scale-105 text-slate-950 opacity-90'
                          }`}
                          style={{ backgroundColor: part.color }}
                        >
                          <span>{part.radical}</span>
                          <span className="text-[9px] font-bold text-slate-900 leading-tight">{part.name.split(' (')[0]}</span>
                        </button>
                      </React.Fragment>
                    ))}
                  </div>
                  <div className="text-[11px] text-slate-400 text-center mt-2 font-medium">
                    Click any radical component above to inspect its position & meaning
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Selected Radical Mnemonic & Position Card */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span
                      className="px-3 py-1 rounded-xl font-jp font-black text-lg text-slate-950 shadow-md"
                      style={{ backgroundColor: activePart.color }}
                    >
                      {activePart.radical}
                    </span>
                    <div>
                      <div className="text-xs font-bold text-white">{activePart.name}</div>
                      <div className="text-[11px] text-amber-400 font-semibold">{activePart.position}</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-400">{activePart.strokeCount} Strokes</span>
                </div>

                {/* Meaning & Nepali */}
                <div className="my-4 space-y-3">
                  <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Radical Meaning</span>
                    <div className="text-base font-extrabold text-white">🇬🇧 {activePart.meaning}</div>
                    <div className="text-sm font-bold text-amber-400">🇳🇵 {activePart.meaningNepali}</div>
                  </div>

                  {/* Mnemonic Hook Cards */}
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider">
                      <Sparkles className="w-4 h-4" />
                      <span>Visual Mnemonic Memory Story (English)</span>
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed font-medium">
                      {selectedKanji.mnemonicEnglish}
                    </p>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                      <span>🇳🇵 सम्झिने तरिका (Nepali Mnemonic Hook)</span>
                    </div>
                    <p className="text-xs text-amber-300 leading-relaxed font-semibold">
                      {selectedKanji.mnemonicNepali}
                    </p>
                  </div>

                  {/* Related Kanji Chips */}
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                      Other Kanji Sharing Radical ({activePart.radical})
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {selectedKanji.relatedKanji.map((k, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 font-jp font-bold text-base text-amber-300 hover:border-amber-500 hover:text-white transition-all cursor-pointer shadow"
                        >
                          {k}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* 7 Radical Positions Reference Guide */
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5">
          <div className="pb-3 border-b border-slate-800">
            <h3 className="text-lg font-extrabold text-white">
              The 7 Structural Radical Positions in Kanji (漢字の七大位置)
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Kanji radicals are placed in 7 main structural positions. Learning these positions makes character recognition 10x faster.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {RADICAL_POSITIONS_GUIDE.map((pos, idx) => (
              <div
                key={idx}
                className="bg-slate-950 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-4 space-y-2 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-extrabold text-indigo-400">{pos.japanese}</span>
                  <span className="px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 text-[10px] font-bold border border-indigo-500/30">
                    {pos.code}
                  </span>
                </div>
                <div className="text-xs font-bold text-white">{pos.english}</div>
                <p className="text-xs text-slate-400 leading-relaxed">{pos.desc}</p>
                <div className="text-xs text-amber-400 font-semibold pt-1 border-t border-slate-900">
                  Examples: <span className="font-jp text-white font-bold">{pos.example}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
