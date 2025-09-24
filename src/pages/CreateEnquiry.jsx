import React, { useState } from "react";
import { ChevronLeft, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CreateEnquiry = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    mobile: "",
    accountManager: "Anshul Sharma",
    firstName: "",
    middleName: "",
    lastName: "",
    productType: "",
    alternatePhone: "",
    dob: "",
    email: "",
    pan: "",
    employmentType: "",
    leadSource: ""
  });

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  return (
    <div className="min-h-screen bg-[#fafafa] p-8">
      <div className="flex items-center gap-2 mb-8">
        <button
          className="text-[#2F3287] flex items-center gap-2 font-bold"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="w-5 h-5" />
          CREATE ENQUIRIES
        </button>
        <span className="ml-auto text-gray-400 text-sm">
          Leads &nbsp; &gt; &nbsp; <span className="text-[#2F3287]">Create Enquiries</span>
        </span>
      </div>
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow p-8">
        <h2 className="text-xl font-semibold mb-6">Create Enquiries</h2>
        <form className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Mobile <span className="text-red-500">*</span></label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm"
              placeholder="Enter Mobile"
              value={form.mobile}
              onChange={e => handleChange("mobile", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Account Manager <span className="text-red-500">*</span></label>
            <div className="relative">
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm"
                value={form.accountManager}
                readOnly
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                onClick={() => handleChange("accountManager", "")}
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">First Name (Name As Per Pan)</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm"
              placeholder="Enter First Name"
              value={form.firstName}
              onChange={e => handleChange("firstName", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Middle Name (Name As Per Pan)</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm"
              placeholder="Enter Middle Name"
              value={form.middleName}
              onChange={e => handleChange("middleName", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Last Name (Name As Per Pan)</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm"
              placeholder="Enter Last Name"
              value={form.lastName}
              onChange={e => handleChange("lastName", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Product Type</label>
            <div className="relative">
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm"
                placeholder="Product Type"
                value={form.productType}
                onChange={e => handleChange("productType", e.target.value)}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                onClick={() => handleChange("productType", "")}
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Alternate Phone</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm"
              placeholder="Enter the No."
              value={form.alternatePhone}
              onChange={e => handleChange("alternatePhone", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Date of Birth</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm"
              placeholder="dd-mm-yyyy"
              value={form.dob}
              onChange={e => handleChange("dob", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm"
              placeholder="Enter Email"
              value={form.email}
              onChange={e => handleChange("email", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Pan No.</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm"
              placeholder="ABCDE 1234 F"
              value={form.pan}
              onChange={e => handleChange("pan", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Employment Type</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm"
              placeholder="Employment Type"
              value={form.employmentType}
              onChange={e => handleChange("employmentType", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Lead Source</label>
            <div className="relative">
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm"
                placeholder="Lead Source"
                value={form.leadSource}
                onChange={e => handleChange("leadSource", e.target.value)}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                onClick={() => handleChange("leadSource", "")}
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
        </form>
        <div className="flex justify-end mt-8">
          <button
            type="submit"
            className="px-8 py-3 rounded-xl bg-[#2F3287] text-white font-medium hover:bg-[#181778] transition-colors"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateEnquiry;
