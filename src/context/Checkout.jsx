import { useState } from "react";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import DeliveryForm from "../components/DeliveryForm";
import CheckoutOrderSummary from "../components/CheckoutOrderSummary";
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";

function Checkout() {
  const { cartItems, getTotalPrice, getTotalItems, clearCart, placeOrder } =
    useCart();
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

  console.log("📦 Cart Items:", cartItems);
  console.log("🔢 Total Items:", totalItems);
  console.log("💰 Total Price:", totalPrice);
  console.log("💵 Total Savings:", totalSavings);

  const handleDetectLocation = () => {
    console.log("📍 Detecting user location...");
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          console.log("📍 Position detected:", position.coords);
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`,
            );
            const data = await response.json();
            console.log("🏠 Location data:", data);
            setDeliveryInfo((prev) => ({
              ...prev,
              address: data.display_name || "",
              state: data.address?.state || "",
              postCode: data.address?.postcode || "",
              country: data.address?.country || "",
            }));
          } catch (error) {
            console.error("❌ Failed to fetch location data:", error);
            alert("Could not detect location. Please enter manually.");
          } finally {
            setLoading(false);
          }
        },
        (error) => {
          console.error("❌ Geolocation error:", error);
          alert("Location access denied. Please enter manually.");
          setLoading(false);
        },
      );
    } else {
      alert("Geolocation is not supported by your browser.");
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("📝 Submitting order with delivery info:", deliveryInfo);

    if (
      !deliveryInfo.fullName ||
      !deliveryInfo.address ||
      !deliveryInfo.state ||
      !deliveryInfo.postCode ||
      !deliveryInfo.country ||
      !deliveryInfo.phoneNo
    ) {
      console.warn("⚠️ Delivery info incomplete");
      alert("Please fill in all fields");
      return;
    }

    console.log("✅ Placing order...");
    placeOrder();
    console.log("🛒 Order placed, cart cleared");

    // Optional: send delivery info to backend
    try {
      console.log("📡 Sending order data to backend...");
      const response = await fetch("YOUR_API_ENDPOINT", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deliveryInfo, cartItems, totalPrice }),
      });
      const data = await response.json();
      console.log("✅ Order sent to backend:", data);
    } catch (error) {
      console.error("❌ Failed to send order to backend:", error);
    }

    navigate("/");
  };

  if (cartItems.length === 0) {
    console.log("📭 Cart is empty");
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
    <>
      <SignedIn>
        <div className="min-h-screen bg-gray-50 py-10">
          <div className="max-w-6xl mx-auto px-6">
            <div className="mb-8">
              <h1 className="font-bold text-3xl text-gray-800 mb-2">
                Checkout
              </h1>
              <Link
                to="/cart"
                className="text-indigo-600 hover:underline font-semibold"
              >
                ← Back to Cart
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <DeliveryForm
                  deliveryInfo={deliveryInfo}
                  setDeliveryInfo={(info) => {
                    console.log("✏️ Updating delivery info:", info);
                    setDeliveryInfo(info);
                  }}
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
                <button
                  onClick={handleSubmit}
                  className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-lg font-semibold transition"
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </SignedIn>

      <SignedOut>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">
              ❌ You must sign in to place an order
            </h2>
            <SignInButton mode="modal">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition">
                Sign In
              </button>
            </SignInButton>
          </div>
        </div>
      </SignedOut>
    </>
  );
}

export default Checkout;
