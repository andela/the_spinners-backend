import express from 'express';
import { serve, setup } from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerDefinition from './src/swagger';
import db from './src/config/dbConfig';

const app = express();

const swaggerOptions = {
  customSiteTitle: 'The Spinners',
  explorer: true,
};

const swaggerSpecs = swaggerJsdoc(swaggerDefinition);
app.use('/docs', serve, setup(swaggerSpecs, swaggerOptions));

const PORT = process.env.PORT || 3000;

db.authenticate()
  .then(() => {
    // eslint-disable-next-line no-console
    app.listen(PORT, () => console.log(`Listening on port ${PORT}.......`));
  });
