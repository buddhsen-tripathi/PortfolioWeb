import Image from "next/image";
import { ArrowUpRight, Star } from "lucide-react";
import { projects } from "@/constants";
import { TechBadge } from "@/lib/tech-icons";
import { cn } from "@/lib/utils";

export type Project = (typeof projects)[number];

const status: Record<string, { label: string; className: string }> = {
  acquired: {
    label: "Acquired",
    className:
      "text-amber-600 dark:text-amber-400 border-amber-500/30 bg-amber-500/10",
  },
  live: { label: "Live", className: "text-brand border-brand/30 bg-brand/10" },
  building: {
    label: "Building",
    className: "text-sky-600 dark:text-sky-400 border-sky-500/30 bg-sky-500/10",
  },
  research: {
    label: "Research",
    className:
      "text-violet-600 dark:text-violet-400 border-violet-500/30 bg-violet-500/10",
  },
  active: {
    label: "Active",
    className: "text-sky-600 dark:text-sky-400 border-sky-500/30 bg-sky-500/10",
  },
};

/* `wide` spans both columns, image beside the text, so an odd last card leaves no gap. */
export function ProjectCard({
  project,
  stars,
  wide = false,
}: {
  project: Project;
  stars: number | null;
  wide?: boolean;
}) {
  const s = status[project.status] ?? status.active;
  const [kind, focus] = project.category.split(" · ");

  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "border-border focus-visible:bg-muted/30 group relative flex flex-col gap-4 border-b border-dashed p-6 outline-none",
        wide
          ? "sm:col-span-2 sm:flex-row sm:items-center sm:gap-6"
          : "sm:odd:border-r",
      )}
    >
      <span className="hatch pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div
        className={cn("beam-border rounded-md", wide && "sm:w-1/2 sm:shrink-0")}
      >
        <div className="border-border bg-muted relative aspect-[16/10] overflow-hidden rounded-md border">
          {project.preview && (
            <Image
              src={project.preview}
              alt={`${project.title} screenshot`}
              fill
              sizes="(max-width: 640px) 100vw, 360px"
              className={cn(
                "object-cover object-top",
                project.previewDark && "dark:hidden",
              )}
            />
          )}
          {project.previewDark && (
            <Image
              src={project.previewDark}
              alt={`${project.title} screenshot`}
              fill
              sizes="(max-width: 640px) 100vw, 360px"
              className="hidden object-cover object-top dark:block"
            />
          )}
        </div>
      </div>

      <div className="relative flex min-w-0 flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <h3 className="text-[15px] font-semibold tracking-tight">
            {project.title}
          </h3>
          <span
            className={cn(
              "rounded border px-1.5 py-px font-mono text-[10px] uppercase tracking-wide",
              s.className,
            )}
          >
            {s.label}
          </span>
          {stars !== null && stars > 0 && (
            <span className="text-muted-foreground flex items-center gap-1 font-mono text-[11px]">
              <Star className="size-3" />
              {stars}
            </span>
          )}
          <ArrowUpRight className="size-3.5 text-muted-foreground/50 group-hover:text-brand ml-auto transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>
        <p className="text-muted-foreground font-mono text-[11px]">
          {kind}
          {focus && (
            <span className="text-muted-foreground/60"> · {focus}</span>
          )}
        </p>
        <p
          className={cn(
            "text-muted-foreground text-[13px] leading-relaxed",
            wide ? "line-clamp-3" : "line-clamp-2",
          )}
        >
          {project.description}
        </p>
        <div className="mt-2 flex flex-wrap gap-1">
          {project.techstacks.map((tech) => (
            <TechBadge key={tech} name={tech} />
          ))}
        </div>
      </div>
    </a>
  );
}
