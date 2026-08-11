"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const ViewsContext = createContext(null);

const CACHE_KEY = "views-cache-all";
const CACHE_DURATION = 5 * 60 * 1000;
const BATCH_DELAY = 50;

export function ViewsProvider({ children }) {
  const [viewsMap, setViewsMap] = useState({});
  const pendingSlugsRef = useRef(new Set());
  const batchTimeoutRef = useRef(null);
  const fetchingRef = useRef(new Set());
  // Slugs incremented this tab session — batch results must not clobber them with a stale count.
  const incrementedRef = useRef(new Set());

  useEffect(() => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (!cached) return;
      const data = JSON.parse(cached);
      if (Date.now() - data.timestamp < CACHE_DURATION) {
        setViewsMap(data.views);
      } else {
        localStorage.removeItem(CACHE_KEY);
      }
    } catch {
      localStorage.removeItem(CACHE_KEY);
    }
  }, []);

  const saveCache = useCallback((views) => {
    try {
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({ views, timestamp: Date.now() })
      );
    } catch {}
  }, []);

  const fetchBatch = useCallback(
    async (slugs) => {
      if (slugs.length === 0 || typeof window === "undefined") return;
      slugs.forEach((slug) => fetchingRef.current.add(slug));

      try {
        const res = await fetch(`/api/views/batch?slugs=${slugs.join(",")}`);
        if (res.ok) {
          const data = await res.json();
          setViewsMap((prev) => {
            const updated = { ...prev };
            for (const [slug, count] of Object.entries(data.views ?? {})) {
              if (incrementedRef.current.has(slug)) {
                updated[slug] = Math.max(prev[slug] ?? 0, count ?? 0);
              } else {
                updated[slug] = count ?? 0;
              }
            }
            saveCache(updated);
            return updated;
          });
        }
      } catch (error) {
        console.error("Error fetching views:", error);
      } finally {
        slugs.forEach((slug) => fetchingRef.current.delete(slug));
      }
    },
    [saveCache]
  );

  const scheduleBatchFetch = useCallback(() => {
    if (batchTimeoutRef.current) clearTimeout(batchTimeoutRef.current);
    batchTimeoutRef.current = setTimeout(() => {
      const slugsToFetch = Array.from(pendingSlugsRef.current);
      pendingSlugsRef.current.clear();
      if (slugsToFetch.length > 0) fetchBatch(slugsToFetch);
    }, BATCH_DELAY);
  }, [fetchBatch]);

  const ensureFetched = useCallback(
    (slug) => {
      setViewsMap((current) => {
        if (
          !(slug in current) &&
          !pendingSlugsRef.current.has(slug) &&
          !fetchingRef.current.has(slug)
        ) {
          pendingSlugsRef.current.add(slug);
          scheduleBatchFetch();
        }
        return current;
      });
    },
    [scheduleBatchFetch]
  );

  const prefetchViews = useCallback(
    (slugs) => {
      setViewsMap((current) => {
        const slugsToFetch = slugs.filter(
          (slug) =>
            !(slug in current) &&
            !pendingSlugsRef.current.has(slug) &&
            !fetchingRef.current.has(slug)
        );
        if (slugsToFetch.length > 0) {
          slugsToFetch.forEach((slug) => pendingSlugsRef.current.add(slug));
          scheduleBatchFetch();
        }
        return current;
      });
    },
    [scheduleBatchFetch]
  );

  const getViews = useCallback((slug) => viewsMap[slug] ?? null, [viewsMap]);

  const incrementViews = useCallback(
    async (slug) => {
      const sessionKey = `viewed-${slug}`;
      if (sessionStorage.getItem(sessionKey)) {
        ensureFetched(slug);
        return;
      }

      // Claim the view before the request so Strict Mode remounts / rapid
      // refreshes cannot double-POST. Clear on failure so a retry is possible.
      sessionStorage.setItem(sessionKey, "true");

      try {
        const res = await fetch("/api/views", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ slug }),
        });

        if (res.ok) {
          const data = await res.json();
          incrementedRef.current.add(slug);
          setViewsMap((prev) => {
            const next = Math.max(prev[slug] ?? 0, data.views ?? 0);
            const updated = { ...prev, [slug]: next };
            saveCache(updated);
            return updated;
          });
        } else {
          sessionStorage.removeItem(sessionKey);
        }
      } catch (error) {
        sessionStorage.removeItem(sessionKey);
        console.error("Error incrementing views:", error);
      }
    },
    [saveCache, ensureFetched]
  );

  useEffect(() => {
    return () => {
      if (batchTimeoutRef.current) clearTimeout(batchTimeoutRef.current);
    };
  }, []);

  return (
    <ViewsContext.Provider value={{ getViews, incrementViews, prefetchViews }}>
      {children}
    </ViewsContext.Provider>
  );
}

export function useViews() {
  const context = useContext(ViewsContext);
  if (!context) {
    throw new Error("useViews must be used within a ViewsProvider");
  }
  return context;
}
