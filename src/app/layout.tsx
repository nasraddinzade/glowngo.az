import type { Metadata, Viewport } from "next";
import { Manrope, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { DemoBanner } from "@/components/DemoBanner";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WishlistProvider } from "@/lib/wishlist";

// Bricolage Grotesque from the brief has no "ə", so the display face is Plus Jakarta Sans,
// which covers ə Ə ş ç ğ ı İ ö ü and ₼. Manrope stays for text; it lacks Ə and ₼, and the
// font stack in globals.css falls back to Jakarta for those two glyphs.
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["800"],
  variable: "--font-jakarta",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600"],
  variable: "--font-manrope",
  display: "swap",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: { default: "Glow · Bizimlə PARLA", template: "%s · Glow" },
  description: "Koreya kosmetikasının etibarlı ünvanı. 1st K-BEAUTY boutique, Bakı.",
};

export const viewport: Viewport = {
  themeColor: "#c2df8d",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="az" className={`${jakarta.variable} ${manrope.variable}`}>
      <body className="font-sans antialiased">
        <WishlistProvider>
          <DemoBanner />
          <Header />
          <main>{children}</main>
          <Footer />
        </WishlistProvider>
      </body>
    </html>
  );
}
