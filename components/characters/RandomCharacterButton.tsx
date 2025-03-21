// components/characters/RandomCharacterButton.tsx
import { Shuffle } from 'lucide-react';

interface RandomCharacterButtonProps {
  onClick: () => void;
  isShuffling: boolean;
}

const RandomCharacterButton = ({ onClick, isShuffling }: RandomCharacterButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={isShuffling}
      className={`mb-6 sm:mb-8 px-4 sm:px-6 py-2 sm:py-3 bg-custom-sky-blue text-custom-navy
          flex items-center gap-2 mx-auto hover:bg-custom-mint transition-all
          ${isShuffling ? 'opacity-75 cursor-not-allowed' : 'hover:scale-105'}`}
      aria-label={isShuffling ? "Selecting random character..." : "Select a random character"}
      aria-busy={isShuffling}
      data-state={isShuffling ? "loading" : "idle"}
    >
      <Shuffle 
        className={`w-4 h-4 sm:w-5 sm:h-5 ${isShuffling ? 'animate-spin' : ''}`}
        aria-hidden="true" 
      />
      <span>{isShuffling ? 'Selecting...' : 'Random Character'}</span>
    </button>
  );
};

export default RandomCharacterButton;