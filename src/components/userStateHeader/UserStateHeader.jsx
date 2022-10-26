import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import { FaBars } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
// import { __getLoginUser } from "../../redux/modules/loginUserSlice";

const UserStateHeader = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    // const { isLoading, loginUser, error } = useSelector((state) => state.loginUser)
    const {isState, setIsState} = useState(false)

    const loginUser = {
        userId: "userId",
        nickname: "hello"
    }
    // console.log(loginUser)

    // useEffect(() => {
    //     dispatch(__getLoginUser())
    // },[])

    if (loginUser.userId === undefined) {
        return;
    } else {
        return (
            <>
                <UserInfo>
                    <p><Strong>{"nickname"}</Strong>님 반갑습니다.</p>
                    <Username>@{"userId"}</Username>
                </UserInfo>
                <UserPic
                    // onClick={()=>navigate(`/profile/${loginUser.userId}`)}
                    // src={loginUser.userPic}
                    src={"loginUser.userPic"}
                    alt="userProfile"
                />
                <FaBars
                    size={24}
                    color='white'
                    className="navigate"
                />
            </>
        )
    }

}
// header right 시작
const UserInfo = styled.div`
    font-size: 12px;
    color: black;
    display: flex;
    flex-direction: column;
    gap: 3px;
    @media screen and (max-width: 500px) {
        display: none;
    }
`
const Strong = styled.strong`
    color: #AF93FF;
`
const Username = styled.p`
    font-size: 10px;
    color: #A8A8A8;
`
const UserPic = styled.img`
    width: 40px;
    border-radius: 30px;
    border: 2px solid white;
    &:hover {
        cursor: pointer;
    }
`
// header right 끝

export default UserStateHeader