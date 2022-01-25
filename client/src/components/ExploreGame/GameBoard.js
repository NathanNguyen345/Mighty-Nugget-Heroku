import React, { useEffect, useState } from 'react';
import InventoryImg from '../BoxType/InventoryImg';
import { useSelector, useDispatch } from 'react-redux';
import { createBoardThunk, updateGameBoardThunk } from '../../slices/gameBoardSlice';
import css from "./ExploreGame.module.css";
import gsap from 'gsap';

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
                if (boardData[row][col] == -1) {
                    content.push(
                        <button
                            key={`${row}${col}`}
                            value={`${row}${col}`}
                            className={`${css.BoardButton} disabledButton`}
                            disabled={true}>
                            {gameData.explorer.prize != 0 ? <InventoryImg imgId={gameData.explorer.prize} /> : null}
                        </button >
                    )
                } else {
                    content.push(
                        <button
                            key={`${row}${col}`}
                            value={`${row}${col}`}
                            className={`${css.BoardButton} activeButton`}
                            onClick={handlePrizeClick}>
                            {boardData[row][col] != 0 ? <InventoryImg imgId={boardData[row][col]} /> : 0}
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

        if (boardData[row][col] == 0) {
            gsap.to(e.target, { background: '#808080' })
        } else {
            gsap.to(e.target, { background: '#07e23c' })
        }
        dispatch(updateGameBoardThunk(data))
    }

    const resetBoardClicker = () => {
        dispatch(createBoardThunk(userInfo));
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
            <div className={`${css.GameGrid}`}>
                {renderGrid()}
            </div>
            <div>
                <button className='pixelButton' onClick={resetBoardClicker}>Reset Board</button>
            </div>
        </React.Fragment>
    );
}

export default GameBoard;
