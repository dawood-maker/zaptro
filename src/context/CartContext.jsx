import React, { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";

export const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export const CartProvider = ({ children }) => {
  const { isSignedIn } = useUser();

  // Load cart from localStorage initially
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem("zaptro-cart");
      console.log("📦 Loaded cart from localStorage:", saved);
      return saved ? JSON.parse(saved) : [];
    } catch (err) {
      console.error("⚠️ Error reading cart from localStorage:", err);
      return [];
    }
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    console.log("💾 Saving cart to localStorage:", cartItems);
    localStorage.setItem("zaptro-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Add product to cart
  const addToCart = (product, quantity = 1) => {
    if (!isSignedIn) {
      alert("❌ Please sign in to add items to cart");
      console.log("⚠️ User not signed in. Cannot add:", product);
      return;
    }

    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        console.log(`✏️ Updating quantity for product: ${product.id} by ${quantity}`);
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        console.log("➕ Adding new product to cart:", product);
        return [...prev, { ...product, quantity }];
      }
    });
  };

  // Remove product from cart
  const removeFromCart = (id) => {
    console.log("🗑 Removing item from cart:", id);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Update product quantity
  const updateQuantity = (id, quantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  // Clear the entire cart
  const clearCart = () => {
    console.log("🧹 Clearing cart");
    setCartItems([]);
  };

  // Get total items
  const getTotalItems = () => {
    const total = cartItems.reduce((total, item) => total + item.quantity, 0);
    console.log("🔢 Total items in cart:", total);
    return total;
  };

  // Get total price
  const getTotalPrice = () => {
    const total = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    console.log("💰 Total price of cart:", total);
    return total;
  };

  // Place an order
  const placeOrder = () => {
    if (!isSignedIn) {
      alert("❌ You must be signed in to place an order");
      console.log("⚠️ User not signed in. Cannot place order.");
      return;
    }

    if (cartItems.length === 0) {
      alert("🛒 Cart is empty");
      console.log("⚠️ Cart empty. Cannot place order.");
      return;
    }

    console.log("✅ Order placed:", cartItems);
    alert("✅ Order placed successfully!");
    clearCart();
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
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
