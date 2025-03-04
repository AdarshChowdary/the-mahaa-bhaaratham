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
    <div className="flex items-center justify-center mt-8 space-x-2">
      {/* Previous Page Button */}
      <button
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        className={`bg-gray-800/80 text-custom-mint rounded-full border border-custom-mint/30 hover:bg-gray-700 focus:outline-none transition-all duration-300 backdrop-blur-sm shadow-lg p-2 ${
          currentPage === 1
            ? 'border-gray-600 text-gray-500 hover:bg-gray-800/80'
            : ''
        }`}
      >
        <ChevronLeft className='w-4 h-4' />
      </button>
      
      {/* First Page */}
      {startPage > 1 && (
        <>
          <Link
            href={createPageUrl(1)}
            className="p-2 w-8 h-8 aspect-square rounded-full border border-custom-mint/30 text-custom-mint hover:bg-custom-mint/10 flex items-center justify-center shadow-lg"
            onClick={(e) => {
              e.preventDefault();
              onPageChange(1);
            }}
          >
            1
          </Link>
          {startPage > 2 && (
            <span className="text-gray-500">...</span>
          )}
        </>
      )}

      {/* Page Numbers */}
      {pageNumbers.map(page => (
        <Link
          key={page}
          href={createPageUrl(page)}
          className={`p-2 w-8 h-8 aspect-square rounded-full shadow-lg flex items-center justify-center ${
            page === currentPage
              ? 'bg-custom-mint text-custom-navy font-medium'
              : 'border border-custom-mint/30 text-custom-mint hover:bg-custom-mint/10'
          }`}
          onClick={(e) => {
            e.preventDefault();
            onPageChange(page);
          }}
        >
          {page}
        </Link>
      ))}

      {/* Last Pages */}
      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && (
            <span className="text-gray-500">...</span>
          )}
          <Link
            href={createPageUrl(totalPages)}
            className="p-2 w-8 h-8 aspect-square rounded-full border border-custom-mint/30 text-custom-mint hover:bg-custom-mint/10 flex items-center justify-center shadow-lg"
            onClick={(e) => {
              e.preventDefault();
              onPageChange(totalPages);
            }}
          >
            {totalPages}
          </Link>
        </>
      )}
      
      {/* Next Page Button */}
      <button
        onClick={handleNextPage}
        disabled={currentPage >= totalPages}
        className={`bg-gray-800/80 text-custom-mint rounded-full border border-custom-mint/30 hover:bg-gray-700 focus:outline-none transition-all duration-300 backdrop-blur-sm shadow-lg p-2 ${
          currentPage >= totalPages
            ? 'border-gray-600 text-gray-500 hover:bg-gray-800/80'
            : ''
        }`}
      >
        <ChevronRight className='w-4 h-4' />
      </button>
    </div>
  );
}