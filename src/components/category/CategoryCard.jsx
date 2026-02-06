const CategoryCard = ({ category, image, count, isActive, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`relative bg-white rounded-2xl shadow-lg cursor-pointer 
                  hover:shadow-2xl hover:-translate-y-2 transition-transform duration-300 overflow-hidden ${
                    isActive ? "ring-4 ring-blue-400" : ""
                  }`}
    >
      {/* Image */}
      <div className="h-36 sm:h-40 bg-gray-100 flex items-center justify-center p-4 relative group">
        {image && (
          <img
            src={image}
            alt={category}
            className="h-full object-contain transition-transform duration-500 group-hover:scale-105"
          />
        )}
        {/* Glow overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-blue-100/30 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
      </div>

      {/* Text Info */}
      <div className="p-4 text-center bg-gradient-to-r from-blue-50 to-purple-50">
        <p className="font-bold capitalize text-sm sm:text-base">{category}</p>
        <p className="text-xs sm:text-sm text-gray-600">{count} Products</p>
      </div>

      {/* Floating sparkles */}
      <div className="absolute -top-2 -right-2 w-3 h-3 bg-blue-200 rounded-full opacity-20 animate-ping"></div>
      <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-purple-200 rounded-full opacity-20 animate-ping delay-75"></div>
    </div>
  );
};

export default CategoryCard;
