import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Menu, X } from 'lucide-react';
import { SectionDetails } from '@/app/actions/getAdjacentSections';

interface SectionNavigationProps {
    sectionNumber: number;
    onNavigate: (direction: 'prev' | 'next') => void;
    hasPrevious?: boolean;
    hasNext?: boolean;
    previousInfo?: SectionDetails | null;
    nextInfo?: SectionDetails | null;
}

const SectionNavigation: React.FC<SectionNavigationProps> = ({
    sectionNumber,
    onNavigate,
    hasPrevious = true,
    hasNext = true,
    previousInfo,
    nextInfo
}) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full bg-gray-800/80 text-custom-mint border border-custom-mint/30 flex items-center justify-center shadow-lg hover:bg-gray-700 duration-300 backdrop-blur-xs focus:outline-hidden"
                aria-label="Open navigation menu"
                data-controls="Section-nav"
            >
                <Menu size={20} aria-hidden="true" />
            </button>
            
            <div 
                className={`fixed inset-0 z-50 flex items-end justify-center bg-black/50 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                role="dialog"
                aria-modal="true"
                aria-label="Section navigation"
                data-state={isOpen ? 'open' : 'closed'}
            >
                <div className="bg-gray-900 w-full max-w-lg rounded-t-xl p-6 translate-y-0 transition-transform border-t border-custom-mint/20">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-custom-mint">Section Navigation</h2>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-800 text-gray-400"
                            aria-label="Close navigation menu"
                        >
                            <X size={18} aria-hidden="true" />
                        </button>
                    </div>
                    
                    <div className="text-center mb-4">
                        <div className="text-sm text-gray-400">Current</div>
                        <div className="text-xl font-bold text-custom-mint">Section {sectionNumber}</div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={() => {
                                onNavigate('prev');
                                setIsOpen(false);
                            }}
                            disabled={!hasPrevious}
                            className={`flex items-center gap-2 px-4 py-3 rounded-full transition text-left
                                border shadow-lg focus:outline-hidden duration-300 backdrop-blur-xs
                                ${hasPrevious 
                                    ? 'bg-gray-800/80 text-custom-mint border-custom-mint/30 hover:bg-gray-700'
                                    : 'bg-gray-800/50 border-gray-600 text-gray-500 cursor-not-allowed'}`}
                            aria-label={previousInfo ? `Go to previous section ${previousInfo.section_number}` : 'Previous section'}
                            data-direction="previous"
                            data-section-number={previousInfo?.section_number}
                        >
                            <ChevronLeft size={16} aria-hidden="true" className="w-4 h-4" />
                            <div className="truncate">
                                <div className="text-sm">Previous</div>
                                {previousInfo && (
                                    <div className="text-xs text-gray-400">Section {previousInfo.section_number}</div>
                                )}
                            </div>
                        </button>
                        
                        <button
                            onClick={() => {
                                onNavigate('next');
                                setIsOpen(false);
                            }}
                            disabled={!hasNext}
                            className={`flex items-center justify-end gap-2 px-4 py-3 rounded-full transition text-right
                                border shadow-lg focus:outline-hidden duration-300 backdrop-blur-xs
                                ${hasNext 
                                    ? 'bg-gray-800/80 text-custom-mint border-custom-mint/30 hover:bg-gray-700' 
                                    : 'bg-gray-800/50 border-gray-600 text-gray-500 cursor-not-allowed'}`}
                            aria-label={nextInfo ? `Go to next section ${nextInfo.section_number}` : 'Next section'}
                            data-direction="next"
                            data-section-number={nextInfo?.section_number}
                        >
                            <div className="truncate">
                                <div className="text-sm">Next</div>
                                {nextInfo && (
                                    <div className="text-xs text-gray-400">Section {nextInfo.section_number}</div>
                                )}
                            </div>
                            <ChevronRight size={16} aria-hidden="true" className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SectionNavigation;