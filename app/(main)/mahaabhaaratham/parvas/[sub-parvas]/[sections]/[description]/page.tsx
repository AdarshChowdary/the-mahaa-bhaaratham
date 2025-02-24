'use client'

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getSections } from '@/app/actions/section-description';
import { Scroll, BookOpen } from 'lucide-react';
import SearchComponent from '@/components/SearchComponent';
import { splitIntoParagraphs } from '@/utils/text-utils';

interface DescriptionProps {
    description: string;
    section_number: number;
    sub_parva_name: string;
}

// New function to highlight search terms
const highlightText = (text: string, searchTerm: string) => {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => {
        if (part.toLowerCase() === searchTerm.toLowerCase()) {
            return <mark key={index} className="bg-custom-mint/20 text-custom-mint px-1 rounded">{part}</mark>;
        }
        return part;
    });
};

export default function Description() {
    const params = useParams();
    const [descriptionData, setDescriptionData] = useState<DescriptionProps | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    
    useEffect(() => {
        if (params.description) {
            fetchDescription(Number(params.description));
        }
    }, [params.description]);
    
    const fetchDescription = async (sectionNumber: number) => {
        setIsLoading(true);
        try {
            const data = await getSections();
            const sectionData = data.find(
                section => section.section_number === sectionNumber
            );
            setDescriptionData(sectionData || null);
        } catch (err) {
            console.error('Fetch error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const renderSkeletonLoader = () => (
        <div className="max-w-3xl mx-auto px-4">
            <div className="bg-gray-800/30 p-8 rounded-lg shadow-lg backdrop-blur-sm animate-pulse border border-gray-700/50">
                <div className="h-8 bg-gray-700/50 mb-4 w-1/2 rounded"></div>
                <div className="h-4 bg-gray-700/50 mb-8 w-1/4 rounded"></div>
                <div className="space-y-4">
                    <div className="h-4 bg-gray-700/50 w-full rounded"></div>
                    <div className="h-4 bg-gray-700/50 w-full rounded"></div>
                    <div className="h-4 bg-gray-700/50 w-3/4 rounded"></div>
                </div>
            </div>
        </div>
    );

    const renderDescription = () => {
        if (!descriptionData) return null;

        const paragraphs = splitIntoParagraphs(descriptionData.description);

        return (
            <div className="max-w-3xl mx-auto px-4">
                {/* Search Bar */}
                <div className="mb-6">
                    <SearchComponent
                        searchQuery={searchTerm}
                        setSearchQuery={setSearchTerm}
                        placeholder="Search in description..."
                    />
                </div>

                <div className="bg-gray-800/30 p-8 rounded-lg shadow-lg backdrop-blur-sm border border-gray-700/50 relative overflow-hidden">
                    {/* Decorative corner elements */}
                    <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-custom-mint/30 rounded-tl-lg"></div>
                    <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-custom-mint/30 rounded-tr-lg"></div>
                    <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-custom-mint/30 rounded-bl-lg"></div>
                    <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-custom-mint/30 rounded-br-lg"></div>
                    
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-2">
                            <BookOpen className="w-5 h-5 text-custom-mint" />
                            <h2 className="text-2xl font-semibold text-custom-mint">
                                Section {descriptionData.section_number}
                            </h2>
                        </div>
                        
                        <div className="flex items-center gap-2 mb-6">
                            <Scroll className="w-4 h-4 text-custom-skyBlue" />
                            <p className="text-custom-skyBlue font-extralight">
                                {descriptionData.sub_parva_name}
                            </p>
                        </div>
                        
                        <div className="prose prose-invert max-w-none">
                            {paragraphs.map((paragraph, index) => (
                                <p 
                                    key={index} 
                                    className={`text-gray-300 text-justify leading-relaxed mb-4 ${
                                        index === 0 ? 'first-letter:text-4xl first-letter:font-bold first-letter:text-custom-skyBlue first-letter:mr-1 first-letter:float-left' : ''
                                    }`}
                                >
                                    {highlightText(paragraph, searchTerm)}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-custom-navy text-custom-mint py-10 relative">
                        
            <div className="max-w-4xl mx-auto px-4 relative">
                <Link 
                    href={`/mahaabhaaratham/parvas/${params['sub-parvas']}/${params.sections}`}
                    className="flex items-center gap-2 text-lg font-extralight mb-8 hover:text-custom-skyBlue transition-colors duration-300 group"
                >
                    <span className="hover-underline-animation">← Back to Sections</span>
                </Link>

                <div className="text-center mb-12">
                    <div className="mb-8 relative">
                        <h1 className="text-4xl font-bold text-custom-mint mb-2">
                            Section Description
                        </h1>
                        <div className="flex items-center justify-center gap-4 mt-4">
                            <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-custom-skyBlue to-transparent"></div>
                            <span className="text-custom-skyBlue font-extralight text-2xl tracking-wider">विवरणम्</span>
                            <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-custom-skyBlue to-transparent"></div>
                        </div>  
                    </div>
                </div>

                {isLoading ? renderSkeletonLoader() : renderDescription()}
            </div>
        </div>
    );
}