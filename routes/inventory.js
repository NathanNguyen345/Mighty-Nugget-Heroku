const express = require('express');
const Router = express.Router();
const Items = require('../models/items.model');
const Inventory = require('../models/inventory.model');
const Transaction = require('../models/transaction.model');

// API to get all inventory material from user
Router.post('/full', (req, res) => {
    const id = req.body.id;

    Inventory.findOne({ userId: id }, (err, userFound) => {
        if (userFound) {
            Items.findOne({ _id: userFound.itemId }, (err, itemsFound) => {
                const items = {
                    wood: itemsFound.wood,
                    ore: itemsFound.ore,
                    fish: itemsFound.fish,
                    ether: itemsFound.ether
                }
                res.status(200).json({ items: items });
            })
        } else {
            res.status(400).json({ msg: err });
        }
    })
})

// API to mint weapon into user inventory
Router.post('/mintWeapon', (req, res) => {
    const material = req.body.material;
    const userId = req.body.userId;
    const item = req.body.item;
    let currentInventory = req.body.currentInventory;

    for (let key in currentInventory) {
        currentInventory[key] = currentInventory[key] - material[key]
    }

    // Update user inventory with new material counts
    Items.findOneAndUpdate(
        { userId: userId },
        currentInventory,
        (err, updated) => {
            if (updated) {
                // save new transaction for weapon
                const newTransaction = new Transaction({
                    userId: updated.userId,
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
                                        // console.log(itemUpdated);
                                    } else {
                                        console.log(err);
                                    }
                                })
                        }, 10000)
                        console.log("New Weapon Minted")
                    }).catch(err => {
                        console.log(err)
                    })

                res.status(200).json({ msg: "Item Updated" })
            } else {
                res.status(400).json({ msg: err })
            }
        })
})

// API to update single material in user inventory
Router.post('/:matType', (req, res) => {
    const matType = req.body.data.materialName;
    let amount = req.body.data.amount;
    const inventoryId = "61c2c17a35cef28166c8865f";
    const updateQuery = {};
    updateQuery[matType] = req.body.data.material;

    Items.findByIdAndUpdate({ _id: inventoryId }, updateQuery, { upsert: true }, (err, updated) => {
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
    const id = req.body.data.userId;
    const materials = req.body.data.materials
    const updateQuery = {};
    const projection = { _id: 0, userId: 0 }

    Items.findOne({ userId: id }, projection, (err, foundDoc) => {
        if (foundDoc) {
            for (let key in foundDoc['_doc']) {
                updateQuery[key] = foundDoc[key] - materials[key]
            }

            Items.findOneAndUpdate({ userId: id }, updateQuery, { upsert: true, new: true }, (err, updated) => {
                if (updated) {
                    return res.status(200).json({ updatedData: updated })
                } else {
                    console.log(err)
                }
            })
        }
    })

    Items.findOneAndUpdate()
})

module.exports = Router;