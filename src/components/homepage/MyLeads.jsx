import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

const MyLeads = () => {
  const leads = [
    {
      id: 1,
      applicant: '',
      product: 'Home Loan',
      loanRequirement: 'Rs. 1.23 L',
      accountManager: 'Anshul Sharma',
      status: 'KYC Details- Pending',
      date: '11/08/2025',
      createdBy: 'Anshul Sharma'
    }
  ];

  const SortIcon = ({ column }) => (
    <div className="inline-flex flex-col ml-1">
      <ChevronUp className="w-3 h-3 text-gray-400" />
      <ChevronDown className="w-3 h-3 text-gray-400 -mt-1" />
    </div>
  );

  return (
    <div className=" rounded-lg w-full lg:w-1/2 text-nowrap">
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">My Leads</h2>
        <button className="text-blue-600 hover:text-blue-800 text-xs font-medium">
          View All
        </button>
      </div>
      
      {/* Table */}
      <div className="overflow-x-auto bg-white h-96">
        <table className="w-full px-2  bg-white py-2">
          {/* Table Header */}
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left">
                <div className="flex items-center text-xs font-medium text-gray-600">
                  Id
                  <SortIcon column="id" />
                </div>
              </th>
              <th className="px-6 py-3 text-left">
                <div className="flex items-center text-xs font-medium text-gray-600">
                  Applicant
                  <SortIcon column="applicant" />
                </div>
              </th>
              <th className="px-6 py-3 text-left">
                <div className="flex items-center text-xs font-medium text-gray-600">
                  Product
                  <SortIcon column="product" />
                </div>
              </th>
              <th className="px-6 py-3 text-left">
                <div className="flex items-center text-xs font-medium text-gray-600">
                  Loan Requirement
                  <SortIcon column="loanRequirement" />
                </div>
              </th>
              <th className="px-6 py-3 text-left">
                <div className="flex items-center text-xs font-medium text-gray-600">
                  Account Manager
                  <SortIcon column="accountManager" />
                </div>
              </th>
              <th className="px-6 py-3 text-left">
                <div className="flex items-center text-xs font-medium text-gray-600">
                  Status
                  <SortIcon column="status" />
                </div>
              </th>
              <th className="px-6 py-3 text-left">
                <div className="flex items-center text-xs font-medium text-gray-600">
                  Date
                  <SortIcon column="date" />
                </div>
              </th>
              <th className="px-6 py-3 text-left">
                <div className="flex items-center text-xs font-medium text-gray-600">
                  Created By
                  <SortIcon column="createdBy" />
                </div>
              </th>
            </tr>
          </thead>
          
          {/* Table Body */}
          <tbody className="divide-y divide-gray-100">
            {leads.map((lead, index) => (
              <tr key={index} className="hover:bg-gray-50 cursor-pointer">
                <td className="px-6 py-4 text-xs text-gray-900">{lead.id}</td>
                <td className="px-6 py-4 text-xs text-gray-900">{lead.applicant}</td>
                <td className="px-6 py-4 text-xs text-gray-900">{lead.product}</td>
                <td className="px-6 py-4 text-xs text-gray-900">{lead.loanRequirement}</td>
                <td className="px-6 py-4 text-xs text-blue-600 font-medium">{lead.accountManager}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                    {lead.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-xs text-gray-900">{lead.date}</td>
                <td className="px-6 py-4 text-xs text-blue-600 font-medium">{lead.createdBy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      
    </div>
  );
};

export default MyLeads;