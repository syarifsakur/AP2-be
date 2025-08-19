import express from 'express';
import { createFrame } from '../controllers/Frame.js';

const router = express.Router();

router.post("/create",createFrame)

export default router;
