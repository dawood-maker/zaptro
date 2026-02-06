import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import ProductGrid from "../components/product/ProductGrid";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["ALL"]);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [price, setPrice] = useState(5000);
  const [loading, setLoading] = useState(true);

  // Fetch products from API
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();

        const mappedData = data.map(item => ({
          id: item.id,
          name: item.title,
          price: Math.floor(item.price),
          category: item.category.toUpperCase(),
          image: item.image,
        }));
        setProducts(mappedData);

        // Get unique categories from API + ALL
        const apiCategories = Array.from(new Set(mappedData.map(p => p.category)));
        setCategories(["ALL", ...apiCategories]);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    (selectedCategory === "ALL" || product.category === selectedCategory) &&
    product.price <= price
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Sidebar
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          price={price}
          setPrice={setPrice}
        />

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
