// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// const SingleProducts = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [product, setProduct] = useState(null);

//   console.log("🚀 Product ID:", id);

//   const getSingleProduct = async () => {
//     try {
//       const res = await fetch(`https://fakestoreapi.com/products/${id}`);
//       if (!res.ok) throw new Error("Failed to fetch product");

//       const data = await res.json();
//       setProduct(data);
//       console.log("✅ API Raw Data:", data);
//     } catch (err) {
//       console.error("❌ Product Fetch Error:", err);
//     }
//   };

//   useEffect(() => {
//     getSingleProduct();
//   }, [id]);

//   // Example discount % (20%)
//   const discountPercent = 20;

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start py-10 px-4">
//       {/* Back button */}
//       <button
//         onClick={() => navigate("/products")}
//         className="mb-6 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
//       >
//         ← Back to Products
//       </button>

//       {/* Product ID */}
//       <p className="text-lg text-gray-600 mb-4">
//         Product ID: <span className="font-semibold">{id}</span>
//       </p>

//       {product ? (
//         <div className="max-w-4xl w-full bg-white shadow-xl rounded-2xl p-8 flex flex-col md:flex-row gap-8">
//           {/* Product Image */}
//           <img
//             src={product.image}
//             alt={product.title}
//             className="md:w-1/2 h-80 object-contain rounded-xl"
//           />

//           {/* Product Details */}
//           <div className="md:w-1/2 flex flex-col justify-between">
//             <div>
//               <h2 className="text-3xl font-bold mb-4">{product.title}</h2>
//               <p className="text-gray-700 mb-4">{product.description}</p>
//             </div>

//             <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center mt-4">
//               {/* Original Price & Discounted Price */}
//               <div className="flex flex-col">
//                 <p className="text-gray-400 line-through text-lg">
//                   ${product.price.toFixed(2)}
//                 </p>
//                 <p className="text-green-600 font-bold text-2xl">
//                   ${ (product.price * (1 - discountPercent / 100)).toFixed(2) }
//                 </p>
//               </div>

//               {/* Discount Badge */}
//               <span className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold text-sm sm:text-base">
//                 {discountPercent}% OFF
//               </span>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <p className="text-gray-500 text-lg mt-6">Loading product details...</p>
//       )}
//     </div>
//   );
// };

// export default SingleProducts;





import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const SingleProducts = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  const discountPercent = 4; // same as screenshot

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

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      {/* Breadcrumb */}
      <p className="text-gray-500 mb-6">
        Home / Products / {product?.title || "Product"}
      </p>

      {product ? (
        <div className="max-w-5xl w-full bg-white shadow-xl rounded-2xl p-8 flex flex-col md:flex-row gap-8">
          {/* Product Image */}
          <img
            src={product.image}
            alt={product.title}
            className="md:w-1/2 h-80 object-contain rounded-xl"
          />

          {/* Product Info */}
          <div className="md:w-1/2 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-4">{product.title}</h2>
              <p className="text-gray-700 mb-6">{product.description}</p>
            </div>

            {/* Price Section */}
            <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center mt-4">
              <div className="flex flex-col">
                <p className="text-gray-400 line-through text-lg">
                  ${product.price.toFixed(2)}
                </p>
                <p className="text-black font-bold text-2xl">
                  ${(product.price * (1 - discountPercent / 100)).toFixed(2)}
                </p>
              </div>

              <span className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold text-sm sm:text-base">
                {discountPercent}% discount
              </span>
            </div>

            {/* Add to Cart */}
            <button className="mt-6 w-full sm:w-auto bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors">
              Add to Cart
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-500 text-lg mt-6">Loading product details...</p>
      )}

      {/* Back Button */}
      <button
        onClick={() => navigate("/products")}
        className="mt-8 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
      >
        ← Back to Products
      </button>
    </div>
  );
};

export default SingleProducts;
