import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../context/DataContext";

const Carousel = () => {
  const { data, fetchAllProducts } = useContext(DataContext);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  useEffect(() => {
    if (data && data.length > 1) {
      const interval = setInterval(() => goToNext(), 3000);
      return () => clearInterval(interval);
    }
  }, [currentIndex, data]);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? data.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === data.length - 1 ? 0 : currentIndex + 1);
  };

  const goToSlide = (index) => setCurrentIndex(index);

  const [hoveredButton, setHoveredButton] = useState(null);
  const [hoveredDot, setHoveredDot] = useState(null);
  const [hoveredShopButton, setHoveredShopButton] = useState(false);

  if (!data || data.length === 0) {
    return (
      <div className="flex justify-center items-center h-[600px] text-2xl text-white bg-gradient-to-r from-[#0f0c29] via-[#302B63] to-[#24243e]">
        Loading Products...
      </div>
    );
  }

  const displayProducts = data.slice(0, 5);

  return (
    <div className="relative w-full max-w-[1200px] mx-auto overflow-hidden rounded-2xl shadow-2xl">
      {/* Previous Button */}
      <button
        className={`absolute top-1/2 left-3 -translate-y-1/2 text-white text-4xl p-4 rounded-full z-10 transition-colors duration-300 ${
          hoveredButton === "left"
            ? "bg-black/70 hover:bg-black/90"
            : "bg-black/50 hover:bg-black/70"
        }`}
        onClick={goToPrevious}
        onMouseEnter={() => setHoveredButton("left")}
        onMouseLeave={() => setHoveredButton(null)}
        aria-label="Previous slide"
      >
        ❮
      </button>

      {/* Carousel Content */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#0f0c29] via-[#302B63] to-[#24243e]">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {displayProducts.map((product, index) => (
            <div
              className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-10 p-6 md:p-12 min-w-full"
              key={product.id || index}
            >
              {/* Product Info */}
              <div className="flex-1 max-w-[500px] text-white bg-white/10 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-lg flex flex-col justify-center">
                <div className="inline-block bg-yellow-400/30 px-4 py-1 rounded-full text-sm mb-4 font-semibold text-yellow-300">
                  {product.category || "Product"}
                </div>
                <h2 className="text-2xl md:text-4xl font-extrabold mb-4 leading-snug">
                  {product.title || "Product Name"}
                </h2>
                <p className="text-sm md:text-base mb-4 leading-relaxed opacity-90">
                  {product.description
                    ? product.description.slice(0, 150) + "..."
                    : "Amazing product with great features"}
                </p>
                <div className="text-lg md:text-xl mb-4 flex items-center gap-2">
                  ⭐ {product.rating?.rate || "4.5"}
                  <span className="opacity-70 text-sm">
                    ({product.rating?.count || "100"} reviews)
                  </span>
                </div>
                <div className="text-2xl md:text-4xl font-bold text-yellow-400 mb-6">
                  ${product.price || "0.00"}
                </div>
                <button
                  className={`bg-gradient-to-r from-yellow-400 to-yellow-500 text-[#0f0c29] px-6 md:px-10 py-3 md:py-4 text-lg md:text-xl font-bold rounded-full shadow-lg transition-transform duration-300 ${
                    hoveredShopButton ? "scale-105" : "scale-100"
                  } hover:shadow-2xl`}
                  onMouseEnter={() => setHoveredShopButton(true)}
                  onMouseLeave={() => setHoveredShopButton(false)}
                >
                  Shop Now
                </button>
              </div>

              {/* Product Image */}
              <div className="flex-1 flex items-center justify-center max-w-[450px] max-h-[500px] md:max-h-[500px]">
                <img
                  src={product.image || "https://via.placeholder.com/400"}
                  alt={product.title || "Product"}
                  className="w-full h-full object-contain rounded-2xl shadow-2xl transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Next Button */}
      <button
        className={`absolute top-1/2 right-3 -translate-y-1/2 text-white text-4xl p-4 rounded-full z-10 transition-colors duration-300 ${
          hoveredButton === "right"
            ? "bg-black/70 hover:bg-black/90"
            : "bg-black/50 hover:bg-black/70"
        }`}
        onClick={goToNext}
        onMouseEnter={() => setHoveredButton("right")}
        onMouseLeave={() => setHoveredButton(null)}
        aria-label="Next slide"
      >
        ❯
      </button>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {displayProducts.map((_, index) => (
          <button
            key={index}
            className={`w-4 h-4 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-yellow-400 scale-125 shadow-lg"
                : "bg-white/50"
            } ${hoveredDot === index ? "bg-yellow-300" : ""}`}
            onClick={() => goToSlide(index)}
            onMouseEnter={() => setHoveredDot(index)}
            onMouseLeave={() => setHoveredDot(null)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
