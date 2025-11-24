"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { CATEGORIES } from "@/data/menu";
import ExtrasList from "./ExtraList";
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

/* ---------- Modal (overlay) ---------- */
function MenuModal({ item, onClose }) {
  const dialogRef = useRef(null);

  // Close on ESC
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Focus & lock scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setTimeout(
      () => dialogRef.current?.querySelector("[data-close]")?.focus(),
      0
    );
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center sm:items-center items-start"
      role="dialog"
      aria-modal="true"
      aria-label={`${item.name} details`}
      /* keep the modal centered but not under the sticky header */
      style={{
        paddingTop:
          "calc(var(--site-header-h,0px) + env(safe-area-inset-top,0px) + 12px)",
        paddingBottom: "24px",
      }}
      onClick={(e) => {
        // backdrop click closes (ignore clicks inside the panel)
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />

      {/* Panel */}
      <div
        ref={dialogRef}
        className="
          relative z-10 rounded-2xl bg-white shadow-2xl border border-black/10 overflow-hidden
          w-[min(96vw,880px)]   /* wider than before */
          max-h-[min(88vh,1000px)] overflow-y-auto
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-black/10 bg-[var(--color-brand-bg,#f8f5f0)] sticky top-0">
          <h3 className="text-lg sm:text-xl font-semibold text-[var(--color-brand-teal,#007ba7)] truncate">
            {item.name}
          </h3>
          <button
            data-close
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-full border border-black/10 px-2.5 py-1 text-sm font-medium hover:bg-black/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-brand-teal,#007ba7)]"
          >
            Close
          </button>
        </div>

        {/* Content */}
        <div className="p-5 grid gap-5 sm:grid-cols-[1fr_280px]">
          {" "}
          {/* bigger image column */}
          {/* Text */}
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              {item.price && (
                <span className="inline-flex items-center rounded-full border border-black/10 bg-[var(--color-brand-sand,#e8e3da)]/60 px-2.5 py-0.5 text-sm font-medium text-black/80">
                  {item.price}
                </span>
              )}
              {Array.isArray(item.badges) &&
                item.badges.map((b) => <Badge key={b} label={b} />)}
            </div>

            {item.note && (
              <p className="mt-3 text-[15px] leading-relaxed text-black/80">
                {item.note}
              </p>
            )}
          </div>
          {/* Image */}
          <div className="rounded-xl overflow-hidden bg-[var(--color-brand-sand,#e8e3da)]/50 flex items-center justify-center">
            <img
              src={resolveLocal(item.img)}
              alt={item.name}
              loading="eager"
              width="800"
              height="600"
              className="block w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-black/10 flex items-center justify-end gap-2 sticky bottom-0 bg-white/90 backdrop-blur">
          <button
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-full border border-black/10 px-3 py-1.5 text-sm font-medium hover:bg-black/5"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Menu() {
  const menuRef = useRef(null);
  const headerPlaceholderRef = useRef(null);
  const tabsRef = useRef(null);

  const [active, setActive] = useState(CATEGORIES[0]?.slug || "");
  const [headerH, setHeaderH] = useState(56);
  const [siteOffset, setSiteOffset] = useState(0);
  const [showFixed, setShowFixed] = useState(false);
  const [visibleCats, setVisibleCats] = useState([]);
  const [openItem, setOpenItem] = useState(null); // 👈 modal state

  // Section refs
  const sections = useMemo(
    () => CATEGORIES.map((c) => ({ slug: c.slug, el: null })),
    []
  );
  const setSectionEl = (slug) => (el) => {
    const i = sections.findIndex((s) => s.slug === slug);
    if (i >= 0) sections[i].el = el;
  };

  // Measure header heights and --site-header-h
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

  const totalOffset = siteOffset + headerH + 12;

  /* ScrollSpy (throttled) */
  useEffect(() => {
    let raf;
    const onIntersect = (entries) => {
      const topmost = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (topmost) {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          const id = topmost.target.id;
          setActive((prev) => (prev === id ? prev : id));
        });
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

  /* Lazy-render categories */
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleCats((prev) =>
              prev.includes(entry.target.id) ? prev : [...prev, entry.target.id]
            );
          }
        });
      },
      { rootMargin: "200px 0px" }
    );
    sections.forEach((s) => s.el && obs.observe(s.el));
    return () => obs.disconnect();
  }, [sections]);

  /* Deep-link (#breakfast etc.) */
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

  const onClickTab = (slug) => (e) => {
    e.preventDefault();
    const target = sections.find((s) => s.slug === slug)?.el;
    if (!target) return;
    const y = window.scrollY + target.getBoundingClientRect().top - totalOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
    history.replaceState(null, "", `#${slug}`);
  };

  /* Keep active pill visible */
  useEffect(() => {
    const ul = tabsRef.current;
    if (!ul) return;
    const a = ul.querySelector(`a[data-tab="${active}"]`);
    if (!a) return;
    const left = Math.max(0, a.parentElement.offsetLeft - 16);
    ul.scrollTo({ left, behavior: "smooth" });
  }, [active]);

  /* Fixed overlay visibility */
  useEffect(() => {
    const onScroll = () => {
      const root = menuRef.current;
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

  /* Header content reused */
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
      {/* Title */}
      <div className="w-full max-w-6xl mx-auto px-4 md:px-8">
        <h1 className="text-2xl md:text-3xl font-semibold mb-6 text-[var(--color-brand-teal,#007ba7)]">
          Our Menu
        </h1>
      </div>

      {/* Header placeholder */}
      <div
        ref={headerPlaceholderRef}
        className="border-b border-black/10"
        style={{ background: "rgba(248,245,240,0.95)" }}
      >
        <HeaderContent className={showFixed ? "invisible" : ""} />
      </div>

      {/* Fixed overlay */}
      {showFixed && (
        <div
          className="fixed inset-x-0 z-40 border-b border-black/10 backdrop-blur-sm"
          style={{
            top: "calc(var(--site-header-h) + env(safe-area-inset-top, 0px))",
            background: "rgba(248,245,240,0.95)",
          }}
        >
          <HeaderContent />
        </div>
      )}

      {/* Content */}
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
            {cat.subtitle && (
              <p className="mt-1 mb-3 text-sm text-black/60">{cat.subtitle}</p>
            )}

            {/* Render only when visible */}
            {visibleCats.includes(cat.slug) && (
              <div className="grid grid-cols-1 gap-4 sm:[grid-template-columns:repeat(auto-fit,minmax(300px,1fr))]">
                {cat.items.map((it) => (
                  <article
                    key={`${cat.slug}-${it.name}`}
                    role="button"
                    tabIndex={0}
                    onClick={() => setOpenItem(it)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setOpenItem(it);
                      }
                    }}
                    className="min-w-0 border border-black/10 rounded-2xl bg-white p-3 grid grid-cols-[minmax(0,1fr)_88px] sm:grid-cols-[minmax(0,1fr)_116px] items-center gap-3 hover:shadow-md transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-teal,#007ba7)] cursor-pointer"
                  >
                    {/* Text */}
                    <div className="min-w-0">
                      <div className="font-medium text-[15px] text-[var(--color-brand-ink,#000)] truncate">
                        {it.name}
                      </div>
                      <div className="mt-1 flex items-center gap-2 flex-wrap">
                        <div className="text-xs text-black/80">{it.price}</div>
                        {Array.isArray(it.badges) &&
                          it.badges.map((b) => <Badge key={b} label={b} />)}
                      </div>
                      {it.note && (
                        <p className="mt-1.5 text-[13px] leading-snug text-black/80 line-clamp-2">
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
                        width="116"
                        height="84"
                        className="block w-full h-full object-contain pointer-events-none"
                        draggable="false"
                      />
                    </div>
                  </article>
                ))}
                {cat.slug === "breakfast" &&
                  Array.isArray(cat.balanced) &&
                  cat.balanced.length > 0 && (
                    <ExtrasList
                      title="Balanced Beach Bites"
                      subtitle={cat.balancedSubtitle}
                      items={cat.balanced}
                      className="mt-6"
                    />
                  )}
                {/* All Day Meal (below Balanced) */}
                {cat.slug === "breakfast" &&
                  Array.isArray(cat.allDay) &&
                  cat.allDay.length > 0 && (
                    <ExtrasList
                      title="All Day Meal"
                      subtitle={cat.allDaySubtitle}
                      items={cat.allDay}
                      className="mt-6"
                    />
                  )}
                {/* Extras as a separate component */}
                {cat.slug === "breakfast" &&
                  Array.isArray(cat.extras) &&
                  cat.extras.length > 0 && (
                    <ExtrasList
                      title="Add Extras"
                      items={cat.extras}
                      className="mt-6"
                    />
                  )}
              </div>
            )}
            {/* Sides */}
            {cat.slug === "share" &&
              Array.isArray(cat.sides) &&
              cat.sides.length > 0 && (
                <ExtrasList title="Sides" items={cat.sides} className="mt-6" />
              )}
            {/* Kids Meal */}
            {cat.slug === "share" &&
              Array.isArray(cat.kids) &&
              cat.kids.length > 0 && (
                <ExtrasList
                  title="Kids Meal"
                  items={cat.kids}
                  className="mt-6"
                />
              )}
            {/* Salads & Soups Note */}
            {cat.slug === "share" && cat.saladsSoupsNote && (
              <div className="col-span-full mt-6">
                <p className="text-sm text-black/60 italic text-center">
                  {cat.saladsSoupsNote}
                </p>
              </div>
            )}
          </section>
        ))}
      </div>

      {/* Modal (opened when a card is clicked) */}
      {openItem && (
        <MenuModal item={openItem} onClose={() => setOpenItem(null)} />
      )}
    </section>
  );
}
