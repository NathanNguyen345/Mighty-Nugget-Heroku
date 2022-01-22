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
            minlength: 3
        },
        itemId: {
            type: String,
            required: true
        },
        gameBoardId: {
            type: String,
            required: true
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

