import React, {
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { DataContext } from "../context/DataContext";

const Carousel = () => {
  const { data = [], fetchAllProducts } = useContext(DataContext);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch products (run once)
  useEffect(() => {
    fetchAllProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) =>
      prev === data.length - 1 ? 0 : prev + 1
    );
  }, [data.length]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) =>
      prev === 0 ? data.length - 1 : prev - 1
    );
  }, [data.length]);

  // Auto slide
  useEffect(() => {
    if (data.length > 1) {
      const interval = setInterval(goToNext, 3000);
      return () => clearInterval(interval);
    }
  }, [data.length, goToNext]);

  const goToSlide = (index) => setCurrentIndex(index);

  const [hoveredButton, setHoveredButton] = useState(null);
  const [hoveredDot, setHoveredDot] = useState(null);
  const [hoveredShopButton, setHoveredShopButton] = useState(false);

  if (data.length === 0) {
    return (
      <div className="flex justify-center items-center h-[600px] text-2xl text-white bg-gradient-to-r from-[#0f0c29] via-[#302B63] to-[#24243e]">
        Loading Products...
      </div>
    );
  }

  const displayProducts = data.slice(0, 5);

  return (
    <div className="relative w-full max-w-[1200px] mx-auto overflow-hidden rounded-2xl shadow-2xl">
      {/* Previous */}
      <button
        className={`absolute top-1/2 left-3 -translate-y-1/2 text-white text-4xl p-4 rounded-full z-10 ${
          hoveredButton === "left"
            ? "bg-black/70"
            : "bg-black/50"
        }`}
        onClick={goToPrevious}
        onMouseEnter={() => setHoveredButton("left")}
        onMouseLeave={() => setHoveredButton(null)}
      >
        ❮
      </button>

      {/* Slides */}
      <div className="overflow-hidden bg-gradient-to-r from-[#0f0c29] via-[#302B63] to-[#24243e]">
        <div
          className="flex transition-transform duration-700"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {displayProducts.map((product, index) => (
            <div
              key={product.id || index}
              className="min-w-full flex flex-col md:flex-row items-center gap-8 p-10"
            >
              <div className="flex-1 text-white bg-white/10 p-8 rounded-2xl">
                <h2 className="text-3xl font-bold mb-4">
                  {product.title}
                </h2>
                <p className="mb-4 opacity-80">
                  {product.description?.slice(0, 120)}...
                </p>
                <div className="text-yellow-400 text-2xl font-bold mb-6">
                  ${product.price}
                </div>
                <button
                  className={`bg-yellow-400 text-black px-8 py-3 rounded-full font-bold ${
                    hoveredShopButton ? "scale-105" : ""
                  }`}
                  onMouseEnter={() => setHoveredShopButton(true)}
                  onMouseLeave={() => setHoveredShopButton(false)}
                >
                  Shop Now
                </button>
              </div>

              <div className="flex-1">
                <img
                  src={product.image}
                  alt={product.title}
                  className="max-h-[400px] mx-auto"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Next */}
      <button
        className={`absolute top-1/2 right-3 -translate-y-1/2 text-white text-4xl p-4 rounded-full z-10 ${
          hoveredButton === "right"
            ? "bg-black/70"
            : "bg-black/50"
        }`}
        onClick={goToNext}
        onMouseEnter={() => setHoveredButton("right")}
        onMouseLeave={() => setHoveredButton(null)}
      >
        ❯
      </button>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-3">
        {displayProducts.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            onMouseEnter={() => setHoveredDot(index)}
            onMouseLeave={() => setHoveredDot(null)}
            className={`w-4 h-4 rounded-full ${
              index === currentIndex
                ? "bg-yellow-400 scale-125"
                : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
