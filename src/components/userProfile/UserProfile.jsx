import React, { useEffect } from "react";
import styled from "styled-components";
import { FaAngleRight } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Loading from "../feature/Loading";
import { useCookies } from "react-cookie";

const UserProfile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const {id} = useParams
    console.log(id)
    const [cookies, setCookie] = useCookies(['token'])
    
    const { isLoading, dbUser, error } = useSelector((state) => state.dbUser)
    console.log(dbUser)

    // useEffect(() => {
    //     dispatch(__getLoginUser())
    // }, [])

    useEffect(()=> {
        // dispatch(__getUser())
    })
    if (isLoading) {
        return <Loading />
    }

    if (error) {
        return <div>{error.message}</div>
    }
    

    return (
        <Padding>
            <Ctn>
                {/* <ProfileCtn>
                    <UserPic src={"image"} alt="userPic" />
                    <EditButton>EDIT</EditButton>
                </ProfileCtn>
                <UserProfileState>

                </UserProfileState> */}
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
    margin-top: 50px;
    gap: 20px;
    justify-content: center;
`
const ProfileCtn = styled.div`
    position: relative;
    width: 200px;
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
    
`

export default UserProfile;
