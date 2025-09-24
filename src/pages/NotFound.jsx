import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-[#f7f7f7]">
    <h1 className="text-5xl font-bold text-[#2F3287] mb-4">404</h1>
    <p className="text-lg text-gray-600 mb-6">Page Not Found</p>
    <Link to="/" className="bg-[#2F3287] text-white px-6 py-2 rounded-full text-sm font-medium">
      Go to Dashboard
    </Link>
  </div>
);

export default NotFound;
