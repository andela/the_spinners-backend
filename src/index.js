import express from 'express';
import bodyParser from 'body-parser';
import registerApiDocs from './swagger';
import router from './routes/auth';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(router);

registerApiDocs(app);

const PORT = process.env.PORT || 3000;

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Listening on port ${PORT}.......`));

export default app;
