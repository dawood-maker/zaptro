import { ShoppingCart } from "lucide-react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import NavLinks from "./NavLinks";

function MobileMenu({ location, closeMenu }) {
  return (
    <div className="md:hidden bg-black border-t border-gray-800 px-4 py-4 space-y-4 transition-all duration-300 ease-in-out">
      {/* Navigation Links */}
      <NavLinks location={location} onClick={closeMenu} mobile />

      {/* Cart Button */}
      <a
        href="/cart"
        className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg bg-[#c2a46d] text-black font-semibold hover:bg-yellow-400 transition"
        onClick={closeMenu}
      >
        <ShoppingCart className="w-5 h-5" />
        Cart
      </a>

      {/* Sign In Button */}
      <SignedOut>
        <SignInButton mode="modal">
          <button className="w-full px-4 py-3 border border-[#c2a46d] text-[#c2a46d] rounded-lg font-medium hover:bg-[#c2a46d] hover:text-black transition">
            Sign In
          </button>
        </SignInButton>
      </SignedOut>

      {/* User Button */}
      <SignedIn>
        <div className="w-full flex justify-center">
          <div className="w-[40px] h-[40px]">
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  userButtonAvatarBox: "w-[40px] h-[40px]",
                  userButtonAvatarImg: "w-[40px] h-[40px]",
                },
              }}
            />
          </div>
        </div>
      </SignedIn>
    </div>
  );
}

export default MobileMenu;