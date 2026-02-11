import React, { createContext, useContext, useState, useEffect } from "react";

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from API when component mounts
  useEffect(() => {
    console.log("DataProvider mounted, fetching products..."); // ✅ Log on mount
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    try {
      console.log("Fetching all products..."); // ✅ Log when fetch starts
      setLoading(true);
      setError(null);

      const response = await fetch("https://fakestoreapi.com/products");

      if (!response.ok) {
        throw new Error(`Failed to fetch products. Status: ${response.status}`); // ✅ Log fetch status
      }

      const products = await response.json();
      console.log("Products fetched successfully:", products); // ✅ Log fetched data
      setData(products);
      setLoading(false);
      console.log("Loading set to false, data state updated."); // ✅ Log after updating state
    } catch (err) {
      setError(err.message);
      setLoading(false);
      console.error("Error fetching products:", err); // ✅ Log error
    }
  };

  // Log any time data changes
  useEffect(() => {
    console.log("Data state changed:", data); // ✅ Log data whenever it changes
  }, [data]);

  return (
    <DataContext.Provider value={{ data, setData, fetchAllProducts, loading, error }}>
      {children}
    </DataContext.Provider>
  );
};

// ✅ Custom Hook
export const useData = () => {
  const context = useContext(DataContext);
  console.log("useData called, context:", context); // ✅ Log when hook is used
  return context;
};