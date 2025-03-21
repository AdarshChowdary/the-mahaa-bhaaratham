import KrishnaAndArjuna from "../public/Krishna_and_Arjuna.jpeg";
import Image from "next/image";
import Hero from "./Hero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fifth Veda | The MahaaBhaaratham Reimagined",
  description: "Explore the epic tale of the Mahaa Bhaaratham reimagined for the modern world. Discover ancient wisdom and timeless stories.",
};

export default function Home() {
  return (
    <>
      <section 
        className="w-full h-[50vh] sm:h-[70vh] md:h-[100vh] relative bg-custom-navy" 
        data-section="hero-image"
      >
        <div className="relative w-full h-full">
          <Image 
            src={KrishnaAndArjuna.src}
            alt="Illustration of Krishna and Arjuna on the battlefield"
            fill
            sizes="100vw"
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-custom-navy/0" aria-hidden="true"></div>
        </div>
      </section>
      <div id="main-content">
        <Hero />
      </div>
    </>
  );
}