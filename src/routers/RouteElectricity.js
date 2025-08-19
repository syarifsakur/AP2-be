import express from 'express';
import { createElectricity } from '../controllers/Electricity.js';

const router = express.Router();

router.post("/create",createElectricity)

export default router;
