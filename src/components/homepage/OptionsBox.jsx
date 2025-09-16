import React, { useState } from "react";
import {
  ChevronDown,
  Rocket,
  Shield,
  Building2,
  Coffee,
  FileSearch,
  DollarSign,
  CheckCircle,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

const OptionsBox = () => {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [allFilter, setAllFilter] = useState("ALL");
  const [organizationFilter, setOrganizationFilter] = useState(
    "ORGANIZATION WORKSPACE"
  );

  const statusCards = [
    {
      id: "new",
      title: "New",
      count: 0,
      icon: Rocket,
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      iconColor: "text-purple-500",
    },
    {
      id: "kyc-pending",
      title: "KYC Details-Pending",
      count: 0,
      icon: Shield,
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      iconColor: "text-blue-500",
    },
    {
      id: "lender-selection",
      title: "Lender Selection",
      count: 0,
      icon: Building2,
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      iconColor: "text-yellow-600",
    },
    {
      id: "to-be-login",
      title: "To be Login",
      count: 0,
      icon: Coffee,
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      iconColor: "text-orange-500",
    },
    {
      id: "login",
      title: "Login",
      count: 0,
      icon: FileSearch,
      bgColor: "bg-cyan-50",
      borderColor: "border-cyan-200",
      iconColor: "text-cyan-600",
    },
    {
      id: "sanction",
      title: "Sanction",
      count: 0,
      icon: FileSearch,
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      iconColor: "text-blue-600",
    },
    {
      id: "disbursement",
      title: "Disbursement",
      count: 0,
      icon: DollarSign,
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      iconColor: "text-green-600",
    },
    {
      id: "completed",
      title: "Completed",
      count: 0,
      icon: CheckCircle,
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      iconColor: "text-green-600",
    },
    {
      id: "rejected",
      title: "Rejected",
      count: 0,
      icon: X,
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      iconColor: "text-red-500",
    },
  ];

  const handleCardClick = (cardId) => {
    setCurrentPage(cardId);
  };

  const handleBackToDashboard = () => {
    setCurrentPage("dashboard");
  };


  if (currentPage !== "dashboard") {
    return renderStatusPage(currentPage);
  }

  return (
    <div className="min-h-fit">
      {/* Header Section */}
      <div className="flex justify-between items-start flex-col md:flex-row mb-8">
        <div>
          <h1 className="text-2xl font-medium text-gray-800 mb-1">
            Good Evening,
          </h1>
          <p className="text-gray-500">Here's what's happening today.</p>
        </div>

        <div className="flex gap-3">
          <div className="relative">
            <select
              value={allFilter}
              onChange={(e) => setAllFilter(e.target.value)}
              className="appearance-none  border border-gray-800 rounded-full px-4 py-1 pr-8 text-xs font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="ALL">ALL</option>
              <option value="ACTIVE">ACTIVE</option>
              <option value="INACTIVE">INACTIVE</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={organizationFilter}
              onChange={(e) => setOrganizationFilter(e.target.value)}
              className="appearance-none border border-[#2F3287] rounded-full px-4 py-1 pr-8 text-sm font-medium text-[#2F3287] hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="ORGANIZATION WORKSPACE">
                ORGANIZATION WORKSPACE
              </option>
              <option value="PERSONAL WORKSPACE">PERSONAL WORKSPACE</option>
              <option value="TEAM WORKSPACE">TEAM WORKSPACE</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Status Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-4 mb-8">
        {statusCards.map((card) => {
          const IconComponent = card.icon;
          return (
            <Link
              to="/leads"
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`${card.bgColor} ${card.borderColor} border-2 rounded-lg p-2  text-left hover:shadow-md transition-all duration-200 hover:scale-105 cursor-pointer`}
            >
              <button className="w-full h-full text-left cursor-pointer">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-gray-800">
                    {card.count}
                  </span>
                  <IconComponent className={`w-5 h-5 ${card.iconColor}`} />
                </div>
                <div className="text-xs font-regular text-gray-700">
                  {card.title}
                </div>
              </button>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default OptionsBox;
