export default function SeoLocalBusiness() {
  const json = {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    name: "Beach Bums Tassie",
    image: "https://www.beachbums.com.au/og.jpg",
    url: "https://www.beachbums.com.au",
    telephone: "+61 405 108 082",
    email: "hello@beachbums.com.au",
    address: {
      "@type": "PostalAddress",
      streetAddress: "136 Carlton Beach Road",
      addressLocality: "Dodges Ferry",
      addressRegion: "TAS",
      postalCode: "7173",
      addressCountry: "AU",
    },
    servesCuisine: ["Coffee", "Breakfast", "Lunch", "Bakery"],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "08:00",
        closes: "15:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Friday",
        opens: "08:00",
        closes: "15:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:00",
        closes: "15:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "08:00",
        closes: "15:00",
      },
    ],
    priceRange: "$$",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
