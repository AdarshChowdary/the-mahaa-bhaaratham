import { Search, X } from 'lucide-react';

interface SearchComponentProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  placeholder?: string;
  showResultCount?: boolean;
  resultCount?: number;
  resultLabel?: string;
  className?: string;
  'aria-label'?: string;
  'data-search-active'?: boolean;
}

const SearchComponent = ({ 
  searchQuery, 
  setSearchQuery, 
  placeholder = "Search...",
  showResultCount = false,
  resultCount = 0,
  resultLabel = "results",
  className = "max-w-md mx-auto mb-8",
  'aria-label': ariaLabel = "Search",
  'data-search-active': dataSearchActive = false,
  ...props
}: SearchComponentProps) => {
  const hasResults = resultCount > 0;
  
  return (
    <div 
      className={className}
      role="search"
      data-search-active={dataSearchActive || !!searchQuery}
      {...props}
    >
      <div className="relative">
        <Search 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-custom-sky-blue w-4 h-4 sm:w-5 sm:h-5" 
          aria-hidden="true"
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={placeholder}
          className="bg-transparent border border-custom-sky-blue pl-10 pr-8 py-2 w-full placeholder:text-custom-sky-blue text-custom-mint focus:outline-none focus:ring-2 focus:ring-custom-sky-blue transition-all duration-300"
          aria-label={ariaLabel}
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            aria-label="Clear search"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-custom-sky-blue hover:text-custom-mint focus:outline-none transition-colors duration-300"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        )}
      </div>
      
      {showResultCount && searchQuery && (
        <div 
          className="mt-2 text-sm" 
          aria-live="polite"
        >
          {hasResults ? (
            <p className="text-custom-sky-blue">
              Found {resultCount} {resultCount === 1 ? resultLabel : `${resultLabel}s`}
            </p>
          ) : (
            <p className="text-custom-light-blue">
              No matches found. Try a different search term.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchComponent;