const NavigationButtons = ({ onPrev, onNext }) => {
  return (
    <>
      <button
        onClick={onPrev}
        className="hidden md:block absolute top-1/2 left-4 -translate-y-1/2 bg-black/50 text-white text-4xl p-4 rounded-full"
      >
        ❮
      </button>

      <button
        onClick={onNext}
        className="hidden md:block absolute top-1/2 right-4 -translate-y-1/2 bg-black/50 text-white text-4xl p-4 rounded-full"
      >
        ❯
      </button>
    </>
  );
};

export default NavigationButtons;
