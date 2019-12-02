// Swagger set up
const swaggerDefinition = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Barefoot Nomad(The Spiners)',
      version: '1.0.0',
      description:
        'A platform to make company global travel and accommodation easy and convenient for the strong workforce of savvy members of staff, by leveraging the modern web.'
    },
    host: 'localhost:1234', // the host or url of the app
    basePath: '/api/v1', // the basepath of your endpoint
  },
  // List of apis
  apis: ['./routes/*.js']
};
export default swaggerDefinition;
