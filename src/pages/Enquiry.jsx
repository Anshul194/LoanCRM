import React, { useState, useRef, useEffect } from 'react';
import { Search, Plus, Grid3x3, Filter, ChevronDown, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Dispositions from './Dispositions.jsx';
import FilterSidebar from '../components/FilterSidebar.jsx'; // <-- import sidebar

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
            className="w-full p-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#2F3287] focus:border-[#2F3287]"
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
              className="w-full p-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#2F3287] focus:border-[#2F3287]"
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

const Enquiry = () => {
  const [activeFilter, setActiveFilter] = useState(null);
  const [filterPosition, setFilterPosition] = useState({ top: 0, left: 0 });
  const [filters, setFilters] = useState({});
  const [activeTab, setActiveTab] = useState('UNCONTACTED');
  const [filterSidebarOpen, setFilterSidebarOpen] = useState(false); // <-- sidebar state
  const navigate = useNavigate();

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

  // Sample data to match the image
  const enquiryData = [
    {
      id: 1,
      name: "Anshul Ea eaque quod r...",
      mobileNo: "7999967578",
      allocateTo: "Anshul Sharma",
      nextFollowupDate: "",
      disposition: "UNCONTACTED",
      createdOn: "02/09/2025",
      createdBy: "Anshul Sharma"
    }
  ];

  const tabs = ['UNCONTACTED', 'FOLLOW UPS', 'ALL'];

  return (
    <div className="min-h-screen p-4 md:p-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 md:mb-8 gap-4">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">ENQUIRY</h1>
        
        <div className="flex sm:flex-row items-stretch sm:items-center space-y-2 justify-between sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
          <button
            className="bg-[#2F3287] text-white px-3 sm:px-4 py-2 rounded-full text-xs font-medium flex items-center justify-center"
            onClick={() => navigate("/create-enquiry")}
          >
            <Plus className="w-4 h-4 mr-2" />
            Create New Enquiry
          </button>
          
          <button
            className="border border-gray-300 text-gray-700 px-3 sm:px-4 py-[5px] rounded-full text-xs font-medium flex items-center justify-center"
            onClick={() => navigate("/dispositions")}
          >
            <Grid3x3 className="w-4 h-4 mr-2" />
            Dispositions
          </button>
          
          <button
            className="border border-gray-300 text-gray-700 px-3 sm:px-4 py-[5px] rounded-full text-xs font-medium flex items-center justify-center"
            onClick={() => navigate("/bulk-upload")}
          >
            <Plus className="w-4 h-4 mr-2" />
            Import
          </button>
          
          <button
            className="border cursor-pointer hover:bg-[#2F3287] hover:text-white transform-all border-gray-300 text-gray-700 px-3 sm:px-4 sm:py-1 rounded-full text-xs font-medium flex items-center justify-center"
            onClick={() => setFilterSidebarOpen(true)}
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </button>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mb-2">
        <div className="flex space-x-8 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-1 px-2 py-2 text-sm font-medium border-b-2 ${
                activeTab === tab
                  ? 'border-[#2F3287] text-[#2F3287] bg-gray-200'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className='bg-white'>
        {/* Search Section */}
        <div className="flex flex-col p-4 lg:flex-row items-stretch lg:items-center space-y-4 lg:space-y-0 lg:space-x-4 ">
            <div className="relative flex border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 lg:max-w-md lg:flex-1">
            <input
                type="text"
                placeholder="Search..."
                className="flex-1 pl-10 pr-4 py-2 text-sm outline-none rounded-l-lg"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <button className="bg-[#2F3287] text-white px-4 py-2 rounded-r-lg">
                <Search className="w-4 h-4" />
            </button>
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 lg:flex-1">
            <div className="relative flex-1 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500">
                <select className="appearance-none w-full text-gray-700 px-4 py-2 pr-10 rounded-lg text-sm focus:outline-none">
                <option>Search By Team Member</option>
                </select>
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1 pointer-events-none">
                <X className="w-3 h-3 text-gray-400" />
                <ChevronDown className="w-3 h-3 text-gray-400" />
                </div>
            </div>
            </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-lg h-[400px] overflow-hidden">
            {/* Desktop Table */}
            <div className="hidden lg:block">
            {/* Table Header */}
            <div className="flex justify-between gap-4 px-6 py-4 border-b border-gray-200 bg-gray-50 text-xs font-medium text-gray-700 uppercase tracking-wider">
                <div className="flex min-w-fit items-center">
                Id
                <Filter 
                    className="w-3 h-3 ml-1 text-gray-400 cursor-pointer hover:text-gray-600" 
                    onClick={(e) => handleFilterClick('Id', e)}
                />
                </div>
                <div className="flex min-w-fit items-center">
                Name
                <Filter 
                    className="w-3 h-3 ml-1 text-gray-400 cursor-pointer hover:text-gray-600" 
                    onClick={(e) => handleFilterClick('Name', e)}
                />
                </div>
                <div className="flex min-w-fit items-center">
                Mobile No.
                <Filter 
                    className="w-3 h-3 ml-1 text-gray-400 cursor-pointer hover:text-gray-600" 
                    onClick={(e) => handleFilterClick('Mobile No.', e)}
                />
                </div>
                <div className="flex min-w-fit items-center">
                Allocate To
                <Filter 
                    className="w-3 h-3 ml-1 text-gray-400 cursor-pointer hover:text-gray-600" 
                    onClick={(e) => handleFilterClick('Allocate To', e)}
                />
                </div>
                <div className="flex min-w-fit items-center">
                Next Followup Date
                <Filter 
                    className="w-3 h-3 ml-1 text-gray-400 cursor-pointer hover:text-gray-600" 
                    onClick={(e) => handleFilterClick('Next Followup Date', e)}
                />
                </div>
                <div className="flex min-w-fit items-center">
                Disposition
                <Filter 
                    className="w-3 h-3 ml-1 text-gray-400 cursor-pointer hover:text-gray-600" 
                    onClick={(e) => handleFilterClick('Disposition', e)}
                />
                </div>
                <div className="flex min-w-fit items-center">
                Created On
                <Filter 
                    className="w-3 h-3 ml-1 text-gray-400 cursor-pointer hover:text-gray-600" 
                    onClick={(e) => handleFilterClick('Created On', e)}
                />
                </div>
                <div className="flex min-w-fit items-center">
                Created By
                <Filter 
                    className="w-3 h-3 ml-1 text-gray-400 cursor-pointer hover:text-gray-600" 
                    onClick={(e) => handleFilterClick('Created By', e)}
                />
                </div>
            </div>

            {/* Table Data */}
            {enquiryData.map((enquiry) => (
                <div key={enquiry.id} className="flex justify-between gap-4 px-6 py-4 border-b border-gray-200 text-sm text-gray-900">
                <div className="min-w-fit">{enquiry.id}</div>
                <div className="min-w-fit text-gray-700">{enquiry.name}</div>
                <div className="min-w-fit">{enquiry.mobileNo}</div>
                <div className="min-w-fit">{enquiry.allocateTo}</div>
                <div className="min-w-fit">{enquiry.nextFollowupDate}</div>
                <div className="min-w-fit">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {enquiry.disposition}
                    </span>
                </div>
                <div className="min-w-fit">{enquiry.createdOn}</div>
                <div className="min-w-fit">{enquiry.createdBy}</div>
                </div>
            ))}
            </div>

            {/* Mobile/Tablet Table (md and below, but not xs) */}
            <div className="hidden sm:block lg:hidden">
            {/* Mobile Table Header */}
            <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
                <div className="grid grid-cols-4 gap-2 text-xs font-medium text-gray-700 uppercase tracking-wider">
                <div className="flex items-center">
                    Id
                    <Filter 
                    className="w-3 h-3 ml-1 text-gray-400 cursor-pointer hover:text-gray-600" 
                    onClick={(e) => handleFilterClick('Id', e)}
                    />
                </div>
                <div className="flex items-center">
                    Name
                    <Filter 
                    className="w-3 h-3 ml-1 text-gray-400 cursor-pointer hover:text-gray-600" 
                    onClick={(e) => handleFilterClick('Name', e)}
                    />
                </div>
                <div className="flex items-center">
                    Mobile
                    <Filter 
                    className="w-3 h-3 ml-1 text-gray-400 cursor-pointer hover:text-gray-600" 
                    onClick={(e) => handleFilterClick('Mobile No.', e)}
                    />
                </div>
                <div className="flex items-center">
                    Status
                    <Filter 
                    className="w-3 h-3 ml-1 text-gray-400 cursor-pointer hover:text-gray-600" 
                    onClick={(e) => handleFilterClick('Disposition', e)}
                    />
                </div>
                </div>
            </div>
            
            {/* Mobile Table Data */}
            {enquiryData.map((enquiry) => (
                <div key={enquiry.id} className="px-4 py-3 border-b border-gray-200">
                <div className="grid grid-cols-4 gap-2 text-sm">
                    <div className="text-gray-900">{enquiry.id}</div>
                    <div className="text-gray-700 truncate">{enquiry.name}</div>
                    <div className="text-gray-900">{enquiry.mobileNo}</div>
                    <div>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                        {enquiry.disposition}
                    </span>
                    </div>
                </div>
                </div>
            ))}
            </div>

            {/* Horizontal scroll for very small screens (xs only) */}
            <div className="block sm:hidden">
            <div className="overflow-x-auto">
                <div className="min-w-[900px] w-full">
                {/* Full table structure for horizontal scroll on mobile */}
                <div className="flex justify-between gap-5 px-4 py-3 border-b border-gray-200 bg-gray-50 text-xs font-medium text-gray-700 uppercase tracking-wider">
                    <div className="flex items-center whitespace-nowrap w-fit flex-1">Id <Filter className="w-3 h-3 ml-1 text-gray-400 cursor-pointer hover:text-gray-600" onClick={(e) => handleFilterClick('Id', e)} /></div>
                    <div className="flex items-center whitespace-nowrap w-fit flex-1">Name <Filter className="w-3 h-3 ml-1 text-gray-400 cursor-pointer hover:text-gray-600" onClick={(e) => handleFilterClick('Name', e)} /></div>
                    <div className="flex items-center whitespace-nowrap w-fit flex-1">Mobile No. <Filter className="w-3 h-3 ml-1 text-gray-400 cursor-pointer hover:text-gray-600" onClick={(e) => handleFilterClick('Mobile No.', e)} /></div>
                    <div className="flex items-center whitespace-nowrap w-fit flex-1">Allocate To <Filter className="w-3 h-3 ml-1 text-gray-400 cursor-pointer hover:text-gray-600" onClick={(e) => handleFilterClick('Allocate To', e)} /></div>
                    <div className="flex items-center whitespace-nowrap w-fit flex-1">Next Followup Date <Filter className="w-3 h-3 ml-1 text-gray-400 cursor-pointer hover:text-gray-600" onClick={(e) => handleFilterClick('Next Followup Date', e)} /></div>
                    <div className="flex items-center whitespace-nowrap w-fit flex-1">Disposition <Filter className="w-3 h-3 ml-1 text-gray-400 cursor-pointer hover:text-gray-600" onClick={(e) => handleFilterClick('Disposition', e)} /></div>
                    <div className="flex items-center whitespace-nowrap w-fit flex-1">Created On <Filter className="w-3 h-3 ml-1 text-gray-400 cursor-pointer hover:text-gray-600" onClick={(e) => handleFilterClick('Created On', e)} /></div>
                    <div className="flex items-center whitespace-nowrap w-fit flex-1">Created By <Filter className="w-3 h-3 ml-1 text-gray-400 cursor-pointer hover:text-gray-600" onClick={(e) => handleFilterClick('Created By', e)} /></div>
                </div>
                
                {/* Mobile Table Data */}
                {enquiryData.map((enquiry) => (
                    <div key={enquiry.id} className="flex justify-between gap-5 px-4 py-3 border-b border-gray-200 text-sm">
                    <div className="whitespace-nowrap w-fit flex-1">{enquiry.id}</div>
                    <div className="whitespace-nowrap w-fit flex-1 text-gray-700">{enquiry.name}</div>
                    <div className="whitespace-nowrap w-fit flex-1">{enquiry.mobileNo}</div>
                    <div className="whitespace-nowrap w-fit flex-1">{enquiry.allocateTo}</div>
                    <div className="whitespace-nowrap w-fit flex-1">{enquiry.nextFollowupDate}</div>
                    <div className="whitespace-nowrap w-fit flex-1">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                        {enquiry.disposition}
                        </span>
                    </div>
                    <div className="whitespace-nowrap w-fit flex-1">{enquiry.createdOn}</div>
                    <div className="whitespace-nowrap w-fit flex-1">{enquiry.createdBy}</div>
                    </div>
                ))}
                </div>
            </div>
            </div>
        </div>
      </div>

      {/* Filter Dropdown */}
      {(() => { window.handleApplyFilter = handleApplyFilter; })()}
      <FilterDropdown
        isOpen={activeFilter !== null}
        onClose={closeFilter}
        column={activeFilter}
        position={filterPosition}
      />

      {/* Filter Sidebar */}
      <FilterSidebar isOpen={filterSidebarOpen} onClose={() => setFilterSidebarOpen(false)} />
    </div>
  );
};

export default Enquiry;