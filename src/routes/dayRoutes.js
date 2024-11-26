const express = require('express');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { addConsumedProductController } = require('../controllers/products/addConsumedProductController');
const { deleteConsumedProductController } = require('../controllers/products/deleteConsumedProductController');
const { dayInfoController } = require('../controllers/products/dayInfoController');

/**
 * @swagger
 * tags:
 *   name: Days
 *   description: Gestionarea zilelor
 */

/**
 * @swagger
 * /days/day/{date}/consume:
 *   post:
 *     summary: Adaugă un produs consumat într-o zi
 *     tags: [Days]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *         description: Data zilei în format YYYY-MM-DD
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Produs adăugat cu succes
 *       400:
 *         description: Date lipsă sau invalide
 *       500:
 *         description: Eroare de server
 */

/**
 * @swagger
 * /days/day/{date}/consume:
 *   delete:
 *     summary: Șterge un produs consumat dintr-o zi
 *     tags: [Days]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *         description: Data zilei în format YYYY-MM-DD
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Produs șters cu succes
 *       404:
 *         description: Ziua nu a fost găsită
 *       500:
 *         description: Eroare de server
 */

/**
 * @swagger
 * /days/day/{date}:
 *   get:
 *     summary: Obține informațiile despre o zi
 *     tags: [Days]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *         description: Data zilei în format YYYY-MM-DD
 *     responses:
 *       200:
 *         description: Informații despre zi
 *       404:
 *         description: Ziua nu a fost găsită
 *       500:
 *         description: Eroare de server
 */


const router = express.Router();

// Adaugă un produs consumat într-o zi specifică
router.post('/day/:date/consume', authMiddleware, addConsumedProductController);

// Șterge un produs consumat dintr-o zi specifică
router.delete('/day/:date/consume', authMiddleware, deleteConsumedProductController);

// Obține informațiile despre o zi specifică
router.get('/day/:date', authMiddleware, dayInfoController);

module.exports = router;