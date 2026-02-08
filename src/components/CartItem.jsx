import React from "react";

function CartItem({ item, updateQuantity, removeFromCart }) {
  return (
    <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-md">
      <img
        src={item.image}
        alt={item.title}
        className="w-24 h-24 rounded-md object-contain"
      />

      <div className="flex-1">
        <h2 className="font-bold text-lg text-gray-800">{item.title}</h2>

        {item.originalPrice ? (
          <div className="flex items-center gap-2 mt-1">
            <span className="text-gray-400 line-through text-sm">
              ${item.originalPrice.toFixed(2)}
            </span>
            <span className="text-green-600 font-semibold">
              ${item.price.toFixed(2)}
            </span>
            {item.discount && (
              <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded">
                {item.discount}% OFF
              </span>
            )}
          </div>
        ) : (
          <p className="text-green-600 font-semibold mt-1">${item.price}</p>
        )}

        <div className="flex items-center gap-3 mt-3">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="bg-gray-200 hover:bg-gray-300 w-8 h-8 rounded-md font-bold transition"
          >
            -
          </button>
          <span className="font-semibold text-lg w-8 text-center">
            {item.quantity}
          </span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="bg-gray-200 hover:bg-gray-300 w-8 h-8 rounded-md font-bold transition"
          >
            +
          </button>
        </div>
      </div>

      <div className="text-right">
        <p className="font-bold text-xl text-gray-800 mb-3">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
        <button
          onClick={() => removeFromCart(item.id)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition text-sm font-semibold"
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default CartItem;
