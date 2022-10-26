import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import { FaHamburger } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { __getUser } from "../../redux/modules/dbUserSlice";
import HamburgerItem from "../elements/HamburgerItem";
import HamburgerMenu from "../hamburgerMenu/HamburgerMenu";

const UserStateHeader = ({cookies}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const {loginUser} = useSelector((state)=>state.dbUser)
    
    const [userImage, setUserImage] = useState("")
    const [isClick, setIsClick] = useState(false)
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
        <Ctn>
            <CtnBox>
                <UserInfo>
                    <p><Strong>{loginUser?.userInfo?.nickname}</Strong>님 반갑습니다.</p>
                    <Username>@{loginUser?.userInfo?.userId}</Username>
                </UserInfo>
                <UserPic
                    onClick={() => navigate(`/profile/${loginUser?.userInfo?.userId}`)}
                    src={userImage}
                    alt="userProfile"
                />
                <div onClick={()=>setIsClick(!isClick)}>
                    <HamburgerItem
                        stroke="#a2b01d"
                        strokeWidth="3"
                        size="30"
                    />
                </div>
                
            </CtnBox>
            <HamburgerMenu isClick={isClick} setIsClick={setIsClick} userId={loginUser?.userInfo?.userId}/>
        </Ctn>
    )
}
// header right 시작
const Ctn = styled.div`
`
const CtnBox = styled.div`
    display: flex;
    gap: 10px;
    justify-content: center;
    align-items: center;
`

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