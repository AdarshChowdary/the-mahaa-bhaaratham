'use client';

import { useState, useEffect } from 'react';
import { getParvas } from '@/app/actions/parvas';
import Link from 'next/link';
import MaceIcon from '@/components/Mace';
import SearchComponent from '@/components/SearchComponent';
import NoResults from '@/components/NoResults';
import { formatUrlString } from '@/utils/string-utils';

interface ParvasProps {
    parva_name: string;
}

export default function Parvas() {
    const [parvasData, setParvasData] = useState<ParvasProps[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchParvas();
    }, []);

    const fetchParvas = async () => {
        setIsLoading(true);
        try {
            const data = await getParvas();
            setParvasData(data);
        } catch (err) {
            console.error('Fetch error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const filteredParvas = parvasData.filter(parva =>
        parva.parva_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderSearchBar = () => (
        <SearchComponent
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            placeholder="Search Parvas..."
            showResultCount={true}
            resultCount={filteredParvas.length}
            resultLabel="Parva"
        />
    );

    const renderSkeletonLoader = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto px-4">
            {[...Array(18)].map((_, index) => (
                <div 
                    key={index}
                    className="bg-gray-800 bg-opacity-30 animate-pulse h-48"
                />
            ))}
        </div>
    );

    const renderParvaCards = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto px-4">
            {filteredParvas.map((parva, index) => (
                <div key={index} className="group">
                    <Link 
                        href={`/mahaabhaaratham/parvas/${formatUrlString(parva.parva_name)}`}
                        className="block"
                    >
                        <div className="bg-gray-800 bg-opacity-30 h-48 p-6 transition-all duration-300 hover:bg-opacity-50 hover:transform hover:scale-105 border border-transparent hover:border-custom-skyBlue">
                            <div className="flex flex-col justify-between h-full">
                                <div>
                                    <h3 className="text-xl font-semibold text-custom-mint mb-2 group-hover:text-white">
                                        {parva.parva_name}
                                    </h3>
                                    <p className="text-sm text-custom-skyBlue font-light">
                                        Parva {index + 1} of 18
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

    return (
        <div className="min-h-screen bg-custom-navy text-custom-mint py-10">
            <div className="max-w-4xl mx-auto px-4">
                <Link 
                    href="/mahaabhaaratham"
                    className="hover-underline-animation mb-8 inline-block text-lg font-extralight"
                >
                    ← Back to The Mahaa Bhaaratham
                </Link>

                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-custom-mint mb-2">The Mahaa Bhaaratham Parvas</h1>
                    <div className="flex items-center justify-center gap-4 mt-4">
                        <div className="h-[2px] w-16 bg-gradient-to-r from-transparent via-custom-skyBlue to-transparent"></div>
                        <span className="text-custom-skyBlue font-extralight text-lg">महाभारतं पर्वाणि</span>
                        <div className="h-[2px] w-16 bg-gradient-to-r from-transparent via-custom-skyBlue to-transparent"></div>
                    </div>
                </div>

                {renderSearchBar()}

                {isLoading ? (
                    renderSkeletonLoader()
                ) : filteredParvas.length > 0 ? (
                    renderParvaCards()
                ) : (
                    <NoResults/>
                )}
            </div>
        </div>
    );
}