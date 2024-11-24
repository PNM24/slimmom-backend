import { Router } from 'express';
import { getAndSaveNutritionInfo } from '../controllers/nutritionController';
import { protect } from '../middlewares/authMiddleware';

const router = Router();

// Ruta protejată pentru nutriție
router.get('/nutrition', protect, getAndSaveNutritionInfo);

export default router;