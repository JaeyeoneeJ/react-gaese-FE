import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { VscChevronUp } from "react-icons/vsc";


const TopButton = () => {
    const [showButton, setShowButton] = useState(false);
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    const handleShowButton = () => {
        if (window.scrollY > 200) {
            setShowButton(true)
        } else {
            setShowButton(false)
        }
    }

    useEffect(() => {
        handleShowButton()
        window.addEventListener("scroll", handleShowButton)
        return () => {
            window.removeEventListener("scroll", handleShowButton)
        }
    }, [])
    
    return showButton && (
        <Scroll_container>
            <TopBtn
                onClick={scrollToTop}
                type="button"
            >
                <VscChevronUp size={30} />
            </TopBtn>
        </Scroll_container>
    )
}

const Scroll_container = styled.div`
    position: fixed;
    right: 3%;
    bottom: 3%;
    z-index: 1;
`
const TopBtn = styled.button`
    padding: 10px;
    background-color: rgba(20, 20, 20, 0.3);
    color:#fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: all, 0.3s;
    &:hover {
        background-color: rgba(20, 20, 20, 0.6);
    }
`

export default TopButton