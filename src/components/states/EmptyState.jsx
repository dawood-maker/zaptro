import { useEffect } from "react";

export default function EmptyState() {

  // 🔍 Component lifecycle log
  useEffect(() => {
    console.log("📦 EmptyState Component Rendered");
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="text-center bg-white p-8 rounded-2xl shadow-lg">
        
        {/* Icon */}
        <div className="text-7xl mb-4">📦</div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          No Products Available
        </h2>

        {/* Message */}
        <p className="text-gray-500">
          Please check back later or refresh the page
        </p>
      </div>
    </div>
  );
}
