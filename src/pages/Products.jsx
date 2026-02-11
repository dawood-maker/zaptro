import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useUser } from "@clerk/clerk-react"; // For authentication

import Sidebar from "../components/Sidebar";
import MobileFilters from "../components/FilterPanel/MobileFilter";
import ProductCard from "../components/product/ProductCard";

import LoadingState from "../components/states/LoadingState";
import ErrorState from "../components/states/ErrorState";
import EmptyState from "../components/states/EmptyState";
import NoResults from "../components/states/NoResults";

// Static fallback products (used if API fails or for testing)
const staticProducts = [
  {
    id: 1,
    title: "Mens Jacket",
    price: 55,
    category: "CLOTHING",
    image: "https://via.placeholder.com/200",
  },
  {
    id: 2,
    title: "Backpack",
    price: 109,
    category: "ACCESSORIES",
    image: "https://via.placeholder.com/200",
  },
];

export default function Products() {
  const { addToCart } = useCart();
  const { isSignedIn } = useUser(); // Check if user is signed in

  const [products, setProducts] = useState(staticProducts);
  const [categories, setCategories] = useState(["ALL"]);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [price, setPrice] = useState(5000);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  // Fetch products from API
  useEffect(() => {
    async function fetchProducts() {
      try {
        console.log("🔄 Fetching products...");
        setLoading(true);

        const res = await fetch("https://fakestoreapi.com/products");
        if (!res.ok) throw new Error("Failed to fetch products");

        const data = await res.json();
        console.log("✅ Products fetched:", data);

        const mappedData = data.map((item) => ({
          id: item.id,
          title: item.title,
          price: Math.floor(item.price),
          category: item.category.toUpperCase(),
          image: item.image,
          rating: item.rating,
        }));

        setProducts(mappedData);
        setCategories(["ALL", ...new Set(mappedData.map((p) => p.category))]);
        setError(null);
      } catch (err) {
        console.error("❌ Error fetching products:", err);
        setError(err.message);
        setProducts(staticProducts); // fallback to static products
      } finally {
        setLoading(false);
        console.log("⏳ Loading finished");
      }
    }

    fetchProducts();
  }, []);

  // Filters
  const filteredProducts = products.filter((product) => {
    return (
      (selectedCategory === "ALL" || product.category === selectedCategory) &&
      product.price <= price &&
      product.title.toLowerCase().includes(search.toLowerCase())
    );
  });
  console.log("🔍 Filtered products:", filteredProducts);

  const handleReset = () => {
    console.log("🔄 Resetting filters");
    setSelectedCategory("ALL");
    setPrice(5000);
    setSearch("");
  };

  // Handle add to cart
  const handleAddToCart = (product) => {
    console.log("🛒 Add to Cart clicked for:", product);
    if (isSignedIn) {
      console.log("✅ User signed in, adding product to cart...");
      addToCart(product, 1);
    } else {
      console.log("⚠️ User not signed in, cannot add product");
      alert("Please sign in to add items to the cart");
    }
  };

  // States
  if (loading) {
    console.log("⏳ Loading state active");
    return <LoadingState />;
  }
  if (error) {
    console.log("❌ Error state active:", error);
    return <ErrorState error={error} onRetry={handleReset} />;
  }
  if (products.length === 0) {
    console.log("📭 Empty products state");
    return <EmptyState />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Mobile filter toggle */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => {
            setIsOpen(!isOpen);
            console.log(isOpen ? "🔒 Closing filters" : "🔓 Opening filters");
          }}
          className="w-full py-2 bg-red-500 text-white rounded-xl font-semibold"
        >
          {isOpen ? "Close Filters" : "Open Filters"}
        </button>
      </div>

      {/* Mobile Filters */}
      <MobileFilters
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        price={price}
        setPrice={setPrice}
        search={search}
        setSearch={setSearch}
        handleReset={handleReset}
      />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            price={price}
            setPrice={setPrice}
            search={search}
            setSearch={setSearch}
          />
        </div>

        {/* Products Grid */}
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                item={product}
                onAddToCart={handleAddToCart}
              />
            ))
          ) : (
            <NoResults
              price={price}
              setPrice={setPrice}
              handleReset={handleReset}
            />
          )}
        </div>
      </div>
    </div>
  );
}
