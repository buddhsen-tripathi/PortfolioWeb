"use client";

import { useState } from "react";
import { ArrowUpRight, CalendarDays, Check, Copy, FileText, Mail } from "lucide-react";
import { toast } from "sonner";
import { copyText } from "@/lib/copy";
import { vibrateLight } from "@/lib/haptics";
import { siteConfig } from "@/site.config";
import Section from "@/components/site/section";

const cell =
  "group relative flex items-center gap-3 border-b border-dashed border-border px-6 py-3.5 text-left outline-none focus-visible:bg-muted/30 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0";
const iconBox =
  "relative flex size-8 shrink-0 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition-colors group-hover:text-foreground";
const hatch =
  "hatch pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const { email, calUrl, resumeUrl } = siteConfig.contact;

  const copyEmail = async () => {
    vibrateLight();
    if (!(await copyText(email))) {
      // Nothing could reach the clipboard; open the mail client instead.
      window.location.href = `mailto:${email}`;
      return;
    }
    toast.success("Email copied", { description: email });
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <Section id="contact" title="Get in touch">
      <p className="px-6 pb-4 pt-5 text-[15px] leading-relaxed text-muted-foreground">
        Working on something interesting, hiring, or putting a hackathon team together? I&apos;m
        happy to talk.
      </p>
      <div className="grid border-t border-dashed border-border sm:grid-cols-3">
        <a href={calUrl} target="_blank" rel="noopener noreferrer" className={cell}>
          <span className={hatch} />
          <span className={iconBox}>
            <CalendarDays className="size-4" />
          </span>
          <span className="relative text-sm font-medium">Book a call</span>
          <ArrowUpRight className="relative ml-auto size-3.5 text-muted-foreground/50 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" />
        </a>

        <button type="button" onClick={copyEmail} className={cell}>
          <span className={hatch} />
          <span className={iconBox}>
            <Mail className="size-4" />
          </span>
          <span className="relative text-sm font-medium" aria-live="polite">
            {copied ? "Copied" : "Email"}
          </span>
          {copied ? (
            <Check className="relative ml-auto size-3.5 text-brand" />
          ) : (
            <Copy className="relative ml-auto size-3.5 text-muted-foreground/50 transition-colors group-hover:text-foreground" />
          )}
        </button>

        <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className={cell}>
          <span className={hatch} />
          <span className={iconBox}>
            <FileText className="size-4" />
          </span>
          <span className="relative text-sm font-medium">Resume</span>
          <ArrowUpRight className="relative ml-auto size-3.5 text-muted-foreground/50 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" />
        </a>
      </div>
    </Section>
  );
}
