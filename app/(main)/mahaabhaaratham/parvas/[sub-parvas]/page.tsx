'use client';

import { useState, useEffect } from 'react';
import { useSubParvas } from '@/app/hooks/useQueries';
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
            />

            {(isLoading || isFetching) ? (
                <SkeletonLoader/>
            ) : subParvasData.length === 0 ? (
                <ComingSoonMessage />
            ) : filteredSubParvas.length > 0 ? (
                <SubParvaCards 
                    subParvas={filteredSubParvas} 
                    totalCount={subParvasData.length} 
                />
            ) : (
                <NoResults/>
            )}
        </PageLayout>
    );
}

// Component for "Coming Soon" message
const ComingSoonMessage = () => (
    <div className="text-center py-16">
        <h2 className="text-3xl font-bold text-custom-mint mb-4">More Parvas Coming Soon</h2>
        <p className="text-xl text-custom-sky-blue mb-6">अधिक पर्वाणि शीघ्रमेव आगमिष्यन्ति</p>
        <div className="flex items-center justify-center gap-4">
            <div className="h-[2px] w-16 bg-linear-to-r from-transparent via-custom-sky-blue to-transparent"></div>
            <MaceIcon variant={0} />
            <div className="h-[2px] w-16 bg-linear-to-r from-transparent via-custom-sky-blue to-transparent"></div>
        </div>
    </div>
);

// Component for Sub Parva Cards
const SubParvaCards = ({ subParvas, totalCount }: { subParvas: SubParvasProps[], totalCount: number }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto px-4">
        {subParvas.map((subParva, index) => (
            <div key={index} className="group">
                <Link 
                    href={`/mahaabhaaratham/parvas/${formatUrlString(subParva.parva_name)}/${formatUrlString(subParva.sub_parva_name)}/page/1`}
                    className="block"
                >
                    <div className="bg-[#1f29374d] h-48 p-6 transition-all duration-300 hover:bg-opacity-50 hover:transform hover:scale-105 border border-transparent hover:border-custom-sky-blue">
                        <div className="flex flex-col justify-between h-full">
                            <div>
                                <h3 className="text-xl font-semibold text-custom-mint mb-2 group-hover:text-white">
                                    {subParva.sub_parva_name}
                                </h3>
                                <p className="text-sm text-custom-sky-blue font-light">
                                    Sub Parva {subParva.id} of {totalCount}
                                </p>
                            </div>
                            <div className="flex justify-between items-center mt-4">
                                <span className="flex items-center gap-2 text-custom-sky-blue text-sm">Read More <MaceIcon variant={0}/></span>
                                <div className="w-8 h-8 bg-custom-sky-blue bg-opacity-20 flex items-center justify-center">
                                    <span className="text-sm">{index + 1}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        ))}
    </div>
);