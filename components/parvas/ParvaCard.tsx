import Link from 'next/link';
import MaceIcon from '@/components/Mace';
import { formatUrlString } from '@/utils/string-utils';

export interface ParvaCardProps {
  name: string;
  index: number;
}

export default function ParvaCard({ name, index }: ParvaCardProps) {
  return (
    <div className="group">
      <Link 
        href={`/mahaabhaaratham/parvas/${formatUrlString(name)}`}
        className="block"
      >
        <div className="bg-[#1f29374d] bg-opacity-30 h-48 p-6 transition-all duration-300 hover:bg-opacity-50 hover:transform hover:scale-105 border border-transparent hover:border-custom-sky-blue">
          <div className="flex flex-col justify-between h-full">
            <div>
              <h3 className="text-xl font-semibold text-custom-mint mb-2 group-hover:text-white">
                {name}
              </h3>
              <p className="text-sm text-custom-sky-blue font-light">
                Parva {index + 1} of 18
              </p>
            </div>
            <div className="flex justify-between items-center mt-4">
              <span className="flex items-center gap-2 text-custom-sky-blue text-sm">Read More <MaceIcon variant={0}/></span>
              <div className="w-8 h-8 bg-custom-sky-blue bg-opacity-20 flex items-center justify-center">
                <span className="text-sm">{index + 1}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}