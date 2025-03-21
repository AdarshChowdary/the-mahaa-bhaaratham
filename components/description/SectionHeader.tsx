// components/SectionHeader.tsx
import React from 'react';
import { BookOpen, Scroll, Search } from 'lucide-react';

interface SectionHeaderProps {
    sectionNumber: number;
    subParvaName: string;
    isSearchOpen: boolean;
    onToggleSearch: () => void;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
    sectionNumber,
    subParvaName,
    isSearchOpen,
    onToggleSearch
}) => {
    return (
        <header className="mb-6">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1 sm:gap-2">
                    <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-custom-mint" aria-hidden="true" />
                    <h2 className="text-xl sm:text-2xl font-semibold text-custom-mint">
                        Section {sectionNumber}
                    </h2>
                </div>
                
                {/* Search Button - always visible */}
                <button 
                    onClick={onToggleSearch}
                    className="p-1.5 sm:p-2 bg-custom-navy/80 text-custom-mint rounded-full border border-custom-mint/30 hover:bg-custom-navy active:bg-custom-blue focus:outline-hidden transition-all duration-300 backdrop-blur-xs shadow-lg"
                    title={isSearchOpen ? "Hide search" : "Search in section"}
                    aria-label={isSearchOpen ? "Hide search" : "Search in section"}
                    aria-expanded={isSearchOpen}
                    aria-controls="search-panel"
                >
                    <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
            </div>

            <div className="flex items-center gap-1 sm:gap-2 mb-4 sm:mb-6">
                <Scroll className="w-3 h-3 sm:w-4 sm:h-4 text-custom-skyBlue" aria-hidden="true" />
                <p className="text-sm sm:text-base text-custom-skyBlue font-extralight">
                    {subParvaName}
                </p>
            </div>
        </header>
    );
};

export default SectionHeader;