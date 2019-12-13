import swaggerJSDoc from 'swagger-jsdoc';
import swaggerui from 'swagger-ui-express';
// Swagger set up
const swaggerDefinition = {
  swaggerDefinition: {
    info: {
      title: 'Barefoot Nomad(The Spiners)',
      version: '1.0.0',
      description:
        'A platform to make company global travel and accommodation easy and convenient for the strong workforce of savvy members of staff, by leveraging the modern web.'
    },
    host: process.env.BASE_URL,
    basePath: '/'
  },
  // List of apis
  apis: ['./src/routes/*.js']
};
const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.js']
};
const swaggerSpec = swaggerJSDoc(options);

const registerSwagger = (app) => { app.use('/docs', swaggerui.serve, swaggerui.setup(swaggerSpec)); };

export default registerSwagger;
