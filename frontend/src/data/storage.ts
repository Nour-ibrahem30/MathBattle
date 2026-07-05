import { createInitialData, type AppSeedData } from './seed';

const STORAGE_KEY = 'mathbattle_app_data';
const AUTH_KEY = 'mathbattle_auth';

export function loadAppData(): AppSeedData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as AppSeedData;
  } catch {
    /* reset on corrupt data */
  }
  const seed = createInitialData();
  saveAppData(seed);
  return seed;
}

export function saveAppData(data: AppSeedData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export interface AuthSession {
  userId: string;
  accessToken: string;
  expiresAt: number;
}

export function loadSession(): AuthSession | null {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw) as AuthSession;
    if (session.expiresAt < Date.now()) {
      localStorage.removeItem(AUTH_KEY);
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

export function saveSession(session: AuthSession): void {
  localStorage.setItem(AUTH_KEY, JSON.stringify(session));
}

export function clearSession(): void {
  localStorage.removeItem(AUTH_KEY);
}

export function resetAppData(): void {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(AUTH_KEY);
}
