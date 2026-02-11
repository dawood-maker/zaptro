import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext"; // Your cart context
import { useUser } from "@clerk/clerk-react"; // For auth check
import Swal from "sweetalert2";

const ProductCard = ({ item }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isSignedIn } = useUser();

  // Handle adding product to cart
  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent navigation when clicking button
    console.log("🛒 Add to Cart clicked for product:", item);

    if (!isSignedIn) {
      console.log("⚠️ User not signed in. Cannot add to cart.");
      Swal.fire({
        title: "Sign in required",
        text: "Please sign in to add items to the cart",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }

    // Show success alert and optionally navigate to cart
    Swal.fire({
      title: "Added to Cart!",
      text: `${item.title} has been added.`,
      icon: "success",
      confirmButtonText: "Go to Cart",
    }).then((result) => {
      addToCart(item);
      if (result.isConfirmed) {
        navigate("/cart");
      }
    });
  };

  // Navigate to product details page
  const handleNavigate = () => {
    console.log("➡️ Navigating to product page for:", item.id);
    navigate(`/product/${item.id}`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-transform duration-300 hover:-translate-y-3 group overflow-hidden cursor-pointer">
      {/* Image */}
      <div
        className="h-52 sm:h-60 bg-gray-100 flex items-center justify-center p-4 relative"
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
