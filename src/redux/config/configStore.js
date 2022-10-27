import { configureStore } from "@reduxjs/toolkit";
import dbUser from "../modules/dbUserSlice";
import post from "../modules/postSlice";
import posts from "../modules/dbPostsSlice";
import comments from "../modules/commentsSlice";

const store = configureStore({
  reducer: {
    dbUser,
    posts,
    post,
    comments,
  },
});

export default store;
