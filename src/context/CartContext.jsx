
// src/context/CartContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("zaptro-cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("zaptro-cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const clearCart = () => setCart([]);

  const getTotalItems = () =>
    cart.reduce((t, i) => t + i.quantity, 0);

  const getTotalPrice = () =>
    cart.reduce((t, i) => t + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,              // ✅ new
        cartItems: cart,   // ✅ old code FIX
        addToCart,
        removeFromCart,
        clearCart,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
