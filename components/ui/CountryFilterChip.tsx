'use client';
import React from 'react';
import Link from 'next/link';

interface CountryFilterChipProps {
  country: 'japan' | 'korea';
  href: string;
}

export default function CountryFilterChip({ country, href }: CountryFilterChipProps) {
  const isJapan = country === 'japan';
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
        isJapan
          ? 'bg-pink-100 text-pink-700 border-pink-200 hover:bg-pink-200'
          : 'bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200'
      }`}
    >
      <span>{isJapan ? '🇯🇵' : '🇰🇷'}</span>
      <span>{isJapan ? 'Japan' : 'Korea'}</span>
    </Link>
  );
}
