import React, { createContext, useContext, useState, useEffect } from "react";

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from API when component mounts
  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch("https://fakestoreapi.com/products");
      
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      
      const products = await response.json();
      setData(products);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
      console.error("Error fetching products:", err);
    }
  };

  return (
    <DataContext.Provider value={{ data, setData, fetchAllProducts, loading, error }}>
      {children}
    </DataContext.Provider>
  );
};

// ✅ Custom Hook (IMPORTANT)
export const useData = () => {
  return useContext(DataContext);
};