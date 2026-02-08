import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";

import Sidebar from "../components/Sidebar";
import ProductGrid from "../components/product/ProductGrid";
import MobileFilters from "../components/FilterPanel/MobileFilter";

import LoadingState from "../components/states/LoadingState";
import ErrorState from "../components/states/ErrorState";
import EmptyState from "../components/states/EmptyState";
import NoResults from "../components/states/NoResults";

export default function Products() {
  const { addToCart } = useCart();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["ALL"]);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [price, setPrice] = useState(5000);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  // Fetch products
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);

        const res = await fetch("https://fakestoreapi.com/products");
        if (!res.ok) throw new Error("Failed to fetch products");

        const data = await res.json();

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
        setError(err.message);
      } finally {
        setLoading(false);
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

  const handleReset = () => {
    setSelectedCategory("ALL");
    setPrice(5000);
    setSearch("");
  };

  // Handle add to cart
  const handleAddToCart = (product) => {
    addToCart(product, 1);
  };

  // States
  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} onRetry={handleReset} />;
  if (products.length === 0) return <EmptyState />;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Mobile filter toggle */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
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
        <div className="lg:col-span-3">
          {filteredProducts.length > 0 ? (
            <ProductGrid
              products={filteredProducts}
              onAddToCart={handleAddToCart}
            />
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
