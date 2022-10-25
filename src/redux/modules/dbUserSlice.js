import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  dbUser: [],
  isLoading: false,
  isSuccess: false,
  error: null,
};

// 1. 회원가입 post('/users/signup')
export const __signupUser = createAsyncThunk(
  "dbUser/signupUser",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.post("/users/signup", payload);
      console.log(data.data)
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
// 2. 회원가입 - 아이디 중복 확인 post('/users/checkId')
export const __userCheckId = createAsyncThunk(
  "dbUser/userCheckId",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.post("http://localhost:4000/users/checkId", payload);
      console.log(data.data)
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
// 3. 회원가입 - 닉네임 중복 확인 post('/users/checkname')
export const __userCheckNickname = createAsyncThunk(
  "dbUser/userCheckNickname",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.post("http://localhost:4000/users/checkname", payload);
      console.log(data.data)
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
      const data = await axios.post("/users/login", payload);
      // axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.headers
      
      console.log(data)
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 4-2. 헤더 저장 도전_로그인(토큰 발급) post('/users/login')
// export const apiLogin= (payload) => {
//   return (dispatch, getState, {history}) => {
//     axios.post("/users/login", payload, 
//     {
//       headers: {
//         "Content-Type" : "application/json"
//       }
//     })
//     .then((res)=> {
//       dispatch()
//     })
//   }
// }


// 5. 로그인한 유저의 정보 받아오기 get('/users/:userId')
export const __getUser = createAsyncThunk(
  "dbUser/getUser",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(`http://localhost:4000/users/${payload.userId}`);
      return thunkAPI.fulfillWithValue(data.data);

    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 6. 로그인한 유저의 프로필 수정 put('/users/:userId/update')
export const __userUpdate = createAsyncThunk(
  "dbUser/userUpdate",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.put(`http://localhost:4000/users/${payload.userId}/update`, payload);
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
    clearUser: (state, action) => {
      state.isSuccess = true
    }
  },
  extraReducers: {
    // 4. 로그인(토큰 발급) post('/users/login')
    [__userLogin.pending]: (state) => {
      state.isLoading = true;
    },
    [__userLogin.fulfilled]: (state, action) => {
      state.isLoading = false
      console.log(state.dbUser)
      console.log(action)
      console.log(action.meta.arg)

      console.log(action.payload)
      if (action.payload === "로그인 성공") {
        console.log("로그인이 됐다고 하네요")
      }

      // state.dbUser = action.payload;
    },
    [__userLogin.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__getUser.pending]: (state) => {
      state.isLoading = true;
    },
    [__getUser.fulfilled]: (state, action) => {
      state.isLoading = false
      state.dbUser = action.payload;
    },
    [__getUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    }
  },
});

export const { clearUser } = dbUserSlice.actions;
export default dbUserSlice.reducer;