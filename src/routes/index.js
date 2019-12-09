import express from 'express';
import authValidation from '../middlewares/login.middleware';

const { isloggedIn } = authValidation;

const app = express.Router();
app.get('/protected', isloggedIn, (req, res) => {
  res.status(200).send('Welcome to the protected route');
});
export default app;
