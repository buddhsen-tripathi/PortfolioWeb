"use client";

import { CalendarHeart, CalendarPlus, Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

type NewsletterSubscriptionProps = {
  variant?: "compact" | "featured";
};

export default function NewsletterSubscription({
  variant = "compact",
}: NewsletterSubscriptionProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(
          data.error || "Unable to subscribe. Please try again later."
        );
      }
      setSuccess(true);
      setEmail("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  const isFeatured = variant === "featured";

  return (
    <section
      className={
        isFeatured
          ? "relative overflow-hidden rounded-md border border-black/10 bg-black/2 p-5 dark:border-white/10 dark:bg-white/3 md:p-8"
          : "space-y-4 rounded-md border border-black/8 p-4 dark:border-white/8 md:p-6"
      }
    >
      {isFeatured && (
        <>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-foreground/30 to-transparent" />
        </>
      )}

      <p
        className={
          isFeatured
            ? "mb-5 max-w-xl font-space-mono text-sm leading-relaxed text-muted-foreground md:text-base"
            : "font-space-mono text-sm leading-relaxed text-muted-foreground md:text-base"
        }
      >
        Get notified when a new post drops. It&apos;s free, no spam.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="h-[40px] w-full flex-1 rounded-xs border border-black/8 bg-transparent px-3 py-2.5 font-space-mono text-sm leading-none text-foreground placeholder:text-muted-foreground focus:outline-hidden focus:ring-1 focus:ring-foreground/40 dark:border-white/8 sm:h-9 sm:py-0"
          required
        />
        <Button
          type="submit"
          disabled={loading || success}
          variant={success ? "outline" : "neutral"}
          size="sm"
          className="h-10 shrink-0 gap-1.5 sm:h-9"
        >
          {success ? (
            <>
              <CalendarHeart className="h-3.5 w-3.5" />
              subscribed
            </>
          ) : loading ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              subscribing
            </>
          ) : (
            <>
              <CalendarPlus className="h-3.5 w-3.5" />
              subscribe
            </>
          )}
        </Button>
      </form>

      {(error || success) && (
        <p className="font-space-mono text-xs">
          {error ? (
            <span className="text-destructive">{error}</span>
          ) : (
            <span className="text-muted-foreground">
              You&apos;re all set. Check your inbox for confirmation.
            </span>
          )}
        </p>
      )}
    </section>
  );
}
