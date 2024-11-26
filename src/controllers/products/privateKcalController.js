const Product = require('..//../models/Product');
const Day = require('..//../models/Day');

const privateKcalController = async (req, res) => {
    try {
        const userId = req.user.id;
        const dailyKcal = 2000; // Exemplu hardcoded
        const products = await Product.find({ recommended: false });

        // Înregistrează cererea în baza de date
        const dayEntry = await Day.create({
            userId,
            requestDate: new Date(),
            dailyKcal,
        });

        res.json({ dailyKcal, nonRecommendedProducts: products, log: dayEntry });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch private kcal data', error: error.message });
    }
};

module.exports = { privateKcalController };