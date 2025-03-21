export default function NoResults() {
    return (
        <div 
            className="text-center py-8 sm:py-12"
            role="status"
            aria-live="polite"
        >
            <p className="text-lg sm:text-xl text-custom-skyBlue">No Results</p>
        </div>
    );
}