'use client'

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from 'next/link';
import { getSections } from '@/app/actions/sections';
import MaceIcon from "@/components/Mace";
import SearchComponent from "@/components/SearchComponent";
import NoResults from "@/components/NoResults";
import { formatUrlString, formatParvaName } from '@/utils/string-utils';

interface SectionsProps {
    section_number: number;
    sub_parva_name: string;
}

interface PaginationData {
    sections: SectionsProps[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}

export default function Sections() {
    const params = useParams();
    const [sectionsData, setSectionsData] = useState<PaginationData>({
        sections: [],
        total: 0,
        page: 1,
        pageSize: 10,
        totalPages: 0
    });
    const [isLoading, setIsLoading] = useState(false);
    const [currentSubParva, setCurrentSubParva] = useState<string>('');
    const [currentParva, setCurrentParva] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    
    useEffect(() => {
        if (params.sections) {
            const decodedSubParva = (params.sections as string).replace(/-/g, ' ');
            setCurrentSubParva(decodedSubParva);
            setCurrentParva((params['sub-parvas'] as string).replace(/-/g, ' '));
            fetchSections(decodedSubParva, currentPage);
        }
    }, [params.sections, currentPage]);
    
    const fetchSections = async (subParvaName: string, page: number) => {
        setIsLoading(true);
        try {
            const data = await getSections(subParvaName, page);
            setSectionsData(data);
        } catch (err) {
            console.error('Fetch error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const getSectionRange = () => {
        if (!sectionsData.sections.length) return '';
        
        const sectionNumbers = sectionsData.sections.map(section => section.section_number);
        const minSection = Math.min(...sectionNumbers);
        const maxSection = Math.max(...sectionNumbers);
        
        return `${minSection} - ${maxSection} `;
    };

    const filteredSections = sectionsData.sections.filter(section =>
        section.section_number.toString().includes(searchQuery)
    );

    const renderPagination = () => {
        const { page, totalPages } = sectionsData;
        return (
            <div className="flex justify-center space-x-2 mt-6">
                <button 
                    onClick={() => setCurrentPage(page - 1)} 
                    disabled={page === 1}
                    className="px-4 py-2 bg-gray-800 text-custom-skyBlue disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="px-4 py-2 text-custom-skyBlue">
                    Page {page} of {totalPages}
                </span>
                <button 
                    onClick={() => setCurrentPage(page + 1)} 
                    disabled={page === totalPages}
                    className="px-4 py-2 bg-gray-800 text-custom-skyBlue disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        );
    };

    const renderSearchBar = () => (
        <SearchComponent
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            placeholder="Search by section number..."
            showResultCount={true}
            resultCount={filteredSections.length}
            resultLabel="Section"
        />
    );

    const renderSkeletonLoader = () => (
        <div className="grid grid-cols-1 gap-4 max-w-4xl mx-auto px-4">
            {[...Array(10)].map((_, index) => (
                <div 
                    key={index}
                    className="bg-gray-800 bg-opacity-30 p-6 animate-pulse h-24"
                />
            ))}
        </div>
    );

    const renderSections = () => (
        <div className="grid grid-cols-1 gap-4 max-w-4xl mx-auto px-4">
            {filteredSections.map((section, index) => (
                <Link
                    href={`/mahaabhaaratham/parvas/${formatUrlString(currentParva)}/${formatUrlString(currentSubParva)}/${section.section_number}`}
                    key={index}
                >
                    <div className="bg-gray-800 bg-opacity-30 p-6 h-24 transition-all duration-300 hover:bg-opacity-50 hover:transform hover:scale-105 border border-transparent hover:border-custom-skyBlue">
                        <div className="h-full flex items-center justify-between">
                            <div className="flex items-center space-x-6">
                                <div>
                                    <h3 className="text-xl font-semibold text-custom-mint">
                                        Section {section.section_number}
                                    </h3>
                                    <p className="text-custom-skyBlue font-extralight">
                                        {section.sub_parva_name}
                                    </p>
                                </div>
                            </div>
                            <span className="flex items-center gap-2 text-custom-skyBlue">Read <MaceIcon variant={0}/></span>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );

    const renderNoResults = () => (
        <NoResults/>
    );

    return (
        <div className="min-h-screen bg-custom-navy text-custom-mint py-10">
            <div className="max-w-4xl mx-auto px-4">
                <Link 
                    href={`/mahaabhaaratham/parvas/${currentParva.toLowerCase().replace(/\s+/g, '-')}`}
                    className="hover-underline-animation text-lg font-extralight mb-8 inline-block"
                >
                    ← Back to Sub Parvas
                </Link>

                <div className="text-center mb-12">
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-custom-mint mb-2">
                            Sections
                        </h1>
                        <div className="flex items-center justify-center gap-4 mt-4">
                            <div className="h-[2px] w-16 bg-gradient-to-r from-transparent via-custom-skyBlue to-transparent"></div>
                            <span className="text-custom-skyBlue font-extralight text-2xl">अध्यायाः</span>
                            <div className="h-[2px] w-16 bg-gradient-to-r from-transparent via-custom-skyBlue to-transparent"></div>
                        </div>
                        <p className="text-custom-skyBlue mt-4 max-w-2xl mx-auto text-lg font-light">
                            Explore <span className="font-semibold italic">{sectionsData.total}</span> sections{' '}
                            {sectionsData.sections.length > 0 && (
                                <span>
                                    (<span className="font-semibold italic">{getSectionRange()}</span>)
                                </span>
                            )} of{' '}
                            <span className="font-semibold italic">{formatParvaName(currentSubParva)}</span>
                        </p>
                    </div>
                </div>

                {renderSearchBar()}

                {isLoading ? (
                    renderSkeletonLoader()
                ) : sectionsData.sections.length > 0 ? (
                    <>
                        {renderSections()}
                        {sectionsData.total > 10 && renderPagination()}
                    </>
                ) : (
                    renderNoResults()
                )}
            </div>
        </div>
    );
}