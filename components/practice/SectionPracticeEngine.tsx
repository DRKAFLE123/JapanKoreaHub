'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  BookOpen,
  Headphones,
  FileText,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Eye,
  EyeOff,
  PenTool,
  Mic,
  Award,
  ArrowRight,
  Check,
  RefreshCw,
  Lightbulb,
  Globe,
  Layers,
  Info
} from 'lucide-react';
import {
  PracticeSectionType,
  JAPANESE_LISTENING_PRACTICE,
  JAPANESE_READING_PRACTICE,
  JAPANESE_STAR_QUESTIONS,
  KOREAN_WRITING_PRACTICE,
  KOREAN_ORAL_VIVA_PRACTICE,
  ListeningPracticeItem,
  ReadingPassageItem,
  StarQuestion,
  WritingPracticeItem,
  OralVivaItem
} from '@/lib/section-practice-data';

interface SectionPracticeEngineProps {
  language: 'JAPANESE' | 'KOREAN';
  level: string; // 'N5' | 'N4' | 'N3' | 'N2' | 'N1' | 'JFT' | 'EPS' | 'TOPIK1_L1' | 'TOPIK3' | 'KIIP' | 'BASICS'
  activeSection: PracticeSectionType;
  onSectionChange?: (sec: PracticeSectionType) => void;
  onExit?: () => void;
}

