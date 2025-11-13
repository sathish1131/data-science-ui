import React, { useState, useRef, useEffect } from "react";
import logo from "../assets/app-icon.svg";

const Navbar: React.FC = () => {
    const [showTooltip, setShowTooltip] = useState(false);
    const tooltipRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
                setShowTooltip(false);
            }
        }
        if (showTooltip) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showTooltip]);

    return (
        <nav className="w-full bg-white shadow-sm border-b border-gray-200">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <div className="flex items-center space-x-3">
                    <img src={logo} alt="Logo" className="w-8 h-8" />
                    <h1 className="text-xl font-semibold text-sky-800">ThinkDifferent</h1>
                </div>
                <div className="relative">
                    <button onClick={() => setShowTooltip(!showTooltip)} className="px-4 py-2 text-sm font-medium text-white bg-sky-500 rounded-xl hover:bg-sky-600 transition">
                        Contact Us
                    </button>
                    {showTooltip && (
                        <div ref={tooltipRef} className="absolute right-0 mt-3 w-72 bg-white border border-gray-200 shadow-lg rounded-xl p-4 z-10">
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-sm font-semibold text-gray-700">Contact</span>
                                <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" aria-label="Close" onClick={() => setShowTooltip(false)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                                        <line x1="18" y1="6" x2="6" y2="18" />
                                        <line x1="6" y1="6" x2="18" y2="18" />
                                    </svg>
                                </button>
                            </div>
                            <p className="text-sm text-gray-600 break-all">
                                thinkdifferent.apps@gmail.com
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;