"use client";

import { Copy } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Highlight, type PrismTheme } from "prism-react-renderer";
import {
  type ComponentProps,
  type CSSProperties,
  type ReactNode,
  isValidElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { cn } from "@/lib/utils";

const TAP_SPRING = { type: "spring", stiffness: 500, damping: 30 } as const;
const SWAP_SPRING = { type: "spring", duration: 0.3, bounce: 0 } as const;
const CHECK_SPRING = { type: "spring", duration: 0.4, bounce: 0.35 } as const;
const COPY_RESET_MS = 1800;
const FALLBACK_HSL: [number, number, number] = [42, 100, 50];

export type CodeBlockProps = Omit<ComponentProps<"div">, "children"> & {
  code: string;
  language?: string;
  accent?: string;
  mode?: "auto" | "dark" | "light";
  filename?: string;
  showFrame?: boolean;
  showHeader?: boolean;
  showLineNumbers?: boolean;
  showCopyButton?: boolean;
  highlightLines?: number[];
};

function resolvePageMode(): "dark" | "light" {
  const root = document.documentElement;
  if (
    root.classList.contains("dark") ||
    root.getAttribute("data-theme") === "dark"
  ) {
    return "dark";
  }
  if (
    root.classList.contains("light") ||
    root.getAttribute("data-theme") === "light"
  ) {
    return "light";
  }
  if (typeof window.matchMedia !== "function") return "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function subscribeToPageMode(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class", "data-theme"],
  });
  const media =
    typeof window.matchMedia === "function"
      ? window.matchMedia("(prefers-color-scheme: dark)")
      : null;
  media?.addEventListener?.("change", onChange);

  return () => {
    observer.disconnect();
    media?.removeEventListener?.("change", onChange);
  };
}

const serverMode = () => "dark" as const;

function hexToHsl(hex: string): [number, number, number] {
  let value = hex.replace("#", "");
  if (value.length === 3) {
    value = value
      .split("")
      .map((character) => character + character)
      .join("");
  }
  if (!/^[\da-f]{6}$/i.test(value)) return FALLBACK_HSL;

  const red = Number.parseInt(value.slice(0, 2), 16) / 255;
  const green = Number.parseInt(value.slice(2, 4), 16) / 255;
  const blue = Number.parseInt(value.slice(4, 6), 16) / 255;
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const lightness = (max + min) / 2;
  if (max === min) return [0, 0, lightness * 100];

  const delta = max - min;
  const saturation =
    lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min);
  const hue =
    max === red
      ? ((green - blue) / delta + (green < blue ? 6 : 0)) * 60
      : max === green
        ? ((blue - red) / delta + 2) * 60
        : ((red - green) / delta + 4) * 60;

  return [hue, saturation * 100, lightness * 100];
}

function hsl(hue: number, saturation: number, lightness: number, alpha = 1) {
  const normalizedHue = ((hue % 360) + 360) % 360;
  const color = `${normalizedHue.toFixed(1)} ${saturation.toFixed(1)}% ${lightness.toFixed(1)}%`;
  return alpha === 1 ? `hsl(${color})` : `hsl(${color} / ${alpha})`;
}

