import React from "react";
import { Link } from "react-router-dom";

const AboutZaptro = () => {
  return (
    <div className="bg-[#f6f7f9] py-10 sm:py-14 lg:py-16 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-6 sm:p-8 lg:p-10">
        
        {/* Header */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-4 sm:mb-6">
          About <span className="text-[#d32f2f]">Zaptro</span>
        </h1>

        <p className="text-center text-gray-600 max-w-3xl mx-auto leading-relaxed text-sm sm:text-base">
          Zaptro is your trusted destination for modern electronics, smart
          gadgets, and everyday tech essentials. We are passionate about
          bringing innovation closer to you—quickly, securely, and affordably.
        </p>

        {/* Mission */}
        <section className="mt-10 sm:mt-12">
          <h2 className="text-xl sm:text-2xl font-semibold text-[#d32f2f] mb-2 sm:mb-3">
            Our Mission
          </h2>
          <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
            Our mission at Zaptro is simple: to make cutting-edge technology
            accessible to everyone. We aim to empower individuals and businesses
            with reliable electronics that enhance productivity, connectivity,
            and everyday life.
          </p>
        </section>

        {/* Why Choose Us */}
        <section className="mt-10 sm:mt-12">
          <h2 className="text-xl sm:text-2xl font-semibold text-[#d32f2f] mb-4">
            Why Choose Zaptro?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="p-5 sm:p-6 border rounded-xl">
              <h3 className="font-semibold mb-2 text-base sm:text-lg">
                Premium Quality
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                We partner with trusted brands to ensure every product meets
                high quality and performance standards.
              </p>
            </div>

            <div className="p-5 sm:p-6 border rounded-xl">
              <h3 className="font-semibold mb-2 text-base sm:text-lg">
                Fast & Secure Delivery
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Your time matters. Our logistics system ensures quick and safe
                delivery right to your doorstep.
              </p>
            </div>

            <div className="p-5 sm:p-6 border rounded-xl">
              <h3 className="font-semibold mb-2 text-base sm:text-lg">
                Customer First
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Our support team is always ready to help you before and after
                your purchase.
              </p>
            </div>

            <div className="p-5 sm:p-6 border rounded-xl">
              <h3 className="font-semibold mb-2 text-base sm:text-lg">
                Easy Returns
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Shop with confidence thanks to our simple and hassle-free return
                policy.
              </p>
            </div>
          </div>
        </section>

        {/* Vision */}
        <section className="mt-10 sm:mt-12">
          <h2 className="text-xl sm:text-2xl font-semibold text-[#d32f2f] mb-2 sm:mb-3">
            Our Vision
          </h2>
          <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
            We envision a future where technology seamlessly integrates into
            daily life—making it smarter, faster, and more enjoyable for
            everyone. Zaptro strives to be a brand people trust for innovation
            and value.
          </p>
        </section>

        {/* Footer Note + Button */}
        <div className="mt-12 sm:mt-14 text-center flex flex-col items-center gap-5">
          <p className="text-gray-500 text-sm sm:text-base">
            Thank you for choosing{" "}
            <span className="font-semibold text-[#d32f2f]">Zaptro</span>. Let’s
            build a smarter future together.
          </p>

          <Link to="/products">
            <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300">
              Start Shopping
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default AboutZaptro;