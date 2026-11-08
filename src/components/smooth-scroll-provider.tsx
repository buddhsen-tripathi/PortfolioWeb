"use client";

import { useEffect, useState } from "react";
import { ReactLenis } from "lenis/react";

function prefersReducedMotion() {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function SmoothScrollProvider({ children }) {
  const [isSmoothScrollEnabled, setIsSmoothScrollEnabled] = useState(false);

  useEffect(() => {
    function applyPreference() {
      setIsSmoothScrollEnabled(!prefersReducedMotion());
    }

    applyPreference();
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    mq.addEventListener("change", applyPreference);
    return () => mq.removeEventListener("change", applyPreference);
  }, []);

  if (!isSmoothScrollEnabled) return children;

  return (
    <ReactLenis
      root
      options={{
        autoRaf: true,
        smoothWheel: true,
        lerp: 0.1,
        anchors: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
