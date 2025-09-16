import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

const EnquriesTable = () => {
  const leads = [
    {
      employee: 'John Doe',
      dialedCall: 25,
      duration: '02:45:30',
      uncontacted: 8,
      contacted: 15,
      converted: 2
    },
    {
      employee: 'Anshul Sharma',
      dialedCall: 18,
      duration: '01:32:15',
      uncontacted: 5,
      contacted: 12,
      converted: 1
    },
    {
      employee: 'Sarah Wilson',
      dialedCall: 32,
      duration: '03:12:45',
      uncontacted: 12,
      contacted: 18,
      converted: 2
    },
    {
      employee: 'Mike Johnson',
      dialedCall: 14,
      duration: '01:15:20',
      uncontacted: 6,
      contacted: 7,
      converted: 1
    }
  ];

  const SortIcon = ({ column }) => (
    <div className="inline-flex flex-col ml-1">
      <ChevronUp className="w-3 h-3 text-gray-400" />
      <ChevronDown className="w-3 h-3 text-gray-400 -mt-1" />
    </div>
  );

  return (
    <div className="rounded-lg w-full lg:w-1/2 text-nowrap">
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">Enquries Count</h2>
        <button className="text-blue-600 hover:text-blue-800 text-xs font-medium">
          View All
        </button>
      </div>
      
      {/* Table */}
      <div className="overflow-x-auto bg-white h-96">
        <table className="w-full px-2 bg-white py-2">
          {/* Table Header */}
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left">
                <div className="flex items-center text-xs font-medium text-gray-600">
                  Employee
                  <SortIcon column="employee" />
                </div>
              </th>
              <th className="px-6 py-3 text-left">
                <div className="flex items-center text-xs font-medium text-gray-600">
                  Dialed Call
                  <SortIcon column="dialedCall" />
                </div>
              </th>
              <th className="px-6 py-3 text-left">
                <div className="flex items-center text-xs font-medium text-gray-600">
                  Duration
                  <SortIcon column="duration" />
                </div>
              </th>
              <th className="px-6 py-3 text-left">
                <div className="flex items-center text-xs font-medium text-gray-600">
                  Uncontacted
                  <SortIcon column="uncontacted" />
                </div>
              </th>
              <th className="px-6 py-3 text-left">
                <div className="flex items-center text-xs font-medium text-gray-600">
                  Contacted
                  <SortIcon column="contacted" />
                </div>
              </th>
              <th className="px-6 py-3 text-left">
                <div className="flex items-center text-xs font-medium text-gray-600">
                  Converted
                  <SortIcon column="converted" />
                </div>
              </th>
            </tr>
          </thead>
          
          {/* Table Body */}
          <tbody className="divide-y divide-gray-100">
            {leads.map((lead, index) => (
              <tr key={index} className="hover:bg-gray-50 cursor-pointer">
                <td className="px-6 py-4 text-xs text-gray-900 font-medium">{lead.employee}</td>
                <td className="px-6 py-4 text-xs text-gray-900">{lead.dialedCall}</td>
                <td className="px-6 py-4 text-xs text-gray-900">{lead.duration}</td>
                <td className="px-6 py-4 text-xs text-red-600">{lead.uncontacted}</td>
                <td className="px-6 py-4 text-xs text-blue-600 font-medium">{lead.contacted}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                    {lead.converted}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EnquriesTable;