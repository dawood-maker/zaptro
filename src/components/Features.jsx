// src/components/Features.jsx

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
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Icon */}
              <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-indigo-100 text-3xl mb-5 group-hover:scale-110 transition">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-900 text-center">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="mt-3 text-sm text-gray-600 text-center leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
