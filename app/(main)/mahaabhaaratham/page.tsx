"use client";

import Link from "next/link";
import { useState } from "react";
import MaceIcon from "@/components/Mace";

export default function MahaaBhaaratham() {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  return (
    <main className="min-h-screen w-full bg-custom-navy flex flex-col items-center justify-center px-4 relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center z-10 animate-fade-in">
        {/* Main title with fade-in and slide-up animation */}
        <h1 className="font-playfair text-5xl md:text-7xl font-bold text-custom-mint mb-6 opacity-0 animate-title">
          The Mahaa Bhaaratham
        </h1>
        
        {/* Subtitle with animated divider */}
        <div className="relative mb-12 opacity-0 animate-subtitle">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 w-0 h-px bg-custom-sky-blue animate-expand" />
          <h2 className="font-outfit text-xl md:text-2xl text-custom-sky-blue font-light mt-6 max-w-2xl mx-auto leading-relaxed">
            Explore the epic tale of duty, righteousness, and the complexities of life
          </h2>
        </div>

        {/* Enhanced navigation buttons with animations */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 opacity-0 animate-buttons">
          <Link
            href="/mahaabhaaratham/characters"
            className="group relative overflow-hidden flex items-center gap-2 bg-custom-sky-blue text-custom-navy px-8 py-4 font-outfit font-medium transition-all duration-300 hover:bg-custom-mint hover:shadow-lg hover:-translate-y-1"
            onMouseEnter={() => setHoveredButton('characters')}
            onMouseLeave={() => setHoveredButton(null)}
          >
            <span className="relative z-10 flex items-center gap-2">
              Characters
              <MaceIcon 
                variant={0} 
                className="transition-transform duration-300 group-hover:translate-x-1" 
              />
            </span>
            <div className={`absolute inset-0 bg-custom-mint transform transition-transform duration-300 ${hoveredButton === 'characters' ? 'translate-x-0' : '-translate-x-full'}`} />
          </Link>
          
          <Link
            href="/mahaabhaaratham/parvas"
            className="group relative overflow-hidden flex items-center gap-2 border-2 border-custom-mint text-custom-sky-blue px-8 py-4 font-outfit font-medium transition-all duration-300 hover:text-custom-navy hover:shadow-lg hover:-translate-y-1"
            onMouseEnter={() => setHoveredButton('parvas')}
            onMouseLeave={() => setHoveredButton(null)}
          >
            <span className="relative z-10 flex items-center gap-2">
              Parvas
              <MaceIcon 
                variant={0} 
                className="transition-transform duration-300 group-hover:translate-x-1" 
              />
            </span>
            <div className={`absolute inset-0 bg-custom-mint transform transition-transform duration-300 ${hoveredButton === 'parvas' ? 'translate-x-0' : '-translate-x-full'}`} />
          </Link>
        </div>
      </div>
    </main>
  );
}