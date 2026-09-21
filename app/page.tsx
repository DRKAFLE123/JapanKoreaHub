'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CountryHubClient from './[country]/CountryHubClient';
import { useCountry } from '@/lib/context/CountryContext';

export default function HomePage() {
  const router = useRouter();
  const { activeCountry } = useCountry();
  const [mountedCountry, setMountedCountry] = useState<'japan' | 'korea'>('japan');

  useEffect(() => {
    // Detect preferred country from localStorage or activeCountry context
    const saved = (localStorage.getItem('jkh_user_selected_country') ||
      localStorage.getItem('jkh_country') ||
      (activeCountry === 'korea' ? 'korea' : 'japan')) as 'japan' | 'korea';

    const target = saved === 'korea' ? 'korea' : 'japan';
    setMountedCountry(target);

    // Replace the root URL with the country-specific path for SEO and clean routing
    router.replace(`/${target}`);
  }, [router, activeCountry]);

  return <CountryHubClient country={mountedCountry} />;
}
