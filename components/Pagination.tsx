'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  queryParam?: string;
  baseUrl?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  queryParam = 'page',
  baseUrl = ''
}: PaginationProps) {
  // Return nothing if there's only one page or no pages
  if (totalPages <= 1) return null;

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const displayPageCount = 3;
  const pageNumbers: number[] = [];
  
  let startPage = Math.max(1, currentPage - Math.floor(displayPageCount / 2));
  const endPage = Math.min(totalPages, startPage + displayPageCount - 1);
  
  // Adjust if we're too close to the end
  if (endPage - startPage + 1 < displayPageCount) {
    startPage = Math.max(1, endPage - displayPageCount + 1);
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  // Helper function to create the URL based on provided base URL or using query parameters
  const createPageUrl = (page: number): string => {
    if (baseUrl) {
      return `${baseUrl}/${page}`;
    }
    
    // If baseUrl is not provided, use query parameters
    return `?${queryParam}=${page}`;
  };

  return (
    <nav 
      className="flex items-center justify-center mt-6 sm:mt-8 space-x-1 sm:space-x-2"
      aria-label="Pagination"
      role="navigation"
      data-current-page={currentPage}
      data-total-pages={totalPages}
    >
      {/* Previous Page Button */}
      <button
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        className={`bg-gray-800/80 text-custom-mint rounded-full border border-custom-mint/30 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-custom-mint/50 transition-all duration-300 backdrop-blur-xs shadow-lg p-1.5 sm:p-2 ${
          currentPage === 1
            ? 'border-gray-600 text-gray-500 hover:bg-gray-800/80 cursor-not-allowed'
            : ''
        }`}
        aria-label="Previous page"
        aria-disabled={currentPage === 1}
      >
        <ChevronLeft className='w-3 h-3 sm:w-4 sm:h-4' aria-hidden="true" />
      </button>
      
      {/* First Page */}
      {startPage > 1 && (
        <>
          <Link
            href={createPageUrl(1)}
            className="p-1 sm:p-2 w-6 h-6 sm:w-8 sm:h-8 aspect-square rounded-full border border-custom-mint/30 text-custom-mint hover:bg-custom-mint/10 flex items-center justify-center shadow-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-custom-mint/50"
            onClick={(e) => {
              e.preventDefault();
              onPageChange(1);
            }}
            aria-label="Go to page 1"
            aria-current={currentPage === 1 ? "page" : undefined}
          >
            1
          </Link>
          {startPage > 2 && (
            <span className="text-gray-500 px-1" aria-hidden="true">...</span>
          )}
        </>
      )}

      {/* Page Numbers */}
      {pageNumbers.map(page => (
        <Link
          key={page}
          href={createPageUrl(page)}
          className={`p-1 sm:p-2 w-6 h-6 sm:w-8 sm:h-8 aspect-square rounded-full shadow-lg flex items-center justify-center text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-custom-mint/50 ${
            page === currentPage
              ? 'bg-custom-mint text-custom-navy font-medium'
              : 'border border-custom-mint/30 text-custom-mint hover:bg-custom-mint/10'
          }`}
          onClick={(e) => {
            e.preventDefault();
            onPageChange(page);
          }}
          aria-label={`Go to page ${page}`}
          aria-current={page === currentPage ? "page" : undefined}
        >
          {page}
        </Link>
      ))}

      {/* Last Pages */}
      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && (
            <span className="text-gray-500 px-1" aria-hidden="true">...</span>
          )}
          <Link
            href={createPageUrl(totalPages)}
            className="p-1 sm:p-2 w-6 h-6 sm:w-8 sm:h-8 aspect-square rounded-full border border-custom-mint/30 text-custom-mint hover:bg-custom-mint/10 flex items-center justify-center shadow-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-custom-mint/50"
            onClick={(e) => {
              e.preventDefault();
              onPageChange(totalPages);
            }}
            aria-label={`Go to page ${totalPages}`}
            aria-current={currentPage === totalPages ? "page" : undefined}
          >
            {totalPages}
          </Link>
        </>
      )}
      
      {/* Next Page Button */}
      <button
        onClick={handleNextPage}
        disabled={currentPage >= totalPages}
        className={`bg-gray-800/80 text-custom-mint rounded-full border border-custom-mint/30 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-custom-mint/50 transition-all duration-300 backdrop-blur-xs shadow-lg p-1.5 sm:p-2 ${
          currentPage >= totalPages
            ? 'border-gray-600 text-gray-500 hover:bg-gray-800/80 cursor-not-allowed'
            : ''
        }`}
        aria-label="Next page"
        aria-disabled={currentPage >= totalPages}
      >
        <ChevronRight className='w-3 h-3 sm:w-4 sm:h-4' aria-hidden="true" />
      </button>
    </nav>
  );
}