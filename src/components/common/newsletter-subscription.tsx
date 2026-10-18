"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

/* Email capture form. Posts to /api/subscribe; the layout around it is up to the caller. */
export default function NewsletterSubscription({ className }: { className?: string }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unable to subscribe. Please try again later.");
      setSuccess(true);
      setEmail("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
        <label className="flex-1">
          <span className="sr-only">Email address</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            disabled={success}
            className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none placeholder:text-muted-foreground focus:ring-1 focus:ring-ring disabled:opacity-60"
          />
        </label>
        <button
          type="submit"
          disabled={loading || success}
          className={cn(
            "flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-md px-4 text-sm font-medium transition-colors disabled:cursor-default",
            success
              ? "border border-brand/40 bg-brand/10 text-brand"
              : "bg-foreground text-background hover:bg-foreground/90"
          )}
        >
          {success ? (
            <>
              <Check className="size-4" /> Subscribed
            </>
          ) : loading ? (
            <>
              <Loader2 className="size-4 animate-spin" /> Subscribing
            </>
          ) : (
            <>
              Subscribe <ArrowRight className="size-4" />
            </>
          )}
        </button>
      </form>
      <p aria-live="polite" className="mt-2 min-h-4 text-xs">
        {error ? (
          <span className="text-destructive">{error}</span>
        ) : success ? (
          <span className="text-muted-foreground">You&apos;re in. Check your inbox to confirm.</span>
        ) : null}
      </p>
    </div>
  );
}
