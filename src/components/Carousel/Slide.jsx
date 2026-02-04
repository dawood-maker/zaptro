const Slide = ({ product }) => {
  return (
    <div className="bg-gradient-to-r from-[#0f0c29] via-[#302B63] to-[#24243e] h-[600px] flex items-center px-10">
      <div className="flex w-full gap-10 items-center">
        {/* Info */}
        <div className="flex-1 text-white bg-white/10 p-8 rounded-2xl">
          <span className="bg-yellow-400 text-black text-xs font-bold px-4 py-2 rounded-full uppercase">
            {product.category}
          </span>

          <h2 className="text-4xl font-bold mt-4 mb-4">
            {product.title}
          </h2>

          <p className="opacity-90 mb-6">
            {product.description}
          </p>

          <div className="text-yellow-400 text-4xl font-bold mb-6">
            ${product.price}
          </div>

          <button className="bg-yellow-400 text-black px-10 py-4 rounded-full font-bold hover:bg-yellow-300">
            Shop Now
          </button>
        </div>

        {/* Image */}
        <div className="flex-1 flex justify-center">
          <div className="bg-white p-8 rounded-2xl shadow-2xl">
            <img
              src={product.image}
              alt={product.title}
              className="h-[400px] object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide;
