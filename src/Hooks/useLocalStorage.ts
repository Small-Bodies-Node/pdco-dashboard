import { useCallback, useEffect, useState } from "react";

export type TLocalStorageKeys = "API_DATA" | "CHECK_FOR_DATA_REFRESH_INTERVAL";

/**
 * Local Storage hook
 */
export function useLocalStorage<T>(
  key: TLocalStorageKeys,
  initValue: any
): [T, (value: any) => void] {
  // --->>

  const [storedValue, setStoredValue] = useState<T>(initValue);
  useEffect(() => {
    setStoredValue(
      (() => {
        try {
          // Get from local storage by key
          const item = window.localStorage.getItem(key);
          // Parse stored json or if none return initialValue
          return item ? JSON.parse(item) : initValue;
        } catch (error) {
          // If error also return initialValue
          console.log(error);
          return initValue;
        }
      })()
    );
  }, [key, initValue]);

  const setValue = useCallback(
    (value: any) => {
      try {
        // Allow value to be a function so we have same API as useState
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        // Save state
        setStoredValue(valueToStore);
        // Save to local storage
        window.localStorage.setItem(
          key.toString(),
          JSON.stringify(valueToStore)
        );
      } catch (error) {
        // A more advanced implementation would handle the error case
        console.log(error);
      }
    },
    [key, storedValue]
  );

  return [storedValue, setValue];
}
