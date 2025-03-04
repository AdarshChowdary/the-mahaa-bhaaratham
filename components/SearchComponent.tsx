import { Search, X } from 'lucide-react';

interface SearchComponentProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  placeholder?: string;
  showResultCount?: boolean;
  resultCount?: number;
  resultLabel?: string;
  className?: string;
}

const SearchComponent = ({ 
  searchQuery, 
  setSearchQuery, 
  placeholder = "Search...",
  showResultCount = false,
  resultCount = 0,
  resultLabel = "results",
  className = "max-w-md mx-auto mb-8"
}: SearchComponentProps) => {
  return (
    <div className={className}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-custom-skyBlue w-5 h-5" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={placeholder}
          className="bg-transparent border border-custom-skyBlue px-10 py-2 w-full placeholder:text-custom-skyBlue text-custom-mint focus:outline-none focus:ring-2 focus:ring-custom-skyBlue transition-all duration-300"
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            aria-label="Clear search"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-custom-skyBlue hover:text-custom-mint focus:outline-none transition-colors duration-300"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
      {showResultCount && searchQuery && (
        <p className="text-custom-skyBlue mt-2 text-sm">
          Found {resultCount} {`${resultLabel}(s)`}
        </p>
      )}
      
      {showResultCount && searchQuery && resultCount === 0 && (
        <p className="text-custom-lightBlue mt-2 text-sm">
          No matches found. Try a different search term.
        </p>
      )}
    </div>
  );
};

export default SearchComponent;