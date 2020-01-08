import express from 'express';
import authRoute from './auth.route';
import tripRoute from './trip.route';
import profileSettingsRoute from './profile-settings.route';
import accommodationRoute from './accommodation.route';

const app = express();

app.use('/api/auth', authRoute);
app.use('/api/', tripRoute);
app.use('/api/accommodations', accommodationRoute);
app.use('/api/users', profileSettingsRoute);

export default app;
