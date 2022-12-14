import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { CommentsApi, PostsApi } from "../../mytools/instance";

const initialState = {
  post: [],
  isLoading: false,
  isSuccess: false,
  error: null,
};

export const __getPost = createAsyncThunk(
  "post/getPost",
  async (payload, thunkAPI) => {
    console.log(payload);
    try {
      const { data } = await PostsApi.getGaese();

      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __addPost = createAsyncThunk(
  "post/addPost",
  async (payload, thunkAPI) => {
    console.log(payload);

    try {
      const { data } = await PostsApi.postGaese(payload);
      // for (const key of payload?.value?.postPicture?.entries()) {
      //   console.log(key);
      // }
      // const data = await axios.post(
      //   "http://localhost:3001/post/write",
      //   payload
      // );
      console.log(data);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __deletePost = createAsyncThunk(
  "posts/deletepost",
  async (payload, thunkAPI) => {
    console.log(payload);
    try {
      await PostsApi.deleteGaese(payload);

      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const __addComment = createAsyncThunk(
  "comments/addcomment",
  async (payload, thunkAPI) => {
    console.log(payload);
    try {
      const data = await CommentsApi.postComments(payload);
      console.log(data);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    clearPost: (state, action) => {
      state.isSuccess = false;
    },
  },

  extraReducers: {
    [__getPost.pending]: (state) => {
      state.isLoading = true; // ???????????? ????????? ???????????? ??????????????? true??? ???????????????.
    },
    [__getPost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todos = action.payload;

      // ???????????? ????????? ????????????, false??? ???????????????.
      // Store??? ?????? todos??? ???????????? ????????? todos??? ????????????.
    },
    [__getPost.rejected]: (state, action) => {
      state.isLoading = false; // ????????? ???????????????, ???????????? ????????? ????????????, false??? ???????????????.
      state.error = action.payload; // catch ??? error ????????? state.error??? ????????????.
    },
    [__addPost.pending]: (state) => {
      state.isLoading = true;
      state.isSuccess = false;
    },
    [__addPost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.post.push(action.payload);
      console.log("fulfilled ??????", state, action);
    },
    [__addPost.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__deletePost.pending]: (state) => {
      state.isLoading = true;
    },
    [__deletePost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      console.log(action.payload.postId)
      state.post = state.post.filter(
        (post) => +post.postId !== +action.payload.postId
      );
    },
    [__deletePost.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { clearPost } = postSlice.actions;
export default postSlice.reducer;
