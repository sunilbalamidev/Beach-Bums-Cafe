import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://www.beachbums.com.au"), // change if different
  title: "Beach Bums | Coastal café in Dodges Ferry, Tasmania",
  description:
    "Coastal café: Single O coffee, fresh bites, and seaside vibes in Dodges Ferry, TAS.",
  openGraph: {
    title: "Beach Bums | Coastal café in Dodges Ferry, Tasmania",
    description: "Single O coffee, fresh bites, and seaside vibes.",
    url: "https://www.beachbums.com.au",
    siteName: "Beach Bums",
    images: [
      { url: "/og.svg", width: 1200, height: 630, alt: "Beach Bums café" },
    ],
    locale: "en_AU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Beach Bums | Coastal café in Dodges Ferry, Tasmania",
    description: "Single O coffee, fresh bites, and seaside vibes.",
    images: ["/og.svg"],
  },
  icons: {
    icon: "/favi.png",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-brand-bg text-brand-ink font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
