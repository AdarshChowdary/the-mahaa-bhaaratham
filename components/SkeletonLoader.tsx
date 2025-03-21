interface SkeletonLoaderProps {
    count?: number;
  }
  
  const SkeletonLoader = ({ count = 9 }: SkeletonLoaderProps) => (
      <div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto px-4"
        aria-label="Loading content"
        role="alert"
        aria-busy="true"
      >
          {[...Array(count)].map((_, index) => (
              <div 
                  key={index}
                  className="bg-[#1f29374d] bg-opacity-30 animate-pulse h-36 md:h-48"
                  aria-hidden="true"
                  data-testid="skeleton-item"
              />
          ))}
      </div>
  );
  
  export default SkeletonLoader;