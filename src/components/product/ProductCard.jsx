import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ item, onAddToCart }) => {
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent navigation when clicking button
    onAddToCart(item);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-transform duration-300 hover:-translate-y-3 group overflow-hidden">
      {/* Image */}
      <div
        className="h-52 sm:h-60 bg-gray-100 flex items-center justify-center p-4 relative cursor-pointer"
        onClick={() => navigate(`/product/${item.id}`)}
      >
        <img
          src={item.image}
          alt={item.title}
          className="object-contain h-full w-full transition-transform duration-500 group-hover:scale-110"
        />

        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
          <span className="text-white text-lg font-semibold px-4 py-2 bg-indigo-600 rounded-lg">
            Quick View
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-bold mt-2 line-clamp-2 text-gray-800">
          {item.title}
        </h3>

        <div className="flex justify-between items-center mt-4">
          <span className="text-xl font-bold text-green-600">
            ${item.price}
          </span>

          <button
            onClick={handleAddToCart}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
