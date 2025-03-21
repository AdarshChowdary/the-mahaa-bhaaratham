// components/layout/PageHeader.tsx
import React, { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  description?: string | ReactNode;
  className?: string;
}

const PageHeader = ({ 
  title, 
  subtitle, 
  description,
  className = ''
}: PageHeaderProps) => {
  return (
    <header className={`text-center mb-12 ${className}`}>
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-custom-mint mb-2">
          {title}
        </h1>
        {subtitle && (
          <div className="flex items-center justify-center gap-2 md:gap-4 mt-4" aria-label="Subtitle">
            <div className="h-[2px] w-8 md:w-16 bg-linear-to-r from-transparent via-custom-sky-blue to-transparent"></div>
            <span className="text-xl md:text-2xl text-custom-sky-blue font-extralight">{subtitle}</span>
            <div className="h-[2px] w-8 md:w-16 bg-linear-to-r from-transparent via-custom-sky-blue to-transparent"></div>
          </div>
        )}
        {description && (
          <p className="text-custom-sky-blue mt-4 max-w-2xl mx-auto text-base md:text-lg font-light">
            {description}
          </p>
        )}
      </div>
    </header>
  );
};

export default PageHeader;