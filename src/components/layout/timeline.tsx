"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { TechBadge } from "@/lib/tech-icons";

type BodySeg = { text: string; bold?: boolean };

interface ExperienceRaw {
  role: string;
  company: string;
  year: string;
  type?: string;
  location?: string;
  logo?: string;
  logoPadding?: boolean;
  invertLogo?: boolean;
  responsibility: BodySeg[][] | string[];
  techstacks: string[];
}

interface RoleBlockProps {
  role: string;
  year: string;
  type?: string;
  responsibility: BodySeg[][] | string[];
  techstacks: string[];
  index: number;
  isLast: boolean;
}

function parseYearRange(year: string) {
  const [start, end] = year.split(" - ").map((s) => s.trim());
  return { start, end: end || start };
}

function monthsBetween(year: string) {
  const { start, end } = parseYearRange(year);
  const toDate = (s: string) => {
    const [mon, y] = s.split(" ");
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    return new Date(Number(y), months.indexOf(mon), 1);
  };
  const a = toDate(start);
  const b = end.toLowerCase().includes("present") ? new Date() : toDate(end);
  return Math.max(1, (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth()) + 1);
}

function formatTenure(months: number) {
  const y = Math.floor(months / 12);
  const m = months % 12;
  if (y === 0) return `${m} mo`;
  if (m === 0) return `${y} yr${y > 1 ? "s" : ""}`;
  return `${y} yr${y > 1 ? "s" : ""} ${m} mo`;
}

