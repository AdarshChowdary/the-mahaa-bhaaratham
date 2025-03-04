// app/mahaabhaaratham/characters/letter/[letter]/page.tsx
'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import BackButton from '@/components/layout/BackButton'
import { ScrollArea } from '@/components/ui/scroll-area'
import SearchComponent from '@/components/SearchComponent'
import { Character } from '@/types/characters'
import { useCharactersByLetter } from '@/app/hooks/useCharacterQueries'
import PageHeader from '@/components/layout/PageHeader'
import PageLayout from '@/components/layout/PageLayout'

export default function LetterCharacters() {
  const [searchQuery, setSearchQuery] = useState('')
  const params = useParams()
  const router = useRouter()

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

  const handleCharacterClick = (character: Character) => {
    const formattedName = character.name.toLowerCase().replace(/\s+/g, '-')
    router.push(`/mahaabhaaratham/characters/${formattedName}`)
  }

  if (!letter) {
    return (
      <div className="min-h-screen bg-custom-navy text-custom-mint py-10">
        <div className="max-w-4xl mx-auto px-4">
          <BackButton
            href='/mahaabhaaratham/characters'
            label='Back to Characters'
          />
          <div className="text-center py-8">
            <p className="text-xl text-custom-skyBlue">Letter parameter is missing</p>
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
        className="max-w-md mx-auto mb-8"
      />

      {/* Characters List */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-custom-mint"></div>
        </div>
      ) : error ? (
        <div className="text-center py-8">
          <p className="text-xl text-custom-skyBlue">{error}</p>
        </div>
      ) : filteredCharacters.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-xl text-custom-skyBlue">
            {searchQuery 
              ? `No characters found matching "${searchQuery}" within "${letter}"`
              : `No characters found starting with "${letter}"`}
          </p>
        </div>
      ) : (
        <ScrollArea className="h-[calc(100vh-320px)] pr-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {filteredCharacters.map((character) => (
              <button
                key={character.id}
                onClick={() => handleCharacterClick(character)}
                className="p-4 text-left bg-custom-navy hover:bg-custom-skyBlue hover:text-custom-navy transition-colors duration-300"
              >
                {character.name}
              </button>
            ))}
          </div>
        </ScrollArea>
      )}
      
      {/* Letter info */}
      {!isLoading && !error && filteredCharacters.length > 0 && (
        <div className="mt-8 text-center text-custom-skyBlue text-sm">
          Showing {filteredCharacters.length} {filteredCharacters.length === 1 ? 'character' : 'characters'} 
          {searchQuery && ` matching "${searchQuery}"`} 
          {searchQuery ? ' from' : ' starting with'} &apos;{letter}&apos;
        </div>
      )}

    </PageLayout>
  )
}