import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext"; // Your cart context
import { useUser } from "@clerk/clerk-react"; // For auth check

const ProductCard = ({ item }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isSignedIn } = useUser();

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent navigation when clicking button
    console.log("🛒 Add to Cart clicked for product:", item);

    if (isSignedIn) {
      console.log("✅ User is signed in. Adding to cart...");
      addToCart(item);
    } else {
      console.log("⚠️ User not signed in. Cannot add to cart.");
      alert("Please sign in to add items to the cart");
    }
  };

  const handleNavigate = () => {
    console.log("➡️ Navigating to product page for:", item.id);
    navigate(`/product/${item.id}`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-transform duration-300 hover:-translate-y-3 group overflow-hidden">
      {/* Image */}
      <div
        className="h-52 sm:h-60 bg-gray-100 flex items-center justify-center p-4 relative cursor-pointer"
        onClick={handleNavigate}
      >
        <img
          src={item.image || ""}
          alt={item.title || "Product"}
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
          {item.title || "No title"}
        </h3>

        <div className="flex justify-between items-center mt-4">
          <span className="text-xl font-bold text-green-600">
            ${item.price || "0.00"}
          </span>

          <button
            onClick={handleAddToCart}
            disabled={!isSignedIn}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
              isSignedIn
                ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                : "bg-gray-400 cursor-not-allowed text-gray-200"
            }`}
          >
            {isSignedIn ? "Add to Cart" : "Sign in to Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;