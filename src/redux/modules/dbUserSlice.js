import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { instance } from "../instance";

const initialState = {
  dbUser: [],
  loginUser: {},
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
      // const data = await axios.post("http://3.34.143.16/users/signup", payload, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
      console.log(data);
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
      // const data = await axios.post("http://3.34.143.16/users/login", payload);
      console.log(data)
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 5. 로그인한 유저의 정보 받아오기 get('/users/:userId')
export const __getUser = createAsyncThunk(
  "dbUser/getUser",
  async (payload, thunkAPI) => {
    try {
      // console.log(payload)
      const data = await instance.get(`/users/${payload.userId}`, {
        headers: {
          Authorization: payload.token,
        },
      });
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
    clearCheckLogin: (state) => {
      state.isSuccess = false;
    },
  },
  extraReducers: {
    [__signupUser.pending]: (state) => {
      state.isLoading = true;
    },
    [__signupUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true
      console.log(action);
      console.log(action.payload);
      // state.dbUser = action.payload;
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
      state.isLoading = false;

      // 토큰에 authorization된 access token 값 저장
      state.token = action.payload.headers.authorization;
      // console.log(state.token);

      // 로그인이 되었다는 상태 값, true로 변경
      state.isSuccess = true;
      console.log(action.payload.data.nickname)
      
      alert(`"${action.payload.data.nickname}"님 반갑습니다. 메인페이지로 이동합니다.`);
    },
    [__userLogin.rejected]: (state, action) => {
      state.isLoading = false;

      // 실패 시, 메세지 경로에요.
      state.msg = action.payload.response.data.error;
      alert(state.msg);

      // console.log(action.payload)
      // console.log(action.payload.response)
      // console.log(action.payload.response.data)
      // console.log(action.payload.response.data.error)
    },

    // 5. 로그인한 유저의 정보 받아오기 get('/users/:userId')
    [__getUser.pending]: (state) => {
      state.isLoading = true;
    },
    [__getUser.fulfilled]: (state, action) => {
      state.isLoading = false
      state.loginUser = action.payload;
    },
    [__getUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { clearCheckLogin } = dbUserSlice.actions;
export default dbUserSlice.reducer;
