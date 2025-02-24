"use client";

import Link from "next/link";
import MaceIcon from "@/components/Mace";
import { ScrollText } from "lucide-react";
import { useState, useEffect } from "react";

export default function MahaaBhaaratham() {
  const [orbitProgress, setOrbitProgress] = useState<number>(0);
  const [isMerging, setIsMerging] = useState<boolean>(false);
  const [isMerged, setIsMerged] = useState<boolean>(false);
  const [glowIntensity, setGlowIntensity] = useState<number>(0);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  useEffect(() => {
    let animationFrame: number;
    let startTime: number | null = null;
    const totalRotations = Math.floor(Math.random() * 3) + 2;
    const orbitDuration = 4000;
    const mergeDuration = 4000;
    const radius = 140;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      if (!isMerging) {
        const progress = (elapsed % orbitDuration) / orbitDuration;
        const totalProgress = elapsed / orbitDuration;
        setOrbitProgress(progress);

        if (totalProgress >= totalRotations) {
          setIsMerging(true);
          startTime = timestamp;
        }
      } else if (!isMerged) {
        const mergeProgress = Math.min(elapsed / mergeDuration, 1);
        const currentRadius = radius * (1 - mergeProgress);
        const currentAngle = orbitProgress * Math.PI * 2 + (mergeProgress * Math.PI * 2);
        
        setOrbitProgress(currentAngle / (Math.PI * 2));

        if (mergeProgress === 1) {
          setIsMerged(true);
          startTime = timestamp;
        }
      } else {
        const glowSpeed = 800;
        const intensity = Math.sin(elapsed / glowSpeed * 2);
        setGlowIntensity((intensity + 1) / 2);
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isMerging, isMerged]);

  const getOrbitPosition = () => {
    const radius = isMerging 
      ? 140 * (1 - (orbitProgress % 1))
      : 140;
    
    const angle = orbitProgress * Math.PI * 2;
    
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius
    };
  };

  const orbitPos = getOrbitPosition();

  return (
    <main className="min-h-screen w-full bg-[#1b4965] flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Animated orbital elements */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div 
          className="w-64 h-64 rounded-full transition-all duration-300"
          style={{
            backgroundColor: '#bee9e8',
            opacity: isMerged ? 0.1 + glowIntensity * 0.6 : 0.2,
            transform: `scale(${isMerged ? 1 + glowIntensity * 0.5 : 1})`,
          }}
        />
        
        {!isMerged && (
          <div 
            className="absolute w-6 h-6 bg-[#bee9e8] rounded-full mix-blend-overlay transition-opacity duration-300"
            style={{
              transform: `translate(${orbitPos.x}px, ${orbitPos.y}px)`,
              opacity: isMerging ? 0.4 * (1 - (orbitProgress % 1)) : 0.4,
            }}
          />
        )}
      </div>

      {/* Main content */}
      <div className="max-w-4xl mx-auto text-center z-10">
        <div className="text-[#bee9e8] font-light text-lg tracking-wider mb-6 opacity-0 animate-title">
          धर्मक्षेत्रे कुरुक्षेत्रे
        </div>

        <h1 className="font-playfair text-5xl md:text-7xl font-bold text-[#bee9e8] mb-6 opacity-0 animate-title">
          The Mahaa Bhaaratham
        </h1>
        
        <div className="relative mb-12 opacity-0 animate-subtitle">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 w-0 h-px bg-[#62b6cb] animate-expand" />
          <h2 className="font-outfit text-xl md:text-2xl text-[#62b6cb] font-light mt-6 max-w-2xl mx-auto leading-relaxed">
            THE GREAT INDIAN TALE
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8 opacity-0 animate-buttons">
          <Link
            href="/mahaabhaaratham"
            className="group relative overflow-hidden flex items-center gap-2 bg-gradient-to-r from-[#5fa8d3] to-[#62b6cb] text-white px-8 py-4 font-medium transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#5fa8d3]/30"
            onMouseEnter={() => setHoveredButton('Begin the Journey')}
            onMouseLeave={() => setHoveredButton(null)}
          >
            <span className="relative z-10 flex items-center gap-2">
              Begin the Journey 
              <MaceIcon variant={0}/>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#62b6cb] to-[#5fa8d3] opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
          
          <Link
            href="/todaystory"
            className="group flex items-center gap-3 text-[#bee9e8] hover:text-[#62b6cb] transition-all duration-300"
            onMouseEnter={() => setHoveredButton('Today\'s Wisdom')}
            onMouseLeave={() => setHoveredButton(null)}
          >
            <ScrollText className="w-6 h-6 group-hover:rotate-6 transition-transform" />
            <span className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#62b6cb] after:transition-all after:duration-300 group-hover:after:w-full">
              Today&apos;s Wisdom
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}