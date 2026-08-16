'use client';

import React, { useEffect, useState } from 'react';
import { ShieldAlert, Lock } from 'lucide-react';
import { getLocalSettings, PlatformSettings } from '@/lib/settings-store';

export default function ContentProtection() {
  const [warningMessage, setWarningMessage] = useState<string | null>(null);
  const [isScreenBlurred, setIsScreenBlurred] = useState<boolean>(false);
  const [settings, setSettings] = useState<PlatformSettings>(getLocalSettings());

  const showWarning = (msg: string) => {
    setWarningMessage(msg);
    setTimeout(() => {
      setWarningMessage(null);
    }, 2500);
  };

  useEffect(() => {
    const syncSettings = () => {
      setSettings(getLocalSettings());
    };
    window.addEventListener('jkh-settings-updated', syncSettings);
    return () => window.removeEventListener('jkh-settings-updated', syncSettings);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 1. Disable Right Click Context Menu (Only if inspect is NOT allowed)
    const handleContextMenu = (e: MouseEvent) => {
      if (settings.allowInspection) return; // Allow context menu if inspection allowed
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        return;
      }
      e.preventDefault();
      showWarning('Right-click & Inspect Element are disabled by admin policy.');
    };

    // 2. Disable Copy, Cut, and Select Start (Only if text copy is NOT allowed)
    const handleCopy = (e: ClipboardEvent) => {
      if (settings.allowCopyText) return;
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        return;
      }
      e.preventDefault();
      showWarning('Copying vocabulary and grammar content is restricted by admin policy.');
    };

    const handleCut = (e: ClipboardEvent) => {
      if (settings.allowCopyText) return;
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        return;
      }
      e.preventDefault();
      showWarning('Cutting content is restricted.');
    };

    const handleSelectStart = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        return;
      }
      // Disable text selection on general page content
      e.preventDefault();
    };

    // 3. Disable DevTools & Shortcut Keys (F12, Ctrl+Shift+I, Ctrl+U, PrintScreen, etc.)
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const ctrlOrCmd = isMac ? e.metaKey : e.ctrlKey;
      const key = e.key ? e.key.toUpperCase() : '';

      // DevTools & Inspect shortcuts (Blocked only if allowInspection is FALSE)
      if (!settings.allowInspection) {
        if (e.key === 'F12' || e.keyCode === 123) {
          e.preventDefault();
          showWarning('Developer tools shortcut (F12) is disabled by admin policy.');
          return;
        }
        if (ctrlOrCmd && e.shiftKey && (key === 'I' || e.keyCode === 73)) {
          e.preventDefault();
          showWarning('Inspect Element is disabled by admin policy.');
          return;
        }
        if (ctrlOrCmd && e.shiftKey && (key === 'J' || e.keyCode === 74)) {
          e.preventDefault();
          showWarning('Developer Console is disabled.');
          return;
        }
        if (ctrlOrCmd && e.shiftKey && (key === 'C' || e.keyCode === 67)) {
          e.preventDefault();
          showWarning('Element selector is disabled.');
          return;
        }
        if (ctrlOrCmd && (key === 'U' || e.keyCode === 85)) {
          e.preventDefault();
          showWarning('View Source is disabled.');
          return;
        }
      }

      // Screenshot & Print Shortcuts (Blocked only if allowScreenshot is FALSE)
      if (!settings.allowScreenshot) {
        if (e.key === 'PrintScreen' || e.keyCode === 44) {
          e.preventDefault();
          try {
            navigator.clipboard.writeText('');
          } catch {}
          setIsScreenBlurred(true);
          setTimeout(() => setIsScreenBlurred(false), 2000);
          showWarning('Screen capture shortcut detected. Screenshots are restricted by admin policy.');
          return;
        }

        if (isMac && e.metaKey && e.shiftKey && (key === '3' || key === '4' || key === '5')) {
          e.preventDefault();
          setIsScreenBlurred(true);
          setTimeout(() => setIsScreenBlurred(false), 2000);
          showWarning('Screen capture shortcuts are restricted on macOS by admin policy.');
          return;
        }
      }
    };

    // Attach global window event listeners
    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('copy', handleCopy);
    window.addEventListener('cut', handleCut);
    window.addEventListener('selectstart', handleSelectStart);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('copy', handleCopy);
      window.removeEventListener('cut', handleCut);
      window.removeEventListener('selectstart', handleSelectStart);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      {/* Temporary Blur Protection Overlay on Screenshot Detection */}
      {isScreenBlurred && (
        <div className="fixed inset-0 z-[9999] bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-6 text-center animate-fade-in font-sans">
          <div className="max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/30">
              <Lock className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-black text-white">Content Protected</h3>
            <p className="text-xs text-slate-400">
              Screenshots and screen capture options are restricted on JapanKoreaHub to protect proprietary study material.
            </p>
          </div>
        </div>
      )}

      {/* Floating Alert Toast */}
      {warningMessage && (
        <div className="fixed bottom-6 right-6 z-[9990] max-w-sm bg-slate-900 text-white border border-slate-700/80 p-3.5 rounded-2xl shadow-2xl flex items-center gap-3 animate-fade-in font-sans">
          <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400 shrink-0">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-black text-rose-400">Content Protected</div>
            <div className="text-xs text-slate-300 font-medium leading-snug mt-0.5">{warningMessage}</div>
          </div>
        </div>
      )}
    </>
  );
}
