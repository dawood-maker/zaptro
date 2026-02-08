import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";

const SingleProducts = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const discountPercent = 4;

  const getSingleProduct = async () => {
    try {
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      if (!res.ok) throw new Error("Failed to fetch product");

      const data = await res.json();
      setProduct(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;

    // Calculate discounted price
    const discountedPrice = (product.price * (1 - discountPercent / 100)).toFixed(2);

    // Create product with discount
    const productWithDiscount = {
      id: product.id,
      title: product.title,
      price: parseFloat(discountedPrice),
      originalPrice: product.price,
      category: product.category?.toUpperCase() || "GENERAL",
      image: product.image,
      rating: product.rating,
      discount: discountPercent,
    };

    // Add to cart using context
    addToCart(productWithDiscount, Number(quantity));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center py-10 px-4">
      {/* Breadcrumb */}
      <p className="text-gray-500 mb-6 text-sm tracking-wide">
        Home / Products /{" "}
        <span className="font-semibold">{product?.title || "Product"}</span>
      </p>

      {product ? (
        <div className="max-w-6xl w-full bg-white shadow-2xl rounded-3xl p-10 flex flex-col md:flex-row gap-10 transform transition-transform hover:-translate-y-2 duration-300">
          {/* Product Image */}
          <div className="md:w-1/2 flex justify-center items-center bg-gray-50 p-6 rounded-2xl hover:scale-105 transition-transform duration-500">
            <img
              src={product.image}
              alt={product.title}
              className="h-96 object-contain"
            />
          </div>

          {/* Product Info */}
          <div className="md:w-1/2 flex flex-col justify-between">
            <div>
              <h2 className="text-4xl font-bold mb-4 text-gray-800 hover:text-red-600 transition-colors">
                {product.title}
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Price Section */}
            <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center mt-4 gap-4">
              <div className="flex flex-col">
                <p className="text-gray-400 line-through text-lg">
                  ${product.price.toFixed(2)}
                </p>
                <p className="text-black font-extrabold text-3xl">
                  ${(product.price * (1 - discountPercent / 100)).toFixed(2)}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  You save: ${(product.price * (discountPercent / 100)).toFixed(2)}
                </p>
              </div>

              <span className="bg-red-600 text-white px-5 py-2 rounded-xl font-semibold text-base shadow-lg">
                {discountPercent}% OFF
              </span>
            </div>

            {/* Quantity Input */}
            <div className="mt-6 flex items-center gap-4">
              <span className="font-semibold text-gray-700 text-lg">
                Quantity:
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="bg-gray-200 hover:bg-gray-300 w-10 h-10 rounded-lg font-bold transition"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="border border-gray-300 px-3 py-2 rounded-lg w-20 text-center focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="bg-gray-200 hover:bg-gray-300 w-10 h-10 rounded-lg font-bold transition"
                >
                  +
                </button>
              </div>
            </div>

            {/* Total Price Preview */}
            <div className="mt-4 bg-green-50 p-4 rounded-lg border border-green-200">
              <p className="text-sm text-gray-600">Total Price:</p>
              <p className="text-2xl font-bold text-green-600">
                ${(
                  product.price *
                  (1 - discountPercent / 100) *
                  quantity
                ).toFixed(2)}
              </p>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className="mt-8 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold px-8 py-4 rounded-xl shadow-xl hover:scale-105 hover:shadow-2xl transform transition-all duration-300"
            >
              Add {quantity} to Cart 🛒
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-500 border-solid mx-auto mb-4"></div>
          <p className="text-gray-500 text-lg animate-pulse">
            Loading product details...
          </p>
        </div>
      )}
    </div>
  );
};

export default SingleProducts;