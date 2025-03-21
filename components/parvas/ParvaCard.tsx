import Link from 'next/link';
import MaceIcon from '@/components/Mace';
import { formatUrlString } from '@/utils/string-utils';

export interface ParvaCardProps {
  name: string;
  index: number;
}

export default function ParvaCard({ name, index }: ParvaCardProps) {
  const parvaNumber = index + 1;
  
  return (
    <div className="group">
      <Link 
        href={`/mahaabhaaratham/parvas/${formatUrlString(name)}`}
        className="block"
        aria-label={`View ${name}, Parva ${parvaNumber} of 18`}
        data-parva-index={parvaNumber}
        data-parva-name={name}
      >
        <div className="bg-[#1f29374d] bg-opacity-30 h-40 sm:h-44 md:h-48 p-4 md:p-6 transition-all duration-300 hover:bg-opacity-50 hover:transform hover:scale-105 border border-transparent hover:border-custom-sky-blue">
          <div className="flex flex-col justify-between h-full">
            <div>
              <h3 className="text-lg md:text-xl font-semibold text-custom-mint mb-2 group-hover:text-white">
                {name}
              </h3>
              <p className="text-xs md:text-sm text-custom-sky-blue font-light">
                Parva {parvaNumber} of 18
              </p>
            </div>
            <div className="flex justify-between items-center mt-4">
              <span className="flex items-center gap-2 text-custom-sky-blue text-xs md:text-sm">
                Read More <MaceIcon variant={0} aria-hidden="true" />
              </span>
              <div className="w-6 h-6 md:w-8 md:h-8 bg-custom-sky-blue bg-opacity-20 flex items-center justify-center" aria-hidden="true">
                <span className="text-xs md:text-sm">{parvaNumber}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}