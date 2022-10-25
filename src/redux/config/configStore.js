import { configureStore } from "@reduxjs/toolkit";
import dbUser from "../modules/dbUserSlice";
import posts from "../modules/dbPostsSlice";
import post from "../modules/postSlice";
const store = configureStore({
  reducer: {
    dbUser,
    post,
    posts,
  },
});

export default store;
