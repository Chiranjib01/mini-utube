import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import router from './routes/index.js';
const app = express();

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

app.use(express.static(path.resolve(__dirname, 'client', 'build')));

app.get('*', (_, res) => {
  res.sendFile(
    path.resolve(__dirname, 'client', 'build', 'index.html'),
    (err) => {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server Started On Port ${PORT} ...`);
});
