"use client";

import Link from "next/link";
import { useState } from "react";
import MaceIcon from "@/components/Mace";

export default function MahaaBhaaratham() {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  return (
    <main 
      className="min-h-screen w-full bg-custom-navy flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12 relative overflow-hidden"
      aria-label="Mahabharatham homepage"
    >
      <div className="max-w-4xl mx-auto text-center z-10 animate-fade-in">
        {/* Main title with fade-in and slide-up animation */}
        <h1 
          className="font-playfair text-4xl sm:text-5xl md:text-7xl font-bold text-custom-mint mb-4 sm:mb-6 motion-safe:opacity-0 motion-safe:animate-title"
          data-content-type="epic-title"
        >
          The Mahaa Bhaaratham
        </h1>
        
        {/* Subtitle with animated divider */}
        <div className="relative mb-8 sm:mb-12 motion-safe:opacity-0 motion-safe:animate-subtitle">
          <div 
            className="absolute left-1/2 -translate-x-1/2 top-0 w-0 h-px bg-custom-sky-blue motion-safe:animate-expand"
            aria-hidden="true" 
          />
          <h2 
            className="font-outfit text-lg sm:text-xl md:text-2xl text-custom-sky-blue font-light mt-6 max-w-2xl mx-auto leading-relaxed px-4"
            data-content-type="epic-subtitle"
          >
            Explore the epic tale of duty, righteousness, and the complexities of life
          </h2>
        </div>

        {/* Enhanced navigation buttons with animations */}
        <div 
          className="flex flex-row items-center justify-center gap-4 sm:gap-6 mt-6 sm:mt-8 motion-safe:opacity-0 motion-safe:animate-buttons"
          role="navigation"
          aria-label="Main navigation"
        >
          <Link
            href="/mahaabhaaratham/characters"
            className="group relative overflow-hidden flex items-center gap-2 bg-custom-sky-blue text-custom-navy px-6 sm:px-8 py-3 sm:py-4 font-outfit font-medium transition-all duration-300 hover:bg-custom-mint hover:shadow-lg motion-safe:hover:-translate-y-1 w-auto"
            onMouseEnter={() => setHoveredButton('characters')}
            onMouseLeave={() => setHoveredButton(null)}
            aria-label="Explore characters"
            data-nav-type="characters"
          >
            <span className="relative z-10 flex items-center justify-center sm:justify-start gap-2 w-full">
              Characters
              <MaceIcon 
                variant={0} 
                className="transition-transform duration-300 group-hover:translate-x-1" 
                aria-hidden="true"
              />
            </span>
            <div 
              className={`absolute inset-0 bg-custom-mint transform transition-transform duration-300 ${hoveredButton === 'characters' ? 'translate-x-0' : '-translate-x-full'}`}
              aria-hidden="true"
            />
          </Link>
          
          <Link
            href="/mahaabhaaratham/parvas"
            className="group relative overflow-hidden flex items-center gap-2 bg-custom-sky-blue text-custom-navy px-6 sm:px-8 py-3 sm:py-4 font-outfit font-medium transition-all duration-300 hover:bg-custom-mint hover:shadow-lg motion-safe:hover:-translate-y-1 w-auto"
            onMouseEnter={() => setHoveredButton('parvas')}
            onMouseLeave={() => setHoveredButton(null)}
            aria-label="Explore parvas"
            data-nav-type="parvas"
          >
            <span className="relative z-10 flex items-center justify-center sm:justify-start gap-2 w-full">
              Parvas
              <MaceIcon 
                variant={0} 
                className="transition-transform duration-300 group-hover:translate-x-1" 
                aria-hidden="true"
              />
            </span>
            <div 
              className={`absolute inset-0 bg-custom-mint transform transition-transform duration-300 ${hoveredButton === 'parvas' ? 'translate-x-0' : '-translate-x-full'}`}
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </main>
  );
}