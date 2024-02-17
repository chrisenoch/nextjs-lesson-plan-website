import { useEffect, useState } from "react";

/**
 * Helps avoid hydration errors with SSR.
 *
 * @returns a boolean indicating if the calling component has finished hydrating
 */
export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return hydrated;
}
