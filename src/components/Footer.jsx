import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaPinterestP,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white pt-10 relative overflow-hidden">
      {/* Footer main */}
      <div className="container mx-auto px-4 pb-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Company info */}
        <div className="space-y-2 hover:scale-105 transform transition-transform duration-300">
          <h2 className="text-red-600 font-bold text-2xl">Zaptro</h2>
          <p className="text-gray-400 text-sm">
            Powering Your World with the Best in Electronics.
          </p>
          <p className="text-gray-400 text-sm mt-2">
            123 Electronics St, Style City, NY 10001
          </p>
          <p className="text-gray-400 text-sm">Email: support@Zaptro.com</p>
          <p className="text-gray-400 text-sm">Phone: (123) 456-7890</p>
        </div>

        {/* Customer Service */}
        <div className="space-y-2 hover:scale-105 transform transition-transform duration-300">
          <h3 className="font-semibold text-lg">Customer Service</h3>
          <ul className="text-gray-400 text-sm space-y-1">
            {[
              "Contact Us",
              "Shipping & Returns",
              "FAQs",
              "Order Tracking",
              "Size Guide",
            ].map((item) => (
              <li
                key={item}
                className="hover:text-red-600 cursor-pointer transition-colors"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Follow Us */}
        <div className="space-y-2 hover:scale-105 transform transition-transform duration-300">
          <h3 className="font-semibold text-lg">Follow Us</h3>
          <div className="flex space-x-3 mt-1">
            {[FaFacebookF, FaInstagram, FaTwitter, FaPinterestP].map(
              (Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-gray-400 hover:text-red-600 transition transform hover:scale-110 p-3 bg-gray-800 rounded-full shadow-lg"
                >
                  <Icon />
                </a>
              ),
            )}
          </div>
        </div>

        {/* Newsletter */}
        <div className="space-y-2 hover:scale-105 transform transition-transform duration-300">
          <h3 className="font-semibold text-lg">Stay in the Loop</h3>
          <p className="text-gray-400 text-sm mb-2">
            Subscribe to get special offers, free giveaways, and more
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="p-2 rounded-lg sm:rounded-r-none sm:rounded-l-lg bg-gray-800 text-white focus:outline-none flex-1"
            />
            <button className="bg-red-600 px-4 rounded-lg sm:rounded-l-none sm:rounded-r-lg font-semibold hover:bg-red-700 transition-transform hover:scale-105">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="relative text-center text-gray-400 py-4 border-t border-gray-700">
        <div className="absolute top-0 left-0 w-full h-0.5 bg-red-600 animate-pulse"></div>
        &copy; {new Date().getFullYear()}{" "}
        <span className="text-red-600 font-semibold">Zaptro</span>. All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;
