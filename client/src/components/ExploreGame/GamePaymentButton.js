import React, { useState } from 'react';
import { createBoardThunk } from "../../slices/gameBoardSlice";
import { useSelector, useDispatch } from "react-redux";
import InventoryImg from '../BoxType/InventoryImg';
import css from "../BoxType/BoxType.module.css";
import { explorerEtherPaymentThunk } from '../../slices/userInventorySlice';

function GamePaymentButton() {
    const userInventory = useSelector(state => state.userInventorySlice);
    const userInfo = useSelector(state => state.userLoginSlice);
    const gameData = useSelector(state => state.gameBoardSlice);
    const dispatch = useDispatch();
    const [credit, setCredit] = useState(0);
    const [error, setError] = useState();
    const [disabledFlag, setDisabled] = useState(false);

    const resetBoardClicker = () => {
        if (credit === 0) {
            setError('Please Enter Credit To Play')
            setDisabled(true);
        } else {
            dispatch(createBoardThunk({ userInfo, credit }));
            dispatch(explorerEtherPaymentThunk({ userInfo, userInventory, credit }))
        }
    }

    const handleChange = (e) => {
        if (e.target.value > 20) {
            setError('Max Creidt Allowed Is 20');
            setDisabled(true);
        } else {
            setCredit((e.target.value * 5))
            setError('');
            setDisabled(false);
        }
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
                            <input className={`${css.EtherInput}`} onChange={handleChange} placeholder='Enter Ether For Credit' type='number' min='0' max='20' step='1'></input>
                            <p>{error}</p>
                            <p>1 Ether = 5 Credits</p>
                            {gameData.explorer.inProgress
                                ? <p>Game In Progress</p>
                                : <button className='pixelButton' disabled={disabledFlag} onClick={resetBoardClicker}>Start Game</button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment >
    );
}

export default GamePaymentButton;
