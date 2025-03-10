'use client';

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import SectionItem from "@/components/sections/SectionItem";
import { useSections } from '@/app/hooks/useQueries';
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
            <BackButton
                href={`/mahaabhaaratham/parvas/${formatUrlString(currentParva)}`}
                label="Back to Sub Parvas"
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
            />

            {isLoading || isFetching ? (
                <SkeletonLoader count={10} />
            ) : sections.length > 0 ? (
                <>
                    <SectionsList 
                        sections={filteredSections} 
                        currentParva={currentParva} 
                        currentSubParva={currentSubParva}
                        currentPage={page}  // Pass the current page number
                    />
                    {total > pageSize && (
                        <Pagination
                            currentPage={page}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                            baseUrl={`/mahaabhaaratham/parvas/${formatUrlString(currentParva)}/${formatUrlString(currentSubParva)}/page`}
                        />
                    )}
                </>
            ) : (
                <NoResults/>
            )}
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
    <div className="text-center mb-12">
        <div className="mb-8">
            <h1 className="text-4xl font-bold text-custom-mint mb-2">
                Sections
            </h1>
            <div className="flex items-center justify-center gap-4 mt-4">
                <div className="h-[2px] w-16 bg-linear-to-r from-transparent via-custom-skyBlue to-transparent"></div>
                <span className="text-custom-skyBlue font-extralight text-2xl">अध्यायाः</span>
                <div className="h-[2px] w-16 bg-linear-to-r from-transparent via-custom-skyBlue to-transparent"></div>
            </div>
            <p className="text-custom-skyBlue mt-4 max-w-2xl mx-auto text-lg font-light">
                Explore <span className="font-semibold italic">{totalSections}</span> sections{' '}
                {sectionRange && (
                    <span>
                        (<span className="font-semibold italic">{sectionRange}</span>)
                    </span>
                )} of{' '}
                <span className="font-semibold italic">{subParvaName}</span>
            </p>
        </div>
    </div>
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
    <div className="grid grid-cols-1 gap-4 max-w-4xl mx-auto px-4">
        {[...Array(count)].map((_, index) => (
            <div 
                key={index}
                className="bg-[#1f29374d] bg-opacity-30 p-6 animate-pulse h-24"
            />
        ))}
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
    <div className="grid grid-cols-1 gap-4 max-w-4xl mx-auto px-4">
        {sections.map((section, index) => (
            <SectionItem
                key={index}
                sectionNumber={section.section_number}
                subParvaName={section.sub_parva_name}
                href={`/mahaabhaaratham/parvas/${formatUrlString(currentParva)}/${formatUrlString(currentSubParva)}/${section.section_number}?page=1`}
                currentPage={currentPage}  // Pass the current page to SectionItem
            />
        ))}
    </div>
);