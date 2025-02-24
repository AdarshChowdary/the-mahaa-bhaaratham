"use client";

import Link from "next/link";
import { splitIntoParagraphs } from "@/utils/text-utils"; // Adjust import path as needed

export default function StoryPage() {
  const storyText = `I am (continued Sauti) acquainted with eight thousand and eight hundred verses, and so is Suka, and perhaps Sanjaya. From the mysteriousness of their meaning, O Muni, no one is able, to this day, to penetrate those closely knit difficult slokas. Even the omniscient Ganesa took a moment to consider; while Vyasa, however, continued to compose other verses in great abundance. The wisdom of this work, like unto an instrument of applying collyrium, hath opened the eyes of the inquisitive world blinded by the darkness of ignorance. As the sun dispelleth the darkness, so doth the Bharata by its discourses on religion, profit, pleasure and final release, dispel the ignorance of men. As the full-moon by its mild light expandeth the buds of the water-lily, so this Purana, by exposing the light of the Sruti hath expanded the human intellect. By the lamp of history, which destroyeth the darkness of ignorance, the whole mansion of nature is properly and completely illuminated. This work is a tree, of which the chapter of contents is the seed; the divisions called Pauloma and Astika are the root; the part called Sambhava is the trunk; the books called Sabha and Aranya are the roosting perches; the books called Arani is the knitting knots; the books called Virata and Udyoga the pith; the book named Bhishma, the main branch; the book called Drona, the leaves; the book called Karna, the fair flowers; the book named Salya, their sweet smell; the books entitled Stri and Aishika, the refreshing shade; the book called Santi, the mighty fruit; the book called Aswamedha, the immortal sap; the denominated Asramavasika, the spot where it groweth; and the book called Mausala, is an epitome of the Vedas and held in great respect by the virtuous Brahmanas. The tree of the Bharata, inexhaustible to mankind as the clouds, shall be as a source of livelihood to all distinguished poets.`;

  const paragraphs = splitIntoParagraphs(storyText);

  return (
    <main className="min-h-screen w-full bg-custom-navy flex flex-col items-center px-4 relative overflow-hidden py-10">
      
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#62b6cb]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse" />

      <div className="max-w-4xl mx-auto z-10">
        {/* Back Link */}
        <Link 
          href="/"
          className="hover-underline-animation mb-8 inline-block text-lg font-extralight"
        >
          ← Back to Home
        </Link>

        {/* Title Section */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-[#bee9e8] mb-2">
              Today&apos;s Story
            </h1>
            <div className="flex items-center justify-center gap-4 mt-4">
              <div className="h-[2px] w-16 bg-gradient-to-r from-transparent via-[#62b6cb] to-transparent"></div>
              <span className="text-[#62b6cb] font-extralight text-2xl">महाभारतं की कहानी</span>
              <div className="h-[2px] w-16 bg-gradient-to-r from-transparent via-[#62b6cb] to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Story Content */}
        <div className="flex flex-col text-[#62b6cb] text-lg font-extralight max-w-5xl m-auto text-justify px-4 gap-5 animate-fade-in">
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </main>
  );
}