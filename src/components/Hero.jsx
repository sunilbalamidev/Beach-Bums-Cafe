import React from "react";

const Hero = () => {
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
            <button className="rounded-full px-5 py-2.5 text-sm bg-brand-teal text-white hover:bg-brand-teal/90 transition-colors">
              View Menu
            </button>
            <button className="rounded-full px-5 py-2.5 text-sm border border-brand-teal text-brand-teal hover:bg-brand-teal hover:text-white transition-colors">
              Find Us
            </button>
          </div>
        </div>

        {/* right: image block */}
        <div>
          <img
            src="/beachbumhero.webp"
            alt="Beach Café"
            className="w-full aspect-[16/9] object-cover rounded-2xl shadow-sm"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
