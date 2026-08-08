'use client';
import React from 'react';
import Link from 'next/link';
import { X, Home, BookOpen, ClipboardList, GraduationCap, Briefcase, Shield, Globe, Bell, FileText, Handshake, User, LogIn } from 'lucide-react';

const NAV_ITEMS = [
  { href: '/',             label: 'Home',         Icon: Home         },
  { href: '/learn',        label: 'Learn',        Icon: BookOpen     },
  { href: '/exams',        label: 'Exams',        Icon: ClipboardList},
  { href: '/study',        label: 'Study',        Icon: GraduationCap},
  { href: '/work',         label: 'Work',         Icon: Briefcase    },
  { href: '/visa',         label: 'Visa',         Icon: Shield       },
  { href: '/life',         label: 'Life',         Icon: Globe        },
  { href: '/notices',      label: 'Notices',      Icon: Bell         },
  { href: '/blog',         label: 'Blog',         Icon: FileText     },
  { href: '/consultancy',  label: 'Consultancy',  Icon: Handshake    },
];

interface MobileDrawerProps {
  onClose: () => void;
  user?: { name: string; email: string } | null;
  onAuthOpen: (mode: 'signin' | 'register') => void;
}

export default function MobileDrawer({ onClose, user, onAuthOpen }: MobileDrawerProps) {
  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/40 animate-fade-in"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed top-0 left-0 bottom-0 z-50 w-[80vw] max-w-xs bg-white shadow-2xl animate-slide-left flex flex-col"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="JapanKoreaHub" className="w-7 h-7 rounded-lg object-contain" />
            <span className="font-bold text-sm text-gray-900">Japan Korea Hub</span>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-xl text-gray-500 hover:bg-gray-100 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto py-2">
          {NAV_ITEMS.map(({ href, label, Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className="flex items-center gap-3 px-5 py-3.5 text-sm font-medium text-gray-800 hover:bg-gray-50 transition-colors"
            >
              <Icon className="w-4 h-4 text-gray-500 flex-shrink-0" />
              {label}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-gray-100 px-5 py-4 space-y-3">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 font-bold text-sm flex items-center justify-center">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
            </div>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => { onAuthOpen('signin'); onClose(); }}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-800 hover:bg-gray-50 transition-colors"
              >
                <LogIn className="w-4 h-4" /> Sign in
              </button>
              <button
                onClick={() => { onAuthOpen('register'); onClose(); }}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gray-900 text-sm font-medium text-white hover:bg-gray-800 transition-colors"
              >
                <User className="w-4 h-4" /> Register
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
