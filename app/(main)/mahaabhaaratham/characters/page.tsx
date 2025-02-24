// app/mahaabhaaratham/characters/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { getCharactersGrouped } from '@/app/actions/characters'
import { getCharactersByLetter } from '@/app/actions/characters'
import { Alert, AlertDescription } from '@/components/ui/alert'
import AlphabetNavigation from '@/components/AlphabetNavigation'
import CharacterList from '@/components/CharacterList'
import { Shuffle, X } from 'lucide-react'
import SearchComponent from '@/components/SearchComponent'
import { Character, GroupedCharacters } from '@/types/characters'


export default function Characters() {
  const [charactersData, setCharactersData] = useState<GroupedCharacters>({})
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null)
  const [showAlert, setShowAlert] = useState(false)
  const [currentLetter, setCurrentLetter] = useState('')
  const [isShuffling, setIsShuffling] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const fullAlphabet = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ')

  useEffect(() => {
    fetchCharacters()
  }, [])

  const fetchCharacters = async () => {
    setIsLoading(true)
    try {
      const data = await getCharactersGrouped()
      setCharactersData(data)
    } catch (err) {
      console.error('Fetch error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const filterAndGroupCharacters = (characters: GroupedCharacters, query: string): GroupedCharacters => {
    if (!query) return characters

    const filtered: GroupedCharacters = {}
    
    Object.entries(characters).forEach(([letter, data]) => {
      const filteredCharacters = data.characters.filter(char =>
        char.name.toLowerCase().includes(query.toLowerCase())
      )
      
      if (filteredCharacters.length > 0) {
        filtered[letter] = {
          characters: filteredCharacters,
          total: filteredCharacters.length
        }
      }
    })
    
    return filtered
  }

  const groupedCharacters = filterAndGroupCharacters(charactersData, searchQuery)

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
    setIsLoading(true)
    try {
      const allCharacters = await getCharactersByLetter(letter)
      setCharactersData(prev => ({
        ...prev,
        [letter]: {
          characters: allCharacters,
          total: allCharacters.length
        }
      }))
    } catch (err) {
      console.error('Fetch error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-custom-navy text-custom-mint py-10">
      <div className="max-w-4xl mx-auto px-4">
        <Link 
          href="/mahaabhaaratham"
          className="hover-underline-animation mb-8 inline-block text-lg font-extralight"
        >
          ← Back to The Mahaa Bhaaratham
        </Link>

        {/* Character Header */}
        <div className="text-center mb-12">
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-[#bee9e8] mb-2">
                    The Mahaa Bhaaratham Characters
                </h1>
                <div className="flex items-center justify-center gap-4 mt-4">
                    <div className="h-[2px] w-16 bg-gradient-to-r from-transparent via-[#62b6cb] to-transparent"></div>
                    <span className="text-[#62b6cb] font-extralight text-2xl">महाभारतं के पात्र</span>
                <div className="h-[2px] w-16 bg-gradient-to-r from-transparent via-[#62b6cb] to-transparent"></div>
            </div>
        </div>

        {/* Search Component */}
        <div className="mb-8 relative w-full max-w-sm mx-auto flex items-center">
          <SearchComponent
            searchQuery={searchQuery}
            setSearchQuery={(value) => {
              setSearchQuery(value);
              setSelectedLetter(null);
            }}
            placeholder="Search characters..."
            className="mb-8 relative w-full max-w-sm mx-auto"
          />
        </div>

        {/* Random Character Button */}
        <button
            onClick={handleRandomCharacter}
            disabled={isShuffling}
            className={`mb-8 px-6 py-3 bg-[#62b6cb] text-[#1b4965]
                flex items-center gap-2 mx-auto hover:bg-[#bee9e8] transition-all
                ${isShuffling ? 'opacity-75 cursor-not-allowed' : 'hover:scale-105'}`}
        >
            <Shuffle className={`w-5 h-5 ${isShuffling ? 'animate-spin' : ''}`} />
            {isShuffling ? 'Selecting...' : 'Random Character'}
        </button>

        {/* Alert Notification */}
        {
            showAlert && (
                <div className="fixed top-4 right-4 z-50 animate-fade-in">
                    <Alert className="bg-[#62b6cb] text-[#1b4965] border-none shadow-lg rounded-none">
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
            )
        }

        {/* Alphabet Navigation */}
        <AlphabetNavigation
          fullAlphabet={fullAlphabet}
          selectedLetter={selectedLetter}
          groupedCharacters={groupedCharacters}
          setSelectedLetter={setSelectedLetter}
          setShowAlert={setShowAlert}
          setCurrentLetter={setCurrentLetter}
        />

        {/* Character List */}
        <CharacterList
          groupedCharacters={groupedCharacters}
          onCharacterClick={handleCharacterClick}
          onViewAll={handleViewAll}
          isLoading={isLoading}
        />
        </div>
      </div>
    </div>
  )
}