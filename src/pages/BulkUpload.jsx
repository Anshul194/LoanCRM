import React, { useRef } from "react";

const BulkUpload = () => {
  const fileInputRef = useRef();

  const handleDrop = (e) => {
    e.preventDefault();
    // handle file drop logic here
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="min-h-screen bg-[#f7f7f7] p-8">
      <div className="flex items-center gap-2 mb-8">
        <span className="text-[#2F3287] font-bold text-md flex items-center">
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="mr-2">
            <circle cx="9" cy="10" r="8" stroke="#2F3287" strokeWidth="2" />
            <circle cx="9" cy="10" r="3" fill="#2F3287" />
          </svg>
          BULK UPLOAD
        </span>
      </div>
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-6">
        <div className="text-lg font-semibold mb-4">1. Sheet Selection</div>
        <div
          className="border-2 border-dashed border-gray-400 rounded-lg h-48 flex items-center justify-center cursor-pointer transition hover:border-[#2F3287] bg-white"
          onClick={handleClick}
          onDrop={handleDrop}
          onDragOver={e => e.preventDefault()}
        >
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            // onChange={handleFileChange}
          />
          <span className="text-gray-500 text-md">
            Drag and drop file here, or click to select file
          </span>
        </div>
      </div>
    </div>
  );
};

export default BulkUpload;
