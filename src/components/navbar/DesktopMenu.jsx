import { ShoppingCart } from "lucide-react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import NavLinks from "./NavLinks";
import { useCart } from "../../context/CartContext";

function DesktopMenu({ location, closeMenu }) {
  // ✅ SAFE DEFAULT (error fix)
  const { cartItems = [] } = useCart();

  return (
    <>
      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6 text-sm font-semibold">
        <NavLinks location={location} />

        {/* Desktop Cart Button */}
        <a
          href="/cart"
          className="relative flex items-center gap-2 px-4 py-2 rounded-lg bg-[#c2a46d] text-black font-semibold hover:bg-[#887248] transition"
        >
          <ShoppingCart className="w-5 h-5" />

          {/* Badge */}
          {cartItems.length > 0 && (
            <span className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {cartItems.length}
            </span>
          )}

          Cart
        </a>

        <SignedOut>
          <SignInButton mode="modal">
            <button className="px-4 py-2 border border-[#c2a46d] text-[#c2a46d] rounded-lg font-medium hover:bg-[#c2a46d] hover:text-black transition">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
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
        </SignedIn>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden flex flex-col gap-4 mt-2">
        <NavLinks location={location} mobile />

        {/* Mobile Cart Button */}
        <a
          href="/cart"
          className="relative flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#c2a46d] text-black font-semibold hover:bg-yellow-400 transition"
          onClick={closeMenu}
        >
          <ShoppingCart className="w-5 h-5" />

          {/* Badge */}
          {cartItems.length > 0 && (
            <span className="absolute top-0 right-3 -translate-y-1/2 translate-x-1/2 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {cartItems.length}
            </span>
          )}

          Cart
        </a>

        <SignedOut>
          <SignInButton mode="modal">
            <button className="w-full px-4 py-2 border border-[#c2a46d] text-[#c2a46d] rounded-lg font-medium hover:bg-[#c2a46d] hover:text-black transition">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
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
        </SignedIn>
      </div>
    </>
  );
}

export default DesktopMenu;
