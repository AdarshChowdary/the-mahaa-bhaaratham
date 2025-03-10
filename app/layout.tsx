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
  title: "Fifth Veda",
  description: "The MahaaBhaaratham Reimagined",
  icons: {
    icon: "/favicon.svg", // Path relative to public folder
  },
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
        <ReactQueryProvider>
          <LLMProvider>
            <CustomCursor/>
            <main className="flex-grow">
              {children}
            </main>
            <ScrollToTop/>
            <Footer/>
          </LLMProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}