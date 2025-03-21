'use client';

import { useState, useEffect } from 'react';
import { useSubParvas } from '@/hooks/useQueries';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import MaceIcon from '@/components/Mace';
import SearchComponent from '@/components/SearchComponent';
import NoResults from '@/components/NoResults';
import { formatUrlString } from '@/utils/string-utils';
import BackButton from '@/components/layout/BackButton';
import PageHeader from '@/components/layout/PageHeader';
import SkeletonLoader from '@/components/SkeletonLoader';
import PageLayout from '@/components/layout/PageLayout';

interface SubParvasProps {
    id: number;
    sub_parva_name: string;
    parva_name: string;
}

export default function SubParvas() {
    const params = useParams();
    const [currentParva, setCurrentParva] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (params['sub-parvas']) {
            const decodedParva = params['sub-parvas'] as string;
            const normalizedParva = decodedParva.replace(/-/g, ' ');
            const capitalizedParva = normalizedParva.split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");
            setCurrentParva(capitalizedParva);
        }
    }, [params['sub-parvas']]);

    // Use the hook to fetch data with caching
    const { data: subParvasData = [], isLoading, isFetching, error } = useSubParvas(currentParva);

    // Filter sub parvas based on search query
    const filteredSubParvas = subParvasData.filter(subParva =>
        subParva.sub_parva_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Handle errors
    if (error) {
        console.error('Error fetching sub parvas:', error);
    }

    return (
        <PageLayout>
            <BackButton 
                href='/mahaabhaaratham/parvas'
                label='Back to Parvas'
            />

            <PageHeader 
                title={`Sub Parvas of ${currentParva}`}
                subtitle="उप पर्वाणि"
            />
            
            <SearchComponent
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                placeholder="Search Sub Parvas..."
                showResultCount={true}
                resultCount={filteredSubParvas.length}
                resultLabel="Sub Parva"
                aria-label="Search for Sub Parvas"
                aria-controls="sub-parva-grid"
            />

            <main id="sub-parva-grid" aria-live="polite" aria-busy={isLoading || isFetching}>
                {(isLoading || isFetching) ? (
                    <SkeletonLoader count={9} />
                ) : subParvasData.length === 0 ? (
                    <ComingSoonMessage />
                ) : filteredSubParvas.length > 0 ? (
                    <SubParvaCards 
                        subParvas={filteredSubParvas} 
                        totalCount={subParvasData.length} 
                    />
                ) : (
                    <NoResults />
                )}
            </main>
        </PageLayout>
    );
}

// Component for "Coming Soon" message
const ComingSoonMessage = () => (
    <div className="text-center py-8 sm:py-12 md:py-16" role="status" aria-label="Coming Soon Message">
        <h2 className="text-2xl sm:text-3xl font-bold text-custom-mint mb-2 sm:mb-4">More Parvas Coming Soon</h2>
        <p className="text-lg sm:text-xl text-custom-sky-blue mb-4 sm:mb-6">अधिक पर्वाणि शीघ्रमेव आगमिष्यन्ति</p>
        <div className="flex items-center justify-center gap-2 sm:gap-4">
            <div className="h-[2px] w-8 sm:w-16 bg-linear-to-r from-transparent via-custom-sky-blue to-transparent"></div>
            <MaceIcon variant={0} className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
            <div className="h-[2px] w-8 sm:w-16 bg-linear-to-r from-transparent via-custom-sky-blue to-transparent"></div>
        </div>
    </div>
);

// Component for Sub Parva Cards
const SubParvaCards = ({ subParvas, totalCount }: { subParvas: SubParvasProps[], totalCount: number }) => (
    <div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto px-4"
        role="list"
        aria-label="List of Sub Parvas"
        data-testid="sub-parva-grid"
        data-total-sub-parvas={totalCount}
    >
        {subParvas.map((subParva, index) => (
            <div key={index} className="group" role="listitem">
                <Link 
                    href={`/mahaabhaaratham/parvas/${formatUrlString(subParva.parva_name)}/${formatUrlString(subParva.sub_parva_name)}/page/1`}
                    className="block"
                    aria-label={`View ${subParva.sub_parva_name}, Sub Parva ${subParva.id} of ${totalCount}`}
                    data-sub-parva-id={subParva.id}
                    data-sub-parva-name={subParva.sub_parva_name}
                >
                    <div className="bg-[#1f29374d] h-36 sm:h-40 md:h-48 p-4 sm:p-5 md:p-6 transition-all duration-300 hover:bg-opacity-50 hover:transform hover:scale-105 border border-transparent hover:border-custom-sky-blue">
                        <div className="flex flex-col justify-between h-full">
                            <div>
                                <h3 className="text-lg sm:text-xl font-semibold text-custom-mint mb-2 group-hover:text-white">
                                    {subParva.sub_parva_name}
                                </h3>
                                <p className="text-xs sm:text-sm text-custom-sky-blue font-light">
                                    Sub Parva {subParva.id} of {totalCount}
                                </p>
                            </div>
                            <div className="flex justify-between items-center mt-4">
                                <span className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-custom-sky-blue">
                                    Read More <MaceIcon variant={0} className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" aria-hidden="true" />
                                </span>
                                <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-custom-sky-blue bg-opacity-20 flex items-center justify-center" aria-hidden="true">
                                    <span className="text-xs sm:text-sm">{index + 1}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        ))}
    </div>
);