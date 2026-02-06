import AllCategoryCard from "./AllCategoryCard";
import CategoryCard from "./CategoryCard";

const CategoryGrid = ({
  categories,
  data,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 mb-12">
      <AllCategoryCard
        count={data.length}
        isActive={selectedCategory === "all"}
        onClick={() => setSelectedCategory("all")}
      />

      {categories.map((cat) => {
        const product = data.find((i) => i.category === cat);
        const count = data.filter((i) => i.category === cat).length;

        return (
          <CategoryCard
            key={cat}
            category={cat}
            image={product?.image}
            count={count}
            isActive={selectedCategory === cat}
            onClick={() => setSelectedCategory(cat)}
          />
        );
      })}
    </div>
  );
};

export default CategoryGrid;
