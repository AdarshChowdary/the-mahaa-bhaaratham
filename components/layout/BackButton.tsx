// components/layout/BackButton.tsx
import Link from 'next/link';

interface BackButtonProps {
  href: string;
  label: string;
}

const BackButton = ({ href, label }: BackButtonProps) => {
  return (
    <Link 
      href={href}
      className="hover-underline-animation mb-8 inline-block text-lg font-extralight"
      aria-label={`Navigate ${label}`}
    >
      <span aria-hidden="true">←</span> {label}
    </Link>
  );
};

export default BackButton;