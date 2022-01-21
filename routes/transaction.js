const express = require('express');
const Router = express.Router();
const Transaction = require('../models/transaction.model');

// API to make a transaction in the DB
Router.post('/:name/:action', (req, res) => {
    documentData = {
        userId: req.body.userId,
        action: req.params.action,
        matType: req.body.name,
        amount: req.body.amount
    }

    Transaction.create(documentData, (err, docCreated) => {
        if (docCreated) {
            res.status(200).json({ msg: "Success" })
        } else {
            res.status(400).json({ msg: err })
        }
    })
})

// API to get user transaction by ID
Router.post('/full', (req, res) => {
    if (req.body.id !== undefined) {
        Transaction.find({ userId: req.body.id }, (err, transactionFound) => {
            if (transactionFound) {
                res.status(200).json({ transactions: transactionFound })
            } else {
                console.log(err);
            }
        })
    }
})

module.exports = Router;