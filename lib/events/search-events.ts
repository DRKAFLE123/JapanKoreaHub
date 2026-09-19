'use client';

export function openGlobalSearch() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('open-global-search'));
  }
}

export function closeGlobalSearch() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('close-global-search'));
  }
}
