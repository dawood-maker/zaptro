import React, { useEffect, useState, useCallback } from "react";
import { useData } from "../../context/DataContext";
import Slide from "./Slide";
import NavigationButtons from "./NavigationButtons";
import Dots from "./Dots";
import StatusScreen from "./StatusScreen";

const Carousel = () => {
  const { data = [], loading, error } = useData();
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === data.length - 1 ? 0 : prev + 1));
  }, [data.length]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? data.length - 1 : prev - 1));
  }, [data.length]);

  useEffect(() => {
    if (data.length > 1) {
      const interval = setInterval(goToNext, 4000);
      return () => clearInterval(interval);
    }
  }, [data.length, goToNext]);

  if (loading) return <StatusScreen type="loading" />;
  if (error) return <StatusScreen type="error" message={error} />;
  if (!data.length) return <StatusScreen type="empty" />;

  return (
    <div className="relative w-full max-w-[1400px] mx-auto overflow-hidden rounded-2xl shadow-2xl my-8">
      <NavigationButtons onPrev={goToPrevious} onNext={goToNext} />

      <Slide product={data[currentIndex]} />

      <Dots
        data={data}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />

      <div className="absolute top-6 right-6 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
        {currentIndex + 1} / {data.length}
      </div>
    </div>
  );
};

export default Carousel;
