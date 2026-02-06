const Loader = ({ text = "Loading..." }) => {
  return (
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
        <div className="text-xl text-gray-600">{text}</div>
      </div>
    </div>
  );
};

export default Loader;