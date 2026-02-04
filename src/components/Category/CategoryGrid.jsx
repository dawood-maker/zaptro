import CategoryCard from "./CategoryCard";

const CategoryGrid = ({
  categories,
  data,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
      {/* All Products */}
      <CategoryCard
        title="All Products"
        count={data.length}
        icon="🛍️"
        active={selectedCategory === "all"}
        onClick={() => setSelectedCategory("all")}
      />

      {categories.map((category, index) => {
        const product = data.find((i) => i.category === category);
        const count = data.filter((i) => i.category === category).length;

        return (
          <CategoryCard
            key={index}
            title={category}
            count={count}
            image={product?.image}
            active={selectedCategory === category}
            onClick={() => setSelectedCategory(category)}
          />
        );
      })}
    </div>
  );
};

export default CategoryGrid;
