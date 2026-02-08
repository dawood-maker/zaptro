// src/pages/Checkout.jsx
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

function Checkout() {
  const { cartItems, getTotalPrice, getTotalItems, clearCart } = useCart();
  const navigate = useNavigate();

  const [deliveryInfo, setDeliveryInfo] = useState({
    fullName: "",
    address: "",
    state: "",
    postCode: "",
    country: "",
    phoneNo: "",
  });

  const [loading, setLoading] = useState(false);

  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();

  // Calculate total savings
  const totalSavings = cartItems.reduce((total, item) => {
    if (item.originalPrice) {
      return total + (item.originalPrice - item.price) * item.quantity;
    }
    return total;
  }, 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeliveryInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDetectLocation = () => {
    setLoading(true);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`,
            );
            const data = await response.json();

            setDeliveryInfo((prev) => ({
              ...prev,
              address: data.display_name || "",
              state: data.address?.state || "",
              postCode: data.address?.postcode || "",
              country: data.address?.country || "",
            }));
          } catch (error) {
            alert("Could not detect location. Please enter manually.");
          } finally {
            setLoading(false);
          }
        },
        (error) => {
          alert("Location access denied. Please enter manually.");
          setLoading(false);
        },
      );
    } else {
      alert("Geolocation is not supported by your browser.");
      setLoading(false);
    }
  };

  // ✅ Merged handleSubmit with backend fetch
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (
      !deliveryInfo.fullName ||
      !deliveryInfo.address ||
      !deliveryInfo.state ||
      !deliveryInfo.postCode ||
      !deliveryInfo.country ||
      !deliveryInfo.phoneNo
    ) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch("YOUR_API_ENDPOINT", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          deliveryInfo,
          cartItems,
          totalPrice,
        }),
      });

      const data = await response.json();
      console.log("Order successful:", data);

      alert(
        `Order Placed Successfully!\n\nTotal: $${totalPrice.toFixed(
          2,
        )}\nDelivering to: ${deliveryInfo.fullName}`,
      );

      clearCart(); // Clear cart after order
      navigate("/");
    } catch (error) {
      console.error("Order failed:", error);
      alert("Order failed. Please try again.");
    }
  };

  // Redirect if cart is empty
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <p className="text-gray-500 text-xl mb-6">Your cart is empty</p>
          <Link
            to="/products"
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-semibold transition"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-bold text-3xl text-gray-800 mb-2">Checkout</h1>
          <Link
            to="/cart"
            className="text-indigo-600 hover:underline font-semibold"
          >
            ← Back to Cart
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Delivery Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <h2 className="font-bold text-2xl mb-6 text-gray-800">
                Delivery Info
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Full Name */}
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={deliveryInfo.fullName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
                {/* Address */}
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={deliveryInfo.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={deliveryInfo.state}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                  <input
                    type="text"
                    name="postCode"
                    placeholder="PostCode"
                    value={deliveryInfo.postCode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="country"
                    placeholder="Country"
                    value={deliveryInfo.country}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                  <input
                    type="tel"
                    name="phoneNo"
                    placeholder="Phone No"
                    value={deliveryInfo.phoneNo}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg font-bold transition"
                >
                  Place Order
                </button>

                <div className="flex items-center justify-center my-6">
                  <div className="border-t border-gray-300 flex-grow"></div>
                  <span className="px-4 text-gray-500 font-semibold">OR</span>
                  <div className="border-t border-gray-300 flex-grow"></div>
                </div>

                <button
                  type="button"
                  onClick={handleDetectLocation}
                  disabled={loading}
                  className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg font-bold transition disabled:bg-gray-400"
                >
                  {loading ? "Detecting..." : "Detect Location"}
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-md sticky top-6">
              <h2 className="font-bold text-2xl mb-6 text-gray-800">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6 max-h-60 overflow-y-auto">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3 items-center pb-3 border-b"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 rounded-md object-contain"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-sm text-gray-800 line-clamp-2">
                        {item.title}
                      </p>
                      <p className="text-sm text-gray-600">
                        Qty: {item.quantity} × ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Total Items:</span>
                  <span className="font-semibold">{totalItems}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal:</span>
                  <span className="font-semibold">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>

                {totalSavings > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>You Saved:</span>
                    <span className="font-semibold">
                      -${totalSavings.toFixed(2)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-gray-600">
                  <span>Shipping:</span>
                  <span className="font-semibold text-green-600">FREE</span>
                </div>
                <hr />
                <div className="flex justify-between text-xl font-bold text-gray-800">
                  <span>Total:</span>
                  <span className="text-green-600">
                    ${totalPrice.toFixed(2)}
                  </span>
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
