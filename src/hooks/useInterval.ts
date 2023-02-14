import { useEffect, useRef } from "react";

/**
 * From here: https://overreacted.io/making-setinterval-declarative-with-react-hooks/
 */
export function useInterval(
  callback: () => any,
  delay: number,
  isImmediatelyFired = false
) {
  const savedCallback = useRef<() => any>();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current && savedCallback.current();
    }
    if (delay !== null) {
      isImmediatelyFired && tick();
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay, isImmediatelyFired]);
}
