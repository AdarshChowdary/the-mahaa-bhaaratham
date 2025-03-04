export default function Footer () {
    return (
        <footer className="w-full bg-custom-navy py-6 px-4">
            <div className="max-w-4xl mx-auto flex flex-col items-center gap-4">
                <p className="text-custom-mint text-lg">
                    © 2024 The Fifth Veda. All rights reserved.
                </p>
                <div className="flex gap-5 items-center">
                    <a
                        href="https://instagram.com/the_fifth_veda_"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-base gap-2 text-custom-skyBlue hover:text-custom-mint transition duration-200"
                        aria-label="Follow us on Instagram" 
                    >
                        <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M4.17157 4.17157C3 5.34315 3 7.22876 3 11V13C3 16.7712 3 18.6569 4.17157 19.8284C5.34315 21 7.22876 21 11 21H13C16.7712 21 18.6569 21 19.8284 19.8284C21 18.6569 21 16.7712 21 13V11C21 7.22876 21 5.34315 19.8284 4.17157C18.6569 3 16.7712 3 13 3H11C7.22876 3 5.34315 3 4.17157 4.17157ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"/>
                            <path d="M3 11C3 7.22876 3 5.34315 4.17157 4.17157C5.34315 3 7.22876 3 11 3H13C16.7712 3 18.6569 3 19.8284 4.17157C21 5.34315 21 7.22876 21 11V13C21 16.7712 21 18.6569 19.8284 19.8284C18.6569 21 16.7712 21 13 21H11C7.22876 21 5.34315 21 4.17157 19.8284C3 18.6569 3 16.7712 3 13V11Z" stroke="#bee9e8" strokeWidth="1.2"/>
                            <circle cx="16.5" cy="7.5" r="1.5" fill="#bee9e8"/>
                            <circle cx="12" cy="12" r="3.4" stroke="#bee9e8" strokeWidth="1.2"/>
                        </svg>
                        <span>Follow us on Instagram</span>
                    </a>
                </div>
            </div>
        </footer>
    )
}