export interface PlatformSettings {
  allowInspection: boolean;      // Inspect Element & DevTools (F12)
  allowScreenshot: boolean;      // Screenshot & PrintScreen Protection
  allowCopyText: boolean;        // Text Copying & Selection
  allowGooglebotCrawl: boolean;  // Search Engine Indexing / Googlebot Crawl
  maintenanceMode: boolean;      // Platform Maintenance Mode
  nepaliLanguageEnabled: boolean;// Nepali Dual Language Translation UI
  consultancyEnabled: boolean;   // 1-on-1 Counseling Inquiries
}

export const DEFAULT_SETTINGS: PlatformSettings = {
  allowInspection: false,
  allowScreenshot: false,
  allowCopyText: false,
  allowGooglebotCrawl: true,
  maintenanceMode: false,
  nepaliLanguageEnabled: true,
  consultancyEnabled: true,
};

const SETTINGS_KEY = 'jkh_platform_settings';

export function getLocalSettings(): PlatformSettings {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS;
  try {
    const saved = localStorage.getItem(SETTINGS_KEY);
    if (saved) {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
    }
  } catch (_) {}
  return DEFAULT_SETTINGS;
}

export function saveLocalSettings(settings: PlatformSettings): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    window.dispatchEvent(new Event('jkh-settings-updated'));
  } catch (_) {}
}
