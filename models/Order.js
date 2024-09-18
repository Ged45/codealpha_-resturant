const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    tableNumber: { type: Number, required: true },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' }],
    status: { type: String, enum: ['Pending', 'Completed', 'Cancelled'], default: 'Pending' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);