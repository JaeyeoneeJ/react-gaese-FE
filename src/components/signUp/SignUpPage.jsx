import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useInput from "../../hooks/useInput";
import { __signupUser } from "../../redux/modules/dbUserSlice";
import { __addUser, __getUsers } from "../../redux/modules/usersSlice";
import Button from "../elements/Button";
import Loading from "../feature/Loading";

const SignUpPage = () => {
    const navigate = useNavigate();
    const [userId, setUserId] = useInput();
    const [nickname, setNickname] = useInput();
    const [password, setPassword] = useInput();
    const [confirm, setConfirm] = useInput();
    // const userPic = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    
    const dispatch = useDispatch();
    const {isLoading, users, error} = useSelector((state)=>state.users)
    console.log(users)

    const onClickCheckID = () => {
        if (userId.trim() === "") {
            return alert('ID를 입력해주세요.')
        }
        const checkId = users.filter((user)=>{
            return user.userId === userId
        })

        if (checkId.length === 0) {
            alert(`"${userId}"은 사용가능한 ID입니다.`)
        } else {
            alert(`"${userId}"은 중복된 ID입니다.`)
        }
    }

    const onClickCheckNickname = () => {
        if (nickname.trim() === "") {
            return alert('Nickname를 입력해주세요.')
        }
        const checkNickname = users.filter((user)=>{
            return user.nickname === nickname
        })

        if (checkNickname.length === 0) {
            alert(`"${nickname}"은 사용가능한 Nickname입니다.`)
        } else {
            alert(`"${nickname}"은 중복된 Nickname입니다.`)
        }
    }
    const onSubmitHandler = (e) => {
        e.preventDefault();
        if (userId.trim() === "" || nickname.trim() === "" || password.trim() === "" || confirm.trim() === "") {
            return;
        }

        if (password !== confirm) {
            alert('Password가 일치하지 않습니다.')
            return;
        }
        
        if (window.confirm('회원가입 하시겠습니까?')) {
            dispatch(__signupUser({userId, nickname, password}));
            // alert('회원가입이 완료되었습니다. 메인으로 이동합니다.')
            // navigate("/");
        }
    }

    useEffect(()=>{
        dispatch(__getUsers())
    },[])

    if (isLoading) {
        return <Loading />
    }

    if (error) {
        return <div>{error.message}</div>
    }

    // console.log(title, nickname, content)
    return (
        <Padding20>
            <Title>회원가입</Title>
            <SignUpCtn>
                <LoginBox onSubmit={onSubmitHandler}>
                    <LoginCtnArea>
                        <KeyName>ID</KeyName>
                        <InputArea>
                            <Input
                                type="text"
                                name="id"
                                value={userId}
                                onChange={setUserId}
                                placeholder="ID"
                                maxLength="20"
                                required
                            />
                            <Button
                                onClick={()=>onClickCheckID()}
                                border="none"
                                bgColor="#D9D9D9"
                                color="white"
                                fontSize="14px"
                                borderRadius="5px"
                                width="100px"
                            >
                                인증하기
                            </Button>
                        </InputArea>
                    </LoginCtnArea>
                    <LoginCtnArea>
                        <KeyName>Nickname</KeyName>
                        <InputArea>
                            <Input
                                type="text"
                                name="nickname"
                                value={nickname}
                                onChange={setNickname}
                                placeholder="Nickname"
                                maxLength="20"
                                required
                            />
                            <Button
                                onClick={()=>onClickCheckNickname()}
                                border="none"
                                bgColor="#D9D9D9"
                                color="white"
                                fontSize="14px"
                                borderRadius="5px"
                                width="100px"
                            >
                                인증하기
                            </Button>
                        </InputArea>
                    </LoginCtnArea>
                    <LoginCtnArea>
                        <KeyName>Password</KeyName>
                        <InputArea>
                            <Input
                                type="password"
                                name="password"
                                value={password}
                                onChange={setPassword}
                                placeholder="password"
                                maxLength="20"
                                required
                            />
                        </InputArea>
                        <InputArea>
                            <Input
                                type="password"
                                name="confirm"
                                value={confirm}
                                onChange={setConfirm}
                                placeholder="Confirm"
                                maxLength="20"
                                required
                            />
                        </InputArea>
                    </LoginCtnArea>

                    <Button
                        type="submit"
                        border="none"
                        bgColor="#D9D9D9"
                        color="white"
                        fontSize="24px"
                        fontWeight="700"
                        width="100%"
                        padding="10px"
                    >
                        회원가입 하기
                    </Button>
                </LoginBox>
            </SignUpCtn>
        </Padding20>
    );
};

const Padding20 = styled.div`
    margin: 0 auto;
    padding: 20px;
    /* max-width: 800px;
    width: 100%;
    min-width: 350px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); */
`;
const Title = styled.div`
    margin: 30px auto 0 auto;
    display: flex;
    gap: 30px;
    align-items: center;
    justify-content: center;
    color: #9C9C9C;
    font-size: 3em;
    font-weight: 600;
`

const SignUpCtn = styled.div`
  margin: 50px auto 0 auto;
  border: 1px solid #CCECDD;
  border-radius: 30px;
  max-width: 600px;
  box-shadow: 5px 9px 10px 0px rgba(0, 0, 0, 0.2);
`;
const LoginBox = styled.form`
  margin: 20px auto 0 auto;
  max-width: 500px;
  box-sizing: border-box;
  padding: 50px 30px;
  display: flex;
  gap: 30px;
  flex-direction: column;
  justify-content: space-between;
`;
const LoginCtnArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  box-sizing: border-box;
  height: 100%;
`;
const KeyName = styled.h3`
  font-size: 24px;
  font-weight: 400;
  color: black;
`;
const InputArea = styled.div`
  border: 1px solid #ddd;
  box-sizing: border-box;
  width: 100%;
  border-radius: 10px;
  padding: 5px 12px;
  height: 40px;
  font-size: 14px;
  display: flex;
  gap: 10px;
`
const Input = styled.input`
    width: 100%;
    /* background-color: red; */
    border: none;
`;

export default SignUpPage;
