const SkeletonLoader = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto px-4">
        {[...Array(9)].map((_, index) => (
            <div 
                key={index}
                className="bg-[#1f29374d] bg-opacity-30 animate-pulse h-48"
            />
        ))}
    </div>
);

export default SkeletonLoader;