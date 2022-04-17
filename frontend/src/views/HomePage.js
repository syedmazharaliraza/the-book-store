import React from "react";
import HomeSection from "../components/homepage/HomeSection";
import Products from "../components/products/Products";
import { useSelector } from "react-redux";

const HomePage = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <>
      {!userInfo && <HomeSection />}
      <Products />
    </>
  );
};

export default HomePage;
