import { useState, useEffect } from "react";

export function useLocalStorage(key, initialValue) {

  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);

      if (!item) {
        localStorage.setItem(key, JSON.stringify(initialValue));
        return initialValue;
      }

      return JSON.parse(item);

    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(storedValue));
  }, [storedValue, key]);

  return [storedValue, setStoredValue];
}