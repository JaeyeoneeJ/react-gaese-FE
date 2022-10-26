import { configureStore } from "@reduxjs/toolkit";
import dbUser from "../modules/dbUserSlice";
import post from "../modules/postSlice";
import posts from "../modules/dbPostsSlice";
<<<<<<< HEAD
=======

>>>>>>> 0a442a0ce3bb8428240c388849b460911d7f07f8

const store = configureStore({
  reducer: {
    dbUser,
    posts,
    post,
  },
});

export default store;