// components/SearchBar.tsx
import React from 'react';
import { Search, X, ArrowUp, ArrowDown } from 'lucide-react';

interface SearchResult {
    pageIndex: number;
    paragraphIndex: number;
    startIndex: number;
    endIndex: number;
    text: string;
}

interface SearchBarProps {
    searchQuery: string;
    searchResults: SearchResult[];
    currentSearchIndex: number;
    onQueryChange: (value: string) => void;
    onClearSearch: () => void;
    onNavigateResult: (direction: 'next' | 'prev') => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
    searchQuery,
    searchResults,
    currentSearchIndex,
    onQueryChange,
    onClearSearch,
    onNavigateResult
}) => {
    const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onQueryChange(e.target.value);
    };

    const handleRemoveQuery = () => {
        onQueryChange('');
    };

    return (
        <div className="mb-6">
            <div className="bg-custom-navy/95 backdrop-blur-sm p-3 rounded-none shadow-lg ring-1 ring-custom-skyBlue/20">
                {/* Search Bar & Close Button Row */}
                <div className="flex flex-row sm:items-center gap-3 w-full">
                    <div className="relative flex-grow">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-custom-blue w-4 h-4" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleQueryChange}
                            placeholder="Search in description..."
                            className="w-full bg-custom-navy text-custom-lightBlue rounded-none pl-10 pr-10 py-2 placeholder:text-custom-skyBlue border border-custom-blue/30 focus:border-custom-skyBlue focus:ring-2 focus:ring-custom-skyBlue focus:outline-none"
                        />
                        {searchQuery && (
                            <button 
                                onClick={handleRemoveQuery}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-custom-blue hover:text-custom-mint"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>

                    {/* Close Button */}
                    <button 
                        onClick={onClearSearch}
                        className="p-2 bg-custom-navy text-custom-skyBlue rounded-none border border-custom-skyBlue/30 hover:border-custom-mint hover:text-custom-mint"
                        title="Close search"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Search Results Summary & Navigation Row */}
                {searchResults.length > 0 && (
                    <div className="flex flex-row sm:items-center justify-between gap-3 mt-2">
                        {/* Found Results */}
                        <div className="text-sm font-medium text-custom-skyBlue pl-2">
                            <p>Found {searchResults.length} results for &quot;{searchQuery}&quot;</p>
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex items-center gap-2 bg-custom-navy px-3 py-1 rounded-none border border-[#5fa8d3]/30">
                            <button 
                                onClick={() => onNavigateResult('prev')}
                                className="p-1 text-custom-skyBlue hover:text-custom-mint"
                                title="Previous result"
                            >
                                <ArrowUp className="w-4 h-4" />
                            </button>
                            <span className="text-xs font-medium text-custom-skyBlue">
                                {currentSearchIndex + 1}/{searchResults.length}
                            </span>
                            <button 
                                onClick={() => onNavigateResult('next')}
                                className="p-1 text-custom-skyBlue hover:text-custom-mint"
                                title="Next result"
                            >
                                <ArrowDown className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchBar;