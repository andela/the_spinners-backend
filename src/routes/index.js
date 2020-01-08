import express from 'express';
import authRoute from './auth.route';
import tripRoute from './trip.route';
import profileSettingsRoute from './profile-settings.route';
import accommodationRoute from './accommodation.route';
import notificationRoute from './notification.route';
import managerRoute from './manager.route';
import settingsRoute from './settings.route';

const app = express();

app.use('/api/auth', authRoute);
app.use('/api/trips', tripRoute);
app.use('/api/accommodations', accommodationRoute);
app.use('/api/users', profileSettingsRoute);
app.use('/api/notifications', notificationRoute);
app.use('/api/manager', managerRoute);
app.use('/api/users/settings', settingsRoute);

export default app;
