import React from "react";

const reports = [
    "Loans Ageing Report",
    "Leads Dump Report",
    "Lender Statistics",
    "Employee Performance",
    "Connector Performance",
    "Invoice History",
    "Payout History",
    "Revenue Reconciliation",
    "MIS Report",
    "Incentive Report",
    "Payout Report",
    "Calling Report",
    "Customer Report",
];

const Reports = () => {
    return (
        <div className="min-h-screen bg-[#f7f7f7] p-8">
            <h1 className="text-xl font-bold text-[#2F3287] mb-8">REPORTS</h1>
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {reports.map((report) => (
                    <div
                        key={report}
                        className="bg-white rounded-lg px-8 py-4 flex items-center justify-between min-w-[320px] cursor-pointer hover:shadow-md transition group"
                    >
                        <span className="text-base font-normal text-gray-800">{report}</span>
                        <span className="ml-4">
                            {/* Right Arrow SVG */}
                            <svg
                                className="w-5 h-5 text-[#2F3287] group-hover:text-[#181778]"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="M9 5l7 7-7 7"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Reports;
