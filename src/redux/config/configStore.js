import { configureStore } from "@reduxjs/toolkit";
import dbUser from "../modules/dbUserSlice";
import posts from "../modules/dbPostsSlice";

const store = configureStore({
  reducer: {
    dbUser,
    posts,
  },
});

export default store;