export default function SectionPracticeEngine({
  language,
  level,
  activeSection,
  onSectionChange,
  onExit,
}: SectionPracticeEngineProps) {
  const isJapan = language === 'JAPANESE';
  const themeColor = isJapan ? 'red' : 'blue';

  // State
  const [currentSection, setCurrentSection] = useState<PracticeSectionType>(activeSection);

  // Sync with prop if it changes
  useEffect(() => {
    setCurrentSection(activeSection);
  }, [activeSection]);

  const handleSectionSwitch = (sec: PracticeSectionType) => {
    setCurrentSection(sec);
    if (onSectionChange) onSectionChange(sec);
  };

  // Section availability based on language & level
  const availableSections = useMemo(() => {
    if (isJapan) {
      if (level === 'JFT') {
        return [
          { id: 'LISTENING' as const, label: 'Listening', icon: Headphones, sub: '聴解' },
          { id: 'READING' as const, label: 'Reading', icon: BookOpen, sub: '読解' },
          { id: 'VOCABULARY' as const, label: 'Script & Vocab', icon: Layers, sub: '文字・語彙' },
          { id: 'GRAMMAR' as const, label: 'Expression', icon: FileText, sub: '会話・表現' },
        ];
      }
      return [
        { id: 'LISTENING' as const, label: 'Listening', icon: Headphones, sub: '聴解' },
        { id: 'READING' as const, label: 'Reading', icon: BookOpen, sub: '読解' },
        { id: 'GRAMMAR' as const, label: 'Sentence Star ★', icon: Sparkles, sub: '文の組み立て' },
        { id: 'VOCABULARY' as const, label: 'Vocabulary', icon: Layers, sub: '文字・語彙' },
      ];
    } else {
      // Korean
      const isTopik2 = level === 'TOPIK3' || level === 'TOPIK4' || level === 'TOPIK2_L5' || level === 'TOPIK2_L6';
      const isKiip = level === 'KIIP';
      const isEps = level.startsWith('EPS');

      const tabs: { id: PracticeSectionType; label: string; icon: any; sub: string }[] = [
        { id: 'LISTENING', label: 'Listening', icon: Headphones, sub: '듣기' },
        { id: 'READING', label: 'Reading', icon: BookOpen, sub: '읽기' },
      ];

      if (isTopik2 || isKiip) {
        tabs.push({ id: 'WRITING' as const, label: isTopik2 ? 'Writing (Q51-Q54)' : 'Writing (작문)', icon: PenTool, sub: '쓰기' });
      }

      if (isKiip || isEps) {
        tabs.push({ id: 'ORAL_VIVA' as const, label: isKiip ? 'Oral Interview' : 'Vocational Viva', icon: Mic, sub: '구술시험' });
      }

      tabs.push({ id: 'VOCABULARY' as const, label: 'Vocabulary', icon: Layers, sub: '어휘' });
      return tabs;
    }
  }, [isJapan, level]);

  return (
    <div className="space-y-4 max-w-5xl mx-auto">
      {/* ── HEADER NAVIGATION & SECTION SWITCHER ── */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm text-white shadow-xs ${
            isJapan ? 'bg-red-600 shadow-red-500/20' : 'bg-blue-600 shadow-blue-500/20'
          }`}>
            {level === 'JFT' ? 'JFT' : level.replace('TOPIK1_L1', 'TOPIK I').replace('TOPIK3', 'TOPIK II')}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider ${
                isJapan ? 'bg-red-50 text-red-700 dark:bg-red-950/60 dark:text-red-300' : 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300'
              }`}>
                Official Practice Mode
              </span>
              <span className="text-[11px] font-bold text-slate-500">Untimed • Instant Feedback</span>
            </div>
            <h2 className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
              {currentSection === 'LISTENING' && '🎧 Listening Practice (聴解 / 듣기)'}
              {currentSection === 'READING' && '📖 Reading Practice (読解 / 읽기)'}
              {currentSection === 'WRITING' && '✍️ Official Writing (쓰기 Q51–Q54 & KIIP)'}
              {currentSection === 'GRAMMAR' && '📝 Grammar & Star Reorder (文法 ★)'}
              {currentSection === 'ORAL_VIVA' && '🗣️ Oral Viva & Interview (구술시험)'}
              {currentSection === 'VOCABULARY' && '🔤 Vocabulary & Kanji Drills'}
            </h2>
          </div>
        </div>

        {/* Section Tabs Switcher */}
        <div className="flex items-center gap-1.5 flex-wrap w-full sm:w-auto">
          {availableSections.map((s) => {
            const isActive = currentSection === s.id;
            const Icon = s.icon;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => handleSectionSwitch(s.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer border ${
                  isActive
                    ? isJapan
                      ? 'bg-red-600 text-white border-red-500 shadow-xs'
                      : 'bg-blue-600 text-white border-blue-500 shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-700'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{s.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── ACTIVE SECTION VIEW CANVAS ── */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-3.5 sm:p-6 shadow-xs min-h-[460px]">
        {currentSection === 'LISTENING' && (
          <ListeningSectionView language={language} level={level} />
        )}

        {currentSection === 'READING' && (
          <ReadingSectionView language={language} level={level} />
        )}

        {currentSection === 'WRITING' && (
          <WritingSectionView level={level} />
        )}

        {currentSection === 'GRAMMAR' && (
          <StarGrammarSectionView level={level} />
        )}

        {currentSection === 'ORAL_VIVA' && (
          <OralVivaSectionView level={level} />
        )}

        {currentSection === 'VOCABULARY' && (
          <VocabularyRapidFireView language={language} level={level} />
        )}
      </div>
    </div>
  );
}

// =========================================================================
// 1. LISTENING SECTION VIEW (TTS Audio Player + Script + Translations)
// =========================================================================
function ListeningSectionView({ language, level }: { language: 'JAPANESE' | 'KOREAN'; level: string }) {
  const isJapan = language === 'JAPANESE';
  const items = isJapan ? JAPANESE_LISTENING_PRACTICE : [
    {
      id: 'kr_lis_1',
      level: 'TOPIK1_L1',
      category: 'Daily Conversation (일상 대화)',
      title: '도서관 위치 묻기 (Asking for Library Location)',
      situation: '두 사람이 대화하고 있습니다. 여자는 지금 어디에 가려고 합니까?',
      audioScript: '남: 실례지만, 중앙도서관이 어디에 있습니까?\n여: 아, 저기 보이는 큰 건물 있죠? 그 건물 3층으로 올라가시면 됩니다.\n남: 그렇군요. 학생증이 있어야 들어갈 수 있나요?\n여: 네, 입구에서 학생증이나 신분증을 찍어야 들어갈 수 있습니다.\n남: 감사합니다. 좋은 하루 보내세요.',
      translationEn: 'Man: Excuse me, where is the central library?\nWoman: Ah, do you see that big building over there? Go up to the 3rd floor of that building.\nMan: I see. Do I need a student ID to enter?\nWoman: Yes, you have to scan your student ID or personal ID at the entrance.\nMan: Thank you. Have a great day.',
      translationNe: 'केटो: माफ गर्नुहोला, केन्द्रीय पुस्तकालय कता पर्छ?\nकेटी: ए, उ त्यहाँ देखिएको ठूलो भवन छ नि? त्यो भवनको ३ तल्लामा जानुपर्छ।\nकेटो: ए हो? भित्र छिर्न विद्यार्थी परिचयपत्र चाहिन्छ कि?\nकेटी: हजुर, ढोकामा विद्यार्थी आईडी वा परिचयपत्र स्क्यान गर्नुपर्छ।\nकेटो: धन्यवाद। राम्रो दिन बितोस्।',
      question: '여자의 설명에 따르면 도서관은 몇 층에 있습니까? (According to the woman, which floor is the library on?)',
      options: ['1층 (1st Floor)', '2층 (2nd Floor)', '3층 (3rd Floor)', '지하 1층 (Basement 1)'],
      correctIndex: 2,
      explanationEn: 'The woman states "그 건물 3층으로 올라가시면 됩니다" (Go up to the 3rd floor of that building), so the library is on the 3rd floor.',
      explanationNe: 'केटीले त्यो भवनको ३ तल्लामा जान स्पष्ट रूपमा भनेकी छन्, त्यसैले विकल्प ३ सही हो।',
      vocabulary: [
        { word: '중앙도서관', reading: '중앙도서관', meaningEn: 'Central library', meaningNe: 'केन्द्रीय पुस्तकालय' },
        { word: '학생증', reading: '학생증', meaningEn: 'Student ID card', meaningNe: 'विद्यार्थी परिचयपत्र' },
      ],
    },
    {
      id: 'kr_eps_lis_1',
      level: 'EPS',
      category: 'Workplace Instruction (작업 지시)',
      title: '작업 지시 듣기 (Workplace Instruction Dialogue)',
      situation: '작업장에서 반장님이 작업자에게 지시하고 있습니다. 작업자는 무엇을 해야 합니까?',
      audioScript: '반장: 투안 씨, 오늘 오전에는 프레스 작업을 멈추고 창고에 있는 박스부터 정리해 주세요.\n투안: 네, 반장님. 박스는 어디에 쌓아 둘까요?\n반장: A구역 선반에 번호 순서대로 쌓아 두세요. 그리고 장갑은 꼭 착용하시고요.',
      translationEn: 'Supervisor: Tuan-ssi, this morning stop the press machine work and please organize the boxes in the warehouse first.\nTuan: Yes, Supervisor. Where should I stack the boxes?\nSupervisor: Stack them in section A shelf in numerical order. And be sure to wear gloves.',
      translationNe: 'सुपरभाइजर: तुवान जी, आज बिहान प्रेस मेसिनको काम रोकेर पहिले गोदामका बाकसहरू मिलाउनुहोस्।\nतुवान: हस् सुपरभाइजर ज्यू। बाकसहरू कहाँ मिलाएर राखूँ?\nसुपरभाइजर: क्षेत्र A को र्याकमा नम्बर अनुसार मिलाएर राख्नुहोस्। अनि पञ्जा अनिवार्य लगाउनुहोला।',
      question: '투안 씨가 오늘 오전에 해야 할 일은 무엇입니까? (What must Tuan do this morning?)',
      options: [
        '프레스 기계 작업하기 (Operate the press machine)',
        '창고에 있는 박스 정리하기 (Organize warehouse boxes)',
        '새 장갑 구입하기 (Purchase new gloves)',
        '작업장 청소하기 (Clean the workplace)',
      ],
      correctIndex: 1,
      explanationEn: 'The supervisor instructed to stop the press machine and organize the warehouse boxes first.',
      explanationNe: 'सुपरभाइजरले प्रेस काम रोकेर गोदामका बाकसहरू मिलाउन स्पष्ट निर्देशन दिएका छन्।',
      vocabulary: [
        { word: '창고', reading: '창고', meaningEn: 'Warehouse', meaningNe: 'गोदाम' },
        { word: '장갑', reading: '장갑', meaningEn: 'Gloves', meaningNe: 'पञ्जा' },
      ],
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [showScript, setShowScript] = useState(false);
  const [showNepali, setShowNepali] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const currentItem = items[currentIndex % items.length];

  // Browser TTS Voice
  const handlePlayAudio = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported on this device.');
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(currentItem.audioScript);
    utterance.lang = isJapan ? 'ja-JP' : 'ko-KR';
    utterance.rate = playbackSpeed;

    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    setIsPlaying(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleNext = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setShowScript(false);
    setSelectedOption(null);
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setShowScript(false);
    setSelectedOption(null);
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  return (
    <div className="space-y-5">
      {/* Audio Controller Card - Clean Bright Light Premium Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-200/80 dark:border-slate-700/80">
          <div>
            <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
              isJapan
                ? 'bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-300 border border-red-200/70 dark:border-red-800/70'
                : 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/70 dark:border-blue-800/70'
            }`}>
              {currentItem.category} • Exercise {currentIndex + 1} of {items.length}
            </span>
            <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white mt-1.5">
              {currentItem.title}
            </h3>
          </div>

          {/* Speed Selector */}
          <div className="flex items-center gap-1 bg-white dark:bg-slate-900 rounded-xl p-1 border border-slate-200 dark:border-slate-700 shadow-2xs">
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold px-1.5">Speed:</span>
            {[0.8, 1.0, 1.2].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setPlaybackSpeed(s)}
                className={`px-2 py-0.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                  playbackSpeed === s
                    ? isJapan
                      ? 'bg-red-600 text-white font-black shadow-xs'
                      : 'bg-blue-600 text-white font-black shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>

        {/* Play / Pause Big Button */}
        <div className="py-1 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={handlePlayAudio}
            className={`w-full sm:w-auto px-6 py-2.5 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs ${
              isPlaying
                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 animate-pulse'
                : isJapan
                  ? 'bg-red-600 hover:bg-red-500 text-white shadow-red-600/20'
                  : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/20'
            }`}
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
            <span>{isPlaying ? 'Pause Audio' : 'Play Official Audio (TTS)'}</span>
          </button>

          {/* Script & Translation Toggles */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setShowScript(!showScript)}
              className={`flex-1 sm:flex-none px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 border cursor-pointer ${
                showScript
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800 shadow-xs'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-700'
              }`}
            >
              {showScript ? <EyeOff className="w-3.5 h-3.5 text-emerald-600" /> : <Eye className="w-3.5 h-3.5 text-slate-500" />}
              <span>{showScript ? 'Hide Script' : 'Show Script'}</span>
            </button>

            {showScript && (
              <button
                type="button"
                onClick={() => setShowNepali(!showNepali)}
                className={`flex-1 sm:flex-none px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 border cursor-pointer ${
                  showNepali
                    ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-300 dark:border-indigo-800 shadow-xs'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-700'
                }`}
              >
                <Globe className="w-3.5 h-3.5 text-indigo-600" />
                <span>{showNepali ? 'English' : 'नेपाली'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Revealed Script Drawer */}
        {showScript && (
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-2 animate-fade-in shadow-xs">
            <p className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">Audio Script:</p>
            <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 whitespace-pre-line leading-relaxed">
              {currentItem.audioScript}
            </p>
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <p className="text-xs font-medium text-slate-600 dark:text-slate-400 italic">
                {showNepali ? currentItem.translationNe : currentItem.translationEn}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Comprehension Question Card */}
      <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4">
        <div className="space-y-1">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
            Comprehension Question
          </span>
          <h4 className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
            {currentItem.question}
          </h4>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {currentItem.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === currentItem.correctIndex;
            const hasAnswered = selectedOption !== null;

            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedOption(idx)}
                className={`p-3 rounded-xl text-xs font-bold text-left transition-all border cursor-pointer flex items-start gap-2.5 ${
                  hasAnswered
                    ? isCorrect
                      ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 text-emerald-800 dark:text-emerald-200 font-black'
                      : isSelected
                        ? 'bg-rose-50 dark:bg-rose-950/50 border-rose-500 text-rose-800 dark:text-rose-200 font-black'
                        : 'border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500 opacity-60'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-blue-500 hover:shadow-xs'
                }`}
              >
                <span className={`w-5 h-5 rounded-full text-[11px] font-black flex items-center justify-center shrink-0 border ${
                  hasAnswered && isCorrect
                    ? 'bg-emerald-500 text-white border-emerald-500'
                    : hasAnswered && isSelected
                      ? 'bg-rose-500 text-white border-rose-500'
                      : 'border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400'
                }`}>
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="leading-snug">{opt}</span>
              </button>
            );
          })}
        </div>

        {/* Explanation Card upon answering */}
        {selectedOption !== null && (
          <div className={`p-4 rounded-xl border animate-fade-in space-y-1.5 ${
            selectedOption === currentItem.correctIndex
              ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
              : 'bg-rose-50/80 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200'
          }`}>
            <div className="flex items-center gap-1.5 font-black text-xs">
              {selectedOption === currentItem.correctIndex ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Correct Answer!</span>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-rose-600" />
                  <span>Incorrect. The correct choice is Option {String.fromCharCode(65 + currentItem.correctIndex)}.</span>
                </>
              )}
            </div>
            <p className="text-xs leading-relaxed font-medium">
              {currentItem.explanationEn}
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium pt-1 border-t border-slate-200 dark:border-slate-800">
              🇳🇵 <strong>नेपाली व्याख्या:</strong> {currentItem.explanationNe}
            </p>
          </div>
        )}

        {/* Next/Prev Navigation */}
        <div className="pt-2 flex items-center justify-between border-t border-slate-200 dark:border-slate-800">
          <button
            type="button"
            onClick={handlePrev}
            className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>
          <span className="text-xs font-bold text-slate-400">
            {currentIndex + 1} / {items.length}
          </span>
          <button
            type="button"
            onClick={handleNext}
            className={`px-4 py-1.5 rounded-xl text-white text-xs font-black flex items-center gap-1 cursor-pointer shadow-xs transition-all ${
              isJapan ? 'bg-red-600 hover:bg-red-500' : 'bg-blue-600 hover:bg-blue-500'
            }`}
          >
            <span>Next Exercise</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// 2. READING SECTION VIEW (Passage Reader + Furigana Toggle + Questions)
// =========================================================================
function ReadingSectionView({ language, level }: { language: 'JAPANESE' | 'KOREAN'; level: string }) {
  const isJapan = language === 'JAPANESE';
  const passages = isJapan ? JAPANESE_READING_PRACTICE : [
    {
      id: 'kr_rd_1',
      level: 'TOPIK1_L1',
      genre: 'Short Notice (안내문)',
      title: '한국어 말하기 대회 안내 (Korean Speaking Contest)',
      passageHtml: `
<div class="space-y-2 text-xs sm:text-sm">
  <p class="font-bold text-slate-800 dark:text-slate-100 border-b pb-1">【제5회 외국인 한국어 말하기 대회】</p>
  <p>외국인 주민 여러분의 한국어 실력을 마음껏 발휘할 수 있는 말하기 대회를 개최합니다.</p>
  <p>• <strong>일시:</strong> 2026년 10월 15일(목) 오후 2시</p>
  <p>• <strong>장소:</strong> 서울시민회관 대강당</p>
  <p>• <strong>참가 대상:</strong> 한국에 거주하는 외국인 누구나</p>
  <p>• <strong>신청 기간:</strong> 9월 1일 ~ 9월 30일까지 온라인 접수</p>
  <p class="text-rose-600 font-bold">*1등 수상자에게는 상장과 상금 100만 원이 수여됩니다.</p>
</div>
      `,
      passagePlainText: '【제5회 외국인 한국어 말하기 대회】\n외국인 주민 여러분의 한국어 실력을 마음껏 발휘할 수 있는 말하기 대회를 개최합니다.\n일시: 2026년 10월 15일(목) 오후 2시\n장소: 서울시민회관 대강당\n참가 대상: 한국에 거주하는 외국인 누구나\n신청 기간: 9월 1일 ~ 9월 30일까지 온라인 접수\n1등 수상자에게는 상장과 상금 100만 원이 수여됩니다.',
      translationEn: '[5th Foreigners Korean Speaking Contest]\nWe are holding a speaking contest where foreign residents can show their Korean skills.\n• Date: Thursday, Oct 15, 2026, 2:00 PM\n• Venue: Seoul Civic Hall Main Auditorium\n• Eligibility: Any foreigner residing in Korea\n• Application: Sept 1 to Sept 30 (online)\n* 1st place winner receives a certificate and 1,000,000 KRW prize.',
      translationNe: '[५ औं विदेशी कोरियाली भाषा वक्तृत्व प्रतियोगिता]\nविदेशी बासिन्दाहरूले आफ्नो कोरियन भाषा क्षमता देखाउन सक्ने वक्तृत्व प्रतियोगिता आयोजना हुँदैछ।\n• मिति: २०२६ अक्टोबर १५ (बिहीबार) दिउँसो २ बजे\n• स्थान: सियोल सिभिक हल मुख्य अडिटोरियम\n• सहभागी: कोरियामा बस्ने जो कोही विदेशी\n• आवेदन: सेप्टेम्बर १ देखि ३० सम्म अनलाइन\n* प्रथम हुनेलाई प्रमाणपत्र र १० लाख वन पुरस्कार प्रदान गरिनेछ।',
      vocabulary: [
        { word: '개최하다', reading: '개최하다', meaningEn: 'To hold / host', meaningNe: 'आयोजना गर्नु' },
        { word: '상금', reading: '상금', meaningEn: 'Prize money', meaningNe: 'पुरस्कार रकम' },
      ],
      questions: [
        {
          q: '이 대회에 대한 설명으로 맞지 않는 것은 무엇입니까? (Which is NOT correct about the contest?)',
          options: [
            '외국인이면 누구나 참가할 수 있다 (Any foreigner can participate)',
            '10월에 대회가 열린다 (The contest is held in October)',
            '방문 접수만 가능하다 (Only in-person registration is accepted)',
            '1등에게 상금을 준다 (Prize money is given to 1st place)',
          ],
          correctIndex: 2,
          explanationEn: 'The notice clearly states "온라인 접수" (online registration), so "방문 접수만 가능하다" (only in-person registration) is incorrect.',
          explanationNe: 'सूचनामा अनलाइन आवेदन भनिएको छ, त्यसैले "सशरीर गएर मात्र दर्ता गर्न सकिन्छ" भन्ने विकल्प गलत/उत्तर हो।',
        },
      ],
    },
  ];

  const [passageIndex, setPassageIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});

  const current = passages[passageIndex % passages.length];

  return (
    <div className="space-y-5">
      {/* Passage Header */}
      <div className="flex items-center justify-between gap-3 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] font-black uppercase text-slate-500">
            {current.genre} • Passage {passageIndex + 1} of {passages.length}
          </span>
          <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white mt-0.5">
            {current.title}
          </h3>
        </div>

        {/* Translation Toggle */}
        <button
          type="button"
          onClick={() => setShowTranslation(!showTranslation)}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5 cursor-pointer ${
            showTranslation
              ? 'bg-indigo-600 text-white border-indigo-500'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50'
          }`}
        >
          <Globe className="w-3.5 h-3.5" />
          <span>{showTranslation ? 'Hide Translation' : 'View Translation'}</span>
        </button>
      </div>

      {/* Split layout: Passage Card (Left/Top) and Questions (Right/Bottom) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Passage Display Card */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-4 sm:p-5 shadow-xs leading-relaxed text-slate-900 dark:text-slate-100">
            <div dangerouslySetInnerHTML={{ __html: current.passageHtml }} />
          </div>

          {/* Translation Drawer */}
          {showTranslation && (
            <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/60 space-y-2 animate-fade-in">
              <p className="text-[10px] font-black uppercase tracking-wider text-indigo-700 dark:text-indigo-400">
                English & Nepali Translation:
              </p>
              <p className="text-xs text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed">
                {current.translationEn}
              </p>
              <div className="pt-2 border-t border-indigo-200/60 dark:border-indigo-800/60">
                <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-pre-line leading-relaxed font-medium">
                  🇳🇵 {current.translationNe}
                </p>
              </div>
            </div>
          )}

          {/* Key Vocabulary Hints */}
          {current.vocabulary && current.vocabulary.length > 0 && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3.5 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-black text-slate-700 dark:text-slate-300">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                <span>Key Vocabulary in this Passage:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {current.vocabulary.map((v, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200"
                  >
                    <strong>{v.word}</strong>
                    {v.reading && <span className="text-[10px] text-slate-400">({v.reading})</span>}
                    <span className="text-[10px] text-slate-500 font-normal">: {v.meaningEn} ({v.meaningNe})</span>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Questions Panel */}
        <div className="lg:col-span-6 space-y-4">
          {current.questions.map((q, qIndex) => {
            const selectedOpt = selectedAnswers[qIndex];
            const hasAnswered = selectedOpt !== undefined;

            return (
              <div
                key={qIndex}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3.5 shadow-xs"
              >
                <div className="flex items-start gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 text-[10px] font-black shrink-0">
                    Q{qIndex + 1}
                  </span>
                  <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white leading-snug">
                    {q.q}
                  </h4>
                </div>

                {/* Question Options */}
                <div className="space-y-2">
                  {q.options.map((opt, optIndex) => {
                    const isSelected = selectedOpt === optIndex;
                    const isCorrect = optIndex === q.correctIndex;

                    return (
                      <button
                        key={optIndex}
                        type="button"
                        onClick={() => {
                          setSelectedAnswers((prev) => ({ ...prev, [qIndex]: optIndex }));
                        }}
                        className={`w-full p-2.5 sm:p-3 rounded-xl text-xs font-bold text-left transition-all border cursor-pointer flex items-start gap-2 ${
                          hasAnswered
                            ? isCorrect
                              ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 text-emerald-800 dark:text-emerald-200 font-black'
                              : isSelected
                                ? 'bg-rose-50 dark:bg-rose-950/50 border-rose-500 text-rose-800 dark:text-rose-200 font-black'
                                : 'border-slate-200 dark:border-slate-700 text-slate-400 opacity-60'
                            : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-blue-500 hover:bg-slate-50 dark:hover:bg-slate-800'
                        }`}
                      >
                        <span className={`w-4 h-4 rounded-full text-[10px] font-black flex items-center justify-center shrink-0 border ${
                          hasAnswered && isCorrect
                            ? 'bg-emerald-500 text-white border-emerald-500'
                            : hasAnswered && isSelected
                              ? 'bg-rose-500 text-white border-rose-500'
                              : 'border-slate-300 dark:border-slate-600 text-slate-500'
                        }`}>
                          {optIndex + 1}
                        </span>
                        <span className="leading-snug">{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Explanation */}
                {hasAnswered && (
                  <div className={`p-3 rounded-xl border text-xs leading-relaxed space-y-1 animate-fade-in ${
                    selectedOpt === q.correctIndex
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                      : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200'
                  }`}>
                    <div className="font-black">
                      {selectedOpt === q.correctIndex ? '✅ Correct!' : '❌ Incorrect.'}
                    </div>
                    <p>{q.explanationEn}</p>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 pt-1 border-t border-slate-200 dark:border-slate-800">
                      🇳🇵 <strong>नेपाली:</strong> {q.explanationNe}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// 3. WRITING SECTION VIEW (TOPIK II Q51-Q54 & KIIP 5-Sentence Drills)
// =========================================================================
function WritingSectionView({ level }: { level: string }) {
  const isKiip = level === 'KIIP';
  const items = useMemo(() => {
    if (isKiip) {
      return KOREAN_WRITING_PRACTICE.filter((w) => w.examType === 'KIIP');
    }
    return KOREAN_WRITING_PRACTICE.filter((w) => w.examType === 'TOPIK2');
  }, [isKiip]);

  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [userText, setUserText] = useState('');
  const [showModelAnswer, setShowModelAnswer] = useState(false);

  const current = items[activeItemIndex % items.length];
  const charCount = userText.length;

  const minChars = current.minChars || 0;
  const maxChars = current.maxChars || 0;

  const charStatusColor = useMemo(() => {
    if (!maxChars) return 'text-slate-500';
    if (charCount < minChars) return 'text-amber-600 dark:text-amber-400';
    if (charCount <= maxChars) return 'text-emerald-600 dark:text-emerald-400 font-black';
    return 'text-rose-600 dark:text-rose-400 font-black';
  }, [charCount, minChars, maxChars]);

  return (
    <div className="space-y-5">
      {/* Question Selector Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
        {items.map((item, idx) => (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              setActiveItemIndex(idx);
              setUserText('');
              setShowModelAnswer(false);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap border ${
              activeItemIndex === idx
                ? 'bg-blue-600 text-white border-blue-500 shadow-xs'
                : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
            }`}
          >
            {item.questionNumber} ({item.title.split(':')[0]})
          </button>
        ))}
      </div>

      {/* Main Prompt Card */}
      <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 sm:p-5 space-y-3 shadow-xs">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className="px-2.5 py-0.5 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 text-xs font-black">
            {current.badge}
          </span>
          <span className="text-xs font-bold text-slate-500">
            {current.questionNumber === 'Q53' ? 'Data Analysis • 200–300 Words' : current.questionNumber === 'Q54' ? 'Essay • 600–700 Words' : 'Sentence Composition'}
          </span>
        </div>

        {/* Prompt Text */}
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-sans text-xs sm:text-sm text-slate-900 dark:text-slate-100 whitespace-pre-line leading-relaxed font-medium">
          {current.prompt}
        </div>

        {/* Instructions & Guidelines */}
        <div className="space-y-1.5 pt-1">
          <p className="text-[11px] font-black uppercase tracking-wider text-slate-500">Writing Guidelines:</p>
          <ul className="list-disc pl-4 space-y-1 text-xs text-slate-600 dark:text-slate-400">
            {current.instructions.map((ins, i) => (
              <li key={i}>{ins}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Interactive Writing Area with Character Counter */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <label className="text-xs font-black text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <PenTool className="w-3.5 h-3.5 text-blue-600" />
            <span>Your Response:</span>
          </label>

          {maxChars > 0 && (
            <div className={`text-xs ${charStatusColor}`}>
              <span>글자 수 (Character Count): </span>
              <strong>{charCount}</strong> / {minChars}~{maxChars}자
            </div>
          )}
        </div>

        <textarea
          value={userText}
          onChange={(e) => setUserText(e.target.value)}
          placeholder="여기에 답안을 직접 작성해 보세요 (격식체 문장으로 작성하십시오)..."
          rows={current.questionNumber === 'Q54' ? 10 : current.questionNumber === 'Q53' ? 6 : 4}
          className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs sm:text-sm font-sans focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-xs leading-relaxed"
        />

        {/* Key Vocabulary Pills */}
        <div className="flex items-center gap-1.5 flex-wrap pt-1">
          <span className="text-[10px] font-black text-slate-400 uppercase">Useful Expressions:</span>
          {current.keyVocabulary.map((word, i) => (
            <span
              key={i}
              className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-[11px] font-bold border border-blue-200/60 dark:border-blue-800/60"
            >
              + {word}
            </span>
          ))}
        </div>
      </div>

      {/* Model Answer & Scoring Rubrics Toggle */}
      <div className="pt-2">
        <button
          type="button"
          onClick={() => setShowModelAnswer(!showModelAnswer)}
          className={`w-full py-3 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs border ${
            showModelAnswer
              ? 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-500'
              : 'bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200 font-bold'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>{showModelAnswer ? 'Hide Sample Answer & Rubrics' : 'Reveal Official High-Score Model Answer & Rubrics'}</span>
        </button>

        {showModelAnswer && (
          <div className="mt-4 p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800 space-y-4 animate-fade-in">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                Official Model Answer (모범 답안)
              </span>
              <div className="mt-2 p-4 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-900 text-xs sm:text-sm font-sans whitespace-pre-line leading-relaxed text-slate-900 dark:text-slate-100 font-semibold shadow-xs">
                {current.sampleModelAnswer}
              </div>
            </div>

            {/* Rubrics Criteria Table */}
            <div className="space-y-2 pt-2 border-t border-emerald-200 dark:border-emerald-800/80">
              <span className="text-xs font-black text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Scoring Rubrics & Tips:</span>
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {current.rubricCriteria.map((r, i) => (
                  <div key={i} className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-900/60 space-y-1">
                    <div className="flex items-center justify-between text-xs font-black text-slate-900 dark:text-white">
                      <span>{r.criterion}</span>
                      <span className="text-emerald-600 text-[11px] font-black">{r.points}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">{r.tip}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// =========================================================================
// 4. STAR GRAMMAR SECTION VIEW (JLPT 文の組み立て ★ Interactive Composer)
// =========================================================================
function StarGrammarSectionView({ level }: { level: string }) {
  const [qIndex, setQIndex] = useState(0);
  const current = JAPANESE_STAR_QUESTIONS[qIndex % JAPANESE_STAR_QUESTIONS.length];

  // User's current arranged slots: array of 4 fragment indices or null
  const [arranged, setArranged] = useState<(number | null)[]>([null, null, null, null]);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);

  // Available unpicked fragments
  const remainingFragmentIndices = useMemo(() => {
    return [0, 1, 2, 3].filter((idx) => !arranged.includes(idx));
  }, [arranged]);

  const handlePickFragment = (idx: number) => {
    if (isAnswerChecked) return;
    const firstEmpty = arranged.findIndex((s) => s === null);
    if (firstEmpty !== -1) {
      const next = [...arranged];
      next[firstEmpty] = idx;
      setArranged(next);
    }
  };

  const handleRemoveSlot = (slotIdx: number) => {
    if (isAnswerChecked) return;
    const next = [...arranged];
    next[slotIdx] = null;
    setArranged(next);
  };

  const handleReset = () => {
    setArranged([null, null, null, null]);
    setIsAnswerChecked(false);
  };

  const handleCheckAnswer = () => {
    setIsAnswerChecked(true);
  };

  const isAllFilled = arranged.every((s) => s !== null);
  const isCorrect = isAllFilled && arranged.every((val, i) => val === current.correctOrder[i]);
  const starWord = arranged[current.starPosition] !== null ? current.fragments[arranged[current.starPosition]!] : '___';

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <span className="px-2 py-0.5 rounded-md bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 text-[10px] font-black uppercase">
            JLPT {current.level} Sentence Grammar 2 (文の組み立て)
          </span>
          <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white mt-0.5">
            Star Question (★) Interactive Reorder Drill
          </h3>
        </div>
        <button
          type="button"
          onClick={handleReset}
          className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 flex items-center gap-1 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Sentence Frame with 4 Blanks */}
      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-4 shadow-xs">
        <p className="text-xs font-black text-slate-500 uppercase tracking-wider">
          Assemble the 4 fragments to form a correct sentence. What word goes into the star (★)?
        </p>

        <div className="flex flex-wrap items-center gap-2 text-base sm:text-lg font-black text-slate-900 dark:text-white pt-2">
          <span>{current.leadSentence}</span>

          {/* 4 Slots */}
          {[0, 1, 2, 3].map((slotIdx) => {
            const isStar = slotIdx === current.starPosition;
            const filledIdx = arranged[slotIdx];

            return (
              <button
                key={slotIdx}
                type="button"
                onClick={() => handleRemoveSlot(slotIdx)}
                className={`min-w-[70px] sm:min-w-[90px] h-10 px-3 rounded-xl border-2 flex items-center justify-center text-xs sm:text-sm font-black transition-all cursor-pointer ${
                  filledIdx !== null
                    ? isStar
                      ? 'bg-amber-100 dark:bg-amber-950/80 border-amber-500 text-amber-900 dark:text-amber-200 shadow-xs'
                      : 'bg-white dark:bg-slate-900 border-slate-400 text-slate-900 dark:text-white shadow-xs'
                    : isStar
                      ? 'border-dashed border-amber-400 bg-amber-50/50 text-amber-600'
                      : 'border-dashed border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-900/50 text-slate-400'
                }`}
              >
                {filledIdx !== null ? (
                  current.fragments[filledIdx]
                ) : isStar ? (
                  <span className="text-base font-black">★</span>
                ) : (
                  <span className="text-xs text-slate-400">[{slotIdx + 1}]</span>
                )}
              </button>
            );
          })}

          <span>{current.tailSentence}</span>
        </div>

        {/* Live Star Placement Indicator */}
        <div className="pt-2 flex items-center gap-2 text-xs">
          <span className="font-bold text-slate-500">Currently in ★:</span>
          <span className="px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-900 font-black">
            {starWord}
          </span>
        </div>
      </div>

      {/* Available Fragment Chips */}
      <div className="space-y-2">
        <span className="text-xs font-black text-slate-700 dark:text-slate-300">
          Tap fragments in order to place them:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {current.fragments.map((frag, idx) => {
            const isUsed = arranged.includes(idx);
            return (
              <button
                key={idx}
                type="button"
                disabled={isUsed || isAnswerChecked}
                onClick={() => handlePickFragment(idx)}
                className={`p-3 rounded-xl text-xs sm:text-sm font-black text-center transition-all border cursor-pointer ${
                  isUsed
                    ? 'opacity-30 border-slate-200 bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-red-500 hover:shadow-xs text-slate-800 dark:text-slate-100'
                }`}
              >
                <span className="text-[10px] text-slate-400 block font-normal">Choice {idx + 1}</span>
                <span>{frag}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Check Answer Button */}
      {!isAnswerChecked ? (
        <button
          type="button"
          disabled={!isAllFilled}
          onClick={handleCheckAnswer}
          className={`w-full py-3 rounded-xl font-black text-xs sm:text-sm transition-all shadow-xs cursor-pointer ${
            isAllFilled
              ? 'bg-red-600 hover:bg-red-500 text-white shadow-red-600/30'
              : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
          }`}
        >
          Check Sentence Order & Star Word
        </button>
      ) : (
        <div className={`p-4 rounded-2xl border space-y-2 animate-fade-in ${
          isCorrect
            ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 text-emerald-900 dark:text-emerald-200'
            : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 text-rose-900 dark:text-rose-200'
        }`}>
          <div className="flex items-center gap-2 font-black text-sm">
            {isCorrect ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : <XCircle className="w-5 h-5 text-rose-600" />}
            <span>{isCorrect ? 'Outstanding! Sentence is 100% correct.' : 'Incorrect arrangement.'}</span>
          </div>

          <div className="pt-1 text-xs font-semibold leading-relaxed space-y-1">
            <p><strong>Correct Full Sentence:</strong> {current.fullSentence}</p>
            <p><strong>Grammar Point:</strong> {current.grammarPoint}</p>
            <p className="text-slate-600 dark:text-slate-400">{current.explanation}</p>
            <p className="text-slate-500 pt-1 border-t border-slate-200 dark:border-slate-800">
              🇳🇵 <strong>नेपाली:</strong> {current.translationNe}
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setQIndex((prev) => prev + 1);
              handleReset();
            }}
            className="mt-2 w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xs cursor-pointer shadow-xs transition-all"
          >
            Next Star Question →
          </button>
        </div>
      )}
    </div>
  );
}

// =========================================================================
// 5. ORAL VIVA & INTERVIEW VIEW (KIIP 구술시험 & EPS 직무구술)
// =========================================================================
function OralVivaSectionView({ level }: { level: string }) {
  const isKiip = level === 'KIIP';
  const questions = useMemo(() => {
    if (isKiip) return KOREAN_ORAL_VIVA_PRACTICE.filter((v) => v.examType === 'KIIP');
    return KOREAN_ORAL_VIVA_PRACTICE.filter((v) => v.examType === 'EPS');
  }, [isKiip]);

  const [qIdx, setQIdx] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showModelAnswer, setShowModelAnswer] = useState(false);

  const current = questions[qIdx % questions.length];

  const handlePlayExaminerAudio = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported on this device.');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(current.audioPromptText);
    utterance.lang = 'ko-KR';
    utterance.rate = 0.85;

    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    setIsPlayingAudio(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <span className="px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-[10px] font-black uppercase">
            {isKiip ? 'KIIP 종합평가 구술시험 (Oral Interview)' : 'EPS-TOPIK Vocational Viva (직무구술)'}
          </span>
          <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white mt-0.5">
            {current.title}
          </h3>
        </div>
      </div>

      {/* Examiner Prompt Card - Clean Bright Light Premium Card */}
      <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 space-y-4 shadow-xs">
        <div className="flex items-center gap-2">
          <Mic className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Examiner Question Prompt (면접관 질문):
          </span>
        </div>

        <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-relaxed bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs">
          &ldquo;{current.examinerPrompt}&rdquo;
        </p>

        {/* Audio Player */}
        <button
          type="button"
          onClick={handlePlayExaminerAudio}
          className={`px-4 py-2.5 rounded-xl font-black text-xs flex items-center gap-2 transition-all cursor-pointer shadow-xs ${
            isPlayingAudio
              ? 'bg-amber-500 text-slate-950 animate-pulse'
              : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/20'
          }`}
        >
          {isPlayingAudio ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
          <span>{isPlayingAudio ? 'Listening to Examiner...' : 'Listen to Examiner Question'}</span>
        </button>
      </div>

      {/* Evaluation Key Points */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2">
        <div className="flex items-center gap-1.5 text-xs font-black text-slate-700 dark:text-slate-300">
          <Info className="w-4 h-4 text-blue-600" />
          <span>Key Points Evaluated by Examiners:</span>
        </div>
        <ul className="list-disc pl-4 space-y-1 text-xs text-slate-600 dark:text-slate-400">
          {current.keyPointsToScore.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
      </div>

      {/* Reveal Model Spoken Answer */}
      <div className="pt-2">
        <button
          type="button"
          onClick={() => setShowModelAnswer(!showModelAnswer)}
          className={`w-full py-3 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer border ${
            showModelAnswer
              ? 'bg-emerald-600 text-white border-emerald-500'
              : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700 hover:bg-slate-50'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>{showModelAnswer ? 'Hide Sample Spoken Answer' : 'Reveal High-Score Model Spoken Answer'}</span>
        </button>

        {showModelAnswer && (
          <div className="mt-4 p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800 space-y-3 animate-fade-in">
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              Model Spoken Answer (모범 구술 답변)
            </span>
            <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 leading-relaxed">
              {current.modelAnswer}
            </p>
            <div className="pt-2 border-t border-emerald-200 dark:border-emerald-800">
              <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                🇳🇵 <strong>नेपाली उल्था:</strong> {current.modelAnswerNe}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// =========================================================================
// 6. VOCABULARY RAPID-FIRE FLASH VIEW
// =========================================================================
function VocabularyRapidFireView({ language, level }: { language: 'JAPANESE' | 'KOREAN'; level: string }) {
  const isJapan = language === 'JAPANESE';

  const questions = useMemo(() => {
    if (isJapan) {
      return [
        {
          q: '下線の漢字の読み方として最もよいものを一つ選びなさい：明日、新しい【部屋】に引っ越します。',
          options: ['へや', 'へやま', 'へか', 'へこ'],
          correct: 0,
          exp: '「部屋」は「へや」(Room)と読みます。',
        },
        {
          q: '下線の言葉の漢字として最もよいものを一つ選びなさい：駅の前に【ぎんこう】があります。',
          options: ['銀行', '銀校', '金行', '銀所'],
          correct: 0,
          exp: '「ぎんこう」(Bank)は「銀行」と書きます。',
        },
      ];
    } else {
      return [
        {
          q: '빈칸에 들어갈 가장 알맞은 단어를 고르십시오: 아침에 일어난 후 물을 한 【_____】 마십니다.',
          options: ['잔', '권', '마리', '병'],
          correct: 0,
          exp: '물이나 차를 세는 단위는 "잔"(Cup/Glass)입니다.',
        },
        {
          q: '다음 그림을 보고 알맞은 단어를 고르십시오: [안전모 Safety Helmet]',
          options: ['안전모', '안전화', '귀마개', '보안경'],
          correct: 0,
          exp: '머리를 보호하기 위해 쓰는 장비는 "안전모"(Safety Helmet)입니다.',
        },
      ];
    }
  }, [isJapan]);

  const [qIdx, setQIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);

  const cur = questions[qIdx % questions.length];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
        <h3 className="text-base font-black text-slate-900 dark:text-white">
          {isJapan ? '🔤 文字・語彙 (Vocabulary & Kanji) Rapid Drill' : '🔤 어휘 및 어법 (Vocabulary & Grammar) Rapid Drill'}
        </h3>
        <span className="text-xs font-bold text-slate-400">
          Question {qIdx + 1} of {questions.length}
        </span>
      </div>

      <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 space-y-4">
        <p className="text-sm font-black text-slate-900 dark:text-white leading-relaxed">
          {cur.q}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {cur.options.map((opt, i) => {
            const isSelected = selectedOpt === i;
            const isCorrect = i === cur.correct;
            const hasAnswered = selectedOpt !== null;

            return (
              <button
                key={i}
                type="button"
                onClick={() => setSelectedOpt(i)}
                className={`p-3 rounded-xl text-xs font-bold text-left transition-all border cursor-pointer ${
                  hasAnswered
                    ? isCorrect
                      ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 text-emerald-800 dark:text-emerald-200 font-black'
                      : isSelected
                        ? 'bg-rose-50 dark:bg-rose-950/50 border-rose-500 text-rose-800 dark:text-rose-200 font-black'
                        : 'border-slate-200 text-slate-400 opacity-60'
                    : 'bg-white dark:bg-slate-900 border-slate-200 hover:border-blue-500'
                }`}
              >
                {i + 1}. {opt}
              </button>
            );
          })}
        </div>

        {selectedOpt !== null && (
          <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs leading-relaxed space-y-1 animate-fade-in">
            <span className="font-black text-slate-900 dark:text-white">Explanation:</span>
            <p className="text-slate-600 dark:text-slate-400">{cur.exp}</p>
          </div>
        )}

        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={() => {
              setSelectedOpt(null);
              setQIdx((p) => p + 1);
            }}
            className={`px-4 py-2 rounded-xl text-white font-black text-xs cursor-pointer shadow-xs transition-all ${
              isJapan ? 'bg-red-600 hover:bg-red-500' : 'bg-blue-600 hover:bg-blue-500'
            }`}
          >
            Next Question →
          </button>
        </div>
      </div>
    </div>
  );
}
