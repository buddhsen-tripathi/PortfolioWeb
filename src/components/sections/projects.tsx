"use client";

import React, { useState } from "react";
import Image from "next/image";

import { TechBadge } from "@/lib/tech-icons";
import { motion, AnimatePresence } from "motion/react";
import { TaptickitIllustration } from "@/components/illustrations/taptickit-illustration";
import { Star } from "lucide-react";


const projectIllustrations: Record<string, React.ComponentType<{ isCardHovered?: boolean }>> = {
  taptickit: TaptickitIllustration,
};

const corners = [
  { position: "top-[-3px] left-[-3px]", border: "border-t border-l" },
  { position: "top-[-3px] right-[-3px]", border: "border-t border-r" },
  { position: "bottom-[-3px] left-[-3px]", border: "border-b border-l" },
  { position: "bottom-[-3px] right-[-3px]", border: "border-b border-r" },
];

const flickerKeyframes = {
  opacity: [0, 1, 0.3, 1, 0.6, 1],
};

const previewSizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";

interface ProjectsProps {
  category?: string;
  title?: string;
  description?: string;
  techstacks: string[];
  status?: string;
  link?: string;
  github?: string;
  preview?: string;
  previewDark?: string;
  illustration?: string;
  stars?: number | null;
  index?: number;
}

const Projects = ({
  category,
  title,
  description,
  techstacks,
  status,
  link,
  github,
  preview,
  previewDark,
  illustration,
  stars,
  index = 0,
}: ProjectsProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const Illustration = illustration ? projectIllustrations[illustration] : null;
  const href = stars !== null && stars !== undefined && github
    ? `https://github.com/${github}`
    : link;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex min-w-0 flex-col border border-black/6 bg-black/2 transition-colors hover:bg-black/4 dark:border-white/6 dark:bg-white/3 dark:hover:bg-white/5"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <AnimatePresence>
        {isHovered && (
          <>
            <motion.span
              className="pointer-events-none absolute inset-[-3px] border border-dashed border-black/50 dark:border-white/50"
              initial={{ opacity: 0 }}
              animate={flickerKeyframes}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
            {corners.map(({ position, border }) => (
              <motion.span
                key={position}
                className={`pointer-events-none absolute ${position} h-[6px] w-[6px] ${border} border-black dark:border-white`}
                initial={{ opacity: 0 }}
                animate={flickerKeyframes}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {(preview || Illustration) && (
        <div>
          <div
            className={`border-b border-black/6 dark:border-white/6 ${Illustration ? "relative aspect-8/5 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-950" : "relative aspect-8/5 w-full overflow-hidden bg-white dark:bg-black"}`}
          >
            {Illustration ? (
              <div
                className={`absolute inset-0 flex items-center justify-center transition-[filter] duration-500 ${isHovered ? "md:grayscale-0" : "md:grayscale"}`}
              >
                <Illustration isCardHovered={isHovered} />
              </div>
            ) : previewDark ? (
              <>
                <Image
                  src={preview}
                  alt={`${title} preview`}
                  fill
                  sizes={previewSizes}
                  loading="eager"
                  className={`object-cover transition-[filter] duration-500 dark:hidden ${isHovered ? "md:grayscale-0" : "md:grayscale"}`}
                />
                <Image
                  src={previewDark}
                  alt={`${title} preview`}
                  fill
                  sizes={previewSizes}
                  loading="eager"
                  className={`hidden object-cover transition-[filter] duration-500 dark:block ${isHovered ? "md:grayscale-0" : "md:grayscale"}`}
                />
              </>
            ) : (
              <Image
                src={preview}
                alt={`${title} preview`}
                fill
                sizes={previewSizes}
                loading="eager"
                className={`object-cover transition-[filter] duration-500 ${isHovered ? "md:grayscale-0" : "md:grayscale"}`}
              />
            )}
          </div>
        </div>
      )}

      <div className="flex flex-1 flex-col p-3 md:p-4">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-[10px] font-medium text-muted-foreground md:text-[11px]">{category}</p>
          <div className="flex items-center gap-2">
            {stars !== null && stars !== undefined && (
              <span className={`flex items-center gap-0.5 text-[10px] font-medium text-muted-foreground transition-colors duration-300 md:text-xs ${isHovered ? "text-yellow-500" : ""}`}>
                <Star size={"12px"} className={isHovered ? "fill-yellow-500" : "fill-muted-foreground"} />
                {stars}
              </span>
            )}
          </div>
        </div>

        <h1 className="mb-1.5 text-sm font-semibold md:text-base">{title}</h1>
        <p className="mb-3 font-space-mono text-[11px] leading-snug text-muted-foreground md:text-xs">
          {description}
        </p>

        <div className="mt-auto flex flex-wrap gap-1.5">
          {techstacks.map((tech, index) => (
            <TechBadge key={index} name={tech} />
          ))}
        </div>
      </div>
    </motion.a>
  );
};

export default Projects;
