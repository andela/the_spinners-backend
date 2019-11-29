import express from 'express';
import db from './src/config/dbConfig';

const app = express();

const PORT = process.env.PORT || 3000;

db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.....');
    app.listen(PORT, () => console.log(`Listening on port ${PORT}.......`));
  })
  .catch(err => console.error('Unable to connect to the database:', err));
