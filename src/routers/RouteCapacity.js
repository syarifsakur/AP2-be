import express from 'express';
import { createCapacity } from '../controllers/Capacity.js';
import verifyToken from '../middlewares/verifyToken.js';

const router = express.Router();

router.post("/create",verifyToken,createCapacity)

export default router;
