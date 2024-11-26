const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const authRoutes = require('./src/routes/authRoutes');
const productRoutes = require('./src/routes/productRoutes');
const dayRoutes = require('./src/routes/dayRoutes');
const { swaggerSpec } = require('./src/swagger/swaggerDoc');
const swaggerUi = require('swagger-ui-express');

// Configurare variabile de mediu
dotenv.config();

const app = express();

// Middleware-uri globale
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Rute principale
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/days', dayRoutes);

// Documentație API - Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware pentru gestionarea erorilor
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});

module.exports = app;
