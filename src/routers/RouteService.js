import express from 'express';
// import validateData from '../middlewares/validation.js';
import {
  createService,
  deleteService,
  getService,
  getServiceById,
  updateService,
} from '../controllers/service.js';
// import { schemaCredit } from '../validat ions/SchemaCredit.js';
// import verifyToken from '../middlewares/VerifyToken.js';

const router = express.Router();

router.get('/', getService);
router.get('/:id', getServiceById);
router.post('/create', createService);
router.patch('update/:id', updateService);
router.delete('/delete/:id', deleteService);

export default router;
