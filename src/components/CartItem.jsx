import React from "react";

function CartItem({ item, updateQuantity, removeFromCart }) {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 sm:p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
      {/* Product Image */}
      <img
        src={item.image}
        alt={item.title}
        className="w-32 h-32 sm:w-24 sm:h-24 rounded-xl object-contain mx-auto sm:mx-0"
      />

      {/* Product Info */}
      <div className="flex-1 flex flex-col justify-between w-full mt-4 sm:mt-0">
        <div>
          <h2 className="font-extrabold text-lg sm:text-xl text-gray-900">
            {item.title}
          </h2>

          {item.originalPrice ? (
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span className="text-gray-400 line-through text-sm sm:text-base">
                ${item.originalPrice.toFixed(2)}
              </span>
              <span className="text-green-600 font-semibold text-base sm:text-lg">
                ${item.price.toFixed(2)}
              </span>
              {item.discount && (
                <span className="bg-red-100 text-red-600 text-xs sm:text-sm px-2 py-1 rounded-full font-semibold">
                  {item.discount}% OFF
                </span>
              )}
            </div>
          ) : (
            <p className="text-green-600 font-semibold mt-1 text-base sm:text-lg">
              ${item.price.toFixed(2)}
            </p>
          )}
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center gap-3 mt-4">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="bg-gray-200 hover:bg-gray-300 w-10 h-10 sm:w-9 sm:h-9 rounded-full font-bold text-lg sm:text-base transition transform hover:-translate-y-0.5"
          >
            -
          </button>
          <span className="font-semibold text-lg sm:text-base w-10 text-center">
            {item.quantity}
          </span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="bg-gray-200 hover:bg-gray-300 w-10 h-10 sm:w-9 sm:h-9 rounded-full font-bold text-lg sm:text-base transition transform hover:-translate-y-0.5"
          >
            +
          </button>
        </div>
      </div>

      {/* Price & Remove */}
      <div className="flex flex-col items-end mt-4 sm:mt-0">
        <p className="font-extrabold text-xl sm:text-2xl text-gray-900 mb-3">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
        <button
          onClick={() => removeFromCart(item.id)}
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 sm:px-4 sm:py-2 rounded-xl font-semibold text-sm sm:text-base shadow-md transition transform hover:-translate-y-0.5 hover:shadow-lg"
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default CartItem;
