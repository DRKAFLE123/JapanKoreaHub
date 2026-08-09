'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Headphones, Search, Sparkles, Music,
  Play, Pause, SkipBack, SkipForward, Repeat, Radio,
} from 'lucide-react';
import { N5_AUDIO_TRACKS, N5_REVIEW_TRACKS } from '@/lib/n5-audio-tracks';

/* ──────────────────────────────────────────────────────────────
   FLAT SERIAL TRACK LIST (Lessons 1-25, all 87 audio tracks)
────────────────────────────────────────────────────────────── */
interface FlatTrackItem {
  id: string;
  lessonNumber: number;
  lessonTitle: string;
  trackType: 'vocab' | 'dialogue' | 'drill' | 'review';
  typeLabel: string;
  label: string;
  url: string;
}

const ALL_SERIAL_TRACKS: FlatTrackItem[] = [];

N5_AUDIO_TRACKS.forEach((l) => {
  ALL_SERIAL_TRACKS.push({ id: `l${l.lesson}_vocab`,    lessonNumber: l.lesson, lessonTitle: l.lessonTitle, trackType: 'vocab',    typeLabel: 'Vocab (単語)',    label: `Lesson ${l.lesson} • Vocab Audio`,       url: l.vocab    });
  ALL_SERIAL_TRACKS.push({ id: `l${l.lesson}_dialogue`, lessonNumber: l.lesson, lessonTitle: l.lessonTitle, trackType: 'dialogue', typeLabel: 'Dialogue (会話)', label: `Lesson ${l.lesson} • Main Conversation`,  url: l.dialogue });
  ALL_SERIAL_TRACKS.push({ id: `l${l.lesson}_drill`,    lessonNumber: l.lesson, lessonTitle: l.lessonTitle, trackType: 'drill',    typeLabel: 'Practice (練習)', label: `Lesson ${l.lesson} • Drills & Exercises`, url: l.drill    });
});

N5_REVIEW_TRACKS.forEach((r, idx) => {
  ALL_SERIAL_TRACKS.push({ id: `review_${idx}`, lessonNumber: 99, lessonTitle: r.label, trackType: 'review', typeLabel: 'Review (まとめ)', label: r.label, url: r.track });
});

interface AlphabetGridProps {
  activeLanguage: 'JAPANESE' | 'KOREAN';
}

