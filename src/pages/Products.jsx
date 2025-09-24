import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Filter, Search, Edit2, Trash2, ExternalLink } from "lucide-react";

const products = [
	{
		sr: 1,
		name: "Home Loan",
		img: "/assets/products/home-loan.png",
		createdBy: "Admin",
	},
	{
		sr: 2,
		name: "Loan Against Property",
		img: "/assets/products/property-loan.png",
		createdBy: "Admin",
	},
	{
		sr: 3,
		name: "Business Loan",
		img: "/assets/products/business-loan.png",
		createdBy: "Admin",
	},
	{
		sr: 4,
		name: "Vehicle Loan",
		img: "/assets/products/vehicle-loan.png",
		createdBy: "Admin",
	},
	{
		sr: 5,
		name: "Bima Loan",
		img: "/assets/products/bima-loan.png",
		createdBy: "Admin",
	},
	{
		sr: 6,
		name: "Cash Credit",
		img: "/assets/products/cash-credit.png",
		createdBy: "Admin",
	},
	{
		sr: 7,
		name: "Agri Loan",
		img: "/assets/products/agri-loan.png",
		createdBy: "Admin",
	},
	{
		sr: 8,
		name: "Education Loan",
		img: "/assets/products/education-loan.png",
		createdBy: "Admin",
	},
	{
		sr: 9,
		name: "Overdraft",
		img: "/assets/products/overdraft.png",
		createdBy: "Admin",
	},
	{
		sr: 10,
		name: "Personal Loan",
		img: "/assets/products/personal-loan.png",
		createdBy: "Admin",
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

	// Use portal for dropdown
	return createPortal(
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
				{selectedFilter !== "Blank" &&
					selectedFilter !== "Not blank" && (
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
						onClick={() => {
							if (typeof window.handleApplyFilter === "function") {
								window.handleApplyFilter(
									column,
									selectedFilter,
									filterValue
								);
							}
						}}
						className="px-3 py-1.5 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
					>
						Apply
					</button>
				</div>
			</div>
		</div>,
		document.body
	);
};

const Products = () => {
	const [activeFilter, setActiveFilter] = useState(null);
	const [filterPosition, setFilterPosition] = useState({ top: 0, left: 0 });

	const handleFilterClick = (column, event) => {
		const rect = event.currentTarget.getBoundingClientRect();
		setFilterPosition({
			top: rect.bottom + window.scrollY + 6, // 6px gap below icon
			left: rect.left + window.scrollX,
		});
		setActiveFilter(activeFilter === column ? null : column);
	};
	const closeFilter = () => {
		setActiveFilter(null);
	};
	const handleApplyFilter = () => {
		setActiveFilter(null);
	};

	return (
		<div className="min-h-screen bg-[#fafafa] p-8">
			{/* Header */}
			<div className="flex items-center justify-between mb-6">
				<div className="flex items-center gap-2">
					<span className="w-5 h-5 flex items-center justify-center">
						<svg width="18" height="18" viewBox="0 0 20 20" fill="none">
							<circle cx="9" cy="10" r="8" stroke="#2F3287" strokeWidth="2" />
							<circle cx="9" cy="10" r="3" fill="#2F3287" />
						</svg>
					</span>
					<span className="text-lg font-bold text-[#2F3287] tracking-wide">
						PRODUCT
					</span>
				</div>
				<button className="bg-[#2F3287] text-white px-6 py-2 rounded-full text-sm font-medium">
					+ Create New Product
				</button>
			</div>
			{/* Card */}
			<div className="bg-white rounded-xl shadow-sm p-4">
				{/* Search */}
				<div className="mb-4">
					<div className="relative max-w-lg">
						<input
							type="text"
							placeholder="Search..."
							className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2F3287] focus:border-[#2F3287]"
						/>
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
					</div>
				</div>
				{/* Table */}
				<div className="overflow-x-auto">
					<table className="w-full relative">
						<thead>
							<tr className="bg-[#f7fafd] text-xs font-bold text-gray-700 uppercase">
								<th className="px-4 py-3 text-left whitespace-nowrap w-12">
									<div className="flex items-center">
										SR
										<Filter
											className="w-3 h-3 ml-1 text-gray-400 cursor-pointer hover:text-gray-600"
											onClick={(e) => handleFilterClick("SR", e)}
										/>
									</div>
								</th>
								<th className="px-4 py-3 text-center whitespace-nowrap w-20">
									<div className="flex items-center justify-center">
										Image
										<Filter
											className="w-3 h-3 ml-1 text-gray-400 cursor-pointer hover:text-gray-600"
											onClick={(e) => handleFilterClick("Image", e)}
										/>
									</div>
								</th>
								<th className="px-4 py-3 text-left whitespace-nowrap w-56">
									<div className="flex items-center">
										Product Name
										<Filter
											className="w-3 h-3 ml-1 text-gray-400 cursor-pointer hover:text-gray-600"
											onClick={(e) => handleFilterClick("Product Name", e)}
										/>
									</div>
								</th>
								<th className="px-4 py-3 text-left whitespace-nowrap w-40">
									<div className="flex items-center">
										Created By
										<Filter
											className="w-3 h-3 ml-1 text-gray-400 cursor-pointer hover:text-gray-600"
											onClick={(e) => handleFilterClick("Created By", e)}
										/>
									</div>
								</th>
								<th className="px-4 py-3 text-center whitespace-nowrap w-56">
									<div className="flex items-center justify-center">
										Manage Product Purpose
										<Filter
											className="w-3 h-3 ml-1 text-gray-400 cursor-pointer hover:text-gray-600"
											onClick={(e) =>
												handleFilterClick("Manage Product Purpose", e)
											}
										/>
									</div>
								</th>
								<th className="px-4 py-3 text-center whitespace-nowrap w-40">
									<div className="flex items-center justify-center">
										Actions
										<Filter
											className="w-3 h-3 ml-1 text-gray-400 cursor-pointer hover:text-gray-600"
											onClick={(e) => handleFilterClick("Actions", e)}
										/>
									</div>
								</th>
							</tr>
						</thead>
						<tbody>
							{products.map((product) => (
								<tr key={product.sr} className="hover:bg-gray-50">
									<td className="px-4 py-2 text-sm text-gray-700 w-12">
										{product.sr}
									</td>
									<td className="px-4 py-2 text-center w-20">
										<img
											src={product.img}
											alt={product.name}
											className="w-10 h-10 rounded-full object-contain mx-auto"
										/>
									</td>
									<td className="px-4 py-2 text-sm text-gray-700 w-56">
										{product.name}
									</td>
									<td className="px-4 py-2 text-sm text-gray-700 w-40">
										{product.createdBy}
									</td>
									<td className="px-4 py-2 text-center w-56">
										<button className="bg-[#E8E8F7] p-2 rounded-full inline-flex items-center justify-center">
											<ExternalLink className="w-4 h-4 text-[#4A5DB8]" />
										</button>
									</td>
									<td className="px-4 py-2 text-center w-40">
										<div className="flex gap-2 justify-center items-center">
											<button className="bg-[#E8E8F7] p-2 rounded-full inline-flex items-center justify-center">
												<Edit2 className="w-4 h-4 text-[#4A5DB8]" />
											</button>
											<button className="bg-[#FDE8E8] p-2 rounded-full inline-flex items-center justify-center">
												<Trash2 className="w-4 h-4 text-[#F43F5E]" />
											</button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
					{/* Filter Dropdown */}
					{(() => {
						window.handleApplyFilter = handleApplyFilter;
					})()}
					<FilterDropdown
						isOpen={activeFilter !== null}
						onClose={closeFilter}
						column={activeFilter}
						position={filterPosition}
					/>
				</div>
			</div>
		</div>
	);
};

export default Products;
