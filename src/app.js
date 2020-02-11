import express from 'express';
import morgan from 'morgan';
import passport from 'passport';
import cors from 'cors';
import routes from './routes/index';
import NotificationListeners from './helpers/notifications/index';

const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());

// running all event listeners
NotificationListeners();

app.use('/', routes);

export default app;
