import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import ProductGrid from "../components/product/ProductGrid";
import MobileFilters from "../components/FilterPanel/MobileFilter";

import LoadingState from "../components/states/LoadingState";
import ErrorState from "../components/states/ErrorState";
import EmptyState from "../components/states/EmptyState";
import NoResults from "../components/states/NoResults";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["ALL"]);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [price, setPrice] = useState(5000);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  // ===============================
  // 🔥 FETCH PRODUCTS + LOGS
  // ===============================
  useEffect(() => {
    async function fetchProducts() {
      try {
        console.log("⏳ Fetching products...");
        setLoading(true);

        const res = await fetch("https://fakestoreapi.com/products");
        if (!res.ok) throw new Error("Failed to fetch products");

        const data = await res.json();
        console.log("✅ API Raw Data:", data);

        const mappedData = data.map((item) => ({
          id: item.id,
          title: item.title,
          price: Math.floor(item.price),
          category: item.category.toUpperCase(),
          image: item.image,
          rating: item.rating,
        }));

        console.log("🛒 Mapped Products:", mappedData);

        setProducts(mappedData);
        setCategories(["ALL", ...new Set(mappedData.map((p) => p.category))]);
        setError(null);
      } catch (err) {
        console.error("❌ Product Fetch Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
        console.log("✅ Fetch Complete");
      }
    }

    fetchProducts();
  }, []);

  // ===============================
  // 🔍 FILTER PRODUCTS
  // ===============================
  const filteredProducts = products.filter((product) => {
    return (
      (selectedCategory === "ALL" ||
        product.category === selectedCategory) &&
      product.price <= price &&
      product.title.toLowerCase().includes(search.toLowerCase())
    );
  });

  // ===============================
  // 🧠 FILTER DEBUG LOGS
  // ===============================
  console.log("🎯 Filters:", {
    category: selectedCategory,
    price,
    search,
  });

  console.log("📦 Filtered Products Count:", filteredProducts.length);

  // ===============================
  // ♻ RESET FILTERS
  // ===============================
  const handleReset = () => {
    console.log("🔄 Reset Filters");
    setSelectedCategory("ALL");
    setPrice(5000);
    setSearch("");
  };

  // ===============================
  // 🧩 STATES
  // ===============================
  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} onRetry={handleReset} />;
  if (products.length === 0) return <EmptyState />;

  // ===============================
  // 🖥 UI
  // ===============================
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Mobile Filter Button */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full py-2 bg-red-500 text-white rounded-xl font-semibold"
        >
          {isOpen ? "Close Filters" : "Open Filters"}
        </button>
      </div>

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

        <div className="lg:col-span-3">
          {filteredProducts.length > 0 ? (
            <ProductGrid products={filteredProducts} />
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
