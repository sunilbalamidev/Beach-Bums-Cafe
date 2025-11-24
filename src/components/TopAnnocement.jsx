"use client";
import React from "react";
export default function TopAnnouncement({
  message = "Nepalese Delights — Thursdays 4–7 PM 🌙 Mo:Mo, Chowmein & Curries",
  ctaLabel = "See Specials",
  ctaHref = "#nepalese-delights",
  className = "",
}) {
  return (
    <div
      role="status"
      className={[
        "w-full border-b border-black/5 bg-[var(--color-brand-sand,#e8e3da)]",
        "text-[var(--color-brand-ink,#111827)]",
        className,
      ].join(" ")}
    >
      <div
        className="
          mx-auto max-w-6xl px-3 sm:px-4 py-2 sm:py-3 
          text-center text-[13px] sm:text-sm 
          flex flex-col sm:flex-row items-center justify-center 
          gap-1 sm:gap-3
        "
      >
        {/* Text */}
        <span className="leading-snug sm:leading-normal break-words sm:whitespace-nowrap">
          {message}
        </span>

        {/* CTA */}
        {ctaHref && (
          <a
            href={ctaHref}
            className="
              inline-block text-[12px] sm:text-sm font-medium 
              text-[var(--color-brand-teal,#007ba7)] hover:underline 
              underline-offset-4 transition-colors 
              focus-visible:outline-none focus-visible:ring-2 
              focus-visible:ring-[var(--color-brand-teal,#007ba7)]/40
              rounded-md
            "
          >
            {ctaLabel}
          </a>
        )}
      </div>
    </div>
  );
}
