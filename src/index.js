import express from 'express';
import bodyParser from 'body-parser';
import { serve, setup } from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerDefinition from './swagger';
import router from './routes/signupRoutes';

const app = express();

const swaggerOptions = {
  customSiteTitle: 'The Spinners',
  explorer: true,
};
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(router);

app.use((req, _res, next) => {
  const error = new Error('Ressources not found');
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status);
  res.json({
    status: '404',
    error: error.message,
  });
});

const swaggerSpecs = swaggerJsdoc(swaggerDefinition);
app.use('/docs', serve, setup(swaggerSpecs, swaggerOptions));

const PORT = process.env.PORT || 3000;

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Listening on port ${PORT}.......`));

export default app;
