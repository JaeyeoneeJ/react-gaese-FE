import React from "react";
import Layout from "../components/layout/Layout";
// import HomeMenu from "../components/homeMenu/HomeMenu";
import PostList from "../components/postList/PostList";

const Home = () => {
  return (
    <>
      <Layout>
        <PostList />
      </Layout>
    </>
  );
};
export default Home;
