const { publicKcalController } = require('../controllers/products/publicKcalController');
const { privateKcalController } = require('../controllers/products/privateKcalController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { searchProductController } = require('../controllers/products/searchProductController');
const { getProductsController } = require('../controllers/products/getProductsController');
const { getFilteredProductsController } = require('../controllers/products/getFilteredProductsController');


const router = require('express').Router();
/**
 * @route GET /products
 * @desc Obține toate produsele
 * @access Public
 */
router.get('/', getProductsController);

/**
 * @route GET /products/filter
 * @desc Obține produse filtrate
 * @access Public
 * 
 * /**
 * @swagger
 * tags:
 *   name: Products
 *   description: Operațiuni cu produse
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Obține toate produsele
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Lista completă de produse
 *       500:
 *         description: Eroare de server
 */

/**
 * @swagger
 * /products/filter:
 *   get:
 *     summary: Obține produse filtrate
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filtrează produsele după categorie
 *       - in: query
 *         name: groupBloodNotAllowed
 *         schema:
 *           type: boolean
 *         description: Filtrează produsele după grupa sanguină
 *     responses:
 *       200:
 *         description: Produse filtrate
 *       500:
 *         description: Eroare de server
 */
 
router.get('/filter', getFilteredProductsController);
/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Operațiuni cu produse
 */

/**
 * @swagger
 * /products/kcal-public:
 *   get:
 *     summary: Obține aportul zilnic de calorii public și produsele nerecomandate
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Succes
 *       500:
 *         description: Eroare de server
 */

/**
 * @swagger
 * /products/kcal-private:
 *   get:
 *     summary: Obține aportul zilnic de calorii și înregistrează informațiile
 *     tags: [Products]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Succes
 *       401:
 *         description: Neautorizat
 *       500:
 *         description: Eroare de server
 */


router.get('/kcal-private', authMiddleware, privateKcalController);
router.get('/kcal-public', publicKcalController);
router.get('/search', searchProductController);

module.exports = router;