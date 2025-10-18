"use client";
import { useEffect, useRef, useState } from "react";
import { NEPALESE_DELIGHTS as DATA } from "@/data/nepaleseDelights";

/* ——— Match your main Menu badge style ——— */
const Badge = ({ label }) => {
  const map = {
    V: "bg-amber-100 text-amber-800 border-amber-200",
    VG: "bg-green-100 text-green-800 border-green-200",
    GF: "bg-teal-100 text-teal-800 border-teal-200",
  };
  const cls = map[label] || "bg-gray-100 text-gray-700 border-gray-200";
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium ${cls}`}
    >
      {label}
    </span>
  );
};

// Convert human tags to your compact badges (Veg->V, Vegan->VG, GF->GF)
const toBadge = (t) => {
  const s = String(t).trim().toLowerCase();
  if (s === "veg") return "V";
  if (s === "vegan") return "VG";
  if (s === "gf" || s === "gluten free" || s === "gluten-free") return "GF";
  return t.toUpperCase();
};

export default function NepaleseDelights() {
  const sectionRef = useRef(null);
  const headerPlaceholderRef = useRef(null);

  // heights/offsets
  const [siteOffset, setSiteOffset] = useState(0); // --site-header-h from your fixed header
  const [headerH, setHeaderH] = useState(56); // measured local header height
  const [showFixed, setShowFixed] = useState(false);

  // read CSS var --site-header-h and observe local placeholder height
  useEffect(() => {
    const raw =
      getComputedStyle(document.documentElement).getPropertyValue(
        "--site-header-h"
      ) || "0";
    const parsed = parseInt(raw, 10);
    setSiteOffset(Number.isFinite(parsed) ? parsed : 0);

    const ro = new ResizeObserver(() => {
      setHeaderH(headerPlaceholderRef.current?.offsetHeight || 56);
    });
    if (headerPlaceholderRef.current) ro.observe(headerPlaceholderRef.current);
    return () => ro.disconnect();
  }, []);

  // toggle fixed overlay while the section is "in play"
  useEffect(() => {
    const onScroll = () => {
      const root = sectionRef.current;
      if (!root) return;
      const rect = root.getBoundingClientRect();
      const entered = rect.top <= siteOffset;
      const hasRoom = rect.bottom > siteOffset + 1;
      setShowFixed(entered && hasRoom);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [siteOffset]);

  // shared header content (title + subtitle)
  const HeaderContent = ({ className = "" }) => (
    <div className={`w-full max-w-6xl mx-auto px-4 md:px-8 ${className}`}>
      <div className="py-2">
        <h2 className="text-3xl md:text-4xl font-semibold font-sans text-[var(--color-brand-teal,#007ba7)]">
          Nepalese Delights
        </h2>
        <p className="text-sm md:text-base text-[var(--color-brand-ink,#111827)]/70 mt-1">
          Thursdays · 4–7 PM — Authentic Nepali comfort food
        </p>
        <div className="mx-auto mt-3 h-px w-20 bg-[var(--color-brand-ink,#111827)]/10" />
      </div>
    </div>
  );

  const totalScrollMargin = siteOffset + headerH + 12; // align anchors consistently (if you ever link here)

  return (
    <section
      id="nepalese-delights"
      ref={sectionRef}
      className="py-12 md:py-16 bg-[var(--color-brand-bg,#f8f5f0)] border-t border-black/10"
    >
      {/* In-flow placeholder header (like Menu’s). Hidden when overlay is on to avoid double header */}
      <div
        ref={headerPlaceholderRef}
        style={{ background: "rgba(248,245,240,0.95)" }}
      >
        <HeaderContent className={showFixed ? "invisible" : ""} />
      </div>

      {/* Fixed overlay header (same pattern + z-30 to sit below your site header z-[100]) */}
      {showFixed && (
        <div
          className="fixed inset-x-0 z-30 border-b border-black/10 backdrop-blur-sm shadow-sm"
          style={{
            top: "calc(var(--site-header-h, 64px) + env(safe-area-inset-top, 0px))",
            background: "rgba(248,245,240,0.95)",
          }}
          aria-label="Nepalese Delights heading"
        >
          <HeaderContent />
        </div>
      )}

      {/* Items grid — match your main menu card style */}
      <div className="w-full max-w-6xl mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-2 gap-8">
          {DATA.items.map((it) => (
            <article
              key={it.name}
              className="rounded-2xl bg-white/80 backdrop-blur-sm border border-black/10 shadow-sm hover:shadow-md transition-shadow"
              style={{ scrollMarginTop: totalScrollMargin }}
            >
              <div className="p-5 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold font-sans leading-tight">
                    {it.name}
                  </h3>
                  <span className="text-sm font-medium whitespace-nowrap">
                    {it.price}
                  </span>
                </div>

                <p className="text-sm opacity-80 leading-relaxed">{it.desc}</p>

                {Array.isArray(it.tags) && it.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {it.tags.map((t) => (
                      <Badge key={t} label={toBadge(t)} />
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        <p className="text-center text-xs md:text-sm italic opacity-70 mt-10">
          Don’t forget to check our weekly specials for Nepalese nights — you
          might be in for a surprise!
        </p>
      </div>
    </section>
  );
}
