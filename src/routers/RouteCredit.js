import express from 'express';
import validateData from '../middlewares/validation.js';
import {
  createCredit,
  deleteCredit,
  getCredit,
} from '../controllers/credit.js';
import { schemaCredit } from '../validations/SchemaCredit.js';
import verifyToken from '../middlewares/VerifyToken.js';

const router = express.Router();

router.get('/', getCredit);
router.post('/create', validateData(schemaCredit), createCredit);
router.delete('/delete/:id', verifyToken, deleteCredit);

export default router;
