import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionProps {
  id: string;
  title: string;
  /** Short mono label on the right of the heading bar, e.g. a count. */
  meta?: ReactNode;
  /** Footer row linking to the full page for this section. */
  more?: { href: string; label: string };
  className?: string;
  children: ReactNode;
}

export default function Section({ id, title, meta, more, className, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-12 pt-10">
      <div className="section-bar">
        <h2 id={`${id}-title`} className="text-[15px] font-medium tracking-tight">
          {title}
        </h2>
        {meta && <span className="font-mono text-[11px] text-muted-foreground">{meta}</span>}
      </div>

      <div className={cn(className)}>{children}</div>

      {more && (
        <Link
          href={more.href}
          className="group flex items-center justify-center gap-1.5 border-b border-dashed border-border py-2.5 text-xs text-muted-foreground transition-colors hover:bg-muted/30 hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-ring"
        >
          {more.label}
          <ArrowRight className="size-3 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      )}
    </section>
  );
}
