"use client";

import React, { useState } from 'react';
import { Character, GroupedCharacters, CHARACTERS_PER_LETTER } from '@/types/characters';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, X } from 'lucide-react';
import MaceIcon from './Mace';

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
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllCharacters, setShowAllCharacters] = useState(false);

  const handleViewAll = async (letter: string) => {
    setSelectedLetter(letter);
    setIsDialogOpen(true);
    setShowAllCharacters(true);
    onViewAll(letter);
  };

  const handleCharacterSelect = (character: Character) => {
    setIsDialogOpen(false);
    setSearchQuery('');
    setShowAllCharacters(false);
    onCharacterClick(character);
  };

  const filterCharacters = (characters: Character[]) => {
    if (!searchQuery) return characters;
    return characters.filter(char => 
      char.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const getDisplayCharacters = (characters: Character[]) => {
    if (showAllCharacters || searchQuery) {
      return filterCharacters(characters);
    }
    return filterCharacters(characters.slice(0, CHARACTERS_PER_LETTER));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#1b4965] text-[#bee9e8] py-10">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#bee9e8]"></div>
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
            <span className="flex items-center text-2xl font-bold text-[#62b6cb] mb-4"><MaceIcon variant={0}/>{letter}</span>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {characters.slice(0, CHARACTERS_PER_LETTER).map((character) => (
                <button
                  key={character.id}
                  onClick={() => onCharacterClick(character)}
                  className="p-4 text-left hover:bg-[#62b6cb] hover:text-[#1b4965] transition-colors duration-300"
                >
                  {character.name}
                </button>
              ))}
              {hasMore && (
                <button
                  onClick={() => handleViewAll(letter)}
                  className="p-4 text-left text-[#62b6cb] hover:bg-[#62b6cb] hover:text-[#1b4965] transition-colors duration-300"
                >
                  View all ({total})
                </button>
              )}
            </div>
          </div>
        );
      })}

      <Dialog open={isDialogOpen} onOpenChange={(open) => {
        setIsDialogOpen(open);
        if (!open) {
          setShowAllCharacters(false);
          setSearchQuery('');
        }
      }}>
        <DialogContent className="max-w-3xl bg-custom-navy border-custom-mint">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold mb-4 text-custom-mint">
              Characters Starting with &apos;{selectedLetter}&apos;
            </DialogTitle>
            <DialogDescription className="text-custom-skyBlue">
              View and search all characters beginning with {selectedLetter}
            </DialogDescription>
          </DialogHeader>

          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-custom-skyBlue w-5 h-5" />
            <input
              type="text"
              placeholder="Search characters..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border border-[#62b6cb] px-10 py-2 w-full placeholder:text-[#62b6cb] text-[#bee9e8] focus:outline-none focus:ring-2 focus:ring-[#62b6cb] transition-all duration-300"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <X className="w-5 h-5 text-custom-skyBlue" />
              </button>
            )}
          </div>

          <ScrollArea className="h-96">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {selectedLetter && getDisplayCharacters(groupedCharacters[selectedLetter].characters).map((character) => (
                <button
                  key={character.id}
                  onClick={() => handleCharacterSelect(character)}
                  className="p-3 text-left text-custom-mint hover:bg-[#62b6cb] hover:text-[#1b4965] transition-colors duration-300"
                >
                  {character.name}
                </button>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CharacterList;