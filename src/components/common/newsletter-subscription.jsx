"use client";

import { CalendarHeart, CalendarPlus, ArrowUpRight } from "lucide-react";
import { useState } from "react";

export default function NewsletterSubscription() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e) {
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
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="space-y-4">
      <h2 className="font-serif text-xl font-medium italic leading-snug text-primary">
        stay updated.
      </h2>
      <div className="prose max-w-full text-sm font-normal leading-6 text-muted-foreground dark:prose-invert">
        <p>
          It&apos;s{" "}
          <span className="font-medium text-green-600">free!</span> Get
          notified instantly whenever a new post drops. Stay updated, stay
          ahead.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="flex-1 rounded-xs border border-border bg-background px-3 py-2 text-sm transition-colors focus:outline-hidden focus:ring-1 focus:ring-primary"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className={`inline-flex items-center justify-center gap-1.5 rounded-xs px-4 py-2 text-sm font-medium transition-all duration-300 ${
            success
              ? "bg-green-50 text-green-600 dark:bg-green-950/30"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          }`}
        >
          {success ? (
            <>
              <CalendarHeart size={14} />
              subscribed!
            </>
          ) : loading ? (
            <>
              <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent"></div>
              subscribing...
            </>
          ) : (
            <>
              <CalendarPlus size={14} />
              subscribe
              <ArrowUpRight size={12} />
            </>
          )}
        </button>
      </form>
      {(error || success) && (
        <p className="text-xs">
          {error ? (
            <span className="text-destructive">{error}</span>
          ) : (
            <span className="text-green-600">
              You&apos;re all set! Check your inbox for confirmation.
            </span>
          )}
        </p>
      )}
    </section>
  );
}
