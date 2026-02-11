// src/components/Features/Features.jsx
import FeatureCard from "./FeatureCard";

const features = [
  {
    icon: "🚀",
    title: "Fast Performance",
    description: "Optimized for speed and efficiency.",
  },
  {
    icon: "🔒",
    title: "Secure",
    description: "Your data is always protected.",
  },
  {
    icon: "🎨",
    title: "Modern Design",
    description: "Clean and user-friendly UI.",
  },
  {
    icon: "⚙️",
    title: "Easy Customization",
    description: "Simple to customize and scale.",
  },
];

const Features = () => {
  console.log("Rendering Features Section");
  console.log("Features Array:", features);

  return (
    <section className="bg-gradient-to-br from-gray-50 to-gray-200 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Our Features
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Everything you need to build fast, secure, and beautiful products.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            console.log(`Rendering FeatureCard #${index}`, feature);
            return (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;