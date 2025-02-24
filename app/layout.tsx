import type { Metadata } from "next";
import "./globals.css";
import { Outfit } from "next/font/google"
import Footer from "./Footer";
import CustomCursor from "@/components/CustomCursor"
import { LLMProvider } from "@/lib/LLMContext";
import MahaabhaaratamChat from "@/components/MahaabhaaratamChat";

const outfit = Outfit({
  subsets: ['latin'],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Fifth Veda",
  description: "The MahaaBhaaratham Reimagined",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={outfit.className}>
      <body
        className={`antialiased min-h-screen flex flex-col`}
      >
        <LLMProvider>
          <CustomCursor/>
          <main className="flex-grow">
            {children}
          </main>
          <MahaabhaaratamChat/>
          <Footer/>
        </LLMProvider>
      </body>
    </html>
  );
}