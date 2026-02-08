// import "./App.css";
// import { useEffect, useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/navbar/Navbar";
// import Footer from "./components/Footer";
// import { CartProvider } from "./context/CartContext";

// // Pages
// import Home from "./pages/Home";
// import About from "./pages/About";
// import Contact from "./pages/Contact";
// import Products from "./pages/Products";
// import SingleProducts from "./pages/SingleProducts";
// import Cart from "./pages/Cart";

// function App() {
//   const [userLocation, setUserLocation] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const getLocationFromIP = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch("http://ip-api.com/json/");
//         const data = await response.json();

//         setUserLocation({
//           city: data.city,
//           country: data.country,
//         });
//       } catch (err) {
//         setUserLocation({ city: "Unknown", country: "Unknown" });
//       } finally {
//         setLoading(false);
//       }
//     };

//     getLocationFromIP();
//   }, []);

//   return (
//     <CartProvider>
//       <Router>
//         <Navbar userLocation={userLocation} loading={loading} />

//         <div className="pt-2">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/about" element={<About />} />
//             <Route path="/contact" element={<Contact />} />

//             {/* ✅ ONLY ONE PRODUCTS ROUTE */}
//             <Route path="/products" element={<Products />} />

//             <Route path="/product/:id" element={<SingleProducts />} />
//             <Route path="/cart" element={<Cart />} />
//           </Routes>
//         </div>

//         <Footer />
//       </Router>
//     </CartProvider>
//   );
// }

// export default App;






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

        setUserLocation({
          city: data.city,
          country: data.country,
        });
      } catch (err) {
        setUserLocation({ city: "Unknown", country: "Unknown" });
      } finally {
        setLoading(false);
      }
    };

    getLocationFromIP();
  }, []);

  return (
    <CartProvider>
      <Router>
        <Navbar userLocation={userLocation} loading={loading} />

        <div className="pt-2">
          <Routes>
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
