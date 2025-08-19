import express from 'express';
import { createDimensions } from '../controllers/Dimensions.js';

const router = express.Router();

router.post("/create",createDimensions)

export default router;
