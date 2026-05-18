import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pokomusika",
  description:
    "Compose tracks for Pokopia music pads, right from your browser!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased`}>
      <body>{children}</body>
    </html>
  );
}
