const CategoryCard = ({ category, image, count, isActive, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl shadow-lg cursor-pointer hover:scale-105 transition ${
        isActive ? "ring-4 ring-blue-400" : ""
      }`}
    >
      <div className="h-40 bg-gray-100 flex items-center justify-center">
        <img src={image} alt={category} className="h-full object-contain p-4" />
      </div>
      <div className="p-4 text-center bg-gradient-to-r from-blue-50 to-purple-50">
        <p className="font-bold capitalize">{category}</p>
        <p className="text-sm text-gray-600">{count} Products</p>
      </div>
    </div>
  );
};

export default CategoryCard;