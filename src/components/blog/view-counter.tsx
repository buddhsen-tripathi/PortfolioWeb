"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { useViews } from "./views-context";

const MAX_LOAD_ATTEMPTS = 3;
const RETRY_DELAY_MS = 1500;

export default function ViewCounter({ slug, readOnly = false, showIcon = false }) {
  const { getViews, incrementViews, prefetchViews } = useViews();
  const [attempt, setAttempt] = useState(0);

  const count = slug ? getViews(slug) : null;

  useEffect(() => {
    setAttempt(0);
  }, [slug]);

  useEffect(() => {
    if (!slug) return;
    if (readOnly) prefetchViews([slug]);
    else incrementViews(slug);
  }, [slug, readOnly, attempt, incrementViews, prefetchViews]);

  useEffect(() => {
    if (!slug || count !== null || attempt >= MAX_LOAD_ATTEMPTS - 1) return;
    const timer = setTimeout(() => setAttempt((n) => n + 1), RETRY_DELAY_MS);
    return () => clearTimeout(timer);
  }, [slug, count, attempt]);

  if (!slug) return null;

  if (count === null) {
    return <span className="text-muted-foreground">...</span>;
  }

  return (
    <span className="inline-flex items-center gap-1 text-muted-foreground">
      {showIcon && <Eye className="h-3 w-3" />}
      <span>{count.toLocaleString()} views</span>
    </span>
  );
}
