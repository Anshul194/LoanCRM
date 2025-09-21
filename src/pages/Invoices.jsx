import React, { useState, useRef, useEffect } from 'react';
import { Search, Plus, Filter, ChevronDown, X } from 'lucide-react';

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

const Invoices = () => {
  const [activeFilter, setActiveFilter] = useState(null);
  const [filterPosition, setFilterPosition] = useState({ top: 0, left: 0 });
  const [filters, setFilters] = useState({});

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

  return (
    <div className="min-h-screen bg-[#f7f7f7] p-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 md:mb-8 gap-4">
        <div className="flex items-center">
          <span className="text-md font-bold text-[#2F3287] mr-2">INVOICE</span>
        </div>
        <div className="flex gap-3">
          <button className="bg-[#2F3287] text-white px-5 py-2 rounded-full text-xs font-medium flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Create New Invoice
          </button>
          <button className="border border-[#2F3287] text-[#2F3287] px-5 py-2 rounded-full text-xs font-medium flex items-center">
            <span className="mr-2">🧾</span>
            Receipts
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Search Section */}
        <div className="p-6">
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2F3287] focus:border-[#2F3287]"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>
        {/* Table Section */}
        <div>
          {/* Table Header */}
          <div className="grid grid-cols-5 gap-0 px-6 py-4 border-b border-gray-100 bg-[#f7fafd] text-xs font-bold text-gray-700 uppercase tracking-wider">
            <div className="flex items-center">
              Id
              <Filter
                className="w-3 h-3 ml-1 text-gray-400 cursor-pointer hover:text-gray-600"
                onClick={(e) => handleFilterClick('Id', e)}
              />
            </div>
            <div className="flex items-center">
              Date
              <Filter
                className="w-3 h-3 ml-1 text-gray-400 cursor-pointer hover:text-gray-600"
                onClick={(e) => handleFilterClick('Date', e)}
              />
            </div>
            <div className="flex items-center">
              Created By
              <Filter
                className="w-3 h-3 ml-1 text-gray-400 cursor-pointer hover:text-gray-600"
                onClick={(e) => handleFilterClick('Created By', e)}
              />
            </div>
            <div className="flex items-center">
              Total
              <Filter
                className="w-3 h-3 ml-1 text-gray-400 cursor-pointer hover:text-gray-600"
                onClick={(e) => handleFilterClick('Total', e)}
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
          {/* Empty State */}
          <div className="flex items-center justify-center py-32">
            <p className="text-gray-500 text-sm">No Rows To Show</p>
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
    </div>
  );
};

export default Invoices;
