import "./globals.css";

export const metadata = {
  title: "Beach Bums",
  description: "Coastal café & good vibes",
};

const RootLayout = ({ children }) => (
  <html lang="en">
    <body>{children}</body>
  </html>
);

export default RootLayout;
