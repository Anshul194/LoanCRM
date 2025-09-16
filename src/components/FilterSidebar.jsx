import React, { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';

const FilterSidebar = ({ isOpen, onClose }) => {
  const [filters, setFilters] = useState({
    accountManager: '',
    product: '',
    status: '',
    leadSource: '',
    workspace: 'Organization Workspace',
    date: 'All',
    lenderWiseView: false
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
      accountManager: '',
      product: '',
      status: '',
      leadSource: '',
      workspace: 'Organization Workspace',
      date: 'All',
      lenderWiseView: false
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
          <h2 className="text-lg font-medium text-white">Apply Filters</h2>
          <button 
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <X className="w-5 h-5 cursor-pointer" />
          </button>
        </div>
        {/* Filter Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Account Manager */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Account Manager
            </label>
            <div className="relative">
              <select
                value={filters.accountManager}
                onChange={(e) => handleFilterChange('accountManager', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#4A5DB8] focus:border-[#4A5DB8] appearance-none bg-white"
              >
                <option value="">Search By Account Manager</option>
                <option value="manager1">Manager 1</option>
                <option value="manager2">Manager 2</option>
              </select>
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                <button type="button" onClick={() => handleFilterChange('accountManager', '')} className="focus:outline-none">
                  <X className="w-3 h-3 text-gray-400 cursor-pointer hover:text-[#2F3287]" />
                </button>
                <ChevronDown className="w-3 h-3 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
          {/* Product */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product
            </label>
            <div className="relative">
              <select
                value={filters.product}
                onChange={(e) => handleFilterChange('product', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#4A5DB8] focus:border-[#4A5DB8] appearance-none bg-white"
              >
                <option value="">Search By Product</option>
                <option value="home-loan">Home Loan</option>
                <option value="personal-loan">Personal Loan</option>
                <option value="business-loan">Business Loan</option>
              </select>
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                <button type="button" onClick={() => handleFilterChange('product', '')} className="focus:outline-none">
                  <X className="w-3 h-3 text-gray-400 cursor-pointer hover:text-[#2F3287]" />
                </button>
                <ChevronDown className="w-3 h-3 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <div className="relative">
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#4A5DB8] focus:border-[#4A5DB8] appearance-none bg-white"
              >
                <option value="">Search By Status</option>
                <option value="new">New</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                <button type="button" onClick={() => handleFilterChange('status', '')} className="focus:outline-none">
                  <X className="w-3 h-3 text-gray-400 cursor-pointer hover:text-[#2F3287]" />
                </button>
                <ChevronDown className="w-3 h-3 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
          {/* Lead Source */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Lead Source
            </label>
            <div className="relative">
              <select
                value={filters.leadSource}
                onChange={(e) => handleFilterChange('leadSource', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#4A5DB8] focus:border-[#4A5DB8] appearance-none bg-white"
              >
                <option value="">Search By Lead Source</option>
                <option value="website">Website</option>
                <option value="referral">Referral</option>
                <option value="social-media">Social Media</option>
              </select>
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                <button type="button" onClick={() => handleFilterChange('leadSource', '')} className="focus:outline-none">
                  <X className="w-3 h-3 text-gray-400 cursor-pointer hover:text-[#2F3287]" />
                </button>
                <ChevronDown className="w-3 h-3 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
          {/* Workspace */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Workspace
            </label>
            <div className="relative">
              <select
                value={filters.workspace}
                onChange={(e) => handleFilterChange('workspace', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#4A5DB8] focus:border-[#4A5DB8] appearance-none bg-white"
              >
                <option value="Organization Workspace">Organization Workspace</option>
                <option value="Personal Workspace">Personal Workspace</option>
                <option value="Team Workspace">Team Workspace</option>
              </select>
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                <button type="button" onClick={() => handleFilterChange('workspace', 'Organization Workspace')} className="focus:outline-none">
                  <X className="w-3 h-3 text-gray-400 cursor-pointer hover:text-[#2F3287]" />
                </button>
                <ChevronDown className="w-3 h-3 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date
            </label>
            <div className="relative">
              <select
                value={filters.date}
                onChange={(e) => handleFilterChange('date', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#4A5DB8] focus:border-[#4A5DB8] appearance-none bg-white"
              >
                <option value="All">All</option>
                <option value="Today">Today</option>
                <option value="Yesterday">Yesterday</option>
                <option value="This Week">This Week</option>
                <option value="This Month">This Month</option>
                <option value="Last Month">Last Month</option>
              </select>
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                <button type="button" onClick={() => handleFilterChange('date', 'All')} className="focus:outline-none">
                  <X className="w-3 h-3 text-gray-400 cursor-pointer hover:text-[#2F3287]" />
                </button>
                <ChevronDown className="w-3 h-3 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
          {/* Lender wise View Checkbox */}
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filters.lenderWiseView}
                onChange={(e) => handleFilterChange('lenderWiseView', e.target.checked)}
                className="w-4 h-4 text-[#4A5DB8] border border-gray-300 rounded focus:ring-[#4A5DB8] focus:ring-2"
              />
              <span className="text-sm text-gray-700">Lender wise View?</span>
            </label>
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

export default FilterSidebar;