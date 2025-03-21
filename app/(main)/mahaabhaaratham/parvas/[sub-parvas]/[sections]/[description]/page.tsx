'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useSectionByNumber, useAdjacentSections } from '@/hooks/useQueries';
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
import FloatingSearchNavigation from '@/components/description/FloatingSearchNavigation';

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
        isLoading: isDescriptionLoading, 
        error: descriptionError 
    } = useSectionByNumber(sectionNumber);
    
    // Fetch adjacent sections information
    const {
        data: adjacentSectionsData,
        isLoading: isAdjacentLoading,
        error: adjacentError
    } = useAdjacentSections(sectionNumber);
    
    // Combined loading state
    const isLoading = isDescriptionLoading || isAdjacentLoading;
    // Combined error state
    const error = descriptionError || adjacentError;
    
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
        console.error('Error fetching section data:', error);
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
        if (!adjacentSectionsData) return;
        
        // Get the target section based on direction
        const targetSection = direction === 'prev'
            ? adjacentSectionsData.previous
            : adjacentSectionsData.next;
            
        // If there's no target section, don't navigate
        if (!targetSection) return;
        
        // Save current page to session storage before navigating
        sessionStorage.setItem('fromPage', fromPage);
        
        // Navigate to the new section with its appropriate parva and sub-parva
        router.push(`/mahaabhaaratham/parvas/${formatUrlString(targetSection.parva_name)}/${formatUrlString(targetSection.sub_parva_name)}/${targetSection.section_number}?page=1`);
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
    // Using the current sub-parva from the actual section data, not from the URL params
    const backUrl = descriptionData ? 
        `/mahaabhaaratham/parvas/${formatUrlString(descriptionData.parva_name)}/${formatUrlString(descriptionData.sub_parva_name)}/page/${fromPage}` :
        `/mahaabhaaratham/parvas/${formatUrlString(params['sub-parvas'] as string)}/${formatUrlString(params.sections as string)}/page/1`;

    const renderDescription = () => {
        if (!descriptionData || !adjacentSectionsData) return null;

        // Determine if there are previous/next sections available
        const hasPrevious = !!adjacentSectionsData.previous;
        const hasNext = !!adjacentSectionsData.next;

        return (
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="visually-hidden" id="page-announcement" aria-live="polite"></div>
                
                <div className="bg-[#1f29374d] p-4 sm:p-6 md:p-8 rounded-lg shadow-lg backdrop-blur-xs border border-gray-700/50 relative overflow-hidden">
                    {/* Decorative corner elements */}
                    <div className="absolute top-0 left-0 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 border-t-2 border-l-2 border-custom-mint/30 rounded-tl-lg" aria-hidden="true"></div>
                    <div className="absolute top-0 right-0 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 border-t-2 border-r-2 border-custom-mint/30 rounded-tr-lg" aria-hidden="true"></div>
                    <div className="absolute bottom-0 left-0 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 border-b-2 border-l-2 border-custom-mint/30 rounded-bl-lg" aria-hidden="true"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 border-b-2 border-r-2 border-custom-mint/30 rounded-br-lg" aria-hidden="true"></div>

                    <div className="relative z-10">
                        <SectionHeader 
                            sectionNumber={descriptionData.section_number}
                            subParvaName={descriptionData.sub_parva_name}
                            isSearchOpen={isSearchOpen}
                            onToggleSearch={toggleSearch}
                        />
                        
                        {/* Search bar and related components */}
                        {isSearchOpen && (
                            <div id="search-panel">
                                <SearchBar 
                                    searchQuery={searchQuery}
                                    searchResults={searchResults}
                                    currentSearchIndex={currentSearchIndex}
                                    onQueryChange={handleSearchQueryChange}
                                    onClearSearch={clearSearch}
                                    onNavigateResult={navigateToSearchResult}
                                />
                            </div>
                        )}

                        {/* Content display with search highlighting */}
                        <section aria-label="Section content">
                            <ContentDisplay 
                                paragraphs={currentPageParagraphs}
                                startIndex={startIndex}
                                searchQuery={searchQuery}
                                searchResults={searchResults}
                                currentSearchIndex={currentSearchIndex}
                            />
                        </section>

                        {/* Pagination */}
                        <nav aria-label="Page navigation">
                            <Pagination
                                currentPage={currentPage + 1} // Convert from 0-based to 1-based for display
                                totalPages={totalPages}
                                onPageChange={(page) => navigateToPage(page - 1)} // Convert from 1-based to 0-based for internal handling
                                queryParam="page"
                            />
                        </nav>
                    </div>
                </div>
                
                {/* Section Navigation buttons (bottom) with disabled state based on availability */}
                <nav aria-label="Section navigation" className="mt-6">
                    <SectionNavigation 
                        sectionNumber={sectionNumber} 
                        onNavigate={navigateToSection}
                        hasPrevious={hasPrevious}
                        hasNext={hasNext}
                        previousInfo={adjacentSectionsData.previous}
                        nextInfo={adjacentSectionsData.next}
                    />
                </nav>

                <FloatingSearchNavigation 
                    searchQuery={searchQuery}
                    searchResults={searchResults}
                    currentSearchIndex={currentSearchIndex}
                    onNavigateResult={navigateToSearchResult}
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

            {isLoading ? (
                <div aria-live="polite" aria-busy="true">
                    <SkeletonLoader/>
                </div>
            ) : error ? (
                <div className="text-center py-8 text-red-400" aria-live="assertive">
                    <p>Error loading section data. Please try again later.</p>
                </div>
            ) : (
                renderDescription()
            )}
        </PageLayout>
    );
}