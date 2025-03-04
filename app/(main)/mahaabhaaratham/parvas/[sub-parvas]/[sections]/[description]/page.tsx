'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useSectionByNumber } from '@/app/hooks/useQueries';
import { splitIntoParagraphs } from '@/utils/text-utils';
import BackButton from '@/components/layout/BackButton';
import PageHeader from '@/components/layout/PageHeader';
import PageLayout from '@/components/layout/PageLayout';
import SkeletonLoader from '@/components/description/SkeletonLoader';
import Pagination from '@/components/Pagination';
import { formatUrlString } from '@/utils/string-utils';
import SearchBar from '@/components/description/SearchBar';
import SectionHeader from '@/components/description/SectionHeader';
import SectionNavigation from '@/components/description/SectionNavigation';
import ContentDisplay from '@/components/description/ContentDisplay';

interface SearchResult {
    pageIndex: number;
    paragraphIndex: number;
    startIndex: number;
    endIndex: number;
    text: string;
}

export default function Description() {
    const params = useParams();
    const router = useRouter();
    const searchParams = useSearchParams();
    
    const sectionNumber = params.description ? Number(params.description) : 0;
    const pageParam = searchParams.get('page');
    const currentPage = pageParam ? parseInt(pageParam) - 1 : 0; // Convert to zero-based index internally
    
    // Get fromPage from sessionStorage instead of URL
    const [fromPage, setFromPage] = useState<string>('1');
    
    // Search related states
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [currentSearchIndex, setCurrentSearchIndex] = useState(0);
    
    // Use the hook to fetch data with caching
    const { 
        data: descriptionData, 
        isLoading, 
        error 
    } = useSectionByNumber(sectionNumber);
    
    // Split description into pages
    const paragraphs = descriptionData ? splitIntoParagraphs(descriptionData.description) : [];
    const paragraphsPerPage = 3;
    const totalPages = Math.ceil(paragraphs.length / paragraphsPerPage);

    // Get the paragraphs for the current page
    const startIndex = currentPage * paragraphsPerPage;
    const endIndex = startIndex + paragraphsPerPage;
    const currentPageParagraphs = paragraphs.slice(startIndex, endIndex);

    // Handle errors
    if (error) {
        console.error('Error fetching section description:', error);
    }

    // Retrieve fromPage from sessionStorage on component mount
    useEffect(() => {
        const storedFromPage = sessionStorage.getItem('fromPage');
        if (storedFromPage) {
            setFromPage(storedFromPage);
        }
    }, []);

    // This effect handles URL changes and ensures we're on a valid page
    useEffect(() => {
        if (totalPages > 0 && currentPage >= totalPages) {
            navigateToPage(totalPages - 1);
        }
    }, [totalPages, currentPage]);

    const navigateToPage = (pageNumber: number) => {
        // Create the new URL with updated query parameters
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', (pageNumber + 1).toString()); // Convert to 1-based for URL
                
        // Use Next.js router to navigate while preserving other params
        router.push(`?${params.toString()}`);
    };

    // Navigate to previous or next section
    const navigateToSection = (direction: 'prev' | 'next') => {
        if (!descriptionData) return;
        
        const targetSectionNumber = direction === 'prev' 
            ? sectionNumber - 1 
            : sectionNumber + 1;
            
        // Save current page to session storage before navigating
        sessionStorage.setItem('fromPage', fromPage);
        
        // Navigate to the new section, reset to page 1
        router.push(`/mahaabhaaratham/parvas/${formatUrlString(params['sub-parvas'] as string)}/${formatUrlString(params.sections as string)}/${targetSectionNumber}?page=1`);
    };

    const performSearch = (query: string) => {
        if (!descriptionData || query.trim() === '') return;

        const results: SearchResult[] = [];
        const lowercaseQuery = query.toLowerCase();

        paragraphs.forEach((paragraph, paragraphIndex) => {
            const pageIndex = Math.floor(paragraphIndex / paragraphsPerPage);
            let startPos = 0;
            let position = paragraph.toLowerCase().indexOf(lowercaseQuery, startPos);

            while (position !== -1) {
                results.push({
                    pageIndex,
                    paragraphIndex,
                    startIndex: position,
                    endIndex: position + query.length,
                    text: paragraph.substring(
                        Math.max(0, position - 30), 
                        Math.min(paragraph.length, position + query.length + 30)
                    )
                });
                startPos = position + 1;
                position = paragraph.toLowerCase().indexOf(lowercaseQuery, startPos);
            }
        });

        setSearchResults(results);
        setCurrentSearchIndex(0);
        
        // Navigate to the first result if there are any
        if (results.length > 0) {
            navigateToPage(results[0].pageIndex);
        }
    };

    const navigateToSearchResult = (direction: 'next' | 'prev') => {
        if (searchResults.length === 0) return;
    
        let newIndex;
        if (direction === 'next') {
            newIndex = (currentSearchIndex + 1) % searchResults.length;
        } else {
            newIndex = (currentSearchIndex - 1 + searchResults.length) % searchResults.length;
        }
    
        setCurrentSearchIndex(newIndex);
        navigateToPage(searchResults[newIndex].pageIndex);
    
        // Scroll to the current match
        setTimeout(() => {
            const paragraphElement = document.querySelector(
                `p[data-paragraph-index="${searchResults[newIndex].paragraphIndex}"]`
            );
            if (paragraphElement) {
                paragraphElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 100);
    };

    const handleSearchQueryChange = (value: string) => {
        setSearchQuery(value);
        if (value.trim() === '') {
            setSearchResults([]);
            return;
        }
        performSearch(value);
    };

    const clearSearch = () => {
        setSearchQuery('');
        setSearchResults([]);
        setIsSearchOpen(false);
    };
    
    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
    };

    // Build the back URL with the correct page number from the sections page
    const backUrl = descriptionData ? 
        `/mahaabhaaratham/parvas/${formatUrlString(params['sub-parvas'] as string)}/${formatUrlString(params.sections as string)}/page/${fromPage}` :
        `/mahaabhaaratham/parvas/${formatUrlString(params['sub-parvas'] as string)}/${formatUrlString(params.sections as string)}/page/1`;

    const renderDescription = () => {
        if (!descriptionData) return null;

        return (
            <div className="max-w-3xl mx-auto px-4">
                
                <div className="bg-gray-800/30 p-8 rounded-lg shadow-lg backdrop-blur-sm border border-gray-700/50 relative overflow-hidden">
                    {/* Decorative corner elements */}
                    <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-custom-mint/30 rounded-tl-lg"></div>
                    <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-custom-mint/30 rounded-tr-lg"></div>
                    <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-custom-mint/30 rounded-bl-lg"></div>
                    <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-custom-mint/30 rounded-br-lg"></div>

                    <div className="relative z-10">
                        <SectionHeader 
                            sectionNumber={descriptionData.section_number}
                            subParvaName={descriptionData.sub_parva_name}
                            isSearchOpen={isSearchOpen}
                            onToggleSearch={toggleSearch}
                        />
                        
                        {/* Search bar and related components */}
                        {isSearchOpen && (
                            <SearchBar 
                                searchQuery={searchQuery}
                                searchResults={searchResults}
                                currentSearchIndex={currentSearchIndex}
                                onQueryChange={handleSearchQueryChange}
                                onClearSearch={clearSearch}
                                onNavigateResult={navigateToSearchResult}
                            />
                        )}

                        {/* Content display with search highlighting */}
                        <ContentDisplay 
                            paragraphs={currentPageParagraphs}
                            startIndex={startIndex}
                            searchQuery={searchQuery}
                            searchResults={searchResults}
                            currentSearchIndex={currentSearchIndex}
                        />

                        {/* Pagination */}
                        <Pagination
                            currentPage={currentPage + 1} // Convert from 0-based to 1-based for display
                            totalPages={totalPages}
                            onPageChange={(page) => navigateToPage(page - 1)} // Convert from 1-based to 0-based for internal handling
                            queryParam="page"
                        />
                    </div>
                </div>
                
                {/* Section Navigation buttons (bottom) */}
                <SectionNavigation 
                    sectionNumber={sectionNumber} 
                    onNavigate={navigateToSection} 
                />
            </div>
        );
    };

    return (
        <PageLayout>
            <BackButton
                href={backUrl}
                label='Back to Sections'
            />

            <PageHeader
                title="Section Description"
                subtitle='विवरणम्'
            />

            {isLoading ? <SkeletonLoader/> : renderDescription()}
        </PageLayout>
    );
}