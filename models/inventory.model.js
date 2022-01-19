const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inventorySchema = new Schema(
    {
        userId: {
            type: String,
            required: true,
            trim: true
        },
        itemId: {
            type: String,
            required: true,
            trim: true
        },
        items: [{ type: Schema.Types.ObjectId, ref: "Items" }]
    }
)

const Material = mongoose.model('Inventory', inventorySchema);

module.exports = Material;