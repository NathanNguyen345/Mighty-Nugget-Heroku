import React from 'react';
import InventoryImg from '../BoxType/InventoryImg';
import { useSelector, useDispatch } from 'react-redux';
import css from "../BoxType/BoxType.module.css";

function Rewards() {
    const userFullInventory = useSelector(state => state.userInventorySlice.inventory)
    const prizeData = useSelector(state => state.gameBoardSlice.explorer.prizeArray);
    const keyMap = {
        'wood': 1,
        'ore': 2,
        'fish': 3,
        'diamond': 4
    }

    // Render out grid layout for items
    const renderGridSlots = () => {
        let content = [];

        // Iterate through item list and render component
        for (let key in userFullInventory) {
            if (userFullInventory.hasOwnProperty(key) && key != 'ether') {
                content.push(
                    <div className={`${css.GridItem}`} key={key}>
                        <p>{key}</p>
                        <InventoryImg imgId={key} />
                        <p className='blueText'>{
                            prizeData[keyMap[key]] != null
                                ? prizeData[keyMap[key]] * 10
                                : 0
                        }</p>
                    </div>)
            }
        }

        return content;
    }

    return (
        <div className={`${css.DecorateBox}`}>
            <div className={`${css.DecorateBoxInner}`}>
                <div className={`${css.InventoryTop}`}>
                    <div className={`${css.InventoryGrid}`}>
                        {renderGridSlots()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Rewards;
