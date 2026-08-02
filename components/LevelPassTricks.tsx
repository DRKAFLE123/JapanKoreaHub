import React, { useState } from 'react';
import { X, Sparkles, Zap, CheckCircle2, Target, ShieldCheck, Clock, BookOpen, AlertCircle, Award } from 'lucide-react';

interface LevelPassTricksProps {
  level: 'BASICS' | 'N5' | 'N4' | 'N3' | 'N2' | 'N1' | 'JFT';
  onClose: () => void;
}

export const LevelPassTricks: React.FC<LevelPassTricksProps> = ({ level, onClose }) => {
  const [activeTab, setActiveTab] = useState<'STRATEGY' | 'LISTENING_TRICKS' | 'READING_HACKS' | 'SCORING'>('STRATEGY');

  const levelInfo = {
    BASICS: {
      name: 'Japanese Basics (Hiragana & Katakana)',
      passScore: '100% Reading Mastery',
      timeLimit: 'No Time Limit',
      emoji: '🌱',
      color: 'from-emerald-600 to-teal-600',
      textColor: 'text-emerald-400',
      bgBorder: 'border-emerald-500/30 bg-emerald-950/40',
      summary: 'Master Hiragana, Katakana, and basic pronunciation matrix to lay a flawless foundation.',
      strategies: [
        { title: 'Learn Dakuon & Handakuon Pairs', desc: 'Group か(ka) → が(ga), は(ha) → ば(ba)/ぱ(pa) to double your character recognition instantly.' },
        { title: 'Master Similar Shapes Early', desc: 'Differentiate tricky pairs: シ(shi) vs ツ(tsu), ソ(so) vs ン(n), れ(re) vs ね(ne) vs わ(wa).' },
        { title: 'Audio Sound Association', desc: 'Listen to native audio for long vowels (おう / えい) and double consonants (っ / ッ small tsu).' },
      ],
      listeningTricks: [
        'Pay close attention to double consonants (促音 っ): かかった (kakatta) vs かかった (kakata).',
        'Identify pitch accents on high/low starting words early.',
        'Use audio grid speed controls (0.75x to 1.25x) to train ear speed.'
      ],
      readingHacks: [
        'Read Kana combinations in short blocks (e.g., お・は・よ・う).',
        'Practice reading Katakana loanwords backwards to unlock English roots (e.g., コンピューター = Computer).'
      ],
      scoring: 'Aim for 100% accuracy on Kana flashcards before moving to JLPT N5.'
    },
    N5: {
      name: 'JLPT N5 Examination',
      passScore: '80 / 180 Points (Overall) & 38/120 Language Knowledge, 19/60 Listening',
      timeLimit: '105 Minutes Total',
      emoji: '🎗',
      color: 'from-blue-600 to-indigo-600',
      textColor: 'text-blue-400',
      bgBorder: 'border-blue-500/30 bg-blue-950/40',
      summary: 'Focus on 100 essential Kanji, 800 basic vocabulary words, and core particle sentence structures.',
      strategies: [
        { title: 'Particle Trap Rule', desc: 'Never guess particles! は marks topic, が marks subject/attribute, に marks direction/time, で marks location of action.' },
        { title: 'Verb Conjugation Formula', desc: 'Master ます-form to て-form conversion rules (う/つ/る → った, む/ぶ/ぬ → んだ).' },
        { title: 'Time Saver Rule', desc: 'Spend no more than 40 seconds per Kanji reading question.' }
      ],
      listeningTricks: [
        'Look at picture choices BEFORE the audio starts playing.',
        'Listen for change-of-mind phrases: "あ、やっぱり..." or "じゃなくて..."',
        'The answer is usually at the very end of the dialogue after the final verb!'
      ],
      readingHacks: [
        'Read the question FIRST before reading the short passage.',
        'Look for key contrast words: しかし (shikashi), でも (demo), ただし (tadasu).'
      ],
      scoring: 'Target 95+ points for a comfortable margin. Focus heavily on Vocabulary & Kanji for guaranteed fast points.'
    },
    N4: {
      name: 'JLPT N4 Examination',
      passScore: '90 / 180 Points (Overall) & 38/120 Language Knowledge, 19/60 Listening',
      timeLimit: '115 Minutes Total',
      emoji: '🎖',
      color: 'from-purple-600 to-pink-600',
      textColor: 'text-purple-400',
      bgBorder: 'border-purple-500/30 bg-purple-950/40',
      summary: 'Master 300 Kanji, 1,500 vocabulary words, te-form combinations, conditional forms (ば, たら, と, なら), and basic Keigo.',
      strategies: [
        { title: 'Conditional Form Rule', desc: 'Distinguish たら (after/if), と (natural result), ば (hypothetical), なら (topic advice).' },
        { title: 'Volitional & Potential Forms', desc: 'Identify 行こう (let us go) vs 行ける (can go) immediately without hesitation.' },
        { title: 'Star Question Secret (★)', desc: 'Rearrange sentence blocks by identifying verb modifiers and target particles first.' }
      ],
      listeningTricks: [
        'In Quick Response (即時応答), elimination is key: eliminate polite vs casual mismatch immediately.',
        'Listen for request expressions: 〜ていただけませんか (Could you please...?).',
        'Take notes on WHO does WHAT action (男の人 vs 女の人).'
      ],
      readingHacks: [
        'Information retrieval section (Notice boards/flyers): Read requirements first, check exclusion dates, pick answer.',
        'Do NOT read the whole text! Scan for exact numbers, dates, and condition words.'
      ],
      scoring: 'Target 110+ points. N4 reading has longer passages, so reserve at least 35 minutes for reading!'
    },
    N3: {
      name: 'JLPT N3 Examination (Intermediate Bridge)',
      passScore: '95 / 180 Points (Overall) & 19/60 Per Section Minimal Requirement',
      timeLimit: '140 Minutes Total',
      emoji: '🏆',
      color: 'from-amber-600 to-orange-600',
      textColor: 'text-amber-400',
      bgBorder: 'border-amber-500/30 bg-amber-950/40',
      summary: 'Master 650 Kanji, 3,000 vocabulary words, advanced grammar markers (〜に違いない, 〜わけにはいかない, 〜によって), and authentic news passages.',
      strategies: [
        { title: 'Nuance Distinction Formula', desc: 'Differentiate 〜おそれがある (fear of risk) vs 〜に違いない (certain conviction) vs 〜はずがない (impossible).' },
        { title: 'Kanji Compound Decoding', desc: 'Break down multi-kanji terms by identifying radical core (e.g. 政治: 政 = politics, 治 = govern).' },
        { title: 'Passive-Causative Reflex', desc: 'Recognize 〜させられる (forced to do) instantly to understand speaker perspective.' }
      ],
      listeningTricks: [
        'Task-based listening: Write down the 3 steps the main speaker must take in chronological order.',
        'Comprehension listening: Listen for author\'s core opinion summary: 要するに (in short), つまり (in other words).'
      ],
      readingHacks: [
        'Identify conjunction signals: したがって (therefore), なぜなら (because), 一方で (on the other hand).',
        'Underline author\'s stance marked by 〜と思う (I think), 〜ではないだろうか (Isn\'t it the case that?).'
      ],
      scoring: 'Requires balanced points across all 3 sections. Don\'t let listening fall below 19/60!'
    },
    JFT: {
      name: 'JFT-Basic (Japan Foundation Test for Basic Japanese)',
      passScore: '200 / 250 Points (Overall Score)',
      timeLimit: '60 Minutes (60 Questions, CBT Screen Exam)',
      emoji: '🎯',
      color: 'from-cyan-600 to-blue-600',
      textColor: 'text-cyan-400',
      bgBorder: 'border-cyan-500/30 bg-cyan-950/40',
      summary: 'Tailored for Specified Skilled Worker (SSW) visa applicants. Focuses on practical daily life & workplace communication in Japan.',
      strategies: [
        { title: 'Practical Situation Priority', desc: 'Focus on real-world situations: apartment renting, train station announcements, workplace safety, supermarket labels.' },
        { title: 'Strict Sectional Timer Management', desc: 'CBT exam locks each section after submission! Complete Script & Vocab → Conversation & Grammar → Listening in order.' },
        { title: 'Can-Do Indicator Focus', desc: 'All questions evaluate JF Can-Do statements. Choose answers that demonstrate appropriate polite behavior.' }
      ],
      listeningTricks: [
        'CBT audio plays automatically. Adjust headset volume before clicking start!',
        'Hospital, store, and workplace announcements state key rules twice—listen for 〜てください and 〜禁止.'
      ],
      readingHacks: [
        'Scan real-life documents: Garbage separation guides, clinic opening hours, bus timetables.',
        'Pay attention to symbols: ○ (Open/Allowed), × (Closed/Forbidden), 休 (Holiday).'
      ],
      scoring: 'Target 210+ points for SSW visa qualification guarantee.'
    },
    N2: {
      name: 'JLPT N2 Examination (Advanced Level)',
      passScore: '90 / 180 Points (Overall) & 19/60 Per Section',
      timeLimit: '155 Minutes Total',
      emoji: '🥉',
      color: 'from-cyan-600 to-teal-600',
      textColor: 'text-cyan-400',
      bgBorder: 'border-cyan-500/30 bg-cyan-950/40',
      summary: 'Master 1,000 Kanji, 6,000 vocabulary words, business honorifics, formal essays, and complex news articles.',
      strategies: [
        { title: 'Grammar Context Trap', desc: 'Distinguish 〜にともなって vs 〜につれて vs 〜にしたがって (proportional changes).' },
        { title: 'Passage Argument Focus', desc: 'Locate the author\'s main conclusion in the final paragraph marked by 結局 (after all) or むしろ (rather).' },
        { title: 'Time Budget Rule', desc: 'Complete Vocabulary & Kanji in under 25 mins to reserve 80 mins for Reading!' }
      ],
      listeningTricks: [
        'Integrated Comprehension (総合理解): Write down speaker A and speaker B positions on scratch pad.',
        'Quick Response: Memorize formal business expressions like お手数をおかけします.'
      ],
      readingHacks: [
        'Short & Medium Passages: Skim questions first, highlight key logical connectors (しかし, だが).',
        'Comparative Passages: Note down differences in opinion between Text A and Text B.'
      ],
      scoring: 'Target 110+ points for guaranteed pass. Maintain balanced scores across all 3 sections.'
    },
    N1: {
      name: 'JLPT N1 Examination (Expert Level)',
      passScore: '100 / 180 Points (Overall) & 19/60 Per Section',
      timeLimit: '170 Minutes Total',
      emoji: '🥇',
      color: 'from-amber-600 to-rose-600',
      textColor: 'text-amber-400',
      bgBorder: 'border-amber-500/30 bg-amber-950/40',
      summary: 'Master 2,000 Kanji, 10,000 vocabulary words, advanced classical grammar, editorial nuance, and native speech speed.',
      strategies: [
        { title: 'Literary Grammar Markers', desc: 'Master 〜極まりない (extreme) vs 〜を余儀なくされる (forced to) vs 〜に至っては (as for).' },
        { title: 'Abstract Concept Parsing', desc: 'Identify abstract metaphors in philosophy and economics editorials.' },
        { title: 'Pacing Rule', desc: 'Maintain strict 1.5 mins per question on Language Knowledge.' }
      ],
      listeningTricks: [
        'Fast-paced natural conversations with implied meanings. Listen for implicit agreement or refusal.',
        'Longer lecture passages: Focus on main thesis and supporting evidence.'
      ],
      readingHacks: [
        'Long Passages & Editorials: Identify subtle author nuances without falling for word traps.',
        'Information Search: Cross-reference conditions rapidly.'
      ],
      scoring: 'Target 120+ points for top tier certification.'
    }
  }[level];

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-3 md:p-6 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className={`p-5 md:p-6 bg-gradient-to-r ${levelInfo.color} relative flex flex-col md:flex-row items-start md:items-center justify-between gap-4`}>
          <div className="flex items-center gap-3">
            <span className="text-3xl md:text-4xl p-2.5 bg-slate-950/30 rounded-2xl backdrop-blur-sm border border-white/10 shadow-lg">
              {levelInfo.emoji}
            </span>
            <div>
              <div className="flex items-center gap-2 text-xs font-black tracking-widest uppercase text-white/80">
                <Sparkles className="w-3.5 h-3.5" /> Exam Pass Blueprint & Secret Tricks
              </div>
              <h2 className="text-xl md:text-2xl font-black text-white">{levelInfo.name}</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl bg-slate-950/40 hover:bg-slate-950 text-white/80 hover:text-white border border-white/10 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-4 bg-slate-950/60 border-b border-slate-800 text-xs">
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
            <Award className={`w-4 h-4 ${levelInfo.textColor}`} />
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-500">Passing Mark</div>
              <div className="font-bold text-white">{levelInfo.passScore}</div>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
            <Clock className="w-4 h-4 text-amber-400" />
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-500">Exam Time</div>
              <div className="font-bold text-white">{levelInfo.timeLimit}</div>
            </div>
          </div>
          <div className="col-span-2 md:col-span-1 flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-500">Mastery Level</div>
              <div className="font-bold text-white">{level} Curriculum</div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 px-4 pt-3 border-b border-slate-800 overflow-x-auto no-scrollbar bg-slate-900/90">
          {[
            { id: 'STRATEGY', label: 'Core Strategy', icon: Target },
            { id: 'LISTENING_TRICKS', label: 'Listening Hacks', icon: Zap },
            { id: 'READING_HACKS', label: 'Reading Speed Tips', icon: BookOpen },
            { id: 'SCORING', label: 'Score Blueprint', icon: CheckCircle2 },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-bold whitespace-nowrap transition-all border-b-2 ${
                  isActive
                    ? `${levelInfo.textColor} border-indigo-500 bg-slate-800/80`
                    : 'text-slate-400 border-transparent hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Modal Body */}
        <div className="p-5 md:p-6 overflow-y-auto flex-1 space-y-4">
          {activeTab === 'STRATEGY' && (
            <div className="space-y-4 animate-fade-in">
              <div className={`p-4 rounded-2xl border ${levelInfo.bgBorder}`}>
                <div className="text-xs font-bold text-slate-300 mb-1">🎯 Level Goal & Summary</div>
                <p className="text-sm text-slate-200 leading-relaxed">{levelInfo.summary}</p>
              </div>

              <div className="text-xs font-black uppercase tracking-wider text-slate-400 pt-2">
                Top 3 Passing Formulas
              </div>
              <div className="grid gap-3">
                {levelInfo.strategies.map((st, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3.5">
                    <div className={`w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs shrink-0 ${levelInfo.textColor} bg-slate-900 border border-slate-800 shadow-md`}>
                      0{idx + 1}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{st.title}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed mt-0.5">{st.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'LISTENING_TRICKS' && (
            <div className="space-y-3 animate-fade-in">
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                Audio questions are played ONLY ONCE in the real JLPT & JFT exams. Train with native speed!
              </div>
              <div className="grid gap-3">
                {levelInfo.listeningTricks.map((trick, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
                    <Zap className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <p className="text-xs text-slate-200 leading-relaxed">{trick}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'READING_HACKS' && (
            <div className="space-y-3 animate-fade-in">
              <div className="grid gap-3">
                {levelInfo.readingHacks.map((hack, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
                    <BookOpen className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <p className="text-xs text-slate-200 leading-relaxed">{hack}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'SCORING' && (
            <div className="space-y-4 animate-fade-in">
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-sm font-bold text-white">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Scoring Threshold & Passing Blueprint
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{levelInfo.scoring}</p>
              </div>

              <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/20 text-xs text-indigo-200 space-y-2">
                <div className="font-bold text-indigo-300 uppercase tracking-wider text-[10px]">Pro Tip for Exam Day</div>
                <p>
                  Complete Vocabulary & Kanji questions in the first 20 minutes to save maximum time for the longer reading passages!
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950/80 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-all"
          >
            Close & Continue Studying
          </button>
        </div>
      </div>
    </div>
  );
};
