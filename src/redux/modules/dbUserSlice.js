import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { instance } from "../instance";

const initialState = {
  dbUser: [],
  isLoading: false,
  isSuccess: false,
  error: null,
  msg: null,
  response: {}
};
// axios.defaults.withCredentials = true;

// 1. 회원가입 post('/users/signup')
export const __signupUser = createAsyncThunk(
  "dbUser/signupUser",
  async (payload, thunkAPI) => {
    try {
      const data = await instance.post("/users/signup", payload, {
        headers : {
          'Access-Control-Allow-Origin':'*'
        }
      });
      console.log(data)
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 4. 로그인(토큰 발급) post('/users/login')
export const __userLogin = createAsyncThunk(
  "dbUser/userLogin",
  async (payload, thunkAPI) => {
    try {
      const data = await instance.post("/users/login", payload);
      
      // axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.headers

      console.log(data)
      // console.log(data.headers)
      // console.log(data.headers.authorization)
      // console.log(data.headers['Authorization'])
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const dbUserSlice = createSlice({
  name: "dbUser",
  initialState,
  reducers: {
  },
  extraReducers: {
    [__signupUser.pending]: (state) => {
      state.isLoading = true;
    },
    [__signupUser.fulfilled]: (state, action) => {
      state.isLoading = false
      console.log(action)
      console.log(action.payload)
      state.dbUser = action.payload;
    },
    [__signupUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // 4. 로그인(토큰 발급) post('/users/login')
    [__userLogin.pending]: (state) => {
      state.isLoading = true;
    },
    [__userLogin.fulfilled]: (state, action) => {
      state.isLoading = false

      console.log(action)
      // if (action.payload === "로그인 성공") {
      //   console.log("fe: 로그인이 됐다고 하네요")
      // } else if (action.payload === "일치하는 회원정보가 없습니다.") {
      //   console.log("fe: 아이디와 비밀번호를 확인해주세요.")
      // } else {
      //   console.log("fe: 뭐라는거임?")
      // }

      state.msg = action.payload;
    },
    [__userLogin.rejected]: (state, action) => {
      state.isLoading = false;
      // console.log(action.payload)
      // console.log(action.payload.response)
      // console.log(action.payload.response.data)
      // console.log(action.payload.response.data.error)
      state.response = action.payload.response
    },
  }
});

export const { } = dbUserSlice.actions;
export default dbUserSlice.reducer;