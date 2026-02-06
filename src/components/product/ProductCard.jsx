const ProductCard = ({ item }) => {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-xl transition hover:-translate-y-2">
      <div className="h-56 bg-gray-100 flex items-center justify-center p-4">
        <img src={item.image} alt={item.title} className="object-contain h-full" />
      </div>

      <div className="p-4">
        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full capitalize">
          {item.category}
        </span>

        <h3 className="font-bold mt-2 line-clamp-2">{item.title}</h3>

        <div className="flex justify-between items-center mt-4">
          <span className="text-xl font-bold text-green-600">
            ${item.price}
          </span>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;