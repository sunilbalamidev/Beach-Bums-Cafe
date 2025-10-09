"use client";
import { useEffect, useMemo, useRef, useState } from "react";

const CONTENT_MAX_W = 1120;
const GUTTER_X = 16;

/* ✅ Local-only fallback (inline SVG, no external requests) */
const LOCAL_FALLBACK =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="360" height="270"><rect width="100%" height="100%" fill="%23f3f4f6"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="16" fill="%2399a"><![CDATA[image coming soon]]></text></svg>';

const resolveLocal = (v) =>
  typeof v === "string" && v.startsWith("/") ? v : LOCAL_FALLBACK;

/* 🔁 Your menu data — fixed to use your real filenames */
const CATEGORIES = [
  {
    title: "All Day Breakfast",
    slug: "breakfast",
    items: [
      {
        name: "Beach Bums Big Breakfast",
        price: "$26",
        note: "Eggs, bacon, sausage, mushrooms, hashbrown & sourdough",
        img: "/menu/Big_Breakie.svg", // <-- match your actual file
      },
      {
        name: "Avo Smash",
        price: "$22",
        note: "Smashed avocado, feta, cherry tomato & poached eggs on sourdough",
        img: "/menu/avo_smash.svg", // <-- match your actual file
      },
      {
        name: "Eggs Your Way",
        price: "$14",
        note: "Two eggs cooked your way with sourdough toast",
        img: "/menu/eggs.svg", // <-- match your actual file
      },
      {
        name: "Eggs Benedict",
        price: "$24",
        note: "Poached eggs, ham or smoked salmon, hollandaise on sourdough",
        img: "/menu/egg_benedict.svg",
      },
      {
        name: "Brekky Burger",
        price: "$18",
        note: "Bacon, fried egg, cheese, hashbrown, BBQ sauce on milk bun",
        img: "",
      },
      {
        name: "Pancake Stack",
        price: "$19",
        note: "Fluffy pancakes, maple syrup, seasonal fruits & ice cream",
        img: "",
      },
      {
        name: "Granola Bowl",
        price: "$17",
        note: "Toasted granola, Greek yogurt, honey & mixed berries",
        img: "",
      },
    ],
  },
  {
    title: "Lunch & Mains",
    slug: "lunch",
    items: [
      {
        name: "Fish Tacos",
        price: "$20",
        note: "Grilled fish, slaw, lime mayo in soft tortillas",
        img: "",
      },
      {
        name: "Beach Burger",
        price: "$22",
        note: "Beef patty, cheese, tomato relish, lettuce & fries",
        img: "",
      },
      {
        name: "Halloumi Salad",
        price: "$19",
        note: "Grilled halloumi, quinoa, roasted veg & lemon dressing",
        img: "",
      },
      {
        name: "Chicken Schnitzel",
        price: "$24",
        note: "Panko-crumbed chicken breast with fries & salad",
        img: "",
      },
      {
        name: "Buddha Bowl",
        price: "$21",
        note: "Brown rice, sweet potato, chickpeas & tahini (Vegan)",
        img: "",
      },
    ],
  },
  {
    title: "Sides",
    slug: "sides",
    items: [
      {
        name: "Sweet Potato Fries",
        price: "$10",
        note: "Served with aioli",
        img: "",
      },
      {
        name: "Beer-Battered Fries",
        price: "$9",
        note: "Crispy fries with house seasoning",
        img: "",
      },
      {
        name: "Garden Salad",
        price: "$8",
        note: "Fresh greens, tomato, cucumber, house dressing",
        img: "",
      },
      {
        name: "Hash Browns",
        price: "$6",
        note: "Crispy golden hash browns",
        img: "",
      },
    ],
  },
  {
    title: "Coffee & Drinks",
    slug: "drinks",
    items: [
      {
        name: "Flat White",
        price: "$5",
        note: "Velvety espresso with steamed milk",
        img: "",
      },
      {
        name: "Cappuccino",
        price: "$5",
        note: "Frothy milk & chocolate dust",
        img: "",
      },
      { name: "Latte / Mocha", price: "$5.50", note: "", img: "" },
      { name: "Iced Latte", price: "$6", note: "", img: "" },
      { name: "Cold Brew", price: "$6.50", note: "", img: "" },
      { name: "Hot Chocolate", price: "$5.50", note: "", img: "" },
      { name: "Chai Latte", price: "$5.50", note: "", img: "" },
      {
        name: "Fresh Juices",
        price: "$8.50",
        note: "Orange, apple, watermelon, or mix",
        img: "",
      },
      {
        name: "Smoothies",
        price: "$9",
        note: "Berry, tropical, or green blend",
        img: "",
      },
    ],
  },
  {
    title: "Bakery & Sweets",
    slug: "bakery",
    items: [
      { name: "Croissant", price: "$6", note: "Butter or almond", img: "" },
      {
        name: "Banana Bread",
        price: "$7",
        note: "Toasted, served with butter",
        img: "",
      },
      {
        name: "Blueberry Muffin",
        price: "$6.50",
        note: "Baked fresh daily",
        img: "",
      },
      {
        name: "Chocolate Brownie",
        price: "$6.50",
        note: "Rich chocolate with walnuts",
        img: "",
      },
    ],
  },
];

/* ---------- The component (unchanged logic; local-only images) ---------- */
const Menu = () => {
  const shellRef = useRef(null);
  const listRef = useRef(null);
  const navRef = useRef(null);
  const [active, setActive] = useState(CATEGORIES[0].slug);

  const sections = useMemo(
    () => CATEGORIES.map((c) => ({ slug: c.slug, el: null })),
    []
  );
  const setSectionEl = (slug) => (el) => {
    const idx = sections.findIndex((s) => s.slug === slug);
    if (idx >= 0) sections[idx].el = el;
  };
  const getNavH = () => (navRef.current ? navRef.current.offsetHeight : 56);

  const onClickTab = (slug) => (e) => {
    e.preventDefault();
    const container = listRef.current;
    const target = sections.find((s) => s.slug === slug)?.el;
    if (!container || !target) return;

    const containerTop = container.getBoundingClientRect().top;
    const targetTop = target.getBoundingClientRect().top;
    const delta = targetTop - containerTop;
    const y = container.scrollTop + delta - (getNavH() + 12);

    container.scrollTo({ top: y, behavior: "smooth" });
    history.replaceState(null, "", `#${slug}`);
  };

  useEffect(() => {
    const container = listRef.current;
    if (!container) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      {
        root: container,
        rootMargin: `-${getNavH() + 8}px 0px -65% 0px`,
        threshold: 0.01,
      }
    );
    sections.forEach((s) => s.el && observer.observe(s.el));
    return () => observer.disconnect();
  }, [sections]);

  return (
    <section
      id="menu"
      ref={shellRef}
      style={{
        position: "relative",
        height: "100vh",
        display: "grid",
        gridTemplateRows: "auto 1fr",
        background: "var(--color-brand-bg, #fff)",
        borderTop: "1px solid rgba(0,0,0,0.06)",
      }}
    >
      <header
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          background: "var(--color-brand-bg, #fff)",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: CONTENT_MAX_W,
            padding: `24px ${GUTTER_X}px 0`,
          }}
        >
          <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>
            Our Menu
          </h1>
          <nav
            ref={navRef}
            aria-label="Menu categories"
            style={{
              position: "sticky",
              top: 0,
              zIndex: 10,
              background: "var(--color-brand-bg, #fff)",
              borderBottom: "1px solid rgba(0,0,0,0.06)",
            }}
          >
            <ul
              style={{
                display: "flex",
                gap: 18,
                overflowX: "auto",
                whiteSpace: "nowrap",
                listStyle: "none",
                padding: "12px 4px",
                margin: 0,
              }}
            >
              {CATEGORIES.map((c) => {
                const isActive = active === c.slug;
                return (
                  <li key={c.slug}>
                    <a
                      href={`#${c.slug}`}
                      onClick={onClickTab(c.slug)}
                      aria-current={isActive ? "true" : undefined}
                      style={{
                        textDecoration: "none",
                        fontSize: 14,
                        padding: "6px 10px",
                        borderRadius: 999,
                        fontWeight: isActive ? 700 : 500,
                        background: isActive
                          ? "rgba(0,0,0,0.06)"
                          : "transparent",
                        color: "inherit",
                      }}
                    >
                      {c.title}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </header>

      <div
        ref={listRef}
        style={{
          overflowY: "auto",
          overscrollBehavior: "auto",
          display: "flex",
          justifyContent: "center",
          paddingBottom: 48,
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: CONTENT_MAX_W,
            padding: `16px ${GUTTER_X}px 0`,
          }}
        >
          {CATEGORIES.map((cat) => (
            <section
              id={cat.slug}
              key={cat.slug}
              ref={setSectionEl(cat.slug)}
              style={{
                scrollMarginTop: (navRef.current?.offsetHeight || 56) + 12,
                padding: "16px 0 28px",
                borderBottom: "1px solid rgba(0,0,0,0.05)",
              }}
            >
              <h2
                style={{ fontSize: 20, fontWeight: 700, margin: "8px 0 14px" }}
              >
                {cat.title}
              </h2>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                  gap: 16,
                }}
              >
                {cat.items.map((it) => (
                  <article
                    key={`${cat.slug}-${it.name}`}
                    style={{
                      border: "1px solid rgba(0,0,0,0.08)",
                      borderRadius: 14,
                      background: "#fff",
                      padding: 14,
                      display: "grid",
                      gridTemplateColumns: "1fr 120px",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontWeight: 600, lineHeight: 1.2 }}>
                        {it.name}
                      </div>
                      <div
                        style={{ fontSize: 12, color: "#666", marginTop: 4 }}
                      >
                        {it.price}
                      </div>
                      {it.note ? (
                        <div
                          style={{ fontSize: 12, color: "#555", marginTop: 6 }}
                        >
                          {it.note}
                        </div>
                      ) : null}
                    </div>

                    <div
                      style={{
                        width: 120,
                        height: 90,
                        borderRadius: 10,
                        overflow: "hidden",
                        background: "#f3f4f6",
                      }}
                    >
                      <img
                        src={resolveLocal(it.img)}
                        alt={it.name}
                        loading="lazy"
                        width={120}
                        height={90}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                          display: "block",
                        }}
                      />
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Menu;
