import React from "react";
import { Link, useNavigate } from "react-router-dom";

function OrderSummary({ totalItems, totalPrice, totalSavings }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 sticky top-4 sm:top-6">
      <h2 className="font-extrabold text-2xl sm:text-3xl mb-6 text-gray-900">
        Order Summary
      </h2>

      {/* Summary Details */}
      <div className="space-y-4 mb-6">
        <div className="flex justify-between text-gray-600">
          <span>Total Items:</span>
          <span className="font-semibold">{totalItems}</span>
        </div>

        <div className="flex justify-between text-gray-600">
          <span>Subtotal:</span>
          <span className="font-semibold">${totalPrice.toFixed(2)}</span>
        </div>

        {totalSavings > 0 && (
          <div className="flex justify-between text-green-600 font-semibold">
            <span>You Saved:</span>
            <span>-${totalSavings.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between text-gray-600 font-medium">
          <span>Shipping:</span>
          <span className="text-green-600 font-semibold">FREE</span>
        </div>

        <hr className="my-4 border-gray-200" />

        <div className="flex justify-between text-xl sm:text-2xl font-extrabold text-gray-900">
          <span>Total:</span>
          <span className="text-green-600">${totalPrice.toFixed(2)}</span>
        </div>
      </div>

      {/* Savings Badge */}
      {totalSavings > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-3 mb-6 animate-pulse">
          <p className="text-sm sm:text-base text-green-700 font-semibold text-center">
            🎉 You saved ${totalSavings.toFixed(2)} on this order!
          </p>
        </div>
      )}

      {/* Checkout Button */}
      <button
        onClick={() => navigate("/checkout")}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 sm:py-4 rounded-2xl font-bold text-lg sm:text-xl shadow-lg transition transform hover:-translate-y-0.5 hover:shadow-xl"
      >
        Checkout
      </button>

      {/* Continue Shopping */}
      <Link
        to="/products"
        className="block text-center text-indigo-600 hover:underline mt-4 font-semibold text-sm sm:text-base"
      >
        Continue Shopping
      </Link>
    </div>
  );
}

export default OrderSummary;