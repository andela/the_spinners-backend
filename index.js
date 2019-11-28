import express from 'express';
import db from './src/config/dbConfig';

const app = express();

const PORT = process.env.PORT || 3000;

db.authenticate()
  .then(() => {
    // eslint-disable-next-line no-console
    app.listen(PORT, () => console.log(`Listening on port ${PORT}.......`));
  });
