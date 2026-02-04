import React, { useState } from "react";
import { useData } from "../../context/DataContext";
import CategoryHeader from "./CategoryHeader";
import CategoryGrid from "./CategoryGrid";
import ProductGrid from "./ProductGrid";
import StatusScreen from "./StatusScreen";

const Category = () => {
  const { data, loading, error } = useData();
  const [selectedCategory, setSelectedCategory] = useState("all");

  if (loading) return <StatusScreen type="loading" />;
  if (error) return <StatusScreen type="error" message={error} />;

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

      <ProductGrid title={selectedCategory} products={filteredProducts} />
    </div>
  );
};

export default Category;
