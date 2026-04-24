"use client";
import { useEffect, useState } from "react";
import NextTopLoader from "nextjs-toploader";
import { useTheme } from "next-themes";

export default function TopLoader({ height = 2 }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const color = resolvedTheme === "light" ? "#09090b" : "#ffffff";

  return <NextTopLoader color={color} height={height} showSpinner={false} />;
}
