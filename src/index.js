// // src/index.js
// import React from "react"; // React import required
// import ReactDOM from "react-dom/client"; // ReactDOM import required
// import "./index.css"; // CSS import
// import App from "./App"; // App component import
// import { ClerkProvider } from "@clerk/clerk-react"; // ClerkProvider import
// import { DataProvider } from "./context/DataContext"; // DataProvider import
// import { CartProvider } from "./context/CartContext"; // CartProvider import

// // Environment variable
// const PUBLISHABLE_KEY = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

// if (!PUBLISHABLE_KEY) {
//   throw new Error("Missing Publishable Key");
// }

// // React 18 root rendering
// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <DataProvider>
//       <CartProvider>
//         <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
//           <App />
//         </ClerkProvider>
//       </CartProvider>
//     </DataProvider>
//   </React.StrictMode>
// );








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
