// components/characters/CharacterContent.tsx

import { Character, GroupedCharacters } from '@/types/characters';
import CharacterList from './/CharacterList';
import AlphabetNavigation from './AlphabetNavigation';
import RandomCharacterButton from './RandomCharacterButton';

interface CharacterContentProps {
  isSearching: boolean;
  searchQuery: string;
  searchError: string | null;
  searchResults: Character[];
  displayedCharacters: GroupedCharacters;
  charactersData: GroupedCharacters;
  isLoading: boolean;
  isShuffling: boolean;
  selectedLetter: string | null;
  fullAlphabet: string[];
  onCharacterClick: (character: Character) => void;
  onRandomCharacter: () => void;
  onViewAll: (letter: string) => void;
  setSelectedLetter: (letter: string | null) => void;
  setShowAlert: (show: boolean) => void;
  setCurrentLetter: (letter: string) => void;
}

const CharacterContent = ({
  isSearching,
  searchQuery,
  searchError,
  searchResults,
  displayedCharacters,
  charactersData,
  isLoading,
  isShuffling,
  selectedLetter,
  fullAlphabet,
  onCharacterClick,
  onRandomCharacter,
  onViewAll,
  setSelectedLetter,
  setShowAlert,
  setCurrentLetter
}: CharacterContentProps) => {
  // When searching
  if (searchQuery) {
    // Show loading state while searching
    if (isSearching) {
      return (
        <div className="flex flex-col justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-custom-mint mb-4"></div>
          <p className="text-custom-mint">Searching for characters...</p>
        </div>
      );
    }
    
    // Show error state
    if (searchError) {
      return (
        <div className="text-center py-8">
          <p className="text-xl text-custom-skyBlue">{searchError}</p>
        </div>
      );
    }
    
    // Show no results
    if (searchResults.length === 0) {
      return (
        <div className="text-center py-8">
          <p className="text-xl text-custom-skyBlue">No characters found matching &quot;{searchQuery}&quot;</p>
        </div>
      );
    }
    
    // Show search results
    return (
      <CharacterList
        groupedCharacters={displayedCharacters}
        onCharacterClick={onCharacterClick}
        onViewAll={onViewAll}
        isLoading={false}
      />
    );
  }
  
  // When not searching
  return (
    <>
      <RandomCharacterButton 
        onClick={onRandomCharacter} 
        isShuffling={isShuffling} 
      />

      <AlphabetNavigation
        fullAlphabet={fullAlphabet}
        selectedLetter={selectedLetter}
        groupedCharacters={charactersData}
        setSelectedLetter={setSelectedLetter}
        setShowAlert={setShowAlert}
        setCurrentLetter={setCurrentLetter}
      />

      <CharacterList
        groupedCharacters={charactersData}
        onCharacterClick={onCharacterClick}
        onViewAll={onViewAll}
        isLoading={isLoading}
      />
    </>
  );
};

export default CharacterContent;