import { Router } from 'express';
import { getNutritionInfo } from '../controllers/nutritionController';

const router = Router();

// Endpoint public pentru aport zilnic și produse nerecomandate
router.get('/nutrition-info', getNutritionInfo);

export default router;