/**
 * Best-effort localStorage access. Browsers may throw (private mode, quota,
 * disabled cookies/storage) — callers should not crash the app.
 */
export function safeLocalStorageGetItem(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function safeLocalStorageSetItem(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    // ignore QuotaExceededError, SecurityError, etc.
  }
}

export function safeLocalStorageRemoveItem(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch {
    // ignore
  }
}
