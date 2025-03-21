import ParvaCard from './ParvaCard';

export interface ParvaItem {
  parva_name: string;
}

export interface ParvaGridProps {
  parvas: ParvaItem[];
}

export default function ParvaGrid({ parvas }: ParvaGridProps) {
  return (
    <div 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto px-4"
      role="list"
      aria-label="List of Parvas"
      data-testid="parva-grid"
      data-total-parvas={parvas.length}
    >
      {parvas.map((parva, index) => (
        <div key={index} role="listitem">
          <ParvaCard 
            name={parva.parva_name}
            index={index}
          />
        </div>
      ))}
    </div>
  );
}