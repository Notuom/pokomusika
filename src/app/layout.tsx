import clsx from "clsx";
import type { Metadata } from "next";
import { Parkinsans } from "next/font/google";

import "./globals.css";

const parkinsans = Parkinsans({
  subsets: ["latin"],
});

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
    <html
      lang="en"
      className={clsx("h-full antialiased", parkinsans.className)}
    >
      <body>{children}</body>
    </html>
  );
}
