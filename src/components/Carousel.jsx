// import React, { useState } from "react";
// import { useData } from "../context/DataContext";

// const Category = () => {
//   const { data, loading, error } = useData();
//   const [selectedCategory, setSelectedCategory] = useState("all");

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-[400px]">
//         <div className="flex flex-col items-center gap-4">
//           <div className="animate-spin rounded-full h-12 w-12 md:h-16 md:w-16 border-t-4 border-b-4 border-blue-600"></div>
//           <div className="text-xl md:text-2xl text-gray-600">
//             Loading categories...
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center min-h-[400px] px-4">
//         <div className="text-center">
//           <div className="text-xl md:text-2xl text-red-600 mb-4">
//             ❌ Error: {error}
//           </div>
//           <button
//             onClick={() => window.location.reload()}
//             className="bg-blue-600 text-white px-4 py-2 md:px-6 md:py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm md:text-base"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // Get unique categories from products
//   const uniqueCategories = [...new Set(data.map((item) => item.category))];

//   // Filter products based on selected category
//   const filteredProducts =
//     selectedCategory === "all"
//       ? data
//       : data.filter((item) => item.category === selectedCategory);

//   return (
//     <div className="container mx-auto px-4 py-6 md:py-8">
//       {/* Page Title */}
//       <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 text-center text-gray-800">
//         Product Categories
//       </h1>
//       <p className="text-center text-sm md:text-base text-gray-600 mb-8 md:mb-10">
//         Browse our collection of {data.length} products across{" "}
//         {uniqueCategories.length} categories
//       </p>

//       {/* Categories Grid */}
//       <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 mb-8 md:mb-12">
//         {/* All Products Card */}
//         <div
//           onClick={() => setSelectedCategory("all")}
//           className={`bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg md:rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105 ${
//             selectedCategory === "all" ? "ring-2 md:ring-4 ring-purple-400" : ""
//           }`}
//         >
//           <div className="h-32 md:h-48 flex items-center justify-center bg-white/10">
//             <span className="text-4xl md:text-6xl">🛍️</span>
//           </div>
//           <div className="p-3 md:p-4 text-white">
//             <p className="text-sm md:text-xl font-bold text-center">
//               All Products
//             </p>
//             <p className="text-xs md:text-sm text-center mt-1 md:mt-2 opacity-90">
//               {data.length} Products
//             </p>
//           </div>
//         </div>

//         {/* Category Cards */}
//         {uniqueCategories.map((category, index) => {
//           const categoryProduct = data.find(
//             (item) => item.category === category,
//           );
//           const categoryCount = data.filter(
//             (item) => item.category === category,
//           ).length;

//           return (
//             <div
//               key={index}
//               onClick={() => setSelectedCategory(category)}
//               className={`bg-white rounded-lg md:rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105 ${
//                 selectedCategory === category
//                   ? "ring-2 md:ring-4 ring-blue-400"
//                   : ""
//               }`}
//             >
//               <div className="h-32 md:h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
//                 {categoryProduct && (
//                   <img
//                     src={categoryProduct.image}
//                     alt={category}
//                     className="h-full w-full object-contain p-2 md:p-4 hover:scale-110 transition-transform duration-300"
//                   />
//                 )}
//               </div>
//               <div className="p-3 md:p-4 bg-gradient-to-r from-blue-50 to-purple-50">
//                 <p className="text-sm md:text-xl font-bold text-gray-800 capitalize text-center line-clamp-1">
//                   {category}
//                 </p>
//                 <p className="text-xs md:text-sm text-gray-600 text-center mt-1 md:mt-2">
//                   {categoryCount} {categoryCount === 1 ? "Product" : "Products"}
//                 </p>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Selected Category Title */}
//       <div className="mb-6 md:mb-8">
//         <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1 md:mb-2">
//           {selectedCategory === "all"
//             ? "All Products"
//             : selectedCategory.toUpperCase()}
//         </h2>
//         <p className="text-sm md:text-base text-gray-600">
//           Showing {filteredProducts.length}{" "}
//           {filteredProducts.length === 1 ? "product" : "products"}
//         </p>
//       </div>

//       {/* Products Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
//         {filteredProducts.map((item) => (
//           <div
//             key={item.id}
//             className="bg-white rounded-lg md:rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
//           >
//             {/* Product Image */}
//             <div className="h-48 md:h-64 bg-gray-100 flex items-center justify-center p-3 md:p-4 overflow-hidden">
//               <img
//                 src={item.image}
//                 alt={item.title}
//                 className="max-h-full max-w-full object-contain hover:scale-110 transition-transform duration-300"
//               />
//             </div>

//             {/* Product Info */}
//             <div className="p-3 md:p-4">
//               {/* Category Badge */}
//               <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2 md:px-3 py-1 rounded-full mb-2 capitalize">
//                 {item.category}
//               </span>

//               {/* Product Title */}
//               <h3 className="font-bold text-sm md:text-base text-gray-800 mb-2 line-clamp-2 h-10 md:h-12">
//                 {item.title}
//               </h3>

//               {/* Rating */}
//               {item.rating && (
//                 <div className="flex items-center gap-2 mb-3">
//                   <div className="flex text-yellow-500 text-xs md:text-sm">
//                     {[...Array(5)].map((_, i) => (
//                       <span key={i}>
//                         {i < Math.round(item.rating.rate) ? "★" : "☆"}
//                       </span>
//                     ))}
//                   </div>
//                   <span className="text-xs text-gray-600">
//                     ({item.rating.count})
//                   </span>
//                 </div>
//               )}

//               {/* Price and Button */}
//               <div className="flex items-center justify-between">
//                 <span className="text-xl md:text-2xl font-bold text-green-600">
//                   ${item.price}
//                 </span>
//                 <button className="bg-blue-600 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 text-xs md:text-sm font-semibold">
//                   Add to Cart
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* No Products Message */}
//       {filteredProducts.length === 0 && (
//         <div className="text-center py-12 md:py-16">
//           <p className="text-xl md:text-2xl text-gray-400">
//             No products found in this category
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Category;
