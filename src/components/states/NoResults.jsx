import { useEffect } from "react";
import noresultsImg from "../../assets/noresults.png";

export default function NoResults({ handleReset }) {

  // 🔍 Component mount log
  useEffect(() => {
    console.log("🚫 NoResults Component Rendered");
    console.log("🖼 Image Path:", noresultsImg);
  }, []);

  const handleResetClick = () => {
    console.log("🔄 Reset Filters Button Clicked");
    handleReset();
  };

  return (
    <div className="flex items-center justify-center py-24 px-4">
      <div className="max-w-lg w-full text-center bg-white rounded-3xl shadow-xl p-10">
        
        {/* Illustration */}
        <img
          src={noresultsImg}
          alt="No results found"
          className="w-64 mx-auto mb-6"
          onLoad={() => console.log("✅ NoResults image loaded successfully")}
          onError={() => console.error("❌ Failed to load NoResults image")}
        />

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-3">
          No results found
        </h2>

        {/* Description */}
        <p className="text-gray-500 text-sm sm:text-base mb-8 leading-relaxed">
          We couldn’t find what you’re looking for.  
          Try changing filters or searching something else.
        </p>

        {/* Action */}
        <button
          onClick={handleResetClick}
          className="px-8 py-3 bg-red-500 text-white rounded-xl font-semibold shadow-md hover:bg-red-600 transition-all"
        >
          🔄 Reset Filters
        </button>
      </div>
    </div>
  );
}
