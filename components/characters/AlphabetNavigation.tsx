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
    <div className="flex flex-wrap justify-center gap-2 mb-8">
      {fullAlphabet.map(letter => (
        <button
          key={letter}
          onClick={() => onLetterClick(letter)}
          className={`w-8 h-8 rounded-full flex items-center justify-center 
            ${selectedLetter === letter 
                ? 'bg-custom-sky-blue text-custom-navy'
                : 'border border-custom-sky-blue hover:bg-custom-sky-blue hover:text-custom-navy'
            } 
            ${!groupedCharacters[letter]?.characters.length ? 'opacity-50' : 'opacity-100'}
            transition-colors duration-300`}
        >
          {letter}
        </button>
      ))}
    </div>
  );
}