import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const generateId = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();

const createHeading = (level) => {
  const Heading = ({ children, id, ...props }) => {
    const text = typeof children === "string" ? children : "";
    const headingId = id || generateId(text);
    const Tag = `h${level}`;

    const sizeClass =
      level === 1
        ? "text-2xl md:text-3xl mt-8 mb-4"
        : level === 2
        ? "text-xl md:text-2xl mt-8 mb-3"
        : level === 3
        ? "text-lg md:text-xl mt-6 mb-2"
        : level === 4
        ? "text-base mt-4 mb-2"
        : "text-sm mt-3 mb-1";

    return (
      <Tag
        id={headingId}
        className={`font-doto scroll-mt-24 font-medium text-foreground group relative ${sizeClass}`}
        {...props}
      >
        {children}
        <a
          href={`#${headingId}`}
          aria-label={`Link to ${text}`}
          className="absolute -left-5 top-0 text-sm text-muted-foreground opacity-0 transition-opacity hover:text-foreground group-hover:opacity-100"
        >
          #
        </a>
      </Tag>
    );
  };
  Heading.displayName = `Heading${level}`;
  return Heading;
};

export const mdxComponents = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  p: ({ children, ...props }) => (
    <p
      className="mb-4 font-space-mono text-sm leading-relaxed text-muted-foreground md:text-base"
      {...props}
    >
      {children}
    </p>
  ),
  ul: ({ children, ...props }) => (
    <ul
      className="mb-4 list-disc space-y-1 pl-5 marker:text-muted-foreground/50"
      {...props}
    >
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol
      className="mb-4 list-decimal space-y-1 pl-5 marker:text-muted-foreground/50"
      {...props}
    >
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li
      className="pl-1 font-space-mono text-sm leading-relaxed text-muted-foreground md:text-base"
      {...props}
    >
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="my-4 border-l-2 border-foreground/20 pl-4 font-space-mono text-sm italic text-muted-foreground md:text-base"
      {...props}
    >
      {children}
    </blockquote>
  ),
  a: ({ href, children, ...props }) => {
    const isExternal = href?.startsWith("http");
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-0.5 font-medium text-foreground underline underline-offset-[3px] decoration-foreground/30 transition-colors hover:decoration-foreground"
          {...props}
        >
          {children}
          <ArrowUpRight className="h-3 w-3" />
        </a>
      );
    }
    return (
      <Link
        href={href || "#"}
        className="font-medium text-foreground underline underline-offset-[3px] decoration-foreground/30 transition-colors hover:decoration-foreground"
        {...props}
      >
        {children}
      </Link>
    );
  },
  code: ({ children, className, ...props }) => {
    const isInline = !className;
    if (isInline) {
      return (
        <code
          className="rounded border border-black/[0.08] bg-black/[0.04] px-1.5 py-0.5 font-mono text-xs text-foreground dark:border-white/[0.08] dark:bg-white/[0.05]"
          {...props}
        >
          {children}
        </code>
      );
    }
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
  pre: ({ children, ...props }) => (
    <pre
      className="my-4 overflow-x-auto rounded-md border border-black/[0.08] bg-zinc-950 p-4 font-mono text-xs text-zinc-100 dark:border-white/[0.08] md:text-sm [&_code]:bg-transparent [&_code]:text-zinc-100"
      {...props}
    >
      {children}
    </pre>
  ),
  img: ({ src, alt, ...props }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt || ""}
      loading="lazy"
      className="my-6 h-auto max-w-full rounded-md border border-black/[0.08] dark:border-white/[0.08]"
      {...props}
    />
  ),
  hr: (props) => (
    <hr
      className="my-6 border-t border-black/[0.08] dark:border-white/[0.08]"
      {...props}
    />
  ),
  table: ({ children, ...props }) => (
    <div className="my-6 overflow-x-auto rounded-md border border-black/[0.08] dark:border-white/[0.08]">
      <table className="w-full text-sm" {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }) => (
    <thead className="bg-black/[0.03] dark:bg-white/[0.04]" {...props}>
      {children}
    </thead>
  ),
  tbody: ({ children, ...props }) => (
    <tbody className="divide-y divide-black/[0.06] dark:divide-white/[0.06]" {...props}>
      {children}
    </tbody>
  ),
  tr: ({ children, ...props }) => <tr {...props}>{children}</tr>,
  th: ({ children, ...props }) => (
    <th
      className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-foreground"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td
      className="px-4 py-3 font-space-mono text-sm text-muted-foreground"
      {...props}
    >
      {children}
    </td>
  ),
  strong: ({ children, ...props }) => (
    <strong className="font-semibold text-foreground" {...props}>
      {children}
    </strong>
  ),
  em: ({ children, ...props }) => (
    <em className="italic" {...props}>
      {children}
    </em>
  ),
};
