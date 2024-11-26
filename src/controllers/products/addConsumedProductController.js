const Day = require('..//../models/Day');

const addConsumedProductController = async (req, res) => {
    try {
        const { date } = req.params;
        const { productId, quantity } = req.body;
        const userId = req.user.id;

        const day = await Day.findOneAndUpdate(
            { userId, date },
            { $push: { consumedProducts: { productId, quantity } } },
            { new: true, upsert: true }
        );

        res.json({ message: 'Product added to consumed list', day });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add consumed product', error: error.message });
    }
};

module.exports = { addConsumedProductController };