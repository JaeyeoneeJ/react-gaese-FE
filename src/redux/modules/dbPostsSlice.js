import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
import { instance } from "../instance";

const initialState = {
  posts: [],
  post: {},
  isLoading: false,
  isSuccess: false,
  error: null,
};

export const __getPosts = createAsyncThunk(
  "posts/getPosts",
  async (payload, thunkAPI) => {
    try {
      const data = await instance.get("/posts/list", {timeout: 3000});
      // const data = await axios.get("http://3.34.143.16/posts/list");
      return thunkAPI.fulfillWithValue(data.data.data);

    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __getPost = createAsyncThunk(
  "posts/getPost",
  async (payload, thunkAPI) => {
    try {
      const data = await instance.get(`/posts/${payload}`);
      // console.log(payload)
      // console.log(data)
      // console.log(data.data)
      return thunkAPI.fulfillWithValue(data.data.data);

    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    clearPost: (state, action) => {
      state.isSuccess = true
    }
  },
  extraReducers: {
    [__getPosts.pending]: (state) => {
      state.isLoading = true;
    },
    [__getPosts.fulfilled]: (state, action) => {
      state.isLoading = false
      state.posts = action.payload;
    },
    [__getPosts.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__getPost.pending]: (state) => {
      state.isLoading = true;
    },
    [__getPost.fulfilled]: (state, action) => {
      state.isLoading = false
      state.post = action.payload;
    },
    [__getPost.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { clearPost } = postsSlice.actions;
export default postsSlice.reducer;