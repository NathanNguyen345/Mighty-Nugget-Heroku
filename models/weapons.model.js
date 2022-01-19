const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const weaponSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        atk: {
            type: Number,
            required: true
        },
        durability: {
            type: Number,
            required: true
        },
        image: {
            type: String,
            required: true
        }
    }
)

const Weapon = mongoose.model('Weapons', weaponSchema);

module.exports = Weapon;