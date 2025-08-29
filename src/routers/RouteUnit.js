import express from 'express';
import {
  createUnits,
  deleteUnit,
  getAllUnits,
  getUnitsById,
  updateUnit,
} from '../controllers/Unit.js';
import verifyToken from '../middlewares/VerifyToken.js';
import { schemaUnit } from '../validations/SchemaUnit.js';
import validateData from '../middlewares/validation.js';

const router = express.Router();

router.get('/', getAllUnits);
router.get('/:id', getUnitsById);
router.post('/create/', verifyToken, validateData(schemaUnit), createUnits);
router.patch('/update/:id', verifyToken, validateData(schemaUnit), updateUnit);
router.delete('/delete/:id', verifyToken, deleteUnit);

export default router;
