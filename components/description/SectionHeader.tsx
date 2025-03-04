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
        <>
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-custom-mint" />
                    <h2 className="text-2xl font-semibold text-custom-mint">
                        Section {sectionNumber}
                    </h2>
                </div>
                
                {/* Search Button - always visible */}
                <button 
                    onClick={onToggleSearch}
                    className="p-2 bg-custom-navy/80 text-custom-mint rounded-full border border-custom-mint/30 hover:bg-custom-navy active:bg-custom-blue focus:outline-none transition-all duration-300 backdrop-blur-sm shadow-lg"
                    title={isSearchOpen ? "Hide search" : "Search in section"}
                >
                    <Search className="w-5 h-5" />
                </button>
            </div>

            <div className="flex items-center gap-2 mb-6">
                <Scroll className="w-4 h-4 text-custom-skyBlue" />
                <p className="text-custom-skyBlue font-extralight">
                    {subParvaName}
                </p>
            </div>
        </>
    );
};

export default SectionHeader;