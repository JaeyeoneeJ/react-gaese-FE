import React from 'react'
import { ReactComponent as MenuBar } from '../../assets/menuBar.svg'

const MenuBarItem = ({stroke='black', size='24', strokeWidth='2'}) => {
    return (
        <div>
            <MenuBar
                stroke={stroke}
                strokeWidth={strokeWidth}
                width={size}
                height="100%"
            >
            </MenuBar>
        </div>
    )
}

export default MenuBarItem