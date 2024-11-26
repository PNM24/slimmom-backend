const swaggerJsDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'SlimMom API',
            version: '1.0.0',
            description: 'API-ul pentru gestionarea aplicației SlimMom',
        },
        servers: [
            {
                url: 'http://localhost:5000',
                description: 'Server local',
            },
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                BearerAuth: [],
            },
        ],
    },
    apis: ['./src/routes/*.js'], // Indică locația fișierelor cu rute
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = { swaggerSpec };