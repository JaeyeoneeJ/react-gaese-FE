import React, { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"

const HamburgerMenu = ({isClick, setIsClick, userId}) => {
    const navigate = useNavigate()
    const [onMove, setOnMove] = useState("-102%")
    
    const [cookies, setCookie, removeCookie] = useCookies(['token'])
    
    const logout = () => {
        if (window.confirm('정말 로그아웃 하시겠습니까?')) {
            removeCookie('token')
            removeCookie('userId')
            alert('로그아웃이 완료되었습니다. 메인 페이지로 이동합니다.')
            window.location.replace('/')
        } else {
            return;
        }
    }
    // console.log(isClick, onMove)
    useEffect(()=> {
        if (isClick) {
            setOnMove("0")
        } else {
            setOnMove("-102%")
        }
    },[isClick])
    
    return (
        <Ctn onMove={onMove}>
            <MenuBar>
                <MenuItem
                    onClick={()=>{
                        setIsClick(!isClick)
                        return navigate('/')
                    }}
                >
                    HOME
                </MenuItem>
                <MenuItem
                    onClick={()=>{
                        setIsClick(!isClick)
                        return navigate('/posts/add')
                    }}
                >
                    POSTING
                </MenuItem>
                <MenuItem
                    onClick={()=>{
                        setIsClick(!isClick)
                        return navigate(`/profile/${userId}`)
                    }}
                >
                    PROFILE
                </MenuItem>
                <MenuItem
                    onClick={()=> {
                        logout()
                    }}
                >
                    LOGOUT
                </MenuItem>
                
            </MenuBar>
        </Ctn>
    )
}

const Ctn = styled.div`
    display: flex;
    justify-content: center;
    z-index: 1;
    position: absolute;
    top: 57px;
    right: ${props=>props.onMove};
    width: 100%;
    height: calc(100vh);
    background-color: rgba(255,255,255,0.9);
    /* box-shadow: 0 5px 5px 1px rgba(0,0,0,0.2); */
    transition: all, 0.5s;
`
const MenuBar = styled.div`
    display: flex;
    width: 200px;
    flex-direction: column;
    margin: 20px;
`
const MenuItem = styled.div`
    display: flex;
    justify-content: center;
    padding: 20px;
    border-bottom: 1px solid #d9d9d9;
    color: gray;
    transition: all, 0.3s;
    &:hover{
        cursor: pointer;
        color: #AF93FF;
        padding: 30px;
        border-bottom: 2px solid #AF93FF;
    }
`

export default HamburgerMenu