import React from "react";
import Layout from "../components/layout/Layout";
import AddPost from "../components/addPost/AddPost";
import Header from "../components/header/Header";

const AddPage = () => {
  return (
    <>
      {/* <Header /> */}
      <Layout>
        <AddPost />
      </Layout>
    </>
  );
};
export default AddPage;
