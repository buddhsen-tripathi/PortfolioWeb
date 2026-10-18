/* Date helpers for experience entries, whose `year` reads like "Jul 2023 - Aug 2025". */

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function parseYearRange(year: string) {
  const [start, end] = year.split(" - ").map((s) => s.trim());
  return { start, end: end || start };
}

const toDate = (s: string) => {
  const [mon, y] = s.split(" ");
  return new Date(Number(y), MONTHS.indexOf(mon), 1);
};

export function monthsBetween(year: string) {
  const { start, end } = parseYearRange(year);
  const a = toDate(start);
  const b = end.toLowerCase().includes("present") ? new Date() : toDate(end);
  return Math.max(1, (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth()) + 1);
}

export function formatTenure(months: number) {
  const y = Math.floor(months / 12);
  const m = months % 12;
  if (y === 0) return `${m} mo`;
  if (m === 0) return `${y} yr${y > 1 ? "s" : ""}`;
  return `${y} yr${y > 1 ? "s" : ""} ${m} mo`;
}

export function startDate(year: string) {
  return toDate(parseYearRange(year).start).getTime();
}

/** Groups roles by company: newest role first within a company, most recent company first. */
export function groupByCompany<T extends { company: string; year: string }>(items: T[]) {
  const map = new Map<string, T[]>();
  for (const item of items) {
    const list = map.get(item.company) ?? [];
    list.push(item);
    map.set(item.company, list);
  }
  return Array.from(map.entries())
    .map(([company, roles]) => ({
      company,
      roles: [...roles].sort((a, b) => startDate(b.year) - startDate(a.year)),
    }))
    .sort((a, b) => startDate(b.roles[0].year) - startDate(a.roles[0].year));
}
