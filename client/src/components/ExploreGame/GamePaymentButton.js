import React, { useState } from 'react';
import { createBoardThunk } from "../../slices/gameBoardSlice";
import { useSelector, useDispatch } from "react-redux";
import InventoryImg from '../BoxType/InventoryImg';
import css from "../BoxType/BoxType.module.css";

function GamePaymentButton() {
    const userInventory = useSelector(state => state.userInventorySlice);
    const userInfo = useSelector(state => state.userLoginSlice);
    const dispatch = useDispatch();
    const [credit, setCredit] = useState(0);

    const resetBoardClicker = () => {
        dispatch(createBoardThunk(userInfo));
    }

    return (
        <React.Fragment>
            <div className={`${css.DecorateBox}`}>
                <div className={`${css.DecorateBoxInner} pos-relative`}>
                    <div className='flex flex-row'>
                        <div className='flex flex-col'>
                            <InventoryImg imgId={'ether'} />
                            {userInventory.inventory.ether}
                        </div>
                        <div className='flex flex-col'>
                            <h2>Credits: {credit}</h2>
                            <input placeholder='Enter Ether For Credit' type='number' min='0' max='50' step='1'></input>
                            <p>1 Ether = 5 Credits</p>
                            <button className='pixelButton' onClick={resetBoardClicker}>Start Game</button>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment >
    );
}

export default GamePaymentButton;
