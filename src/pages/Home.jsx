import React, { useEffect } from "react";
import Layout from "../components/layout/Layout";
import Header from "../components/header/Header";
import HomeMenu from "../components/homeMenu/HomeMenu";
import { useNavigate } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Header />
      <Layout>
        <HomeMenu />
      </Layout>
    </>
  );
};
export default Home;
