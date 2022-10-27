import React from "react";
import Header from "../components/header/Header";
import Layout from "../components/layout/Layout";
import LoginPage from "../components/login/LoginPage";

const Login = () => {
  return (
    <>
      <Header />
      <Layout>
        <LoginPage />
      </Layout>
    </>
  );
};
export default Login;