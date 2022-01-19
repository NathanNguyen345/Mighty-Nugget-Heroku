const express = require('express');
const Router = express.Router();
const User = require('../models/user.model');

// API to create a new user
Router.post('/createUser', (req, res) => {
    const userName = req.body.userName;
    const password = req.body.userPass;

    User.findOne({ userName: userName }, (err, userFound) => {
        if (userFound) {
            res.status(401).json({ msg: "The username already exist." });
        } else {
            const newUser = new User({
                userName,
                password,
                stake: {
                    wood: 1000,
                    ore: 1000,
                    fish: 1000,
                    ether: 1000
                },
                weapon: []
            })
            newUser.save()
                .then(() => {
                    User.findOne({ userName: req.body.userName }, (err, userFound) => {
                        res.status(200).json({ id: userFound });
                    })
                })
                .catch((err) => res.status(401).json({ msg: "Creation Failed" }))
        }
    })
})

// API to log in a user
Router.post('/login', (req, res) => {
    const userName = req.body.userName;
    const password = req.body.userPass;

    User.findOne({ userName: userName }, (err, userFound) => {
        if (userFound) {
            if (password !== userFound.password) {
                res.status(401).json({ msg: "Invalid password. Please try again" });
            } else {
                res.status(200).json({ id: userFound });
            }
        } else {
            res.status(401).json({ msg: "User not found" });
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
                res.status(400).json(err);
            }
        })
    })


})

module.exports = Router;