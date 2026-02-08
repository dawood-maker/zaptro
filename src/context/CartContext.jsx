// src/context/CartContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Load cart from localStorage on mount
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem("zaptro-cart");
      console.log("Loaded cart from localStorage:", savedCart); // ✅ Log initial cart
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Error loading cart:", error);
      return [];
    }
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      console.log("Saving cart to localStorage:", cartItems); // ✅ Log cart whenever it changes
      localStorage.setItem("zaptro-cart", JSON.stringify(cartItems));
    } catch (error) {
      console.error("Error saving cart:", error);
    }
  }, [cartItems]);

  // Add to cart
  const addToCart = (product, quantity = 1) => {
    console.log(`Adding to cart: ${product.title}, quantity: ${quantity}`); // ✅ Log add action
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        const updatedCart = prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
        console.log("Updated cart after adding existing item:", updatedCart); // ✅ Log updated cart
        return updatedCart;
      } else {
        const updatedCart = [...prevItems, { ...product, quantity }];
        console.log("Updated cart after adding new item:", updatedCart); // ✅ Log updated cart
        return updatedCart;
      }
    });

    alert(`${product.title} added to cart!`);
  };

  // Remove from cart
  const removeFromCart = (productId) => {
    console.log(`Removing from cart: Product ID ${productId}`); // ✅ Log remove action
    setCartItems((prevItems) => {
      const updatedCart = prevItems.filter((item) => item.id !== productId);
      console.log("Updated cart after removal:", updatedCart); // ✅ Log updated cart
      return updatedCart;
    });
  };

  // Update quantity
  const updateQuantity = (productId, newQuantity) => {
    console.log(
      `Updating quantity: Product ID ${productId}, New Quantity: ${newQuantity}`,
    ); // ✅ Log quantity update
    if (newQuantity <= 0) {
      console.log("Quantity is 0 or less, removing item");
      removeFromCart(productId);
      return;
    }

    setCartItems((prevItems) => {
      const updatedCart = prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item,
      );
      console.log("Updated cart after quantity change:", updatedCart); // ✅ Log updated cart
      return updatedCart;
    });
  };

  // Clear cart
  const clearCart = () => {
    console.log("Clearing cart"); // ✅ Log clearing cart
    setCartItems([]);
  };

  // Get total items
  const getTotalItems = () => {
    const total = cartItems.reduce((total, item) => total + item.quantity, 0);
    console.log("Total items in cart:", total); // ✅ Log total items
    return total;
  };

  // Get total price
  const getTotalPrice = () => {
    const total = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
    console.log("Total price of cart:", total); // ✅ Log total price
    return total;
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
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};
