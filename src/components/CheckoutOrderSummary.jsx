import React from "react";

function CheckoutOrderSummary({ cartItems, totalItems, totalPrice, totalSavings }) {
  console.log("CheckoutOrderSummary props:");
  console.log("Cart Items:", cartItems); // ✅ Log all cart items
  console.log("Total Items:", totalItems); // ✅ Log total items
  console.log("Total Price:", totalPrice); // ✅ Log total price
  console.log("Total Savings:", totalSavings); // ✅ Log total savings

  return (
    <div className="bg-white p-6 rounded-xl shadow-md sticky top-6">
      <h2 className="font-bold text-2xl mb-6 text-gray-800">Order Summary</h2>

      <div className="space-y-3 mb-6 max-h-60 overflow-y-auto">
        {cartItems.map((item) => {
          console.log("Rendering item:", item); // ✅ Log each item as it renders
          return (
            <div key={item.id} className="flex gap-3 items-center pb-3 border-b">
              <img
                src={item.image}
                alt={item.title}
                className="w-16 h-16 rounded-md object-contain"
              />
              <div className="flex-1">
                <p className="font-semibold text-sm text-gray-800 line-clamp-2">{item.title}</p>
                <p className="text-sm text-gray-600">
                  Qty: {item.quantity} × ${item.price.toFixed(2)}
                </p>
              </div>
            </div>
          );
        })}
      </div>

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
    </div>
  );
}

export default CheckoutOrderSummary;