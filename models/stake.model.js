const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stakeSchema = new Schema(
    {
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
        }
    }
)

const Stake = mongoose.model('Stake', stakeSchema);

module.exports = Stake;