// src/components/Features/FeatureCard.jsx

const FeatureCard = ({ icon, title, description }) => {
  // Log props received by this card
  console.log("FeatureCard Props:", { icon, title, description });

  return (
    <div className="group relative bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
      {/* Icon */}
      <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-indigo-100 text-3xl mb-5 group-hover:scale-110 transition">
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-gray-900 text-center">
        {title}
      </h3>

      {/* Description */}
      <p className="mt-3 text-sm text-gray-600 text-center leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;
