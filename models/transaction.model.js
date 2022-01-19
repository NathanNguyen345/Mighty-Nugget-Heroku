const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema(
    {
        userId: {
            type: String,
            required: true
        },
        action: {
            type: String,
            required: true
        },
        matType: {
            type: String,
            required: false
        },
        amount: {
            type: Number,
            required: false
        },
        weaponName: {
            type: String,
            required: false
        },
        atk: {
            type: Number,
            required: false
        },
        state: {
            type: String,
            required: false
        }
    }
)

const Transaction = mongoose.model('Transactions', transactionSchema);

module.exports = Transaction;