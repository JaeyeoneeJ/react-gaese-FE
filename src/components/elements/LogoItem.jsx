import React from 'react'
import { ReactComponent as Logo } from '../../assets/logo.svg'

const LogoItem = ({stroke='black', size='24', strokeWidth='2'}) => {
    return (
        <div>
            <Logo
                stroke={stroke}
                strokeWidth={strokeWidth}
                width={size}
                height={size}
            >
            </Logo>
        </div>
    )
}

export default LogoItem