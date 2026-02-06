const CategoryHeader = ({ totalProducts, totalCategories }) => {
  return (
    <>
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-3">
        Product Categories
      </h1>
      <p className="text-center text-gray-600 mb-10">
        Browse {totalProducts} products in {totalCategories} categories
      </p>
    </>
  );
};

export default CategoryHeader;