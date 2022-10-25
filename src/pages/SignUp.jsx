import React from "react";
import Layout from "../components/layout/Layout";
import Header from "../components/header/Header";
import SignUpPage from "../components/signUp/SignUpPage";

const Home = () => {
  return (
    <>
      {/* <Header /> */}
      <Layout>
        <SignUpPage />
      </Layout>
    </>
  );
};
export default Home;
