import { useRef, useEffect } from "react";

/**
 * Adapted from: https://usehooks.com/useEventListener/
 */
export function useEventListener(eventName: any, handler: any, element?: any) {
  // --->>

  // Create a ref that stores handler
  const savedHandler = useRef();

  // Update ref.current value if handler changes.
  // This allows our effect below to always get latest handler ...
  // ... without us needing to pass it in effect deps array ...
  // ... and potentially cause effect to re-run every render.
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(
    () => {
      const effElement = element || window;
      // Make sure element supports addEventListener
      const isSupported = effElement && effElement.addEventListener;
      if (!isSupported) return;

      // Create event listener that calls handler function stored in ref
      const eventListener = (event: any) => {
        if (!!savedHandler && savedHandler.current)
          (savedHandler as any).current(event);
      };

      // Add event listener
      effElement.addEventListener(eventName, eventListener);

      // Remove event listener on cleanup
      return () => {
        effElement.removeEventListener(eventName, eventListener);
      };
    },
    [eventName, element] // Re-run if eventName or element changes
  );
}
