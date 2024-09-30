import { Express } from 'express';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const packageJson = require('./package.json');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: packageJson.name.toUpperCase(),
      version: packageJson.version,
      description: packageJson.description,
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        }
      }
    },
    security: [{ BearerAuth: [] }]
  },
  apis: ['./routes.ts'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export const setupSwagger = (app: Express) => {
  app.use('/tasks/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};