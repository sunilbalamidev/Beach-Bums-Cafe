"use client";
import React, { useState, useEffect, useRef } from "react";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const barRef = useRef(null); // <-- ref to the top bar (not the drawer)

  // Keep the "sticky" shadow and re-measure on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 2);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Measure the top bar height and push to CSS var --site-header-h
  const setHeaderVar = () => {
    const h = barRef.current?.offsetHeight || 64;
    document.documentElement.style.setProperty("--site-header-h", `${h}px`);
  };

  useEffect(() => {
    setHeaderVar(); // initial
    const ro = new ResizeObserver(setHeaderVar);
    if (barRef.current) ro.observe(barRef.current);
    // Also re-measure on viewport resize (fonts can reflow)
    window.addEventListener("resize", setHeaderVar);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", setHeaderVar);
    };
  }, []);

  // Re-measure whenever the mobile drawer toggles (even though it’s below the bar,
  // this ensures we’re always correct if styling changes)
  useEffect(() => {
    setHeaderVar();
  }, [open]);

  const navLink =
    "text-sm font-medium transition-colors hover:text-brand-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/40 focus-visible:rounded-[0.25rem]";
  const mobileLink =
    "block px-2 py-1 rounded-md transition-colors hover:text-brand-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/40";

  return (
    <header
      id="site-header"
      className={`sticky top-0 z-[60] bg-white/80 backdrop-blur transition-shadow ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      {/* top bar (measured) */}
      <div
        ref={barRef}
        className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between"
      >
        {/* left: site identity */}
        <a
          href="/"
          aria-label="Beach Bums Tassie - Home"
          className="flex items-center gap-2 transition-transform hover:scale-[1.01]"
        >
          <img
            src="/logo.svg"
            alt="Beach Bums Café logo"
            className="h-12 w-12 md:h-14 md:w-14 rounded-full object-contain"
          />
          <span className="text-lg md:text-xl font-semibold leading-none">
            Beach Bums Tassie
          </span>
        </a>

        {/* center: primary navigation (desktop only) */}
        <nav className="hidden md:block" aria-label="Primary">
          <ul role="list" className="flex gap-8">
            <li>
              <a href="#menu" className={navLink}>
                Menu
              </a>
            </li>
            <li>
              <a href="#visit" className={navLink}>
                Visit Us
              </a>
            </li>
            <li>
              <a href="#story" className={navLink}>
                Our Story
              </a>
            </li>
          </ul>
        </nav>

        {/* right: actions */}
        <div className="flex items-center gap-3">
          {/* mobile menu button */}
          <button
            type="button"
            className="md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/40 rounded-md"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-controls="mobile-nav"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d={open ? "M6 6l12 12M18 6l-12 12" : "M3 6h18M3 12h18M3 18h18"}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>

          {/* desktop CTA */}
          <div className="hidden md:block">
            <a
              href="#menu"
              className="px-4 py-2 text-sm font-medium rounded-full border border-brand-teal text-brand-teal hover:bg-brand-teal hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/40"
            >
              View Menu
            </a>
          </div>
        </div>
      </div>

      {/* mobile menu drawer (does not affect measured top bar) */}
      <nav
        id="mobile-nav"
        aria-label="Mobile Navigation"
        className={`md:hidden bg-white border-t shadow-sm transition-all duration-300 overflow-hidden ${
          open ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul role="list" className="flex flex-col gap-3 p-4 text-sm font-medium">
          <li>
            <a
              href="#menu"
              className={mobileLink}
              onClick={() => setOpen(false)}
            >
              Menu
            </a>
          </li>
          <li>
            <a
              href="#visit"
              className={mobileLink}
              onClick={() => setOpen(false)}
            >
              Visit Us
            </a>
          </li>
          <li>
            <a
              href="#story"
              className={mobileLink}
              onClick={() => setOpen(false)}
            >
              Our Story
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
