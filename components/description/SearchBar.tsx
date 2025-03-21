// components/SearchBar.tsx
import React, { useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';

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
    onQueryChange,
    onClearSearch,
}) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // Focus the input when component mounts
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onQueryChange(e.target.value);
    };

    const handleRemoveQuery = () => {
        onQueryChange('');
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    return (
        <div className="mb-4 sm:mb-6" role="search">
            <div className="bg-custom-navy/95 backdrop-blur-xs p-2 sm:p-3 rounded-none shadow-lg ring-1 ring-custom-skyBlue/20">
                {/* Search Bar & Close Button Row */}
                <div className="flex flex-row items-center gap-2 sm:gap-3 w-full">
                    <div className="relative grow">
                        <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-custom-blue w-4 h-4" />
                        <input
                            ref={inputRef}
                            type="text"
                            value={searchQuery}
                            onChange={handleQueryChange}
                            placeholder="Search in description..."
                            className="w-full bg-custom-navy text-custom-lightBlue rounded-none pl-8 sm:pl-10 pr-8 sm:pr-10 py-1.5 sm:py-2 text-sm sm:text-base placeholder:text-custom-skyBlue border border-custom-blue/30 focus:border-custom-skyBlue focus:ring-2 focus:ring-custom-skyBlue focus:outline-hidden"
                            aria-label="Search in description"
                            aria-expanded={searchResults.length > 0}
                            aria-controls="search-results"
                        />
                        {searchQuery && (
                            <button 
                                onClick={handleRemoveQuery}
                                className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-custom-blue hover:text-custom-mint"
                                aria-label="Clear search"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>

                    {/* Close Button */}
                    <button 
                        onClick={onClearSearch}
                        className="p-1.5 sm:p-2 bg-custom-navy text-custom-skyBlue rounded-none border border-custom-skyBlue/30 hover:border-custom-mint hover:text-custom-mint"
                        title="Close search"
                        aria-label="Close search"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Search Results Summary & Navigation Row */}
                {searchResults.length > 0 && (
                    <div className="flex flex-row items-center justify-between gap-3 mt-2" id="search-results">
                        {/* Found Results */}
                        <div className="text-xs sm:text-sm font-medium text-custom-skyBlue pl-2" aria-live="polite">
                            <p>Found {searchResults.length} results for &quot;{searchQuery}&quot;</p>
                        </div>
                    </div>
                )}
                {searchQuery && searchResults.length === 0 && (
                    <div className="text-xs sm:text-sm font-medium text-custom-skyBlue pl-2 mt-2" aria-live="polite">
                        <p>No results found for &quot;{searchQuery}&quot;</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchBar;