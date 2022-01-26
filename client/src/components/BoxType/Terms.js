import { set } from 'mongoose';
import React, { useEffect, useState } from 'react';
import css from "./BoxType.module.css";

function Terms(props) {
    const { page } = props

    const renderInfo = () => {
        let content = []

        switch (page) {
            case 'Town':
                content.push(
                    <div className='pageInfo'>
                        <h2>Welcome to the Town!</h2>
                        <p>This is where you can view your inventory, weapons, mint weapons and stake materials</p>
                    </div>
                )
                break;
            case 'Transaction':
                content.push(
                    <div className='pageInfo'>
                        <h2>This is where you can view all your recent transaction</h2>
                    </div>
                )
                break;
            case 'Explore':
                content.push(
                    <div class='pageInfo'>
                        <h2>This is where you can play a mini game to earn materials and find rare gems</h2>
                        <p>1: Exchange Ether for credit (Max 20 Ether)</p>
                        <p>2: Click Start Game</p>
                        <p>3: Select a random box from the grid and see if a reward is underneath</p>
                        <p>4: Click collect reward to end the game</p>
                    </div>
                )
                break;
            default:
                break
        }

        return content
    }

    return (
        <div className={`${css.TermsContainer}`}>
            <div className={`${css.DecorateBox}`}>
                <div className={`${css.DecorateBoxInner}`}>
                    <div>{renderInfo()}</div>
                </div>
            </div>
        </div>
    )
}

export default Terms
