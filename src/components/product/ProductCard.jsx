import { useNavigate } from "react-router-dom";

const ProductCard = ({ item }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-transform duration-300 hover:-translate-y-3 group overflow-hidden">
      {/* Image */}
      <div
        className="h-52 sm:h-60 bg-gray-100 flex items-center justify-center p-4 relative cursor-pointer"
        onClick={() => navigate(`/product/${item.id}`)}
      >
        <img
          src={item.image}
          alt={item.title}
          className="object-contain h-full w-full transition-transform duration-500 group-hover:scale-110"
        />

        {/* Quick View overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
          <span className="text-white text-lg sm:text-xl font-semibold px-4 py-2 bg-indigo-600 rounded-lg">
            Quick View
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <span className="text-xs sm:text-sm bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 px-2 py-1 rounded-full capitalize">
          {item.category}
        </span>

        <h3 className="font-bold mt-2 line-clamp-2 text-sm sm:text-base text-gray-800">
          {item.title}
        </h3>

        <div className="flex justify-between items-center mt-4">
          <span className="text-lg sm:text-xl font-bold text-green-600">
            ${item.price}
          </span>

          <button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-purple-600 hover:to-indigo-600 text-white px-4 sm:px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
