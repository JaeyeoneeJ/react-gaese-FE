import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./components/feature/Loading";
import TopButton from "./components/feature/TopButton";
import { __getLoginUser } from "./redux/modules/loginUserSlice";
import GlobalStyle from "./Shared/GlobalStyle";
import Router from "./Shared/Router";

const App = () => {
  // const dispatch = useDispatch()
  // const { isLoading, loginUser, error } = useSelector((state) => state.loginUser)

  // const loginCheck = () => {
  //   if (JSON.stringify(loginUser === '{}')) {
  //     return alert('로그인 정보가 없습니다.')
  //   }
  // }

  // useEffect(()=>{
  //   dispatch(__getLoginUser())
  //   loginCheck()
  // },[])

  // if (isLoading) {
  //   return <Loading />
  // }

  // if (error) {
  //   return <div>{error.message}</div>
  // }
  // console.log(loginUser)
  return (
    <div>
      <GlobalStyle />
      <Router />
      <TopButton />
    </div>
  );
};

export default App;
