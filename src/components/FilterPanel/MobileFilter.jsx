import React from "react";

const MobileFilters = ({
  isOpen = false,
  setIsOpen = () => {},
  categories = [],
  selectedCategory,
  setSelectedCategory = () => {},
  price = 5000,
  setPrice = () => {},
  handleReset = () => {},
}) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden fixed inset-0 z-50 flex">
      <div
        className="fixed inset-0 bg-black/30"
        onClick={() => setIsOpen(false)}
      ></div>

      <div className="relative w-full max-w-xs bg-white shadow-lg p-4 overflow-y-auto">
        <h3 className="font-semibold text-lg mb-2">Categories</h3>
        <div className="flex flex-col gap-2 mb-6">
          {categories.length > 0 ? (
            categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setIsOpen(false);
                }}
                className={`px-4 py-2 rounded-xl transition-all duration-200 ${
                  selectedCategory === cat
                    ? "bg-red-500 text-white shadow-md"
                    : "bg-gray-100 hover:bg-red-100 hover:scale-105"
                }`}
              >
                {cat}
              </button>
            ))
          ) : (
            <p className="text-gray-500">No categories available</p>
          )}
        </div>

        <h3 className="font-semibold text-lg mb-2">Price Range</h3>
        <input
          type="range"
          min="0"
          max="5000"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="w-full accent-red-500 cursor-pointer"
        />
        <p className="mt-2 text-gray-600 font-medium">$0 - ${price}</p>

        <button
          onClick={handleReset}
          className="w-full py-3 mb-3 bg-gray-200 text-black rounded-xl font-semibold shadow hover:bg-gray-300 transition-transform transform hover:scale-105"
        >
          Reset Filters
        </button>

        <button
          onClick={() => setIsOpen(false)}
          className="w-full py-3 bg-red-500 text-white rounded-xl font-semibold shadow-lg hover:bg-red-600 transition-transform transform hover:scale-105"
        >
          Close Filters
        </button>
      </div>
    </div>
  );
};

export default MobileFilters;