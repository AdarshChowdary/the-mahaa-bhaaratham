import MaceIcon from '@/components/Mace';
import { useRouter } from 'next/navigation';

interface SectionItemProps {
  sectionNumber: number;
  subParvaName: string;
  href: string;
  currentPage?: number; // Add optional currentPage prop
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
      className="bg-gray-800 bg-opacity-30 p-6 h-24 transition-all duration-300 hover:bg-opacity-50 hover:transform hover:scale-105 border border-transparent hover:border-custom-skyBlue cursor-pointer"
    >
      <div className="h-full flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div>
            <h3 className="text-xl font-semibold text-custom-mint">
              Section {sectionNumber}
            </h3>
            <p className="text-custom-skyBlue font-extralight">
              {subParvaName}
            </p>
          </div>
        </div>
        <span className="flex items-center gap-2 text-custom-skyBlue">Read <MaceIcon variant={0}/></span>
      </div>
    </div>
  );
};

export default SectionItem;