import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerDefinition from './src/swagger';

const app = express();
const swaggerOptions = {
  customSiteTitle: 'The Spinners',
  explorer: true,
};

const swaggerSpecs = swaggerJsdoc(swaggerDefinition);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs, swaggerOptions));
