import express from 'express';
import bodyParser from 'body-parser';
import { serve, setup } from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerDefinition from './swagger';
import router from './routes/signupRoutes';
// import routes from './routes/routes';

const app = express();

const swaggerOptions = {
  customSiteTitle: 'The Spinners',
  explorer: true,
};
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(router);

const swaggerSpecs = swaggerJsdoc(swaggerDefinition);
app.use('/docs', serve, setup(swaggerSpecs, swaggerOptions));

const PORT = process.env.PORT || 3000;

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Listening on port ${PORT}.......`));

export default app;
