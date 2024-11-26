const Product = require('..//../models/Product');

const searchProductController = async (req, res) => {
    try {
        const query = req.query.q;
        if (!query) {
            return res.status(400).json({ message: 'Query parameter is required' });
        }

        const products = await Product.find({ name: new RegExp(query, 'i') });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Failed to search products', error: error.message });
    }
};

module.exports = { searchProductController };