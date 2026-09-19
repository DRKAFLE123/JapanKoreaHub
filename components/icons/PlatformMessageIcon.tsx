'use client';
import React from 'react';
import { useCountry } from '@/lib/context/CountryContext';

interface PlatformMessageIconProps {
  className?: string;
  size?: number;
  country?: 'japan' | 'korea' | 'all';
  forceColor?: string;
}

/**
 * Custom Speech Bubble Message Icon matching platform styling
 * with two horizontal message lines cutout and automatic country-themed colors.
 */
export default function PlatformMessageIcon({
  className = 'w-5 h-5',
  size,
  country,
  forceColor,
}: PlatformMessageIconProps) {
  const { activeCountry } = useCountry();
  const currentCountry = country || activeCountry;

  // Platform dynamic color according to active hub
  const platformColor =
    forceColor ||
    (currentCountry === 'japan'
      ? 'text-red-600'
      : currentCountry === 'korea'
      ? 'text-blue-600'
      : 'text-indigo-600');

  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`${className} ${platformColor} transition-colors shrink-0`}
      style={size ? { width: size, height: size } : undefined}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 3C6.477 3 2 7.03 2 12c0 2.458 1.082 4.686 2.87 6.312-.392 1.838-1.258 3.39-2.202 4.383a.45.45 0 0 0 .43.743c2.812-.363 5.127-1.57 6.544-2.584.81.127 1.65.196 2.508.196 5.523 0 10-4.03 10-9s-4.477-9-10-9Zm-4.5 7a1 1 0 0 1 1-1h7a1 1 0 1 1 0 2h-7a1 1 0 0 1-1-1Zm0 3.5a1 1 0 0 1 1-1h4.5a1 1 0 1 1 0 2h-4.5a1 1 0 0 1-1-1Z"
      />
    </svg>
  );
}
