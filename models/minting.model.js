const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mintingSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        wood: {
            type: Number,
            required: true,
        },
        ore: {
            type: Number,
            required: true
        },
        fish: {
            type: Number,
            required: true
        },
        ether: {
            type: Number,
            required: true
        },
        image: {
            type: String,
            require: true
        }
    }
)

const Mint = mongoose.model('Mintings', mintingSchema);

module.exports = Mint;