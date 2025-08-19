import express from 'express';
import { createMachine } from '../controllers/Machine.js';


const router = express.Router();

router.post("/create",createMachine)

export default router;
