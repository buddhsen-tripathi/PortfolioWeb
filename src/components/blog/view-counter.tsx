"use client";

import { useEffect } from "react";
import { Eye } from "lucide-react";
import { useViews } from "./views-context";

export default function ViewCounter({ slug, readOnly = false, showIcon = false }) {
  const { getViews, incrementViews, prefetchViews } = useViews();

  const count = slug ? getViews(slug) : null;

  useEffect(() => {
    if (!slug) return;
    if (readOnly) {
      prefetchViews([slug]);
    } else {
      incrementViews(slug);
    }
  }, [slug, readOnly, incrementViews, prefetchViews]);

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
