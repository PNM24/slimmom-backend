const mongoose = require('mongoose');
const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

mongoose
    .connect(process.env.DB_HOST)
    .then(() => {
        console.log('Database connection successful');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(error => {
        console.error('Database connection error:', error.message);
        process.exit(1);
    });
