'use client'

import { useQuery } from '@tanstack/react-query'
import { getCharactersGrouped, getCharactersByLetter, getCharacterDetails, searchCharacters } from '@/app/actions/characters'

// Query keys
export const QUERY_KEYS = {
  allCharacters: ['characters'] as const,
  charactersByLetter: (letter: string) => ['characters', 'byLetter', letter] as const,
  characterDetails: (name: string) => ['characters', 'details', name] as const,
  searchCharacters: (query: string) => ['characters', 'search', query] as const,
  characterImage: (name: string) => ['characters', 'image', name] as const,
}

// Get all characters grouped by first letter
export function useGroupedCharacters() {
  return useQuery({
    queryKey: QUERY_KEYS.allCharacters,
    queryFn: () => getCharactersGrouped(),
  })
}

// Get characters by letter
export function useCharactersByLetter(letter: string) {
  return useQuery({
    queryKey: QUERY_KEYS.charactersByLetter(letter),
    queryFn: () => getCharactersByLetter(letter),
    enabled: !!letter,
  })
}

// Get character details
export function useCharacterDetails(name: string) {
  return useQuery({
    queryKey: QUERY_KEYS.characterDetails(name),
    queryFn: () => getCharacterDetails(name),
    enabled: !!name,
  })
}

// Search characters
export function useSearchCharacters(query: string) {
  return useQuery({
    queryKey: QUERY_KEYS.searchCharacters(query),
    queryFn: () => searchCharacters(query),
    enabled: !!query && query.length >= 2, // Only search when query is at least 2 characters
  })
}