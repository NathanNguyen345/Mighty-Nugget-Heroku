import React, { useEffect } from 'react';
import axios from "axios";
import InventoryImg from './InventoryImg';
import { fetchFullInventory } from "../../slices/userInventorySlice";
import { useSelector, useDispatch } from 'react-redux';
import css from "./BoxType.module.css";


function Inventory() {
    const userId = useSelector(state => state.userLoginSlice.userId);
    const userFullInventory = useSelector(state => state.userInventorySlice.inventory)
    const dispatch = useDispatch()

    useEffect(() => {
        axios.post("/inventory/full", { id: userId })
            .then(req => {
                dispatch(fetchFullInventory(req.data.items))
            });
    }, [])

    // Render out grid layout for items
    const renderGridSlots = () => {
        let content = [];

        // Iterate through item list and render component
        for (let key in userFullInventory) {
            if (userFullInventory.hasOwnProperty(key)) {
                content.push(
                    <div className={`${css.GridItem}`} key={key}>
                        {key}
                        <InventoryImg imgId={key} />
                        {userFullInventory[key]}
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

export default Inventory
