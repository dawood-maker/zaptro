// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import App from "./App";
import { ClerkProvider } from "@clerk/clerk-react";
import { DataProvider } from "./context/DataContext";
import { CartProvider } from "./context/CartContext";

// Clerk publishable key (env)
const PUBLISHABLE_KEY = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

// ✅ Debug: log the key
console.log("Clerk Publishable Key:", PUBLISHABLE_KEY);

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      {/* ✅ Debug: log when providers render */}
      {console.log("ClerkProvider is wrapping the app")}
      <DataProvider>
        {console.log("DataProvider is wrapping the app")}
        <CartProvider>
          {console.log("CartProvider is wrapping the app")}
          <App />
        </CartProvider>
      </DataProvider>
    </ClerkProvider>
  </React.StrictMode>
);
