import { useState } from "react";
import { useData } from "../context/DataContext";

import Loader from "../components/ui/Loader";
import ErrorMessage from "../components/ui/ErrorMessage";
import CategoryHeader from "../components/category/CategoryHeader";
import CategoryGrid from "../components/category/CategoryGrid";
import ProductGrid from "../components/product/ProductGrid";

const Category = () => {
  const { data, loading, error } = useData();
  const [selectedCategory, setSelectedCategory] = useState("all");

  if (loading) return <Loader text="Loading categories..." />;
  if (error) return <ErrorMessage error={error} />;

  const categories = [...new Set(data.map((i) => i.category))];

  const filteredProducts =
    selectedCategory === "all"
      ? data
      : data.filter((i) => i.category === selectedCategory);

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

      <ProductGrid products={filteredProducts} />
    </div>
  );
};

export default Category;