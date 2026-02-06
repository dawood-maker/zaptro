import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Footer from "./components/Footer";

function App() {
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getLocationFromIP = async () => {
      try {
        setLoading(true);

        const response = await fetch("http://ip-api.com/json/");
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();

        const locationData = {
          city: data.city,
          country: data.country,
          countryCode: data.countryCode,
          region: data.regionName,
          latitude: data.lat,
          longitude: data.lon,
          timezone: data.timezone,
          ip: data.query,
        };

        console.log("✅ User location data:", locationData);
        setUserLocation(locationData);
      } catch (err) {
        console.error("❌ Error fetching location data:", err);
        setUserLocation({ city: "Unknown", country: "Unknown" });
      } finally {
        setLoading(false);
      }
    };

    getLocationFromIP();
  }, []);

  return (
    <BrowserRouter>
      <Navbar userLocation={userLocation} loading={loading} />

      <div className="pt-2">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
