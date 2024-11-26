const mongoose = require('mongoose');

const daySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: String, required: true },
    consumedProducts: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            quantity: { type: Number, required: true },
        },
    ],
    dailyKcal: { type: Number },
});

module.exports = mongoose.model('Day', daySchema);
