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
      className={`mb-8 px-6 py-3 bg-custom-skyBlue text-custom-navy
          flex items-center gap-2 mx-auto hover:bg-custom-mint transition-all
          ${isShuffling ? 'opacity-75 cursor-not-allowed' : 'hover:scale-105'}`}
    >
      <Shuffle className={`w-5 h-5 ${isShuffling ? 'animate-spin' : ''}`} />
      {isShuffling ? 'Selecting...' : 'Random Character'}
    </button>
  );
};

export default RandomCharacterButton;
