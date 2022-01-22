import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BoxTitle from '../BodyBox/BoxTitle';
import Inventory from '../BoxType/Inventory';
import GameBoard from '../ExploreGame/GameBoard';
import css from "../Routes/Routes.module.css";

function Explore() {
    const userInventory = useSelector(state => state.userInventory);


    return (
        <div className='flex flex-col'>
            <div className={`${css.PageTitle}`}>
                <h1>UNDER CONSTRUCTION</h1>
            </div>
            <Inventory />
            <GameBoard />
        </div>
    )
}

export default Explore;
