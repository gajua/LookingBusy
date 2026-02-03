'use client';

import mixpanel from 'mixpanel-browser';

function initMixpanel() {
  if (typeof window !== 'undefined') {
    const token = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN ?? '';
    if (token) {
      mixpanel.init(token, {
        debug: process.env.NODE_ENV === 'development',
        track_pageview: true,
        persistence: 'localStorage',
      });
    }
  }
}

initMixpanel();

export const Mixpanel = () => null;
export default mixpanel;
