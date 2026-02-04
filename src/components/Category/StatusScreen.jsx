const StatusScreen = ({ type, message }) => {
  const text =
    type === "loading"
      ? "Loading categories..."
      : type === "error"
        ? message
        : "";

  return (
    <div className="flex justify-center items-center min-h-[400px]">
      <h2 className="text-2xl text-gray-600">{text}</h2>
    </div>
  );
};

export default StatusScreen;
