import React from "react";
import Layout from "../components/layout/Layout";
import Header from "../components/header/Header";
import LoginPage from "../components/login/LoginPage";

const Login = () => {
  return (
    <>
      {/* <Header /> */}
      <Layout>
        <LoginPage />
      </Layout>
    </>
  );
};
export default Login;
