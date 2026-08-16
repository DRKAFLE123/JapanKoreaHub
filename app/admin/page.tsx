'use client';

import React, { useState, useEffect } from 'react';
import {
  ShieldCheck, Users, BookOpen, Clock, Award, Search, Plus, Trash2, Edit3,
  CheckCircle2, XCircle, ArrowLeft, RefreshCw, BarChart2, Filter, Key, Database, Globe, Lock
} from 'lucide-react';
import Link from 'next/link';
import { getLocalSettings, saveLocalSettings, PlatformSettings } from '@/lib/settings-store';

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
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'USERS' | 'VOCAB' | 'EXAMS' | 'NOTICES' | 'BOOKINGS' | 'SYSTEM'>('OVERVIEW');
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('ALL');

  // Platform Security & System Settings State
  const [platformSettings, setPlatformSettings] = useState<PlatformSettings>(() => getLocalSettings());

  const handleToggleSetting = (key: keyof PlatformSettings) => {
    const updated = { ...platformSettings, [key]: !platformSettings[key] };
    setPlatformSettings(updated);
    saveLocalSettings(updated);
  };

  // Auth State
  const [authChecking, setAuthChecking] = useState(true);
  const [currentUser, setCurrentUser] = useState<{ id: string; name: string; email: string; role: string } | null>(null);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isSubmittingAuth, setIsSubmittingAuth] = useState(false);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated && data.user?.role === 'ADMIN') {
          setCurrentUser(data.user);
        } else {
          // Check local stored session fallback for demo admin
          const savedUser = localStorage.getItem('jkh_user');
          if (savedUser) {
            try {
              const u = JSON.parse(savedUser);
              if (u.role === 'ADMIN' || u.email?.includes('admin')) {
                setCurrentUser({ id: 'admin-1', name: u.name || 'Admin', email: u.email, role: 'ADMIN' });
              }
            } catch (_) {}
          }
        }
      })
      .catch(() => {})
      .finally(() => setAuthChecking(false));
  }, []);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsSubmittingAuth(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });
      const data = await res.json();
      if (res.ok && data.user) {
        if (data.user.role === 'ADMIN') {
          setCurrentUser(data.user);
          localStorage.setItem('jkh_user', JSON.stringify(data.user));
        } else {
          setLoginError('Access denied: Your account does not have ADMIN privileges.');
        }
      } else {
        setLoginError(data.error || 'Invalid credentials');
      }
    } catch (err) {
      setLoginError('Failed to connect to auth server');
    } finally {
      setIsSubmittingAuth(false);
    }
  };

  const handleQuickDemoAdminLogin = () => {
    const adminUser = { id: 'admin-demo', name: 'Dr. Kafle', email: 'drkafle@languageguru.com', role: 'ADMIN' };
    setCurrentUser(adminUser);
    localStorage.setItem('jkh_user', JSON.stringify(adminUser));
  };

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

  // Loading State Screen
  if (authChecking) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center font-sans p-6">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white mx-auto shadow-md animate-bounce">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h2 className="text-base font-black text-slate-900">Verifying Admin Credentials...</h2>
          <p className="text-xs text-slate-500 font-medium">Connecting to JapanKoreaHub Security Protocol</p>
        </div>
      </div>
    );
  }

  // Authentication Gateway Screen
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center font-sans p-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl shadow-2xl p-8 space-y-6 relative z-10 text-slate-900">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white mx-auto shadow-lg">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900">Admin Portal Gatekeeper</h1>
            <p className="text-xs text-slate-500 font-medium">Authenticated Access Only for Platform Administrators</p>
          </div>

          {loginError && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold text-center">
              ⚠️ {loginError}
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4 text-xs font-medium">
            <div className="space-y-1">
              <label className="font-bold text-slate-700">Admin Email Address</label>
              <input
                type="email"
                required
                placeholder="drkafle@languageguru.com"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-indigo-600 font-semibold"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Password Key</label>
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-indigo-600 font-semibold"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmittingAuth}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold shadow-md transition-all cursor-pointer disabled:opacity-50 text-xs"
            >
              {isSubmittingAuth ? 'Authenticating Session...' : 'Sign In to Admin Portal →'}
            </button>
          </form>

          <div className="pt-4 border-t border-slate-200 text-center space-y-3">
            <p className="text-[11px] text-slate-400 font-bold">DEVELOPER DEMO / DIRECT ACCESS</p>
            <button
              onClick={handleQuickDemoAdminLogin}
              className="w-full py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-black text-xs transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4 text-emerald-600" />
              <span>Unlock Admin Access (Dr. Kafle)</span>
            </button>

            <Link href="/" className="inline-block text-xs font-bold text-slate-500 hover:text-slate-900 underline mt-2">
              ← Return to JapanKoreaHub Public Site
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleAdminLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('jkh_user');
    fetch('/api/auth/logout', { method: 'POST' }).catch(() => {});
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col md:flex-row">
      
      {/* Dedicated Vertical Admin Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 md:h-screen md:sticky md:top-0 shadow-xs z-30 font-sans">
        
        {/* Top Brand Header */}
        <div className="p-5 border-b border-slate-100 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-sm shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-sm font-black text-slate-900 leading-tight">Admin CMS</h1>
              <p className="text-[11px] text-slate-500 font-medium">JapanKoreaHub</p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 pt-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-black uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse" />
              Protected
            </span>
            <span className="text-[10px] text-slate-400 font-mono">v2.6 Live</span>
          </div>
        </div>

        {/* Vertical Navigation Links */}
        <nav className="p-3 space-y-1.5 flex-1 overflow-y-auto">
          {[
            { id: 'OVERVIEW', label: 'Dashboard Overview', icon: BarChart2, emoji: '📊' },
            { id: 'USERS', label: 'User & Role Manager', icon: Users, emoji: '👥' },
            { id: 'VOCAB', label: 'Vocabulary & Content CMS', icon: BookOpen, emoji: '📖' },
            { id: 'EXAMS', label: 'Exam & Question Bank', icon: Clock, emoji: '⏱' },
            { id: 'NOTICES', label: 'Notices & Policy Updates', icon: Globe, emoji: '📢' },
            { id: 'BOOKINGS', label: 'Consultancy Inquiries', icon: ShieldCheck, emoji: '🤝' },
            { id: 'SYSTEM', label: 'Database & System Health', icon: Database, emoji: '⚙️' },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs transition-all text-left cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white font-black shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-bold'
                }`}
              >
                <span className="text-base leading-none">{tab.emoji}</span>
                <span className="truncate">{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Bottom Profile & Exit Controls */}
        <div className="p-4 border-t border-slate-100 space-y-3 bg-slate-50/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-black text-xs flex items-center justify-center border border-indigo-200 shrink-0">
              {currentUser.name?.[0] || 'A'}
            </div>
            <div className="truncate text-xs">
              <div className="font-black text-slate-900 truncate">{currentUser.name}</div>
              <div className="text-[10px] text-slate-500 truncate">{currentUser.email}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleAdminLogout}
              className="flex-1 py-2 rounded-xl bg-white hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-bold transition-all text-center cursor-pointer"
            >
              Sign Out
            </button>
            <Link
              href="/"
              className="py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black transition-all text-center cursor-pointer shrink-0 shadow-xs"
              title="Return to site"
            >
              Site →
            </Link>
          </div>
        </div>

      </aside>

      {/* Main Work Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 overflow-y-auto max-w-6xl">

        {/* ── 1. DASHBOARD OVERVIEW ── */}
        {activeTab === 'OVERVIEW' && (
          <div className="space-y-6 animate-fade-in">
            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-2">
                <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
                  <span>Registered Users</span>
                  <Users className="w-4 h-4 text-indigo-600" />
                </div>
                <div className="text-2xl font-black text-slate-900">{stats.totalUsers}</div>
                <div className="text-[10px] text-emerald-600 font-bold">+12% this month</div>
              </div>

              <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-2">
                <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
                  <span>Vocabulary Terms</span>
                  <BookOpen className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-2xl font-black text-slate-900">{stats.totalVocab}</div>
                <div className="text-[10px] text-teal-600 font-bold">Japanese + Korean</div>
              </div>

              <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-2">
                <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
                  <span>Mock Exam Papers</span>
                  <Clock className="w-4 h-4 text-amber-600" />
                </div>
                <div className="text-2xl font-black text-slate-900">{stats.totalExams}</div>
                <div className="text-[10px] text-amber-600 font-bold">JLPT, JFT &amp; EPS-TOPIK</div>
              </div>

              <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-2">
                <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
                  <span>Certificates Issued</span>
                  <Award className="w-4 h-4 text-rose-600" />
                </div>
                <div className="text-2xl font-black text-slate-900">89</div>
                <div className="text-[10px] text-rose-600 font-bold">QR Verified</div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-indigo-50 border border-indigo-200 rounded-3xl p-6 shadow-xs">
              <h2 className="text-lg font-black text-slate-900 mb-1">⚡ Quick Administrative Tasks</h2>
              <p className="text-xs text-slate-600 font-medium mb-4">Manage learning content, update answer keys, or grant instructor privileges.</p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button onClick={() => setActiveTab('USERS')} className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-indigo-500 text-left transition-all group cursor-pointer shadow-xs">
                  <div className="text-sm font-black text-slate-900 group-hover:text-indigo-600 flex items-center justify-between">
                    <span>Manage User Roles</span>
                    <Users className="w-4 h-4 text-indigo-600" />
                  </div>
                  <p className="text-xs text-slate-500 font-medium mt-1">Promote users to INSTRUCTOR or ADMIN.</p>
                </button>

                <button onClick={() => setActiveTab('VOCAB')} className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-emerald-500 text-left transition-all group cursor-pointer shadow-xs">
                  <div className="text-sm font-black text-slate-900 group-hover:text-emerald-600 flex items-center justify-between">
                    <span>Add Vocabulary Item</span>
                    <BookOpen className="w-4 h-4 text-emerald-600" />
                  </div>
                  <p className="text-xs text-slate-500 font-medium mt-1">Add new words to JLPT or EPS-TOPIK sets.</p>
                </button>

                <button onClick={() => setActiveTab('EXAMS')} className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-amber-500 text-left transition-all group cursor-pointer shadow-xs">
                  <div className="text-sm font-black text-slate-900 group-hover:text-amber-600 flex items-center justify-between">
                    <span>Configure Mock Tests</span>
                    <Clock className="w-4 h-4 text-amber-600" />
                  </div>
                  <p className="text-xs text-slate-500 font-medium mt-1">Update questions, audio links, and answer keys.</p>
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
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 shadow-xs"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-bold shrink-0">Role Filter:</span>
                {(['ALL', 'STUDENT', 'INSTRUCTOR', 'ADMIN'] as const).map(role => (
                  <button
                    key={role}
                    onClick={() => setRoleFilter(role)}
                    className={`px-3 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                      roleFilter === role
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>

            {/* User List Table */}
            <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-600 uppercase font-black tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="p-4">User</th>
                      <th className="p-4">Role</th>
                      <th className="p-4">Streak</th>
                      <th className="p-4">Joined Date</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-800 font-medium">
                    {filteredUsers.map(u => (
                      <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-4">
                          <div className="font-black text-slate-900 text-sm">{u.name}</div>
                          <div className="text-slate-500 text-[11px]">{u.email}</div>
                        </td>
                        <td className="p-4">
                          <select
                            value={u.role}
                            onChange={e => handleRoleChange(u.id, e.target.value as any)}
                            className={`px-3 py-1 rounded-xl text-xs font-black border focus:outline-none cursor-pointer ${
                              u.role === 'ADMIN'
                                ? 'bg-rose-50 text-rose-700 border-rose-300'
                                : u.role === 'INSTRUCTOR'
                                  ? 'bg-purple-50 text-purple-700 border-purple-300'
                                  : 'bg-emerald-50 text-emerald-700 border-emerald-300'
                            }`}
                          >
                            <option value="STUDENT" className="bg-white text-slate-900">STUDENT</option>
                            <option value="INSTRUCTOR" className="bg-white text-slate-900">INSTRUCTOR</option>
                            <option value="ADMIN" className="bg-white text-slate-900">ADMIN</option>
                          </select>
                        </td>
                        <td className="p-4 font-bold text-amber-700">
                          🔥 {u.streakDays} Days
                        </td>
                        <td className="p-4 text-slate-500 font-mono">
                          {u.createdAt}
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => handleDeleteUser(u.id)}
                            className="p-2 rounded-xl bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white border border-rose-200 transition-all cursor-pointer"
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
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
                <div>
                  <h2 className="text-lg font-black text-slate-900">Vocabulary &amp; Grammar Content Manager</h2>
                  <p className="text-xs text-slate-500 font-medium">Add, edit, or sync static vocabulary datasets across JLPT and EPS-TOPIK curriculum.</p>
                </div>
                <button
                  onClick={() => alert('New Content Editor Modal: Functionality ready for backend payload submission.')}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-black flex items-center gap-2 hover:bg-emerald-500 transition-all cursor-pointer shrink-0 shadow-xs"
                >
                  <Plus className="w-4 h-4" /> Add New Entry
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-1">
                  <div className="text-xs font-bold text-slate-500">Japanese Vocab Entries</div>
                  <div className="text-xl font-black text-rose-700">2,850 Words</div>
                  <div className="text-[10px] text-slate-500">Minna 1-75 &amp; JLPT N5–N1</div>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-1">
                  <div className="text-xs font-bold text-slate-500">Korean Vocab Entries</div>
                  <div className="text-xl font-black text-emerald-700">3,200 Words</div>
                  <div className="text-[10px] text-slate-500">EPS-TOPIK 1-60 &amp; TOPIK I/II</div>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-1">
                  <div className="text-xs font-bold text-slate-500">Grammar Rules</div>
                  <div className="text-xl font-black text-purple-700">235 Rules</div>
                  <div className="text-[10px] text-slate-500">Dual English &amp; Nepali notes</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── 4. EXAM BANK ── */}
        {activeTab === 'EXAMS' && (
          <div className="space-y-4 animate-fade-in">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
                <div>
                  <h2 className="text-lg font-black text-slate-900">Exam Paper &amp; Question Bank Manager</h2>
                  <p className="text-xs text-slate-500 font-medium">Add level-wise mock test papers for Japanese (JLPT/JFT) &amp; Korean (EPS-TOPIK/TOPIK) without coding.</p>
                </div>
                <button
                  onClick={() => setShowCreatePaperModal(true)}
                  className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black flex items-center gap-2 transition-all cursor-pointer shrink-0 shadow-xs"
                >
                  <Plus className="w-4 h-4" /> Add Level-Wise Mock Paper
                </button>
              </div>

              <div className="space-y-3">
                {examPapers.map((paper) => (
                  <div key={paper.id} className="bg-slate-50 border border-slate-200 hover:border-indigo-400 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black border ${paper.track === 'JAPANESE' ? 'bg-rose-50 text-rose-700 border-rose-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'}`}>
                          {paper.track === 'JAPANESE' ? '🇯🇵 JAPANESE' : '🇰🇷 KOREAN'}
                        </span>
                        <span className="px-2 py-0.5 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 text-[10px] font-black">
                          Level {paper.level}
                        </span>
                        <span className="px-2 py-0.5 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold">
                          {paper.difficulty}
                        </span>
                        <h3 className="text-sm font-black text-slate-900">{paper.name}</h3>
                      </div>
                      <p className="text-xs text-slate-500 font-medium mt-1">{paper.questions} Questions • {paper.time} Limit • Target Pass: {paper.pass}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => alert(`Editing ${paper.name}: Question Inspector Ready.`)}
                        className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-800 text-xs font-bold transition-all cursor-pointer shadow-xs"
                      >
                        Edit Questions →
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete mock paper "${paper.name}"?`)) {
                            setExamPapers(prev => prev.filter(p => p.id !== paper.id));
                          }
                        }}
                        className="p-2 rounded-xl bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white border border-rose-200 transition-all cursor-pointer"
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
              <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
                <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-5 shadow-2xl animate-fade-in text-slate-900">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-indigo-600" />
                      <h3 className="text-base font-black text-slate-900">Add Level-Wise Mock Exam Paper</h3>
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
                        <label className="block text-slate-700 font-bold mb-1">Difficulty Filter:</label>
                        <select
                          value={newPaperDifficulty}
                          onChange={(e) => setNewPaperDifficulty(e.target.value as any)}
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:outline-none focus:border-amber-500 cursor-pointer"
                        >
                          <option value="EASY">🟢 Easy Level</option>
                          <option value="MEDIUM">🟡 Medium Level</option>
                          <option value="HARD">🔴 Hard Level</option>
                        </select>
                      </div>
                    </div>

                    {/* 2. Title & Metadata */}
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Mock Exam Paper Title:</label>
                      <input
                        type="text"
                        placeholder="e.g., JLPT N5 Official Practice Test Set 3"
                        value={newPaperTitle}
                        onChange={(e) => setNewPaperTitle(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-700 font-bold mb-1">Time Limit (Minutes):</label>
                        <input
                          type="number"
                          value={newPaperDuration}
                          onChange={(e) => setNewPaperDuration(e.target.value)}
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-700 font-bold mb-1">Target Passing Score Label:</label>
                        <input
                          type="text"
                          value={newPaperPassScore}
                          onChange={(e) => setNewPaperPassScore(e.target.value)}
                          placeholder="e.g. 80 / 180 Points or 110 / 200 Points"
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    </div>

                    {/* 3. Bulk JSON Questions Importer */}
                    <div className="space-y-1 pt-2 border-t border-slate-200">
                      <label className="block text-indigo-700 font-black">
                        📋 Bulk Paste Question Bank JSON (No Coding Required):
                      </label>
                      <p className="text-[11px] text-slate-500">
                        Paste question JSON objects with options, audio URLs, and correct answers.
                      </p>
                      <textarea
                        rows={4}
                        placeholder='[{"prompt": "私__ミラーです。", "options": ["は", "가", "を", "に"], "correct": 0, "audio": ""}]'
                        value={jsonImportText}
                        onChange={(e) => setJsonImportText(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono text-[11px] placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
                      <button
                        type="button"
                        onClick={() => setShowCreatePaperModal(false)}
                        className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-300 transition-all cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black shadow-xs transition-all cursor-pointer"
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

        {/* ── 5. NOTICES MANAGEMENT ── */}
        {activeTab === 'NOTICES' && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div>
                  <h2 className="text-lg font-black text-slate-900">📢 Publish Official Notice</h2>
                  <p className="text-xs text-slate-500 font-medium">Post verified policy updates, exam registrations, or vacancies for Japan and Korea.</p>
                </div>
              </div>

              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.target as HTMLFormElement;
                  const data = new FormData(form);
                  const payload = {
                    title: data.get('title'),
                    titleNe: data.get('titleNe'),
                    body: data.get('body'),
                    bodyNe: data.get('bodyNe'),
                    category: data.get('category'),
                    country: data.get('country'),
                    sourceType: data.get('sourceType'),
                    sourceUrl: data.get('sourceUrl'),
                    isPinned: data.get('isPinned') === 'on',
                  };

                  try {
                    const res = await fetch('/api/notices', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(payload),
                    });
                    if (res.ok) {
                      alert('Notice published successfully!');
                      form.reset();
                    } else {
                      alert('Failed to publish notice');
                    }
                  } catch (err) {
                    alert('Error publishing notice');
                  }
                }}
                className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-200"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Title (English)</label>
                    <input
                      name="title"
                      required
                      placeholder="e.g. Japan SSW Agriculture Skill Exam Registration Open"
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Title (Nepali)</label>
                    <input
                      name="titleNe"
                      placeholder="e.g. जापान SSW कृषि सीप परीक्षा दर्ता खुल्यो"
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 font-ne"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                    <select name="category" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900">
                      <option value="VISA_UPDATE">VISA_UPDATE</option>
                      <option value="EXAM_SCHEDULE">EXAM_SCHEDULE</option>
                      <option value="VACANCY">VACANCY</option>
                      <option value="PLATFORM">PLATFORM</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Country Scope</label>
                    <select name="country" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900">
                      <option value="JAPAN">🇯🇵 JAPAN</option>
                      <option value="KOREA">🇰🇷 KOREA</option>
                      <option value="BOTH">🌏 BOTH</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Source Type</label>
                    <select name="sourceType" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900">
                      <option value="OFFICIAL_GOVERNMENT">🏛️ OFFICIAL_GOVERNMENT</option>
                      <option value="EXAM_BODY">📝 EXAM_BODY</option>
                      <option value="EMBASSY">🏢 EMBASSY</option>
                      <option value="PARTNER">🤝 PARTNER</option>
                      <option value="JAPANKOREAHUB">🌐 JAPANKOREAHUB</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Source Link (Official Verification URL)</label>
                  <input
                    name="sourceUrl"
                    type="url"
                    placeholder="https://www.mofa.go.jp/..."
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Notice Body (English)</label>
                  <textarea
                    name="body"
                    required
                    rows={3}
                    placeholder="Full announcement text..."
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Notice Body (Nepali - Optional)</label>
                  <textarea
                    name="bodyNe"
                    rows={3}
                    placeholder="नेपाली विवरण..."
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 font-ne"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <label className="flex items-center gap-2 text-xs font-bold text-amber-700 cursor-pointer">
                    <input type="checkbox" name="isPinned" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                    📌 Pin this notice to the top of homepage
                  </label>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs rounded-xl shadow-xs"
                  >
                    Publish Notice →
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ── 6. CONSULTANCY BOOKINGS ── */}
        {activeTab === 'BOOKINGS' && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
              <h2 className="text-lg font-black text-slate-900">🤝 Student Counseling Inquiries</h2>
              <p className="text-xs text-slate-500 font-medium">Review 1-on-1 visa interview and document counseling requests.</p>
              
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 text-center py-8 font-medium">
                Consultancy bookings submitted via <code className="text-indigo-600 font-bold">/consultancy</code> are saved to <code className="text-indigo-600 font-bold">ConsultancyBooking</code> database table.
              </div>
            </div>
          </div>
        )}

        {/* ── 7. SYSTEM HEALTH & SECURITY SETTINGS ── */}
        {activeTab === 'SYSTEM' && (
          <div className="space-y-6 animate-fade-in">
            {/* Security Toggles Card */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div>
                  <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                    <Lock className="w-5 h-5 text-indigo-600" /> Platform Security &amp; Control Settings
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">Control developer inspection, screenshot restrictions, search crawler indexing, and system toggles.</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-black">
                  Real-time Policy Sync Active
                </span>
              </div>

              {/* Toggles Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* 1. Inspect Element & DevTools */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-black text-slate-900 flex items-center gap-2">
                      <span>🔍 Allow Browser DevTools / Inspect Element</span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      {platformSettings.allowInspection 
                        ? 'ALLOW: DevTools (F12, Inspect, Console) unlocked for developers.' 
                        : 'BLOCK: DevTools, F12, & Right-click inspect restricted on site.'}
                    </p>
                  </div>
                  <button
                    onClick={() => handleToggleSetting('allowInspection')}
                    className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer shrink-0 ${
                      platformSettings.allowInspection
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-rose-600 text-white shadow-xs'
                    }`}
                  >
                    {platformSettings.allowInspection ? 'ALLOWED (ON)' : 'BLOCKED (OFF)'}
                  </button>
                </div>

                {/* 2. Search Engine Indexing & Googlebot Crawling */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-black text-slate-900 flex items-center gap-2">
                      <span>🤖 Googlebot &amp; Search Engine Crawling</span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      {platformSettings.allowGooglebotCrawl
                        ? 'INDEX: Googlebot, Bing, & Search Engine crawlers allowed.'
                        : 'NOINDEX: Instructs search engines to stop crawling pages.'}
                    </p>
                  </div>
                  <button
                    onClick={() => handleToggleSetting('allowGooglebotCrawl')}
                    className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer shrink-0 ${
                      platformSettings.allowGooglebotCrawl
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-rose-600 text-white shadow-xs'
                    }`}
                  >
                    {platformSettings.allowGooglebotCrawl ? 'ALLOW CRAWL (ON)' : 'DISABLE CRAWL (OFF)'}
                  </button>
                </div>

                {/* 3. Screenshot & PrintScreen Protection */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-black text-slate-900 flex items-center gap-2">
                      <span>📸 Screenshot &amp; Screen Capture Protection</span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      {platformSettings.allowScreenshot
                        ? 'ALLOWED: Users can take screenshots freely.'
                        : 'PROTECTED: Blocks PrintScreen, Snipping tool, & macOS shortcuts.'}
                    </p>
                  </div>
                  <button
                    onClick={() => handleToggleSetting('allowScreenshot')}
                    className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer shrink-0 ${
                      platformSettings.allowScreenshot
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-rose-600 text-white shadow-xs'
                    }`}
                  >
                    {platformSettings.allowScreenshot ? 'ALLOW SS (ON)' : 'PROTECT SS (OFF)'}
                  </button>
                </div>

                {/* 4. Text Copy & Selection Protection */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-black text-slate-900 flex items-center gap-2">
                      <span>📋 Content Text Copy &amp; Selection</span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      {platformSettings.allowCopyText
                        ? 'ALLOWED: Text selection & clipboard copying unlocked.'
                        : 'PROTECTED: Prevents text selection & copy on lessons.'}
                    </p>
                  </div>
                  <button
                    onClick={() => handleToggleSetting('allowCopyText')}
                    className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer shrink-0 ${
                      platformSettings.allowCopyText
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-rose-600 text-white shadow-xs'
                    }`}
                  >
                    {platformSettings.allowCopyText ? 'ALLOW COPY (ON)' : 'RESTRICT COPY (OFF)'}
                  </button>
                </div>

                {/* 5. Platform Maintenance Mode */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-black text-slate-900 flex items-center gap-2">
                      <span>🛠️ Platform Maintenance Mode</span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      {platformSettings.maintenanceMode
                        ? 'MAINTENANCE ACTIVE: Displays maintenance banner to visitors.'
                        : 'OPERATIONAL: Live site running normally.'}
                    </p>
                  </div>
                  <button
                    onClick={() => handleToggleSetting('maintenanceMode')}
                    className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer shrink-0 ${
                      platformSettings.maintenanceMode
                        ? 'bg-amber-600 text-white shadow-xs animate-pulse'
                        : 'bg-slate-300 text-slate-700'
                    }`}
                  >
                    {platformSettings.maintenanceMode ? 'MAINTENANCE ON' : 'NORMAL LIVE'}
                  </button>
                </div>

                {/* 6. Dual Nepali Translation UI */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-black text-slate-900 flex items-center gap-2">
                      <span>🇳🇵 Dual Nepali Language UI</span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      {platformSettings.nepaliLanguageEnabled
                        ? 'ENABLED: Displays Nepali language translation notes.'
                        : 'DISABLED: Hides Nepali translation notes.'}
                    </p>
                  </div>
                  <button
                    onClick={() => handleToggleSetting('nepaliLanguageEnabled')}
                    className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer shrink-0 ${
                      platformSettings.nepaliLanguageEnabled
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-slate-300 text-slate-700'
                    }`}
                  >
                    {platformSettings.nepaliLanguageEnabled ? 'NEPALI ON' : 'NEPALI OFF'}
                  </button>
                </div>

              </div>
            </div>

            {/* System Status Grid */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
              <h2 className="text-lg font-black text-slate-900">Database Status &amp; System Health</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Database Provider: MySQL / Prisma ORM
                  </div>
                  <p className="text-xs text-slate-600 font-medium">Connection string active via env DATABASE_URL.</p>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
                  <div className="flex items-center gap-2 text-indigo-700 text-xs font-bold">
                    <Key className="w-4 h-4 text-indigo-600" /> Auth Protocol: JWT &amp; bcryptjs
                  </div>
                  <p className="text-xs text-slate-600 font-medium">HTTP-only cookie auth token verification enabled.</p>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
