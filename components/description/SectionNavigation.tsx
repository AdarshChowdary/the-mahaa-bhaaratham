// components/SectionNavigation.tsx
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SectionNavigationProps {
    sectionNumber: number;
    onNavigate: (direction: 'prev' | 'next') => void;
}

const SectionNavigation: React.FC<SectionNavigationProps> = ({
    sectionNumber,
    onNavigate
}) => {
    return (
        <div className="flex flex-col-reverse sm:flex-row justify-between mt-8 mb-2 gap-2 sm:gap-0">
            <button
                onClick={() => onNavigate('prev')}
                disabled={sectionNumber <= 1}
                className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md transition-all duration-300 ${
                    sectionNumber <= 1 
                        ? 'bg-gray-800/50 text-gray-500 cursor-not-allowed' 
                        : 'bg-custom-navy/80 text-custom-mint hover:bg-custom-navy active:bg-custom-blue border border-custom-mint/30'
                }`}
            >
                <ChevronLeft className="w-5 h-5" />
                <span>Previous Section</span>
            </button>

            <button
                onClick={() => onNavigate('next')}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-custom-navy/80 text-custom-mint rounded-md border border-custom-mint/30 hover:bg-custom-navy active:bg-custom-blue transition-all duration-300"
            >
                <span>Next Section</span>
                <ChevronRight className="w-5 h-5" />
            </button>
        </div>
    );
};

export default SectionNavigation;