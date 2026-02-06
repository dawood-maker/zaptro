const AllCategoryCard = ({ isActive, count, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`relative bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg 
                  hover:shadow-2xl hover:-translate-y-2 transition-transform duration-300 cursor-pointer overflow-hidden ${
                    isActive ? "ring-4 ring-purple-400" : ""
                  }`}
    >
      {/* Icon */}
      <div className="h-36 sm:h-40 flex items-center justify-center text-5xl sm:text-6xl transition-transform duration-300 group-hover:scale-110">
        🛍️
      </div>

      {/* Info */}
      <div className="p-4 text-center text-white">
        <p className="font-bold text-lg sm:text-xl">All Products</p>
        <p className="text-sm sm:text-base opacity-90">{count} Products</p>
      </div>

      {/* Floating sparkle effect */}
      <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full opacity-20 animate-ping"></div>
      <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-white rounded-full opacity-20 animate-ping delay-75"></div>
    </div>
  );
};

export default AllCategoryCard;
