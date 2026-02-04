import React, { createContext, useState } from "react";
import MensCasualShirtImg from "../assets/MensCasualShirt.jpg";
import WomensDressImg from "../assets/WomensDress.jpg";
import WalletImg from "../assets/Wallet.jpg";
import HeadphonesImg from "../assets/Headphones.jpg";
import SneakersImg from "../assets/Sneakers.jpg";

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([
    {
      id: 1,
      title: "Men's Casual Shirt",
      description: "Comfortable cotton shirt, perfect for everyday wear.",
      price: 29.99,
      category: "Men's Clothing",
      image: MensCasualShirtImg,
      rating: { rate: 4.2, count: 120 },
    },
    {
      id: 2,
      title: "Women's Summer Dress",
      description: "Lightweight and breezy summer dress for sunny days.",
      price: 39.99,
      category: "Women's Clothing",
      image: WomensDressImg,
      rating: { rate: 4.5, count: 95 },
    },
    {
      id: 3,
      title: "Classic Leather Wallet",
      description: "Premium leather wallet with multiple compartments.",
      price: 49.99,
      category: "Accessories",
      image: WalletImg,
      rating: { rate: 4.8, count: 75 },
    },
    {
      id: 4,
      title: "Wireless Headphones",
      description: "High-quality wireless headphones with noise cancellation.",
      price: 99.99,
      category: "Electronics",
      image: HeadphonesImg,
      rating: { rate: 4.6, count: 150 },
    },
    {
      id: 5,
      title: "Sport Sneakers",
      description: "Lightweight sneakers designed for running and daily wear.",
      price: 69.99,
      category: "Shoes",
      image: SneakersImg,
      rating: { rate: 4.4, count: 110 },
    },
  ]);

  const fetchAllProducts = () => data;

  return (
    <DataContext.Provider value={{ data, setData, fetchAllProducts }}>
      {children}
    </DataContext.Provider>
  );
};
