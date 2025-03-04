// components/ContentDisplay.tsx
import React from 'react';

interface SearchResult {
    pageIndex: number;
    paragraphIndex: number;
    startIndex: number;
    endIndex: number;
    text: string;
}

interface ContentDisplayProps {
    paragraphs: string[];
    startIndex: number;
    searchQuery: string;
    searchResults: SearchResult[];
    currentSearchIndex: number;
}

const ContentDisplay: React.FC<ContentDisplayProps> = ({
    paragraphs,
    startIndex,
    searchQuery,
    searchResults,
    currentSearchIndex
}) => {
    const highlightSearchResults = (text: string, paragraphIndex: number): React.ReactNode => {
        if (searchQuery.trim() === '' || !searchResults.length) {
            return text;
        }
    
        const matchingResults = searchResults.filter(
            result => result.paragraphIndex === startIndex + paragraphIndex
        );
    
        if (!matchingResults.length) {
            return text;
        }
    
        // Sort results by starting position to handle multiple matches in a paragraph
        matchingResults.sort((a, b) => a.startIndex - b.startIndex);
    
        const result: React.ReactNode[] = [];
        let lastIndex = 0;
    
        for (const match of matchingResults) {
            const startPos = match.startIndex;
            const endPos = match.endIndex;
    
            // Add text before the match
            if (startPos > lastIndex) {
                result.push(text.substring(lastIndex, startPos));
            }
    
            // Check if this match is the current search result
            const isCurrentMatch = 
                searchResults[currentSearchIndex]?.paragraphIndex === match.paragraphIndex &&
                searchResults[currentSearchIndex]?.startIndex === match.startIndex;
    
            // Add the highlighted match
            result.push(
                <span
                    key={`highlight-${startPos}`}
                    className={
                        isCurrentMatch
                            ? 'bg-custom-mint text-custom-navy font-medium px-1 rounded' // Style for current match
                            : 'bg-custom-mint/20 text-custom-mint px-1 rounded' // Style for other matches
                    }
                >
                    {text.substring(startPos, endPos)}
                </span>
            );
    
            lastIndex = endPos;
        }
    
        // Add the rest of the text
        if (lastIndex < text.length) {
            result.push(text.substring(lastIndex));
        }
    
        return result;
    };

    return (
        <div className="prose prose-invert max-w-none">
            {paragraphs.map((paragraph, index) => (
                <p
                    key={`paragraph-${startIndex + index}`}
                    data-paragraph-index={startIndex + index}
                    className="text-gray-300 text-justify leading-relaxed mb-4"
                >
                    {highlightSearchResults(paragraph, index)}
                </p>
            ))}
        </div>
    );
};

export default ContentDisplay;