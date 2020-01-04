
import express from 'express';
import morgan from 'morgan';
import passport from 'passport';
import routes from './routes/index';

const app = express();
app.use(morgan('dev'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());

app.use('/', routes);

export default app;
