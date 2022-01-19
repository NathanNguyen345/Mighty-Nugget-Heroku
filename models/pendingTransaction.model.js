const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pendingTransactionSchema = new Schema(
    {
        userId: {
            type: String,
            required: true
        },
        action: {
            type: String,
            required: true
        },
        weaponName: {
            type: String,
            required: true
        },
        atk: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const PendingTransaction = mongoose.model('PendingTransaction', pendingTransactionSchema);

module.exports = PendingTransaction;