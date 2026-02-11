import { Link } from "react-router-dom";

function NavLinks({ location, onClick, mobile = false }) {
  const isActive = (path) => location.pathname === path;

  const linkClass = (path) =>
    `transition font-medium ${
      isActive(path) ? "text-[#c2a46d]" : "text-white hover:text-[#c2a46d]"
    } ${mobile ? "block w-full px-4 py-3 rounded-lg" : "mx-2"}`;

  return (
    <>
      <Link to="/" className={linkClass("/")} onClick={onClick}>
        Home
      </Link>
      <Link to="/products" className={linkClass("/products")} onClick={onClick}>
        Products
      </Link>
      <Link to="/about" className={linkClass("/about")} onClick={onClick}>
        About
      </Link>
      <Link to="/contact" className={linkClass("/contact")} onClick={onClick}>
        Contact
      </Link>
    </>
  );
}

export default NavLinks;