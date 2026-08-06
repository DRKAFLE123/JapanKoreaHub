'use client';

import React, { useState, useEffect } from 'react';
import {
  ShieldCheck, Users, BookOpen, Clock, Award, Search, Plus, Trash2, Edit3,
  CheckCircle2, XCircle, ArrowLeft, RefreshCw, BarChart2, Filter, Key, Database, Globe, Lock
} from 'lucide-react';
import Link from 'next/link';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: 'STUDENT' | 'ADMIN' | 'INSTRUCTOR';
  streakDays: number;
  createdAt: string;
}

interface StatsData {
  totalUsers: number;
  totalStudents: number;
  totalAdmins: number;
  totalVocab: number;
  totalExams: number;
}

export default function AdminCMSPage() {
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'USERS' | 'VOCAB' | 'EXAMS' | 'SYSTEM'>('OVERVIEW');
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('ALL');
  // Mock Exam Papers State
  const [examPapers, setExamPapers] = useState([
    { id: '1', name: 'JLPT N5 Official Standard Exam Paper Set 1', level: 'N5', difficulty: 'EASY', questions: 36, time: '25 Min', pass: '80 / 180 Pts', track: 'JAPANESE' },
    { id: '2', name: 'JFT-Basic 250 Pts Prometric Simulation', level: 'JFT', difficulty: 'MEDIUM', questions: 50, time: '60 Min', pass: '200 / 250 Pts', track: 'JAPANESE' },
    { id: '3', name: 'EPS-TOPIK Standard CBT Paper (Lessons 1–60)', level: 'EPS', difficulty: 'MEDIUM', questions: 25, time: '40 Min', pass: '110 / 200 Pts', track: 'KOREAN' },
    { id: '4', name: 'TOPIK I (Level 1–2) Reading & Listening', level: 'TOPIK1', difficulty: 'EASY', questions: 70, time: '100 Min', pass: '140 / 200 Pts', track: 'KOREAN' },
  ]);

  // Create Paper Modal State
  const [showCreatePaperModal, setShowCreatePaperModal] = useState(false);
  const [newPaperTrack, setNewPaperTrack] = useState<'JAPANESE' | 'KOREAN'>('JAPANESE');
  const [newPaperLevel, setNewPaperLevel] = useState('N5');
  const [newPaperDifficulty, setNewPaperDifficulty] = useState<'EASY' | 'MEDIUM' | 'HARD'>('EASY');
  const [newPaperTitle, setNewPaperTitle] = useState('');
  const [newPaperDuration, setNewPaperDuration] = useState('30');
  const [newPaperPassScore, setNewPaperPassScore] = useState('80 / 180 Pts');
  const [jsonImportText, setJsonImportText] = useState('');

  const handleCreatePaper = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPaperTitle.trim()) {
      alert('Please enter a paper title!');
      return;
    }
    const created = {
      id: Date.now().toString(),
      name: newPaperTitle,
      level: newPaperLevel,
      difficulty: newPaperDifficulty,
      questions: jsonImportText.trim() ? JSON.parse(jsonImportText.trim()).length || 25 : 25,
      time: `${newPaperDuration} Min`,
      pass: newPaperPassScore,
      track: newPaperTrack,
    };
    setExamPapers(prev => [created, ...prev]);
    setStats(prev => ({ ...prev, totalExams: prev.totalExams + 1 }));
    setShowCreatePaperModal(false);
    setNewPaperTitle('');
    setJsonImportText('');
    alert(`Success! Mock paper "${created.name}" created for ${created.track} (${created.level}).`);
  };


  // Stats summary state
  const [stats, setStats] = useState<StatsData>({
    totalUsers: 148,
    totalStudents: 142,
    totalAdmins: 6,
    totalVocab: 4250,
    totalExams: 18,
  });

  // Mock User List for CMS management
  const [users, setUsers] = useState<UserData[]>([
    { id: '1', name: 'Dr. Kafle', email: 'drkafle@languageguru.com', role: 'ADMIN', streakDays: 28, createdAt: '2026-01-15' },
    { id: '2', name: 'Rajendra Thapa', email: 'rajendra.t@example.com', role: 'STUDENT', streakDays: 14, createdAt: '2026-02-10' },
    { id: '3', name: 'Sita Sharma', email: 'sita.s@example.com', role: 'STUDENT', streakDays: 21, createdAt: '2026-03-01' },
    { id: '4', name: 'Koji Yamamoto', email: 'koji.instructor@languageguru.com', role: 'INSTRUCTOR', streakDays: 45, createdAt: '2026-01-20' },
    { id: '5', name: 'Anil Gurung', email: 'anil.g@example.com', role: 'STUDENT', streakDays: 7, createdAt: '2026-04-12' },
  ]);

  const handleRoleChange = (userId: string, newRole: 'STUDENT' | 'ADMIN' | 'INSTRUCTOR') => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
  };

  const handleDeleteUser = (userId: string) => {
    if (confirm('Are you sure you want to remove this user from the system?')) {
      setUsers(prev => prev.filter(u => u.id !== userId));
    }
  };

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'ALL' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-xl border-b border-slate-800 px-4 sm:px-8 py-3 flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-3">
          <Link href="/" className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-glow">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-black text-white">JakonHub Admin CMS</h1>
                <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-black uppercase">
                  Protected System
                </span>
              </div>
              <p className="text-[10px] text-slate-400">Content Management, User Roles, Exam Bank &amp; Analytics</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-xl bg-slate-800 border border-slate-700 text-xs text-slate-300 font-bold hidden sm:inline">
            Logged in as: <strong className="text-amber-300">Admin</strong>
          </span>
          <Link href="/" className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-black hover:from-emerald-500 hover:to-teal-500 transition-all cursor-pointer">
            View Live Site →
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-900 border border-slate-800 overflow-x-auto no-scrollbar shadow-inner">
          {[
            { id: 'OVERVIEW', label: 'Dashboard Overview', icon: BarChart2, emoji: '📊' },
            { id: 'USERS', label: 'User & Role Manager', icon: Users, emoji: '👥' },
            { id: 'VOCAB', label: 'Vocabulary & Content CMS', icon: BookOpen, emoji: '📖' },
            { id: 'EXAMS', label: 'Exam & Question Bank', icon: Clock, emoji: '⏱' },
            { id: 'SYSTEM', label: 'Database & System Health', icon: Database, emoji: '⚙️' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black whitespace-nowrap transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-glow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <span>{tab.emoji}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* ── 1. DASHBOARD OVERVIEW ── */}
        {activeTab === 'OVERVIEW' && (
          <div className="space-y-6 animate-fade-in">
            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-2">
                <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase">
                  <span>Registered Users</span>
                  <Users className="w-4 h-4 text-indigo-400" />
                </div>
                <div className="text-2xl font-black text-white">{stats.totalUsers}</div>
                <div className="text-[10px] text-emerald-400 font-semibold">+12% this month</div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-2">
                <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase">
                  <span>Vocabulary Terms</span>
                  <BookOpen className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-2xl font-black text-white">{stats.totalVocab}</div>
                <div className="text-[10px] text-teal-400 font-semibold">Japanese + Korean</div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-2">
                <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase">
                  <span>Mock Exam Papers</span>
                  <Clock className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-2xl font-black text-white">{stats.totalExams}</div>
                <div className="text-[10px] text-amber-400 font-semibold">JLPT, JFT &amp; EPS-TOPIK</div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-2">
                <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase">
                  <span>Certificates Issued</span>
                  <Award className="w-4 h-4 text-rose-400" />
                </div>
                <div className="text-2xl font-black text-white">89</div>
                <div className="text-[10px] text-rose-400 font-semibold">QR Verified</div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-indigo-500/30 rounded-3xl p-6 shadow-2xl">
              <h2 className="text-lg font-black text-white mb-2">⚡ Quick Administrative Tasks</h2>
              <p className="text-xs text-slate-400 mb-4">Manage learning content, update answer keys, or grant instructor privileges.</p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button onClick={() => setActiveTab('USERS')} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-indigo-500/50 text-left transition-all group cursor-pointer">
                  <div className="text-sm font-black text-white group-hover:text-indigo-300 flex items-center justify-between">
                    <span>Manage User Roles</span>
                    <Users className="w-4 h-4 text-indigo-400" />
                  </div>
                  <p className="text-xs text-slate-400 mt-1">Promote users to INSTRUCTOR or ADMIN.</p>
                </button>

                <button onClick={() => setActiveTab('VOCAB')} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 text-left transition-all group cursor-pointer">
                  <div className="text-sm font-black text-white group-hover:text-emerald-300 flex items-center justify-between">
                    <span>Add Vocabulary Item</span>
                    <BookOpen className="w-4 h-4 text-emerald-400" />
                  </div>
                  <p className="text-xs text-slate-400 mt-1">Add new words to JLPT or EPS-TOPIK sets.</p>
                </button>

                <button onClick={() => setActiveTab('EXAMS')} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-amber-500/50 text-left transition-all group cursor-pointer">
                  <div className="text-sm font-black text-white group-hover:text-amber-300 flex items-center justify-between">
                    <span>Configure Mock Tests</span>
                    <Clock className="w-4 h-4 text-amber-400" />
                  </div>
                  <p className="text-xs text-slate-400 mt-1">Update questions, audio links, and answer keys.</p>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── 2. USER & ROLE MANAGER ── */}
        {activeTab === 'USERS' && (
          <div className="space-y-4 animate-fade-in">
            {/* Search & Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search user by name or email..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs font-bold text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-bold shrink-0">Role Filter:</span>
                {(['ALL', 'STUDENT', 'INSTRUCTOR', 'ADMIN'] as const).map(role => (
                  <button
                    key={role}
                    onClick={() => setRoleFilter(role)}
                    className={`px-3 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                      roleFilter === role
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>

            {/* User List Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 uppercase font-black tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="p-4">User</th>
                      <th className="p-4">Role</th>
                      <th className="p-4">Streak</th>
                      <th className="p-4">Joined Date</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {filteredUsers.map(u => (
                      <tr key={u.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="p-4">
                          <div className="font-black text-white text-sm">{u.name}</div>
                          <div className="text-slate-400 text-[11px]">{u.email}</div>
                        </td>
                        <td className="p-4">
                          <select
                            value={u.role}
                            onChange={e => handleRoleChange(u.id, e.target.value as any)}
                            className={`px-3 py-1 rounded-xl text-xs font-black border focus:outline-none cursor-pointer ${
                              u.role === 'ADMIN'
                                ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                                : u.role === 'INSTRUCTOR'
                                  ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                                  : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                            }`}
                          >
                            <option value="STUDENT" className="bg-slate-900 text-white">STUDENT</option>
                            <option value="INSTRUCTOR" className="bg-slate-900 text-white">INSTRUCTOR</option>
                            <option value="ADMIN" className="bg-slate-900 text-white">ADMIN</option>
                          </select>
                        </td>
                        <td className="p-4 font-bold text-amber-300">
                          🔥 {u.streakDays} Days
                        </td>
                        <td className="p-4 text-slate-400 font-mono">
                          {u.createdAt}
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => handleDeleteUser(u.id)}
                            className="p-2 rounded-xl bg-rose-950/60 hover:bg-rose-900 text-rose-400 hover:text-white border border-rose-800/50 transition-all cursor-pointer"
                            title="Delete user"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── 3. VOCABULARY & CONTENT CMS ── */}
        {activeTab === 'VOCAB' && (
          <div className="space-y-4 animate-fade-in">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-lg font-black text-white">Vocabulary &amp; Grammar Content Manager</h2>
                  <p className="text-xs text-slate-400">Add, edit, or sync static vocabulary datasets across JLPT and EPS-TOPIK curriculum.</p>
                </div>
                <button
                  onClick={() => alert('New Content Editor Modal: Functionality ready for backend payload submission.')}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-black flex items-center gap-2 hover:from-emerald-500 hover:to-teal-500 transition-all cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4" /> Add New Entry
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-1">
                  <div className="text-xs font-bold text-slate-400">Japanese Vocab Entries</div>
                  <div className="text-xl font-black text-rose-300">2,850 Words</div>
                  <div className="text-[10px] text-slate-500">Minna 1-75 &amp; JLPT N5–N1</div>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-1">
                  <div className="text-xs font-bold text-slate-400">Korean Vocab Entries</div>
                  <div className="text-xl font-black text-emerald-300">3,200 Words</div>
                  <div className="text-[10px] text-slate-500">EPS-TOPIK 1-60 &amp; TOPIK I/II</div>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-1">
                  <div className="text-xs font-bold text-slate-400">Grammar Rules</div>
                  <div className="text-xl font-black text-purple-300">235 Rules</div>
                  <div className="text-[10px] text-slate-500">Dual English &amp; Nepali notes</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── 4. EXAM BANK ── */}
        {activeTab === 'EXAMS' && (
          <div className="space-y-4 animate-fade-in">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-lg font-black text-white">Exam Paper &amp; Question Bank Manager</h2>
                  <p className="text-xs text-slate-400">Add level-wise mock test papers for Japanese (JLPT/JFT) &amp; Korean (EPS-TOPIK/TOPIK) without coding.</p>
                </div>
                <button
                  onClick={() => setShowCreatePaperModal(true)}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white text-xs font-black flex items-center gap-2 shadow-glow transition-all cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4" /> Add Level-Wise Mock Paper
                </button>
              </div>

              <div className="space-y-3">
                {examPapers.map((paper) => (
                  <div key={paper.id} className="bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black border ${paper.track === 'JAPANESE' ? 'bg-rose-500/20 text-rose-300 border-rose-500/30' : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'}`}>
                          {paper.track === 'JAPANESE' ? '🇯🇵 JAPANESE' : '🇰🇷 KOREAN'}
                        </span>
                        <span className="px-2 py-0.5 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-black">
                          Level {paper.level}
                        </span>
                        <span className="px-2 py-0.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold">
                          {paper.difficulty}
                        </span>
                        <h3 className="text-sm font-black text-white">{paper.name}</h3>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">{paper.questions} Questions • {paper.time} Limit • Target Pass: {paper.pass}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => alert(`Editing ${paper.name}: Question Inspector Ready.`)}
                        className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all cursor-pointer"
                      >
                        Edit Questions →
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete mock paper "${paper.name}"?`)) {
                            setExamPapers(prev => prev.filter(p => p.id !== paper.id));
                          }
                        }}
                        className="p-2 rounded-xl bg-rose-950/60 hover:bg-rose-900 text-rose-400 hover:text-white border border-rose-800/50 transition-all cursor-pointer"
                        title="Delete paper"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── CREATE NEW MOCK PAPER MODAL ── */}
            {showCreatePaperModal && (
              <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-5 shadow-2xl animate-fade-in">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-rose-400" />
                      <h3 className="text-base font-black text-white">Add Level-Wise Mock Exam Paper</h3>
                    </div>
                    <button
                      onClick={() => setShowCreatePaperModal(false)}
                      className="p-1 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-all cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>

                  <form onSubmit={handleCreatePaper} className="space-y-4 text-xs">
                    {/* 1. Track & Level */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-slate-400 font-bold mb-1">Target Language Track:</label>
                        <select
                          value={newPaperTrack}
                          onChange={(e) => {
                            const track = e.target.value as any;
                            setNewPaperTrack(track);
                            setNewPaperLevel(track === 'JAPANESE' ? 'N5' : 'EPS');
                          }}
                          className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-bold focus:outline-none focus:border-rose-500 cursor-pointer"
                        >
                          <option value="JAPANESE">🇯🇵 Japanese (JLPT &amp; JFT)</option>
                          <option value="KOREAN">🇰🇷 Korean (EPS &amp; TOPIK)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-slate-400 font-bold mb-1">Select Level:</label>
                        <select
                          value={newPaperLevel}
                          onChange={(e) => setNewPaperLevel(e.target.value)}
                          className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-bold focus:outline-none focus:border-indigo-500 cursor-pointer"
                        >
                          {newPaperTrack === 'JAPANESE' ? (
                            <>
                              <option value="N5">JLPT N5 (Basic Foundation)</option>
                              <option value="N4">JLPT N4 (Elementary)</option>
                              <option value="N3">JLPT N3 (Intermediate)</option>
                              <option value="N2">JLPT N2 (Pre-Advanced)</option>
                              <option value="JFT">JFT-Basic Prometric CBT</option>
                            </>
                          ) : (
                            <>
                              <option value="EPS">EPS-TOPIK (60 Lessons)</option>
                              <option value="TOPIK1">TOPIK I (Level 1–2)</option>
                              <option value="TOPIK2">TOPIK II (Level 3–4)</option>
                              <option value="TOPIK3">TOPIK II (Level 5–6)</option>
                            </>
                          )}
                        </select>
                      </div>

                      <div>
                        <label className="block text-slate-400 font-bold mb-1">Difficulty Filter:</label>
                        <select
                          value={newPaperDifficulty}
                          onChange={(e) => setNewPaperDifficulty(e.target.value as any)}
                          className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-bold focus:outline-none focus:border-amber-500 cursor-pointer"
                        >
                          <option value="EASY">🟢 Easy Level</option>
                          <option value="MEDIUM">🟡 Medium Level</option>
                          <option value="HARD">🔴 Hard Level</option>
                        </select>
                      </div>
                    </div>

                    {/* 2. Title & Metadata */}
                    <div>
                      <label className="block text-slate-400 font-bold mb-1">Mock Exam Paper Title:</label>
                      <input
                        type="text"
                        placeholder="e.g., JLPT N5 Official Practice Test Set 3"
                        value={newPaperTitle}
                        onChange={(e) => setNewPaperTitle(e.target.value)}
                        className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-bold placeholder-slate-500 focus:outline-none focus:border-rose-500"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-400 font-bold mb-1">Time Limit (Minutes):</label>
                        <input
                          type="number"
                          value={newPaperDuration}
                          onChange={(e) => setNewPaperDuration(e.target.value)}
                          className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-bold focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 font-bold mb-1">Target Passing Score Label:</label>
                        <input
                          type="text"
                          value={newPaperPassScore}
                          onChange={(e) => setNewPaperPassScore(e.target.value)}
                          placeholder="e.g. 80 / 180 Points or 110 / 200 Points"
                          className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-bold focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    </div>

                    {/* 3. Bulk JSON Questions Importer */}
                    <div className="space-y-1 pt-2 border-t border-slate-800">
                      <label className="block text-amber-300 font-bold">
                        📋 Bulk Paste Question Bank JSON (No Coding Required):
                      </label>
                      <p className="text-[11px] text-slate-400">
                        Paste question JSON objects with options, audio URLs, and correct answers.
                      </p>
                      <textarea
                        rows={4}
                        placeholder='[{"prompt": "私__ミラーです。", "options": ["は", "が", "を", "に"], "correct": 0, "audio": ""}]'
                        value={jsonImportText}
                        onChange={(e) => setJsonImportText(e.target.value)}
                        className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono text-[11px] placeholder-slate-600 focus:outline-none focus:border-rose-500"
                      />
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                      <button
                        type="button"
                        onClick={() => setShowCreatePaperModal(false)}
                        className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700 transition-all cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white text-xs font-black shadow-glow transition-all cursor-pointer"
                      >
                        Publish Paper →
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── 5. SYSTEM HEALTH ── */}
        {activeTab === 'SYSTEM' && (
          <div className="space-y-4 animate-fade-in">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
              <h2 className="text-lg font-black text-white">Database Status &amp; System Health</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                    <CheckCircle2 className="w-4 h-4" /> Database Provider: MySQL / Prisma ORM
                  </div>
                  <p className="text-xs text-slate-300">Connection string active via env DATABASE_URL.</p>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2">
                  <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold">
                    <Key className="w-4 h-4" /> Auth Protocol: JWT &amp; bcryptjs
                  </div>
                  <p className="text-xs text-slate-300">HTTP-only cookie auth token verification enabled.</p>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
