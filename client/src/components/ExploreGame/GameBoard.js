import React, { useEffect, useState } from 'react';
import InventoryImg from '../BoxType/InventoryImg';
import { useSelector, useDispatch } from 'react-redux';
import { updateGameBoardThunk } from '../../slices/gameBoardSlice';
import css from "./ExploreGame.module.css";
import cssBox from "../BoxType/BoxType.module.css";
import gsap from 'gsap';
import GamePaymentButton from './GamePaymentButton';

function GameBoard() {
    const userInfo = useSelector(state => state.userLoginSlice);
    const gameData = useSelector(state => state.gameBoardSlice);
    const boardData = gameData.explorer.gameBoard;
    const dispatch = useDispatch();

    useEffect(() => {
    }, [gameData.explorer.gameBoard])

    const renderGrid = () => {
        let content = [];

        boardData.map((key, row) => {
            boardData[row].map((key, col) => {
                if (boardData[row][col] === -1) {
                    content.push(
                        <button
                            key={`${row}${col}`}
                            value={`${row}${col}`}
                            className={`${css.BoardButton} disabledButton`}
                            disabled={true}>
                            {gameData.explorer.prizeMap !== undefined && (`${row}${col}` in gameData.explorer.prizeMap)
                                ? <InventoryImg imgId={gameData.explorer.prizeMap[`${row}${col}`]} />
                                : null}
                        </button >
                    )
                } else {
                    content.push(
                        <button
                            key={`${row}${col}`}
                            value={`${row}${col}`}
                            className={`${css.BoardButton} activeButton`}
                            onClick={handlePrizeClick}>
                        </button >
                    )
                }
            })
        }, [])

        return content;
    }

    const handlePrizeClick = (e) => {
        let row = e.target.value.split([''])[0]
        let col = e.target.value.split([''])[1]

        const data = {
            gameBoardId: userInfo.gameBoardId,
            row: row,
            col: col
        }

        if (boardData[row][col] === 0) {
            gsap.to(e.target, { background: '#808080' })
        } else {
            gsap.to(e.target, { background: '#07e23c' })
        }
        dispatch(updateGameBoardThunk(data))
    }

    return (
        <React.Fragment>
            <div className={`${css.ExplorerInfo} grid gridCol`}>
                <div>
                    <p>Attempted:
                        <span>
                            {gameData.explorer.startCount}
                        </span>
                    </p>
                </div>
                <div>
                    <p>Credit Entered:
                        <span className='span-green'>
                            {gameData.explorer.endCount}
                        </span>
                    </p>
                </div>
            </div>
            <div className={`${cssBox.DecorateBox}`}>
                <div className={`${cssBox.DecorateBoxInner}`}>
                    <div className={`${css.GameGrid}`}>
                        {renderGrid()}
                    </div>
                </div>
            </div>
            <div>
                <GamePaymentButton />
            </div>
        </React.Fragment>
    );
}

export default GameBoard;
