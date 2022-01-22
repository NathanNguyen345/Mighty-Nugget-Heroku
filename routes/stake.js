const express = require('express');
const Router = express.Router();
const Stake = require("../models/stake.model");

// API to get all stake count
Router.post('/all', (req, res) => {
    Stake.find({}, (err, itemFound) => {
        if (itemFound) {
            const item = {
                wood: itemFound[0].wood,
                ore: itemFound[0].ore,
                fish: itemFound[0].fish
            }
            return res.status(200).json({ item: item })
        } else {
            return res.status(400).json({ error: err });
        }
    })
})

// API to stake material into DB
Router.post('/:matType', (req, res) => {
    const amount = req.body.amount;
    const materialName = req.body.materialName;
    const stakeId = req.body.stakeId;
    const stakeAmount = req.body.stakeAmount;
    const updateQuery = {};

    updateQuery[materialName] = stakeAmount + amount;

    Stake.findByIdAndUpdate({ _id: stakeId }, updateQuery, { upsert: true }, (err, updated) => {
        console.log(updated);
        if (updated) {
            res.status(200).json({
                materialInfo: {
                    amount: stakeAmount + amount,
                    name: materialName
                }
            })
        } else {
            res.status(400).json({ err: err })
        }
    })

})

module.exports = Router;