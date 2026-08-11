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

// Module-scoped so React Strict Mode remounts still see in-flight POSTs.
const inFlightIncrements = new Set();

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
            for (const [slug, rawCount] of Object.entries(data.views ?? {})) {
              const count = Number(rawCount) || 0;
              if (incrementedRef.current.has(slug)) {
                updated[slug] = Math.max(prev[slug] ?? 0, count);
              } else {
                updated[slug] = count;
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

  const queueFetch = useCallback(
    (slugs, { force = false } = {}) => {
      setViewsMap((current) => {
        const slugsToFetch = slugs.filter((slug) => {
          if (
            pendingSlugsRef.current.has(slug) ||
            fetchingRef.current.has(slug)
          ) {
            return false;
          }
          if (!force && slug in current) return false;
          return true;
        });
        if (slugsToFetch.length > 0) {
          slugsToFetch.forEach((slug) => pendingSlugsRef.current.add(slug));
          scheduleBatchFetch();
        }
        return current;
      });
    },
    [scheduleBatchFetch]
  );

  const prefetchViews = useCallback(
    (slugs) => queueFetch(slugs, { force: false }),
    [queueFetch]
  );

  /** Re-fetch even when a cached/prefetched value exists (e.g. after a claimed session view). */
  const refreshViews = useCallback(
    (slugs) => queueFetch(slugs, { force: true }),
    [queueFetch]
  );

  const getViews = useCallback((slug) => viewsMap[slug] ?? null, [viewsMap]);

  const incrementViews = useCallback(
    async (slug) => {
      const sessionKey = `viewed-${slug}`;
      if (sessionStorage.getItem(sessionKey)) {
        // Sync from server so a mid-flight reload can't leave a stale cached count.
        refreshViews([slug]);
        return;
      }

      if (inFlightIncrements.has(slug)) return;
      inFlightIncrements.add(slug);

      try {
        const res = await fetch("/api/views", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ slug }),
        });

        if (res.ok) {
          const data = await res.json();
          const views = Number(data.views) || 0;
          sessionStorage.setItem(sessionKey, "true");
          incrementedRef.current.add(slug);
          setViewsMap((prev) => {
            const next = Math.max(prev[slug] ?? 0, views);
            const updated = { ...prev, [slug]: next };
            saveCache(updated);
            return updated;
          });
        }
      } catch (error) {
        console.error("Error incrementing views:", error);
      } finally {
        inFlightIncrements.delete(slug);
      }
    },
    [saveCache, refreshViews]
  );

  useEffect(() => {
    return () => {
      if (batchTimeoutRef.current) clearTimeout(batchTimeoutRef.current);
    };
  }, []);

  return (
    <ViewsContext.Provider
      value={{ getViews, incrementViews, prefetchViews, refreshViews }}
    >
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
