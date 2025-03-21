import MaceIcon from '@/components/Mace';
import { useRouter } from 'next/navigation';

interface SectionItemProps {
  sectionNumber: number;
  subParvaName: string;
  href: string;
  currentPage?: number;
}

const SectionItem = ({ sectionNumber, subParvaName, href, currentPage }: SectionItemProps) => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Store the current page in sessionStorage before navigation
    if (currentPage) {
      sessionStorage.setItem('fromPage', currentPage.toString());
    }
    
    // Navigate to the href without the fromPage parameter
    router.push(href);
  };

  return (
    <div 
      onClick={handleClick}
      className="bg-[#1f29374d] p-3 sm:p-4 md:p-6 h-20 sm:h-22 md:h-24 transition-all duration-300 hover:bg-opacity-50 hover:transform hover:scale-105 border border-transparent hover:border-custom-sky-blue cursor-pointer"
      role="button"
      tabIndex={0}
      aria-label={`Read Section ${sectionNumber}: ${subParvaName}`}
      data-section-number={sectionNumber}
      data-section-name={subParvaName}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick(e as unknown as React.MouseEvent);
        }
      }}
    >
      <div className="h-full flex items-center justify-between">
        <div className="flex items-center space-x-2 sm:space-x-4 md:space-x-6">
          <div>
            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-custom-mint">
              Section {sectionNumber}
            </h3>
            <p className="text-sm md:text-base text-custom-sky-blue font-extralight">
              {subParvaName}
            </p>
          </div>
        </div>
        <span className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm md:text-base text-custom-sky-blue">
          Read <MaceIcon variant={0} className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" aria-hidden="true" />
        </span>
      </div>
    </div>
  );
};

export default SectionItem;