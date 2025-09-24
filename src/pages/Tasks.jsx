import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateTaskDrawer = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/30 bg-opacity-30"
        onClick={onClose}
      />
      {/* Drawer */}
      <div className="ml-auto w-full relative z-[100] max-w-md bg-white h-full shadow-xl flex flex-col">
        {/* Header */}
        <div className="bg-[#2F3287] px-6 py-5 flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Create New Task</h2>
          <button
            className="text-white text-2xl font-bold"
            onClick={onClose}
            aria-label="Close"
          >
            &times;
          </button>
        </div>
        {/* Form */}
        <form className="flex-1 relative z-10 overflow-y-auto px-6 py-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Task Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
              placeholder="Enter Task title"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm">
              <option value="">Select</option>
              {/* Add roles here */}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Assign To <span className="text-red-500">*</span>
            </label>
            <select className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm" required>
              <option value="">Select</option>
              {/* Add users here */}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Task Description
            </label>
            <textarea
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
              rows={4}
              placeholder=""
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Due Date
            </label>
            <input
              type="datetime-local"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
              defaultValue="2025-09-25T12:00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <select className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm">
              <option value="">Select Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Attachments
            </label>
            <div className="border border-gray-300 rounded-lg px-4 py-8 flex flex-col items-center justify-center text-gray-500 text-sm">
              <svg width="40" height="40" fill="none" viewBox="0 0 24 24">
                <path d="M12 16V8m0 0l-4 4m4-4l4 4" stroke="#2F3287" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="mt-2">Drop files here or click to upload.</span>
            </div>
          </div>
        </form>
        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 bg-gray-50 ">
          <button
            type="button"
            className="px-5 py-2 rounded bg-gray-100 text-gray-700 text-sm font-medium"
            onClick={onClose}
          >
            Close
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded bg-[#13C29A] text-white text-sm font-medium"
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
};

const Tasks = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  // Example tasks array (replace with real data as needed)
  const tasks = [
    {
      id: 1,
      title: "test",
      description: "adsfasdf asdfasdfasdf asddf asd fasdf asdsfa fasdvfbharnabds assasd gasdvabda",
      assignee: "Anshul Sharma",
      status: "TODO",
    }
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] p-8">
      {/* Header with button on the same line */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-md font-bold text-[#2F3287]">TASKS</h1>
        <button
          className="bg-[#2F3287] text-white px-6 py-2 rounded-full text-xs font-medium shadow hover:bg-[#181778] transition"
          onClick={() => setDrawerOpen(true)}
        >
          + Create New Task
        </button>
      </div>
      <div className="flex gap-8">
        {/* TO DO */}
        <div className="flex-1 min-w-[320px]">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">TO DO</h2>
          <div className="bg-white rounded-lg shadow-sm">
            {/* Example Task Card */}
            {tasks.map(task => (
              <div
                key={task.id}
                className="p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50"
                onClick={() => navigate(`/tasks/${task.id}`)}
              >
                <div className="text-base font-semibold text-[#2F3287] mb-2">{task.title}</div>
                <div className="text-sm text-gray-500 mb-4">
                  {task.description}
                </div>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>#{task.id}</span>
                  <span>
                    Assign to <span className="font-medium text-gray-700">{task.assignee}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* INPROGRESS */}
        <div className="flex-1 min-w-[320px]">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">INPROGRESS</h2>
          <div className="bg-white rounded-lg shadow-sm min-h-[120px] flex items-center justify-center text-gray-400 text-sm">
            No Tasks
          </div>
        </div>
        {/* COMPLETED */}
        <div className="flex-1 min-w-[320px]">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">COMPLETED</h2>
          <div className="bg-white rounded-lg shadow-sm min-h-[120px] flex items-center justify-center text-gray-400 text-sm">
            No Tasks
          </div>
        </div>
      </div>
      <CreateTaskDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
};

export default Tasks;
