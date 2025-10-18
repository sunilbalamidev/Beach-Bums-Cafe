"use client";
import { useEffect, useState } from "react";

/**
 * Mobile-friendly TopAnnouncement bar
 * - Non-sticky (sits under fixed Header)
 * - Auto-hides on first scroll
 * - Responsive spacing & font sizes
 */
export default function TopAnnouncement({
  message = "Nepalese Delights — Thursdays 4–7 PM 🌙 Mo:Mo, Chowmein & Curries",
  ctaLabel = "See Specials",
  ctaHref = "#nepalese-delights",
  className = "",
}) {
  const [hidden, setHidden] = useState(false);

  // Hide once user scrolls
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 2) setHidden(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (hidden) return null;

  return (
    <div
      role="status"
      className={[
        "w-full border-b border-black/5 bg-[var(--color-brand-sand,#e8e3da)]",
        "text-[var(--color-brand-ink,#111827)] transition-all duration-300",
        className,
      ].join(" ")}
    >
      <div
        className="mx-auto max-w-6xl px-3 sm:px-4 py-2 sm:py-3 text-center text-[13px] sm:text-sm 
                   flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-3"
      >
        <span className="leading-snug sm:leading-normal break-words sm:whitespace-nowrap">
          {message}
        </span>

        {ctaHref && (
          <a
            href={ctaHref}
            className="inline-block text-[12px] sm:text-sm font-medium 
                       text-[var(--color-brand-teal,#007ba7)] hover:underline
                       underline-offset-4 transition-colors focus-visible:outline-none 
                       focus-visible:ring-2 focus-visible:ring-[var(--color-brand-teal,#007ba7)]/40
                       rounded-md"
          >
            {ctaLabel}
          </a>
        )}
      </div>
    </div>
  );
}
