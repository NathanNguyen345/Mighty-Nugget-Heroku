const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema(
    {
        userId: {
            type: String,
            required: true
        },
        wood: {
            type: Number,
            required: false
        },
        ore: {
            type: Number,
            required: false
        },
        fish: {
            type: Number,
            required: false
        },
        ether: {
            type: Number,
            required: false
        }
    }
)

const Items = mongoose.model('Items', itemSchema);

module.exports = Items;