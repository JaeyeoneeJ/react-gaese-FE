import React from "react"
import styled from "styled-components"

const Button = ({
    width="100px",
    border="1px solid black",
    bgColor="white",
    color="black",
    onClick,
    fontWeight="400",
    fontSize="12px",
    padding="4px 10px",
    borderRadius="10px",
    type='button',
    maxWidth='auto',
    children
}) => {
    return (
        <ButtonCtn
            type={type}
            width={width}
            border={border}
            bgColor={bgColor}
            fontWeight = {fontWeight}
            color = {color}
            onClick = {onClick}
            fontSize = {fontSize}
            padding = {padding}
            borderRadius={borderRadius}
            maxWidth={maxWidth}
        >
           {children}
        </ButtonCtn>
    )
}

const ButtonCtn = styled.button`
    max-width: ${(props)=>props.maxWidth};
    width: ${(props)=>props.width};
    color: ${(props)=>props.color};
    padding: ${(props)=>props.padding};
    border: ${(props)=>props.border};
    border-radius: ${(props)=>props.borderRadius};
    background-color: ${(props)=>props.bgColor};
    font-size: ${(props)=>props.fontSize};;
    font-weight: ${(props)=>props.fontWeight};
    &:hover {
        cursor: pointer;
    }
`
export default Button