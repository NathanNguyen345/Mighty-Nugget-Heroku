import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { resetGameData } from '../../slices/gameBoardSlice';
import { collectRewardThunk } from '../../slices/userInventorySlice';
import Inventory from '../BoxType/Inventory';
import Terms from '../BoxType/Terms';
import GameBoard from '../ExploreGame/GameBoard';
import Rewards from '../ExploreGame/Rewards';
import css from "../Routes/Routes.module.css";
import { Navigate } from 'react-router-dom';

function Explore() {
    const userInventory = useSelector(state => state.userInventorySlice);
    const userInfo = useSelector(state => state.userLoginSlice)
    const prizeData = useSelector(state => state.gameBoardSlice.explorer.prizeArray);
    const gameProgress = useSelector(state => state.gameBoardSlice.explorer.inProgress);
    const dispatch = useDispatch();

    const rewardClickHandler = () => {
        dispatch(collectRewardThunk({ userInfo, prizeData, userInventory }));
        dispatch(resetGameData());
    }

    const renderExplorerPage = () => {
        return (
            <div className={`${css.Explorer} flex flex-col`}>
                <div className={`${css.PageTitle}`}>
                    <h1>Explore</h1>
                    <Terms page="Explore" />
                </div>
                <div className='grid gridCol'>
                    <div className={`flex flex-col`}>
                        <h2>Inventory</h2>
                        <Inventory />
                    </div>
                    <div className={`flex flex-col`}>
                        <h2>Rewards</h2>
                        <Rewards />
                        {gameProgress
                            ? <button className='pixelButton' onClick={rewardClickHandler}>Collect Reward</button>
                            : null
                        }
                    </div>
                </div>
                <GameBoard />
            </div>
        )
    }

    return (
        <React.Fragment>
            {userInfo.loggedIn ? renderExplorerPage() : <Navigate to="/" />}
        </React.Fragment>
    )

}

export default Explore;
