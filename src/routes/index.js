import express from 'express';
import authRoute from './auth.route';
import tripRoute from './trip.route';

const app = express();

app.use('/api/auth', authRoute);
app.use('/api/', tripRoute);

export default app;
