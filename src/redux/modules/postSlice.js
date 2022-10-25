import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { PostsApi } from "../../mytools/instance";

const initialState = {
  post: [
    {
      id: 0,
      postTitle: "오늘의 일상",
      postContent: "오늘은 날씨가 좋은날~",
      postPicture: "",
    },
  ],
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
    for (const key of payload.entries()) {
      console.log(key);
    }
    try {
      const { data } = await PostsApi.postGaese(payload);
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

export const __deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (payload, thunkAPI) => {
    try {
      await axios.delete(
        `https://shrouded-badlands-79466.herokuapp.com/todos/${payload}`
      );
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    clearTodo: (state, action) => {
      state.isSuccess = true;
    },
  },
  extraReducers: {
    [__getPost.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__getPost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todos = action.payload;

      // 네트워크 요청이 끝났으니, false로 변경합니다.
      // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
    },
    [__getPost.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
    [__addPost.pending]: (state) => {
      state.isLoading = true;
      state.isSuccess = false;
    },
    [__addPost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.post.push(action.payload);
      console.log("fulfilled 상태", state, action);
    },
    [__addPost.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__deleteTodo.pending]: (state) => {
      state.isLoading = true;
    },
    [__deleteTodo.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    [__deleteTodo.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {} = postSlice.actions;
export default postSlice.reducer;
