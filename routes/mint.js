const express = require('express');
const Router = express.Router();
const Mint = require("../models/minting.model");

// API to fetch a specific weapon in the DB
Router.post('/:name', (req, res) => {
    const _name = req.params.name

    Mint.find({ name: _name }, (err, itemFound) => {
        if (itemFound) {
            const items = {
                name: itemFound[0].name,
                mats: {
                    item: itemFound[0].name,
                    wood: itemFound[0].wood,
                    ore: itemFound[0].ore,
                    fish: itemFound[0].fish,
                    ether: itemFound[0].ether
                },
                img: itemFound[0].image,
                id: itemFound[0]._id
            }
            res.status(200).json({ item: items });
        } else {
            res.status(400).json({ msg: err });
        }
    })
})

// API to mint weapon
Router.post('/mintItem/:name', (req, res) => {
    const itemName = req.body.data.itemName
    const materialCounterSlice = req.body.data.materialsCounter;
    const mintMatieral = req.body.data.materials;
    const userId = req.body.data.userId;
    let mintFlag = false;

    // Check if user has suffcient materials
    for (let key in materialCounterSlice) {
        if (materialCounterSlice[key] !== mintMatieral[key]) {
            mintFlag = true;
        }
    }

    if (mintFlag) {
        res.status(400).json({ err: "Insufficent Funds" });
    } else {
        const mintWeapon = {
            atk: Math.floor(Math.random() * (100 - 1 + 1) + 1),
            name: itemName
        }
        res.status(200).json({
            item: mintWeapon,
        })
    }
})

module.exports = Router;