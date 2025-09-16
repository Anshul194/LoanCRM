import React, { useState, useRef, useEffect } from 'react';
import { Search, Plus, Filter, ChevronDown } from 'lucide-react';
import CampaignFilter from '../components/CampaignFilter'; // Import the component

const FilterDropdown = ({ isOpen, onClose, column, position }) => {
  const dropdownRef = useRef(null);
  const [selectedFilter, setSelectedFilter] = useState('Contains');
  const [filterValue, setFilterValue] = useState('');

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    setSelectedFilter('Contains');
    setFilterValue('');
  }, [column]);

  if (!isOpen) return null;

  const filterOptions = [
    'Contains',
    'Does not contain',
    'Equals',
    'Does not equal',
    'Begins with',
    'Ends with',
    'Blank',
    'Not blank'
  ];

  return (
    <div 
      ref={dropdownRef}
      className="absolute z-50 bg-white border border-gray-300 rounded-lg shadow-lg w-48"
      style={{
        top: position.top,
        left: position.left,
      }}
    >
      <div className="p-3">
        <div className="flex items-center mb-3">
          <Filter className="w-4 h-4 text-blue-500 mr-2" />
          <span className="font-medium text-gray-700 text-sm">{column}</span>
        </div>
        <div className="mb-3">
          <select 
            value={selectedFilter} 
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="w-full p-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-[#4F46E5]"
          >
            {filterOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        {selectedFilter !== 'Blank' && selectedFilter !== 'Not blank' && (
          <div className="mb-3">
            <input
              type="text"
              placeholder="Filter..."
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              className="w-full p-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-[#4F46E5]"
            />
          </div>
        )}
        <div className="flex justify-end space-x-2">
          <button 
            onClick={onClose}
            className="px-3 py-1.5 text-xs text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
          >
            Cancel
          </button>
          <button 
            onClick={() => {
              if (typeof window.handleApplyFilter === 'function') {
                window.handleApplyFilter(column, selectedFilter, filterValue);
              }
            }}
            className="px-3 py-1.5 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

const Campaigns = () => {
  const [activeFilter, setActiveFilter] = useState(null);
  const [filterPosition, setFilterPosition] = useState({ top: 0, left: 0 });
  const [filters, setFilters] = useState({});
  const [isCampaignFilterOpen, setIsCampaignFilterOpen] = useState(false);

  const handleFilterClick = (column, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setFilterPosition({
      top: rect.bottom + window.scrollY + 5,
      left: rect.left + window.scrollX
    });
    setActiveFilter(activeFilter === column ? null : column);
  };

  const closeFilter = () => {
    setActiveFilter(null);
  };

  const handleApplyFilter = (column, selectedFilter, filterValue) => {
    setFilters((prev) => ({
      ...prev,
      [column]: { selectedFilter, filterValue }
    }));
    setActiveFilter(null);
  };

  // Sample data matching the image
  const campaignData = [
    {
      id: 1,
      campaignName: "Ea velit incididunt",
      startDate: "10/09/2025",
      endDate: "17/09/2025",
      budget: "₹72.00",
      type: "Email",
      manager: "Anshul Sharma",
      status: true
    },
    {
      id: 2,
      campaignName: "asdf",
      startDate: "12/08/2025",
      endDate: "21/08/2025",
      budget: "₹42.00",
      type: "Webinar",
      manager: "Anshul Sharma",
      status: true
    }
  ];

  return (
    <div className="min-h-screen  p-4 md:p-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 md:mb-8 gap-4">
        <div className="flex items-center">
          <button className="border borderCst  rounded-full mr-2 hover:bg-gray-100">
            <ChevronDown style={{ transform: 'rotate(90deg)' }} className="w-3 h-3 clr" />
          </button>
          <h1 className="text-sm font-bold clr">CAMPAIGNS</h1>
        </div>
        
        <button
          className="btnClr  px-4 py-2 rounded-full text-xs font-medium flex items-center"
          onClick={() => setIsCampaignFilterOpen(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Campaign
        </button>
      </div>

     <div className='bg-white py-4 px-3 h-[500px]'>
         {/* Search Section */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-[#4F46E5]"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden lg:block">
          {/* Table Header */}
          <div className="grid grid-cols-8 gap-4 px-6 py-4 border-b border-gray-200 bg-gray-50 text-xs font-medium text-gray-700 uppercase tracking-wider">
            <div className="flex items-center">
              SR
              <Filter 
                className="w-3 h-3 ml-1 text-gray-400 cursor-pointer hover:text-gray-600" 
                onClick={(e) => handleFilterClick('SR', e)}
              />
            </div>
            <div className="flex items-center">
              Campaign Name
              <Filter 
                className="w-3 h-3 ml-1 text-gray-400 cursor-pointer hover:text-gray-600" 
                onClick={(e) => handleFilterClick('Campaign Name', e)}
              />
            </div>
            <div className="flex items-center">
              Start Date
              <Filter 
                className="w-3 h-3 ml-1 text-gray-400 cursor-pointer hover:text-gray-600" 
                onClick={(e) => handleFilterClick('Start Date', e)}
              />
            </div>
            <div className="flex items-center">
              End Date
              <Filter 
                className="w-3 h-3 ml-1 text-gray-400 cursor-pointer hover:text-gray-600" 
                onClick={(e) => handleFilterClick('End Date', e)}
              />
            </div>
            <div className="flex items-center">
              Budget
              <Filter 
                className="w-3 h-3 ml-1 text-gray-400 cursor-pointer hover:text-gray-600" 
                onClick={(e) => handleFilterClick('Budget', e)}
              />
            </div>
            <div className="flex items-center">
              Type
              <Filter 
                className="w-3 h-3 ml-1 text-gray-400 cursor-pointer hover:text-gray-600" 
                onClick={(e) => handleFilterClick('Type', e)}
              />
            </div>
            <div className="flex items-center">
              Manager
              <Filter 
                className="w-3 h-3 ml-1 text-gray-400 cursor-pointer hover:text-gray-600" 
                onClick={(e) => handleFilterClick('Manager', e)}
              />
            </div>
            <div className="flex items-center">
              Status
              <Filter 
                className="w-3 h-3 ml-1 text-gray-400 cursor-pointer hover:text-gray-600" 
                onClick={(e) => handleFilterClick('Status', e)}
              />
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-200">
            {campaignData.map((campaign, index) => (
              <div key={campaign.id} className="grid grid-cols-8 gap-4 px-6 py-4 text-sm text-gray-900 hover:bg-gray-50">
                <div>{campaign.id}</div>
                <div>{campaign.campaignName}</div>
                <div>{campaign.startDate}</div>
                <div>{campaign.endDate}</div>
                <div>{campaign.budget}</div>
                <div>{campaign.type}</div>
                <div>{campaign.manager}</div>
                <div>
                  <div className={`w-8 h-4 rounded-full ${campaign.status ? 'bg-green-500' : 'bg-gray-300'} relative`}>
                    <div className={`w-3 h-3 rounded-full bg-white absolute top-0.5 transition-transform ${campaign.status ? 'translate-x-4' : 'translate-x-0.5'}`}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile/Tablet Table */}
        <div className="block lg:hidden">
          {/* Mobile Table Header */}
          <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
            <div className="grid grid-cols-4 gap-2 text-xs font-medium text-gray-700 uppercase tracking-wider">
              <div className="flex items-center">
                SR
                <Filter 
                  className="w-3 h-3 ml-1 text-gray-400 cursor-pointer hover:text-gray-600" 
                  onClick={(e) => handleFilterClick('SR', e)}
                />
              </div>
              <div className="flex items-center">
                Campaign
                <Filter 
                  className="w-3 h-3 ml-1 text-gray-400 cursor-pointer hover:text-gray-600" 
                  onClick={(e) => handleFilterClick('Campaign Name', e)}
                />
              </div>
              <div className="flex items-center">
                Type
                <Filter 
                  className="w-3 h-3 ml-1 text-gray-400 cursor-pointer hover:text-gray-600" 
                  onClick={(e) => handleFilterClick('Type', e)}
                />
              </div>
              <div className="flex items-center">
                Status
                <Filter 
                  className="w-3 h-3 ml-1 text-gray-400 cursor-pointer hover:text-gray-600" 
                  onClick={(e) => handleFilterClick('Status', e)}
                />
              </div>
            </div>
          </div>
          
          {/* Mobile Table Body */}
          <div className="divide-y divide-gray-200">
            {campaignData.map((campaign) => (
              <div key={campaign.id} className="px-4 py-3">
                <div className="grid grid-cols-4 gap-2 text-sm text-gray-900">
                  <div>{campaign.id}</div>
                  <div className="truncate">{campaign.campaignName}</div>
                  <div>{campaign.type}</div>
                  <div>
                    <div className={`w-6 h-3 rounded-full ${campaign.status ? 'bg-green-500' : 'bg-gray-300'} relative`}>
                      <div className={`w-2 h-2 rounded-full bg-white absolute top-0.5 transition-transform ${campaign.status ? 'translate-x-3' : 'translate-x-0.5'}`}></div>
                    </div>
                  </div>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  <span className="mr-4">Budget: {campaign.budget}</span>
                  <span className="mr-4">Manager: {campaign.manager}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
     </div>

      {/* Render CampaignFilter sidebar/modal */}
      <CampaignFilter
        isOpen={isCampaignFilterOpen}
        onClose={() => setIsCampaignFilterOpen(false)}
      />

      {/* Filter Dropdown */}
      {(() => { window.handleApplyFilter = handleApplyFilter; })()}
      <FilterDropdown
        isOpen={activeFilter !== null}
        onClose={closeFilter}
        column={activeFilter}
        position={filterPosition}
      />
    </div>
  );
};

export default Campaigns;