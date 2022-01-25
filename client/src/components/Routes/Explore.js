import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BoxTitle from '../BodyBox/BoxTitle';
import Inventory from '../BoxType/Inventory';
import GameBoard from '../ExploreGame/GameBoard';
import Rewards from '../ExploreGame/Rewards';
import css from "../Routes/Routes.module.css";

function Explore() {
    const userInventory = useSelector(state => state.userInventory);


    return (
        <div className={`${css.Explorer} flex flex-col`}>
            <div className={`${css.PageTitle}`}>
                <h1>UNDER CONSTRUCTION</h1>
            </div>
            <div className='grid gridCol'>
                <Inventory />
                <Rewards />
            </div>
            <GameBoard />
        </div>
    )
}

export default Explore;
