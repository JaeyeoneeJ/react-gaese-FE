import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { instance } from "../instance";

const initialState = {
  comments: [],
  isLoading: false,
  isSuccess: false,
  error: null,
};

export const __getComments = createAsyncThunk(
  "comments/getComments",
  async (payload, thunkAPI) => {
    try {
      const data = await instance.get(`/comments/${payload}`);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __addComment = createAsyncThunk(
  "comments/addComment",
  async (payload, thunkAPI) => {
    try {
      console.log("postId : " + payload.postId)
      console.log("cookie : " + payload.cookie)
      console.log("comment : " + payload.objectComment)
      const data = await instance.post(`/comments/${payload.postId}`, payload.objectComment,{
          headers: {
            Authorization: payload.cookie,
          }
      });
      
      return thunkAPI.fulfillWithValue(data.data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async (payload, thunkAPI) => {
    try {
      await instance.delete(`comments/${payload.postId}/${payload.commentId}`, {
        headers: {
          Authorization: payload.cookie,
        }
      });
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __editComment = createAsyncThunk(
  "comments/editComment",
  async (payload, thunkAPI) => {
    try {
      await axios.patch(`https://shrouded-badlands-79466.herokuapp.com/comments/${payload.id}`, payload, {

      });
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    clearTodo: (state, action) => {
      state.isSuccess = true
    }
  },
  extraReducers: {
    [__getComments.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__getComments.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.comments = action.payload; // Store에 있는 comments에 서버에서 가져온 comments를 넣습니다.
    },
    [__getComments.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
    [__addComment.pending]: (state) => {
      state.isLoading = true;
      state.isSuccess = false;
    },
    [__addComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      // console.log(action.payload)
      
      // state.comments = [...state.comments, action.payload]
      // state.comments.push({...action.payload})
    },
    [__addComment.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
    [__deleteComment.pending]: (state) => {
      state.isLoading = true;
      state.isSuccess = false;
    },
    [__deleteComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      // state.comments = state.comments.filter((comment) => comment.commentId !== action.payload.commentId
      // )
    },
    [__deleteComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // [__editComment.pending]: (state) => {
    //   state.isLoading = true;
    // },
    // [__editComment.fulfilled]: (state, action) => {
    //   state.isLoading = false;
      
    //   state.comments = state.comments.map((comment) => {
        
    //     if (comment.id === action.payload.thisID) {
    //       console.log(comment.comment, action.payload.editComment)
    //       return {...comment, comment:action.payload.editComment}
    //     } else {
    //       return comment
    //     }
    //   }
    //   )
    // },
    // [__editComment.rejected]: (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // },
  },
});

export const {} = commentsSlice.actions;
export default commentsSlice.reducer;