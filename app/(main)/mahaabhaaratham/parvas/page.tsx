'use client';

import { useState } from 'react';
import { useParvas } from '@/app/hooks/useQueries';
import SearchComponent from '@/components/SearchComponent';
import NoResults from '@/components/NoResults';
import ParvaGrid from '@/components/parvas/ParvaGrid';
import BackButton from '@/components/layout/BackButton';
import PageHeader from '@/components/layout/PageHeader';
import SkeletonLoader from '@/components/SkeletonLoader';
import PageLayout from '@/components/layout/PageLayout';

export default function Parvas() {
    const [searchQuery, setSearchQuery] = useState('');
    
    // Use the hook without type casting which could hide issues
    const { data, isLoading, error } = useParvas();
    
    // Safely handle the data - ensure it's an array
    const parvasData = Array.isArray(data) ? data : [];

    // Filter parvas based on search query
    const filteredParvas = parvasData.filter(parva =>
        parva?.parva_name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Handle errors
    if (error) {
        console.error('Error fetching parvas:', error);
    }

    return (
        <PageLayout>
            <BackButton
                href='/mahaabhaaratham'
                label='Back to The Mahaa Bhaaratham'
            />

            <PageHeader
                title="Parvas"
                subtitle="पर्वाणि"
            />

            <SearchComponent
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                placeholder="Search Parvas..."
                showResultCount={true}
                resultCount={filteredParvas.length}
                resultLabel="Parva"
            />

            {isLoading ? (
                <SkeletonLoader/>
            ) : filteredParvas.length > 0 ? (
                <ParvaGrid parvas={filteredParvas} />
            ) : (
                <NoResults/>
            )}
        </PageLayout>
    );
}