import React from "react";
import Layout from "../components/layout/Layout";
import PostList from "../components/postList/PostList";
import Header from "../components/header/Header";

const Home = () => {
  return (
    <>
      {/* <Header /> */}
      <Layout>
        <PostList />
      </Layout>
    </>
  );
};
export default Home;
