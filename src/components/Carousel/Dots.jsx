const Dots = ({ data, currentIndex, setCurrentIndex }) => {
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 bg-black/30 px-4 py-2 rounded-full">
      {data.slice(0, 10).map((_, index) => (
        <button
          key={index}
          onClick={() => setCurrentIndex(index)}
          className={`rounded-full transition-all ${
            index === currentIndex
              ? "bg-yellow-400 w-8 h-3"
              : "bg-white/50 w-3 h-3"
          }`}
        />
      ))}
    </div>
  );
};

export default Dots;
