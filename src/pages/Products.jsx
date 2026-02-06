import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import ProductGrid from "../components/product/ProductGrid";
import MobileFilters from "../components/FilterPanel/MobileFilter";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["ALL"]);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [price, setPrice] = useState(5000);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  // Fetch products from API
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();

        const mappedData = data.map((item) => ({
          id: item.id,
          name: item.title,
          price: Math.floor(item.price),
          category: item.category.toUpperCase(),
          image: item.image,
        }));

        console.log("Fetched products:", mappedData);

        setProducts(mappedData);
        setCategories([
          "ALL",
          ...Array.from(new Set(mappedData.map((p) => p.category))),
        ]);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      (selectedCategory === "ALL" || product.category === selectedCategory) &&
      product.price <= price,
  );

  console.log("Filtered products:", filteredProducts);

  const handleReset = () => {
    setSelectedCategory("ALL");
    setPrice(5000);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Mobile filter toggle */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full py-2 bg-red-500 text-white rounded-xl font-semibold shadow-md hover:bg-red-600 transition-colors"
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
        handleReset={handleReset}
      />

      {/* Desktop Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="hidden lg:block">
          <Sidebar
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            price={price}
            setPrice={setPrice}
          />
        </div>

        <div className="lg:col-span-3">
          {loading ? (
            <p>Loading products...</p>
          ) : (
            <ProductGrid products={filteredProducts} />
          )}
        </div>
      </div>
    </div>
  );
}
