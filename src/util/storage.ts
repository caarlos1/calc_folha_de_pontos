type storageKey = 'list';

export const get = <T>(key: storageKey): T | null => {
  const value = window.localStorage && window.localStorage.getItem(key);
  if (!value) return null;
  return JSON.parse(value) as T;
};

export const set = <T>(key: storageKey, value: T) =>
  value &&
  window.localStorage &&
  window.localStorage.setItem(key, JSON.stringify(value));
