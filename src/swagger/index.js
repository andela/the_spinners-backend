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
    tags: [
      {
        name: 'Users',
        description: 'Endpoints for user accounts'
      }
    ],
    schemes: [
      'https',
      'http'
    ],
    consumes: [
      'application/json'
    ],
    produces: [
      'application/json'
    ],
    paths: {
      '/signup': {
        post: {
          tags: [
            'Users'
          ],
          summary: 'Create new user',
          description: 'Create a new user account',
          produces: [
            'application/json'
          ],
          consumes: [
            'application/x-www-form-urlencoded'
          ],
          parameters: [
            {
              name: 'firstName',
              in: 'formData',
              required: true,
              type: 'string',
              description: ''
            },
            {
              name: 'lastName',
              in: 'formData',
              required: true,
              type: 'string',
              description: ''
            },
            {
              name: 'username',
              in: 'formData',
              required: true,
              type: 'string',
              description: ''
            },
            {
              name: 'email',
              in: 'formData',
              required: true,
              type: 'string',
              description: ''
            },
            {
              name: 'password',
              in: 'formData',
              required: true,
              type: 'string',
              description: ''
            }
          ],
          responses: {
            201: {
              description: 'message: User created successfully'
            },
            409: {
              description: 'error: Email already exist'
            },
            400: {
              description: 'error: All fields are required.'
            }
          }
        }
      } // End of signUp endpoint

    }
  },
  // List of apis
  apis: ['./routes/*.js']
};
export default swaggerDefinition;
