import { configureStore } from "@reduxjs/toolkit";
import dbUser from "../modules/dbUserSlice";

const store = configureStore({
  reducer: {
    dbUser,
  },
});

export default store;