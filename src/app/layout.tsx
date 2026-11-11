import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { QuoteProvider } from "@/context/QuoteContext";
import { QuoteModal } from "@/components/ui/QuoteModal";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.matshepo.com"),
  title: {
    default: "Matshepo Africa Ltd | Construction Chemicals & Waterproofing Solutions Nairobi Kenya",
    template: "%s | Matshepo Africa Ltd",
  },
  description:
    "Matshepo Africa Ltd manufactures premium construction chemicals in Nairobi, Kenya. High-performance tile adhesives (Simba Grip, Grip Master), Ultraguard 2K waterproofing, Tile Lit waterproof grout, Express Plaster, and Cemora microcement flooring with a 10-year waterproofing guarantee.",
  keywords: [
    "Matshepo Africa",
    "Matshepo Africa Ltd",
    "construction chemicals Kenya",
    "tile adhesive Nairobi",
    "waterproofing Kenya",
    "Simba Grip 555",
    "Simba Grip 777",
    "Simba Grip 818",
    "Ultraguard 2K",
    "Tile Lit grout",
    "Express Plaster",
    "microcement flooring Nairobi",
    "swimming pool waterproofing Kenya",
    "basement waterproofing Nairobi",
  ],
  authors: [{ name: "Matshepo Africa Ltd" }],
  creator: "Matshepo Africa Ltd",
  publisher: "Matshepo Africa Ltd",
  formatDetection: {
    email: true,
    telephone: true,
  },
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: "https://www.matshepo.com",
    siteName: "Matshepo Africa Ltd",
    title: "Matshepo Africa Ltd | Premium Construction Chemicals & Waterproofing",
    description:
      "Advanced construction chemicals for stronger, more durable buildings. Tile adhesives, 2K waterproofing, grout, plaster, and microcement flooring.",
    images: [
      {
        url: "/assets/reference/matshepo_original_mockup.png",
        width: 1200,
        height: 630,
        alt: "Matshepo Africa Ltd Construction Solutions",
      },
    ],
  },
  icons: {
    icon: [
      { url: "/assets/logo/matshepo_symbol.png" },
      { url: "/favicon.png", type: "image/png" },
    ],
    shortcut: "/assets/logo/matshepo_symbol.png",
    apple: "/assets/logo/matshepo_symbol.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "Matshepo Africa Ltd | Some Bonds are Forever",
    description: "Quality construction chemicals manufacturing and professional waterproofing services in Nairobi, Kenya.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={plusJakartaSans.variable}>
      <body className="min-h-screen flex flex-col font-sans bg-[#F5F8FC] text-[#172333]">
        <QuoteProvider>
          <Suspense fallback={<div className="h-16 bg-white w-full border-b border-slate-100" />}>
            <Navbar />
          </Suspense>
          <main className="flex-1 w-full">{children}</main>
          <Footer />
          <QuoteModal />
        </QuoteProvider>
      </body>
    </html>
  );
}
