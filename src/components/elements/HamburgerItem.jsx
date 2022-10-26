import React from 'react'
import styled from 'styled-components'
import { ReactComponent as Hamburger } from '../../assets/hamburger.svg'

const HamburgerItem = ({stroke='black', size='24', strokeWidth='2'}) => {
    return (
        <Ctn>
            <Hamburger
                stroke={stroke}
                strokeWidth={strokeWidth}
                width={size}
                height={size}
            >
            </Hamburger>
        </Ctn>
    )
}

const Ctn = styled.div`
    display: flex;
    align-items: center;
`

export default HamburgerItem