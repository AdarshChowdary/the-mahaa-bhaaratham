'use client'

import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

const ScrollToTop = () => {
    const [showScrollToTop, setShowScrollToTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollToTop(window.scrollY > 300);
        };

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
                    className="fixed right-6 bottom-6 z-50 p-3 bg-gray-800/80 text-custom-mint rounded-full border border-custom-mint/30 hover:bg-gray-700 focus:outline-hidden transition-all duration-300 backdrop-blur-xs shadow-lg"
                >
                    <ChevronUp className="w-5 h-5" />
                </button>
            )}
        </>
    );
};

export default ScrollToTop;