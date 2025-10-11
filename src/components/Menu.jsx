"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { CATEGORIES } from "@/data/menu";

/* Fallback image for items without a local img */
const LOCAL_FALLBACK =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="360" height="270"><rect width="100%" height="100%" fill="%23f3f4f6"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Inter,ui-sans-serif" font-size="14" fill="%2399a">image coming soon</text></svg>';

const resolveLocal = (v) =>
  typeof v === "string" && v.startsWith("/") ? v : LOCAL_FALLBACK;

/* Small dietary badge */
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

export default function Menu() {
  // Section, placeholder for measurement, and tabs
  const menuRef = useRef(null);
  const headerPlaceholderRef = useRef(null);
  const tabsRef = useRef(null);

  // Active category (scroll-spy)
  const [active, setActive] = useState(CATEGORIES[0]?.slug || "");

  // Heights/offsets
  const [headerH, setHeaderH] = useState(56); // measured header bar height
  const [siteOffset, setSiteOffset] = useState(0); // global site header height (CSS var)
  const [showFixed, setShowFixed] = useState(false); // overlay visibility within Menu

  // Build section refs
  const sections = useMemo(
    () => CATEGORIES.map((c) => ({ slug: c.slug, el: null })),
    []
  );
  const setSectionEl = (slug) => (el) => {
    const i = sections.findIndex((s) => s.slug === slug);
    if (i >= 0) sections[i].el = el;
  };

  // Read --site-header-h and observe header height
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

  const totalOffset = siteOffset + headerH + 12; // used for anchor alignment, clicks, deep links

  // ScrollSpy (viewport-based, aware of the site header offset)
  useEffect(() => {
    const onIntersect = (entries) => {
      const topmost = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (topmost) {
        const id = topmost.target.id;
        setActive((prev) => (prev === id ? prev : id));
      }
    };

    const observer = new IntersectionObserver(onIntersect, {
      root: null,
      rootMargin: `-${siteOffset + 8}px 0px -65% 0px`,
      threshold: 0.01,
    });

    sections.forEach((s) => s.el && observer.observe(s.el));
    return () => observer.disconnect();
  }, [sections, siteOffset]);

  // Deep-link support (#lunch, etc.)
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;
    setTimeout(() => {
      const target = document.getElementById(hash);
      if (!target) return;
      const y =
        window.scrollY + target.getBoundingClientRect().top - totalOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }, 0);
  }, [totalOffset]);

  // Click a tab → smooth page scroll
  const onClickTab = (slug) => (e) => {
    e.preventDefault();
    const target = sections.find((s) => s.slug === slug)?.el;
    if (!target) return;
    const y = window.scrollY + target.getBoundingClientRect().top - totalOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
    history.replaceState(null, "", `#${slug}`);
  };

  // Keep the active pill visible (mobile)
  useEffect(() => {
    const ul = tabsRef.current;
    if (!ul) return;
    const a = ul.querySelector(`a[data-tab="${active}"]`);
    if (!a) return;
    const left = Math.max(0, a.parentElement.offsetLeft - 16);
    ul.scrollTo({ left, behavior: "smooth" });
  }, [active]);

  // Robust "fixed overlay while in Menu" — avoids sticky bugs entirely
  useEffect(() => {
    const onScroll = () => {
      const root = menuRef.current;
      if (!root) return;

      const rect = root.getBoundingClientRect();
      // We want the header fixed whenever Menu is "in play":
      // (top has reached/passed site header) AND (bottom still below the header area)
      const entered = rect.top <= siteOffset;
      const hasRoom = rect.bottom > siteOffset + 1; // +1 avoids edge flicker on exact alignment
      setShowFixed(entered && hasRoom);
    };

    onScroll(); // run once
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [siteOffset]);

  // Shared header content
  const HeaderContent = ({ className = "" }) => (
    <div className={`w-full max-w-6xl mx-auto px-4 md:px-8 ${className}`}>
      <ul
        ref={tabsRef}
        data-menu-tabs
        className="flex items-center gap-3 overflow-x-auto whitespace-nowrap px-1 py-3
                   [touch-action:pan-x] [overscroll-behavior-inline:contain] [scroll-snap-type:x_proximity]"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {CATEGORIES.map((c) => {
          const isActive = active === c.slug;
          return (
            <li key={c.slug} className="shrink-0 [scroll-snap-align:start]">
              <a
                data-tab={c.slug}
                href={`#${c.slug}`}
                onClick={onClickTab(c.slug)}
                aria-current={isActive ? "true" : undefined}
                className={`inline-flex items-center rounded-full border px-3 py-1.5 text-sm font-medium transition-colors
                  ${
                    isActive
                      ? "border-[var(--color-brand-teal,#007ba7)] text-[var(--color-brand-teal,#007ba7)] bg-white"
                      : "border-black/10 text-black/70 hover:text-black bg-white"
                  } focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-brand-teal,#007ba7)]`}
              >
                {c.title}
              </a>
            </li>
          );
        })}
        <li aria-hidden className="w-4 shrink-0" />
      </ul>
    </div>
  );

  return (
    <section
      id="menu"
      ref={menuRef}
      className="py-12 md:py-20 bg-[var(--color-brand-bg,#f8f5f0)] border-t border-black/10 overflow-x-hidden"
    >
      {/* Title block */}
      <div className="w-full max-w-6xl mx-auto px-4 md:px-8">
        <h1 className="text-2xl md:text-3xl font-semibold mb-6 text-[var(--color-brand-teal,#007ba7)]">
          Our Menu
        </h1>
      </div>

      {/* Header placeholder in flow (prevents layout jump). We show its content until the fixed overlay engages. */}
      <div
        ref={headerPlaceholderRef}
        className="border-b border-black/10"
        style={{ background: "rgba(248,245,240,0.95)" }}
      >
        {/* When overlay is visible, hide the in-flow content to avoid double header */}
        <HeaderContent className={showFixed ? "invisible" : ""} />
      </div>

      {/* Fixed overlay header (only while the Menu section is in view) */}
      {showFixed && (
        <div
          className="fixed inset-x-0 z-40 border-b border-black/10 backdrop-blur-sm"
          style={{
            top: "calc(var(--site-header-h) + env(safe-area-inset-top, 0px))",
            background: "rgba(248,245,240,0.95)",
          }}
          aria-label="Menu categories"
        >
          <HeaderContent />
        </div>
      )}

      {/* Content — single page scroll; header overlay releases at section end */}
      <div className="w-full max-w-6xl mx-auto px-4 md:px-8">
        {CATEGORIES.map((cat) => (
          <section
            id={cat.slug}
            key={cat.slug}
            ref={setSectionEl(cat.slug)}
            style={{ scrollMarginTop: totalOffset }}
            className="py-8 border-t border-black/5"
          >
            <h2 className="text-xl font-semibold mb-4 text-[var(--color-brand-teal,#007ba7)]">
              {cat.title}
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:[grid-template-columns:repeat(auto-fit,minmax(300px,1fr))]">
              {cat.items.map((it) => (
                <article
                  key={`${cat.slug}-${it.name}`}
                  className="min-w-0 border border-black/10 rounded-2xl bg-white p-3 grid grid-cols-[minmax(0,1fr)_88px] sm:grid-cols-[minmax(0,1fr)_116px] items-center gap-3 hover:shadow-sm transition-shadow"
                >
                  {/* Text */}
                  <div className="min-w-0">
                    <div className="font-medium text-[15px] text-[var(--color-brand-ink,#000)] truncate">
                      {it.name}
                    </div>
                    <div className="mt-1 flex items-center gap-2 flex-wrap">
                      <div className="text-xs text-black/60">{it.price}</div>
                      {Array.isArray(it.badges) &&
                        it.badges.map((b) => <Badge key={b} label={b} />)}
                    </div>
                    {it.note && (
                      <p className="mt-1.5 text-[13px] leading-snug text-black/70 line-clamp-2">
                        {it.note}
                      </p>
                    )}
                  </div>

                  {/* Image */}
                  <div className="w-[88px] h-[66px] sm:w-[116px] sm:h-[84px] rounded-xl overflow-hidden bg-[var(--color-brand-sand,#e8e3da)]/50 flex items-center justify-center select-none">
                    <img
                      src={resolveLocal(it.img)}
                      alt={it.name}
                      loading="lazy"
                      width={116}
                      height={84}
                      className="block w-full h-full object-contain pointer-events-none"
                      draggable={false}
                    />
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
