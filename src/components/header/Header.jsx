import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import "./header.css"
import LogoItem from "../elements/LogoItem"
import { useDispatch, useSelector } from "react-redux"
import { useCookies } from "react-cookie"
import UserStateHeader from "../userStateHeader/UserStateHeader"

const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isLogin, setIsLogin] = useState(false)
    const [cookies, setCookie] = useCookies(['userId'])
    console.log(cookies?.userId)
    console.log(isLogin)
    
    useEffect(()=> {
        if (cookies?.userId !== undefined) {
            setIsLogin(true)
            
        } else {
            setIsLogin(false)
        }
    },[])
    return (
        <HeaderCtn>
            <HeaderBox>
                <Box
                    onClick={()=>navigate("/")}
                    className = "navigate">
                    <LogoItem
                        stroke="white"
                        size="40"
                        strokeWidth='6'
                    />
                    <LogoName>
                        우리의 개발세발로그
                    </LogoName>
                </Box>
                <Box>
                    {(isLogin) && <UserStateHeader
                            cookies={cookies}
                        />}
                </Box>
            </HeaderBox>
        </HeaderCtn>
    )
}

const HeaderCtn = styled.div`
    border-bottom: 2px solid #ddd;
    background-color: #CCECDD;
    box-shadow: 0 -1px 5px 1px rgba(0,0,0,0.2);
`
const HeaderBox = styled.div`
    margin: 0 auto;
    max-width: 1200px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 20px;
`
const Box = styled.div`
    display: flex;
    align-items: center;
    font-size: 18px;
    gap: 10px;
    color: white;
`
const LogoName = styled.div`
    display: flex;
    align-items: center;
    font-size: 18px;
    gap: 5px;
    color: white;
    @media screen and (max-width: 500px) {
        display: none;
    }
`

export default Header