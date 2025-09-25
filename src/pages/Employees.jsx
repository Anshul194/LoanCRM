import React, { useState, useRef, useEffect } from "react";
import { Filter, Search, User, Eye, Edit2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const employees = [
	{
		id: "EMPAAS001",
		name: "Anshul Sharma",
		personalEmail: "dumy@gmail.com",
		officialEmail: "dumy@gmail.com",
		mobile: "5555555555",
		gender: "",
		role: "Admin",
		reportingTo: "Anshul Sharma",
		createdBy: "Anshul Sharma",
		status: true,
		portalAccess: "No Access",
	},
];

const FilterDropdown = ({ isOpen, onClose, column, position }) => {
	const dropdownRef = useRef(null);
	const [selectedFilter, setSelectedFilter] = useState("Contains");
	const [filterValue, setFilterValue] = useState("");

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				onClose();
			}
		};
		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		}
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isOpen, onClose]);

	useEffect(() => {
		setSelectedFilter("Contains");
		setFilterValue("");
	}, [column]);

	if (!isOpen) return null;

	const filterOptions = [
		"Contains",
		"Does not contain",
		"Equals",
		"Does not equal",
		"Begins with",
		"Ends with",
		"Blank",
		"Not blank",
	];

	return (
		<div
			ref={dropdownRef}
			className="absolute z-50 bg-white border border-gray-300 rounded-lg shadow-lg w-48"
			style={{
				top: position.top,
				left: position.left,
				position: "absolute",
			}}
		>
			<div className="p-3">
				<div className="flex items-center mb-3">
					<Filter className="w-4 h-4 text-blue-500 mr-2" />
					<span className="font-medium text-gray-700 text-sm">
						{column}
					</span>
				</div>
				<div className="mb-3">
					<select
						value={selectedFilter}
						onChange={(e) => setSelectedFilter(e.target.value)}
						className="w-full p-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#2F3287] focus:border-[#2F3287]"
					>
						{filterOptions.map((option) => (
							<option key={option} value={option}>
								{option}
							</option>
						))}
					</select>
				</div>
				{selectedFilter !== "Blank" && selectedFilter !== "Not blank" && (
					<div className="mb-3">
						<input
							type="text"
							placeholder="Filter..."
							value={filterValue}
							onChange={(e) => setFilterValue(e.target.value)}
							className="w-full p-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#2F3287] focus:border-[#2F3287]"
						/>
					</div>
				)}
				<div className="flex justify-end space-x-2">
					<button
						onClick={onClose}
						className="px-3 py-1.5 text-xs text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
					>
						Cancel
					</button>
					<button
						onClick={onClose}
						className="px-3 py-1.5 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
					>
						Apply
					</button>
				</div>
			</div>
		</div>
	);
};

