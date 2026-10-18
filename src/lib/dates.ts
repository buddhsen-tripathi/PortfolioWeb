const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

/**
 * Converts a display date like "17 Sep 2026" (how posts show dates on the
 * site) into an ISO date "2026-09-17" for structured data and the sitemap.
 * The display format stays untouched everywhere it's shown.
 * Returns undefined when the date can't be read, so callers can omit it.
 */
export function toIsoDate(display: string | undefined): string | undefined {
  if (!display) return undefined;
  const match = display.trim().match(/^(\d{1,2})\s+([A-Za-z]{3})[a-z]*\s+(\d{4})$/);
  if (match) {
    const month = MONTHS.indexOf(match[2].toLowerCase());
    if (month >= 0) {
      return `${match[3]}-${String(month + 1).padStart(2, "0")}-${match[1].padStart(2, "0")}`;
    }
  }
  const parsed = new Date(display);
  return isNaN(parsed.getTime()) ? undefined : parsed.toISOString().slice(0, 10);
}
