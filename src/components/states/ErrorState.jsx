import { useEffect } from "react";

export default function ErrorState({ error, onRetry }) {
  // 🔍 Component mount log
  useEffect(() => {
    console.error("❌ ErrorState Rendered");
    console.error("🧨 Error Message:", error);
  }, [error]);

  const handleRetryClick = () => {
    console.log("🔄 Retry Button Clicked");
    onRetry();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full">
        {/* Icon */}
        <div className="text-6xl mb-4">⚠️</div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-red-600 mb-2">
          Something went wrong
        </h2>

        {/* Error message */}
        <p className="text-gray-600 mb-6">
          {error || "Unexpected error occurred"}
        </p>

        {/* Action */}
        <button
          onClick={handleRetryClick}
          className="px-6 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-all"
        >
          🔄 Try Again
        </button>
      </div>
    </div>
  );
}
