import React, { useState } from 'react';

const CreateLead = () => {
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    product: '',
    purpose: '',
    branch: '',
    mobile: '',
    loanAmount: '',
    tenure: '',
    leadSource: '',
    campaign: ''
  });

  const loanTypes = [
    { id: 'home', name: 'Home Loan', icon: '🏠' },
    { id: 'property', name: 'Loan Against Property', icon: '🏢' },
    { id: 'business', name: 'Business Loan', icon: '💼' },
    { id: 'vehicle', name: 'Vehicle Loan', icon: '🚗' },
    { id: 'bima', name: 'Bima Loan', icon: '🛡️' },
    { id: 'cash', name: 'Cash Credit', icon: '💰' },
    { id: 'agri', name: 'Agri Loan', icon: '🌾' },
    { id: 'education', name: 'Education Loan', icon: '🎓' },
    { id: 'overdraft', name: 'Overdraft', icon: '📊' },
    { id: 'personal', name: 'Personal Loan', icon: '👤' }
  ];

  const handleLoanSelect = (loanId) => {
    setSelectedLoan(loanId);
    const selectedLoanType = loanTypes.find(loan => loan.id === loanId);
    setFormData({...formData, product: selectedLoanType.name});
    setShowForm(true);
  };

  const handleInputChange = (field, value) => {
    setFormData({...formData, [field]: value});
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full border-2 border-[#2F3287] flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-[#2F3287]"></div>
            </div>
            <span className="text-[#2F3287] font-semibold text-md">CREATE NEW LEAD</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <span>Cases</span>
            <span>›</span>
            <span>Create New Case</span>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex max-w-6xl mx-auto items-center justify-evenly mb-2">
          <div className="flex items-center justify-around w-full">
            <div className="w-10 h-10 rounded-full bg-[#2F3287] text-white flex items-center justify-center font-semibold">
              1
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-300 text-gray-500 flex items-center justify-center font-semibold">
              2
            </div>
          </div>
        </div>
            <div className="w-full max-w-4xl mx-auto h-1 bg-[#2F3287]"></div>

       <div className='max-w-4xl bg-white py-4 px-3 mx-auto mt-12'> 
         {/* Loan Requirement Section */}
        <div className="text-start mb-2">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Loan Requirement</h2>
        </div>

        {!showForm ? (
          <>
            {/* Loan Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 max-w-4xl mx-auto mb-12">
              {loanTypes.map((loan) => (
                <div
                  key={loan.id}
                  onClick={() => handleLoanSelect(loan.id)}
                  className={`
                    relative p-2 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md
                    ${selectedLoan === loan.id 
                      ? 'border-[#2F3287] bg-blue-50' 
                      : 'border-gray-200 bg-white hover:border-gray-300'
                    }
                  `}
                >
                  {selectedLoan === loan.id && (
                    <div className="absolute top-6 right-3 w-5 h-5 rounded-full bg-[#2F3287] flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 min-w-12 min-h-12 rounded-lg bg-gradient-to-br from-orange-400 to-pink-400 flex items-center justify-center text-white text-xl">
                      {loan.icon}
                    </div>
                    <span className="text-gray-700 font-regular text-md">{loan.name}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-full mx-auto">
              <button className="flex-1 py-2 px-8 rounded-xl border border-gray-400 text-gray-600 font-medium hover:bg-gray-50 transition-colors">
                Continue Later
              </button>
              <button 
                className="flex-1 py-2 px-8 rounded-xl bg-[#2F3287] text-white font-medium hover:bg-[#252770] transition-colors"
                disabled={!selectedLoan}
              >
                Save & Proceed
              </button>
            </div>
          </>
        ) : (
          /* Form Section */
          <div className="space-y-6">
            {/* Row 1 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-gray-600 mb-2 text-sm">
                  Product <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select 
                    value={formData.product}
                    onChange={(e) => handleInputChange('product', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg bg-white appearance-none pr-10 text-sm"
                  >
                    <option value={formData.product}>{formData.product}</option>
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-gray-600 mb-2 text-sm">
                  Purpose <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select 
                    value={formData.purpose}
                    onChange={(e) => handleInputChange('purpose', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg bg-white appearance-none pr-10 text-sm"
                  >
                    <option value="">Select Purpose</option>
                    <option value="purchase">Purchase</option>
                    <option value="refinance">Refinance</option>
                    <option value="construction">Construction</option>
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-gray-600 mb-2 text-sm">
                  Select Branch <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select 
                    value={formData.branch}
                    onChange={(e) => handleInputChange('branch', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg bg-white appearance-none pr-10 text-sm"
                  >
                    <option value="">Select Branch</option>
                    <option value="mumbai">Mumbai</option>
                    <option value="delhi">Delhi</option>
                    <option value="bangalore">Bangalore</option>
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-gray-600 mb-2 text-sm">
                  Mobile <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">📱</span>
                  <input
                    type="tel"
                    value={formData.mobile}
                    onChange={(e) => handleInputChange('mobile', e.target.value)}
                    className="w-full p-3 pl-10 border border-gray-300 rounded-lg text-sm"
                    placeholder="Enter mobile number"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-600 mb-2 text-sm">
                  Required Loan Amount <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                  <input
                    type="number"
                    value={formData.loanAmount}
                    onChange={(e) => handleInputChange('loanAmount', e.target.value)}
                    className="w-full p-3 pl-8 border border-gray-300 rounded-lg text-sm"
                    placeholder="Enter amount"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-600 mb-2 text-sm">
                  Required Tenure <span className="text-red-500">*</span>
                </label>
                <div className="flex">
                  <input
                    type="number"
                    value={formData.tenure}
                    onChange={(e) => handleInputChange('tenure', e.target.value)}
                    className="flex-1 p-3 border border-gray-300 rounded-l-lg text-sm"
                    placeholder="0"
                  />
                  <div className="px-3 py-3 bg-gray-100 border border-l-0 border-gray-300 rounded-r-lg text-gray-600 text-sm">
                    In months
                  </div>
                </div>
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-600 mb-2 text-sm">
                  Lead Source <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select 
                    value={formData.leadSource}
                    onChange={(e) => handleInputChange('leadSource', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg bg-white appearance-none pr-10 text-sm"
                  >
                    <option value="">Select Lead Source</option>
                    <option value="website">Website</option>
                    <option value="referral">Referral</option>
                    <option value="social">Social Media</option>
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-gray-600 mb-2 text-sm">Campaign</label>
                <div className="relative">
                  <select 
                    value={formData.campaign}
                    onChange={(e) => handleInputChange('campaign', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg bg-white appearance-none pr-10 text-sm"
                  >
                    <option value="">Select Campaign</option>
                    <option value="summer">Summer Campaign</option>
                    <option value="festive">Festive Offer</option>
                    <option value="new-year">New Year Special</option>
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-full mx-auto">
              <button className="flex-1 py-2 px-8 rounded-xl border border-gray-400 text-gray-600 font-medium hover:bg-gray-50 transition-colors">
                Continue Later
              </button>
              <button className="flex-1 py-2 px-8 rounded-xl bg-[#2F3287] text-white font-medium hover:bg-[#252770] transition-colors">
                Save & Proceed
              </button>
            </div>
          </div>
        )}
       </div>
      </div>
    </div>
  );
};

export default CreateLead;