import { Router } from 'express';
import { addConsumedProduct } from '../controllers/consumedProductController';
import { protect } from '../middlewares/authMiddleware';

const router = Router();

// Ruta pentru adăugarea produsului consumat
router.post('/add', protect, addConsumedProduct);

export default router;