function buildTheme(accent: string, mode: "dark" | "light") {
  const [hue, saturation, lightness] = hexToHsl(accent);
  const tint = (value: number, colorSaturation = saturation) =>
    hsl(hue, colorSaturation, value);
  const dark = mode === "dark";
  const accentTone = dark
    ? tint(Math.min(Math.max(lightness, 56), 70))
    : tint(Math.min(Math.max(lightness, 38), 50));
  const ramp = (value: number) => (dark ? value : 100 - value);

  const colors = dark
    ? {
        accent: accentTone,
        bg: "hsl(200 12% 5%)",
        border: "rgb(255 255 255 / 0.08)",
        headerBg: "rgb(255 255 255 / 0.03)",
        plain: "#ffffff",
        muted: "rgb(255 255 255 / 0.6)",
        gutter: "rgb(255 255 255 / 0.28)",
        hoverWash: "rgb(255 255 255 / 0.08)",
        floatBg: "rgb(255 255 255 / 0.05)",
        selection: hsl(hue, saturation, 58, 0.3),
        lineWash: hsl(hue, saturation, 58, 0.1),
      }
    : {
        accent: accentTone,
        bg: "hsl(0 0% 98.5%)",
        border: "rgb(0 0 0 / 0.08)",
        headerBg: "rgb(0 0 0 / 0.03)",
        plain: "#171717",
        muted: "rgb(0 0 0 / 0.6)",
        gutter: "rgb(0 0 0 / 0.32)",
        hoverWash: "rgb(0 0 0 / 0.06)",
        floatBg: "rgb(0 0 0 / 0.04)",
        selection: hsl(hue, saturation, 45, 0.25),
        lineWash: hsl(hue, saturation, 45, 0.08),
      };

  const theme: PrismTheme = {
    plain: { color: colors.plain, backgroundColor: "transparent" },
    styles: [
      {
        types: ["comment", "prolog", "doctype", "cdata"],
        style: {
          color: tint(ramp(42), saturation * 0.35),
          fontStyle: "italic",
        },
      },
      {
        types: ["punctuation"],
        style: { color: tint(ramp(62), saturation * 0.3) },
      },
      {
        types: ["operator", "combinator"],
        style: { color: tint(ramp(70), saturation * 0.4) },
      },
      {
        types: ["keyword", "selector", "atrule", "important", "tag"],
        style: { color: accentTone },
      },
      {
        types: ["string", "char", "inserted", "url"],
        style: { color: tint(ramp(76)) },
      },
      {
        types: ["function"],
        style: { color: tint(ramp(88), saturation * 0.5) },
      },
      {
        types: ["attr-name"],
        style: { color: tint(ramp(78), saturation * 0.7), fontStyle: "italic" },
      },
      {
        types: ["number", "boolean", "constant", "symbol", "deleted"],
        style: { color: tint(ramp(70)) },
      },
      {
        types: ["class-name", "maybe-class-name", "builtin"],
        style: { color: tint(ramp(93), saturation * 0.35) },
      },
      {
        types: ["property", "variable", "parameter"],
        style: { color: tint(ramp(97), saturation * 0.15) },
      },
      { types: ["regex"], style: { color: tint(ramp(72), saturation * 0.6) } },
    ],
  };

  return { colors, theme };
}

