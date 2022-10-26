import { configureStore } from "@reduxjs/toolkit";
import dbUser from "../modules/dbUserSlice";
import post from "../modules/postSlice";
import posts from "../modules/dbPostsSlice";

const store = configureStore({
  reducer: {
    dbUser,
    posts,
    post,
  },
});

export default store;
