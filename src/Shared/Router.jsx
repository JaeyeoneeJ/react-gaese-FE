import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import PostList from "../components/postList/postList";
import AddPage from "../pages/AddPage";
import Detail from "../pages/Detail";
import Home from "../pages/Home";
import Post from "../pages/Post";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Profile from "../pages/Profile";

const Router = () => {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/post" element={<Post />} />
        <Route path="/post/:id" element={<Detail />} />
        <Route path="/todos/add" element={<AddPage />} />
        <Route path="/postList" element={<PostList />} />
        <Route path="/profile/:id" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
