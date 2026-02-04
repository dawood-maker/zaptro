import React, { useEffect, useState, useCallback } from "react";
import { useData } from "../context/DataContext";

const Carousel = () => {
  const { data = [], loading, error } = useData();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredButton, setHoveredButton] = useState(null);
  const [hoveredShopButton, setHoveredShopButton] = useState(null);

  // Go to next slide
  const goToNext = useCallback(() => {
    if (data.length > 0) {
      setCurrentIndex((prev) => (prev === data.length - 1 ? 0 : prev + 1));
    }
  }, [data.length]);

  // Go to previous slide
  const goToPrevious = useCallback(() => {
    if (data.length > 0) {
      setCurrentIndex((prev) => (prev === 0 ? data.length - 1 : prev - 1));
    }
  }, [data.length]);

  // Auto slide every 4 seconds
  useEffect(() => {
    if (data.length > 1) {
      const interval = setInterval(goToNext, 4000);
      return () => clearInterval(interval);
    }
  }, [data.length, goToNext]);

  // Go to specific slide
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Reset to first slide when data loads
  useEffect(() => {
    if (data.length > 0) {
      setCurrentIndex(0);
    }
  }, [data.length]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[600px] text-2xl text-white bg-gradient-to-r from-[#0f0c29] via-[#302B63] to-[#24243e] rounded-2xl">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-400"></div>
          <p>Loading Products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-[600px] text-2xl text-white bg-gradient-to-r from-[#0f0c29] via-[#302B63] to-[#24243e] rounded-2xl">
        <div className="text-center">
          <p className="text-red-400 mb-4">⚠️ Error Loading Products</p>
          <p className="text-lg">{error}</p>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex justify-center items-center h-[600px] text-2xl text-white bg-gradient-to-r from-[#0f0c29] via-[#302B63] to-[#24243e] rounded-2xl">
        No Products Available
      </div>
    );
  }

  // Current product to display
  const currentProduct = data[currentIndex];

  return (
    <div className="relative w-full max-w-[1400px] mx-auto overflow-hidden rounded-2xl shadow-2xl my-8">
      {/* Previous Button */}
      <button
        className={`absolute top-1/2 left-4 -translate-y-1/2 text-white text-4xl p-4 rounded-full z-20 transition-all duration-300 ${
          hoveredButton === "left" ? "bg-black/80 scale-110" : "bg-black/50"
        }`}
        onClick={goToPrevious}
        onMouseEnter={() => setHoveredButton("left")}
        onMouseLeave={() => setHoveredButton(null)}
        aria-label="Previous slide"
      >
        ❮
      </button>

      {/* Main Slide Container */}
      <div className="overflow-hidden bg-gradient-to-r from-[#0f0c29] via-[#302B63] to-[#24243e] h-[600px]">
        <div className="h-full flex items-center">
          {/* Single Slide Display */}
          <div className="min-w-full flex flex-col md:flex-row items-center gap-8 px-10 py-8">
            {/* Product Info - Left Side */}
            <div className="flex-1 text-white bg-white/10 backdrop-blur-sm p-8 rounded-2xl max-w-[600px]">
              {/* Category Badge */}
              <div className="mb-4">
                <span className="bg-yellow-400 text-black text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wide">
                  {currentProduct.category}
                </span>
              </div>

              {/* Product Title */}
              <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                {currentProduct.title}
              </h2>

              {/* Product Description */}
              <p className="mb-6 opacity-90 text-base leading-relaxed">
                {currentProduct.description}
              </p>

              {/* Rating */}
              {currentProduct.rating && (
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex text-yellow-400 text-xl">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>
                        {i < Math.round(currentProduct.rating.rate) ? "★" : "☆"}
                      </span>
                    ))}
                  </div>
                  <span className="text-sm opacity-80">
                    {currentProduct.rating.rate} ({currentProduct.rating.count} reviews)
                  </span>
                </div>
              )}

              {/* Price */}
              <div className="text-yellow-400 text-4xl font-bold mb-8">
                ${currentProduct.price}
              </div>

              {/* Shop Now Button */}
              <button
                className={`bg-yellow-400 text-black px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:bg-yellow-300 shadow-lg ${
                  hoveredShopButton === currentIndex ? "scale-105 shadow-2xl" : ""
                }`}
                onMouseEnter={() => setHoveredShopButton(currentIndex)}
                onMouseLeave={() => setHoveredShopButton(null)}
              >
                Shop Now
              </button>
            </div>

            {/* Product Image - Right Side */}
            <div className="flex-1 flex items-center justify-center">
              <div className="bg-white rounded-2xl p-8 shadow-2xl w-full max-w-[450px]">
                <img
                  src={currentProduct.image}
                  alt={currentProduct.title}
                  className="w-full h-[400px] object-contain"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Next Button */}
      <button
        className={`absolute top-1/2 right-4 -translate-y-1/2 text-white text-4xl p-4 rounded-full z-20 transition-all duration-300 ${
          hoveredButton === "right" ? "bg-black/80 scale-110" : "bg-black/50"
        }`}
        onClick={goToNext}
        onMouseEnter={() => setHoveredButton("right")}
        onMouseLeave={() => setHoveredButton(null)}
        aria-label="Next slide"
      >
        ❯
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 bg-black/30 px-4 py-2 rounded-full backdrop-blur-sm">
        {data.slice(0, Math.min(data.length, 10)).map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-yellow-400 w-8 h-3"
                : "bg-white/50 w-3 h-3 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
        {data.length > 10 && (
          <span className="text-white text-xs self-center ml-2">
            +{data.length - 10} more
          </span>
        )}
      </div>

      {/* Slide Counter */}
      <div className="absolute top-6 right-6 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold">
        {currentIndex + 1} / {data.length}
      </div>
    </div>
  );
};

export default Carousel;