import express from 'express';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import db from './config/database.js';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import cookieParser from 'cookie-parser';

import RouteAuth from './routers/RouteAuth.js';
import RouteUnit from './routers/RouteUnit.js';
import RouteCredit from './routers/RouteCredit.js';
import RouteService from './routers/RouteService.js';

import createModel from './models/ModelService.js';

dotenv.config();
const app = express();

async function initializeDatabase() {
  try {
    await db.authenticate();
    console.log('Database connected');
    // await db.sync()
    // await createModel.sync({ alter: true });
  } catch (error) {
    console.error('Database error:', error);
  }
}

initializeDatabase();

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  message: 'Melebihi batas request ke server.',
});

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173',
  })
);
app.use('/public', express.static('public'));
app.use(fileUpload());
app.use(express.json());
app.use(cookieParser());

app.use('/auth', RouteAuth);
app.use('/unit', RouteUnit);
app.use('/credit', RouteCredit);
app.use('/service', RouteService);

app.listen(3000, () => {
  console.log('server jalan di server 3000');
});
