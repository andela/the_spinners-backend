
import express from 'express';
import morgan from 'morgan';
import authRoute from './routes/auth.route';

const app = express();
app.use(morgan('dev'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api/auth', authRoute);

export default app;
