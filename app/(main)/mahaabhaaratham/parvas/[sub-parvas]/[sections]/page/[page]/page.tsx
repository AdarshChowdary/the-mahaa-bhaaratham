'use client';

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import SectionItem from "@/components/sections/SectionItem";
import { useSections } from '@/hooks/useQueries';
import SearchComponent from "@/components/SearchComponent";
import NoResults from "@/components/NoResults";
import { formatUrlString, formatParvaName } from '@/utils/string-utils';
import PageLayout from "@/components/layout/PageLayout";
import BackButton from "@/components/layout/BackButton";
import Pagination from "@/components/Pagination";

interface SectionsProps {
    section_number: number;
    sub_parva_name: string;
}

export default function Sections() {
    const params = useParams();
    const router = useRouter();
    
    const [currentSubParva, setCurrentSubParva] = useState<string>('');
    const [currentParva, setCurrentParva] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState('');
    
    // Get page from URL params or default to 1
    const currentPage = params.page ? parseInt(params.page as string) : 1;
    const pageSize = 10;
    
    useEffect(() => {
        if (params.sections) {
            const decodedSubParva = (params.sections as string).replace(/-/g, ' ');
            setCurrentSubParva(decodedSubParva);
            setCurrentParva((params['sub-parvas'] as string).replace(/-/g, ' '));
        }
    }, [params.sections, params['sub-parvas']]);
    
    // Use isFetching state to handle loading transitions better
    const { 
        data: sectionsData, 
        isLoading,
        isFetching, 
        error 
    } = useSections(currentSubParva, currentPage, pageSize);

    // Default empty data structure to avoid errors during loading
    const defaultData = {
        sections: [],
        total: 0,
        page: currentPage,
        pageSize: pageSize,
        totalPages: 0
    };

    // Use non-null assertion or properly type the data
    const {
        sections = [],
        total = 0,
        page = currentPage,
        totalPages = 0
    } = sectionsData || defaultData;

    // Filter sections based on search query
    const filteredSections = sections.filter(section =>
        section.section_number.toString().includes(searchQuery)
    );

    // Handle page change
    const handlePageChange = (newPage: number) => {
        // Navigate to the new page using Next.js router
        router.push(`/mahaabhaaratham/parvas/${formatUrlString(currentParva)}/${formatUrlString(currentSubParva)}/page/${newPage}`);
    };

    // Handle errors
    if (error) {
        console.error('Error fetching sections:', error);
    }

    return (
        <PageLayout>
            <div className="w-full px-4 md:px-6 lg:px-8">
                <BackButton
                    href={`/mahaabhaaratham/parvas/${formatUrlString(currentParva)}`}
                    label="Back to Sub Parvas"
                    aria-label={`Return to ${formatParvaName(currentParva)} sub parvas listing`}
                />

                <SectionsHeader 
                    subParvaName={formatParvaName(currentSubParva)}
                    totalSections={total}
                    sectionRange={getSectionRange(sections)}
                />

                <SearchComponent
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    placeholder="Search by section number..."
                    showResultCount={true}
                    resultCount={filteredSections.length}
                    resultLabel="Section"
                    aria-label="Search sections by number"
                    aria-controls="sections-list"
                />

                {isLoading || isFetching ? (
                    <div aria-live="polite" aria-busy="true">
                        <SkeletonLoader count={10} />
                    </div>
                ) : sections.length > 0 ? (
                    <>
                        <SectionsList 
                            sections={filteredSections} 
                            currentParva={currentParva} 
                            currentSubParva={currentSubParva}
                            currentPage={page}
                        />
                        {total > pageSize && (
                            <Pagination
                                currentPage={page}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                                baseUrl={`/mahaabhaaratham/parvas/${formatUrlString(currentParva)}/${formatUrlString(currentSubParva)}/page`}
                                aria-label="Section pagination"
                            />
                        )}
                    </>
                ) : (
                    <div aria-live="polite">
                        <NoResults aria-label="No sections found" />
                    </div>
                )}
            </div>
        </PageLayout>
    );
}

// Sections Header Component
const SectionsHeader = ({ 
    subParvaName, 
    totalSections, 
    sectionRange 
}: { 
    subParvaName: string, 
    totalSections: number, 
    sectionRange: string 
}) => (
    <header className="text-center mb-8 md:mb-12">
        <div className="mb-4 md:mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-custom-mint mb-2">
                Sections
            </h1>
            <div className="flex items-center justify-center gap-2 md:gap-4 mt-2 md:mt-4">
                <div className="h-[2px] w-8 md:w-16 bg-linear-to-r from-transparent via-custom-skyBlue to-transparent"></div>
                <span className="text-xl md:text-2xl text-custom-skyBlue font-extralight">अध्यायाः</span>
                <div className="h-[2px] w-8 md:w-16 bg-linear-to-r from-transparent via-custom-skyBlue to-transparent"></div>
            </div>
            <p className="text-custom-skyBlue mt-3 md:mt-4 max-w-2xl mx-auto text-base md:text-lg font-light px-4">
                Explore <span className="font-semibold italic">{totalSections}</span> sections{' '}
                {sectionRange && (
                    <span>
                        (<span className="font-semibold italic">{sectionRange}</span>)
                    </span>
                )} of{' '}
                <span className="font-semibold italic">{subParvaName}</span>
            </p>
        </div>
    </header>
);

// Get Section Range Helper
const getSectionRange = (sections: SectionsProps[]): string => {
    if (!sections.length) return '';
    
    const sectionNumbers = sections.map(section => section.section_number);
    const minSection = Math.min(...sectionNumbers);
    const maxSection = Math.max(...sectionNumbers);
    
    return `${minSection} - ${maxSection} `;
};

// Skeleton Loader Component
const SkeletonLoader = ({ count }: { count: number }) => (
    <div className="grid grid-cols-1 gap-3 md:gap-4 max-w-4xl mx-auto px-2 md:px-4" 
         role="status" 
         aria-label="Loading sections">
        {[...Array(count)].map((_, index) => (
            <div 
                key={index}
                className="bg-[#1f29374d] bg-opacity-30 p-4 md:p-6 animate-pulse h-16 md:h-24 rounded"
                aria-hidden="true"
            />
        ))}
        <span className="sr-only">Loading sections...</span>
    </div>
);

// Sections List Component
const SectionsList = ({ 
    sections, 
    currentParva, 
    currentSubParva,
    currentPage 
}: { 
    sections: SectionsProps[], 
    currentParva: string, 
    currentSubParva: string,
    currentPage: number
}) => (
    <div 
        id="sections-list"
        className="grid grid-cols-1 gap-3 md:gap-4 max-w-4xl mx-auto px-2 md:px-4"
        role="list"
        aria-label={`Sections of ${formatParvaName(currentSubParva)}`}
    >
        {sections.map((section, index) => (
            <SectionItem
                key={index}
                sectionNumber={section.section_number}
                subParvaName={section.sub_parva_name}
                href={`/mahaabhaaratham/parvas/${formatUrlString(currentParva)}/${formatUrlString(currentSubParva)}/${section.section_number}?page=1`}
                currentPage={currentPage}
                aria-label={`Section ${section.section_number}`}
                data-section-number={section.section_number}
                data-parva-name={formatParvaName(currentParva)}
                data-sub-parva-name={formatParvaName(currentSubParva)}
            />
        ))}
    </div>
);