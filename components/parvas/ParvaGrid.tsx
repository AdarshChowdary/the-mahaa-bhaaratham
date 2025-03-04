import ParvaCard from './ParvaCard';

export interface ParvaItem {
  parva_name: string;
}

export interface ParvaGridProps {
  parvas: ParvaItem[];
}

export default function ParvaGrid({ parvas }: ParvaGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto px-4">
      {parvas.map((parva, index) => (
        <ParvaCard 
          key={index}
          name={parva.parva_name}
          index={index}
        />
      ))}
    </div>
  );
}