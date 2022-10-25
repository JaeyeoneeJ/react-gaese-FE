import React from "react";
import Layout from "../components/layout/Layout";
import Header from "../components/header/Header";
import AddPost from "../components/addPost/AddPost";

const AddPage = () => {
  return (
    <>
      <Header />
      <Layout>
        <AddPost />
      </Layout>
    </>
  );
};
export default AddPage;