import React, { useState, useRef, useEffect } from "react";
import { Filter, Search, Plus } from "lucide-react";

const FilterDropdown = ({ isOpen, onClose, column, position }) => {
  const dropdownRef = useRef(null);
  const [selectedFilter, setSelectedFilter] = useState("Contains");
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    setSelectedFilter("Contains");
    setFilterValue("");
  }, [column]);

  if (!isOpen) return null;

  const filterOptions = [
    "Contains",
    "Does not contain",
    "Equals",
    "Does not equal",
    "Begins with",
    "Ends with",
    "Blank",
    "Not blank",
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
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        {selectedFilter !== "Blank" && selectedFilter !== "Not blank" && (
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
              if (typeof window.handleApplyFilter === "function") {
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

const AutomationMapping = () => {
  const [activeFilter, setActiveFilter] = useState(null);
  const [filterPosition, setFilterPosition] = useState({ top: 0, left: 0 });

  const handleFilterClick = (column, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setFilterPosition({
      top: rect.bottom + window.scrollY + 5,
      left: rect.left + window.scrollX,
    });
    setActiveFilter(activeFilter === column ? null : column);
  };
  const closeFilter = () => {
    setActiveFilter(null);
  };
  const handleApplyFilter = () => {
    setActiveFilter(null);
  };

  return (
    <div className="min-h-screen bg-[#f7f7f7] p-0">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-6 pb-2">
        <h1 className="text-md font-bold text-[#2F3287]">MAPPING</h1>
        <button className="bg-[#2F3287] text-white px-6 py-2 rounded-full text-sm font-medium">
          + Create
        </button>
      </div>
      {/* Card */}
      <div className="mx-4 mt-2 rounded-xl bg-white shadow-sm border border-gray-100">
        {/* Search */}
        <div className="flex items-center px-6 py-6 border-b border-gray-100">
          <div className="relative w-full max-w-xs">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2F3287] focus:border-[#2F3287]"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#f7fafd] text-xs font-bold text-gray-700 uppercase">
                <th className="px-6 py-3 text-left whitespace-nowrap font-semibold">
                  <div className="flex items-center">
                    Sr.No
                    <Filter
                      className="w-4 h-4 ml-1 text-gray-400 cursor-pointer hover:text-gray-600"
                      onClick={(e) => handleFilterClick("Sr.No", e)}
                    />
                  </div>
                </th>
                <th className="px-6 py-3 text-left whitespace-nowrap font-semibold">
                  <div className="flex items-center">
                    Model
                    <Filter
                      className="w-4 h-4 ml-1 text-gray-400 cursor-pointer hover:text-gray-600"
                      onClick={(e) => handleFilterClick("Model", e)}
                    />
                  </div>
                </th>
                <th className="px-6 py-3 text-left whitespace-nowrap font-semibold">
                  <div className="flex items-center">
                    Method
                    <Filter
                      className="w-4 h-4 ml-1 text-gray-400 cursor-pointer hover:text-gray-600"
                      onClick={(e) => handleFilterClick("Method", e)}
                    />
                  </div>
                </th>
                <th className="px-6 py-3 text-left whitespace-nowrap font-semibold">
                  <div className="flex items-center">
                    Action
                    <Filter
                      className="w-4 h-4 ml-1 text-gray-400 cursor-pointer hover:text-gray-600"
                      onClick={(e) => handleFilterClick("Action", e)}
                    />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Empty State */}
              <tr>
                <td colSpan={4}>
                  <div className="py-24 text-center text-gray-500 text-sm">
                    No Rows To Show
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
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

export default AutomationMapping;
