'use client';

import { useState, useEffect } from 'react';
import { getSubParvas } from '@/app/actions/sub-parvas';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import MaceIcon from '@/components/Mace';
import SearchComponent from '@/components/SearchComponent';
import NoResults from '@/components/NoResults';
import { formatUrlString } from '@/utils/string-utils';

interface SubParvasProps {
    id: number;
    sub_parva_name: string;
    parva_name: string;
}

export default function SubParvas() {
    const params = useParams();
    const [subParvasData, setSubParvasData] = useState<SubParvasProps[]>([]);
    const [isLoading, setIsLoading] = useState(false);
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
            fetchSubParvas(capitalizedParva);
        }
    }, [params['sub-parvas']]);

    const fetchSubParvas = async (parvaName: string) => {
        setIsLoading(true);
        try {
            const data = await getSubParvas(parvaName);
            setSubParvasData(data);
        } catch (err) {
            console.error('Fetch error:', err);
            setSubParvasData([]);
        } finally {
            setIsLoading(false);
        }
    };

    const filteredSubParvas = subParvasData.filter(subParva =>
        subParva.sub_parva_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderSearchBar = () => (
        <SearchComponent
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            placeholder="Search Sub Parvas..."
            showResultCount={true}
            resultCount={filteredSubParvas.length}
            resultLabel="Sub Parva"
        />
    );

    const renderSkeletonLoader = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto px-4">
            {[...Array(8)].map((_, index) => (
                <div 
                    key={index}
                    className="bg-gray-800 bg-opacity-30 animate-pulse h-48"
                />
            ))}
        </div>
    );

    const renderComingSoon = () => (
        <div className="text-center py-16">
            <h2 className="text-3xl font-bold text-custom-mint mb-4">More Parvas Coming Soon</h2>
            <p className="text-xl text-custom-skyBlue mb-6">अधिक पर्वाणि शीघ्रमेव आगमिष्यन्ति</p>
            <div className="flex items-center justify-center gap-4">
                <div className="h-[2px] w-16 bg-gradient-to-r from-transparent via-custom-skyBlue to-transparent"></div>
                <MaceIcon variant={0} />
                <div className="h-[2px] w-16 bg-gradient-to-r from-transparent via-custom-skyBlue to-transparent"></div>
            </div>
        </div>
    );

    const renderSubParvaCards = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto px-4">
            {filteredSubParvas.map((subParva, index) => (
                <div key={index} className="group">
                    <Link 
                        href={`/mahaabhaaratham/parvas/${formatUrlString(subParva.parva_name)}/${formatUrlString(subParva.sub_parva_name)}`}
                        className="block"
                    >
                        <div className="bg-gray-800 bg-opacity-30 h-48 p-6 transition-all duration-300 hover:bg-opacity-50 hover:transform hover:scale-105 border border-transparent hover:border-custom-skyBlue">
                            <div className="flex flex-col justify-between h-full">
                                <div>
                                    <h3 className="text-xl font-semibold text-custom-mint mb-2 group-hover:text-white">
                                        {subParva.sub_parva_name}
                                    </h3>
                                    <p className="text-sm text-custom-skyBlue font-light">
                                        Sub Parva {subParva.id} of {subParvasData.length}
                                    </p>
                                </div>
                                <div className="flex justify-between items-center mt-4">
                                    <span className="flex items-center gap-2 text-custom-skyBlue text-sm">Read More <MaceIcon variant={0}/></span>
                                    <div className="w-8 h-8 bg-custom-skyBlue bg-opacity-20 flex items-center justify-center">
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

    const renderNoResults = () => (
        <NoResults/>
    );

    return (
        <div className="min-h-screen bg-custom-navy text-custom-mint py-10">
            <div className="max-w-4xl mx-auto px-4">
                <Link 
                    href="/mahaabhaaratham/parvas"
                    className="hover-underline-animation mb-8 inline-block text-lg font-extralight"
                >
                    ← Back to Parvas
                </Link>

                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-custom-mint mb-2">{currentParva}</h1>
                    <div className="flex items-center justify-center gap-4 mt-4">
                        <div className="h-[2px] w-16 bg-gradient-to-r from-transparent via-custom-skyBlue to-transparent"></div>
                        <span className="text-custom-skyBlue font-extralight text-lg">उप पर्वाणि</span>
                        <div className="h-[2px] w-16 bg-gradient-to-r from-transparent via-custom-skyBlue to-transparent"></div>
                    </div>
                </div>
                
                {renderSearchBar()}

                {isLoading ? (
                    renderSkeletonLoader()
                ) : subParvasData.length === 0 ? (
                    renderComingSoon()
                ) : filteredSubParvas.length > 0 ? (
                    <>
                        {renderSubParvaCards()}
                    </>
                ) : (
                    renderNoResults()
                )}
            </div>
        </div>
    );
}