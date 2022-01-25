const express = require('express');
const Router = express.Router();
const Game = require('../models/game.model');

Router.post('/fetchBoard', (req, res) => {
    const userInfo = req.body.data;
    const projection = { _id: 0, userId: 0, __v: 0 };

    Game.findById({ _id: userInfo.gameBoardId }, projection, (err, gameFound) => {
        res.status(200).json({ gameData: gameFound });
    })
})

Router.post('/createExploreBoard', (req, res) => {
    const gameId = req.body.data.gameBoardId;
    let updateQuery = {};
    let gameGrid = Array.from(Array(10), () => new Array(10).fill(0));

    gameGrid.map((key, row) => {
        gameGrid[row].map((key, col) => {
            let notEmptyFlag = Math.random() < 0.2
            if (notEmptyFlag) {
                gameGrid[row][col] = Math.floor((Math.random() * 5))
            }
        })
    })

    updateQuery = {
        startCount: 0,
        endCount: 100,
        gameBoard: gameGrid,
        inProgress: true,
        prizeMap: {},
        prizeArray: []
    }

    Game.findByIdAndUpdate({ _id: gameId }, { $set: { 'explorer': updateQuery } }, { upsert: true, new: true }, (err, gameUpdated) => {
        if (gameUpdated) {
            return res.status(200).json({ gameData: gameUpdated })
        } else {
            return res.status(401).json({ msg: err })
        }
    })
})

Router.post('/updateGameBoard', (req, res) => {
    const gameId = req.body.data.gameBoardId;
    const row = req.body.data.row;
    const col = req.body.data.col;
    let updateQuery = {};

    Game.findById({ _id: gameId }, (err, game) => {
        if (game.explorer.startCount < game.explorer.endCount) {
            game.explorer.startCount++;

            let gameBoard = game.explorer.gameBoard
            let prizeArray = game.explorer.prizeArray

            // Set cordinates for prize mapping for imagne rendering
            if (gameBoard[row][col] != 0) {
                game.explorer.prizeMap = { ...game.explorer.prizeMap, [`${row}${col}`]: gameBoard[row][col] }
                if (prizeArray[gameBoard[row][col]] == undefined) {
                    prizeArray[gameBoard[row][col]] = 1
                } else {
                    prizeArray[gameBoard[row][col]] = prizeArray[gameBoard[row][col]] + 1;
                }
            }
            gameBoard[row][col] = -1;

            // Set value to -1 to tell that its been clicked
            updateQuery = game.explorer;

            Game.findByIdAndUpdate({ _id: gameId }, { $set: { 'explorer': updateQuery } }, { upsert: true, new: true }, (err, updated) => {
                if (updated) {
                    return res.status(200).json({ updatedData: updated })
                } else {
                    return res.status(401).json({ msg: err })
                }
            })
        } else {
            // TODO: Set in progress to false and update then return
            return res.status(401).json({ msg: "Please Enter More Ether To Play" })
        }
    })
})

module.exports = Router;