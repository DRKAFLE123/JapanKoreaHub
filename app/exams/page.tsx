import React from 'react';
import MobileNavbar from '@/components/layout/MobileNavbar';
import BottomTabBar from '@/components/layout/BottomTabBar';

export default function PlaceholderPage() {
  return (
    <div className="min-h-screen bg-white">
      <MobileNavbar user={null} lang="en" onLangToggle={() => {}} onSearchOpen={() => {}} />
      <main className="pt-14 p-4 text-center text-gray-500 flex flex-col items-center justify-center min-h-[60vh]">
        <p className="text-lg font-semibold">Coming Soon</p>
        <p className="text-sm">This page is currently under development.</p>
      </main>
      <BottomTabBar />
    </div>
  );
}
