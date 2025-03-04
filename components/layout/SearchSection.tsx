// components/layout/SearchSection.tsx
import SearchComponent from '@/components/SearchComponent';

interface SearchSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  placeholder?: string;
  showResultCount?: boolean;
  resultCount?: number;
  resultLabel?: string;
  className?: string;
}

const SearchSection = ({
  searchQuery,
  setSearchQuery,
  placeholder = "Search...",
  showResultCount = false,
  resultCount = 0,
  resultLabel = "results",
  className = "mb-8 relative w-full max-w-sm mx-auto"
}: SearchSectionProps) => {
  return (
    <SearchComponent
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      placeholder={placeholder}
      showResultCount={showResultCount}
      resultCount={resultCount}
      resultLabel={resultLabel}
      className={className}
    />
  );
};

export default SearchSection;