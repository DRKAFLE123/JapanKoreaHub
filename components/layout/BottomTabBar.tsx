'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home as HomeIcon, BookOpen as LearnIcon, Shield as VisaIcon, BarChart2 as ProgressIcon, User as ProfileIcon } from 'lucide-react';
import { useCountry } from '@/lib/context/CountryContext';

export default function BottomTabBar() {
  const pathname = usePathname();
  const { activeCountry } = useCountry();

  const getHref = (key: string) => {
    if (key === 'home') return activeCountry === 'japan' ? '/japan' : activeCountry === 'korea' ? '/korea' : '/';
    if (key === 'learn') return activeCountry === 'japan' ? '/japan/learn' : activeCountry === 'korea' ? '/korea/learn' : '/learn';
    if (key === 'visa') return activeCountry === 'japan' ? '/japan/visa' : activeCountry === 'korea' ? '/korea/visa' : '/visa';
    if (key === 'dashboard') return '/dashboard';
    return '/profile';
  };

  const tabs = [
    { key: 'home',      href: getHref('home'),      label: 'Home',     Icon: HomeIcon     },
    { key: 'learn',     href: getHref('learn'),     label: 'Learn',    Icon: LearnIcon    },
    { key: 'visa',      href: getHref('visa'),      label: 'Visa',     Icon: VisaIcon     },
    { key: 'dashboard', href: getHref('dashboard'), label: 'Progress', Icon: ProgressIcon },
    { key: 'profile',   href: getHref('profile'),   label: 'Profile',  Icon: ProfileIcon  },
  ];

  const isActive = (href: string) => {
    if (href === '/' || href === '/japan' || href === '/korea') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className="bottom-tab-bar md:hidden bg-white border-t border-slate-200">
      {tabs.map(({ key, href, label, Icon }) => {
        const active = isActive(href);
        return (
          <Link
            key={key}
            href={href}
            className="flex flex-col items-center justify-center flex-1 py-2 gap-0.5 transition-colors relative"
          >
            <Icon
              className={`w-[22px] h-[22px] transition-colors ${
                active 
                  ? activeCountry === 'japan' ? 'text-red-400' : activeCountry === 'korea' ? 'text-blue-400' : 'text-white'
                  : 'text-slate-400'
              }`}
              strokeWidth={active ? 2.5 : 1.8}
            />
            <span className={`text-[10px] font-medium transition-colors ${
              active 
                ? activeCountry === 'japan' ? 'text-red-400 font-bold' : activeCountry === 'korea' ? 'text-blue-400 font-bold' : 'text-white font-bold'
                : 'text-slate-400'
            }`}>
              {label}
            </span>
            {active && (
              <span className={`absolute bottom-0 w-8 h-0.5 rounded-full ${
                activeCountry === 'japan' ? 'bg-red-500' : activeCountry === 'korea' ? 'bg-blue-500' : 'bg-white'
              }`} />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
