import { GroupedCharacters } from '@/types/characters'

interface AlphabetNavigationProps {
  fullAlphabet: string[];
  selectedLetter: string | null;
  groupedCharacters: GroupedCharacters;
  setSelectedLetter: (letter: string | null) => void;
  setShowAlert: (show: boolean) => void;
  setCurrentLetter: (letter: string) => void;
}

export default function AlphabetNavigation({ 
  fullAlphabet, 
  selectedLetter, 
  groupedCharacters,
  setSelectedLetter,
  setShowAlert,
  setCurrentLetter
}: AlphabetNavigationProps) {
  const onLetterClick = (letter: string) => {
    const hasCharacters = groupedCharacters[letter]?.characters.length > 0;
    
    if (!hasCharacters) {
      setCurrentLetter(letter);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }
    
    setSelectedLetter(letter);
    
    setTimeout(() => {
      const sectionElement = document.getElementById(`section-${letter}`);
      if (sectionElement) {
        const yOffset = -100;
        const y = sectionElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <nav 
      className="w-full overflow-x-auto py-2 mb-6 sm:mb-8"
      aria-label="Character alphabet navigation"
    >
      <div className="flex flex-wrap justify-center gap-1 sm:gap-2 mx-auto">
        {fullAlphabet.map(letter => {
          const hasCharacters = !!groupedCharacters[letter]?.characters.length;
          
          return (
            <button
              key={letter}
              onClick={() => onLetterClick(letter)}
              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-sm sm:text-base
                ${selectedLetter === letter 
                    ? 'bg-custom-sky-blue text-custom-navy'
                    : 'border border-custom-sky-blue hover:bg-custom-sky-blue hover:text-custom-navy'
                } 
                ${!hasCharacters ? 'opacity-50 cursor-default' : 'opacity-100'}
                transition-colors duration-300`}
              aria-label={`View characters starting with ${letter}`}
              aria-pressed={selectedLetter === letter}
              aria-disabled={!hasCharacters}
              data-has-characters={hasCharacters}
              data-character-letter={letter}
            >
              {letter}
            </button>
          );
        })}
      </div>
    </nav>
  );
}