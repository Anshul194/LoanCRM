import React, { useState, useRef, useEffect } from "react";
import { Filter } from "lucide-react";

const dispositions = [
  { name: "UNCONTACTED" },
  { name: "Contacted" },
  { name: "Converted" }
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

const Dispositions = () => {
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
  const closeFilter = () => setActiveFilter(null);

  return (
    <div className="min-h-screen bg-[#fafafa] p-8">
    <div className="flex  justify-between gap-3 flex-wrap">
          <h1 className="text-md font-bold text-[#2F3287] mb-8">DISPOSITIONS</h1>
       <div className="flex justify-end mb-2">
          <button className="bg-[#2F3287] text-white px-6 py-1 rounded-full text-xs font-medium">
            + Create Disposition
          </button>
        </div>
    </div>
      <div className="bg-white rounded-lg shadow-sm p-4">
       
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#f7fafd] text-xs font-bold text-gray-700 uppercase">
                <th className="px-4 py-3 text-left whitespace-nowrap">
                  <div className="flex items-center">
                    Name
                    <Filter
                      className="w-3 h-3 ml-1 text-gray-400 cursor-pointer hover:text-gray-600"
                      onClick={(e) => handleFilterClick("Name", e)}
                    />
                  </div>
                </th>
                <th className="px-4 py-3 text-left whitespace-nowrap">
                  <div className="flex items-center">
                    Created By
                    <Filter
                      className="w-3 h-3 ml-1 text-gray-400 cursor-pointer hover:text-gray-600"
                      onClick={(e) => handleFilterClick("Created By", e)}
                    />
                  </div>
                </th>
                <th className="px-4 py-3 text-left whitespace-nowrap">
                  <div className="flex items-center">
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
              {dispositions.map((d, idx) => (
                <tr key={idx} className={idx === 0 ? "bg-[#f7fafd]" : ""}>
                  <td className="px-4 text-sm py-3 text-left font-medium">{d.name}</td>
                  <td className="px-4 py-3 text-left"></td>
                  <td className="px-4 py-3 text-left"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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

export default Dispositions;
