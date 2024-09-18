const mongoose = require('mongoose');

const MenuItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    category: { type: String },
    available: {type: Boolean}
});

module.exports = mongoose.model('MenuItem', MenuItemSchema);





