import React from 'react';
import { ChevronRight } from 'lucide-react';

const MyTasks = () => {
  return (
    <div className=" rounded-lg w-full lg:w-1/2">
      {/* Header */}
      <div className="px-2 py-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">My Task & Follow ups</h2>
      </div>
      
      {/* Task Item */}
      <div className="px-2 bg-white py-2 hover:bg-gray-50 cursor-pointer group">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            {/* Task Title */}
            <div className="text-xs text-gray-800 font-medium mb-1">test</div>
            
            {/* Task Description */}
            <div className="text-xs text-gray-500 mb-3 leading-relaxed">
              asdfasdf asdfsadfasdf assdaf asd fasdf asdadfa fasdfvfbharnabds assasd gasdvabda
            </div>
            
            {/* Tags */}
            <div className="flex gap-2 flex-wrap">
              <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800 border border-gray-300">
                TASK
              </span>
              <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-700 border border-red-200">
                12 Aug 2025, 12:00 PM
              </span>
              <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-700 border border-blue-200">
                Upcoming
              </span>
            </div>
          </div>
          
          {/* Arrow Icon */}
          <div className="ml-4 flex-shrink-0">
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTasks;