import React from "react";

const Footer = () => {
  return (
    <footer className="mt-16 border-t border-black/10 bg-white">
      <div className="mx-auto max-w-6xl px-4 md:px-8 py-10 grid gap-8 md:grid-cols-3">
        {/* Brand */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <img
              src="/logo.svg"
              alt="Beach Bums logo"
              className="h-10 w-10 rounded-full object-contain"
            />
            <span className="text-lg font-semibold">Beach Bums Tassie</span>
          </div>
          <p className="text-sm text-black/70 max-w-xs">
            Coastal café on the Tassie shore. Coffee, bites, and good vibes.
          </p>
        </div>

        {/* Visit */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold tracking-wide text-black/80">
            Visit
          </h3>
          <p className="text-sm">
            136 Carlton Beach Road, Dodges Ferry, Tasmania
          </p>
          <p className="text-sm">
            <a href="tel:+61405108082" className="hover:underline">
              +61 405 108 082
            </a>
          </p>
          <p className="text-sm">
            <a href="mailto:hello@beachbums.com.au" className="hover:underline">
              hello@beachbums.com.au
            </a>
          </p>
        </div>

        {/* Links */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold tracking-wide text-black/80">
            Links
          </h3>
          <ul className="text-sm space-y-1">
            <li>
              <a href="#menu" className="hover:underline">
                Menu
              </a>
            </li>
            <li>
              <a href="#visit-us" className="hover:underline">
                Visit Us
              </a>
            </li>
            <li>
              <a href="#story" className="hover:underline">
                Our Story
              </a>
            </li>
          </ul>
          <div className="pt-3 flex items-center gap-3">
            <a
              href="https://www.instagram.com/beachbumsdodges"
              aria-label="Instagram"
              className="hover:opacity-80"
              target="_blank"
            >
              {/* simple icon */}
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <rect
                  x="3"
                  y="3"
                  width="18"
                  height="18"
                  rx="5"
                  stroke="currentColor"
                />
                <circle cx="12" cy="12" r="4" stroke="currentColor" />
                <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
              </svg>
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=100094771770314&ref=_xav_ig_profile_page_web#"
              aria-label="Facebook"
              className="hover:opacity-80"
              target="_blank"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M14 8h2V5h-2a4 4 0 0 0-4 4v2H8v3h2v6h3v-6h2.1l.9-3H13V9a1 1 0 0 1 1-1Z"
                  fill="currentColor"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-black/10 py-4 text-center text-xs text-black/60">
        © {new Date().getFullYear()} Beach Bums Tassie. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
