import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../elements/Button";
import LogoItem from "../elements/LogoItem";
import useInput from "../../hooks/useInput";
import { __userLogin } from "../../redux/modules/dbUserSlice";

const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [userId, setUserId] = useInput();
    const [password, setPassword] = useInput();

    const {isLoading, dbUser, msg} = useSelector((state)=>state.dbUser)
    const [message, setMessage] = useState(msg)
    console.log(`msg: ${msg}, message: ${message}`)
    const onSubmitHandler = (e) => {
        e.preventDefault();
        if (userId.trim() === "" || password.trim() === "") {
            return;
        }
        dispatch(__userLogin({userId, password}))
    };

    const onClickLoginBtn = async () => {
        setMessage(msg)
        if (message === null) {
            return;
        } else {
            alert(message)
        }
        
        setMessage(null)
        // setMessage(msg)
        // if (message !== null) {
        //     alert(message)
        //     setMessage(null)
        // }
    }
    useEffect(()=>{
        onClickLoginBtn()
    },[dispatch])

    return (
        <Padding>
            <LogoCtn>
                <LogoItem
                    stroke="#CCECDD"
                    size="80"
                    strokeWidth='3'
                />
                <LogoName><p>우리의</p><p>개발세발로그</p></LogoName>
            </LogoCtn>

            <LoginCtn>
                <LoginBox onSubmit={onSubmitHandler}>
                    <LoginCtnArea>
                        <Input
                            type="text"
                            name="id"
                            value={userId}
                            onChange={setUserId}
                            placeholder="ID"
                            maxLength="20"
                            required
                        />
                        <Input
                            type="password"
                            name="password"
                            value={password}
                            onChange={setPassword}
                            placeholder="Password"
                            maxLength="30"
                            required
                        />
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
                            Log in
                        </Button>
                    </LoginCtnArea>
                    <LoginBoxFooter>
                        Don't have an account yet?
                        <PageMove
                            onClick={()=>navigate("/signup")}
                        >Sign up!</PageMove>
                    </LoginBoxFooter>
                </LoginBox>
            </LoginCtn>
        </Padding>
    );
};

const Padding = styled.div`
  margin: 0 auto;
  padding: 20px;
`;

const LogoCtn = styled.div`
    margin: 80px auto 10px auto;
    display: flex;
    gap: 30px;
    align-items: center;
    justify-content: center;
`
const LogoName = styled.div`
    color: #9C9C9C;
    font-size: 2.0em;
    font-weight: 300;
`


const LoginCtn = styled.div`
  margin: 30px auto 0 auto;
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
  gap: 20px;
  flex-direction: column;
  justify-content: space-between;
`;
const LoginCtnArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-sizing: border-box;
  height: 100%;
`;

const Input = styled.input`
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 0 12px;
  height: 46px;
  font-size: 14px;
`;

const LoginBoxFooter = styled.div`
    margin-top: -10px;
    display: flex;
    gap: 10px;
    justify-content: right;
    color: #D9D9D9;
`
const PageMove = styled.p`
    color: #15ABFF;
    &:hover {
        cursor: pointer;
    }
`

export default LoginPage;
