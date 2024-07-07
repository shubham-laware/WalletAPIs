import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Wallet API',
        version: '1.0.0',
        description: 'All APIs for wallet',
      },
      servers: [
        {
          url: 'https://walletapis.onrender.com', // Remove /api/v1 from here
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      security: [{ bearerAuth: [] }],
    },
    apis: ['./routes/*.js'],
};

export const specs = swaggerJsdoc(options);