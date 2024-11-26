const products = require('../../data/products.json'); // Importă fișierul JSON local

const getProductsController = (req, res) => {
    try {
        res.status(200).json(products); // Trimite toate produsele
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch products', error: error.message });
    }
};

module.exports = { getProductsController };