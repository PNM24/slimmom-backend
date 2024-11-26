const Product = require('..//../models/Product');

const publicKcalController = async (req, res) => {
    try {
        // Obține produsele nerecomandate și aportul zilnic de kcal
        const products = await Product.find({ recommended: false });
        const dailyKcal = 2000; // Exemplu hardcoded, poate fi ajustat din baza de date
        res.json({ dailyKcal, nonRecommendedProducts: products });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch public kcal data', error: error.message });
    }
};

module.exports = { publicKcalController };