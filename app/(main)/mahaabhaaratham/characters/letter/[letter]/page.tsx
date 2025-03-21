// app/mahaabhaaratham/characters/letter/[letter]/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import BackButton from '@/components/layout/BackButton'
import { ScrollArea } from '@/components/ui/scroll-area'
import SearchComponent from '@/components/SearchComponent'
import { Character } from '@/types/characters'
import { useCharactersByLetter } from '@/hooks/useCharacterQueries'
import PageHeader from '@/components/layout/PageHeader'
import PageLayout from '@/components/layout/PageLayout'
import Pagination from '@/components/Pagination'

// Set characters per page to 3 as requested
const CHARACTERS_PER_PAGE = 4;

export default function LetterCharacters() {
  const [searchQuery, setSearchQuery] = useState('')
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Get the current page from URL query parameters
  const pageParam = searchParams.get('page')
  const currentPage = pageParam ? parseInt(pageParam, 10) : 1

  const letter = (params.letter as string)?.toUpperCase() || ''

  // TanStack Query hook for characters by letter
  const { 
    data: characters = [],
    isLoading,
    error: queryError
  } = useCharactersByLetter(letter)

  const error = queryError ? 'Failed to load characters' : null

  // This filtering now works on the cached data
  const filteredCharacters = characters.filter(character => 
    character.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Calculate pagination values
  const totalPages = Math.ceil(filteredCharacters.length / CHARACTERS_PER_PAGE)
  const startIndex = (currentPage - 1) * CHARACTERS_PER_PAGE
  const endIndex = startIndex + CHARACTERS_PER_PAGE
  const currentPageCharacters = filteredCharacters.slice(startIndex, endIndex)

  // Handle page change
  const handlePageChange = (page: number) => {
    // Update URL with the new page parameter
    router.push(`/mahaabhaaratham/characters/letter/${letter}?page=${page}`)
  }

  // Reset to page 1 when search query changes
  useEffect(() => {
    if (currentPage !== 1 && searchQuery) {
      handlePageChange(1)
    }
  }, [searchQuery])

  const handleCharacterClick = (character: Character) => {
    const formattedName = character.name.toLowerCase().replace(/\s+/g, '-')
    router.push(`/mahaabhaaratham/characters/${formattedName}`)
  }

  if (!letter) {
    return (
      <div className="min-h-screen bg-custom-navy text-custom-mint py-6 sm:py-8 md:py-10 px-4" role="alert" aria-live="assertive">
        <div className="max-w-4xl mx-auto">
          <BackButton
            href='/mahaabhaaratham/characters'
            label='Back to Characters'
          />
          <div className="text-center py-6 sm:py-8">
            <p className="text-xl text-custom-sky-blue">Letter parameter is missing</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <PageLayout>
      <BackButton
        href='/mahaabhaaratham/characters'
        label='Back to Characters'
      />

      {/* Character Header */}
      <PageHeader
        title={`Characters Starting with '${letter}'`}
        subtitle={`'${letter}' से शुरू होने वाले पात्र`}
      />

      {/* Search Component */}
      <SearchComponent
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        placeholder={`Search within '${letter}' characters...`}
        showResultCount={true}
        resultCount={filteredCharacters.length}
        resultLabel="character"
        className="max-w-xs sm:max-w-sm md:max-w-md mx-auto mb-6 sm:mb-8"
        aria-controls="character-list"
        aria-expanded={searchQuery !== ''}
        data-letter={letter}
      />

      {/* Characters List */}
      {isLoading ? (
        <div className="flex justify-center items-center h-40 sm:h-52 md:h-64" aria-busy="true" aria-live="polite">
          <div className="animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 border-b-2 border-custom-mint" aria-label="Loading characters"></div>
        </div>
      ) : error ? (
        <div className="text-center py-6 sm:py-8" role="alert" aria-live="assertive">
          <p className="text-xl text-custom-sky-blue">{error}</p>
        </div>
      ) : filteredCharacters.length === 0 ? (
        <div className="text-center py-6 sm:py-8" role="status" aria-live="polite">
          <p className="text-xl text-custom-sky-blue">
            {searchQuery 
              ? `No characters found matching "${searchQuery}" within "${letter}"`
              : `No characters found starting with "${letter}"`}
          </p>
        </div>
      ) : (
        <div 
          tabIndex={-1}
          aria-live="polite"
          className="focus:outline-none"
        >
          <ScrollArea className="h-[50vh] sm:h-[60vh] md:h-[calc(100vh-380px)]" data-testid="characters-scroll-area">
            <div 
              id="character-list"
              className="grid grid-cols-3 gap-2 sm:gap-4"
              role="list"
              aria-label={`Characters starting with ${letter}${searchQuery ? ` matching "${searchQuery}"` : ''}, page ${currentPage} of ${totalPages}`}
            >
              {currentPageCharacters.map((character) => (
                <button
                  key={character.id}
                  onClick={() => handleCharacterClick(character)}
                  className="p-3 sm:p-4 text-left bg-custom-navy hover:bg-custom-sky-blue hover:text-custom-navy transition-colors duration-300"
                  role="listitem"
                  aria-label={character.name}
                  data-character-id={character.id}
                  data-character-name={character.name}
                >
                  {character.name}
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}
      
      {/* Pagination Component - Made more prominent and only shown when needed */}
      {!isLoading && !error && filteredCharacters.length > 0 && totalPages > 1 && (
        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            queryParam="page"
          />
        </div>
      )}
      
      {/* Letter info */}
      {!isLoading && !error && filteredCharacters.length > 0 && (
        <div 
          className="mt-6 sm:mt-8 text-center text-custom-sky-blue text-sm"
          aria-live="polite"
          data-character-count={filteredCharacters.length}
          data-letter={letter}
          data-search-query={searchQuery}
          data-current-page={currentPage}
          data-total-pages={totalPages}
        >
          Showing {startIndex + 1}-{Math.min(endIndex, filteredCharacters.length)} of {filteredCharacters.length} {filteredCharacters.length === 1 ? 'character' : 'characters'} 
          {searchQuery && ` matching "${searchQuery}"`} 
          {searchQuery ? ' from' : ' starting with'} &apos;{letter}&apos;
          {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
        </div>
      )}
    </PageLayout>
  )
}