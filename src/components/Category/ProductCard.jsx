const ProductCard = ({ item }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all hover:-translate-y-2">
      <div className="h-60 bg-gray-100 flex items-center justify-center p-4">
        <img
          src={item.image}
          alt={item.title}
          className="max-h-full object-contain hover:scale-110 transition-transform"
        />
      </div>

      <div className="p-4">
        <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full capitalize">
          {item.category}
        </span>

        <h3 className="font-bold mt-2 mb-2 line-clamp-2">{item.title}</h3>

        {item.rating && (
          <div className="flex text-yellow-500 text-sm mb-2">
            {[...Array(5)].map((_, i) => (
              <span key={i}>
                {i < Math.round(item.rating.rate) ? "★" : "☆"}
              </span>
            ))}
          </div>
        )}

        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-green-600">
            ${item.price}
          </span>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
