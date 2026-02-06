const AllCategoryCard = ({ isActive, count, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl shadow-lg cursor-pointer hover:scale-105 transition ${
        isActive ? "ring-4 ring-purple-400" : ""
      }`}
    >
      <div className="h-40 flex items-center justify-center text-6xl">🛍️</div>
      <div className="p-4 text-white text-center">
        <p className="font-bold text-xl">All Products</p>
        <p className="text-sm opacity-90">{count} Products</p>
      </div>
    </div>
  );
};

export default AllCategoryCard;