import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import useInput from "../../hooks/useInput";
import { __signupUser } from "../../redux/modules/dbUserSlice";
import Button from "../elements/Button";

const SignUpPage = () => {
  const dispatch = useDispatch();

  const [userId, setUserId] = useInput();
  const [nickname, setNickname] = useInput();
  const [password, setPassword] = useInput();
  const [confirm, setConfirm] = useInput();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (
      userId.trim() === "" ||
      nickname.trim() === "" ||
      password.trim() === "" ||
      confirm.trim() === ""
    ) {
      return;
    }

    if (password !== confirm) {
      alert("Password가 일치하지 않습니다.");
      return;
    }

    if (window.confirm("회원가입 하시겠습니까?")) {
      dispatch(__signupUser({ userId, nickname, password }));
    }
  };

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
`;
const Title = styled.div`
  margin: 30px auto 0 auto;
  display: flex;
  gap: 30px;
  align-items: center;
  justify-content: center;
  color: #9c9c9c;
  font-size: 3em;
  font-weight: 600;
`;

const SignUpCtn = styled.div`
  margin: 50px auto 0 auto;
  border: 1px solid #ccecdd;
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
`;
const Input = styled.input`
  width: 100%;
  /* background-color: red; */
  border: none;
`;

export default SignUpPage;
