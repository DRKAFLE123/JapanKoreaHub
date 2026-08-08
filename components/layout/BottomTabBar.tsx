'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home, BookOpen, User,
} from 'lucide-react';

// Passport is not in lucide — use Shield as substitute
import { Home as HomeIcon, BookOpen as LearnIcon, Shield as VisaIcon, BarChart2 as ProgressIcon, User as ProfileIcon } from 'lucide-react';

const TABS = [
  { href: '/',          label: 'Home',     Icon: HomeIcon     },
  { href: '/learn',     label: 'Learn',    Icon: LearnIcon    },
  { href: '/visa',      label: 'Visa',     Icon: VisaIcon     },
  { href: '/dashboard', label: 'Progress', Icon: ProgressIcon },
  { href: '/profile',   label: 'Profile',  Icon: ProfileIcon  },
] as const;

export default function BottomTabBar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav className="bottom-tab-bar md:hidden">
      {TABS.map(({ href, label, Icon }) => {
        const active = isActive(href);
        return (
          <Link
            key={href}
            href={href}
            className="flex flex-col items-center justify-center flex-1 py-2 gap-0.5 transition-colors"
          >
            <Icon
              className={`w-[22px] h-[22px] transition-colors ${active ? 'text-gray-900' : 'text-gray-400'}`}
              strokeWidth={active ? 2.5 : 1.8}
            />
            <span className={`text-[10px] font-medium transition-colors ${active ? 'text-gray-900' : 'text-gray-400'}`}>
              {label}
            </span>
            {active && (
              <span className="absolute bottom-0 w-8 h-0.5 bg-gray-900 rounded-full" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
