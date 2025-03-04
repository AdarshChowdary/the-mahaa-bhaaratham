export default function renderSkeletonLoader ()  {
    return (
        <div className="max-w-3xl mx-auto px-4">
            <div className="bg-gray-800/30 p-8 rounded-lg shadow-lg backdrop-blur-sm animate-pulse border border-gray-700/50">
                <div className="h-8 bg-gray-700/50 mb-4 w-1/2 rounded"></div>
                <div className="h-4 bg-gray-700/50 mb-8 w-1/4 rounded"></div>
                <div className="space-y-4">
                    <div className="h-4 bg-gray-700/50 w-full rounded"></div>
                    <div className="h-4 bg-gray-700/50 w-full rounded"></div>
                    <div className="h-4 bg-gray-700/50 w-3/4 rounded"></div>
                </div>
            </div>
        </div>
    );
}