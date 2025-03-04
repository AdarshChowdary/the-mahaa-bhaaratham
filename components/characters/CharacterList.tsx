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
      <div className="min-h-screen bg-custom-navy text-custom-mint py-10">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-custom-mint"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-center">Loading characters...</p>
        </div>
      </div>
    );
  }

  if (Object.keys(groupedCharacters).length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-xl text-custom-lightBlue">No characters found</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 px-4">
      {Object.keys(groupedCharacters).sort().map((letter) => {
        const { characters, total } = groupedCharacters[letter];
        const hasMore = total > CHARACTERS_PER_LETTER;

        return (
          <div 
            key={letter} 
            id={`section-${letter}`}
            className="mb-8 text-left"
          >
            <span className="flex items-center text-2xl font-bold text-custom-skyBlue mb-4">
              <MaceIcon variant={0}/>{letter}
            </span>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {characters.slice(0, CHARACTERS_PER_LETTER).map((character) => (
                <button
                  key={character.id}
                  onClick={() => onCharacterClick(character)}
                  className="p-4 text-left hover:bg-custom-skyBlue hover:text-custom-navy transition-colors duration-300"
                >
                  {character.name}
                </button>
              ))}
              
              {hasMore && (
                <button
                  onClick={() => handleViewAll(letter)}
                  className="p-4 text-left text-custom-skyBlue hover:bg-custom-skyBlue hover:text-custom-navy transition-colors duration-300"
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