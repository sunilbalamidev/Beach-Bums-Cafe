import Image from "next/image";

const Story = () => {
  return (
    <section id="story" className="mx-auto max-w-6xl px-4 py-16 ">
      <div className="grid md:grid-cols-3 gap-8 items-start">
        {/* left: text (spans 2 cols on desktop) */}
        <div className="md:col-span-2 space-y-3">
          <h2 className="text-2xl md:text-3xl font-semibold">Our Story</h2>
          <p className="opacity-80">
            Born from a love of the Tassie coast, Beach Bums serves honest food
            and coffee with a view worth staying for. Whether it’s Van Diemen’s
            scoops, Single O coffee, or fresh fish &amp; chips—you’re part of
            our beach family.
          </p>
        </div>

        {/* right: image */}
        <div>
          <Image
            src="/coffee.webp"
            alt="Our Story"
            width={1000}
            height={700}
            className="w-full aspect-[16/9] h-auto object-cover rounded-xl"
            sizes="(max-width: 768px) 100vw, 33vw"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default Story;
