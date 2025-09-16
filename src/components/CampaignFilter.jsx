import React, { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';

const CampaignFilter = ({ isOpen, onClose }) => {
  const [filters, setFilters] = useState({
    campaignManager: '',
    campaignType: '',
    status: '',
    channel: '',
    workspace: 'Organization Workspace',
    date: 'All',
    performanceView: false
  });

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleApplyFilter = () => {
    // Handle apply filter logic here
    console.log('Applied filters:', filters);
    onClose();
  };

  const handleResetFilter = () => {
    setFilters({
      campaignManager: '',
      campaignType: '',
      status: '',
      channel: '',
      workspace: 'Organization Workspace',
      date: 'All',
      performanceView: false
    });
  };

  // Sidebar animation classes
  const sidebarClasses = `fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 flex flex-col
    transition-transform transition-opacity duration-300
    ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'}`;

  // Overlay animation classes
  const overlayClasses = `fixed inset-0 bg-black/30 bg-opacity-50 z-40
    transition-opacity duration-300
    ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`;

  return (
    <>
      {/* Dark Overlay */}
      <div 
        className={overlayClasses}
        onClick={onClose}
      />
      {/* Filter Sidebar with animation */}
      <div className={sidebarClasses}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-[#4A5DB8]">
          <h2 className="text-lg font-medium text-white">Apply Campaign Filters</h2>
          <button 
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <X className="w-5 h-5 cursor-pointer" />
          </button>
        </div>
        {/* Filter Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              value={filters.name}
              onChange={(e) => handleFilterChange('name', e.target.value)}
              placeholder="Enter Name"
              className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#4A5DB8] focus:border-[#4A5DB8]"
            />
          </div>
          
          {/* Start Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Date
            </label>
            <input
              type="date"
              value={filters.startDate}
              onChange={(e) => handleFilterChange('startDate', e.target.value)}
              placeholder="Enter Start Date"
              className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#4A5DB8] focus:border-[#4A5DB8] text-gray-500"
            />
          </div>
          
          {/* End Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Date
            </label>
            <input
              type="date"
              value={filters.endDate}
              onChange={(e) => handleFilterChange('endDate', e.target.value)}
              placeholder="Enter End Date"
              className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#4A5DB8] focus:border-[#4A5DB8] text-gray-500"
            />
          </div>
          
          {/* Budget */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Budget
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
              <input
                type="number"
                value={filters.budget}
                onChange={(e) => handleFilterChange('budget', e.target.value)}
                placeholder="Enter Budget"
                className="w-full p-2 pl-8 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#4A5DB8] focus:border-[#4A5DB8]"
              />
            </div>
          </div>
          
          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type
            </label>
            <div className="relative">
              <select
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#4A5DB8] focus:border-[#4A5DB8] appearance-none bg-white text-gray-500"
              >
                <option value="">Select Type</option>
                <option value="email-marketing">Email Marketing</option>
                <option value="social-media">Social Media</option>
                <option value="ppc">Pay-Per-Click</option>
                <option value="content-marketing">Content Marketing</option>
                <option value="display-ads">Display Advertising</option>
                <option value="affiliate">Affiliate Marketing</option>
              </select>
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                <button type="button" onClick={() => handleFilterChange('type', '')} className="focus:outline-none">
                  <X className="w-3 h-3 text-gray-400 cursor-pointer hover:text-[#2F3287]" />
                </button>
                <ChevronDown className="w-3 h-3 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
          
          {/* Manager */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Manager
            </label>
            <div className="relative">
              <select
                value={filters.manager}
                onChange={(e) => handleFilterChange('manager', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#4A5DB8] focus:border-[#4A5DB8] appearance-none bg-white text-gray-500"
              >
                <option value="">Select Manager</option>
              </select>
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                <button type="button" onClick={() => handleFilterChange('manager', '')} className="focus:outline-none">
                  <X className="w-3 h-3 text-gray-400 cursor-pointer hover:text-[#2F3287]" />
                </button>
                <ChevronDown className="w-3 h-3 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
        {/* Footer Buttons */}
        <div className="border-t border-gray-200 p-4 flex space-x-3">
          <button
            onClick={handleApplyFilter}
            className="flex-1 bg-[#2F3287] text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-[#3A4A98] transition-colors"
          >
            Apply Filter
          </button>
          <button
            onClick={handleResetFilter}
            className="flex-1 bg-white text-gray-700 py-2 px-4 rounded-md text-sm font-medium border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            Reset Filter
          </button>
        </div>
      </div>
    </>
  );
};

export default CampaignFilter;