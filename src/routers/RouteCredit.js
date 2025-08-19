import express from 'express';
import validateData from '../middlewares/validation.js';
import { createCredit, getCredit } from '../controllers/credit.js';
import { schemaCredit } from '../validations/SchemaCredit.js';

const router = express.Router();

router.get("/",getCredit)
router.post("/create",validateData(schemaCredit),createCredit)

export default router;
