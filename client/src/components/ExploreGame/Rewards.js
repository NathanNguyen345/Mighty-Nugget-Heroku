import React, { useEffect } from 'react';
import axios from "axios";
import InventoryImg from '../BoxType/InventoryImg';
import { fetchFullInventory } from "../../slices/userInventorySlice";
import { useSelector, useDispatch } from 'react-redux';
import css from "../BoxType/BoxType.module.css";

function Rewards() {
    const userId = useSelector(state => state.userLoginSlice.userId);
    const userFullInventory = useSelector(state => state.userInventorySlice.inventory)
    const dispatch = useDispatch()

    useEffect(() => {
        axios.post("/inventory/full", { id: userId })
            .then(req => {
                dispatch(fetchFullInventory(req.data.items))
            });
    }, [userId])

    // Render out grid layout for items
    const renderGridSlots = () => {
        let content = [];

        // Iterate through item list and render component
        for (let key in userFullInventory) {
            if (userFullInventory.hasOwnProperty(key)) {
                content.push(
                    <div className={`${css.GridItem}`} key={key}>
                        <p>{key}</p>
                        <InventoryImg imgId={key} />
                        <p className='blueText'>{userFullInventory[key]}</p>
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
