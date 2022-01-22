const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema(
    {
        explorer: {
            startCount: {
                type: Number
            },
            endCount: {
                type: Number
            },
            gameBoard: {
                type: Schema.Types.Mixed,
                default: []
            }
        }
    }
)

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;