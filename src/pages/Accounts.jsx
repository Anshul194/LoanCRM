import React from "react";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Accounts = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#f7f7f7] p-6">
      {/* Header */}
      <h1 className="text-md font-bold text-[#2F3287] mb-10 ml-2 mt-2">ACCOUNTS</h1>
      {/* Main Cards */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 justify-start items-start mt-8">
        <div
          className="bg-white rounded-lg px-8 py-4 flex items-center justify-between min-w-[320px] cursor-pointer hover:shadow-md transition"
          onClick={() => navigate('/invoices')}
        >
          <span className="text-md font-normal text-gray-800">Invoices</span>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>
        <div
          className="bg-white rounded-lg px-8 py-4 flex items-center justify-between min-w-[320px] cursor-pointer hover:shadow-md transition"
          onClick={() => navigate('/payout-requests')}
        >
          <span className="text-md font-normal text-gray-800">Payout Requests</span>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>
      </div>
      {/* Footer */}
      <div className="absolute left-0 bottom-4 text-xs text-gray-400 ml-6">
        © 2025 All Rights Reserved. | Version 17
      </div>
    </div>
  );
};

export default Accounts;
