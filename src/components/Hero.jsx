"use client";
import React from "react";
import Image from "next/image";

const Hero = () => {
  // Smooth scroll handler
  const handleScroll = (id) => {
    const el = document.querySelector(id);
    if (!el) return;
    const headerH =
      parseInt(
        getComputedStyle(document.documentElement).getPropertyValue(
          "--site-header-h"
        )
      ) || 0;
    const y = el.getBoundingClientRect().top + window.scrollY - headerH;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <section id="hero" className="py-20 bg-[#F8F5F0] text-brand-ink">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
        {/* left: text block */}
        <div className="space-y-5">
          <h1 className="text-3xl md:text-5xl font-semibold leading-tight ">
            Tassie Fresh, By the Sea.
          </h1>

          <p className="text-base md:text-lg opacity-70 max-w-prose">
            Locally caught fish, single-origin coffee, and sunshine on the shore
            — that’s Beach Bums.
          </p>

          <div className="pt-2 flex gap-3">
            <button
              onClick={() => handleScroll("#menu")}
              className="rounded-full px-5 py-2.5 text-sm bg-brand-teal text-white hover:bg-brand-teal/90 transition-colors"
            >
              View Menu
            </button>

            <button
              onClick={() => handleScroll("#visit-us")}
              className="rounded-full px-5 py-2.5 text-sm border border-brand-teal text-brand-teal hover:bg-brand-teal hover:text-white transition-colors"
            >
              Find Us
            </button>
          </div>
        </div>

        {/* right: image block */}
        <div>
          <Image
            src="/beachbumhero.webp"
            alt="Beach Café"
            width={1280}
            height={720}
            className="w-full h-auto rounded-2xl shadow-sm"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
