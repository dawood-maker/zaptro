import React from "react";
import { Link, useNavigate } from "react-router-dom";

function OrderSummary({ totalItems, totalPrice, totalSavings }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white p-6 rounded-xl shadow-md sticky top-6">
      <h2 className="font-bold text-2xl mb-6 text-gray-800">Order Summary</h2>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-gray-600">
          <span>Total Items:</span>
          <span className="font-semibold">{totalItems}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Subtotal:</span>
          <span className="font-semibold">${totalPrice.toFixed(2)}</span>
        </div>

        {totalSavings > 0 && (
          <div className="flex justify-between text-green-600">
            <span>You Saved:</span>
            <span className="font-semibold">-${totalSavings.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between text-gray-600">
          <span>Shipping:</span>
          <span className="font-semibold text-green-600">FREE</span>
        </div>

        <hr />
        <div className="flex justify-between text-xl font-bold text-gray-800">
          <span>Total:</span>
          <span className="text-green-600">${totalPrice.toFixed(2)}</span>
        </div>
      </div>

      {totalSavings > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
          <p className="text-sm text-green-700 font-semibold text-center">
            🎉 You saved ${totalSavings.toFixed(2)} on this order!
          </p>
        </div>
      )}

      <button
        onClick={() => navigate("/checkout")}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-bold text-lg transition"
      >
        Checkout
      </button>

      <Link
        to="/products"
        className="block text-center text-indigo-600 hover:underline mt-4 font-semibold"
      >
        Continue Shopping
      </Link>
    </div>
  );
}

export default OrderSummary;
