'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Download, Volume2, Play, Pause, CheckCircle2, XCircle, ShieldCheck, Clock, FileText, HelpCircle, GraduationCap, Briefcase, Sparkles, ExternalLink } from 'lucide-react';
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
  const [activeTab, setActiveTab] = useState<'overview' | 'textbooks' | 'vocab' | 'listening' | 'practice' | 'book'>('overview');
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showExamResults, setShowExamResults] = useState(false);
  const [furiganaVisible, setFuriganaVisible] = useState(true);

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
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-24 font-sans">
      <main className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        
        {/* Header Breadcrumb */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <Link href={`/${country}/work`} className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-xl px-3 py-2 shadow-xs transition-colors">
            <ArrowLeft className="w-4 h-4 text-emerald-600" />
            Back to {country === 'japan' ? 'Japan' : 'Korea'} Work Hub
          </Link>
          <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-black uppercase">
            Official Prometric SSW-1 Track
          </span>
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
            { id: 'listening', label: `🎧 Listening Drills (${sectorData.listeningDrills.length})`, icon: Volume2 },
            { id: 'practice', label: `✍️ CBT Mock Exam (${sectorData.practiceQuestions.length})`, icon: HelpCircle },
          ];


          return (
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200">
              {tabsList.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                    activeTab === tab.id
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

                  <a
                    href="/BuildingCleaningBookwithmodelqsn.docx"
                    download="BuildingCleaningBookwithmodelqsn.docx"
                    className="px-4 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs border border-slate-200 transition-all flex items-center gap-1.5"
                  >
                    <Download className="w-4 h-4 text-indigo-600" />
                    Download Original (.docx)
                  </a>
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

                  <a
                    href="/SSW Caregiving (介護) Full Study Textbook & Web Curriculum (Japanese-Nepali).docx"
                    download="SSW_Caregiving_Full_Study_Textbook.docx"
                    className="px-4 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs border border-slate-200 transition-all flex items-center gap-1.5"
                  >
                    <Download className="w-4 h-4 text-indigo-600" />
                    Download Original (.docx)
                  </a>
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
                  <p>Computer-Based Test (CBT) covering technical knowledge, safety regulations, and practical listening scenarios.</p>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* TAB 2: TEXTBOOKS & DOWNLOADS */}
        {activeTab === 'textbooks' && (
          <div className="space-y-6">
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl text-xs text-amber-900 font-medium">
              💡 <strong>Official Study Materials:</strong> Download government-approved PDF textbooks and training manuals directly for offline reading.
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sectorData.textbooks.map((tb, i) => (
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

                  {tb.id === 'clean-textbook-official-bilingual' || sectorKey.includes('building') && i === 0 ? (
                    <div className="space-y-2 pt-2">
                      <Link
                        href={`/${country}/work/${sectorKey}/book`}
                        className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black text-xs text-center flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
                      >
                        <BookOpen className="w-4 h-4 text-white" />
                        📖 Study Online (12 Chapters + CBT Quizzes)
                      </Link>
                      <a
                        href={tb.pdfUrl}
                        download="BuildingCleaningBookwithmodelqsn.docx"
                        className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs text-center flex items-center justify-center gap-2 transition-all cursor-pointer border border-slate-200"
                      >
                        <Download className="w-3.5 h-3.5 text-indigo-600" />
                        Download Original Book (.docx)
                      </a>
                    </div>
                  ) : (
                    <a
                      href={tb.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-black text-xs text-center flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                    >
                      <Download className="w-4 h-4 text-emerald-400" /> Download Official PDF Textbook
                    </a>
                  )}
                </div>
              ))}
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

        {/* TAB 4: LISTENING DRILLS (聴解) */}
        {activeTab === 'listening' && (
          <div className="space-y-6">
            <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-2xl text-xs text-indigo-900 font-medium">
              🎧 <strong>Sector Listening Comprehension (聴解):</strong> Listen to the native audio dialogues recorded specifically for {sectorData.name} skill evaluation and answer the questions below.
            </div>

            <div className="space-y-6">
              {sectorData.listeningDrills.map((drill) => (
                <div key={drill.id} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
                    <h3 className="font-black text-base text-slate-900">{drill.title}</h3>
                    <button
                      onClick={() => handleAudioToggle(drill.id, drill.audioUrl)}
                      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-sm flex items-center gap-2 cursor-pointer transition-all"
                    >
                      {playingAudioId === drill.id ? <Pause className="w-4 h-4 animate-pulse" /> : <Play className="w-4 h-4" />}
                      <span>{playingAudioId === drill.id ? 'Pause Audio' : `Play Audio (${drill.duration})`}</span>
                    </button>
                  </div>

                  {/* Transcript Box - Light Theme */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 text-xs space-y-2 font-mono">
                    <p className="text-emerald-800 font-bold">🇯🇵 Japanese Transcript:</p>
                    <p className="leading-relaxed">{drill.transcriptJp}</p>
                    <p className="text-slate-500 font-sans text-[11px] pt-1">🇬🇧 {drill.transcriptEn}</p>
                    <p className="text-indigo-900 font-sans text-[11px]">🇳🇵 {drill.transcriptNe}</p>
                  </div>

                  {/* Question */}
                  <div className="space-y-3">
                    <p className="font-extrabold text-sm text-slate-900">❓ {drill.question}</p>
                    <p className="font-bold text-xs text-indigo-700">🇳🇵 {drill.questionNe}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {drill.options.map((opt, oIdx) => {
                        const selected = selectedAnswers[drill.id] === oIdx;
                        const isCorrect = oIdx === drill.correctAnswer;

                        return (
                          <button
                            key={oIdx}
                            onClick={() => handleSelectOption(drill.id, oIdx)}
                            className={`p-3.5 rounded-2xl border text-left text-xs font-semibold transition-all cursor-pointer ${
                              selected
                                ? isCorrect
                                  ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-black'
                                  : 'bg-rose-50 border-rose-400 text-rose-900 font-black'
                                : 'bg-slate-50 border-slate-200 hover:border-indigo-300 text-slate-800'
                            }`}
                          >
                            <span className="font-mono text-slate-400 mr-2">{oIdx + 1}.</span>
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {selectedAnswers[drill.id] !== undefined && (
                      <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 font-medium space-y-1">
                        <p className="font-bold text-emerald-900">✅ Answer Explanation:</p>
                        <p>{drill.explanation}</p>
                        <p className="text-emerald-800">🇳🇵 {drill.explanationNe}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: CBT PRACTICE TEST ENGINE */}
        {activeTab === 'practice' && (
          <div className="space-y-6">
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
          <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-xs">
            {sectorKey.includes('building') && <BuildingCleaningBookReader country={country} />}
            {(sectorKey === 'nursing' || sectorKey === 'caregiving') && <CaregivingBookReader country={country} />}
          </div>
        )}


      </main>
      <BottomTabBar />
    </div>
  );
}
