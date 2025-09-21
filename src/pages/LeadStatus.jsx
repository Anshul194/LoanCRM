import React from "react";
import { Pencil } from "lucide-react";

const leadStatusGroups = [
  { sr: 1, name: "New" },
  { sr: 2, name: "Details-Pending" },
  { sr: 3, name: "Lender Selection" },
  { sr: 4, name: "To be Login" },
  { sr: 5, name: "Login", draggable: true },
  { sr: 6, name: "Sanction", draggable: true },
  { sr: 7, name: "Disbursement", draggable: true },
  { sr: 8, name: "Completed", draggable: true },
  { sr: 9, name: "Rejected", draggable: true },
];

const LeadStatus = () => {
  return (
    <div className="min-h-screen bg-[#f7f7f7] p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-[#2F3287] text-lg font-bold">●</span>
          <span className="text-[#2F3287] text-md font-bold tracking-wide">LEAD STATUS</span>
        </div>
        <button className="bg-[#2F3287] text-white px-5 py-2 rounded-full text-sm font-medium flex items-center">
          + Create Group
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6">
        {/* Search */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-80 max-w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2F3287] focus:border-[#2F3287]"
            style={{ backgroundImage: `url('data:image/svg+xml;utf8,<svg fill="gray" height="16" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M21 20.3l-3.8-3.8c1.1-1.4 1.8-3.1 1.8-5 0-4.4-3.6-8-8-8s-8 3.6-8 8 3.6 8 8 8c1.9 0 3.6-0.7 5-1.8l3.8 3.8c0.2 0.2 0.5 0.2 0.7 0s0.2-0.5 0-0.7zM4 10c0-3.3 2.7-6 6-6s6 2.7 6 6-2.7 6-6 6-6-2.7-6-6z"/></svg>')`, backgroundRepeat: 'no-repeat', backgroundPosition: '10px center' }}
          />
        </div>
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-[#f7fafd] text-xs font-bold text-gray-700 uppercase">
                <th className="px-4 py-3 text-left whitespace-nowrap">SR</th>
                <th className="px-4 py-3 text-left whitespace-nowrap">Group Name</th>
                <th className="px-4 py-3 text-left whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody>
              {leadStatusGroups.map((group) => (
                <tr key={group.sr}>
                  <td className="px-4 py-1 text-sm text-gray-700">
                    {group.draggable ? (
                      <span className="cursor-move text-gray-400 mr-2">⋮⋮⋮</span>
                    ) : null}
                    {group.sr}
                  </td>
                  <td className="px-4 py-1 text-sm text-gray-700">{group.name}</td>
                  <td className="px-4 py-1">
                    <button className="bg-[#f3f4fa] hover:bg-[#e5e7f8] rounded-full p-2">
                      <Pencil className="w-4 h-4 text-[#7c7bbd]" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeadStatus;
