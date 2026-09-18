'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, BookOpen, Volume2, Play, Pause, CheckCircle2, XCircle, ShieldCheck, Clock, FileText, HelpCircle, GraduationCap, Briefcase, Sparkles, ExternalLink, MessageSquare, AlertTriangle, Lightbulb, Eye, EyeOff } from 'lucide-react';
import BottomTabBar from '@/components/layout/BottomTabBar';
import { SSWSectorData } from '@/lib/ssw-sectors-data';
import BuildingCleaningBookReader from '@/components/building-cleaning/BuildingCleaningBookReader';
import CaregivingBookReader from '@/components/caregiving/CaregivingBookReader';

interface Props {
  country: 'japan' | 'korea';
  sectorKey: string;
  sectorData?: SSWSectorData;
}

export default function SSWSectorDetailClient({ country, sectorKey, sectorData }: Props) {
  const [activeTab, setActiveTab] = useState<'overview' | 'textbooks' | 'vocab' | 'interview' | 'mocktest' | 'practice' | 'book'>('overview');
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showExamResults, setShowExamResults] = useState(false);
  const [furiganaVisible, setFuriganaVisible] = useState(true);
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});
  const [selectedInterviewCategory, setSelectedInterviewCategory] = useState<string>('ALL');

  const speakJapanese = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const cleanText = text.replace(/\(.*?\)/g, '').trim();
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.88;
      window.speechSynthesis.speak(utterance);
    }
  };

  if (!sectorData) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md text-center shadow-xl space-y-4">
          <span className="text-4xl">⚠️</span>
          <h2 className="text-xl font-bold text-slate-900">Sector Study Hub Coming Soon</h2>
          <p className="text-sm text-slate-600">The study module for {sectorKey} is being updated with official Prometric manuals.</p>
          <Link href={`/${country}/work`} className="inline-block px-5 py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl">
            Back to Work Hub
          </Link>
        </div>
      </div>
    );
  }

  const handleAudioToggle = (id: string, url?: string) => {
    if (!url) return;
    if (playingAudioId === id) {
      setPlayingAudioId(null);
    } else {
      setPlayingAudioId(id);
      const audio = new Audio(url);
      audio.play().catch(() => {});
      audio.onended = () => setPlayingAudioId(null);
    }
  };

  const handleSelectOption = (qId: string, optIdx: number) => {
    setSelectedAnswers(prev => ({ ...prev, [qId]: optIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    sectorData.practiceQuestions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        score += 1;
      }
    });
    return score;
  };

  return (
    <div className={`min-h-screen bg-slate-50 text-slate-900 ${activeTab === 'book' ? 'pb-6' : 'pb-24'} font-sans`}>
      <main className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        
        {/* Header Breadcrumb */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <Link href={`/${country}/work`} className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-xl px-3 py-2 shadow-xs transition-colors">
            <ArrowLeft className="w-4 h-4 text-emerald-600" />
            Back to {country === 'japan' ? 'Japan' : 'Korea'} Work Hub
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href={`/${country}/exams/skills?sector=${sectorKey}`}
              className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-800 bg-emerald-50 border border-emerald-300 rounded-xl px-3 py-2 shadow-xs hover:bg-emerald-100 transition-colors"
            >
              <Play className="w-3.5 h-3.5 fill-emerald-700" />
              <span>Mock Tests (5 Sets) ✍️</span>
            </Link>
            <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-black uppercase hidden sm:inline">
              Official Prometric SSW-1 Track
            </span>
          </div>
        </div>

        {/* Hero Banner Box - Calm Light White */}
        <div className="bg-gradient-to-r from-white via-slate-50 to-emerald-50/40 text-slate-900 rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-200 space-y-4">
          <div className="flex items-center gap-4">
            <span className="text-4xl sm:text-5xl p-3 bg-white rounded-2xl border border-slate-200 shadow-xs">{sectorData.icon}</span>
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">{sectorData.badge}</span>
              <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900 mt-1">
                {sectorData.name}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-1">{sectorData.kanji}</p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed max-w-3xl">
            {sectorData.summary}
          </p>
          <div className="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-200/80 text-xs text-indigo-950 font-medium">
            🇳🇵 <strong>नेपाली व्याख्या:</strong> {sectorData.summaryNe}
          </div>

          {/* Quick Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[10px] uppercase font-bold text-slate-400">Demand Status</span>
              <p className="text-xs font-black text-emerald-700">{sectorData.demand}</p>
            </div>
            <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[10px] uppercase font-bold text-slate-400">Exam Duration</span>
              <p className="text-xs font-black text-slate-900">{sectorData.testDuration}</p>
            </div>
            <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[10px] uppercase font-bold text-slate-400">Passing Mark</span>
              <p className="text-xs font-black text-amber-700">{sectorData.passScore}</p>
            </div>
            <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[10px] uppercase font-bold text-slate-400">Prometric Fee</span>
              <p className="text-xs font-black text-sky-700">{sectorData.prometricFee}</p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        {(() => {
          const isBuildingCleaning = sectorKey.includes('building');
          const isCaregiving = sectorKey === 'nursing' || sectorKey === 'caregiving';
          const hasOfficialBook = isBuildingCleaning || isCaregiving;
          const tabsList = [
            { id: 'overview', label: '📌 Overview & Syllabus', icon: ShieldCheck },
            ...(hasOfficialBook ? [{ id: 'book', label: '📖 Official Book & Tests (12 Ch.)', icon: BookOpen }] : []),
            { id: 'textbooks', label: `📚 Textbooks & Books (${sectorData.textbooks.length})`, icon: BookOpen },
            { id: 'vocab', label: `🗂️ Sector Vocab (${sectorData.vocabList.length})`, icon: FileText },
            { id: 'interview', label: `🤝 Interview Practice (${sectorData.interviewPractice?.length || 0})`, icon: MessageSquare },
            { id: 'mocktest', label: `✍️ CBT Mock Exams (5 Sets)`, icon: HelpCircle },
          ];

          return (
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200">
              {tabsList.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                    activeTab === tab.id || (tab.id === 'mocktest' && activeTab === 'practice')
                      ? 'bg-slate-900 text-white shadow-md'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          );
        })()}

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {sectorKey.includes('building') && (
              <section className="bg-gradient-to-r from-emerald-50/90 via-teal-50/40 to-indigo-50/40 rounded-3xl p-6 border border-emerald-200 text-slate-900 shadow-xs space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase">
                      <Sparkles className="w-3.5 h-3.5" /> Official 12-Chapter Bilingual Study Guide &amp; Tests
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                      ビルクリーニング分野 特定技能１号評価試験 学習ガイド
                    </h2>
                    <p className="text-xs sm:text-sm text-indigo-900 font-semibold">
                      🇳🇵 भवन सरसफाइ क्षेत्र विशेष सीप नं. १ मूल्याङ्कन परीक्षा — अध्ययन पुस्तिका (१२ अध्याय + अभ्यास परीक्षा)
                    </p>
                  </div>
                  <span className="text-4xl hidden sm:block">🧹</span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
                  Complete bilingual guide covering all 12 chapters from JBMA specifications: Safety &amp; 5S, Machinery, Detergent Dilution &amp; Acid/Alkali danger, Floor Waxing &amp; Marble precautions, Glass Squeegee techniques, Restroom cross-contamination, Hotel Bed Making, Waste segregation, and Workplace Hō-Ren-Sō.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => setActiveTab('book')}
                    className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <BookOpen className="w-4 h-4" />
                    Read Interactive Book &amp; Take Section Tests
                  </button>

                  <Link
                    href={`/${country}/work/${sectorKey}/book`}
                    className="px-4 py-3 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs border border-slate-200 shadow-xs transition-all flex items-center gap-1.5"
                  >
                    <ExternalLink className="w-4 h-4 text-emerald-600" />
                    Open Fullscreen Reader
                  </Link>
                </div>
              </section>
            )}

            {(sectorKey === 'nursing' || sectorKey === 'caregiving') && (
              <section className="bg-gradient-to-r from-emerald-50/90 via-teal-50/40 to-indigo-50/40 rounded-3xl p-6 border border-emerald-200 text-slate-900 shadow-xs space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase">
                      <Sparkles className="w-3.5 h-3.5" /> Official 12-Chapter Bilingual Study Curriculum &amp; Tests
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                      介護分野 特定技能１号評価試験 完全学習ガイド
                    </h2>
                    <p className="text-xs sm:text-sm text-indigo-900 font-semibold">
                      🇳🇵 नर्सिङ केयरगिभर (介護) विशेष सीप मूल्याङ्कन परीक्षा — आधिकारिक अध्ययन पुस्तक (१२ अध्याय + १० क्लिनिकल डायग्राम + मोडल परीक्षा)
                    </p>
                  </div>
                  <span className="text-4xl hidden sm:block">🩺</span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
                  Official bilingual curriculum based on Japan MHLW (厚生労働省) Prometric CBT standards: Human Dignity, Independence Support, Body Mechanics (8 principles), Wheelchair safety, Hemiplegia transfers, Dysphagia &amp; Choking prevention, Dakken Chakkan dressing, Pressure ulcers (bedsore prevention), Vital signs standards, Dementia 4-classification, and Workplace Handover records.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => setActiveTab('book')}
                    className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <BookOpen className="w-4 h-4" />
                    Read Interactive Book &amp; Take Section Tests
                  </button>

                  <Link
                    href={`/${country}/work/${sectorKey}/book`}
                    className="px-4 py-3 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs border border-slate-200 shadow-xs transition-all flex items-center gap-1.5"
                  >
                    <ExternalLink className="w-4 h-4 text-emerald-600" />
                    Open Fullscreen Reader
                  </Link>
                </div>
              </section>
            )}

            <section className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                Residency &amp; Visa Upgrade Pathway
              </h2>
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-950 leading-relaxed">
                🚀 {sectorData.visaPath}
              </div>
            </section>

            <section className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-600" />
                Official Exam Structure &amp; Requirements
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-700 leading-relaxed font-medium">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <h3 className="font-black text-sm text-slate-900">1. Language Prerequisite</h3>
                  <p>Must hold valid <strong>JFT-Basic (200+ Pts)</strong> or <strong>JLPT N4 Certificate</strong>.</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <h3 className="font-black text-sm text-slate-900">2. Skill Test Evaluation</h3>
                  <p>Computer-Based Test (CBT) covering technical knowledge, safety regulations, machine diagrams, and practical judgment questions (No listening test in skill exam).</p>
                </div>
                <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-200 space-y-2 md:col-span-2">
                  <h3 className="font-black text-sm text-indigo-950 flex items-center gap-1.5">
                    <MessageSquare className="w-4 h-4 text-indigo-600" />
                    3. Japanese Employer Interview (特定技能 面接 / Mensetsu)
                  </h3>
                  <p className="text-indigo-900">Mandatory interview with Japanese host enterprise evaluating sector motivation, physical stamina, 5S safety consciousness, Hō-Ren-Sō reporting, and polite Keigo Japanese communication.</p>
                </div>
              </div>
            </section>

            {/* Prometric CBT Mock Exam Sets Launch Banner */}
            <section className="bg-gradient-to-r from-emerald-50 via-teal-50 to-white rounded-3xl p-6 border border-emerald-300 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1.5 max-w-xl">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-black uppercase tracking-wider">
                    Prometric CBT Exam Simulator
                  </span>
                  <span className="text-xs font-bold text-emerald-800">5 Full Sets Available</span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900">
                  Ready to test your skills? Take {sectorData.name} CBT Mock Exams
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Full computerized Prometric test simulation with timed {sectorData.testDuration}, {sectorData.passScore} pass benchmark, full Furigana on Kanji, machine diagrams, and instant scoring.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0 w-full sm:w-auto">
                <Link
                  href={`/${country}/exams/skills?sector=${sectorKey}`}
                  className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Launch CBT Mock Tests (5 Sets) →</span>
                </Link>
              </div>
            </section>
          </div>
        )}

        {/* TAB 2: TEXTBOOKS & STUDY MATERIALS */}
        {activeTab === 'textbooks' && (
          <div className="space-y-6">
            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-xs text-emerald-900 font-medium">
              💡 <strong>Official Study Materials:</strong> Government-approved textbooks and curriculum manuals available for interactive online study.
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sectorData.textbooks.map((tb, i) => {
                const hasInteractiveBook = (sectorKey.includes('building') && (tb.id.includes('clean') || i === 0)) ||
                  ((sectorKey === 'nursing' || sectorKey === 'caregiving') && (tb.id.includes('care') || tb.id.includes('nurs') || i === 0));

                return (
                  <div key={tb.id} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs flex flex-col justify-between space-y-4 hover:border-emerald-300 transition-all">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-lg bg-indigo-100 text-indigo-800 font-bold text-[10px]">
                          {tb.language}
                        </span>
                        <span className="text-xs font-bold text-slate-400">{tb.fileSize}</span>
                      </div>

                      <h3 className="font-black text-base text-slate-900 leading-snug">{tb.title}</h3>
                      <p className="text-xs font-bold text-indigo-700">🇳🇵 {tb.titleNe}</p>
                      <p className="text-xs text-slate-600 leading-relaxed">{tb.description}</p>

                      <div className="pt-2 border-t border-slate-100 space-y-1">
                        <p className="text-[11px] font-black uppercase text-slate-400">Chapters Covered:</p>
                        <ul className="space-y-1">
                          {tb.chapters.map((ch, i) => (
                            <li key={i} className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                              {ch}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-2">
                      {hasInteractiveBook ? (
                        <div className="flex flex-col sm:flex-row items-center gap-2">
                          <button
                            onClick={() => setActiveTab('book')}
                            className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black text-xs text-center flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
                          >
                            <BookOpen className="w-4 h-4 text-white" />
                            📖 Study Online (12 Chapters + CBT Quizzes)
                          </button>
                          <Link
                            href={`/${country}/work/${sectorKey}/book`}
                            className="w-full sm:w-auto px-4 py-3 bg-white hover:bg-slate-50 text-slate-800 rounded-2xl font-bold text-xs text-center flex items-center justify-center gap-1.5 border border-slate-200 transition-all cursor-pointer shadow-xs whitespace-nowrap"
                          >
                            <ExternalLink className="w-4 h-4 text-emerald-600" />
                            Fullscreen
                          </Link>
                        </div>
                      ) : (
                        <a
                          href={tb.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black text-xs text-center flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
                        >
                          <BookOpen className="w-4 h-4 text-white" />
                          📖 Study Online (Official Textbook)
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: SECTOR VOCABULARY */}
        {activeTab === 'vocab' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200">
              <span className="text-xs font-bold text-slate-700">Display Furigana Reading</span>
              <button
                onClick={() => setFuriganaVisible(!furiganaVisible)}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                  furiganaVisible ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {furiganaVisible ? 'Furigana ON' : 'Furigana OFF'}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sectorData.vocabList.map((item) => (
                <div key={item.id} className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-3 hover:border-indigo-300 transition-all">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-black uppercase text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                        {item.category}
                      </span>
                      <h3 className="text-xl font-black text-slate-900 mt-1">
                        {item.kanji}
                      </h3>
                      {furiganaVisible && (
                        <p className="text-xs font-bold text-slate-500 font-mono">{item.kana} • {item.romaji}</p>
                      )}
                    </div>

                    {item.audioUrl && (
                      <button
                        onClick={() => handleAudioToggle(item.id, item.audioUrl)}
                        className="w-10 h-10 rounded-2xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 flex items-center justify-center transition-colors cursor-pointer"
                      >
                        {playingAudioId === item.id ? <Pause className="w-4 h-4 animate-pulse" /> : <Volume2 className="w-4 h-4" />}
                      </button>
                    )}
                  </div>

                  <div className="space-y-1 text-xs pt-2 border-t border-slate-100">
                    <p className="font-bold text-slate-900">🇬🇧 English: {item.english}</p>
                    <p className="font-bold text-emerald-800">🇳🇵 नेपाली: {item.nepali}</p>
                  </div>

                  {item.exampleSentence && (
                    <div className="p-2.5 rounded-xl bg-slate-50 text-[11px] font-medium text-slate-700 space-y-0.5">
                      <p className="font-bold text-slate-900">{item.exampleSentence}</p>
                      <p className="text-slate-500">{item.exampleSentenceNe}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: INTERVIEW PRACTICE (特定技能 面接対策) */}
        {activeTab === 'interview' && (
          <div className="space-y-6">
            {/* Context Alert Banner: Explaining No Listening on Skill Test, Interview is Decisive */}
            <div className="p-5 rounded-3xl bg-gradient-to-r from-amber-50 via-indigo-50/50 to-emerald-50/60 border border-amber-200 text-slate-900 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-amber-900 font-black text-sm">
                <Lightbulb className="w-5 h-5 text-amber-600 shrink-0" />
                <span>SSW सीप परीक्षा र अन्तर्वार्ता सम्बन्धी महत्त्वपूर्ण तथ्य:</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                आधिकारिक <strong>Prometric SSW-1 सीप परीक्षा (Skill Test) मा कुनै Listening (सुनाइ) परीक्षा हुँदैन</strong> — परीक्षामा कम्प्युटरमा सही/गलत र बहु-विकल्प प्रश्नहरू मात्र सोधिन्छ। तर जापानमा रोजगारी सम्झौता र भिसा (COE) पाउनका लागि <strong>जापानी कम्पनीको अन्तर्वार्ता (特定技能 面接 / Mensetsu)</strong> सबैभन्दा महत्त्वपूर्ण चरण हो। तल {sectorData.name} क्षेत्रका वास्तविक अन्तर्वार्ता प्रश्न, आदरार्थी जापानी उत्तर (Keigo), नेपाली अर्थ र झुक्किन सक्ने ट्र्यापहरूको अभ्यास गर्नुहोस्।
              </p>
              <div className="pt-1 flex flex-wrap items-center gap-3 text-[11px] font-bold text-indigo-900">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> CBT Skill Test: No Listening
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" /> Employer Interview: 100% Compulsory
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" /> Keigo Audio Practice Available
                </span>
              </div>
            </div>

            {/* Category Filter Chips */}
            {sectorData.interviewPractice && sectorData.interviewPractice.length > 0 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                <button
                  onClick={() => setSelectedInterviewCategory('ALL')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap border ${
                    selectedInterviewCategory === 'ALL'
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-200'
                  }`}
                >
                  All Questions ({sectorData.interviewPractice.length})
                </button>
                {Array.from(new Set(sectorData.interviewPractice.map((q) => q.categoryNe))).map((catNe) => (
                  <button
                    key={catNe}
                    onClick={() => setSelectedInterviewCategory(catNe)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap border ${
                      selectedInterviewCategory === catNe
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                        : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-200'
                    }`}
                  >
                    {catNe}
                  </button>
                ))}
              </div>
            )}

            {/* Questions List */}
            <div className="space-y-6">
              {(sectorData.interviewPractice || [])
                .filter((q) => selectedInterviewCategory === 'ALL' || q.categoryNe === selectedInterviewCategory)
                .map((q, idx) => {
                  const isRevealed = !!revealedAnswers[q.id];

                  return (
                    <div
                      key={q.id}
                      className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-xs hover:shadow-md transition-all space-y-5"
                    >
                      {/* Top Bar: Category and Audio Trigger */}
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
                        <div className="flex items-center gap-2">
                          <span className="w-7 h-7 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 font-black text-xs flex items-center justify-center">
                            Q{idx + 1}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[11px] font-extrabold">
                            {q.category} • {q.categoryNe}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => speakJapanese(q.questionJp)}
                            className="px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-800 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                            title="Listen to Japanese pronunciation of the question"
                          >
                            <Volume2 className="w-3.5 h-3.5 text-indigo-600" />
                            <span>Listen Question (質問)</span>
                          </button>
                        </div>
                      </div>

                      {/* Question Presentation Box */}
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <span className="text-xl">🎙️</span>
                          <div>
                            <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                              {q.questionJp}
                            </h3>
                            <p className="text-xs font-mono text-slate-500 pt-0.5">
                              {q.questionRomaji}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-xs">
                          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-700">
                            <span className="font-bold text-slate-500 block text-[10px] uppercase">English Meaning:</span>
                            {q.questionEn}
                          </div>
                          <div className="p-3 rounded-2xl bg-indigo-50/60 border border-indigo-100 text-indigo-950 font-medium">
                            <span className="font-bold text-indigo-600 block text-[10px] uppercase">🇳🇵 नेपाली प्रश्न:</span>
                            {q.questionNe}
                          </div>
                        </div>
                      </div>

                      {/* Interactive Answer Toggle */}
                      <div className="pt-2">
                        <button
                          onClick={() => setRevealedAnswers((prev) => ({ ...prev, [q.id]: !prev[q.id] }))}
                          className={`w-full py-3 px-4 rounded-2xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
                            isRevealed
                              ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                              : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs'
                          }`}
                        >
                          {isRevealed ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          <span>
                            {isRevealed
                              ? 'Hide Model Answer (उत्तर लुकाउनुहोस्)'
                              : 'Reveal Polite Keigo Model Answer & Tips (आधिकारिक नमुना उत्तर हेर्नुहोस्)'}
                          </span>
                        </button>
                      </div>

                      {/* Revealed Model Answer Section */}
                      {isRevealed && (
                        <div className="space-y-4 pt-2 animate-in fade-in duration-200">
                          {/* Japanese Keigo Model Answer */}
                          <div className="p-5 rounded-3xl bg-gradient-to-r from-emerald-50/90 via-teal-50/40 to-slate-50 border border-emerald-300 space-y-3">
                            <div className="flex items-center justify-between gap-2 border-b border-emerald-200/60 pb-2.5">
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600 text-white text-[11px] font-black uppercase tracking-wider shadow-xs">
                                🇯🇵 日本語模範解答 (Polite Keigo Model Answer)
                              </span>
                              <button
                                onClick={() => speakJapanese(q.modelAnswerJp)}
                                className="px-3 py-1.5 rounded-xl bg-white hover:bg-emerald-100/70 border border-emerald-300 text-emerald-900 font-bold text-xs shadow-2xs flex items-center gap-1.5 cursor-pointer transition-all"
                              >
                                <Volume2 className="w-3.5 h-3.5 text-emerald-700" />
                                <span>Listen Audio (音声)</span>
                              </button>
                            </div>

                            <p className="text-sm sm:text-base font-bold text-slate-900 leading-relaxed font-sans">
                              {q.modelAnswerJp}
                            </p>
                            <p className="text-xs font-mono text-slate-600 leading-relaxed bg-white/70 p-3 rounded-2xl border border-emerald-100">
                              {q.modelAnswerRomaji}
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs">
                              <div className="p-3.5 rounded-2xl bg-white/80 border border-slate-200 text-slate-700">
                                <span className="font-bold text-slate-500 block text-[10px] uppercase">🇬🇧 English Translation:</span>
                                {q.modelAnswerEn}
                              </div>
                              <div className="p-3.5 rounded-2xl bg-indigo-50/80 border border-indigo-200 text-indigo-950 font-medium">
                                <span className="font-bold text-indigo-700 block text-[10px] uppercase">🇳🇵 नेपाली व्याख्या र अर्थ:</span>
                                {q.modelAnswerNe}
                              </div>
                            </div>
                          </div>

                          {/* Strategy Boxes: Trap Warning & Pro Tip */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                            {/* Trap Warning */}
                            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-950 space-y-1">
                              <div className="flex items-center gap-1.5 font-black text-rose-900">
                                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                                <span>सावधानी / झुक्किन सक्ने ट्र्याप (Trap Warning):</span>
                              </div>
                              <p className="text-slate-700 leading-relaxed pt-1">
                                {q.trapWarning}
                              </p>
                              <p className="text-rose-900 font-medium pt-0.5">
                                🇳🇵 {q.trapWarningNe}
                              </p>
                            </div>

                            {/* Pro Tip */}
                            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 space-y-1">
                              <div className="flex items-center gap-1.5 font-black text-amber-900">
                                <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
                                <span>अन्तर्वार्ता सफलताको टिप्स (Pro-Tip):</span>
                              </div>
                              <p className="text-slate-700 leading-relaxed pt-1">
                                {q.tip}
                              </p>
                              <p className="text-amber-900 font-medium pt-0.5">
                                🇳🇵 {q.tipNe}
                              </p>
                            </div>
                          </div>

                          {/* Key Phrases */}
                          {q.keyPhrases && q.keyPhrases.length > 0 && (
                            <div className="flex flex-wrap items-center gap-2 pt-1">
                              <span className="text-[11px] font-bold text-slate-400 uppercase">मुख्य जापानी पदावलीहरू:</span>
                              {q.keyPhrases.map((phrase, pIdx) => (
                                <button
                                  key={pIdx}
                                  onClick={() => speakJapanese(phrase)}
                                  className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer border border-slate-200"
                                  title="Click to hear pronunciation"
                                >
                                  <span>{phrase}</span>
                                  <Volume2 className="w-3 h-3 text-slate-400" />
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>

            {/* Master Visa Interview System CTA */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 to-indigo-950 text-white shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="px-3 py-1 rounded-full bg-indigo-500/30 text-indigo-300 text-[10px] font-black uppercase tracking-wider border border-indigo-400/30">
                  Full Interview Preparation Studio
                </span>
                <h4 className="text-base sm:text-lg font-black text-white">
                  Want Full Working &amp; Student Visa Interview Practice?
                </h4>
                <p className="text-xs text-slate-300 max-w-xl">
                  Practice questions on salary expectations, family consent, overtime, and mock video simulator under Visa Interview Prep.
                </p>
              </div>
              <Link
                href={`/${country}/visa/interview`}
                className="px-5 py-3 rounded-2xl bg-white text-slate-900 hover:bg-slate-100 font-black text-xs transition-all shadow-md shrink-0 flex items-center gap-1.5"
              >
                <span>Open Interview Studio</span>
                <ArrowRight className="w-4 h-4 text-indigo-600" />
              </Link>
            </div>
          </div>
        )}

        {/* TAB 5: CBT MOCK EXAMS (5 SETS LAUNCHPAD) */}
        {(activeTab === 'mocktest' || activeTab === 'practice') && (
          <div className="space-y-6">
            {/* Top Directory Redirect Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-50 via-teal-50 to-indigo-50 border border-emerald-300 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-4xl p-3 bg-white rounded-2xl border border-emerald-200 shadow-xs">📝</span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-wider">
                      Prometric SSW-1 Track
                    </span>
                    <span className="text-xs font-black text-emerald-700">5 Mock Exam Sets Available</span>
                  </div>
                  <h3 className="text-lg font-black text-slate-900 mt-0.5">
                    {sectorData.name} — CBT Mock Exam Suite
                  </h3>
                  <p className="text-xs text-slate-600 font-medium">
                    Timed CBT simulations with 100% Furigana, equipment diagrams, 60% passing mark, and instant scoring.
                  </p>
                </div>
              </div>
              <Link
                href={`/${country}/exams/skills?sector=${sectorKey}`}
                className="px-5 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs transition-all shadow-md shrink-0 flex items-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <span>Filter in Mock Test Directory →</span>
              </Link>
            </div>

            {/* 5 Mock Exam Sets Grid */}
            <div className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                  <Play className="w-4 h-4 text-emerald-600 fill-emerald-600" />
                  <span>Choose an Official Exam Set to Begin</span>
                </h3>
                <span className="text-xs text-slate-500 font-bold">5 Sets Prepared</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[1, 2, 3, 4, 5].map((setNum) => {
                  const setTitles = [
                    'Comprehensive Standard Simulation',
                    'Tools, Machinery & Dilution Focus',
                    'Hygiene & Cross-Contamination Focus',
                    'Work Safety & Standard Protocols',
                    'Final Examination High-Yield Simulator'
                  ];
                  const isBC = sectorKey.includes('building');
                  const examTarget = isBC 
                    ? `/${country}/work/building-cleaning/exam?set=${setNum}`
                    : `/${country}/exams/skills?sector=${sectorKey}`;

                  return (
                    <div
                      key={setNum}
                      className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between space-y-3"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-black uppercase tracking-wider">
                            SET {setNum}
                          </span>
                          <span className="text-[10px] font-bold text-slate-400">
                            {sectorData.testDuration} • {sectorData.passScore}
                          </span>
                        </div>
                        <h4 className="text-xs font-black text-slate-900">
                          {sectorData.name} — Set {setNum}
                        </h4>
                        <p className="text-[11px] text-slate-500 font-medium line-clamp-2">
                          {setTitles[setNum - 1]}
                        </p>
                      </div>

                      <Link
                        href={examTarget}
                        className="w-full py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-600 text-emerald-800 hover:text-white font-black text-xs transition-all flex items-center justify-center gap-1.5 border border-emerald-200 hover:border-emerald-600 group"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Start Mock Set {setNum} →</span>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div>
                  <h2 className="text-lg font-black text-slate-900">CBT Skill Test Simulator</h2>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">Answer all technical &amp; safety questions. Passing score is 60%.</p>
                </div>
                {!showExamResults ? (
                  <button
                    onClick={() => setShowExamResults(true)}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-md transition-all cursor-pointer"
                  >
                    Submit Practice Test
                  </button>
                ) : (
                  <button
                    onClick={() => { setSelectedAnswers({}); setShowExamResults(false); }}
                    className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs transition-colors cursor-pointer"
                  >
                    Reset Answers
                  </button>
                )}
              </div>

              {showExamResults && (
                <div className="p-6 rounded-3xl bg-emerald-50 border border-emerald-200 text-slate-900 text-center space-y-3 shadow-xs">
                  <span className="text-3xl">🎉</span>
                  <h3 className="text-2xl font-black text-slate-900">
                    Your Score: {calculateScore()} / {sectorData.practiceQuestions.length} ({Math.round((calculateScore() / sectorData.practiceQuestions.length) * 100)}%)
                  </h3>
                  <p className="text-xs text-slate-600 font-medium">
                    {calculateScore() / sectorData.practiceQuestions.length >= 0.6
                      ? 'Congratulations! You passed the SSW Skill Evaluation benchmark (60%).'
                      : 'Keep practicing! Review the textbook chapters and retake the test.'}
                  </p>
                </div>
              )}

              <div className="space-y-6">
                {sectorData.practiceQuestions.map((q, idx) => (
                  <div key={q.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                    <div className="flex items-start gap-3">
                      <span className="w-7 h-7 rounded-xl bg-indigo-600 text-white font-black text-xs flex items-center justify-center flex-shrink-0">
                        {idx + 1}
                      </span>
                      <div className="space-y-1">
                        <p className="font-extrabold text-sm text-slate-900">{q.question}</p>
                        {q.questionNe && <p className="font-bold text-xs text-indigo-700">🇳🇵 {q.questionNe}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {q.options.map((opt, oIdx) => {
                        const selected = selectedAnswers[q.id] === oIdx;
                        const isCorrect = oIdx === q.correctAnswer;

                        return (
                          <button
                            key={oIdx}
                            onClick={() => handleSelectOption(q.id, oIdx)}
                            className={`p-3.5 rounded-2xl border text-left text-xs font-semibold transition-all cursor-pointer ${
                              selected
                                ? isCorrect
                                  ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-black'
                                  : 'bg-rose-50 border-rose-400 text-rose-900 font-black'
                                : 'bg-white border-slate-200 hover:border-indigo-300 text-slate-800'
                            }`}
                          >
                            <span className="font-mono text-slate-400 mr-2">{oIdx + 1}.</span>
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {(showExamResults || selectedAnswers[q.id] !== undefined) && (
                      <div className="p-4 rounded-2xl bg-white border border-slate-200 text-xs text-slate-800 space-y-1">
                        <p className="font-bold text-emerald-700">💡 Explanation:</p>
                        <p>{q.explanation}</p>
                        <p className="text-slate-600">🇳🇵 {q.explanationNe}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: OFFICIAL BOOK & SECTION TESTS */}
        {activeTab === 'book' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold text-slate-500">
                Interactive Study Curriculum &amp; CBT Tests
              </span>
              <Link
                href={`/${country}/work/${sectorKey}/book`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold border border-slate-200 shadow-xs transition-all"
              >
                <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
                <span>Fullscreen Immersive Mode</span>
              </Link>
            </div>
            <div className="h-[calc(100vh-140px)] min-h-[640px] rounded-3xl overflow-hidden border border-slate-200 shadow-xs bg-slate-50 flex flex-col">
              {sectorKey.includes('building') && <BuildingCleaningBookReader country={country} isEmbedded={true} />}
              {(sectorKey === 'nursing' || sectorKey === 'caregiving') && <CaregivingBookReader country={country} isEmbedded={true} />}
            </div>
          </div>
        )}


      </main>
      <BottomTabBar />
    </div>
  );
}
