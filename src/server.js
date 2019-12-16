import express from 'express';
import registerApiDocs from './swagger';
import auth from './routes/auth';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api/auth', auth);

registerApiDocs(app);

const PORT = process.env.PORT || 3000;

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Listening on port ${PORT}.......`));
