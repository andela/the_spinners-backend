import { serve, setup } from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { swaggerDefinition } from './src/swagger';

const swaggerOptions = {  
  customSiteTitle: 'The Spinners',  
  explorer: true, 
};   

const swaggerSpecs = swaggerJsdoc(swaggerDefinition);
app.use('/docs', serve, setup(swaggerSpecs, swaggerOptions));