const RoleBlock = ({
  role,
  year,
  type,
  responsibility,
  techstacks,
  index,
  isLast,
}: RoleBlockProps) => {
  const [open, setOpen] = useState(true);
  const months = monthsBetween(year);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={`relative pl-6 md:pl-8 ${index > 0 ? "mt-6 pt-2" : ""}`}
    >
      {/* Empty circle marker — same size/position, no number */}
      <span className="absolute left-0 top-0.5 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full border border-foreground/30 bg-background" />

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="group flex w-full items-start justify-between gap-3 text-left"
      >
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-doto text-base font-medium leading-snug text-foreground transition-colors group-hover:text-sky-500 dark:group-hover:text-sky-400 md:text-xl md:leading-none md:uppercase">
              {role}
            </h3>
            {type && (
              <span className="rounded-xs border border-black/8 px-1.5 py-0.5 font-space-mono text-[9px] uppercase tracking-wide text-muted-foreground dark:border-white/8 md:text-[10px]">
                {type}
              </span>
            )}
          </div>
          <p className="mt-2 font-space-mono text-[11px] text-muted-foreground md:text-xs">
            {year}
            <span className="mx-1.5 text-foreground/20">·</span>
            {formatTenure(months)}
          </p>
        </div>

        <span
          className={`mt-1 shrink-0 font-space-mono text-[10px] uppercase tracking-wide text-muted-foreground/70 transition-transform duration-300 ${
            open ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>

      <motion.div
        initial={false}
        animate={{
          height: open ? "auto" : 0,
          opacity: open ? 1 : 0,
        }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden"
      >
        <div className="pt-3 pb-2">
          <ul className="space-y-2">
            {responsibility.map((bullet, i) => (
              <li
                key={i}
                className="font-space-mono text-xs leading-relaxed text-muted-foreground md:text-sm"
              >
                <span className="mr-2 text-foreground/25">›</span>
                {Array.isArray(bullet)
                  ? bullet.map((seg, j) =>
                      seg.bold ? (
                        <strong key={j} className="font-semibold text-foreground">
                          {seg.text}
                        </strong>
                      ) : (
                        <span key={j}>{seg.text}</span>
                      )
                    )
                  : bullet}
              </li>
            ))}
          </ul>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {techstacks.map((tech, i) => (
              <TechBadge key={i} name={tech} />
            ))}
          </div>
        </div>
      </motion.div>

      {!isLast && <div className="mt-6 border-b border-dashed border-black/10 dark:border-white/10" />}
    </motion.div>
  );
};

function startDate(year: string) {
  const [mon, y] = year.split(" - ")[0].split(" ");
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return new Date(Number(y), months.indexOf(mon), 1).getTime();
}

function shortRoleLabel(role: string, type?: string) {
  if (type?.toLowerCase().includes("intern")) return "Intern";
  if (/sde\s*1|engineer\s*1/i.test(role)) return "SDE 1";
  if (/sde\s*2|engineer\s*2/i.test(role)) return "SDE 2";
  const words = role.split(" ");
  return words.length > 2 ? words.slice(-2).join(" ") : role;
}

function groupByCompany(items: ExperienceRaw[]) {
  const map = new Map<string, ExperienceRaw[]>();
  for (const item of items) {
    const list = map.get(item.company) ?? [];
    list.push(item);
    map.set(item.company, list);
  }
  return Array.from(map.entries()).map(([company, roles]) => {
    const sorted = [...roles].sort((a, b) => startDate(b.year) - startDate(a.year));
    return { company, roles: sorted };
  });
}

const Timeline = ({ items }: { items: ExperienceRaw[] }) => {
  const companies = useMemo(() => groupByCompany(items), [items]);

  return (
    <div className="mt-4 space-y-16 px-2 md:mt-6 md:space-y-20 md:px-0">
      {companies.map((group, companyIndex) => {
        const first = group.roles[0];
        const totalMonths = group.roles.reduce((sum, r) => sum + monthsBetween(r.year), 0);
        const { start } = parseYearRange(group.roles[group.roles.length - 1].year);
        const { end } = parseYearRange(group.roles[0].year);

        return (
          <motion.section
            key={group.company}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: companyIndex * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="grid gap-8 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)] md:gap-10"
          >
            <aside className="md:sticky md:top-24 md:self-start">
              <div className="flex items-center gap-3">
                {first.logo && (
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-black/8 dark:border-white/8 ${
                      first.logo ? "bg-white" : "bg-black/3 dark:bg-white/5"
                    }`}
                  >
                    <Image
                      src={first.logo}
                      alt={`${group.company} logo`}
                      width={48}
                      height={48}
                      className={`h-full w-full object-cover ${first.logoPadding ? "p-1.5" : ""} ${first.invertLogo ? "dark:invert" : ""}`}
                    />
                  </div>
                )}
                <div>
                  <p className="font-doto text-2xl font-bold uppercase leading-none md:text-3xl">
                    {group.company}
                  </p>
                  <p className="mt-1.5 font-space-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground md:text-[11px]">
                    {first.location}
                  </p>
                </div>
              </div>

              <div className="mt-5 h-px w-14 bg-foreground/15" />

              <div className="mt-5 space-y-2.5 font-space-mono text-xs text-muted-foreground">
                <p>
                  <span className="text-foreground/80">{formatTenure(totalMonths)}</span>
                  <span className="mx-1.5 text-foreground/20">·</span>
                  {start} → {end}
                </p>
                <p className="text-[11px] text-muted-foreground/70">
                  {group.roles.length} role{group.roles.length === 1 ? "" : "s"}
                </p>
              </div>

              <div className="mt-5">
                <div className="flex h-1.5 overflow-hidden rounded-full bg-black/5 dark:bg-white/6">
                  {[...group.roles].reverse().map((role, i, arr) => {
                    const share = (monthsBetween(role.year) / totalMonths) * 100;
                    return (
                      <div
                        key={role.role}
                        title={`${role.role}: ${formatTenure(monthsBetween(role.year))}`}
                        className={`h-full ${
                          i === arr.length - 1
                            ? "bg-sky-500/70 dark:bg-sky-400/70"
                            : "bg-foreground/20"
                        }`}
                        style={{ width: `${share}%` }}
                      />
                    );
                  })}
                </div>
                <div className="mt-2 flex justify-between font-space-mono text-[9px] text-muted-foreground/55">
                  {[...group.roles].reverse().map((role) => (
                    <span key={role.role}>{shortRoleLabel(role.role, role.type)}</span>
                  ))}
                </div>
              </div>
            </aside>

            <div className="relative border-s border-black/12 dark:border-white/12">
              {group.roles.map((role, i) => (
                <RoleBlock
                  key={`${role.role}-${role.year}`}
                  role={role.role}
                  year={role.year}
                  type={role.type}
                  responsibility={role.responsibility}
                  techstacks={role.techstacks}
                  index={i}
                  isLast={i === group.roles.length - 1}
                />
              ))}
            </div>
          </motion.section>
        );
      })}
    </div>
  );
};

export default Timeline;
