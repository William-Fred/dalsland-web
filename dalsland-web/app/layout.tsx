import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Järbo Råberg 3 — Your retreat in the heart of Dalsland",
  description:
    "Rent a private cabin by the lake in Dalsland, Sweden. Surrounded by forests, fresh air, and tranquillity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} font-sans antialiased bg-stone-50 text-stone-800`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
