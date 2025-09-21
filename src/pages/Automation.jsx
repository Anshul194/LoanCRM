import React from "react";
import { Link } from "react-router-dom";

const Automation = () => {
    return (
        <div className="min-h-screen bg-[#f7f7f7] p-6">
            {/* Header */}
            <div className="flex items-center mb-10 ml-2 mt-2">
                <span className="w-5 h-5 flex items-center justify-center mr-2">
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                        <circle cx="9" cy="10" r="8" stroke="#2F3287" strokeWidth="2" />
                        <circle cx="9" cy="10" r="3" fill="#2F3287" />
                    </svg>
                </span>
                <h1 className="text-xl font-bold text-[#2F3287] tracking-wide">AUTOMATION</h1>
            </div>
            {/* Main Cards */}
            <div className="flex flex-col md:flex-row gap-8 justify-center items-start mt-8">
                {/* Automation Mapping */}
                <Link
                    to="/automation-mapping"
                    className="bg-white rounded-xl shadow-sm px-16 py-4 flex flex-col items-center justify-center min-w-[340px] max-w-[380px] min-h-[200px] transition hover:shadow-md cursor-pointer"
                >
                    <svg width="64" height="64" fill="none" viewBox="0 0 64 64">
                        <g stroke="#444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="48" cy="16" r="6" />
                            <circle cx="16" cy="48" r="6" />
                            <circle cx="32" cy="32" r="6" />
                            <path d="M43.8 20.2l-7.6 7.6M20.2 43.8l7.6-7.6M38 20l-4 4M26 38l4-4" />
                            <path d="M38 44l-4-4M44 38l-4-4" />
                            <path d="M20 26l4 4M26 20l4 4" />
                        </g>
                    </svg>
                    <div className="mt-4 text-lg font-medium text-gray-700">Automation Mapping</div>
                </Link>
                {/* N8N Automation */}
                <Link
                    to="/n8n-automation"
                    className="bg-white rounded-xl shadow-sm px-16 py-4 flex flex-col items-center justify-center min-w-[340px] max-w-[380px] min-h-[200px] transition hover:shadow-md cursor-pointer"
                >
                    <svg width="64" height="64" fill="none" viewBox="0 0 64 64">
                        <g stroke="#F43F5E" strokeWidth="3" strokeLinecap="round">
                            <circle cx="16" cy="32" r="4" fill="#fff" />
                            <circle cx="32" cy="16" r="4" fill="#fff" />
                            <circle cx="48" cy="32" r="4" fill="#fff" />
                            <path d="M20 32h8m4-4v-8m4 12h8" />
                        </g>
                    </svg>
                    <div className="mt-4 text-lg font-medium text-gray-700">N8N Automation</div>
                    <div className="mt-2 text-sm text-[#2F3287] font-semibold">Login Credentials</div>
                    <div className="text-xs text-gray-500 mt-1">
                        Email:<br />
                        Password:
                    </div>
                </Link>
            </div>
            {/* Footer */}
            <div className="absolute left-0 bottom-4 text-xs text-gray-400 ml-6">
                © 2025 All Rights Reserved. | Version 17
            </div>
        </div>
    );
};

export default Automation;
