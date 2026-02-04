import { Link } from "react-router-dom";

function Logo() {
  console.log("Rendering Logo component");
  return (
    <Link
      to="/"
      className="flex items-center font-extrabold tracking-wider
                 text-2xl sm:text-2xl md:text-3xl lg:text-4xl"
    >
      <span className="text-yellow-400">Z</span>
      <span className="text-white">apt</span>
      <span className="text-pink-400">r</span>
      <span className="text-blue-400">o</span>
    </Link>
  );
}

export default Logo;