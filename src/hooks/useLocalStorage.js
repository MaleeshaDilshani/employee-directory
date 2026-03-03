import { useState, useEffect } from "react";

export function useLocalStorage(key, initialValue) {

  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);

      if (item) {
        const parsed = JSON.parse(item);

        // 🔥 If empty array, use seed data instead
        if (Array.isArray(parsed) && parsed.length === 0) {
          window.localStorage.setItem(key, JSON.stringify(initialValue));
          return initialValue;
        }

        return parsed;
      } else {
        window.localStorage.setItem(key, JSON.stringify(initialValue));
        return initialValue;
      }

    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(storedValue));
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}