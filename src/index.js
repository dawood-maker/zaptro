import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import App from "./App";
import { ClerkProvider } from "@clerk/clerk-react";
import { DataProvider } from "./context/DataContext";
import { CartProvider } from "./context/CartContext";

const PUBLISHABLE_KEY = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <DataProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </DataProvider>
    </ClerkProvider>
  </React.StrictMode>
);
