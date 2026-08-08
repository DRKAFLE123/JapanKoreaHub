'use client';
import React from 'react';

interface ContentWatermarkProps {
  userName?: string;
}

export default function ContentWatermark({ userName }: ContentWatermarkProps) {
  if (!userName) return null;

  return (
    <div className="content-watermark">
      Licensed to: {userName} · JapanKoreaHub
    </div>
  );
}
