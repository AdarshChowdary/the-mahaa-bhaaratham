// components/layout/PageLayout.tsx
import React, { ReactNode } from 'react';

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
}

const PageLayout = ({ children, className = '' }: PageLayoutProps) => {
  return (
    <div className={`min-h-screen bg-custom-navy text-custom-mint py-6 md:py-10 ${className}`} role="region" aria-label="Page content">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
};

export default PageLayout;