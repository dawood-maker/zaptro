import { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";

//CartContext ek React context hai jo cart ka state aur functions provide karta hai.
const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { isSignedIn } = useUser();

  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("zaptro-cart");
      console.log("📦 Loaded cart from localStorage:", saved);
      return saved ? JSON.parse(saved) : [];
    } catch (err) {
      console.error("⚠️ Error reading cart from localStorage:", err);
      return [];
    }
  });

  // Save cart to localStorage
  useEffect(() => {
    console.log("💾 Saving cart to localStorage:", cart);
    localStorage.setItem("zaptro-cart", JSON.stringify(cart));
  }, [cart]);

  // Add to cart
  const addToCart = (product, quantity = 1) => {
    if (!isSignedIn) {
      alert("❌ Please sign in to add items to cart");
      console.log("⚠️ User not signed in. Cannot add:", product);
      return;
    }

    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);

      if (existing) {
        console.log(
          `✏️ Updating quantity for product:`,
          product.id,
          "by",
          quantity,
        );
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i,
        );
      }

      console.log("➕ Adding new product to cart:", product);
      return [...prev, { ...product, quantity }];
    });
  };

  // Remove item
  const removeFromCart = (id) => {
    console.log("🗑 Removing item from cart:", id);
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  // Clear cart
  const clearCart = () => {
    console.log("🧹 Clearing cart");
    setCart([]);
  };

  // Total items
  const getTotalItems = () => {
    const total = cart.reduce((total, item) => total + item.quantity, 0);
    console.log("🔢 Total items in cart:", total);
    return total;
  };

  // Total price
  const getTotalPrice = () => {
    const total = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
    console.log("💰 Total price of cart:", total);
    return total;
  };

  // Place order
  const placeOrder = () => {
    if (!isSignedIn) {
      alert("❌ You must be signed in to place an order");
      console.log("⚠️ User not signed in. Cannot place order.");
      return;
    }

    if (cart.length === 0) {
      alert("🛒 Cart is empty");
      console.log("⚠️ Cart empty. Cannot place order.");
      return;
    }

    console.log("✅ Order placed:", cart);
    alert("✅ Order placed successfully!");
    clearCart();
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartItems: cart, // backward compatibility
        addToCart,
        removeFromCart,
        clearCart,
        getTotalItems,
        getTotalPrice,
        placeOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// useCart() ek custom hook hai jo aapko CartContext ka data aur functions use karne deta hai.
export const useCart = () => useContext(CartContext);
