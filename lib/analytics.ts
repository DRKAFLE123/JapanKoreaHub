/**
 * JapanKoreaHub GA4 & Telemetry Event Tracker
 */

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export const trackEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }
};

export const ANALYTICS_EVENTS = {
  // Navigation & Country selection
  COUNTRY_SELECTED: 'country_selected',
  
  // Search
  SEARCH_QUERY: 'search_query',

  // Gating & Auth
  SIGNUP_GATE_SHOWN: 'signup_gate_shown',
  SIGNUP_COMPLETED: 'signup_completed',
  PAYWALL_SHOWN: 'paywall_shown',

  // Learning & Exams
  FLASHCARD_REVIEWED: 'flashcard_reviewed',
  EXAM_STARTED: 'exam_started',
  EXAM_COMPLETED: 'exam_completed',

  // Monetization & Consultancy
  CONSULTANCY_CTA_CLICKED: 'consultancy_cta_clicked',
  CONSULTANCY_BOOKING_SUBMITTED: 'consultancy_booking_submitted',
};