const Employees = () => {
	const [activeFilter, setActiveFilter] = useState(null);
	const [filterPosition, setFilterPosition] = useState({ top: 0, left: 0 });
	const navigate = useNavigate();

	const handleFilterClick = (column, event) => {
		const rect = event.currentTarget.getBoundingClientRect();
		setFilterPosition({
			top: rect.bottom + window.scrollY + 6,
			left: rect.left + window.scrollX,
		});
		setActiveFilter(activeFilter === column ? null : column);
	};
	const closeFilter = () => setActiveFilter(null);

	return (
		<div className="min-h-screen bg-[#fafafa] p-8">
			{/* Header */}
			<div className="flex items-center justify-between mb-4">
				<div className="flex items-center gap-2">
					<span className="w-5 h-5 flex items-center justify-center">
						<svg width="18" height="18" viewBox="0 0 20 20" fill="none">
							<circle
								cx="9"
								cy="10"
								r="8"
								stroke="#2F3287"
								strokeWidth="2"
							/>
							<circle cx="9" cy="10" r="3" fill="#2F3287" />
						</svg>
					</span>
					<span className="text-md font-bold text-[#2F3287] tracking-wide">
						EMPLOYEES
					</span>
				</div>
				<div className="flex gap-2">
					<button
						className="bg-[#2F3287] text-white px-5 py-2 rounded-full text-xs font-medium"
						onClick={() => navigate("/masters/create-employee")}
					>
						+ Create New Employee
					</button>
					<button
						className="border border-[#2F3287] text-[#2F3287] px-5 py-2 rounded-full text-xs font-medium"
						onClick={() => navigate("/masters/roles")}
					>
						Role
					</button>
					<button className="border border-[#2F3287] text-[#2F3287] px-5 py-2 rounded-full text-xs font-medium">
						Incentive Structure
					</button>
				</div>
			</div>
			{/* Table */}
			<div className="bg-white min-h-screen rounded-xl shadow-sm p-4 overflow-x-auto relative">
				{/* Search */}
				<div className="flex items-center gap-4 mb-4">
					<div className="relative max-w-xs w-full">
						<input
							type="text"
							placeholder="Search..."
							className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2F3287] focus:border-[#2F3287]"
						/>
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
					</div>
					<select className="border border-gray-300 rounded-lg px-4 py-2 text-sm">
						<option>All</option>
						{/* Add more filter options if needed */}
					</select>
				</div>
				<table className="w-full">
					<thead>
						<tr className="bg-[#f7fafd] text-xs font-bold text-gray-700 uppercase">
							<th className="px-6 py-3 text-center whitespace-nowrap w-20">
								<div className="flex flex-nowrap items-center justify-center">
									Actions
									<Filter
										className="w-3 h-3 ml-1 text-gray-400 cursor-pointer hover:text-gray-600"
										onClick={(e) => handleFilterClick("Actions", e)}
									/>
								</div>
							</th>
							<th className="px-6 py-3 text-center whitespace-nowrap w-20">
								<div className="flex items-center justify-center">
									Id
									<Filter
										className="w-3 h-3 ml-1 text-gray-400 cursor-pointer hover:text-gray-600"
										onClick={(e) => handleFilterClick("Id", e)}
									/>
								</div>
							</th>
							<th className="px-6 py-3 text-center whitespace-nowrap w-32">
								<div className="flex items-center justify-center">
									Name
									<Filter
										className="w-3 h-3 ml-1 text-gray-400 cursor-pointer hover:text-gray-600"
										onClick={(e) => handleFilterClick("Name", e)}
									/>
								</div>
							</th>
							<th className="px-6 py-3 text-center whitespace-nowrap w-40">
								<div className="flex items-center justify-center">
									Personal Email
									<Filter
										className="w-3 h-3 ml-1 text-gray-400 cursor-pointer hover:text-gray-600"
										onClick={(e) => handleFilterClick("Personal Email", e)}
									/>
								</div>
							</th>
							<th className="px-6 py-3 text-center whitespace-nowrap w-40">
								<div className="flex items-center justify-center">
									Official Email
									<Filter
										className="w-3 h-3 ml-1 text-gray-400 cursor-pointer hover:text-gray-600"
										onClick={(e) => handleFilterClick("Official Email", e)}
									/>
								</div>
							</th>
							<th className="px-6 py-3 text-center whitespace-nowrap w-32">
								<div className="flex items-center justify-center">
									Mobile
									<Filter
										className="w-3 h-3 ml-1 text-gray-400 cursor-pointer hover:text-gray-600"
										onClick={(e) => handleFilterClick("Mobile", e)}
									/>
								</div>
							</th>
							<th className="px-6 py-3 text-center whitespace-nowrap w-24">
								<div className="flex items-center justify-center">
									Gender
									<Filter
										className="w-3 h-3 ml-1 text-gray-400 cursor-pointer hover:text-gray-600"
										onClick={(e) => handleFilterClick("Gender", e)}
									/>
								</div>
							</th>
							<th className="px-6 py-3 text-center whitespace-nowrap w-32">
								<div className="flex items-center justify-center">
									Role
									<Filter
										className="w-3 h-3 ml-1 text-gray-400 cursor-pointer hover:text-gray-600"
										onClick={(e) => handleFilterClick("Role", e)}
									/>
								</div>
							</th>
							<th className="px-6 py-3 text-center whitespace-nowrap w-32">
								<div className="flex items-center justify-center">
									Reporting To
									<Filter
										className="w-3 h-3 ml-1 text-gray-400 cursor-pointer hover:text-gray-600"
										onClick={(e) => handleFilterClick("Reporting To", e)}
									/>
								</div>
							</th>
							<th className="px-6 py-3 text-center whitespace-nowrap w-32">
								<div className="flex items-center justify-center">
									Created By
									<Filter
										className="w-3 h-3 ml-1 text-gray-400 cursor-pointer hover:text-gray-600"
										onClick={(e) => handleFilterClick("Created By", e)}
									/>
								</div>
							</th>
							<th className="px-6 py-3 text-center whitespace-nowrap w-24">
								<div className="flex items-center justify-center">
									Status
									<Filter
										className="w-3 h-3 ml-1 text-gray-400 cursor-pointer hover:text-gray-600"
										onClick={(e) => handleFilterClick("Status", e)}
									/>
								</div>
							</th>
							<th className="px-6 py-3 text-center whitespace-nowrap w-32">
								<div className="flex items-center justify-center">
									Portal Access
									<Filter
										className="w-3 h-3 ml-1 text-gray-400 cursor-pointer hover:text-gray-600"
										onClick={(e) => handleFilterClick("Portal Access", e)}
									/>
								</div>
							</th>
							<th className="px-6 py-3 text-center whitespace-nowrap w-32">
								<div className="flex items-center justify-center">
									Change Password
									<Filter
										className="w-3 h-3 ml-1 text-gray-400 cursor-pointer hover:text-gray-600"
										onClick={(e) => handleFilterClick("Change Password", e)}
									/>
								</div>
							</th>
						</tr>
					</thead>
					<tbody>
						{employees.map((emp) => (
							<tr key={emp.id} className="hover:bg-gray-50">
								<td className="flex px-6 py-2 text-center">
									<button className="bg-[#E8E8F7] p-2 rounded-full mr-2">
										<Edit2 className="w-4 h-4 text-[#4A5DB8]" />
									</button>
									<button className="bg-[#E8E8F7] p-2 rounded-full">
										<Eye className="w-4 h-4 text-[#4A5DB8]" />
									</button>
								</td>
								<td className="px-6 text-sm py-2 text-center text-[#2F3287] font-bold">
									{emp.id}
								</td>
								<td className="px-6 text-sm py-2 whitespace-nowrap text-center">
									{emp.name}
								</td>
								<td className="px-6 text-sm py-2 text-center">
									{emp.personalEmail}
								</td>
								<td className="px-6 text-sm py-2 text-center">
									{emp.officialEmail}
								</td>
								<td className="px-6 text-sm py-2 text-center">
									{emp.mobile}
								</td>
								<td className="px-6 text-sm py-2 text-center">
									{emp.gender}
								</td>
								<td className="px-6 text-sm py-2 text-center">
									{emp.role}
								</td>
								<td className="px-6 text-sm py-2 text-center whitespace-nowrap">
									{emp.reportingTo}
								</td>
								<td className="px-6 text-sm py-2 text-center whitespace-nowrap">
									{emp.createdBy}
								</td>
								<td className="px-6 text-sm py-2 text-center">
									<span className="inline-block w-8 h-4 rounded-full bg-green-200">
										{/* status toggle */}
										<span className="inline-block w-4 h-4 rounded-full bg-green-500 ml-4"></span>
									</span>
								</td>
								<td className="px-6 py-2 text-center">
									<span className="px-2 py-1 rounded bg-gray-100 text-xs text-gray-600">
										{emp.portalAccess}
									</span>
									<span className="ml-2 text-green-500">&#10003;</span>
								</td>
								<td className="px-6 py-2 text-center">
									<span className="inline-block w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
										<span className="text-gray-400">&#128274;</span>
									</span>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				{/* Filter Dropdown */}
				<FilterDropdown
					isOpen={activeFilter !== null}
					onClose={closeFilter}
					column={activeFilter}
					position={filterPosition}
				/>
			</div>
		</div>
	);
};

export default Employees;
