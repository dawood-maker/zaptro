import { useEffect } from "react";

export default function LoadingState() {

  // 🔍 Log when loading screen appears
  useEffect(() => {
    console.log("⏳ LoadingState mounted → Products are loading...");
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="text-center">
        
        {/* Spinner */}
        <div className="animate-spin h-16 w-16 sm:h-20 sm:w-20 border-4 border-red-500 border-t-transparent rounded-full mx-auto mb-6"></div>
        
        {/* Text */}
        <p className="text-lg sm:text-xl font-semibold text-gray-700">
          Loading Products...
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Please wait a moment
        </p>

      </div>
    </div>
  );
}
