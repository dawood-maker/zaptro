const CategoryHeader = ({ totalProducts, totalCategories }) => {
  return (
    <div className="text-center mb-12 px-4 sm:px-6 lg:px-0">
      {/* Main Title */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight 
                     bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
                     drop-shadow-lg">
        Product Categories
      </h1>

      {/* Subtitle */}
      <p className="text-gray-600 sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
        Explore <span className="font-semibold text-indigo-600">{totalProducts}</span> products in{" "}
        <span className="font-semibold text-purple-600">{totalCategories}</span> categories. 
        Find your favorite products and enjoy shopping with style!
      </p>
    </div>
  );
};

export default CategoryHeader;