const express = require('express');
const { registerController } = require('../controllers/auth/registerController');
const router = express.Router();
const { loginController } = require('../controllers/auth/loginController');
const { logoutController } = require('../controllers/auth/logoutController');

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Operațiuni de autentificare
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Înregistrează un utilizator nou
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Utilizator înregistrat cu succes
 *       409:
 *         description: Email-ul există deja
 *       500:
 *         description: Eroare de server
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Autentifică un utilizator
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Autentificare reușită
 *       401:
 *         description: Credențiale invalide
 *       500:
 *         description: Eroare de server
 */

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Deconectează utilizatorul
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Deconectare reușită
 *       401:
 *         description: Utilizator neautorizat
 */


router.post('/login', loginController);
router.post('/register', registerController);
router.post('/logout', logoutController);

module.exports = router;
