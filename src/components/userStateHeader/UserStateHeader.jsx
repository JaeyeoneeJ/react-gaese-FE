import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import { FaHamburger } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { __getUser } from "../../redux/modules/dbUserSlice";
import HamburgerItem from "../elements/HamburgerItem";

const UserStateHeader = ({cookies}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {loginUser} = useSelector((state)=>state.dbUser)
    
    const [userImage, setUserImage] = useState("")
    console.log(loginUser?.userInfo)
    
    // user정보의 이미지가 null 값이면 더미 이미지 씌우기
    

    
    useEffect(()=> {
        dispatch(__getUser(cookies))
        if (loginUser?.userInfo?.image === null || loginUser?.userInfo?.image === undefined) {
            setUserImage("https://placeimg.com/100/100/person")
        } else {
            setUserImage(loginUser?.userInfo?.image)
        }
    },[])
    return (
        <>
            <UserInfo>
                <p><Strong>{loginUser?.userInfo?.nickname}</Strong>님 반갑습니다.</p>
                <Username>@{loginUser?.userInfo?.userId}</Username>
            </UserInfo>
            <UserPic
                onClick={() => navigate(`/profile/${"userId"}`)}
                src={userImage}
                alt="userProfile"
            />
            <HamburgerItem
                stroke="#a2b01d"
                strokeWidth="3"
                size="30"
            />
            {/* <FaHamburger
                size={24}
                color='#dd871e'
                className="navigate"
            /> */}
        </>
    )
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