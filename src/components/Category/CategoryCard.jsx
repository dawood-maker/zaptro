const CategoryCard = ({ title, count, image, icon, active, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`rounded-xl shadow-lg cursor-pointer transition-all hover:scale-105 overflow-hidden ${
        active ? "ring-4 ring-blue-400" : ""
      }`}
    >
      <div className="h-40 bg-gray-100 flex items-center justify-center">
        {icon ? (
          <span className="text-6xl">{icon}</span>
        ) : (
          <img
            src={image}
            alt={title}
            className="h-full w-full object-contain p-4"
          />
        )}
      </div>

      <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 text-center">
        <h3 className="font-bold capitalize">{title}</h3>
        <p className="text-sm text-gray-600">{count} Products</p>
      </div>
    </div>
  );
};

export default CategoryCard;
