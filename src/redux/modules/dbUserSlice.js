import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../instance";
// import axios from "axios";

const initialState = {
  dbUser: [],
  isLoading: false,
  isSuccess: false,
  error: null,
  msg: null,
  token: "",
};

// axios 전역 변수 설정
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
      const data = await instance.post("/users/login", payload)
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const dbUserSlice = createSlice({
  name: "dbUser",
  initialState,
  reducers: {
    clearCheckLogin: (state) => {
      state.isSuccess = false
    },
    uploadToken: (state, action) => {
      state.token = action.payload
      // console.log(state.token)
    }
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

      // 토큰에 authorization된 access token 값 저장
      state.token = action.payload.headers.authorization
      
      // 로그인이 되었다는 상태 값, true로 변경
      state.isSuccess = true
      
      // 성공 시, 메세지 경로에요.
      // response가 정상적으로 통신된 경우 발생하는 메세지 값
      state.msg = action.payload.data;
      alert(state.msg)
      
    },
    [__userLogin.rejected]: (state, action) => {
      state.isLoading = false;
      
      // 실패 시, 메세지 경로에요.
      state.msg = action.payload.response.data.error
      alert(state.msg)

      // console.log(action.payload)
      // console.log(action.payload.response)
      // console.log(action.payload.response.data)
      // console.log(action.payload.response.data.error)
    },
  }
});

export const { clearCheckLogin, uploadToken } = dbUserSlice.actions;
export default dbUserSlice.reducer;