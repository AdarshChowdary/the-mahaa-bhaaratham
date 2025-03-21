import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface SearchResult {
    pageIndex: number;
    paragraphIndex: number;
    startIndex: number;
    endIndex: number;
    text: string;
}

interface FloatingSearchNavigationProps {
    searchQuery: string;
    searchResults: SearchResult[];
    currentSearchIndex: number;
    onNavigateResult: (direction: 'next' | 'prev') => void;
}

const FloatingSearchNavigation: React.FC<FloatingSearchNavigationProps> = ({
    searchQuery,
    searchResults,
    currentSearchIndex,
    onNavigateResult
}) => {
    if (searchResults.length === 0 || !searchQuery) {
        return null;
    }

    return (
        <div 
            className="fixed bottom-20 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:top-2/3 md:right-4 md:-translate-y-1/2 z-50 bg-gray-800/80 backdrop-blur-sm p-2 rounded-lg shadow-lg border border-custom-mint/30 h-16 md:h-32"
            role="navigation"
            aria-label="Search results navigation"
        >
            <div className="flex flex-row md:flex-col items-center justify-center h-full gap-2 px-2">
                <button 
                    onClick={() => onNavigateResult('prev')}
                    className="p-2 text-white hover:text-custom-blue transition-colors"
                    title="Previous result"
                    aria-label={`Go to previous search result (${currentSearchIndex} of ${searchResults.length})`}
                >
                    <ArrowUp className="w-4 h-4 md:w-5 md:h-5" />
                </button>
                <span 
                    className="text-xs font-medium text-white"
                    aria-live="polite"
                >
                    {currentSearchIndex + 1}/{searchResults.length}
                </span>
                <button 
                    onClick={() => onNavigateResult('next')}
                    className="p-2 text-white hover:text-custom-blue transition-colors"
                    title="Next result"
                    aria-label={`Go to next search result (${currentSearchIndex + 2} of ${searchResults.length})`}
                >
                    <ArrowDown className="w-4 h-4 md:w-5 md:h-5" />
                </button>
            </div>
        </div>
    );
};

export default FloatingSearchNavigation;