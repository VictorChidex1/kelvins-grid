import { useState, useEffect } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    // SSR safe check
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    const media = window.matchMedia(query);
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);

    // Update if changed between init and effect (rare but safe)
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
}
