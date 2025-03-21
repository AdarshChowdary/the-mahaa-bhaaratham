import type { Metadata } from "next";
import "./globals.css";
import { Outfit } from "next/font/google"
import Footer from "./Footer";
import CustomCursor from "@/components/CustomCursor"
import { LLMProvider } from "@/lib/LLMContext";
import ReactQueryProvider from "./ReactQueryProvider";
import ScrollToTop from "@/components/ScrollToTop";

const outfit = Outfit({
  subsets: ['latin'],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Fifth Veda | The MahaaBhaaratham Reimagined",
  description: "Explore the epic tale of the Mahaa Bhaaratham reimagined for the modern world. Discover ancient wisdom and timeless stories.",
  keywords: "Mahabharata, fifth veda, indian epic, wisdom, dharma, krishna, arjuna",
  icons: {
    icon: "/Favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={outfit.className}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <meta name="theme-color" content="#151C38" />
      </head>
      <body
        className="antialiased min-h-screen flex flex-col w-full overflow-x-hidden"
      >
        <ReactQueryProvider>
          <LLMProvider>
            <CustomCursor aria-hidden="true" data-element="custom-cursor" />
            <main className="grow w-full overflow-hidden">
              {children}
            </main>
            <ScrollToTop aria-label="Scroll to top" data-action="scroll-top" />
            <Footer />
          </LLMProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}