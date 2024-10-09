const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
        openapi: '3.0.0',
        info: {
        title: 'Chatbot App',
        version: '1.0.0',
        description: 'This is just test app',
    },
};

const options = {
swaggerDefinition,
apis: ["**/*.ts"], 
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;

