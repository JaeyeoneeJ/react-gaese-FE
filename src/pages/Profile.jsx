import React from "react";
import Header from "../components/header/Header";
import Layout from "../components/layout/Layout";
import UserProfile from "../components/userProfile/UserProfile";

const Profile = () => {
  return (
    <>
      <Header />
      <Layout>
        <UserProfile />
      </Layout>
    </>
  );
};
export default Profile;