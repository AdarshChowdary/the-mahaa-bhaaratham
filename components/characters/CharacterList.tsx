"use client";

import React from 'react';
import { Character, GroupedCharacters, CHARACTERS_PER_LETTER } from '@/types/characters';
import MaceIcon from '@/components/Mace';

interface CharacterListProps {
  groupedCharacters: GroupedCharacters;
  onCharacterClick: (character: Character) => void;
  onViewAll: (letter: string) => void;
  isLoading: boolean;
}

const CharacterList = ({ 
  groupedCharacters, 
  onCharacterClick, 
  onViewAll,
  isLoading 
}: CharacterListProps) => {

  const handleViewAll = (letter: string) => {
    onViewAll(letter);
  };

  if (isLoading) {
    return (
      <div 
        className="min-h-64 bg-custom-navy text-custom-mint py-10"
        aria-live="polite"
      >
        <div className="flex justify-center items-center h-64">
          <div 
            className="animate-spin rounded-full h-12 w-12 border-b-2 border-custom-mint"
            aria-hidden="true"
          ></div>
        </div>
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-center">Loading characters...</p>
        </div>
      </div>
    );
  }

  if (Object.keys(groupedCharacters).length === 0) {
    return (
      <div 
        className="text-center py-8"
        aria-live="polite"
      >
        <p className="text-xl text-custom-light-blue">No characters found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8 px-2 sm:px-4">
      {Object.keys(groupedCharacters).sort().map((letter) => {
        const { characters, total } = groupedCharacters[letter];
        const hasMore = total > CHARACTERS_PER_LETTER;

        return (
          <div 
            key={letter} 
            id={`section-${letter}`}
            className="mb-6 sm:mb-8 text-left"
            aria-labelledby={`heading-${letter}`}
            data-character-group={letter}
          >
            <h2 
              id={`heading-${letter}`}
              className="flex items-center text-xl sm:text-2xl font-bold text-custom-sky-blue mb-3 sm:mb-4"
            >
              <MaceIcon variant={0} aria-hidden="true" /> {letter}
            </h2>
            
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              {characters.slice(0, CHARACTERS_PER_LETTER).map((character) => (
                <button
                  key={character.id}
                  onClick={() => onCharacterClick(character)}
                  className="p-3 sm:p-4 text-left hover:bg-custom-sky-blue hover:text-custom-navy transition-colors duration-300"
                  aria-label={`View character: ${character.name}`}
                  data-character-id={character.id}
                >
                  {character.name}
                </button>
              ))}
              
              {hasMore && (
                <button
                  onClick={() => handleViewAll(letter)}
                  className="p-3 sm:p-4 text-left text-custom-sky-blue hover:bg-custom-sky-blue hover:text-custom-navy transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-custom-mint"
                  aria-label={`View all ${total} characters starting with ${letter}`}
                  data-letter={letter}
                >
                  View all ({total})
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CharacterList;