import React from "react";
import Header from "../components/header/Header";
import Layout from "../components/layout/Layout";
// import HomeMenu from "../components/homeMenu/HomeMenu";
import PostList from "../components/postList/PostList";

const Home = () => {
  return (
    <>
      <Header />
      <Layout>
        <PostList />
      </Layout>
    </>
  );
};
export default Home;
