import React from 'react'
import { ReactComponent as Hamburger } from '../../assets/hamburger.svg'

const HamburgerItem = ({stroke='black', size='24', strokeWidth='2'}) => {
    return (
        <div>
            <Hamburger
                stroke={stroke}
                strokeWidth={strokeWidth}
                width={size}
                height={size}
            >
            </Hamburger>
        </div>
    )
}

export default HamburgerItem