import { configureStore } from "@reduxjs/toolkit";
/**
 * import 해온 것은 slice.reducer 입니다.
 */
import comments from "../modules/commentsSlice";
import post from "../modules/postSlice";
import posts from "../modules/postsSlice";
import todo from "../modules/todoSlice";
import users from "../modules/usersSlice"
import loginUser from "../modules/loginUserSlice"
import dbUser from "../modules/dbUserSlice";
import {AuthReducer} from "../modules/AuthReducer"

/**
 * 모듈(Slice)이 여러개인 경우
 * 추가할때마다 reducer 안에 각 모듈의 slice.reducer를 추가해줘야 합니다.
 *
 * 아래 예시는 하나의 프로젝트 안에서 counter 기능과 todos 기능이 모두 있고,
 * 이것을 각각 모듈로 구현한 다음에 아래 코드로 2개의 모듈을 스토어에 연결해준 것 입니다.
 */
const store = configureStore({
  reducer: {
    Auth: AuthReducer,
    dbUser,
    loginUser,
    users,
    comments,
    posts,
    post,
    todo,
  },
});

export default store;
