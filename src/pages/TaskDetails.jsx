import React, { useState } from "react";
import { useParams } from "react-router-dom";

const mockTask = {
  id: 1,
  title: "test",
  description: "adsfasdf asdfasdfasdf asddf asd fasdf asdsfa fasdvfbharnabds assasd gasdvabda",
  createDate: "11 Aug, 2025",
  dueDate: "12 Aug, 2025 12:00 PM",
  priority: "HIGH",
  status: "TODO",
  assignee: "Anshul Sharma",
  allocatedBy: "Anshul Sharma",
  attachments: [],
};

const pillStyles = {
  priority: {
    LOW: "bg-green-100 text-green-700 border border-green-200",
    MEDIUM: "bg-yellow-100 text-yellow-700 border border-yellow-200",
    HIGH: "bg-red-100 text-red-700 border border-red-200",
  },
  status: {
    TODO: "bg-orange-100 text-orange-700 border border-orange-200",
    INPROGRESS: "bg-blue-100 text-blue-700 border border-blue-200",
    COMPLETED: "bg-green-100 text-green-700 border border-green-200",
  }
};

const TaskDetails = () => {
  const { id } = useParams();
  // Replace with real fetch logic
  const task = mockTask;

  const [priority, setPriority] = useState(task.priority);
  const [status, setStatus] = useState(task.status);

  return (
    <div className="min-h-screen bg-[#fafafa] p-6">
      {/* Top Card */}
      <div className="bg-[#FFF6E5] rounded-lg px-8 py-4 flex flex-col md:flex-row items-start md:items-center justify-between mb-2">
        <div>
          <div className="text-lg font-bold text-gray-800 mb-1">
            {task.id} - {task.title}
          </div>
          <div className="flex flex-wrap gap-4 items-center text-sm text-gray-700">
            <span>
              Create Date : <span className="font-semibold">{task.createDate}</span>
            </span>
            <span>
              Due Date : <span className="font-semibold">{task.dueDate}</span>
            </span>
            <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-bold ${pillStyles.priority[priority]}`}>
              {priority}
            </span>
            <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-bold ${pillStyles.status[status]}`}>
              {status}
            </span>
            <span>
              Assign To : <span className="font-semibold">{task.assignee}</span>
            </span>
            <span>
              Allocated By : <span className="font-semibold">{task.allocatedBy}</span>
            </span>
          </div>
        </div>
        <button className="ml-auto mt-4 md:mt-0 bg-[#2F3287] text-white px-4 py-2 rounded text-xs font-medium">
          Edit
        </button>
      </div>
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-0">
        <button className="px-4 py-2 text-sm font-medium text-[#2F3287] border-b-2 border-[#2F3287] bg-white">
          Overview
        </button>
      </div>
      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-6 mt-4">
        {/* Left: Description & Details */}
        <div className="flex-1 bg-white rounded-lg shadow-sm p-6">
          <div className="font-bold text-gray-700 mb-2">DESCRIPTION</div>
          <div className="text-gray-600 mb-6">{task.description}</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm text-gray-700">
            <div>
              <div className="font-semibold mb-1">CREATE DATE :</div>
              <div>{task.createDate}</div>
            </div>
            <div>
              <div className="font-semibold mb-1">DUE DATE :</div>
              <div>{task.dueDate}</div>
            </div>
            <div>
              <div className="font-semibold mb-1">PRIORITY :</div>
              <div>
                <select
                  className={`w-full border border-gray-300 rounded px-2 py-1 text-xs font-bold focus:outline-none ${pillStyles.priority[priority]}`}
                  value={priority}
                  onChange={e => setPriority(e.target.value)}
                >
                  <option value="LOW">LOW</option>
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="HIGH">HIGH</option>
                </select>
              </div>
            </div>
            <div>
              <div className="font-semibold mb-1">STATUS :</div>
              <div>
                <select
                  className={`w-full border border-gray-300 rounded px-2 py-1 text-xs font-bold focus:outline-none ${pillStyles.status[status]}`}
                  value={status}
                  onChange={e => setStatus(e.target.value)}
                >
                  <option value="TODO">TODO</option>
                  <option value="INPROGRESS">INPROGRESS</option>
                  <option value="COMPLETED">COMPLETED</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        {/* Right: Assignee & Attachments */}
        <div className="flex flex-col gap-6 w-full md:max-w-xs">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="font-semibold text-gray-700">Assign To:</div>
              <button className="text-gray-400 hover:text-[#2F3287]">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4 12.5-12.5z" />
                </svg>
              </button>
            </div>
            <div className="font-medium text-gray-900">{task.assignee}</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="font-semibold text-gray-700">Attachments</div>
              <button className="bg-red-50 text-red-500 px-3 py-1 rounded text-xs font-medium">+ Add</button>
            </div>
            {/* Attachments list */}
            <div className="text-gray-400 text-sm">No attachments</div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="mt-8 text-xs text-gray-400">
        © 2025 All Rights Reserved. | Version 17
      </div>
    </div>
  );
};

export default TaskDetails;
