// src/data/menu.js
export const CATEGORIES = [
  {
    title: "Breakfast ",
    subtitle: "Till 11:30 AM | GF option available",
    slug: "breakfast",
    items: [
      {
        name: "Big Breakfast",
        price: "$30",
        note: "Toasted sourdough with two eggs (of your choice), bacon, sausage, hash brown, mushroom, baked beans and tomato relish.",
        img: "/menu/big_breakie.webp",
      },
      {
        name: "Veg Big Breakfast",
        price: "$30",
        note: "Toasted sourdough with two eggs (of your choice), grilled halloumi, avo, hash brown, mushroom, baked beans and tomato relish.",
        img: "/menu/veg-breakie.webp",
        badges: ["V"],
      },
      {
        name: "Avo on Toast",
        price: "$20",
        note: "Toasted sourdough with two poached eggs and smashed avo.",
        img: "/menu/avo-smash.webp",
        badges: ["V"],
      },
      {
        name: "Eggs Benedict",
        price: "$18",
        note: "Toasted sourdough with two poached eggs, bacons and hollandaise sauce.",
        img: "/menu/egg_benedict.webp",
      },
      {
        name: "BLT",
        price: "$15",
        note: "Toasted sourdough with bacon, lettuce and tomato on relish and mayo.",
        img: "/menu/BLT.webp",
      },
      {
        name: "Egg on Toast",
        price: "$13",
        note: "Toasted sourdough with two eggs of your choice.",
        img: "/menu/egg_toast.webp",
      },
    ],
    balanced: [
      // NEW
      { name: "Chia Pudding", price: "", badges: ["VG", "GF"], note: "" },
      { name: "Granola Cup", price: "", badges: ["V"], note: "" },
    ],
    /* All Day Meal (under Breakfast, below Balanced) */
    allDay: [
      { name: "Bacon & Egg Bun", price: "$13.50" },
      { name: "Egg & Halloumi Bun", price: "$13.50", badges: ["V"] },
      { name: "Ham, Cheese & Tomato Toastie", price: "$10" },
      { name: "Ham & Cheese Toastie", price: "$8.50" },
      { name: "Just Cheese Toastie", price: "$6", badges: ["V"] },
      { name: "Ham & Cheese Croissant", price: "$10" },
    ],
    allDaySubtitle: "A little something for yourself",

    //  Extras are NOT menu cards. They’ll be rendered by a dedicated component.
    extras: [
      { name: "Avocado", price: "$4", badges: ["V", "GF"] },
      { name: "Egg", price: "$2" },
      { name: "Bacon", price: "$3" },
      { name: "Halloumi", price: "$3", badges: ["V"] },
      { name: "Hash brown", price: "$2", badges: ["V"] },
      { name: "Relish/Sauce", price: "$2", badges: ["VG", "GF"] },
    ],
  },
  {
    title: "Fish & Chips",
    subtitle: "Crispy golden local fresh fish.",
    slug: "fish-chips",
    items: [
      {
        name: "Fish and Chips",
        price: "$23",
        note: "Panko crumbed/battered with tartar sauce and lemon. (GF option available for battered)",
        img: "/menu/fish_chips.webp",
      },
      {
        name: "Fish, Chips and Salad",
        price: "$26",
        note: "Panko crumbed/battered with tartar sauce, lemon and seasonal salad. (GF option available for battered)",
        img: "/menu/fish_chips_salad.webp",
      },
      {
        name: "Calamari and Chips",
        price: "$23",
        note: "Panko crumbed with tartar and lemon.",
        img: "/menu/calamari_chips.webp",
      },
      {
        name: "Battered Prawns and Chips",
        price: "$23",
        note: "With cocktail sauce and lemon. (GF option available)",
        img: "/menu/prawns_chips.webp",
      },
      {
        name: "Fish Calamari and Chips",
        price: "$25",
        note: "Panko crumbed fish, calamari and chips with tartar sauce and lemon. (GF option available for all)",
        img: "/menu/fish_calamari_chips.webp",
      },
    ],
  },
  {
    title: "Burgers",
    subtitle: "Big waves, bigger burgers. Served with a side of chips.",
    slug: "burgers",
    items: [
      {
        name: "Fish Burger",
        price: "$20",
        note: "Lettuce, cheese, crumbed fish, with house made pickled onion and tartar sauce.",
        img: "/menu/fish_burger.webp",
      },
      {
        name: "Crispy Chicken Burger",
        price: "$20",
        note: "Lettuce, cheese, tomato, crispy spiced chicken with house made pickled onion and sriracha mayo.",
        img: "/menu/burger.webp",
      },
      {
        name: "Veggie Patty Burger",
        price: "$20",
        note: "Lettuce, tomato, cucumber, beetroot and falafel patty with house made pickled onion and vegan sauce.",
        badges: ["VG"],
        img: "/menu/veg_burger.webp",
      },
    ],
  },
  {
    title: "Share",
    subtitle: "Share the love and the food!",
    slug: "share",
    items: [
      {
        name: "Platter for 2",
        price: "$48",
        note: "Panko crumbed fish and squid, battered prawns, chips, tartar and lemon.",
        img: "/menu/plate_2.webp",
      },
      {
        name: "Family Platter",
        price: "$62",
        note: "Panko crumbed fish and squid, battered prawns, nuggets, chips, tartar and lemon.",
        img: "/menu/family_plater.webp",
      },
      {
        name: "Platter for Kids",
        price: "$35",
        note: "Fish bites, nuggets, crumbed calamari and chips to share with a side of tomato sauce.",
        img: "/menu/kids_plater.webp",
      },
    ],
    /* 👇 Sides subsection */

    sides: [
      { name: "Onion Rings", price: "$10" },
      { name: "Buffalo Wings", price: "$12" },
      { name: "Just Calamari – Panko Crumbed", price: "$15" },
      { name: "Just Fish – Panko Crumbed/Battered", price: "$15" },
      { name: "Battered Prawn", price: "$15" },
      { name: "Chips Butty", price: "$10" },
      { name: "Chips (Small)", price: "$5" },
      { name: "Chips (Medium)", price: "$10" },
      { name: "Chips (Large)", price: "$15" },
    ],
    kids: [
      { name: "Battered Fish and Chips", price: "$13.50" },
      { name: "Panko Crumbed Calamari and Chips", price: "$13.50" },
      { name: "Chicken Nuggets and Chips", price: "$13.50" },
      { name: "Cheesy Toastie", price: "$6" },
    ],
    saladsSoupsNote:
      "Locally grown seasonal salads and soups — please check our daily special board.",
  },
];
