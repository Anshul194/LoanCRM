import React, { useState, useRef, useEffect } from "react";
import { Filter, Search, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

const roles = [
  {
    sr: 1,
    name: "Admin",
    createdBy: "Anshul Sharma",
  }
];

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
        position: "absolute"
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
            onClick={onClose}
            className="px-3 py-1.5 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

const Roles = () => {
  const [activeFilter, setActiveFilter] = useState(null);
  const [filterPosition, setFilterPosition] = useState({ top: 0, left: 0 });
  const navigate = useNavigate();

  const handleFilterClick = (column, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setFilterPosition({
      top: rect.bottom + window.scrollY + 6,
      left: rect.left + window.scrollX,
    });
    setActiveFilter(activeFilter === column ? null : column);
  };
  const closeFilter = () => setActiveFilter(null);

  return (
    <div className="min-h-screen bg-[#fafafa] p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <circle cx="9" cy="10" r="8" stroke="#2F3287" strokeWidth="2" />
              <circle cx="9" cy="10" r="3" fill="#2F3287" />
            </svg>
          </span>
          <span className="text-md font-bold text-[#2F3287] tracking-wide">ROLES</span>
        </div>
        <button
          className="bg-[#2F3287] text-white px-6 py-2 rounded-full text-xs font-medium"
          onClick={() => navigate("/masters/create-role")}
        >
          + Create New Role
        </button>
      </div>
      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm p-4 overflow-x-auto relative">
        {/* Search */}
        <div className="mb-4">
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2F3287] focus:border-[#2F3287]"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-[#f7fafd] text-xs font-bold text-gray-700 uppercase">
              <th className="px-6 py-3 text-left whitespace-nowrap w-20">
                <div className="flex items-center">
                  Sr.No
                  <Filter
                    className="w-3 h-3 ml-1 text-gray-400 cursor-pointer hover:text-gray-600"
                    onClick={(e) => handleFilterClick("Sr.No", e)}
                  />
                </div>
              </th>
              <th className="px-6 py-3 text-left whitespace-nowrap w-40">
                <div className="flex items-center">
                  Name
                  <Filter
                    className="w-3 h-3 ml-1 text-gray-400 cursor-pointer hover:text-gray-600"
                    onClick={(e) => handleFilterClick("Name", e)}
                  />
                </div>
              </th>
              <th className="px-6 py-3 text-left whitespace-nowrap w-40">
                <div className="flex items-center">
                  Created By
                  <Filter
                    className="w-3 h-3 ml-1 text-gray-400 cursor-pointer hover:text-gray-600"
                    onClick={(e) => handleFilterClick("Created By", e)}
                  />
                </div>
              </th>
              <th className="px-6 py-3 text-center whitespace-nowrap w-32">
                <div className="flex items-center justify-center">
                  Actions
                  <Filter
                    className="w-3 h-3 ml-1 text-gray-400 cursor-pointer hover:text-gray-600"
                    onClick={(e) => handleFilterClick("Actions", e)}
                  />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {roles.map(role => (
              <tr key={role.sr} className="hover:bg-gray-50">
                <td className="px-6 py-2 text-left">{role.sr}</td>
                <td className="px-6 py-2 text-left">{role.name}</td>
                <td className="px-6 py-2 text-left">{role.createdBy}</td>
                <td className="px-6 py-2 text-center">
                  <button className="bg-[#E8E8F7] p-2 rounded-full">
                    <Eye className="w-4 h-4 text-[#2F3287]" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Filter Dropdown */}
        <FilterDropdown
          isOpen={activeFilter !== null}
          onClose={closeFilter}
          column={activeFilter}
          position={filterPosition}
        />
      </div>
    </div>
  );
};

export default Roles;
