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
                type: Schema.Types.Mixed
            },
            inProgress: {
                type: Boolean
            },
            prizeMap: {
                type: Object
            },
            prizeArray: {
                type: Array
            }
        }
    }
)

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;