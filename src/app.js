
import express from 'express';
import morgan from 'morgan';
import passport from 'passport';
import routes from './routes/index';
import NotificationListeners from './helpers/notifications/index';

const app = express();
app.use(morgan('dev'));
app.use(express.static(`${__dirname}/public/`));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());

// running all event listeners
NotificationListeners();

app.use('/', routes);

export default app;
