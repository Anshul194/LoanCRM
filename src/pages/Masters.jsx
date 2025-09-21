import React from "react";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const masters = [
  "Lead Status",
  "Products",
  "Document Master",
  "Lender Master",
  "Employees",
  "Roles",
  "Employee Incentive Structure",
  "Employee Target",
  "Connectors",
  "Connectors Payout Structure",
  "My Branch",
  "Custom Form",
  "Custom Field",
  "User - Verification Api Permission",
  "Client Script",
  "Lead Source",
];

const Masters = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#f7f7f7] p-6">
      {/* Header */}
      <h1 className="text-md font-bold text-[#2F3287] mb-10 ml-2 mt-2">MASTERS</h1>
      {/* Main Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start items-start mt-8">
        {masters.map((item) => (
          <div
            key={item}
            className="bg-white rounded-lg px-8 py-4 flex items-center justify-between min-w-[320px] cursor-pointer hover:shadow-md transition"
            onClick={() => {
              if (item === "Lead Status") navigate("/masters/lead-status");
              if (item === "Lender Master") navigate("/masters/lender-master");
              if (item === "Employee Incentive Structure") navigate("/masters/employee-incentive-structure");
              if (item === "Connectors Payout Structure") navigate("/masters/connectors-payout-structure");
              if (item === "Custom Field") navigate("/masters/custom-field");
              if (item === "Lead Source") navigate("/masters/lead-source");
            }}
          >
            <span className="text-md font-normal text-gray-800">{item}</span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        ))}
      </div>
      {/* Footer */}
      <div className="absolute left-0 bottom-4 text-xs text-gray-400 ml-6">
        © 2025 All Rights Reserved. | Version 17
      </div>
    </div>
  );
};

export default Masters;