export const AlphabetGrid: React.FC<AlphabetGridProps> = ({ activeLanguage }) => {
  const [trackFilter,  setTrackFilter]  = useState<'ALL' | 'VOCAB' | 'DIALOGUE' | 'DRILL' | 'REVIEW'>('ALL');
  const [lessonFilter, setLessonFilter] = useState<number | 'ALL'>('ALL');
  const [searchQuery,  setSearchQuery]  = useState('');
  const [currentIdx,   setCurrentIdx]   = useState(0);
  const [isPlaying,    setIsPlaying]    = useState(false);
  const [autoAdvance,  setAutoAdvance]  = useState(true);
  const [currentTime,  setCurrentTime]  = useState(0);
  const [duration,     setDuration]     = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  /* ── Filtered list ── */
  const displayedTracks = ALL_SERIAL_TRACKS.filter((t) => {
    if (trackFilter === 'VOCAB'    && t.trackType !== 'vocab')    return false;
    if (trackFilter === 'DIALOGUE' && t.trackType !== 'dialogue') return false;
    if (trackFilter === 'DRILL'    && t.trackType !== 'drill')    return false;
    if (trackFilter === 'REVIEW'   && t.trackType !== 'review')   return false;
    if (lessonFilter !== 'ALL' && t.lessonNumber !== lessonFilter && t.lessonNumber !== 99) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return t.lessonTitle.toLowerCase().includes(q) || t.label.toLowerCase().includes(q) || `lesson ${t.lessonNumber}`.includes(q);
    }
    return true;
  });

  const activeTrack = displayedTracks[currentIdx] ?? displayedTracks[0];

  const playAtIndex = (index: number) => {
    if (index < 0 || index >= displayedTracks.length) return;
    setCurrentIdx(index);
    const target = displayedTracks[index];
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = target.url;
      audioRef.current.currentTime = 0;
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  const togglePlay = () => {
    if (!audioRef.current || !activeTrack) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      if (!audioRef.current.src || !audioRef.current.src.includes(activeTrack.url.replace(/^\//, ''))) {
        audioRef.current.src = activeTrack.url;
      }
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    if (autoAdvance && currentIdx + 1 < displayedTracks.length) {
      playAtIndex(currentIdx + 1);
    }
  };

  const formatTime = (s: number) => {
    if (isNaN(s)) return '00:00';
    return `${Math.floor(s / 60).toString().padStart(2, '0')}:${Math.floor(s % 60).toString().padStart(2, '0')}`;
  };

  /* Korean platform: show a simple placeholder since all audio tracks are Japanese */
  if (activeLanguage === 'KOREAN') {
    return (
      <div className="w-full max-w-7xl mx-auto font-sans">
        <div className="bg-slate-900/90 border border-emerald-800/40 rounded-3xl p-8 text-center space-y-4 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-3xl mx-auto">🎵</div>
          <h2 className="text-xl font-black text-white">Korean Listening — Coming Soon</h2>
          <p className="text-sm text-slate-400 max-w-md mx-auto">EPS-TOPIK audio tracks will be added here. For now, please use the <strong className="text-emerald-400">🌱 Basics</strong> tab in Vocabulary to hear Hangul pronunciation.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto font-sans space-y-4">
      <audio
        ref={audioRef}
        onTimeUpdate={() => { if (audioRef.current) { setCurrentTime(audioRef.current.currentTime); setDuration(audioRef.current.duration || 0); } }}
        onEnded={handleEnded}
      />

      {/* Banner */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xs text-slate-900">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-red-600 via-rose-600 to-indigo-600 flex items-center justify-center text-white shadow-xs flex-shrink-0">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-black uppercase tracking-wider text-red-600">🎵 Japanese Listening Hub — Minna no Nihongo</div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 mt-0.5">Serial Chapter Audio Tracks (Lessons 1–25)</h2>
              <p className="text-[11px] text-slate-500 mt-0.5">87 official CD tracks • Vocab, Dialogue, Drills & Summary Reviews • Continuous autoplay</p>
            </div>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-extrabold flex-shrink-0">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Continuous Playback</span>
          </div>
        </div>
      </div>

      {/* Now-Playing Dock */}
      {activeTrack && (
        <div className="bg-white border border-slate-200 rounded-3xl p-4 sm:p-5 shadow-xs space-y-3 text-slate-900">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center flex-shrink-0">
                {isPlaying ? (
                  <span className="flex gap-0.5 items-end h-5">
                    <span className="w-1 h-5 bg-rose-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1 h-3 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1 h-5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </span>
                ) : <Music className="w-6 h-6 text-rose-600" />}
              </div>
              <div className="min-w-0">
                <div className="text-[10px] font-black uppercase tracking-wider text-amber-600">
                  Now Playing • Track {currentIdx + 1} / {displayedTracks.length}
                </div>
                <h3 className="text-base font-black text-slate-900 truncate">{activeTrack.label}</h3>
                {activeTrack.lessonNumber !== 99 && (
                  <p className="text-xs text-slate-500 truncate">Lesson {activeTrack.lessonNumber}: {activeTrack.lessonTitle}</p>
                )}
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2 self-center">
              <button onClick={() => playAtIndex(Math.max(0, currentIdx - 1))} disabled={currentIdx === 0}
                className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 transition-all border border-slate-200 cursor-pointer">
                <SkipBack className="w-4 h-4" />
              </button>
              <button onClick={togglePlay}
                className="px-6 py-2.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-black text-xs shadow-xs flex items-center gap-2 transition-all transform hover:scale-105 cursor-pointer">
                {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
                <span>{isPlaying ? 'PAUSE' : 'PLAY'}</span>
              </button>
              <button onClick={() => playAtIndex((currentIdx + 1) % displayedTracks.length)}
                className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all border border-slate-200 cursor-pointer">
                <SkipForward className="w-4 h-4" />
              </button>
              <button onClick={() => setAutoAdvance(!autoAdvance)}
                className={`p-2.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                  autoAdvance ? 'bg-emerald-50 border-emerald-300 text-emerald-700' : 'bg-slate-100 border-slate-200 text-slate-600'
                }`} title="Auto-advance to next track">
                <Repeat className={`w-4 h-4 ${autoAdvance ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
                <span className="hidden sm:inline">Auto</span>
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1 pt-1">
            <input
              type="range" min={0} max={duration || 100} value={currentTime}
              onChange={(e) => { const v = Number(e.target.value); setCurrentTime(v); if (audioRef.current) audioRef.current.currentTime = v; }}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-600"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-bold">
              <span>{formatTime(currentTime)}</span><span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-white border border-slate-200 p-3 rounded-2xl shadow-xs text-slate-900">
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 pr-1 flex-shrink-0">Filter:</span>
          {[
            { id: 'ALL',      label: `All (${ALL_SERIAL_TRACKS.length})` },
            { id: 'VOCAB',    label: '📚 Vocab (単語)' },
            { id: 'DIALOGUE', label: '🗣 Dialogue (会話)' },
            { id: 'DRILL',    label: '🎤 Practice (練習)' },
            { id: 'REVIEW',   label: '🏆 Review (まとめ)' },
          ].map((f) => (
            <button key={f.id} onClick={() => { setTrackFilter(f.id as any); setCurrentIdx(0); }}
              className={`px-3 py-1 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all border flex-shrink-0 cursor-pointer ${
                trackFilter === f.id ? 'bg-red-600 border-red-500 text-white shadow-xs' : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
              }`}>{f.label}</button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <select
            value={lessonFilter}
            onChange={(e) => { setLessonFilter(e.target.value === 'ALL' ? 'ALL' : Number(e.target.value)); setCurrentIdx(0); }}
            className="bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold rounded-xl px-3 py-1.5 focus:outline-none focus:border-slate-400 cursor-pointer"
          >
            <option value="ALL">All Lessons (1–25)</option>
            {Array.from({ length: 25 }, (_, i) => i + 1).map((n) => <option key={n} value={n}>Lesson {n}</option>)}
          </select>
          <div className="relative flex-1 sm:w-48">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input type="text" placeholder="Search tracks..." value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentIdx(0); }}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-400"
            />
          </div>
        </div>
      </div>

      {/* Serial Track List */}
      <div className="bg-white border border-slate-200 rounded-3xl p-3 sm:p-4 shadow-xs space-y-2 text-slate-900">
        <div className="flex items-center justify-between px-2 pb-2 border-b border-slate-100 text-xs text-slate-500 font-bold">
          <span>{displayedTracks.length} tracks available</span>
          <span>Click any track to play continuously</span>
        </div>

        <div className="space-y-1.5 max-h-[500px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-200">
          {displayedTracks.length === 0 ? (
            <div className="text-center py-10 text-slate-400 text-xs font-medium">No tracks match your filter.</div>
          ) : displayedTracks.map((tr, idx) => {
            const isActive    = activeTrack?.id === tr.id;
            const isPlayingNow = isActive && isPlaying;

            return (
              <div key={tr.id} onClick={() => playAtIndex(idx)}
                className={`flex items-center justify-between p-3 rounded-2xl border transition-all cursor-pointer group ${
                  isActive ? 'bg-red-50 border-red-300 text-slate-900 shadow-xs' : 'bg-slate-50 border-slate-200/80 hover:border-slate-300 hover:bg-slate-100 text-slate-700'
                }`}>
                <div className="flex items-center gap-3 min-w-0">
                  <button className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-xs transition-all flex-shrink-0 ${
                    isPlayingNow ? 'bg-red-600 text-white shadow-xs' : isActive ? 'bg-red-100 text-red-700 border border-red-200' : 'bg-slate-200 text-slate-700 group-hover:bg-red-600 group-hover:text-white'
                  }`}>
                    {isPlayingNow ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 ml-0.5 fill-current" />}
                  </button>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-xs font-black truncate ${isActive ? 'text-slate-900' : 'text-slate-800 group-hover:text-slate-900'}`}>{tr.label}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        tr.trackType === 'vocab'    ? 'bg-purple-50 border-purple-200 text-purple-700'  :
                        tr.trackType === 'dialogue' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' :
                        tr.trackType === 'drill'    ? 'bg-sky-50 border-sky-200 text-sky-700'           :
                        'bg-amber-50 border-amber-200 text-amber-700'
                      }`}>{tr.typeLabel}</span>
                    </div>
                    {tr.lessonNumber !== 99 && <p className="text-[11px] text-slate-500 mt-0.5 truncate">Lesson {tr.lessonNumber}: {tr.lessonTitle}</p>}
                  </div>
                </div>
                {isPlayingNow && (
                  <div className="flex items-center gap-1.5 text-xs font-bold text-red-600 pr-2 flex-shrink-0">
                    <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" /><span>Playing</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
