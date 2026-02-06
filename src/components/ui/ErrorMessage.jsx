const ErrorMessage = ({ error }) => {
  return (
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="text-center">
        <p className="text-xl text-red-600 mb-4">❌ {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    </div>
  );
};

export default ErrorMessage;