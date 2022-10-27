import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Detail from "../pages/Detail";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import AddPage from "../pages/AddPage";

import Profile from "../pages/Profile";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/post/:id" element={<Detail />} />
        <Route path="/posts/add" element={<AddPage />} />
        <Route path="/profile/:id" element={<Profile />} />

      </Routes>
    </BrowserRouter>
  );
};

export default Router;
