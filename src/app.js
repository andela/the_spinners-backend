
import express from 'express';
import auth from './routes/auth.route';
import protect from './routes/index';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', protect);
app.use('/api/auth', auth);

export default app;
