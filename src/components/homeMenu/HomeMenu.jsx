import React, { useEffect } from "react";
import styled from "styled-components";
import { FaAngleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { __getUsers } from "../../redux/modules/usersSlice";
import Loading from "../feature/Loading";
import { __getLoginUser } from "../../redux/modules/loginUserSlice";

const HomeMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const {isLoading, loginUser, error} = useSelector((state)=> state.loginUser)
  
  if (loginUser?.userId === undefined) {
    alert('로그인이 필요합니다.')
    navigate('/login')
  }
  useEffect(()=>{
    dispatch(__getLoginUser())
  },[])

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return <div>{error.message}</div>
  }
  
  
  return (
    <HomeMenuCtn>
      <HomeMenuName>무엇을 할까요?</HomeMenuName>
      <HomeMenuBtn onClick={() => navigate("/todos/add")}>
        <HomeMenuTitle>할일 기록하기</HomeMenuTitle>
        <FaAngleRight size="30" color="#1a73e8" />
      </HomeMenuBtn>
      <HomeMenuBtn onClick={() => navigate("/post")}>
        <HomeMenuTitle>PostList</HomeMenuTitle>
        <FaAngleRight size="30" color="#1a73e8" />
      </HomeMenuBtn>
    </HomeMenuCtn>
  );
};

const HomeMenuCtn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  box-sizing: border-box;
`;
const HomeMenuName = styled.h2`
  margin-top: 40px;
  font-size: 3rem;
  font-weight: 400;
  margin-bottom: 20px;
`;
const HomeMenuBtn = styled.button`
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 40px 20px;
  height: 60px;
  display: flex;
  justify-content: space-between;
  background-color: white;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;
const HomeMenuTitle = styled.h3`
  font-size: 24px;
  font-weight: 400;
`;

export default HomeMenu;
