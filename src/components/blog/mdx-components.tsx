import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/site.config";
import { MdxCodeBlock } from "@/components/blog/code-block";

const generateId = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();

const createHeading = (level: number) => {
  const Heading = ({ children, id, ...props }: any) => {
    const text = typeof children === "string" ? children : "";
    const headingId = id || generateId(text);
    const Tag = `h${level}` as any;

    const sizeClass =
      level === 1
        ? "text-2xl mt-12 mb-4"
        : level === 2
        ? "text-xl mt-12 mb-4"
        : level === 3
        ? "text-[17px] mt-8 mb-3"
        : level === 4
        ? "text-base mt-6 mb-2"
        : "text-sm mt-4 mb-1";

    return (
      <Tag
        id={headingId}
        className={`group relative scroll-mt-16 font-semibold tracking-tight text-foreground ${sizeClass}`}
        {...props}
      >
        {children}
        <a
          href={`#${headingId}`}
          aria-label={`Link to ${text}`}
          className="absolute -left-4 top-0 font-mono text-sm font-normal text-muted-foreground/60 opacity-0 transition-opacity hover:text-brand group-hover:opacity-100"
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
  p: ({ children, ...props }: any) => (
    <p
      className="mb-5 text-[16px] leading-[1.8] text-foreground/80"
      {...props}
    >
      {children}
    </p>
  ),
  ul: ({ children, ...props }: any) => (
    <ul
      className="mb-5 list-disc space-y-1.5 pl-5 marker:text-muted-foreground/50"
      {...props}
    >
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: any) => (
    <ol
      className="mb-5 list-decimal space-y-1.5 pl-5 marker:font-mono marker:text-[13px] marker:text-muted-foreground/60"
      {...props}
    >
      {children}
    </ol>
  ),
  li: ({ children, ...props }: any) => (
    <li
      className="pl-1 text-[16px] leading-[1.75] text-foreground/80"
      {...props}
    >
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }: any) => (
    <blockquote
      className="my-6 border-l-2 border-brand/60 pl-4 text-[16px] italic leading-relaxed text-foreground/80 [&_p]:mb-0"
      {...props}
    >
      {children}
    </blockquote>
  ),
  a: ({ href, children, ...props }: any) => {
    const isExternal = href?.startsWith("http");
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-0.5 font-medium text-foreground underline decoration-foreground/30 underline-offset-[3px] transition-colors hover:decoration-brand"
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
        className="font-medium text-foreground underline decoration-foreground/30 underline-offset-[3px] transition-colors hover:decoration-brand"
        {...props}
      >
        {children}
      </Link>
    );
  },
  code: ({ children, className, ...props }: any) => {
    const isInline = !className;
    if (isInline) {
      return (
        <code
          className="rounded border border-border bg-muted/50 px-1.5 py-0.5 font-mono text-[0.85em] text-foreground"
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
  pre: MdxCodeBlock,
  img: ({ src, alt, ...props }: any) => {
    const resolved =
      typeof src === "string" && src.startsWith("/blog-images/")
        ? `${siteConfig.assetsUrl}${src}`
        : src;
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={resolved}
        alt={alt || ""}
        loading="lazy"
        className="my-8 h-auto max-w-full rounded-lg border border-border"
        {...props}
      />
    );
  },
  hr: (props: any) => (
    <hr
      className="my-10 border-t border-dashed border-border"
      {...props}
    />
  ),
  table: ({ children, ...props }: any) => (
    <div className="my-8 overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm" {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }: any) => (
    <thead className="bg-muted/40" {...props}>
      {children}
    </thead>
  ),
  tbody: ({ children, ...props }: any) => (
    <tbody className="divide-y divide-dashed divide-border" {...props}>
      {children}
    </tbody>
  ),
  tr: ({ children, ...props }: any) => <tr {...props}>{children}</tr>,
  th: ({ children, ...props }: any) => (
    <th
      className="px-4 py-2.5 text-left font-mono text-[11px] font-medium uppercase tracking-wider text-muted-foreground"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }: any) => (
    <td
      className="px-4 py-2.5 text-[14px] text-foreground/80"
      {...props}
    >
      {children}
    </td>
  ),
  strong: ({ children, ...props }: any) => (
    <strong className="font-semibold text-foreground" {...props}>
      {children}
    </strong>
  ),
  em: ({ children, ...props }: any) => (
    <em className="italic" {...props}>
      {children}
    </em>
  ),
};
