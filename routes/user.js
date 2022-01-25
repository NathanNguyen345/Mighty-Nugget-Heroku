const express = require('express');
const Router = express.Router();
const User = require('../models/user.model');
const Game = require('../models/game.model');
const Items = require('../models/items.model');

// API to create a new user
Router.post('/createUser', (req, res) => {
    const userName = req.body.data.userName.toLowerCase();
    const password = req.body.data.userPass.toLowerCase();

    const createNewItem = async () => {
        const newItem = new Items({
            userId: "",
            wood: 1000,
            ore: 1000,
            fish: 1000,
            ether: 1000
        });

        return await newItem.save();
    }

    const createNewGameBoard = async () => {
        const newGame = new Game({
            explorer: {
                startCount: 0,
                endCount: 0,
                gameBoard: [[]],
                inProgress: false
            }
        })
        return await newGame.save();
    }

    const createNewUser = async () => {
        const itemData = await createNewItem();
        const gameBoardData = await createNewGameBoard();

        User.findOne({ userName: userName }, (err, userFound) => {
            if (userFound) {
                res.status(401).json({ msg: "The username already exist." });
            } else {
                const newUser = new User({
                    userName,
                    password,
                    itemId: itemData._id,
                    gameBoardId: gameBoardData._id,
                    stake: {
                        wood: 0,
                        ore: 0,
                        fish: 0,
                        ether: 0
                    },
                    weapon: []
                });
                newUser.save((err, userCreated) => {
                    try {
                        return res.status(200).json({ userInfo: userCreated });
                    } catch (err) {
                        // TODO: If failed delete ITEM / Game Data
                        return res.status(401).json({ msg: "Creation Failed" })
                    }
                })
            }

        })
    }

    createNewUser();
});

// API to log in a user
Router.post('/login', (req, res) => {
    const userName = req.body.data.userName.toLowerCase();
    const password = req.body.data.userPass.toLowerCase();

    User.findOne({ userName: userName }, (err, userFound) => {
        if (userFound) {
            if (password !== userFound.password) {
                res.status(401).json({ msg: "Invalid password" });
            } else {
                res.status(200).json({ userInfo: userFound });
            }
        } else {
            res.status(401).json({ msg: "Username not found" });
        };
    })
})

Router.post('/updateStake', (req, res) => {
    const id = req.body.data.userId;
    const amount = req.body.data.amount;
    const materialName = req.body.data.materialName;
    let updateQuery = {};
    const projection = { stake: 1 }

    User.findOne({ _id: id }, projection, (err, userFound) => {
        updateQuery = JSON.parse(JSON.stringify(userFound.stake));
        updateQuery[materialName] = updateQuery[materialName] + amount;

        User.findOneAndUpdate({ _id: id }, { stake: updateQuery }, { upsert: true, new: true }, (err, updated) => {
            if (updated) {
                res.status(200).json({ materialName, stakeCommit: updated.stake[materialName] });
            } else {
                res.status(400).json("Incorrect Username/Password. Please Try Again");
            }
        })
    })
})

// TODO: Refresh Data
Router.post('/refreshData', (req, res) => {
    const id = req.body.data.userId;
    const isLoggedIn = require.body.data.loggedIn;


})

module.exports = Router;