const products = require('../../data/products.json');

const getFilteredProductsController = (req, res) => {
    try {
        const { category, groupBloodNotAllowed } = req.query;

        let filteredProducts = products;

        // Filtrare după categorie
        if (category) {
            filteredProducts = filteredProducts.filter(product => product.categories === category);
        }

        // Filtrare după grupa sanguină (dacă este specificat)
        if (groupBloodNotAllowed) {
            const isAllowed = groupBloodNotAllowed === 'true';
            filteredProducts = filteredProducts.filter(product =>
                product.groupBloodNotAllowed.includes(isAllowed)
            );
        }

        res.status(200).json(filteredProducts);
    } catch (error) {
        res.status(500).json({ message: 'Failed to filter products', error: error.message });
    }
};

module.exports = { getFilteredProductsController };
