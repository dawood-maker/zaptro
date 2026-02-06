// src/pages/Home.jsx
import Features from "../components/Features";
import MidBanner from "../components/MidBanner/MidBanner";
import Category from "./Category";

function Home() {
  return (
    <>
      <Category />
      <MidBanner />
      <Features />
    </>
  );
}

export default Home;
