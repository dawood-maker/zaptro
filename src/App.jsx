import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/Footer";
import { CartProvider } from "./context/CartContext";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Products from "./pages/Products";
import SingleProducts from "./pages/SingleProducts";
import Cart from "./pages/Cart";
import Checkout from "./context/Checkout";

function App() {
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getLocationFromIP = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://ip-api.com/json/");
        const data = await response.json();

        const location = {
          city: data.city,
          country: data.country,
        };

        setUserLocation(location);

        // ✅ Debug: Log user location
        console.log("User location fetched:", location);
      } catch (err) {
        const location = { city: "Unknown", country: "Unknown" };
        setUserLocation(location);

        // ✅ Debug: Log error and fallback location
        console.error("Error fetching location:", err);
        console.log("Fallback location:", location);
      } finally {
        setLoading(false);

        // ✅ Debug: Log loading state
        console.log("Loading finished:", false);
      }
    };

    getLocationFromIP();
  }, []);

  // ✅ Debug: Log current states on each render
  console.log("Current userLocation state:", userLocation);
  console.log("Current loading state:", loading);

  return (
    <CartProvider>
      <Router>
        <Navbar userLocation={userLocation} loading={loading} />

        <div className="pt-2">
          <Routes>
            {/* Main Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            {/* Products Pages */}
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<SingleProducts />} />

            {/* Cart & Checkout */}
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </div>

        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;
