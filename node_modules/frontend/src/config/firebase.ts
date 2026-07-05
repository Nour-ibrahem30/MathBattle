/**
 * Firebase configuration and app initialization.
 *
 * All values are read from Vite environment variables (VITE_ prefix).
 * Never hard-code credentials here — set them in your local .env file.
 *
 * Services exported:
 *  - `app`       — Firebase App instance
 *  - `analytics` — Firebase Analytics (browser-only)
 */

import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getAnalytics, type Analytics } from 'firebase/analytics';
import { getAuth, type Auth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Validate that required variables are present at startup
const requiredKeys: Array<keyof typeof firebaseConfig> = [
  'apiKey',
  'authDomain',
  'projectId',
  'appId',
];

for (const key of requiredKeys) {
  if (!firebaseConfig[key]) {
    throw new Error(
      `[Firebase] Missing required environment variable: VITE_FIREBASE_${key
        .replace(/([A-Z])/g, '_$1')
        .toUpperCase()}. ` +
        'Check your .env file.',
    );
  }
}

export const app: FirebaseApp = initializeApp(firebaseConfig);
export const auth: Auth = getAuth(app);

export const analytics: Analytics | null =
  typeof window !== 'undefined' ? getAnalytics(app) : null;
