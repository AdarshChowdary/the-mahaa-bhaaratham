'use client'

import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

const ScrollToTop = () => {
    const [showScrollToTop, setShowScrollToTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollToTop(window.scrollY > 300);
        };

        // Initial check
        handleScroll();

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            {showScrollToTop && (
                <button
                    onClick={scrollToTop}
                    aria-label="Scroll to top"
                    aria-hidden={!showScrollToTop}
                    data-testid="scroll-to-top-button"
                    data-visible={showScrollToTop}
                    className="fixed right-4 sm:right-6 bottom-20 sm:bottom-6 z-40 p-2 sm:p-3 bg-gray-800/80 text-custom-mint rounded-full border border-custom-mint/30 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-custom-mint focus-visible:ring-2 transition-all duration-300 backdrop-blur-sm shadow-lg"
                >
                    <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="sr-only">Back to top</span>
                </button>
            )}
        </>
    );
};

export default ScrollToTop;