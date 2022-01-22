import React, { useEffect, useState } from 'react';
import InventoryImg from '../BoxType/InventoryImg';
import css from "./ExploreGame.module.css";

function GameBoard() {
    const [gameGrid, setGameGrid] = useState([[]]);

    useEffect(() => {
        setGameGrid(Array.from(Array(10), () => new Array(10).fill(0)));
    }, [])

    const renderGrid = () => {
        let content = [];

        gameGrid.map((key, row) => {
            gameGrid[row].map((key, col) => {
                let notEmptyFlag = Math.random() < 0.2
                if (notEmptyFlag) {
                    gameGrid[row][col] = Math.floor((Math.random() * 4))
                }

                content.push(
                    <button
                        value={`${row}${col}`}
                        className={`${css.BoardButton} pixelButton`}
                        onClick={handleClick}>
                        {gameGrid[row][col] != 0 ? <InventoryImg imgId={gameGrid[row][col]} /> : null}
                    </button >
                )
            })
        }, [])

        return content;
    }

    const handleClick = (e) => {
        let row = e.target.value.split([''])[0]
        let col = e.target.value.split([''])[1]

        console.log(row, col)

        if (gameGrid[row][col] != 0) {
            e.target.style.display = "block";
        } else {
            console.log('bad')
        }
    }

    return (
        <React.Fragment>
            <div className={`${css.GameGrid}`}>
                {renderGrid()}
            </div>
        </React.Fragment>
    );
}

export default GameBoard;