function CopyButton({
  code,
  floating = false,
}: {
  code: string;
  floating?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const copy = useCallback(async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(code);
      } else {
        const area = document.createElement("textarea");
        area.value = code;
        area.style.position = "fixed";
        area.style.opacity = "0";
        document.body.appendChild(area);
        area.select();
        document.execCommand("copy");
        area.remove();
      }
    } catch {
      return;
    }

    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), COPY_RESET_MS);
  }, [code]);

  const swap = reduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, scale: 0.5, filter: "blur(4px)" },
        animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
        exit: { opacity: 0, scale: 0.5, filter: "blur(4px)" },
      };

  return (
    <motion.button
      type="button"
      aria-label={copied ? "Copied" : "Copy code"}
      onClick={copy}
      whileTap={reduceMotion ? undefined : { scale: 0.9 }}
      transition={TAP_SPRING}
      className={cn(
        "size-7 text-(--cb-gutter) hover:bg-(--cb-hover-wash) hover:text-(--cb-plain) focus-visible:ring-(--cb-accent)/60 relative grid place-items-center rounded-lg outline-none transition-[background-color,color] duration-150 ease-out focus-visible:ring-2",
        copied &&
          "bg-(--cb-accent)/12 text-(--cb-accent) hover:bg-(--cb-accent)/12 hover:text-(--cb-accent)",
        floating &&
          "border-(--cb-border) bg-(--cb-float-bg) absolute right-2.5 top-2.5 z-10 border backdrop-blur-md",
      )}
    >
      <AnimatePresence initial={false}>
        {copied ? (
          <motion.span
            key="check"
            className="col-start-1 row-start-1"
            {...swap}
            transition={reduceMotion ? { duration: 0.15 } : CHECK_SPRING}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-3.5"
              aria-hidden
            >
              <motion.path
                d="M4 12.5l5 5L20 6.5"
                initial={reduceMotion ? false : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.2, ease: "easeOut", delay: 0.05 }}
              />
            </svg>
          </motion.span>
        ) : (
          <motion.span
            key="copy"
            className="col-start-1 row-start-1"
            {...swap}
            transition={reduceMotion ? { duration: 0.15 } : SWAP_SPRING}
          >
            <Copy className="size-3.5" />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

export function CodeBlock({
  code,
  language = "text",
  accent = "#ffab00",
  mode = "auto",
  filename,
  showFrame = true,
  showHeader = true,
  showLineNumbers = true,
  showCopyButton = true,
  highlightLines,
  className,
  style,
  ...props
}: CodeBlockProps) {
  const pageMode = useSyncExternalStore(
    subscribeToPageMode,
    resolvePageMode,
    serverMode,
  );
  const safeLanguage =
    typeof language === "string" && language ? language : "text";
  const safeMode = mode === "light" || mode === "dark" ? mode : pageMode;
  const { colors, theme } = useMemo(
    () => buildTheme(accent, safeMode),
    [accent, safeMode],
  );
  const trimmed = useMemo(() => code.replace(/^\n+/, "").trimEnd(), [code]);
  const highlighted = useMemo(
    () => new Set(highlightLines ?? []),
    [highlightLines],
  );
  const cssVars = {
    "--cb-accent": colors.accent,
    "--cb-bg": colors.bg,
    "--cb-border": colors.border,
    "--cb-header-bg": colors.headerBg,
    "--cb-plain": colors.plain,
    "--cb-muted": colors.muted,
    "--cb-gutter": colors.gutter,
    "--cb-hover-wash": colors.hoverWash,
    "--cb-float-bg": colors.floatBg,
    "--cb-selection": colors.selection,
    "--cb-line-wash": colors.lineWash,
  } as CSSProperties;

  return (
    <div
      className={cn(
        "group relative my-4 flex flex-col overflow-hidden text-left",
        showFrame && "border-(--cb-border) bg-(--cb-bg) rounded-xl border",
        className,
      )}
      style={{ ...cssVars, ...style }}
      {...props}
    >
      {showFrame && showHeader ? (
        <div className="border-(--cb-border) bg-(--cb-header-bg) flex h-10 shrink-0 items-center gap-3 border-b px-3.5 backdrop-blur-md">
          <span className="font-space-mono text-(--cb-muted) min-w-0 flex-1 truncate text-xs">
            {filename ?? safeLanguage}
          </span>
          {showCopyButton ? <CopyButton code={trimmed} /> : null}
        </div>
      ) : null}

      {!(showFrame && showHeader) && showCopyButton ? (
        <CopyButton code={trimmed} floating />
      ) : null}

      <div
        role="region"
        aria-label={filename ?? `${safeLanguage} code`}
        tabIndex={0}
        className={cn(
          "selection:bg-(--cb-selection) focus-visible:ring-(--cb-accent)/40 min-h-0 flex-1 overflow-auto outline-none [scrollbar-color:var(--cb-border)_transparent] [scrollbar-width:thin] focus-visible:ring-2",
          showFrame && "py-3",
        )}
      >
        <Highlight code={trimmed} language={safeLanguage} theme={theme}>
          {({ tokens, getLineProps, getTokenProps }) => {
            const gutterWidth = `${String(tokens.length).length}ch`;
            return (
              <pre className="font-space-mono w-max min-w-full text-[13px] leading-6 [tab-size:4]">
                {tokens.map((line, index) => {
                  const lineProps = getLineProps({ line });
                  return (
                    <div
                      key={index}
                      {...lineProps}
                      className={cn(
                        "relative flex min-w-full",
                        showFrame && "px-3.5",
                        highlighted.has(index + 1) && "bg-(--cb-line-wash)",
                        lineProps.className,
                      )}
                    >
                      {showLineNumbers ? (
                        <span
                          aria-hidden
                          className="text-(--cb-gutter) mr-4 shrink-0 select-none text-right"
                          style={{ width: gutterWidth }}
                        >
                          {index + 1}
                        </span>
                      ) : null}
                      <span className="pr-3.5">
                        {line.map((token, tokenIndex) => (
                          <span
                            key={tokenIndex}
                            {...getTokenProps({ token })}
                          />
                        ))}
                      </span>
                    </div>
                  );
                })}
              </pre>
            );
          }}
        </Highlight>
      </div>
    </div>
  );
}

function getText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(getText).join("");
  return isValidElement<{ children?: ReactNode }>(node)
    ? getText(node.props.children)
    : "";
}

function getLanguage(className: unknown) {
  if (typeof className !== "string") return "text";
  return className.match(/(?:^|\s)(?:language|lang)-([^\s]+)/)?.[1] ?? "text";
}

export function MdxCodeBlock({ children }: ComponentProps<"pre">) {
  const codeElement = isValidElement<{
    children?: ReactNode;
    className?: string;
  }>(children)
    ? children
    : null;

  return (
    <CodeBlock
      code={getText(codeElement?.props.children ?? children)}
      language={getLanguage(codeElement?.props.className)}
    />
  );
}
