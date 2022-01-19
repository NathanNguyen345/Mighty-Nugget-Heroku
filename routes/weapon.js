const express = require('express');
const Router = express.Router();
const Weapon = require('../models/weapons.model');

// API to get all weapons from DB
Router.get('/all', (req, res) => {
    Weapon.find({}, (err, itemFound) => {
        if (itemFound) {
            res.status(200).json({ weapon: itemFound });
        } else {
            res.status(400).json({ err: err })
        }
    })
})

// API to get weapon by ID
Router.get('/:id', (req, res) => {
    const id = req.params.id;
    Weapon.findOne({ _id: id }, (err, itemFound) => {
        console.log(itemFound);
    })
})

module.exports = Router
