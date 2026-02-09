import { useState } from "react";
import { useData } from "../context/DataContext";
import { useCart } from "../context/CartContext";

import Loader from "../components/ui/Loader";
import ErrorMessage from "../components/ui/ErrorMessage";
import CategoryHeader from "../components/category/CategoryHeader";
import CategoryGrid from "../components/category/CategoryGrid";
import ProductGrid from "../components/product/ProductGrid";

const Category = () => {
  const { data, loading, error } = useData();
  const { addToCart } = useCart(); // ✅ Cart function
  const [selectedCategory, setSelectedCategory] = useState("all");

  if (loading) return <Loader text="Loading categories..." />;
  if (error) return <ErrorMessage error={error} />;

  const categories = [...new Set(data.map((item) => item.category))];

  const filteredProducts =
    selectedCategory === "all"
      ? data
      : data.filter((item) => item.category === selectedCategory);

  return (
    <div className="container mx-auto px-4 py-8">
      <CategoryHeader
        totalProducts={data.length}
        totalCategories={categories.length}
      />

      <CategoryGrid
        categories={categories}
        data={data}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* ✅ addToCart ProductGrid ko pass kiya */}
      <ProductGrid
        products={filteredProducts}
        onAddToCart={addToCart}
      />
    </div>
  );
};

export default Category;
