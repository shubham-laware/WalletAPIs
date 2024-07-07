import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Wallet API',
        version: '1.0.0',
        description: `All APIs for wallet. 

**Important Notes:**
- To perform any request, user must be a registered user.
- Test Credentials:
  - Email: rohit@gmail.com
  - Password: 12345

Please use these credentials for testing purposes.`,
      },
      servers: [
        {
          url: 'https://walletapis.onrender.com',
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