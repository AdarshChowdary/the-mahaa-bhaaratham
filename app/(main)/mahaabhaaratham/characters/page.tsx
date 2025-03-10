// app/mahaabhaaratham/characters/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { X } from 'lucide-react'
import { Character, GroupedCharacters } from '@/types/characters'

// Import components
import PageLayout from '@/components/layout/PageLayout'
import BackButton from '@/components/layout/BackButton'
import PageHeader from '@/components/layout/PageHeader'
import SearchSection from '@/components/layout/SearchSection'
import CharacterContent from '@/components/characters/CharacterContent'

// Import query hooks
import { useGroupedCharacters, useSearchCharacters } from '@/app/hooks/useCharacterQueries'

export default function Characters() {
  // TanStack Query hooks
  const { 
    data: charactersData = {}, 
    isLoading 
  } = useGroupedCharacters()
  
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null)
  const [showAlert, setShowAlert] = useState(false)
  const [currentLetter, setCurrentLetter] = useState('')
  const [isShuffling, setIsShuffling] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')
  const router = useRouter()

  // Search with TanStack Query
  const { 
    data: searchResults = [], 
    isLoading: isSearching,
    error: searchQueryError
  } = useSearchCharacters(debouncedSearchQuery)

  const searchError = searchQueryError ? 'Failed to search characters' : null

  const fullAlphabet = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ')

  // Debounce search to avoid too many requests
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.length >= 2) {
        setDebouncedSearchQuery(searchQuery)
      } else {
        setDebouncedSearchQuery('')
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery])

  // Convert search results to grouped format when search is active
  const getDisplayedCharacters = (): GroupedCharacters => {
    if (!debouncedSearchQuery) return charactersData
    
    if (searchResults.length === 0) return {}
    
    // Group search results by their first letter
    const grouped: GroupedCharacters = {}
    
    searchResults.forEach(character => {
      const letter = character.name.charAt(0).toUpperCase()
      
      if (!grouped[letter]) {
        grouped[letter] = {
          characters: [],
          total: 0
        }
      }
      
      grouped[letter].characters.push(character)
      grouped[letter].total += 1
    })
    
    return grouped
  }

  const displayedCharacters = getDisplayedCharacters()

  const handleCharacterClick = (character: Character) => {
    const formattedName = character.name.toLowerCase().replace(/\s+/g, '-')
    router.push(`/mahaabhaaratham/characters/${formattedName}`)
  }

  const handleRandomCharacter = () => {
    if (Object.keys(charactersData).length === 0 || isShuffling) return
    
    setIsShuffling(true)
    
    let shuffleCount = 0
    const shuffleInterval = setInterval(() => {
      const letters = Object.keys(charactersData)
      const randomLetter = letters[Math.floor(Math.random() * letters.length)]
      setSelectedLetter(randomLetter)
      shuffleCount++
      
      if (shuffleCount >= 10) {
        clearInterval(shuffleInterval)
        const randomLetter = letters[Math.floor(Math.random() * letters.length)]
        const characters = charactersData[randomLetter].characters
        const randomCharacter = characters[Math.floor(Math.random() * characters.length)]
        setIsShuffling(false)
        handleCharacterClick(randomCharacter)
      }
    }, 100)
  }

  const handleViewAll = async (letter: string) => {
    router.push(`/mahaabhaaratham/characters/letter/${letter}`)
  }

  const handleSetSearchQuery = (query: string) => {
    setSearchQuery(query)
    if (!query) {
      setDebouncedSearchQuery('')
    }
    setSelectedLetter(null)
  }

  return (
    <PageLayout>
      <BackButton 
        href="/mahaabhaaratham" 
        label="Back to The Mahaa Bhaaratham" 
      />

      <PageHeader
        title="The Mahaa Bhaaratham Characters"
        subtitle="महाभारतं के पात्र"
      />

      <SearchSection
        searchQuery={searchQuery}
        setSearchQuery={handleSetSearchQuery}
        placeholder="Search characters..."
        showResultCount={!!debouncedSearchQuery && !isSearching && !searchError && searchResults.length > 0}
        resultCount={searchResults.length}
        resultLabel="character"
        className="mb-8 relative w-full max-w-sm mx-auto"
      />

      {/* Alert Notification */}
      {showAlert && (
        <div className="fixed top-4 right-4 z-50 animate-fade-in">
          <Alert className="bg-custom-sky-blue text-custom-navy border-none shadow-lg rounded-none">
            <AlertDescription className="flex items-center justify-between">
              <span>No characters found starting with <span className='font-bold'>&apos;{currentLetter}&apos;</span></span>
              <button 
                onClick={() => setShowAlert(false)}
                className="ml-4 hover:opacity-75 transition-opacity"
              >
                <X size={18} />
              </button>
            </AlertDescription>
          </Alert>
        </div>
      )}

      <CharacterContent
        isSearching={isSearching}
        searchQuery={debouncedSearchQuery}
        searchError={searchError}
        searchResults={searchResults}
        displayedCharacters={displayedCharacters}
        charactersData={charactersData}
        isLoading={isLoading}
        isShuffling={isShuffling}
        selectedLetter={selectedLetter}
        fullAlphabet={fullAlphabet}
        onCharacterClick={handleCharacterClick}
        onRandomCharacter={handleRandomCharacter}
        onViewAll={handleViewAll}
        setSelectedLetter={setSelectedLetter}
        setShowAlert={setShowAlert}
        setCurrentLetter={setCurrentLetter}
      />
    </PageLayout>
  )
}