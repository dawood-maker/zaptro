import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useLocation } from "react-router-dom";

import Logo from "./Logo";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";
import LocationPicker from "./LocationPicker";

function Navbar({ userLocation, loading }) {
  // ✅ Props add kiye
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  console.log("Current location:", location.pathname);

  return (
    <nav className="bg-gradient-to-r from-black via-gray-900 to-black text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <Logo />
          {/* Desktop Location picker - ✅ Props pass kiye */}
          <div className="hidden md:flex">
            <LocationPicker userLocation={userLocation} loading={loading} />
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex">
          <DesktopMenu location={location} />
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 focus:outline-none"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu & Location picker */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4 space-y-4">
          {/* Mobile Location picker - ✅ Props pass kiye */}
          <LocationPicker
            mobile={true}
            userLocation={userLocation}
            loading={loading}
          />

          {/* Mobile menu links */}
          <MobileMenu
            location={location}
            closeMenu={() => setMenuOpen(false)}
          />
        </div>
      )}
    </nav>
  );
}

export default Navbar;