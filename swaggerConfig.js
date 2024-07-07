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
          url: 'http://localhost:4000/api/v1', // This includes the base path
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
