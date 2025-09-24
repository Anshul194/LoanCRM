import React from "react";

const CreateEmployee = () => {
  return (
    <div className="min-h-screen bg-[#fafafa] p-8">
      <h1 className="text-lg font-bold mb-6">Create Employee</h1>
      <form className="space-y-8">
        {/* Official & Personal Details */}
        <div className="grid grid-cols-2 gap-8">
          {/* Official Details */}
          <div>
            <h2 className="font-semibold text-gray-700 mb-4">Official Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Employee ID *</label>
                <input className="w-full mt-1 border border-gray-300 rounded px-3 py-2" placeholder="Enter Employee ID" />
              </div>
              <div>
                <label className="text-sm font-medium">Employee Name *</label>
                <input className="w-full mt-1 border border-gray-300 rounded px-3 py-2" placeholder="Enter Employee Name" />
              </div>
              <div>
                <label className="text-sm font-medium">Official Email id *</label>
                <input className="w-full mt-1 border border-gray-300 rounded px-3 py-2" placeholder="enter official email id" />
              </div>
              <div>
                <label className="text-sm font-medium">Office Mobile</label>
                <input className="w-full mt-1 border border-gray-300 rounded px-3 py-2" placeholder="Enter Office Mobile" />
              </div>
              <div>
                <label className="text-sm font-medium">Reporting To *</label>
                <select className="w-full mt-1 border border-gray-300 rounded px-3 py-2">
                  <option>Select Reporting To</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Role *</label>
                <select className="w-full mt-1 border border-gray-300 rounded px-3 py-2">
                  <option>Select Role</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Branch*</label>
                <input className="w-full mt-1 border border-gray-300 rounded px-3 py-2" placeholder="" />
              </div>
              <div>
                <label className="text-sm font-medium">Date of Joining</label>
                <input className="w-full mt-1 border border-gray-300 rounded px-3 py-2" placeholder="Enter Date of Joining" />
              </div>
              <div>
                <label className="text-sm font-medium">Pan No</label>
                <input className="w-full mt-1 border border-gray-300 rounded px-3 py-2" placeholder="ENTER PAN NO" />
              </div>
              <div>
                <label className="text-sm font-medium">PF No</label>
                <input className="w-full mt-1 border border-gray-300 rounded px-3 py-2" placeholder="Enter PF No" />
              </div>
              <div>
                <label className="text-sm font-medium">ESI No</label>
                <input className="w-full mt-1 border border-gray-300 rounded px-3 py-2" placeholder="Enter ESI No" />
              </div>
            </div>
          </div>
          {/* Personal Details */}
          <div>
            <h2 className="font-semibold text-gray-700 mb-4">Personal Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Mobile No.*</label>
                <input className="w-full mt-1 border border-gray-300 rounded px-3 py-2" placeholder="Enter Mobile No." />
              </div>
              <div>
                <label className="text-sm font-medium">Email*</label>
                <input className="w-full mt-1 border border-gray-300 rounded px-3 py-2" placeholder="enter email" />
              </div>
              <div>
                <label className="text-sm font-medium">Whatsapp No.</label>
                <input className="w-full mt-1 border border-gray-300 rounded px-3 py-2" placeholder="Enter Whatsapp No." />
              </div>
              <div>
                <label className="text-sm font-medium">Gender*</label>
                <select className="w-full mt-1 border border-gray-300 rounded px-3 py-2">
                  <option>Select Gender</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Blood Group</label>
                <input className="w-full mt-1 border border-gray-300 rounded px-3 py-2" placeholder="Enter Education" />
              </div>
              <div>
                <label className="text-sm font-medium">Aadhar Card No.</label>
                <input className="w-full mt-1 border border-gray-300 rounded px-3 py-2" placeholder="Enter Aadhar Card No." />
              </div>
              <div>
                <label className="text-sm font-medium">Date of Birth</label>
                <input className="w-full mt-1 border border-gray-300 rounded px-3 py-2" placeholder="Enter Date of Birth" />
              </div>
              <div>
                <label className="text-sm font-medium">Date of Anniversary</label>
                <input className="w-full mt-1 border border-gray-300 rounded px-3 py-2" placeholder="Enter Date of Anniversary" />
              </div>
              <div>
                <label className="text-sm font-medium">Marital Status</label>
                <select className="w-full mt-1 border border-gray-300 rounded px-3 py-2">
                  <option>Select Marital Status</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Education</label>
                <input className="w-full mt-1 border border-gray-300 rounded px-3 py-2" placeholder="Enter Education" />
              </div>
              <div>
                <label className="text-sm font-medium">Bank Account Name</label>
                <input className="w-full mt-1 border border-gray-300 rounded px-3 py-2" placeholder="Enter Bank Account Name" />
              </div>
              <div>
                <label className="text-sm font-medium">Bank Account No.</label>
                <input className="w-full mt-1 border border-gray-300 rounded px-3 py-2" placeholder="Enter Bank Account No." />
              </div>
              <div>
                <label className="text-sm font-medium">Photo</label>
                <input type="file" className="w-full mt-1 border border-gray-300 rounded px-3 py-2" />
              </div>
            </div>
          </div>
        </div>
        {/* Address Details */}
        <div className="grid grid-cols-2 gap-8">
          {/* Current Address */}
          <div>
            <h2 className="font-semibold text-gray-700 mb-4">Current Address Details</h2>
            <div className="space-y-4">
              <textarea className="w-full border border-gray-300 rounded px-3 py-2" placeholder="Enter Address" />
              <div className="grid grid-cols-3 gap-4">
                <select className="w-full border border-gray-300 rounded px-3 py-2">
                  <option>Select State</option>
                </select>
                <input className="w-full border border-gray-300 rounded px-3 py-2" placeholder="Enter City" />
                <input className="w-full border border-gray-300 rounded px-3 py-2" placeholder="Enter Pincode" />
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" />
                Same as Current Address
              </label>
            </div>
          </div>
          {/* Permanent Address */}
          <div>
            <h2 className="font-semibold text-gray-700 mb-4">Permanent Address Details</h2>
            <div className="space-y-4">
              <textarea className="w-full border border-gray-300 rounded px-3 py-2" placeholder="Enter Address" />
              <div className="grid grid-cols-3 gap-4">
                <select className="w-full border border-gray-300 rounded px-3 py-2">
                  <option>Select State</option>
                </select>
                <input className="w-full border border-gray-300 rounded px-3 py-2" placeholder="Enter City" />
                <input className="w-full border border-gray-300 rounded px-3 py-2" placeholder="Enter Pincode" />
              </div>
            </div>
          </div>
        </div>
        {/* Target, Incentive, Emergency Contact */}
        <div className="grid grid-cols-3 gap-8">
          {/* Target Details */}
          <div>
            <h2 className="font-semibold text-gray-700 mb-4">Target Details</h2>
            <select className="w-full border border-gray-300 rounded px-3 py-2">
              <option>No</option>
            </select>
          </div>
          {/* Incentive Details */}
          <div>
            <h2 className="font-semibold text-gray-700 mb-4">Incentive Details</h2>
            <select className="w-full border border-gray-300 rounded px-3 py-2">
              <option>No</option>
            </select>
          </div>
          {/* Emergency Contact Details */}
          <div>
            <h2 className="font-semibold text-gray-700 mb-4">Emergency Contact Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <input className="w-full border border-gray-300 rounded px-3 py-2" placeholder="Enter Contact Name" />
              <input className="w-full border border-gray-300 rounded px-3 py-2" placeholder="Enter Contact Person Mobile" />
              <input className="w-full border border-gray-300 rounded px-3 py-2" placeholder="Enter Relation" />
            </div>
          </div>
        </div>
        {/* Submit Button */}
        <div className="flex justify-end">
          <button className="bg-[#2F3287] text-white px-8 py-2 rounded-full font-medium">Create</button>
        </div>
      </form>
    </div>
  );
};

export default CreateEmployee;
