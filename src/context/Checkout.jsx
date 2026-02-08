import { useState } from "react";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import DeliveryForm from "../components/DeliveryForm";
import CheckoutOrderSummary from "../components/CheckoutOrderSummary";

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

  const totalSavings = cartItems.reduce((total, item) => {
    if (item.originalPrice) {
      return total + (item.originalPrice - item.price) * item.quantity;
    }
    return total;
  }, 0);

  console.log("Cart Items:", cartItems); // ✅ Log cart items
  console.log("Total Price:", totalPrice); // ✅ Log total price
  console.log("Total Items:", totalItems); // ✅ Log total items
  console.log("Total Savings:", totalSavings); // ✅ Log total savings
  console.log("Delivery Info:", deliveryInfo); // ✅ Log delivery info state

  const handleDetectLocation = () => {
    setLoading(true);
    console.log("Detecting location..."); // ✅ Log when location detection starts
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          console.log("Position detected:", position); // ✅ Log position
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`
            );
            const data = await response.json();
            console.log("Reverse geocode data:", data); // ✅ Log API response
            setDeliveryInfo((prev) => ({
              ...prev,
              address: data.display_name || "",
              state: data.address?.state || "",
              postCode: data.address?.postcode || "",
              country: data.address?.country || "",
            }));
          } catch (error) {
            console.error("Error detecting location:", error); // ✅ Log errors
            alert("Could not detect location. Please enter manually.");
          } finally {
            setLoading(false);
          }
        },
        (error) => {
          console.error("Geolocation error:", error); // ✅ Log geolocation errors
          alert("Location access denied. Please enter manually.");
          setLoading(false);
        }
      );
    } else {
      console.warn("Geolocation not supported"); // ✅ Warn if not supported
      alert("Geolocation is not supported by your browser.");
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting order..."); // ✅ Log submission start
    console.log("Delivery Info:", deliveryInfo); // ✅ Log delivery info before submission
    console.log("Cart Items at submission:", cartItems); // ✅ Log cart items at submission
    console.log("Total Price at submission:", totalPrice); // ✅ Log total price at submission

    if (
      !deliveryInfo.fullName ||
      !deliveryInfo.address ||
      !deliveryInfo.state ||
      !deliveryInfo.postCode ||
      !deliveryInfo.country ||
      !deliveryInfo.phoneNo
    ) {
      console.warn("Form incomplete"); // ✅ Warn if fields missing
      alert("Please fill in all fields");
      return;
    }
    try {
      const response = await fetch("YOUR_API_ENDPOINT", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deliveryInfo, cartItems, totalPrice }),
      });
      const data = await response.json();
      console.log("Order successful:", data); // ✅ Log successful response
      alert(
        `Order Placed Successfully!\n\nTotal: $${totalPrice.toFixed(
          2
        )}\nDelivering to: ${deliveryInfo.fullName}`
      );
      clearCart();
      navigate("/");
    } catch (error) {
      console.error("Order failed:", error); // ✅ Log submission error
      alert("Order failed. Please try again.");
    }
  };

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
        <div className="mb-8">
          <h1 className="font-bold text-3xl text-gray-800 mb-2">Checkout</h1>
          <Link to="/cart" className="text-indigo-600 hover:underline font-semibold">
            ← Back to Cart
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <DeliveryForm
              deliveryInfo={deliveryInfo}
              setDeliveryInfo={setDeliveryInfo}
              handleSubmit={handleSubmit}
              handleDetectLocation={handleDetectLocation}
              loading={loading}
            />
          </div>

          <div className="lg:col-span-1">
            <CheckoutOrderSummary
              cartItems={cartItems}
              totalItems={totalItems}
              totalPrice={totalPrice}
              totalSavings={totalSavings}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
