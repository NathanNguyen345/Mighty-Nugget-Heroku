import React, { useEffect } from 'react'
import ItemBoxContainer from '../ItemBox/ItemBoxContainer';
import { useSelector } from 'react-redux';

import css from "./BoxType.module.css";

function Weapons() {
    const userInfo = useSelector(state => state.userLoginSlice);

    // Render out weapons found in user redux store
    const renderGridSlots = () => {
        let content = []
        userInfo.weapon.map(item => {
            content.push(
                <React.Fragment>
                    <ItemBoxContainer
                        key={`${item.name}-${item.atk}`}
                        title={item.name}
                        action={item.atk}
                    />
                </React.Fragment>
            )
        })

        return content;
    }

    return (
        <div className={`${css.DecorateBox}`}>
            <div className={`${css.DecorateBoxInner}`}>
                <div className={`${css.InventoryTop} flex`}>
                    <div className={`${css.InventoryGrid}`}>
                        {renderGridSlots()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Weapons
