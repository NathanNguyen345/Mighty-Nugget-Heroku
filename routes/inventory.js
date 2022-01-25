const express = require('express');
const Router = express.Router();
const Items = require('../models/items.model');
const Transaction = require('../models/transaction.model');
const User = require('../models/user.model');

// API to get all inventory material from user
Router.post('/full', (req, res) => {
    const id = req.body.id;

    // TODO: We can reduce this down
    if (id !== "") {
        User.findOne({ _id: id }, (err, userFound) => {
            if (userFound) {
                Items.findOne({ _id: userFound.itemId }, (err, itemsFound) => {
                    const items = {
                        ether: itemsFound.ether,
                        wood: itemsFound.wood,
                        ore: itemsFound.ore,
                        fish: itemsFound.fish,
                        diamond: itemsFound.diamond
                    }
                    res.status(200).json({ items: items });
                })
            } else {
                res.status(400).json({ msg: err });
            }
        })
    }
})

// API to mint weapon into user inventory
Router.post('/mintWeapon', (req, res) => {
    const userId = req.body.data.userId;
    const item = {
        name: req.body.data.name,
        atk: req.body.data.atk
    }

    User.findOne({ id: userId }, (err, userFound) => {
        if (userFound) {
            userFound.weapon.push(item);
            userFound.save();

            const newTransaction = new Transaction({
                userId: userId,
                action: 'mint',
                atk: item.atk,
                weaponName: item.name,
                state: "Pending"
            })

            newTransaction.save()
                .then(res => {
                    setTimeout(() => {
                        Transaction.findByIdAndUpdate(
                            { _id: res.id },
                            { state: "Minted" },
                            { upsert: true },
                            (err, itemUpdated) => {
                                if (itemUpdated) {
                                    console.log('Transaction Created')
                                } else {
                                    console.log("Transaction Failed")
                                }
                            })
                    }, 3000)
                }).catch(err => {
                    console.log(err);
                })
            return res.status(200).json({ item: item })
        } else {
            return res.status(401).json({ msg: "Failed to find user" })
        }
    })
})

// API to update single material in user inventory
Router.post('/:matType', (req, res) => {
    const matType = req.body.data.materialName;
    const inventoryId = req.body.data.inventoryId;
    const updateQuery = {};
    updateQuery[matType] = req.body.data.material;

    Items.findByIdAndUpdate({ _id: inventoryId }, updateQuery, { upsert: true, new: true }, (err, updated) => {
        if (updated) {
            res.status(200).json({
                updatedData: {
                    amount: updated[matType],
                    type: matType
                }
            })
        } else {
            res.status(400).json({ err: err })
        }
    })
})

// API to update minting materials
Router.post('/mint/subtractMaterial', (req, res) => {
    const itemId = req.body.data.itemId;
    const materials = req.body.data.materials;
    const updateQuery = {};
    const projection = { _id: 0, userId: 0, __v: 0 };
    const updateFlag = true;

    Items.findById({ _id: itemId }, projection, (err, foundDoc) => {
        if (foundDoc) {
            for (let key in materials) {
                if (foundDoc[key] < materials[key]) {
                    updateFlag = false;
                    break;
                } else {
                    updateQuery[key] = foundDoc[key] - materials[key];
                }
            }

            if (updateFlag) {
                Items.findByIdAndUpdate({ _id: itemId }, updateQuery, { upsert: true, new: true }, (err, updated) => {
                    if (updated) {
                        return res.status(200).json({ updatedData: updated })
                    } else {
                        console.log(err)
                    }
                })
            }
            else {
                return res.status(400).json({ msg: "Insufficent Funds" })
            }
        }
    })
})

module.exports = Router;