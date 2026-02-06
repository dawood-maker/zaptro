import React, { useState } from "react";

export default function Sidebar({
  categories,
  selectedCategory,
  setSelectedCategory,
  price,
  setPrice,
}) {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleReset = () => {
    setSelectedCategory("ALL");
    setPrice(5000);
    setSearch("");
  };

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="md:hidden fixed top-6 left-4 z-50 p-3 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-transform transform hover:scale-110"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "✕" : "☰"}
      </button>

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-full w-72 p-6 bg-white rounded-r-2xl shadow-2xl space-y-6 z-40
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:relative md:translate-x-0 md:w-72 md:rounded-2xl md:shadow-none
        `}
      >
        {/* Search Box */}
        <div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full p-3 rounded-xl border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-300 transition-all duration-300 outline-none"
          />
        </div>

        {/* Category Dropdown */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Categories</h3>
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setIsOpen(false); // close sidebar on mobile
            }}
            className="w-full p-3 rounded-xl border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-300 transition-all duration-300 outline-none cursor-pointer"
          >
            <option value="ALL">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Price Range</h3>
          <input
            type="range"
            min="0"
            max="5000"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full accent-red-500 cursor-pointer"
          />
          <p className="mt-2 text-gray-600 font-medium">$0 - ${price}</p>
        </div>

        {/* Reset Button */}
        <div>
          <button
            onClick={handleReset}
            className="w-full py-3 bg-red-500 text-white rounded-xl font-semibold shadow-lg hover:bg-red-600 transition-transform transform hover:scale-105"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 md:hidden z-30 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
