const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        userName: {
            type: String,
            required: true,
            trim: true,
            minlength: 2
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minlength: 5
        },
        itemId: {
            type: String,
            required: false
        },
        stake: {
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
        },
        weapon: [{
            name: {
                type: String,
                required: false
            },
            atk: {
                type: Number,
                required: false,
            },
            durability: {
                type: Number,
                required: false
            }
        }]
    },
    {
        timestamps: true
    }
)

const User = mongoose.model("Users", userSchema);

module.exports = User;

