import express from 'express';
// import validateData from '../middlewares/validation.js';
import {
  createPart,
  deletePart,
  getPart,
  updatePart,
} from '../controllers/part.js';
// import { schemaCredit } from '../validations/SchemaCredit.js';
// import verifyToken from '../middlewares/VerifyToken.js';

const router = express.Router();

router.get('/', getPart);
router.post('/create', createPart);
router.patch('/update/:id', updatePart);
router.delete('/delete/:id', deletePart);

export default router;
