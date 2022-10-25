import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Detail from "../pages/Detail";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import AddPage from "../pages/AddPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
<<<<<<< HEAD
        <Route path="/posts/add" element={<AddPage />} />
=======
        <Route path="/post/:id" element={<Detail />} />
>>>>>>> 3fb31001b0487e65937584e98b0f88318b84e04d
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
