import React from "react";

export default function Sidebar({
  categories,
  selectedCategory,
  setSelectedCategory,
  price,
  setPrice,
}) {
  const handleReset = () => {
    setSelectedCategory("ALL");
    setPrice(5000);
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow">
      <input
        className="w-full p-2 border rounded mb-4"
        placeholder="Search..."
      />

      <h3 className="font-semibold mb-2">Category</h3>
      {categories.map((cat) => (
        <label key={cat} className="flex items-center gap-2 text-sm mb-1">
          <input
            type="radio"
            checked={selectedCategory === cat}
            onChange={() => setSelectedCategory(cat)}
          />
          {cat}
        </label>
      ))}

      <h3 className="font-semibold mt-4">Price Range</h3>
      <input
        type="range"
        min="0"
        max="5000"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
        className="w-full mt-2"
      />
      <p className="text-sm mt-1">$0 - ${price}</p>

      <button
        onClick={handleReset}
        className="mt-4 w-full bg-red-500 text-white py-2 rounded"
      >
        Reset Filters
      </button>
    </div>
  );
}
