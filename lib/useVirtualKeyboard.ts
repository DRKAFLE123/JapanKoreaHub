'use client';

import { useState, useEffect } from 'react';

interface VirtualKeyboardState {
  isOpen: boolean;
  keyboardHeight: number;
  viewportHeight: number;
}

/**
 * Hook to detect mobile virtual keyboard appearance and dimensions
 * across iOS Safari, Android Chrome, and modern mobile browsers
 * using the standard window.visualViewport API.
 */
export function useVirtualKeyboard(): VirtualKeyboardState {
  const [state, setState] = useState<VirtualKeyboardState>({
    isOpen: false,
    keyboardHeight: 0,
    viewportHeight: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.visualViewport) return;

    const viewport = window.visualViewport;

    const updateKeyboard = () => {
      const vHeight = viewport.height;
      const wHeight = window.innerHeight;
      const diff = Math.max(0, wHeight - vHeight);

      // Mobile virtual keyboards typically occupy at least 130px
      const isKeyboardOpen = diff > 130;

      setState({
        isOpen: isKeyboardOpen,
        keyboardHeight: isKeyboardOpen ? Math.round(diff) : 0,
        viewportHeight: Math.round(vHeight),
      });
    };

    viewport.addEventListener('resize', updateKeyboard);
    viewport.addEventListener('scroll', updateKeyboard);
    window.addEventListener('resize', updateKeyboard);

    // Initial check
    updateKeyboard();

    return () => {
      viewport.removeEventListener('resize', updateKeyboard);
      viewport.removeEventListener('scroll', updateKeyboard);
      window.removeEventListener('resize', updateKeyboard);
    };
  }, []);

  return state;
}
