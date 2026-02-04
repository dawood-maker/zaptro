const StatusScreen = ({ type, message }) => {
  let text = "Loading...";
  if (type === "error") text = message;
  if (type === "empty") text = "No Products Available";

  return (
    <div className="flex justify-center items-center h-[600px] text-white bg-gradient-to-r from-[#0f0c29] via-[#302B63] to-[#24243e] rounded-2xl">
      <h2 className="text-2xl">{text}</h2>
    </div>
  );
};

export default StatusScreen;
