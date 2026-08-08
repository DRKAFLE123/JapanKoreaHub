'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home, BookOpen, ClipboardList, GraduationCap, Briefcase, Shield, Globe, Bell, FileText, Handshake, BarChart2, User as UserIcon
} from 'lucide-react';
import AuthSheet from '@/components/auth/AuthSheet';

const MAIN_LINKS = [
  { href: '/',             label: 'Home',         Icon: Home },
  { href: '/learn',        label: 'Learn',        Icon: BookOpen },
  { href: '/exams',        label: 'Exams',        Icon: ClipboardList },
  { href: '/study',        label: 'Study',        Icon: GraduationCap },
  { href: '/work',         label: 'Work',         Icon: Briefcase },
  { href: '/visa',         label: 'Visa',         Icon: Shield },
  { href: '/life',         label: 'Life',         Icon: Globe },
  { href: '/dashboard',    label: 'Progress',     Icon: BarChart2 },
  { href: '/profile',      label: 'Profile',      Icon: UserIcon },
];

const SECONDARY_LINKS = [
  { href: '/notices',      label: 'Notices',      Icon: Bell },
  { href: '/blog',         label: 'Blog',         Icon: FileText },
  { href: '/consultancy',  label: 'Consultancy',  Icon: Handshake },
];

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [authSheetOpen, setAuthSheetOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile overlay for when sidebar is open on smaller screens */}
      {isOpen && onClose && (
        <div className="fixed inset-0 bg-black/40 z-30 lg:hidden animate-fade-in" onClick={onClose} />
      )}
      
      <aside className={`
        fixed top-16 left-0 bottom-0 w-64 bg-white border-r border-gray-200 z-30
        overflow-y-auto pb-20 transition-transform duration-200 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="px-3 py-4 space-y-1">
          <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Platform</p>
          {MAIN_LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => { if(window.innerWidth < 1024) onClose?.(); }}
                className={`
                  flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors
                  ${active 
                    ? 'bg-gray-100 text-gray-900' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }
                `}
              >
                <link.Icon className={`w-4 h-4 ${active ? 'text-gray-900' : 'text-gray-400'}`} />
                {link.label}
              </Link>
            );
          })}
        </div>
        
        <div className="px-3 py-4 space-y-1 mt-2 border-t border-gray-100">
          <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Resources</p>
          {SECONDARY_LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => { if(window.innerWidth < 1024) onClose?.(); }}
                className={`
                  flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors
                  ${active 
                    ? 'bg-gray-100 text-gray-900' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }
                `}
              >
                <link.Icon className={`w-4 h-4 ${active ? 'text-gray-900' : 'text-gray-400'}`} />
                {link.label}
              </Link>
            );
          })}
        </div>
        
        <div className="px-3 py-4 mt-auto">
          <div className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100/50">
            <p className="font-bold text-sm text-indigo-950 mb-1">100% Free Account</p>
            <p className="text-xs text-indigo-800/80 mb-3 leading-relaxed">
              Create a free account to track your study streak, save cards, and unlock full mock tests.
            </p>
            <button
              onClick={() => setAuthSheetOpen(true)}
              className="w-full py-2 bg-gray-900 hover:bg-gray-800 text-white text-xs font-semibold rounded-xl shadow-sm transition-colors cursor-pointer"
            >
              Create Free Account
            </button>
          </div>
        </div>
      </aside>

      {authSheetOpen && (
        <AuthSheet
          initialMode="register"
          onClose={() => setAuthSheetOpen(false)}
        />
      )}
    </>
  );
}
