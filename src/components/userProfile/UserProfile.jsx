import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaAngleRight } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Loading from "../feature/Loading";
import { useCookies } from "react-cookie";
import { __getUser } from "../../redux/modules/dbUserSlice";
import { __getPosts } from "../../redux/modules/dbPostsSlice";

const UserProfile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { id } = useParams
    // console.log(id)
    const [cookies, setCookie] = useCookies(['token'])
    console.log(cookies.token)
    console.log(cookies.userId)
    const token = cookies.token
    const userId = cookies.userId
    
    const { loginUser } = useSelector((state) => state.dbUser)
    const { isLoading, posts, error } = useSelector((state) => state.posts)

    // console.log(posts)
    const [userPic, setUserPic] = useState(loginUser.userInfo.userPicture)

    useEffect(() => {
        if (userPic === null || userPic === undefined) {
            setUserPic("https://placeimg.com/500/500/person")
        }
        dispatch(__getUser(cookies))
        // dispatch(__getPosts())
    }, [])

    console.log(loginUser.userInfo)
    if (isLoading) {
        return <Loading />
    }

    if (error) {
        return <div>{error.message}</div>
    }


    return (
        <Padding>
            <Ctn>
                <ProfileCtn>
                    <UserPic src={userPic} alt="user's Profile Picture" />
                    <EditButton>
                        EDIT
                    </EditButton>
                </ProfileCtn>
                <UserProfileState>
                    <Username>
                        @{loginUser.userInfo.userId}'s state
                    </Username>
                    <StateBox>
                        <StateArea>
                            <KeyArea>Nickname</KeyArea>
                            <ValueArea>{loginUser.userInfo.nickname}</ValueArea>
                        </StateArea>
                        <StateArea>
                            <KeyArea>State Msg</KeyArea>
                            {(loginUser.userInfo.stateText===null || loginUser.userInfo.stateText===undefined || loginUser.userInfo.stateText.trim()==="") ? (
                                <NoneMsg>상태 메세지가 없습니다.</NoneMsg>
                            ) : <ValueArea>{loginUser.userInfo.stateText}</ValueArea> }
                        </StateArea>
                    </StateBox>
                </UserProfileState>
            </Ctn>
        </Padding>
    );
};

const Padding = styled.div`
    margin: 0px auto 10px auto;
    padding: 20px;
`
const Ctn = styled.div`
    display: flex;
    margin-top: 100px;
    gap: 20px;
    justify-content: center;
    align-items: center;
    @media screen and (max-width: 800px) {
        flex-direction: column;
    }
`
const ProfileCtn = styled.div`
    position: relative;
    width: 200px;
    min-width: 200px;
    height: 200px;
    border: 3px solid white;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 0px 3px 7px 3px rgba(0,0,0,0.2);
    box-sizing: border-box;
`
const UserPic = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`
const EditButton = styled.button`
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 30px;
    border: none;
    background-color: rgba(255,255,255,0.5);
    color: #747474;
    font-size: 20px;
    font-weight: 300;
    left: 50%;
    transform: translate(-50%, 0);
    z-index: 1;
    transition: all, 0.3s;
    &:hover {
        cursor: pointer;
        background-color: rgba(255,255,255,0.8);
        color: black;
    }
`
const UserProfileState = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: left;
    gap: 20px;
    width: 100%;
    max-width: 500px;
    margin: 20px;
    border: 1px solid red;
`
const Username = styled.p`
    font-size: 16px;
    @media screen and (max-width: 800px) {
        align-items: center;
    }
`
const StateBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: left;
    gap: 10px;
`
const StateArea = styled.div`
    display: flex;
    width: 100%;
    gap: 10px;
    /* justify-content: space-around; */
    border: 1px solid red;
`
const KeyArea = styled.p`
    border: 1px solid red;
    width: 100px;
`
const ValueArea = styled.p`
    border: 1px solid red;
`
const NoneMsg = styled.p`
    border: 1px solid red;
    color: "tomato";
`

export default UserProfile;
