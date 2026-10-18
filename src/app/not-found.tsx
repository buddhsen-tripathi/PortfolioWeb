import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Section from "@/components/site/section";

/* "404" drawn on a 7-row grid, like a week column of the GitHub activity graph. */
const GLYPHS: Record<string, string[]> = {
  "4": ["1001", "1001", "1001", "1111", "0001", "0001", "0001"],
  "0": ["0110", "1001", "1001", "1001", "1001", "1001", "0110"],
};

const LEVELS = [
  "bg-foreground/[0.06]",
  "bg-brand/35",
  "bg-brand/55",
  "bg-brand/75",
  "bg-brand",
];

function buildGrid(text: string) {
  const rows = Array.from({ length: 7 }, () => [0]);
  for (const ch of text) {
    GLYPHS[ch].forEach((line, r) => rows[r].push(...[...line].map(Number), 0));
  }
  // Deterministic shading so the server and client render the same grid.
  return rows.map((row, r) => row.map((on, c) => (on ? 1 + ((r * 7 + c * 3) % 4) : 0)));
}

const grid = buildGrid("404");

const links = [
  { href: "/", label: "Home", hint: "Start from the top" },
  { href: "/projects", label: "Projects", hint: "Things I've built" },
  { href: "/hackathons", label: "Hackathons", hint: "Wins and podiums" },
  { href: "/blogs", label: "Blogs", hint: "Writing and notes" },
];

export default function NotFound() {
  return (
    <>
      <header className="px-6 pb-2 pt-12 sm:pt-16">
        <div
          aria-hidden
          className="grid w-fit gap-[3px]"
          style={{ gridTemplateColumns: `repeat(${grid[0].length}, minmax(0, 1fr))` }}
        >
          {grid.flatMap((row, r) =>
            row.map((level, c) => (
              <span key={`${r}-${c}`} className={`size-3 rounded-[2px] sm:size-3.5 ${LEVELS[level]}`} />
            ))
          )}
        </div>
        <p className="mt-6 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          404 · Page not found
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-[28px]">
          Nothing was committed here.
        </h1>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
          The link might be broken, or the page moved. One of these should get you back on track.
        </p>
      </header>

      <Section id="go" title="Go somewhere else">
        <ul className="grid sm:grid-cols-2">
          {links.map((link) => (
            <li key={link.href} className="border-b border-dashed border-border sm:odd:border-r">
              <Link
                href={link.href}
                className="group relative flex items-center gap-3 px-6 py-4 outline-none focus-visible:bg-muted/30"
              >
                <span className="hatch pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="relative flex flex-col">
                  <span className="text-sm font-medium">{link.label}</span>
                  <span className="text-[13px] text-muted-foreground">{link.hint}</span>
                </span>
                <ArrowRight className="relative ml-auto size-3.5 text-muted-foreground/50 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-brand" />
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
