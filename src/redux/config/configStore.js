import { configureStore } from "@reduxjs/toolkit";
import dbUser from "../modules/dbUserSlice";
import post from "../modules/postSlice";
const store = configureStore({
  reducer: {
    dbUser,
    post,
  },
});

export default store;
