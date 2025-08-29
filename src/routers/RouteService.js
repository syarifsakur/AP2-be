import express from 'express';
// import validateData from '../middlewares/validation.js';
import { createService, getService } from '../controllers/service.js';
// import { schemaCredit } from '../validations/SchemaCredit.js';
// import verifyToken from '../middlewares/VerifyToken.js';

const router = express.Router();

router.get('/', getService);
router.post('/create', createService);

export default router;
