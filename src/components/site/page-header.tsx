import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";

interface PageHeaderProps {
  title: ReactNode;
  description?: ReactNode;
  /** Small mono line under the description, e.g. counts or dates. */
  meta?: ReactNode;
  back?: { href: string; label: string };
}

/* Opening block of every inner page, matching the home hero's spacing. */
export default function PageHeader({ title, description, meta, back }: PageHeaderProps) {
  return (
    <header className="px-6 pb-2 pt-12 sm:pt-14">
      {back && (
        <Link
          href={back.href}
          className="group mb-6 inline-flex items-center gap-1.5 text-[13px] text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
          {back.label}
        </Link>
      )}
      <h1 className="text-balance text-2xl font-semibold leading-tight tracking-tight sm:text-[28px]">
        {title}
      </h1>
      {description && (
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
      {meta && (
        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] text-muted-foreground">
          {meta}
        </div>
      )}
    </header>
  );
}
